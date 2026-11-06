/* Partie I — L'évolution des architectures : N7 à N12. */

/* ------------------------------------------------ N7 : sept contraintes et loi du découplage --- */
(function () {
  var K = ['Volume', 'Variété', 'Vitesse', 'Distribution', 'Complexité', 'Gouvernance', 'IA'];
  SCENES.push({
    id: 'n7', part: 1, label: 'N7', short: 'N7 Contraintes', title: 'Les sept contraintes et la loi du découplage', dur: 25,
    enonce: '<p>Chaque génération répond à un problème dominant. Sept contraintes augmentent : <b>volume</b>, <b>variété</b>, <b>vitesse</b>, <b>distribution</b>, <b>complexité</b>, <b>gouvernance</b>, <b>IA</b>.</p>' +
      '<p><b>Loi.</b> Plus les contraintes augmentent, plus l\'architecture doit <b>découpler les composants et les responsabilités</b>.</p>',
    retenir: 'le couplage transforme la croissance d\'une contrainte en <b>panne d\'une autre partie</b>. Découpler coupe la transmission — à la hauteur de ce qui croît.',
    steps: [
      [0, 'Les <b>sept contraintes</b> montent ensemble.'],
      [7, 'Système <b>couplé</b> : le volume grandit dans l\'ingestion…'],
      [10, '…et c\'est le reporting, à côté, qui tombe : la panne se <b>transmet</b>.'],
      [15, 'Système <b>découplé</b> : chaque bloc derrière une interface.'],
      [18, 'Le volume grandit : seule l\'ingestion grossit, le reste tient.'],
      [22, 'Loi : contraintes ↑ ⇒ découplage ↑.']
    ],
    draw: function (G, t) {
      var C = G.C;
      K.forEach(function (k, i) {
        var a = AL(t, i * .5), y = 30 + i * 26;
        G.text(k, 20, y + 10, { size: 13, w: 600, sans: true, alpha: a });
        GAUGE(G, 110, y, 110, U.clamp(.2 + .75 * U.seg(t, 1 + i * .3, 6 + i * .3), 0, 1), { alpha: a });
      });
      /* couplé */
      var aC = AL(t, 7), boom = U.seg(t, 10, 11);
      G.text('Couplé', 260, 40, { size: 16, w: 700, sans: true, color: C.red, alpha: aC });
      BX(G, 256, 54, 200, 150, { tone: 'none', alpha: aC });
      BX(G, 270, 70, 80 + 26 * U.seg(t, 7.5, 10), 54, { tone: 'gold', label: 'Ingestion', size: 13, alpha: aC });
      BX(G, 270 + 80 + 26 * U.seg(t, 7.5, 10), 70, 90 - 26 * U.seg(t, 7.5, 10), 54, { tone: boom ? 'red' : 'blue', label: 'Stockage', size: 12, alpha: aC });
      BX(G, 270, 134, 172, 54, { tone: boom ? 'red' : 'blue', label: 'Reporting', size: 13, alpha: aC });
      XX(G, 356, 161, 14, boom * aC);
      G.badge('panne transmise', 356, 226, { tone: 'red', align: 'center', size: 13, alpha: boom * aC });
      /* découplé */
      var aD = AL(t, 15), g = U.seg(t, 18, 20);
      G.text('Découplé', 480, 40, { size: 16, w: 700, sans: true, color: C.green, alpha: aD });
      BX(G, 476, 54, 110 + 40 * g, 54, { tone: 'gold', label: 'Ingestion', size: 13, alpha: aD });
      BX(G, 476, 134, 110, 54, { tone: 'green', label: 'Stockage', size: 13, alpha: aD });
      BX(G, 600, 134, 104, 54, { tone: 'green', label: 'Reporting', size: 13, alpha: aD });
      BX(G, 520, 112, 30, 18, { tone: 'plum', alpha: aD, r: 4 }); BX(G, 588, 152, 12, 18, { tone: 'plum', alpha: aD, r: 3 });
      G.text('interfaces', 640, 120, { size: 12, sans: true, it: true, color: C.plum, align: 'center', alpha: aD });
      G.check(true, 538, 214, { alpha: AL(t, 19) }); G.check(true, 652, 214, { alpha: AL(t, 19) });
      /* loi */
      var aL = AL(t, 22);
      BX(G, 60, 290, 600, 84, { tone: 'blue', alpha: aL });
      G.text('Contraintes ↑   ⇒   découplage des composants et des responsabilités ↑', 360, 324, { size: 16, w: 700, sans: true, color: C.navy, align: 'center', alpha: aL });
      G.text('découpler coûte : on le fait à la hauteur de ce qui croît', 360, 352, { size: 13, sans: true, it: true, color: C.muted, align: 'center', alpha: aL });
    }
  });
})();

