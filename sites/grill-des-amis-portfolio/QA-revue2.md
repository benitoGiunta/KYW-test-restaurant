# QA revue 2 : grill-des-amis-portfolio

Faits extraits du build, des captures et de l'audit. Aucune analyse de design.

Serveur local : `dist/` servi sur `http://127.0.0.1:4501/grill-des-amis/portfolio/` (arrêté après les captures).

## Build

- `scripts/q.sh grill-des-amis-portfolio-revue2-build` : exit 0, 6 pages construites.
- Journal : `/home/user/KYW-test-restaurant/.logs/grill-des-amis-portfolio-revue2-build.log`

## Captures et planches par page

Le shoot a produit 3 dossiers (`home`, `grill-des-amis-item`, `404`). Le dossier `grill-des-amis-item` correspond à la page `/carte/`. Les pages `/histoire/`, `/reservation/` et `/traiteur/` ont été crawlées par l'audit mais n'ont pas de dossier de captures.

| Page | Dossier de captures | Planche |
|---|---|---|
| `/grill-des-amis/portfolio/` | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-portfolio-revue2/home/planche.png` |
| `/carte/` | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-portfolio-revue2/grill-des-amis-item/` | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-portfolio-revue2/grill-des-amis-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-portfolio-revue2/404/planche.png` |

## Chiffres par page (report.json)

| Mesure | Accueil | Carte (`grill-des-amis-item`) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Violations axe sérieuses | 0 | 0 | 2 |
| Contrast needs review (axe) | 39 | 12 | 0 |
| LCP desktop (ms) | 288 | 152 | 36 |
| CLS desktop | 0.001 | 0.001 | 0 |
| LCP mobile throttled (ms) | 1216 | 1112 | 240 |
| CLS mobile | 0.009 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Petites cibles desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments GL cachés | 0 | 0 | 0 |
| Clavier : focus sans contour visible | 0 | 0 | 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : piège de focus (stuck) | non | non | non |
| Lien d'évitement en premier | non | non | non |

Notes : `reduced` (accueil) liste `hiddenText` et `moving`. Mesures FPS de défilement desktop accueil : 48 fps (pire trame 50 ms) ; mobile accueil : 32 fps.

## Audit (`scripts/q.sh grill-des-amis-portfolio-revue2-audit`)

- Journal : `/home/user/KYW-test-restaurant/.logs/grill-des-amis-portfolio-revue2-audit.log`
- Résultat : **0 FAIL, 12 WARN**. 5 pages crawlées.
- Poids de la page la plus lourde (`/grill-des-amis/portfolio/`) : ~1307 KB ; HTML 6, JS 10 (gz), CSS 7 (gz), polices 63, images 1222.

WARN :
- `sentence repeated 2x` sur l'accueil (4 phrases : « Une viande tendre, une cuisson juste et des frites maison comme on les », « La découpe se fait sous vos yeux, les sauces sont faites maison et l’a », « Le Menu Viandard à quatre : cinq viandes, trois services, et on a tout », « Le feu de bois, ça se sent. »).
- `sentence repeated 4x` : « 12 h à 14 h, 18 h à 21 h 30 » sur l'accueil, `/carte/`, `/histoire/`, `/traiteur/`, `/reservation/`.
- `site` : la page 404 n'a pas de `<h1>`.
- `site` : pas de `robots.txt`.
- `site` : pas de sitemap (audit), alors que le build a créé `sitemap-index.xml` dans `sites/grill-des-amis-portfolio/dist`.
