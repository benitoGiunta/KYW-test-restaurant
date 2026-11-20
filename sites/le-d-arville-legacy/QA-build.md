# QA build : le-d-arville / legacy

Build : `sites/le-d-arville-legacy` → `dist/le-d-arville/legacy/`, exit 0, 9 pages construites (journal `.logs/le-d-arville-legacy-build-build.log`).
Serveur local : `dist` sur `http://127.0.0.1:4503/le-d-arville/legacy/`, arrêté après les captures.

## Pages captées (shoot)

Le crawl a capté 3 dossiers de pages (sortie : « 3 pages shot »). L'audit a crawlé 8 pages (voir section Audit).

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil | `/home/user/KYW-test-restaurant/.shots-le-d-arville-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-legacy-build/home/planche.png` |
| Carte (`carte/`) | `/home/user/KYW-test-restaurant/.shots-le-d-arville-legacy-build/le-d-arville-item/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-legacy-build/le-d-arville-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-d-arville-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-legacy-build/404/planche.png` |

Le dossier `le-d-arville-item/` contient en réalité la page `carte/` (URL d'origine). Les pages `photos/`, `chambres/`, `seminaires/`, `cheque-cadeau/`, `traiteur-noel/` et `reservation/` n'ont pas de dossier de captures.

## Chiffres par page (report.json)

| Champ | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (`color-contrast`, impact serious, 2 nœuds) |
| LCP desktop / mobile (ms) | 544 / 1008 | 536 / 800 | 32 / 224 |
| CLS desktop / mobile | 0.001 / 0.004 | 0.003 / 0.003 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil », 128x20) |
| Focus clavier invisible | « Toute la carte » | « Ouvrir la carte des vins » | aucun |
| Focus clavier sans indicateur visible | aucun | aucun | aucun |
| Blocage du focus clavier | non | non | non |
| Texte masqué (reduced) | 0 | 0 | 0 |

Détail des points saillants :
- 404 : contraste insuffisant sur `.kyw-footer__note` et un `span`, `#6b787d` sur `#fbfaf8`, 4.36:1 (requis 4.5:1).
- Accueil et carte : focus invisible sur un lien (« Toute la carte » et « Ouvrir la carte des vins », tous deux mesurés par le rapport).
- Vitesse de défilement (FPS) : 60 à 61 FPS desktop et mobile (rendu logiciel, à lire comme indicatif).

## Audit (audit.mjs)

- Résultat : **0 FAIL, 26 WARN**.
- 8 pages crawlées ; page la plus lourde : `/le-d-arville/legacy/photos/` (~2939 KB, images 2825 KB).
- WARN récurrents :
  - `missing og:image` et `missing twitter:card` sur 8 pages (accueil, carte, photos, chambres, séminaires, cheque-cadeau, traiteur-noel, reservation) : 16 WARN.
  - `no robots.txt` et `no sitemap` au niveau du site : 2 WARN (le sitemap est pourtant généré par le build, `sitemap-index.xml` ; le contrôle ne le détecte pas).
  - `ttf/otf font shipped` (police `ieVq2YZ…Ncs2Za4Q.ttf`, à passer en woff2) sur 8 pages : 8 WARN.

Journal complet : `/home/user/KYW-test-restaurant/.logs/le-d-arville-legacy-build-audit.log`.
