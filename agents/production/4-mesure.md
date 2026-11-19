# Mesure — conventions communes

Objectif : comparer le coût et la qualité de chaque étape entre la phase de développement des agents (restaurants 1
à 20, approches successives) et la phase de test (usage réel des versions en vigueur). Les messages de lancement
(`2-developpement.md`, `3-correction.md`) appliquent déjà ces conventions ; ce fichier les explique et sert de
référence quand on les fait évoluer.

## 1. Identifier chaque agent

Le premier message de chaque agent commence par une ligne d'identification, lue par les scripts de mesure :

```
Rôle : <rôle> · Restaurant : <slug> · Variante : <v> · Passe : <n> · Phase : <phase>        (développement, ajoutée par le workflow)
Rôle : identifier-rectifier-site · Restaurant : <slug> · Variante : <v> · Approche : 4 · Phase : <phase>   (correction)
Rôle : orchestrateur-qualite · Restaurant : <slug> · Approche : 4 · Phase : <phase>                        (correction)
```

Ne jamais la retirer ni la reformuler : sans elle, le coût d'un agent n'est attribué à aucune étape.

## 2. Séparer identification et correction

Chaque agent de correction lance `scripts/marqueur.sh MARQUEUR-RECTIFICATION <slug> <variante>` à la fin de
l'identification ; `scripts/usage-phases.py` coupe son transcript à cet endroit (identifier / rectifier).

## 3. Fichiers produits par restaurant

Dossier `data/usage/<campagne>/<slug>/` :

| Fichier | Produit par | Contenu |
| --- | --- | --- |
| `dev-detail.json` | `scripts/usage-detail.py` (session de développement) | jetons et appels par agent |
| `dev-commandes.json` | `scripts/usage-commandes.py` | volume des sorties de commandes |
| `dev-resume.json` | la session de développement | début, fin, utilisation hebdo début/fin, verdicts, interventions |
| `corr-detail.json`, `corr-commandes.json`, `corr-phases.json` | mêmes scripts + `usage-phases.py` (session de correction) | idem, avec la coupe identifier / rectifier |
| `corr-resume.json` | la session de correction | début, fin, utilisation hebdo, problèmes, couverture, passes 2, interventions |

L'id à passer aux scripts est le nom du fichier `~/.claude/projects/*/<id>.jsonl` le plus récent de la session.
Ne jamais lire ces fichiers dans la session qui les produit (coût de contexte inutile). Commit sans le mot de
publication Vercel.

## 4. Utilisation hebdomadaire

Chaque session note `unifiedWindows.seven_day.utilization` (événements `rate_limit_event` de sa propre session) au
début et à la fin. L'écart, rapproché du coût API mesuré, vérifie l'estimation du prix d'une limite
(`data/usage/limite-hebdo.json`). La mesure n'est propre que si rien d'autre ne tourne sur le compte pendant la campagne.

## 5. Interventions

Toute action humaine ou de la session mère nécessaire pour qu'un restaurant aboutisse (déblocage de push, relance,
décision) est notée dans `interventions` du fichier résumé de l'étape (date, cause, action). C'est la mesure de
l'autonomie des agents.

## 6. Base de suivi

Base de données de la campagne (`<base-suivi>` dans `parametres.md`) : **à brancher**. Quand elle est fournie, ce
paragraphe décrira où et comment chaque session y écrit (une ligne par restaurant et par étape, à partir des fichiers
résumé ci-dessus), et les messages de lancement recevront l'étape d'écriture correspondante.

## 7. Comparaison

- Références de la phase de développement : `data/usage/chantiers/` (développement), `data/usage/correction-phase1.json`,
  `phase2.json`, `approche3.json`, `approche4.json` (correction), synthèse dans `VERSIONS.md`.
- La page de suivi (`scripts/suivi.mjs`, onglets Parcours et Coûts) et la session de reporting lisent ces fichiers.
