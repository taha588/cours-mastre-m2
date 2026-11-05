# SPEC — Cours « MSOA 1 : Introduction aux architectures orientées microservices »
Sources : `MSOA 1 - Introduction.pptx` (44 slides, Pr. Zouheir Banou) ; `LAB1 - FOUNDATIONS.PDF` (4 cas)
Public : Master Big Data & Data Science. Langue : français.

## §1 Objectif
Produire un درس complet en PDF couleur, structure fixe du skill `construction-des-cours`
(sections 0→17, sections 4→14 répétées pour chaque notion), fidèle au contenu des slides.

## §2 Livrables
- `cours/cours.html` (source) → `cours/MSOA1-Introduction.pdf`
- Style : `cours/theme.css` (copie du skill), classes `.b-quoi .b-ou .b-comment .b-retenir .b-piege .b-domaine .b-note .b-app .b-solution`, chips facile/moyen/difficile. Aucune couleur inventée.
- Rendu : HTML + MathJax SVG → Edge headless → PDF ; vérif pages via PyMuPDF.

## §3 Structure (ne rien ajouter, ne rien omettre)
0 Table des matières (faite en dernier) · 1 Objectifs · 2 Problème réel · 3 Introduction
Pour chaque notion : 4 Règle · 5 Explication · 6 Problème résolu · 7 Utilité · 8 Origine/justification
· 9 Où · 10 Quand (+ indices) · 11 Comment (étapes) · 12 Exercices d'application corrigés (méthode du 11)
· 13 Exercices d'entraînement · 14 Exercices de difficulté croissante
Fin : 15 Problèmes réels + solutions détaillées · 16 Banque : 10 faciles, 10 moyens, 10 difficiles
· 17 Solutions détaillées de tous les exercices du 16 (en fin de cours).
« Explication détaillée » = au moins 2–3 phrases.

## §4 Notions (contenu des slides)
- N1 Motivations (slides 4–17) : 3 scénarios — multi-plateformes (1 backend + API ; défis : duplication,
  maintenance, incohérence, coûts), hétérogénéité technologique (Java/Spring + IA Python ; service séparé via HTTP ;
  défis : incompatibilité langage, intégration, dépendances de déploiement, maintenabilité), scalabilité indépendante
  (Black Friday, catalogue surchargé ; défis : gaspillage ressources, coûts, goulots, flexibilité).
  Historique : 1960s centralisé, 1980s client-serveur & monolithes, 1990s 3-tiers, 2000 SOA, 2010s microservices, 2020s cloud-native.
- N2 Monolithe (18–23, 27–31) : définition (une seule unité développée et déployée) ; caractéristiques (unité de
  déploiement unique, environnement d'exécution partagé, composants intégrés via appels directs, gestion centralisée) ;
  avantages (dév. simple, déploiement facile, tests simplifiés, communication efficace) ; limites (scalabilité limitée,
  complexité croissante, dépendances de déploiement, propagation des pannes) ; quand le choisir (petites applis, petites
  équipes, projets précoces, infra limitée, transactions atomiques fréquentes) ; signes qu'il devient difficile (complexité,
  redéploiement, scalabilité, contraintes techno, coordination des équipes).
- N3 Scalabilité (24–26) : définition ; vertical (scale up, + ressources d'un serveur) vs horizontal (scale out, plusieurs
  instances) ; tableau : implémentation, scalabilité (limite matérielle / ajout serveurs), coût, disponibilité (SPOF / redondance).
- N4 Monolithe modulaire (32–36) : modules bien définis, faiblement couplés, une seule unité déployable ; caractéristiques
  (organisation modulaire par capacité métier, déploiement unique, frontières claires via interfaces internes, communication
  in-process) ; quand (applis moyennes, exigences évolutives, forte cohérence, équipes petites/moyennes, déploiement simple,
  migration future).
- N5 Microservices (37–44) : collection de petits services faiblement couplés, déployables indépendamment, chacun une
  capacité métier ; principes (responsabilité unique, couplage faible, flexibilité techno, déploiement indépendant, scalabilité
  indépendante, communication API/messaging) ; comparaison monolithe vs microservices ; quand (grandes applis, autonomie
  des équipes, scalabilité indépendante, flexibilité techno, infra mature) ; comparaison des 3 approches ; question ouverte
  du découpage en services.

## §5 Exploitation du LAB 1
Cas 1 Bookstore (monolithe), Cas 2 Growing Retailer (monolithe modulaire), Cas 3 National Marketplace (microservices),
Cas 4 Regional Company (à défendre). Règle de défense : (a) architecture, (b) 3 faits du cas, (c) pourquoi pas les 2 autres,
(d) 1 inconvénient, (e) 1 déclencheur de révision. → utilisé en section 15 et pour inspirer exercices 12–16.
