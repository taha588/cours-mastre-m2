/* Partie 2 — Les architectures : monolithe, scalabilité, monolithe modulaire, microservices. */

/* modules communs (position dans un monolithe) */
var MODS4 = [['Commandes', 60, 136], ['Produits', 262, 136], ['Paiements', 60, 200], ['Authentification', 262, 200]];

/* ------------------------------------------------ Architecture monolithique --- */
(function () {
  var CAR = ['1 · Unité de déploiement unique', '2 · Environnement d\'exécution partagé', '3 · Composants fortement intégrés', '4 · Gestion centralisée'];
  var TC = [3, 8, 12, 16.5];
  SCENES.push({
    id: 'a1', label: 'Définition 1', short: 'Monolithe', title: 'L\'architecture monolithique : tout dans un seul bloc', dur: 22,
    enonce: '<p>Une <b>architecture monolithique</b> est un style d\'architecture logicielle dans lequel les fonctionnalités de l\'application sont développées et déployées comme <b>une seule unité unifiée</b>.</p>' +
      '<p>Caractéristiques : <b>unité de déploiement unique</b> · <b>environnement d\'exécution partagé</b> (même processus) · <b>composants fortement intégrés</b> (appels directs) · <b>gestion centralisée</b> (construite, testée, déployée comme un tout).</p>',
    retenir: 'le mot clé du monolithe est « <b>un</b> » : un code, un processus, un paquet, un déploiement.',
    steps: [
      [0, 'Une boutique en ligne : interface, modules et accès aux données dans <b>une seule application</b>.'],
      [3, '<b>Unité de déploiement unique</b> : un seul paquet part sur le serveur.'],
      [8, '<b>Environnement partagé</b> : tout tourne dans le même processus.'],
      [12, '<b>Composants intégrés</b> : les modules s\'appellent directement.'],
      [16.5, '<b>Gestion centralisée</b> : on construit, teste et déploie le tout.']
    ],
    draw: function (G, t) {
      var C = G.C, ctx = G.ctx;
      BX(G, 40, 40, 440, 300, { tone: 'blue' });
      G.text('Application monolithique', 60, 66, { size: 16, w: 700, sans: true, color: C.navy });
      BX(G, 60, 80, 400, 40, { tone: 'plum', label: 'Interface utilisateur', size: 14 });
      MODS4.forEach(function (m) { BX(G, m[1], m[2], 180, 52, { tone: 'none', label: m[0], size: 14 }); });
      BX(G, 60, 268, 400, 40, { tone: 'none', label: 'Accès aux données', size: 13 });
      CY(G, 610, 300, 80, 56, { label: 'base unique' });
      G.arrow(462, 290, 566, 296, { color: C.muted, w: 1.6 });
      /* 1. un seul paquet vers le serveur */
      SRV(G, 560, 56, 100, 92, { label: 'Serveur', alpha: AL(t, 3) });
      var p = U.es(t, 4, 6.5), aP = AL(t, 3.6) * (t < 8 ? 1 : .0);
      if (aP > 0) BX(G, U.lerp(210, 566, p), U.lerp(176, 84, p), 88, 28, { tone: 'gold', label: 'boutique.jar', size: 12, alpha: aP });
      if (t >= 6.5 && t < 8.5) G.check(true, 610, 166, { alpha: OUT(t, 8, .5) });
      /* 2. un seul processus */
      var a2 = AL(t, 8) * OUT(t, 12, .5);
      if (a2 > 0) { BX(G, 50, 128, 420, 132, { tone: 'gold', empty: true, dash: [7, 5], lw: 2.4, alpha: a2 });
        G.badge('1 seul processus', 470, 128, { tone: 'gold', align: 'right', alpha: a2, size: 13 }); }
      /* 3. appels directs */
      var a3 = AL(t, 12) * OUT(t, 16.5, .5);
      if (a3 > 0) {
        G.arrow(240, 162, 260, 162, { color: C.blue, w: 2.4, alpha: a3 });
        G.arrow(150, 188, 150, 198, { color: C.blue, w: 2.4, alpha: a3 });
        G.arrow(352, 188, 352, 198, { color: C.blue, w: 2.4, alpha: a3 });
        PK(G, 150, 162, 340, 162, (t - 13) / 1.2, { color: C.blue, lab: 'appel direct' });
        PK(G, 150, 226, 340, 226, (t - 14.4) / 1.2, { color: C.blue });
      }
      /* 4. construire, tester, déployer : le tout */
      ['construire', 'tester', 'déployer'].forEach(function (s, i) {
        G.badge(s + ' le tout', 120 + i * 175, 380, { tone: 'green', align: 'center', alpha: AL(t, 16.5 + i * .6), size: 13 });
        if (i) G.arrow(120 + i * 175 - 105, 380, 120 + i * 175 - 72, 380, { color: C.green, w: 1.8, alpha: AL(t, 16.5 + i * .6) });
      });
      var k = -1; TC.forEach(function (s, i) { if (t >= s) k = i; });
      if (k >= 0 && t < 16.5) G.badge(CAR[k], 360, 380, { tone: 'gold', align: 'center', size: 14 });
    }
  });
})();

