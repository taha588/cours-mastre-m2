# -*- coding: utf-8 -*-
"""Assemble les fragments du cours en un seul HTML, puis produit le PDF via Edge headless.

Usage :
    python build/build.py          # assemble + PDF + nombre de pages
    python build/build.py --toc    # idem, puis renseigne les numéros de pages du sommaire
"""
import os
import re
import shutil
import sys
import tempfile
import time

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECTIONS = os.path.join(RACINE, "cours", "sections")
HTML = os.path.join(RACINE, "cours", "cours.html")
PDF = os.path.join(RACINE, "Cours_Architectures_Donnees_Modernes.pdf")
CSS_SKILL = os.path.expanduser(r"~\.claude\skills\construction-des-cours\assets\theme.css")
CSS = os.path.join(RACINE, "cours", "theme.css")
# Le rendu passe par Chromium (Playwright) : voir imprimer().

GABARIT = """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Introduction aux architectures de donnees modernes</title>
<link rel="stylesheet" href="theme.css">
<link rel="stylesheet" href="cours.css">
{mathjax}</head>
<body>
{corps}
</body>
</html>
"""


MATHJAX = """<script>
window.MathJax = { tex: { inlineMath: [['$', '$'], ['\\\\(', '\\\\)']] },
                   svg: { fontCache: 'global' } };
</script>
<script id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js"></script>
"""


def besoin_de_mathjax(corps):
    """MathJax n'est chargé que si le cours contient des formules : sinon Edge
    attend un script distant inutile, ce qui allonge chaque build."""
    return any(marque in corps for marque in ("\\(", "\\[", "$$", "class=\"eq\""))


def copier_css():
    if os.path.exists(CSS_SKILL):
        shutil.copyfile(CSS_SKILL, CSS)
    elif not os.path.exists(CSS):
        sys.exit("theme.css introuvable : " + CSS_SKILL)


def assembler():
    fragments = sorted(f for f in os.listdir(SECTIONS) if f.endswith(".html"))
    if not fragments:
        sys.exit("aucun fragment dans cours/sections/")
    corps = []
    for nom in fragments:
        with open(os.path.join(SECTIONS, nom), encoding="utf-8") as f:
            corps.append("<!-- %s -->\n%s" % (nom, f.read().rstrip()))
    texte = "\n\n".join(corps)
    with open(HTML, "w", encoding="utf-8") as f:
        f.write(GABARIT.format(corps=texte,
                               mathjax=MATHJAX if besoin_de_mathjax(texte) else ""))
    return fragments


def imprimer(essais=2):
    """Rend le PDF avec Chromium pilote par Playwright.

    Edge `--print-to-pdf` a cesse de fonctionner sur ce poste (code de sortie 0 mais
    aucun fichier produit, y compris sur une page triviale et avec un profil isole).
    Le PDF est ecrit dans le dossier temporaire, hors OneDrive, puis copie a sa place.
    """
    from playwright.sync_api import sync_playwright

    brut = os.path.join(tempfile.gettempdir(), "cours_architectures_build.pdf")
    for essai in range(1, essais + 1):
        if os.path.exists(brut):
            try:
                os.remove(brut)
            except OSError:
                time.sleep(2)
        try:
            with sync_playwright() as p:
                navigateur = p.chromium.launch()
                page = navigateur.new_page()
                page.goto("file:///" + HTML.replace("\\", "/"), wait_until="load")
                # prefer_css_page_size respecte le @page de theme.css ;
                # print_background est indispensable : sans lui, les boites perdent
                # leur fond colore.
                page.pdf(path=brut, prefer_css_page_size=True, print_background=True)
                navigateur.close()
        except Exception as erreur:  # noqa: BLE001 - on reessaie une fois
            print("rendu en echec (%d/%d) : %s" % (essai, essais, erreur))
            time.sleep(3)
            continue
        if os.path.exists(brut) and os.path.getsize(brut) > 0:
            shutil.copyfile(brut, PDF)
            return
    sys.exit("Chromium n'a pas produit le PDF apres %d tentatives" % essais)


def pages():
    import fitz
    with fitz.open(PDF) as d:
        return d.page_count


def numeros_de_pages():
    """Associe a chaque ancre <h2 id=...> / <h3 id=...> sa page dans le PDF."""
    import fitz
    titres = []
    with open(HTML, encoding="utf-8") as f:
        for m in re.finditer(r'<h([123])[^>]*id="([^"]+)"[^>]*>(.*?)</h\1>', f.read(), re.S):
            texte = re.sub(r"<[^>]+>", "", m.group(3))
            texte = re.sub(r"\s+", " ", texte).replace("\u25b6", "").strip()
            texte = re.sub(r"^\d+\s*", "", texte)  # le <span class="num"> du titre
            titres.append((m.group(2), texte))
    trouves = {}
    with fitz.open(PDF) as d:
        # 1) liens internes du sommaire (<a href="#ancre">) : Chromium les resout en page exacte
        for page in d:
            for lien in page.get_links():
                nom, cible = lien.get("nameddest"), lien.get("page", -1)
                if nom and cible is not None and cible >= 0 and nom not in trouves:
                    trouves[nom] = cible + 1
        # 2) repli : recherche du titre dans le texte des pages
        for i, page in enumerate(d, start=1):
            texte_page = re.sub(r"\s+", " ", page.get_text())
            for ancre, titre in titres:
                if ancre not in trouves and titre and titre[:60] in texte_page:
                    trouves[ancre] = i
    return trouves


def ecrire_sommaire(trouves):
    """Remplace les <span class="p" data-ref="ancre"></span> du sommaire par le numero de page."""
    cibles = [f for f in os.listdir(SECTIONS) if "sommaire" in f]
    for nom in cibles:
        chemin = os.path.join(SECTIONS, nom)
        with open(chemin, encoding="utf-8") as f:
            contenu = f.read()
        def remplacer(m):
            return '<span class="p" data-ref="%s">%s</span>' % (
                m.group(1), trouves.get(m.group(1), "?"))
        neuf = re.sub(r'<span class="p" data-ref="([^"]+)">[^<]*</span>', remplacer, contenu)
        if neuf != contenu:
            with open(chemin, "w", encoding="utf-8") as f:
                f.write(neuf)


def main():
    copier_css()
    fragments = assembler()
    imprimer()
    print("fragments : %d | pages PDF : %d" % (len(fragments), pages()))
    if "--toc" in sys.argv:
        trouves = numeros_de_pages()
        ecrire_sommaire(trouves)
        assembler()
        imprimer()
        print("sommaire : %d ancres resolues | pages PDF : %d" % (len(trouves), pages()))


if __name__ == "__main__":
    main()
