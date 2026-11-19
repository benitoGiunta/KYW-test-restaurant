# Produire un restaurant avec les agents — mode d'emploi

Ce dossier est **le seul point d'entrée** pour faire produire les sites d'un nouveau restaurant par les agents
(dossier client → 3 sites → correction → publication), avec la mesure qui permet de comparer le coût réel à celui de
la phase de développement des agents. Une conversation qui ne connaît que ce dépôt doit pouvoir tout faire en suivant
ces fichiers, dans l'ordre.

## Les fichiers

| Fichier | Rôle | Quand le lire |
| --- | --- | --- |
| `parametres.md` | Toutes les valeurs à fixer pour une campagne (branche, sessions, seuil hebdo, phase de mesure) | Avant tout lancement |
| `VERSIONS.md` | Version en vigueur de chaque étape (développement A6, correction A4), historique, procédure pour faire évoluer | Avant tout lancement, et avant de modifier un agent |
| `1-ajouter-restaurant.md` | Inscrire un restaurant dans `data/restaurants.json` | Étape 1 |
| `2-developpement.md` | Message de lancement de la session de développement d'un restaurant | Étape 2 |
| `3-correction.md` | Message de lancement de la session de correction d'un restaurant | Étape 3 |
| `4-mesure.md` | Conventions de mesure (identification des agents, fichiers, base de suivi) | Étapes 2 et 3 (déjà incluses dans les messages) |
| `5-verification.md` | Contrôles de fin, publication Vercel, relecture humaine | Étape 4 |

## Le déroulé pour un restaurant

```
1. ajouter       data/restaurants.json (slug, adresse, site actuel…)             → 1-ajouter-restaurant.md
2. développer    session Opus : workflow agents/workflow-restaurant.js            → 2-developpement.md
                 recherche client → 3 variantes → revue → révision → publication
3. corriger      session Haiku : captures par page, 1 agent Sonnet par site       → 3-correction.md
                 identifier → marqueur → corriger → publier
4. vérifier      URL en ligne, relecture humaine des 3 sites                       → 5-verification.md
```

Chaque session de restaurant mesure sa consommation et la remonte (`4-mesure.md`). La session qui lance les
restaurants (« session mère ») ne fait que créer les sessions, suivre leurs comptes rendus et débloquer.

## Lancer une campagne (session mère)

1. Lire `parametres.md` et `VERSIONS.md` ; remplir les paramètres de la campagne.
2. Pour chaque restaurant : étape 1 (commit, sans le mot de publication Vercel).
3. Créer une session de développement par restaurant (`create_session`, modèle indiqué dans `2-developpement.md`,
   message de lancement avec les paramètres remplacés). Au plus 4 en parallèle.
4. Quand un restaurant a fini son développement (compte rendu reçu), créer sa session de correction (`3-correction.md`).
5. À la fin de la campagne : `5-verification.md`, puis mise à jour du suivi (`node scripts/suivi.mjs`).

L'outil Workflow (utilisé par la session de développement) ne s'exécute que si le porteur l'a autorisé : le message de
lancement le dit explicitement ; sans lui, la session déroule la même chaîne avec l'outil Agent.

## Ce qui n'est pas ici

- Les consignes de chaque rôle (construction, revue, révision…) : fichiers de `agents/` (index dans `agents/README.md`).
- L'agent de correction : `.claude/agents/identifier-rectifier-site.md`.
- Les règles de sobriété communes : `agents/sobriete.md` ; les leçons apprises : `agents/lecons/`.
- Les anciens messages de session (phases de mise au point) : `agents/archives/`.
