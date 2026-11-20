# QA revue 2 : carre-d-herbes-awwwards

Faits uniquement (captures, rapports, audit). Build : `dist/carre-d-herbes/awwwards/` (exit 0, 5 pages construites). Serveur local : `http://127.0.0.1:4502/carre-d-herbes/awwwards/` (arrêté après la capture).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/carre-d-herbes/awwwards/`) | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-awwwards-revue2/home/planche.png` |
| Carte (`/carte/`, titre « La carte ») | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-awwwards-revue2/carre-d-herbes-item/` | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-awwwards-revue2/carre-d-herbes-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-awwwards-revue2/404/planche.png` |

Note : la planche a été générée avec `scripts/planche.py` ; les options `--colonnes 4 --largeur 480` ne sont pas reconnues par le script (lues comme fichiers, ignorées). Résultat : planches de 1920 x 5280 px, 19 images chacune.

## Chiffres par page (rapports `report.json`)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (toutes gravités) | 0 | 0 | 1 (`color-contrast`, serious, 2 nœuds : `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| Contraste à vérifier (contrastNeedsReview) | 8 | 7 | 0 |
| LCP desktop | 72 ms | 68 ms | 36 ms |
| LCP mobile (throttled) | 1512 ms | 1080 ms | 224 ms |
| CLS desktop | 0 | 0,015 | 0 |
| CLS mobile | 0,003 | 0,01 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Texte caché en mouvement réduit | 0 | 0 | 0 |
| FPS au défilement (desktop) | 60 | 60 | 60 |
| Clavier : éléments focalisables | 12 | 12 | 3 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus invisible / sans focus visible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Titre H1 | « Carré d'herbes » | « On compte en assiettes » | « Page introuvable » |

Remarques de mesure fournies par le rapport : le FPS desktop tourne en rendu logiciel (headless) ; le mobile tourne avec un ralentissement CPU x4 et 4G lente.

Accueil : `loadMs` desktop 106 ms, mobile 2509 ms ; `settledMs` desktop 2434 ms, mobile 4616 ms. Élément LCP : `img.rond` (desktop et mobile).

## Audit (`audit.mjs`)

- Pages explorées : 4 (`http://127.0.0.1:4502/carre-d-herbes/awwwards/`).
- Résultat : 0 FAIL, 2 WARN.
- WARN : `site` : pas de `robots.txt` ; `site` : pas de `sitemap`.
- Page la plus lourde : `/carre-d-herbes/awwwards/`, environ 1826 Ko (html 5, JS 60 gz, CSS 6 gz, polices 134, images 1621).

## Journaux

- Build : `/home/user/KYW-test-restaurant/.logs/carre-d-herbes-awwwards-revue2-build.log`
- Captures : `/home/user/KYW-test-restaurant/.logs/carre-d-herbes-awwwards-revue2-shoot.log`
- Audit : `/home/user/KYW-test-restaurant/.logs/carre-d-herbes-awwwards-revue2-audit.log`

## Non fait

- Aucun commit (consigne de la tâche). La commande git d'ajout et de commit a été refusée par le classifieur de permissions ; le fichier n'est pas commité.
