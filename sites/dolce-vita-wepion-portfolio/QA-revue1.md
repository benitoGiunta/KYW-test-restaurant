# QA revue 1 : dolce-vita-wepion, variante portfolio

Faits mesurés, sans analyse de design. Build, captures et audit faits le 01/11/2026 sur `dist/dolce-vita-wepion/portfolio/` servi en local (port 4501, serveur arrêté après les mesures).

## Build

- `scripts/q.sh dolce-vita-wepion-portfolio-revue1-build` : exit 0, 7 pages construites.
- Journal : `/home/user/KYW-test-restaurant/.logs/dolce-vita-wepion-portfolio-revue1-build.log`

## Pages capturées (shoot.mjs --crawl --nav)

Trois dossiers de captures ont été produits. Pour chacun : `report.json`, captures `d-*.png` (bureau) et `m-*.png` (mobile), planche-contact.

| Page | Dossier de captures | Planche |
|---|---|---|
| `/dolce-vita-wepion/portfolio/` (accueil) | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-portfolio-revue1/home/planche.png` (1920 x 5280, 19 images) |
| `/dolce-vita-wepion/portfolio/carte/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-portfolio-revue1/dolce-vita-wepion-item/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-portfolio-revue1/dolce-vita-wepion-item/planche.png` (1920 x 5280, 19 images) |
| Page 404 (URL inexistante) | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-portfolio-revue1/404/planche.png` (1920 x 4224, 14 images) |

Résumé de capture : `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-portfolio-revue1/summary.json`.
Les pages `/pizze/`, `/histoire/`, `/a-emporter/` et `/reservation/` n'ont pas de dossier de captures : le shoot n'en a produit que trois.

## Mesures par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 | 0 | 2 |
| Axe : sérieuses | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Axe : contraste à vérifier | 44 | 32 | 0 |
| LCP bureau (ms) | 148 (img) | 128 (img) | 40 |
| CLS bureau | 0,001 | 0,001 | 0 |
| FPS défilement bureau | 59 | 60 | 60 |
| LCP mobile (ms, 4x CPU, 4G lente) | 1384 (img) | 1100 (img) | 228 |
| CLS mobile | 0,001 | 0,001 | 0 |
| FPS défilement mobile | 60 | 60 | 60 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments cibles trop petites bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments cachés (WebGL) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : focus sans style visible | 0 | 0 | 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Survol : changement de couleur seul | 2 (« La carte », « Toutes les pizze ») | 1 (« Réserver une table ») | 0 |
| Survol : cibles couvertes | 0 | 0 | 0 |
| Survol : cibles sans changement | 0 | 1 (« La carte ») | 0 |
| Survol : cibles testées | 7 | 7 | 0 |
| Mouvement réduit : mouvement après 1,5 s | non | non | non |
| Mouvement réduit : texte caché | 0 | 0 | 0 |

Note du rapport : les FPS bureau sont mesurés en rendu logiciel headless, donc une valeur plancher et non une mesure matérielle.

## Audit (audit.mjs)

- 6 pages explorées : accueil, carte, pizze, histoire, a-emporter, reservation.
- Journal : `/home/user/KYW-test-restaurant/.logs/dolce-vita-wepion-portfolio-revue1-audit.log`
- Résultat : **0 FAIL, 9 WARN**.
- Poids de la page la plus lourde : `/dolce-vita-wepion/portfolio/`, environ 1586 Ko (images 1464 Ko, polices 49 Ko, JS 61 Ko gzip, CSS 7 Ko gzip).

Les 9 WARN :
1. Phrase répétée 4 fois : « 12:00 à 14:00, 18:00 à 22:00 » sur `/`, `/carte/`, `/pizze/`, `/histoire/`, `/a-emporter/`.
2. Phrase répétée 8 fois, même phrase, sur `/reservation/`.
3. Page 404 sans `<h1>`.
4. Pas de `robots.txt`.
5. Pas de `sitemap`.

Ces WARN couvrent 9 lignes ; aucune ligne FAIL.
