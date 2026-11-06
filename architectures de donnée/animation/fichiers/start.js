/* Démarrage : construit les parties et leurs cartes, le sommaire, la lecture automatique et le suivi du thème. */
var PARTS = [
  { cls: 'part-d', nav: 'd', kind: 'def', tag: 'Partie 0', name: 'Fondations', title: 'Les fondations : donnée, gestion, architecture',
    intro: 'Ce qu\'est une donnée et quand elle vaut quelque chose, ses trois familles, ce que veut dire « gérer » les données, pourquoi cela devient complexe, et ce que décide un architecte.' },
  { cls: 'part-r', nav: '', kind: 'rule', tag: 'Partie I', name: 'Évolution', title: 'L\'évolution des architectures',
    intro: 'Chaque génération répond à la limite de la précédente : de l\'application qui fait son propre reporting au Data Warehouse, puis au Data Lake et au Lakehouse.' },
  { cls: 'part-g', nav: 'g', kind: 'rule', tag: 'Partie II', name: 'Centralisé / distribué', title: 'Centralisé ou distribué',
    intro: 'Un seul endroit ou plusieurs : ce que l\'on gagne, ce que l\'on paie, et les deux façons d\'augmenter la capacité.' },
  { cls: 'part-o', nav: 'o', kind: 'rule', tag: 'Partie III', name: 'OLTP / OLAP', title: 'OLTP et OLAP',
    intro: 'Le monde qui agit et le monde qui comprend : deux charges opposées, reliées par l\'ETL, qu\'il faut séparer pour protéger les transactions.' },
  { cls: 'part-b', nav: 'b', kind: 'rule', tag: 'Partie IV', name: 'Batch / stream', title: 'Batch processing et stream processing',
    intro: 'Traiter par lots ou au fil de l\'eau : il ne s\'agit pas d\'ancien contre moderne, mais de la latence acceptable pour chaque usage.' },
  { cls: 'part-rd', nav: 'rd', kind: 'rule', tag: 'Partie V', name: 'Valeur / qualité', title: 'Valeur, qualité et gouvernance des données',
    intro: 'Pourquoi une donnée vaut quelque chose, pourquoi le volume ne suffit pas, pourquoi la qualité dépend de l\'usage, et ce qu\'apportent gouvernance, métadonnées et observabilité.' },
  { cls: 'part-d', nav: 'd', kind: 'rule', tag: 'Partie VI', name: 'Data / AI-driven', title: 'Organisation data-driven et AI-driven',
    intro: 'Ce qu’une organisation fait de ses données : éclairer la décision humaine, puis alimenter aussi des modèles qui prédisent ou agissent, avec des exigences sur la donnée de plus en plus explicites.' },
  { cls: 'part-r', nav: '', kind: 'rule', tag: 'Partie VII', name: 'Cinq couches', title: 'Les cinq couches d’une architecture moderne',
    intro: 'Sources, ingestion, stockage, traitement, consommation : chaque couche répond à une question, et toutes forment un socle commun que se partagent la BI, l’analytics et l’IA.' }
];
(function () {
  var main = document.getElementById('parts'), nav = document.getElementById('nav');
  PARTS.forEach(function (pt, k) {
    var h = el('h2', 'part ' + pt.cls, '<span>' + pt.tag + '</span> ' + pt.title); main.appendChild(h);
    main.appendChild(el('p', 'part-p', pt.intro));
    var mount = el('div'); main.appendChild(mount);
    if (k) nav.appendChild(el('span', 'sep'));
    nav.appendChild(el('span', 'nl', pt.name));
    var grp = el('span', 'grp'); nav.appendChild(grp);
    SCENES.filter(function (d) { return d.part === k; }).forEach(function (def) {
      def.narr = TALK[def.id] || [];
      var p = new Player(def, mount, { kind: pt.kind, label: def.label });
      p.sec.classList.add('k-' + k); PLAYERS.push(p);
      var a = el('a', pt.nav, def.short); a.href = '#' + def.id; a.title = def.title; grp.appendChild(a);
    });
  });
  PLAYERS.forEach(narUI);
  initVoix();

  var links = document.querySelectorAll('#nav a');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var p = PLAYERS.filter(function (x) { return x.sec === en.target; })[0];
      if (!p) return;
      if (en.isIntersecting) {
        links.forEach(function (l) { l.classList.toggle('on', l.getAttribute('href') === '#' + p.def.id); });
        if (NAR.P === p) return;
        if (!p.seen && !REDUCED) { p.seen = true; p.t = 0; p.play(); }
        else if (p.autoPaused) { p.autoPaused = false; p.play(); }
      } else if (p.playing && NAR.P !== p) { p.pause(); p.autoPaused = true; }
    });
  }, { threshold: .45 });
  PLAYERS.forEach(function (p) { io.observe(p.sec); });

  function recolor() { var C = readColors(); PLAYERS.forEach(function (p) { p.C = C; p.render(); }); }
  if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener('change', recolor);
  new MutationObserver(recolor).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(recolor);
})();
