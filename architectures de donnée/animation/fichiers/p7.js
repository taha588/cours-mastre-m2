/* Partie VII — Les cinq couches d'une architecture de données moderne : N30 à N35. */

/* point plein */
function DOT(G, x, y, r, col, a) {
  var ctx = G.ctx; ctx.save(); ctx.globalAlpha *= (a === undefined ? 1 : a); ctx.fillStyle = col;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore();
}
/* barre pleine */
function BAR(G, x, y, w, h, tone, a) {
  var C = G.C, ctx = G.ctx; if (w <= 0) return;
  ctx.save(); ctx.globalAlpha *= (a === undefined ? 1 : a); ctx.fillStyle = C[tone + 'Soft']; ctx.strokeStyle = C[tone]; ctx.lineWidth = 1.5;
  G.rrect(x, y, w, h, 4); ctx.fill(); ctx.stroke(); ctx.restore();
}

/* ------------------------------------------------ N30 : les cinq couches --- */
(function () {
  var LAY = [['Sources', ['d\'où vient', 'la donnée ?'], 'gold'], ['Ingestion', ['comment', 'entre-t-elle ?'], 'blue'],
    ['Storage', ['où vit-elle ?'], 'plum'], ['Processing', ['comment la', 'rendre utile ?'], 'green'], ['Consommation', ['qui', 'l\'utilise ?'], 'red']];
  var FR = [['ingestion', 300, 'blue'], ['features', 200, 'plum'], ['score', 150, 'green'], ['retour', 100, 'red']];
  SCENES.push({
    id: 'n30', part: 7, label: 'N30', short: 'N30 Cinq couches', title: 'Les cinq couches d\'une architecture moderne', dur: 26,
    enonce: '<p>Une architecture de données moderne s\'organise en <b>cinq couches</b> : <b>sources</b>, <b>ingestion</b>, <b>stockage</b>, <b>traitement</b> et <b>consommation</b> (analytics et IA). Chaque couche répond à <b>une question</b> et se choisit selon ses propres critères.</p>' +
      '<p>Les couches forment un <b>socle commun</b> : chaque source s\'y branche une fois, chaque usage y puise une fois.</p>',
    retenir: 'une couche = <b>une question</b> ; le socle remplace des liaisons <b>S × C</b> par <b>S + C</b> ; chaque trajet a son <b>budget de latence</b>, qui se répartit entre les couches.',
    steps: [
      [0, 'La chaîne : <b>sources → ingestion → storage → processing → consommation</b>.'],
      [6, 'Chaque couche répond à <b>une question</b>.'],
      [11, 'Sans socle : 7 sources × 4 usages = <b>28 liaisons</b>. Avec les couches : 7 + 4 = <b>11</b>.'],
      [18, 'Deux trajets, deux budgets : tableau de bord prêt à <b>4 h</b>, fraude décidée en <b>750 ms</b>.']
    ],
    draw: function (G, t) {
      var C = G.C, ctx = G.ctx;
      /* la chaîne */
      LAY.forEach(function (l, i) {
        var a = AL(t, i * .8), x = 20 + i * 140;
        BX(G, x, 24, 124, 50, { tone: l[2], label: l[0], size: 15, alpha: a });
        if (i) G.arrow(x - 15, 49, x - 2, 49, { color: C.muted, w: 2, alpha: a });
        TX(G, l[1], x + 62, 112, { size: 12, w: 700, color: C[l[2]], align: 'center', alpha: AL(t, 6 + i * .7) });
      });
      G.line(20, 88, 700, 88, { color: C.line, w: 2, alpha: AL(t, 1) });
      FLOW(G, t, 1.5, 26, 20, 88, 700, 88, { per: .9, dur: 3, color: C.gold, r: 4.5 });
      /* liaisons point à point */
      var aL = AL(t, 11), g1 = U.es(t, 11.5, 14), aS = AL(t, 14.5), g2 = U.es(t, 15, 16.5);
      G.text('sans socle', 180, 162, { size: 13, w: 700, sans: true, color: C.red, align: 'center', alpha: aL });
      for (var s = 0; s < 7; s++) for (var c = 0; c < 4; c++) {
        if (s * 4 + c < 28 * g1) G.line(64, 178 + s * 18, 296, 196 + c * 30, { color: C.red, w: 1.2, alpha: aL * .55 });
      }
      for (s = 0; s < 7; s++) DOT(G, 60, 178 + s * 18, 5, C.gold, aL);
      for (c = 0; c < 4; c++) DOT(G, 300, 196 + c * 30, 6, C.red, aL);
      G.badge('7 × 4 = 28 liaisons', 180, 310, { tone: 'red', align: 'center', size: 13, alpha: AL(t, 13.5) });
      G.text('avec les couches', 545, 162, { size: 13, w: 700, sans: true, color: C.green, align: 'center', alpha: aS });
      for (s = 0; s < 7; s++) {
        G.line(424, 178 + s * 18, 515, 232, { color: C.green, w: 1.2, alpha: aS * g2 * .7 });
        DOT(G, 420, 178 + s * 18, 5, C.gold, aS);
      }
      for (c = 0; c < 4; c++) {
        G.line(575, 232, 666, 196 + c * 30, { color: C.green, w: 1.2, alpha: aS * g2 * .7 });
        DOT(G, 670, 196 + c * 30, 6, C.red, aS);
      }
      BX(G, 515, 210, 60, 44, { tone: 'green', label: 'socle', size: 13, alpha: aS });
      G.badge('7 + 4 = 11 liaisons', 545, 310, { tone: 'green', align: 'center', size: 13, alpha: AL(t, 16.5) });
      /* deux budgets de latence */
      var aT = AL(t, 18);
      G.text('Tableau de bord', 20, 352, { size: 13, w: 700, sans: true, color: C.ink, alpha: aT });
      G.badge('export 23 h 30 + 1 h 30 + 1 h + 2 h → prêt à 4 h, lu à 8 h', 420, 347, { tone: 'gold', align: 'center', size: 12, alpha: aT });
      var aF = AL(t, 20), x0 = 150, sc = 320 / 2000, acc = 0;
      G.text('Fraude', 20, 393, { size: 13, w: 700, sans: true, color: C.ink, alpha: aF });
      FR.forEach(function (f, i) {
        var a = AL(t, 20.5 + i * .6), w = f[1] * sc;
        BAR(G, x0 + acc, 380, w, 18, f[2], a);
        acc += w;
      });
      G.line(x0 + 320, 372, x0 + 320, 404, { color: C.red, w: 2, alpha: aF });
      G.text('2 s', x0 + 320, 368, { size: 11, w: 700, sans: true, color: C.red, align: 'center', alpha: aF });
      G.badge('300 + 200 + 150 + 100 = 750 ms', 600, 389, { tone: 'green', align: 'center', size: 12, alpha: AL(t, 23) });
    }
  });
})();

