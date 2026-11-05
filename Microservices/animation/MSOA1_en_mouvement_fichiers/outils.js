/* Petits outils de dessin pour les schémas d'architecture (boîtes, bases, paquets, textes multi-lignes). */
function AL(t, a, d) { return U.seg(t, a, a + (d || .5)); }                 /* apparition en fondu */
function OUT(t, a, d) { return 1 - U.seg(t, a, a + (d || .5)); }            /* disparition en fondu */

/* boîte : o.tone = 'blue' | 'green' | 'red' | 'gold' | 'plum' | 'none' ; o.label, o.sub, o.size, o.alpha, o.dash */
function BX(G, x, y, w, h, o) {
  o = o || {}; var C = G.C, ctx = G.ctx, tone = o.tone || 'blue', a = o.alpha === undefined ? 1 : o.alpha;
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = tone === 'none' ? C.surface : C[tone + 'Soft'];
  ctx.strokeStyle = tone === 'none' ? C.line : C[tone]; ctx.lineWidth = o.lw || 1.8;
  if (o.dash) ctx.setLineDash(o.dash);
  G.rrect(x, y, w, h, o.r === undefined ? 8 : o.r); if (!o.empty) ctx.fill(); ctx.stroke(); ctx.restore();
  if (o.label) {
    var dy = o.top ? -h / 2 + 18 : (o.sub ? -8 : 0);
    G.text(o.label, x + w / 2, y + h / 2 + dy, { size: o.size || 15, w: 600, sans: true, color: o.tc || C.ink, align: 'center', base: 'middle', alpha: a });
  }
  if (o.sub) G.text(o.sub, x + w / 2, y + h / 2 + (o.top ? -h / 2 + 36 : 11), { size: o.ssize || 12, sans: true, color: C.muted, align: 'center', base: 'middle', alpha: a });
}

/* base de données (cylindre) centrée en cx, cy */
function CY(G, cx, cy, w, h, o) {
  o = o || {}; var C = G.C, ctx = G.ctx, a = o.alpha === undefined ? 1 : o.alpha, rx = w / 2, ry = Math.min(9, h / 6);
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.goldSoft; ctx.strokeStyle = C.gold; ctx.lineWidth = 1.8;
  ctx.beginPath(); ctx.moveTo(cx - rx, cy - h / 2); ctx.lineTo(cx - rx, cy + h / 2);
  ctx.ellipse(cx, cy + h / 2, rx, ry, 0, Math.PI, 0, true); ctx.lineTo(cx + rx, cy - h / 2); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx, cy - h / 2, rx, ry, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore();
  if (o.label) G.text(o.label, cx, cy + h / 2 + ry + 15, { size: o.size || 12, sans: true, w: 600, color: C.muted, align: 'center', alpha: a });
}

/* point qui voyage de (x1, y1) à (x2, y2), p dans [0 ; 1] */
function PK(G, x1, y1, x2, y2, p, o) {
  if (p <= 0 || p >= 1) return;
  o = o || {}; var ctx = G.ctx, x = U.lerp(x1, x2, p), y = U.lerp(y1, y2, p);
  ctx.save(); ctx.globalAlpha *= (o.alpha === undefined ? 1 : o.alpha) * Math.min(1, p * 8, (1 - p) * 8);
  ctx.fillStyle = o.color || G.C.gold; ctx.beginPath(); ctx.arc(x, y, o.r || 6, 0, 7); ctx.fill(); ctx.restore();
  if (o.lab) G.text(o.lab, x, y - 11, { size: 12, sans: true, w: 700, color: o.color || G.C.gold, align: 'center', alpha: o.alpha });
}
/* flux répété : un point toutes les « per » secondes, chacun mettant « dur » secondes */
function FLOW(G, t, a, b, x1, y1, x2, y2, o) {
  o = o || {}; var per = o.per || .9, dur = o.dur || 1.2;
  if (t < a || t > b + dur) return;
  for (var s = a; s <= Math.min(t, b); s += per) PK(G, x1, y1, x2, y2, (t - s) / dur, o);
}

/* texte sur plusieurs lignes (tableau) */
function TX(G, lines, x, y, o) {
  o = o || {}; var lh = o.lh || (o.size || 14) * 1.3;
  (typeof lines === 'string' ? [lines] : lines).forEach(function (s, i) {
    G.text(s, x, y + i * lh, { size: o.size || 14, sans: o.serif ? false : true, w: o.w || 400, color: o.color || G.C.ink,
      align: o.align || 'left', alpha: o.alpha, it: o.it });
  });
}

/* serveur (tour) */
function SRV(G, x, y, w, h, o) {
  o = o || {}; var C = G.C, a = o.alpha === undefined ? 1 : o.alpha, down = o.down;
  BX(G, x, y, w, h, { tone: down ? 'red' : 'none', alpha: a, lw: 2 });
  for (var i = 0; i < 3; i++) G.line(x + w * .2, y + 16 + i * 12, x + w * .8, y + 16 + i * 12, { color: down ? C.red : C.navy, w: 2, alpha: a });
  var ctx = G.ctx; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = down ? C.red : C.green;
  ctx.beginPath(); ctx.arc(x + 12, y + h - 12, 4.5, 0, 7); ctx.fill(); ctx.restore();
  if (o.label) G.text(o.label, x + w / 2, y + h + 16, { size: 12, sans: true, w: 600, color: C.muted, align: 'center', alpha: a });
}

/* croix rouge */
function XX(G, x, y, s, a) { var C = G.C; G.line(x - s, y - s, x + s, y + s, { color: C.red, w: 5, alpha: a }); G.line(x + s, y - s, x - s, y + s, { color: C.red, w: 5, alpha: a }); }

/* utilisateurs */
function USERS(G, x, y, a) {
  var ctx = G.ctx, C = G.C;
  ctx.save(); ctx.globalAlpha *= (a === undefined ? 1 : a); ctx.fillStyle = C.plum;
  [[0, 0], [24, 0], [0, 40], [24, 40], [0, 80], [24, 80]].forEach(function (p) {
    ctx.beginPath(); ctx.arc(x + p[0], y + p[1], 7, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(x + p[0], y + p[1] + 20, 11, Math.PI, 0); ctx.fill();
  });
  ctx.restore();
  G.text('Utilisateurs', x + 12, y + 118, { size: 12, sans: true, color: C.muted, align: 'center', alpha: a });
}

/* jauge horizontale : v dans [0 ; 1] */
function GAUGE(G, x, y, w, v, o) {
  o = o || {}; var C = G.C, ctx = G.ctx, a = o.alpha === undefined ? 1 : o.alpha;
  var c = v > .8 ? C.red : v > .6 ? C.gold : C.green;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = C.grid; G.rrect(x, y, w, 12, 6); ctx.fill();
  ctx.fillStyle = c; G.rrect(x, y, Math.max(12, w * v), 12, 6); ctx.fill(); ctx.restore();
  if (o.label) G.text(o.label, x + w + 8, y + 10, { size: 12, sans: true, w: 700, color: c, alpha: a });
}
