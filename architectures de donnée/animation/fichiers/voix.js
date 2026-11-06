/* Narration à voix haute : la voix française la plus naturelle disponible, sous-titres phrase par phrase,
   projecteur sur l'animation, et visite guidée de tout le cours. Sans voix, les sous-titres défilent seuls. */
var HAS_TTS = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
var NAR = { on: false, P: null, i: 0, paused: false, rate: 1, voiceName: null, ok: false, broken: false,
  u: null, timer: 0, wd: 0, tt: 0, tour: false, spoke: false, reached: false, failed: {} };

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
function soundOn() { var s = document.getElementById('son'); return !s || s.checked; }
function frVoices() { return HAS_TTS ? speechSynthesis.getVoices().filter(function (v) { return /^fr([-_]|$)/i.test(v.lang); }) : []; }
/* plus le score est haut, plus la voix sonne humain */
function voiceScore(v) {
  return (/natural|neural/i.test(v.name) ? 50 : 0) + (/online/i.test(v.name) ? 20 : 0) + (/google/i.test(v.name) ? 14 : 0) +
    (/denise|vivienne|eloise|henri|remy|rémy|brigitte|thomas|amelie|amélie/i.test(v.name) ? 6 : 0) +
    (/fr-FR/i.test(v.lang) ? 5 : 0) + (v.localService ? 0 : 2);
}
function isHuman(v) { return !!v && /natural|neural|online|google/i.test(v.name); }
function anyFailed() { for (var k in NAR.failed) return true; return false; }
/* voix utilisable : celle choisie, sinon la meilleure qui n'a pas échoué (en secours, une voix installée sur l'ordinateur) */
function currentVoice() {
  var fr = frVoices().filter(function (v) { return !NAR.failed[v.name]; });
  return fr.filter(function (v) { return v.name === NAR.voiceName; })[0] || (anyFailed() ? fr.filter(function (v) { return v.localService; })[0] : null) || fr[0] || null;
}
function shortName(v) { return v.name.replace(/^(Microsoft|Google)\s+/, '').replace(/\s+-\s+.*$/, ''); }
function useVoice() { return HAS_TTS && soundOn() && !NAR.broken && !!currentVoice(); }
function voiceStatus(txt, kind) { var e = document.getElementById('voix-etat'); if (e) { e.textContent = txt; e.className = 'vstat ' + (kind || ''); } }
function words(s) { return s.trim().split(/\s+/).length; }
function narMinutes(list) { var w = 0; list.forEach(function (g) { w += words(g.say); }); return Math.max(1, Math.round(w / 145)); }

function pickVoices() {
  var sel = document.getElementById('voix'); if (!sel || !HAS_TTS) return;
  var all = speechSynthesis.getVoices(), fr = frVoices();
  if (!fr.length) {
    sel.innerHTML = '<option>aucune voix française</option>'; sel.disabled = true;
    voiceStatus(all.length
      ? 'Aucune voix française sur cet appareil : l\'explication défile en sous-titres. (Windows : Paramètres › Heure et langue › Voix › ajouter le français.)'
      : 'Cette fenêtre ne donne accès à aucune voix : l\'explication défile en sous-titres. Ouvrez la page dans Microsoft Edge ou Chrome pour l\'entendre.', 'ko');
    return;
  }
  fr.sort(function (a, b) { return voiceScore(b) - voiceScore(a); });
  sel.innerHTML = fr.map(function (v) { return '<option value="' + esc(v.name) + '">' + esc(shortName(v)) + (isHuman(v) ? ' — voix naturelle' : '') + '</option>'; }).join('');
  sel.disabled = false;
  if (!NAR.voiceName) NAR.voiceName = store('continuite-voix');
  var v = fr.filter(function (x) { return x.name === NAR.voiceName; })[0] || fr[0];
  NAR.voiceName = v.name; sel.value = v.name;
  if (!NAR.ok && !NAR.broken) {
    voiceStatus(isHuman(v) ? 'Voix naturelle prête : ' + shortName(v) + '. Cliquez sur « Tester la voix » pour vérifier le son.'
      : 'Voix prête : ' + shortName(v) + '. Pour une voix vraiment humaine, ouvrez la page dans Microsoft Edge (voix « Natural » : Denise, Henri, Vivienne…).', '');
  }
}

