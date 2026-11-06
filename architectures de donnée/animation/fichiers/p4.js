/* Partie IV — Batch et stream : N20 à N22. */

/* ------------------------------------------------ N20 : batch processing --- */
(function () {
  var HEURES = [['8 h', 40], ['12 h', 157], ['16 h', 274], ['20 h', 392], ['23 h 30', 480], ['6 h 30', 680]];
  var ETAPES = [['1. Accumuler', 'collecter et stocker'], ['2. Traiter', 'nettoyer, transformer'], ['3. Résultat', 'informations, décisions']];
  SCENES.push({
    id: 'n20', part: 4, label: 'N20', short: 'N20 Batch', title: 'Le batch processing : traiter par lots', dur: 25,
    enonce: '<p>Le <b>traitement batch</b> (traitement par lots) <b>regroupe des données sur une période</b>, puis exécute un traitement sur <b>un lot</b>.</p>' +
      '<p>Cycle en trois temps : <b>accumuler</b> → <b>traiter</b> → <b>résultat</b>. Exemples : calcul quotidien des ventes, factures, consolidation nocturne, entraînement planifié d\'un modèle.</p>',
    retenir: 'le batch <b>attend la fin de la période</b> : sa latence vaut au moins une période, quelle que soit la machine ; en échange, <b>complétude, efficacité, rejouabilité et choix du moment</b>.',
    steps: [
      [0, 'Toute la journée, les tickets des 120 magasins <b>s\'accumulent</b>.'],
      [6, 'À 23 h 30, le lot est fermé : le <b>traitement</b> commence.'],
      [11, 'À 6 h 30, le <b>résultat</b> est prêt : le tableau de bord du matin.'],
      [15, 'Le prix : une latence d\'<b>au moins une période</b>.'],
      [19, 'En échange : complétude, efficacité, rejouabilité, choix du moment.']
    ],
    draw: function (G, t) {
      var C = G.C;
      /* frise de la journée */
      G.line(40, 40, 680, 40, { color: C.line, w: 3, alpha: AL(t, 0) });
      HEURES.forEach(function (h) {
        G.line(h[1], 34, h[1], 46, { color: C.axis, w: 2, alpha: AL(t, 0) });
        G.text(h[0], h[1], 26, { size: 12, sans: true, w: 600, color: C.muted, align: 'center', alpha: AL(t, 0) });
      });
      var cx = t < 6 ? U.lerp(40, 480, U.seg(t, 0, 6)) : U.lerp(480, 680, U.seg(t, 6, 11));
      var ctx = G.ctx; ctx.save(); ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(cx, 40, 7, 0, 7); ctx.fill(); ctx.restore();
      /* le lot qui se remplit */
      var fill = U.seg(t, 0, 6), aL = AL(t, 0);
      BX(G, 40, 90, 220, 150, { tone: 'none', alpha: aL });
      ctx.save(); ctx.globalAlpha *= aL * .9; ctx.fillStyle = C.goldSoft; ctx.fillRect(42, 238 - 146 * fill, 216, 146 * fill); ctx.restore();
      G.text('Lot du jour', 150, 112, { size: 15, w: 700, sans: true, color: C.gold, align: 'center', alpha: aL });
      G.text(String(Math.round(fill * 72000)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' tickets', 150, 200, { size: 14, w: 700, sans: true, color: C.ink, align: 'center', alpha: aL });
      FLOW(G, t, 0, 5.6, 150, 60, 150, 150, { per: .25, dur: .7, color: C.gold, r: 4 });
      G.badge('fermé à 23 h 30', 150, 150, { tone: 'gold', align: 'center', size: 12, alpha: AL(t, 6) * OUT(t, 11) });
      /* traitement */
      FLOW(G, t, 6, 10.4, 262, 165, 478, 165, { per: .3, dur: .6, color: C.blue });
      G.badge('traitement de nuit', 370, 140, { tone: 'blue', align: 'center', size: 12, alpha: AL(t, 6) * OUT(t, 11) });
      /* résultat : tableau de bord */
      var aR = AL(t, 11);
      BX(G, 480, 90, 200, 150, { tone: 'green', alpha: aR });
      G.text('Tableau de bord 6 h 30', 580, 112, { size: 14, w: 700, sans: true, color: C.green, align: 'center', alpha: aR });
      [.45, .7, .55, .85, .6].forEach(function (h, i) {
        ctx.save(); ctx.globalAlpha *= aR; ctx.fillStyle = C.green; var hh = 90 * h * U.seg(t, 11, 12.5);
        ctx.fillRect(505 + i * 34, 225 - hh, 22, hh); ctx.restore();
      });
      /* trois temps */
      ETAPES.forEach(function (e, i) {
        var on = i === 0 ? t < 6 : i === 1 ? t >= 6 && t < 11 : t >= 11;
        BX(G, 40 + i * 225, 268, 190, 52, { tone: on ? ['gold', 'blue', 'green'][i] : 'none', label: e[0], sub: e[1], size: 14, alpha: AL(t, i * .3) });
        if (i) G.arrow(40 + i * 225 - 30, 294, 40 + i * 225 - 6, 294, { color: C.muted, w: 2, alpha: AL(t, i * .3) });
      });
      /* latence */
      var aT = AL(t, 15);
      G.line(40, 56, 680, 56, { color: C.red, w: 2, alpha: aT });
      G.badge('latence : un ticket de 8 h attend 22 h 30', 360, 348, { tone: 'red', align: 'center', size: 14, alpha: aT });
      /* contreparties */
      ['complétude', 'efficacité', 'rejouabilité', 'choix du moment'].forEach(function (q, i) {
        G.badge(q, 105 + i * 170, 396, { tone: 'green', align: 'center', size: 13, alpha: AL(t, 19 + i * .4) });
      });
    }
  });
})();

/* ------------------------------------------------ N21 : stream processing --- */
(function () {
  var VAL = [3.1, 3.4, 3.2, 3.6, 3.3, 3.5, 3.8, 4.0, 9.4, 3.6, 3.4, 3.2, 3.5, 3.3, 3.6, 3.4, 3.2, 3.5, 3.4, 3.3, 3.6, 3.5, 3.4];
  SCENES.push({
    id: 'n21', part: 4, label: 'N21', short: 'N21 Stream', title: 'Le stream processing : traiter au fil de l\'eau', dur: 25,
    enonce: '<p>Le <b>traitement streaming</b> traite les événements <b>au fur et à mesure de leur arrivée</b>, ou sur de <b>très petites fenêtres</b>.</p>' +
      '<p>événement 1 → événement 2 → événement 3 → … : chacun est pris en charge <b>dès qu\'il se présente</b>. Exemples : alerte capteur, détection de fraude, suivi de flotte, monitoring applicatif.</p>',
    retenir: 'le stream <b>n\'attend aucune période</b> : latence = transport + traitement d\'un événement ; en échange, système <b>toujours allumé</b>, et il faut gérer <b>doublons, désordre, retardataires et état</b>.',
    steps: [
      [0, 'Les événements arrivent <b>un par un</b> : la température de la chambre froide du magasin 47.'],
      [5, 'Chacun est traité <b>dès son arrivée</b>, sans attendre les suivants.'],
      [10, 'Une mesure dépasse 8 °C : <b>alerte en quelques secondes</b>.'],
      [14, 'On peut aussi raisonner sur de <b>très petites fenêtres</b>.'],
      [19, 'Le prix : un système toujours allumé, et quatre difficultés.']
    ],
    draw: function (G, t) {
      var C = G.C;
      G.text('Capteur — chambre froide, magasin 47', 20, 60, { size: 13, w: 700, sans: true, color: C.muted, alpha: AL(t, 0) });
      G.line(20, 130, 700, 130, { color: C.grid, w: 6, alpha: AL(t, 0) });
      BX(G, 300, 95, 130, 70, { tone: 'blue', label: 'Traitement', sub: 'continu', size: 15, alpha: AL(t, 0) });
      /* événements : un par seconde, 2 s jusqu'au traitement, 2 s ensuite */
      var lastAlert = -1;
      for (var k = 0; k < VAL.length; k++) {
        var s = k, p = (t - s) / 4;
        if (p <= 0 || p >= 1) { if (VAL[k] > 8 && p >= 1) lastAlert = s + 2; continue; }
        var v = VAL[k], hot = v > 8, x = p < .5 ? U.lerp(20, 300, p * 2) : U.lerp(430, 680, (p - .5) * 2);
        var done = p >= .5, col = !done ? C.navy : hot ? C.red : C.green;
        var ctx = G.ctx; ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, 130, hot ? 9 : 7, 0, 7); ctx.fill(); ctx.restore();
        G.text(U.fmt(v, 1) + '°', x, 112, { size: 12, w: 700, sans: true, color: col, align: 'center' });
        if (hot && done) lastAlert = s + 2;
      }
      /* alerte */
      var aA = lastAlert > 0 ? U.seg(t, lastAlert, lastAlert + .4) : 0;
      BX(G, 470, 190, 230, 64, { tone: 'red', label: 'ALERTE 9,4 °C > 8 °C', sub: 'envoyée en 2 s', size: 15, alpha: aA * OUT(t, 14) });
      G.badge('latence = transport + traitement d\'un événement', 230, 222, { tone: 'blue', align: 'center', size: 13, alpha: AL(t, 5) * OUT(t, 14) });
      /* petite fenêtre glissante */
      var aW = AL(t, 14) * OUT(t, 19.5), wx = U.lerp(40, 160, U.seg(t, 14, 19));
      BX(G, wx, 90, 120, 80, { tone: 'none', empty: true, dash: [6, 4], alpha: aW, lw: 2.4 });
      G.badge('fenêtre de 10 min qui glisse', wx + 60, 190, { tone: 'gold', align: 'center', size: 13, alpha: aW });
      /* le prix */
      var aP = AL(t, 19);
      G.badge('système toujours allumé', 360, 290, { tone: 'red', align: 'center', size: 14, alpha: aP });
      ['doublons', 'désordre', 'retardataires', 'état'].forEach(function (q, i) {
        G.badge(q, 120 + i * 160, 350, { tone: 'gold', align: 'center', size: 14, alpha: AL(t, 19.6 + i * .4) });
      });
      G.text('la complétude du batch est perdue : on décide sans attendre la fin', 360, 400, { size: 13, sans: true, it: true, color: C.muted, align: 'center', alpha: AL(t, 21.5) });
    }
  });
})();

