# Étape 4 — Vérifier et clore une campagne

## Contrôles automatiques (session mère, fin de campagne)

Une seule commande pour tous les sites de la campagne (remplacer la liste des slugs) :

```bash
scripts/q.sh verif-campagne bash -c 'for s in <slug1> <slug2>; do for v in portfolio awwwards legacy; do c=$(curl -s --retry 10 --retry-delay 10 --retry-all-errors https://kyw-test-restaurant.vercel.app/$s/$v/); echo "$s/$v footer=$(echo "$c" | grep -c kyw-footer) a_confirmer=$(echo "$c" | grep -ci "à confirmer")"; done; done'
```

Attendu : `footer=1` et `a_confirmer=0` partout. Un site qui sert encore l'ancienne version attend son tour dans la file
Vercel ; la publication finale ci-dessous l'emporte.

Puis : `python3 scripts/scan-brouillon.py /tmp/claude-0/scan-campagne.json <slug1> <slug2> | grep '###'` (0 attendu),
`node scripts/suivi.mjs` (page de suivi), commit de `data/suivi.html` et `dist/suivi/`.

## Publication Vercel

- Seule la branche `<branche-publication>` (`publication`) déploie (`vercel.json`). La branche de travail ne publie
  jamais, quel que soit le message de commit.
- Chaque déploiement conservé garde une copie complète de `dist/` (~430 Mo) ; le stockage gratuit est de 10 Go et la
  campagne s'en donne `<budget-stockage>` : **au plus une publication par restaurant terminé**, faite par sa session de
  correction (`scripts/publier.sh`), plus une **publication finale du lot** par la session mère :
  `scripts/publier.sh "fin de campagne <campagne>"`. Le script ne publie rien si `dist/` n'a pas changé depuis la dernière
  publication (jamais de publication vide ni double) et fusionne `publication` en cas de refus.
- Le développement ne publie jamais : il vérifie ses sites en local (`2-developpement.md`, étape 3).

## Stockage

`scripts/q.sh stockage scripts/stockage.sh <budget-stockage> <seuil-stockage> <déploiements READY>` : poids et nombre de
fichiers de `dist/`, estimation du stockage occupé par les déploiements conservés, alerte (code 2) au-delà du seuil.
Le nombre de déploiements conservés se lit avec l'outil Vercel en lecture seule (`list_deployments` du projet
`kyw-test-restaurant`, état `READY`) ; sans outil Vercel, lancer le script sans ce nombre et noter « non vérifié ».

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