function silence() { NAR.u = null; clearTimeout(NAR.timer); clearTimeout(NAR.wd); clearTimeout(NAR.at); if (HAS_TTS) speechSynthesis.cancel(); }
function readTime(s) { return Math.max(1500, words(s) * 330 / NAR.rate) + 250; }
/* Chrome et Edge exigent un premier speak() dans le clic lui-même, et coupent la voix
   après une quinzaine de secondes si personne n'appelle resume(). */
function unlockVoice() {
  if (!HAS_TTS || NAR.unlocked) return;
  NAR.unlocked = true;
  try {
    var u = new SpeechSynthesisUtterance(' '); u.volume = 0;
    var v = currentVoice(); if (v) { u.voice = v; u.lang = v.lang; }
    speechSynthesis.speak(u);
  } catch (e) { NAR.unlocked = false; }
}
function keepAlive() {
  clearInterval(NAR.alive);
  NAR.alive = setInterval(function () { if (HAS_TTS && NAR.on && !NAR.paused && speechSynthesis.speaking) speechSynthesis.resume(); }, 9000);
}

/* lit un texte phrase par phrase ; onPart(k, parts) met la phrase en surbrillance ; done() à la fin */
function speakAll(text, onPart, done) {
  silence();
  var parts = text.match(/[^.!?…]+[.!?…]*\s*/g) || [text], k = 0;
  parts = parts.map(function (p) { return p.trim(); }).filter(function (p) { return p.length; });
  function fallback(msg, part) {
    NAR.broken = true; NAR.u = null;
    voiceStatus(msg + ' : les sous-titres défilent seuls. Vérifiez le volume et le périphérique de sortie, puis « Tester la voix ». Si rien ne change, ouvrez la page dans Microsoft Edge.', 'ko');
    if (NAR.P) narUI(NAR.P);
    NAR.timer = setTimeout(next, readTime(part));
  }
  /* voix muette : on l'écarte et on relit la phrase avec une autre voix française ; sinon, sous-titres seuls */
  function switchVoice(v, why, part, msg) {
    NAR.failed[v.name] = true; NAR.ok = false;
    var n = currentVoice();
    if (!n) { fallback(msg, part); return; }
    NAR.voiceName = n.name; var sel = document.getElementById('voix'); if (sel) sel.value = n.name;
    voiceStatus('La voix « ' + shortName(v) + ' » ne répond pas (' + why + ') : passage à « ' + shortName(n) + ' ».', 'ko');
    NAR.timer = setTimeout(function () { attempt(part, 0); }, 300);
  }
  /* une phrase, avec un second essai : le moteur reste parfois muet juste après un cancel() */
  function attempt(part, tryNo) {
    var v = currentVoice();
    if (!v || !soundOn()) { NAR.timer = setTimeout(next, readTime(part)); return; }
    var u = new SpeechSynthesisUtterance(part), started = false;
    u.voice = v; u.lang = v.lang; u.rate = NAR.rate; u.pitch = 1; u.volume = 1;
    u.onstart = function () {
      started = true;
      if (!NAR.ok) { NAR.ok = true; voiceStatus('Voix active : ' + shortName(v) + ' ✓', 'ok'); if (NAR.P) narUI(NAR.P); }
    };
    u.onend = function () { if (NAR.u === u) { clearTimeout(NAR.wd); NAR.timer = setTimeout(next, 140); } };
    u.onerror = function (e) {
      if (NAR.u !== u) return; clearTimeout(NAR.wd);
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      if (tryNo < 1) { NAR.timer = setTimeout(function () { attempt(part, tryNo + 1); }, 400); return; }
      switchVoice(v, e.error, part, 'La voix n\'a pas pu démarrer (' + e.error + ')');
    };
    NAR.u = u;
    try { speechSynthesis.resume(); speechSynthesis.speak(u); }
    catch (e) { fallback('La voix a été refusée par le navigateur', part); return; }
    clearTimeout(NAR.wd);
    NAR.wd = setTimeout(function () {
      if (NAR.u !== u || started || speechSynthesis.speaking) return;
      NAR.u = null; speechSynthesis.cancel();
      if (tryNo < 1) { NAR.timer = setTimeout(function () { attempt(part, tryNo + 1); }, 500); return; }
      switchVoice(v, 'pas de démarrage', part, 'La voix ne démarre pas dans cette fenêtre');
    }, v.localService ? 2600 : 6000);
  }
  function next() {
    if (k >= parts.length) { done(); return; }
    var part = parts[k]; onPart(k, parts); k++;
    if (!useVoice()) { NAR.timer = setTimeout(next, readTime(part)); return; }
    attempt(part, 0);
  }
  NAR.timer = setTimeout(next, 260);
}

