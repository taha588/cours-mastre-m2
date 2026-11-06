/* Partie 0 — Les fondations : N1 à N6. Canvas logique 720 x 420. */

/* ------------------------------------------------ N1 : la donnée et ses quatre conditions de valeur --- */
(function () {
  var COND = [['Comprise', 'on sait ce qu\'elle représente', 'solde du compte, en DH'],
    ['Contextualisée', 'à quoi, à qui, à quand', 'client C001 · Ahmed · 2024'],
    ['Accessible', 'au moment où on en a besoin', 'disponible pour le conseiller'],
    ['Utilisée correctement', 'usage légitime et adapté', 'décider d\'un crédit']];
  SCENES.push({
    id: 'n1', part: 0, label: 'N1', short: 'N1 Donnée', title: 'La donnée : définition et condition de valeur', dur: 22,
    enonce: '<p>Une <b>donnée</b> est un fait, une observation, un chiffre, un mot ou une autre information pouvant être <b>collectée et exploitée</b>.</p>' +
      '<p>Elle n\'a de <b>valeur</b> que si elle est <b>comprise</b>, <b>contextualisée</b>, <b>accessible</b> et <b>utilisée correctement</b>. Les quatre se cumulent : <b>une seule manque, la valeur tombe</b>.</p>',
    retenir: 'la condition qui manque est exactement le <b>chantier d\'architecture</b> à ouvrir — le volume ne compense jamais.',
    steps: [
      [0, 'Une donnée brute : le nombre <b>1200</b>. Seul, il ne dit rien.'],
      [3, '<b>Comprise</b> : on sait ce qu\'il représente.'],
      [6, '<b>Contextualisée</b> : à qui, à quoi, à quand il se rattache.'],
      [9, '<b>Accessible</b> et <b>utilisée correctement</b> : la valeur est pleine.'],
      [14, 'Une seule condition manque (accès) : la valeur <b>tombe</b>.'],
      [18.5, 'Bilan : quatre conditions cumulées.']
    ],
    draw: function (G, t) {
      var C = G.C;
      /* la donnée */
      var a0 = AL(t, 0, .6);
      BX(G, 30, 120, 190, 130, { tone: 'blue', alpha: a0 });
      G.text('1200', 125, 192, { size: 46, w: 700, color: C.navy, align: 'center', alpha: a0 });
      G.text('un fait, un chiffre', 125, 228, { size: 13, sans: true, color: C.muted, align: 'center', alpha: a0 });
      G.text('?', 125, 112, { size: 30, w: 700, color: C.red, align: 'center', alpha: a0 * OUT(t, 3, .6) });
      /* les quatre conditions */
      var fail = U.seg(t, 14, 15);
      COND.forEach(function (c, i) {
        var at = i < 2 ? 3 + i * 3 : 9 + (i - 2) * 1.6, a = AL(t, at, .6), y = 40 + i * 74;
        var ko = i === 2 && fail > 0;
        BX(G, 280, y, 410, 60, { tone: ko ? 'red' : 'green', alpha: a });
        G.text(c[0], 300, y + 25, { size: 17, w: 700, sans: true, color: ko ? C.red : C.green, alpha: a });
        G.text(c[1], 300, y + 46, { size: 13, sans: true, color: C.muted, alpha: a });
        G.text(c[2], 676, y + 36, { size: 13, sans: true, it: true, color: C.ink, align: 'right', alpha: a });
        G.check(!ko, 262, y + 30, { alpha: a });
        G.arrow(222, 185, 276, y + 30, { color: C.line, w: 1.2, alpha: a * .8, head: 6 });
      });
      /* jauge de valeur */
      var v = U.clamp(U.seg(t, 3, 12) * (1 - fail * .9), .02, 1);
      G.text('Valeur', 30, 300, { size: 14, w: 700, sans: true, color: C.navy, alpha: AL(t, 3) });
      G.ctx.save(); G.ctx.globalAlpha *= AL(t, 3); G.ctx.fillStyle = C.grid; G.rrect(30, 310, 190, 12, 6); G.ctx.fill(); G.ctx.fillStyle = fail > 0 ? C.red : C.green; G.rrect(30, 310, Math.max(12, 190 * v), 12, 6); G.ctx.fill(); G.ctx.restore();
      G.badge(fail > 0 ? 'une condition manque → valeur ≈ 0' : '4 conditions → pleine valeur', 30, 350, { tone: fail > 0 ? 'red' : 'green', size: 13, alpha: AL(t, 11) });
      G.badge('comprise · contextualisée · accessible · bien utilisée', 360, 398, { tone: 'gold', align: 'center', size: 14, alpha: AL(t, 18.5) });
    }
  });
})();

