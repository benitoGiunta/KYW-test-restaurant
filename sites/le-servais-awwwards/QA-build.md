# QA build : le-servais-awwwards (passe build, captures)

Source : `dist/le-servais/awwwards/` servi sur `http://127.0.0.1:4502/le-servais/awwwards/` (serveur arrêté après la passe).
Build : `scripts/build-site.mjs`, 5 pages construites, rc 0.

## Dossiers de captures et planches

| Page | URL | Dossier captures | Planche |
|---|---|---|---|
| Accueil | `/le-servais/awwwards/` | `/home/user/KYW-test-restaurant/.shots-le-servais-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-servais-awwwards-build/home/planche.png` |
| Carte | `/le-servais/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-le-servais-awwwards-build/le-servais-item/` | `/home/user/KYW-test-restaurant/.shots-le-servais-awwwards-build/le-servais-item/planche.png` |
| 404 (page sondée par le crawl) | `/__shoot-missing-page-*` | `/home/user/KYW-test-restaurant/.shots-le-servais-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-servais-awwwards-build/404/planche.png` |

Rapports bruts : `report.json` dans chaque dossier ; `summary.json` dans `/home/user/KYW-test-restaurant/.shots-le-servais-awwwards-build/`.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total / serious) | 0 / 0 | 0 / 0 | 2 / 2 (`document-title`, `html-has-lang`, 1 nœud chacune) |
| Contraste à revoir (axe) | 17 | 226 | 0 |
| CLS bureau / mobile | 0 / 0 | 0.001 / 0.004 | 0 / 0 |
| LCP bureau (ms, élément) | 96 (img) | 244 (h1#titre-carte) | 44 (pre) |
| LCP mobile throttlé (ms, élément) | 1100 (h1#titre-hero) | 1036 (h1#titre-carte) | 228 (pre) |
| Chargement bureau / mobile (ms) | 168 / 2723 | 328 / 1952 | 31 / 223 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments hors cible tactile (bureau / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| Fps défilement bureau / mobile | 60 / 60 | 60 / 60 | 61 / 61 |
| WebGL activé bureau | non | non | non |
| Focus clavier invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier | non | non | non |
| Arrêts clavier | 12 | 12 | 1 |
| Survol sans changement | 1 cible (`h-07`, lien `081 73 65 52`) | 1 cible (`h-06`, lien `081 73 65 52`) | 0 cible |
| Cibles survol couvertes | 0 / 7 | 0 / 7 | 0 / 0 |
| H1 | « LE SERVAIS » | « LA CARTE » | aucun |

Autres constats des rapports : accueil, 7 scroll et 3 transitions (`d-90-*`) et 4 focus clavier capturés ; carte, 2 images de référence `r-01`, `r-02` ; la page 404 capturée ne contient pas de `<h1>`.

## Audit (`scripts/…/audit.mjs`, 4 pages crawlées, page la plus lourde `/le-servais/awwwards/` ~1084 KB)

Journal : `/home/user/KYW-test-restaurant/.logs/le-servais-awwwards-build-audit.log`

- FAIL : 1
  - site : `og:image` `https://kyw-test-restaurant.vercel.app/le-servais/awwwards/og.png` ne charge pas (image 1200x630 à créer).
- WARN : 5
  - `/le-servais/awwwards/carte/` : phrase répétée 2 fois « De 11 h 30 à 22 h, vendredi et samedi jusqu’à minuit ».
  - `/le-servais/awwwards/carte/` : phrase répétée 3 fois « Extrait de la carte du bar ».
  - site : la page 404 n'a pas de `<h1>`.
  - site : pas de `robots.txt`.
  - site : pas de `sitemap`.

## Notes de passe

- Le crawl a visité 3 pages (accueil, carte, 404 sondée) ; l'audit en annonce 4.
- `scripts/planche.py` lit `--colonnes` et `--largeur` comme des fichiers : il imprime « ignoré 4 » et « ignoré 480 » mais produit bien les planches (4 colonnes, 480 px).
- Aucun fichier source modifié, aucun commit.
