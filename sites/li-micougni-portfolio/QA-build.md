# QA build : li-micougni / portfolio

Passe : build · Rôle : captures · Serveur : `dist/` servi sur http://127.0.0.1:4501 (arrêté après la passe).
Build : `scripts/build-site.mjs sites/li-micougni-portfolio` : exit 0, 6 pages construites (404, carte, histoire, index, reservation, terrasse), sitemap créé.

## Pages capturées

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| home | /li-micougni/portfolio/ | /home/user/KYW-test-restaurant/.shots-li-micougni-portfolio-build/home | /home/user/KYW-test-restaurant/.shots-li-micougni-portfolio-build/home/planche.png |
| li-micougni-item (carte) | /li-micougni/portfolio/carte/ | /home/user/KYW-test-restaurant/.shots-li-micougni-portfolio-build/li-micougni-item | /home/user/KYW-test-restaurant/.shots-li-micougni-portfolio-build/li-micougni-item/planche.png |
| 404 | (page inexistante, 404) | /home/user/KYW-test-restaurant/.shots-li-micougni-portfolio-build/404 | /home/user/KYW-test-restaurant/.shots-li-micougni-portfolio-build/404/planche.png |

Pages non capturées par `shoot.mjs --crawl` : histoire, terrasse, reservation (le crawl en a trouvé 5, la capture en a fait 3).

## Chiffres (report.json)

| Mesure | home | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 2 (document-title, html-has-lang) |
| Contraste à revoir (axe) | 28 | 18 | 0 |
| LCP desktop (ms) | 204 | 116 | 40 |
| CLS desktop | 0.02 | 0.003 | 0 |
| LCP mobile (ms, throttled) | 1140 | 1104 | 236 |
| CLS mobile | 0.008 | 0.003 | 0 |
| FPS défilement desktop | 57 | 60 | 61 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles petites | 0 | 0 | 0 |
| Titre H1 | "Li Micougni, tous à table" | "La carte" | aucun |
| WebGL | absent | absent | absent |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Mouvement réduit : texte masqué / mouvement | 0 / non | 0 / non | 0 / non |
| Survol : changements couleur seule | 0 | 1 | - |


## Audit (audit.mjs)

- Résultat : **0 FAIL, 14 WARN**.
- WARN par page (phrases répétées) : home 2 (horaires, 2x ; "12:00 à 14:30, 18:00 à 22:00", 6x) ; carte 2 ; histoire 3 ; terrasse 2 ; reservation 2. Ces WARN concernent les mêmes phrases d'horaires, répétées sur toutes les pages.
- WARN site : 404 sans `<h1>` ; pas de `robots.txt` ; pas de sitemap (audit) alors que le build a créé `sitemap-index.xml`.
- Audit : 5 pages crawlées ; plus lourde : `/li-micougni/portfolio/` ~737 KB (HTML 7, JS 20 gz, CSS 7 gz, polices 69, images 633).

## Journaux

- .logs/li-micougni-portfolio-build-build.log
- .logs/li-micougni-portfolio-build-shoot.log
- .logs/li-micougni-portfolio-build-audit.log
- .logs/li-micougni-portfolio-build-planche-{home,404,li-micougni-item}.log
- .logs/serve-portfolio.log

Note : `planche.py` n'accepte pas `--colonnes` / `--largeur` ; ces options sont lues comme fichiers (« ignoré ») et la planche est produite en 1920 px de large (4 colonnes de 480 px).
