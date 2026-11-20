# QA build — terrasses-de-crupet / portfolio

Source : `dist/terrasses-de-crupet/portfolio/` servi sur `http://127.0.0.1:4501/terrasses-de-crupet/portfolio/` (serveur arrêté après les captures).
Build : `scripts/build-site.mjs`, exit 0, 7 pages Astro.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`home`) | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-build/home/planche.png` |
| Page 404 (`404`) | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-build/404/planche.png` |
| Carte (`terrasses-de-crupet-item`) | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-build/terrasses-de-crupet-item/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-build/terrasses-de-crupet-item/planche.png` |

Le shoot a produit 3 dossiers de pages (13 captures desktop, 6 mobiles par dossier). La planche fait 1920 x 5280 px, 19 images.

## Chiffres par page (report.json)

| Mesure | Accueil | 404 | Carte (`--crawl`) |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 1 (serious : `color-contrast`, `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4.36:1 pour 4.5:1 requis) | 0 |
| Contrastes à vérifier (needs review) | 34 | 0 | 24 |
| CLS desktop / mobile | 0.018 / 0.046 | 0 / 0 | 0.006 / 0 |
| LCP desktop (ms) | 76 (span) | 40 | 100 |
| LCP mobile (ms, throttled) | 3788 (img) | 212 (p) | 1044 (p.lead) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 1 / 1 (« la page d'accueil » 128x20) | 0 / 0 |
| Focus clavier sans indicateur visible | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Piège clavier | non | non | non |
| Lien d'évitement en premier | non | non | non |
| Texte masqué en mouvement réduit | 0 | 0 | 0 |
| Hauteur page desktop / mobile (px) | 8100 / 8731 | 900 / 844 | 4306 / 7031 |
| FPS défilement desktop / mobile | 58 / 60 | — | — |

Note : sur la page 404, la ligne « Pied de page » (`.kyw-footer__note`) est celle qui échoue au contraste. Les FPS desktop sont mesurés en rendu logiciel headless ; le rapport le signale comme indicatif.

## Audit (`audit.mjs`)

- Crawl : 6 pages annoncées par l'audit (le shoot en a capturé 3).
- FAIL : 0
- WARN : 15 (journal `.logs/terrasses-de-crupet-portfolio-build-audit.log`)
  - 13 WARN « sentence repeated » sur les pages du crawl (horaires et une phrase d'accroche répétés, 2x à 14x).
  - 2 WARN site : `no robots.txt`, `no sitemap`.

## Journaux

- Build : `.logs/terrasses-de-crupet-portfolio-build-build.log`
- Shoot : `.logs/terrasses-de-crupet-portfolio-build-shoot.log`
- Audit : `.logs/terrasses-de-crupet-portfolio-build-audit.log`
- Serveur : `.logs/serve-portfolio.log`
