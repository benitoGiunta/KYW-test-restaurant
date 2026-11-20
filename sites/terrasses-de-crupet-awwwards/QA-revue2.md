# QA revue 2 — terrasses-de-crupet-awwwards (phase test, rôle captures)

## Statut : ECHEC PARTIEL (captures et audit incomplets)

- Build (`scripts/q.sh ...-build`) : OK, exit 0, 5 pages construites, sortie dans `dist/terrasses-de-crupet/awwwards/`.
- Serveur local port 4502 : OK (HTTP 200 sur `/terrasses-de-crupet/awwwards/`). Arrêté ensuite (PID 2056).
- Captures (`shoot.mjs --crawl --nav`) : ECHEC. Le processus est resté bloqué sur la page `home` (une seule capture d'état `firstpaint`, `hero`, `scroll` x6, `transition` x3 écrites), puis a été arrêté manuellement. `summary.json` : 3 entrées en erreur :
  - `home` : `mouse.move: Target page, context or browser has been closed`
  - `terrasses-de-crupet-item` (`/carte/`) : `browser.newContext: Target page, context or browser has been closed`
  - `404` : `browser.newContext: Target page, context or browser has been closed`
- Dossiers de captures : `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-awwwards-revue2/` (`home/` partiel, `terrasses-de-crupet-item/` et `404/` vides).
- Planche : `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-awwwards-revue2/home/planche.png` (13 images, dossier `home` desktop seulement ; aucune image mobile `m-*.png`). Pas de planche pour les autres pages.
- Audit (`audit.mjs`) : NON EXÉCUTÉ. Pas de report.json, donc pas de chiffres (erreurs console, requêtes en échec, violations axe, CLS, LCP mobile/desktop, débordement, éléments cachés, clavier) et pas de compte FAIL/WARN.

## Relance nécessaire

Relancer la capture en plusieurs passes ciblées (une page par commande `shoot.mjs <url> --out …`), puis `audit.mjs` sur l'URL racine. Le crawl complet a bloqué sur la première page et n'a pas abouti.
