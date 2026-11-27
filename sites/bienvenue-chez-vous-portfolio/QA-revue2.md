# QA revue 2 : bienvenue-chez-vous / portfolio

Statut : **captures incomplètes**. Le shoot a échoué sur les trois pages (voir ci-dessous) ; les chiffres de capture (console, réseau, axe, CLS, LCP, débordement, clavier) ne sont pas disponibles.

## Build
- `scripts/build-site.mjs sites/bienvenue-chez-vous-portfolio` : exit 0, 7 pages, journal `.logs/bienvenue-chez-vous-portfolio-revue2-build.log`.

## Captures
- Dossier : `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-portfolio-revue2/`
- `summary.json` : les 3 pages ont `shootFailed` :
  - `home` : "page.evaluate: Target page, context or browser has been closed"
  - `bienvenue-chez-vous-item` (`/menu/`) : "browser.newContext: Target page, context or browser has been closed"
  - `404` : "browser.newContext: Target page, context or browser has been closed"
- Aucun `report.json` produit. Dossiers `404/` et `bienvenue-chez-vous-item/` vides.
- Dossier `home/` : 31 PNG (d-00 à d-07, d-90 à d-92 ; h-01 à h-07 rest/hover ; k-01 à k-04 focus). Captures partielles.
- Planche : `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-portfolio-revue2/home/planche.png` (31 vignettes). Les arguments `--colonnes 4 --largeur 480` n'ont pas été reconnus par `scripts/planche.py` et ont été pris pour des fichiers (ignorés, sans effet sur la planche).
- Journal : `.logs/bienvenue-chez-vous-portfolio-revue2-shoot.log`. Le processus a été tué puis le journal indique « 3 pages shot » ; les captures ne sont donc pas complètes.
- Processus concurrents sur la machine au moment du run (serve 4437, 4502, 4503 ; shoot 4502) : cause possible, non vérifiée.

## Audit (`audit.mjs`, 6 pages crawlées)
- Journal : `.logs/bienvenue-chez-vous-portfolio-revue2-audit.log`
- FAIL : 0
- WARN : 5
  - `/bienvenue-chez-vous/portfolio/` : phrase répétée 2 fois, « du mardi au samedi, 19:30 à 21:00 »
  - `/bienvenue-chez-vous/portfolio/` : phrase répétée 2 fois, « du mardi au samedi, 12:00 à 13:30 »
  - `/bienvenue-chez-vous/portfolio/reservation/` : phrase répétée 5 fois, « 12:00 à 13:30, 19:30 à 21:00 »
  - site : pas de `robots.txt`
  - site : pas de `sitemap`
- Page la plus lourde : `/bienvenue-chez-vous/portfolio/`, ~1252 Ko (html 5, JS 7 gz, CSS 6 gz, fonts 109, images 1125).

## À refaire
- Relancer le shoot seul (une page à la fois : `shoot.mjs <url> --out <dossier>`) pour `home`, `/menu/`, `404`, puis générer `report.json` et les planches.
