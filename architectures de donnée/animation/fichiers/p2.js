/* Partie II — Centralisé ou distribué : N13 à N15. */

/* ------------------------------------------------ N13 : architecture centralisée --- */
(function () {
  SCENES.push({
    id: 'n13', part: 2, label: 'N13', short: 'N13 Centralisée', title: 'L\'architecture centralisée', dur: 24,
    enonce: '<p>Les données et/ou le traitement sont principalement regroupés dans une <b>plateforme centrale</b>.</p>' +
      '<p>Exemple : une entreprise concentre ses données analytiques dans un <b>entrepôt unique</b> alimenté par plusieurs applications.</p>' +
      '<p><b>Atouts</b> : contrôle, cohérence, administration centralisée. <b>Limites</b> : concentration, scalabilité potentiellement limitée. <b>Question</b> : le centre devient-il un <b>goulot d\'étranglement</b> ?</p>',
    retenir: 'atouts et limites sont <b>le même fait vu des deux côtés</b> : il n\'y a qu\'un endroit. On vérifie par la mesure si le centre est devenu un goulot.',
    steps: [
      [0, 'Plusieurs applications alimentent <b>une plateforme centrale</b>.'],
      [4, 'Atouts : <b>contrôle</b>, <b>cohérence</b>, <b>administration</b> en un seul lieu.'],
      [9.5, 'Les demandes se multiplient : une <b>file d\'attente</b> se forme.'],
      [14.5, 'Le centre devient un <b>goulot d\'étranglement</b>.'],
      [19, 'Un seul endroit : la force et la limite.']
    ],
    draw: function (G, t) {
      var C = G.C, load = U.seg(t, 9.5, 15);
      var A = [[60, 50], [60, 170], [60, 290], [600, 50], [600, 170], [600, 290]];
      ['CRM', 'ERP', 'Web', 'Magasins', 'Support', 'Mobile'].forEach(function (s, i) {
        var a = AL(t, i * .3), p = A[i];
        BX(G, p[0], p[1], 100, 44, { tone: 'plum', label: s, size: 13, alpha: a });
        var x1 = i < 3 ? p[0] + 100 : p[0], x2 = i < 3 ? 280 : 440;
        G.line(x1, p[1] + 22, x2, 190, { color: C.line, w: 1.4, alpha: a });
        FLOW(G, t, 1 + i * .2, 22, x1, p[1] + 22, x2, 190, { per: U.lerp(1.4, .35, load), dur: 1, color: C.plum });
      });
      CY(G, 360, 186, 150, 120, { alpha: AL(t, 0) });
      G.text('Plateforme', 360, 180, { size: 15, w: 700, sans: true, color: C.gold, align: 'center', alpha: AL(t, 0) });
      G.text('centrale', 360, 198, { size: 15, w: 700, sans: true, color: C.gold, align: 'center', alpha: AL(t, 0) });
      GAUGE(G, 300, 268, 120, .25 + .72 * load, { alpha: AL(t, 9.5) });
      ['contrôle', 'cohérence', 'administration'].forEach(function (s, i) { G.badge(s, 270 + i * 90, 30, { tone: 'green', align: 'center', size: 13, alpha: AL(t, 4 + i * .6) * OUT(t, 13.5) }); });
      /* file d'attente */
      var n = Math.floor(load * 7);
      for (var k = 0; k < n; k++) { G.ctx.save(); G.ctx.fillStyle = C.red; G.ctx.beginPath(); G.ctx.arc(270 - k * 16, 362, 6, 0, 7); G.ctx.fill(); G.ctx.restore(); }
      G.text('file d\'attente', 222, 384, { size: 12, w: 700, sans: true, color: C.red, align: 'center', alpha: AL(t, 11) });
      G.badge('goulot d\'étranglement ?', 360, 30, { tone: 'red', align: 'center', size: 15, alpha: AL(t, 14.5) });
      G.badge('un seul endroit : contrôle ET concentration', 470, 392, { tone: 'gold', align: 'center', size: 14, alpha: AL(t, 19) });
    }
  });
})();

