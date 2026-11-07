# QA build : l-essentiel / portfolio

Passe : build. Source servie : `dist/l-essentiel/portfolio/` via `serve.mjs --port 4501`, URL `http://127.0.0.1:4501/l-essentiel/portfolio/`.

## Build

- `scripts/build-site.mjs sites/l-essentiel-portfolio` : exit 0, 7 pages construites, `dist/l-essentiel/portfolio/`.
- Journal : `.logs/l-essentiel-portfolio-build-build.log`.

## Captures et planches

Crawl : 6 pages trouvées (audit). Captures effectuées : 3 dossiers seulement (voir Points non couverts).

| Page | Dossier de captures | Planche |
|---|---|---|
| home (`/l-essentiel/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-build/home/planche.png` (1920 x 5280, 19 vignettes) |
| menu (`/l-essentiel/portfolio/menu/`, dossier `l-essentiel-item`) | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-build/l-essentiel-item/` | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-build/l-essentiel-item/planche.png` (1920 x 5280, 19 vignettes) |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-build/404/planche.png` (1920 x 4224, 14 vignettes) |

Résumé global : `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-build/summary.json`.

## Chiffres par page (report.json)

| Mesure | home | menu (l-essentiel-item) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total / serious) | 0 / 0 | 0 / 0 | 2 / 2 (`document-title`, `html-has-lang`) |
| Contraste à vérifier (contrastNeedsReview) | 15 | 2 | 0 |
| LCP desktop (ms, élément) | 2560 (img) | 116 (span.nom) | 40 (pre) |
| LCP mobile (ms, élément) | 2204 (img) | 2176 (span.nom) | 216 (pre) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop / mobile (summary) | 60 / 60 | 60 / 60 | n.d. |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Survol : `colorOnly` / `covered` / `noHoverChange` | 3 / 0 / 0 | 1 / 0 / 1 | 0 / 0 / 0 |
| Mouvement réduit : texte caché / animation après chargement | 0 / non | 0 / non | 0 / non |
| Hero stabilisé (settledMs, desktop) | 4280 | 4130 | n.d. |

Détail des points relevés :
- home, `colorOnly` : `h-02 button "Mignon de biche"`, `h-04 a "Une étoile au guide Michelin"`, `h-07 a "+32 81 56 86 16"`.
- menu, `colorOnly` : `h-05 a "+32 81 56 86 16"` ; `noHoverChange` : `h-03 a "La carte"`.
- 404, violations axe : `document-title`, `html-has-lang` (sévérité serious).
- Poids de la page la plus lourde (audit) : `/l-essentiel/portfolio/maison/`, environ 638 KB, 565 images.

## Audit (audit.mjs)

- Résultat : **0 FAIL, 10 WARN**.
- WARN :
  1. `/l-essentiel/portfolio/` : phrase répétée 4 fois, « 12 h à 14 h, 19 h à 21 h 30 ».
  2. `/l-essentiel/portfolio/menu/` : même phrase, 4 fois.
  3. `/l-essentiel/portfolio/carte/` : même phrase, 4 fois.
  4. `/l-essentiel/portfolio/maison/` : même phrase, 4 fois.
  5. `/l-essentiel/portfolio/chambres/` : même phrase, 4 fois.
  6. `/l-essentiel/portfolio/reservation/` : meta description de 189 caractères (cible 50 à 160).
  7. `/l-essentiel/portfolio/reservation/` : même phrase, 8 fois.
  8. site : la page 404 n'a pas de `<h1>`.
  9. site : pas de `robots.txt`.
  10. site : pas de sitemap (l'audit ne trouve pas de sitemap ; le build signale `sitemap-index.xml` créé dans `sites/l-essentiel-portfolio/dist`).
- Journal : `.logs/l-essentiel-portfolio-build-audit.log`.

## Points non couverts

- Crawl : 6 pages trouvées, 3 captures effectuées (home, menu, 404). Les pages carte, maison, chambres et reservation n'ont pas de dossier de captures ; le journal de capture (`.logs/l-essentiel-portfolio-build-shoot.log`) ne signale pas d'erreur.
- Le sujet du 404 (`--nav`) : aucun lien vers une autre page n'a pu être cliqué sur la page 404.

## Journaux

- `.logs/l-essentiel-portfolio-build-build.log`
- `.logs/l-essentiel-portfolio-build-shoot.log`
- `.logs/l-essentiel-portfolio-build-audit.log`
- `.logs/serve-portfolio.log`
- Planches : `.logs/l-essentiel-portfolio-build-planche-home.log`, `.logs/l-essentiel-portfolio-build-planche-l-essentiel-item.log`, `.logs/l-essentiel-portfolio-build-planche-404.log`

Serveur arrêté (PID 12602, port 4501 ne répond plus).
