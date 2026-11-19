# QA build — wok-de-jin / awwwards (passe build, phase test)

Build : `scripts/build-site.mjs sites/wok-de-jin-awwwards` → `dist/wok-de-jin/awwwards/`, exit 0, 5 pages construites.
Serveur : `serve.mjs dist --port 4502` (arrêté après les captures). Shoot et audit sur `http://127.0.0.1:4502/wok-de-jin/awwwards/`.

## Captures et planches

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/wok-de-jin/awwwards/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-awwwards-build/home/` (13 d-*.png, 6 m-*.png) | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-awwwards-build/home/planche.png` |
| Carte | `/wok-de-jin/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-awwwards-build/wok-de-jin-item/` (13 d-*.png, 6 m-*.png) | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-awwwards-build/wok-de-jin-item/planche.png` |
| 404 | `/__shoot-missing-page-*` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-awwwards-build/404/` (13 d-*.png, 6 m-*.png) | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-awwwards-build/404/planche.png` |

Un premier passage de capture, lancé avant le démarrage effectif du serveur, a échoué (`ERR_CONNECTION_REFUSED`) ; le dossier a été vidé et recapturé, seul le second passage est présent.
Les planches font 1920 × 5280 px (4 colonnes × 480 px, 19 images chacune). `planche.py` a signalé « ignoré » pour les valeurs `4` et `480` des options : sans effet sur le rendu.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Hauteur page desktop (px) | 8825 | 8216 | 900 |
| LCP desktop (ms) | 80 | 64 | 40 |
| LCP mobile, throttle (ms) | 1376 | 976 | 236 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 60 / 61 |
| Violations axe | 0 (0 serious, 43 contrast à vérifier) | 0 (0 serious, 7 contrast à vérifier) | 1 : `color-contrast` serious, 2 nœuds |
| Cibles tactiles trop petites (desktop / mobile) | 0 / 0 | 0 / 0 | 1 / 1 : « la page d'accueil » 128×20 |
| Texte caché réduit (mouvement réduit) | 0 | 0 | 0 |
| Focus clavier sans indicateur visible | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Survol sans changement | 0 | 0 | 2 (liens du pied de page) |
| Survol changeant seulement la couleur | 4 | 3 | 0 |
| Mouvement au repos | oui | non | non |
| Lien d'évitement en premier | non | non | non |

Détail des points saillants :
- 404, axe `color-contrast` (serious) : `.kyw-footer__note` et un `span`, `#6b787d` sur `#fbfaf8`, ratio 4.36:1 (seuil 4.5:1).
- 404, cible tactile : lien « la page d'accueil » 128×20 px sur desktop et mobile.
- Accueil : hauteur mobile 7575 px ; l'élément LCP est une image (`img`), en mobile comme en desktop. Carte : élément LCP `h1.display`.
- Accueil, survol : 7 cibles interactives relevées, dont 4 à changement de couleur seul (`h-01`, `h-03`, `h-04`, `h-06`).
- Parcours clavier accueil : 12 arrêts, premier arrêt « Aller au contenu » (lien d'évitement présent, marqué `skipLinkFirst: false`).

## Audit (audit.mjs)

- 0 FAIL, 2 WARN.
- WARN site : « no robots.txt ».
- WARN site : « no sitemap ».
- Le lien d'audit annonce 4 pages explorées ; le shoot en a capturé 3 plus le 404.
- Poids de la page la plus lourde (`/wok-de-jin/awwwards/`) : environ 985 KB ; HTML 6, JS 62 (gz), CSS 6 (gz), polices 54, images 858.

## Notes

- Aucun fichier source modifié, aucun commit.
- Les chiffres desktop FPS sont mesurés sur rendu logiciel headless : plancher, pas mesure matérielle (note du report).
