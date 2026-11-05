/* Partie 1 — Pourquoi les microservices ? Les trois scénarios du cours et l'évolution historique. */

/* ------------------------------------------------ Scénario 1 : accessibilité multi-plateformes --- */
(function () {
  var CL = ['Site web', 'Android', 'iOS', 'Android TV'], Y = [62, 147, 232, 317];
  DSCENES.push({
    id: 'm1', label: 'Scénario 1', short: 'Scénario 1', title: 'Accessibilité multi-plateformes : un backend, plusieurs applications', dur: 20,
    enonce: '<p>Plusieurs applications (site web, Android, iOS, Android TV) offrent <b>les mêmes fonctionnalités</b>.</p>' +
      '<p><b>Solution :</b> un <b>seul backend</b> et plusieurs applications. Les fonctionnalités métier communes sont <b>centralisées</b> et exposées par des <b>API</b> (<i>Application Programming Interfaces</i>).</p>',
    retenir: 'on sépare la <b>logique métier</b> (le backend) de l\'<b>interface</b> (les applications) : un backend, plusieurs fronts, reliés par des API.',
    steps: [
      [0, 'Quatre applications offrent les mêmes fonctionnalités.'],
      [3, 'Sans backend commun : la logique métier est <b>copiée</b> dans chaque application.'],
      [6.5, 'Solution : un <b>seul backend</b> centralise la logique métier.'],
      [9, 'Chaque application l\'appelle par une <b>API</b>.'],
      [16, 'Bilan : un backend, plusieurs fronts.']
    ],
    draw: function (G, t) {
      var C = G.C;
      CL.forEach(function (n, i) {
        var a = AL(t, i * .35);
        BX(G, 24, Y[i], 128, 44, { tone: 'plum', label: n, alpha: a });
        BX(G, 168, Y[i], 130, 44, { tone: 'red', label: 'logique métier', sub: 'copie n° ' + (i + 1), size: 13, alpha: AL(t, 3 + i * .3) * OUT(t, 6, .6) });
      });
      G.badge('la même logique écrite 4 fois', 162, 395, { tone: 'red', alpha: AL(t, 4.5) * OUT(t, 6, .6), size: 14 });

      var aB = AL(t, 6.5, .7);
      BX(G, 386, 128, 46, 168, { tone: 'gold', label: 'API', size: 14, alpha: AL(t, 9) });
      BX(G, 456, 98, 236, 228, { tone: 'blue', alpha: aB });
      G.text('Backend unique', 574, 128, { size: 17, w: 700, sans: true, color: C.navy, align: 'center', alpha: aB });
      G.text('logique métier centralisée', 574, 148, { size: 12, sans: true, color: C.muted, align: 'center', alpha: aB });
      ['Comptes', 'Catalogue', 'Commandes', 'Paiement'].forEach(function (m, i) {
        BX(G, 480, 166 + i * 37, 188, 30, { tone: 'none', label: m, size: 13, alpha: aB * AL(t, 7 + i * .25) });
      });
      G.line(432, 212, 456, 212, { color: C.gold, w: 2, alpha: AL(t, 9) });
      CL.forEach(function (n, i) {
        var a = AL(t, 9 + i * .3);
        G.arrow(154, Y[i] + 22, 384, 212 + (i - 1.5) * 30, { color: C.muted, w: 1.6, alpha: a });
        FLOW(G, t, 10.5 + i * .25, 15.5, 154, Y[i] + 22, 384, 212 + (i - 1.5) * 30, { per: 1.1, dur: 1, color: C.gold });
      });
      G.badge('1 backend · plusieurs fronts · des API', 360, 392, { tone: 'green', align: 'center', alpha: AL(t, 16), size: 15 });
    }
  });
})();