/* ------------------------------------------------ N2 : structuré / semi-structuré / non structuré --- */
(function () {
  SCENES.push({
    id: 'n2', part: 0, label: 'N2', short: 'N2 Familles', title: 'Données structurées, semi-structurées et non structurées', dur: 23,
    enonce: '<p>Trois familles selon <b>la place du schéma</b> :</p><p>1. <b>Structurées</b> : organisation tabulaire, schéma <b>explicite</b> (colonnes, types, contraintes).</p>' +
      '<p>2. <b>Semi-structurées</b> : le schéma <b>voyage avec la donnée</b> (JSON, XML, logs) et peut varier.</p><p>3. <b>Non structurées</b> : texte libre, images, audio, vidéo — <b>pas de schéma</b>, il faut extraire le sens.</p>',
    retenir: 'ce n\'est pas le format qui compte, mais <b>la position du schéma</b> : avant la donnée, avec elle, ou nulle part.',
    steps: [
      [0, '<b>Structuré</b> : le schéma (colonnes, types) est posé <b>avant</b> les lignes.'],
      [5, '<b>Semi-structuré</b> : chaque enregistrement porte ses propres clés.'],
      [10, '<b>Non structuré</b> : image, texte, audio — aucun schéma.'],
      [14.5, 'Pour en tirer quelque chose, il faut <b>extraire le sens</b>.'],
      [19, 'Bilan : schéma avant · avec · nulle part.']
    ],
    draw: function (G, t) {
      var C = G.C, x0 = [20, 256, 492], w = 210;
      ['Structurées', 'Semi-structurées', 'Non structurées'].forEach(function (n, i) {
        var a = AL(t, i * 5, .6);
        BX(G, x0[i], 20, w, 300, { tone: ['blue', 'gold', 'plum'][i], alpha: a * .9 });
        G.text(n, x0[i] + w / 2, 46, { size: 17, w: 700, sans: true, color: [C.navy, C.gold, C.plum][i], align: 'center', alpha: a });
      });
      /* tableau */
      var a1 = AL(t, 0, .6), cols = ['ID', 'Nom', 'Ville', 'Solde'], cx = [34, 74, 122, 186];
      G.ctx.save(); G.ctx.globalAlpha *= a1; G.ctx.fillStyle = C.navy; G.ctx.fillRect(30, 66, 190, 26); G.ctx.restore();
      cols.forEach(function (c, j) { G.text(c, cx[j], 84, { size: 13, w: 700, sans: true, color: C.surface, alpha: a1 }); });
      [['C001', 'Ahmed', 'Casa', '1200'], ['C002', 'Sara', 'Rabat', '850'], ['C003', 'Youssef', 'Tanger', '560']].forEach(function (r, k) {
        var a = AL(t, 1.5 + k * .7);
        r.forEach(function (c, j) { G.text(c, cx[j], 116 + k * 26, { size: 13, sans: true, alpha: a }); });
        G.line(30, 124 + k * 26, 220, 124 + k * 26, { color: C.line, w: 1, alpha: a });
      });
      G.badge('schéma AVANT', 125, 240, { tone: 'blue', align: 'center', size: 14, alpha: AL(t, 3) });
      /* JSON */
      var J = [['{ ', '"id"', ': "C001",'], ['  ', '"nom"', ': "Ahmed",'], ['  ', '"ville"', ': "Casa",'], ['  ', '"tags"', ': ["vip"] }']];
      J.forEach(function (l, k) {
        var a = AL(t, 5.5 + k * .5), y = 94 + k * 26;
        G.text(l[0], 268, y, { size: 13, sans: true, alpha: a });
        G.text(l[1], 282, y, { size: 13, sans: true, w: 700, color: C.gold, alpha: a });
        G.text(l[2], 282 + G.measure(l[1], { size: 13, w: 700, sans: true }) + 2, y, { size: 13, sans: true, alpha: a });
      });
      G.text('le 2ᵉ client n\'a pas de « tags »', 361, 210, { size: 12, sans: true, it: true, color: C.muted, align: 'center', alpha: AL(t, 7.5) });
      G.badge('schéma AVEC la donnée', 361, 240, { tone: 'gold', align: 'center', size: 14, alpha: AL(t, 7.5) });
      /* non structuré */
      var a3 = AL(t, 10, .6), ctx = G.ctx;
      ctx.save(); ctx.globalAlpha *= a3; ctx.strokeStyle = C.plum; ctx.lineWidth = 1.6;
      ctx.strokeRect(508, 72, 80, 60); ctx.beginPath(); ctx.moveTo(512, 126); ctx.lineTo(535, 98); ctx.lineTo(552, 116); ctx.lineTo(566, 104); ctx.lineTo(584, 126); ctx.stroke();
      ctx.beginPath(); ctx.arc(570, 86, 6, 0, 7); ctx.stroke();
      for (var k = 0; k < 9; k++) { var h = 6 + 18 * Math.abs(Math.sin(k * 1.7 + t * 3)); ctx.fillStyle = C.plum; ctx.fillRect(604 + k * 9, 102 - h / 2, 5, h); }
      ctx.restore();
      TX(G, ['« Livraison en retard, le', 'colis était abîmé… »'], 512, 160, { size: 13, it: true, alpha: a3 });
      G.text('image · audio · texte libre', 597, 210, { size: 12, sans: true, it: true, color: C.muted, align: 'center', alpha: a3 });
      G.badge('PAS de schéma', 597, 240, { tone: 'plum', align: 'center', size: 14, alpha: AL(t, 12) });
      var ax = AL(t, 14.5);
      G.arrow(597, 262, 597, 290, { color: C.plum, w: 2, alpha: ax });
      G.text('extraire : sentiment = négatif', 597, 308, { size: 12, w: 600, sans: true, color: C.plum, align: 'center', alpha: ax });
      G.badge('la différence = la position du schéma', 360, 380, { tone: 'green', align: 'center', size: 15, alpha: AL(t, 19) });
    }
  });
})();

