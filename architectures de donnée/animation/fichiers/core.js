/* Moteur commun : outils de dessin (canvas logique 720x420), lecteur d'animation, projecteur de narration. */
var W = 720, H = 420;
var SCENES = [];    /* toutes les cartes, chacune avec def.part (0, 1, 2, 3) */
var DSCENES = [];   /* inutilisé ici (compatibilité moteur) */

var U = {
  clamp: function (v, a, b) { return Math.max(a, Math.min(b, v)); },
  lerp: function (a, b, p) { return a + (b - a) * p; },
  seg: function (t, a, b) { return U.clamp((t - a) / (b - a), 0, 1); },
  ease: function (p) { return p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; },
  out: function (p) { return 1 - Math.pow(1 - p, 3); },
  es: function (t, a, b) { return U.ease(U.seg(t, a, b)); },
  fmt: function (n, d) { return (d === undefined ? String(n) : n.toFixed(d)).replace('.', ',').replace('-', '−'); }
};

function readColors() {
  var s = getComputedStyle(document.documentElement), g = function (n) { return s.getPropertyValue(n).trim(); };
  return { ink: g('--ink'), muted: g('--muted'), line: g('--line'), grid: g('--grid'), surface: g('--surface'),
    blue: g('--blue'), blueSoft: g('--blue-soft'), navy: g('--navy'), gold: g('--gold'), goldSoft: g('--gold-soft'),
    green: g('--green'), greenSoft: g('--green-soft'), red: g('--red'), redSoft: g('--red-soft'),
    plum: g('--plum'), plumSoft: g('--plum-soft'), axis: g('--axis') };
}

