# QA build : cafe-fleuri / awwwards

Passe : build · Phase : test · Rôle : captures
Build : `scripts/build-site.mjs sites/cafe-fleuri-awwwards` → `dist/cafe-fleuri/awwwards/`, exit 0 (5 pages).
Serveur : `serve.mjs dist --port 4502`, arrêté après les captures.
Captures : `shoot.mjs --crawl --nav`, exit 0. Audit : `audit.mjs`, exit 0.

## Pages capturées

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/cafe-fleuri/awwwards/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-build/home/planche.png` |
| Carte (type « item ») | `/cafe-fleuri/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-build/cafe-fleuri-item/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-build/cafe-fleuri-item/planche.png` |
| 404 (page inexistante, `__shoot-missing-page-*`) | `http://127.0.0.1:4502/__shoot-missing-page-1795136714083` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-build/404/planche.png` |

Le crawl ne couvre que ces trois types. Histoire et réservation ne sont pas capturées ; elles apparaissent seulement dans l'audit.
Résumé global : `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-build/summary.json`.

## Chiffres par page (report.json et summary.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 1 (`color-contrast` x2 : `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| Axe « contrast needs review » | 23 | 10 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 76 | 496 | 40 |
| LCP mobile, throttled (ms) | 880 | 1740 | 224 |
| Chargement load desktop / mobile (ms) | 124 / 1873 | 120 / 1716 | 21 / 405 |
| Stabilisation du premier écran (ms) | 2355 | 2296 | 2206 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 61 / 60 |
| Débordement horizontal | non | non | non |
| Éléments cachés, texte réduit | 0 | 0 | 0 |
| Mouvement avec réduction | non | non | non |
| Cibles tactiles petites | 6 | 5 | 1 |
| Focus clavier non visible | 0 | 0 | 0 |
| Focus clavier invisible | 0 | 0 | 0 |
| Survol sans changement | 1 | 2 | 2 |
| Survol changement couleur seule | 2 | 1 | 0 |
| Mouvement au repos (idle) | oui | oui | non |
| Premier focus clavier | « Aller au contenu » | « Aller au contenu » | « la page d'accueil » |
| Nombre d'arrêts clavier | 12 | 12 | 3 |
| WebGL actif | non | non | non |

Notes des rapports : les FPS desktop tournent sur GPU logiciel headless (plancher, pas une mesure). Les FPS et vitales mobiles sont à 4x de ralentissement CPU et slow 4G.

Cibles tactiles petites (accueil) : liens « A » 156x22 (logo), téléphone 102x22, « La carte » 65x22, « Histoire » 61x22, « Réserver » 73x22, « Plan » 35x22 (desktop).

## Audit (audit.mjs)

- Résultat : **0 FAIL, 4 WARN**, 4 pages explorées.
- WARN `/cafe-fleuri/awwwards/reservation/` : phrase répétée 7x « 9 h à 14 h 30 ».
- WARN `/cafe-fleuri/awwwards/reservation/` : phrase répétée 2x « Horaires indicatifs, relevés chez un annuaire tiers. ».
- WARN site : pas de `robots.txt`.
- WARN site : pas de `sitemap`.
- Poids de la page la plus lourde : accueil, ~151 KB (HTML 4, JS 61 gz, CSS 5 gz, polices 71, images 11).

## Fichiers

- Journaux : `/home/user/KYW-test-restaurant/.logs/cafe-fleuri-awwwards-build-*.log`
- Aucun fichier source modifié, aucun commit.
