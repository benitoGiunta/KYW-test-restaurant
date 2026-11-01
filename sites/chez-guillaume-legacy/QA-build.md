# QA build : chez-guillaume-legacy

Build : `pnpm build:site` remplacé par `node scripts/build-site.mjs sites/chez-guillaume-legacy` (exit 0, 7 pages, sortie dans `dist/chez-guillaume/legacy/`).
Serveur local : `dist/` sur http://127.0.0.1:4503/chez-guillaume/legacy/ (arrêté après les captures).
Journaux : `.logs/chez-guillaume-legacy-build-*.log`.

## Pages capturées

Le crawl a produit 3 dossiers de captures. L'audit a parcouru 6 pages.

### 1. Accueil : `/chez-guillaume/legacy/`

- Dossier de captures : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-legacy-build/home/`
- Planche : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-legacy-build/home/planche.png`
- Erreurs console : 0. Requêtes en échec : 0.
- Axe : 1 violation (serious) `label-content-name-mismatch`, 6 nœuds. Contrastes à vérifier : 94.
- CLS : desktop 0.001, mobile 0.
- LCP : desktop 508 ms (img), mobile 1096 ms (img).
- Chargement (load) : desktop 777 ms, mobile 2052 ms. Stabilisation : desktop 3641 ms, mobile 4514 ms.
- Débordement horizontal : non (desktop et mobile).
- Hauteur de page : desktop 6767 px, mobile 7177 px.
- Cibles tactiles trop petites : desktop 0, mobile 2 (« Chez Guillaume, accueil » 124x20 ; « Voir sur la carte » 124x21).
- Éléments cachés : `glHidden` 0. Mouvement réduit : `reduced.hiddenText` 2, `moving` false.
- Clavier : 12 arrêts de tabulation. Focus non visible 0. Focus invisible 0. Piège (stuck) : non. Lien d'évitement en premier : non.
- Survol : 7 cibles. Sans changement 1. Changement de couleur seul 2. Couvertes 0.
- FPS au défilement : desktop 61, mobile 61.

### 2. Agenda (page intérieure) : `/chez-guillaume/legacy/agenda/`

- Dossier de captures : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-legacy-build/chez-guillaume-item/`
- Planche : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-legacy-build/chez-guillaume-item/planche.png`
- Erreurs console : 0. Requêtes en échec : 0.
- Axe : 1 violation (serious) `label-content-name-mismatch`, 4 nœuds. Contrastes à vérifier : 114.
- CLS : desktop 0, mobile 0.
- LCP : desktop 332 ms (p.lead), mobile 708 ms (p.lead).
- Chargement (load) : desktop 652 ms, mobile 1341 ms. Stabilisation : mobile 3741 ms.
- Débordement horizontal : non (desktop et mobile).
- Hauteur de page : desktop 4002 px.
- Cibles tactiles trop petites : desktop 1 (« Toutes les dates sur la » 226x19), mobile 1 (« Chez Guillaume, accueil » 124x20).
- Mouvement réduit : `reduced.hiddenText` 2, `moving` false.
- Clavier : 11 arrêts de tabulation. Focus non visible 0. Focus invisible 0. **Piège (stuck) : oui.** Lien d'évitement en premier : non.
- Survol : 7 cibles. Sans changement 2. Changement de couleur seul 1. Couvertes 0.
- FPS au défilement : desktop 60, mobile 61.

### 3. Page introuvable : `/__shoot-missing-page-…` (404)

- Dossier de captures : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-legacy-build/404/`
- Planche : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-legacy-build/404/planche.png`
- Erreurs console : 0. Requêtes en échec : 0.
- Axe : 2 violations (serious) : `document-title` (1 nœud), `html-has-lang` (1 nœud). Contrastes à vérifier : 0.
- CLS : desktop 0, mobile 0. LCP : desktop 32 ms (pre), mobile 216 ms (pre).
- Débordement horizontal : non. Hauteur de page : 900 px.
- Clavier : 1 arrêt, « (body: focus left the page) ».
- Survol : 0 cible.

## Audit (`audit.mjs`)

- Pages parcourues : 6. Page la plus lourde : `/chez-guillaume/legacy/`, environ 407 KB (html 5, JS 1 gz, CSS 7 gz, polices 42, images 353).
- **FAIL : 0.**
- **WARN : 12.** Le premier est `WARN site : no sitemap`. Le détail complet est dans le journal.

## Notes de mesure (tirées des `report.json`)

- FPS desktop : rendu headless sur GPU logiciel, à lire comme un plancher.
- Mobile : ralentissement CPU x4 et 4G lente. Les chiffres mobiles de LCP et de FPS sont ceux qui comptent.

## Fichiers non modifiés

Aucun fichier source modifié. Aucun commit.
