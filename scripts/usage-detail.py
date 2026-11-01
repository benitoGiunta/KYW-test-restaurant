#!/usr/bin/env python3
"""Détail de la consommation de jetons d'une session Claude Code, agent par agent.

Usage : python3 scripts/usage-detail.py <id-session-locale> <sortie.json>
  <id-session-locale> : l'identifiant du transcript principal sur ce conteneur (le nom du fichier
  ~/.claude/projects/<slug>/<id>.jsonl ; c'est le `session_id` des événements result, pas l'id session_...).
  Sans argument d'id : prend le transcript principal le plus récent.

Parcourt ~/.claude récursivement et retient tout transcript (.jsonl) qui appartient à la session : le principal,
ses sous-agents (Agent) et les agents de workflow. Pour chaque transcript, une ligne avec :
  - premier_message (600 caractères) pour classer chantier et tâche après coup ;
  - modèle(s), nombre de réponses (chaque message compté une fois par son id) ;
  - jetons par nature : entrée, écriture de contexte (cache 5 min / 1 h), relecture de contexte, sortie,
    dont réflexion quand l'API la fournit ;
  - ce qui est entré dans le contexte par outil : caractères de texte et nombre d'images renvoyés par chaque outil ;
  - appels d'outils par nom, début et fin.
Le fichier produit est petit (quelques dizaines de Ko) et ne contient aucun contenu de fichier."""
import json, sys, os, glob, collections

HOME = os.path.expanduser('~/.claude')
sid = sys.argv[1] if len(sys.argv) > 2 else None
sortie = sys.argv[2] if len(sys.argv) > 2 else sys.argv[1]

if not sid:
    princ = sorted(glob.glob(os.path.join(HOME, 'projects', '*', '*.jsonl')), key=os.path.getmtime)
    sid = os.path.basename(princ[-1])[:-6]

def appartient(path):
    if sid in path:
        return True
    try:
        with open(path, errors='ignore') as f:
            for i, line in enumerate(f):
                if sid in line:
                    return True
                if i > 30:
                    return False
    except Exception:
        return False
    return False

fichiers = [p for p in glob.glob(os.path.join(HOME, '**', '*.jsonl'), recursive=True) if appartient(p)]

def texte(c):
    if isinstance(c, str):
        return c
    if isinstance(c, list):
        return ' '.join(x.get('text', '') for x in c if isinstance(x, dict) and x.get('type') == 'text')
    return ''

def lire(path):
    vus = set(); n = 0; premier = None; debut = fin = None
    tot = collections.Counter(); modeles = collections.Counter(); outils = collections.Counter()
    par_modele = collections.defaultdict(collections.Counter)
    nom_outil = {}; entree_outil = collections.defaultdict(collections.Counter)
    for line in open(path, errors='ignore'):
        try:
            e = json.loads(line)
        except Exception:
            continue
        ts = e.get('timestamp')
        if ts:
            debut = debut or ts; fin = ts
        m = e.get('message') if isinstance(e.get('message'), dict) else {}
        if e.get('type') == 'user':
            c = m.get('content')
            if premier is None:
                t = texte(c)
                if t.startswith('[Workflow harness'):
                    # en-tête du harnais : la tâche calculée suit, chaque ligne indentée
                    lignes = [l.strip() for l in t.splitlines()[1:] if l.startswith((' ', '\t'))]
                    t = ' '.join(l for l in lignes if l)
                if t.strip():
                    premier = t[:600]
            if isinstance(c, list):
                for x in c:
                    if isinstance(x, dict) and x.get('type') == 'tool_result':
                        nom = nom_outil.get(x.get('tool_use_id'), '?')
                        cc = x.get('content')
                        if isinstance(cc, str):
                            entree_outil[nom]['caracteres'] += len(cc)
                        elif isinstance(cc, list):
                            for y in cc:
                                if not isinstance(y, dict):
                                    continue
                                if y.get('type') == 'image':
                                    entree_outil[nom]['images'] += 1
                                elif y.get('type') == 'text':
                                    entree_outil[nom]['caracteres'] += len(y.get('text', ''))
        if e.get('type') == 'assistant':
            for x in (m.get('content') or []):
                if isinstance(x, dict) and x.get('type') == 'tool_use':
                    nom_outil[x.get('id')] = x.get('name'); outils[x.get('name')] += 1
            u = m.get('usage'); mid = m.get('id')
            if u and mid and mid not in vus:
                vus.add(mid); n += 1; modeles[m.get('model', '?')] += 1
                cc = u.get('cache_creation') or {}
                h1 = cc.get('ephemeral_1h_input_tokens', 0) or 0
                d = u.get('output_tokens_details') or {}
                vals = dict(entree=u.get('input_tokens', 0) or 0, ecriture_contexte_1h=h1,
                            ecriture_contexte_5m=(u.get('cache_creation_input_tokens', 0) or 0) - h1,
                            relecture_contexte=u.get('cache_read_input_tokens', 0) or 0,
                            sortie=u.get('output_tokens', 0) or 0, dont_reflexion=d.get('thinking_tokens', 0) or 0)
                for k, v in vals.items():
                    tot[k] += v; par_modele[m.get('model', '?')][k] += v
    return dict(fichier=os.path.relpath(path, HOME), principal=os.path.basename(path) == sid + '.jsonl',
                premier_message=premier, appels=n, modeles=dict(modeles), **dict(tot),
                par_modele={k: dict(v) for k, v in par_modele.items()}, outils=dict(outils),
                entree_par_outil={k: dict(v) for k, v in entree_outil.items()}, debut=debut, fin=fin)

rows = [lire(p) for p in sorted(fichiers)]
rows = [r for r in rows if r['appels']]
json.dump(dict(session_locale=sid, transcripts=len(rows), lignes=rows), open(sortie, 'w'), ensure_ascii=False, indent=1)
T = collections.Counter()
for r in rows:
    for k in ('entree', 'ecriture_contexte_5m', 'ecriture_contexte_1h', 'relecture_contexte', 'sortie'):
        T[k] += r.get(k, 0)
print(f"{len(rows)} transcripts avec réponses ; totaux {dict(T)} ; écrit dans {sortie}")
