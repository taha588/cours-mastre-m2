# TASKS — Cours « Architectures de données modernes »

Critère général d'une notion Nxx : le fragment `cours/sections/Nxx-*.html` contient les **11 sections
4→14** dans l'ordre, §12 avec corrigés complets, §14 avec les 3 niveaux, et `python build/build.py` passe.

## T0 : Mise en place

- [x] T0.1 : SPEC.md, AGENTS.md, TASKS.md, PROGRESS.md, git init, config `.claude/` — Critère : les 4 fichiers existent, `git status` propre après commit
- [x] T0.2 : Couverture + squelette + `build/build.py` + `build/page.py` (SPEC §6) — Critère : `python build/build.py` produit le PDF et affiche son nombre de pages

## T1 : Fatiha (une seule fois)

- [x] T1.1 : §1 objectifs · §2 problème du réel · §3 préambule (SPEC §3, §4) — Critère : les 3 sections dans `02-fatiha.html`, build OK

## T2 : Fondations (pages 4-10)

- [x] T2.1 : N1 La donnée (p. 4) — 13 pages de PDF
- [x] T2.2 : N2 Structuré / semi-structuré / non structuré (p. 5-6, page-schéma) — 13 pages
- [x] T2.3 : N3 La gestion des données (p. 7) — 13 pages
- [x] T2.4 : N4 Pourquoi la gestion devient complexe (p. 8) — 13 pages
- [x] T2.5 : N5 L'architecture de données (p. 9) — 13 pages
- [x] T2.6 : N6 La grille des décisions de l'architecte (p. 10) — 13 pages — **partie 0 terminée**

## T3 : Évolution des architectures (pages 12-18)

- [x] T3.1 : N7 Les 7 contraintes et le découplage (p. 12) — 13 pages
- [x] T3.2 : N8 Principe d'évolution architecturale (p. 13-14, page-schéma) — 14 pages
- [x] T3.3 : N9 Architecture traditionnelle App → BD → Reporting (p. 15) — 13 pages
- [x] T3.4 : N10 Data Warehouse (p. 16) — 12 pages
- [x] T3.5 : N11 Data Lake (p. 17) — 12 pages
- [x] T3.6 : N12 Lakehouse (p. 18) — 12 pages — **partie I terminée**

## T4 : Centralisé vs distribué (pages 19-22)

- [x] T4.1 : N13 Architecture centralisée (p. 19-20) — 12 pages
- [x] T4.2 : N14 Architecture distribuée (p. 21) — 12 pages
- [x] T4.3 : N15 Scale-up vs scale-out (p. 22, page-schéma) — 11 pages — **partie II terminée**

## T5 : OLTP vs OLAP (pages 23-28)

- [x] T5.1 : N16 OLTP (p. 23-24) — 12 pages
- [x] T5.2 : N17 OLAP (p. 25) — 12 pages
- [x] T5.3 : N18 Complémentarité OLTP/OLAP + ETL (p. 26-27, page-schéma) — 13 pages
- [x] T5.4 : N19 Pourquoi séparer OLTP et OLAP (p. 28) — 12 pages — **partie III terminée**

## T6 : Batch vs Stream (pages 29-33)

- [x] T6.1 : N20 Batch processing (p. 29-30) — 13 pages
- [x] T6.2 : N21 Stream processing (p. 31) — 12 pages
- [x] T6.3 : N22 Critère de choix batch/stream + cas IoV (p. 32-33, pages-schémas) — 11 pages — **partie IV terminée**

## T7 : La donnée comme actif stratégique (pages 34-38)

- [x] T7.1 : N23 La donnée comme actif stratégique (p. 34-35) — 13 pages
- [x] T7.2 : N24 Volume ≠ valeur (p. 36) — 12 pages
- [x] T7.3 : N25 Qualité relative à l'usage (p. 37) — 11 pages
- [x] T7.4 : N26 Gouvernance / métadonnées / observabilité (p. 38) — 12 pages — **partie V terminée**

## T8 : Data-driven vs AI-driven (pages 39-42)

