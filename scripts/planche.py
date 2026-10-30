#!/usr/bin/env python3
"""Planche-contact : assemble des captures en une seule image (grille) pour les lire en un seul Read.
Usage : python3 scripts/planche.py <sortie.png> <image1> <image2> ... [--colonnes 3] [--largeur 640]"""
import sys
from PIL import Image, ImageDraw
args=[a for a in sys.argv[1:] if not a.startswith('--')]
opts=dict(zip(sys.argv[1:-1:1], sys.argv[2::1]))
cols=int(opts.get('--colonnes', 3)); larg=int(opts.get('--largeur', 640))
sortie, images = args[0], args[1:]
vign=[]
for p in images:
    try:
        im=Image.open(p).convert('RGB'); r=larg/im.width; h=int(im.height*r); im=im.resize((larg, h)); im=im.crop((0,0,larg,min(h,1200))); vign.append((p.split('/')[-1], im))  # redimension homothétique puis rognage, sans déformation
    except Exception as e: print('ignoré', p, e)
if not vign: sys.exit('aucune image')
h=max(im.height for _,im in vign)+18
rows=(len(vign)+cols-1)//cols
out=Image.new('RGB', (cols*larg, rows*h), 'white'); d=ImageDraw.Draw(out)
for i,(nom,im) in enumerate(vign):
    x,y=(i%cols)*larg,(i//cols)*h; out.paste(im,(x,y+18)); d.text((x+4,y+2), nom, fill='black')
out.save(sortie, optimize=True); print(sortie, out.size, len(vign), 'images')
