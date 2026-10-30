#!/usr/bin/env python3
"""Extrait la consommation de jetons d'une session Claude Code (transcript principal + sous-agents) en JSON.
Usage : python3 scripts/usage-extraire.py <dossier ~/.claude/projects/<slug>> <id-session> <sortie.json> [libelles.json]
Les libellés (agentId → rôle) sont optionnels ; sinon le premier message utilisateur de l'agent est tronqué en libellé.
Compte chaque réponse d'assistant une seule fois (par id de message) : input, cache_creation, cache_read, output."""
import json, sys, glob, os, collections
dossier, session, sortie = sys.argv[1], sys.argv[2], sys.argv[3]
libelles = json.load(open(sys.argv[4])) if len(sys.argv) > 4 else {}
CLES = ('input_tokens', 'cache_creation_input_tokens', 'cache_read_input_tokens', 'output_tokens')
def lire(path):
    tot = collections.Counter(); seen = set(); outils = collections.Counter(); modeles = collections.Counter(); heures = collections.defaultdict(collections.Counter); premier = None; n = 0
    for line in open(path):
        try: e = json.loads(line)
        except Exception: continue
        m = e.get('message') or {}
        if e.get('type') == 'user' and premier is None and isinstance(m, dict):
            c = m.get('content'); premier = (c if isinstance(c, str) else json.dumps(c, ensure_ascii=False))[:120]
        if e.get('type') == 'assistant' and isinstance(m, dict):
            u = m.get('usage'); mid = m.get('id')
            if u and mid and mid not in seen:
                seen.add(mid); n += 1; modeles[m.get('model', '?')] += 1
                for k in CLES: tot[k] += u.get(k, 0)
                h = (e.get('timestamp') or '')[:13]
                for k in CLES: heures[h][k] += u.get(k, 0)
            for c in (m.get('content') or []):
                if isinstance(c, dict) and c.get('type') == 'tool_use': outils[c.get('name')] += 1
    return dict(tot), n, dict(outils), dict(modeles), premier, {h: dict(c) for h, c in heures.items()}
rows = []
principal = os.path.join(dossier, session + '.jsonl')
if os.path.exists(principal):
    tot, n, outils, modeles, premier, heures = lire(principal)
    rows.append(dict(agent='session-principale', label='orchestrateur (session principale)', appels=n, **tot, outils=outils, modeles=modeles, premier_message=premier, heures=heures))
for f in sorted(glob.glob(os.path.join(dossier, session, 'subagents', 'agent-*.jsonl'))):
    aid = os.path.basename(f)[6:-6]
    tot, n, outils, modeles, premier, heures = lire(f)
    rows.append(dict(agent=aid, label=libelles.get(aid, premier or aid), appels=n, **tot, outils=outils, modeles=modeles, premier_message=premier, heures=heures))
rows.sort(key=lambda r: -r.get('output_tokens', 0))
json.dump(rows, open(sortie, 'w'), ensure_ascii=False, indent=1)
T = collections.Counter()
for r in rows:
    for k in CLES: T[k] += r.get(k, 0)
print(f"{len(rows)} transcripts ; totaux : {dict(T)}")
