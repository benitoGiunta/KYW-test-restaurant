# Plan de tests d'économie de jetons : restaurants 5 et 6

Rédigé le 01/11/2026 par la session de reporting, à partir des mesures de Partage (restaurant 3, méthode sobre).
Tableau de bord : https://claude.ai/artifact/5KDwC8bNQe7he4U6uxLmgp (onglet « Avant / après »).

## Point de départ

| Référence | Coût | Par site | Contexte relu par réponse | Sorties de commandes |
|---|---:|---:|---:|---:|
| Partage (restaurant 3) | 30,13 $ | 10,04 $ | 102 000 jetons | 550 000 caractères par site |
| Restaurant 4 (en cours) | à mesurer | à mesurer | à mesurer | cible < 200 000 caractères par site |

Le restaurant 4 tourne avec l'enveloppe `scripts/q.sh` imposée dans les prompts (commit 1cf0f6f). Il sert de nouvelle
référence et valide, ou non, la baisse des sorties de commandes. **Aucune modification de ce plan ne doit être appliquée
aux prompts ou au workflow avant la fin du restaurant 4** : ses agents lisent les prompts à leur lancement.

Constats de Partage qui orientent les tests :
- La construction fait 66 % du coût, soit 6 à 7 $ par variante en trois phases.
- Même les agents mécaniques relisent beaucoup : 75 000 jetons par réponse pour les captures sur Haiku, 82 000 pour la
  publication. C'est le contexte de départ, commun à tous les agents : consignes, sobriété, leçons, prompt de rôle.
- Les revues 2 coûtent 1,96 $ au total, captures comprises.
- Les images lues restent faibles, 11 au plus par agent : ce n'est plus un levier, il est retiré du plan.

## Restaurant 5 : trois tests

Les tests A et B s'appliquent à tout le restaurant. Le test C ne concerne que la variante legacy : les variantes
portfolio et awwwards servent de témoin.

### Test A : contexte de départ allégé (tous les agents)
- **Changement :** remplacer la lecture de `agents/lecons.md` en entier par un résumé par rôle de 2 000 jetons au plus
  (`agents/lecons/<rôle>.md`, régénéré par l'étape leçons). Ne plus faire lire `README.md` et `agents/README.md` aux
  agents ; seul le prompt de rôle, `agents/sobriete.md` et le résumé du rôle restent obligatoires.
- **Mesure :** contexte relu par réponse, par rôle.
- **Réussite :** captures et publication sous 45 000 jetons (75 000 et 82 000 chez Partage), construction sous
  90 000 (112 000 à 126 000), revue sous 80 000 (107 000).
- **Gain attendu :** environ 3 $ par restaurant.
- **Garde-fou :** aucune leçon déjà intégrée ne réapparaît comme défaut dans la revue 1.

### Test B : revue 2 seulement si nécessaire (toutes les variantes)
- **Changement :** dans le workflow, pas de revue 2 si la revue 1 n'a relevé aucun défaut F0 ni F1 ; la variante part à
  la publication après sa révision. Revue 2 maintenue dès qu'un F0 ou un F1 existait.
- **Mesure :** nombre de revues 2 lancées, coût des revues.
- **Réussite :** revues sous 3 $ (4,58 $ chez Partage) quand au moins une variante est dispensée.
- **Gain attendu :** jusqu'à 1,96 $.
- **Garde-fou :** contrôle par la session de reporting d'un échantillon de variantes dispensées, en relisant leur
  REVISION-1.md : chaque F2 annoncé corrigé doit l'être dans le code.

### Test C : construction legacy sur Sonnet 5.5 (variante legacy seulement)
- **Changement :** `model: 'sonnet'` pour les trois phases de construction de la variante legacy ; portfolio et awwwards
  restent sur Opus.
- **Mesure :** coût de construction legacy, nombre de défauts de la revue 1 legacy.
- **Réussite :** construction legacy sous 3,80 $ (6,90 $ chez Partage), et pas plus de défauts F0 et F1 en revue 1 que
  les legacy de Partage et du restaurant 4.
- **Gain attendu :** environ 3 $, et environ 6 $ si le portfolio suit au restaurant 7.
- **Retour arrière :** si la revue 1 legacy relève plus de F0 et F1, la legacy revient sur Opus au restaurant 6.

## Restaurant 6 : trois tests

Ce restaurant reprend tout ce qui a réussi au restaurant 5.

### Test D : effort de raisonnement ajusté
- **Changement :** `effort: 'medium'` pour les phases 1 (structure) et 3 (QA) de la construction et pour la révision ;
  `effort: 'low'` pour les captures et la publication ; la phase 2 (motion) reste à `high`.
- **Mesure :** coût de construction et de révision, nombre de réponses par agent.
- **Réussite :** construction −15 % par rapport au restaurant 5 à variante égale.
- **Gain attendu :** 2 à 4 $.
- **Garde-fou :** défauts F0 et F1 de la revue 1 au plus égaux au restaurant 5.

### Test E : plafond à 30 réponses
- **Changement :** dans les prompts et `agents/sobriete.md`, relais par un agent neuf vers 25 réponses au lieu de 35.
- **Mesure :** réponses du plus long agent, contexte relu par réponse.
- **Réussite :** aucun agent au-delà de 30 réponses, contexte relu par réponse −10 %.
- **Gain attendu :** environ 1 $.
- **Risque à surveiller :** plus d'agents, donc plus de contextes de départ. Si le coût total monte, revenir à 40.

### Test F : partie stable du prompt en premier
- **Changement :** placer la ligne « Rôle · Restaurant · Variante · Passe » et tout ce qui varie à la fin du prompt
  d'agent, le texte commun au rôle au début. Des agents du même rôle lancés à moins de 5 minutes d'écart partagent
  alors un début de contexte déjà en cache. L'extracteur garde la fin du premier message : la mesure reste possible.
- **Mesure :** écriture de contexte des agents de même rôle lancés à la suite (captures, revues).
- **Réussite :** écriture de contexte de ces agents −10 %.
- **Gain attendu :** incertain, de l'ordre de 1 $.

## Objectif et règle de décision

- **Objectif après les deux restaurants :** 6 à 7 $ par site, soit 20 $ par restaurant, contre 10 $ par site chez Partage.
- **Un test réussit** si son seuil est atteint et son garde-fou respecté. Il devient alors la règle pour tous les
  restaurants suivants, inscrite dans `agents/sobriete.md`.
- **Un test échoue** si le garde-fou de qualité est franchi, même avec un gain de jetons : retour à la règle précédente.
- **Mesure :** chaque session restaurant dépose `data/usage/detail-<slug>.json` en fin de travail et envoie
  « mise à jour » à la session de reporting, qui ajoute un onglet « Tests » au tableau de bord : un résultat par test,
  comparé à Partage et au restaurant 4.

## Mise en œuvre

| Quand | Qui | Quoi |
|---|---|---|
| Fin du restaurant 4 | Session de reporting | Mesure du restaurant 4, validation de l'enveloppe silencieuse, seuils du plan recalés si besoin |
| Avant le restaurant 5 | Test Site | Tests A, B et C dans le workflow, les prompts et `agents/lecons/` ; un commit par test |
| Fin du restaurant 5 | Session de reporting | Verdict des tests A, B et C |
| Avant le restaurant 6 | Test Site | Tests D, E et F, plus ce qui a réussi au restaurant 5 |
| Fin du restaurant 6 | Session de reporting | Verdict des tests D, E et F, nouvelle règle de sobriété consolidée |
