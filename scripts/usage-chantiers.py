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
TACHES = ['Construction', 'Revue', 'Révision', 'Recherche client', 'Captures', 'Publication', 'Leçons', 'Orchestration', 'Préparation']
CLE_T = dict(zip(TACHES, ['construction', 'revue', 'revision', 'recherche', 'captures', 'publication', 'lecons', 'orchestration', 'preparation']))

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


# Restaurants 3 et suivants : chaque prompt d'agent commence par « Rôle : … · Restaurant : … · Variante : … · Passe : … ».
ROLE_T = {'recherche-client': 'Recherche client', 'captures': 'Captures', 'relecteur-site': 'Revue', 'reviseur-site': 'Révision',
          'publication': 'Publication', 'gardien-des-lecons': 'Leçons'}
RESTOS_GEN = []
def rang_de(f):
    try:
        p = [r for r in json.load(open(f))['lignes'] if r['principal']][0]
        m = re.search(r'rang (\d+)', p['premier_message'] or ''); return int(m.group(1)) if m else 99
    except Exception: return 99
for f in sorted(glob.glob('data/usage/detail-*.json'), key=rang_de):
    if f.endswith(('detail-test-site.json', 'detail-atelier-de-bossime.json')): continue
    d = json.load(open(f)); slug = f.split('detail-')[1][:-5]
    try: nom = json.load(open(f'data/restaurants/{slug}/donnees.json')).get('nom') or slug
    except Exception: nom = slug
    RESTOS_GEN.append(nom)
    for r in d['lignes']:
        t = r['premier_message'] or ''
        m = re.match(r'Rôle : ([\w-]+) · Restaurant : ([\w-]+) · Variante : ([\w-]+)', t)
        role, v = (m.group(1), m.group(3)) if m else (None, '-')
        ta = 'Orchestration' if r['principal'] else ('Construction' if role and role.startswith('variante-') else ROLE_T.get(role, 'Préparation'))
        chantier = f"{nom} · {v}" if v in ('portfolio', 'awwwards', 'legacy') else f"{nom} · commun"
        c, j = cout_natures(r.get('par_modele', {})); mod = ', '.join(NOM_MODELE.get(x, x) for x in r['modeles'] if x in PRIX)
        ajoute(nom, nom, chantier, ta, mod, r['appels'], c, j, 'mesuré', r)

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

ORD_GROUPE = ['Portfolio', 'Les Potes au Feu', "L'Atelier de Bossimé"] + RESTOS_GEN + ['Préparation', 'Pilotage']
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
    nb = 15 if g == 'Portfolio' else (3 if g not in ('Préparation', 'Pilotage') else None)
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

# --- Catégories demandées (portfolio complet, chaque site, chaque restaurant complet) et leviers chiffrés ---
import math
CATS = [('Portfolio complet', 'ensemble', lambda a: a['groupe'] == 'Portfolio'),
        ('Potes au Feu · site 1 portfolio', 'site', lambda a: a['chantier'] == 'Potes au Feu · portfolio'),
        ('Potes au Feu · site 2 awwwards', 'site', lambda a: a['chantier'] == 'Potes au Feu · awwwards'),
        ('Potes au Feu · site 3 legacy', 'site', lambda a: a['chantier'] == 'Potes au Feu · legacy'),
        ('Potes au Feu complet', 'ensemble', lambda a: a['groupe'] == 'Les Potes au Feu'),
        ('Bossimé · site 1 portfolio', 'site', lambda a: a['chantier'] == 'Bossimé · portfolio'),
        ('Bossimé · site 2 awwwards', 'site', lambda a: a['chantier'] == 'Bossimé · awwwards'),
        ('Bossimé · site 3 legacy', 'site', lambda a: a['chantier'] == 'Bossimé · legacy'),
        ('Bossimé complet', 'ensemble', lambda a: a['groupe'] == "L'Atelier de Bossimé")]
for nom in RESTOS_GEN:
    for i, v in enumerate(('portfolio', 'awwwards', 'legacy'), 1):
        CATS.append((f'{nom} · site {i} {v}', 'site', (lambda ch: lambda a: a['chantier'] == ch)(f'{nom} · {v}')))
    CATS.append((f'{nom} complet', 'ensemble', (lambda g: lambda a: a['groupe'] == g)(nom)))
