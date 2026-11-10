# QA revue 1 : huile-sur-le-feu / portfolio

Build : `pnpm build:site sites/huile-sur-le-feu-portfolio` (scripts/build-site.mjs), exit 0, 7 pages, sortie `dist/huile-sur-le-feu/portfolio/`.
Serveur local : `serve.mjs dist --port 4501`, arrêté après captures.
Journaux complets : `.logs/huile-sur-le-feu-portfolio-revue1-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| / (home) | `.shots-huile-sur-le-feu-portfolio-revue1/home/` | `.shots-huile-sur-le-feu-portfolio-revue1/home/planche.png` |
| /carte/ | `.shots-huile-sur-le-feu-portfolio-revue1/huile-sur-le-feu-item/` | `.shots-huile-sur-le-feu-portfolio-revue1/huile-sur-le-feu-item/planche.png` |
| 404 (URL inexistante) | `.shots-huile-sur-le-feu-portfolio-revue1/404/` | `.shots-huile-sur-le-feu-portfolio-revue1/404/planche.png` |

Le script shoot.mjs n'a produit que ces 3 dossiers (`.shots-huile-sur-le-feu-portfolio-revue1/summary.json` : « 3 pages shot »). Les pages /huiles/, /boutique/, /histoire/, /reservation/ relevées par l'audit n'ont pas de dossier de captures. Le journal indique « --nav: no link to another page could be clicked (tried none found) » pour la page 404.
planche.py affiche « ignoré 4 » et « ignoré 480 » (valeurs d'options lues comme fichiers) ; la planche sort bien en 4 colonnes de 480 px (largeur 1920 px).

## Chiffres par page (report.json)

| Mesure | home | carte (huile-sur-le-feu-item) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations sérieuses | 0 | 0 | 2 (document-title, html-has-lang) |
| Axe : contrastNeedsReview | 23 | 0 | 0 |
| LCP bureau (ms) | 192 (span.nom__l1) | 276 (div.split-line) | 44 |
| CLS bureau | 0.043 | 0.002 | 0 |
| LCP mobile (ms) | 1172 (span.nom__w) | 2188 (p.muted) | 248 |
| CLS mobile | 0.013 | 0 | 0 |
| Débordement horizontal (bureau / mobile) | non / non | non / non | non / non |
| Cibles tactiles petites (bureau / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments WebGL cachés | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : arrêts de tabulation | 12 | 12 | 1 (sortie de page) |
| Clavier : focus non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piège de focus | non | non | non |
| Survol : sans changement | 0 | 2 | 0 |
| Survol : changement couleur seul | 1 | 0 | 0 |
| Survol : élément recouvert | 1 | 1 | 0 |
| Mouvement réduit : texte caché / mouvement | 0 / non | 0 / non | 0 / non |
| FPS bureau / mobile (scrollFps) | 60 / 60 | 60 / 60 | 60 / 61 |

Remarques du rapport : FPS bureau mesuré sur GPU logiciel (plancher, non représentatif) ; mobile en ralentissement CPU 4x et 4G lente.

## Audit (audit.mjs, racine, 6 pages explorées)

**FAIL : aucun.** **WARN : 9.**

- Phrase répétée (horaires « 12:00 à 14:30, 18:00 à 21:15 ») : 10 fois sur / et /reservation/ ; 5 fois sur /carte/, /huiles/, /boutique/, /histoire/.
- 404 : page sans <h1>.
- Site : pas de robots.txt.
- Site : pas de sitemap (le build a pourtant écrit sitemap-index.xml dans dist/ ; l'audit ne le détecte pas à la racine).
- Page la plus lourde : /histoire/, environ 757 KB ; HTML 5, JS 7 (gz), CSS 7 (gz), polices 41, images 698.