/* ------------------------------------------------ N8 : principe d'évolution architecturale --- */
(function () {
  var GEN = [['1980-90', 'Systèmes opérationnels', 'OLTP'], ['1990-2000', 'Data Warehouse', 'analyse'], ['2000-10', 'Big Data', 'Hadoop, Spark'],
    ['2010-15', 'Data Lake', 'variété'], ['2015-20', 'Cloud', 'élasticité'], ['2020-23', 'Lakehouse', 'unifier'], ['2023-…', 'Aujourd\'hui', 'données prêtes pour l\'IA']];
  SCENES.push({
    id: 'n8', part: 1, label: 'N8', short: 'N8 Évolution', title: 'Le principe d\'évolution architecturale', dur: 27,
    enonce: '<p>L\'évolution n\'est pas « ancienne technologie → nouvelle technologie », mais <b>nouveau besoin → nouveau compromis architectural</b>.</p>' +
      '<p>Trois temps : <b>nouveau besoin</b> → <b>nouvelle contrainte</b> (volume, latence, variété, distribution) → <b>choix architectural</b> = composants + flux + compromis (coût, performance, scalabilité).</p>',
    retenir: 'les générations <b>s\'empilent</b>, et la réponse de chacune crée le problème de la suivante.',
    steps: [
      [0, 'Un <b>nouveau besoin</b> : analyser l\'historique des ventes.'],
      [3, 'Il fait naître une <b>nouvelle contrainte</b>.'],
      [6, 'D\'où un <b>choix architectural</b> : composants + flux + compromis.'],
      [10, 'Sept générations, chacune répond à un problème.'],
      [21, 'Elles s\'<b>empilent</b> : rien n\'est jeté.']
    ],
    draw: function (G, t) {
      var C = G.C;
      var T = [['Nouveau besoin', 'analyser l\'historique', 'plum'], ['Nouvelle contrainte', 'volume, latence…', 'red'], ['Choix architectural', 'composants + flux + compromis', 'blue']];
      T.forEach(function (b, i) {
        var a = AL(t, i * 3, .6) * (1 - .55 * U.seg(t, 10, 11));
        BX(G, 20 + i * 236, 20, 210, 64, { tone: b[2], label: b[0], sub: b[1], alpha: a });
        if (i) G.arrow(20 + i * 236 - 24, 52, 20 + i * 236 - 4, 52, { color: C.muted, w: 2, alpha: a });
      });
      var stack = U.seg(t, 21, 23);
      GEN.forEach(function (g, i) {
        var a = AL(t, 10 + i * 1.5, .6), x = 20 + i * 98, y = U.lerp(130 + i * 30, 380 - i * 34, stack);
        var w = U.lerp(92, 680, stack), xx = U.lerp(x, 20, stack), h = U.lerp(110, 30, stack);
        BX(G, xx, stack ? y - 28 : y, w, h, { tone: i === 6 ? 'green' : 'blue', alpha: a });
        if (stack < .5) {
          G.text(g[0], x + 46, y + 22, { size: 12, w: 700, sans: true, color: C.gold, align: 'center', alpha: a * (1 - stack * 2) });
          TX(G, g[1].split(' '), x + 46, y + 46, { size: 12, w: 700, align: 'center', alpha: a * (1 - stack * 2) });
          G.text(g[2], x + 46, y + 96, { size: 11, it: true, color: C.muted, align: 'center', alpha: a * (1 - stack * 2) });
          if (i) G.arrow(x - 8, y + 40, x - 2, y + 34, { color: C.gold, w: 1.5, alpha: a, head: 5 });
        } else {
          G.text(g[0] + ' · ' + g[1] + ' — ' + g[2], 360, y - 8, { size: 13, w: 600, sans: true, align: 'center', alpha: a * (stack * 2 - 1) });
        }
      });
      G.badge('la réponse de chacune crée le problème de la suivante', 360, 112, { tone: 'gold', align: 'center', size: 14, alpha: AL(t, 23) });
    }
  });
})();

