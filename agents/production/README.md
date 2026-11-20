# Produire un restaurant avec les agents — mode d'emploi

Ce dossier est **le seul point d'entrée** pour faire produire les sites d'un nouveau restaurant par les agents
(dossier client → 3 sites → correction → publication), avec la mesure qui permet de comparer le coût réel à celui de
la phase de développement des agents. Une conversation qui ne connaît que ce dépôt doit pouvoir tout faire en suivant
ces fichiers, dans l'ordre.

## Les fichiers

| Fichier | Rôle | Quand le lire |
| --- | --- | --- |
| `parametres.md` | Toutes les valeurs à fixer pour une campagne (branche, sessions, seuil hebdo, phase de mesure) | Avant tout lancement |
| `VERSIONS.md` | Version en vigueur de chaque étape (développement A7, correction A5), historique, procédure pour faire évoluer | Avant tout lancement, et avant de modifier un agent |
| `1-ajouter-restaurant.md` | Inscrire un restaurant dans `data/restaurants.json` | Étape 1 |
| `2-developpement.md` | Message de lancement de la session de développement d'un restaurant | Étape 2 |
| `3-correction.md` | Message de lancement de la session de correction d'un restaurant | Étape 3 |
| `4-mesure.md` | Conventions de mesure (identification des agents, fichiers, base de suivi) | Étapes 2 et 3 (déjà incluses dans les messages) |
| `5-verification.md` | Contrôles de fin, publication Vercel et stockage, relecture humaine | Étape 4 |
| `campagnes/` | Une fiche par campagne (paramètres, file de restaurants) et la conduite d'une campagne | Avant et pendant une campagne |

## Le déroulé pour un restaurant

```
1. ajouter       data/restaurants.json (slug, adresse, site actuel…)             → 1-ajouter-restaurant.md
2. développer    session Opus : workflow agents/workflow-restaurant.js            → 2-developpement.md
                 recherche client → 3 variantes → revue → révision → fin (branche de travail, vérification locale)
3. corriger      session Haiku : captures par page, 1 agent Sonnet par site       → 3-correction.md
                 identifier → marqueur → corriger → publier (une fois, scripts/publier.sh)
4. vérifier      URL en ligne, relecture humaine des 3 sites                       → 5-verification.md
```

Chaque session de restaurant mesure sa consommation et la remonte (`4-mesure.md`). La session qui lance les
restaurants (« session mère ») ne fait que créer les sessions, suivre leurs comptes rendus et débloquer.

## Lancer une campagne (session mère)

Une campagne regroupe des restaurants produits avec les mêmes versions et paramètres : fichier
`campagnes/<campagne>.json` (paramètres + file de restaurants), conduite décrite dans `campagnes/README.md`.
Les messages de lancement se produisent avec `python3 scripts/message-lancement.py <campagne> <etape> <slug>`,
jamais à la main.

L'outil Workflow (utilisé par la session de développement) ne s'exécute que si le porteur l'a autorisé : le message de
lancement le dit explicitement ; sans lui, la session déroule la même chaîne avec l'outil Agent.

## Ce qui n'est pas ici

- Les consignes de chaque rôle (construction, revue, révision…) : fichiers de `agents/` (index dans `agents/README.md`).
- L'agent de correction : `.claude/agents/identifier-rectifier-site.md`.
- Les règles de sobriété communes : `agents/sobriete.md` ; les leçons apprises : `agents/lecons/`.
- Les anciens messages de session (phases de mise au point) : `agents/archives/`.
