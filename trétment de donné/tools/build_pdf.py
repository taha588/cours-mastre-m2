# -*- coding: utf-8 -*-
"""Transforme le cours HTML (artefact) en HTML d'impression au theme
« Quoi ? Ou ? Comment ? », puis rend le PDF avec Edge headless."""
import os, re, shutil, subprocess, sys, copy
from bs4 import BeautifulSoup

SCR = os.path.dirname(os.path.abspath(__file__))      # tools/
PROJ = os.path.dirname(SCR)                           # racine du depot
SRC = os.path.join(PROJ, "cours-ch0-temps-reel.html")
FIGS = os.path.join(SCR, "print-figures.html")
THEME = os.path.join(SCR, "theme.css")
BUILD = os.path.join(PROJ, "build")
OUT_HTML = os.path.join(BUILD, "cours.html")
PDF = os.path.join(PROJ, "Cours_Chapitre0_Notions_de_base.pdf")

EDGE = os.environ.get("EDGE_PATH") or next(
    (p for p in (
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    ) if os.path.exists(p)), None)
if not EDGE:
    sys.exit("Microsoft Edge introuvable : definissez EDGE_PATH.")

os.makedirs(BUILD, exist_ok=True)
shutil.copy(THEME, os.path.join(BUILD, "theme.css"))

NOTIONS = [
    ("N1", "Le traitement en temps réel"),
    ("N2", "Le traitement par lots et le traitement en flux"),
    ("N3", "La donnée"),
    ("N4", "Où ranger les données : fichier, base, entrepôt, lac"),
    ("N5", "La requête bornée et la requête continue"),
    ("N6", "Le client et le serveur"),
    ("N7", "Le réseau"),
    ("N8", "Le message JSON, ou l'événement"),
    ("N9", "La paire clé–valeur"),
    ("N10", "L'horodatage et les unités de temps"),
    ("N11", "Heure d'événement et heure de traitement"),
    ("N12", "Le système distribué et le cluster"),
    ("N13", "Le conteneur Docker"),
    ("N14", "Le générateur Python"),
]
SOUS = ("4 Règle · 5 Explication · 6 Problème traité · 7 Utilité · 8 Origine · "
        "9 Où · 10 Quand · 11 Comment · 12 Applications corrigées · "
        "13 Entraînement · 14 Difficulté croissante")

# anchors : (cle, texte exact du titre dans le PDF)
ANCH = [("s1", "1. Objectifs du cours"),
        ("s2", "2. Un problème du réel"),
        ("s3", "3. Introduction au cours")]
for i, (code, nom) in enumerate(NOTIONS, 1):
    ANCH.append(("n%d" % i, "%s — %s" % (code, nom)))
ANCH += [("s15", "15. Problèmes du réel et leur solution détaillée"),
         ("s16", "16. Banque d'exercices de fin de cours"),
         ("s17", "17. Corrigé de tous les exercices de la section 16")]


