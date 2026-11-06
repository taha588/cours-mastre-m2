/* Vidéo expliquée : chaque carte peut basculer entre sa vidéo (videos/<id>.mp4, voix + sous-titres)
   et l'animation interactive (canvas + narration du navigateur). Chargé après start.js. */
(function () {
  var KEY = 'archi-donnees-mode';
  function getMode() { try { return localStorage.getItem(KEY) || 'video'; } catch (e) { return 'video'; } }
  function setMode(m) { try { localStorage.setItem(KEY, m); } catch (e) {} }

  PLAYERS.forEach(function (P) {
    var id = P.def.id, stage = P.canvas.closest('.stage');
    var anim = Array.prototype.slice.call(stage.children);   // choix, canvas, contrôles, réglages

    var sw = el('div', 'vmode'); sw.setAttribute('role', 'group'); sw.setAttribute('aria-label', 'Mode d\'affichage');
    var bV = el('button', 'chip', '🎬 Vidéo expliquée'), bA = el('button', 'chip', '✦ Animation interactive');
    bV.type = bA.type = 'button'; sw.appendChild(bV); sw.appendChild(bA);

    var box = el('div', 'vbox');
    var v = el('video'); v.controls = true; v.preload = 'none'; v.playsInline = true;
    v.poster = 'videos/' + id + '.jpg'; v.src = 'videos/' + id + '.mp4';
    v.setAttribute('aria-label', 'Vidéo expliquée : ' + P.def.title);
    box.appendChild(v);
    box.appendChild(el('p', 'vnote', 'La vidéo explique la carte à voix haute, avec les étapes et le sous-titre. Pour manipuler l\'animation vous-même, passez en « Animation interactive ».'));

    stage.insertBefore(sw, stage.firstChild);
    stage.insertBefore(box, sw.nextSibling);
    P.vmode = null;

    var play0 = P.play;
    P.play = function () { if (this.vmode === 'video') return; return play0.apply(this, arguments); };

    P.setMode = function (m, save) {
      if (m === P.vmode) return;
      P.vmode = m;
      bV.setAttribute('aria-pressed', String(m === 'video'));
      bA.setAttribute('aria-pressed', String(m === 'anim'));
      box.hidden = m !== 'video';
      anim.forEach(function (n) { n.hidden = m === 'video'; });
      P.nar.box.hidden = m === 'video';
      if (m === 'video') {
        if (NAR.P === P) narStop();
        P.pause(); P.autoPaused = false;
      } else {
        v.pause();
        P.resize(); P.render();
      }
      if (save) setMode(m);
    };
    bV.addEventListener('click', function () { P.setMode('video', true); });
    bA.addEventListener('click', function () { P.setMode('anim', true); P.t = 0; P.play(); });

    /* une seule vidéo à la fois */
    v.addEventListener('play', function () {
      PLAYERS.forEach(function (Q) { if (Q.video && Q.video !== v) Q.video.pause(); });
      if (NAR.on) narStop();
    });
    P.video = v;
    P.setMode(getMode() === 'anim' ? 'anim' : 'video');
  });

  /* la narration (bouton de carte ou « Écouter tout le cours ») passe la carte en mode animation */
  var start0 = window.narStart;
  window.narStart = function (P) {
    if (P && P.vmode === 'video') P.setMode('anim');
    PLAYERS.forEach(function (Q) { if (Q.video) Q.video.pause(); });
    return start0.apply(this, arguments);
  };

  /* la vidéo s'arrête quand la carte quitte l'écran */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) return;
      PLAYERS.forEach(function (P) { if (P.sec === e.target && P.video) P.video.pause(); });
    });
  }, { threshold: 0 });
  PLAYERS.forEach(function (P) { io.observe(P.sec); });
})();
