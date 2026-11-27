# QA build : ne5t / portfolio (phase test, passe build)

Build : `scripts/build-site.mjs sites/ne5t-portfolio` exit 0, 8 pages, sortie `dist/ne5t/portfolio/` (journal `.logs/ne5t-portfolio-build-build.log`).
Serveur local : `serve.mjs dist --port 4501`, arrêté après la capture. Shoot : `.shots-ne5t-portfolio-build/` (3 dossiers de pages). Audit : `.logs/ne5t-portfolio-build-audit.log`.

## Captures et planches

| Page | Dossier de captures | Planche | Hauteur bureau |
|---|---|---|---|
| Accueil `/ne5t/portfolio/` | `.shots-ne5t-portfolio-build/home/` | `.shots-ne5t-portfolio-build/home/planche.png` | 7506 px |
| Menu `/ne5t/portfolio/menu/` (dossier `ne5t-item`) | `.shots-ne5t-portfolio-build/ne5t-item/` | `.shots-ne5t-portfolio-build/ne5t-item/planche.png` | 2807 px |
| Page 404 du shoot (`__shoot-missing-page-*`) | `.shots-ne5t-portfolio-build/404/` | `.shots-ne5t-portfolio-build/404/planche.png` | 900 px |

Chaque planche fait 1920 px de large (4 colonnes à 480 px), 19 vignettes. Le shoot n'a capturé que 3 pages ; l'audit en a crawlé 7 (voir ci-dessous).

## Chiffres par page (report.json)

| Indicateur | Accueil | Menu | 404 shoot |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 1 (serious : `label-content-name-mismatch`, `.header__brand`) | 1 (idem) | 1 (serious : `color-contrast`, 2 nœuds `.kyw-footer__note` et `span`, #6b787d sur #fbfaf8 = 4,36:1, seuil 4,5:1) |
| Axe : contrastNeedsReview | 31 | 11 | 0 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms) | 108 | 116 | 48 |
| LCP mobile (ms, throttle) | 1412 | 1196 | 228 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| FPS défilement mobile | 60 | 60 | 60 |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier | non | non | non |
| Focus bloqué | non | non | non |
| Mouvement sans réduction (reduced motion) | aucun texte masqué, pas de mouvement | idem | idem |

## Audit (`audit.mjs`)

- 7 pages crawlées ; page la plus lourde `/ne5t/portfolio/` : ~1294 Ko (HTML 5, JS 7 gz, CSS 6 gz, polices 109, images 1167).
- FAIL : 0.
- WARN : 3.
  - `/ne5t/portfolio/reservation/` : phrase répétée 3 fois : « midi et soir, lunch carte blanche à midi ».
  - site : pas de `robots.txt`.
  - site : pas de `sitemap`.

Note : le `robots.txt` et le `sitemap` sont absents de la sortie de build dans ce test ; le sitemap est pourtant annoncé comme créé par `@astrojs/sitemap` dans le journal de build (`sitemap-index.xml`), à vérifier.

Aucun fichier source modifié, aucun commit.