cats = []
for i, (nom, typ, f) in enumerate(CATS):
    s = [a for a in lignes if f(a)]; c = collections.Counter()
    for a in s:
        for k in ['cout'] + ['cout_' + n for n, _ in NATURES] + ['jetons_' + n for n, _ in NATURES] + ['images', 'car_fichiers', 'car_commandes', 'car_web']:
            c[k] += a[k]
        c['appels'] += a['appels'] or 0; c['t_' + CLE_T[a['tache']]] += a['cout']
    est = any(a['source'] == 'estimé' for a in s); rep = c['appels'] if not est else None
    row = dict(categorie=nom, ordre=i, type=typ, source='estimé' if est else 'mesuré', cout=round(c['cout'], 2),
               **{('cout_' + n): round(c['cout_' + n], 2) for n, _ in NATURES},
               **{('part_' + n): round(c['cout_' + n] / c['cout'] * 100, 1) for n, _ in NATURES},
               **{('t_' + v): round(c['t_' + v], 2) for v in CLE_T.values()},
               reponses=rep, contexte_par_reponse=round(c['jetons_relecture'] / rep) if rep else None,
               cout_par_reponse=round(c['cout'] / rep, 3) if rep else None,
               images=None if est else int(c['images']), car_commandes=None if est else int(c['car_commandes']),
               car_fichiers=None if est else int(c['car_fichiers']))
    cats.append(row)
json.dump(cats, open(os.path.join(OUT, 'categories.json'), 'w'), ensure_ascii=False, indent=0)

mes = [a for a in lignes if a['source'] == 'mesuré' and a['groupe'] in ('Portfolio', "L'Atelier de Bossimé")]
def lev_constr_opus(rows):
    pc = [a for a in rows if a['tache'] == 'Construction' and 'Fable' in a['modele']]
    avant = sum(a['cout'] for a in pc)
    apres = sum(a['jetons_ecriture'] * 5 + a['jetons_relecture'] * 0.2 + (a['jetons_reflexion'] + a['jetons_production']) * 20 + a['jetons_entree'] * 4 for a in pc) / 1e6
    return avant, avant - apres
def lev_courts(rows, B=45e3, cap=40):
    base = g = 0
    for a in rows:
        n = a['appels']
        if not n or n <= cap or not a['jetons_relecture']: continue
        avg = a['jetons_relecture'] / n; k = math.ceil(n / cap); pr = a['cout_relecture'] / a['jetons_relecture']
        base += a['cout_relecture']; g += (a['jetons_relecture'] - n * (B + (avg - B) / k)) * pr if avg > B else 0
    return base, g
def lev_reecriture(rows):
    base = g = 0
    for a in rows:
        n = a['appels']
        if not n or not a['jetons_ecriture']: continue
        final = 2 * a['jetons_relecture'] / n   # contexte final ≈ 2 × contexte moyen
        exces = max(0, a['jetons_ecriture'] - 1.2 * final); pr = a['cout_ecriture'] / a['jetons_ecriture']
        base += a['cout_ecriture']; g += exces * pr
    return base, g
def lev_commandes(rows, coupe=0.7):
    c = collections.Counter()
    for a in rows:
        c['cmd'] += a['car_commandes']; c['fich'] += a['car_fichiers']; c['web'] += a['car_web']; c['img'] += a['images'] * 6400
    part = c['cmd'] / sum(c.values()); base = sum(a['cout_ecriture'] + a['cout_relecture'] for a in rows)
    return base, base * part * coupe * 0.6, round(part * 100, 1)
def lev_revision(rows):
    rv = [a for a in rows if a['tache'] == 'Révision']; base = sum(a['cout'] for a in rv)
    g = sum(max(0, a['cout'] - a['cout'] * 40 / a['appels']) for a in rv if a['appels'] and a['appels'] > 40)
    return base, g