/* ------------------------------------------------ N31 : les sources --- */
(function () {
  var FAM = [['Applications', 'caisses, ERP'], ['IoT', 'capteurs'], ['API', 'transporteur'], ['Logs', 'site web'], ['Fichiers', 'CSV fournisseurs'], ['Open data', 'météo']];
  var AXE = [['format', 'Storage', 'N33', 'plum'], ['fréquence', 'Ingestion', 'N32', 'blue'], ['qualité', 'Processing', 'N34', 'green']];
  SCENES.push({
    id: 'n31', part: 7, label: 'N31', short: 'N31 Sources', title: 'La couche des sources', dur: 26,
    enonce: '<p>Les <b>sources</b> sont les systèmes qui produisent la donnée : <b>applications</b>, <b>IoT</b>, <b>API</b>, <b>logs</b>, <b>fichiers</b>, <b>open data</b>. Elles diffèrent par leur <b>format</b>, leur <b>fréquence</b> et leur <b>qualité</b>.</p>' +
      '<p>Une source <b>se constate</b> : l\'architecte ne la choisit pas, il la décrit pour dimensionner les couches suivantes.</p>',
    retenir: 'trois axes décrivent une source et préparent trois couches : <b>format → storage</b>, <b>fréquence → ingestion</b>, <b>qualité → processing</b> ; compter les messages ne suffit pas, il faut aussi compter les <b>octets</b>.',
    steps: [
      [0, 'Six familles de sources : <b>applications, IoT, API, logs, fichiers, open data</b>.'],
      [7, 'Trois axes : <b>format → storage</b>, <b>fréquence → ingestion</b>, <b>qualité → processing</b>.'],
      [14, 'Capteurs : <b>691 200 mesures/j</b> mais 138 Mo ; caisses : 600 000 tickets mais <b>1,2 Go</b>.'],
      [21, 'CRM : 400 000 fiches, 6 % de doublons → <b>376 000 clients</b> réels.']
    ],
    draw: function (G, t) {
      var C = G.C;
      FAM.forEach(function (f, i) {
        BX(G, 20 + i * 114, 20, 106, 56, { tone: 'gold', label: f[0], sub: f[1], size: 14, ssize: 11, alpha: AL(t, i * .9) });
      });
      AXE.forEach(function (x, i) {
        var a = AL(t, 7 + i * 1.2), y = 112 + i * 38;
        G.badge(x[0], 90, y, { tone: 'gold', align: 'center', size: 13, alpha: a });
        G.arrow(150, y, 290, y, { color: C.muted, w: 2, alpha: a });
        BX(G, 294, y - 15, 150, 30, { tone: x[3], label: x[1] + ' (' + x[2] + ')', size: 13, alpha: a });
      });
      TX(G, ['une source se constate :', 'on la décrit,', 'on ne la choisit pas'], 470, 112, { size: 13, w: 700, color: C.muted, it: true, alpha: AL(t, 11) * OUT(t, 14) });
      /* messages vs octets */
      var aM = AL(t, 14), g = U.es(t, 14.5, 16.5), aO = AL(t, 17), h = U.es(t, 17.5, 19.5);
      G.text('messages / jour', 20, 236, { size: 13, w: 700, sans: true, color: C.ink, alpha: aM });
      BAR(G, 150, 224, 300 * g, 18, 'blue', aM); G.text('capteurs 691 200', 460, 238, { size: 12, w: 700, sans: true, color: C.blue, alpha: aM * g });
      BAR(G, 150, 248, 260 * g, 18, 'gold', aM); G.text('caisses 600 000', 420, 262, { size: 12, w: 700, sans: true, color: C.gold, alpha: aM * g });
      G.text('octets / jour', 20, 300, { size: 13, w: 700, sans: true, color: C.ink, alpha: aO });
      BAR(G, 150, 288, 35 * h, 18, 'blue', aO); G.text('capteurs 138 Mo', 195, 302, { size: 12, w: 700, sans: true, color: C.blue, alpha: aO * h });
      BAR(G, 150, 312, 300 * h, 18, 'gold', aO); G.text('caisses 1,2 Go', 460, 326, { size: 12, w: 700, sans: true, color: C.gold, alpha: aO * h });
      G.badge('plus de messages, 9 fois moins d\'octets', 600, 290, { tone: 'blue', align: 'center', size: 12, alpha: AL(t, 19.5) * OUT(t, 21) });
      /* qualité du CRM */
      var aC = AL(t, 21), d = U.es(t, 21.5, 23);
      G.text('CRM : 400 000 fiches', 20, 372, { size: 13, w: 700, sans: true, color: C.ink, alpha: aC });
      BAR(G, 170, 360, 320, 18, 'green', aC); BAR(G, 470.8, 360, 19.2 * d, 18, 'red', aC);
      G.text('6 % doublons', 480, 352, { size: 11, w: 700, sans: true, color: C.red, align: 'center', alpha: aC * d });
      G.badge('400 000 − 24 000 = 376 000 clients', 360, 400, { tone: 'green', align: 'center', size: 13, alpha: AL(t, 23) });
    }
  });
})();

