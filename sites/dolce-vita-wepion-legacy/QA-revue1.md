# QA revue 1 : dolce-vita-wepion-legacy

Source : build `dist/dolce-vita-wepion/legacy/` (serveur statique local, port 4503, arrêté après usage).
Journaux : `.logs/dolce-vita-wepion-legacy-revue1-{build,shoot,audit}.log`.

## Pages capturées

| Page | Dossier de captures | Planche | Note |
|---|---|---|---|
| / (accueil) | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-revue1/home/planche.png` | capturée |
| /carte/ | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-revue1/dolce-vita-wepion-item/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-revue1/dolce-vita-wepion-item/planche.png` | capturée (dossier nommé « item ») |
| 404 (sonde de page absente) | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-revue1/404/planche.png` | sonde `__shoot-missing-page`, pas une page du site |

Non capturées par `shoot.mjs` : `/infos/` et `/la-dolce-vita/` (présentes dans le crawl de l'audit, absentes du dossier de captures).

## Chiffres (report.json)

| Mesure | Accueil | /carte/ | 404 (sonde) |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 (serious 0) | 0 (serious 0) | 2 serious (document-title, html-has-lang) |
| Axe : contrast needs review | 23 | 6 | 0 |
| LCP bureau / mobile (ms) | 416 / 992 | 444 / 836 | 44 / 252 |
| CLS bureau / mobile | 0.001 / 0.001 | 0.002 / 0.001 | 0 / 0 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Cibles tactiles petites bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments WebGL cachés | 0 | 0 | 0 |
| Clavier : focus invisible / sans focus visible / bloqué | 0 / 0 / non | 0 / 0 / non | « body: focus left the page » |
| Survol : cibles sans changement | 0 | 3 | 0 |
| Mouvement réduit : texte caché / animé | 0 / non | 0 / non | 0 / non |

Notes des rapports : FPS bureau tournant sur GPU logiciel (plancher, pas une mesure) ; mobile à 4x de ralentissement CPU, slow 4G.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 45 (dont 4 pages × fontes ttf/otf livrées, « use woff2 » ; `sitemap` absent ; `robots.txt` absent ; 404 sans `<h1>`)
- Pages crawlées : 4 ; page la plus lourde : `/la-dolce-vita/`, ~1448 KB (images 1145 KB, fontes 291 KB)
