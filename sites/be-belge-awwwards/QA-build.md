# QA build : be-belge / awwwards (phase test, passe build)

Build : `scripts/q.sh be-belge-awwwards-build-build` exit 0 (5 pages, sitemap-index.xml créé). Sortie dans `dist/be-belge/awwwards/`.
Serveur local : port 4502, arrêté après la passe.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| / (home) | `/home/user/KYW-test-restaurant/.shots-be-belge-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-be-belge-awwwards-build/home/planche.png` |
| /carte/ (be-belge-item) | `/home/user/KYW-test-restaurant/.shots-be-belge-awwwards-build/be-belge-item/` | `/home/user/KYW-test-restaurant/.shots-be-belge-awwwards-build/be-belge-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-be-belge-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-be-belge-awwwards-build/404/planche.png` |

Note : `scripts/planche.py` a traité `--colonnes 4 --largeur 480` comme des fichiers (« ignoré ») ; les planches ont été produites en largeur 1920 px, 19 images chacune.
Le shoot a couvert 3 pages (home, carte, 404) ; le crawl de l'audit en a trouvé 4 (home, histoire, reservation, carte).

## Chiffres des report.json (home / carte / 404)

| Indicateur | home | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 1 (serious : scrollable-region-focusable) | 0 | 1 (serious : color-contrast, 2 nœuds) |
| Contrastes à vérifier | 9 | 7 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 48 | 52 | 48 |
| LCP mobile (ms) | 1368 (img) | 976 (p.page-tete__chapo) | 240 (p) |
| Débordement horizontal mobile | non | non | non |
| Éléments en débordement (offenders) | 0 | 0 | 0 |
| Petites cibles desktop / mobile | 5 / 5 | 5 / 4 | 1 / 1 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 60 / 61 |
| Texte caché (reduced motion) | 0 | 0 | 0 |
| Clavier : tabulations | 12 | 12 | 3 |
| Clavier : skip link en premier | non | non | non |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | non |

Notes : le FPS desktop tourne en GPU logiciel headless (plancher, pas une mesure matérielle) ; le mobile est en CPU x4 et 4G lente.

## Audit (`audit.mjs`, 4 pages crawlées)

- FAIL : 0
- WARN : 12
  - `/be-belge/awwwards/` : titre de 77 caractères (cible <= 70)
  - `/be-belge/awwwards/` : phrases répétées 2x « Mercredi 12 h à 13 h 30 », « Samedi 19 h à 20 h 30 », « Dimanche 12 h à 13 h 30 »
  - `/be-belge/awwwards/histoire/` : meta description de 179 caractères (cible 50-160)
  - `/be-belge/awwwards/reservation/` : phrases répétées 2x « Mercredi 12 h à 13 h 30 », « Jeudi 12 h à 13 h 30, 19 h à 20 h 30 », « Vendredi 12 h à 13 h 30, 19 h à 20 h 30 », « Samedi 19 h à 20 h 30 », « Dimanche 12 h à 13 h 30 »
  - `site` : pas de robots.txt ; pas de sitemap (le build a pourtant créé `sitemap-index.xml`)
- Poids de la page la plus lourde (`/be-belge/awwwards/`) : ~942 Ko ; HTML 5, JS 61 (gz), CSS 5 (gz), polices 100, images 771.

## Journaux

- `/home/user/KYW-test-restaurant/.logs/be-belge-awwwards-build-build.log`
- `/home/user/KYW-test-restaurant/.logs/be-belge-awwwards-build-shoot.log`
- `/home/user/KYW-test-restaurant/.logs/be-belge-awwwards-build-audit.log`
- `/home/user/KYW-test-restaurant/.logs/serve-awwwards.log`
