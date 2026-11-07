# QA revue 1 : l-essentiel / portfolio

Faits seulement. Build, captures et audit faits le 2026-11-07 sur `dist/l-essentiel/portfolio/`, servi en local (port 4501, arrêté ensuite).

## Build

- `scripts/q.sh l-essentiel-portfolio-revue1-build node scripts/build-site.mjs sites/l-essentiel-portfolio` : exit 0, 7 pages construites, sitemap créé. Journal : `.logs/l-essentiel-portfolio-revue1-build.log`.

## Captures et planches

Dossier de captures : `.shots-l-essentiel-portfolio-revue1/`. Résumé : `.shots-l-essentiel-portfolio-revue1/summary.json`.

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/l-essentiel/portfolio/` | `.shots-l-essentiel-portfolio-revue1/home/` | `.shots-l-essentiel-portfolio-revue1/home/planche.png` |
| Menu `/menu/` (dossier `l-essentiel-item`) | `.shots-l-essentiel-portfolio-revue1/l-essentiel-item/` | `.shots-l-essentiel-portfolio-revue1/l-essentiel-item/planche.png` |
| 404 | `.shots-l-essentiel-portfolio-revue1/404/` | `.shots-l-essentiel-portfolio-revue1/404/planche.png` |

- Le crawl de l'audit trouve 6 pages (accueil, menu, carte, maison, chambres, réservation). Le shoot n'a produit que les 3 dossiers ci-dessus.
- Les planches ont été générées avec `scripts/planche.py` ; les options `--colonnes 4 --largeur 480` ne sont pas reconnues par le script (il affiche « ignoré 4 » et « ignoré 480 »). Les planches font 1920 px de large (404 : 14 images ; accueil : 19 ; menu : 19).

## Chiffres par page (report.json et summary.json)

| Mesure | Accueil | Menu | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations sérieuses | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Axe : à vérifier (contraste) | 15 | 2 | 0 |
| LCP desktop (ms) | 2592 | 160 | 40 |
| CLS desktop | 0 | 0 | 0 |
| LCP mobile (ms, throttled) | 2224 | 2192 | 220 |
| CLS mobile | 0 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Texte caché (hiddenTextReduced) | 0 | 0 | 0 |
| Mouvement réduit (movingReduced) | false | false | false |
| FPS desktop / mobile | 60 / 60 | 60 / 60 | 61 / 60 |
| Temps de stabilisation du hero (ms) | 4311 | 4218 | 2168 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : focus non visible | 0 | 0 | 0 |
| Clavier : lien d'évitement en premier | false | false | false |
| Survol sans changement | 0 | 1 | 0 |
| Information par la couleur seule | 3 | 1 | 0 |
| Mouvement permanent (idleMotion) | false | false | false |

Notes :
- Accueil : 12 arrêts de tabulation ; le premier est le lien « Aller au contenu ». Le champ `skipLinkFirst` vaut pourtant false.
- Les FPS desktop sont mesurés en headless sur GPU logiciel (valeur plancher selon le rapport).
- Mobile : ralentissement CPU 4x, 4G lente.

## Audit (`scripts/q.sh l-essentiel-portfolio-revue1-audit node .claude/skills/awwwards/scripts/audit.mjs`)

- Journal : `.logs/l-essentiel-portfolio-revue1-audit.log`.
- Résultat : **0 FAIL, 9 WARN**.
- Lignes FAIL : aucune.
- WARN :
  1. `/l-essentiel/portfolio/` : phrase répétée 4x « 12 h à 14 h, 19 h à 21 h 30 »
  2. `/menu/` : même phrase répétée 4x
  3. `/carte/` : même phrase répétée 4x
  4. `/maison/` : même phrase répétée 4x
  5. `/chambres/` : même phrase répétée 4x
  6. `/reservation/` : même phrase répétée 8x
  7. site : la page 404 n'a pas de `<h1>`
  8. site : pas de `robots.txt`
  9. site : pas de sitemap (l'audit ne voit pas le sitemap ; le build l'a créé dans `sites/l-essentiel-portfolio/dist`)
- Poids de la page la plus lourde : `/l-essentiel/portfolio/maison/`, environ 638 Ko (4 HTML, 6 JS gz, 6 CSS gz, 58 polices, 565 images).

## Arrêt

- Serveur statique arrêté (PID 21001).
- Aucun fichier source modifié, aucun commit.
