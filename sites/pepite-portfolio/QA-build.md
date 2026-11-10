# QA build — pepite / portfolio (faits)

Build : `scripts/build-site.mjs sites/pepite-portfolio` → exit 0, 7 pages, `dist/pepite/portfolio/`.
Serveur local : `dist` sur http://127.0.0.1:4501/pepite/portfolio/ (arrêté après les captures).
Journaux : `.logs/pepite-portfolio-build-*.log`.

## Pages captées (shoot `--crawl --nav`, 3 pages)

| Page | URL | Dossier captures | Planche |
|---|---|---|---|
| Accueil | /pepite/portfolio/ | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-build/home/planche.png` |
| La carte | /pepite/portfolio/carte/ | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-build/pepite-item/` | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-build/pepite-item/planche.png` |
| 404 | /__shoot-missing-page (URL inexistante) | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-build/404/planche.png` |

Note : la capture a reconnu 3 pages ; l'audit a crawlé 6 pages (`/`, `/carte/`, `/vins/`, `/histoire/`, `/soirees/`, `/reservation/`, selon ses lignes WARN).
Note : `--nav` n'a trouvé aucun lien cliquable sur la page 404.

## Chiffres par page (report.json)

| Indicateur | Accueil | La carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 (serious 0 ; 17 contrast à revoir) | 0 (serious 0 ; 9 contrast à revoir) | 2 : `document-title`, `html-has-lang` (serious) |
| LCP desktop | 144 ms (img) | 92 ms (h1.hero__titre) | 36 ms (pre) |
| LCP mobile | 1244 ms (img) | 1836 ms (p.lead) | 248 ms (pre) |
| CLS desktop | 0.022 | 0.024 | 0 |
| CLS mobile | 0.001 | 0 | 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Cibles tactiles petites (desktop / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| Élements en débordement (offenders) | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus sans indicateur visible | 0 | 0 | 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : piège (stuck) | non | non | non (focus sort de la page) |
| Survol : cibles testées | 7 | 6 | 0 |
| Survol : sans changement / couleur seule / recouvert | 0 / 0 / 0 | 0 / 0 / 0 | — |
| Curseur personnalisé détecté | oui | oui | non |
| FPS défilement desktop (headless, plancher) | 60 (pire trame 33 ms) | 59 (pire trame 33 ms) | 61 |
| FPS défilement mobile | 60 (pire trame 17 ms) | 60 (pire trame 17 ms) | 60 |
| Temps de chargement desktop / mobile | 185 ms / 3225 ms | 140 ms / 1808 ms | 32 ms / 228 ms |
| Stabilisation mobile | 9508 ms | 3889 ms | 2230 ms |
| Hauteur de page desktop / mobile | 13431 / 9549 px | 2732 / 2679 px | 900 / 2121 px |
| Titre `<title>` | « Pépite | Cave à manger à Namur » | « La carte | Pépite » | vide |
| `h1` | « CAVE À MANGER » | « LA CARTE » | aucun |
| Poids de la page la plus lourde (audit) | ~563 KB (html 5, JS 8 gz, CSS 6 gz, fonts 38, images 506) | — | — |

## Audit (`audit.mjs`)

- Résultat : **0 FAIL**, **8 WARN** (journal : `.logs/pepite-portfolio-build-audit.log`).
- WARN « phrase répétée » (5) : `/` (2x « Le menu se déguste tel quel ou à l'assiette. » ; 3x « Boutique dès 16h, cave à manger dès 19h » ; 2x « Boutique dès 10h30, cave à manger dès 19h ; samedi midi sur demande ») ; `/reservation/` (3x « Boutique dès 16h, cave à manger dès 19h » ; 2x « Boutique dès 10h30… »).
- WARN site (3) : page 404 sans `<h1>` ; pas de `robots.txt` ; pas de `sitemap`.

Remarque : l'audit signale le sitemap absent alors que le build annonce `sitemap-index.xml` dans `dist/` ; à vérifier (chemin ou hôte servi).

## Journal de planches

`scripts/planche.py` a bien produit les 3 planches, mais affiche « ignoré 4 » et « ignoré 480 » (ses options `--colonnes`/`--largeur` sont lues comme fichiers). Sans effet sur le résultat.