/* ------------------------------------------------ Scénario 2 : hétérogénéité technologique --- */
(function () {
  DSCENES.push({
    id: 'm2', label: 'Scénario 2', short: 'Scénario 2', title: 'Hétérogénéité technologique : un module dans une autre technologie', dur: 20,
    enonce: '<p>Un nouveau module doit être écrit dans une <b>autre technologie</b> que le système existant (ex. : une IA en <b>Python</b> dans une application <b>Java / Spring Boot</b>).</p>' +
      '<p><b>Solution :</b> développer ce module comme un <b>service indépendant</b> qui expose ses fonctionnalités par une <b>API</b>, appelée par l\'application existante via un protocole standard comme <b>HTTP</b>.</p>',
    retenir: 'quand deux technologies ne peuvent pas cohabiter dans le même programme, on les fait <b>dialoguer par une API</b> au lieu de les mélanger.',
    steps: [
      [0, 'L\'application existante est écrite en <b>Java / Spring Boot</b>.'],
      [3, 'Le nouveau module d\'IA est écrit en <b>Python</b> : il ne rentre pas dans l\'application Java.'],
      [7.5, 'Solution : il devient un <b>service indépendant</b>, avec son propre environnement.'],
      [11, 'L\'application l\'appelle par une <b>API</b>, via HTTP.'],
      [17, 'Bilan : chacun sa technologie, reliés par une API.']
    ],
    draw: function (G, t) {
      var C = G.C, a0 = AL(t, 0, .6);
      BX(G, 30, 64, 320, 262, { tone: 'blue', alpha: a0 });
      G.text('Application existante', 190, 94, { size: 17, w: 700, sans: true, color: C.navy, align: 'center', alpha: a0 });
      G.badge('Java · Spring Boot', 190, 118, { tone: 'blue', align: 'center', size: 12, alpha: a0 });
      ['Catalogue', 'Commandes', 'Paiement'].forEach(function (m, i) {
        BX(G, 56, 142 + i * 46, 268, 36, { tone: 'none', label: m, size: 14, alpha: a0 });
      });
      /* le module Python tente d'entrer puis ressort */
      var inX = U.lerp(470, 200, U.es(t, 3, 5)), back = U.es(t, 6.3, 7.3), mx = U.lerp(inX, 470, back);
      var aM = AL(t, 2.6) * OUT(t, 7.5, .5);
      BX(G, mx, 282, 150, 44, { tone: 'gold', label: 'Module IA', sub: 'Python', alpha: aM });
      var aX = AL(t, 5) * OUT(t, 7.3, .5);
      XX(G, 258, 250, 12, aX);
      G.text('Python ≠ Java : ça ne s\'intègre pas', 190, 352, { size: 14, w: 700, sans: true, color: C.red, align: 'center', alpha: aX });

      var aS = AL(t, 7.5, .7);
      BX(G, 468, 120, 224, 130, { tone: 'green', alpha: aS });
      G.text('Service IA', 580, 158, { size: 17, w: 700, sans: true, color: C.green, align: 'center', alpha: aS });
      G.badge('Python', 580, 184, { tone: 'gold', align: 'center', size: 12, alpha: aS });
      G.text('son propre runtime', 580, 222, { size: 12, sans: true, color: C.muted, align: 'center', alpha: aS });
      BX(G, 440, 160, 30, 50, { tone: 'gold', label: 'API', size: 11, alpha: AL(t, 9) });
      var aL = AL(t, 11);
      G.arrow(350, 185, 438, 185, { color: C.muted, w: 2, alpha: aL });
      G.text('HTTP', 394, 226, { size: 12, sans: true, w: 700, color: C.muted, align: 'center', alpha: aL });
      for (var k = 0; k < 3; k++) {
        var s = 12 + k * 1.6;
        PK(G, 350, 185, 438, 185, (t - s) / .8, { color: C.gold, lab: 'requête' });
        PK(G, 438, 200, 350, 200, (t - s - .8) / .8, { color: C.blue, lab: 'réponse' });
      }
      G.badge('chacun sa technologie, reliés par une API', 360, 392, { tone: 'green', align: 'center', alpha: AL(t, 17), size: 15 });
    }
  });
})();

