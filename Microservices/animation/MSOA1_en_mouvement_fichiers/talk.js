/* Ce que dit le prof, carte par carte : explication simple (situation, problème, solution, point clé d'examen).
   t : [début, fin] de l'extrait d'animation joué pendant la phrase ; mark / lab : zone éclairée sur l'animation. */
var TALK = {

  /* ======================================================= Partie 1 : pourquoi les microservices ? */
  m1: [
    { t: [0, 3], say: "Premier scénario. Imaginez une boutique en ligne qui existe en quatre versions : un site web, une application Android, une application iPhone et même une application pour la télévision. Les quatre font exactement la même chose : afficher les produits, passer une commande, payer." },
    { t: [3, 6.5], mark: [160, 54, 146, 314], lab: 'la logique copiée', say: "Si chaque application contient sa propre logique métier, on écrit le même code quatre fois. Et le jour où une règle change, par exemple le calcul d'une réduction, il faut la corriger quatre fois, sans en oublier une. C'est lent, et c'est une source d'erreurs." },
    { t: [6.5, 9], mark: [448, 90, 252, 244], lab: 'le backend', say: "La solution : on sort la logique métier des applications, et on la met à un seul endroit, le backend. Les comptes, le catalogue, les commandes, le paiement : tout est centralisé là." },
    { t: [9, 16], say: "Ensuite, chaque application parle au backend à travers une API, une interface de programmation. L'application envoie une demande, le backend répond. Les applications ne s'occupent plus que de l'affichage." },
    { t: [16, 20], say: "À retenir : un seul backend, plusieurs applications, reliés par des API. C'est la première raison de découper une application : séparer la logique métier de l'interface." }
  ],

  m2: [
    { t: [0, 3], say: "Deuxième scénario. Notre application existe déjà, elle est écrite en Java avec Spring Boot. Elle contient le catalogue, les commandes et le paiement." },
    { t: [3, 7.5], mark: [140, 236, 340, 130], lab: 'le module IA', say: "On veut ajouter un module d'intelligence artificielle, par exemple pour recommander des produits. Problème : ce module est écrit en Python, le langage le plus utilisé en IA. On ne peut pas simplement le glisser dans un programme Java : les deux langages ne tournent pas dans le même environnement." },
    { t: [7.5, 11], mark: [432, 110, 268, 150], lab: 'un service à part', say: "La solution : on ne mélange pas. Le module IA devient un service indépendant, qui tourne dans son propre environnement Python, et qui expose ce qu'il sait faire à travers une API." },
    { t: [11, 17], say: "L'application Java lui envoie alors une requête, par le protocole HTTP, comme un navigateur qui demande une page. Le service IA calcule les recommandations et renvoie la réponse. Chacun garde sa technologie." },
    { t: [17, 20], say: "À retenir : quand deux technologies ne peuvent pas vivre dans le même programme, on en fait deux services qui dialoguent par une API." }
  ],

  m3: [
    { t: [0, 5], mark: [30, 92, 290, 56], lab: 'le catalogue', say: "Troisième scénario : le Black Friday. Ce jour-là, tout le monde regarde les produits. Le catalogue est saturé, à plus de quatre-vingt-dix pour cent, alors que le panier, le paiement et les comptes travaillent tranquillement." },
    { t: [5, 11], mark: [330, 52, 384, 316], lab: 'les copies', say: "Si l'application est un seul bloc, on ne peut pas renforcer uniquement le catalogue. On doit copier l'application entière, deux, trois fois. Le catalogue respire enfin, mais on a aussi copié le panier, le paiement et les comptes, qui n'en avaient pas besoin. On paie des serveurs pour rien." },
    { t: [11, 14], say: "La solution : diviser l'application en services indépendants. Un service pour le catalogue, un pour le panier, un pour le paiement, un pour les comptes." },
    { t: [14, 18.5], mark: [22, 60, 640, 120], lab: 'seul le catalogue grandit', say: "Maintenant, on peut lancer trois instances du catalogue, et seulement du catalogue. Sa charge redescend, et les autres services gardent leurs ressources habituelles." },
    { t: [18.5, 22], say: "À retenir : avec des services séparés, on donne des ressources uniquement là où il y a du trafic. Ces trois besoins, multi-plateformes, technologies différentes et scalabilité indépendante, mènent tous à la même idée : les microservices." }
  ],

  m4: [
    { t: [0, 4], say: "Les microservices ne sont pas une mode apparue d'un coup. Ils sont le résultat d'une longue évolution. Dans les années soixante, tout se passe sur un gros ordinateur central, le mainframe : les applications et les données sont au même endroit." },
    { t: [4, 7], say: "Dans les années quatre-vingt, arrive le modèle client-serveur : le client affiche, le serveur traite. Mais l'application côté serveur reste en général un seul bloc, un monolithe." },
    { t: [7, 10], say: "Dans les années quatre-vingt-dix, on sépare l'application en trois couches : la présentation, la logique métier et les données. C'est l'architecture trois-tiers." },
    { t: [10, 13], say: "Vers deux mille, la SOA, l'architecture orientée services, propose des services réutilisables, capables de communiquer entre applications différentes." },
    { t: [13, 16], say: "Dans les années deux mille dix, les microservices : de petits services, organisés par capacité métier, que l'on peut déployer chacun de son côté." },
    { t: [16, 19.5], say: "Et depuis les années deux mille vingt, le cloud-native : conteneurs, orchestration, serverless et déploiement automatisé. Vous voyez le fil rouge : à chaque étape, on sépare un peu plus les responsabilités." },
    { t: [19.5, 24], mark: [146, 324, 428, 72], lab: 'piège classique', say: "Attention au piège d'examen : SOA et microservices, ce n'est pas la même chose. La SOA cherche surtout la réutilisation et l'interopérabilité. Les microservices cherchent surtout le déploiement indépendant, service par service, organisé par capacité métier." }
  ],

  /* ======================================================= Partie 2 : les architectures */
  a1: [
    { t: [0, 3], say: "Commençons par l'architecture monolithique. Prenons notre boutique : l'interface, les modules Commandes, Produits, Paiements, Authentification, et l'accès aux données. Dans un monolithe, tout cela forme une seule application, avec une seule base de données." },
    { t: [3, 8], mark: [190, 50, 480, 150], lab: 'un seul paquet', say: "Première caractéristique : l'unité de déploiement unique. On fabrique un seul paquet, par exemple un fichier jar, et c'est ce paquet entier qu'on installe sur le serveur." },
    { t: [8, 12], say: "Deuxième caractéristique : l'environnement d'exécution partagé. Tous les modules tournent dans le même processus, comme les pièces d'une même maison." },
    { t: [12, 16.5], say: "Troisième caractéristique : les composants sont fortement intégrés. Quand Commandes a besoin de Produits, il l'appelle directement, comme on appelle une fonction. C'est rapide, il n'y a pas de réseau." },
    { t: [16.5, 22], mark: [20, 360, 680, 44], lab: 'gestion centralisée', say: "Quatrième caractéristique : la gestion centralisée. On construit, on teste et on déploie toujours le tout ensemble. À retenir : le mot clé du monolithe, c'est un. Un code, un processus, un paquet, un déploiement." }
  ],

  a2: [
    { t: [0, 4.5], say: "Le monolithe a de vrais avantages, mais chacun a une limite jumelle. D'abord, le développement est simple : tout est dans une seule application, facile à démarrer. Mais quand l'application grandit, le code devient de plus en plus difficile à comprendre et à modifier." },
    { t: [4.5, 9], say: "Ensuite, le déploiement est facile : un seul paquet. Mais justement, pour corriger une petite chose dans le paiement, il faut reconstruire et redéployer toute l'application." },
    { t: [9, 13.5], say: "Troisième paire : la communication est efficace, les modules s'appellent directement, sans passer par le réseau. Mais ils sont tellement liés qu'une panne dans un module peut faire tomber toute l'application." },
    { t: [13.5, 18], say: "Quatrième paire : les tests sont simplifiés, on teste tout dans un même environnement. Mais pour supporter plus de charge, on ne peut faire grossir que le bloc entier, pas un module seul." },
    { t: [18, 24], mark: [60, 324, 600, 92], lab: 'la taille décide', say: "Alors, bon ou mauvais ? Ni l'un ni l'autre. Pour une petite application, une petite équipe, un projet qui démarre, les avantages dominent : le monolithe est le bon choix. Quand l'application grandit, les limites prennent le dessus." }
  ],

  a3: [
    { t: [0, 3], say: "La scalabilité, c'est la capacité d'un système à supporter de plus en plus de charge, en lui donnant plus de ressources. Ici, un seul serveur : plus il y a d'utilisateurs, plus le processeur chauffe." },
    { t: [3, 6.5], say: "Première façon de grandir : la scalabilité verticale, en anglais scale up. On garde la même machine, mais on la rend plus puissante : plus de processeurs, plus de mémoire. La charge redescend. C'est simple, l'application ne change pas." },
    { t: [6.5, 9.5], mark: [170, 78, 300, 280], lab: 'le plafond', say: "Mais il y a un plafond : une machine ne peut pas grossir à l'infini, c'est la limite matérielle. Et plus on monte en gamme, plus le matériel coûte cher." },
    { t: [9.5, 13], say: "Et surtout, il n'y a toujours qu'un seul serveur. S'il tombe en panne, tout le service s'arrête. On appelle cela un point unique de défaillance, en anglais SPOF." },
    { t: [13, 17], say: "Deuxième façon : la scalabilité horizontale, ou scale out. Au lieu d'une grosse machine, on en met plusieurs, et un répartiteur de charge, le load balancer, distribue les requêtes entre elles." },
    { t: [17, 20], say: "Besoin de plus de capacité ? On ajoute simplement des serveurs, souvent des machines ordinaires et abordables." },
    { t: [20, 24], say: "Et si un serveur tombe, les autres continuent de répondre : c'est la redondance, elle améliore la disponibilité. En échange, il faut configurer le répartiteur et coordonner les données partagées entre les copies." },
    { t: [24, 27], say: "En résumé : la verticale est simple, mais limitée, chère, et c'est un point unique de défaillance. L'horizontale est extensible et redondante, mais plus complexe à mettre en place. Attention : sur un monolithe, dans les deux cas, on fait grossir l'application entière." }
  ],

  a4: [
    { t: [0, 6], mark: [50, 80, 620, 250], lab: 'tout s\'appelle', say: "Quand une application grandit sans règles, les modules s'appellent les uns les autres dans tous les sens. C'est comme demander une information à Ahmed, qui vous renvoie vers un autre, qui vous renvoie vers un troisième. Plus personne ne sait qui dépend de qui." },
    { t: [6, 11], say: "Le monolithe modulaire met de l'ordre. Chaque capacité métier devient un module bien délimité : Commandes, Produits, Paiements, Authentification. Et chaque module a une porte d'entrée, son interface. C'est le seul moyen de lui parler." },
    { t: [11, 15], say: "Exemple vu en cours : quand on passe une commande, il faut diminuer le stock du produit. Le module Commandes appelle donc l'interface du module Produits, par exemple la méthode réserver stock. Il ne sait pas comment Produits fait à l'intérieur, et il n'a pas besoin de le savoir." },
    { t: [15, 19], say: "Ce qui est interdit : que Commandes aille lire ou modifier directement la table des produits. Seul le module Produits a le droit de toucher à sa table." },
    { t: [19, 24], mark: [20, 362, 680, 44], lab: 'toujours un bloc', say: "Attention, point d'examen : malgré ce rangement, c'est toujours un monolithe. Un seul processus, un seul paquet, un seul déploiement. Le monolithe modulaire est un terrain intermédiaire, idéal pour une application de taille moyenne, et il prépare une migration future vers les microservices." }
  ],

  a5: [
    { t: [0, 3], say: "On reprend les modules du monolithe modulaire, et on va jusqu'au bout de la séparation." },
    { t: [3, 8], say: "Chaque module devient un programme à part entière : un service, avec sa propre base de données. Il est développé, déployé et exécuté indépendamment, souvent sur sa propre machine. L'application n'est plus une unité de déploiement, mais plusieurs." },
    { t: [8, 13], mark: [30, 50, 320, 100], lab: 'Produits seul', say: "La caractéristique clé, c'est le déploiement indépendant. Exemple du cours : vous avez un an pour livrer l'application, mais le catalogue doit être en ligne la semaine prochaine. En monolithe, c'est tout ou rien. En microservices, on met en production le service Produits seul, et les autres suivront quand ils seront prêts." },
    { t: [13, 16.5], say: "La communication change de nature. Les services ne s'appellent plus par des méthodes dans le même processus, mais par le réseau. Par exemple, Commandes envoie une requête HTTP à l'API du service Produits." },
    { t: [16.5, 21], say: "Ils peuvent aussi communiquer par messagerie. Commandes publie un événement, commande créée, sur un bus de messages, et le service Paiements, qui l'écoute, réagit." },
    { t: [21, 26], say: "Conséquence importante : chaque service est maintenant une porte ouverte sur le réseau. Il faut le sécuriser, valider les données qu'il reçoit, et prévenir les attaques comme l'injection SQL. C'est le prix des microservices : la complexité d'un système distribué." }
  ],

  a6: [
    { t: [0, 4.5], say: "Les microservices reposent sur six principes. Un : la responsabilité unique, chaque service s'occupe d'une seule capacité métier. Deux : le couplage faible, les services dépendent le moins possible les uns des autres." },
    { t: [4.5, 8.5], say: "Trois : la flexibilité technologique, chaque service peut utiliser le langage le plus adapté. Quatre : le déploiement indépendant, on met à jour un service sans redéployer les autres." },
    { t: [8.5, 13], say: "Cinq : la scalabilité indépendante, chaque service grandit selon sa propre demande, comme le service des résultats de Massar le jour du bac. Six : la communication par des interfaces bien définies, des API ou de la messagerie." },
    { t: [13, 17], say: "Mais attention, ce n'est pas gratuit : on passe d'un programme à un système distribué, avec du réseau, de la sécurité et de la coordination à gérer." },
    { t: [17, 26], mark: [60, 236, 600, 130], lab: 'choisir selon la taille', say: "Alors, comment choisir ? Pour une petite application et une petite équipe, le monolithe. Pour une application de taille moyenne, qui évolue, le monolithe modulaire. Pour une grande application, avec des équipes autonomes et une infrastructure mature, les microservices. Il n'y a pas de bonne architecture en soi : il y a celle qui convient au contexte." }
  ]
};
