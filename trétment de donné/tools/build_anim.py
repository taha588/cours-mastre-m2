# -*- coding: utf-8 -*-
"""Extrait les 8 figures animees du cours et en fait une page autonome,
utilisable en classe (une animation a la fois, plein ecran, clavier)."""
import os, re

PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(PROJ, "cours-ch0-temps-reel.html")
OUT = os.path.join(PROJ, "animations-ch0.html")

src = open(SRC, encoding="utf-8").read()

figs = re.findall(r'<figure class="fig" id="fig\d">.*?</figure>', src, re.S)
assert len(figs) == 8, len(figs)
script = re.search(r"<script>.*?</script>", src, re.S).group(0)

META = [
    ("1", "N1", "La seconde de Salma",
     "Le temps r\u00e9el, c'est une latence compar\u00e9e \u00e0 un d\u00e9lai utile.",
     "Regardez le compteur de millisecondes et le rep\u00e8re rouge. Activez "
     "<em>R\u00e9seau lent</em>\u00a0: la cha\u00eene ne change pas, mais la r\u00e9ponse arrive "
     "apr\u00e8s le budget et le paiement est refus\u00e9."),
    ("2", "N2", "Batch et streaming",
     "La latence d'un lot vaut environ la moiti\u00e9 de sa p\u00e9riode.",
     "Les deux couloirs re\u00e7oivent exactement les m\u00eames \u00e9v\u00e9nements. Suivez "
     "l'\u00e9cart de latence moyenne qui se creuse\u00a0: il ne vient pas de la "
     "puissance de la machine, mais du rythme de regroupement."),
    ("3", "N6", "Client et serveur",
     "L'initiative appartient toujours au client.",
     "Lancez plusieurs demandes coup sur coup. Le serveur ne fait rien tant "
     "qu'on ne lui demande rien, puis les demandes s'empilent dans sa file\u00a0: "
     "c'est l\u00e0 que na\u00eet la latence d'attente."),
    ("4", "N7", "Le r\u00e9seau imparfait",
     "Retard, perte et duplication sont le fonctionnement normal.",
     "Partez avec les retards seuls, puis activez les pertes et les doublons. "
     "Les messages partent num\u00e9rot\u00e9s de 1 \u00e0 6\u00a0; comparez \u00e0 chaque fois "
     "l'ordre d'arriv\u00e9e."),
    ("5", "N9", "La cl\u00e9 et le casier",
     "M\u00eame cl\u00e9, m\u00eame casier \u2014 toujours.",
     "Envoyez une rafale et observez\u00a0: une cl\u00e9 donn\u00e9e tombe toujours au "
     "m\u00eame endroit. C'est ce qui garantit l'ordre par sujet et permet de "
     "distribuer le travail sans coordination."),
    ("6", "N11", "Les deux heures d'un message",
     "L'heure du fait et l'heure de la r\u00e9ception ne co\u00efncident pas.",
     "Lancez une fois en r\u00e9seau normal, puis en <em>R\u00e9seau encombr\u00e9</em>. "
     "Les faits se produisent dans l'ordre en haut\u00a0; en bas, un \u00e9v\u00e9nement "
     "plus ancien peut arriver apr\u00e8s un plus r\u00e9cent."),
    ("7", "N12", "Le cluster",
     "Plus de machines\u00a0: plus de capacit\u00e9, et de nouveaux probl\u00e8mes.",
     "Faites tomber une machine, puis deux. Les autres absorbent la part "
     "perdue\u00a0; \u00e0 une seule machine restante, la charge devient intenable. "
     "C'est le calcul de dimensionnement de la notion\u00a012."),
    ("8", "N14", "Le g\u00e9n\u00e9rateur Python",
     "Une boucle infinie avec <code>yield</code>, c'est d\u00e9j\u00e0 un flux.",
     "Avancez pas \u00e0 pas avec <em>Demander une valeur</em>\u00a0: la ligne "
     "surlign\u00e9e montre que la fonction se met en pause sur <code>yield</code> "
     "et reprend exactement l\u00e0. Les valeurs ne s'accumulent jamais."),
]

