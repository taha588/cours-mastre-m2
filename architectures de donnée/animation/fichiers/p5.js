/* Partie V — Valeur, qualité, gouvernance : N23 à N26. */

/* ------------------------------------------------ N23 : la donnée, actif stratégique --- */
(function () {
  var SRC = ['Historique clients', 'Transactions', 'Comportement web'];
  var CONTRIB = ['comprendre', 'décider', 'optimiser', 'innover'];
  var CHAINE = ['donnée', 'information', 'décision', 'effet'];
  var COND = [['Disponibilité', 'accessible'], ['Confiance', 'qualité + gouv. + sécurité'], ['Usage', 'répond à un besoin']];
  SCENES.push({
    id: 'n23', part: 5, label: 'N23', short: 'N23 Actif', title: 'La donnée, actif stratégique', dur: 26,
    enonce: '<p>Une donnée devient <b>stratégique</b> lorsqu\'elle contribue <b>de façon durable</b> à la <b>compréhension</b>, à la <b>décision</b>, à l\'<b>optimisation</b> ou à l\'<b>innovation</b> de l\'organisation.</p>' +
      '<p>Trois conditions, toutes nécessaires : <b>disponibilité</b> (accessible), <b>confiance</b> (qualité + gouvernance + sécurité), <b>usage</b> (répondre à un besoin).</p>',
    retenir: 'la valeur ne se trouve pas dans la donnée stockée mais dans la chaîne <b>donnée → information → décision → effet</b> ; les trois conditions se <b>multiplient</b> : une seule à zéro, et la valeur est nulle.',
    steps: [
      [0, 'Clients + transactions + web : <b>segmentation, personnalisation, prévision</b>.'],
      [5, 'Quatre contributions, en gradation : <b>comprendre, décider, optimiser, innover</b>.'],
      [11, 'La valeur naît dans une chaîne : <b>donnée → information → décision → effet</b>.'],
      [16, 'Trois conditions : <b>disponibilité × confiance × usage</b>.'],
      [21, 'Une condition à zéro : la valeur est <b>nulle</b>.']
    ],
    draw: function (G, t) {
      var C = G.C, ctx = G.ctx;
      /* sources croisées */
      SRC.forEach(function (s, i) {
        BX(G, 20, 24 + i * 46, 170, 36, { tone: 'none', label: s, size: 13, alpha: AL(t, i * .4) });
        FLOW(G, t, 1 + i * .3, 4.5, 192, 42 + i * 46, 262, 90, { per: .5, dur: .6, color: C.gold, r: 4 });
      });
      BX(G, 264, 62, 110, 56, { tone: 'gold', label: 'Donnée', sub: 'croisée', size: 15, alpha: AL(t, 1) });
      ['segmentation', 'personnalisation', 'prévision'].forEach(function (u, i) {
        G.badge(u, 470 + (i - 1) * 0, 36 + i * 40, { tone: 'plum', align: 'center', size: 13, alpha: AL(t, 2.5 + i * .5) * OUT(t, 5) });
      });
      /* quatre contributions en escalier */
      CONTRIB.forEach(function (c, i) {
        var a = AL(t, 5 + i * 1.2), h = (36 + i * 26) * U.es(t, 5 + i * 1.2, 6 + i * 1.2);
        ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.plumSoft; ctx.strokeStyle = C.plum; ctx.lineWidth = 1.8;
        G.rrect(410 + i * 74, 168 - h, 62, h, 4); ctx.fill(); ctx.stroke(); ctx.restore();
        G.text(c, 441 + i * 74, 186, { size: 12, w: 700, sans: true, color: C.plum, align: 'center', alpha: a });
      });
      G.arrow(376, 90, 404, 120, { color: C.muted, w: 2, alpha: AL(t, 5) });
      /* chaîne de valeur */
      CHAINE.forEach(function (c, i) {
        var a = AL(t, 11 + i * .9);
        BX(G, 20 + i * 178, 214, 146, 40, { tone: i === 3 ? 'green' : 'blue', label: c, size: 15, alpha: a });
        if (i) G.arrow(20 + i * 178 - 30, 234, 20 + i * 178 - 4, 234, { color: C.muted, w: 2, alpha: a });
      });
      PK(G, 93, 234, 627, 234, U.seg(t, 11, 15.5), { color: C.gold, r: 6 });
      /* trois conditions multipliées */
      var zero = U.seg(t, 21, 21.6);
      COND.forEach(function (c, i) {
        var a = AL(t, 16 + i * .8), bad = i === 1 && zero > 0;
        BX(G, 20 + i * 192, 290, 160, 58, { tone: bad ? 'red' : 'green', label: c[0], sub: c[1], size: 15, ssize: 11, alpha: a });
        G.text(i < 2 ? '×' : '=', 196 + i * 192, 326, { size: 24, w: 700, sans: true, color: C.ink, align: 'center', alpha: a });
      });
      var aV = AL(t, 18.5);
      BX(G, 598, 290, 102, 58, { tone: zero > .5 ? 'red' : 'gold', label: zero > .5 ? '0' : 'valeur', sub: zero > .5 ? 'valeur nulle' : '', size: 17, alpha: aV });
      G.badge('confiance = 0 : personne n\'agit sur ce chiffre', 360, 386, { tone: 'red', align: 'center', size: 13, alpha: AL(t, 21.5) });
    }
  });
})();

