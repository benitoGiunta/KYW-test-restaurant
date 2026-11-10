# QA build : le-54 / portfolio (passe build, rôle captures)

Build : `scripts/build-site.mjs sites/le-54-portfolio` exit 0, 7 pages, sortie `dist/le-54/portfolio/`.
Serveur : `dist` sur http://127.0.0.1:4501/le-54/portfolio/ (arrêté après les captures).
Journaux : `.logs/le-54-portfolio-build-build.log`, `.logs/le-54-portfolio-build-shoot.log`, `.logs/le-54-portfolio-build-audit.log`.

## Captures et planches

Le crawl du shoot a produit 3 dossiers de pages ; l'audit a crawlé 6 URL.

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-54/portfolio/` | `/home/user/KYW-test-restaurant/.shots-le-54-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-54-portfolio-build/home/planche.png` (1920 x 5280, 19 images) |
| Page item `/le-54/portfolio/menu/` (dossier `le-54-item`) | `/home/user/KYW-test-restaurant/.shots-le-54-portfolio-build/le-54-item/` | `/home/user/KYW-test-restaurant/.shots-le-54-portfolio-build/le-54-item/planche.png` (1920 x 5280, 19 images) |
| 404 `/__shoot-missing-page-*` | `/home/user/KYW-test-restaurant/.shots-le-54-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-54-portfolio-build/404/planche.png` (1920 x 4224, 14 images) |

Résumé du shoot : `/home/user/KYW-test-restaurant/.shots-le-54-portfolio-build/summary.json`.

## Chiffres par page (report.json)

| Mesure | home | le-54-item (menu) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 1 (serious) | 1 (serious) | 2 (serious) |
| Axe : détail | `label-content-name-mismatch` (1 nœud) | `label-content-name-mismatch` (1 nœud) | `document-title`, `html-has-lang` (1 nœud chacun) |
| Axe : contrastNeedsReview | 18 | 3 | 0 |
| Desktop LCP (ms) | 164 | 96 | 40 |
| Desktop CLS | 0 | 0 | 0 |
| Desktop débordement X | oui (1 élément : `img`) | non | non |
| Desktop éléments cachés (glHidden) | 0 | 0 | 0 |
| Desktop petites cibles | 0 | 0 | 0 |
| Mobile LCP (ms, throttled) | 1328 | 1164 | 220 |
| Mobile CLS | 0 | 0 | 0 |
| Mobile débordement X | non | non | non |
| Mobile éléments cachés (glHidden) | 0 | 0 | 0 |
| Mobile petites cibles | 0 | 0 | 0 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : arrêts de tabulation / bloqué | 12 / non | 12 / non | 1 / non |

Note : sur l'accueil, le débordement horizontal desktop est attribué à un `img` (offenders : `["img"]`) ; sur la page menu, aucun débordement.

## Audit (audit.mjs)

- Crawl : 6 pages depuis l'URL racine. Page la plus lourde : `/le-54/portfolio/`, environ 650 KB (html 5, JS 7 gz, CSS 6 gz, fonts 109, images 523).
- Résultat : **0 FAIL, 6 WARN**.
- WARN :
  1. `/le-54/portfolio/` : phrase répétée 2x « Tous les jours sauf mardi et mercredi, 18:30 à 21:00 »
  2. `/le-54/portfolio/` : phrase répétée 2x « Tous les jours sauf mardi, mercredi et samedi, 12:00 à 14:00 »
  3. `/le-54/portfolio/reservation/` : phrase répétée 3x « 12:00 à 14:00, 18:30 à 21:00 »
  4. `site` : la page 404 n'a pas de `<h1>`
  5. `site` : pas de `robots.txt`
  6. `site` : pas de `sitemap` (le build a pourtant créé `sitemap-index.xml` dans `sites/le-54-portfolio/dist`, cf. journal du build)

## Points non réalisés ou écarts observés

- Le shoot n'a pas couvert les 6 URL du crawl de l'audit, seulement 3 dossiers de pages (accueil, menu, 404).
- Le shoot n'a pas écrit les planches pour les autres pages ; les planches listées ci-dessus sont les seules produites.
- Les lignes `WARN` du journal d'audit sont au nombre de 7 par grep, dont une ligne d'en-tête ; le résumé de l'audit annonce 6 WARN, c'est ce chiffre qui est repris.

Aucun fichier source modifié, aucun commit.
