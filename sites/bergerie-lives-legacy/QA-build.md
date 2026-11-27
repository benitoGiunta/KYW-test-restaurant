# QA build : bergerie-lives-legacy (passe build, phase test)

Faits seuls, extraits des `report.json` et du journal d'audit. Serveur local `dist/` sur 127.0.0.1:4503 (arrêté).

## Build

- `scripts/build-site.mjs sites/bergerie-lives-legacy` : exit 0, 4 pages générées (`/404.html`, `/index.html`, `/mariage-et-location/`, `/reservations/`), sitemap-index créé. Journal : `.logs/bergerie-lives-legacy-build-build.log`.

## Captures et planches

| Page | Dossier de captures | Planche | Fichiers |
|---|---|---|---|
| Accueil `/bergerie-lives/legacy/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-legacy-build/home/planche.png` | 40 |
| Mariage et location `/mariage-et-location/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-legacy-build/bergerie-lives-item/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-legacy-build/bergerie-lives-item/planche.png` | 40 |
| 404 | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-legacy-build/404/planche.png` | 28 |

- Réservations `/reservations/` : présente dans le crawl de l'audit (3 pages crawlées), mais **aucune capture** : le shoot n'a traité que 3 cibles (accueil, mariage, 404).
- Planches : 19 images chacune, 1920 x 5280 px. `planche.py` a traité `4` et `480` (valeurs de `--colonnes` et `--largeur`) comme fichiers d'entrée et les a ignorés (`ignoré 4`, `ignoré 480` dans les journaux `bergerie-lives-legacy-build-planche-*.log`).
- Premier essai de shoot lancé avant que le serveur ne tourne : `ERR_CONNECTION_REFUSED`, dossier `summary.json` obsolète ; le shoot a été relancé après démarrage du serveur.

## Chiffres par page

| Mesure | Accueil | Mariage et location | 404 |
|---|---|---|---|
| Erreurs console | 1 (desktop : 404 sur une ressource) | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| axe : violations | 0 | 0 | 1 (`color-contrast`, serious : `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5 requis, 2 nœuds) |
| axe : à revoir (contraste) | 1 | 1 | 0 |
| LCP desktop | 484 ms | 452 ms | 72 ms |
| LCP mobile | 772 ms (`p.lead`) | 780 ms | 236 ms |
| CLS desktop | 0,002 | 0,003 | 0 |
| CLS mobile | 0 | 0,02 | 0 |
| Débordement horizontal | non (desktop et mobile) | non (desktop et mobile) | non (desktop et mobile) |
| Éléments cachés (desktop) | 0 | 0 | 0 |
| Cibles tactiles petites | mobile : 1 (« La Bergerie de Lives » 225x20) | mobile : 1 | desktop : 1 et mobile : 1 (« la page d'accueil » 128x20) |
| Clavier : focus non visible | 0 | 0 | 0 |
| Clavier : focus invisible / bloqué | 0 / non | 0 / non | 0 / non ; le focus quitte la page après 2 arrêts |
| Survol sans changement | 3 | 2 | 2 |
| Survol changement de couleur seul | 3 | 3 | 0 |
| Survol couvert | 0 | 0 | 0 |
| Mouvement réduit : écran encore mobile à 1,5 s | non | non | n.d. |
| Texte masqué en mouvement réduit | 0 | 0 | 0 |
| FPS défilement desktop / mobile | 61 / 61 | n.d. | n.d. |

Notes du rapport : les FPS desktop tournent en headless sur GPU logiciel ; le mobile est à 4x de ralentissement CPU et 4G lente.

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 27 WARN**. Journal : `.logs/bergerie-lives-legacy-build-audit.log`.
- Pages crawlées : 3 (`/bergerie-lives/legacy/`, `/mariage-et-location/`, `/reservations/`).
- WARN relevés :
  - Accueil : titre de 74 caractères (limite 70) ; og:image absent ; twitter:card absent ; pas de lien favicon.
  - Mariage et location : og:image absent ; twitter:card absent ; pas de lien favicon.
  - Réservations : og:image absent ; twitter:card absent ; pas de lien favicon.
  - Site : pas de robots.txt ; pas de sitemap (alors que le build a créé `sitemap-index.xml`).
  - Polices : 4 fichiers `.ttf`/`.otf` servis sur chacune des 3 pages (utiliser woff2) ; fonts 376 KB.
  - Le total inclut les WARN ci-dessus ; le journal ne contient aucune ligne FAIL.
- Poids : page la plus lourde `/bergerie-lives/legacy/`, ~2064 KB ; html 5 ; JS 1 (gz) ; CSS 5 (gz) ; polices 376 ; images 1677.

## Fichiers non modifiés

Aucun fichier source modifié, aucun commit. `dist/bergerie-lives/legacy/` a été régénéré par le build (sortie attendue).