/* ------------------------------------------------ Scénario 3 : scalabilité indépendante --- */
(function () {
  var MODS = ['Catalogue', 'Panier', 'Paiement', 'Comptes'], LOAD = [.95, .2, .15, .1];
  DSCENES.push({
    id: 'm3', label: 'Scénario 3', short: 'Scénario 3', title: 'Scalabilité indépendante : renforcer seulement ce qui est chargé', dur: 22,
    enonce: '<p>Une <b>seule fonctionnalité</b> subit une forte charge (ex. : le <b>catalogue</b> pendant le Black Friday).</p>' +
      '<p><b>Solution :</b> diviser l\'application en <b>services indépendants</b>, chacun responsable d\'une fonctionnalité, et n\'allouer des <b>ressources supplémentaires</b> qu\'aux services qui subissent le trafic.</p>',
    retenir: 'dans un bloc unique, on paie pour tout faire grossir ; avec des services séparés, on <b>ne fait grossir que ce qui est sollicité</b>.',
    steps: [
      [0, 'Black Friday : seul le <b>Catalogue</b> est saturé.'],
      [5, 'En un seul bloc, il faut <b>copier toute l\'application</b> : des ressources gaspillées.'],
      [11, 'Solution : l\'application est divisée en <b>services indépendants</b>.'],
      [14, 'On ajoute des instances <b>du Catalogue seulement</b>.'],
      [18.5, 'Bilan : les ressources vont là où est le trafic.']
    ],
    draw: function (G, t) {
      var C = G.C, aMono = OUT(t, 11, .6);
      G.badge('Black Friday', 172, 36, { tone: 'gold', align: 'center', alpha: AL(t, .5) });
      /* l'application en un bloc et ses copies */
      [0, 1, 2].forEach(function (c) {
        var a = c === 0 ? aMono : AL(t, 6 + c * .6) * aMono, x = 30 + c * 200, w = c === 0 ? 290 : 180;
        if (c > 0) x = 340 + (c - 1) * 190;
        BX(G, x, 60, w, 266, { tone: 'blue', alpha: a });
        G.text(c === 0 ? 'Boutique (un seul bloc)' : 'Copie ' + c, x + w / 2, 84, { size: 14, w: 700, sans: true, color: C.navy, align: 'center', alpha: a });
        MODS.forEach(function (m, i) {
          var idle = c > 0 && i > 0;
          BX(G, x + 12, 100 + i * 54, w - 24, 44, { tone: idle ? 'red' : 'none', alpha: a, size: 13 });
          G.text(m, x + 24, 126 + i * 54, { size: 13, w: 600, sans: true, color: C.ink, alpha: a });
          var v = c === 0 ? LOAD[i] * U.es(t, .6, 3) : (i === 0 ? .45 : .05);
          if (c === 0 && i === 0) v = U.lerp(v, .45, U.es(t, 7, 8.5));
          GAUGE(G, c === 0 ? x + w - 110 : x + w - 70, 116 + i * 54, c === 0 ? 70 : 44, v, { alpha: a });
        });
      });
      G.badge('copies inutiles de Panier, Paiement, Comptes', 528, 352, { tone: 'red', align: 'center', alpha: AL(t, 7.5) * aMono, size: 13 });

      /* les services */
      var aS = AL(t, 11, .7);
      MODS.forEach(function (m, i) {
        var y = 70 + i * 74;
        BX(G, 30, y, 200, 52, { tone: i === 0 ? 'gold' : 'green', alpha: aS });
        G.text(m, 44, y + 31, { size: 14, w: 700, sans: true, color: C.ink, alpha: aS });
        GAUGE(G, 140, y + 21, 66, i === 0 ? U.lerp(.95, .35, U.es(t, 15, 17)) : LOAD[i], { alpha: aS });
      });
      [1, 2].forEach(function (k) {
        var a = AL(t, 14 + k * .6);
        BX(G, 30 + k * 220, 70, 200, 52, { tone: 'gold', alpha: a });
        G.text('Catalogue · instance ' + (k + 1), 44 + k * 220, 101, { size: 13, w: 700, sans: true, color: C.ink, alpha: a });
      });
      G.text('×3 instances du Catalogue seulement', 455, 150, { size: 14, w: 700, sans: true, color: C.gold, align: 'center', alpha: AL(t, 15.5) });
      G.badge('les ressources vont là où est le trafic', 360, 392, { tone: 'green', align: 'center', alpha: AL(t, 18.5), size: 15 });
    }
  });
})();

