## État actuel (5 lignes max, réécrit à chaque fin de tâche)

- Fait : PDF parties 0-VII complètes, 35 notions + §15-§17 + sommaire paginé (453 p.) ; T11 + T12.1-T12.3 : T12.4 : animation 35 cartes (vidéos N1-N35, parties 0-VII) + 19 vidéos (`animation/videos/`) + bascule Vidéo/Animation par carte (`fichiers/video.js`)
- En cours : —
- Problème : —
- Prochaine étape : T12 terminé — voir TASKS.md pour la suite

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
- Animation (T11) : modèle Microservices/animation copié — core.js, outils.js, voix.js inchangés ; start.js réécrit
  pour 4 parties (def.part 0-3, classes k-0..k-3) ; une carte par notion dans p0.js…p3.js, narration dans talk.js.
  Vérification : script Playwright qui rend chaque carte à 30/62/100 % en planches PNG (scratchpad)
- Vidéos (T11.2) : studio.html/videos.py copiés du modèle Microservices ; Playwright en Chromium (pas `channel='msedge'`) ;
  teinte d'en-tête par partie (plum/navy/green/gold) ; dans le JS inline du studio, pas d'apostrophe droite dans les
  chaînes françaises (utiliser ’). Cache MP3 edge-tts dans outils-video/cache (ignoré par git)
- Vérif vidéos (T11.3) : planche ffmpeg de 6 images (5→98 %) par MP4 + mosaïque des 19 affiches ; `videos.py all --affiche` ~ quelques minutes pour 19 cartes
- Bascule (T11.4) : `fichiers/video.js` copié du modèle Microservices, clé localStorage `archi-donnees-mode`, chargé après start.js ;
  mode vidéo par défaut, une seule vidéo à la fois, pause hors écran. Vérifié par Playwright (19 cartes, n19 lit 49 s)
- Partie IV (N20) : la p. 29 (« latence acceptable, pas moderne vs ancien ») est le chapeau de la partie, placé sous le h1 de N20 ;
  N20 annonce N21 (stream) et N22 (critère de choix) sans les traiter. Fil rouge enseigne : fenêtre de batch 23 h 30 → 6 h 30
- N21 : construit en miroir de N20 (latence sans accumulation, 4 qualités du batch « perdues ») ; fenêtres fixe/glissante,
  heure d'événement vs d'arrivée, délai de grâce, doublons, état. Fil rouge : chambre froide magasin 47, fraude 4 paiements/10 min,
  camions/tunnel. Le critère chiffré de choix (coût du retard vs latence) est seulement esquissé : à développer en N22
- N22 : tableau p. 32 reproduit en §4 ; critère = inégalité « temps de réaction exigé ≥ période + traitement » puis coût du retard
  vs surcoût ; micro-batch comme option intermédiaire ; IoV p. 33 = même donnée, deux usages (camions de l'enseigne, 160 év./min).
  Se termine par une boîte TRANSITION vers N23 (valeur d'une donnée selon l'usage)
- N23 : partie V ouverte (h1 + chapeau p. 34 en tête de N23). Définition p. 35 + 4 contributions (comprendre/décider/
  optimiser/innover, gradation) + 3 conditions de l'IMAGE p. 35 (disponibilité, confiance = qualité+gouvernance+sécurité,
  usage) en « et » multiplicatif ; justification par la chaîne donnée → information → décision → effet. N24/N25/N26 annoncées
  (volume, qualité, gouvernance) sans être traitées
- N24 : tableau défaut → effet des 5 causes (p. 36) + principe 4 facteurs (contexte/qualité/accès/usage) ; §8 relie chaque cause
  à un maillon de la chaîne N23 et montre que le volume ne répare rien (paires de sources, biais ≠ variance, fenêtre N20).
  Exos chiffrés : fidélité 1,2 M lignes / 18 % doublons ; tickets 95 % urbains (erreur rurale 63 %). Transition vers N25
- N25 : tableau BI/IA de la p. 37 en §4 ; §8 = aptitude à l'emploi + tableau 7 dimensions (exactitude…représentativité) par usage ;
  nettoyage/agrégation = transformations avec perte → garder le brut, une version par workload (annonce N30-N35). Exos : fraude
  1 M tx / 2 000 fraudes / nettoyage retire 1 500 (0,2 % → 0,05 %) ; catégories boissons 410 k → 800 k. Transition vers N26
