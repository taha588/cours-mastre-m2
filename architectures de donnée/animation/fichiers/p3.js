/* Partie III — OLTP et OLAP : N16 à N19. */

/* ------------------------------------------------ N16 : OLTP --- */
(function () {
  var OPS = ['Créer la commande', 'Vérifier le stock', 'Enregistrer le paiement', 'Mettre à jour le statut'];
  SCENES.push({
    id: 'n16', part: 3, label: 'N16', short: 'N16 OLTP', title: 'OLTP : le traitement transactionnel', dur: 25,
    enonce: '<p><b>OLTP</b> (<i>Online Transaction Processing</i>) : traitements transactionnels qui <b>enregistrent et mettent à jour les opérations courantes</b>.</p>' +
      '<p>Nombreuses <b>petites opérations</b> · <b>faible latence</b> · transactions <b>cohérentes</b> · données <b>courantes</b>. Exemples : banque, commandes, ERP.</p>' +
      '<p>E-commerce : créer une commande → vérifier le stock → enregistrer le paiement → mettre à jour le statut.</p>',
    retenir: 'l\'OLTP <b>fait fonctionner le métier</b> : petites opérations, latence faible parce que <b>quelqu\'un attend</b>, transactions <b>tout ou rien</b>.',
    steps: [
      [0, 'Un client valide son panier : une <b>transaction</b> commence.'],
      [2, 'Quatre opérations qui doivent rester <b>cohérentes</b>.'],
      [8, 'Tout réussit : <b>COMMIT</b>, en quelques millisecondes.'],
      [11.5, 'Autre commande : le paiement échoue…'],
      [15, '…<b>ROLLBACK</b> : tout est annulé, rien à moitié.'],
      [19, 'Des milliers de petites transactions par seconde.']
    ],
    draw: function (G, t) {
      var C = G.C, run2 = t >= 11.5;
      USERS(G, 30, 60, AL(t, 0));
      OPS.forEach(function (o, i) {
        var y = 40 + i * 62, s = run2 ? 11.5 + i * .8 : 2 + i * 1.3, a = AL(t, s, .4);
        var fail = run2 && i === 2, skip = run2 && i === 3;
        var undo = run2 && U.seg(t, 15, 16) > 0;
        BX(G, 150, y, 270, 48, { tone: fail ? 'red' : undo ? 'none' : skip ? 'none' : 'blue', label: (i + 1) + '. ' + o, size: 14, alpha: skip ? a * .4 : a });
        if (!skip) G.check(!fail && !undo, 440, y + 24, { alpha: a });
      });
      var aC = AL(t, 8) * OUT(t, 11.5, .3);
      G.badge('COMMIT ✓  12 ms', 560, 130, { tone: 'green', align: 'center', size: 16, alpha: aC });
      var aR = AL(t, 15);
      G.badge('ROLLBACK ↺', 560, 130, { tone: 'red', align: 'center', size: 16, alpha: aR * OUT(t, 19) });
      G.text('tout ou rien', 560, 166, { size: 13, w: 700, sans: true, color: C.red, align: 'center', alpha: aR * OUT(t, 19) });
      CY(G, 285, 330, 120, 50, { alpha: AL(t, 1) });
      G.text('DB OLTP', 285, 334, { size: 13, w: 700, sans: true, color: C.gold, align: 'center', alpha: AL(t, 1) });
      var a5 = AL(t, 19);
      for (var k = 0; k < 14; k++) PK(G, 480 + (k % 7) * 30, 230 + Math.floor(k / 7) * 40, 345, 330, ((t - 19) * 1.3 + k * .13) % 1, { color: C.blue, r: 4, alpha: a5 });
      G.badge('nombreuses · petites · rapides · cohérentes', 540, 398, { tone: 'gold', align: 'center', size: 13, alpha: a5 });
    }
  });
})();

