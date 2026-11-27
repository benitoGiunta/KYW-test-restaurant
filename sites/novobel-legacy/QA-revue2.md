# QA revue 2, novobel legacy (faits)

Build : `scripts/q.sh novobel-legacy-revue2-build` exit 0, `dist/novobel/legacy/`, 6 pages construites.
Serveur : `dist/` sur `http://127.0.0.1:4503/novobel/legacy/` (arrêté après les captures).
Journaux : `.logs/novobel-legacy-revue2-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/novobel/legacy/` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-revue2/home/planche.png` |
| Services (page item) `/novobel/legacy/services/` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-revue2/novobel-item/` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-revue2/novobel-item/planche.png` |
| Page 404 `/__shoot-missing-page-*` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-revue2/404/planche.png` |

Remarque : la planche a été lancée avec `--colonnes 4 --largeur 480`, mais `scripts/planche.py` a lu ces options comme des fichiers (« ignoré 4 », « ignoré 480 »). Les planches sont donc en 1920 px de large, 19 images chacune, sans réglage des colonnes.

Le crawl n'a trouvé que 3 pages (accueil, services, 404) sur les 6 construites : `shoot.mjs --crawl --nav` ne suit pas `/projects/`, `/jobs/`, `/blog/`.

## Chiffres par page (report.json)

| Indicateur | Accueil | Services | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 serious : `color-contrast`, 2 nœuds (`.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| Axe « needs review » (contraste) | 5 | 5 | 0 |
| CLS desktop / mobile | 0,001 / 0,03 | 0,017 / 0,056 | 0 / 0 |
| LCP desktop / mobile (ms) | 464 / 908 | 420 / 1772 | 40 / 308 |
| LCP élément | img | img | n/d |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles < 24 px desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 : « la page d'accueil » 128×20 |
| Texte masqué (reduced motion) | 0 | n/d | n/d |
| Mouvement en reduced motion | non | n/d | n/d |
| Clavier : focus non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piège (stuck) | non | oui | non |
| Lien d'évitement en premier | non | non | non |
| FPS défilement desktop (headless) | 60 | n/d | n/d |
| Temps de chargement desktop / mobile (ms) | 783 / 3244 | 420 / 1785 | n/d |

Détail clavier :
- Accueil : 12 arrêts de tabulation, dont « Aller au contenu » en premier.
- Services : le focus reste dans les 3 champs `input` (les trois derniers arrêts), `stuck: true`. Le rapport ne dit pas s'il s'agit d'un piège réel ou d'une fin de tabulation ; à vérifier à la main.
- 404 : arrêts « la page d'accueil » et « Réalisé par », puis « focus left the page ».

## Lignes FAIL de l'audit

Aucune. `audit.mjs` : **0 FAIL, 6 WARN**.

## Nombre de WARN de l'audit : 6

1. site : pas de `robots.txt`
2. site : pas de `sitemap`
3. `/novobel/legacy/` : police TTF/OTF livrée (`ieVq2YZ…Za4Q.ttf`, utiliser WOFF2)
4. `/novobel/legacy/services/` : même police TTF/OTF
5. `/novobel/legacy/projects/` : même police TTF/OTF
6. `/novobel/legacy/jobs/` : même police TTF/OTF

Poids indiqué par l'audit : page la plus lourde `/novobel/legacy/` ~675 KB ; HTML 5, JS 1 (gz), CSS 6 (gz), polices 103, images 560.

Note : le `sitemap-index.xml` existe bien dans `dist/` (créé à la construction), mais l'audit signale l'absence de `sitemap` ; à vérifier où l'audit le cherche.