- N26 : cartes + tableau p. 38 fusionnés en §4 ; §8 = 3 natures d'info (règles/description/mesures) + 5 signaux d'observabilité
  (fraîcheur, volume, schéma, distribution, lignage) ; rôles owner/steward. Exos : 5 incidents à classer ; pipeline 41 000/60 000
  lignes = 38 magasins, alerte 6 h 30 ; matrice d'accès 3 versions × 4 rôles. Transition de fin de partie V vers N27
- N27 : partie VI ouverte (h1 + chapeau p. 39). Boucle du support dashboard → baisse → causes → action ; tableau 4 niveaux
  d'analytique (descriptive/diagnostique = data-driven, prédictive/prescriptive annoncées N28). Fil rouge : Nord −12 %,
  tickets −1 %, panier −11,1 %, rupture petit électroménager 600 k → 60 k ; coût du retard 4 sem./1 sem./2 j ; effet mesuré
  contre les autres régions (−5 % saison). Exo 14.3 (25 000 réassorts/jour) sert de transition vers N28
- N28 : définition p. 41 + 5 verbes (prédire/recommander/classer/générer/automatiser) + 3 familles ; « également » = s'ajoute
  au data-driven, « certains processus » = pas tout. Tableau verbe → sortie → exemple → famille en §8 ; anomalie = classer ;
  humain = seuil + cas incertains. Exos : 25 000 réassorts × 30 s = 208,3 h → 27 acheteurs, 2 % incertains → 4,17 h ;
  fraude 200 000 paiements, 0,1 %, rappel 80 %, 1 % fausses alertes → 2 158 alertes, 7,4 %, 9 analystes, +234 600 DH/j.
  Exo 14.3 (exigences du modèle vs dashboard) = transition vers N29
- N29 : schéma p. 42 en tableau §4 (reporting → consolidées ; analytics → historique + qualité ; ML → features + labels +
  représentativité ; GenAI → corpus + contexte + sécurité) ; « explicites » = le contrôle humain implicite disparaît ; exigences
  cumulées. Exos : labels fraude 60 j (10 mois, 60 000 fraudes, 16,7 % mal étiquetées, 3 000 mobiles) ; corpus 1 200 docs dont
  180 obsolètes, 3 docs lus → 38,6 % ≈ 1 158 réponses/mois. Exo 14.3 (contrat de données → couches) = transition vers N30
- N30 : partie VII ouverte (h1 + chapeau rédigé, la p. 43 n'a qu'un titre). §4 = chaîne p. 44 + tableau vue complète p. 50 ;
  couche = une question (titres p. 45-49) ; §8 relie chaque couche aux parties I-VI + liaisons S×C vs S+C. Exos : 11 composants
  à ranger ; budget latence (dashboard prêt 4 h, fraude 750 ms, fraîcheur des features) ; 7 sources × 4 conso = 28 vs 11.
  N31-N35 ne doivent pas refaire la vue d'ensemble, seulement détailler leur couche
- N31 : 6 familles p. 45 (applications, IoT, API, logs, fichiers, open data) + 3 axes (format → storage N33, fréquence →
  ingestion N32, qualité → processing N34) ; source « se constate », API source ≠ ingestion API. Exos : 8 sources à classer ;
  capteurs 480 × 1 440 = 691 200 mesures/138 Mo vs caisses 1,2 Go ; CRM 400 000 fiches (15 % / 6 % / 2 %, 376 000, 84 %).
  Exo 14.3 (inventaire 7 sources → ingestion) = transition vers N32
