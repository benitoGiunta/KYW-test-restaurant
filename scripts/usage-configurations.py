#!/usr/bin/env python3
"""Tableau des configurations successives (une ligne par phase) et de leur conformité observée (une ligne par restaurant).
Usage : python3 scripts/usage-configurations.py <dossier chantiers> <conformite.json brut> <dossier de sortie>
Entrées : phases.json (usage-chantiers.py) et la sortie de usage-conformite.py. Sorties : configurations.json, conformite.json."""
import json, sys, os
CH, CONF, OUT = sys.argv[1:4]
phases = {p['phase']: p for p in json.load(open(os.path.join(CH, 'phases.json')))}
# Configuration prévue de chaque phase (workflow et consignes en place au lancement, relus dans l'historique git)
CFG = [
 dict(phase='Avant', portfolio='Fable / Opus', awwwards='Fable / Opus', legacy='Fable / Opus', revue='Opus', revision='Opus', captures='modèle de l’agent',
      agents='longs, sans plafond', revue2='toujours', lecons='complètes', effort='par défaut', lectures='libres', nouveaute='Point de départ'),
 dict(phase='Après', portfolio='Opus', awwwards='Opus', legacy='Opus', revue='Sonnet', revision='Opus', captures='Haiku',
      agents='courts, 40 réponses', revue2='toujours', lecons='complètes', effort='par défaut', lectures='libres', nouveaute='Méthode sobre : modèle par rôle, agents courts, captures Haiku, révision ciblée'),
 dict(phase='Après 2', portfolio='Opus', awwwards='Opus', legacy='Sonnet', revue='Sonnet', revision='Opus', captures='Haiku',
      agents='courts, 40 réponses', revue2='si F0 ou F1', lecons='par rôle, prompts par phase', effort='par défaut', lectures='libres', nouveaute='Tests A, B, C'),
 dict(phase='Après 3', portfolio='Sonnet', awwwards='Opus', legacy='Sonnet', revue='Sonnet', revision='Sonnet', captures='Haiku',
      agents='courts, 40 réponses', revue2='si F0 ou F1', lecons='par rôle, prompts par phase', effort='réduit', lectures='libres', nouveaute='Tests D, H'),
 dict(phase='Après 4', portfolio='Sonnet', awwwards='Sonnet, animations Opus', legacy='Sonnet', revue='Sonnet', revision='Sonnet', captures='Haiku',
      agents='courts, 40 réponses', revue2='si F0 ou F1', lecons='par rôle, prompts par phase', effort='réduit', lectures='regroupées (consigne)', nouveaute='Test I, regroupement des lectures'),
]
NOM = {'partage': 'Partage', 'brasserie-du-quai': 'La Brasserie du Quai', 'chez-guillaume': 'Chez Guillaume', 'dolce-vita-wepion': 'La Dolce Vita',
       'le-royal': 'Le Royal', 'incorrect': 'Incorrect', 'l-essentiel': 'L’Essentiel', 'ferme-blanche-d-asie': 'La Ferme Blanche d’Asie', 'le-felicien': 'Le Félicien', 'grill-des-amis': 'Le Grill des amiS', 'le-54': 'Le 54', 'le-ponti-2': 'Le Ponti 2'}
PH = {3: 'Après', 4: 'Après', 5: 'Après 2', 6: 'Après 3', 7: 'Après 4', 8: 'Après 4', 9: 'Après 4', **{r: 'Après 4' for r in range(10, 21)}}
conf = json.load(open(CONF)); conformite = []
for c in conf:
    rv = c['revues']; b = [r['conforme_b'] for r in rv if r['conforme_b'] is not None]
    conformite.append(dict(rang=c['rang'], restaurant=NOM.get(c['restaurant'], c['restaurant']), phase=PH.get(c['rang']), agents=c['agents'],
        ecarts_modeles=len(c['modeles_ecarts']), lecons_par_role=bool(c['consignes'].get('lecons_par_role')),
        revue2_lancees=sum(r['revue2'] for r in rv), revue2_utiles=sum(r['revue2'] and (r['f0f1_revue1'] or 0) > 0 for r in rv),
        test_b=(f"{sum(b)}/{len(b)}" if b else 'non prévu'), f0f1_revue1=sum(r['f0f1_revue1'] or 0 for r in rv), f0f1_fin=sum(r['f0f1_fin'] or 0 for r in rv),
        reponses_max=c['reponses_max'], agents_plus_40=c['agents_plus_40'], bash_par_reponse=c['bash_par_reponse'], socle=c['socle'], sorties_commandes=c['sorties_commandes']))
lignes = []
for i, k in enumerate(CFG):
    p = phases[k['phase']]; cs = [c for c in conformite if c['phase'] == k['phase']]
    mesure = bool(cs)
    lignes.append(dict(k, ordre=i, restaurants=p['restaurants'], cout_par_site=p['cout_par_site'], site_portfolio=p['site_portfolio'], site_awwwards=p['site_awwwards'],
        site_legacy=p['site_legacy'], contexte_par_reponse=p['contexte_par_reponse'], max_reponses=p['max_reponses'], sorties_commandes=p['sorties_commandes'],
        baisse_vs_avant=p['baisse_vs_avant'], baisse_vs_precedente=p['baisse_vs_precedente'],
        ecarts_modeles=sum(c['ecarts_modeles'] for c in cs) if mesure else None,
        f0f1_fin=sum(c['f0f1_fin'] for c in cs) if mesure else None,
        socle=round(sum(c['socle'] for c in cs if c['socle']) / max(1, len([c for c in cs if c['socle']]))) if any(c['socle'] for c in cs) else None,
        conformite=('non mesurée' if not mesure else 'conforme' if all(c['ecarts_modeles'] == 0 for c in cs) else 'écarts')))
json.dump(lignes, open(os.path.join(OUT, 'configurations.json'), 'w'), ensure_ascii=False, indent=1)
json.dump(conformite, open(os.path.join(OUT, 'conformite.json'), 'w'), ensure_ascii=False, indent=1)
for l in lignes: print(l['phase'], l['cout_par_site'], l['conformite'], l['ecarts_modeles'], l['f0f1_fin'], l['socle'])
for c in conformite: print(c)