/* ------------------------------------------------ Avantages et limites --- */
(function () {
  var P = [['Développement simple', 'Complexité croissante'], ['Déploiement facile', 'Dépendances de déploiement'],
    ['Communication efficace', 'Propagation des pannes'], ['Tests simplifiés', 'Scalabilité limitée']];
  var SUB = [['tout dans une seule application', 'le code devient dur à comprendre'], ['un seul paquet à déployer', 'tout redéployer pour un petit changement'],
    ['appels directs, sans réseau', 'une panne peut tout arrêter'], ['tests de bout en bout unifiés', 'on ne grossit qu\'en bloc']];
  SCENES.push({
    id: 'a2', label: 'Notion', short: 'Avantages / limites', title: 'Le monolithe : chaque avantage a sa limite jumelle', dur: 24,
    enonce: '<p><b>Avantages :</b> développement simple · déploiement facile · tests simplifiés · communication efficace.</p>' +
      '<p><b>Limites :</b> scalabilité limitée · complexité croissante · dépendances de déploiement · propagation des pannes.</p>' +
      '<p><b>Quand le choisir :</b> petites applications, petites équipes, projets à un stade précoce, infrastructure limitée, opérations fortement couplées.</p>',
    retenir: 'le monolithe n\'est <b>ni bon ni mauvais</b> : tant que l\'application est petite, les avantages dominent ; quand elle grandit, les limites prennent le dessus.',
    steps: [
      [0, 'Simple à développer… mais de plus en plus <b>complexe</b> quand il grandit.'],
      [4.5, 'Facile à déployer… mais il faut <b>tout redéployer</b> pour un petit changement.'],
      [9, 'Appels directs rapides… mais une <b>panne se propage</b>.'],
      [13.5, 'Tests simplifiés… mais on ne peut grossir <b>qu\'en bloc</b>.'],
      [18, 'Petite application : avantages ; grande application : limites.']
    ],
    draw: function (G, t) {
      var C = G.C, big = U.es(t, 19.5, 22.5);
      G.text('Avantage', 190, 36, { size: 16, w: 700, sans: true, color: C.green, align: 'center' });
      G.text('… et sa limite', 530, 36, { size: 16, w: 700, sans: true, color: C.red, align: 'center' });
      P.forEach(function (p, i) {
        var y = 52 + i * 66, s = i * 4.5, aL = AL(t, s) * (1 - .55 * big), aR = AL(t, s + 2) * (t >= 18 ? .45 + .55 * big : 1);
        BX(G, 30, y, 310, 54, { tone: 'green', label: p[0], sub: SUB[i][0], alpha: aL, size: 15 });
        BX(G, 380, y, 310, 54, { tone: 'red', label: p[1], sub: SUB[i][1], alpha: aR, size: 15 });
        G.text('mais', 360, y + 31, { size: 11, it: true, color: C.muted, align: 'center', alpha: AL(t, s + 2) });
      });
      /* curseur taille de l'application */
      var aT = AL(t, 18);
      G.line(80, 344, 640, 344, { color: C.line, w: 6, alpha: aT });
      G.text('petite application', 80, 372, { size: 13, sans: true, w: 600, color: C.green, alpha: aT });
      G.text('grande application', 640, 372, { size: 13, sans: true, w: 600, color: C.red, align: 'right', alpha: aT });
      var x = U.lerp(90, 630, big), ctx = G.ctx;
      ctx.save(); ctx.globalAlpha *= aT; ctx.fillStyle = big > .5 ? C.red : C.green; ctx.beginPath(); ctx.arc(x, 344, 10, 0, 7); ctx.fill(); ctx.restore();
      G.text(big > .5 ? 'les limites dominent' : 'les avantages dominent', x, 404, { size: 14, w: 700, sans: true, color: big > .5 ? C.red : C.green, align: 'center', alpha: aT });
    }
  });
})();

