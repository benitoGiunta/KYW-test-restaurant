# QA revue 2 : pepite-legacy

Build : `pnpm`-équivalent `scripts/build-site.mjs sites/pepite-legacy` : exit 0, sortie `dist/pepite/legacy/`.
Serveur : `.claude/skills/awwwards/scripts/serve.mjs dist --port 4503`, arrêté après usage.
Base : `http://127.0.0.1:4503/pepite/legacy/`

## Pages captées

| Page | Dossier des captures | Planche |
|---|---|---|
| Accueil (`/pepite/legacy/`) | `/home/user/KYW-test-restaurant/.shots-pepite-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-pepite-legacy-revue2/home/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-pepite-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-pepite-legacy-revue2/404/planche.png` |

Le crawl a trouvé 2 pages (accueil et 404). Les fichiers du dossier : `d-*` (bureau), `m-*` (mobile), `h-*` (survol), `k-*` (focus clavier), `report.json`.

## Chiffres par page (report.json)

| Indicateur | Accueil | 404 |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe (toutes) | 0 | 2 |
| Violations axe, impact serious | 0 | 2 |
| Nœuds axe « contrast needs review » | 43 | 0 |
| CLS bureau / mobile | 0.001 / 0.001 | 0 / 0 |
| LCP bureau (ms) | 532 (élément `img.hero__img`) | 52 (élément `pre`) |
| LCP mobile (ms, throttled) | 840 (élément `h1#h-titre`) | 256 (élément `pre`) |
| Débordement horizontal bureau / mobile | non / non | non / non |
| Éléments cibles trop petites bureau / mobile | 0 / 0 | 0 / 0 |
| Éléments cachés (texte masqué) bureau | non mesuré dans le rapport (champ `offenders` = 0) | idem |
| FPS défilement bureau / mobile | 61 / 60 | 61 / 60 |
| Chargement bureau / mobile (ms) | 883 / 1588 | n.d. |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 |
| Clavier : arrêts de tabulation / piégé | 12 / non | 1 / non |
| Survol : cibles / sans changement / couleur seule / recouvrement | 0 / 0 / 0 / 0 | n.d. |
| Mouvement réduit : texte masqué / animation | 0 / non | 0 / non |

Violations axe de la 404 :
- `document-title` (serious) : pas d'élément `<title>` ;
- `html-has-lang` (serious) : pas d'attribut `lang` sur `<html>`.

Titre de l'accueil : « Pépite, cave à manger à Namur : vins d'auteurs et assiettes à partager ». H1 : « Pépite, cave à manger ».
Le rapport 404 ne contient ni `<h1>` ni titre.

## Audit (audit.mjs)

Résultat : 0 FAIL, 8 WARN. Poids de la page la plus lourde : environ 502 Ko (HTML 5, JS 1 gz, CSS 5 gz, polices 244, images 248).

WARN :
1. `/pepite/legacy/` : phrase répétée 2 fois : « Boutique dès 16 h 00 Cave à manger dès 19 h 00 ».
2. `site` : la page 404 n'a pas de `<h1>`.
3. `site` : pas de `robots.txt`.
4. `site` : pas de `sitemap`.
5. à 8. `/pepite/legacy/` : 4 polices en `ttf/otf` (`pxigypc9…ttf`, `pximypc9…ttf` x2, `3qTpojO2nS2VtkB3KtkQZ2t6.ttf`) ; le rapport recommande le woff2.

## Notes de méthode

- `scripts/planche.py` : l'option `--largeur 480` est lue comme une image (message « ignoré 480 ») ; la planche sort quand même en 1920 px de large (4 colonnes de 480). Le parsing des options de `planche.py` est à corriger (voir la leçon à ajouter).
- Le `shoot.mjs` a tourné en arrière-plan (plus de 120 s). Un seul lancement, pas de relance.
