# QA revue 2 — novobel, variante portfolio

Build : `sites/novobel-portfolio` → `dist/novobel/portfolio/` (7 pages, exit 0).
Serveur local : `dist/` sur http://127.0.0.1:4501/novobel/portfolio/ (arrêté après les captures).

## Captures et planches

Pages capturées par `shoot.mjs --crawl --nav` (3 dossiers) :

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/novobel/portfolio/` | `/home/user/KYW-test-restaurant/.shots-novobel-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-novobel-portfolio-revue2/home/planche.png` |
| Services `/novobel/portfolio/services/` | `/home/user/KYW-test-restaurant/.shots-novobel-portfolio-revue2/novobel-item/` | `/home/user/KYW-test-restaurant/.shots-novobel-portfolio-revue2/novobel-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-novobel-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-novobel-portfolio-revue2/404/planche.png` |

Note : `planche.py` a ignoré `--colonnes 4 --largeur 480` (lus comme des fichiers, « ignoré 4 », « ignoré 480 »). Les planches sont sorties avec les réglages par défaut (1920 × 5280 px, 19 images chacune).

Le crawl a visité 6 pages (audit) mais seules 3 ont été capturées par `shoot.mjs` (accueil, services, 404) : projets, maison, carrière et contact n'ont pas de dossier de captures.

## Chiffres des report.json

| Indicateur | Accueil | Services | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 (`color-contrast`, serious) |
| Contraste « à vérifier » (axe) | 19 | 17 | non relevé |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms, élément) | 124 (img) | 72 (p.etape__texte) | 52 (p) |
| LCP mobile (ms, élément) | 1240 (p.ardoise__accroche) | 1196 (p.etape__texte) | 264 (p) |
| Chargement load desktop / mobile (ms) | 123 / 2180 | 105 / 2671 | 30 / 414 |
| FPS scroll desktop / mobile (worst frame ms) | 60 (17) / 60 (17) | 60 (17) / 60 (33) | 61 (17) / 60 (17) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments en débordement (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Clavier : focus sans style visible | aucun | aucun | aucun |
| Clavier : focus invisible / bloqué | aucun / non | aucun / non | « focus left the page » (body) signalé |
| Survol sans changement visible (`noHoverChange`) | aucun | aucun | 2 liens (`la page d'accueil`, `Réalisé par`) |
| Survol changeant seulement la couleur (`colorOnly`) | 3 liens | 6 liens | aucun |
| Éléments cachés en mouvement réduit (`hiddenText`) / animations (`moving`) | 0 / non | 0 / non | 0 / non |

Détail des violations axe (404) : `color-contrast`, impact serious, 2 nœuds — `.kyw-footer__note` (#6b787d sur #fbfaf8, 4.36:1, requis 4.5:1) et un `span` dans le même contexte.

Remarques de l'outil (notes, identiques sur les 3 pages) : le FPS desktop tourne en rendu logiciel headless (plancher, pas une mesure) ; le mobile est en ralentissement CPU x4 et slow 4G.

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 8 WARN** (6 pages crawlées).

- 6 × WARN « sentence repeated 6x » : « Rénovation complète · Gros œuvre · Finitions · Installations technique » répétée 6 fois, sur `/`, `/services/`, `/projets/`, `/maison/`, `/carriere/`, `/contact/`.
- WARN site : « no robots.txt ».
- WARN site : « no sitemap » (le build a pourtant écrit `sitemap-index.xml` dans `dist/`; l'audit cherche le fichier à un autre emplacement).

Journal complet : `/home/user/KYW-test-restaurant/.logs/novobel-portfolio-revue2-audit.log`.