CSS = """
:root{
  --bg:#F2F5F5; --surface:#FFFFFF; --ink:#101F23; --muted:#5A7177; --line:#DBE3E3;
  --accent:#0E7C7B; --signal:#D4521F; --marine:#1C3B5A;
  --quoi-bar:#2A6EB8; --quoi-bg:#E9F2FD; --ou-bar:#A8760B; --ou-bg:#FDF4E2;
  --comment-bar:#237F36; --comment-bg:#E8F6EB; --retenir-bar:#14561F; --retenir-bg:#E0F1E4;
  --piege-bar:#B2302F; --piege-bg:#FBE9E8; --domaine-bar:#68296B; --domaine-bg:#F5EDF5;
  --note-bar:#1C3B5A; --note-bg:#FFFFFF; --app-bar:#4C8F3B; --app-bg:#FFFFFF;
  --sol-bar:#1C3B5A; --sol-bg:#FFFFFF; --code-bg:#EFF2F2;
  --fig-bg:#E9EEEE; --fig-line:#C3D0D0;
  --display:"Bricolage Grotesque","Trebuchet MS",system-ui,sans-serif;
  --body:"Newsreader","Iowan Old Style",Georgia,serif;
  --mono:"IBM Plex Mono",ui-monospace,Consolas,monospace;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --bg:#0B1416; --surface:#111D20; --ink:#E4EDED; --muted:#90A6AB; --line:#243437;
  --accent:#34B3AE; --signal:#FF7B46; --marine:#17303F;
  --quoi-bar:#5C9EE4; --quoi-bg:#12232F; --ou-bar:#D8A93C; --ou-bg:#2A2314;
  --comment-bar:#4FBB66; --comment-bg:#122618; --retenir-bar:#6FD186; --retenir-bg:#102A17;
  --piege-bar:#EE6B66; --piege-bg:#2C1716; --domaine-bar:#C487C7; --domaine-bg:#241A26;
  --note-bar:#86ACD2; --note-bg:#111D20; --app-bar:#7FC96B; --app-bg:#111D20;
  --sol-bar:#86ACD2; --sol-bg:#111D20; --code-bg:#0E1A1D;
  --fig-bg:#162428; --fig-line:#2E4348; color-scheme:dark;
}}
:root[data-theme="dark"]{
  --bg:#0B1416; --surface:#111D20; --ink:#E4EDED; --muted:#90A6AB; --line:#243437;
  --accent:#34B3AE; --signal:#FF7B46; --marine:#17303F;
  --quoi-bar:#5C9EE4; --quoi-bg:#12232F; --ou-bar:#D8A93C; --ou-bg:#2A2314;
  --comment-bar:#4FBB66; --comment-bg:#122618; --retenir-bar:#6FD186; --retenir-bg:#102A17;
  --piege-bar:#EE6B66; --piege-bg:#2C1716; --domaine-bar:#C487C7; --domaine-bg:#241A26;
  --note-bar:#86ACD2; --note-bg:#111D20; --app-bar:#7FC96B; --app-bg:#111D20;
  --sol-bar:#86ACD2; --sol-bg:#111D20; --code-bg:#0E1A1D;
  --fig-bg:#162428; --fig-line:#2E4348; color-scheme:dark;
}
*{box-sizing:border-box}
html,body{margin:0}
body{background:var(--bg);color:var(--ink);font-family:var(--body);font-size:17px;line-height:1.6;-webkit-text-size-adjust:100%}
[hidden]{display:none!important}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:40;background:var(--marine)}
.bar{position:sticky;top:env(safe-area-inset-top,0px);z-index:30;background:var(--marine);color:#F2F7FB}
.bar .in{max-width:1100px;margin:0 auto;display:flex;align-items:baseline;gap:.8rem;flex-wrap:wrap;
  padding-block:.5rem;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
.bar b{font-family:var(--display);font-weight:700;font-size:.95rem}
.bar span{font-size:.78rem;opacity:.8;font-family:var(--display);font-weight:500}
.wrap{max-width:1100px;margin:0 auto;padding-block:1.6rem 3.5rem;
  padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
h1{font-family:var(--display);font-weight:800;font-size:clamp(1.7rem,4.6vw,2.5rem);line-height:1.06;letter-spacing:-.02em;margin:.2rem 0 .4rem;text-wrap:balance}
.lede{color:var(--muted);font-style:italic;margin:0 0 1.4rem;max-width:62ch}
.tabs{display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1.4rem}
.tabs button{font-family:var(--display);font-weight:700;font-size:.76rem;letter-spacing:.03em;
  background:var(--surface);color:var(--muted);border:1px solid var(--line);border-radius:3px;padding:.4rem .7rem;cursor:pointer}
.tabs button[aria-selected="true"]{background:var(--accent);color:#fff;border-color:var(--accent)}
.tabs button:hover{border-color:var(--accent);color:var(--accent)}
.tabs button[aria-selected="true"]:hover{color:#fff}
.slide{background:var(--surface);border:1px solid var(--line);border-radius:4px;padding:1.3rem 1.3rem 1.5rem}
.kick{font-family:var(--display);font-weight:700;font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:var(--signal);margin:0 0 .25rem}
.slide h2{font-family:var(--display);font-weight:700;font-size:clamp(1.25rem,3.2vw,1.65rem);line-height:1.12;margin:0 0 .35rem;text-wrap:balance}
.claim{font-family:var(--display);font-weight:500;color:var(--accent);margin:0 0 1rem;font-size:1rem}
.watch{border-left:4px solid var(--ou-bar);background:var(--ou-bg);border-radius:0 3px 3px 0;padding:.7rem .9rem;margin:0 0 1.1rem;font-size:.95rem}
.watch b{font-family:var(--display);font-weight:700;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ou-bar);display:block;margin-bottom:.2rem}
figure.fig{margin:0;background:var(--fig-bg);border:1px solid var(--fig-line);border-radius:4px;padding:1rem;overflow:hidden}
figure.fig svg{display:block;width:100%;height:auto;max-width:100%}
figure.fig figcaption{font-family:var(--display);font-size:.8rem;color:var(--muted);margin-top:.7rem;line-height:1.45}
figure.fig figcaption b{color:var(--signal);font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:.68rem;display:block;margin-bottom:.15rem}
.ctrl{display:flex;gap:.45rem;flex-wrap:wrap;align-items:center;margin-top:.7rem}
.ctrl button{font-family:var(--display);font-weight:700;font-size:.78rem;letter-spacing:.03em;color:#fff;background:var(--accent);border:0;border-radius:3px;padding:.45rem .9rem;cursor:pointer}
.ctrl button:hover{filter:brightness(1.1)}
.ctrl button.ghost{background:transparent;color:var(--accent);border:1px solid var(--accent)}
.ctrl button.ghost[aria-pressed="true"]{background:var(--signal);color:#fff;border-color:var(--signal)}
.ctrl .read{font-family:var(--mono);font-size:.8rem;color:var(--ink);font-variant-numeric:tabular-nums;margin-left:auto}
.nav{display:flex;gap:.5rem;align-items:center;margin-top:1.2rem;font-family:var(--display);font-size:.8rem;color:var(--muted);flex-wrap:wrap}
.nav button{font-family:var(--display);font-weight:700;font-size:.78rem;background:transparent;color:var(--accent);border:1px solid var(--accent);border-radius:3px;padding:.4rem .8rem;cursor:pointer}
.nav .pos{margin-left:auto;font-variant-numeric:tabular-nums}
code{font-family:var(--mono);font-size:.88em;background:var(--code-bg);padding:.08em .32em;border-radius:2px}
svg .lbl{font-family:"Bricolage Grotesque","Trebuchet MS",sans-serif;font-size:11px;font-weight:700;fill:var(--ink)}
svg .sm{font-family:"IBM Plex Mono",monospace;font-size:9.5px;fill:var(--muted)}
svg .node{fill:var(--surface);stroke:var(--fig-line);stroke-width:1.5}
svg .wire{stroke:var(--fig-line);stroke-width:2;fill:none}
:focus-visible{outline:2px solid var(--signal);outline-offset:2px}
@media (prefers-reduced-motion:reduce){*{animation-duration:.001ms!important;transition-duration:.001ms!important}}
"""

