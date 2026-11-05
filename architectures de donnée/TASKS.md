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

- [ ] T6.1 : N20 Batch processing (p. 29-30)
- [ ] T6.2 : N21 Stream processing (p. 31)
- [ ] T6.3 : N22 Critère de choix batch/stream + cas IoV (p. 32-33, pages-schémas)

## T7 : La donnée comme actif stratégique (pages 34-38)

- [ ] T7.1 : N23 La donnée comme actif stratégique (p. 34-35)
- [ ] T7.2 : N24 Volume ≠ valeur (p. 36)
- [ ] T7.3 : N25 Qualité relative à l'usage (p. 37)
- [ ] T7.4 : N26 Gouvernance / métadonnées / observabilité (p. 38)

## T8 : Data-driven vs AI-driven (pages 39-42)

- [ ] T8.1 : N27 Organisation data-driven (p. 39-40)
- [ ] T8.2 : N28 Organisation AI-driven (p. 41)
- [ ] T8.3 : N29 Du reporting à l'IA : exigences croissantes (p. 42, page-schéma)

## T9 : Architecture moderne de données (pages 43-50)

- [ ] T9.1 : N30 Les 5 couches + couche transverse (p. 43-44, 50, pages-schémas)
- [ ] T9.2 : N31 Sources (p. 45)
- [ ] T9.3 : N32 Ingestion (p. 46)
- [ ] T9.4 : N33 Storage (p. 47)
- [ ] T9.5 : N34 Processing (p. 48)
- [ ] T9.6 : N35 Analytics / AI (p. 49)

## T10 : Khatima et finalisation

- [ ] T10.1 : §15 Problèmes du réel + corrigés — cas e-commerce, grille de décision, TD IoT/Edge (p. 51-56) — Critère : chaque problème a un corrigé détaillé
- [ ] T10.2 : §16 Banque d'exercices 10 faciles / 10 moyens / 10 difficiles — Critère : 30 énoncés numérotés avec chips
- [ ] T10.3 : §17 Corrigés des 30 exercices de §16 — Critère : 30 corrigés détaillés, en fin de document
- [ ] T10.4 : §0 Sommaire avec numéros de pages réels + build final — Critère : chaque entrée du sommaire pointe la bonne page du PDF
- [ ] T10.5 : Revue finale contre SPEC.md (§3 structure, §4 forme, §5 couverture des 35 notions) — Critère : les 35 notions ont leurs 11 sections, aucune section hors 0-17