/* ------------------------------------------------ N9 : architecture traditionnelle --- */
(function () {
  SCENES.push({
    id: 'n9', part: 1, label: 'N9', short: 'N9 Traditionnelle', title: 'L\'architecture traditionnelle : Applications → Base de données → Reporting', dur: 24,
    enonce: '<p>Trois blocs : <b>Applications</b> métiers (CRM, ERP, e-commerce) qui génèrent des données transactionnelles → <b>Base de données</b> transactionnelle (OLTP), intègre et cohérente, rapide en écriture → <b>Reporting</b> (requêtes SQL, exports, KPI, tableaux de bord).</p>',
    retenir: 'le reporting lit <b>la base des applications</b> : simple et cohérent, mais <b>un composant unique pour deux workloads opposés</b>.',
    steps: [
      [0, 'Les <b>applications</b> écrivent : Insert, Update, Delete.'],
      [5, 'La <b>base OLTP</b> garde des données intègres et cohérentes.'],
      [9, 'Le <b>reporting</b> lit la même base par des requêtes SQL.'],
      [13, 'Un gros rapport arrive : la base sature…'],
      [16.5, '…et les applications <b>ralentissent</b>.'],
      [20, 'Limite : deux workloads opposés sur un seul composant.']
    ],
    draw: function (G, t) {
      var C = G.C, heavy = U.seg(t, 13, 15) * OUT(t, 23, .5);
      ['CRM', 'ERP', 'E-commerce'].forEach(function (s, i) {
        var slow = U.seg(t, 16.5, 17.5);
        BX(G, 30, 50 + i * 90, 140, 56, { tone: slow ? 'red' : 'plum', label: s, sub: slow ? 'lent…' : 'utilisateurs opérationnels', ssize: 11, alpha: AL(t, i * .4) });
        G.line(170, 78 + i * 90, 300, 170, { color: C.line, w: 1.4, alpha: AL(t, i * .4) });
        FLOW(G, t, .5 + i * .3, 22, 170, 78 + i * 90, 296, 170, { per: slow ? 1.6 : .7, dur: slow ? 1.6 : .8, color: C.plum });
      });
      G.text('Insert · Update · Delete', 232, 40, { size: 12, w: 700, sans: true, color: C.plum, align: 'center', alpha: AL(t, 1) });
      CY(G, 360, 170, 110, 110, { alpha: AL(t, 5) });
      G.text('DB OLTP', 360, 172, { size: 16, w: 700, sans: true, color: C.gold, align: 'center', alpha: AL(t, 5) });
      GAUGE(G, 305, 256, 110, .3 + .65 * heavy, { label: heavy > .5 ? 'saturée' : 'charge', alpha: AL(t, 5) });
      BX(G, 540, 110, 150, 120, { tone: 'blue', label: 'Reporting', sub: 'KPI, tableaux de bord', alpha: AL(t, 9) });
      FLOW(G, t, 9.5, 12.5, 420, 170, 538, 170, { per: 1, dur: .8, color: C.blue });
      PK(G, 538, 170, 420, 170, U.seg(t, 13, 14.5), { color: C.red, r: 12, lab: 'rapport annuel' });
      G.text('requêtes SQL', 480, 158, { size: 12, w: 700, sans: true, color: C.blue, align: 'center', alpha: AL(t, 9) });
      var aB = AL(t, 20);
      BX(G, 40, 330, 640, 60, { tone: 'red', alpha: aB });
      G.text('un seul composant, deux workloads opposés : écrire vite / lire beaucoup', 360, 365, { size: 15, w: 700, sans: true, color: C.red, align: 'center', alpha: aB });
    }
  });
})();

