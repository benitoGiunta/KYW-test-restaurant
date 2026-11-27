# QA revue 2 : bienvenue-chez-vous / awwwards

Build : `sites/bienvenue-chez-vous-awwwards` → `dist/bienvenue-chez-vous/awwwards/` (exit 0, 5 pages, journal `.logs/bienvenue-chez-vous-awwwards-revue2-build.log`).
Serveur local : `dist` sur 127.0.0.1:4502, arrêté après les captures.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/bienvenue-chez-vous/awwwards/`) | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-revue2/home/` (report.json, d-*.png, m-*.png) | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-revue2/home/planche.png` |
| Carte, item (`/carte/`, nommé `bienvenue-chez-vous-item`) | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-revue2/bienvenue-chez-vous-item/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-revue2/bienvenue-chez-vous-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-revue2/404/planche.png` |

Notes sur la passe :
- `shoot.mjs --crawl --nav` a capturé 3 pages (accueil, item carte, 404). La page `/reservation/` apparaît dans l'audit mais n'a pas de dossier de captures.
- `planche.py` a traité `--colonnes 4` et `--largeur 480` comme des fichiers (lignes « ignoré » dans le journal). Les planches sont sorties à la largeur par défaut (1920 × 5280 px, 19 images chacune).
- Le premier passage de captures est tombé sur `ERR_CONNECTION_REFUSED` : le serveur de la première tentative était déjà mort. Relancé en détaché, les captures ont abouti.

## Chiffres par page (extraits de report.json)

### Accueil
- Erreurs console : 0. Requêtes en échec : 0.
- axe : 0 violation, 0 serious, 28 contrastNeedsReview.
- CLS : bureau 0.001, mobile 0.01.
- LCP : bureau 108 ms (img.photo), mobile 1140 ms (img.photo).
- Load : bureau 167 ms, mobile 2241 ms.
- Débordement horizontal : non (bureau et mobile). Cibles tactiles trop petites : 0. Éléments hors écran (offenders) : 0.
- Clavier : 12 arrêts de focus, focus invisible 0, sans indicateur de focus visible 0, bloqué : non. skipLinkFirst : false (premier arrêt : « Aller au contenu »).
- Mouvement réduit : texte masqué 0, animation active : non.

### Carte, item (`bienvenue-chez-vous-item`)
- Erreurs console : 0. Requêtes en échec : 0.
- axe : 0 violation, 0 serious, 40 contrastNeedsReview.
- CLS : bureau 0, mobile 0.003.
- LCP : bureau 204 ms (div.split-line), mobile 2244 ms (p.entete__intro).
- Load : bureau 158 ms, mobile 2106 ms.
- Débordement horizontal : non. Cibles tactiles trop petites : 0. Offenders : 0.
- Clavier : 12 arrêts de focus, focus invisible 0, sans indicateur visible 0, bloqué : non.
- Mouvement réduit : texte masqué 0, animation active : non.

### 404
- Erreurs console : 0. Requêtes en échec : 0.
- axe : 1 violation **serious**, `color-contrast`, 2 nœuds : `.kyw-footer__note` et un `span`, couleur #6b787d sur #fbfaf8 à 4.36:1 (seuil 4.5:1). contrastNeedsReview : 0.
- CLS : bureau 0, mobile 0.
- LCP : bureau 44 ms (p), mobile 252 ms (p).
- Load : bureau 21 ms, mobile 420 ms.
- Débordement horizontal : non. Cibles tactiles trop petites : 1 sur bureau et sur mobile (« la page d'accueil », 128 × 20). Offenders : 0.
- Clavier : 3 arrêts (« la page d'accueil », « Réalisé par », « body: focus left the page »), focus invisible 0, sans indicateur visible 0, bloqué : non.
- Hover : « la page d'accueil » et « Réalisé par » sans changement au survol (react = none).
- Mouvement réduit : texte masqué 0, animation active : non.

## Audit (audit.mjs)

Journal : `.logs/bienvenue-chez-vous-awwwards-revue2-audit.log`. Résultat : **0 FAIL, 3 WARN**. 4 pages crawlées.
- WARN `/bienvenue-chez-vous/awwwards/reservation/` : phrase répétée 5 fois, « 12 h à 13 h 30, 19 h 30 à 21 h ».
- WARN site : pas de robots.txt.
- WARN site : pas de sitemap (l'audit ne trouve pas le sitemap-index.xml que l'build a créé dans `dist/`).
- Poids de la page d'accueil : environ 1046 KB (html 5, JS 6 gz, CSS 6 gz, polices 77, images 952).

## Non extrait
- FPS de défilement mobile et desktop (scrollFps), et détail des 28 et 40 nœuds contrastNeedsReview : présents dans report.json, non relevés dans cette passe.