/* ------------------------------------------------ N32 : l'ingestion --- */
(function () {
  var MODE = [['Batch', 'horloge', 'gold'], ['Streaming', 'événement', 'blue'], ['CDC / API', 'modification, requête', 'plum']];
  SCENES.push({
    id: 'n32', part: 7, label: 'N32', short: 'N32 Ingestion', title: 'La couche d\'ingestion', dur: 26,
    enonce: '<p>L\'<b>ingestion</b> fait entrer la donnée dans la plateforme selon trois modes : <b>batch</b>, <b>streaming</b>, <b>CDC / API</b>. Son objectif : amener la donnée avec son <b>contexte</b> et sa <b>traçabilité</b>.</p>' +
      '<p>L\'ingestion <b>transporte</b> ; elle ne transforme pas (c\'est le rôle du processing).</p>',
    retenir: 'un mode se reconnaît à son <b>déclencheur</b> (horloge, événement, modification, requête) ; une ingestion réussie garde <b>d\'où vient</b> la donnée et <b>quand</b> elle est arrivée, pour pouvoir <b>rejouer</b> sans doublon.',
    steps: [
      [0, 'Trois modes d\'ingestion : <b>batch</b>, <b>streaming</b>, <b>CDC / API</b>.'],
      [6, 'Ce qui les distingue : le <b>déclencheur</b> — horloge, événement, modification, requête.'],
      [11, 'Avec la donnée voyagent son <b>contexte</b> et sa <b>traçabilité</b>.'],
      [16, 'Stocks ERP : 2 M lignes copiées chaque heure = <b>48 Go/j</b>.'],
      [20, 'Le CDC ne transporte que les 50 000 changements : <b>60 Mo/j</b>, 800 fois moins.']
    ],
    draw: function (G, t) {
      var C = G.C;
      var aS = AL(t, 0);
      BX(G, 600, 24, 100, 156, { tone: 'none', label: 'Storage', size: 15, alpha: aS });
      MODE.forEach(function (m, i) {
        var a = AL(t, i * 1.5), y = 50 + i * 52;
        BX(G, 20, y - 20, 130, 40, { tone: m[2], label: m[0], size: 14, alpha: a });
        G.line(152, y, 596, y, { color: C.line, w: 2, alpha: a });
        G.badge(m[1], 380, y - 18, { tone: m[2], align: 'center', size: 11, alpha: AL(t, 6 + i * .8) });
      });
      /* batch : un gros lot par cycle ; streaming : un flot continu ; CDC : de rares changements */
      for (var k = 0; k < 6; k++) PK(G, 152, 50, 596, 50, U.seg(t, 1 + k * 4.2, 4 + k * 4.2), { color: C.gold, r: 11 });
      FLOW(G, t, 1.5, 26, 152, 102, 596, 102, { per: .35, dur: 2.2, color: C.blue, r: 3.5 });
      FLOW(G, t, 3, 26, 152, 154, 596, 154, { per: 2.1, dur: 2.2, color: C.plum, r: 5 });
      /* contexte et traçabilité */
      var aE = AL(t, 11);
      BX(G, 20, 214, 110, 46, { tone: 'gold', label: 'donnée', size: 14, alpha: aE });
      G.text('contexte', 270, 208, { size: 12, w: 700, sans: true, color: C.blue, align: 'center', alpha: aE });
      ['source', 'heure d\'événement', 'schéma'].forEach(function (s, i) {
        G.badge(s, [180, 270, 368][i], 238, { tone: 'blue', align: 'center', size: 11, alpha: AL(t, 11.5 + i * .4) });
      });
      G.text('traçabilité', 560, 208, { size: 12, w: 700, sans: true, color: C.green, align: 'center', alpha: AL(t, 13) });
      ['heure d\'arrivée', 'lot', 'rejeu'].forEach(function (s, i) {
        G.badge(s, [480, 566, 640][i], 238, { tone: 'green', align: 'center', size: 11, alpha: AL(t, 13.5 + i * .4) });
      });
      /* ERP : extraction complète contre CDC */
      var aF = AL(t, 16), g = U.es(t, 16.5, 18.5), aC = AL(t, 20);
      G.text('Stocks ERP, rafraîchis toutes les heures', 20, 300, { size: 14, w: 700, sans: true, color: C.ink, alpha: aF });
      G.text('copie complète', 20, 334, { size: 12, w: 700, sans: true, color: C.muted, alpha: aF });
      BAR(G, 130, 320, 440 * g, 22, 'red', aF);
      G.text('24 × 2 Go = 48 Go/j', 350, 336, { size: 13, w: 700, sans: true, color: C.red, align: 'center', alpha: AL(t, 18) });
      G.text('CDC', 20, 372, { size: 12, w: 700, sans: true, color: C.muted, alpha: aC });
      BAR(G, 130, 358, 4, 22, 'green', aC);
      G.text('50 000 × 1,2 Ko = 60 Mo/j', 144, 374, { size: 13, w: 700, sans: true, color: C.green, alpha: aC });
      G.badge('× 800', 640, 350, { tone: 'green', align: 'center', size: 16, alpha: AL(t, 21.5) });
      G.text('et les suppressions sont vues', 360, 404, { size: 12, w: 600, sans: true, it: true, color: C.muted, alpha: AL(t, 23) });
    }
  });
})();

