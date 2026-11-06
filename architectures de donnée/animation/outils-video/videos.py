"""Rend les vidéos expliquées « Architectures de données » (une par carte) : voix Rémy (edge-tts, cache), sous-titre phrase par phrase,
images dessinées par studio.html (Playwright / Edge), assemblage MP4 par ffmpeg.

Usage :  python videos.py n1            (une carte)
         python videos.py all           (les 19 cartes)
         python videos.py n1 --affiche  (aussi l'affiche JPG)
"""
import asyncio, base64, hashlib, json, re, subprocess, sys
from pathlib import Path

import edge_tts, imageio_ffmpeg
from playwright.async_api import async_playwright

ICI = Path(__file__).resolve().parent
STUDIO = (ICI / 'studio.html').as_uri()
CACHE = ICI / 'cache'
SORTIE = ICI.parent / 'videos'
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
VOIX, DEBIT = 'fr-FR-RemyMultilingualNeural', '+0%'
FPS = 25
INTRO, FONDU, PAUSE, FIN = 2.6, 0.5, 0.35, 1.8   # secondes


def phrases(texte):
    """Découpe un « say » en phrases (sur . ! ? suivis d'un espace et d'une majuscule)."""
    morceaux = re.split(r'(?<=[.!?…])\s+(?=[A-ZÀÂÉÈÊÎÔÛÇ«])', texte.strip())
    return [m for m in morceaux if m]


def duree(mp3):
    err = subprocess.run([FFMPEG, '-i', str(mp3)], capture_output=True, text=True).stderr
    h, m, s = re.search(r'Duration: (\d+):(\d+):([\d.]+)', err).groups()
    return int(h) * 3600 + int(m) * 60 + float(s)


async def voix(texte):
    """MP3 de la phrase (mis en cache selon le texte et la voix)."""
    CACHE.mkdir(exist_ok=True)
    cle = hashlib.sha1(f'{VOIX}|{DEBIT}|{texte}'.encode()).hexdigest()[:16]
    mp3 = CACHE / f'{cle}.mp3'
    if not mp3.exists() or mp3.stat().st_size == 0:
        for essai in range(3):
            try:
                await edge_tts.Communicate(texte, VOIX, rate=DEBIT).save(str(mp3))
                break
            except Exception:
                if essai == 2: raise
                await asyncio.sleep(2)
    return mp3


async def minutage(carte):
    """Liste des phrases : texte, mp3, début, durée, extrait d'animation [t0, t1], mark/lab, phase."""
    out, t = [], INTRO
    for g in carte['narr']:
        ps = phrases(g['say'])
        clips = [await voix(p) for p in ps]
        durs = [duree(c) for c in clips]
        total = sum(durs) + PAUSE * len(ps)
        a0, a1 = g['t']
        cumul = 0
        retenir = g['say'].startswith('À retenir')
        for p, c, d in zip(ps, clips, durs):
            out.append({'cap': p, 'mp3': c, 'deb': t, 'dur': d + PAUSE,
                        'a0': a0 + (a1 - a0) * cumul / total, 'a1': a0 + (a1 - a0) * (cumul + d + PAUSE) / total,
                        'mark': g.get('mark'), 'lab': g.get('lab'), 'retenir': retenir})
            t += d + PAUSE; cumul += d + PAUSE
    return out, t + FIN


def images(carte, seg, total):
    """Description de chaque image (passée à window.shot)."""
    n, fin_narr = int(round(total * FPS)), seg[-1]['deb'] + seg[-1]['dur']
    t_ret = next((s['deb'] for s in seg if s['retenir']), fin_narr)
    liste = []
    for k in range(n):
        x = k / FPS
        o = {'id': carte['id'], 'prog': min(1, x / total)}
        if x < INTRO:
            o.update(phase='intro', t=0, a=1 if x < INTRO - FONDU else (INTRO - x) / FONDU)
        else:
            s = next((s for s in seg if s['deb'] <= x < s['deb'] + s['dur']), seg[-1])
            u = min(1, (x - s['deb']) / s['dur'])
            o.update(t=s['a0'] + (s['a1'] - s['a0']) * u, cap=s['cap'] if x < fin_narr else None,
                     mark=s['mark'], lab=s['lab'])
            if x >= t_ret:
                o.update(phase='retenir', a=min(1, (x - t_ret) / FONDU))
            else:
                o.update(phase='main', a=0)
        liste.append(o)
    return liste


def piste_audio(seg, total, wav):
    """Pose chaque phrase à son instant (adelay) sur une piste de la durée totale."""
    cmd = [FFMPEG, '-y', '-loglevel', 'error']
    for s in seg: cmd += ['-i', str(s['mp3'])]
    f = ';'.join(f'[{i}:a]aresample=24000,adelay={int(s["deb"] * 1000)}:all=1[a{i}]' for i, s in enumerate(seg))
    f += ';' + ''.join(f'[a{i}]' for i in range(len(seg))) + f'amix=inputs={len(seg)}:normalize=0,apad,atrim=0:{total:.3f}[o]'
    subprocess.run(cmd + ['-filter_complex', f, '-map', '[o]', '-ac', '1', str(wav)], check=True)


async def rendre(page, carte, affiche):
    seg, total = await minutage(carte)
    SORTIE.mkdir(exist_ok=True)
    wav, mp4 = CACHE / f'{carte["id"]}.wav', SORTIE / f'{carte["id"]}.mp4'
    piste_audio(seg, total, wav)
    ff = subprocess.Popen([FFMPEG, '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', str(FPS), '-c:v', 'mjpeg',
                           '-i', '-', '-i', str(wav), '-vf', 'scale=out_range=tv:out_color_matrix=bt709,format=yuv420p', '-color_range', 'tv',
                           '-colorspace', 'bt709', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
                           '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', str(mp4)],
                          stdin=subprocess.PIPE)
    liste = images(carte, seg, total)
    for i in range(0, len(liste), 50):
        for url in await page.evaluate('l => window.shots(l, .92)', liste[i:i + 50]):
            ff.stdin.write(base64.b64decode(url.split(',', 1)[1]))
    ff.stdin.close(); ff.wait()
    if ff.returncode: raise RuntimeError(f'ffmpeg a échoué pour {carte["id"]}')
    if affiche:   # image d'ouverture de la vidéo : carte titre sur l'animation
        url = await page.evaluate('o => window.shot(o, .9)', {'id': carte['id'], 'phase': 'intro', 'a': 1, 't': carte['dur'] * .6})
        (SORTIE / f'{carte["id"]}.jpg').write_bytes(base64.b64decode(url.split(',', 1)[1]))
    json.dump([{k: v for k, v in s.items() if k != 'mp3'} for s in seg],
              open(CACHE / f'{carte["id"]}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'{carte["id"]} : {total:.1f} s, {len(seg)} phrases, {len(liste)} images -> {mp4.name}')


async def main(args):
    quoi, affiche = args[0] if args else 'n1', '--affiche' in args
    async with async_playwright() as p:
        nav = await p.chromium.launch()
        page = await nav.new_page(viewport={'width': 1280, 'height': 720})
        await page.goto(STUDIO)
        await page.wait_for_function('window.PRET === true', timeout=30000)
        cartes = await page.evaluate('window.CARDS')
        for c in cartes:
            if quoi in ('all', c['id']):
                await rendre(page, c, affiche)
        await nav.close()


if __name__ == '__main__':
    asyncio.run(main(sys.argv[1:]))