/* ------------------------------------------------ N10 : Data Warehouse --- */
(function () {
  SCENES.push({
    id: 'n10', part: 1, label: 'N10', short: 'N10 Warehouse', title: 'Le Data Warehouse', dur: 25,
    enonce: '<p>Un <b>Data Warehouse</b> est une plateforme analytique conçue pour stocker des <b>données structurées préparées</b> pour les requêtes, rapports et analyses.</p>' +
      '<p>Exemple : <b>ventes consolidées par jour, produit, magasin et région</b> pour produire des KPI. Données <b>transformées avant ou pendant le chargement</b> ; optimisé pour les <b>agrégations</b> ; alimenté par des <b>pipelines</b> depuis les systèmes opérationnels.</p>',
    retenir: 'il échange du calcul à la lecture contre du calcul <b>à l\'écriture</b> : rapide et cohérent, mais rigide — <b>préparer, c\'est choisir les questions</b>.',
    steps: [
      [0, 'Les systèmes opérationnels envoient leurs ventes.'],
      [3, 'Un <b>pipeline</b> les transforme <b>avant</b> le chargement.'],
      [7, 'Elles sont rangées par <b>jour · produit · magasin · région</b>.'],
      [12, 'Les KPI tombent <b>instantanément</b>.'],
      [16.5, 'Nouvelle question : « ventes par heure ? » — le grain est le jour.'],
      [21, 'Bilan : préparer, c\'est choisir les questions.']
    ],
    draw: function (G, t) {
      var C = G.C;
      ['Caisses', 'E-commerce', 'ERP'].forEach(function (s, i) { BX(G, 16, 60 + i * 80, 110, 50, { tone: 'plum', label: s, size: 13, alpha: AL(t, i * .3) }); });
      BX(G, 160, 120, 110, 80, { tone: 'gold', label: 'Pipeline', sub: 'nettoyer, agréger', alpha: AL(t, 3) });
      for (var i = 0; i < 3; i++) FLOW(G, t, 1 + i * .3, 20, 126, 85 + i * 80, 160, 160, { per: 1, dur: .6, color: C.plum });
      FLOW(G, t, 4, 20, 270, 160, 310, 160, { per: .8, dur: .5, color: C.gold });
      /* cube */
      var a = AL(t, 7, .7), ctx = G.ctx, x = 320, y = 90, s = 130, d = 46;
      ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.blueSoft; ctx.strokeStyle = C.blue; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.rect(x, y + d, s, s); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y + d); ctx.lineTo(x + d, y); ctx.lineTo(x + s + d, y); ctx.lineTo(x + s, y + d); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + s, y + d); ctx.lineTo(x + s + d, y); ctx.lineTo(x + s + d, y + s); ctx.lineTo(x + s, y + s + d); ctx.closePath(); ctx.fill(); ctx.stroke();
      for (var k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x + k * s / 4, y + d); ctx.lineTo(x + k * s / 4, y + d + s); ctx.moveTo(x, y + d + k * s / 4); ctx.lineTo(x + s, y + d + k * s / 4); ctx.stroke(); }
      ctx.restore();
      G.text('Data Warehouse', x + 88, y - 14, { size: 15, w: 700, sans: true, color: C.navy, align: 'center', alpha: a });
      ['jour', 'produit', 'magasin', 'région'].forEach(function (l, i) {
        G.badge(l, 300 + i * 66, 300, { tone: 'gold', size: 12, alpha: AL(t, 8 + i * .7) });
      });
      G.text("axes choisis à l'avance", 300, 334, { size: 12, sans: true, it: true, color: C.muted, alpha: AL(t, 10) });
      /* KPI */
      var aK = AL(t, 12);
      BX(G, 572, 50, 132, 150, { tone: 'green', alpha: aK });
      G.text('KPI', 630, 76, { size: 15, w: 700, sans: true, color: C.green, align: 'center', alpha: aK });
      [.5, .8, .6, .95].forEach(function (h, i) { G.ctx.save(); G.ctx.globalAlpha *= aK; G.ctx.fillStyle = C.green; var hh = 80 * h * U.seg(t, 12, 13.5); G.ctx.fillRect(580 + i * 28, 186 - hh, 18, hh); G.ctx.restore(); });
      G.badge('< 1 s', 630, 222, { tone: 'green', align: 'center', size: 13, alpha: AL(t, 13.5) * OUT(t, 16.5) });
      /* question imprévue */
      var aQ = AL(t, 16.5);
      G.badge('« ventes par heure ? »', 630, 262, { tone: 'red', align: 'center', size: 14, alpha: aQ });
      XX(G, 630, 300, 12, AL(t, 18));
      G.text('le grain choisi = le jour', 630, 336, { size: 12, sans: true, it: true, color: C.red, align: 'center', alpha: AL(t, 18) });
      G.badge('préparer à l\'écriture = choisir les questions à l\'avance', 330, 395, { tone: 'gold', align: 'center', size: 14, alpha: AL(t, 21) });
    }
  });
})();