function narUI(P) {
  var n = P.nar, on = NAR.on && NAR.P === P, segs = P.def.narr || [];
  n.box.classList.toggle('idle', !on);
  n.ctl.hidden = !on;
  n.btn.querySelector('.lb').textContent = on ? 'Recommencer' : (P.narDone ? 'Réécouter' : 'Écouter l\'explication');
  if (!on) {
    n.ph.textContent = 'Explication à voix haute · environ ' + narMinutes(segs) + ' min';
    n.cap.textContent = P.narDone ? 'Explication terminée. Vous pouvez la réécouter ou manipuler l\'animation.'
      : 'Commentaire oral structuré : constat, principe, conclusion et point clé d\'examen, synchronisé avec l\'animation.';
    return;
  }
  n.ph.textContent = 'Explication ' + (NAR.i + 1) + ' / ' + segs.length + (NAR.paused ? ' — en pause' : '') + ' · ' +
    (useVoice() ? 'voix : ' + shortName(currentVoice()) : 'sous-titres seuls');
  n.bp.textContent = NAR.paused ? '▶' : '❚❚';
  n.bp.setAttribute('aria-label', NAR.paused ? 'Reprendre l\'explication' : 'Mettre en pause');
}
function applySeg(P, g) {
  if (g.set) for (var k in g.set) P.setChoice(k, g.set[k]);
  P.state.manual = {};
  if (g.manual) for (var m in g.manual) P.state.manual[m] = g.manual[m];
  P.narSeg = g; P.onReach = null;
  var me = NAR.i;
  clearTimeout(NAR.at);
  if (Object.prototype.toString.call(g.t) === '[object Array]') {
    NAR.reached = false;
    P.onReach = function () { NAR.reached = true; segCheck(P, me); };
    P.playTo(g.t[0], g.t[1]);
    /* filet de sécurité : dans un onglet en arrière-plan, le navigateur gèle l'animation.
       L'explication ne doit jamais rester bloquée à l'attendre. */
    NAR.at = setTimeout(function () {
      if (NAR.P !== P || NAR.i !== me || NAR.reached) return;
      P.pause(); P.onReach = null; P.stopAt = null; P.t = g.t[1]; P.render();
      NAR.reached = true; segCheck(P, me);
    }, Math.max(0, g.t[1] - g.t[0]) * 1000 + 2000);
  } else {
    NAR.reached = true;
    if (typeof g.t === 'number') { P.pause(); P.t = g.t; }
    P.render();
  }
}
function segCheck(P, me) {
  if (!NAR.on || NAR.paused || NAR.P !== P || NAR.i !== me || !NAR.spoke || !NAR.reached) return;
  NAR.i++; clearTimeout(NAR.timer); NAR.timer = setTimeout(narPlay, 380);
}
function narPlay() {
  var P = NAR.P; if (!P) return;
  var segs = P.def.narr || [];
  if (NAR.i >= segs.length) { narStop(true); return; }
  var g = segs[NAR.i], me = NAR.i;
  NAR.spoke = false;
  applySeg(P, g); narUI(P);
  speakAll(g.say, function (k, parts) {
    if (NAR.P !== P) return;
    P.nar.cap.innerHTML = parts.map(function (s, j) { return j === k ? '<mark>' + esc(s) + '</mark>' : esc(s); }).join(' ');
  }, function () { NAR.spoke = true; segCheck(P, me); });
}
function narStart(P, fromTour) {
  if (!fromTour) NAR.tour = false;
  unlockVoice(); keepAlive();
  clearTimeout(NAR.tt);
  if (NAR.P && NAR.P !== P) narStop(false, true);
  NAR.P = P; NAR.i = 0; NAR.on = true; NAR.paused = false; P.narDone = false; P.seen = true;
  if (!NAR.ok) NAR.broken = false;
  tourUI();
  narPlay();
}
function narPause() {
  var P = NAR.P; if (!P) return;
  if (!NAR.paused) { NAR.paused = true; silence(); P.onReach = null; P.pause(); narUI(P); }
  else { NAR.paused = false; narPlay(); }
}
function narNext() { if (!NAR.P) return; silence(); NAR.paused = false; NAR.i++; narPlay(); }
function narStop(done, keepTour) {
  var P = NAR.P; silence(); clearInterval(NAR.alive); NAR.on = false; NAR.paused = false; NAR.P = null;
  if (P) { P.narSeg = null; P.onReach = null; P.stopAt = null; P.narDone = done === true; narUI(P); P.render(); }
  if (done === true && NAR.tour && P) { tourNext(P); return; }
  if (!keepTour) { NAR.tour = false; clearTimeout(NAR.tt); }
  tourUI();
}

