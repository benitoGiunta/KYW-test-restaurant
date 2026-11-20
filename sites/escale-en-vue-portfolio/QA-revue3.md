# QA revue 3 : escale-en-vue-portfolio (faits)

Build : `scripts/q.sh escale-en-vue-portfolio-revue3-build` (exit 0, 6 pages, journal `.logs/escale-en-vue-portfolio-revue3-build.log`).
Serveur : `dist/` sur http://127.0.0.1:4501/escale-en-vue/portfolio/ (arrêté après les captures).
Captures : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue3/` (sous-dossiers `home`, `escale-en-vue-item` = /carte/, `404`).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| / (home) | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue3/home/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue3/home/planche.png` |
| /carte/ | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue3/escale-en-vue-item/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue3/escale-en-vue-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue3/404/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue3/404/planche.png` |

Pages non capturées : `/histoire/`, `/terrasse/`, `/reservation/` (présentes dans le crawl de l'audit, absentes du dossier de captures).

Note outil : `scripts/planche.py` a traité `--colonnes 4` et `--largeur 480` comme des fichiers (« ignoré 4 », « ignoré 480 ») ; les planches ont été produites avec la disposition par défaut, en 1920 x 5280 px, 19 images chacune.

## Chiffres par page (report.json)

| Donnée | home | carte (escale-en-vue-item) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 (0 grave) ; contraste à vérifier : 27 | 0 (0 grave) ; contraste à vérifier : 18 | 2 nœuds `color-contrast` (serious) : `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 (seuil 4,5:1) |
| CLS desktop / mobile | 0,003 / 0,002 | 0 / 0 | 0 / 0 |
| LCP desktop (ms, élément) | 80 (`p.hero__slogan`) | 76 (`h1`) | 40 (`p`) |
| LCP mobile (ms, élément) | 1140 (`p.hero__adresse`) | 1104 (`p.lead`) | 236 (`p`) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Hauteur page desktop / mobile (px) | 7607 / 6550 | 3504 / 5222 | 900 / 844 |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil » 128x20) |
| FPS défilement desktop / mobile | 60 / 60 (pire frame 17 ms) | 60 / 60 (17 ms) | 60 / 61 (17 ms) |
| Éléments WebGL cachés | 0 | 0 | 0 |
| Texte caché (reduced-motion) | 0 | 0 | 0 |
| Clavier : tabulations | 12 arrêts | 12 arrêts | 3 arrêts |
| Clavier : focus invisible / sans focus visible / piège | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Clavier : premier arrêt = lien d'évitement | flag `skipLinkFirst` = false (premier arrêt : « Aller au contenu ») | idem | flag `skipLinkFirst` = false |
| Survol : cibles sans réaction | 0 sur 6 | 0 sur 7 | 2 sur 2 |

Les notes du rapport précisent que les FPS desktop sont mesurés sur rendu logiciel headless (plancher, non représentatif) et que les chiffres mobiles (4x CPU, 4G lente) sont ceux qui comptent.

## Audit (audit.mjs)

Résultat : **0 FAIL, 7 WARN**.

- 5 WARN « sentence repeated 2x » : « Saison 2026 du 19 juin au 6 septembre, terminée : rendez-vous à la pro… » sur /, /carte/, /histoire/, /terrasse/, /reservation/ (un par page).
- 1 WARN « no robots.txt » (site).
- 1 WARN « no sitemap » (site ; le build a pourtant écrit `sitemap-index.xml` dans `sites/escale-en-vue-portfolio/dist`).

Pages crawlées : 5. Page la plus lourde : / (~762 KB ; HTML 6, JS 74 gz, CSS 7 gz, polices 94, images 581).

Journaux : `.logs/escale-en-vue-portfolio-revue3-audit.log`, `.logs/escale-en-vue-portfolio-revue3-shoot.log`, `.logs/escale-en-vue-portfolio-revue3-build.log`.

Aucun fichier source modifié, aucun commit.
