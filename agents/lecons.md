# Leçons structurelles (auto-amélioration)

Chaque agent qui rencontre un problème de méthode, d'outillage ou un piège répétable l'ajoute ici en fin de tâche :
`- [date] [rôle] [restaurant] : problème → correction appliquée / règle à suivre`. Les agents lisent ce fichier au démarrage.

- 2026-10-28 orchestrateur : `pnpm install` échoue si `package.json` porte `packageManager` (corepack absent) → ne pas le déclarer.
- 2026-10-28 orchestrateur : esbuild et sharp ont besoin de `pnpm.onlyBuiltDependencies` dans le package.json racine, sinon leurs scripts sont ignorés.
- 2026-10-28 orchestrateur : en mode Auto, écrire dans `.claude/settings.json` est refusé (auto-modification) ; ne pas compter sur des règles d'autorisation commitées.
- 2026-10-28 orchestrateur : le HTML brut d'un site tiers capturé contenait un jeton Mapbox et GitHub a refusé le push (push protection) → page.html est gitignoré et capture-site.mjs masque les jetons ; ne jamais `git add -A` sans vérifier ce que les agents de recherche ont déposé.
- 2026-10-28 orchestrateur : le quota WebSearch (200 requêtes) est partagé par TOUS les agents lancés dans un même tour de la session mère ; au-delà, les agents n'ont plus que WebFetch. Conséquence : un restaurant = une session fille (quota propre) ; dans une même session, ne pas lancer plus de 3 agents gourmands en recherche en parallèle, et prévoir le repli WebFetch (galeries, annuaires) dans les prompts.
