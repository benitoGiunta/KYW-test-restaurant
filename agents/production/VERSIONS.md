# Versions des étapes

Les agents ont été mis au point sur les 20 premiers restaurants (phase « développement des agents », oct.-nov. 2026).
Chaque changement de méthode a reçu un numéro d'**approche**, mesuré par la session de reporting. La phase « test »
utilise les versions en vigueur ci-dessous **sans les modifier**, pour comparer leur coût et leur qualité réels.

## En vigueur

| Étape | Version | Ce qu'elle contient | Fichiers |
| --- | --- | --- | --- |
| Développement | **Approche 7** | Approche 6 + seuils de lecture à 80 lignes (`cat`, `sed -n`, `head`, `tail`), orchestrateur cantonné à son rôle (aucune modification de contenu), reprise après coupure par tâche planifiée récurrente. Base (approche 6) : workflow sobre : recherche (Sonnet), construction en 3 agents par variante (portfolio et legacy Sonnet ; awwwards Sonnet / Opus pour l'animation / Sonnet), captures et publication Haiku, revues et révisions Sonnet, 40 réponses max par agent, garde-fou de lecture (hook) | `agents/workflow-restaurant.js`, `agents/*.md` (rôles), `agents/variante-*/`, `scripts/hooks/garde-lecture.py` |
| Correction | **Approche 5** | Approche 4 + couverture constatée : chaque planche lue est journalisée (`scripts/hooks/journal-lecture.py`) et `scripts/marqueur.sh` refuse la correction tant qu'une planche capturée n'a pas été lue ; seuils de lecture à 80 lignes ; orchestrateur cantonné à son rôle. Base (approche 4) : orchestrateur Haiku ; captures par page avant les agents (`scripts/captures-pages.sh`, contrôle des bords) ; un agent Sonnet par site qui identifie, lance le marqueur, puis corrige ; `q.sh` et marqueur imposés par hooks ; couverture prouvée et relance « Passe 2 » ; aucun fait retiré ou inventé sans source | `3-correction.md`, `.claude/agents/identifier-rectifier-site.md`, `scripts/captures-pages.sh`, `scripts/capture-page.mjs`, `scripts/controle-bords.mjs`, `scripts/marqueur.sh`, `scripts/hooks/` |

Approches 7 et 5 : pas encore mesurées (premier usage à la prochaine campagne). Coût de référence mesuré (approches 6 et 4, phase de développement, tarif API) : **développement 18,39 $ par restaurant**
(moyenne des restaurants 15 à 20), **correction 0,43 $ par restaurant** (moyenne des restaurants 14 à 20),
soit ≈ 18,8 $ par restaurant et ≈ 6,3 $ par site, ≈ 2,4 % d'une limite hebdomadaire (estimation 790 $ par limite,
`data/usage/limite-hebdo.json`).

## Mode figé (phase de test)

Avec `"lecons": false` (paramètre de campagne), le workflow saute l'étape Leçons et aucun agent ne modifie `agents/` :
les leçons sont seulement proposées dans `data/usage/<campagne>/lecons-proposees/<slug>.md`. La version reste donc
identique du premier au dernier restaurant de la campagne ; les leçons proposées sont revues ensuite, et intégrées
(nouvelle approche) si le porteur le décide.

## Faiblesses connues de ces versions (non corrigées, à observer pendant le test)

- ~~Un agent de correction peut déclarer une couverture complète sans ouvrir toutes les planches~~ : corrigé en approche 5 (marqueur conditionné aux lectures).
- Une écriture par `python3` ou redirection shell échappe au garde-fou du marqueur.
- La capture après correction est souvent omise (toujours observé au run 2 / test-1).
- Le hook « non commité » des sessions cloud provoque des commits intermédiaires ; sans effet sur Vercel depuis que seule `publication` déploie.
- Le contrôle des bords ne voit pas `overflow: clip` ni les photos tournées : la lecture des planches reste nécessaire.

## Historique

| Approche | Développement (restaurants) | Correction (restaurants) |
| --- | --- | --- |
| 1 | point de départ, agents longs Fable/Opus (1-2) | revue séparée Sonnet puis correcteur, contexte complet (1-4) |
| 2 | méthode sobre : modèle par rôle, agents courts, captures Haiku (3-4) | agents projet légers, brouillons intégrés, configurations F et H (5-8) |
| 3 | tests A, B, C (5) | F + q.sh obligatoire, sorties sobres, capture ciblée (9-13) |
| 4 | tests D, H (6) | hooks q.sh et marqueur, captures par page, couverture, relance (14-20) ; testée au run 2 (campagne test-1) |
| 5 | test I, lectures groupées (7-14) | couverture constatée (lectures journalisées, marqueur conditionné), seuils 80 lignes, orchestrateur cantonné (décidée après test-1, non mesurée) |
| 6 | hook de lecture (15-20) ; testée au run 2 (campagne test-1) | — |
| 7 | seuils de lecture 80 lignes, orchestrateur cantonné, reprise par tâche récurrente (décidée après test-1, non mesurée) | — |

Détail et mesures : `data/usage/chantiers/configurations.json`, `data/usage/*PROTOCOLE*.md`, artefact de reporting.

## Faire évoluer une étape

1. Ne jamais modifier une version pendant qu'une campagne l'utilise : terminer ou arrêter la campagne d'abord.
2. Écrire le changement dans les fichiers de l'étape, puis ajouter une ligne à l'historique avec le **nouveau numéro
   d'approche** et mettre à jour le tableau « En vigueur ».
3. Mettre à jour le message de lancement concerné (`2-developpement.md` ou `3-correction.md`) et la ligne
   d'identification (« Approche : n ») pour que la mesure distingue l'ancienne et la nouvelle version.
4. Tester sur un seul restaurant avant une campagne.
5. Commit en français à l'impératif.

Cette procédure vaut pour les **agents** (ce qu'ils font, leurs modèles, leurs consignes de travail) : seul un tel
changement reçoit un nouveau numéro d'approche. Un changement de **process** autour des agents (publication, stockage,
mesure, conduite de campagne) se note dans « Changements de process » ci-dessous, sans nouvelle approche ; s'il touche les
messages de lancement, la ligne d'identification reste inchangée.

## Changements de process (sans nouvelle approche des agents)

| Date | Changement | Fichiers |
| --- | --- | --- |
| 20/11/2026 | **Publication** : seule la branche `publication` déploie (`vercel.json`) ; le développement ne publie plus (vérification locale) ; la correction publie une fois par restaurant (`scripts/publier.sh`, jamais de publication vide ni double) ; la session mère publie le lot en fin de campagne si quelque chose a changé. **Stockage** : budget `<budget-stockage>` et seuil, contrôlé au début et à la fin de campagne (`scripts/stockage.sh`). Cause : stockage Vercel (10 Go) saturé dans la nuit du 19 au 20/11 par ~350 pushes et des publications en double. | `vercel.json`, `CLAUDE.md`, `scripts/publier.sh`, `scripts/stockage.sh`, `agents/publication.md`, `2-developpement.md`, `3-correction.md`, `5-verification.md`, `parametres.md`, `campagnes/` |