/* ------------------------------------------------ N24 : volume ≠ valeur --- */
(function () {
  var CAUSES = [['dupliquées, contradictoires', 'ralentit la décision'], ['sans métadonnées', 'introuvable, incomprise'],
    ['non gouvernées', 'partage risqué'], ['non représentatives', 'dégrade le modèle d\'IA'], ['indisponibles au bon moment', 'workload non soutenu']];
  SCENES.push({
    id: 'n24', part: 5, label: 'N24', short: 'N24 Volume', title: 'Beaucoup de données ≠ beaucoup de valeur', dur: 26,
    enonce: '<p>Le volume seul ne crée pas de valeur. Des données <b>dupliquées</b>, <b>sans métadonnées</b>, <b>non gouvernées</b>, <b>non représentatives</b> ou <b>indisponibles au moment nécessaire</b> ralentissent la décision ou dégradent un modèle.</p>' +
      '<p>Principe : la valeur dépend du <b>contexte</b>, de la <b>qualité</b>, de l\'<b>accès</b> et de l\'<b>usage</b>.</p>',
    retenir: 'ajouter des lignes ne répare <b>aucune</b> des cinq causes : un doublon reste un doublon, un biais reste un biais ; la valeur vient de <b>contexte, qualité, accès et usage</b>.',
    steps: [
      [0, 'Le fichier fidélité grossit : <b>1,2 million de lignes</b>… la valeur ne suit pas.'],
      [5, 'Cinq causes : chacune <b>bloque</b> la donnée à un endroit de la chaîne.'],
      [17, '18 % de doublons : <b>216 000 lignes</b> en trop, pas une information de plus.'],
      [20, 'La valeur dépend de quatre facteurs : <b>contexte, qualité, accès, usage</b>.']
    ],
    draw: function (G, t) {
      var C = G.C, ctx = G.ctx;
      /* volume */
      var v = U.seg(t, 0, 4.5), aL = AL(t, 0);
      BX(G, 20, 30, 120, 290, { tone: 'none', alpha: aL });
      ctx.save(); ctx.globalAlpha *= aL * .9; ctx.fillStyle = C.goldSoft; ctx.fillRect(22, 318 - 286 * v, 116, 286 * v); ctx.restore();
      G.text('Volume', 80, 52, { size: 15, w: 700, sans: true, color: C.gold, align: 'center', alpha: aL });
      G.text(U.fmt(Math.round(v * 12) / 10, 1) + ' M lignes', 80, 300, { size: 13, w: 700, sans: true, color: C.ink, align: 'center', alpha: aL });
      /* part de doublons */
      var aD = AL(t, 17);
      ctx.save(); ctx.globalAlpha *= aD * .9; ctx.fillStyle = C.redSoft; ctx.strokeStyle = C.red; ctx.lineWidth = 1.5;
      ctx.fillRect(22, 66, 116, 286 * .18); ctx.strokeRect(22, 66, 116, 286 * .18); ctx.restore();
      G.text('18 % doublons', 80, 96, { size: 12, w: 700, sans: true, color: C.red, align: 'center', alpha: aD });
      /* cinq causes */
      CAUSES.forEach(function (c, i) {
        var a = AL(t, 5 + i * 2.3), y = 34 + i * 56;
        BX(G, 170, y, 240, 40, { tone: 'gold', label: c[0], size: 13, alpha: a });
        G.arrow(414, y + 20, 446, y + 20, { color: C.red, w: 2, alpha: a });
        G.text(c[1], 452, y + 25, { size: 14, w: 700, sans: true, color: C.red, alpha: a });
        XX(G, 680, y + 20, 7, AL(t, 5.6 + i * 2.3));
      });
      /* valeur */
      var aP = AL(t, 20), g = .12 + .7 * U.es(t, 21.5, 24);
      G.text('Valeur', 170, 346, { size: 14, w: 700, sans: true, color: C.green, alpha: AL(t, 0) });
      ctx.save(); ctx.globalAlpha *= AL(t, 0); ctx.fillStyle = C.grid; G.rrect(230, 336, 470, 14, 7); ctx.fill();
      ctx.fillStyle = C.green; G.rrect(230, 336, 470 * (t < 20 ? .12 : g), 14, 7); ctx.fill(); ctx.restore();
      ['contexte', 'qualité', 'accès', 'usage'].forEach(function (f, i) {
        G.badge(f, 200 + i * 130, 392, { tone: 'green', align: 'center', size: 14, alpha: AL(t, 20.3 + i * .4) * aP });
      });
    }
  });
})();

