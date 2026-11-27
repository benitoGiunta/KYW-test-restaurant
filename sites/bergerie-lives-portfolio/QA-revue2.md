# QA revue 2 : bergerie-lives, variante portfolio

Faits extraits des report.json (shoot.mjs --crawl --nav) et de l'audit (audit.mjs). Aucune analyse de design.
Build : `sites/bergerie-lives-portfolio` → `dist/bergerie-lives/portfolio/` (exit 0, 7 pages).
Serveur local : `dist` sur http://127.0.0.1:4501/ (arrêté après les captures).

## Pages capturées

| Page | Dossier de captures | Planche | Fichiers |
|---|---|---|---|
| Accueil (`/bergerie-lives/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-portfolio-revue2/home/planche.png` | 40 |
| Chambres (`/chambres/`) | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-portfolio-revue2/bergerie-lives-item/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-portfolio-revue2/bergerie-lives-item/planche.png` | 40 |
| 404 | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-portfolio-revue2/404/planche.png` | 28 |

Le planche a été produit avec `--colonnes 4 --largeur 480` (19 images par planche ; le script affiche « ignoré » pour les valeurs des options, sans effet sur le résultat).

## Chiffres par page (report.json)

| Mesure | Accueil | Chambres | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| axe : violations | 0 | 0 | 1 (`color-contrast`, impact serious, 2 nœuds) |
| axe : contrastNeedsReview | 21 | 3 | 0 |
| LCP bureau (ms) | 88 | 72 | 48 |
| LCP mobile (ms, throttled) | 1372 | 3036 | 236 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments hors zone (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles < seuil bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil 128x20 ») |
| Focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier / bloqué au clavier | non / non | non / non | non / non |
| Mouvement en réduit-motion | non | non | non |
| Notes du rapport | 4 (méthode : FPS logiciel, slow 4G 4x CPU) | 4 | 4 |

Remarques de mesure (issues des notes du rapport) : les FPS bureau sont pris sur GPU logiciel (plancher, pas une mesure matérielle) ; les chiffres mobiles (`mobile.vitals`, `mobile.scrollFps`) sont ceux qui comptent.

Chiffres mobiles de l'accueil : LCP sur `p.hero__accroche`, 1372 ms ; chargement 5370 ms ; réglé à 9003 ms.

## Audit (audit.mjs)

- Accueil : `/bergerie-lives/portfolio/`. Poids le plus lourd : ~2271 KB (images 2144 KB ; fonts 109 KB ; HTML 5 KB ; JS 6 KB gz ; CSS 6 KB gz).
- Résultat : **0 FAIL, 2 WARN**.
  - WARN site : no robots.txt
  - WARN site : no sitemap

## Fichiers de sortie

- Journal shoot : `/home/user/KYW-test-restaurant/.logs/bergerie-lives-portfolio-revue2-shoot.log`
- Journal audit : `/home/user/KYW-test-restaurant/.logs/bergerie-lives-portfolio-revue2-audit.log`
- Journal build : `/home/user/KYW-test-restaurant/.logs/bergerie-lives-portfolio-revue2-build.log`
