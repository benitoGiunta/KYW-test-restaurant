# QA revue 1 : dumont-bouge / legacy

Faits seulement, extraits des `report.json` et de l'audit. Build : `dist/dumont-bouge/legacy/` (7 pages construites, exit 0). Serveur local : port 4503, arrêté après les captures.

Captures : `/home/user/KYW-test-restaurant/.shots-dumont-bouge-legacy-revue1/`. Le shoot a annoncé 3 pages capturées (sur 6 pages explorées par le crawl) : `home`, `dumont-bouge-item` (`/boulangerie/`) et `404`.

## Pages

### home (`/dumont-bouge/legacy/`)
- Dossier : `/home/user/KYW-test-restaurant/.shots-dumont-bouge-legacy-revue1/home/`
- Planche : `/home/user/KYW-test-restaurant/.shots-dumont-bouge-legacy-revue1/home/planche.png`
- Console : 0 erreur. Requêtes en échec : 0.
- axe : 0 violation (0 serious, 0 needs-review contraste).
- Débordement horizontal : non (desktop et mobile). Petites cibles : 0 (desktop et mobile).
- LCP desktop 628 ms (élément `img`), CLS desktop 0,001.
- LCP mobile 2116 ms (élément `div.hero__brush`, ralenti 4x, slow 4G), CLS mobile 0.
- FPS scroll : desktop 60, mobile 60.
- Clavier : `noVisibleFocus` 0, `invisibleFocus` 0, `skipLinkFirst` false (le premier arrêt est « Aller au contenu », pas le lien d'évitement en premier focus, à vérifier selon le critère), `stuck` false.
- Survol : `noHoverChange` 2, `colorOnly` 5.
- Mouvement : `idleMotion` false, `movingReduced` false.

### dumont-bouge-item (`/dumont-bouge/legacy/boulangerie/`)
- Dossier : `/home/user/KYW-test-restaurant/.shots-dumont-bouge-legacy-revue1/dumont-bouge-item/`
- Planche : `/home/user/KYW-test-restaurant/.shots-dumont-bouge-legacy-revue1/dumont-bouge-item/planche.png`
- Console : 0 erreur. Requêtes en échec : 0.
- axe : 0 violation.
- Débordement horizontal : non. Petites cibles : 0.
- LCP desktop 436 ms, CLS desktop 0,001.
- LCP mobile 3516 ms, CLS mobile 0. FPS scroll mobile 61.
- Clavier : `noVisibleFocus` 0, `invisibleFocus` 0, `skipLinkFirst` false, `stuck` false.
- Survol : `noHoverChange` 2, `colorOnly` 4.

### 404 (`/__shoot-missing-page-…`, page d'erreur)
- Dossier : `/home/user/KYW-test-restaurant/.shots-dumont-bouge-legacy-revue1/404/`
- Planche : `/home/user/KYW-test-restaurant/.shots-dumont-bouge-legacy-revue1/404/planche.png`
- Console : 0 erreur. Requêtes en échec : 0.
- axe : 1 violation serious, `color-contrast`, 2 nœuds : `.kyw-footer__note` et un `span` (#6b787d sur #fbfaf8, 4,36:1, 4,5:1 requis).
- Débordement horizontal : non.
- Petites cibles : 1 en desktop et 1 en mobile, « la page d'accueil » 128x20.
- LCP desktop 36 ms, CLS 0. LCP mobile 248 ms, CLS 0.
- Clavier : `noVisibleFocus` 0, `invisibleFocus` 0, `skipLinkFirst` false, `stuck` false. Le parcours s'arrête sur « la page d'accueil », « Réalisé par », puis « focus left the page ».

## Audit (`audit.mjs`)
- Journal : `/home/user/KYW-test-restaurant/.logs/dumont-bouge-legacy-revue1-audit.log`
- Résultat : 0 FAIL, 78 WARN (6 pages explorées).
- Poids de la page la plus lourde : `/dumont-bouge/legacy/` ~2218 Ko (HTML 4, JS 1 gz, CSS 6 gz, polices 1499 Ko, images 709).
- Exemple de WARN : `/dumont-bouge/legacy/reservations/` polices 1499 Ko (poids de police, sous-ensemble variable).

## Journaux
- Build : `/home/user/KYW-test-restaurant/.logs/dumont-bouge-legacy-revue1-build.log`
- Shoot : `/home/user/KYW-test-restaurant/.logs/dumont-bouge-legacy-revue1-shoot.log`
- Audit : `/home/user/KYW-test-restaurant/.logs/dumont-bouge-legacy-revue1-audit.log`