- [x] T8.1 : N27 Organisation data-driven (p. 39-40) — 11 pages
- [x] T8.2 : N28 Organisation AI-driven (p. 41) — 10 pages
- [x] T8.3 : N29 Du reporting à l'IA : exigences croissantes (p. 42, page-schéma) — 10 pages — **partie VI terminée**

## T9 : Architecture moderne de données (pages 43-50)

- [x] T9.1 : N30 Les 5 couches + couche transverse (p. 43-44, 50, pages-schémas) — 11 pages
- [x] T9.2 : N31 Sources (p. 45, page-schéma) — 9 pages
- [x] T9.3 : N32 Ingestion (p. 46, page-schéma) — 9 pages
- [x] T9.4 : N33 Storage (p. 47, page-schéma) — 9 pages
- [x] T9.5 : N34 Processing (p. 48, page-schéma) — 11 pages
- [x] T9.6 : N35 Analytics / AI (p. 49, page-schéma) — 10 pages — **partie VII terminée**

## T10 : Khatima et finalisation

- [x] T10.1 : §15 Problèmes du réel + corrigés — cas e-commerce, grille de décision, TD IoT/Edge (p. 51-56) — Critère : chaque problème a un corrigé détaillé — 4 problèmes, 11 pages
- [x] T10.2 : §16 Banque d'exercices 10 faciles / 10 moyens / 10 difficiles — Critère : 30 énoncés numérotés avec chips — 30 énoncés, 9 pages
- [x] T10.3 : §17 Corrigés des 30 exercices de §16 — Critère : 30 corrigés détaillés, en fin de document — 30 corrigés, 15 pages
- [x] T10.4 : §0 Sommaire avec numéros de pages réels + build final — Critère : chaque entrée du sommaire pointe la bonne page du PDF — 54 entrées vérifiées, 453 p.
- [x] T10.5 : Revue finale contre SPEC.md (§3 structure, §4 forme, §5 couverture des 35 notions) — Critère : les 35 notions ont leurs 11 sections, aucune section hors 0-17 — 0 écart (`build/revue.py`)

## T11 : Animation + vidéos expliquées (modèle Microservices/animation)

- [x] T11.1 : Page `animation/Archi_donnees_en_mouvement.html` — moteur copié, une carte canvas animée + narration par notion (N1-N19) — Critère : les 19 cartes s'animent et parlent dans le navigateur
- [x] T11.2 : Studio vidéo 1280×720 + `animation/outils-video/videos.py` (voix Rémy, sous-titres, « À retenir », ffmpeg) — Critère : vidéo N1 rendue, son synchronisé — n1.mp4 61,3 s, 13 phrases
- [x] T11.3 : Rendu des 18 autres vidéos + affiches — Critère : 19 MP4 vérifiés par images extraites — 19 MP4 (41-68 s) + 19 JPG
- [x] T11.4 : Bascule Vidéo expliquée / Animation par carte — Critère : chaque carte lit sa vidéo — 19 cartes, `fichiers/video.js`, mode mémorisé

## T12 : Animation + vidéos des parties IV-VII (N20-N35, même méthode que T11)

- [x] T12.1 : Partie IV — cartes N20-N22 (`fichiers/p4.js`, teinte blue, k-4) + narration + 3 vidéos/affiches — Critère : 22 cartes, 3 MP4 vérifiés — n20 63,5 s, n21 55,5 s, n22 57,5 s
- [x] T12.2 : Partie V — cartes N23-N26 (`p5.js`) + narration + 4 vidéos — Critère : 26 cartes, 4 MP4 vérifiés — n23 62,4 s, n24 52,3 s, n25 54,1 s, n26 58,0 s
- [x] T12.3 : Partie VI — cartes N27-N29 (`p6.js`) + narration + 3 vidéos — Critère : 29 cartes, 3 MP4 vérifiés — n27 72,8 s, n28 66,2 s, n29 65,0 s
- [x] T12.4 : Partie VII — cartes N30-N35 (`p7.js`) + narration + 6 vidéos — Critère : 35 cartes, 6 MP4 vérifiés, bascule OK — n30 68,7 s, n31 65,3 s, n32 71,6 s, n33 67,1 s, n34 69,5 s, n35 66,5 s

