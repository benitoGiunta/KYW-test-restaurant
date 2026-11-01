#!/usr/bin/env python3
"""Agrège data/usage/detail-*.json en jeux de données par chantier, tâche, nature de jetons et modèle.
Usage : python3 scripts/usage-chantiers.py <dossier de sortie>
Prix catalogue par million de jetons (calés sur le coût que Claude Code affiche par modèle, écart < 0,1 %) :
entrée, écriture de contexte 5 min, écriture 1 h, relecture, sortie (réflexion comprise)."""
import json, sys, os, re, glob, collections
OUT = sys.argv[1]; os.makedirs(OUT, exist_ok=True)
PRIX = {'claude-fable-5-1': (10, 12.5, 20, 0.25, 50), 'claude-opus-5-5': (4, 5, 8, 0.20, 20),
        'claude-sonnet-5-5': (2, 2.5, 4, 0.10, 10), 'claude-haiku-5-5': (0.10, 0.125, 0.20, 0.01, 0.50)}
NOM_MODELE = {'claude-fable-5-1': 'Fable 5.1', 'claude-opus-5-5': 'Opus 5.5', 'claude-sonnet-5-5': 'Sonnet 5.5', 'claude-haiku-5-5': 'Haiku 5.5'}
GAB = {'affiche': 'Affiche', 'ardoise': 'Ardoise', 'braise': 'Braise', 'cahier': 'Cahier', 'collage': 'Collage', 'comptoir': 'Comptoir',
       'encre': 'Encre', 'forno': 'Forno', 'guinguette': 'Guinguette', 'journee': 'Journée', 'maree': 'Marée', 'nocturne': 'Nocturne',
       'quatre-mains': 'Quatre mains', 'velours': 'Velours', 'verger': 'Verger'}
RESTO = {'atelier-de-bossime': ("L'Atelier de Bossimé", 'detail-atelier-de-bossime.json'), 'les-potes-au-feu': ('Les Potes au Feu', None)}
# Restaurant 2 : la variante des revues et révisions ne figure pas dans les 600 premiers caractères conservés ;
# elle est déduite de l'enchaînement des agents (fin d'une revue = début de sa révision) et des commits REVUE/REVISION.
R2_VARIANTE = {'a1334a9871f51f325': 'awwwards', 'a771f6e9ed6303ab4': 'legacy', 'ab57fa8337749bdf6': 'portfolio',
               'aa2b3c67acf4e8e41': 'portfolio', 'a646f1131c4163625': 'legacy', 'afcfa8d161614ac5d': 'awwwards'}
NATURES = [('ecriture', 'Écriture de contexte'), ('relecture', 'Relecture de contexte'), ('reflexion', 'Réflexion'),
           ('production', 'Production (texte, code)'), ('entree', 'Entrée hors cache')]
TACHES = ['Construction', 'Revue', 'Révision', 'Recherche client', 'Publication', 'Leçons', 'Orchestration', 'Préparation']
CLE_T = dict(zip(TACHES, ['construction', 'revue', 'revision', 'recherche', 'publication', 'lecons', 'orchestration', 'preparation']))

def cout_natures(pm):
    c = collections.Counter(); j = collections.Counter()
    for m, v in pm.items():
        if m not in PRIX: continue
        pi, p5, p1, pr, po = PRIX[m]
        out = v.get('sortie', 0); th = min(v.get('dont_reflexion', 0), out)
        j['entree'] += v.get('entree', 0); c['entree'] += v.get('entree', 0) * pi / 1e6
        e = v.get('ecriture_contexte_5m', 0) + v.get('ecriture_contexte_1h', 0)
        j['ecriture'] += e; c['ecriture'] += (v.get('ecriture_contexte_5m', 0) * p5 + v.get('ecriture_contexte_1h', 0) * p1) / 1e6
        j['relecture'] += v.get('relecture_contexte', 0); c['relecture'] += v.get('relecture_contexte', 0) * pr / 1e6
        j['reflexion'] += th; c['reflexion'] += th * po / 1e6
        j['production'] += out - th; c['production'] += (out - th) * po / 1e6
    return c, j

def tache_de(t, principal):
    if principal: return 'Orchestration'
    if 'relecteur-site' in t: return 'Revue'
    if 'reviseur-site' in t: return 'Révision'
    if 'recherche-client' in t: return 'Recherche client'
    if 'portfolio-gabarit' in t or re.search(r'variante-(portfolio|awwwards|legacy)', t): return 'Construction'
    if 'publication' in t[:200]: return 'Publication'
    if 'leçons' in t[:200] or 'gardien des leçons' in t: return 'Leçons'
    return 'Préparation'

def gabarit_de(t):
    trouves = [g for g in GAB if g in t or g.replace('-', ' ') in t]
    autres = [g for g in trouves if g != 'cahier']
    return autres[0] if autres else (trouves[0] if trouves else None)