/* ------------------------------------------------ N22 : critère de choix + cas IoV --- */
(function () {
  SCENES.push({
    id: 'n22', part: 4, label: 'N22', short: 'N22 Choisir', title: 'Batch ou stream : le critère de choix, et le cas IoV', dur: 26,
    enonce: '<p>On ne choisit ni selon la donnée, ni selon la modernité de l\'outil, mais <b>selon l\'usage</b> : le batch suffit si <b>temps de réaction exigé ≥ période + traitement</b> ; sinon, le stream.</p>' +
      '<p>Critère clé : <b>fenêtre de traitement</b> (batch) contre <b>temps de réaction</b> (stream). Cas IoV : <b>même donnée, deux usages</b> — la position GPS part en stream pour l\'alerte et en batch pour l\'historique.</p>',
    retenir: 'on compare le <b>temps de réaction exigé</b> à la latence de chaque mode ; le batch suffit s\'il tient dans la fenêtre, sinon le stream — et une même donnée peut <b>servir les deux</b>.',
    steps: [
      [0, 'On ne choisit ni par la donnée ni par la mode : <b>par l\'usage</b>.'],
      [3, 'Rapport quotidien : 1 jour exigé ≥ une nuit de batch → <b>batch</b>.'],
      [8, 'Alerte fraude : 2 s exigées, aucune fenêtre ne tient → <b>stream</b>.'],
      [13, 'Cas IoV : <b>même donnée, deux usages</b>.'],
      [16, 'En stream : détecter une <b>déviation ou un danger</b>.'],
      [19, 'En batch : l\'<b>historique des trajets</b>. Les deux nourrissent la décision.']
    ],
    draw: function (G, t) {
      var C = G.C;
      G.badge('batch si  réaction exigée ≥ période + traitement', 360, 22, { tone: 'plum', align: 'center', size: 14, alpha: AL(t, 0) });
      /* ligne 1 : rapport quotidien */
      var a1 = AL(t, 3);
      G.text('Rapport quotidien', 20, 70, { size: 14, w: 700, sans: true, color: C.ink, alpha: a1 });
      BX(G, 170, 56, 330 * U.es(t, 3, 4.5), 20, { tone: 'blue', r: 4, alpha: a1 });
      G.text('exigé : 1 jour', 180, 71, { size: 12, w: 700, sans: true, color: C.blue, alpha: a1 });
      BX(G, 170, 82, 100 * U.es(t, 4.5, 6), 20, { tone: 'gold', r: 4, alpha: AL(t, 4.5) });
      G.text('batch : 1 nuit', 280, 97, { size: 12, w: 700, sans: true, color: C.gold, alpha: AL(t, 4.5) });
      G.badge('✓ batch', 600, 78, { tone: 'green', align: 'center', size: 15, alpha: AL(t, 6) });
      /* ligne 2 : fraude */
      var a2 = AL(t, 8);
      G.text('Alerte fraude', 20, 145, { size: 14, w: 700, sans: true, color: C.ink, alpha: a2 });
      BX(G, 170, 131, 8, 20, { tone: 'blue', r: 3, alpha: a2 });
      G.text('exigé : 2 s', 184, 146, { size: 12, w: 700, sans: true, color: C.blue, alpha: a2 });
      BX(G, 170, 157, 330 * U.es(t, 9, 10.5), 20, { tone: 'red', r: 4, alpha: AL(t, 9) });
      G.text('batch : 15 min + traitement', 180, 172, { size: 12, w: 700, sans: true, color: C.red, alpha: AL(t, 9) });
      XX(G, 530, 166, 8, AL(t, 10.5));
      G.badge('✓ stream', 610, 154, { tone: 'green', align: 'center', size: 15, alpha: AL(t, 11) });
      G.line(20, 200, 700, 200, { color: C.grid, w: 2, alpha: AL(t, 13) });
      /* IoV */
      var aV = AL(t, 13);
      BX(G, 20, 285, 130, 64, { tone: 'none', label: 'Véhicule', sub: 'position GPS', size: 15, alpha: aV });
      G.badge('même donnée, deux usages', 360, 222, { tone: 'plum', align: 'center', size: 14, alpha: aV });
      var aS = AL(t, 16), aB = AL(t, 19);
      BX(G, 250, 245, 210, 52, { tone: 'red', label: 'Streaming', sub: 'déviation / danger', size: 14, alpha: aS });
      BX(G, 250, 340, 210, 52, { tone: 'blue', label: 'Batch', sub: 'historique des trajets', size: 14, alpha: aB });
      G.arrow(152, 305, 246, 274, { color: C.red, w: 2, alpha: aS });
      G.arrow(152, 330, 246, 362, { color: C.blue, w: 2, alpha: aB });
      FLOW(G, t, 16, 25, 152, 305, 246, 274, { per: .5, dur: .6, color: C.red, r: 4 });
      FLOW(G, t, 19, 25, 152, 330, 246, 362, { per: 1.2, dur: 1.4, color: C.blue, r: 4 });
      var aD = AL(t, 21);
      BX(G, 530, 288, 170, 60, { tone: 'green', label: 'Décision / analyse', size: 14, alpha: aD });
      G.arrow(462, 271, 526, 304, { color: C.green, w: 2, alpha: aD });
      G.arrow(462, 366, 526, 334, { color: C.green, w: 2, alpha: aD });
    }
  });
})();
