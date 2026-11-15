#!/usr/bin/env python3
"""Sépare la consommation d'un agent en deux phases (identifier, rectifier) quand un même agent fait les deux.

Usage : python3 scripts/usage-phases.py <id-session-locale> <sortie.json> [marqueur]
Le marqueur par défaut est MARQUEUR-RECTIFICATION : l'agent lance une fois `echo MARQUEUR-RECTIFICATION` (Bash) entre la
fin de l'identification et le début des corrections. La réponse qui contient cette commande compte pour « identifier » ;
toutes les réponses suivantes comptent pour « rectifier ». Un transcript sans marqueur est ignoré (il reste dans
usage-detail.py). Même découpage de jetons que usage-detail.py ; n'écrit que des totaux."""
import json, sys, os, glob, collections

HOME = os.path.expanduser('~/.claude')
sid, sortie = sys.argv[1], sys.argv[2]
marqueur = sys.argv[3] if len(sys.argv) > 3 else 'MARQUEUR-RECTIFICATION'

def appartient(p):
    if sid in p: return True
    try:
        with open(p, errors='ignore') as f:
            for i, l in enumerate(f):
                if sid in l: return True
                if i > 30: return False
    except Exception: return False
    return False

def texte(c):
    if isinstance(c, str): return c
    if isinstance(c, list): return ' '.join(x.get('text', '') for x in c if isinstance(x, dict) and x.get('type') == 'text')
    return ''

def lire(path):
    vus = set(); phase = 'identifier'; marq = None; premier = None
    tot = {'identifier': collections.Counter(), 'rectifier': collections.Counter()}
    n = collections.Counter(); modeles = collections.Counter(); trouve = False
    for line in open(path, errors='ignore'):
        try: e = json.loads(line)
        except Exception: continue
        m = e.get('message') if isinstance(e.get('message'), dict) else {}
        if e.get('type') == 'user' and premier is None:
            t = ' '.join(texte(m.get('content')).split())
            if t: premier = t if len(t) <= 900 else t[:400] + ' […] ' + t[-500:]
        if e.get('type') != 'assistant': continue
        mid = m.get('id')
        if marq and mid and mid != marq and not trouve:
            phase = 'rectifier'; trouve = True
        for x in (m.get('content') or []):
            if isinstance(x, dict) and x.get('type') == 'tool_use' and x.get('name') == 'Bash' \
               and marqueur in str((x.get('input') or {}).get('command', '')) and marq is None:
                marq = mid
        u = m.get('usage')
        if u and mid and mid not in vus:
            vus.add(mid); n[phase] += 1; modeles[m.get('model', '?')] += 1
            cc = u.get('cache_creation') or {}
            h1 = cc.get('ephemeral_1h_input_tokens', 0) or 0
            d = u.get('output_tokens_details') or {}
            for k, v in dict(entree=u.get('input_tokens', 0) or 0, ecriture_contexte_1h=h1,
                             ecriture_contexte_5m=(u.get('cache_creation_input_tokens', 0) or 0) - h1,
                             relecture_contexte=u.get('cache_read_input_tokens', 0) or 0,
                             sortie=u.get('output_tokens', 0) or 0, dont_reflexion=d.get('thinking_tokens', 0) or 0).items():
                tot[phase][k] += v
    if marq is None: return []
    return [dict(fichier=os.path.relpath(path, HOME), phase=ph, premier_message=premier, appels=n[ph],
                 modeles=dict(modeles), **dict(tot[ph])) for ph in ('identifier', 'rectifier')]

rows = []
for p in sorted(glob.glob(os.path.join(HOME, '**', '*.jsonl'), recursive=True)):
    if appartient(p): rows += lire(p)
json.dump(dict(session_locale=sid, marqueur=marqueur, lignes=rows), open(sortie, 'w'), ensure_ascii=False, indent=1)
print(f"{len(rows) // 2} transcripts découpés ; écrit dans {sortie}")