/* ------------------------------------------------ N3 : la gestion des données et ses cinq missions --- */
(function () {
  var M = [['Collecter', 'et intégrer'], ['Stocker', 'selon les workloads'], ['Gouverner', 'sécuriser, accès'], ['Cycle de vie', 'traçabilité, observ.'], ['Fournir', 'des données utilisables']];
  SCENES.push({
    id: 'n3', part: 0, label: 'N3', short: 'N3 Gestion', title: 'La gestion des données et ses cinq missions', dur: 24,
    enonce: '<p>La <b>gestion des données</b> est la collecte, le traitement et l\'utilisation <b>sécurisés et efficaces</b> des données pour <b>améliorer les résultats de l\'entreprise</b>.</p>' +
      '<p>Cinq missions : <b>collecter et intégrer</b> · <b>stocker</b> selon les workloads · <b>gouverner, sécuriser</b> · gérer le <b>cycle de vie</b>, la traçabilité, l\'observabilité · <b>fournir</b> des données utilisables.</p>',
    retenir: 'cinq missions, à la fois <b>sécurisées et efficaces</b>, et jugées sur les <b>résultats de l\'entreprise</b>.',
    steps: [
      [0, 'Des sources diverses : CRM, capteurs, fichiers.'],
      [3, 'Mission 1 : <b>collecter et intégrer</b>.'],
      [6, 'Mission 2 : <b>stocker</b> selon les workloads.'],
      [9, 'Missions 3 et 4 : <b>gouverner</b> et suivre le <b>cycle de vie</b> — sur tout le trajet.'],
      [14, 'Mission 5 : <b>fournir</b> aux métiers, analystes, data scientists, ingénieurs IA.'],
      [19.5, 'Le juge : les résultats de l\'entreprise.']
    ],
    draw: function (G, t) {
      var C = G.C;
      ['CRM', 'Capteurs', 'Fichiers'].forEach(function (s, i) { BX(G, 14, 70 + i * 70, 84, 46, { tone: 'none', label: s, size: 13, alpha: AL(t, i * .3) }); });
      var X = [130, 245, 0, 0, 470];
      BX(G, 120, 110, 110, 90, { tone: 'blue', label: M[0][0], sub: M[0][1], alpha: AL(t, 3) });
      CY(G, 300, 155, 90, 70, { alpha: AL(t, 6) });
      G.text(M[1][0], 300, 155, { size: 15, w: 700, sans: true, color: C.gold, align: 'center', alpha: AL(t, 6) });
      G.text(M[1][1], 300, 226, { size: 12, sans: true, color: C.muted, align: 'center', alpha: AL(t, 6) });
      BX(G, 380, 110, 120, 90, { tone: 'blue', label: M[4][0], sub: M[4][1], ssize: 11, alpha: AL(t, 14) });
      ['Métiers', 'Analystes', 'Data scientists', 'Ingénieurs IA'].forEach(function (s, i) {
        BX(G, 560, 40 + i * 62, 146, 44, { tone: 'plum', label: s, size: 13, alpha: AL(t, 14.5 + i * .3) });
        G.arrow(502, 155, 556, 62 + i * 62, { color: C.muted, w: 1.3, alpha: AL(t, 14.5 + i * .3), head: 6 });
      });
      for (var i = 0; i < 3; i++) FLOW(G, t, 3.5 + i * .3, 20, 98, 93 + i * 70, 120, 155, { per: 1.2, dur: .7 });
      FLOW(G, t, 4, 20, 230, 155, 255, 155, { per: 1, dur: .5 });
      FLOW(G, t, 7, 20, 345, 155, 380, 155, { per: 1, dur: .5 });
      /* bandes transverses */
      var a3 = AL(t, 9), a4 = AL(t, 11);
      BX(G, 110, 250, 400, 34, { tone: 'red', label: 'Gouverner · sécuriser · contrôler les accès', size: 14, alpha: a3, dash: [6, 4] });
      BX(G, 110, 292, 400, 34, { tone: 'green', label: 'Cycle de vie · traçabilité · observabilité', size: 14, alpha: a4, dash: [6, 4] });
      G.line(110, 240, 110, 330, { color: C.line, w: 1, alpha: a3 }); G.line(510, 240, 510, 330, { color: C.line, w: 1, alpha: a3 });
      G.badge('sécurisée + efficace  →  résultats de l\'entreprise', 360, 380, { tone: 'gold', align: 'center', size: 15, alpha: AL(t, 19.5) });
    }
  });
})();

