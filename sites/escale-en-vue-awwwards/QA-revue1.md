# QA revue 1 : escale-en-vue-awwwards

Faits seulement. Build : `dist/escale-en-vue/awwwards/` (exit 0, 5 pages construites). Serveur local : `http://127.0.0.1:4502/escale-en-vue/awwwards/`.
Captures : `.shots-escale-en-vue-awwwards-revue1/<page>/` (report.json par dossier). Planches : `.shots-escale-en-vue-awwwards-revue1/<page>/planche.png`.

## Pages

### home
- Dossier : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-awwwards-revue1/home/`
- Planche : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-awwwards-revue1/home/planche.png`
- Erreurs console : 0 ; requêtes en échec : 0
- Axe : 0 violation (0 serious) ; 10 contrastNeedsReview
- Desktop : LCP 92 ms (img), CLS 0, débordement X non, éléments cachés 0, petites cibles 0, FPS 60 (pire frame 17 ms), loadMs 86, WebGL non activé
- Mobile : LCP 2372 ms (img), CLS 0.018, débordement X non, petites cibles 0, offenders 0, FPS 60 (pire frame 33 ms), WebGL non activé
- Clavier : invisibleFocus 0, noVisibleFocus 0, skipLinkFirst false, stuck false, 12 arrêts de tabulation (premier : « Aller au contenu »)

### escale-en-vue-item (/carte/)
- Dossier : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-awwwards-revue1/escale-en-vue-item/`
- Planche : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-awwwards-revue1/escale-en-vue-item/planche.png`
- Erreurs console : 0 ; requêtes en échec : 0
- Axe : 0 violation (0 serious) ; 4 contrastNeedsReview
- Desktop : LCP 724 ms (p.page-tete__chapeau), CLS 0.005, débordement X non, éléments cachés 0, petites cibles 0, FPS 60 (pire frame 17 ms), loadMs 114
- Mobile : LCP 2660 ms (p.page-tete__chapeau), CLS 0.018, débordement X non, petites cibles 0, offenders 0, FPS 60 (pire frame 17 ms)
- Clavier : invisibleFocus 0, noVisibleFocus 0, skipLinkFirst false, stuck false, 12 arrêts de tabulation (premier : « Aller au contenu »)

### 404 (page introuvable)
- Dossier : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-awwwards-revue1/404/`
- Planche : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-awwwards-revue1/404/planche.png`
- Erreurs console : 0 ; requêtes en échec : 0
- Axe : 1 violation (serious) : color-contrast, 2 nœuds ; 0 contrastNeedsReview
- Desktop : LCP 32 ms (p), CLS 0, débordement X non, éléments cachés 0, petites cibles 1, FPS 61, loadMs 17
- Mobile : LCP 216 ms (p), CLS 0, débordement X non, petites cibles 1, offenders 0, FPS 60 (pire frame 17 ms)
- Clavier : invisibleFocus 0, noVisibleFocus 0, skipLinkFirst false, stuck false, 2 arrêts puis « focus left the page » (lien « la page d'accueil », « Réalisé par »)

## Audit (`audit.mjs`)
- FAIL : 0
- WARN : 2 (« no robots.txt », « no sitemap »)
- Pages explorées : 4 ; page la plus lourde : /escale-en-vue/awwwards/ ~748 KB (HTML 4, JS 60 gz, CSS 5 gz, polices 87, images 592)

## Journaux
- Build : `.logs/escale-en-vue-awwwards-revue1-build.log`
- Capture : `.logs/escale-en-vue-awwwards-revue1-shoot.log`
- Audit : `.logs/escale-en-vue-awwwards-revue1-audit.log`
- Serveur : `.logs/serve-awwwards.log`
