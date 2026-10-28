# Leçons structurelles (auto-amélioration)

Chaque agent qui rencontre un problème de méthode, d'outillage ou un piège répétable l'ajoute ici en fin de tâche :
`- [date] [rôle] [restaurant] : problème → correction appliquée / règle à suivre`. Les agents lisent ce fichier au démarrage.

- 2026-10-28 orchestrateur : `pnpm install` échoue si `package.json` porte `packageManager` (corepack absent) → ne pas le déclarer.
- 2026-10-28 orchestrateur : esbuild et sharp ont besoin de `pnpm.onlyBuiltDependencies` dans le package.json racine, sinon leurs scripts sont ignorés.
- 2026-10-28 orchestrateur : en mode Auto, écrire dans `.claude/settings.json` est refusé (auto-modification) ; ne pas compter sur des règles d'autorisation commitées.
