# Paramètres d'une campagne

Toutes les valeurs variables sont ici, une seule fois. Les messages de lancement (`2-developpement.md`,
`3-correction.md`) les reprennent sous forme de `<paramètre>` à remplacer au moment de créer la session.

## Fixes (dépôt)

| Paramètre | Valeur |
| --- | --- |
| Dépôt | `https://github.com/benitoGiunta/KYW-test-restaurant` |
| `<branche>` | `claude/laughing-wozniak-vxc1fo` (la seule branche de travail ; jamais de pull request) |
| Racine dans le conteneur | `/home/user/KYW-test-restaurant` |
| URL publiée | `https://kyw-test-restaurant.vercel.app/<slug>/<variante>/` |
| Publication Vercel | uniquement sur un push dont le dernier commit contient `[publier]` (voir `CLAUDE.md`) |

## À fixer pour chaque campagne

| Paramètre | Signification | Valeur de la campagne en cours |
| --- | --- | --- |
| `<phase>` | Étiquette de mesure ajoutée à chaque agent : `test` pour l'usage réel des agents, autre nom pour une nouvelle mise au point | `test` |
| `<campagne>` | Nom court de la campagne (dossier de mesures, suivi) | `test-1` |
| `<session-mere>` | Id de la session qui lance les restaurants et reçoit les comptes rendus | à remplir (id de la conversation qui lance) |
| `<session-reporting>` | Id de la session qui calcule les coûts, ou `aucune` | `session_01CZvTL8R1vtJAXn9kX2QWxs` |
| `<seuil-hebdo>` | Utilisation hebdomadaire du compte (0 à 1) à partir de laquelle on n'engage plus rien | `1` (toute la limite de la semaine) |
| `<heure-limite>` | Après cette heure, plus aucun lancement ni relance (les agents en cours finissent) | `2026-11-20 10:30 UTC` (11:30 à Bruxelles ; la limite se réinitialise à 11:00 UTC) |
| `<lecons>` | `false` = mode figé : les agents ne modifient pas `agents/`, les leçons sont proposées dans `data/usage/<campagne>/lecons-proposees/` ; `true` = les agents enrichissent leurs consignes | `false` |
| `<consigne-lecons>` | Phrase ajoutée aux agents de correction en mode figé (vide si `<lecons>` = `true`) | ` Mode figé : ne modifie rien dans agents/ ; leçon structurelle éventuelle en une ligne datée dans data/usage/<campagne>/lecons-proposees/<slug>.md.` |
| `<base-suivi>` | Base de données de suivi de la campagne (voir `4-mesure.md`, § 6) | repo `benitoGiunta/KYN-project-prospecting`, run 2 « Test des agents · lot 2 » |

## Modèles par session

| Session | Modèle (à passer explicitement à `create_session`) |
| --- | --- |
| Développement d'un restaurant | `claude-opus-5-5` (orchestrateur ; les agents ont leur modèle dans le workflow) |
| Correction d'un restaurant | `claude-haiku-5-5` (orchestrateur ; l'agent de site est Sonnet) |

Les modèles des agents eux-mêmes sont fixés dans `agents/workflow-restaurant.js` (développement) et dans
l'en-tête de `.claude/agents/identifier-rectifier-site.md` (correction) ; ils font partie de la version
(`VERSIONS.md`) et ne se changent pas au lancement.