/* ------------------------------------------------ Scalabilité verticale / horizontale --- */
(function () {
  SCENES.push({
    id: 'a3', label: 'Définition 2', short: 'Scalabilité', title: 'La scalabilité : grandir en hauteur (up) ou en largeur (out)', dur: 27,
    enonce: '<p>La <b>scalabilité</b> est la capacité d\'un système à absorber une charge croissante en lui allouant des ressources de calcul supplémentaires.</p>' +
      '<p><b>Verticale (scaling up)</b> : on augmente les ressources d\'un serveur existant (CPU, mémoire, disque).</p>' +
      '<p><b>Horizontale (scaling out)</b> : on ajoute des serveurs ou des instances et on répartit la charge.</p>',
    retenir: 'verticale = <b>simple</b>, mais <b>limitée</b> par le matériel, <b>chère</b> et <b>point unique de défaillance</b> ; horizontale = <b>extensible</b> et <b>redondante</b>, mais demande un répartiteur de charge et de la coordination.',
    steps: [
      [0, 'Un seul serveur : quand les utilisateurs arrivent, la charge CPU grimpe.'],
      [3, '<b>Verticale</b> : on renforce la même machine (plus de CPU, plus de mémoire).'],
      [6.5, 'Mais on touche la <b>limite matérielle</b>, et le coût explose.'],
      [9.5, 'Si ce serveur tombe, tout s\'arrête : <b>point unique de défaillance (SPOF)</b>.'],
      [13, '<b>Horizontale</b> : un répartiteur de charge distribue les requêtes entre plusieurs serveurs.'],
      [17, 'Plus de charge ? On <b>ajoute des serveurs</b>.'],
      [20, 'Un serveur tombe : les autres continuent, c\'est la <b>redondance</b>.'],
      [24, 'Bilan : deux façons de grandir, deux profils.']
    ],
    draw: function (G, t) {
      var C = G.C, V = t < 13, sum = t >= 24;
      if (sum) {
        BX(G, 40, 60, 300, 280, { tone: 'gold' }); BX(G, 380, 60, 300, 280, { tone: 'green' });
        G.text('Verticale (up)', 190, 92, { size: 18, w: 700, sans: true, color: C.gold, align: 'center' });
        G.text('Horizontale (out)', 530, 92, { size: 18, w: 700, sans: true, color: C.green, align: 'center' });
        TX(G, ['✓ simple à mettre en œuvre', '✗ limitée par le matériel', '✗ matériel puissant = cher', '✗ point unique de défaillance', '✓ état simple à gérer'], 62, 136, { size: 15, lh: 36, alpha: AL(t, 24) });
        TX(G, ['✗ configuration supplémentaire', '✓ extensible : + de serveurs', '✓ serveurs abordables', '✓ redondance = disponibilité', '✗ état partagé à coordonner'], 402, 136, { size: 15, lh: 36, alpha: AL(t, 24.4) });
        return;
      }
      USERS(G, 30, 150);
      if (V) {
        G.text('Scalabilité verticale (scale up)', 360, 36, { size: 18, w: 700, sans: true, color: C.navy, align: 'center', alpha: AL(t, 3) });
        var g = U.es(t, 3, 4.5) + U.es(t, 6.5, 8), w = 90 + 50 * g, h = 130 + 59 * g, x = 300 - w / 2, y = 340 - h, down = t >= 10;
        SRV(G, x, y, w, h, { down: down });
        if (down) XX(G, 300, y + h / 2, 26, AL(t, 10, .3));
        G.line(180, 92, 430, 92, { color: C.red, w: 2.4, dash: [9, 6], alpha: AL(t, 6.5) });
        G.text('limite matérielle', 436, 97, { size: 13, w: 700, sans: true, color: C.red, alpha: AL(t, 6.5) });
        G.text(['4 CPU · 16 Go', '16 CPU · 64 Go', '64 CPU · 512 Go'][t < 3.8 ? 0 : t < 7.3 ? 1 : 2], 300, 362, { size: 13, sans: true, w: 600, color: C.muted, align: 'center' });
        var load = U.lerp(.2, .95, U.es(t, .5, 2.5)); load = U.lerp(load, .45, U.es(t, 3.5, 4.5)); load = U.lerp(load, .85, U.es(t, 7.5, 8.5));
        if (down) load = 0;
        G.text('Charge CPU', 500, 170, { size: 13, sans: true, w: 600, color: C.muted });
        GAUGE(G, 500, 180, 150, load, { label: down ? '—' : Math.round(load * 100) + ' %' });
        G.text('Coût du matériel', 500, 236, { size: 13, sans: true, w: 600, color: C.muted, alpha: AL(t, 3.5) });
        G.text(t < 7 ? '€€' : '€€€€€€', 500, 266, { size: 22, sans: true, w: 700, color: C.gold, alpha: AL(t, 3.5) });
        if (!down) FLOW(G, t, 0, 9.5, 80, 210, x - 4, 250, { per: .5, dur: 1, color: C.blue });
        G.badge('SPOF : tout le service s\'arrête', 300, 394, { tone: 'red', align: 'center', alpha: AL(t, 10), size: 14 });
        return;
      }
      G.text('Scalabilité horizontale (scale out)', 360, 36, { size: 18, w: 700, sans: true, color: C.navy, align: 'center' });
      BX(G, 180, 170, 110, 80, { tone: 'plum', label: 'Répartiteur', sub: 'de charge', size: 14 });
      FLOW(G, t, 13.2, 24, 80, 210, 178, 210, { per: .4, dur: .8, color: C.blue });
      var n = t >= 17 ? 4 : 2;
      for (var i = 0; i < 4; i++) {
        var yS = 62 + i * 78, a = i < 2 ? AL(t, 13.3 + i * .3) : AL(t, 17 + (i - 2) * .4), dn = i === 2 && t >= 20;
        if (a <= 0) continue;
        SRV(G, 430, yS, 120, 58, { down: dn, alpha: a });
        G.text('Serveur ' + (i + 1), 570, yS + 34, { size: 14, w: 700, sans: true, color: dn ? C.red : C.ink, alpha: a });
        if (dn) XX(G, 490, yS + 29, 14, AL(t, 20, .3));
        G.arrow(292, 210, 428, yS + 29, { color: dn ? C.red : C.muted, w: 1.5, alpha: a * (dn ? .25 : 1), dash: dn ? [4, 4] : null });
        if (!dn && i < n) FLOW(G, t, 13.6 + i * .2, 24, 292, 210, 428, yS + 29, { per: n * .4, dur: .9, color: C.blue });
      }
      G.badge(t < 20 ? '+ de serveurs = + de capacité' : 'redondance : le service continue', 360, 394, { tone: 'green', align: 'center', alpha: AL(t, 17), size: 14 });
    }
  });
})();

