# QA revue 2 : incorrect / portfolio (captures, audit)

Build : `scripts/build-site.mjs sites/incorrect-portfolio` → `dist/incorrect/portfolio/` (exit 0, 6 pages).
Serveur : `serve.mjs dist --port 4501`, arrêté après les mesures. Base : `http://127.0.0.1:4501/incorrect/portfolio/`.
Mesures desktop : FPS en headless logiciel (plancher, non représentatif). Mobile : throttling 4x CPU, slow 4G.

## Pages capturées (3 dossiers)

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/incorrect/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-revue2/home/planche.png` |
| La carte (`/carte/`, dossier `incorrect-item`) | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-revue2/incorrect-item/` | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-revue2/incorrect-item/planche.png` |
| Page inexistante (URL `__shoot-missing-page-*`, dossier `404`) | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-revue2/404/planche.png` |

Remarques :
- `shoot.mjs --crawl` n'a produit que 3 dossiers ; l'audit a crawlé 5 pages (accueil, carte, histoire, à emporter, réservation). Histoire, à emporter et réservation n'ont pas de captures.
- La page « 404 » est celle obtenue en visitant une URL absente, pas une page du site.
- Avertissement de la planche : `planche.py` lit `480` (valeur de `--largeur`) comme un fichier à ignorer ; les planches sont produites, la largeur 480 est appliquée.
- Le shoot a enregistré `--nav` : « no link to another page could be clicked » sur la page 404.

## Chiffres par page (report.json)

| Mesure | Accueil | La carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Contraste à vérifier (axe) | 57 | 6 | 0 |
| CLS desktop | 0.001 | 0.043 | 0 |
| LCP desktop (ms) | 116 (`span.loader__name`) | 120 (`span.loader__name`) | 44 (`pre`) |
| CLS mobile | 0 | 0 | 0 |
| LCP mobile (ms) | 988 (`p.hero__baseline`) | 944 (`p.lead`) | 212 (`pre`) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites (desktop / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments WebGL cachés | 0 | 0 | 0 |
| Hauteur mobile (px) | 12105 | 16715 | 2121 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 61 / 61 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | non (focus sort du body) |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Survol : cibles sans changement / couleur seule / recouvertes | voir report.json (hover.targets, 6 cibles captées) | idem | 0 |
| Texte caché en mouvement réduit | 0 | 0 | 0 |

Titres : accueil « Incorrect | Pizzeria rock-n-roll à Namur », carte « La carte | Incorrect », 404 sans `<title>`.

## Audit (audit.mjs) : 5 pages crawlées

Résumé : **0 FAIL, 8 WARN**. Page la plus lourde : `/incorrect/portfolio/`, ~876 KB (html 7, JS 7 gz, CSS 6 gz, polices 88, images 767).

WARN :
1. `/incorrect/portfolio/` : phrase répétée 2x « Mardi au samedi, 18 h 30 à 21 h 30 ; samedi midi aussi »
2. `/incorrect/portfolio/carte/` : même phrase répétée 2x
3. `/incorrect/portfolio/histoire/` : même phrase répétée 2x
4. `/incorrect/portfolio/a-emporter/` : même phrase répétée 2x
5. `/incorrect/portfolio/reservation/` : même phrase répétée 2x
6. site : page 404 sans `<h1>`
7. site : pas de `robots.txt`
8. site : pas de sitemap (le build a pourtant créé `sitemap-index.xml` dans `sites/incorrect-portfolio/dist`)

Journal complet : `/home/user/KYW-test-restaurant/.logs/incorrect-portfolio-revue2-audit.log`. Journal du shoot : `/home/user/KYW-test-restaurant/.logs/incorrect-portfolio-revue2-shoot.log`.