/* ------------------------------------------------ N11 : Data Lake --- */
(function () {
  var F = [['logs', 'blue'], ['JSON IoT', 'gold'], ['images', 'plum'], ['CSV', 'green'], ['documents', 'red'], ['données applis', 'blue']];
  SCENES.push({
    id: 'n11', part: 1, label: 'N11', short: 'N11 Lake', title: 'Le Data Lake', dur: 25,
    enonce: '<p>Un <b>Data Lake</b> stocke <b>à grande échelle</b> des données de <b>sources diverses</b>, souvent sous forme <b>brute</b> ou faiblement transformée.</p>' +
      '<p>Grande variété de formats · <b>séparation possible stockage / calcul</b> · données brutes utiles pour plusieurs usages · nécessite <b>gouvernance et métadonnées</b> pour éviter le <b>« data swamp »</b>.</p>',
    retenir: 'le lac <b>stocke d\'abord, interprète ensuite</b> ; sans discipline volontaire (métadonnées, gouvernance), le marécage est le résultat par défaut.',
    steps: [
      [0, 'Des fichiers de tous formats arrivent <b>bruts</b>.'],
      [5, 'On les conserve pour des <b>usages futurs</b>.'],
      [8.5, 'Le <b>calcul</b> est séparé du stockage : il vient lire quand il faut.'],
      [12.5, 'Sans métadonnées, personne ne sait plus ce qu\'il y a : <b>data swamp</b>.'],
      [17.5, 'Avec un <b>catalogue</b> et une gouvernance, le lac redevient clair.']
    ],
    draw: function (G, t) {
      var C = G.C, ctx = G.ctx, swamp = U.seg(t, 12.5, 14) * (1 - U.seg(t, 17.5, 19));
      /* le lac */
      var aL = AL(t, 0);
      ctx.save(); ctx.globalAlpha *= aL; ctx.fillStyle = swamp > .3 ? C.goldSoft : C.blueSoft; ctx.strokeStyle = swamp > .3 ? C.gold : C.blue; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(270, 270, 230, 88, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore();
      G.text(swamp > .3 ? 'data swamp' : 'Data Lake', 270, 352 + 24, { size: 16, w: 700, sans: true, color: swamp > .3 ? C.red : C.navy, align: 'center', alpha: aL });
      F.forEach(function (f, i) {
        var at = .3 + i * .7, p = U.out(U.seg(t, at, at + 1.6)), x = 90 + i * 72, y = U.lerp(30, 230 + (i % 2) * 40, p);
        var lab = swamp > .3 ? '???' : f[0];
        G.badge(lab, x, y, { tone: swamp > .3 ? 'gold' : f[1], align: 'center', size: 12, alpha: AL(t, at, .3) });
      });
      G.text('brut, sans schéma imposé', 270, 166, { size: 12, sans: true, it: true, color: C.muted, align: 'center', alpha: AL(t, 5) * OUT(t, 12.5) });
      /* calcul séparé */
      var aC = AL(t, 8.5);
      BX(G, 560, 80, 140, 80, { tone: 'green', label: 'Calcul', sub: 'à la lecture', alpha: aC });
      FLOW(G, t, 9, 12, 450, 260, 560, 130, { per: .9, dur: .9, color: C.green });
      G.text('stockage ≠ calcul', 630, 190, { size: 12, w: 700, sans: true, color: C.green, align: 'center', alpha: aC });
      XX(G, 630, 230, 12, swamp > .5 ? AL(t, 14) : 0);
      /* catalogue */
      var aM = AL(t, 17.5);
      BX(G, 540, 270, 170, 94, { tone: 'plum', alpha: aM });
      TX(G, ['Catalogue', 'source · date', 'format · propriétaire'], 625, 296, { size: 13, w: 600, align: 'center', alpha: aM });
      G.arrow(536, 300, 502, 290, { color: C.plum, w: 2, alpha: aM });
    }
  });
})();

/* ------------------------------------------------ N12 : Lakehouse --- */
(function () {
  SCENES.push({
    id: 'n12', part: 1, label: 'N12', short: 'N12 Lakehouse', title: 'Le Lakehouse', dur: 24,
    enonce: '<p>Le <b>Lakehouse</b> cherche à rapprocher la <b>flexibilité et l\'échelle</b> d\'un Data Lake des <b>capacités de gestion et d\'analyse</b> d\'un Data Warehouse.</p>' +
      '<p><b>Pourquoi ?</b> Réduire la <b>multiplication des copies</b> et rapprocher <b>BI, analytics et ML</b> sur un <b>socle de données commun</b>.</p>',
    retenir: 'au lieu de déplacer les données vers les garanties, il <b>apporte les garanties au stockage flexible</b> : moins de copies, un socle commun.',
    steps: [
      [0, 'Avant : un <b>lac</b> et un <b>entrepôt</b>, côte à côte.'],
      [3.5, 'Les données sont <b>copiées</b> de l\'un vers l\'autre : coûts, décalages.'],
      [9, 'Lakehouse : un <b>seul stockage flexible</b>…'],
      [12, '…avec une <b>couche de garanties</b> : transactions, schéma, gouvernance.'],
      [16, 'BI, analytics et ML lisent le <b>même socle</b>.']
    ],
    draw: function (G, t) {
      var C = G.C, m = U.seg(t, 8, 10);
      /* avant */
      var aA = AL(t, 0) * (1 - m);
      if (aA > 0) {
        BX(G, 40, 100, 220, 120, { tone: 'blue', label: 'Data Lake', sub: 'flexible, brut', alpha: aA });
        BX(G, 460, 100, 220, 120, { tone: 'gold', label: 'Data Warehouse', sub: 'préparé, gouverné', alpha: aA });
        FLOW(G, t, 3.5, 8, 260, 160, 460, 160, { per: .5, dur: 1, color: C.red, alpha: aA });
        G.badge('copies · coûts · décalage', 360, 260, { tone: 'red', align: 'center', size: 14, alpha: AL(t, 5) * aA });
        G.badge('BI', 570, 50, { tone: 'green', align: 'center', alpha: aA * AL(t, 1) });
        G.badge('ML', 150, 50, { tone: 'plum', align: 'center', alpha: aA * AL(t, 1) });
      }
      /* lakehouse */
      var aS = AL(t, 9), aG = AL(t, 12);
      BX(G, 110, 250, 500, 80, { tone: 'blue', label: 'Stockage flexible et à grande échelle', sub: 'fichiers ouverts, tous formats', alpha: aS });
      BX(G, 110, 170, 500, 64, { tone: 'gold', label: 'Couche de garanties', sub: 'transactions · schéma · gouvernance', alpha: aG });
      ['BI', 'Analytics', 'ML'].forEach(function (s, i) {
        var a = AL(t, 16 + i * .5);
        BX(G, 150 + i * 160, 50, 120, 50, { tone: ['green', 'blue', 'plum'][i], label: s, alpha: a });
        G.arrow(210 + i * 160, 102, 210 + i * 160, 166, { color: C.muted, w: 1.8, alpha: a });
      });
      G.badge('un socle commun, moins de copies', 360, 380, { tone: 'green', align: 'center', size: 15, alpha: AL(t, 19) });
    }
  });
})();