function makeG(ctx, C) {
  var G = { ctx: ctx, C: C };
  function font(o) {
    return (o.it ? 'italic ' : '') + (o.w || 400) + ' ' + (o.size || 16) + 'px ' +
      (o.sans ? '"Source Sans 3","Segoe UI",sans-serif' : '"STIX Two Text","Cambria Math",Cambria,Georgia,serif');
  }
  function rr(x, y, w, h, r) {
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  G.text = function (s, x, y, o) {
    o = o || {};
    ctx.save(); ctx.globalAlpha *= (o.alpha === undefined ? 1 : o.alpha);
    ctx.font = font(o); ctx.fillStyle = o.color || C.ink;
    ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'alphabetic';
    ctx.fillText(s, x, y); ctx.restore();
  };
  G.measure = function (s, o) { ctx.save(); ctx.font = font(o || {}); var w = ctx.measureText(s).width; ctx.restore(); return w; };
  G.line = function (x1, y1, x2, y2, o) {
    o = o || {}; ctx.save(); ctx.globalAlpha *= (o.alpha === undefined ? 1 : o.alpha);
    ctx.strokeStyle = o.color || C.axis; ctx.lineWidth = o.w || 1.5; ctx.lineCap = 'round';
    if (o.dash) ctx.setLineDash(o.dash);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
  };
  G.arrow = function (x1, y1, x2, y2, o) {
    o = o || {}; G.line(x1, y1, x2, y2, o);
    var a = Math.atan2(y2 - y1, x2 - x1), s = o.head || 9;
    ctx.save(); ctx.globalAlpha *= (o.alpha === undefined ? 1 : o.alpha); ctx.fillStyle = o.color || C.axis;
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - s * Math.cos(a - .42), y2 - s * Math.sin(a - .42));
    ctx.lineTo(x2 - s * Math.cos(a + .42), y2 - s * Math.sin(a + .42));
    ctx.closePath(); ctx.fill(); ctx.restore();
  };
  G.rrect = function (x, y, w, h, r) { ctx.beginPath(); rr(x, y, w, h, r); };
  /* étiquette encadrée : o.tone = 'green' | 'red' | 'blue' | 'gold' | 'plum' */
  G.badge = function (s, x, y, o) {
    o = o || {}; var tone = o.tone || 'blue', size = o.size || 16;
    var tw = G.measure(s, { size: size, w: 600, sans: o.sans !== false }), w = tw + 20, h = size + 14;
    var x0 = o.align === 'right' ? x - w : o.align === 'center' ? x - w / 2 : x;
    ctx.save(); ctx.globalAlpha *= (o.alpha === undefined ? 1 : o.alpha);
    ctx.fillStyle = C[tone + 'Soft']; ctx.strokeStyle = C[tone]; ctx.lineWidth = 1.5;
    G.rrect(x0, y - h / 2, w, h, 6); ctx.fill(); ctx.stroke(); ctx.restore();
    G.text(s, x0 + 10, y + 1, { size: size, w: 600, sans: o.sans !== false, color: C[tone], base: 'middle', alpha: o.alpha });
    return w;
  };
  G.pencil = function (x, y, o) {
    o = o || {}; ctx.save(); ctx.globalAlpha *= (o.alpha === undefined ? 1 : o.alpha);
    ctx.translate(x, y); ctx.rotate(-0.75);
    ctx.fillStyle = C.gold; ctx.fillRect(10, -5, 44, 10);
    ctx.fillStyle = C.red; ctx.fillRect(54, -5, 8, 10);
    ctx.fillStyle = C.goldSoft; ctx.strokeStyle = C.gold; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(10, -5); ctx.lineTo(10, 5); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.ink; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(3.5, -1.8); ctx.lineTo(3.5, 1.8); ctx.closePath(); ctx.fill();
    ctx.restore();
  };
  G.check = function (ok, x, y, o) {
    o = o || {}; var c = ok ? C.green : C.red, s = o.s || 7;
    ctx.save(); ctx.globalAlpha *= (o.alpha === undefined ? 1 : o.alpha); ctx.strokeStyle = c; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
    ctx.beginPath();
    if (ok) { ctx.moveTo(x - s, y); ctx.lineTo(x - s / 3, y + s * .7); ctx.lineTo(x + s, y - s * .8); }
    else { ctx.moveTo(x - s * .8, y - s * .8); ctx.lineTo(x + s * .8, y + s * .8); ctx.moveTo(x + s * .8, y - s * .8); ctx.lineTo(x - s * .8, y + s * .8); }
    ctx.stroke(); ctx.restore();
  };
  /* projecteur de la narration : voile sur tout sauf le rectangle r = [x, y, w, h], puis étiquette */
  G.spot = function (r, lab) {
    var x = r[0], y = r[1], w = r[2], h = r[3];
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, W, H); rr(x, y, w, h, 10);
    ctx.globalAlpha = .62; ctx.fillStyle = C.surface; ctx.fill('evenodd');
    ctx.globalAlpha = 1; ctx.strokeStyle = C.gold; ctx.lineWidth = 2.6; ctx.setLineDash([]);
    G.rrect(x, y, w, h, 10); ctx.stroke();
    ctx.restore();
    if (lab) {
      var tw = G.measure(lab, { size: 14, w: 700, sans: true }) + 24;
      var lx = U.clamp(x + w / 2 - tw / 2, 4, W - tw - 4), ly = y - 30 >= 2 ? y - 30 : Math.min(H - 28, y + h + 6);
      ctx.save(); ctx.fillStyle = C.navy; G.rrect(lx, ly, tw, 24, 12); ctx.fill(); ctx.restore();
      G.text(lab, lx + tw / 2, ly + 12.5, { size: 14, w: 700, sans: true, color: C.surface, align: 'center', base: 'middle' });
    }
  };

  G.plot = function (box, xr, yr) {
    var P = { box: box, xr: xr, yr: yr };
    P.X = function (x) { return box.x + (x - xr[0]) / (xr[1] - xr[0]) * box.w; };
    P.Y = function (y) { return box.y + box.h - (y - yr[0]) / (yr[1] - yr[0]) * box.h; };
    P.ax = function () { return P.Y(yr[0] <= 0 && yr[1] >= 0 ? 0 : yr[0]); };   /* pixel y de l'axe des abscisses */
    P.ay = function () { return P.X(xr[0] <= 0 && xr[1] >= 0 ? 0 : xr[0]); };   /* pixel x de l'axe des ordonnées */
    P.clip = function (fn) {
      ctx.save(); ctx.beginPath(); ctx.rect(box.x, box.y, box.w, box.h); ctx.clip(); fn(); ctx.restore();
    };
    P.axes = function (o) {
      o = o || {}; var ya = P.ax(), xa = P.ay();
      if (o.grid !== false) {
        for (var i = Math.ceil(xr[0]); i <= xr[1]; i++) G.line(P.X(i), box.y, P.X(i), box.y + box.h, { color: C.grid, w: 1 });
        for (var j = Math.ceil(yr[0]); j <= yr[1]; j++) G.line(box.x, P.Y(j), box.x + box.w, P.Y(j), { color: C.grid, w: 1 });
      }
      G.arrow(box.x, ya, box.x + box.w + 8, ya, { color: C.axis, w: 1.4, head: 8 });
      G.arrow(xa, box.y + box.h, xa, box.y - 8, { color: C.axis, w: 1.4, head: 8 });
      (o.xt || []).forEach(function (v) {
        G.line(P.X(v), ya - 4, P.X(v), ya + 4, { color: C.axis, w: 1.2 });
        G.text(U.fmt(v), P.X(v), ya + 18, { size: 13, sans: true, color: C.muted, align: 'center' });
      });
      (o.yt || []).forEach(function (v) {
        G.line(xa - 4, P.Y(v), xa + 4, P.Y(v), { color: C.axis, w: 1.2 });
        G.text(U.fmt(v), xa - 8, P.Y(v) + 4, { size: 13, sans: true, color: C.muted, align: 'right' });
      });
      if (o.O !== false && xr[0] <= 0 && yr[0] <= 0) G.text('O', xa - 6, ya + 16, { size: 14, it: true, color: C.muted, align: 'right' });
    };
    P.curve = function (f, a, b, o) {
      o = o || {}; var n = o.n || 240, up = o.upto === undefined ? 1 : o.upto;
      if (up <= 0) return;
      var bb = a + (b - a) * up, lim = (yr[1] - yr[0]) * 3;
      P.clip(function () {
        ctx.save(); ctx.globalAlpha *= (o.alpha === undefined ? 1 : o.alpha);
        ctx.strokeStyle = o.color || C.blue; ctx.lineWidth = o.w || 2.8; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        if (o.dash) ctx.setLineDash(o.dash);
        ctx.beginPath(); var pen = false;
        for (var i = 0; i <= n; i++) {
          var x = a + (bb - a) * i / n, y = f(x);
          if (!isFinite(y) || y > yr[1] + lim || y < yr[0] - lim) { pen = false; continue; }
          if (pen) ctx.lineTo(P.X(x), P.Y(y)); else { ctx.moveTo(P.X(x), P.Y(y)); pen = true; }
        }
        ctx.stroke(); ctx.restore();
      });
    };
    P.path = function (pts, o) {
      o = o || {}; if (pts.length < 2) return;
      P.clip(function () {
        ctx.save(); ctx.globalAlpha *= (o.alpha === undefined ? 1 : o.alpha);
        ctx.strokeStyle = o.color || C.blue; ctx.lineWidth = o.w || 2.8; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        if (o.dash) ctx.setLineDash(o.dash);
        ctx.beginPath(); ctx.moveTo(P.X(pts[0][0]), P.Y(pts[0][1]));
        for (var i = 1; i < pts.length; i++) ctx.lineTo(P.X(pts[i][0]), P.Y(pts[i][1]));
        ctx.stroke(); ctx.restore();
      });
    };
    P.dot = function (x, y, o) {
      o = o || {}; var c = o.color || C.blue;
      ctx.save(); ctx.globalAlpha *= (o.alpha === undefined ? 1 : o.alpha);
      ctx.beginPath(); ctx.arc(P.X(x), P.Y(y), o.r || 5.5, 0, 7);
      ctx.fillStyle = o.hollow ? C.surface : c; ctx.fill();
      ctx.lineWidth = 2.2; ctx.strokeStyle = c; ctx.stroke();
      if (o.halo) { ctx.globalAlpha *= .25; ctx.beginPath(); ctx.arc(P.X(x), P.Y(y), (o.r || 5.5) + o.halo, 0, 7); ctx.fillStyle = c; ctx.fill(); }
      ctx.restore();
    };
    P.vguide = function (x, y, o) { o = o || {}; G.line(P.X(x), P.ax(), P.X(x), P.Y(y), { color: o.color || C.gold, w: o.w || 1.4, dash: [5, 4], alpha: o.alpha }); };
    P.hguide = function (x, y, o) { o = o || {}; G.line(P.ay(), P.Y(y), P.X(x), P.Y(y), { color: o.color || C.gold, w: o.w || 1.4, dash: [5, 4], alpha: o.alpha }); };
    P.xlab = function (x, s, o) { o = o || {}; G.text(s, P.X(x), P.ax() + (o.dy || 20), { size: o.size || 16, it: o.it !== false, color: o.color || C.ink, align: 'center', alpha: o.alpha, w: o.w }); };
    P.ylab = function (y, s, o) { o = o || {}; G.text(s, P.ay() - (o.dx || 9), P.Y(y) + 5, { size: o.size || 16, it: o.it !== false, color: o.color || C.ink, align: 'right', alpha: o.alpha, w: o.w }); };
    function brackets(x1, y1, x2, y2, o, vertical) {
      var c = o.color || C.gold, s = 6, h = 9, al = o.alpha;
      function end(px, py, dir, open) { /* dir : +1 = l'intervalle part vers les x/y pixels croissants */
        var k = open ? -dir : dir;
        if (!vertical) {
          G.line(px, py - h, px, py + h, { color: c, w: 2.4, alpha: al });
          G.line(px, py - h, px + k * s, py - h, { color: c, w: 2.4, alpha: al });
          G.line(px, py + h, px + k * s, py + h, { color: c, w: 2.4, alpha: al });
        } else {
          G.line(px - h, py, px + h, py, { color: c, w: 2.4, alpha: al });
          G.line(px - h, py, px - h, py + k * s, { color: c, w: 2.4, alpha: al });
          G.line(px + h, py, px + h, py + k * s, { color: c, w: 2.4, alpha: al });
        }
      }
      G.line(x1, y1, x2, y2, { color: c, w: o.thick || 6, alpha: (al === undefined ? 1 : al) * .45 });
      if (o.openL !== null) end(x1, y1, vertical ? -1 : 1, !!o.openL);
      if (o.openR !== null) end(x2, y2, vertical ? 1 : -1, !!o.openR);
    }
    /* segment surligné sur l'axe des x ; openL/openR : true = crochet ouvert, null = pas de crochet */
    P.segX = function (a, b, o) { o = o || {}; brackets(P.X(a), P.ax(), P.X(b), P.ax(), o, false); };
    /* sur l'axe des y : a = borne basse, b = borne haute */
    P.segY = function (a, b, o) { o = o || {}; brackets(P.ay(), P.Y(a), P.ay(), P.Y(b), o, true); };
    return P;
  };
  return G;
}