/* ------------------------------------------------ Évolution historique --- */
(function () {
  var E = [
    ['1960s', ['Systèmes', 'centralisés'], ['mainframes : applis', 'et données au', 'même endroit']],
    ['1980s', ['Client-serveur', '& monolithes'], ['le monolithe', 'reste courant']],
    ['1990s', ['Architecture', '3-tiers'], ['présentation,', 'métier, données', 'séparées']],
    ['2000', ['SOA'], ['services', 'réutilisables,', 'interopérabilité']],
    ['2010s', ['Microservices'], ['déploiement', 'indépendant, par', 'capacité métier']],
    ['2020s', ['Cloud-native'], ['conteneurs,', 'orchestration,', 'serverless']]
  ];
  var T = [1, 4, 7, 10, 13, 16];
  DSCENES.push({
    id: 'm4', label: 'Historique', short: 'Historique', title: 'Des mainframes au cloud-native : une évolution, pas une mode', dur: 24,
    enonce: '<p>Les microservices sont l\'aboutissement d\'une évolution :</p>' +
      '<p><b>1960s</b> systèmes centralisés · <b>1980s</b> client-serveur &amp; monolithes · <b>1990s</b> 3-tiers · <b>2000</b> SOA · <b>2010s</b> microservices · <b>2020s</b> cloud-native.</p>' +
      '<p>À chaque étape, on <b>sépare davantage les responsabilités</b>.</p>',
    retenir: '<b>SOA ≠ microservices</b> : la SOA vise la <b>réutilisation</b> et l\'interopérabilité ; les microservices visent le <b>déploiement indépendant</b> par capacité métier.',
    steps: [
      [1, '<b>1960s</b> : tout est centralisé sur le mainframe.'],
      [4, '<b>1980s</b> : client-serveur ; les applications restent monolithiques.'],
      [7, '<b>1990s</b> : on sépare présentation, logique métier et données.'],
      [10, '<b>2000</b> : la SOA, des services réutilisables.'],
      [13, '<b>2010s</b> : les microservices, déployables indépendamment.'],
      [16, '<b>2020s</b> : le cloud-native (conteneurs, orchestration, serverless).'],
      [19.5, 'Piège : SOA et microservices ne sont pas synonymes.']
    ],
    draw: function (G, t) {
      var C = G.C, x0 = 70, dx = 116, y = 168;
      G.text('Une brève histoire des architectures logicielles', 360, 40, { size: 20, w: 600, color: C.navy, align: 'center' });
      G.line(x0 - 20, y, x0 + 5 * dx + 20, y, { color: C.grid, w: 6 });
      var k = 0; T.forEach(function (s, i) { if (t >= s) k = i; });
      var prog = t < T[0] ? 0 : Math.min(1, (k + U.es(t, T[k], T[k] + 1) * (k < 5 ? 1 : 0)) / 5);
      G.line(x0 - 20, y, x0 - 20 + (5 * dx + 40) * Math.max(.02, prog), y, { color: C.blue, w: 6 });
      E.forEach(function (e, i) {
        var a = AL(t, T[i], .6), x = x0 + i * dx, focus = i === 4 && t >= 19.5;
        var ctx = G.ctx; ctx.save(); ctx.globalAlpha *= a;
        ctx.beginPath(); ctx.arc(x, y, 10, 0, 7); ctx.fillStyle = focus ? C.gold : C.surface; ctx.fill();
        ctx.lineWidth = 3.5; ctx.strokeStyle = focus ? C.gold : C.blue; ctx.stroke(); ctx.restore();
        G.text(e[0], x, y - 26, { size: 19, w: 700, sans: true, color: C.navy, align: 'center', alpha: a });
        TX(G, e[1], x, y + 38, { size: 14, w: 700, align: 'center', alpha: a, lh: 17 });
        TX(G, e[2], x, y + 38 + e[1].length * 17 + 10, { size: 12, color: C.muted, align: 'center', alpha: a, lh: 15 });
      });
      var aS = AL(t, 19.5);
      BX(G, 150, 330, 420, 60, { tone: 'gold', alpha: aS });
      G.text('SOA ≠ microservices', 360, 352, { size: 16, w: 700, sans: true, color: C.ink, align: 'center', alpha: aS });
      G.text('SOA : réutilisation  ·  microservices : déploiement indépendant', 360, 374, { size: 13, sans: true, color: C.muted, align: 'center', alpha: aS });
    }
  });
})();