/* ------------------------------------------------ N17 : OLAP --- */
(function () {
  SCENES.push({
    id: 'n17', part: 3, label: 'N17', short: 'N17 OLAP', title: 'OLAP : le traitement analytique', dur: 24,
    enonce: '<p><b>OLAP</b> (<i>Online Analytical Processing</i>) : traitements destinés à <b>explorer, agréger et analyser de grands volumes</b>.</p>' +
      '<p>Requêtes <b>complexes</b> · agrégations et <b>scans</b> de grands volumes · <b>historique</b> important · décision et pilotage.</p>' +
      '<p>E-commerce : <b>chiffre d\'affaires par mois, région, catégorie et canal sur cinq années</b>.</p>',
    retenir: 'l\'OLAP <b>analyse le métier</b> : il lit énormément, n\'écrit rien, et <b>peut attendre</b> — son modèle accepte la redondance que l\'OLTP évite.',
    steps: [
      [0, 'La question : CA par mois, région, catégorie, canal, <b>sur 5 ans</b>.'],
      [4, 'Le moteur <b>scanne</b> des millions de lignes d\'historique.'],
      [11, 'Il les <b>agrège</b> : le résultat tient en quelques chiffres.'],
      [15, 'Ça prend des secondes : <b>personne n\'est bloqué</b>.'],
      [19, 'Lire beaucoup, écrire rien.']
    ],
    draw: function (G, t) {
      var C = G.C;
      G.badge('CA par mois × région × catégorie × canal — 5 ans', 360, 26, { tone: 'plum', align: 'center', size: 14, alpha: AL(t, 0) });
      /* années */
      for (var y = 0; y < 5; y++) {
        var a = AL(t, .5 + y * .3), x = 30 + y * 82;
        BX(G, x, 60, 72, 250, { tone: 'none', alpha: a });
        G.text(String(2020 + y), x + 36, 80, { size: 13, w: 700, sans: true, color: C.navy, align: 'center', alpha: a });
        for (var r = 0; r < 18; r++) G.line(x + 8, 92 + r * 12, x + 64, 92 + r * 12, { color: C.grid, w: 4, alpha: a });
      }
      var scan = U.seg(t, 4, 11);
      if (scan > 0 && scan < 1) G.line(30, 92 + scan * 210, 432, 92 + scan * 210, { color: C.gold, w: 3 });
      G.ctx.save(); G.ctx.globalAlpha = .18 * AL(t, 4); G.ctx.fillStyle = C.gold; G.ctx.fillRect(30, 86, 402, 210 * scan); G.ctx.restore();
      G.text(U.fmt(Math.round(scan * 48), 0) + ' millions de lignes lues', 230, 334, { size: 13, w: 700, sans: true, color: C.gold, align: 'center', alpha: AL(t, 4) });
      FLOW(G, t, 6, 11, 432, 190, 500, 190, { per: .3, dur: .5, color: C.gold });
      /* agrégat */
      var aR = AL(t, 11);
      BX(G, 500, 70, 200, 230, { tone: 'green', alpha: aR });
      G.text('Résultat agrégé', 600, 96, { size: 14, w: 700, sans: true, color: C.green, align: 'center', alpha: aR });
      [.4, .55, .5, .7, .85].forEach(function (h, i) { G.ctx.save(); G.ctx.globalAlpha *= aR; G.ctx.fillStyle = C.green; var hh = 150 * h * U.seg(t, 11, 13); G.ctx.fillRect(520 + i * 36, 280 - hh, 24, hh); G.ctx.restore(); });
      G.badge('⏱ 8 s — acceptable', 600, 330, { tone: 'blue', align: 'center', size: 13, alpha: AL(t, 15) });
      G.badge('lecture massive · aucune écriture · décision', 360, 392, { tone: 'gold', align: 'center', size: 14, alpha: AL(t, 19) });
    }
  });
})();

