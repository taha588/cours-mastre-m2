/* Démarrage : construit les cartes (partie 1 puis partie 2), le sommaire, la lecture automatique et le suivi du thème. */
(function () {
  var mD = document.getElementById('defs'), mR = document.getElementById('rules');
  var navD = document.getElementById('nav-d'), navR = document.getElementById('nav-r');
  function link(nav, def, txt, cls) {
    var a = document.createElement('a'); a.href = '#' + def.id; a.textContent = txt; a.title = def.title;
    if (cls) a.className = cls; nav.appendChild(a);
  }
  DSCENES.forEach(function (def) {
    def.narr = TALK[def.id] || [];
    PLAYERS.push(new Player(def, mD, { kind: 'def', label: def.label }));
    link(navD, def, def.short, 'd');
  });
  SCENES.forEach(function (def, i) {
    def.narr = TALK[def.id] || [];
    PLAYERS.push(new Player(def, mR, { kind: 'rule', label: def.label }));
    link(navR, def, def.short);
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
