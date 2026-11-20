# QA revue 3 — maison-des-desserts-awwwards (phase test, rôle captures)

Build : `scripts/build-site.mjs sites/maison-des-desserts-awwwards` exit 0 (5 pages, journal `.logs/maison-des-desserts-awwwards-revue3-build.log`), sortie dans `dist/maison-des-desserts/awwwards/`.
Serveur : `serve.mjs dist --port 4502` (arrêté après les captures).
Captures : `.shots-maison-des-desserts-awwwards-revue3/` (3 dossiers de page, `report.json` dans chacun).
Audit : `.claude/skills/awwwards/scripts/audit.mjs`, 4 pages explorées, journal `.logs/maison-des-desserts-awwwards-revue3-audit.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/maison-des-desserts/awwwards/` | `.shots-maison-des-desserts-awwwards-revue3/home/` | `.shots-maison-des-desserts-awwwards-revue3/home/planche.png` |
| Carte `/maison-des-desserts/awwwards/carte/` | `.shots-maison-des-desserts-awwwards-revue3/maison-des-desserts-item/` | `.shots-maison-des-desserts-awwwards-revue3/maison-des-desserts-item/planche.png` |
| Page 404 (URL inexistante) | `.shots-maison-des-desserts-awwwards-revue3/404/` | `.shots-maison-des-desserts-awwwards-revue3/404/planche.png` |

Les planches sont en 4 colonnes de 480 px (1920 × 5280). Le script a affiché deux avertissements `ignoré 4` et `ignoré 480` : les valeurs numériques des options `--colonnes` et `--largeur` ont été lues comme fichiers, sans effet sur le résultat.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 1 règle `color-contrast`, 2 nœuds |
| Contraste à vérifier (needs review) | 32 | 215 | 0 |
| CLS bureau / mobile | 0 / 0.001 | 0 / 0.004 | 0 / 0 |
| LCP bureau (ms) | 76 (img) | 124 (div.split-line) | 36 (p) |
| LCP mobile (ms) | 1692 (img) | 1912 (div.split-line) | 224 (p) |
| FPS défilement bureau / mobile | 60 / 60 | 60 / 60 | 60 / 61 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments cachés (texte) | 0 | 0 | 0 |
| Cibles tactiles petites bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Éléments de focus clavier | 12 | 12 | 3 |
| Mouvement réduit (texte caché / en mouvement) | 0 / non | 0 / non | 0 / non |
| Stabilisation de l'écran mobile (ms) | null (encore en mouvement au plafond) | 3919 | 2431 |

Notes du rapport : le FPS bureau est tourné sur GPU logiciel (plancher, non mesure réelle) ; le mobile est à 4× ralentissement CPU, slow 4G.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 2
  - `site` : pas de robots.txt
  - `site` : pas de sitemap (le sitemap est pourtant généré dans `dist/`, à vérifier au niveau du chemin servi)
- Lignes de synthèse : 4 pages explorées, poids le plus lourd `/maison-des-desserts/awwwards/` ~750 KB (html 5, JS 62 gz, CSS 6 gz, polices 67, images 610).

## Points factuels à traiter

1. 404 : une règle axe `color-contrast` en gravité serious, deux nœuds (identifiants non relevés dans le rapport).
2. Accueil, mobile : `settledMs` est null, l'écran est encore en mouvement au plafond de mesure. `reduced.moving` est faux : le mouvement ne persiste pas avec réduction de mouvement activée. La capture `m-01-hero` le confirmera si besoin.
3. 404 : une cible tactile petite (bureau et mobile).
4. Contraste « à vérifier » : 32 sur l'accueil, 215 sur la carte (non comptés comme violations).