/* ------------------------------------------------ N18 : complémentarité OLTP / OLAP et ETL --- */
(function () {
  SCENES.push({
    id: 'n18', part: 3, label: 'N18', short: 'N18 ETL', title: 'La complémentarité OLTP / OLAP et le processus ETL', dur: 26,
    enonce: '<p><b>OLTP</b> opère (INSERT / UPDATE, données courantes, nombreuses petites requêtes) ; <b>OLAP</b> analyse (SELECT / agrégation, historique, peu de requêtes lourdes).</p>' +
      '<p>Ils sont <b>complémentaires</b> : l\'OLTP collecte, l\'OLAP transforme ces données en informations stratégiques. Le lien : l\'<b>ETL</b> — <b>E</b>xtraction, <b>T</b>ransformation, <b>C</b>hargement.</p>',
    retenir: 'l\'OLAP ne collecte rien : tout vient de l\'OLTP <b>par l\'ETL</b>. Le « T » implémente la définition de la vérité ; la chaîne crée un <b>décalage</b>, prix de la séparation.',
    steps: [
      [0, 'L\'<b>OLTP</b> enregistre les ventes de la journée.'],
      [4, '<b>E</b>xtraction : on lit les données sources.'],
      [8, '<b>T</b>ransformation : nettoyer, convertir, agréger — c\'est là qu\'on définit la vérité.'],
      [13, '<b>L</b> (chargement) : on écrit dans l\'OLAP.'],
      [17, 'L\'OLAP produit les KPI — avec un <b>décalage</b> (ici, la nuit).']
    ],
    draw: function (G, t) {
      var C = G.C;
      CY(G, 80, 200, 110, 120, { alpha: AL(t, 0) });
      G.text('OLTP', 80, 196, { size: 16, w: 700, sans: true, color: C.gold, align: 'center', alpha: AL(t, 0) });
      G.text('opérer', 80, 214, { size: 12, sans: true, color: C.muted, align: 'center', alpha: AL(t, 0) });
      FLOW(G, t, 0, 4, 0, 120, 60, 160, { per: .4, dur: .6, color: C.plum });
      var E = [['E', 'Extraction', 4], ['T', 'Transformation', 8], ['L', 'Chargement', 13]];
      E.forEach(function (e, i) {
        var a = AL(t, e[2]), x = 170 + i * 140;
        BX(G, x, 160, 120, 80, { tone: i === 1 ? 'gold' : 'blue', alpha: a });
        G.text(e[0], x + 60, 196, { size: 30, w: 700, color: i === 1 ? C.gold : C.navy, align: 'center', alpha: a });
        G.text(e[1], x + 60, 226, { size: 13, w: 600, sans: true, align: 'center', alpha: a });
        FLOW(G, t, e[2] + .3, e[2] + 3.5, x - 34, 200, x, 200, { per: .5, dur: .5 });
      });
      ['« 1 200,00 » → 1200', 'dates → AAAA-MM-JJ', 'doublons supprimés'].forEach(function (s, i) { G.text(s, 370, 270 + i * 20, { size: 12, sans: true, it: true, color: C.gold, align: 'center', alpha: AL(t, 9 + i * .8) * OUT(t, 13) }); });
      var aO = AL(t, 13.5);
      FLOW(G, t, 13.5, 17, 570, 200, 600, 200, { per: .5, dur: .4 });
      BX(G, 600, 140, 110, 120, { tone: 'green', label: 'OLAP', sub: 'analyser', alpha: aO });
      var aD = AL(t, 17);
      G.badge('KPI de la veille', 655, 290, { tone: 'green', align: 'center', size: 13, alpha: aD });
      G.badge('décalage : la nuit', 360, 120, { tone: 'red', align: 'center', size: 14, alpha: aD });
      G.text('☾ ETL nocturne', 360, 90, { size: 14, w: 700, sans: true, color: C.navy, align: 'center', alpha: aD });
      G.badge('OLTP collecte · ETL relie · OLAP analyse', 360, 390, { tone: 'gold', align: 'center', size: 15, alpha: AL(t, 20) });
    }
  });
})();