P = [a for a in mes if a['groupe'] == 'Portfolio']; R = [a for a in mes if a['groupe'] == "L'Atelier de Bossimé"]
lev = []
b, g = lev_constr_opus(P)
lev.append(dict(id='opus', ordre=1, levier='Construire les gabarits sur Opus 5.5 au lieu de Fable 5.1', perimetre='Portfolio complet', base=round(b, 2), gain=round(g, 2), part=round(g / b * 100), statut='déjà appliqué aux restaurants depuis le 31/10'))
for nom, rows in (('Portfolio complet', P), ('Bossimé complet', R)):
    b, g, p = lev_commandes(rows)
    lev.append(dict(id='cmd-' + nom[:4].lower(), ordre=2, levier='Couper de 70 % les sorties de commandes qui entrent dans le contexte', perimetre=nom, base=round(b, 2), gain=round(g, 2), part=round(g / b * 100), part_commandes=p, statut='part des sorties de commandes dans ce qui entre dans le contexte'))
for nom, rows in (('Portfolio complet', P), ('Bossimé complet', R)):
    b, g = lev_reecriture(rows)
    lev.append(dict(id='reec-' + nom[:4].lower(), ordre=3, levier='Supprimer les réécritures de contexte après une pause de plus de 5 minutes', perimetre=nom, base=round(b, 2), gain=round(g, 2), part=round(g / b * 100) if b else 0, statut='écriture au-delà de la taille finale du contexte'))
for nom, rows in (('Portfolio complet', P), ('Bossimé complet', R)):
    b, g = lev_courts(rows)
    lev.append(dict(id='court-' + nom[:4].lower(), ordre=4, levier='Plafonner chaque agent à 40 réponses, relais par un agent neuf', perimetre=nom, base=round(b, 2), gain=round(g, 2), part=round(g / b * 100) if b else 0, statut='relecture des agents de plus de 40 réponses'))
b, g = lev_revision(R)
lev.append(dict(id='revision', ordre=5, levier='Réviser seulement les points de la revue, sans refaire toute la QA', perimetre='Bossimé complet', base=round(b, 2), gain=round(g, 2), part=round(g / b * 100) if b else 0, statut='révisions de plus de 40 réponses'))
json.dump(lev, open(os.path.join(OUT, 'leviers.json'), 'w'), ensure_ascii=False, indent=0)
for r in cats: print(r['categorie'], r['cout'], r['part_ecriture'], r['part_relecture'], r['part_reflexion'], r['part_production'], r['reponses'], r['contexte_par_reponse'])
for r in lev: print(r)

# --- Comparaison avant / après : une ligne par restaurant, indicateurs de mécanisme ---
for a in lignes:
    a['contexte_par_reponse'] = round(a['jetons_relecture'] / a['appels']) if a['appels'] else None
json.dump(lignes, open(os.path.join(OUT, 'agents.json'), 'w'), ensure_ascii=False, indent=0)
RESTOS = [('Les Potes au Feu', 1, 'avant'), ("L'Atelier de Bossimé", 2, 'avant')] + [(n, 3 + i, 'après') for i, n in enumerate(RESTOS_GEN)]  # RESTOS_GEN est trié par rang
restos = []
for nom, rang, phase in RESTOS:
    s = [a for a in lignes if a['groupe'] == nom]; est = any(a['source'] == 'estimé' for a in s)
    c = collections.Counter()
    for a in s:
        c['cout'] += a['cout']
        for n, _ in NATURES: c['n_' + n] += a['cout_' + n]
        c['t_' + CLE_T[a['tache']]] += a['cout']; c['v_' + a['chantier'].split('· ')[1]] += a['cout']
        if not est:
            c['reponses'] += a['appels']; c['relu'] += a['jetons_relecture']; c['cmd'] += a['car_commandes']; c['img'] += a['images']
    ag = [a for a in s if a['appels'] and a['tache'] != 'Orchestration']
    row = dict(restaurant=nom, rang=rang, phase=phase, source='estimé' if est else 'mesuré', cout=round(c['cout'], 2), cout_par_site=round(c['cout'] / 3, 2),
               **{('site_' + v): round(c['v_' + v], 2) for v in ('portfolio', 'awwwards', 'legacy', 'commun')},
               **{('n_' + n): round(c['n_' + n], 2) for n, _ in NATURES},
               **{('t_' + k): round(c['t_' + k], 2) for k in CLE_T.values()},
               agents=None if est else len(ag), reponses=None if est else c['reponses'],
               max_reponses=None if est else max(a['appels'] for a in ag),
               agents_plus_40=None if est else sum(1 for a in ag if a['appels'] > 40),
               contexte_par_reponse=None if est else round(c['relu'] / c['reponses']),
               cout_par_agent=None if est else round(sum(a['cout'] for a in ag) / len(ag), 2),
               sorties_commandes=None if est else int(c['cmd']), images=None if est else int(c['img']))
    restos.append(row)
