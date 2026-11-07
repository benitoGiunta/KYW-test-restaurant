# QA build : le-royal / portfolio (incomplet)

Passe interrompue : limite de réponses dépassée, capture bloquée puis arrêtée à la main.

## Build
- `scripts/q.sh le-royal-portfolio-build-build` : exit 0, 7 pages, journal `.logs/le-royal-portfolio-build-build.log`.

## Captures
- Page `home` : `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-build/home/` (report.json présent).
  - Planche : `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-build/home/planche.png`.
  - Chiffres report.json : erreurs console 0, requêtes en échec 0, violations axe 0. CLS, LCP, débordement et éléments cachés : champs absents ou vides dans le JSON, non mesurés.
- Page `le-royal-item` (`/carte/`) : `/home/user/KYW-test-restaurant/.shots-le-royal-portfolio-build/le-royal-item/` : 17 fichiers, pas de report.json (capture arrêtée). Planche non produite.

## Audit (`audit.mjs`, journal `.logs/le-royal-portfolio-build-audit.log`)
- 0 page explorée.
- FAIL : `/le-royal/portfolio/` : HTTP fetch failed for an internal link.
- FAIL : site : start page http://127.0.0.1:4501/le-royal/portfolio/ did not load as HTML.
- Total : 2 FAIL, 0 WARN.
- Le même serveur répondait HTTP 200 à `curl` avant la capture : cause non établie.

## Non fait
- Planche de `le-royal-item`, captures complètes du crawl, mesures LCP/CLS mobile et desktop, clavier.
- Serveur 4501 arrêté ; processus `shoot.mjs` 4501 arrêté.
