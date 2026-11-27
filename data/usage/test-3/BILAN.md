# Bilan de la campagne test-3 (lot 6, 30 restaurants avec site)

Session mère `session_01CZvTL6uswtJDjQGPd3Wex5`. Versions : développement A7 (Opus 5.5, workflow), correction A5 (Haiku 5.5). Mode figé. `parallele_max` 4.
Début 07:46 UTC, heure limite 10:55 UTC, clôture 12:25 UTC (la session mère a elle-même été suspendue par la limite de 5 h de ~10:30 à 12:20).

## Restaurants

| Restaurant | État | Dév. | Corr. | Total | Durée | Publication |
| --- | --- | --- | --- | --- | --- | --- |
| bienvenue-chez-vous | publié | 17,87 $ | 1,08 $ | 18,95 $ | 07:46 → 09:10 (84 min) | 86e6d42c |
| mon-epi | publié | 19,17 $ | 0,72 $ | 19,89 $ | 07:46 → 09:23 (97 min) | 8fdc77d4 |
| bergerie-lives | publié | 18,58 $ | 0,87 $ | 19,44 $ | 07:46 → 09:23 (97 min) | d92510d2 |
| ne5t | publié | 19,96 $ | 0,66 $ | 20,62 $ | 07:46 → 09:34 (108 min) | de4294ad |
| novobel | abandonné en développement (limite 5 h) | 19,20 $ | — | 19,20 $ | 09:10 → ~12:12 | — (sites partiels commités : 159 sources, 163 dist) |
| oh-la-vache | abandonné en développement (limite 5 h) | 14,92 $ | — | 14,92 $ | 09:24 → 11:25 | — (rien de poussé) |
| dumont-bouge | abandonné en développement (limite 5 h) | 13,62 $ | — | 13,62 $ | 09:24 → 11:26 | — (sites partiels commités : 141 sources, 116 dist) |
| bayti | abandonné en développement (limite 5 h) | 13,92 $ | — | 13,92 $ | 09:34 → 11:36 | — (rien de poussé) |
| 22 autres (loco-lunch → brasserie-entre-nous) | non lancés | | | | | |

Coûts : `usage.cost_usd` de `get_session` (fichiers `*-detail.json` présents pour les 4 terminés, absents pour les 4 abandonnés).
- 4 restaurants terminés : 78,90 $, soit **19,73 $ par restaurant, 6,58 $ par site** (développement 18,90 $, correction 0,83 $ en moyenne).
- 4 développements abandonnés : 61,66 $ (dépensés sans site publié).
- Session mère : 6,21 $. **Total campagne : 146,77 $.**

## Utilisation
- Hebdomadaire : 0,59 au début (07:44), 0,71 à 09:47 ; réinitialisée à 11:00 UTC, valeur de fin non mesurable. 12 points pour ~100 $ dépensés à 09:47, cohérent avec l'estimation de `limite-hebdo.json` (~790 $ la semaine) : **un restaurant ≈ 2,5 % de la limite hebdomadaire** (2,1 à 2,8 %).
- Fenêtre de 5 h : 0,07 (07:44) → 0,50 (08:55) → 0,80 (09:47) → épuisée vers 11:25 ; c'est elle qui a arrêté la campagne, pas la limite hebdomadaire. Avec 4 sessions Opus en parallèle, une fenêtre de 5 h ≈ 140 $ ≈ 7 restaurants.

## Interventions (`interventions.json`)
1. mon-epi : sources de la révision legacy non commitées par le workflow → commit demandé à la session de développement (597b5e82).
2. bergerie-lives : 2 CSS `_astro` référencés et rapports non commités → commit demandé (f86bceba).
3. Consigne préventive (git status et commit des fichiers du restaurant en fin de workflow) envoyée aux 5 développements suivants. ne5t n'avait rien à commiter.
4. Fin : aucune relance des 4 développements coupés (heure limite passée).

## Anomalies
- **Défaut du workflow A7** : fichiers de fin de workflow non commités (2 cas sur 4 terminés). À corriger dans le workflow (commit des sources de révision et de tout `dist/<slug>` avant la fin).
- Sorties hors `q.sh` encore massives chez les agents (mon-epi 1,2 M caractères, ne5t 1,17 M, 52-54 refus du hook) ; le curl de la vérification prescrite (étape 3 du message de développement) est refusé par le hook même dans `q.sh bash -c`.
- Corrections : relectures après correction partielles (bienvenue-chez-vous, bergerie-lives) ; mon-epi awwwards 0 problème trouvé (à relire) ; restent signalés : bienvenue-chez-vous date mm/dd/yyyy (awwwards) et prix Box Tapas 199 € vs 174 € ; ne5t adresse Vauban 46 vs Allée de Menton 26.
- Restaurants qui n'en sont pas : mon-epi (boulangerie), bergerie-lives (maison d'hôtes / événements), ne5t (hôtel-spa avec restaurant).
- « à confirmer » vu en ligne à 09:24 sur mon-epi : déploiement en file, absent au contrôle de 09:35.

## Fichiers de mesure manquants
novobel, oh-la-vache, dumont-bouge, bayti : aucun fichier (`dev-*`) ; seul `usage` du registre fait foi. mon-epi correction : hebdo de début non relevé.

## Stockage
- Début : 3 déploiements READY, dist 544 Mo / 7 887 fichiers ; tableau de bord Vercel 1,76 Go / 10 Go.
- Fin : 7 déploiements READY, dist 637 Mo / 9 029 fichiers ; estimation du script 4,46 Go (87 % du budget de 5 Go, alerte), qui surestime (consigne du porteur : arrêt au-delà de 8 Go réels).
- Publications de la campagne : 4 (une par restaurant terminé). Publication finale du lot non faite : l'écart restant ne contient que les sites partiels non corrigés de novobel et dumont-bouge.

## Reste à faire
26 restaurants (78 sites), dont 4 entamés : estimation 26 × 19,73 ≈ 513 $, soit ≈ 65 % d'une limite hebdomadaire (57 à 73 %) et au moins 4 fenêtres de 5 h à 4 en parallèle.
