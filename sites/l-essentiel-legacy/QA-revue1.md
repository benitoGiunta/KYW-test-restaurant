# QA revue1 : l-essentiel-legacy (captures)

Statut : **incomplet**. Les captures se sont interrompues avant la fin ; l'audit n'a pas été exécuté.

## Build
- `scripts/q.sh l-essentiel-legacy-revue1-build` : exit 0, 7 pages, sitemap créé. Journal : `.logs/l-essentiel-legacy-revue1-build.log`.

## Serveur
- Le port 4503 était déjà occupé (EADDRINUSE) ; le serveur a été relancé sur le port 4511 (`.logs/serve-legacy.log`). Il est arrêté.

## Captures
- Dossier : `.shots-l-essentiel-legacy-revue1/`
- `summary.json` : 3 pages visées, toutes en échec (`shootFailed`) :
  - `home` : « Target page, context or browser has been closed » (interruption).
  - `l-essentiel-item` (`/les-chambres/`) : `browser.newContext` idem.
  - `404` : `browser.newContext` idem.
- Dossier `home/` : 12 fichiers `d-*.png` (firstpaint, hero, scroll 02-07, transitions 90 a/b/c, after-nav, back 92 absent), 4 fichiers `k-*.png` (focus), mais **aucun `report.json`** et aucun `m-*.png` (captures mobiles absentes).
- Dossiers `404/` et `l-essentiel-item/` : vides.
- Cause probable : le premier run a été tué (serveur 4503 arrêté par conflit de port, navigation bloquée), le second a été arrêté par mes soins après un blocage prolongé.

## Planche
- `home/planche.png` produite, mais la commande a passé les fichiers `d-*.png` deux fois (doublons). À refaire.
- Pas de planche pour `404/` ni `l-essentiel-item/` (dossiers vides).

## Chiffres report.json (erreurs console, requêtes en échec, axe, CLS, LCP, débordement, cachés, clavier)
- Non disponibles : aucun `report.json` produit.

## Audit (`audit.mjs`)
- Non exécuté. Nombre de FAIL : non mesuré. Nombre de WARN : non mesuré.

## Suite
- Relancer les captures sur un port libre, une page à la fois si nécessaire (`shoot.mjs <url> --out …`), puis l'audit.
