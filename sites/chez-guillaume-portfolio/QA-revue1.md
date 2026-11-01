# QA revue 1 — chez-guillaume / portfolio

Build : `sites/chez-guillaume-portfolio` → `dist/chez-guillaume/portfolio/` (exit 0, 7 pages construites).
Serveur local : `http://127.0.0.1:4501/chez-guillaume/portfolio/` (arrêté après les captures).
Captures : `shoot.mjs --crawl --nav` a produit 3 dossiers de pages seulement (home, carte, page 404). Les pages agenda, histoire, privatisation et reservation ne sont pas capturées ; l'audit les a parcourues.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| home (`/`) | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-portfolio-revue1/home/` (13 d-, 6 m-, report.json) | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-portfolio-revue1/home/planche.png` |
| carte (`/carte/`) | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-portfolio-revue1/chez-guillaume-item/` (13 d-, 6 m-, report.json) | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-portfolio-revue1/chez-guillaume-item/planche.png` |
| 404 (URL inexistante de test) | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-portfolio-revue1/404/` (8 d-, 6 m-, report.json) | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-portfolio-revue1/404/planche.png` |

Résumé des captures : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-portfolio-revue1/summary.json`.

## Chiffres par page (report.json)

| Mesure | home | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 (dont 0 serious) ; 7 contrastNeedsReview | 1 (serious) | 2 (serious) |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms) | 104 (img) | 92 (img) | 36 (pre) |
| LCP mobile (ms) | 1044 (span.hero__case) | 1048 (p.lead) | 224 (pre) |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Cibles tactiles trop petites bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Texte caché (reduced) | 0 | 0 | 0 |
| Mouvement en reduced motion | non | non | non |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : tabulations / bloqué | 12 / non | 12 / non | 1 / non |
| Survol : colorOnly / sans changement | 3 / 1 | 6 / 0 | 0 / 0 |
| Survol : cibles couvertes / cibles testées | 0 / 7 | 0 / 7 | 0 / 0 |
| FPS défilement bureau / mobile (pire trame) | 60 / 60 (17 ms) | 60 / 60 (17 ms) | 60 / 60 (17 ms) |
| Stabilisation du premier écran bureau / mobile (ms) | 4250 / 6806 | 4185 / 6624 | 2141 / 2181 |
| Chargement (load) bureau / mobile (ms) | 139 / 2464 | 132 / 2383 | 24 / 207 |
| Débordement / éléments hors cadre bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| h1 | « Chez Guillaume restaurant & comedy club » | « Les menus du mois » | aucun |

Détails utiles :
- home, axe contrastNeedsReview (7 nœuds à revoir, non comptés comme violations).
- home, survol sans couleur seule : `h-02 button "Menu"`, `h-03 a "Les menus du mois"`, `h-05 a "Chez Guillaume, accueil"` (colorOnly) ; `h-06 a "Accueil"` (noHoverChange).
- carte, axe `label-content-name-mismatch` (serious) sur `a[aria-label="Chez Guillaume, accueil"]`.
- carte, survol colorOnly sur 6 cibles : `button "Menu"`, `a "Prendre un ticket"`, `a "Réserver le brunch"`, `a "Chez Guillaume, accueil"`, `a "Accueil"`, `a "Réserver"`.
- 404, axe `document-title` et `html-has-lang` (serious), tous deux sur `html`.
- 404, rapport `--nav` : aucun lien vers une autre page cliquable.
- Mobile : throttling 4x CPU, slow 4G (mesure de référence, selon les notes du rapport).
- FPS bureau : rendu headless logiciel, à lire comme plancher.

## Audit (audit.mjs)

6 pages parcourues : `/`, `/carte/`, `/agenda/`, `/histoire/`, `/privatisation/`, `/reservation/`.
Résultat : **0 FAIL, 14 WARN**.

WARN (14) :
- 11 × « sentence repeated » (phrases répétées) :
  - `/` : « 18:00 à 00:00 (lundi « face à la crise ») » (2x) ; « 18:00 à 00:00 (repas 18:30 à 20:30) » (8x) ; « 10:00 à 18:00 (brunch 11:30 à 14:00, spectacle 15:00) » (2x)
  - `/carte/` : « Dessert : Riz au lait, compotée de coing, prune en pickles » (2x) ; « 18:00 à 00:00 (repas 18:30 à 20:30) » (4x)
  - `/agenda/`, `/privatisation/`, `/histoire/` : « 18:00 à 00:00 (repas 18:30 à 20:30) » (4x chacune)
  - `/reservation/` : « 18:00 à 00:00 (lundi « face à la crise ») » (2x) ; « 18:00 à 00:00 (repas 18:30 à 20:30) » (8x) ; « 10:00 à 18:00 (brunch 11:30 à 14:00, spectacle 15:00) » (2x)
- 404 : la page 404 n'a pas de h1.
- site : pas de robots.txt.
- site : pas de sitemap.

Page la plus lourde (audit) : `/histoire/`, environ 512 KB (HTML 5, JS 61 gz, CSS 6 gz, polices 56, images 385).

## Lignes FAIL

Aucune (0 FAIL).

## Notes de la passe

- Fichiers sources non modifiés, aucun commit.
- Serveur 4501 arrêté (PID 27253 lancé par la passe ; le processus sur le port 4503 n'appartient pas à cette passe et n'a pas été touché).
- Captures incomplètes par rapport à l'audit : 3 pages capturées sur 6 parcourues (voir ci-dessus).
