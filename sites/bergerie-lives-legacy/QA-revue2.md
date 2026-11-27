# QA revue 2 : bergerie-lives, variante legacy

Faits seulement, extraits des `report.json` (shoot) et de l'audit. Serveur local `dist/` sur `127.0.0.1:4503`, build `scripts/build-site.mjs` sans erreur.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| `/bergerie-lives/legacy/` (accueil) | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-legacy-revue2/home/planche.png` |
| `/bergerie-lives/legacy/mariage-et-location/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-legacy-revue2/bergerie-lives-item/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-legacy-revue2/bergerie-lives-item/planche.png` |
| Page 404 (URL inexistante sondée par le crawl) | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-legacy-revue2/404/planche.png` |

Remarques : la page `/reservations/` figure dans le build et dans l'audit, mais n'a pas de dossier de captures (le crawl ne l'a pas visitée). Les planches ont été faites sans `--colonnes`/`--largeur` : `planche.py` ne reconnaît pas ces options et les a prises pour des fichiers (ignorés), la planche est donc sortie à sa largeur par défaut (1920 px, 19 images, 5280 px de haut).

## Chiffres par page (report.json)

| Indicateur | Accueil | Mariage et location | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (0 grave) | 0 (0 grave) | 1 grave : `color-contrast` |
| CLS desktop | 0,002 | 0,003 | 0 |
| LCP desktop | 524 ms (img) | 400 ms (img) | 44 ms (p) |
| CLS mobile | 0 | 0,02 | 0 |
| LCP mobile (4x CPU, 4G lent) | 764 ms (p.lead) | 752 ms (h1#h-hero) | 224 ms (p) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| FPS défilement mobile (worst frame) | 61 (17 ms) | 61 (17 ms) | 60 (17 ms) |
| Canvas WebGL actif | non | non | non |
| H1 | « La Bergerie de Lives » | « Votre mariage tout un weekend au domaine » | « Page introuvable » |

Accessibilité et mouvement réduit (toutes pages) :
- Focus invisible : 0 ; focus sans indicateur visible : 0 ; lien d'évitement en premier : non (`skipLinkFirst: false`) ; focus bloqué : non.
- Arrêts clavier : accueil 12, mariage 12, 404 3.
- Mouvement avec `prefers-reduced-motion` : aucun mouvement (`moving: false`) ; texte caché : 0 sur chaque page.
- Survol, « changement nul » (`noHoverChange`) : accueil 3 (Précédent, +32 493 86 10 29, La Bergerie de Lives) ; mariage 2 (+32 493 86 10 29, La Bergerie de Lives) ; 404 2.
- Survol, « changement de couleur seulement » (`colorOnly`) : accueil 3 (Réserver, Appeler le 0493 86 10 29, Chambres) ; mariage 3 (Réserver une visite, Chambres, Réserver) ; 404 0.
- Éléments recouverts au survol : 0 sur chaque page.

## Audit (`audit.mjs`, 3 pages crawlées)

- FAIL : 0
- WARN : 18
  - site : « no robots.txt » (1) ; « no sitemap » (1), alors que le build écrit `sitemap-index.xml` dans `sites/bergerie-lives-legacy/dist`.
  - mariage-et-location : « sentence » (1), ligne tronquée par l'audit (non détaillée ici).
  - fontes ttf/otf embarquées (« use woff2 ») : 4 lignes sur chacune des 3 pages (accueil, mariage-et-location, reservations), soit 12 lignes ; « fonts 376 KB (fewer weights, variable font, subset) » : 1 ligne par page, soit 3 lignes.
  - Total : 18 lignes WARN, comptées dans le journal (`grep "^WARN"`), cohérent avec le résumé de l'outil.
  - poids : page la plus lourde `/bergerie-lives/legacy/`, ~2064 KB (html 5, JS 1 gz, CSS 5 gz, fontes 376 KB, images 1677 KB).

Journal de l'audit : `/home/user/KYW-test-restaurant/.logs/bergerie-lives-legacy-revue2-audit.log`.
