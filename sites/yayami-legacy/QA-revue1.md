# QA revue 1 : yayami / legacy (faits)

Build : `sites/yayami-legacy` → `dist/yayami/legacy/` (exit 0, 3 pages).
Serveur local : `dist` sur 127.0.0.1:4503 (arrêté après les captures).
Pages crawlées par l'audit : 2 (`/yayami/legacy/`, `/yayami/legacy/carte/`) ; 404 capturée à part.

## Pages et captures

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/yayami/legacy/` | `/home/user/KYW-test-restaurant/.shots-yayami-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-yayami-legacy-revue1/home/planche.png` |
| Carte `/yayami/legacy/carte/` | `/home/user/KYW-test-restaurant/.shots-yayami-legacy-revue1/yayami-item/` | `/home/user/KYW-test-restaurant/.shots-yayami-legacy-revue1/yayami-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-yayami-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-yayami-legacy-revue1/404/planche.png` |

Note : `scripts/planche.py` lit les options en paires d'arguments consécutifs et prend les valeurs `4` et `480` pour des images (avertissement « ignoré » dans le journal). Les planches sont produites à la largeur par défaut (1920 px, 19 images).

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (0 serious, 14 contrast à vérifier) | 0 (0 serious, 0 à vérifier) | 1 : `color-contrast`, serious, 2 nœuds (`.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| CLS desktop / mobile | 0,039 / 0,054 | 0,003 / 0,003 | 0 / 0 |
| LCP desktop / mobile (ms) | 732 / 1808 | 660 / 2280 | 32 / 232 |
| Débordement horizontal | non / non | non / non | non / non |
| Éléments cachés (glHidden, hiddenText) | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites (desktop / mobile) | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil » 128x20) |
| Clavier : focus visible absent | 4 (NIGIRI, MAKI, TEMAKI, PLATS CHAUDS) | aucun | aucun |
| Clavier : focus invisible / piégé | aucun / non | aucun / non | « body: focus left the page » après le 2e stop / non |
| Lien d'évitement en premier | non | non | non |
| Hauteur de page desktop / mobile (px) | 4046 / 5696 | 7387 / 10629 | 900 / 844 |
| FPS au scroll (desktop) | 61 | 60 | 60 |

Liste des stops clavier (accueil) : « Aller au contenu », La carte, Livraison, Horaires, accueil, COMMANDER, COMMANDER EN LIGNE, APPELER LE 081 34 37 89, NIGIRI, MAKI, TEMAKI, PLATS CHAUDS.

## Audit (`audit.mjs`)

Résultat : 0 FAIL, 12 WARN.

- WARN site : pas de `robots.txt`.
- WARN site : pas de `sitemap`.
- WARN `/yayami/legacy/` et `/yayami/legacy/carte/` : 4 polices en .ttf/.otf (utiliser woff2) par page.
- WARN `/yayami/legacy/` et `/yayami/legacy/carte/` : fonts 375 KB (moins de graisses, variable font, sous-ensemble).

Décompte : 12 WARN (2 site, 5 par page sur 2 pages). Le journal complet est `.logs/yayami-legacy-revue1-audit.log`.