/* ------------------------------------------------ N33 : le stockage --- */
(function () {
  var FAM = [['Operational DB', 'transactions, lignes, ms', 'blue'], ['Data Warehouse', 'analyse, colonnes, SQL', 'gold'], ['Lake / Lakehouse', 'tout format, bas coût', 'green']];
  var CRIT = ['workload', 'coût', 'latence', 'cycle de vie'];
  var NIV = [['entrepôt', 90, 'red', '0,25', '27,00'], ['lac', 640, 'blue', '0,10', '76,80'], ['archive', 1095, 'green', '0,01', '13,14']];
  SCENES.push({
    id: 'n33', part: 7, label: 'N33', short: 'N33 Storage', title: 'La couche de stockage', dur: 26,
    enonce: '<p>Le <b>stockage</b> conserve la donnée dans trois familles : <b>bases opérationnelles</b>, <b>Data Warehouse</b>, <b>Data Lake / Lakehouse</b>. Le choix se fait selon le <b>workload</b>, le <b>coût</b>, la <b>latence</b> et le <b>cycle de vie</b> de la donnée.</p>' +
      '<p>Une même donnée peut changer de niveau en vieillissant : chaud, tiède, archive.</p>',
    retenir: 'on ne choisit pas « la meilleure base », on place <b>chaque donnée</b> selon quatre critères ; le cycle de vie divise le coût (×4,7 ici) au prix d\'une <b>latence</b> plus grande sur la donnée ancienne.',
    steps: [
      [0, 'Trois familles : <b>base opérationnelle</b>, <b>entrepôt</b>, <b>lac / lakehouse</b>.'],
      [6, 'Quatre critères : <b>workload, coût, latence, cycle de vie</b>.'],
      [11, 'Tickets : 1,2 Go/j pendant 5 ans = 2 190 Go ; tout en chaud : <b>547,50 DH/mois</b>.'],
      [16, 'Par niveaux : entrepôt 90 j, lac jusqu\'à 2 ans, archive jusqu\'à 5 ans : <b>116,94 DH/mois</b>.'],
      [22, 'Près de <b>5 fois</b> moins cher ; en échange, la vieille donnée répond plus lentement.']
    ],
    draw: function (G, t) {
      var C = G.C;
      FAM.forEach(function (f, i) {
        BX(G, 20 + i * 235, 20, 210, 62, { tone: f[2], label: f[0], sub: f[1], size: 15, alpha: AL(t, i * 1.5) });
      });
      CRIT.forEach(function (c, i) {
        G.badge(c, 105 + i * 170, 112, { tone: 'plum', align: 'center', size: 13, alpha: AL(t, 6 + i * .7) });
      });
      G.text('chaque donnée va là où ses critères la placent', 360, 144, { size: 13, w: 600, sans: true, it: true, color: C.muted, align: 'center', alpha: AL(t, 8.5) });
      /* frise de 5 ans */
      var sc = 680 / 1825, aT = AL(t, 11), g = U.es(t, 11.5, 13.5);
      G.text('Tickets de caisse : 1,2 Go/j conservés 5 ans (2 190 Go)', 20, 182, { size: 14, w: 700, sans: true, color: C.ink, alpha: aT });
      G.text('tout en chaud', 20, 206, { size: 12, w: 700, sans: true, color: C.muted, alpha: aT });
      BAR(G, 20, 214, 680 * g, 26, 'red', aT);
      G.text('2 190 × 0,25 = 547,50 DH/mois', 360, 232, { size: 13, w: 700, sans: true, color: C.red, align: 'center', alpha: AL(t, 13) });
      var aN = AL(t, 16), x = 20;
      G.text('par niveaux', 20, 266, { size: 12, w: 700, sans: true, color: C.muted, alpha: aN });
      NIV.forEach(function (n, i) {
        var a = AL(t, 16.3 + i * .9), w = n[1] * sc;
        BAR(G, x, 274, w, 26, n[2], a);
        G.text(n[0] + ' · ' + n[3] + ' DH/Go', x + Math.max(w, 120) / 2, i ? 318 : 334, { size: 11, w: 700, sans: true, color: C[n[2]], align: 'center', alpha: a });
        G.text(n[4] + ' DH', x + Math.max(w, 70) / 2, 292, { size: 12, w: 700, sans: true, color: C[n[2]], align: 'center', alpha: a * (i ? 1 : 0) });
        x += w;
      });
      G.badge('27,00 + 76,80 + 13,14 = 116,94 DH/mois', 300, 360, { tone: 'green', align: 'center', size: 13, alpha: AL(t, 19.5) });
      G.badge('× 4,7 moins cher', 600, 360, { tone: 'green', align: 'center', size: 14, alpha: AL(t, 22) });
      G.arrow(20, 410, 700, 410, { color: C.red, w: 2, alpha: AL(t, 23.5) });
      G.text('la latence augmente avec l\'âge de la donnée', 360, 400, { size: 12, w: 700, sans: true, it: true, color: C.red, align: 'center', alpha: AL(t, 23.5) });
    }
  });
})();