/* ------------------------------------------------ Monolithe modulaire --- */
(function () {
  var M = [['Commandes', 70, 92], ['Produits', 400, 92], ['Paiements', 70, 222], ['Authentification', 400, 222]];
  SCENES.push({
    id: 'a4', label: 'Définition 3', short: 'Modulaire', title: 'Le monolithe modulaire : des modules rangés, un seul déploiement', dur: 24,
    enonce: '<p>Un <b>monolithe modulaire</b> est une architecture logicielle dans laquelle l\'application est organisée en <b>modules bien définis et faiblement couplés</b>, tout en restant <b>une seule unité déployable</b>.</p>' +
      '<p>Organisation modulaire (1 module = 1 capacité métier) · déploiement unique · <b>frontières claires</b> (interfaces internes) · communication dans le même processus.</p>',
    retenir: 'le mot clé est <b>interface</b> : un module ne touche jamais l\'intérieur d\'un autre, il passe par ce que l\'autre accepte de faire pour lui.',
    steps: [
      [0, 'Sans frontières, les modules s\'appellent <b>dans tous les sens</b> : qui dépend de qui ?'],
      [6, 'Solution : chaque capacité métier devient un <b>module</b> avec une <b>interface</b>.'],
      [11, 'Commandes réserve du stock en passant par l\'interface de Produits.'],
      [15, 'Accéder directement à la table de Produits est <b>interdit</b>.'],
      [19, 'Mais c\'est toujours <b>un seul processus</b> et <b>un seul déploiement</b>.']
    ],
    draw: function (G, t) {
      var C = G.C, ctx = G.ctx, clean = AL(t, 6, .8);
      BX(G, 40, 40, 640, 300, { tone: 'blue', alpha: .35 + .65 * AL(t, 19) });
      G.text('Une seule application', 60, 64, { size: 15, w: 700, sans: true, color: C.navy, alpha: .5 + .5 * AL(t, 19) });
      M.forEach(function (m) {
        BX(G, m[1], m[2], 250, 92, { tone: clean > .5 ? 'green' : 'none', alpha: 1 });
        G.text(m[0], m[1] + 125, m[2] + 38, { size: 16, w: 700, sans: true, color: C.ink, align: 'center' });
      });
      /* enchevêtrement */
      var aT = AL(t, .5) * OUT(t, 6, .8);
      if (aT > 0) {
        ctx.save(); ctx.globalAlpha *= aT; ctx.strokeStyle = C.red; ctx.lineWidth = 2;
        [[195, 184, 525, 222, 300, 300], [525, 184, 195, 222, 420, 120], [320, 138, 400, 268, 200, 330], [400, 138, 320, 268, 560, 330], [195, 222, 525, 184, 330, 160]].forEach(function (c) {
          ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.quadraticCurveTo(c[4], c[5], c[2], c[3]); ctx.stroke();
        });
        ctx.restore();
        G.badge('qui dépend de qui ?', 360, 200, { tone: 'red', align: 'center', alpha: AL(t, 2) * aT, size: 14 });
      }
      /* interfaces */
      M.forEach(function (m) {
        var px = m[1] < 300 ? m[1] + 250 : m[1] - 14;
        BX(G, px, m[2] + 28, 14, 36, { tone: 'gold', r: 3, alpha: clean });
      });
      G.text('interfaces', 360, 72, { size: 12, sans: true, w: 700, color: C.gold, align: 'center', alpha: clean * OUT(t, 19) });
      /* table interne de Produits */
      var aI = AL(t, 10);
      BX(G, 560, 140, 70, 34, { tone: 'none', label: 'table', size: 12, r: 3, alpha: aI });
      G.text('code interne', 470, 158, { size: 12, sans: true, color: C.muted, align: 'center', alpha: aI });
      /* appel par l'interface */
      if (t >= 11 && t < 19) {
        PK(G, 320, 138, 400, 138, (t - 11.5) / 1.4, { color: C.blue, lab: 'reserverStock(id, qté)' });
        if (t > 12.9 && t < 15) G.check(true, 393, 116, { alpha: OUT(t, 14.5) });
      }
      var aF = AL(t, 15) * OUT(t, 19);
      if (aF > 0) {
        G.line(250, 120, 560, 152, { color: C.red, w: 2, dash: [6, 5], alpha: aF });
        XX(G, 405, 136, 11, aF);
        G.text('accès direct à la table : interdit', 405, 333, { size: 14, w: 700, sans: true, color: C.red, align: 'center', alpha: aF });
      }
      G.badge('1 processus · 1 paquet · 1 déploiement', 360, 384, { tone: 'blue', align: 'center', alpha: AL(t, 19), size: 15 });
    }
  });
})();

