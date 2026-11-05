# Traitement de données en temps réel — Chapitre 0

Support de révision personnel pour le module **Traitement de données en temps réel**
(Master Data Science & Big Data · S3 · Parcours Big Data — Faculté des Sciences
Ben M'Sick, Université Hassan II de Casablanca).

Ce dépôt contient le **chapitre 0 — Notions de base** retravaillé en cours complet :
le vocabulaire et les idées simples dont on a besoin avant de parler de flux —
donnée, événement, serveur, réseau, message, temps, système distribué, Docker.

## Ce qu'il y a dedans

| Fichier | Quoi |
|---|---|
| [`Cours_Chapitre0_Notions_de_base.pdf`](Cours_Chapitre0_Notions_de_base.pdf) | Le cours complet, 135 pages, à lire ou à imprimer |
| [`cours-ch0-temps-reel.html`](cours-ch0-temps-reel.html) | Le même cours en page web, avec les 8 animations intégrées |
| [`animations-ch0.html`](animations-ch0.html) | Les 8 animations seules, une par écran, pour projeter en cours |

> Les deux fichiers HTML sont autonomes : il suffit de les ouvrir dans un
> navigateur. Les animations ne tournent pas dans les aperçus qui rendent les
> fichiers locaux en image statique.

## Structure du cours

Le cours suit un plan fixe en 18 sections.

**Ouverture** — sommaire, objectifs, un problème du réel (la seconde de Salma),
introduction.

**Quatorze notions**, chacune traitée en onze sections : la règle, son
explication et ses pièges, le problème qu'elle traite, son utilité, son origine,
où l'utiliser, quand l'utiliser, comment l'utiliser, des applications corrigées,
des exercices d'entraînement, des exercices de difficulté croissante.

1. Le traitement en temps réel
2. Le traitement par lots et le traitement en flux
3. La donnée
4. Où ranger les données : fichier, base, entrepôt, lac
5. La requête bornée et la requête continue
6. Le client et le serveur
7. Le réseau
8. Le message JSON, ou l'événement
9. La paire clé–valeur
10. L'horodatage et les unités de temps
11. Heure d'événement et heure de traitement
12. Le système distribué et le cluster
13. Le conteneur Docker
14. Le générateur Python

**Fin du cours** — trois problèmes du réel résolus (monétique, maintenance
industrielle, trottinettes en libre-service), une banque de 30 exercices
(10 faciles, 10 moyens, 10 difficiles) et leur corrigé détaillé.

## Les huit animations

| # | Notion | Ce qu'elle montre |
|---|---|---|
| 1 | N1 | Un paiement traverse terminal → réseau → banque → décision, latence comparée au délai utile |
| 2 | N2 | Les mêmes événements en batch et en flux, l'écart de latence qui se creuse |
| 3 | N6 | L'initiative part du client, les demandes s'empilent dans la file du serveur |
| 4 | N7 | Retards, pertes et doublons sur un réseau partagé |
| 5 | N9 | Une clé retombe toujours dans le même casier (partitionnement) |
| 6 | N11 | Heure d'événement et heure de traitement, et leurs croisements |
| 7 | N12 | La charge répartie sur un cluster, et ce qui arrive quand une machine tombe |
| 8 | N14 | Un générateur Python qui se met en pause sur `yield` |

## Reconstruire le PDF

Le PDF est produit à partir de `cours-ch0-temps-reel.html`, transformé au thème
d'impression puis rendu par Edge en mode headless.

```bash
python tools/build_pdf.py
```

Il faut Python avec `beautifulsoup4`, `lxml` et `PyMuPDF`, et Microsoft Edge
installé. Le script fait deux passes : une première pour relever la page de
chaque titre, une seconde pour écrire les numéros dans le sommaire, puis il
estampille les numéros de page.

Pour régénérer la page d'animations à partir du cours :

```bash
python tools/build_anim.py
```

| Dans `tools/` | Rôle |
|---|---|
| `build_pdf.py` | Transformation vers le thème d'impression et rendu PDF |
| `build_anim.py` | Extraction des 8 animations vers une page autonome |
| `print-figures.html` | Les 8 figures redessinées en statique pour le PDF |
| `theme.css` | Thème d'impression « Quoi ? Où ? Comment ? » |

## Crédits

Contenu construit à partir du cours de **Pr. Hafsa OUCHRA** (chapitre 0 —
Notion de base, année universitaire 2026–2027). Le support original de la
professeure n'est pas redistribué ici.

Document de travail personnel, sans valeur officielle : en cas de divergence,
le cours de la professeure fait foi.
