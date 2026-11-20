# QA build : cafe-fleuri / legacy

Passe : build · Phase : test · Rôle : captures. Source : `dist/cafe-fleuri/legacy/` (build `scripts/build-site.mjs`, exit 0), servi sur `http://127.0.0.1:4503/cafe-fleuri/legacy/`. Serveur arrêté après les captures.

## Pages capturées

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/cafe-fleuri/legacy/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-build/home/planche.png` |
| Carte `/cafe-fleuri/legacy/carte/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-build/cafe-fleuri-item/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-build/cafe-fleuri-item/planche.png` |
| 404 (page absente) | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-build/404/planche.png` |

Le shoot a produit 3 dossiers (accueil, carte, 404). La page `venir` apparaît dans l'audit mais n'a pas de dossier de captures.

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (color-contrast, serious, 2 nœuds) |
| Axe contrastNeedsReview | 2 | 1 | 0 |
| LCP desktop (ms) | 400 | 352 | 40 |
| CLS desktop | 0 | 0 | 0 |
| LCP mobile throttled (ms) | 732 | 696 | 224 |
| CLS mobile | 0 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cible tactile (smallTargets) desktop / mobile | 1 / 1 | 1 / 1 | 1 / 1 |
| Clavier : arrêts de tabulation | 12 | 9 | 3 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Mouvement réduit : texte caché / animation | 0 / non | 0 / non | 0 / non |

Détails utiles :
- 404 : `color-contrast` sur `.kyw-footer__note` et un `span`, `#6b787d` sur `#fbfaf8` = 4,36:1 (seuil 4,5:1).
- Accueil : `contrastNeedsReview` 2. Carte : 1.
- Petite cible tactile identique sur les trois pages : `081 65 89 15`, 90x22 px (lien téléphone).
- Accueil : LCP desktop sur `p.figure`. Scroll FPS desktop 61 (pire frame 17 ms). Mobile 60 FPS.

## Audit (audit.mjs)

Résultat : **0 FAIL, 17 WARN**. Le poids de la page la plus lourde est d'environ 305 KB (HTML 3, JS 1 gz, CSS 4 gz, polices 286, images 11).

WARN (liste) :
- `missing twitter:card` : accueil et carte.
- `missing og:image` : carte et venir.
- `missing twitter:card` : carte et venir.
- `no robots.txt` et `no sitemap` (niveau site).
- `ttf/otf font shipped` (3 polices par page, accueil, carte et venir) : passer en woff2.

Décompte : le résumé de l'audit annonce 17 WARN ; 16 lignes WARN sont visibles dans le journal (`.logs/cafe-fleuri-legacy-build-audit.log`).
