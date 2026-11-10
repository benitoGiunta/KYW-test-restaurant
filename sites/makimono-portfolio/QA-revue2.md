# QA revue 2 : makimono / portfolio

Serveur local : `dist/` sur port 4501, chemin `/makimono/portfolio/` (arrêté après la passe). Build : `sites/makimono-portfolio` OK (6 pages, exit 0).

## Pages

| Page | Captures | Planche |
|---|---|---|
| Accueil (`/makimono/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-makimono-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-makimono-portfolio-revue2/home/planche.png` |
| Carte (`/carte/`) | `/home/user/KYW-test-restaurant/.shots-makimono-portfolio-revue2/makimono-item/` | `/home/user/KYW-test-restaurant/.shots-makimono-portfolio-revue2/makimono-item/planche.png` |
| 404 (`/__shoot-missing-page-*`) | `/home/user/KYW-test-restaurant/.shots-makimono-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-makimono-portfolio-revue2/404/planche.png` |

## Chiffres (report.json / summary.json)

| Page | Erreurs console | Requêtes en échec | Axe serious | CLS desktop / mobile | LCP desktop / mobile (ms) | FPS scroll desktop / mobile | Débordement | Cibles petites | Focus clavier sans visibilité / invisible / bloqué |
|---|---|---|---|---|---|---|---|---|---|
| Accueil | 0 | 0 | 0 | 0.019 / 0.001 | 140 / 1044 | 60 / 60 | non | 0 | 0 / 0 / non |
| Carte | 0 | 0 | 0 | 0 / 0 | 100 / 1040 | 60 / 60 | non | 0 | 0 / 0 / non |
| 404 | 0 | 0 | 2 (`document-title`, `html-has-lang`) | 0 / 0 | 28 / 228 | 60 / 61 | non | 0 | 0 / 0 / non |

Autres valeurs relevées :
- Éléments cachés (texte réduit / GL masqué) : 0 sur les trois pages.
- Hover sans changement : 0 ; contraste « couleur seule » : 0.
- Mouvement réduit (`movingReduced`) : false sur les trois pages.
- Hauteur de page desktop / mobile : accueil 12462 / 12276 px ; carte 10035 / 14640 px ; 404 900 / 2121 px.
- `heroSettledMs` : accueil null (encore en mouvement au plafond), carte 3899 ms, 404 2168 ms.
- `idleMotion` : accueil true, carte false, 404 false.
- Lien d'évitement (`skipLinkFirst`) : false sur les trois pages (le premier arrêt clavier de l'accueil est « Aller au contenu »).

## Audit (audit.mjs)

- 5 pages explorées.
- **FAIL : 0**
- **WARN : 3**
  - `404 page has no <h1>`
  - `no robots.txt`
  - `no sitemap`
- Poids de la page la plus lourde : `/makimono/portfolio/` ~1333 KB (images 1169 KB, polices 88 KB, JS 61 KB gz, CSS 7 KB gz).

## Journaux

- `/home/user/KYW-test-restaurant/.logs/makimono-portfolio-revue2-build.log`
- `/home/user/KYW-test-restaurant/.logs/makimono-portfolio-revue2-shoot.log`
- `/home/user/KYW-test-restaurant/.logs/makimono-portfolio-revue2-audit.log`
