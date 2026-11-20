# Bilan de la campagne test-2

Campagne `test-2` (suite du lot 2, run 2 « Test des agents · lot 2 ») : développement en approche 7 (workflow), correction en approche 5 (marqueur conditionné à la lecture des planches), mode figé (`lecons=false`), `parallele_max` 4, arrêt à « tout fini » ou à 26 % d'utilisation hebdomadaire, heure limite 2026-11-21 15:00 UTC.
Session mère : `session_01CZvTL9ioGvrHi95nWqaY9y`. Sources de ce bilan : `sessions.json` (registre), `interventions.json`, `campagne-debut.json`, `stockage.json`, les `*-resume.json` et les comptes rendus des sessions. Les `*-detail.json` n'ont pas été relus ici : ils font foi pour les coûts recalculés.

## Heures et utilisation hebdomadaire

| | Valeur |
| --- | --- |
| Début (premières sessions) | 2026-11-20 15:55 UTC |
| Fin (dernier compte rendu) | 2026-11-20 22:28 UTC, soit 6 h 33 |
| Utilisation hebdomadaire au début | 0,01 |
| Utilisation hebdomadaire à la fin | 0,23 |
| Écart | +22 points pour environ 201 $ de coût API (registre), soit à peu près 9 $ par point |
| Limite de 5 h | atteinte une fois vers 18:00, avec réinitialisation à 20:50 (environ 2 h 50 d'arrêt pour 4 développements) |

La campagne s'est arrêtée parce que tout était fini. Le seuil de 26 % n'a pas été atteint.

## Restaurants

8 restaurants terminés sur 8 (24 sites) : tous ceux que test-1 n'avait pas lancés.

| Restaurant | Développement (registre) | Durée dév. | Correction | Durée corr. | Problèmes trouvés / corrigés |
| --- | --- | --- | --- | --- | --- |
| don-dino | 18,23 $ | 89 min | 0,97 $ | 16 min | 8 / 7 (passe 2 sur portfolio) |
| philfa | 16,59 $ | 81 min | 0,51 $ | 8 min | 3 / 3 |
| panorama-citadelle | 19,15 $ | 87 min | 0,66 $ | 11 min | 13 / 13 |
| carre-d-herbes | 17,92 $ | 91 min | 0,61 $ | 10 min | 4 / 4 |
| champs-elysees | 21,27 $ | 270 min | 0,44 $ | 12 min | 5 / 5 |
| be-belge | 17,41 $ | 242 min | 0,74 $ | 12 min | 7 / 5 (passe 2 sur portfolio) |
| brasserie-edgard | 21,65 $ | 278 min | 0,73 $ | 12 min | 4 / 4 |
| el-greco | 19,41 $ | 250 min | 0,92 $ | 12 min | 14 / 14 |
| **Total** | **151,63 $** (18,95 $ par restaurant) | 86 min hors coupure | **5,58 $** (0,70 $ par restaurant) | 12 min en moyenne | **58 / 55** |

Les 4 développements de plus de 240 minutes ont été coupés par la limite de 5 h vers 18:00 et relancés à 20:57. Sans la coupure, ils auraient duré entre 80 et 95 minutes, comme les 4 premiers.

- **Pilotage (session mère) :** 43,46 $. C'est le cumul `get_session` (64,03 $) moins le relevé de pilotage de test-1 (20,57 $). Cela inclut le travail sur le stockage Vercel fait entre les deux campagnes. `mere-detail.json` couvre tout le transcript, donc les deux campagnes.
- **Total de la campagne :** 200,67 $ selon le registre.

**Abandonnés :** aucun. **Non lancés :** aucun.

## Vérification de fin (5-verification.md, 22:30 UTC)

- **En ligne :** 24 sites sur 24 ont `footer=1` et `a_confirmer=0`.
- **Scan des libellés de brouillon :** 0 partout.
- **Page de suivi :** `node scripts/suivi.mjs` affiche 100 %, avec 15 gabarits sur 15 et 60 variantes sur 60. La page régénérée est commitée sur la branche de travail, mais pas publiée (voir Stockage).
- **Publication finale :** `scripts/publier.sh "fin de campagne test-2"` a répondu « rien à publier » (dist/ identique à `origin/publication`). Au moment du contrôle, le déploiement de brasserie-edgard (`0e91a4e4`) était encore en construction.

## Stockage

| | Début (15:56) | Fin (22:35) |
| --- | --- | --- |
| Poids de `dist/` | 412 Mo, 6 333 fichiers | 544 Mo, 7 887 fichiers |
| Déploiements conservés | 4 READY | 12 (11 READY et 1 en construction) |
| Estimation | environ 1 648 Mo, 32 % du budget de 5 Go | environ 6 528 Mo, 127 % du budget (**alerte**) |
| Publications | — | 8 pendant la campagne (une par correction), 0 par la session mère |

L'estimation est haute : elle compte une copie complète de `dist/` par déploiement. 4 des déploiements conservés sont antérieurs à la campagne (05:23 à 07:22 UTC) et doivent être purgés par la rétention d'un jour. Le budget de la campagne se révèle inadapté : 8 publications de plus de 500 Mo suffisent à le dépasser. Il faut l'arbitrer avant la prochaine campagne (rétention, une seule publication par lot, ou allègement de `dist/`).

## Interventions de la session mère

Le détail est dans `interventions.json`.

1. **17:16 · philfa (développement) :** le workflow avait laissé des fichiers source de philfa-portfolio non commités. J'ai demandé de les commiter avant de lancer la correction.
2. **20:57 · champs-elysees, be-belge, brasserie-edgard, el-greco (développement) :** les sessions avaient été coupées par la limite de 5 h. Leur tâche de reprise automatique a tiré avant la réinitialisation et a échoué. Je les ai relancées par message, avec `resumeFromRunId`. Les quatre ont abouti.

## Anomalies

- **Reprise automatique inefficace :** une session coupée par la limite de 5 h programme sa reprise, mais celle-ci peut tirer avant la réinitialisation. Il faut une relance externe ou une reprise programmée à l'heure `resetsAt`.
- **Stockage Vercel au-delà du budget** en fin de campagne (voir Stockage).
- **Workflow de développement :** des fichiers source sont restés non commités (philfa).
- **Corrections :** plusieurs agents d'identification ont tourné moins de 40 secondes (par exemple brasserie-edgard portfolio 34 s et legacy 39 s) et trouvé peu de problèmes. Il reste 3 problèmes non corrigés : 1 sur don-dino portfolio, 1 sur be-belge portfolio et 1 sur be-belge legacy. Ils sont détaillés dans `data/review/<slug>/`.
- **Couvertures inégales :** la couverture de philfa/legacy est de 1 page sur 1 (site d'une seule page). Les couvertures sont plus complètes qu'en test-1 (desktop et mobile).
- **Secret :** la clé API Google Maps du site actuel d'el-greco a été commitée en clair, puis masquée. Elle reste dans l'historique git. **C'est au porteur de trancher** (révocation de la clé par le restaurant ou réécriture de l'historique).

## Fichiers de mesure

- **Complétude :** les 8 restaurants ont leurs 7 fichiers (`dev-detail`, `dev-commandes`, `dev-resume`, `corr-detail`, `corr-commandes`, `corr-phases`, `corr-resume`).
- **Champs manquants :**
  - `hebdo_fin` est absent dans `brasserie-edgard/corr-resume.json` (la session mère a relevé 0,22 puis 0,23).
  - `hebdo_debut` est absent dans `panorama-citadelle/corr-resume.json`.
- **Fichiers de campagne :** `sessions.json` (17 entrées : 8 développements, 8 corrections, le pilotage), `interventions.json`, `campagne-debut.json`, `stockage.json`, `mere-detail.json` et `lecons-proposees/` (8 fichiers).
