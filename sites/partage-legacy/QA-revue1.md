# QA revue 1 : partage / legacy (captures)

Build : `dist/partage/legacy/` (OK). Serveur local port 4503, arrêté. Journaux : `.logs/partage-legacy-revue1-*.log`. Captures : `.shots-partage-legacy-revue1/<page>/`, planches : `.shots-partage-legacy-revue1/<page>/planche.png`.

Pages : 404, home (`/partage/legacy/`), partage-item (`/partage/legacy/carte/`). Le crawl a relevé 4 pages ; 3 captures faites.

## 404
- Erreurs console : 0 ; requêtes en échec : 0
- Desktop : `{"loadMs":38,"settledMs":2251,"vitals":{"lcpMs":52,"lcpElement":"pre","cls":0},"overflowX":false,"height":900,"smallTargets":0,"scrollFps":{"fps":60,"worstFrameMs":33}}`
- Mobile : `{"loadMs":210,"settledMs":2202,"vitals":{"lcpMs":216,"lcpElement":"pre","cls":0},"overflowX":false,"height":2121,"smallTargets":0,"scrollFps":{"fps":60,"worstFrameMs":33}}`
- Accessibilité : `{"serious":2,"contrastNeedsReview":0,"violations_count":0}`
- Clavier : `{"stops":["(body: focus left the page)"],"skipLinkFirst":false,"noVisibleFocus":[],"invisibleFocus":[],"stuck":false}`
- Réduction de mouvement : `{"hiddenText":0,"moving":false}`

## home
- Erreurs console : 0 ; requêtes en échec : 0
- Desktop : `{"loadMs":865,"settledMs":3928,"vitals":{"lcpMs":568,"lcpElement":"img","cls":0.001},"overflowX":false,"height":6526,"smallTargets":2,"scrollFps":{"fps":60,"worstFrameMs":33}}`
- Mobile : `{"loadMs":1635,"settledMs":4066,"vitals":{"lcpMs":1416,"lcpElement":"p.hero__phrase","cls":0},"overflowX":false,"height":8285,"smallTargets":2,"scrollFps":{"fps":60,"worstFrameMs":17}}`
- Accessibilité : `{"serious":0,"contrastNeedsReview":15,"violations_count":0}`
- Clavier : `{"stops":["a \"Aller au contenu\"","a \"Partage Charles Jeandrain\"","a \"Menus et carte\"","a \"Bon cadeau\"","a \"Réserver une table\"","a \"Réserver une table\"","a \"Lire la carte\"","a \"Toute la carte\"","a \"Offrir un bon cadeau\"","a \"Choisir un jour et une heure\"","a \"081 81 00 98\"","a \"Itinéraire dans Google Maps\""],"skipLinkFirst":false,"noVisibleFocus":[],"invisibleFocus":[],"`
- Réduction de mouvement : `{"hiddenText":0,"moving":false}`

## partage-item
- Erreurs console : 0 ; requêtes en échec : 0
- Desktop : `{"loadMs":785,"settledMs":3498,"vitals":{"lcpMs":484,"lcpElement":"img","cls":0.002},"overflowX":false,"height":1953,"smallTargets":2,"scrollFps":{"fps":60,"worstFrameMs":17}}`
- Mobile : `{"loadMs":1501,"settledMs":3967,"vitals":{"lcpMs":848,"lcpElement":"img","cls":0},"overflowX":false,"height":2822,"smallTargets":2,"scrollFps":{"fps":61,"worstFrameMs":17}}`
- Accessibilité : `{"serious":0,"contrastNeedsReview":3,"violations_count":0}`
- Clavier : `{"stops":["a \"Aller au contenu\"","a \"Partage Charles Jeandrain\"","a \"Menus et carte\"","a \"Bon cadeau\"","a \"Réserver une table\"","button \"Lunch du midi\"","div \"Le lunch, 38 € Uniquement les midis, pou\"","a \"Réserver une table\"","a \"Réserver une table\"","a \"Rue des Fossés Fleuris 18 5000 Namur\"","a \"081 81 00 98\"","a \"Instagram\""],"skipLinkFirst":false,"noVisibleFocus":`
- Réduction de mouvement : `{"hiddenText":0,"moving":false}`

## Audit (`audit.mjs`)
- Lignes FAIL : aucune (0 FAIL, 7 WARN).
- Nombre de WARN : 7 (404 sans h1 ; pas de robots.txt ; pas de sitemap ; police ttf/otf livrée sur 4 pages).
