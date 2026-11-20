# QA build — le-d-arville / portfolio (phase test, passe build)

Build : `pnpm build:site` (script `scripts/build-site.mjs`) OK, exit 0, 8 pages, sortie `dist/le-d-arville/portfolio/`.
Serveur local : `dist` sur 127.0.0.1:4501, arrêté après les captures (HTTP 200 vérifié avant).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-d-arville/portfolio/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-build/home/planche.png` |
| Carte `/le-d-arville/portfolio/menu/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-build/le-d-arville-item/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-build/le-d-arville-item/planche.png` |
| Page 404 (sonde `shoot.mjs`, URL inexistante) | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-build/404/planche.png` |

Rapport par page : `report.json` dans chaque dossier. Résumé du crawl : `.shots-le-d-arville-portfolio-build/summary.json`.
Le crawl a trouvé 7 pages ; `shoot.mjs` a photographié 3 dossiers (accueil, carte, 404).
Journal de capture : `.logs/le-d-arville-portfolio-build-shoot.log`.

Remarque sur la planche : `scripts/planche.py` lit `--colonnes` et `--largeur` comme des fichiers et affiche 3 lignes « ignoré » par planche. La planche est tout de même produite, 1920 px de large (4 × 480), 19 images chacune.

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 | 0 | 1 (serious, `color-contrast`, 2 nœuds) |
| Axe : needs review (contraste) | 22 | 4 | 0 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms, élément) | 88 (img) | 56 (p) | 40 (p) |
| LCP mobile throttled (ms, élément) | 1428 (p.hero__accroche) | 1188 (p) | 232 (p) |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments cachés (`hiddenText`) | 0 | 0 | 0 |
| Cibles tactiles petites | 0 | 0 | 1 (« la page d'accueil » 128×20) |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : piège de focus | non | non | non |
| FPS défilement bureau / mobile (worst frame ms) | 60 (17) / 60 (17) | 60 (17) / 60 (17) | 61 (17) / 61 (17) |
| Hauteur de page bureau / mobile (px) | 8618 / 8542 | 4425 / 4478 | 900 / 844 |
| Temps de chargement bureau / mobile (loadMs) | 127 / 3767 | 85 / 2296 | 23 / 406 |

Le 404 : contraste insuffisant sur `.kyw-footer__note` et un `span` (#6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1).

Les notes du rapport indiquent que les FPS bureau sont mesurés en rendu logiciel headless (plancher, non représentatif) ; les chiffres mobiles sont ceux à retenir.

## Audit (`scripts/audit`-équivalent `.claude/skills/awwwards/scripts/audit.mjs`)

Journal : `.logs/le-d-arville-portfolio-build-audit.log`
- FAIL : 0
- WARN : 5
  - `/le-d-arville/portfolio/` — phrase répétée 2 fois : « du jeudi au samedi, 19:00 à 21:30 »
  - `/le-d-arville/portfolio/` — phrase répétée 2 fois : « du vendredi au dimanche, 12:00 à 14:30 »
  - `/le-d-arville/portfolio/reservation/` — phrase répétée 2 fois : « 12:00 à 14:30, 19:00 à 21:30 »
  - site — pas de `robots.txt`
  - site — pas de `sitemap`

Le build contient bien `sitemap-index.xml` (créé par `@astrojs/sitemap`) ; l'audit signale quand même l'absence de sitemap, à vérifier au chemin attendu par l'audit.

## Fichiers non modifiés

Aucun fichier source modifié, aucun commit.