/* ------------------------------------------------ Architecture microservices --- */
(function () {
  var A = [[70, 92], [400, 92], [70, 222], [400, 222]];               /* positions dans le monolithe modulaire */
  var B = [[40, 60], [380, 60], [40, 250], [380, 250]];               /* positions en services séparés */
  var N = ['Produits', 'Commandes', 'Paiements', 'Authentification'];
  SCENES.push({
    id: 'a5', label: 'Définition 4', short: 'Microservices', title: 'L\'architecture microservices : chaque module devient un programme', dur: 26,
    enonce: '<p>L\'<b>architecture microservices</b> est un style d\'architecture logicielle dans lequel une application est organisée comme une <b>collection de petits services faiblement couplés et déployables indépendamment</b>, chacun responsable d\'une <b>capacité métier</b> précise.</p>' +
      '<p>Les services communiquent par le <b>réseau</b> : API REST ou messagerie.</p>',
    retenir: 'la caractéristique clé est le <b>déploiement indépendant</b> ; le prix à payer est la <b>complexité d\'un système distribué</b> (réseau, sécurité, coordination).',
    steps: [
      [0, 'On part des modules du monolithe modulaire…'],
      [3, '… et chaque module devient un <b>service séparé</b>, avec <b>sa propre base</b>.'],
      [8, '<b>Déploiement indépendant</b> : Produits part en production seul, les autres suivront.'],
      [13, 'Les services se parlent par le <b>réseau</b> : API REST…'],
      [16.5, '… ou <b>messagerie</b> (des événements).'],
      [21, 'Chaque service est une porte ouverte : il faut le <b>sécuriser</b>.']
    ],
    draw: function (G, t) {
      var C = G.C, m = U.es(t, 3, 5);
      BX(G, 40, 40, 640, 300, { tone: 'blue', alpha: .35 * OUT(t, 3, 1) });
      var aBus = AL(t, 16.5);
      BX(G, 40, 172, 640, 30, { tone: 'green', alpha: aBus });
      G.text('messagerie (bus d\'événements)', 668, 192, { size: 13, w: 600, sans: true, color: C.green, align: 'right', alpha: aBus });
      N.forEach(function (n, i) {
        var x = U.lerp(A[i][0], B[i][0], m), y = U.lerp(A[i][1], B[i][1], m), w = U.lerp(250, 200, m), h = U.lerp(92, 80, m);
        var prod = i === 0 && t >= 8, dev = i > 0 && t >= 8 && t < 13;
        BX(G, x, y, w, h, { tone: prod ? 'green' : 'blue' });
        G.text(n, x + w / 2, y + 34, { size: 16, w: 700, sans: true, color: C.ink, align: 'center' });
        G.text(prod ? 'en production ✓' : dev ? 'en développement…' : 'service ' + (i + 1), x + w / 2, y + 56, { size: 12, sans: true, w: 600, color: prod ? C.green : C.muted, align: 'center', alpha: t >= 5 ? 1 : 0 });
        CY(G, x + w + 60, y + h / 2 - 4, 60, 40, { label: i < 2 ? '' : 'sa propre base', alpha: AL(t, 5 + i * .2) });
        G.line(x + w, y + h / 2, x + w + 30, y + h / 2, { color: C.gold, w: 1.6, alpha: AL(t, 5 + i * .2) });
        if (t >= 21) G.badge('sécuriser', x + w / 2, y - 2, { tone: 'red', align: 'center', size: 11, alpha: AL(t, 21 + i * .3) });
      });
      G.badge('« le catalogue doit être en ligne la semaine prochaine »', 360, 384, { tone: 'gold', align: 'center', alpha: AL(t, 8) * OUT(t, 13), size: 13 });
      /* REST */
      var aR = AL(t, 13) * OUT(t, 21);
      G.arrow(378, 132, 242, 132, { color: C.blue, w: 2, alpha: aR });
      G.text('http://produits/api/…', 310, 152, { size: 11, sans: true, w: 700, color: C.blue, align: 'center', alpha: aR });
      if (t >= 13 && t < 21) { PK(G, 378, 132, 242, 132, (t - 13.6) / 1.2, { color: C.blue }); PK(G, 378, 132, 242, 132, (t - 15.2) / 1.2, { color: C.blue }); }
      /* événement */
      if (t >= 17 && t < 21) {
        PK(G, 480, 140, 480, 186, (t - 17.2) / .6, { color: C.gold });
        PK(G, 480, 187, 140, 187, (t - 17.8) / 1.2, { color: C.gold, lab: 'CommandeCréée' });
        PK(G, 140, 188, 140, 250, (t - 19) / .6, { color: C.gold });
      }
      G.badge('chaque service est exposé sur le réseau : valider les entrées, prévenir l\'injection SQL', 360, 384, { tone: 'red', align: 'center', alpha: AL(t, 21.5), size: 12 });
    }
  });
})();

