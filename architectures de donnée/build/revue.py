import re,glob,io,sys
D='cours/sections/'
attendu={4:['b-quoi'],5:['b-quoi','b-piege'],6:['b-note'],7:['b-note'],8:['b-note'],9:['b-ou'],10:['b-ou'],
 11:['b-comment','b-retenir'],12:['b-app','b-solution'],13:['b-app'],14:['b-app']}
pb=[]
files=sorted(glob.glob(D+'N*.html'))
print('notions:',len(files))
for f in files:
    t=io.open(f,encoding='utf-8').read(); n=re.search(r'id="n(\d\d)"',t).group(1)
    ids=re.findall(r'<h3[^>]*id="n%s-s(\d+)"'%n,t)
    if [int(x) for x in ids]!=list(range(4,15)): pb.append((n,'sections',ids))
    allh3=re.findall(r'<h3[^>]*id="([^"]+)"',t)
    if len(allh3)!=11: pb.append((n,'h3 en trop',allh3))
    parts=re.split(r'<h3[^>]*id="n%s-s(\d+)"'%n,t)
    sec={int(parts[i]):parts[i+1] for i in range(1,len(parts),2)}
    for s,cls in attendu.items():
        for c in cls:
            if c not in sec.get(s,''): pb.append((n,'§%d manque %s'%(s,c)))
    if 'class="ar" dir="rtl"' not in sec.get(5,''): pb.append((n,'§5 sans arabe'))
    if not re.search(r'[\u0600-\u06FF]',sec.get(11,'')): pb.append((n,'§11 À retenir sans arabe'))
    c12=len(re.findall(r'b-solution',sec.get(12,''))); 
    if c12<3: pb.append((n,'§12 solutions',c12))
    c13=len(re.findall(r'<li',sec.get(13,''))) 
    c14=[len(re.findall('chip-'+k,sec.get(14,''))) for k in ('facile','moyen','difficile')]
    if c14!=[1,1,1]: pb.append((n,'§14 chips',c14))
    print(n,'§13 li=',c13,'§12 sol=',c12, end=' | ')
print()
# couleurs inventees
for f in glob.glob(D+'*.html'):
    t=io.open(f,encoding='utf-8').read()
    for m in re.findall(r'style="[^"]*(?:color|background)[^"]*"|#[0-9a-fA-F]{6}\b',t): pb.append((f,'couleur',m))
# sections hors 0-17
for f in glob.glob(D+'*.html'):
    t=io.open(f,encoding='utf-8').read()
    for m in re.findall(r'<h2[^>]*>(.*?)</h2>',t,re.S):
        mm=re.match(r'\s*(\d+)\.',re.sub('<[^>]+>','',m))
        if mm and not 0<=int(mm.group(1))<=17: pb.append((f,'section hors 0-17',m[:40]))
print('PROBLEMES',len(pb)); [print(p) for p in pb[:40]]