- N32 : 3 modes p. 46 (batch / streaming / CDC-API) vus comme transport, pas traitement (N20-N22 déjà faits) ; déclencheur =
  horloge / événement / modification / requête ; objectif contexte (source, heure événement, schéma) + traçabilité (heure
  d'arrivée, lot, rejeu, idempotence). Exos : stocks ERP 2 M lignes, 48 Go/j complet vs 60 Mo CDC (×800), suppressions ;
  paiements 0,5 % doublons = 1 000 × 350 DH ; API transporteur 300 appels/h vs quota 250 ; magasin 47 hors réseau 2 h (480
  mesures). Transition vers N33 (où vit la donnée)
- N33 : 3 familles p. 47 (Operational DB / Warehouse / Lake-Lakehouse) + 4 critères (workload, coût, latence, cycle de vie) ;
  N10-N12/N16 non refaits, seulement le critère de choix ; tableau critère × famille en §8 (lignes vs colonnes, niveaux
  chaud/froid/archive, séparation stockage/calcul, formats ouverts). Exos : 6 données à placer ; tickets 1,2 Go/j sur 5 ans
  = 2 190 Go, 547,50 vs 116,94 DH/mois (×4,7) ; « tout dans PostgreSQL » (200 ms, 300 M lignes, photos). Transition vers N34
- N34 : 5 opérations p. 48 (nettoyage, transformation, enrichissement, agrégation, features) ; définition « rendre les données
  adaptées à un usage précis » ; ordre imposé par les dépendances, niveaux brut → conforme → prêt à l'usage ; transformation =
  sources internes, enrichissement = contexte/référentiel. Exos : 1 M tickets, 5 000 doublons, 991 020 lignes, jointure interne
  perd 8 920, 840 lignes agrégées, 1,5 M DH fictifs si on agrège avant ; features réassort 139 colonnes, fuite J+1.
  Exo 14.3 (3 sorties : dashboard, features, corpus → consommateur ?) = transition vers N35
- N35 : 4 consommateurs p. 49 (BI / Analytics / ML / GenAI) distingués par ce qu'ils produisent (chiffre, compréhension,
  sortie automatique, texte) ; principe « plusieurs / même socle / gouverné », seule la version prête à l'usage est propre
  à chacun ; prévision (Analytics) ≠ régression (ML) selon qui agit et l'échelle. Exos : 4 copies 8 760 Go = 2 190 DH/mois
  vs socle 2 418 Go = 604,50 DH (19 026 DH/an) ; CA 10 M DH, retours 3 % → écart 300 000 DH (définition non partagée) ;
  RAG 2 000 fiches dont 300 sensibles, 4 docs → 47,8 % → 14 340 réponses/j exposées. Exo 14.3 (SMS retour en stock,
  5 couches) = transition vers §15. **Partie VII terminée**
- §15 (T10.1) : fragment `Z15-problemes-reel.html` (préfixe Z = trié après N35 ; §16/§17 en Z16/Z17), h1 id="cloture",
  h2 id="k-s15". 4 problèmes b-domaine + b-solution : P1 e-commerce p. 52-54 (7 sources × 6 usages = 42 vs 13 liaisons,
  18 000 vs 4 300 Go → 4 500 vs 1 075 DH/mois, 41 100 DH/an) ; P2 grille p. 55 (87 Go/j, 31,8 To/an, ×1,35³ → 214 Go/j) ;
  P3 TD IoT p. 56 (40 sites × 500, 1 mesure/5 s, 200 o → 4 000 mes/s, 69,12 Go/j ; budget edge 0,35 s ; tampon 6 h = 432 Mo,
  rattrapage 5,8 min) ; P4 retour aux 3 demandes de §2. Ne pas réutiliser ces chiffres tels quels en §16
- §16 (T10.2) : `Z16-banque-exercices.html`, h2 id="k-s16", h3 k-s16-f/m/d, exos 16.1-16.30 ; cas nouveau TransVille (40 lignes,
  900 bus) + banque, hôpital, école en ligne, pharmacies. Réponses clés pour §17 : 16.11 pic 10+1=11 nœuds, hors pic 3+1=4,
  fixe 19 800 DH, élastique (20h×4+4h×11)/24=5,17 nœuds → 9 300 DH ; 16.12 225 M lignes vs 13 500 (×16 667) ; 16.13 fin 4 h 10
  (marge 1 h 50), an 1 : 266 min → 5 h 26 (34 min), an 2 : 372,4 min → 7 h 12 (dépassé) ; 16.14 a micro-batch (80 s), b batch
  (18 min), c flux, d batch nuit ; 16.15 fixes 3+3 pas d'alerte, glissante alerte à 10 h 12 (10:03,07,11,12), 10 h 07 tardive
  arrivée 10 h 14 > 10 h 12 → hors grâce, sur heure d'arrivée → fenêtre 2 ; 16.16 704 000 réels, 96 000×3,5=336 000 DH,
  35 200×3,5=123 200 DH ; 16.17 (3 000+1 000)/50 000=8 %, apte BI, urgences 7 000/46 000=15,2 % vs 20 % ; 16.18 150 h → 20
  agents, 15 h → 2 agents, verbe classer ; 16.19 5 475 Go, 2 190 DH vs 450×0,40+5 025×0,08=582 DH (×3,76) ; 16.20 48 Go/j vs
  10 Mo (×4 800) ; 16.23 240 000 tickets, 720 000 lignes/j, 394,56 M lignes vs 2 500×12×18=540 000 (×731) ; 16.24 90 msg/s,
  7 776 000/j, 1,1664 Go/j, 425,7 Go/an ; 16.26 1−0,8⁴=59,0 % → ≈ 1 771 réponses ; 16.28 45 vs 14 liaisons, 90 vs 28 j,
  correction 5 vs 1, 45 vs 9/an ; 16.29 1 940 000 réels, +60 000 (3,09 %), 360 000 DH/j, 131,4 M DH/an, fuite J ; 16.30 +6 pts
