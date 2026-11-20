# QA revue 1 — le-d-arville / awwwards (faits)

Build : `sites/le-d-arville-awwwards` → `dist/le-d-arville/awwwards/` (exit 0, 5 pages). Serveur local 127.0.0.1:4502, arrêté après les captures.
Captures : `shoot.mjs --crawl --nav`. Audit : `audit.mjs` sur la racine (4 pages crawlées).

## Dossiers de captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-d-arville/awwwards/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-awwwards-revue1/home/planche.png` |
| Carte `/carte/` (dossier `le-d-arville-item`) | `/home/user/KYW-test-restaurant/.shots-le-d-arville-awwwards-revue1/le-d-arville-item/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-awwwards-revue1/le-d-arville-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-d-arville-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-awwwards-revue1/404/planche.png` |

Réservation (`/reservation/`) : pas de dossier de captures (crawlée par l'audit seulement).

## Chiffres par page (report.json / summary.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0 ; contraste à vérifier : 8) | 0 (serious 0 ; contraste à vérifier : 2) | 1 : color-contrast, serious, 2 nœuds (`.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms) | 56 (p.lede) | 88 | 44 |
| LCP mobile (ms) | 2752 (img) | 984 | 228 |
| Débordement horizontal | non | non | non |
| Cibles tactiles trop petites | 0 | 0 | 1 |
| Texte caché réduit | 0 | 0 | 0 |
| Mouvement en préférence réduite | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Survol sans changement | 0 | 1 | 2 |
| Couleur seule | 1 | 1 | 0 |

Le premier arrêt clavier de l'accueil et de la carte est « Aller au contenu ». `skipLinkFirst` vaut false dans summary.json sur les trois pages.
Notes du rapport : FPS bureau mesurés en headless (plancher seulement) ; FPS et LCP mobile sous ralentissement 4x CPU et 4G lente.

## Audit (audit.mjs) : 0 FAIL, 5 WARN

- WARN carte `/carte/` : phrase répétée 2 fois « Pour commencer Quatre mises en bouche ».
- WARN carte `/carte/` : phrase répétée 2 fois « Pour finir Dessert de la carte ».
- WARN réservation `/reservation/` : phrase répétée 2 fois « Rue d’Arville 94 5100 Wierde (Namur) ».
- WARN site : pas de robots.txt.
- WARN site : pas de sitemap (le build a pourtant écrit `sitemap-index.xml` dans `dist/`).

Poids de la page la plus lourde : environ 2508 Ko (images 2301 Ko).

## Journaux

- `/home/user/KYW-test-restaurant/.logs/le-d-arville-awwwards-revue1-build.log`
- `/home/user/KYW-test-restaurant/.logs/le-d-arville-awwwards-revue1-shoot.log`
- `/home/user/KYW-test-restaurant/.logs/le-d-arville-awwwards-revue1-audit.log`