/* ------------------------------------------------ visite guidée de tout le cours --- */
function tourGo(P) {
  P.sec.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
  clearTimeout(NAR.tt);
  NAR.tt = setTimeout(function () { if (NAR.tour) narStart(P, true); }, 950);
}
function tourNext(P) {
  var k = PLAYERS.indexOf(P) + 1;
  if (k >= PLAYERS.length) { NAR.tour = false; tourUI(); return; }
  tourGo(PLAYERS[k]);
}
function tourUI() {
  var b = document.getElementById('b-tour'); if (!b) return;
  b.textContent = NAR.tour ? '■ Arrêter la visite guidée' : '▶ Écouter tout le cours (≈ ' + tourMinutes() + ' min)';
  b.setAttribute('aria-pressed', String(NAR.tour));
}
function tourMinutes() { var all = []; PLAYERS.forEach(function (p) { all = all.concat(p.def.narr || []); }); return narMinutes(all); }

function testVoice() {
  NAR.broken = false; NAR.ok = false; NAR.failed = {}; unlockVoice();
  if (!HAS_TTS) { voiceStatus('Ce navigateur ne propose pas la synthèse vocale : l\'explication défile en sous-titres.', 'ko'); return; }
  var v = currentVoice();
  if (!v) { voiceStatus('Aucune voix française trouvée : l\'explication défile en sous-titres.', 'ko'); return; }
  if (!soundOn()) { voiceStatus('Le son est coupé : cochez « son ».', 'ko'); return; }
  if (NAR.on) narStop();
  speechSynthesis.cancel(); voiceStatus('Test en cours…', '');
  setTimeout(function () {
    var u = new SpeechSynthesisUtterance('Test de la voix. L\'explication du cours sur les microservices est prête.');
    var started = false;
    u.voice = v; u.lang = v.lang; u.rate = NAR.rate;
    u.onstart = function () { started = true; NAR.ok = true; voiceStatus('Voix active : ' + shortName(v) + ' ✓ — si aucun son n\'est audible, augmentez le volume.', 'ok'); };
    u.onerror = function (e) { if (e.error !== 'interrupted' && e.error !== 'canceled') voiceStatus('La voix n\'a pas pu démarrer (' + e.error + ').', 'ko'); };
    speechSynthesis.resume(); speechSynthesis.speak(u);
    setTimeout(function () { if (!started && !speechSynthesis.speaking) { NAR.broken = true; voiceStatus('La voix ne démarre pas dans cette fenêtre : l\'explication défilera en sous-titres. Essayez Edge ou Chrome.', 'ko'); } }, 2600);
  }, 150);
}

function initVoix() {
  var sel = document.getElementById('voix'), vit = document.getElementById('vit'), vo = document.getElementById('vit-o'), son = document.getElementById('son');
  var r = parseFloat(store('continuite-vitesse'));
  if (r >= .7 && r <= 1.3) { NAR.rate = r; vit.value = r; }
  vo.textContent = U.fmt(NAR.rate, 2) + ' ×';
  if (!HAS_TTS) {
    sel.innerHTML = '<option>synthèse vocale indisponible</option>'; sel.disabled = true;
    voiceStatus('Ce navigateur ne propose pas la synthèse vocale : l\'explication défile en sous-titres.', 'ko');
  } else {
    pickVoices();
    if (speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', pickVoices);
    setTimeout(pickVoices, 900); setTimeout(pickVoices, 2500);
  }
  sel.addEventListener('change', function () { NAR.voiceName = sel.value; NAR.broken = false; NAR.failed = {}; store('continuite-voix', sel.value); });
  vit.addEventListener('input', function () { NAR.rate = parseFloat(vit.value); vo.textContent = U.fmt(NAR.rate, 2) + ' ×'; store('continuite-vitesse', String(NAR.rate)); });
  son.addEventListener('change', function () { if (son.checked) NAR.broken = false; if (NAR.on && !NAR.paused) narPlay(); else if (!son.checked) silence(); });
  document.getElementById('b-test').addEventListener('click', testVoice);
  document.getElementById('b-tour').addEventListener('click', function () {
    if (NAR.tour) { narStop(); return; }
    NAR.tour = true; tourUI(); tourGo(PLAYERS[0]);
  });
  tourUI();
}