- §17 (T10.3) : `Z17-corriges.html`, h2 id="k-s17", h3 k-s17-f/m/d, 30 boîtes `b-solution long` « CORRIGÉ 16.x » + À retenir final ;
  15 pages. 16.27 conclut 6 sources × 4 usages = 24 vs 10 liaisons. Ancres à mettre au sommaire : cloture, k-s15, k-s16, k-s17
- Sommaire (T10.4) : `01-sommaire.html` généré depuis les h1/h2 (+ h3 k-s16-f/m/d), 54 lignes avec `<a href="#ancre">` ;
  build.py --toc lit d'abord les liens internes du PDF (nameddest → page exacte), repli sur la recherche de titre
  (sinon le titre trouvé en premier était celui du sommaire). Après tout ajout de contenu : `python build/build.py --toc`
- Revue finale (T10.5) : `python build/revue.py` contrôle les 35 notions (h3 §4→§14 exactement, boîtes par section selon
  SPEC §4, arabe en §5 et §11, 3 corrigés §12, 6 énoncés §13, chips 1/1/1 §14), couleurs en ligne, sections hors 0-17 :
  0 problème. Fatiha 1-3, §15 (4+4), §16 (30, chips 10/10/10), §17 (30), sommaire sans « ? », aucun lien cassé, aucune page vide
- Animation partie IV (T12.1) : `p4.js` (part: 4) ; ajout partout d'une partie = PARTS dans start.js (cls part-b, nav b),
  CSS .part-x / .k-N / nav a.x + légende + <script> dans la page, <script> + PARTIE + teinte() dans studio.html.
  Teintes prévues : IV blue, V red, VI plum, VII navy. talk.js : ajouter avant le `};` final (vérifier avec node).
  Vérif cartes : script Playwright avec `P.seen=true` avant scrollIntoView, sinon la lecture auto remet t à 0.
  ffmpeg pas dans le PATH bash : utiliser `imageio_ffmpeg.get_ffmpeg_exe()` comme videos.py
- Partie V (T12.2) : `p5.js` (part: 5, cls part-rd, nav rd, teinte red, k-5). Vérif cartes : `studio.html` + `window.shot` en
  phase 'main' (la phase 'intro' affiche la carte-titre par-dessus). Vidéos n23 62,4 s, n24 52,3 s, n25 54,1 s, n26 58,0 s ; un rendu
  dure ~3 min, lancer les 4 en arrière-plan (sinon dépassement des 10 min)
- Partie VI (T12.3) : `p6.js` (part: 6) ; plum déjà pris par la partie 0 → on réutilise cls part-d / nav d, seule la règle .k-6 est ajoutée.
  Helper HUM (personnage) défini en tête de p6.js. Dans start.js, apostrophe typographique ’ dans les intros (pas de '). Rendus n27-n29 en parallèle ~3 min
- Partie VII (T12.4) : `p7.js` (part: 7) réutilise cls part-r / nav '' (navy, comme la partie I) : aucune règle CSS .k-7 nécessaire. Helpers DOT et BAR en tête de p7.js.
  Vérif : `studio.html` + `window.shot` (phase main, t = 8/16/26) puis planche ffmpeg ; page : 35 cartes, 35 vidéos, 8 parties, n35 lit. Rendus n30-n35 en parallèle ~4 min
