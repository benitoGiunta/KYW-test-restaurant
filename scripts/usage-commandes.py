#!/usr/bin/env python3
"""Classe les commandes Bash d'une session par volume de sortie entré dans le contexte.
Usage : python3 scripts/usage-commandes.py <id-session-locale> <sortie.json>
Pour chaque commande : les 160 premiers caractères, le nombre de caractères renvoyés, l'agent. Agrège aussi par
« famille » (premier programme de la commande, après cd et variables) pour voir ce qui remplit le contexte.
N'écrit aucun contenu de sortie, seulement des tailles."""
import json, sys, os, glob, re, collections
HOME = os.path.expanduser('~/.claude'); sid, sortie = sys.argv[1], sys.argv[2]
def appartient(p):
    if sid in p: return True
    try:
        with open(p, errors='ignore') as f:
            for i, l in enumerate(f):
                if sid in l: return True
                if i > 30: return False
    except Exception: return False
    return False
def famille(cmd):
    c = re.sub(r'^\s*(cd [^;&]+(&&|;)\s*)+', '', cmd)
    c = re.sub(r'^(\w+=\S+\s+)+', '', c).strip()
    m = re.match(r'(scripts/q\.sh\s+\S+\s+)?(\S+)(\s+(\S+))?', c)
    if not m: return '?'
    prog, arg = m.group(2), m.group(4) or ''
    if prog in ('node', 'python3', 'bash', 'pnpm', 'npx', 'git'): prog = f'{prog} {arg}'
    return ('q.sh → ' if m.group(1) else '') + prog[:60]
lignes = []; fam = collections.Counter(); nfam = collections.Counter(); qsh = [0, 0]
for p in glob.glob(os.path.join(HOME, '**', '*.jsonl'), recursive=True):
    if not appartient(p): continue
    agent = os.path.basename(p)[:-6]; cmds = {}
    for l in open(p, errors='ignore'):
        try: e = json.loads(l)
        except Exception: continue
        m = e.get('message') if isinstance(e.get('message'), dict) else {}
        for x in (m.get('content') or []) if isinstance(m.get('content'), list) else []:
            if not isinstance(x, dict): continue
            if x.get('type') == 'tool_use' and x.get('name') == 'Bash':
                cmds[x.get('id')] = (x.get('input') or {}).get('command', '')
            if x.get('type') == 'tool_result' and x.get('tool_use_id') in cmds:
                c = x.get('content'); n = len(c) if isinstance(c, str) else sum(len(y.get('text', '')) for y in (c or []) if isinstance(y, dict))
                cmd = cmds[x['tool_use_id']]; f = famille(cmd); fam[f] += n; nfam[f] += 1
                qsh[0 if 'q.sh' in cmd else 1] += n
                lignes.append(dict(agent=agent, caracteres=n, commande=' '.join(cmd.split())[:160], famille=f))
lignes.sort(key=lambda r: -r['caracteres']); tot = sum(r['caracteres'] for r in lignes)
json.dump(dict(total=tot, commandes=len(lignes), via_q_sh=qsh[0], hors_q_sh=qsh[1],
               familles=[dict(famille=k, caracteres=v, appels=nfam[k], part=round(v / tot * 100, 1)) for k, v in fam.most_common(25)],
               plus_grosses=lignes[:40]), open(sortie, 'w'), ensure_ascii=False, indent=1)
print(f"{len(lignes)} commandes, {tot} caractères ; via q.sh {qsh[0]}, hors q.sh {qsh[1]} ; écrit dans {sortie}")
for k, v in fam.most_common(8): print(f"  {k}: {v} car. en {nfam[k]} appels")
