# QA revue 1, bergerie-lives, variante awwwards (rôle captures)

Phase : test. Build : `dist/bergerie-lives/awwwards/` (5 pages construites, sans erreur). Serveur local port 4502, arrêté après les captures.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| home (/bergerie-lives/awwwards/) | /home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-revue1/home/ | /home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-revue1/home/planche.png |
| bergerie-lives-item (/le-domaine/) | /home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-revue1/bergerie-lives-item/ | /home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-revue1/bergerie-lives-item/planche.png |
| 404 | /home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-revue1/404/ | /home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-revue1/404/planche.png |

Bilan du crawl : `/home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-revue1/summary.json`.

## Chiffres par page (report.json, bureau puis mobile)

| Indicateur | home | bergerie-lives-item | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (contraste à vérifier : 21) | 0 (contraste à vérifier : 20) | 1 serious, color-contrast, 2 nœuds (`.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| LCP bureau / mobile (ms) | 76 / 2408 | 128 / 1000 | 40 / 228 |
| CLS bureau / mobile | 0,01 / 0,016 | 0 / 0,003 | 0 / 0 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil », 128x20) |
| Hauteur de page bureau / mobile (px) | 7451 / 5530 | 7044 / 5602 | 900 / 844 |
| Images de survol (cibles) | 7 | 7 | 2 |
| Mouvement en mode réduit (hiddenText / moving) | 0 / false | 0 / false | 0 / false |
| FPS défilement bureau / mobile | 60 / 59 | 60 / 60 | 60 / 61 |
| Clavier : arrêts sans focus visible / focus invisible / focus bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Lien d'évitement en premier arrêt | non | non | non |
| Fichiers chargés | 39 | 39 | 27 |

Note du rapport : FPS bureau mesurés en rendu logiciel headless (plancher, pas une mesure matérielle) ; mobile à 4x de ralentissement CPU, 4G lente.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 2 (« no robots.txt », « no sitemap »). Le build a créé `sitemap-index.xml` dans `dist/` ; l'audit ne le détecte pas sous ce nom.
- Crawl : 4 pages. Page la plus lourde : `/bergerie-lives/awwwards/`, environ 1864 Ko (images 1733 Ko, JS 60 Ko gz, CSS 5 Ko gz, polices 60 Ko).

## Pièges rencontrés (outil)

- Le serveur lancé en arrière-plan dans le sous-shell s'est arrêté seul : la première capture a échoué (ERR_CONNECTION_REFUSED) et a été refaite après relance détachée (`setsid nohup`).
- `scripts/planche.py` lit les valeurs de `--colonnes` et `--largeur` comme des fichiers (« ignoré 4 », « ignoré 480 »). La planche est produite quand même en 4 colonnes de 480 px (1920 x 5280).