/* ------------------------------------------------ N19 : pourquoi séparer OLTP et OLAP --- */
(function () {
  var R = ['CPU', 'Mémoire', 'I/O', 'Réseau'];
  SCENES.push({
    id: 'n19', part: 3, label: 'N19', short: 'N19 Séparer', title: 'Pourquoi séparer OLTP et OLAP', dur: 26,
    enonce: '<p>Un workload analytique lourd peut consommer <b>CPU, mémoire, I/O et réseau</b>.</p>' +
      '<p>La <b>séparation logique ou physique</b> permet de <b>protéger les workloads transactionnels</b> : Applications → DB OLTP → alimentation analytique → Plateforme OLAP → BI.</p>',
    retenir: 'quatre ressources partagées, plus l\'<b>éviction du cache</b> qui fait durer les dégâts. On protège le transactionnel, car son arrêt <b>coûte le plus cher à la minute</b>.',
    steps: [
      [0, 'Une seule base sert les transactions <b>et</b> l\'analyse.'],
      [3.5, 'Une grosse requête analytique arrive : les <b>quatre ressources</b> montent.'],
      [8, 'Les transactions ralentissent : 12 ms → 900 ms.'],
      [11, 'La requête finit… mais le <b>cache</b> a été vidé : la lenteur dure.'],
      [15, 'Séparation : OLTP d\'un côté, OLAP de l\'autre, reliés par l\'alimentation.'],
      [21, 'Les transactions sont <b>protégées</b>.']
    ],
    draw: function (G, t) {
      var C = G.C, sep = U.seg(t, 15, 17), q = U.seg(t, 3.5, 6) * (1 - U.seg(t, 10.5, 11)), cache = U.seg(t, 11, 11.5) * (1 - U.seg(t, 13.5, 15));
      var load = Math.max(q, cache * .6) * (1 - sep);
      USERS(G, 24, 40, AL(t, 0));
      var dbx = U.lerp(330, 200, sep);
      CY(G, dbx, 140, 120, 100, { alpha: AL(t, 0) });
      G.text(sep > .5 ? 'DB OLTP' : 'DB partagée', dbx, 144, { size: 14, w: 700, sans: true, color: C.gold, align: 'center', alpha: AL(t, 0) });
      FLOW(G, t, 0, 26, 70, 100, dbx - 62, 140, { per: load > .5 ? 1.5 : .45, dur: load > .5 ? 1.8 : .6, color: C.plum });
      var lat = load > .4 ? '900 ms' : '12 ms';
      G.badge('latence ' + lat, 60, 240, { tone: load > .4 ? 'red' : 'green', size: 13, alpha: AL(t, 1) });
      R.forEach(function (r, i) {
        G.text(r, dbx - 70, 228 + i * 24, { size: 12, w: 600, sans: true, alpha: AL(t, 3.5) * (1 - sep) });
        GAUGE(G, dbx - 10, 218 + i * 24, 110, .2 + .75 * load, { alpha: AL(t, 3.5) * (1 - sep) });
      });
      G.badge('cache vidé', dbx, 70, { tone: 'red', align: 'center', size: 13, alpha: cache });
      /* analyste */
      var ax = 560;
      BX(G, ax, 110, 110, 60, { tone: 'blue', label: 'Analyse', sub: 'requête lourde', alpha: AL(t, 2) * OUT(t, 14.5) });
      PK(G, ax, 140, dbx + 62, 140, U.seg(t, 3, 4), { color: C.red, r: 11 });
      /* séparation */
      CY(G, 520, 140, 120, 100, { alpha: sep });
      G.text('Plateforme OLAP', 520, 144, { size: 13, w: 700, sans: true, color: C.gold, align: 'center', alpha: sep });
      FLOW(G, t, 17, 26, 262, 140, 458, 140, { per: 1.2, dur: 1.4, color: C.gold });
      G.text('alimentation analytique', 360, 124, { size: 12, w: 700, sans: true, color: C.gold, align: 'center', alpha: sep });
      BX(G, 610, 115, 96, 50, { tone: 'green', label: 'BI', alpha: sep });
      G.arrow(582, 140, 606, 140, { color: C.muted, w: 1.6, alpha: sep });
      G.badge('transactions protégées', 200, 300, { tone: 'green', align: 'center', size: 14, alpha: AL(t, 21) });
      G.badge('CPU · mémoire · I/O · réseau ne sont plus partagés', 360, 392, { tone: 'gold', align: 'center', size: 14, alpha: AL(t, 22) });
    }
  });
})();
