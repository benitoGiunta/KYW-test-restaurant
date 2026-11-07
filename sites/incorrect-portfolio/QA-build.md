# QA build : incorrect / portfolio

Passe : build · Rôle : captures · Source : `dist/incorrect/portfolio/` servi sur `http://127.0.0.1:4501/incorrect/portfolio/` (serveur arrêté après la passe).
Faits uniquement, sans analyse de design. Journaux complets dans `.logs/incorrect-portfolio-build-*.log`.

## Build

- `scripts/build-site.mjs sites/incorrect-portfolio` : exit 0, 6 pages construites (404, a-emporter, carte, histoire, index, reservation), sitemap-index.xml généré.

## Captures et planches

Captures : `.shots-incorrect-portfolio-build/<page>/` (le journal indique « 3 pages shot »).

| Page | Dossier de captures | Planche |
|---|---|---|
| / (home) | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-build/home/planche.png` (1920 x 5280, 19 images) |
| /carte/ (incorrect-item) | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-build/incorrect-item/` | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-build/incorrect-item/planche.png` (1920 x 5280, 19 images) |
| 404 | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-build/404/planche.png` (1920 x 4224, 14 images) |

Non couvertes par les captures (présentes dans l'audit, sans dossier de captures) : /histoire/, /a-emporter/, /reservation/.

Remarque : `scripts/planche.py` ne lit pas les options `--colonnes` et `--largeur` (les valeurs `4` et `480` sont prises pour des fichiers et ignorées, avertissements dans le journal). Les planches ont été produites avec les réglages par défaut.

## Chiffres par page (report.json)

| Indicateur | / (home) | /carte/ | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 1 règle : color-contrast, 19 nœuds | 1 règle : color-contrast, 4 nœuds | 2 règles : document-title (1), html-has-lang (1) |
| Contrôles contraste « à revoir » | 47 | 9 | 0 |
| LCP bureau | 108 ms (span.loader__name) | 104 ms (span.loader__name) | 32 ms (pre) |
| LCP mobile | 964 ms (p.hero__baseline) | 920 ms (p.lead) | 208 ms (pre) |
| CLS bureau | 0.067 | 0.001 | 0 |
| CLS mobile | 0.003 | 0 | 0 |
| Débordement horizontal (bureau / mobile) | non / non | non / non | non / non |
| Cibles tactiles petites (mobile) | 0 | 0 | 0 |
| Éléments cachés (texte, reduced) | 0 | 0 | 0 |
| Focus clavier invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Champ `skipLinkFirst` du rapport (lien « Aller au contenu » listé en tête des arrêts clavier sur / et /carte/) | false | false | false |
| Piège clavier (focus bloqué) | non | non | non |
| FPS défilement bureau (plancher, rendu logiciel) | 60 | 60 | 60 |
| FPS défilement mobile | 60 | 60 | 60 |
| Titre de page | « Incorrect \| Pizzeria rock-n-roll à Namur » | « La carte \| Incorrect » | absent |
| H1 | « INCORRECT PIZZERIA » | « LA CARTE » | aucun |

Notes de la passe :
- Sur /, l'élément de contraste en échec est `div[data-jour] > dt > span` et `dd` (#f1ecdd sur #ff4b2b, 2.82:1, seuil 3:1).
- Sur /carte/, l'échec porte sur `article > .formule__prix` (#ff4b2b sur #f1ecdd, 2.82:1).
- Sur 404, la sonde `--nav` n'a trouvé aucun lien vers une autre page ; le focus sort de la page (« body: focus left the page »).

## Audit (audit.mjs)

Résultat : **0 FAIL, 8 WARN**. Pages explorées : 5 (/, /carte/, /histoire/, /a-emporter/, /reservation/). Poids de la page la plus lourde : /incorrect/portfolio/ ~876 KB (HTML 7, JS 7 gz, CSS 6 gz, polices 88, images 767).

WARN :
1. `sentence repeated 2x` « Mardi au samedi, 18 h 30 à 21 h 30 ; samedi midi aussi » : sur /, /carte/, /histoire/, /a-emporter/, /reservation/ (5 WARN).
2. `site` : la page 404 n'a pas de `<h1>`.
3. `site` : pas de robots.txt.
4. `site` : pas de sitemap.

Les 8 WARN de l'audit comprennent les 5 répétitions de phrase, le H1 de la 404, robots.txt et sitemap.