lignes = []
def ajoute(session, groupe, chantier, tache, modele, appels, c, j, source, r=None):
    eo = (r or {}).get('entree_par_outil', {})
    lignes.append(dict(session=session, groupe=groupe, chantier=chantier, tache=tache, modele=modele, appels=appels, source=source,
        cout=round(sum(c.values()), 4), **{'cout_' + k: round(c[k], 4) for k, _ in NATURES}, **{'jetons_' + k: int(j[k]) for k, _ in NATURES},
        images=sum(v.get('images', 0) for v in eo.values()),
        car_fichiers=eo.get('Read', {}).get('caracteres', 0), car_commandes=eo.get('Bash', {}).get('caracteres', 0),
        car_web=eo.get('WebFetch', {}).get('caracteres', 0) + eo.get('WebSearch', {}).get('caracteres', 0),
        debut=(r or {}).get('debut'), fin=(r or {}).get('fin'), id=f'{session[:2].lower()}{len(lignes) + 1:03d}'))

# Session Test Site : préparation (28-29/10), 15 gabarits, pilotage
d = json.load(open('data/usage/detail-test-site.json'))
for r in d['lignes']:
    t = (r['premier_message'] or '').lower(); ta = tache_de(t, r['principal'])
    c, j = cout_natures(r.get('par_modele', {})); mod = ', '.join(NOM_MODELE.get(m, m) for m in r['modeles'] if m in PRIX)
    if r['principal']:
        ajoute('Test Site', 'Pilotage', 'Pilotage du projet', 'Orchestration', mod, r['appels'], c, j, 'mesuré', r); continue
    if ta in ('Construction', 'Revue', 'Révision') and 'portfolio-gabarit' in t or ta in ('Revue', 'Révision'):
        g = gabarit_de(t)
        if g:
            ajoute('Test Site', 'Portfolio', GAB[g], ta, mod, r['appels'], c, j, 'mesuré', r); continue
    ajoute('Test Site', 'Préparation', 'Préparation du projet', 'Préparation' if ta != 'Recherche client' else 'Recherche client', mod, r['appels'], c, j, 'mesuré', r)

# Restaurant 2 : mesuré
d = json.load(open('data/usage/detail-atelier-de-bossime.json'))
r2 = []
for r in d['lignes']:
    t = (r['premier_message'] or '').lower(); ta = tache_de(t, r['principal'])
    aid = os.path.basename(r['fichier'])[6:-6]  # agent-<id>.jsonl
    m = re.search(r'variante-(portfolio|awwwards|legacy)', t)
    v = m.group(1) if m else R2_VARIANTE.get(aid)
    chantier = f"Bossimé · {v}" if v else 'Bossimé · commun'
    c, j = cout_natures(r.get('par_modele', {})); mod = ', '.join(NOM_MODELE.get(x, x) for x in r['modeles'] if x in PRIX)
    ajoute('Restaurant 2', "L'Atelier de Bossimé", chantier, ta, mod, r['appels'], c, j, 'mesuré', r)
    r2.append(lignes[-1])

# Restaurant 1 : session bloquée sur Fable, transcripts inaccessibles. Totaux exacts par modèle (compteur Claude Code
# du 31/10 15:39), ventilés par tâche et variante au prorata mesuré sur le restaurant 2, rôle par rôle.
R1 = {'claude-fable-5-1': dict(entree=904, ecriture_contexte_5m=282681, ecriture_contexte_1h=47324, relecture_contexte=3926051, sortie=61259, dont_reflexion=20786),
      'claude-opus-5-5': dict(entree=897, ecriture_contexte_5m=2239307, ecriture_contexte_1h=0, relecture_contexte=90647797, sortie=392690, dont_reflexion=115408),
      'claude-sonnet-5-5': dict(entree=607, ecriture_contexte_5m=1799602, ecriture_contexte_1h=0, relecture_contexte=49165639, sortie=242455, dont_reflexion=80590),
      'claude-haiku-5-5': dict(entree=47152, ecriture_contexte_5m=88002, ecriture_contexte_1h=0, relecture_contexte=782140, sortie=8933, dont_reflexion=3907)}
# rôles par modèle dans la session du restaurant 1 (workflow avant le commit e8acc0b) :
# Fable = orchestrateur + construction awwwards ; Opus = constructions portfolio et legacy + révisions ;
# Sonnet = recherche, revues, leçons ; Haiku = publication.
def cles(row): return (row['chantier'].replace('Bossimé', 'Potes au Feu'), row['tache'])
roles = {'claude-fable-5-1': lambda x: x['tache'] == 'Orchestration' or (x['tache'] == 'Construction' and x['chantier'].endswith('awwwards')),
         'claude-opus-5-5': lambda x: x['tache'] in ('Construction', 'Révision') and not (x['tache'] == 'Construction' and x['chantier'].endswith('awwwards')),
         'claude-sonnet-5-5': lambda x: x['tache'] in ('Recherche client', 'Revue')}
