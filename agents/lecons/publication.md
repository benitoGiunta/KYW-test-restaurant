# Leçons publication, orchestrateur et sessions filles
Nouvelle leçon : une ligne datée à la fin de ce fichier.
- Un restaurant = une session fille (quota WebSearch propre), créée avec `model: claude-opus-5-5` explicite ; au plus 3 à 4 agents lourds en parallèle ; garder une relance planifiée (`send_later`) pour réveiller ce qui est tombé (limite 5 h, HTTP 429).
- Avant de lancer un relecteur : vérifier `QA-<étape>.md` et `summary.json` sans `shootFailed`, lister les pages shootées ; shooter les variantes en série ; un agent coupé laissant ETAT.md « en cours » : lire le journal de fond et les mtimes avant de relancer.
- Reprise d'un agent : agent neuf alimenté par les fichiers d'avancement, jamais relance de mémoire ; captures par agent Haiku, commandes via `scripts/q.sh`.
- Publication : ne jamais `git add -A` (arbre souvent sale : `data/suivi.html`, `dist/suivi/index.html`, `pnpm-lock.yaml`, `QA-revue*.md`) ; ajouter les chemins du site et `dist/<slug>/` seulement ; `scripts/index.mjs` réécrit les deux fichiers de suivi (horodatage) : les committer seuls, après `git diff --stat`.
- Le superviseur doit ajouter `Agent` aux outils de `variante-awwwards` si une critique indépendante est voulue ; sinon auto-notation marquée.
- Un `dist/` déjà commité et identique au build de contrôle ne demande pas de commit « Publie ».