/* ------------------------------------------------ N34 : le traitement --- */
(function () {
  var OPS = ['Nettoyer', 'Transformer', 'Enrichir', 'Agréger', 'Features'];
  var NIV = [['brut', 'gold'], ['conforme', 'blue'], ['prêt à l\'usage', 'green']];
  SCENES.push({
    id: 'n34', part: 7, label: 'N34', short: 'N34 Processing', title: 'La couche de traitement', dur: 26,
    enonce: '<p>Le <b>traitement</b> rend les données <b>adaptées à un usage précis</b> par cinq opérations : <b>nettoyage</b>, <b>transformation</b>, <b>enrichissement</b>, <b>agrégation</b> et <b>construction de features</b>.</p>' +
      '<p>L\'ordre est imposé par les dépendances ; la donnée passe du niveau <b>brut</b> au niveau <b>conforme</b> puis <b>prêt à l\'usage</b>.</p>',
    retenir: 'chaque opération <b>perd</b> ou <b>ajoute</b> quelque chose : on garde le brut et les rejets, on choisit la jointure selon l\'usage, et on n\'agrège qu\'<b>après</b> avoir nettoyé.',
    steps: [
      [0, 'Cinq opérations : <b>nettoyer, transformer, enrichir, agréger, construire des features</b>.'],
      [6, 'Trois niveaux : <b>brut → conforme → prêt à l\'usage</b>. Le brut est gardé.'],
      [11, '1 000 000 tickets : −5 000 doublons, −3 980 invalides → <b>991 020</b> (rejets gardés).'],
      [16, 'Jointure interne avec les magasins : <b>8 920 lignes perdues</b> ; externe : région « inconnue », total juste.'],
      [21, 'Agrégation pour le tableau de bord : <b>840 lignes</b>.']
    ],
    draw: function (G, t) {
      var C = G.C;
      OPS.forEach(function (o, i) {
        var a = AL(t, i * .8), x = 20 + i * 140;
        BX(G, x, 20, 124, 44, { tone: 'green', label: o, size: 14, alpha: a });
        if (i) G.arrow(x - 15, 42, x - 2, 42, { color: C.muted, w: 2, alpha: a });
      });
      NIV.forEach(function (n, i) {
        var a = AL(t, 6 + i * .9), x = 90 + i * 210;
        BX(G, x, 90, 150, 40, { tone: n[1], label: n[0], size: 14, alpha: a });
        if (i) G.arrow(x - 58, 110, x - 4, 110, { color: C.muted, w: 2, alpha: a });
      });
      G.badge('gardé', 165, 146, { tone: 'gold', align: 'center', size: 11, alpha: AL(t, 8.5) });
      /* l'entonnoir */
      var sc = 400 / 1000000, rows = [
        [11, 1000000, '1 000 000 tickets bruts', 'gold'],
        [12.5, 995000, '− 5 000 doublons → 995 000', 'blue'],
        [14, 991020, '− 3 980 invalides → 991 020', 'blue']];
      rows.forEach(function (r, i) {
        var a = AL(t, r[0]), y = 172 + i * 34;
        BAR(G, 20, y, r[1] * sc * U.es(t, r[0], r[0] + 1), 24, r[3], a);
        G.text(r[2], 432, y + 17, { size: 13, w: 700, sans: true, color: C[r[3]], alpha: a });
      });
      G.badge('8 980 rejets gardés', 640, 278, { tone: 'gold', align: 'center', size: 11, alpha: AL(t, 15) });
      var aJ = AL(t, 16), aE = AL(t, 18);
      BAR(G, 20, 294, 982100 * sc, 24, 'red', aJ);
      G.text('interne : 982 100 (− 8 920)', 432, 311, { size: 13, w: 700, sans: true, color: C.red, alpha: aJ });
      BAR(G, 20, 328, 991020 * sc, 24, 'green', aE);
      G.text('externe : 991 020, région « inconnue »', 432, 345, { size: 13, w: 700, sans: true, color: C.green, alpha: aE });
      var aA = AL(t, 21);
      BAR(G, 20, 368, 8, 24, 'green', aA);
      G.text('agrégation : 840 lignes (magasin × jour)', 40, 385, { size: 13, w: 700, sans: true, color: C.green, alpha: aA });
      G.badge('agréger avant de nettoyer : 1,5 M DH fictifs', 560, 382, { tone: 'red', align: 'center', size: 12, alpha: AL(t, 23) });
    }
  });
})();

