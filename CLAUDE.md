# KYW-test-restaurant — règles de travail

Langue : français. Dépôt de production des maquettes de sites de restaurants namurois (agence KYW, sous-marque web de KYN).

- Lire `README.md` puis `agents/README.md` avant toute action. Les prompts de production sont dans `agents/`.
- **Produire un nouveau restaurant avec les agents : suivre `agents/production/README.md`** (paramètres, versions en vigueur, messages de lancement, mesure).
- Un site = un paquet Astro dans `sites/<slug>-<variante>/` (variantes : `portfolio`, `awwwards`, `legacy`) ; les gabarits du portfolio dans `gabarits/<nom>/`.
- Build d'un site : `pnpm build:site sites/<slug>-<variante>` (écrit `dist/<slug>/<variante>/`). Les `dist/` sont **commités** : Vercel sert `dist/` tel quel, sans build.
- Après chaque site construit : `pnpm index` (régénère `dist/index.html`), commit, push sur la branche de travail (sans effet sur le site en ligne).
- **Vercel ne déploie que la branche `publication`** (`vercel.json` : `git.deploymentEnabled` désactive toutes les autres branches, `ignoreCommand` teste la branche en filet de sécurité). La branche de travail ne publie jamais, quel que soit le message de commit. Publier = amener la branche de travail dans `publication` : `git fetch -q origin publication claude/laughing-wozniak-vxc1fo && git checkout -B publication origin/publication && git merge --no-edit origin/claude/laughing-wozniak-vxc1fo && git push origin publication && git checkout claude/laughing-wozniak-vxc1fo`. Chaque push sur `publication` copie tout `dist/` (~300 à 430 Mo) sur un stockage gratuit de 10 Go : publier une fois par lot de restaurants terminés, jamais à chaque commit (nuit du 19 au 20/11 : ~350 commits poussés, stockage dépassé, publications arrêtées).
- Chromium Playwright est préinstallé (`/opt/pw-browsers/chromium`) : ne jamais lancer `playwright install`.
- Pied de page KYW obligatoire sur chaque page : composant `packages/kyw-footer` (un seul logo, `kyw-signature`).
- Toute page porte `<meta name="robots" content="noindex">` et la mention « Maquette KYW, certaines données sont illustratives ».
- Problème structurel rencontré (outil, méthode, piège) : l'ajouter à `agents/lecons/<rôle>.md` (voir `agents/lecons.md`) en fin de tâche.
- Commits fréquents, messages en français à l'impératif.
