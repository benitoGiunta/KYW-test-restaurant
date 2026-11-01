# QA build : brasserie-du-quai · legacy

Passe : build · Rôle : captures · Serveur : `dist/` sur http://127.0.0.1:4503/brasserie-du-quai/legacy/ (arrêté ensuite)

## Build

- `node scripts/build-site.mjs sites/brasserie-du-quai-legacy` : exit 0, 7 pages, sortie `dist/brasserie-du-quai/legacy/`.
- Journal : `.logs/brasserie-du-quai-legacy-build-build.log`

## Captures et planches

Le shoot annonce 3 dossiers de pages. L'audit a crawlé 6 pages (voir plus bas), dont 3 n'ont pas de dossier de captures.

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/brasserie-du-quai/legacy/` | `.shots-brasserie-du-quai-legacy-build/home/` | `.shots-brasserie-du-quai-legacy-build/home/planche.png` |
| Réservation `/brasserie-du-quai/legacy/reservation/` (dossier `brasserie-du-quai-item`) | `.shots-brasserie-du-quai-legacy-build/brasserie-du-quai-item/` | `.shots-brasserie-du-quai-legacy-build/brasserie-du-quai-item/planche.png` |
| 404 (`__shoot-missing-page-…`) | `.shots-brasserie-du-quai-legacy-build/404/` | `.shots-brasserie-du-quai-legacy-build/404/planche.png` |

Journaux : `.logs/brasserie-du-quai-legacy-build-shoot.log`, `.logs/brasserie-du-quai-legacy-build-planche-*.log`.

## Chiffres par page (report.json)

| Indicateur | Accueil | Réservation | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 (0) | 0 (0) | 2 (2) |
| Axe « needs review » | 12 | 3 | 0 |
| LCP desktop / mobile (ms) | 560 / 1144 | 396 / 788 | 52 / 228 |
| CLS desktop / mobile | 0.002 / 0.023 | 0.03 / 0.042 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles < 24 px (desktop / mobile) | 8 / 8 | 7 / 8 | 0 / 0 |
| FPS scroll desktop / mobile | 60 / 61 | 61 / 61 | 60 / 60 |
| Éléments cachés (WebGL cachés / texte masqué reduced-motion) | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Clavier : lien d'évitement premier arrêt | non | non | non |
| Clavier : focus invisible / piège | 0 / non | 0 / non | 0 / non |

Violations axe de la 404 : `document-title` (serious, 1 nœud), `html-has-lang` (serious, 1 nœud).

Accueil : hover réagit sur les cibles principales (ex. « Réserver une table » : `backgroundColor`). Réservation : « Ouvrir le module ici » réagit via `boxShadow`.

Accueil, cibles tactiles < 24 px : adresse (162×20), téléphone (76×20 et 93×20), lien « Itinéraire dans Google Maps » (204×20), e-mail (182×20), Facebook (72×20), Instagram (74×20).

## Audit (`audit.mjs`)

- Pages crawlées : 6 (depuis `http://127.0.0.1:4503/brasserie-du-quai/legacy/`).
- Page la plus lourde : `/brasserie-du-quai/legacy/galerie/`, environ 2344 KB (images 2041 KB, polices 291 KB, CSS 6 fichiers gz, JS 1 fichier gz, html 5).
- Résultat : **0 FAIL, 34 WARN**.
- Journal : `.logs/brasserie-du-quai-legacy-build-audit.log`.

## Notes

- Le desktop est mesuré en rendu logiciel headless : les FPS desktop sont un plancher, pas une mesure réelle (mention du rapport).
- Les chiffres mobiles sont sous 4x de ralentissement CPU et réseau 4G lent.
- Cette passe ne modifie aucun fichier source et ne commite rien. Le répertoire `dist/brasserie-du-quai/legacy/` a été régénéré par le build.
