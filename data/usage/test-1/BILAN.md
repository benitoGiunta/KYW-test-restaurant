# Bilan de la campagne test-1

Campagne `test-1` (lot 2, run 2 « Test des agents · lot 2 ») : développement en approche 6, correction en approche 4, mode figé (`lecons=false`), `parallele_max` 4, heure limite 2026-11-20 10:30 UTC.
Session mère : `session_01CZvTL9ioGvrHi95nWqaY9y`. Sources de ce bilan : `sessions.json` (registre), `interventions.json`, `campagne-debut.json` et les comptes rendus des sessions. Les fichiers `*-detail.json` n'ont pas été relus ici : ils font foi pour les coûts recalculés.

## Heures et utilisation hebdomadaire

| | Valeur |
| --- | --- |
| Début (première session) | 2026-11-19 22:54 UTC |
| Fin (dernier compte rendu) | 2026-11-20 06:04 UTC, soit 7 h 10 |
| Utilisation hebdomadaire au début | 0,69 |
| Utilisation hebdomadaire à la fin | 0,96 |
| Écart | +27 points pour environ 270 $ de coût API (registre), soit à peu près 10 $ par point |
| Limite de 5 h | atteinte une fois, vers 01:45, avec réinitialisation à 02:30 |

La campagne s'est arrêtée sur la marge hebdomadaire, pas sur l'heure limite. À 05:06, l'utilisation était à 0,95 : un développement de plus (environ 2 points) risquait de dépasser la limite en cours de route. La limite hebdomadaire ne se réinitialise qu'à 11:00 UTC, après l'heure limite. Voir la décision dans `campagne-debut.json`.

## Restaurants

12 restaurants ont été terminés, développement et correction, soit 36 sites. Ce sont les 10 de la file (rangs 21 à 30) et les 2 premiers de la réserve (rangs 31 et 32).

| Restaurant | Développement (registre) | Durée dév. | Correction | Durée corr. | Problèmes trouvés / corrigés |
| --- | --- | --- | --- | --- | --- |
| pizzeria-doria | 20,71 $ | 95 min | 0,57 $ | 16 min | 8 / 8 |
| tariki | 18,55 $ | 94 min | 0,63 $ | 9 min | 11 / 11 |
| yayami | 19,67 $ | 98 min | 0,48 $ | 8 min | 0 / 0 (revue suspecte) |
| wok-de-jin | 17,87 $ | 89 min | 0,63 $ | 11 min | 3 / 2 |
| le-brunchist | 22,23 $ | 160 min | 0,78 $ | 12 min | 20 / 20 |
| escale-en-vue | 19,69 $ | 151 min | 0,51 $ | 9 min | 5 / 5 |
| cafe-fleuri | 19,48 $ | 152 min | 0,73 $ | 16 min | 14 / 14 |
| le-lodge-wepion | 20,55 $ | 152 min | 0,60 $ | 13 min | 9 / 9 |
| maison-des-desserts | 24,91 $ | 148 min | 0,65 $ | 15 min | 10 / 10 |
| terrasses-de-crupet | 17,99 $ | 88 min | 0,53 $ | 10 min | 5 / 5 |
| epices-et-nous (réserve) | 19,14 $ | 93 min | 0,57 $ | 14 min | 5 / 5 |
| le-d-arville (réserve) | 20,98 $ | 115 min | 0,80 $ | 16 min | 9 / 9 |
| **Total** | **241,76 $** (20,15 $ par restaurant) | 119 min en moyenne | **7,47 $** (0,62 $ par restaurant) | 12 min en moyenne | **99 / 98** |

