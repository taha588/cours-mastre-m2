## État actuel (5 lignes max, réécrit à chaque fin de tâche)

- Fait : T0 ; T1.1 ; **parties 0, I, II et III terminées (N1-N19)** — PDF à 243 pages, 19 notions sur 35
- En cours : —
- Problème : —
- Prochaine étape : T6.1 — N20 Batch processing (p. 29-30), début de la partie IV

## Décisions (on ajoute sans effacer)

- Livrable : UN seul PDF, assemblé depuis des fragments `cours/sections/*.html` (sessions courtes, fichier final unique)
- Langue : français + résumé arabe dans §5 et « À retenir » bilingue dans §11 (pas de section en plus)
- Découpage : 35 notions (SPEC §5), une par sous-tâche, sections 4-14 complètes pour chacune
- git : initialisé, commit après chaque notion
- Modèles : Opus pour planifier, Sonnet pour exécuter (`.claude/settings.local.json`)
- Rendu PDF : Chromium via Playwright (`playwright install chromium` déjà fait), plus Edge — Edge
  `--print-to-pdf` est devenu inopérant sur ce poste. Build complet en ~12 s pour 157 pages
- Sommaire : ancres `id` sur les titres + `<span class="p" data-ref="...">`, remplis par `build.py --toc`
- Couverture : `padding-top:16mm` en ligne pour tenir sur une seule page
- `cours/cours.css` (chargé après theme.css) : mise en page seulement, aucune couleur. Une boîte longue
  prend `class="box long ..."` sinon elle saute de page et laisse un blanc ; `h2.notion` = saut de page
- Cas réel fil rouge : l'enseigne de distribution de §2 (120 magasins, 3 demandes) — à réutiliser en §15
- Fil conducteur de la partie I : chaque génération est amenée par la limite de la précédente. N9 finit
  sur « séparer l'analyse » → N10 ; N10 finit sur « le grain décide des questions futures » → N11 ;
  prévoir que N11 finisse sur le data swamp → N12
- Les notions proches se répondent explicitement pour éviter la redite : N4 (4 causes constatées) vs
  N7 (7 contraintes mesurées) comparées dans le §5 de N7 ; chaîne p. 9 en N5 vs couches en N30-N35
- Gabarit d'une notion (suivre N01-la-donnee.html) : h1.chapitre pour la partie, `h2.notion` id="nXX",
  `h3` id="nXX-sN" pour chaque section 4→14 ; §12 = 3 exercices corrigés pas à pas comme §11,
  §13 = 6 énoncés sans corrigé, §14 = 3 exercices avec chips facile/moyen/difficile
- Résumé arabe : `div.ar dir="rtl"` après la boîte `b-piege` de §5 ; mise en forme dans cours.css
- Volume observé : 13 pages par notion, très régulier sur 6 notions → ~460 pages + khatima
- Chaque nouvelle partie commence par un `h1.chapitre saut` placé en tête du fragment de sa 1re notion
  (fait pour la partie 0 dans N01) ; la partie I commencera donc dans N07
- TOUJOURS rendre la page source en image avant de rédiger, même absente de la liste SPEC §6 : la p. 8
  n'avait qu'une phrase en texte mais portait les 4 causes (volume, silos, formats, IA) dans l'image
- Page-schéma du support : la rendre en image (dpi=120) et la lire avant de rédiger — la p. 5 contenait
  les exemples exacts (table C001/Ahmed/Casablanca/1200, JSON, XML, log) réutilisés tels quels
- Code source dans le cours : `<pre>` + classes c-kw / c-str / c-num / c-com de theme.css
- Boîte de 7 puces ou plus : `class="box b-xxx long"`, sinon elle saute de page et laisse un blanc
  (corrigé en lot sur les 11 premiers fragments ; à faire directement dans les suivants)
- Tableau de plus d'une demi-page : `class="long"` (sinon il saute de page) ; cellules alignées à
  gauche par cours.css, la justification du corps creusait des trous dans les colonnes étroites
- Le tableau des 7 générations (p. 13) est dans N8 ; N9 à N12 en sont quatre applications, ne pas
  refaire l'historique à chaque fois
- build.py ne charge MathJax que si le cours contient des formules : sans cela Edge attendait un script
  distant inutile et le build passait de ~10 s à plus de 2 minutes
- Le chemin en 5 étapes de la p. 9 (collecte → ingestion → stockage → traitement → consommation) sert
  d'illustration en N5 ; le détail de chaque couche appartient à N30-N35, ne pas le traiter deux fois