/* ------------------------------------------------ N14 : architecture distribuée --- */
(function () {
  SCENES.push({
    id: 'n14', part: 2, label: 'N14', short: 'N14 Distribuée', title: 'L\'architecture distribuée', dur: 25,
    enonce: '<p>Le stockage et/ou le calcul est <b>réparti sur plusieurs nœuds</b>, sites, systèmes ou domaines.</p>' +
      '<p>Exemple : un <b>cluster</b> répartit un traitement massif sur plusieurs machines.</p>' +
      '<p><b>Atouts</b> : scale-out, parallélisme, résilience potentielle. <b>Coûts</b> : réseau, coordination, partitionnement, cohérence. Centralisé et distribué <b>se combinent</b>.</p>',
    retenir: 'tout vient de « il y a <b>plusieurs endroits</b> » : des atouts, et des <b>coûts payés dès le premier jour</b>. Une architecture moderne combine les deux.',
    steps: [
      [0, 'Un traitement massif est <b>découpé</b> en morceaux.'],
      [3.5, 'Quatre nœuds travaillent <b>en parallèle</b>.'],
      [8, 'Un nœud tombe : les autres reprennent sa part — <b>résilience</b>.'],
      [13, 'Mais il faut payer : <b>réseau</b>, <b>coordination</b>, <b>partitionnement</b>, <b>cohérence</b>.'],
      [19.5, 'Bilan : on combine centralisé et distribué.']
    ],
    draw: function (G, t) {
      var C = G.C, down = U.seg(t, 8, 9);
      BX(G, 20, 150, 130, 80, { tone: 'gold', label: 'Traitement', sub: '1 To à analyser', alpha: AL(t, 0) });
      for (var i = 0; i < 4; i++) {
        var y = 40 + i * 82, d = i === 2 && down > 0, a = AL(t, 3.5 + i * .3);
        SRV(G, 330, y, 80, 62, { down: d, alpha: a, label: 'nœud ' + (i + 1) });
        G.line(150, 190, 326, y + 31, { color: C.line, w: 1.4, alpha: a });
        if (!(d)) PK(G, 150, 190, 326, y + 31, U.seg(t, 2 + i * .2, 3.5 + i * .2), { color: C.gold, lab: '¼' });
        if (!d) GAUGE(G, 424, y + 24, 80, U.clamp(U.seg(t, 4, 7.5) * (i === 2 ? 1 : .55 + .2 * U.seg(t, 9, 11)), 0, 1), { alpha: a });
      }
      XX(G, 370, 235, 14, down);
      PK(G, 370, 235, 370, 153, U.seg(t, 9, 10.5), { color: C.green, lab: 'reprise' });
      PK(G, 370, 235, 370, 317, U.seg(t, 9, 10.5), { color: C.green });
      G.badge('résilience', 470, 220, { tone: 'green', size: 13, alpha: AL(t, 10.5) * OUT(t, 13) });
      ['réseau', 'coordination', 'partitionnement', 'cohérence'].forEach(function (s, i) { G.badge(s, 620, 60 + i * 70, { tone: 'red', align: 'center', size: 14, alpha: AL(t, 13 + i * 1.2) }); });
      G.text('les coûts', 620, 26, { size: 13, w: 700, sans: true, color: C.red, align: 'center', alpha: AL(t, 13) });
      G.badge('plusieurs endroits : parallélisme ET coûts dès le 1er jour', 360, 398, { tone: 'gold', align: 'center', size: 14, alpha: AL(t, 19.5) });
    }
  });
})();

/* ------------------------------------------------ N15 : scale-up et scale-out --- */
(function () {
  SCENES.push({
    id: 'n15', part: 2, label: 'N15', short: 'N15 Scale', title: 'Scale-up et scale-out', dur: 25,
    enonce: '<p>Deux façons d\'augmenter la capacité :</p><p><b>Scale-up</b> : augmenter les ressources d\'<b>une même machine</b> (CPU 1 + CPU 2 + CPU 3 → 1 serveur plus puissant).</p>' +
      '<p><b>Scale-out</b> : <b>ajouter des nœuds</b> et répartir la charge (nœud 1, 2, 3, 4 → plusieurs nœuds).</p>',
    retenir: 'scale-up : rien ne change dans l\'architecture, mais <b>plafond et prix</b>. Scale-out : pas de plafond, mais les coûts de la distribution — et seulement si le travail est <b>divisible</b>.',
    steps: [
      [0, '<b>Scale-up</b> : on ajoute des CPU à la même machine.'],
      [5, 'Le serveur grossit… jusqu\'au <b>plafond</b>, et le prix s\'envole.'],
      [10, '<b>Scale-out</b> : on ajoute des <b>nœuds</b>.'],
      [15, 'Ça marche si le travail est <b>divisible</b> en parts.'],
      [20, 'On essaie le premier, on bascule vers le second.']
    ],
    draw: function (G, t) {
      var C = G.C;
      G.text('Scale-up', 180, 30, { size: 18, w: 700, sans: true, color: C.navy, align: 'center', alpha: AL(t, 0) });
      var g = U.seg(t, .5, 8), w = U.lerp(70, 170, Math.min(g, .85)), h = U.lerp(80, 220, Math.min(g, .85));
      BX(G, 180 - w / 2, 330 - h, w, h, { tone: g > .8 ? 'red' : 'blue', alpha: AL(t, 0) });
      for (var k = 0; k < Math.min(5, 1 + Math.floor(g * 5)); k++) G.badge('CPU ' + (k + 1), 180, 330 - 22 - k * 34, { tone: 'gold', align: 'center', size: 12, alpha: AL(t, k * 1.4) });
      G.line(60, 100, 300, 100, { color: C.red, w: 2.4, dash: [8, 5], alpha: AL(t, 5) });
      G.text('plafond matériel', 300, 92, { size: 12, w: 700, sans: true, color: C.red, align: 'right', alpha: AL(t, 5) });
      G.badge('prix ↑↑', 70, 360, { tone: 'red', size: 13, alpha: AL(t, 7) });
      G.line(360, 20, 360, 370, { color: C.line, w: 1.2, alpha: AL(t, 10) });
      G.text('Scale-out', 540, 30, { size: 18, w: 700, sans: true, color: C.green, align: 'center', alpha: AL(t, 10) });
      for (var i = 0; i < 4; i++) {
        var a = AL(t, 10 + i * 1.1);
        SRV(G, 395 + i * 80, 230, 64, 80, { alpha: a, label: 'nœud ' + (i + 1) });
        PK(G, 540, 110, 427 + i * 80, 228, U.seg(t, 15 + i * .3, 16.5 + i * .3), { color: C.green, lab: '¼' });
      }
      BX(G, 480, 70, 120, 44, { tone: 'green', label: 'travail divisible', size: 13, alpha: AL(t, 15) });
      G.badge('d\'abord scale-up, puis scale-out si divisible', 360, 398, { tone: 'gold', align: 'center', size: 14, alpha: AL(t, 20) });
    }
  });
})();
