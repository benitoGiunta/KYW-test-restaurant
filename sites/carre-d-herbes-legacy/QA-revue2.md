# QA revue 2 — carre-d-herbes / legacy (phase test)

Statut : capture INCOMPLETE. Build OK, audit OK, captures en échec.

## Build
- `scripts/q.sh carre-d-herbes-legacy-revue2-build` : exit 0, 9 pages construites, dist/carre-d-herbes/legacy/.

## Captures (shoot.mjs --crawl --nav)
- Dossier : `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-legacy-revue2/`
- Pages crawlées par l'audit : 8. Pages tentées par le shoot : 3 (home, carre-d-herbes-item = /le-restaurant/, 404).
- Dossier `home/` : 18 fichiers (d-*, k-* focus, planche.png). Interrompu : `mouse.wheel` puis « Target page, context or browser has been closed ».
- Dossiers `carre-d-herbes-item/` et `404/` : vides (échec « browser.newContext : browser has been closed »).
- Aucun `report.json` produit : 0 sur les 3 pages. Chiffres console, requêtes en échec, axe, CLS, LCP, débordement, éléments cachés : non disponibles.
- Planches : `home/planche.png` produite ; `carre-d-herbes-item/planche.png` et `404/planche.png` absentes.
- Journal : `.logs/carre-d-herbes-legacy-revue2-shoot.log` (6 occurrences de « browser has been closed »).
- Non capturées : les pages /actualites/, /contact/, /bon-cadeau/, /reservations/, /nos-menus/, /fetes-2026/, /le-restaurant/ (hors shoot).

## Audit (audit.mjs)
- Journal : `.logs/carre-d-herbes-legacy-revue2-audit.log`. 8 pages crawlées.
- Résultat : 0 FAIL, 55 WARN.
- WARN récurrents : polices ttf/otf livrées (woff2 recommandé) sur /contact/, /bon-cadeau/, /reservations/ ; poids de fonts 376 KB (variable, subset) sur /actualites/, /contact/, /bon-cadeau/, /reservations/.
- Poids de la page la plus lourde : `/carre-d-herbes/legacy/` ~1401 KB (html 4, JS 1 gz, CSS 5 gz, fonts 376, images 1014).

## Suite à faire
- Relancer la capture (ciblée par page, ou shoot complet) : elle a été interrompue ; cause non identifiée dans ce run (navigateur fermé pendant le shoot, avant ma commande kill).
- Un second serveur sur le port 4503 a échoué (EADDRINUSE) : le serveur du premier lancement est resté actif et a servi l'audit.