/* ------------------------------------------------ N4 : quatre causes de complexité et le socle --- */
(function () {
  SCENES.push({
    id: 'n4', part: 0, label: 'N4', short: 'N4 Complexité', title: 'Pourquoi la gestion devient complexe : quatre causes et un socle', dur: 25,
    enonce: '<p>Quatre causes : <b>Volume</b> (Mo → Go → To → Po), <b>Silos</b> (CRM, e-commerce, support non intégrés), <b>Formats</b> (structuré, semi, non structuré : PDF, JPG, MP4, MP3, logs), <b>IA</b> (données de qualité, contexte).</p>' +
      '<p>Réponse : un <b>socle</b> où les données sont <b>stockées, intégrées, gouvernées, transformées et préparées</b>.</p>',
    retenir: 'les quatre causes <b>se multiplient</b> au lieu de s\'additionner : la réponse n\'est pas un outil de plus, mais un <b>socle</b>.',
    steps: [
      [0, '<b>Volume</b> : du Mo au Po.'],
      [4, '<b>Silos</b> : chaque métier garde ses données.'],
      [8, '<b>Formats</b> : documents, images, vidéos, audio, logs.'],
      [12, '<b>IA</b> : exige qualité et contexte.'],
      [15.5, 'Elles <b>se multiplient</b> : chaque cause aggrave les autres.'],
      [19, 'Réponse : un <b>socle</b> commun.']
    ],
    draw: function (G, t) {
      var C = G.C, P = [[20, 20], [370, 20], [20, 160], [370, 160]];
      var mul = U.seg(t, 15.5, 16.5);
      ['Volume', 'Silos', 'Formats', 'IA'].forEach(function (n, i) {
        var a = AL(t, i * 4, .6);
        BX(G, P[i][0], P[i][1], 330, 124, { tone: mul > 0 ? 'red' : 'blue', alpha: a });
        G.text((i + 1) + '. ' + n, P[i][0] + 14, P[i][1] + 26, { size: 17, w: 700, sans: true, color: mul > 0 ? C.red : C.navy, alpha: a });
      });
      /* volume */
      var u = ['Mo', 'Go', 'To', 'Po'], k = Math.min(3, Math.floor(U.seg(t, .5, 3.5) * 4));
      G.text(u[k], 185, 104, { size: 46, w: 700, color: C.navy, align: 'center', alpha: AL(t, .3) });
      /* silos */
      ['CRM', 'E-commerce', 'Support'].forEach(function (s, i) { CY(G, 420 + i * 100, 82, 60, 36, { label: s, alpha: AL(t, 4.3 + i * .3) }); });
      XX(G, 470, 82, 6, AL(t, 6)); XX(G, 570, 82, 6, AL(t, 6));
      /* formats */
      ['PDF', 'JPG', 'MP4', 'MP3', 'logs'].forEach(function (s, i) { G.badge(s, 40 + i * 60, 228, { tone: ['blue', 'plum', 'red', 'gold', 'green'][i], size: 13, alpha: AL(t, 8.3 + i * .3) }); });
      G.text('structuré · semi · non structuré', 185, 266, { size: 13, sans: true, color: C.muted, align: 'center', alpha: AL(t, 9.5) });
      /* IA */
      TX(G, ['données de qualité,', 'représentatives,', 'avec leur contexte'], 390, 214, { size: 14, alpha: AL(t, 12.3) });
      var ctx = G.ctx, a4 = AL(t, 12.3);
      ctx.save(); ctx.globalAlpha *= a4; ctx.strokeStyle = C.navy; ctx.lineWidth = 1.4;
      [[600, 200], [640, 220], [600, 240], [660, 250], [630, 270]].forEach(function (p, i, A) { if (i) { ctx.beginPath(); ctx.moveTo(A[i - 1][0], A[i - 1][1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); } });
      ctx.restore();
      [[600, 200], [640, 220], [600, 240], [660, 250], [630, 270]].forEach(function (p) { G.ctx.save(); G.ctx.globalAlpha *= a4; G.ctx.fillStyle = C.navy; G.ctx.beginPath(); G.ctx.arc(p[0], p[1], 5, 0, 7); G.ctx.fill(); G.ctx.restore(); });
      /* multiplication */
      G.text('×', 360, 90, { size: 34, w: 700, color: C.red, align: 'center', base: 'middle', alpha: mul });
      G.text('×', 185, 152, { size: 34, w: 700, color: C.red, align: 'center', base: 'middle', alpha: mul });
      G.text('×', 535, 152, { size: 34, w: 700, color: C.red, align: 'center', base: 'middle', alpha: mul });
      G.text('×', 360, 230, { size: 34, w: 700, color: C.red, align: 'center', base: 'middle', alpha: mul });
      /* socle */
      var aS = AL(t, 19, .7);
      BX(G, 20, 300, 680, 100, { tone: 'green', alpha: aS });
      G.text('Le socle de données', 360, 328, { size: 18, w: 700, sans: true, color: C.green, align: 'center', alpha: aS });
      ['stockées', 'intégrées', 'gouvernées', 'transformées', 'préparées'].forEach(function (s, i) {
        G.badge(s, 92 + i * 134, 368, { tone: 'green', align: 'center', size: 14, alpha: AL(t, 19.5 + i * .4) });
      });
    }
  });
})();

/* ------------------------------------------------ N5 : l'architecture de données --- */
(function () {
  var E = [['Collecte', 'sources'], ['Ingestion', 'batch / temps réel'], ['Stockage', 'lake, warehouse…'], ['Traitement', 'nettoyer, transformer'], ['Consommation', 'BI, ML, IA, applis']];
  var O = ['composants', 'flux', 'responsabilités', 'stockages', 'traitements', 'interfaces', 'contraintes'];
  SCENES.push({
    id: 'n5', part: 0, label: 'N5', short: 'N5 Architecture', title: 'L\'architecture de données : définition opérationnelle', dur: 24,
    enonce: '<p>Une <b>architecture de données</b> décrit <b>comment</b> les données sont gérées, de la <b>collecte</b> et la <b>transformation</b> jusqu\'à la <b>distribution</b> et la <b>consommation</b>.</p>' +
      '<p>Pour l\'architecte, elle organise les <b>composants</b>, <b>flux</b>, <b>responsabilités</b>, <b>stockages</b>, <b>traitements</b>, <b>interfaces</b> et <b>contraintes</b> nécessaires aux <b>usages</b>.</p>',
    retenir: 'elle décrit le <b>comment</b>, de la collecte à la consommation, par sept objets — tous <b>dérivés des usages</b>.',
    steps: [
      [0, 'Le chemin de la donnée en <b>cinq étapes</b>.'],
      [7, 'La donnée circule de la collecte à la consommation.'],
      [11, 'L\'architecte organise <b>sept objets</b>.'],
      [17.5, 'Tout se décide en partant des <b>usages</b>.']
    ],
    draw: function (G, t) {
      var C = G.C;
      E.forEach(function (e, i) {
        var a = AL(t, i * 1.2, .6), x = 14 + i * 142;
        BX(G, x, 60, 124, 76, { tone: i === 4 ? 'plum' : i === 2 ? 'gold' : 'blue', label: (i + 1) + '. ' + e[0], sub: e[1], ssize: 11, alpha: a });
        if (i) G.arrow(x - 18, 98, x - 2, 98, { color: C.muted, w: 1.6, alpha: a, head: 7 });
      });
      G.line(70, 148, 650, 148, { color: C.line, w: 1.2, dash: [4, 4], alpha: AL(t, 7) });
      FLOW(G, t, 7, 22, 70, 148, 650, 148, { per: .9, dur: 3.2 });
      O.forEach(function (o, i) {
        var a = AL(t, 11 + i * .7), x = 120 + (i % 4) * 160, y = 200 + Math.floor(i / 4) * 52;
        if (i >= 4) x += 80;
        G.badge(o, x, y, { tone: 'blue', align: 'center', size: 15, alpha: a });
      });
      G.text('ce que l\'architecte organise', 360, 172, { size: 14, w: 600, sans: true, it: true, color: C.muted, align: 'center', alpha: AL(t, 11) });
      var aU = AL(t, 17.5);
      BX(G, 560, 310, 146, 50, { tone: 'plum', label: 'USAGES', size: 16, alpha: aU });
      G.arrow(556, 335, 120, 335, { color: C.plum, w: 2.4, alpha: aU });
      G.text('tout en dérive', 340, 326, { size: 14, w: 700, sans: true, color: C.plum, align: 'center', alpha: aU });
      G.badge('le comment, de la collecte à la consommation', 360, 392, { tone: 'green', align: 'center', size: 14, alpha: AL(t, 19) });
    }
  });
})();

/* ------------------------------------------------ N6 : la grille des huit décisions --- */
(function () {
  var Q = [['Où arrivent les données ?', 'Sources / ingestion'], ['Où les conserver ?', 'Storage'], ['Comment les déplacer ?', 'Batch / Stream / CDC'],
    ['Où les transformer ?', 'Processing'], ['Qui va les consommer ?', 'BI / ML / AI / applis'], ['Quel niveau de fraîcheur ?', 'Latence / SLA'],
    ['Qui peut y accéder ?', 'Sécurité / gouvernance'], ['Comment vérifier leur état ?', 'Quality / observability']];
  var ORD = [4, 5, 0, 2, 3, 1, 6, 7];   /* ordre de remplissage : on part des usages */
  SCENES.push({
    id: 'n6', part: 0, label: 'N6', short: 'N6 Grille', title: 'La grille des décisions de l\'architecte', dur: 26,
    enonce: '<p>Concevoir une architecture, c\'est répondre à <b>huit questions</b>, chacune engageant une <b>décision</b> : sources / ingestion · storage · batch / stream / CDC · processing · consommateurs · latence / SLA · sécurité / gouvernance · qualité / observabilité.</p>' +
      '<p><b>CDC</b> (<i>Change Data Capture</i>) : capter au fil de l\'eau les modifications d\'une source au lieu de la relire entière.</p>',
    retenir: 'la grille se lit dans l\'ordre du trajet, mais <b>se remplit en partant des usages</b> : qui consomme, quelle fraîcheur — puis on remonte.',
    steps: [
      [0, 'Huit questions, huit décisions.'],
      [9, 'Mais on ne remplit pas la grille de haut en bas…'],
      [11, 'On commence par <b>qui consomme</b> et <b>quelle fraîcheur</b>.'],
      [16, 'Puis on remonte : sources, déplacement, transformation, stockage.'],
      [21, 'Enfin les autres <b>transverses</b> : accès et qualité (la fraîcheur en était une).']
    ],
    draw: function (G, t) {
      var C = G.C;
      G.text('Question', 40, 30, { size: 13, w: 700, sans: true, color: C.muted, alpha: AL(t, 0) });
      G.text('Décision', 420, 30, { size: 13, w: 700, sans: true, color: C.muted, alpha: AL(t, 0) });
      Q.forEach(function (q, i) {
        var y = 42 + i * 44, a = AL(t, i * .9, .5), k = ORD.indexOf(i);
        var fillAt = k < 2 ? 11 + k * 2 : k < 6 ? 16 + (k - 2) * 1.2 : 21 + (k - 6) * 1.5, f = AL(t, fillAt, .6);
        var tone = i >= 5 ? 'red' : i === 4 ? 'plum' : 'blue';
        BX(G, 30, y, 360, 36, { tone: 'none', alpha: a });
        G.text(q[0], 44, y + 23, { size: 15, sans: true, w: 600, alpha: a });
        BX(G, 410, y, 280, 36, { tone: tone, alpha: a * (.35 + .65 * f) });
        G.text(q[1], 550, y + 23, { size: 14, sans: true, w: 700, color: C[tone === 'none' ? 'ink' : tone], align: 'center', alpha: a * (.25 + .75 * f) });
        if (f > 0 && t >= 11) G.text(String(k + 1), 702, y + 23, { size: 14, w: 700, sans: true, color: C.gold, align: 'center', alpha: f });
      });
      var aA = AL(t, 9) * OUT(t, 24);
      G.arrow(16, 260, 16, 60, { color: C.gold, w: 2.6, alpha: aA * AL(t, 16) });
      G.badge('5 questions de lieu · 3 transverses · 8 compromis', 360, 404, { tone: 'gold', align: 'center', size: 14, alpha: AL(t, 23) });
    }
  });
})();
