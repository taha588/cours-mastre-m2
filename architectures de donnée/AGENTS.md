# Projet : Cours « Architectures de données modernes » — un PDF pédagogique complet (35 notions)

## Référence

- Spécification : `SPEC.md` (lire seulement la section utile : §3 structure, §5 pages sources)
- Méthode de rédaction : skill `construction-des-cours` (structure 0-17, non négociable)
- Source : `Seance_1_Introduction_architectures_donnees_modernes_IBM.pdf` (56 p., ne jamais relire en entier)

## Carte

- `cours/sections/Nxx-*.html` → un fragment par notion (sections 4-14)
- `cours/sections/00-*.html` → sommaire, fatiha (1-3), khatima (15-17)
- `cours/cours.html` → document unique assemblé (généré, ne pas éditer à la main)
- `build/build.py` → assemble les fragments puis Edge headless → PDF

## Commandes

- Build + PDF : `python build/build.py` (Chromium via Playwright ; affiche le nombre de pages)
- Lire une page du PDF source : `python build/page.py <N>`

## Règles

- Début de session : lire `PROGRESS.md` et `TASKS.md`
- Une notion = une sous-tâche = un fragment ; ne jamais fusionner deux notions, ne jamais ajouter de section
- `PROGRESS.md` : « En cours : <tâche> » au début, « En cours : — » à la clôture
- Lire une page du PDF source seulement si la notion la cite (SPEC §5) ; pages-schémas → lecture image
- Langue : français, avec résumé arabe dans §5 et « À retenir » bilingue dans §11
- Couleurs : seules les classes de `assets/theme.css`, aucune teinte inventée
- Ne jamais afficher `cours/cours.html` en entier (fichier volumineux) : grep ciblé
- Sorties courtes : `-q`, `head -5`, `--tail=30`
- Commit après chaque notion (git est initialisé)
- Réponses courtes, en darija ; le contenu du cours en français
