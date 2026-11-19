# Étape 4 — Vérifier et clore une campagne

## Contrôles automatiques (session mère, fin de campagne)

Une seule commande pour tous les sites de la campagne (remplacer la liste des slugs) :

```bash
scripts/q.sh verif-campagne bash -c 'for s in <slug1> <slug2>; do for v in portfolio awwwards legacy; do c=$(curl -s --retry 10 --retry-delay 10 --retry-all-errors https://kyw-test-restaurant.vercel.app/$s/$v/); echo "$s/$v footer=$(echo "$c" | grep -c kyw-footer) a_confirmer=$(echo "$c" | grep -ci "à confirmer")"; done; done'
```

Attendu : `footer=1` et `a_confirmer=0` partout. Un site qui sert encore l'ancienne version attend son tour dans la file
Vercel : la publication suivante (ou un commit `[publier]` final de la session mère) l'emporte.

Puis : `python3 scripts/scan-brouillon.py /tmp/claude-0/scan-campagne.json <slug1> <slug2> | grep '###'` (0 attendu),
`node scripts/suivi.mjs` (page de suivi), commit de `data/suivi.html` et `dist/suivi/`.

## Publication Vercel

- Vercel ne déploie qu'un push dont le **dernier** commit contient `[publier]` (`vercel.json`, `ignoreCommand`).
  Chaque déploiement copie tout `dist/` (~300 Mo) et le stockage gratuit est de 10 Go : un `[publier]` par
  restaurant et par étape, pas davantage.
- Le mot est cherché dans tout le message : ne pas l'écrire dans un commit de mesures ou de documentation.

## Relecture humaine

Le porteur ouvre les 3 sites de chaque restaurant en écran et sur téléphone et note ce qui ne va pas. C'est le juge
final de la qualité ; ses remarques vont dans `interventions` (`4-mesure.md`) et, si elles révèlent un défaut
structurel des agents, dans `agents/lecons/<rôle>.md` et dans `VERSIONS.md` (« Faiblesses connues »).

## Valeurs à faire confirmer par le restaurant

Les agents ne retirent ni n'inventent un horaire, un prix, un jour ou un nom sans source : ils les gardent et les
signalent « à vérifier » (colonne décision `a_verifier` de `sites/<slug>-<v>/CORRECTION-1.md`, champ des
`data/review/<slug>/<v>.json`). Les regrouper par restaurant avant tout envoi au client :

```bash
grep -h "a_verifier" sites/<slug>-*/CORRECTION-1.md
```
