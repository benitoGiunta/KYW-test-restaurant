# QA revue 2 : partage / portfolio

Build : `node scripts/build-site.mjs sites/partage-portfolio` (exit 0, 7 pages, sortie `dist/partage/portfolio/`).
Serveur de test : `dist/` servi sur `http://127.0.0.1:4501/partage/portfolio/` (arrêté en fin de passe).
Captures : `shoot.mjs --crawl --nav`, 3 dossiers. Audit : `audit.mjs` sur 6 pages crawlées.

## Captures et planches

| Dossier de captures | Page(s) | Planche |
|---|---|---|
| `/home/user/KYW-test-restaurant/.shots-partage-portfolio-revue2/home/` | `/partage/portfolio/` | `/home/user/KYW-test-restaurant/.shots-partage-portfolio-revue2/home/planche.png` |
| `/home/user/KYW-test-restaurant/.shots-partage-portfolio-revue2/partage-item/` | `/partage/portfolio/carte/` | `/home/user/KYW-test-restaurant/.shots-partage-portfolio-revue2/partage-item/planche.png` |
| `/home/user/KYW-test-restaurant/.shots-partage-portfolio-revue2/404/` | page 404 (sonde `shoot`) | `/home/user/KYW-test-restaurant/.shots-partage-portfolio-revue2/404/planche.png` |

Couverture : le shoot n'a produit de dossier que pour l'accueil, `/carte/` et la 404. Les pages `/formules/`, `/histoire/`, `/salle/` et `/reservation/` n'ont pas de dossier de captures dans cette passe ; elles figurent dans l'audit seul.

## Chiffres (report.json)

| Mesure | home | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe, violations sérieuses | 0 (8 à vérifier, contraste) | 0 (3 à vérifier) | 2 : `document-title`, `html-has-lang` |
| CLS mobile | 0 | 0 | 0 |
| LCP mobile (throttled) | 1064 ms (`p.ardoise__accroche`) | 1080 ms (`p.lead`) | 244 ms (`pre`) |
| LCP desktop | 116 ms | 120 ms | 48 ms |
| Débordement horizontal | non | non | non |
| Cibles tactiles < 24 px | 0 | 0 | 0 |
| Texte caché | 0 | 0 | 0 |
| Mouvement réduit | non | non | non |
| FPS mobile / desktop (scroll) | 60 / 60 | 60 / 60 | 60 / 60 |
| Focus clavier non visible | 0 | 0 | sans objet |
| Focus invisible | 0 | 0 | sans objet |
| Hover sans changement | 0 | 0 | sans objet |
| Hover couleur seule (summary) | 4 | 0 | sans objet |
| Mouvement permanent au repos | oui | oui | non |
| Titre `<title>` | présent | présent | vide |
| `<h1>` | `PARTAGE CHARLES JEANDRAIN` | `LA CARTE` | absent |

Clavier : sur l'accueil et `/carte/`, les arrêts de tabulation sont listés dans `keyboard.stops` ; aucun arrêt sans focus visible, aucun focus piégé (`stuck: false`). Sur la 404, seul arrêt : « focus left the page ». `skipLinkFirst` vaut `false` dans les deux rapports, alors que le premier arrêt de tabulation est « Aller au contenu ».

## Audit (audit.mjs)

- FAIL : 0
- WARN : 10
  - `/partage/portfolio/` : meta description de 174 caractères (cible 50 à 160).
  - Phrase répétée 2 fois sur les 6 pages : « Le soir du mardi au samedi, le midi du mercredi au samedi ».
  - 404 : pas de `<h1>`.
  - Pas de `robots.txt`.
  - Pas de `sitemap`.
- Page la plus lourde : `/partage/portfolio/salle/`, environ 551 Ko (4 HTML, JS 62 Ko gz, CSS 6 Ko gz, polices 111, images 369).

Notes du rapport : les FPS desktop tournent en headless sur GPU logiciel (plancher, pas une mesure matérielle) ; les chiffres mobiles sont à 4x de ralentissement CPU et 4G lente.
