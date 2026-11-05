# SPEC — Cours « Introduction aux architectures de données modernes »

Source : `Seance_1_Introduction_architectures_donnees_modernes_IBM.pdf` (56 pages)
Cadre : Master 2 DSBD — S3 — « Architecture de données avancées » — Pr. Khalid Kandali — 2026-2027

## §1 Objectif

Produire **un seul** document de cours pédagogique complet couvrant les **35 notions** du chapitre 1,
construit selon la structure imposée par la skill `construction-des-cours`.

## §2 Livrables

- `Cours_Architectures_Donnees_Modernes.pdf` — PDF final, un seul fichier, modèle « Quoi ? Où ? Comment ? »
- `cours/cours.html` — document unique assemblé par `build/build.py`
- `cours/sections/*.html` — fragments par notion (organisation interne, pas un livrable séparé)

## §3 Structure imposée (non négociable)

- **0** Sommaire — écrit **en dernier**, avec numéros de pages réels
- **1-3** Fatiha, **une seule fois** : 1 objectifs · 2 problème du réel · 3 préambule
- **4-14** répétés **pour CHAQUE notion** : 4 la règle · 5 explication de la règle (idée profonde + cas
  particuliers) · 6 le problème qu'elle traite · 7 à quoi elle sert · 8 d'où elle vient · 9 où l'utiliser
  (détaillé) · 10 quand l'utiliser (signaux, détaillé) · 11 comment l'utiliser (pas à pas + À retenir) ·
  12 exercices d'application corrigés en détail (même méthode que 11) · 13 exercices d'entraînement ·
  14 exercices à difficulté croissante
- **15-17** Khatima, **une seule fois** : 15 problèmes du réel + corrigés détaillés · 16 banque de
  **10 faciles / 10 moyens / 10 difficiles** · 17 corrigés des 30, regroupés en fin de cours
- **Interdit** : ajouter une section hors 0-17, en retirer une, fusionner deux notions.

## §4 Langue et forme

- Français. Résumé court **en arabe** à la fin de §5 (`<div class="ar" dir="rtl">`) et « À retenir »
  bilingue dans §11. Pas de nouvelle section pour l'arabe.
- Boîtes `assets/theme.css` : §1 `b-quoi` · §2 `b-domaine` · §3 texte nu · §4 `b-quoi` ·
  §5 `b-quoi` + `b-piege` (cas particuliers) · §6/§7/§8 `b-note` · §9/§10 `b-ou` ·
  §11 `b-comment` + `b-retenir` · §12 `b-app` + `b-solution` · §13 `b-app` ·
  §14 `b-app` + chips · §15 `b-domaine` + `b-solution` · §16 `b-app` + chips · §17 `b-solution`
- Aucune couleur inventée : seules les classes de `theme.css`.
- **Fidélité au support** : définitions, exemples, chiffres et vocabulaire du PDF.
- Chaque « explication détaillée » = 2 à 3 phrases minimum. Chaque exercice corrigé = corrigé complet.

## §5 Notions et pages sources

| # | Notion | Pages |
|---|---|---|
| N1 | La donnée (définition + condition de valeur) | 4 |
| N2 | Structuré / semi-structuré / non structuré | 5-6 |
| N3 | La gestion des données (5 missions) | 7 |
| N4 | Pourquoi la gestion devient complexe (socle de données) | 8 |
| N5 | L'architecture de données (définition opérationnelle) | 9 |
| N6 | La grille des décisions de l'architecte (8 questions) | 10 |
| N7 | Les 7 contraintes et le découplage | 12 |
| N8 | Principe d'évolution architecturale (besoin -> compromis) | 13-14 |
| N9 | Architecture traditionnelle App -> BD -> Reporting | 15 |
| N10 | Data Warehouse | 16 |
| N11 | Data Lake | 17 |
| N12 | Lakehouse | 18 |
| N13 | Architecture centralisée | 19-20 |
| N14 | Architecture distribuée | 21 |
| N15 | Scale-up vs scale-out | 22 |
| N16 | OLTP | 23-24 |
| N17 | OLAP | 25 |
| N18 | Complémentarité OLTP/OLAP + ETL (+ tableau comparatif) | 26-27 |
| N19 | Pourquoi séparer OLTP et OLAP | 28 |
| N20 | Batch processing | 29-30 |
| N21 | Stream processing | 31 |
| N22 | Critère de choix batch/stream (latence) + cas IoV | 32-33 |
| N23 | La donnée comme actif stratégique | 34-35 |
| N24 | Volume != valeur (5 causes) | 36 |
| N25 | Qualité relative à l'usage (BI vs IA) | 37 |
| N26 | Gouvernance / métadonnées / observabilité | 38 |
| N27 | Organisation data-driven | 39-40 |
| N28 | Organisation AI-driven | 41 |
| N29 | Du reporting à l'IA : exigences croissantes | 42 |
| N30 | L'architecture moderne : 5 couches + couche transverse | 43-44, 50 |
| N31 | Sources | 45 |
| N32 | Ingestion | 46 |
| N33 | Storage | 47 |
| N34 | Processing | 48 |
| N35 | Analytics / AI | 49 |

Réservé à §15 : étude de cas e-commerce (51-54), grille de décision (55), TD IoT/Edge (56).

## §6 Technique

- HTML + MathJax **SVG** (chargé seulement si le cours contient des formules) -> **Chromium piloté par
  Playwright** -> PDF ; vérification du nombre de pages avec `fitz.open(pdf).page_count`
  (PyMuPDF 1.27, Python 3.10).
- Rendu : `page.pdf(prefer_css_page_size=True, print_background=True)` — sans `print_background`, les
  boîtes perdent leur fond coloré. Le PDF est écrit dans le dossier temporaire puis copié, OneDrive
  verrouillant par intermittence le fichier de destination.
- Historique : Edge `--print-to-pdf` était l'outil initial ; il a cessé de produire le moindre fichier
  sur ce poste (code 0, aucune sortie, y compris sur une page triviale et avec un profil isolé).
- Pages du PDF source **sans texte** (schémas/tableaux), à lire **comme images** quand la notion les
  concerne : 5, 13, 22, 26, 32, 33, 42, 44-50, 52-54.
