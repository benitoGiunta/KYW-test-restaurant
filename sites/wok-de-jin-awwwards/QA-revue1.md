# QA revue 1 : wok-de-jin, variante awwwards (rôle captures)

Faits seulement. Aucun fichier source modifié, aucun commit.

## Build

- `scripts/q.sh wok-de-jin-awwwards-revue1-build node scripts/build-site.mjs sites/wok-de-jin-awwwards` : exit 0, 5 pages construites, sortie dans `dist/wok-de-jin/awwwards/`.
- Journal : `/home/user/KYW-test-restaurant/.logs/wok-de-jin-awwwards-revue1-build.log`

## Serveur de prévisualisation

- `serve.mjs dist --port 4502`, PID 426, HTTP 200 sur `/wok-de-jin/awwwards/`. Arrêté en fin de tâche.

## Captures (shoot.mjs --crawl --nav)

Échec : le navigateur Playwright a été fermé pendant la capture (`Target page, context or browser has been closed`). Le processus `shoot.mjs` (PID 475) est resté bloqué sans produire de nouvelles captures après environ 36 fichiers ; il a été arrêté manuellement.

`summary.json` (`/home/user/KYW-test-restaurant/.shots-wok-de-jin-awwwards-revue1/summary.json`) :

| Page | URL | Échec |
|---|---|---|
| home | `/wok-de-jin/awwwards/` | `page.waitForTimeout: Target page, context or browser has been closed` |
| wok-de-jin-item | `/wok-de-jin/awwwards/carte/` | `browser.newContext: Target page, context or browser has been closed` |
| 404 | `/__shoot-missing-page-1795131940927` | `browser.newContext: Target page, context or browser has been closed` |

Aucun `report.json` n'a été produit. Les chiffres demandés (erreurs console, requêtes en échec, violations axe, CLS, LCP mobile et desktop, débordement, éléments cachés, clavier) ne sont donc pas disponibles pour ce passage.

Fichiers présents :
- Dossier `home/` : `d-00` à `d-07` (premier rendu, hero, défilement), `d-90` à `d-92` (transition, retour), `h-01` à `h-05` (survol et repos), `k-01` à `k-04` (focus clavier). Aucun `m-*` (mobile).
- Dossier `wok-de-jin-item/` : vide.
- Dossier `404/` : vide.

Planche : `/home/user/KYW-test-restaurant/.shots-wok-de-jin-awwwards-revue1/home/planche.png` (1920 x 3312, 31 images, générée sans les `m-*`). Les options `--colonnes 4 --largeur 480` ont été lues comme fichiers par `planche.py` (avertissements « ignoré 4 » et « ignoré 480 » dans le journal `.logs/wok-de-jin-awwwards-revue1-planche.log`) ; la planche a tout de même été produite.
Pas de planche pour `wok-de-jin-item/` ni `404/` (dossiers vides).

## Audit (audit.mjs)

- `scripts/q.sh wok-de-jin-awwwards-revue1-audit node .claude/skills/awwwards/scripts/audit.mjs http://127.0.0.1:4502/wok-de-jin/awwwards/` : exit 0.
- Résultat : **0 FAIL, 2 WARN**.
  - WARN site : no robots.txt
  - WARN site : no sitemap
- 4 pages explorées ; page la plus lourde `/wok-de-jin/awwwards/` : ~985 KB (html 6, JS 62 gz, CSS 6 gz, fonts 54, images 858).
- Journal : `/home/user/KYW-test-restaurant/.logs/wok-de-jin-awwwards-revue1-audit.log`

## Pour une relance

Relancer uniquement la capture de `carte/` et du 404 après avoir vérifié qu'aucun autre `shoot.mjs` ne tient le navigateur. Le même `/opt/pw-browsers` est utilisé par une capture `legacy` en parallèle sur le port 4503 pendant cette revue.