/* ------------------------------------------------ N25 : qualité selon l'usage --- */
(function () {
  var RARE = [9, 22, 37, 50, 61];
  function points(G, x, y, a, keep, sp) {
    sp = sp || 18;
    var ctx = G.ctx, C = G.C;
    for (var k = 0; k < 64; k++) {
      var rare = RARE.indexOf(k) >= 0;
      if (rare && !keep) continue;
      ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rare ? C.red : C.navy;
      ctx.beginPath(); ctx.arc(x + (k % 8) * sp, y + Math.floor(k / 8) * sp, rare ? 5.5 : 4, 0, 7); ctx.fill(); ctx.restore();
    }
  }
  SCENES.push({
    id: 'n25', part: 5, label: 'N25', short: 'N25 Qualité', title: 'La qualité dépend de l\'usage', dur: 26,
    enonce: '<p><b>Qualité des données ≠ même qualité pour tous les usages.</b> Pour la <b>BI</b>, on nettoie et on agrège pour produire un indicateur stable (formats de date, catégories produit harmonisées).</p>' +
      '<p>Pour l\'<b>IA / ML</b>, la <b>représentativité</b> devient essentielle : valeurs rares, erreurs ou cas atypiques peuvent être <b>utiles</b>. Question d\'architecte : « Quelle qualité est nécessaire pour <b>ce</b> workload ? »</p>',
    retenir: 'la qualité est une <b>aptitude à l\'emploi</b> : le nettoyage qui rend un indicateur stable peut effacer ce qu\'un modèle doit apprendre ; on <b>garde le brut</b> et on prépare <b>une version par workload</b>.',
    steps: [
      [0, 'Un même jeu de transactions, avec quelques <b>cas atypiques</b>.'],
      [4, 'Pour la BI : <b>nettoyer et agréger</b> → un indicateur stable.'],
      [9, 'Pour le ML : <b>garder les cas rares</b>, c\'est ce que le modèle doit apprendre.'],
      [14, 'Nettoyer pour l\'IA : 2 000 fraudes → 500. Le taux passe de <b>0,2 % à 0,05 %</b>.'],
      [20, 'Solution : <b>garder le brut</b>, une version par workload.']
    ],
    draw: function (G, t) {
      var C = G.C, ctx = G.ctx;
      var a0 = AL(t, 0);
      BX(G, 20, 110, 170, 190, { tone: 'none', label: 'Données brutes', top: true, size: 14, alpha: a0 });
      points(G, 42, 152, a0, true);
      G.badge('cas atypiques', 105, 322, { tone: 'red', align: 'center', size: 12, alpha: AL(t, 1.5) });
      /* branche BI */
      var aB = AL(t, 4);
      G.arrow(192, 170, 452, 90, { color: C.blue, w: 2.4, alpha: aB });
      G.badge('nettoyer + agréger', 320, 108, { tone: 'blue', align: 'center', size: 13, alpha: aB });
      BX(G, 456, 24, 244, 130, { tone: 'blue', label: 'BI / Reporting', top: true, size: 15, alpha: aB });
      points(G, 480, 60, AL(t, 5.5) * OUT(t, 7), false);
      var aI = AL(t, 7);
      G.line(480, 120, 680, 120, { color: C.line, w: 1.5, alpha: aI });
      ctx.save(); ctx.globalAlpha *= aI; ctx.strokeStyle = C.blue; ctx.lineWidth = 3; ctx.beginPath();
      [0, 1, 2, 3, 4, 5, 6, 7].forEach(function (i) { var x = 480 + i * 28, y = 95 - [0, 4, 2, 6, 5, 8, 7, 10][i] * U.seg(t, 7, 8.5); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
      ctx.stroke(); ctx.restore();
      G.text('indicateur stable', 578, 142, { size: 12, w: 700, sans: true, color: C.blue, align: 'center', alpha: aI });
      /* branche ML */
      var aM = AL(t, 9);
      G.arrow(192, 240, 452, 300, { color: C.plum, w: 2.4, alpha: aM });
      G.badge('garder les cas rares', 320, 290, { tone: 'plum', align: 'center', size: 13, alpha: aM });
      BX(G, 456, 220, 244, 160, { tone: 'plum', label: 'IA / ML', top: true, size: 15, alpha: aM });
      points(G, 494, 254, aM, true, 13);
      G.badge('représentativité', 578, 192, { tone: 'plum', align: 'center', size: 12, alpha: AL(t, 10.5) * OUT(t, 14) });
      /* le piège */
      var aP = AL(t, 14) * OUT(t, 20);
      G.badge('fraudes : 2 000 → 500   (0,2 % → 0,05 %)', 578, 192, { tone: 'red', align: 'center', size: 13, alpha: aP });
      XX(G, 320, 260, 9, aP);
      /* la solution */
      var aS = AL(t, 20);
      G.badge('garder le brut · une version par workload', 300, 396, { tone: 'green', align: 'center', size: 14, alpha: aS });
      G.text('Quelle qualité pour CE workload ?', 360, 200, { size: 15, w: 700, sans: true, it: true, color: C.ink, align: 'center', alpha: aS });
    }
  });
})();

/* ------------------------------------------------ N26 : gouvernance, métadonnées, observabilité --- */
(function () {
  var COL = [['Gouvernance', 'plum', ['Qui peut faire quoi,', 'selon quelles règles ?'], 'documentée, mais non fiable'],
    ['Métadonnées', 'blue', ['Que représente', 'cette donnée ?'], 'accessible, mais mal documentée'],
    ['Observabilité', 'green', ['Que se passe-t-il avec', 'elle, avec le pipeline ?'], 'fiable, mais indisponible']];
  var SIG = ['fraîcheur', 'volume', 'schéma', 'distribution', 'lignage'];
  SCENES.push({
    id: 'n26', part: 5, label: 'N26', short: 'N26 Gouvernance', title: 'Gouvernance, métadonnées, observabilité', dur: 26,
    enonce: '<p>Trois concepts accompagnent toute donnée qui doit avoir de la valeur : la <b>gouvernance</b> (politiques, responsabilités, règles d\'accès, qualité, conformité), les <b>métadonnées</b> (définition, source, propriétaire, schéma, sens, classification) et l\'<b>observabilité</b> (surveiller état, disponibilité, qualité et changements).</p>' +
      '<p>Une donnée peut être <b>accessible mais mal documentée</b>, <b>documentée mais non fiable</b>, <b>fiable mais indisponible</b>.</p>',
    retenir: 'chaque concept répond à <b>une</b> question — qui peut faire quoi ? que représente la donnée ? que se passe-t-il ? — et il en faut <b>les trois</b> : chacun bouche un trou que les deux autres laissent.',
    steps: [
      [0, 'Trois concepts, <b>trois questions</b>.'],
      [8, 'Il manque un seul des trois : la donnée <b>perd sa valeur</b>.'],
      [14, 'L\'observabilité en action : le pipeline des ventes reçoit <b>41 000 lignes sur 60 000</b>.'],
      [19, 'Le signal de <b>volume</b> déclenche l\'alerte à 6 h 30 : <b>38 magasins</b> manquent.']
    ],
    draw: function (G, t) {
      var C = G.C, ctx = G.ctx;
      COL.forEach(function (c, i) {
        var a = AL(t, i * 1.5), x = 20 + i * 232;
        BX(G, x, 20, 216, 100, { tone: c[1], label: c[0], top: true, size: 16, alpha: a });
        TX(G, c[2], x + 108, 74, { size: 13, align: 'center', color: C.muted, alpha: a });
        var aT = AL(t, 8 + i * 1.6);
        G.badge(c[3], x + 108, 142, { tone: 'red', align: 'center', size: 12, alpha: aT * OUT(t, 13.6) });
        G.badge('✓ ' + c[0].toLowerCase(), x + 108, 142, { tone: 'green', align: 'center', size: 12, alpha: AL(t, 13.6) });
      });
      /* pipeline observé */
      var aO = AL(t, 14);
      BX(G, 20, 190, 130, 56, { tone: 'none', label: 'Caisses', sub: '120 magasins', size: 14, alpha: aO });
      FLOW(G, t, 14, 18, 152, 218, 240, 218, { per: .3, dur: .6, color: C.gold, r: 4 });
      var r = 41 / 60 * U.es(t, 14.5, 18.5);
      G.text('Lignes reçues', 245, 200, { size: 13, w: 700, sans: true, color: C.muted, alpha: aO });
      ctx.save(); ctx.globalAlpha *= aO; ctx.fillStyle = C.grid; G.rrect(245, 210, 420, 18, 6); ctx.fill();
      ctx.fillStyle = t > 19 ? C.red : C.green; G.rrect(245, 210, 420 * r, 18, 6); ctx.fill(); ctx.restore();
      G.line(665, 202, 665, 236, { color: C.ink, w: 2, alpha: aO });
      G.text('attendu 60 000', 665, 252, { size: 12, w: 700, sans: true, color: C.ink, align: 'center', alpha: aO });
      G.text(String(Math.round(r * 60000 / 100) * 100).replace(/\B(?=(\d{3})+(?!\d))/g, ' '), 245 + 420 * r, 252, { size: 12, w: 700, sans: true, color: t > 19 ? C.red : C.green, align: 'center', alpha: aO });
      /* cinq signaux */
      SIG.forEach(function (s, i) {
        var hot = s === 'volume' && t > 19;
        G.badge(s, 85 + i * 138, 300, { tone: hot ? 'red' : 'blue', align: 'center', size: 13, alpha: AL(t, 15.5 + i * .4) });
      });
      var aA = AL(t, 19.5);
      BX(G, 160, 330, 400, 58, { tone: 'red', label: 'ALERTE 6 h 30 : 19 000 lignes manquent', sub: '38 magasins × 500 lignes : avant le tableau de bord', size: 15, alpha: aA });
    }
  });
})();
