# Projet : Cours MSOA 1 — درس PDF « Introduction aux architectures microservices »
## Référence
- Spécification : SPEC.md (lire seulement la section utile)
- Méthode du cours : skill `construction-des-cours` (structure 0→17, rien ajouter/omettre)
- Sources originales (ne relire qu'une slide/page précise si un détail manque) :
  `MSOA 1 - Introduction.pptx`, `LAB1 - FOUNDATIONS.PDF`
## Carte
- NOTES-AUDIO.md → points du cours oral à intégrer (N4, N5) en section 5
- cours/cours.html → source unique du cours (sections ajoutées tâche par tâche)
- cours/theme.css  → style du skill (ne pas inventer de couleurs)
- cours/MSOA1-Introduction.pdf → rendu final (tâche T10)
## Commandes
- PDF : Edge headless `--print-to-pdf` sur cours/cours.html
- Vérif : python -c "import fitz;print(fitz.open('cours/MSOA1-Introduction.pdf').page_count)"
## Règles
- Début de session : lire PROGRESS.md et TASKS.md
- PROGRESS.md : « En cours : <tâche> » au début, « En cours : — » à la clôture
- Cours rédigé en français ; échanges avec l'utilisateur en darija, messages courts
- Fidélité aux slides ; cas du LAB utilisés en section 15 et comme inspiration d'exercices
- Chaque exercice corrigé l'est entièrement ; « détaillé » = 2–3 phrases minimum
- Lire des passages de cours.html (grep), pas le fichier entier
- Pas de git : pas de commit