/* ------------------------------------------------ N35 : analytics et IA --- */
(function () {
  var CONS = [['BI', 'un chiffre', 'gold'], ['Analytics', 'une compréhension', 'blue'], ['ML', 'une sortie automatique', 'plum'], ['GenAI', 'un texte', 'green']];
  SCENES.push({
    id: 'n35', part: 7, label: 'N35', short: 'N35 Analytics & IA', title: 'La couche de consommation : analytics et IA', dur: 26,
    enonce: '<p>La consommation regroupe <b>plusieurs</b> usages : <b>BI</b>, <b>analytics</b>, <b>machine learning</b>, <b>IA générative</b>. Ils doivent s\'appuyer sur un <b>même socle</b> de données <b>gouverné</b>.</p>' +
      '<p>Chaque consommateur se reconnaît à ce qu\'il produit ; seule la version prête à l\'usage lui est propre.</p>',
    retenir: '<b>plusieurs</b> consommateurs, <b>un</b> socle, <b>une</b> gouvernance : copier la donnée par usage coûte plus cher et fait diverger les définitions (un même chiffre d\'affaires, deux valeurs).',
    steps: [
      [0, 'Quatre consommateurs : <b>BI, Analytics, ML, GenAI</b>.'],
      [5, 'Chacun produit autre chose : un <b>chiffre</b>, une <b>compréhension</b>, une <b>sortie automatique</b>, un <b>texte</b>.'],
      [10, 'Ils puisent dans le <b>même socle gouverné</b> ; seule la version prête à l\'usage leur est propre.'],
      [16, 'Quatre copies : 8 760 Go = <b>2 190 DH/mois</b>. Socle partagé : 2 418 Go = <b>604,50 DH</b>.'],
      [21, 'Économie : <b>19 026 DH par an</b>, et une seule définition du chiffre d\'affaires.']
    ],
    draw: function (G, t) {
      var C = G.C;
      CONS.forEach(function (c, i) {
        var x = 20 + i * 176;
        BX(G, x, 20, 160, 60, { tone: c[2], label: c[0], sub: AL(t, 5 + i * .8) > .5 ? c[1] : null, size: 15, alpha: AL(t, i * .9) });
        var aV = AL(t, 12 + i * .5);
        BX(G, x + 30, 104, 100, 28, { tone: 'none', label: 'version prête', size: 11, dash: [4, 3], alpha: aV });
        G.arrow(x + 80, 102, x + 80, 84, { color: C[c[2]], w: 2, alpha: aV });
        G.arrow(x + 80, 158, x + 80, 136, { color: C[c[2]], w: 2, alpha: aV });
        FLOW(G, t, 13 + i * .5, 26, x + 80, 160, x + 80, 84, { per: 1.4, dur: 1.2, color: C[c[2]], r: 4 });
      });
      BX(G, 20, 160, 680, 50, { tone: 'none', label: 'Socle commun gouverné', sub: 'une définition, un contrôle d\'accès, un lignage', size: 15, alpha: AL(t, 10) });
      /* le coût */
      var sc = 520 / 8760, aQ = AL(t, 16), g = U.es(t, 16.5, 18.5), aP = AL(t, 18.5), h = U.es(t, 19, 20.5);
      G.text('quatre copies', 20, 262, { size: 12, w: 700, sans: true, color: C.muted, alpha: aQ });
      for (var k = 0; k < 4; k++) BAR(G, 120 + k * 130 * g, 248, 130 * g - 2, 24, 'red', aQ);
      G.text('8 760 Go → 2 190 DH/mois', 360, 295, { size: 13, w: 700, sans: true, color: C.red, align: 'center', alpha: AL(t, 18) });
      G.text('socle partagé', 20, 332, { size: 12, w: 700, sans: true, color: C.muted, alpha: aP });
      BAR(G, 120, 318, 2190 * sc * h, 24, 'green', aP);
      BAR(G, 120 + 2190 * sc, 318, 228 * sc * h, 24, 'gold', aP);
      G.text('2 190 + 228 (versions) = 2 418 Go → 604,50 DH/mois', 290, 336, { size: 13, w: 700, sans: true, color: C.green, alpha: AL(t, 20.5) });
      G.badge('économie : 1 585,50 DH/mois = 19 026 DH/an', 360, 390, { tone: 'green', align: 'center', size: 14, alpha: AL(t, 21) });
    }
  });
})();
