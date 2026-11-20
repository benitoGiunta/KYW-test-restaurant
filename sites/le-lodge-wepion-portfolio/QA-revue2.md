# QA revue 2 : le-lodge-wepion-portfolio

Faits extraits des journaux et des report.json (aucune analyse de design). Build, capture et audit lancés sur `dist/le-lodge-wepion/portfolio/` servi en local (127.0.0.1:4501, arrêté après usage). Aucun fichier source modifié, aucun commit.

## Build

- `scripts/q.sh le-lodge-wepion-portfolio-revue2-build` : exit 0, 7 pages construites (404, carte, histoire, index, reservation, tearoom, terrasse).
- Journal : `/home/user/KYW-test-restaurant/.logs/le-lodge-wepion-portfolio-revue2-build.log`

## Captures et planches

| Dossier de captures | Planche | Page |
|---|---|---|
| `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-portfolio-revue2/home/planche.png` | `/le-lodge-wepion/portfolio/` (38 fichiers) |
| `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-portfolio-revue2/le-lodge-wepion-item/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-portfolio-revue2/le-lodge-wepion-item/planche.png` | `/le-lodge-wepion/portfolio/carte/` (40 fichiers) |
| `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-portfolio-revue2/404/planche.png` | page 404 (28 fichiers) |

Journal de capture : `/home/user/KYW-test-restaurant/.logs/le-lodge-wepion-portfolio-revue2-shoot.log`

## Chiffres par page (report.json)

| Indicateur | home | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (toutes) | 0 | 0 | 1 (`color-contrast`, serious, 2 nœuds) |
| Violations axe serious | 0 | 0 | 1 |
| Contraste à vérifier (needs review) | 22 | 12 | 0 |
| CLS desktop / mobile | 0.004 / 0.008 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 108 (p.hero__slogan) | 100 (h1) | 44 (p) |
| LCP mobile (ms) | 1168 (p.hero__slogan) | 1124 (p.lead) | 240 (p) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors écran en débordement (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| FPS scroll desktop (pire trame ms) | 60 (17) | 60 (17) | 61 (17) |
| FPS scroll mobile (pire trame ms) | 60 (17) | 60 (17) | 61 (17) |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | non |
| Survol : cibles couvertes / couleur seule | 2 / 1 | 1 / 2 | 0 / 0 |
| Mouvement réduit : texte caché / animé | 0 / non | | |

Détail utile :
- 404 : violation `color-contrast` sur `.kyw-footer__note` et un `span` (#6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1). Cible tactile petite : "la page d'accueil" (128x20) en desktop et mobile.
- Mention de la fréquence : FPS desktop tournent en rendu logiciel headless (plancher, pas une mesure matérielle) ; mobile à 4x de ralentissement CPU, 4G lente.

## Audit (audit.mjs)

- Résultat : **0 FAIL, 8 WARN**. Crawl de 6 pages.
- Poids de la page la plus lourde : ~605 KB (html 7, JS 74 gz, CSS 7 gz, polices 69, images 447).
- WARN :
  - 6 × « sentence repeated 2x » : "Fermé à Wépion Accueil provisoire au Wine & More, Erpent Réouverture à" sur `/`, `/carte/`, `/tearoom/`, `/histoire/`, `/terrasse/`, `/reservation/`.
  - 2 × site : « no robots.txt », « no sitemap » (le sitemap-index.xml est pourtant généré à la racine du build du site).
- Journal : `/home/user/KYW-test-restaurant/.logs/le-lodge-wepion-portfolio-revue2-audit.log`

## Lignes FAIL

Aucune.