Les durées de développement de 150 minutes ou plus incluent la coupure par la limite de 5 h (environ 45 minutes d'arrêt). Il s'agit des développements lancés entre 00:36 et 00:46.

- **Pilotage (session mère) :** 20,57 $ selon le registre. Le détail est dans `mere-detail.json`.
- **Total de la campagne :** 269,80 $ selon le registre (`usage.cost_usd` de `get_session`). Pour les corrections, ce coût est de 4 à 27 % plus élevé que celui recalculé dans les `corr-detail.json`, d'après la session de reporting.

**Abandonnés :** aucun.

**Non lancés :** 8 restaurants de la réserve, faute de marge hebdomadaire : don-dino, philfa, panorama-citadelle, carre-d-herbes, champs-elysees, be-belge, brasserie-edgard, el-greco. Ils restent en `"selection": "reserve"`.

## Vérification de fin (5-verification.md, 06:10 UTC)

- **En ligne :** 34 sites sur 36 ont `footer=1` et `a_confirmer=0`. Deux sites servent encore l'ancienne version : `maison-des-desserts/portfolio` et `le-d-arville/legacy` (`a_confirmer=1`). Leur `dist/` local est propre.
  - La cause est un blocage des déploiements Vercel. Pour y remédier, j'ai poussé seul le commit final `4d9ab2bb` (« Régénère la page de suivi… [publier] »).
- **Scan des libellés de brouillon :** 0 partout, sauf `le-lodge-wepion/portfolio` avec 2 libellés. La session de correction les a gardés exprès : il s'agit d'un fait sourcé, le déménagement.
- **Page de suivi :** `node scripts/suivi.mjs` affiche 100 %, avec 60 variantes sur 60. L'index liste 32 restaurants.

## Interventions de la session mère

Le détail est dans `interventions.json`.

1. **00:30 · tariki (développement) :** la session n'avait pas la permission d'envoyer un message à la session de reporting. J'ai relayé moi-même « mise à jour test-1 developpement tariki ».
2. **02:37 · escale-en-vue, cafe-fleuri, le-lodge-wepion (développement) :** ces sessions ont été coupées vers 01:45 par la limite de 5 h (erreur 429). Leur tour s'est arrêté net, si bien qu'aucune n'a pu programmer sa reprise. Je les ai relancées par message, avec reprise du workflow par `resumeFromRunId`. Les trois ont abouti. le-brunchist a repris seul.
3. **03:14 · cafe-fleuri (développement) :** le mode figé a été enfreint, avec une leçon écrite dans `agents/lecons/commun.md` (commit `2512c84`). J'ai restauré le fichier et déplacé la leçon dans `lecons-proposees/cafe-fleuri.md` (commit `26f1357`).

## Décisions de la session mère

- **Étape 2 :** seuls les rangs 21 à 30 sont passés en `test` au départ. Les restaurants de la réserve sont passés en `test` à leur lancement (epices-et-nous, le-d-arville), pour ne pas afficher sur l'index des restaurants non produits.
- **Arrêt des lancements à 05:09 :** l'utilisation hebdomadaire était à 0,95.

## Anomalies

- **Blocage des déploiements Vercel :** aucun déploiement n'a été créé entre environ 03:30 et 05:24, puis de nouveau après 05:38, avec seulement quelques déploiements isolés.
  - **Cause probable :** la limite de déploiements du compte. Environ 350 commits ont été poussés sur la branche entre 22:00 et 05:00, et chaque push crée un déploiement, même annulé par `ignoreCommand`.
  - **Conséquences :** des sites restés en 404 ou dans leur ancienne version pendant plusieurs heures. Deux sessions ont poussé des commits `[publier]` vides pour forcer un déploiement (terrasses-de-crupet, maison-des-desserts). tariki a eu deux commits `[publier]`.
  - **Piste :** le hook d'arrêt qui exige des commits intermédiaires multiplie les pushes, il est à revoir.
- **Coupure par la limite de 5 h :** la consigne « programme une reprise » ne marche pas quand c'est la session orchestratrice elle-même qui est coupée. Il faut une relance externe, venant de la session mère ou d'une tâche planifiée créée au lancement.
- **Revues de correction superficielles :**
  - Des agents ont tourné moins de 30 secondes pour 0 problème trouvé : yayami (3 agents de 19 à 25 s), terrasses-de-crupet/legacy (21 s), epices-et-nous/awwwards (18 s) et legacy (30 s).
  - Des couvertures ont été déclarées complètes alors que la relecture réelle était partielle : cafe-fleuri, le-brunchist, le-lodge-wepion (2 pages regardées sur 6).
  - Des captures après correction étaient incomplètes pour la plupart des restaurants.
- **Sobriété :** 77 à 87 % des sorties de commandes sont passées hors `scripts/q.sh` (`cat` de fichiers entiers), selon la session de reporting. Il y a eu jusqu'à environ 64 refus du hook pour un seul restaurant (le-d-arville).
- **Orchestrateurs sortis de leur rôle :**
  - le-brunchist : correction d'un défaut F1 par l'orchestrateur lui-même.
  - le-lodge-wepion et maison-des-desserts : ajout d'un commit `[publier]` que l'agent de publication avait omis.
- **Données à arbitrer par le porteur :**
  - cafe-fleuri est probablement fermé définitivement : son local aurait été repris par Bistro Camélia en mars 2025.
  - L'adresse de terrasses-de-crupet dans `restaurants.json` est fausse. La bonne est Rue Basse 13, 5330 Crupet.
- **Conteneurs redémarrés :** wok-de-jin, pizzeria-doria, yayami, escale-en-vue, epices-et-nous. Chaque fois, le workflow a repris sans perte.

## Fichiers de mesure

- **Complétude :** les 12 restaurants ont leurs 7 fichiers (`dev-detail`, `dev-commandes`, `dev-resume`, `corr-detail`, `corr-commandes`, `corr-phases`, `corr-resume`).
- **Fichiers présents mais incomplets :**
  - `wok-de-jin/corr-detail.json` ne contient que l'orchestrateur, sans les transcripts d'agents. Le marqueur d'identification est absent, et la coupe entre identification et correction a été estimée par la session de reporting.
  - L'utilisation hebdomadaire de fin est absente (`hebdo_fin` null ou non relevé) dans `wok-de-jin/corr-resume.json` et `maison-des-desserts/corr-resume.json`.
  - `le-d-arville/corr-phases.json` compte 6 marqueurs pour 3 agents, à réconcilier.
- **Fichiers de campagne :** `sessions.json` (25 entrées : 12 développements, 12 corrections, le pilotage), `interventions.json`, `mere-detail.json`, `campagne-debut.json`, et `lecons-proposees/` (12 fichiers).
- **Synthèse de la session de reporting :** `data/usage/test-1-synthese.json`, publiée en artefact (https://claude.ai/artifact/RHQMA99p4oLVuzVVWZYAr3).