def transform():
    soup = BeautifulSoup(open(SRC, encoding="utf-8").read(), "lxml")
    main = soup.find("main")

    figsoup = BeautifulSoup(open(FIGS, encoding="utf-8").read(), "lxml")
    statics = {d["data-fig"]: d for d in figsoup.find_all("div", attrs={"data-fig": True})}
    pcaps = {d["data-cap"]: d for d in figsoup.find_all("div", attrs={"data-cap": True})}

    # 1. retirer le bandeau d'ouverture et l'ancien sommaire
    for sel in main.select("div.hero"):
        sel.decompose()
    h2som = main.find("h2", id="sommaire")
    if h2som:
        nxt = h2som.find_next_sibling()
        h2som.decompose()
        if nxt and "toc" in (nxt.get("class") or []):
            nxt.decompose()

    # 2. figures animees -> figures statiques
    for fig in main.select("figure.fig"):
        fid = fig.get("id")
        cap = fig.find("figcaption")
        new = soup.new_tag("div")
        new["class"] = "fig"
        if fid in statics:
            holder = copy.copy(statics[fid])
            holder.name = "div"
            del holder["data-fig"]
            holder["class"] = "figsvg"
            new.append(holder)
        if fid in pcaps:
            capdiv = copy.copy(pcaps[fid])
            del capdiv["data-cap"]
            capdiv["class"] = "figcap"
            new.append(capdiv)
        elif cap:
            capdiv = soup.new_tag("div")
            capdiv["class"] = "figcap"
            for c in list(cap.children):
                capdiv.append(c.extract())
            new.append(capdiv)
        fig.replace_with(new)

    # 3. boites : <span class="lab"> -> <div class="box-t"> + corps dans box-b
    for box in main.select("div.box"):
        lab = box.find("span", class_="lab", recursive=False)
        if not lab:
            continue
        title = lab.get_text(" ", strip=True)
        lab.decompose()
        body = soup.new_tag("div")
        body["class"] = "box-b"
        for child in list(box.children):
            body.append(child.extract())
        head = soup.new_tag("div")
        head["class"] = "box-t"
        head.string = title
        box.append(head)
        box.append(body)
        if box.has_attr("style"):
            del box["style"]

    # 4. classes de coloration du code
    for cl, new_cl in (("kw", "c-kw"), ("str", "c-str"), ("cmt", "c-com")):
        for sp in main.select("span.%s" % cl):
            sp["class"] = [new_cl]

    # 5. enlever les enveloppes de defilement des tableaux
    for tw in main.select("div.tw"):
        tw.unwrap()

    body_html = main.decode_contents()

    # 6. sommaire
    rows = []

    def row(label, key, lvl):
        rows.append(
            '<div class="row %s"><span class="e">%s</span>'
            '<span class="dots"></span><span class="e">@@%s@@</span></div>'
            % (lvl, label, key))

    rows.append('<div class="l1" style="margin-top:0">Ouverture</div>')
    row("1 · Objectifs du cours", "s1", "l2")
    row("2 · Un problème du réel : la seconde de Salma", "s2", "l2")
    row("3 · Introduction au cours", "s3", "l2")
    rows.append('<div class="l1">Les quatorze notions</div>')
    for i, (code, nom) in enumerate(NOTIONS, 1):
        row("%s · %s" % (code, nom), "n%d" % i, "l2")
        rows.append('<div class="l3">%s</div>' % SOUS)
    rows.append('<div class="l1">Fin du cours</div>')
    row("15 · Problèmes du réel et leur solution détaillée", "s15", "l2")
    row("16 · Banque d'exercices : 10 faciles, 10 moyens, 10 difficiles", "s16", "l2")
    row("17 · Corrigé de tous les exercices de la section 16", "s17", "l2")
    toc = "\n".join(rows)

    cover = """
<div class="cover">
  <div class="rule-top"></div>
  <h1>Traitement de données en temps réel</h1>
  <div class="sub">Chapitre 0 — Notions de base</div>
  <div class="claim">Le vocabulaire et les idées simples dont on a besoin
    avant de parler de flux : donnée, événement, serveur, réseau, message,
    temps, système distribué, Docker.</div>
  <div class="rule-bot"></div>
  <div class="cover-method">
    <div class="mt">La méthode, en trois temps</div>
    <div class="cover-cols">
      <div><span class="k k1">C'EST QUOI&nbsp;?</span><br>L'énoncé de la règle,
        son explication, le problème qu'elle traite et d'où elle vient.</div>
      <div><span class="k k2">OÙ &amp; QUAND&nbsp;?</span><br>Les domaines
        d'application et les signaux qui, dans un énoncé, désignent cette règle.</div>
      <div><span class="k k3">COMMENT&nbsp;?</span><br>La méthode pas à pas,
        puis des exercices entièrement corrigés.</div>
    </div>
  </div>
  <div class="cover-contenu">
    <strong>Ce document contient&nbsp;:</strong> 14 notions, chacune traitée en
    11 sections — 8 figures — 3 problèmes du réel résolus —
    30 exercices de fin de cours (10 faciles, 10 moyens, 10 difficiles)
    et leur corrigé détaillé.
  </div>
  <div class="foot">
    Master Data Science &amp; Big&nbsp;Data · S3 · Parcours Big&nbsp;Data<br>
    Faculté des Sciences Ben M'Sick · Université Hassan&nbsp;II de Casablanca<br>
    D'après le cours de Pr. Hafsa OUCHRA · Année universitaire 2026–2027
  </div>
</div>

<div class="saut"></div>
<h1 class="chapitre"><span class="num">Chapitre 00</span>Notions de base du temps réel</h1>
<h2>Sommaire</h2>
<div class="toc">%s</div>
<div class="saut"></div>
""" % toc

    extra = """
<style>
  .fig { page-break-inside: avoid; margin: 4mm 0 5mm; }
  .figsvg { border: .8pt solid var(--trait); border-radius: 3px;
            background: #fff; padding: 2mm; }
  .figsvg svg { display: block; width: 100%; height: auto; }
  .figcap { font-size: 9.8pt; line-height: 1.5; color: #333; margin-top: 1.5mm;
            text-align: left; }
  .figcap b { display: block; color: var(--marine); font-size: 9.5pt;
              letter-spacing: .3px; text-transform: uppercase; }
  svg text { font-family: "Segoe UI", Cambria, sans-serif; }
  svg .fl { font-size: 11px; font-weight: 700; fill: #22497A; }
  svg .fs { font-size: 10px; fill: #444; }
  svg .fn { font-size: 10px; fill: #fff; font-weight: 700; }
  svg .fk { font-size: 11px; fill: #fff; font-weight: 700; }
  svg .fv { font-size: 10px; fill: #22497A; font-family: Consolas, monospace; }
  svg .fc { font-size: 10.5px; fill: #222; font-family: Consolas, monospace; }
  h2 { page-break-after: avoid; }
  h3 { page-break-after: avoid; }
  h2 + .box, h3 + .box { page-break-before: avoid; }
  .box-b > ol, .box-b > ul { padding-left: 5mm; }
  sup { font-size: .7em; }
  .toc .row { margin: .4mm 0; }
</style>
"""

    html = ('<!doctype html>\n<html lang="fr"><head><meta charset="utf-8">'
            '<title>Chapitre 0 — Notions de base</title>'
            '<link rel="stylesheet" href="theme.css">' + extra +
            '</head><body>' + cover + body_html + '</body></html>')
    return html


