# QA build : escale-en-vue / portfolio

Build : `pnpm`-free, `scripts/build-site.mjs sites/escale-en-vue-portfolio` exit 0 (6 pages, sitemap créé). Sortie : `dist/escale-en-vue/portfolio/`.
Serveur : `serve.mjs dist --port 4501` (arrêté après les captures).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-build/home/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-build/404/planche.png` |
| Carte (crawl : `escale-en-vue-item`) | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-build/escale-en-vue-item/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-build/escale-en-vue-item/planche.png` |

Le crawl a relevé 3 pages (accueil, 404, `/carte/`) ; `shoot.mjs` indique 3 pages. L'audit en a relevé 5 (`/`, `/carte/`, `/histoire/`, `/terrasse/`, `/reservation/`).

## Chiffres (report.json)

| Indicateur | Accueil | 404 | Carte |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (dont sérieuses) | 0 (0) | 1 (1) | 0 (0) |
| Axe contrastNeedsReview | 28 | 0 | 19 |
| LCP desktop / mobile (ms) | 68 / 1128 | 32 / 228 | 96 / 1084 |
| CLS desktop / mobile | 0,063 / 0,003 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 1 (« la page d'accueil » 128x20) | 0 / 0 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 61 | 60 / 60 |
| Chargement (load) desktop / mobile (ms) | 111 / 3448 | 22 / 413 | 75 / 2065 |
| Clavier : focus invisible / sans focus visible / saut de contenu absent / bloqué | 0 / 0 / non / non | 0 / 0 / non / non | 0 / 0 / non / non |
| Arrêts clavier relevés | 12 | 3 | 12 |

Violation axe 404 : `color-contrast` (sérieuse), 2 nœuds : `.kyw-footer__note` et un `span`, `#6b787d` sur `#fbfaf8`, 4,36:1 (seuil 4,5:1).

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 7 WARN**.
- WARN (5) : phrase répétée 2 fois sur chaque page : « Horaires du jour Ouvert du jeudi soir au dimanche après-midi Saison 20 » (accueil, carte, histoire, terrasse, réservation).
- WARN (2) : `site` sans `robots.txt` ; `site` sans `sitemap` (le build a pourtant créé `sitemap-index.xml`).
- Poids de la page la plus lourde : accueil, ~737 Ko (images 581, polices 69, JS 74 gz, CSS 6 gz).

Notes de mesure : FPS desktop tournent en headless logiciel (plancher, non représentatif) ; mobile mesuré à 4x de ralentissement CPU, 4G lente.
