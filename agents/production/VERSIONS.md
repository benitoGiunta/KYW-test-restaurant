# Versions des étapes

Les agents ont été mis au point sur les 20 premiers restaurants (phase « développement des agents », oct.-nov. 2026).
Chaque changement de méthode a reçu un numéro d'**approche**, mesuré par la session de reporting. La phase « test »
utilise les versions en vigueur ci-dessous **sans les modifier**, pour comparer leur coût et leur qualité réels.

## En vigueur

| Étape | Version | Ce qu'elle contient | Fichiers |
| --- | --- | --- | --- |
| Développement | **Approche 6** | Workflow sobre : recherche (Sonnet), construction en 3 agents par variante (portfolio et legacy Sonnet ; awwwards Sonnet / Opus pour l'animation / Sonnet), captures et publication Haiku, revues et révisions Sonnet, 40 réponses max par agent, garde-fou de lecture (hook) | `agents/workflow-restaurant.js`, `agents/*.md` (rôles), `agents/variante-*/`, `scripts/hooks/garde-lecture.py` |
| Correction | **Approche 4** | Orchestrateur Haiku ; captures par page avant les agents (`scripts/captures-pages.sh`, contrôle des bords) ; un agent Sonnet par site qui identifie, lance le marqueur, puis corrige ; `q.sh` et marqueur imposés par hooks ; couverture prouvée et relance « Passe 2 » ; aucun fait retiré ou inventé sans source | `3-correction.md`, `.claude/agents/identifier-rectifier-site.md`, `scripts/captures-pages.sh`, `scripts/capture-page.mjs`, `scripts/controle-bords.mjs`, `scripts/marqueur.sh`, `scripts/hooks/` |

Coût de référence mesuré (phase de développement, tarif API) : **développement 18,39 $ par restaurant**
(moyenne des restaurants 15 à 20), **correction 0,43 $ par restaurant** (moyenne des restaurants 14 à 20),
soit ≈ 18,8 $ par restaurant et ≈ 6,3 $ par site, ≈ 2,4 % d'une limite hebdomadaire (estimation 790 $ par limite,
`data/usage/limite-hebdo.json`).

## Mode figé (phase de test)

Avec `"lecons": false` (paramètre de campagne), le workflow saute l'étape Leçons et aucun agent ne modifie `agents/` :
les leçons sont seulement proposées dans `data/usage/<campagne>/lecons-proposees/<slug>.md`. La version reste donc
identique du premier au dernier restaurant de la campagne ; les leçons proposées sont revues ensuite, et intégrées
(nouvelle approche) si le porteur le décide.

## Faiblesses connues de ces versions (non corrigées, à observer pendant le test)

- Un agent de correction peut déclarer une couverture complète sans ouvrir toutes les planches (mesuré : 1 image lue pour 6 pages sur le-servais).
- Une écriture par `python3` ou redirection shell échappe au garde-fou du marqueur.
- La capture après correction est souvent omise.
- Le contrôle des bords ne voit pas `overflow: clip` ni les photos tournées : la lecture des planches reste nécessaire.

## Historique

| Approche | Développement (restaurants) | Correction (restaurants) |
| --- | --- | --- |
| 1 | point de départ, agents longs Fable/Opus (1-2) | revue séparée Sonnet puis correcteur, contexte complet (1-4) |
| 2 | méthode sobre : modèle par rôle, agents courts, captures Haiku (3-4) | agents projet légers, brouillons intégrés, configurations F et H (5-8) |
| 3 | tests A, B, C (5) | F + q.sh obligatoire, sorties sobres, capture ciblée (9-13) |
| 4 | tests D, H (6) | hooks q.sh et marqueur, captures par page, couverture, relance (14-20) |
| 5 | test I, lectures groupées (7-14) | — |
| 6 | hook de lecture (15-20) | — |

Détail et mesures : `data/usage/chantiers/configurations.json`, `data/usage/*PROTOCOLE*.md`, artefact de reporting.

## Faire évoluer une étape

1. Ne jamais modifier une version pendant qu'une campagne l'utilise : terminer ou arrêter la campagne d'abord.
2. Écrire le changement dans les fichiers de l'étape, puis ajouter une ligne à l'historique avec le **nouveau numéro
   d'approche** et mettre à jour le tableau « En vigueur ».
3. Mettre à jour le message de lancement concerné (`2-developpement.md` ou `3-correction.md`) et la ligne
   d'identification (« Approche : n ») pour que la mesure distingue l'ancienne et la nouvelle version.
4. Tester sur un seul restaurant avant une campagne.
5. Commit en français à l'impératif, sans le mot de publication Vercel.
