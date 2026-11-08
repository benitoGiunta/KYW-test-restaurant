#!/usr/bin/env python3
"""Vérifie, restaurant par restaurant, que la configuration prévue a réellement été appliquée, à partir des mesures
(data/usage/detail-*.json, commandes-*.json) et des revues (sites/<slug>-<variante>/REVUE-*.md).
Usage : python3 scripts/usage-conformite.py <sortie.json>"""
import json, re, glob, os, sys, collections
OUT = sys.argv[1]
COURT = {'claude-opus-5-5': 'Opus', 'claude-sonnet-5-5': 'Sonnet', 'claude-haiku-5-5': 'Haiku', 'claude-fable-5-1': 'Fable'}
# Configuration prévue par rang (workflow en place au lancement, vérifié par git)
def prevu(rang):
    c = {'captures': 'Haiku', 'publication': 'Haiku', 'recherche-client': 'Sonnet', 'relecteur-site': 'Sonnet', 'gardien-des-lecons': 'Sonnet'}
    c['reviseur-site'] = 'Sonnet' if rang >= 6 else 'Opus'
    for v in ('portfolio', 'awwwards', 'legacy'):
        for n in (1, 2, 3):
            if v == 'portfolio': m = 'Sonnet' if rang >= 6 else 'Opus'
            elif v == 'legacy': m = 'Sonnet' if rang >= 5 else 'Opus'
            else: m = ('Opus' if n == 2 else 'Sonnet') if rang >= 7 else 'Opus'
            c[f'variante-{v}:{n}'] = m
    return c
def defauts(path):
    if not os.path.exists(path): return None
    t = open(path, errors='ignore').read()
    m = re.search(r'\((\d+) F0, (\d+) F1', t)
    if m: return int(m.group(1)) + int(m.group(2))
    m = re.search(r'Décompte : F0 (\d+) · F1 (\d+)', t)
    if m: return int(m.group(1)) + int(m.group(2))
    # sinon : défauts F0/F1 listés dans la section Findings seulement (pas ceux qu'on vérifie corrigés)
    i = t.find('## Findings')
    if i >= 0:
        j = t.find('\n## ', i + 5); t = t[i:j if j > 0 else None]
    # un défaut ouvert = un identifiant F0-n / F1-n en tête de ligne (pas une simple référence dans le texte)
    return len(set(re.findall(r'(?m)^\s*(?:[-*]\s*)?\**F([01])-(\d+)', t)))
lignes = []
for f in glob.glob('data/usage/detail-*.json'):
    slug = f.split('detail-')[1][:-5]
    if slug in ('test-site', 'atelier-de-bossime'): continue
    d = json.load(open(f)); princ = [r for r in d['lignes'] if r['principal']][0]
    m = re.search(r'rang (\d+)', princ['premier_message'] or ''); rang = int(m.group(1)) if m else 0
    P = prevu(rang); ecarts = []; n_agents = 0; obs = collections.defaultdict(set); consignes = collections.Counter()
    rep_max = 0; plus40 = 0; bash = 0; reps = 0; socle = []
    for r in d['lignes']:
        if r.get('contexte_premiere_reponse'): socle.append(r['contexte_premiere_reponse'])
        if r['principal']: continue
        t = r['premier_message'] or ''
        mm = re.match(r'Rôle : ([\w-]+) · Restaurant : [\w-]+ · Variante : ([\w-]+) · Passe : ([\w-]+)', t)
        if not mm: continue
        role, v, passe = mm.groups(); n_agents += 1
        cle = f'{role}:{passe.split("-")[-1]}' if role.startswith('variante-') else role
        mods = sorted({COURT.get(x, x) for x in r['modeles'] if x in COURT})
        obs[cle] |= set(mods)
        if P.get(cle) and mods != [P[cle]]: ecarts.append(f'{cle} ({v}) : {"/".join(mods)} au lieu de {P[cle]}')
        if 'lecons/' in t: consignes['lecons_par_role'] += 1
        if 'lecons.md' in t and 'lecons/' not in t: consignes['lecons_complet'] += 1
        if re.search(r'variante-(awwwards|legacy)/phase-\d', t): consignes['prompt_par_phase'] += 1
        rep_max = max(rep_max, r['appels']); plus40 += r['appels'] > 40; bash += r['outils'].get('Bash', 0); reps += r['appels']
    # test B : revue 2 seulement si la revue 1 avait un F0 ou un F1
    revues = []
    for v in ('portfolio', 'awwwards', 'legacy'):
        d1 = defauts(f'sites/{slug}-{v}/REVUE-1.md'); r2 = os.path.exists(f'sites/{slug}-{v}/REVUE-2.md')
        fin = max([p for p in glob.glob(f'sites/{slug}-{v}/REVUE-*.md')], default=None, key=lambda p: int(re.search(r'(\d+)\.md', p).group(1)))
        revues.append(dict(variante=v, f0f1_revue1=d1, revue2=r2, conforme_b=(r2 == ((d1 or 0) > 0)) if rang >= 5 else None,
                           f0f1_fin=defauts(fin) if fin else None, derniere=os.path.basename(fin) if fin else None))
    cmd = f'data/usage/commandes-{slug}.json'
    lignes.append(dict(restaurant=slug, rang=rang, agents=n_agents, modeles_ecarts=ecarts, modeles_observes={k: sorted(v) for k, v in obs.items()},
                       consignes=dict(consignes), reponses_max=rep_max, agents_plus_40=plus40, bash_par_reponse=round(bash / reps, 3) if reps else None,
                       socle=round(sum(socle) / len(socle)) if socle else None, revues=revues,
                       sorties_commandes=json.load(open(cmd))['total'] if os.path.exists(cmd) else None))
lignes.sort(key=lambda x: x['rang'])
json.dump(lignes, open(OUT, 'w'), ensure_ascii=False, indent=1)
for l in lignes:
    print(l['rang'], l['restaurant'], 'agents', l['agents'], 'écarts modèles', len(l['modeles_ecarts']), l['modeles_ecarts'][:3], 'consignes', l['consignes'], 'max', l['reponses_max'], '>40', l['agents_plus_40'], 'bash/rép', l['bash_par_reponse'], 'socle', l['socle'])
    for r in l['revues']: print('    ', r)