/* ------------------------------------------------ Les six principes et le choix --- */
(function () {
  var PR = [['Responsabilité unique', 'une capacité métier par service', 'blue'], ['Couplage faible', 'le moins de dépendances possible', 'blue'],
    ['Flexibilité technologique', 'Java, Python, Node… au choix', 'green'], ['Déploiement indépendant', 'mettre à jour un service seul', 'green'],
    ['Scalabilité indépendante', 'grossir selon sa propre demande', 'gold'], ['Communication API / messaging', 'des interfaces bien définies', 'gold']];
  var ST = [['Monolithe', ['petite application,', 'petite équipe']], ['Monolithe modulaire', ['taille moyenne,', 'migration possible']], ['Microservices', ['grande application,', 'équipes autonomes']]];
  SCENES.push({
    id: 'a6', label: 'Notion', short: 'Six principes', title: 'Les six principes des microservices, et quand les choisir', dur: 26,
    enonce: '<p><b>Principes fondamentaux :</b> responsabilité métier unique · couplage faible · flexibilité technologique · déploiement indépendant · scalabilité indépendante · communication entre services (API, messagerie).</p>' +
      '<p><b>Quand choisir les microservices :</b> applications grandes et complexes, autonomie des équipes, scalabilité indépendante, flexibilité technologique, infrastructure mature.</p>',
    retenir: 'monolithe, monolithe modulaire et microservices ne sont pas « bons » ou « mauvais » : on choisit selon la <b>taille</b> de l\'application, de l\'<b>équipe</b> et la maturité de l\'<b>infrastructure</b>.',
    steps: [
      [.5, 'Principes 1 et 2 : <b>responsabilité unique</b>, <b>couplage faible</b>.'],
      [4.5, 'Principes 3 et 4 : <b>flexibilité technologique</b>, <b>déploiement indépendant</b>.'],
      [8.5, 'Principes 5 et 6 : <b>scalabilité indépendante</b>, <b>communication API / messaging</b>.'],
      [13, 'Le prix à payer : la <b>complexité des systèmes distribués</b>.'],
      [17, 'Choisir selon la taille : monolithe, modulaire ou microservices.']
    ],
    draw: function (G, t) {
      var C = G.C, up = U.es(t, 16.5, 17.5);
      PR.forEach(function (p, i) {
        var x = 30 + (i % 2) * 340, y = U.lerp(36 + Math.floor(i / 2) * 74, 20 + Math.floor(i / 2) * 50, up), h = U.lerp(62, 42, up), a = AL(t, .5 + i * 2);
        BX(G, x, y, 320, h, { tone: p[2], alpha: a });
        G.text((i + 1) + ' · ' + p[0], x + 16, y + (up > .5 ? 26 : 26), { size: up > .5 ? 14 : 16, w: 700, sans: true, color: C.ink, alpha: a });
        if (up < .5) G.text(p[1], x + 16, y + 47, { size: 13, sans: true, color: C.muted, alpha: a * (1 - up * 2) });
      });
      G.badge('le prix : la complexité des systèmes distribués', 360, U.lerp(282, 186, up), { tone: 'red', align: 'center', alpha: AL(t, 13), size: 14 });
      var aS = AL(t, 17.5);
      if (aS <= 0) return;
      G.line(90, 270, 630, 270, { color: C.line, w: 6, alpha: aS });
      G.arrow(600, 270, 650, 270, { color: C.line, w: 6, alpha: aS, head: 14 });
      G.text('taille de l\'application et de l\'équipe', 360, 252, { size: 13, sans: true, w: 600, color: C.muted, align: 'center', alpha: aS });
      var k = t < 19.5 ? 0 : t < 22 ? 1 : 2;
      ST.forEach(function (s, i) {
        var x = 120 + i * 240, on = i === k, ctx = G.ctx;
        ctx.save(); ctx.globalAlpha *= aS; ctx.beginPath(); ctx.arc(x, 270, on ? 11 : 8, 0, 7);
        ctx.fillStyle = on ? C.gold : C.surface; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = on ? C.gold : C.line; ctx.stroke(); ctx.restore();
        G.text(s[0], x, 306, { size: 16, w: 700, sans: true, color: on ? C.ink : C.muted, align: 'center', alpha: aS });
        TX(G, s[1], x, 328, { size: 13, color: C.muted, align: 'center', alpha: aS, lh: 17 });
      });
    }
  });
})();