def render(html, pdf):
    open(OUT_HTML, "w", encoding="utf-8").write(html)
    url = "file:///" + OUT_HTML.replace("\\", "/").replace(" ", "%20")
    if os.path.exists(pdf):
        os.remove(pdf)
    subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--no-first-run",
                    "--no-pdf-header-footer", "--virtual-time-budget=20000",
                    "--print-to-pdf=" + pdf, url],
                   check=False, capture_output=True, timeout=300)
    if not os.path.exists(pdf):
        sys.exit("Edge n'a pas produit le PDF")


def page_map(pdf):
    import fitz
    doc = fitz.open(pdf)
    found, used = {}, 0
    for key, text in ANCH:
        cand = [text, text.split(" — ")[0] if " — " in text else text[:28]]
        for probe in cand:
            hit = None
            for p in range(used, doc.page_count):
                if doc[p].search_for(probe):
                    hit = p + 1
                    break
            if hit:
                found[key] = hit
                used = hit - 1
                break
        else:
            found[key] = 0
    n = doc.page_count
    doc.close()
    return found, n


def stamp(pdf, n):
    import fitz
    doc = fitz.open(pdf)
    for i in range(1, doc.page_count):
        pg = doc[i]
        r = pg.rect
        pg.insert_text((r.width / 2 - 18, r.height - 28), "— %d —" % (i + 1),
                       fontname="times-roman", fontsize=10,
                       color=(0.13, 0.29, 0.48))
    doc.saveIncr()
    doc.close()


html = transform()
render(html, PDF)
pm, n1 = page_map(PDF)
print("pass 1 :", n1, "pages ;", sum(1 for v in pm.values() if v), "/", len(pm), "ancres")
for k, v in pm.items():
    html = html.replace("@@%s@@" % k, str(v) if v else "—")
render(html, PDF)
pm2, n2 = page_map(PDF)
if any(pm2[k] != pm[k] for k in pm):
    for k, v in pm2.items():
        html = html.replace(str(pm[k]) if False else "@@%s@@" % k, str(v))
    print("decalage detecte, 2e correction")
stamp(PDF, n2)
print("PDF :", PDF)
print("pages :", n2)
print("sommaire :", ", ".join("%s=%s" % (k, v) for k, v in pm2.items()))