for m, tok in R1.items():
    if m == 'claude-haiku-5-5':
        base = [(('Potes au Feu · commun', 'Publication'), 1.0)]
    else:
        sel = [x for x in r2 if roles[m](x)]; tot = sum(x['cout'] for x in sel)
        base = [(cles(x), x['cout'] / tot) for x in sel]
    for (ch, ta), part in base:
        pm = {m: {k: v * part for k, v in tok.items()}}
        c, j = cout_natures(pm)
        ajoute('Restaurant 1', 'Les Potes au Feu', ch, ta, NOM_MODELE[m], None, c, j, 'estimé')

json.dump(lignes, open(os.path.join(OUT, 'agents.json'), 'w'), ensure_ascii=False, indent=0)

def agrege(cle):
    A = collections.OrderedDict()
    for x in lignes:
        k = cle(x); a = A.setdefault(k, collections.Counter())
        for f in ['cout'] + ['cout_' + n for n, _ in NATURES] + ['jetons_' + n for n, _ in NATURES] + ['images', 'car_fichiers', 'car_commandes', 'car_web']:
            a[f] += x[f]
        a['agents'] += 1; a['appels'] += x['appels'] or 0
        a['cout_t_' + x['tache']] += x['cout']
        a['estime'] = max(a['estime'], 1 if x['source'] == 'estimé' else 0)
    return A

ORD_GROUPE = ['Portfolio', 'Les Potes au Feu', "L'Atelier de Bossimé", 'Préparation', 'Pilotage']
ch = []
for (g, c), a in agrege(lambda x: (x['groupe'], x['chantier'])).items():
    row = dict(groupe=g, chantier=c, ordre=ORD_GROUPE.index(g), source='estimé' if a['estime'] else 'mesuré', agents=a['agents'], appels=a['appels'],
               cout=round(a['cout'], 2), **{('cout_' + n): round(a['cout_' + n], 2) for n, _ in NATURES},
               **{('jetons_' + n): int(a['jetons_' + n]) for n, _ in NATURES},
               **{('t_' + CLE_T[t]): round(a['cout_t_' + t], 2) for t in TACHES}, images=int(a['images']))
    row['part_ecriture'] = round(a['cout_ecriture'] / a['cout'] * 100, 1) if a['cout'] else 0
    ch.append(row)
ch.sort(key=lambda r: (r['ordre'], -r['cout']))
json.dump(ch, open(os.path.join(OUT, 'chantiers.json'), 'w'), ensure_ascii=False, indent=0)

ta = []
for t, a in agrege(lambda x: x['tache']).items():
    ta.append(dict(tache=t, cle=CLE_T[t], ordre=TACHES.index(t), agents=a['agents'], appels=a['appels'], cout=round(a['cout'], 2),
                   **{('cout_' + n): round(a['cout_' + n], 2) for n, _ in NATURES}, **{('jetons_' + n): int(a['jetons_' + n]) for n, _ in NATURES},
                   images=int(a['images']), car_fichiers=int(a['car_fichiers']), car_commandes=int(a['car_commandes']), car_web=int(a['car_web']),
                   cout_par_agent=round(a['cout'] / a['agents'], 2)))
ta.sort(key=lambda r: r['ordre'])
json.dump(ta, open(os.path.join(OUT, 'taches.json'), 'w'), ensure_ascii=False, indent=0)

tot = sum(x['cout'] for x in lignes); TN = collections.Counter()
for x in lignes:
    for n, _ in NATURES: TN['c' + n] += x['cout_' + n]; TN['j' + n] += x['jetons_' + n]
na = [dict(nature=lib, cle=n, cout=round(TN['c' + n], 2), jetons=int(TN['j' + n]), part_cout=round(TN['c' + n] / tot * 100, 1),
           part_jetons=round(TN['j' + n] / sum(TN['j' + k] for k, _ in NATURES) * 100, 1)) for n, lib in NATURES]
json.dump(na, open(os.path.join(OUT, 'natures.json'), 'w'), ensure_ascii=False, indent=0)

gr = []
for g, a in agrege(lambda x: x['groupe']).items():
    nb = {'Portfolio': 15, 'Les Potes au Feu': 3, "L'Atelier de Bossimé": 3}.get(g)
    gr.append(dict(groupe=g, ordre=ORD_GROUPE.index(g), cout=round(a['cout'], 2), agents=a['agents'], sites=nb,
                   cout_par_site=round(a['cout'] / nb, 2) if nb else None, part=round(a['cout'] / tot * 100, 1),
                   source='estimé' if a['estime'] else 'mesuré'))
gr.sort(key=lambda r: r['ordre'])
json.dump(gr, open(os.path.join(OUT, 'groupes.json'), 'w'), ensure_ascii=False, indent=0)
mo = []
for m, a in agrege(lambda x: x['modele']).items():
    mo.append(dict(modele=m, cout=round(a['cout'], 2), agents=a['agents'], part=round(a['cout'] / tot * 100, 1)))
mo.sort(key=lambda r: -r['cout'])
json.dump(mo, open(os.path.join(OUT, 'modeles.json'), 'w'), ensure_ascii=False, indent=0)
print('total', round(tot, 2))
for r in gr: print(r)
for r in ta: print(r['tache'], r['cout'], r['agents'], r['cout_par_agent'])
for r in na: print(r)
for r in mo: print(r)
