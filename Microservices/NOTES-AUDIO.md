# Notes du cours oral (microservice.m4a, 80 min) — à intégrer en section 5 (Explication)
Transcription automatique de faible qualité : ne garder que ces points. N2, N3 et N4 déjà intégrés.

## N4 Monolithe modulaire (≈ 09:00–46:30) → T5.1
- « Il n'y a pas de noir et blanc, c'est le gris » : terrain intermédiaire entre monolithe et microservices.
- Ce qui ne change pas : un seul code, déploiement en une seule unité. Ce qui change : organisation en modules par capacité métier.
- Les modules peuvent être développés indépendamment par des équipes, mais communiquent via des interfaces.
- Ex. Commandes a besoin d'infos Produits : au lieu d'importer directement les classes, passer par une interface
  (comme une API REST est une interface) qui cache le fonctionnement interne ; le module ne sait pas « comment ça se passe dedans ».
- Frontières claires définies AVANT de développer : « ce que Commandes peut faire, ce que Produits peut faire ».
- Interfaces Java ou fonctions exposées, seul accès autorisé aux données d'un module.
- Ex. module Authentification isolé : comptes, connexion, changement de mot de passe — tout lui appartient.
- Équipes plus grandes (ex. groupes de 15) : chacune développe à sa façon et expose des points d'entrée aux autres.
- Analogie « Ahmed » : je demande une info à Ahmed, qui me renvoie vers un autre, qui me renvoie… = chaîne d'imports
  entre 5, 6, 10 modules quand l'application grandit ; les interfaces évitent cet enchevêtrement.
- Forte cohérence : une base, transactions atomiques ; garder les données cohérentes plutôt que tout emmêler,
  et faciliter une migration future (ex. mise à jour de version du framework module par module).
- Ex. Java : package « orders » ; une seule classe (DAO/repository) accède à la table des commandes (insert/update/delete) ;
  « passer une commande » réduit la quantité produit → passe par le module Produits, pas par sa table ;
  une classe service expose les informations aux autres classes sans montrer l'interne.

## N5 Microservices (≈ 46:30–80:10) → T6.1
- Mêmes modules, mais développés et déployés complètement indépendamment, en plusieurs unités ; chaque service = une capacité métier bien définie.
- Grandes équipes (50, 100 développeurs). Déploiement indépendant = caractéristique clé.
- Ex. : « vous avez un an pour toute l'application, mais le catalogue doit être opérationnel la semaine prochaine » → impossible en monolithe (tout ou rien).
- Communication : plus des appels de méthodes mais des API REST → il faut sécuriser, assainir les entrées, prévenir l'injection SQL.
- Massar (résultats du bac) : ne faire grossir que le service des résultats.
- Agnostique technologiquement : appli Java + service de recommandation IA en Python déployé à part, communication inter-services.
- Chaque service peut avoir sa propre base de données ; ex. paiement : le traitement carte bancaire est fait par le système bancaire, via communication entre services.
- API gateway = porte d'entrée de l'université ; sans elle, on entre dans les classes depuis la rue → un attaquant peut viser
  directement la base produits (requêtes visibles dans l'onglet réseau de l'appli mobile) ; la passerelle contrôle accès et rôles.
- Isolation des pannes : services sur serveur A, serveur B… ; on coupe l'électricité d'un serveur → l'application tourne encore, un seul module est arrêté.
- Module IA sur GPU : en microservices, seul ce service est hébergé sur un serveur GPU coûteux, le reste sur des serveurs ordinaires.
- Quand : grandes applis ; autonomie des équipes (100 devs) ; scalabilité indépendante (service IA/LLM grossi seul) ;
  flexibilité techno (l'un code en Python, l'autre en Dart) ; infrastructure mature → « 5 conditions » à vérifier.
- Ouverture : comment découper une application en microservices (frontières des services) = prochaine séance.
