# KYW-test-restaurant — règles de travail

Langue : français. Dépôt de production des maquettes de sites de restaurants namurois (agence KYW, sous-marque web de KYN).

- Lire `README.md` puis `agents/README.md` avant toute action. Les prompts de production sont dans `agents/`.
- **Produire un nouveau restaurant avec les agents : suivre `agents/production/README.md`** (paramètres, versions en vigueur, messages de lancement, mesure).
- Un site = un paquet Astro dans `sites/<slug>-<variante>/` (variantes : `portfolio`, `awwwards`, `legacy`) ; les gabarits du portfolio dans `gabarits/<nom>/`.
- Build d'un site : `pnpm build:site sites/<slug>-<variante>` (écrit `dist/<slug>/<variante>/`). Les `dist/` sont **commités** : Vercel sert `dist/` tel quel, sans build.
- Après chaque site construit : `pnpm index` (régénère `dist/index.html`), commit, push sur la branche de travail (sans effet sur le site en ligne).
- **Vercel ne déploie que la branche `publication`** (`vercel.json` : `git.deploymentEnabled` désactive toutes les autres branches, `ignoreCommand` teste la branche en filet de sécurité). La branche de travail ne publie jamais, quel que soit le message de commit. **Publier = `scripts/publier.sh "<motif>"`** (pousse HEAD sur `publication` seulement si `dist/` a changé depuis la dernière publication ; fusionne et réessaie en cas de refus). **Au plus une publication par restaurant terminé** (faite par sa session de correction) et une publication finale de lot par la session mère ; jamais de publication vide ni double, jamais de push direct sur `publication` en dehors de ce script.
- **Stockage Vercel** : chaque déploiement conservé garde une copie complète de `dist/` (~430 Mo) ; stockage gratuit 10 Go, dont un budget de 5 Go suivi par campagne (`agents/production/parametres.md`). Contrôle : `scripts/q.sh stockage scripts/stockage.sh` (poids de `dist/`, estimation selon les déploiements conservés). Le 20/11, ~350 pushes et des publications en double ont saturé le stockage et arrêté les publications.
- Chromium Playwright est préinstallé (`/opt/pw-browsers/chromium`) : ne jamais lancer `playwright install`.
- Pied de page KYW obligatoire sur chaque page : composant `packages/kyw-footer` (un seul logo, `kyw-signature`).
- Toute page porte `<meta name="robots" content="noindex">` et la mention « Maquette KYW, certaines données sont illustratives ».
- **Suivi des items (règle commune à tous les agents, 24/11/2026)** : chaque run d'agent publie dès son lancement un artefact de suivi de tous les items traités (jauge de progression, sous-items dépliables), republié après chaque étape. Règle et outillage : `agents/REGLE-SUIVI.md` du repo benitoGiunta/KYN-project-prospecting. La page de suivi d'ici (`scripts/suivi.mjs`, restaurants × variantes) en est le précédent ; à passer au format commun.
- Problème structurel rencontré (outil, méthode, piège) : l'ajouter à `agents/lecons/<rôle>.md` (voir `agents/lecons.md`) en fin de tâche.
- Commits fréquents, messages en français à l'impératif.
