/* Partie VI — Data-driven, AI-driven, du reporting à l'IA : N27 à N29. */

/* petit personnage (l'humain qui décide) */
function HUM(G, x, y, a, col) {
  var ctx = G.ctx; ctx.save(); ctx.globalAlpha *= (a === undefined ? 1 : a); ctx.fillStyle = col || G.C.plum;
  ctx.beginPath(); ctx.arc(x, y, 8, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(x, y + 24, 13, Math.PI, 0); ctx.fill(); ctx.restore();
}

/* ------------------------------------------------ N27 : l'organisation data-driven --- */
(function () {
  var REG = [['Nord', .88], ['Sud', .95], ['Est', .96], ['Ouest', .94]];
  var BOUCLE = ['Dashboard', 'Baisse', 'Causes', 'Action'];
  var NIV = [['Descriptive', 'que s\'est-il passé ?'], ['Diagnostique', 'pourquoi ?'], ['Prédictive', 'que va-t-il se passer ?'], ['Prescriptive', 'que faut-il faire ?']];
  SCENES.push({
    id: 'n27', part: 6, label: 'N27', short: 'N27 Data-driven', title: 'L\'organisation data-driven', dur: 26,
    enonce: '<p>Une organisation <b>data-driven</b> utilise <b>systématiquement</b> les données et l\'analytique pour <b>éclairer ses décisions</b> et améliorer ses opérations : KPI et tableaux de bord, analyse <b>descriptive</b> et <b>diagnostique</b>, culture de décision fondée sur les données.</p>' +
      '<p>Exemple : dashboard commercial → baisse des ventes dans une région → analyse des causes → action corrective. En data-driven, la donnée aide principalement <b>l\'humain</b> à décider.</p>',
    retenir: 'le data-driven est une <b>boucle</b> qui se referme sur une action et sur la <b>mesure de son effet</b> ; il couvre le <b>descriptif</b> et le <b>diagnostic</b>, et c\'est toujours <b>l\'humain</b> qui décide.',
    steps: [
      [0, 'Le tableau de bord commercial : la région <b>Nord recule de 12 %</b>.'],
      [5, 'Diagnostic : tickets <b>−1 %</b>, panier <b>−11,1 %</b> → rupture du petit électroménager.'],
      [11, 'La boucle : <b>dashboard → baisse → causes → action</b>. L\'humain décide.'],
      [16, 'Quatre niveaux d\'analytique : le data-driven couvre le <b>descriptif</b> et le <b>diagnostic</b>.'],
      [21, 'L\'effet se <b>mesure</b> contre les autres régions (saison −5 %) : écart dû à la rupture <b>nul</b>.']
    ],
    draw: function (G, t) {
      var C = G.C, ctx = G.ctx;
      /* tableau de bord */
      var a0 = AL(t, 0), d = U.es(t, 2, 4);
      BX(G, 20, 16, 250, 150, { tone: 'none', label: 'Ventes par région', top: true, size: 14, alpha: a0 });
      REG.forEach(function (r, i) {
        var h = 90 * (i ? r[1] : 1 - (1 - r[1]) * d), x = 44 + i * 56, bad = i === 0 && d > .5;
        ctx.save(); ctx.globalAlpha *= a0; ctx.fillStyle = bad ? C.red : C.blue; ctx.fillRect(x, 150 - h, 34, h); ctx.restore();
        G.text(r[0], x + 17, 162, { size: 11, w: 700, sans: true, color: C.muted, align: 'center', alpha: a0 });
      });
      G.badge('Nord −12 %', 68, 57, { tone: 'red', align: 'center', size: 13, alpha: AL(t, 3.5) });
      /* diagnostic */
      var aD = AL(t, 5);
      G.text('ventes = tickets × panier', 470, 34, { size: 15, w: 700, sans: true, color: C.ink, align: 'center', alpha: aD });
      BX(G, 300, 50, 160, 46, { tone: 'none', label: 'tickets −1 %', size: 14, alpha: AL(t, 6) });
      BX(G, 480, 50, 220, 46, { tone: 'red', label: 'panier −11,1 %', size: 14, alpha: AL(t, 7) });
      G.arrow(590, 98, 590, 116, { color: C.red, w: 2, alpha: AL(t, 8.5) });
      BX(G, 380, 118, 320, 48, { tone: 'gold', label: 'rupture petit électroménager', sub: 'ventes 600 000 → 60 000 DH', size: 14, alpha: AL(t, 8.5) });
      /* boucle */
      BOUCLE.forEach(function (b, i) {
        var a = AL(t, 11 + i * .8), x = 20 + i * 150;
        BX(G, x, 196, 120, 42, { tone: i === 3 ? 'green' : 'plum', label: b, size: 15, alpha: a });
        if (i) G.arrow(x - 28, 217, x - 4, 217, { color: C.muted, w: 2, alpha: a });
      });
      var aR = AL(t, 14);
      G.arrow(580, 217, 610, 217, { color: C.green, w: 2, alpha: aR });
      BX(G, 612, 196, 88, 42, { tone: 'green', label: 'effet', size: 15, alpha: aR });
      ctx.save(); ctx.globalAlpha *= aR; ctx.strokeStyle = C.muted; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(656, 240); ctx.lineTo(656, 256); ctx.lineTo(80, 256); ctx.lineTo(80, 240); ctx.stroke(); ctx.restore();
      PK(G, 80, 217, 656, 217, U.seg(t, 12, 15.5), { color: C.gold, r: 6 });
      HUM(G, 455, 166, AL(t, 13), C.plum);
      G.text('l\'humain décide', 492, 188, { size: 12, w: 700, sans: true, color: C.plum, alpha: AL(t, 13) * OUT(t, 21) });
      /* quatre niveaux */
      NIV.forEach(function (n, i) {
        var a = AL(t, 16 + i * .8), x = 20 + i * 172, in_ = i < 2;
        BX(G, x, 290, 160, 56, { tone: in_ ? 'plum' : 'none', label: n[0], sub: n[1], size: 14, ssize: 11, dash: in_ ? null : [5, 4], alpha: a });
      });
      var aB = AL(t, 18);
      G.line(22, 354, 350, 354, { color: C.plum, w: 3, alpha: aB });
      G.text('data-driven (N27)', 186, 374, { size: 13, w: 700, sans: true, color: C.plum, align: 'center', alpha: aB });
      G.line(366, 354, 696, 354, { color: C.muted, w: 3, alpha: aB });
      G.text('annoncés en N28', 530, 374, { size: 13, w: 700, sans: true, color: C.muted, align: 'center', alpha: aB });
      /* effet mesuré */
      G.badge('après action : 570 000 = 600 000 × 0,95 (saison) → écart nul', 360, 402, { tone: 'green', align: 'center', size: 13, alpha: AL(t, 21) });
      G.text('effet mesuré', 492, 188, { size: 12, w: 700, sans: true, color: C.green, alpha: AL(t, 21) });
    }
  });
})();

/* ------------------------------------------------ N28 : l'organisation AI-driven --- */
(function () {
  var VERBES = [['prédire', 'la demande'], ['recommander', 'un produit'], ['classer', 'une anomalie'], ['générer', 'une réponse'], ['automatiser', 'un réassort']];
  var FAM = [['ML traditionnel', 'blue'], ['IA générative', 'plum'], ['Automatisation, assistance', 'green']];
  SCENES.push({
    id: 'n28', part: 6, label: 'N28', short: 'N28 AI-driven', title: 'L\'organisation AI-driven', dur: 26,
    enonce: '<p>Une organisation <b>AI-driven</b> intègre des <b>modèles d\'IA</b> dans <b>certains processus</b> afin de <b>prédire</b>, <b>recommander</b>, <b>classer</b>, <b>automatiser</b> ou <b>générer</b>. Trois familles : le ML traditionnel, l\'IA générative, l\'automatisation et l\'assistance intelligente.</p>' +
      '<p>En AI-driven, la donnée alimente <b>également</b> un système capable de prédire, recommander, classer, générer ou automatiser.</p>',
    retenir: '« <b>également</b> » : l\'IA s\'<b>ajoute</b> au data-driven, elle ne le remplace pas ; « <b>certains</b> processus » : les décisions répétitives à grande échelle, l\'humain gardant le <b>seuil</b> et les <b>cas incertains</b>.',
    steps: [
      [0, 'Data-driven : la donnée éclaire <b>l\'humain</b>, qui décide.'],
      [4, 'AI-driven : la donnée alimente <b>également</b> un modèle, qui agit.'],
      [7, 'Cinq verbes : <b>prédire, recommander, classer, générer, automatiser</b>.'],
      [12, 'Trois familles de techniques.'],
      [15, '25 000 réassorts × 30 s = <b>208,3 h</b> par jour, soit 27 acheteurs.'],
      [20, 'Le modèle décide ; 2 % incertains reviennent à l\'humain : <b>4,17 h</b>.']
    ],
    draw: function (G, t) {
      var C = G.C, ctx = G.ctx;
      var a0 = AL(t, 0);
      BX(G, 20, 110, 110, 60, { tone: 'gold', label: 'Données', size: 15, alpha: a0 });
      /* voie humaine */
      G.arrow(132, 124, 196, 60, { color: C.muted, w: 2, alpha: a0 });
      BX(G, 200, 30, 120, 50, { tone: 'none', label: 'Dashboard', size: 14, alpha: a0 });
      G.arrow(322, 55, 356, 55, { color: C.muted, w: 2, alpha: a0 });
      HUM(G, 376, 38, AL(t, 1));
      G.text('décide', 400, 60, { size: 13, w: 700, sans: true, color: C.plum, alpha: AL(t, 1) });
      G.badge('data-driven', 260, 16, { tone: 'plum', align: 'center', size: 12, alpha: AL(t, 1.5) });
      /* voie modèle */
      var aM = AL(t, 4);
      G.arrow(132, 156, 196, 210, { color: C.blue, w: 2.4, alpha: aM });
      G.badge('également', 150, 210, { tone: 'blue', align: 'center', size: 12, alpha: aM });
      BX(G, 200, 190, 120, 56, { tone: 'blue', label: 'Modèle', sub: 'd\'IA', size: 15, alpha: aM });
      FLOW(G, t, 4.5, 26, 132, 156, 196, 210, { per: .7, dur: .7, color: C.gold, r: 4 });
      /* cinq verbes */
      VERBES.forEach(function (v, i) {
        var a = AL(t, 7 + i * .8), y = 110 + i * 40;
        G.arrow(322, 218, 446, y + 12, { color: C.blue, w: 1.5, alpha: a * .7 });
        G.badge(v[0], 510, y + 12, { tone: 'blue', align: 'center', size: 13, alpha: a });
        G.text(v[1], 620, y + 17, { size: 12, w: 600, sans: true, color: C.muted, alpha: a });
      });
      /* trois familles */
      FAM.forEach(function (f, i) {
        G.badge(f[0], 120 + i * 220, 330, { tone: f[1], align: 'center', size: 13, alpha: AL(t, 12 + i * .6) * OUT(t, 15) });
      });
      /* le calcul du réassort */
      var aC = AL(t, 15);
      G.text('Réassort quotidien : 25 000 décisions', 20, 300, { size: 14, w: 700, sans: true, color: C.ink, alpha: aC });
      var g1 = U.es(t, 15.5, 18), g2 = U.es(t, 20.5, 22.5);
      ctx.save(); ctx.globalAlpha *= aC;
      ctx.fillStyle = C.redSoft; ctx.strokeStyle = C.red; ctx.lineWidth = 1.5; G.rrect(20, 314, 420 * g1, 26, 4); ctx.fill(); if (g1 > 0) ctx.stroke();
      ctx.restore();
      G.text('à la main : 208,3 h/j ≈ 27 acheteurs', 30, 332, { size: 13, w: 700, sans: true, color: C.red, alpha: AL(t, 17.5) });
      var aH = AL(t, 20);
      ctx.save(); ctx.globalAlpha *= aH;
      ctx.fillStyle = C.greenSoft; ctx.strokeStyle = C.green; ctx.lineWidth = 1.5; G.rrect(20, 352, Math.max(4, 420 * .02 * g2), 26, 4); ctx.fill(); ctx.stroke();
      ctx.restore();
      G.text('modèle + 2 % incertains (500 cas) : 4,17 h/j', 40, 370, { size: 13, w: 700, sans: true, color: C.green, alpha: AL(t, 21) });
      HUM(G, 480, 336, AL(t, 22.5));
      TX(G, ['l\'humain garde', 'le seuil et les', 'cas incertains'], 500, 340, { size: 12, w: 700, color: C.plum, alpha: AL(t, 22.5) });
    }
  });
})();

/* ------------------------------------------------ N29 : du reporting à l'IA --- */
(function () {
  var USAGE = [['Reporting', 'gold', ['consolidées']], ['Analytics', 'blue', ['historique', 'qualité']],
    ['ML', 'plum', ['features', 'labels', 'représentativité']], ['GenAI', 'green', ['corpus', 'contexte', 'sécurité']]];
  SCENES.push({
    id: 'n29', part: 6, label: 'N29', short: 'N29 Exigences', title: 'Du reporting à l\'IA : des exigences croissantes', dur: 26,
    enonce: '<p>Quatre usages de la donnée, du plus simple au plus avancé : le <b>reporting</b> demande des données <b>consolidées</b> ; l\'<b>analytics</b>, de l\'<b>historique</b> et de la <b>qualité</b> ; le <b>ML</b>, des <b>features</b>, des <b>labels</b> et de la <b>représentativité</b> ; la <b>GenAI</b>, un <b>corpus</b>, du <b>contexte</b> et de la <b>sécurité</b>.</p>' +
      '<p>Plus l\'usage est avancé, plus les exigences sur la donnée deviennent <b>explicites</b>.</p>',
    retenir: 'les exigences se <b>cumulent</b> d\'un usage au suivant ; elles deviennent <b>explicites</b> parce que le <b>contrôle humain implicite</b> (l\'analyste qui flaire un chiffre faux) disparaît quand le modèle répond seul.',
    steps: [
      [0, 'Quatre usages, du plus simple au plus avancé : chacun <b>ajoute</b> ses exigences.'],
      [10, 'Reporting : un analyste relit le chiffre. GenAI : la réponse part <b>directement</b> au client.'],
      [16, 'Le corpus du support client : 1 200 documents, dont <b>180 obsolètes</b> (15 %).'],
      [20, '3 documents lus par réponse : 1 − 0,85³ = <b>38,6 %</b> des réponses exposées, ≈ 1 158 par mois.']
    ],
    draw: function (G, t) {
      var C = G.C, ctx = G.ctx;
      /* escalier des exigences */
      USAGE.forEach(function (u, i) {
        var a = AL(t, i * 2.2), x = 20 + i * 176, h = 70 + i * 34, y = 200 - h;
        ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C[u[1] + 'Soft']; ctx.strokeStyle = C[u[1]]; ctx.lineWidth = 1.8;
        G.rrect(x, y, 160, h, 5); ctx.fill(); ctx.stroke(); ctx.restore();
        G.text(u[0], x + 80, y + 20, { size: 15, w: 700, sans: true, color: C[u[1]], align: 'center', alpha: a });
        u[2].forEach(function (r, k) {
          G.badge(r, x + 80, y + 44 + k * 26, { tone: u[1], align: 'center', size: 12, alpha: AL(t, i * 2.2 + .6 + k * .4) });
        });
        if (i) G.text('+', x - 8, 186, { size: 22, w: 700, sans: true, color: C.ink, align: 'center', alpha: a });
      });
      G.arrow(20, 214, 700, 214, { color: C.muted, w: 2, alpha: AL(t, 8) });
      G.text('exigences de plus en plus explicites', 360, 232, { size: 13, w: 700, sans: true, it: true, color: C.muted, align: 'center', alpha: AL(t, 8) });
      /* contrôle humain implicite */
      var aH = AL(t, 10) * OUT(t, 16);
      HUM(G, 100, 262, aH);
      G.text('l\'analyste relit le chiffre', 100, 316, { size: 12, w: 700, sans: true, color: C.plum, align: 'center', alpha: aH });
      G.badge('✓ contrôle implicite', 100, 334, { tone: 'green', align: 'center', size: 12, alpha: AL(t, 11) * OUT(t, 16) });
      var aG = AL(t, 12) * OUT(t, 16);
      BX(G, 460, 258, 110, 44, { tone: 'green', label: 'GenAI', size: 14, alpha: aG });
      G.arrow(572, 280, 640, 280, { color: C.red, w: 2.4, alpha: aG });
      G.text('client', 670, 285, { size: 13, w: 700, sans: true, color: C.ink, align: 'center', alpha: aG });
      G.badge('aucun humain entre les deux', 580, 330, { tone: 'red', align: 'center', size: 12, alpha: AL(t, 13) * OUT(t, 16) });
      /* corpus : 1 200 documents, 180 obsolètes */
      var aC = AL(t, 16);
      G.text('Corpus : 1 200 documents', 20, 258, { size: 14, w: 700, sans: true, color: C.ink, alpha: aC });
      for (var k = 0; k < 40; k++) {
        var bad = k % 20 === 3 || k % 20 === 11 || k % 20 === 17, ab = AL(t, 16 + k * .03);
        ctx.save(); ctx.globalAlpha *= ab; ctx.fillStyle = bad && t > 17 ? C.redSoft : C.surface; ctx.strokeStyle = bad && t > 17 ? C.red : C.line; ctx.lineWidth = 1.2;
        ctx.fillRect(20 + (k % 20) * 16, 270 + Math.floor(k / 20) * 22, 12, 17); ctx.strokeRect(20 + (k % 20) * 16, 270 + Math.floor(k / 20) * 22, 12, 17); ctx.restore();
      }
      G.badge('180 obsolètes = 15 %', 180, 334, { tone: 'red', align: 'center', size: 12, alpha: AL(t, 17.5) });
      /* probabilité qu'une réponse lise au moins un document obsolète */
      var aP = AL(t, 20), p = .386 * U.es(t, 20.5, 23);
      G.text('3 documents lus par réponse', 380, 258, { size: 14, w: 700, sans: true, color: C.ink, alpha: aP });
      G.text('1 − 0,85³ = 38,6 %', 380, 284, { size: 16, w: 700, sans: true, color: C.red, alpha: aP });
      ctx.save(); ctx.globalAlpha *= aP; ctx.fillStyle = C.grid; G.rrect(380, 296, 320, 16, 6); ctx.fill();
      ctx.fillStyle = C.red; G.rrect(380, 296, 320 * p, 16, 6); ctx.fill(); ctx.restore();
      G.text('≈ 1 158 réponses / mois sur 3 000', 540, 334, { size: 13, w: 700, sans: true, color: C.red, align: 'center', alpha: AL(t, 23) });
      G.badge('exigence explicite : fraîcheur + sécurité du corpus', 360, 390, { tone: 'green', align: 'center', size: 13, alpha: AL(t, 23.5) });
    }
  });
})();
