/* Ce que dit le prof, carte par carte : explication simple, phrase par phrase.
   t : [début, fin] de l'extrait d'animation joué pendant la phrase ; mark / lab : zone éclairée sur l'animation. */
var TALK = {

  /* ======================================================= Partie 0 : les fondations */
  n1: [
    { t: [0, 3], mark: [30, 120, 190, 130], lab: 'une donnée brute', say: "Commençons par la base : qu'est-ce qu'une donnée ? C'est un fait, une observation, un chiffre, un mot, qu'on peut collecter et exploiter. Par exemple, le nombre mille deux cents. Tout seul, il ne dit rien." },
    { t: [3, 9], say: "Pour qu'il vaille quelque chose, il faut d'abord qu'il soit compris : c'est le solde d'un compte, en dirhams. Puis contextualisé : c'est le client C zéro zéro un, Ahmed, en deux mille vingt-quatre." },
    { t: [9, 14], say: "Il faut aussi qu'il soit accessible au moment où le conseiller en a besoin, et utilisé correctement, pour un usage légitime, comme décider d'un crédit. Là, la valeur est pleine." },
    { t: [14, 18.5], mark: [280, 188, 410, 60], lab: 'la condition qui manque', say: "Maintenant, supprimons une seule condition : la donnée existe, mais personne n'y a accès à temps. La valeur tombe presque à zéro. Avoir beaucoup de données n'y change rien." },
    { t: [18.5, 22], say: "À retenir : les quatre conditions se cumulent. Et la condition qui manque, c'est exactement le chantier que l'architecte doit ouvrir." }
  ],
  n2: [
    { t: [0, 5], mark: [20, 20, 210, 300], lab: 'schéma avant', say: "Les données se rangent en trois familles. La différence, c'est l'endroit où se trouve le schéma, c'est-à-dire la description des champs. Dans les données structurées, le schéma est posé avant : des colonnes, des types, puis les lignes, comme la table des clients Ahmed, Sara et Youssef." },
    { t: [5, 10], mark: [256, 20, 210, 300], lab: 'schéma avec', say: "Dans les données semi-structurées, comme le JSON, le XML ou les logs, le schéma voyage avec la donnée : chaque enregistrement porte ses propres clés. Et deux enregistrements peuvent être différents : ici, un client a des tags, l'autre non." },
    { t: [10, 14.5], mark: [492, 20, 210, 300], lab: 'pas de schéma', say: "Dans les données non structurées, une image, un enregistrement audio, un avis client en texte libre, il n'y a pas de schéma du tout." },
    { t: [14.5, 19], say: "Pour s'en servir, il faut extraire le sens, par exemple détecter qu'un avis est négatif. C'est un vrai traitement en plus." },
    { t: [19, 23], say: "À retenir : ce n'est pas le format qui distingue les familles, c'est la position du schéma. Avant la donnée, avec elle, ou nulle part." }
  ],
  n3: [
    { t: [0, 3], say: "Gérer les données, c'est les collecter, les traiter et les utiliser de façon sécurisée et efficace, pour améliorer les résultats de l'entreprise. Concrètement, cela fait cinq missions." },
    { t: [3, 9], say: "Première mission : collecter et intégrer des sources diverses, un CRM, des capteurs, des fichiers. Deuxième : stocker les données, en choisissant le stockage selon l'usage qu'on en fera." },
    { t: [9, 14], mark: [110, 250, 400, 76], lab: 'sur tout le trajet', say: "Troisième et quatrième missions : gouverner et sécuriser, c'est-à-dire contrôler qui accède à quoi, et suivre le cycle de vie des données, d'où elles viennent, ce qu'elles deviennent. Ces deux missions couvrent tout le trajet." },
    { t: [14, 19.5], say: "Cinquième mission : fournir des données utilisables aux métiers, aux analystes, aux data scientists et aux ingénieurs IA." },
    { t: [19.5, 24], say: "À retenir : cinq missions, sécurisées et efficaces à la fois. Et le juge final, ce sont les résultats de l'entreprise, pas la technique." }
  ],
  n4: [
    { t: [0, 4], mark: [20, 20, 330, 124], lab: 'volume', say: "Pourquoi gérer les données devient-il si compliqué ? Quatre causes. La première, le volume : on est passé des mégaoctets aux gigaoctets, puis aux téraoctets, et même aux pétaoctets." },
    { t: [4, 8], mark: [370, 20, 330, 124], lab: 'silos', say: "Deuxième cause, les silos : le CRM, le site e-commerce, le support, chacun garde ses données dans son propre système. Impossible d'avoir une vue unifiée du client." },
    { t: [8, 12], say: "Troisième cause, les formats : des tables, mais aussi des PDF, des images, des vidéos, de l'audio, des logs. Chacun demande ses propres outils." },
    { t: [12, 15.5], say: "Quatrième cause, l'intelligence artificielle : elle exige des données de qualité, représentatives, et avec leur contexte." },
    { t: [15.5, 19], say: "Le piège, c'est que ces causes ne s'additionnent pas, elles se multiplient. Plus de volume, dans plus de silos, dans plus de formats, pour l'IA : chaque cause aggrave les autres." },
    { t: [19, 25], mark: [20, 300, 680, 100], lab: 'le socle', say: "La réponse n'est donc pas un outil de plus. C'est un socle, où les données sont stockées, intégrées, gouvernées, transformées et préparées pour leurs usages." }
  ],
  n5: [
    { t: [0, 7], say: "Une architecture de données décrit comment les données sont gérées, de leur collecte jusqu'à leur consommation. Le chemin a cinq étapes : la collecte depuis les sources, l'ingestion, le stockage, le traitement, et enfin la consommation par la BI, le machine learning ou les applications." },
    { t: [7, 11], say: "Les données circulent le long de ce chemin, en lots ou en temps réel." },
    { t: [11, 17.5], say: "Pour l'architecte, cela veut dire organiser sept objets : les composants, les flux, les responsabilités, les stockages, les traitements, les interfaces et les contraintes." },
    { t: [17.5, 24], mark: [110, 300, 600, 70], lab: 'partir des usages', say: "Et tout cela se décide à partir des usages. On ne construit pas un chemin pour lui-même : on part de ce que les utilisateurs doivent obtenir, et on remonte." }
  ],
  n6: [
    { t: [0, 9], say: "Concevoir une architecture, c'est répondre à huit questions. Où arrivent les données ? Où les conserver ? Comment les déplacer, en lots, en flux, ou par capture des changements ? Où les transformer ? Qui va les consommer ? Quelle fraîcheur ? Qui peut y accéder ? Et comment vérifier leur état ?" },
    { t: [9, 11], say: "Attention : on ne remplit pas cette grille de haut en bas." },
    { t: [11, 16], mark: [30, 218, 676, 80], lab: 'on commence ici', say: "On commence par les usages : qui consomme, et avec quelle fraîcheur. Un tableau de bord mis à jour chaque matin, ce n'est pas une alerte de fraude en temps réel." },
    { t: [16, 21], say: "Puis on remonte : d'où viennent les données, comment les déplacer, où les transformer, où les stocker." },
    { t: [21, 26], say: "Enfin, les questions transverses, qui touchent tout le trajet : la sécurité et la qualité. À retenir : cinq questions de lieu, trois transverses, et huit compromis à écrire." }
  ],

  /* ======================================================= Partie I : l'évolution des architectures */
  n7: [
    { t: [0, 7], say: "Au fil du temps, sept contraintes ont augmenté : le volume, la variété des formats, la vitesse, la distribution sur plusieurs sites, la complexité, la gouvernance, et l'IA." },
    { t: [7, 10], mark: [256, 54, 200, 150], lab: 'couplé', say: "Regardez un système couplé, où tout est collé. Le volume grandit dans l'ingestion." },
    { t: [10, 15], say: "Résultat : c'est le reporting, à côté, qui tombe en panne. Dans un système couplé, la croissance d'une contrainte se transmet aux autres parties." },
    { t: [15, 22], mark: [470, 50, 240, 150], lab: 'découplé', say: "Dans un système découplé, chaque bloc est derrière une interface. Quand le volume grandit, seule l'ingestion grossit, et le reste continue à fonctionner." },
    { t: [22, 25], say: "D'où la loi du cours : plus les contraintes augmentent, plus l'architecture doit découpler ses composants et ses responsabilités. Mais découpler coûte : on le fait là où ça croît." }
  ],
  n8: [
    { t: [0, 10], say: "Comment les architectures évoluent-elles ? Pas en remplaçant une vieille technologie par une nouvelle. Un nouveau besoin apparaît, par exemple analyser l'historique des ventes. Il crée une nouvelle contrainte. Et on y répond par un choix architectural : des composants, des flux, et des compromis." },
    { t: [10, 16], say: "Dans les années quatre-vingt, les systèmes opérationnels gèrent les transactions. Dans les années quatre-vingt-dix, le Data Warehouse répond au besoin d'analyse. Puis le Big Data répond à l'explosion du volume." },
    { t: [16, 21], say: "Le Data Lake répond à la variété des formats, le Cloud aux coûts et à l'élasticité, le Lakehouse à la complexité d'avoir à la fois un lac et un entrepôt. Et aujourd'hui, l'enjeu, ce sont des données prêtes pour l'IA." },
    { t: [21, 27], say: "À retenir : les générations s'empilent, on ne jette rien. Et la réponse de chacune crée le problème de la suivante." }
  ],
  n9: [
    { t: [0, 5], say: "L'architecture traditionnelle, c'est trois blocs. D'abord les applications métier, le CRM, l'ERP, le site e-commerce, qui écrivent sans arrêt : des insertions, des mises à jour, des suppressions." },
    { t: [5, 9], say: "Ces données vont dans une base transactionnelle, dite OLTP, qui garantit qu'elles restent intègres et cohérentes." },
    { t: [9, 13], say: "Et le reporting vient lire directement cette même base, par des requêtes SQL, pour produire des indicateurs. C'est simple, et tout le monde voit les mêmes chiffres." },
    { t: [13, 20], mark: [20, 40, 460, 270], lab: 'tout ralentit', say: "Mais un jour, quelqu'un lance un gros rapport annuel. La base sature, et les applications ralentissent : les clients attendent pour passer leur commande." },
    { t: [20, 24], say: "La limite est là : un seul composant pour deux charges opposées, écrire vite d'un côté, lire beaucoup de l'autre. C'est ce qui va mener au Data Warehouse." }
  ],
  n10: [
    { t: [0, 7], say: "Le Data Warehouse est une plateforme analytique pour des données structurées, préparées pour les rapports. Les systèmes opérationnels lui envoient leurs ventes, et un pipeline les nettoie et les agrège avant de les charger." },
    { t: [7, 12], say: "Les ventes sont rangées selon des axes choisis à l'avance : le jour, le produit, le magasin, la région. On appelle cela des dimensions." },
    { t: [12, 16.5], say: "Résultat : les indicateurs tombent presque instantanément, parce que le calcul a déjà été fait au moment du chargement." },
    { t: [16.5, 21], mark: [550, 240, 160, 110], lab: 'question imprévue', say: "Mais un responsable demande : quelles sont les ventes par heure ? Impossible, le grain choisi est le jour. Le détail horaire a été perdu à l'agrégation." },
    { t: [21, 25], say: "À retenir : le Data Warehouse déplace le calcul de la lecture vers l'écriture. Il est rapide et cohérent, mais rigide, car préparer, c'est choisir les questions à l'avance." }
  ],
  n11: [
    { t: [0, 8.5], say: "Le Data Lake stocke à grande échelle des données de toutes sortes : des logs, du JSON venant de capteurs, des images, des fichiers CSV, des documents. Il les garde brutes, sans imposer de schéma, pour des usages futurs." },
    { t: [8.5, 12.5], mark: [550, 70, 160, 140], lab: 'le calcul à part', say: "Le calcul est séparé du stockage : on vient lire et interpréter les données seulement au moment où on en a besoin." },
    { t: [12.5, 17.5], say: "Le danger : si personne ne décrit ce qu'on y dépose, au bout de quelques mois, plus personne ne sait ce que contient le lac. Il devient un marécage, un data swamp." },
    { t: [17.5, 25], mark: [530, 260, 190, 114], lab: 'les métadonnées', say: "La solution, c'est un catalogue de métadonnées et une gouvernance : la source, la date, le format, le propriétaire de chaque donnée. À retenir : le lac stocke d'abord et interprète ensuite, et sans discipline, le marécage est le résultat par défaut." }
  ],
  n12: [
    { t: [0, 9], say: "Beaucoup d'entreprises ont fini avec un Data Lake et un Data Warehouse côte à côte. Les données sont copiées de l'un vers l'autre : cela coûte cher, et les deux versions ne sont jamais tout à fait à jour." },
    { t: [9, 16], mark: [110, 170, 500, 160], lab: 'un seul socle', say: "Le Lakehouse propose autre chose : un seul stockage, flexible et à grande échelle comme un lac, sur lequel on ajoute une couche de garanties, comme dans un entrepôt : des transactions, un schéma, de la gouvernance." },
    { t: [16, 20], say: "La BI, l'analytique et le machine learning lisent alors le même socle de données." },
    { t: [20, 24], say: "À retenir : au lieu de déplacer les données vers les garanties, le Lakehouse apporte les garanties là où sont les données. Moins de copies, un socle commun." }
  ],

  /* ======================================================= Partie II : centralisé ou distribué */
  n13: [
    { t: [0, 4], say: "Dans une architecture centralisée, les données ou les traitements sont regroupés dans une plateforme centrale. Par exemple, un entrepôt unique alimenté par toutes les applications de l'entreprise." },
    { t: [4, 9.5], say: "Les atouts sont clairs : un seul endroit à contrôler, des chiffres cohérents pour tout le monde, et une administration simple." },
    { t: [9.5, 14.5], mark: [150, 300, 200, 70], lab: 'la file d\'attente', say: "Mais quand les demandes se multiplient, tout passe par le même point. Une file d'attente se forme, et la charge monte." },
    { t: [14.5, 19], say: "Le centre devient alors un goulot d'étranglement : c'est la question à se poser pour toute architecture centralisée." },
    { t: [19, 24], say: "À retenir : la force et la limite viennent du même fait, il n'y a qu'un seul endroit. On vérifie par la mesure si le centre est devenu un goulot." }
  ],
  n14: [
    { t: [0, 8], say: "Dans une architecture distribuée, le stockage ou le calcul est réparti sur plusieurs nœuds. Ici, un traitement d'un téraoctet est découpé en quatre parts, et quatre machines travaillent en parallèle." },
    { t: [8, 13], mark: [320, 190, 200, 110], lab: 'un nœud tombe', say: "Si un nœud tombe en panne, les autres reprennent sa part. C'est la résilience." },
    { t: [13, 19.5], mark: [540, 30, 170, 270], lab: 'les coûts', say: "Mais cela se paie : le réseau entre les machines, la coordination, le choix du découpage des données, qu'on appelle le partitionnement, et la cohérence entre les copies." },
    { t: [19.5, 25], say: "À retenir : ces coûts sont payés dès le premier jour. Et la bonne réponse n'est jamais un camp : une architecture moderne combine centralisé et distribué." }
  ],
  n15: [
    { t: [0, 5], say: "Pour augmenter la capacité, il y a deux façons. La première, le scale-up : on garde la même machine et on lui ajoute des processeurs et de la mémoire." },
    { t: [5, 10], mark: [40, 80, 280, 260], lab: 'le plafond', say: "C'est simple, rien ne change dans l'architecture. Mais il y a un plafond matériel, et plus on monte, plus le prix s'envole." },
    { t: [10, 15], say: "La seconde, le scale-out : on ajoute des nœuds, des machines ordinaires, et on répartit la charge entre elles." },
    { t: [15, 20], mark: [380, 50, 330, 290], lab: 'travail divisible', say: "Attention, cela ne marche que si le travail est divisible en parts indépendantes. Sinon, ajouter des machines ne sert à rien." },
    { t: [20, 25], say: "À retenir : on essaie d'abord le scale-up, puis on bascule vers le scale-out, avec ses coûts de distribution, quand le plafond approche et que le travail se découpe." }
  ],

  /* ======================================================= Partie III : OLTP et OLAP */
  n16: [
    { t: [0, 8], say: "L'OLTP, c'est le traitement transactionnel : il enregistre les opérations courantes. Un client valide son panier. Il faut créer la commande, vérifier le stock, enregistrer le paiement, mettre à jour le statut." },
    { t: [8, 11.5], say: "Tout réussit : la transaction est validée, on dit commit, en quelques millisecondes, parce que le client attend devant son écran." },
    { t: [11.5, 19], mark: [140, 150, 320, 120], lab: 'tout ou rien', say: "Autre commande : le paiement échoue. Alors tout est annulé, même la commande déjà créée. C'est le rollback. Une transaction, c'est tout ou rien, jamais à moitié." },
    { t: [19, 25], say: "À retenir : l'OLTP fait tourner le métier. Beaucoup de petites opérations, rapides et cohérentes, sur des données courantes." }
  ],
  n17: [
    { t: [0, 4], say: "L'OLAP, c'est le traitement analytique. La direction veut le chiffre d'affaires par mois, par région, par catégorie et par canal, sur cinq ans." },
    { t: [4, 11], mark: [26, 56, 410, 260], lab: 'le scan', say: "Pour répondre, le moteur doit parcourir des millions de lignes d'historique. C'est un scan massif." },
    { t: [11, 15], say: "Puis il agrège : des millions de lignes deviennent quelques chiffres, prêts pour un graphique." },
    { t: [15, 19], say: "Cela prend quelques secondes, et ce n'est pas grave : aucune opération n'est bloquée, aucun client n'attend." },
    { t: [19, 24], say: "À retenir : l'OLAP lit énormément, n'écrit rien, et peut attendre. C'est le modèle opposé de l'OLTP, pas un simple réglage." }
  ],
  n18: [
    { t: [0, 4], say: "L'OLTP et l'OLAP ne s'opposent pas, ils se complètent. L'OLTP collecte les ventes de la journée." },
    { t: [4, 8], say: "Le lien entre les deux s'appelle l'ETL. E, comme extraction : on lit les données dans la base source." },
    { t: [8, 13], mark: [300, 150, 140, 220], lab: 'la transformation', say: "T, comme transformation : on nettoie, on convertit les formats, on supprime les doublons. C'est ici qu'on décide ce qu'est un vrai chiffre de vente. Une erreur ici devient invisible." },
    { t: [13, 17], say: "L, comme load, le chargement : on écrit le résultat dans la plateforme OLAP." },
    { t: [17, 26], say: "L'OLAP produit alors les indicateurs, mais avec un décalage : si l'ETL tourne la nuit, on voit les chiffres de la veille. C'est le prix de la séparation." }
  ],
  n19: [
    { t: [0, 3.5], say: "Pourquoi séparer l'OLTP et l'OLAP ? Imaginez une seule base qui sert à la fois les transactions des clients et les analyses." },
    { t: [3.5, 11], mark: [250, 200, 200, 110], lab: 'quatre ressources', say: "Une grosse requête analytique arrive. Elle consomme le processeur, la mémoire, les entrées-sorties disque et le réseau. Les transactions ralentissent : de douze millisecondes à près d'une seconde." },
    { t: [11, 15], say: "Et même quand la requête est terminée, la lenteur continue : elle a vidé le cache, et la base doit le remplir à nouveau." },
    { t: [15, 21], say: "La solution : séparer. Une base OLTP pour les transactions, une plateforme OLAP pour l'analyse, reliées par une alimentation analytique, puis la BI." },
    { t: [21, 26], say: "À retenir : on protège d'abord le transactionnel, parce que c'est son arrêt qui coûte le plus cher à la minute." }
  ],

  /* ======================================================= Partie IV : batch et stream */
  n20: [
    { t: [0, 6], mark: [40, 90, 220, 150], lab: 'le lot du jour', say: "Premier mode de traitement : le batch, ou traitement par lots. Toute la journée, les tickets des cent vingt magasins arrivent, et on ne les traite pas tout de suite : on les accumule dans un lot." },
    { t: [6, 11], say: "À vingt-trois heures trente, le lot est fermé. Le traitement de nuit commence : on nettoie, on transforme, on calcule les ventes de la journée." },
    { t: [11, 15], mark: [480, 90, 200, 150], lab: 'le résultat', say: "À six heures trente, le résultat est prêt : le tableau de bord du matin. Accumuler, traiter, obtenir un résultat : ce sont les trois temps du batch." },
    { t: [15, 19], say: "Le prix à payer, c'est la latence. Un ticket passé à huit heures du matin attend vingt-deux heures et demie avant d'apparaître. Quelle que soit la puissance de la machine, la latence vaut au moins une période." },
    { t: [19, 25], say: "En échange, le batch offre quatre qualités : la complétude, car on traite la journée entière ; l'efficacité ; la possibilité de rejouer le calcul ; et le choix du moment. À retenir : le batch est le bon choix chaque fois que la décision peut attendre la fin de la période." }
  ],
  n21: [
    { t: [0, 5], say: "Deuxième mode : le stream, ou traitement au fil de l'eau. Ici, les événements arrivent un par un : la température de la chambre froide du magasin quarante-sept, chaque seconde." },
    { t: [5, 10], mark: [300, 95, 130, 70], lab: 'traité dès son arrivée', say: "Chaque mesure est traitée dès qu'elle arrive, sans attendre les suivantes. La latence ne dépend plus d'une période : c'est le temps de transport plus le temps de traitement d'un seul événement." },
    { t: [10, 14], mark: [470, 190, 230, 64], lab: 'alerte en 2 s', say: "Une mesure à neuf virgule quatre degrés dépasse le seuil de huit degrés. L'alerte part en deux secondes, pendant qu'il est encore temps de sauver la marchandise." },
    { t: [14, 19], say: "On peut aussi raisonner sur de très petites fenêtres, par exemple les dix dernières minutes, qui glissent avec le temps." },
    { t: [19, 25], say: "Mais le stream a un prix : un système toujours allumé, et quatre difficultés à gérer, les doublons, le désordre, les retardataires et l'état. À retenir : le stream est le bon choix chaque fois que la décision ne peut pas attendre." }
  ],
  n22: [
    { t: [0, 3], say: "Alors, batch ou stream ? On ne choisit ni selon la donnée, ni parce qu'un outil est plus moderne. On choisit selon l'usage." },
    { t: [3, 8], mark: [20, 50, 640, 60], lab: 'rapport quotidien', say: "Le critère : le batch suffit si le temps de réaction exigé est au moins égal à la période plus le traitement. Pour le rapport quotidien, on a un jour ; une nuit de batch suffit largement." },
    { t: [8, 13], mark: [20, 125, 640, 60], lab: 'alerte fraude', say: "Pour une alerte de fraude, il faut réagir en deux secondes. Aucune fenêtre de batch ne tient dans ce délai : il faut le stream." },
    { t: [13, 19], say: "Le cas des véhicules connectés montre qu'une même donnée peut servir deux usages. La position GPS part en stream, pour détecter tout de suite une déviation ou un danger." },
    { t: [19, 26], say: "La même position part aussi en batch, pour construire l'historique des trajets. Les deux chemins nourrissent la décision. À retenir : on compare le temps de réaction exigé à la latence de chaque mode, usage par usage." }
  ],

  /* ======================================================= Partie V : valeur, qualité, gouvernance */
  n23: [
    { t: [0, 5], mark: [20, 20, 360, 150], lab: 'sources croisées', say: "Partie cinq : la valeur des données. Quand on croise l'historique des clients, leurs transactions et leur comportement sur le web, on obtient une segmentation, une personnalisation, une prévision de la demande." },
    { t: [5, 11], mark: [400, 60, 300, 140], lab: 'quatre contributions', say: "Une donnée devient stratégique lorsqu'elle contribue de façon durable à comprendre, à décider, à optimiser ou à innover. Ce sont quatre contributions, de plus en plus ambitieuses." },
    { t: [11, 16], say: "La valeur ne se trouve pas dans la donnée stockée. Elle naît dans une chaîne : la donnée devient une information, l'information une décision, et la décision produit un effet." },
    { t: [16, 21], mark: [20, 285, 680, 68], lab: 'trois conditions', say: "Pour cela, trois conditions sont nécessaires : la donnée doit être disponible, digne de confiance grâce à la qualité, la gouvernance et la sécurité, et répondre à un usage." },
    { t: [21, 26], say: "Ces conditions se multiplient. Si personne n'a confiance dans un chiffre, personne n'agit dessus, et la valeur tombe à zéro. À retenir : disponibilité, confiance et usage, les trois à la fois." }
  ],
  n24: [
    { t: [0, 5], mark: [20, 30, 120, 290], lab: 'le volume', say: "Beaucoup de données, est-ce beaucoup de valeur ? Le fichier fidélité de l'enseigne grossit jusqu'à un million deux cent mille lignes. Pourtant, la valeur ne suit pas." },
    { t: [5, 17], mark: [165, 30, 535, 280], lab: 'cinq causes', say: "Cinq causes l'en empêchent. Des données dupliquées ou contradictoires ralentissent la décision. Sans métadonnées, on ne les trouve pas, on ne les comprend pas. Non gouvernées, on ne peut pas les partager sans risque. Non représentatives, elles dégradent un modèle d'IA. Et indisponibles au bon moment, elles ne soutiennent pas le workload." },
    { t: [17, 20], say: "Avec dix-huit pour cent de doublons, ce sont deux cent seize mille lignes en trop, et pas une information de plus." },
    { t: [20, 26], say: "Ajouter des lignes ne répare aucune de ces causes. La valeur dépend de quatre facteurs : le contexte, la qualité, l'accès et l'usage." }
  ],
  n25: [
    { t: [0, 4], mark: [20, 110, 170, 220], lab: 'les données brutes', say: "La qualité d'une donnée n'est pas la même pour tous les usages. Voici un jeu de transactions, avec quelques cas atypiques en rouge." },
    { t: [4, 9], mark: [456, 24, 244, 130], lab: 'BI', say: "Pour la BI, on nettoie et on agrège : on corrige les formats de date, on harmonise les catégories. Les cas atypiques disparaissent, et l'on obtient un indicateur stable." },
    { t: [9, 14], mark: [456, 220, 244, 160], lab: 'IA / ML', say: "Pour l'apprentissage automatique, c'est l'inverse : la représentativité devient essentielle. Les cas rares sont justement ce que le modèle doit apprendre." },
    { t: [14, 20], say: "Si l'on applique au modèle de fraude le nettoyage de la BI, deux mille fraudes sur un million de transactions deviennent cinq cents. Le taux passe de zéro virgule deux à zéro virgule zéro cinq pour cent." },
    { t: [20, 26], say: "La question de l'architecte est donc : quelle qualité est nécessaire pour ce workload ? À retenir : on garde le brut, et on prépare une version par usage." }
  ],
  n26: [
    { t: [0, 8], mark: [20, 20, 680, 100], lab: 'trois questions', say: "Trois concepts accompagnent toute donnée qui doit avoir de la valeur. La gouvernance répond à : qui peut faire quoi, selon quelles règles ? Les métadonnées : que représente cette donnée ? L'observabilité : que se passe-t-il avec elle et avec son pipeline ?" },
    { t: [8, 14], say: "Il en faut les trois. Une donnée peut être accessible mais mal documentée, documentée mais non fiable, ou fiable mais indisponible. Chaque concept bouche un trou que les deux autres laissent." },
    { t: [14, 19], mark: [20, 185, 680, 80], lab: 'le pipeline des ventes', say: "Voyons l'observabilité en action. Le pipeline des ventes attend soixante mille lignes, cinq cents par magasin. Ce matin, il n'en reçoit que quarante et un mille." },
    { t: [19, 26], mark: [160, 325, 400, 66], lab: 'alerte', say: "Le signal de volume déclenche une alerte à six heures trente : trente-huit magasins manquent, et on le sait avant que le tableau de bord ne soit publié. À retenir : gouvernance, métadonnées et observabilité, les trois ensemble." }
  ],

  /* ======================================================= Partie VI : data-driven, AI-driven */
  n27: [
    { t: [0, 5], mark: [20, 16, 250, 150], lab: 'le tableau de bord', say: "Partie six : ce qu'une organisation fait de ses données. Première réponse, l'organisation data-driven. Sur le tableau de bord commercial de l'enseigne, la région Nord recule de douze pour cent." },
    { t: [5, 11], mark: [300, 20, 400, 150], lab: 'le diagnostic', say: "On cherche la cause. Les ventes, c'est le nombre de tickets multiplié par le panier moyen. Les tickets ne baissent que d'un pour cent, mais le panier chute de onze virgule un pour cent : le petit électroménager est en rupture, ses ventes passent de six cent mille à soixante mille dirhams." },
    { t: [11, 16], mark: [20, 190, 680, 70], lab: 'la boucle', say: "Voilà la boucle du data-driven : un tableau de bord, une baisse, l'analyse des causes, une action corrective. Et c'est l'humain qui décide : la donnée l'éclaire." },
    { t: [16, 21], mark: [20, 285, 680, 100], lab: 'quatre niveaux', say: "On distingue quatre niveaux d'analytique. Descriptive : que s'est-il passé ? Diagnostique : pourquoi ? Ce sont les deux niveaux du data-driven. La prédiction et la prescription viendront avec l'IA." },
    { t: [21, 26], say: "La boucle se ferme sur la mesure de l'effet. Les autres régions reculent de cinq pour cent, c'est la saison. Le Nord fait exactement ce chiffre : l'écart dû à la rupture est nul, l'action a réussi." }
  ],
  n28: [
    { t: [0, 4], mark: [20, 10, 420, 165], lab: 'data-driven', say: "Deuxième réponse : l'organisation AI-driven. Rappel : en data-driven, la donnée passe par un tableau de bord et éclaire un humain, qui décide." },
    { t: [4, 7], mark: [130, 185, 200, 70], lab: 'le modèle', say: "En AI-driven, la donnée alimente également un modèle d'IA. Également : le modèle s'ajoute au tableau de bord, il ne le remplace pas." },
    { t: [7, 12], mark: [440, 100, 270, 210], lab: 'cinq verbes', say: "Ce modèle sait faire cinq choses : prédire la demande, recommander un produit, classer une transaction comme anomalie, générer une réponse, automatiser une tâche comme le réassort." },
    { t: [12, 15], say: "On y trouve trois familles de techniques : le machine learning traditionnel, l'IA générative, et l'automatisation avec l'assistance intelligente." },
    { t: [15, 20], mark: [15, 285, 440, 60], lab: 'à la main', say: "Pourquoi certains processus seulement ? Prenons le réassort : vingt-cinq mille décisions par jour, trente secondes chacune. Cela fait deux cent huit heures, soit vingt-sept acheteurs à plein temps." },
    { t: [20, 26], say: "Le modèle prend ces décisions. Les deux pour cent incertains, cinq cents cas, reviennent à l'humain : un peu plus de quatre heures. À retenir : l'humain garde le seuil et les cas incertains." }
  ],
  n29: [
    { t: [0, 10], mark: [20, 20, 680, 185], lab: 'quatre usages', say: "Du reporting à l'IA, les exigences sur la donnée grandissent. Le reporting demande des données consolidées. L'analytics y ajoute l'historique et la qualité. Le machine learning, des features, des labels et la représentativité. L'IA générative, un corpus, du contexte et de la sécurité." },
    { t: [10, 16], say: "Pourquoi ces exigences deviennent-elles explicites ? Devant un rapport, un analyste relit le chiffre et flaire l'erreur. Avec l'IA générative, la réponse part directement au client : il n'y a plus d'humain entre les deux." },
    { t: [16, 20], mark: [15, 240, 340, 110], lab: 'le corpus', say: "Le support client s'appuie sur un corpus de mille deux cents documents. Cent quatre-vingts sont obsolètes : quinze pour cent." },
    { t: [20, 26], mark: [375, 240, 330, 110], lab: 'réponses exposées', say: "Chaque réponse lit trois documents. La probabilité d'en lire au moins un obsolète est de un moins zéro virgule quatre-vingt-cinq au cube : trente-huit virgule six pour cent, soit environ mille cent cinquante réponses par mois. À retenir : la fraîcheur et la sécurité du corpus sont des exigences explicites." }
  ],

  /* ======================================================= Partie VII : les cinq couches */
  n30: [
    { t: [0, 6], mark: [15, 18, 690, 80], lab: 'la chaîne', say: "Partie sept : les cinq couches d'une architecture de données moderne. La donnée naît dans les sources, entre par l'ingestion, vit dans le stockage, devient utile dans le traitement, et sert enfin la consommation : la BI, l'analytics et l'IA." },
    { t: [6, 11], mark: [15, 96, 690, 40], lab: 'cinq questions', say: "Chaque couche répond à une seule question. D'où vient la donnée ? Comment entre-t-elle ? Où vit-elle ? Comment la rendre utile ? Et qui l'utilise ?" },
    { t: [11, 18], mark: [20, 150, 680, 175], lab: 'le socle', say: "Pourquoi des couches ? Sans socle, sept sources et quatre usages demandent sept fois quatre, vingt-huit liaisons. Avec les couches, chaque source se branche une fois, chaque usage puise une fois : sept plus quatre, onze liaisons." },
    { t: [18, 26], mark: [15, 330, 690, 80], lab: 'deux budgets', say: "Chaque trajet a son budget de latence. Le tableau de bord est prêt à quatre heures du matin, lu à huit heures. Pour la fraude, ingestion, features, score et retour à la caisse font sept cent cinquante millisecondes, sous la limite de deux secondes. À retenir : une couche, une question, et un budget qui se répartit entre les couches." }
  ],
  n31: [
    { t: [0, 7], mark: [15, 15, 690, 70], lab: 'six familles', say: "Première couche : les sources. On en distingue six familles : les applications comme les caisses et l'ERP, les objets connectés, les API, les logs, les fichiers, et l'open data." },
    { t: [7, 14], mark: [15, 92, 440, 115], lab: 'trois axes', say: "Une source se décrit selon trois axes, et chacun prépare une couche. Le format oriente le stockage, la fréquence oriente l'ingestion, la qualité oriente le traitement. Une source se constate : l'architecte ne la choisit pas." },
    { t: [14, 21], mark: [15, 215, 690, 120], lab: 'messages et octets', say: "Comparons deux sources de l'enseigne. Quatre cent quatre-vingts capteurs, une mesure par minute : six cent quatre-vingt-onze mille mesures par jour, mais seulement cent trente-huit mégaoctets. Les caisses envoient moins de messages, six cent mille tickets, mais un virgule deux gigaoctet. Il faut compter les deux." },
    { t: [21, 26], mark: [15, 340, 690, 72], lab: 'la qualité', say: "Et la qualité ? Le CRM contient quatre cent mille fiches, dont six pour cent de doublons. L'enseigne n'a en réalité que trois cent soixante-seize mille clients. À retenir : format, fréquence et qualité préparent les trois couches suivantes." }
  ],
  n32: [
    { t: [0, 6], mark: [15, 25, 690, 160], lab: 'trois modes', say: "Deuxième couche : l'ingestion. Trois modes. Le batch déplace un gros lot à intervalles réguliers. Le streaming fait passer chaque événement dès qu'il arrive. Le CDC et les API ne font venir que ce qui change, ou ce qu'on demande." },
    { t: [6, 11], say: "Ce qui distingue ces modes, c'est leur déclencheur : une horloge pour le batch, un événement pour le streaming, une modification ou une requête pour le CDC et les API." },
    { t: [11, 16], mark: [15, 195, 690, 65], lab: 'contexte et traçabilité', say: "L'ingestion transporte, elle ne transforme pas. Mais elle doit amener le contexte : la source, l'heure de l'événement, le schéma. Et la traçabilité : l'heure d'arrivée, le lot, la possibilité de rejouer sans créer de doublon." },
    { t: [16, 20], mark: [15, 280, 690, 70], lab: 'copie complète', say: "Exemple : les stocks de l'ERP, deux millions de lignes, rafraîchis toutes les heures. Copier toute la table chaque heure, c'est quarante-huit gigaoctets par jour." },
    { t: [20, 26], mark: [15, 345, 690, 65], lab: 'CDC', say: "Avec le CDC, seuls les cinquante mille changements voyagent : soixante mégaoctets par jour, huit cents fois moins. Et les suppressions sont vues. À retenir : un mode se choisit par son déclencheur, et l'ingestion garde d'où vient la donnée et quand elle est arrivée." }
  ],
  n33: [
    { t: [0, 6], mark: [15, 15, 690, 75], lab: 'trois familles', say: "Troisième couche : le stockage. Trois familles. La base opérationnelle, pour les transactions, en quelques millisecondes. L'entrepôt de données, pour l'analyse en SQL. Le lac ou le lakehouse, pour tous les formats, à bas coût." },
    { t: [6, 11], mark: [15, 95, 690, 60], lab: 'quatre critères', say: "On ne cherche pas la meilleure base. On place chaque donnée selon quatre critères : le type de charge, le coût, la latence attendue, et son cycle de vie." },
    { t: [11, 16], mark: [15, 165, 690, 80], lab: 'tout en chaud', say: "Les tickets de caisse : un virgule deux gigaoctet par jour, gardés cinq ans, soit deux mille cent quatre-vingt-dix gigaoctets. Tout garder dans l'entrepôt coûte cinq cent quarante-sept dirhams cinquante par mois." },
    { t: [16, 22], mark: [15, 255, 690, 130], lab: 'par niveaux', say: "Avec une politique par niveaux : quatre-vingt-dix jours dans l'entrepôt, puis le lac jusqu'à deux ans, puis l'archive jusqu'à cinq ans. Le total tombe à cent seize dirhams quatre-vingt-quatorze par mois, pour exactement la même donnée." },
    { t: [22, 26], say: "C'est près de cinq fois moins cher. Le prix à payer : une requête sur une vieille donnée répond plus lentement. À retenir : on place chaque donnée selon son usage et son âge." }
  ],
  n34: [
    { t: [0, 6], mark: [15, 15, 690, 55], lab: 'cinq opérations', say: "Quatrième couche : le traitement. Il rend la donnée adaptée à un usage précis, par cinq opérations : nettoyer, transformer, enrichir, agréger, et construire des features." },
    { t: [6, 11], mark: [80, 85, 520, 72], lab: 'trois niveaux', say: "La donnée passe par trois niveaux : brute, conforme, puis prête à l'usage. Le niveau brut est toujours gardé : c'est lui qui permet de tout recalculer." },
    { t: [11, 16], mark: [15, 165, 690, 105], lab: 'nettoyage', say: "Un million de tickets. On retire cinq mille doublons, puis trois mille neuf cent quatre-vingts lignes invalides : il en reste neuf cent quatre-vingt-onze mille vingt. Les rejets sont conservés, avec leur motif." },
    { t: [16, 21], mark: [15, 278, 690, 70], lab: 'jointure', say: "On enrichit avec le référentiel des magasins. Une jointure interne ferait disparaître huit mille neuf cent vingt lignes. La jointure externe les garde, avec une région inconnue : le chiffre d'affaires total reste juste." },
    { t: [21, 26], mark: [15, 355, 690, 58], lab: 'agrégation', say: "Enfin, l'agrégation : cent vingt magasins sur sept jours, huit cent quarante lignes pour le tableau de bord. Si l'on avait agrégé avant de dédoublonner, un million et demi de dirhams fictifs se seraient glissés dans le chiffre. À retenir : nettoyer d'abord, agréger à la fin." }
  ],
  n35: [
    { t: [0, 5], mark: [15, 15, 690, 70], lab: 'quatre consommateurs', say: "Dernière couche : la consommation. Quatre consommateurs : la BI, l'analytics, le machine learning, et l'IA générative." },
    { t: [5, 10], say: "On les reconnaît à ce qu'ils produisent. La BI produit un chiffre. L'analytics, une compréhension. Le machine learning, une sortie automatique. L'IA générative, un texte." },
    { t: [10, 16], mark: [15, 98, 690, 115], lab: 'le socle', say: "Tous puisent dans le même socle gouverné : une seule définition, un seul contrôle d'accès, un seul lignage. Seule la version prête à l'usage est propre à chacun." },
    { t: [16, 21], mark: [15, 240, 690, 105], lab: 'le coût', say: "Si chaque équipe copie ses données, cela fait quatre copies : huit mille sept cent soixante gigaoctets, deux mille cent quatre-vingt-dix dirhams par mois. Avec un socle partagé et quatre petites versions : deux mille quatre cent dix-huit gigaoctets, six cent quatre dirhams cinquante." },
    { t: [21, 26], say: "L'économie atteint dix-neuf mille vingt-six dirhams par an. Et surtout, il n'y a plus deux chiffres d'affaires différents. À retenir : plusieurs consommateurs, un socle, une gouvernance." }
  ]
};
