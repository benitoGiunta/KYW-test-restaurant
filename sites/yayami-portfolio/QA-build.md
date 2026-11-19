# QA build : yayami / portfolio (passe build, phase test)

Build : `sites/yayami-portfolio` → `dist/yayami/portfolio/` (exit 0, 7 pages Astro).
Serveur local : `http://127.0.0.1:4501/yayami/portfolio/` (arrêté après les captures).
Captures : `/home/user/KYW-test-restaurant/.shots-yayami-portfolio-build/`

## Captures et planches

Le shoot a capturé 3 pages (dossiers de captures et planches de contact) :

| Page | Dossier de captures | Planche |
|---|---|---|
| home (`/yayami/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-yayami-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-yayami-portfolio-build/home/planche.png` |
| yayami-item (`/yayami/portfolio/carte/`) | `/home/user/KYW-test-restaurant/.shots-yayami-portfolio-build/yayami-item/` | `/home/user/KYW-test-restaurant/.shots-yayami-portfolio-build/yayami-item/planche.png` |
| 404 (page introuvable) | `/home/user/KYW-test-restaurant/.shots-yayami-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-yayami-portfolio-build/404/planche.png` |

Chaque planche : 19 images, 1920 × 5280 px. Le script `planche.py` traite aussi les valeurs `4` et `480` des options comme des fichiers (message « ignoré »), sans effet sur la planche produite.

Pages non capturées : boissons, maison, livraison, commander (l'audit les a crawlées, pas le shoot).

## Chiffres par page (`report.json`, `summary.json`)

| Mesure | home | yayami-item | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 | 0 | 1 (color-contrast, serious) |
| Axe : `contrastNeedsReview` | 13 | 4 | 0 |
| CLS desktop / mobile | 0.027 / 0.01 | 0.022 / 0 | 0 / 0 |
| LCP desktop (ms) | 72 (img) | 120 (p.lead) | 36 (p) |
| LCP mobile (ms) | 1576 (img) | 1928 (p.lead) | 232 (p) |
| FPS desktop / mobile | 60 / 60 | 59 / 60 | 60 / 61 |
| Débordement horizontal | non | non | non |
| Cibles tactiles < seuil | 0 | 0 | 1 (« la page d'accueil » 128×20) |
| Texte caché réduit (`hiddenText`) | 0 | 0 | 0 |
| Focus clavier non visible | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Hover sans changement | 0 | 0 | 2 |
| Indication par couleur seule | 1 | 0 | 0 |
| Lien d'évitement en premier | non | non | non |
| Mouvement réduit (`moving`) | non | non | non |
| Stabilisation du hero (ms) | 4700 | 4571 | 2181 |

Détail axe 404 : `color-contrast`, 2 nœuds : `.kyw-footer__note` et un `span`, `#6b787d` sur `#fbfaf8`, 4.36:1 (seuil 4.5:1).

Détail parcours clavier : le champ `keyboard.stops` de `report.json` liste les arrêts (home et yayami-item : liens du header et de la page ; 404 : « la page d'accueil », « Réalisé par », puis sortie du body). Champ `stuck` non relevé.

## Audit (`audit.mjs`, 6 pages crawlées)

- Résultat : **0 FAIL, 9 WARN**.
- WARN :
  - `/yayami/portfolio/` : phrase répétée 2× « Livraison gratuite à partir de 30 €, dans sept codes postaux autour de ».
  - `/yayami/portfolio/` : phrase répétée 14× « 12h à 14h, 18h à 22h ».
  - `/carte/`, `/boissons/`, `/maison/`, `/livraison/` : phrase « 12h à 14h, 18h à 22h » répétée 7× chacune.
  - `/commander/` : phrase « 12h à 14h, 18h à 22h » répétée 14×.
  - site : pas de `robots.txt`.
  - site : pas de sitemap.
- Poids de la page la plus lourde : `/yayami/portfolio/`, environ 1302 Ko (HTML 5, JS 62 Ko gz, CSS 6 Ko gz, polices 38, images 1191).

## Erreurs de build

Aucune.
