# QA revue 1 — incorrect / legacy (captures)

Faits seulement, mesurés sur le build local (`dist/incorrect/legacy/`, serveur statique `127.0.0.1:4503`).

## Build

- `scripts/q.sh incorrect-legacy-revue1-build node scripts/build-site.mjs sites/incorrect-legacy` : exit 0, 2 pages générées (`/index.html`, `/404.html`).

## Pages capturées

Une seule page de contenu a été découverte : `--crawl` et `--nav` n'ont trouvé aucun autre lien (`--nav: no link to another page could be clicked`). La page 404 a été capturée via une URL inexistante.

| Page | Dossier de captures | Planche |
|---|---|---|
| `/incorrect/legacy/` (accueil) | `/home/user/KYW-test-restaurant/.shots-incorrect-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-incorrect-legacy-revue1/home/planche.png` |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-incorrect-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-incorrect-legacy-revue1/404/planche.png` |

Résumé de capture : `/home/user/KYW-test-restaurant/.shots-incorrect-legacy-revue1/summary.json` (2 pages).

Note : la commande de planche donnée (`--colonnes 4 --largeur 480`) n'a pas été interprétée par `scripts/planche.py` : les options sont passées comme fichiers (« ignoré 4 », « ignoré 480 »). Les planches ont été produites avec les PNG seuls (1920 × 4224 px, 14 images chacune).

## Chiffres (report.json)

| Mesure | Accueil | 404 |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe (serious) | 0 | 2 (`document-title`, `html-has-lang`) |
| LCP desktop | 396 ms (img) | 32 ms (pre) |
| LCP mobile | 836 ms (img) | 204 ms (pre) |
| CLS desktop | 0,004 | 0 |
| CLS mobile | 0,026 | 0 |
| Chargement load desktop / mobile | 626 ms / 1538 ms | — |
| FPS scroll desktop / mobile | 60 / 60 (pire frame 17 ms) | — |
| Débordement horizontal desktop / mobile | non / non | non / non |
| Éléments cachés (offenders, glHidden) | 0 / 0 | 0 / 0 |
| Cibles tactiles < seuil desktop / mobile | 0 / 0 | 0 / 0 |
| Clavier : arrêts de tabulation | 12 | 1 |
| Clavier : focus invisible | 2 | 0 |
| Clavier : focus sans indicateur visible | 0 | 0 |
| Clavier : focus bloqué / lien d'évitement en premier | non mesuré (null) | non mesuré (null) |
| Mouvement réduit : texte caché / encore animé | 0 / non | — |
| WebGL | désactivé | — |

Détail accueil, focus invisible : « TÉLÉCHARGER LA CARTE EN PDF » et « RÉSERVER EN LIGNE (BARESTHO) » (deux occurrences du même libellé).

Titre h1 (accueil) : « LA PIZZERIA ROCK-N-ROLL D’ALEX ET ESTELLE ».

Le rapport indique que le FPS desktop tourne en headless sur GPU logiciel (plancher, pas une mesure matérielle).

## Audit (audit.mjs)

- Résultat : **0 FAIL, 11 WARN**. Journal : `/home/user/KYW-test-restaurant/.logs/incorrect-legacy-revue1-audit.log`.
- Lignes WARN :
  1. site — 404 page sans `<h1>`
  2. site — pas de `robots.txt`
  3. site — pas de `sitemap`
  4. `/incorrect/legacy/` — 7 lignes « ttf/otf font shipped » (fichiers ttf, pas woff2)
  5. `/incorrect/legacy/` — « fonts 511 KB (fewer weights, variable font, subset) »
- Décompte : 3 WARN site + 7 WARN fontes ttf/otf + 1 WARN poids des fontes = 11.
- Poids de la page : ~906 KB (HTML 6, JS 1 gz, CSS 5 gz, fontes 511 KB, images 383 KB).