json.dump(restos, open(os.path.join(OUT, 'restos.json'), 'w'), ensure_ascii=False, indent=0)
for r in restos: print(r)

# --- Phases : avant (restaurants 1-2), après (3-4, méthode sobre), après 2 (5, tests A B C), après 3 (6, tests D H) ---
PHASE_DE = {1: 'Avant', 2: 'Avant', 3: 'Après', 4: 'Après', 5: 'Après 2', 6: 'Après 3', 7: 'Après 4', 8: 'Après 4', 9: 'Après 4', **{r: 'Après 4' for r in range(10, 15)}, **{r: 'Après 5' for r in range(15, 21)}}  # 10-14 : même configuration que 7 à 9 ; 15-20 : hook de lecture (10/11)
DESC_PHASE = {'Avant': 'tout sur Fable puis Opus, agents longs', 'Après': 'méthode sobre : modèle par rôle, agents courts, captures Haiku, révision ciblée',
              'Après 2': 'tests A B C : leçons et prompts allégés, revue 2 conditionnelle, legacy sur Sonnet',
              'Après 3': 'tests D H : effort réduit, portfolio et révisions sur Sonnet',
              'Après 4': 'configuration figée et test I : awwwards sur Sonnet sauf les animations, lectures regroupées',
              'Après 5': 'configuration Après 4 et hook PreToolUse refusant cat > 200 lignes et sed -n > 120 lignes'}
phases = []
for i, ph in enumerate(['Avant', 'Après', 'Après 2', 'Après 3', 'Après 4', 'Après 5']):
    rs = [r for r in restos if PHASE_DE.get(r['rang']) == ph]
    if not rs: continue
    mes = [r for r in rs if r['source'] == 'mesuré']
    moy = lambda k, src=rs: round(sum(r[k] for r in src) / len(src), 2) if src else None
    row = dict(phase=ph, ordre=i, description=DESC_PHASE[ph], restaurants=', '.join(r['restaurant'] for r in rs), nb_restaurants=len(rs),
               estime=any(r['source'] == 'estimé' for r in rs), cout=moy('cout'), cout_par_site=moy('cout_par_site'),
               **{k: moy(k) for k in rs[0] if k.startswith(('site_', 'n_', 't_'))},
               **{k: (round(sum(r[k] for r in mes) / len(mes)) if mes else None) for k in ('reponses', 'contexte_par_reponse', 'max_reponses', 'agents_plus_40', 'sorties_commandes', 'images', 'agents')},
               cout_par_agent=moy('cout_par_agent', mes))
    phases.append(row)
base = phases[0]['cout_par_site']
for p in phases:
    p['baisse_vs_avant'] = round((1 - p['cout_par_site'] / base) * 100, 1)
for a, b in zip(phases, phases[1:]):
    b['baisse_vs_precedente'] = round((1 - b['cout_par_site'] / a['cout_par_site']) * 100, 1)
phases[0]['baisse_vs_precedente'] = None
json.dump(phases, open(os.path.join(OUT, 'phases.json'), 'w'), ensure_ascii=False, indent=0)
for p in phases: print(p['phase'], p['restaurants'], p['cout'], p['cout_par_site'], p['baisse_vs_avant'], p['baisse_vs_precedente'], p['contexte_par_reponse'], p['n_ecriture'], p['n_relecture'], p['t_construction'], p['t_revue'], p['t_revision'], p['sorties_commandes'])