/* ------------------------------------------------------------ lecteur ---- */
var REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
var PLAYERS = [];

function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }

var ICON_VOIX = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>';

/* info = { kind: 'def' | 'rule', label: 'Définition 1' | 'Règle 1' ... } */
function Player(def, mount, info) {
  var me = this; this.def = def; this.info = info;
  this.state = def.init ? def.init() : {}; this.state.manual = {};
  this.C = readColors(); this.stopAt = null; this.onReach = null; this.narSeg = null; this.chips = {};
  var sec = el('section', 'rule ' + (info.kind === 'def' ? 'is-def' : 'is-rule')); sec.id = def.id; this.sec = sec;
  var head = el('div', 'rule-head');
  head.appendChild(el('span', 'num', info.label));
  head.appendChild(el('h2', '', def.title));
  sec.appendChild(head);

  /* barre de narration propre à la carte */
  var nar = el('div', 'nar idle');
  nar.innerHTML = '<button type="button" class="b-nar">' + ICON_VOIX + '<span class="lb">Écouter l\'explication</span></button>' +
    '<div class="nar-txt"><span class="nar-ph"></span><span class="nar-cap" aria-live="polite"></span></div>' +
    '<span class="nar-ctl" hidden><button type="button" class="b-np" aria-label="Pause">❚❚</button>' +
    '<button type="button" class="b-nn" aria-label="Phrase suivante">⏭</button>' +
    '<button type="button" class="b-ns" aria-label="Arrêter l\'explication">■</button></span>';
  sec.appendChild(nar);
  this.nar = { box: nar, btn: nar.querySelector('.b-nar'), ph: nar.querySelector('.nar-ph'), cap: nar.querySelector('.nar-cap'),
    ctl: nar.querySelector('.nar-ctl'), bp: nar.querySelector('.b-np'), bn: nar.querySelector('.b-nn'), bs: nar.querySelector('.b-ns') };
  this.nar.btn.addEventListener('click', function () { narStart(me); });
  this.nar.bp.addEventListener('click', function () { narPause(); });
  this.nar.bn.addEventListener('click', function () { narNext(); });
  this.nar.bs.addEventListener('click', function () { narStop(); });

  var grid = el('div', 'grid'), stage = el('div', 'stage'), side = el('aside', 'side');
  grid.appendChild(stage); grid.appendChild(side); sec.appendChild(grid);

  if (def.choices) {
    var ch = el('div', 'choices');
    def.choices.forEach(function (c) {
      var grp = el('div', 'grp'); if (c.label) grp.appendChild(el('span', 'lab', c.label));
      me.chips[c.key] = [];
      c.opts.forEach(function (op) {
        var b = el('button', 'chip', op[1]); b.type = 'button'; b.dataset.v = op[0];
        b.setAttribute('aria-pressed', String(me.state[c.key] === op[0]));
        b.addEventListener('click', function () { me.userAct(); me.setChoice(c.key, op[0]); me.t = 0; me.play(); });
        grp.appendChild(b); me.chips[c.key].push(b);
      });
      ch.appendChild(grp);
    });
    stage.appendChild(ch);
  }
  var cw = el('div', 'canvas-wrap'); this.canvas = el('canvas');
  this.canvas.setAttribute('role', 'img'); this.canvas.setAttribute('aria-label', 'Animation : ' + def.title);
  cw.appendChild(this.canvas); stage.appendChild(cw); this.ctx = this.canvas.getContext('2d');

  var ctr = el('div', 'controls');
  this.btn = el('button', '', '▶ Lecture'); this.btn.type = 'button';
  var rep = el('button', 'ghost', '↺'); rep.type = 'button'; rep.title = 'Rejouer depuis le début'; rep.setAttribute('aria-label', 'Rejouer');
  this.range = el('input'); this.range.type = 'range'; this.range.min = 0; this.range.max = 1000; this.range.id = def.id + '-temps';
  this.range.setAttribute('aria-label', 'Position dans l\'animation');
  this.time = el('span', 'time');
  ctr.appendChild(this.btn); ctr.appendChild(rep); ctr.appendChild(this.range); ctr.appendChild(this.time);
  stage.appendChild(ctr);
  this.btn.addEventListener('click', function () { me.userAct(); if (me.playing) me.pause(); else me.play(); });
  rep.addEventListener('click', function () { me.userAct(); me.t = 0; me.play(); });
  this.range.addEventListener('input', function () { me.userAct(); me.pause(); me.state.manual = {}; me.syncParams(); me.t = me.range.value / 1000 * me.dur(); me.render(); });

  this.paramEls = {};
  (def.params || []).forEach(function (p) {
    var row = el('label', 'param'); row.appendChild(el('span', '', p.label));
    var inp = el('input'); inp.type = 'range'; inp.min = p.min; inp.max = p.max; inp.step = p.step; inp.id = def.id + '-' + p.key;
    var out = el('output'); row.appendChild(inp); row.appendChild(out); stage.appendChild(row);
    me.paramEls[p.key] = { inp: inp, out: out, p: p };
    inp.addEventListener('input', function () {
      me.userAct(); me.pause(); me.state.manual[p.key] = parseFloat(inp.value);
      if (p.at !== undefined) me.t = typeof p.at === 'function' ? p.at(me.state) : p.at;
      me.render();
    });
  });

  var en = el('div', 'enonce', '<span class="tag">' + 'Ce que dit le cours' + '</span>' + def.enonce);
  side.appendChild(en);
  var sb = el('div', 'steps-box', '<span class="tag">Ce que montre l\'animation</span>');
  this.ol = el('ol', 'steps'); sb.appendChild(this.ol); side.appendChild(sb);
  if (def.retenir) side.appendChild(el('div', 'retenir', '<b>À retenir.</b> ' + def.retenir));
  if (def.see) side.appendChild(el('a', 'see', def.seeText || 'Suite : la règle correspondante, avec les calculs →'));
  if (def.see) side.lastChild.href = '#' + def.see;
  mount.appendChild(sec);

  this.buildSteps();
  this.t = this.dur(); this.playing = false; this.seen = false;
  new ResizeObserver(function () { me.resize(); }).observe(cw);
}
Player.prototype.dur = function () { return typeof this.def.dur === 'function' ? this.def.dur(this.state) : this.def.dur; };
Player.prototype.steps = function () { return typeof this.def.steps === 'function' ? this.def.steps(this.state) : this.def.steps; };
/* toute action de l'élève reprend la main sur la narration de cette carte */
Player.prototype.userAct = function () { if (typeof NAR !== 'undefined' && NAR.P === this) narStop(); };
Player.prototype.setChoice = function (key, val) {
  this.state[key] = val;
  (this.chips[key] || []).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.v === String(val))); });
  this.buildSteps();
};
Player.prototype.buildSteps = function () {
  var me = this; this.ol.innerHTML = ''; this.stepEls = [];
  this.steps().forEach(function (s) {
    var li = el('li', '', '<span>' + s[1] + '</span>'); li.tabIndex = 0;
    var go = function () { me.userAct(); me.pause(); me.state.manual = {}; me.syncParams(); me.t = Math.min(s[0] + .01, me.dur()); me.render(); };
    li.addEventListener('click', go);
    li.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    me.ol.appendChild(li); me.stepEls.push([s[0], li]);
  });
};
Player.prototype.syncParams = function () {
  for (var k in this.paramEls) {
    var pe = this.paramEls[k], v = this.state.manual[k] !== undefined ? this.state.manual[k] : pe.p.auto(this.t, this.state);
    pe.inp.value = v; pe.out.textContent = pe.p.fmt ? pe.p.fmt(v) : U.fmt(v);
  }
};
Player.prototype.resize = function () {
  var r = window.devicePixelRatio || 1, w = this.canvas.clientWidth;
  if (!w) return;
  this.canvas.width = Math.round(w * r); this.canvas.height = Math.round(w * 7 / 12 * r);
  this.render();
};
Player.prototype.render = function () {
  var ctx = this.ctx, k = this.canvas.width / W;
  if (!k) return;
  ctx.setTransform(k, 0, 0, k, 0, 0); ctx.clearRect(0, 0, W, H);
  var G = makeG(ctx, this.C);
  this.def.draw(G, this.t, this.state);
  var g = this.narSeg;
  if (g && g.mark) {
    var m = typeof g.mark === 'function' ? g.mark(this.t, this.state) : g.mark;
    if (m) G.spot(m, g.lab);
  }
  var D = this.dur();
  this.range.value = Math.round(this.t / D * 1000);
  this.time.textContent = U.fmt(this.t, 1) + ' / ' + Math.round(D) + ' s';
  var t = this.t, cur = -1;
  this.stepEls.forEach(function (s, i) { if (t >= s[0]) cur = i; });
  this.stepEls.forEach(function (s, i) { s[1].classList.toggle('done', i < cur); s[1].classList.toggle('now', i === cur); });
  this.syncParams();
};
Player.prototype.play = function () {
  if (this.t >= this.dur() - .01) this.t = 0;
  this.state.manual = {}; this.stopAt = null; this.playing = true; this.btn.textContent = '⏸ Pause'; this.last = null; tick();
};
/* lecture d'un extrait [a ; b] de l'animation, pour la narration */
Player.prototype.playTo = function (a, b) {
  this.t = a; this.stopAt = b; this.playing = true; this.btn.textContent = '⏸ Pause'; this.last = null; this.render(); tick();
};
Player.prototype.pause = function () { this.playing = false; this.btn.textContent = '▶ Lecture'; };

var ticking = false;
function tick() {
  if (ticking) return; ticking = true;
  requestAnimationFrame(function step(ts) {
    var any = false;
    PLAYERS.forEach(function (p) {
      if (!p.playing) return; any = true;
      if (p.last !== null) p.t += Math.min(.05, (ts - p.last) / 1000);
      p.last = ts;
      var end = p.stopAt !== null ? Math.min(p.stopAt, p.dur()) : p.dur(), hit = p.t >= end;
      if (hit) { p.t = end; p.stopAt = null; p.pause(); }
      p.render();
      if (hit && p.onReach) { var f = p.onReach; p.onReach = null; f(); }
    });
    if (any) requestAnimationFrame(step); else ticking = false;
  });
}
