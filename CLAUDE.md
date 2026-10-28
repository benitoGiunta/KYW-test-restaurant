# KYW-test-restaurant — règles de travail

Langue : français. Dépôt de production des maquettes de sites de restaurants namurois (agence KYW, sous-marque web de KYN).

- Lire `README.md` puis `agents/README.md` avant toute action. Les prompts de production sont dans `agents/`.
- Un site = un paquet Astro dans `sites/<slug>-<variante>/` (variantes : `portfolio`, `awwwards`, `legacy`) ; les gabarits du portfolio dans `gabarits/<nom>/`.
- Build d'un site : `pnpm build:site sites/<slug>-<variante>` (écrit `dist/<slug>/<variante>/`). Les `dist/` sont **commités** : Vercel sert `dist/` tel quel, sans build.
- Après chaque site publié : `pnpm index` (régénère `dist/index.html`), commit, push sur la branche de travail.
- Chromium Playwright est préinstallé (`/opt/pw-browsers/chromium`) : ne jamais lancer `playwright install`.
- Pied de page KYW obligatoire sur chaque page : composant `packages/kyw-footer` (un seul logo, `kyw-signature`).
- Toute page porte `<meta name="robots" content="noindex">` et la mention « Maquette KYW, certaines données sont illustratives ».
- Problème structurel rencontré (outil, méthode, piège) : l'ajouter à `agents/lecons.md` en fin de tâche.
- Commits fréquents, messages en français à l'impératif.
