# Consommation de jetons

- `consommation-session-1.json` : un objet par transcript (session principale + 22 sous-agents) de la session d'orchestration
  du 28 au 30/10/2026 : `label` (rôle), `appels` (réponses du modèle), `input_tokens`, `cache_creation_input_tokens`,
  `cache_read_input_tokens`, `output_tokens`, `outils` (appels d'outils par nom), `modeles`.
- `chronologie-session-1.json` : totaux par heure UTC, tous transcripts confondus.
- Régénération : `python3 scripts/usage-extraire.py <dossier projects> <id session> <sortie.json> [libelles.json]`
  (le dossier est `~/.claude/projects/-home-user/` sur le conteneur de la session concernée).

Contexte : la session 1 a sélectionné 20 restaurants (4 agents de vérification), rédigé les prompts (2 agents), collecté
106 sites de référence (3 agents), constitué un dossier client (1), évalué les 106 sites en navigateur (7 agents, tués
deux fois par la limite de 5 h puis relancés), défini 15 directions artistiques (1), construit un socle Astro (1) et
commencé 3 gabarits (interrompus par la limite hebdomadaire).
