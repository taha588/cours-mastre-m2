## État actuel (5 lignes max, réécrit à chaque fin de tâche)
- Fait : T0→T9 (sections 1–17) ; T10.1 Section 0 (TOC 77 entrées, n° de pages via liens PDF) + PDF final 101 p. avec numérotation ; T11.1 studio vidéo ; T11.2 videos.py (m1.mp4 73,6 s, 13 phrases, voix Rémy synchronisée) ; T11.3 10 MP4 + affiches (animation/videos, 63–104 s, 1280×720, son AAC) vérifiés par planche ; T11.4 bascule Vidéo expliquée / Animation (video.js, 10 vidéos lues)
- En cours : —
- Prochaine étape : aucune tâche restante (T0→T11 faites)
## Décisions
- Audio (microservice.m4a) : transcrit ; ajouts faits en N2, N3, N4 (section 5) ; N5 intégré en T6.1 (tous les points audio traités)
- Mise en page : .box.long (grandes boîtes sécables) pour sections 4→11 ; exercices numérotés « N.k »
- Cours en français, PDF couleur (modèle Quoi ? Où ? Comment ?), mode complet, sans git
- 5 notions : Motivations, Monolithe, Scalabilité, Monolithe modulaire, Microservices
- Section 15 = cas 1–4 du LAB 1 ; source unique cours/cours.html, ajoutée tâche par tâche

- PDF : 2 passes Edge headless (TOC puis n° de pages résolus), pagination ajoutée via PyMuPDF (script scratchpad build.py)
- Animation : animation/MSOA1_en_mouvement.html (modèle « Continuité en mouvement » : 10 cartes canvas + narration voix du navigateur, moteur core.js/voix.js copié) ; video.js : mode par défaut Vidéo (mémorisé localStorage), la narration passe la carte en Animation
