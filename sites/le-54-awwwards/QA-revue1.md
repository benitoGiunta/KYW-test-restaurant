# QA revue 1 — le-54-awwwards (faits)

Build : `scripts/q.sh le-54-awwwards-revue1-build` exit 0, 5 pages construites, sortie `dist/le-54/awwwards/`.
Serveur : `serve.mjs dist --port 4502`, arrêté après les captures. Captures : `shoot.mjs --crawl --nav`, journal `.logs/le-54-awwwards-revue1-shoot.log`.
Crawl : 4 pages trouvées (audit) ; captures : 3 dossiers (`home`, `le-54-item`, `404`). Le journal de capture signale un 404 volontaire (`__shoot-missing-page-…`), qui correspond au dossier `404`.

## Pages

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/le-54/awwwards/` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-revue1/home/planche.png` |
| Carte | `/le-54/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-revue1/le-54-item/` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-revue1/le-54-item/planche.png` |
| 404 | `/__shoot-missing-page-…` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-revue1/404/planche.png` |

Rapports : `<dossier>/report.json` ; synthèse : `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-revue1/summary.json`.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (`a11y.violations`) | 0 | 0 | 2 (`document-title`, `html-has-lang`, impact serious) |
| Axe « contrast needs review » | 9 | 8 | 0 |
| LCP bureau / mobile (ms) | 140 / 996 | 80 / 1012 | 32 / 244 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites | 0 | 0 | 0 |
| Focus clavier sans indicateur visible / focus invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Piège clavier (stuck) | non | non relevé | non relevé |
| Lien d'évitement en premier (`skipLinkFirst`) | faux | faux | faux |
| Mouvement en mode réduit (`reduced.moving`) | non | non | non |
| Survol sans changement | 0 | 0 | 0 |
| Couleur seule (`colorOnly`) | 0 | 1 | 0 |
| FPS défilement bureau / mobile | 60 / 60 | 60 / 60 | 60 / 61 |
| Fin d'animation du premier écran (ms) | 2587 | 2339 | 2167 |

Remarque sur le clavier : pour l'accueil, la séquence de tabulation commence par « Aller au contenu » et `skipLinkFirst` vaut faux (valeur brute du rapport, non interprétée).

## Audit (`.logs/le-54-awwwards-revue1-audit.log`)

- Résultat : **0 FAIL, 3 WARN**.
- WARN : 404 sans `<h1>` ; pas de `robots.txt` ; pas de `sitemap`.
- Page la plus lourde : `/le-54/awwwards/`, environ 548 KB ; HTML 5, JS 61 (gz), CSS 6 (gz), polices 78, images 398.

## Lignes FAIL

Aucune.