tabs, slides = [], []
for i, (num, notion, title, claim, watch) in enumerate(META):
    tabs.append('<button type="button" role="tab" data-go="%d" '
                'aria-selected="%s">%s &middot; %s</button>'
                % (i, "true" if i == 0 else "false", notion, title))
    slides.append(
        '<section class="slide" data-slide="' + str(i) + '"'
        + ("" if i == 0 else " hidden") + '>\n'
        '  <p class="kick">Animation ' + num + ' &middot; notion ' + notion + '</p>\n'
        '  <h2>' + title + '</h2>\n'
        '  <p class="claim">' + claim + '</p>\n'
        '  <div class="watch"><b>Ce qu\'il faut regarder</b>' + watch + '</div>\n'
        + figs[i] + '\n</section>')

nav = """
<div class="nav">
  <button type="button" id="prev">&larr; Pr&eacute;c&eacute;dente</button>
  <button type="button" id="next">Suivante &rarr;</button>
  <span>Fl&egrave;ches du clavier pour naviguer</span>
  <span class="pos" id="pos">1 / 8</span>
</div>
"""

TPL = """<title>Animations du chapitre 0</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=IBM+Plex+Mono:wght@400;600&display=swap">
<style>@@CSS@@</style>

<div class="bar"><div class="in">
  <b>Animations &mdash; Chapitre 0</b>
  <span>Traitement de donn&eacute;es en temps r&eacute;el &middot; Master Data Science &amp; Big Data &middot; S3</span>
</div></div>

<div class="wrap">
  <h1>Les huit animations du chapitre&nbsp;0</h1>
  <p class="lede">Une notion par animation, &agrave; projeter ou &agrave; manipuler. Chacune
  montre le mouvement que le texte du cours a du mal &agrave; d&eacute;crire&nbsp;: une latence
  qui d&eacute;passe son budget, des messages qui se doublent, une cl&eacute; qui retombe
  toujours dans le m&ecirc;me casier.</p>

  <div class="tabs" role="tablist">@@TABS@@</div>

@@SLIDES@@

@@NAV@@
</div>

@@SCRIPT@@

<script>
(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tabs button"));
  var pos = document.getElementById("pos");
  var cur = 0;
  function show(i) {
    cur = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.hidden = k !== cur; });
    tabs.forEach(function (t, k) { t.setAttribute("aria-selected", k === cur ? "true" : "false"); });
    pos.textContent = (cur + 1) + " / " + slides.length;
  }
  tabs.forEach(function (t) {
    t.addEventListener("click", function () { show(parseInt(t.dataset.go, 10)); });
  });
  document.getElementById("prev").addEventListener("click", function () { show(cur - 1); });
  document.getElementById("next").addEventListener("click", function () { show(cur + 1); });
  document.addEventListener("keydown", function (e) {
    if (e.target && /^(INPUT|TEXTAREA|BUTTON)$/.test(e.target.tagName) && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (e.key === "ArrowRight") { show(cur + 1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { show(cur - 1); e.preventDefault(); }
  });
  show(0);
})();
</script>
"""

page = (TPL.replace("@@CSS@@", CSS)
           .replace("@@TABS@@", "\n".join(tabs))
           .replace("@@SLIDES@@", "\n\n".join(slides))
           .replace("@@NAV@@", nav)
           .replace("@@SCRIPT@@", script))

open(OUT, "w", encoding="utf-8").write(page)
print("ecrit :", OUT, len(page), "octets")
