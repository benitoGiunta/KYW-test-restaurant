# QA build : le-royal / legacy

Passe : build · Rôle : captures · Site : `sites/le-royal-legacy/` (sortie `dist/le-royal/legacy/`)
URL testée : `http://127.0.0.1:4503/le-royal/legacy/` (serveur `serve.mjs`, arrêté après usage)

## Build

- `scripts/build-site.mjs sites/le-royal-legacy` : exit 0, 2 pages construites (404, index), sitemap créé.

## Pages

### home (`/le-royal/legacy/`)

- Captures : `/home/user/KYW-test-restaurant/.shots-le-royal-legacy-build/home/`
- Planche : `/home/user/KYW-test-restaurant/.shots-le-royal-legacy-build/home/planche.png`

| Indicateur | Desktop | Mobile (throttled) |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe | 0 (0 serious, 0 contrast à vérifier) | - |
| LCP | 440 ms (img) | 1032 ms (img) |
| CLS | 0.001 | 0.128 |
| FPS scroll | 61 (worst frame 17 ms) | 61 |
| Débordement horizontal | non | non |
| Éléments hors écran / cachés | 0 (`hiddenText` 0, `glHidden` 0) | - |
| Petites cibles tactiles | 0 | 0 |
| Hauteur de page | 8623 px | 9946 px |
| Chargement / stabilisation | load 685 ms, settled 3050 ms | load 1957 ms, settled 4020 ms |

Clavier : 12 arrêts de focus, 0 focus invisible, 0 focus non visible, pas bloqué, lien d'évitement (`skipLinkFirst`) absent en premier arrêt.
Survol : `noHoverChange` 2, `colorOnly` 5 (cibles dont le seul changement au survol est la couleur).
Mouvement réduit : `movingReduced` false, texte caché 0. Mouvement d'inactivité : non.
Note du rapport : `--nav` n'a trouvé aucun lien vers une autre page cliquable ; une seule page crawlée.

### 404 (sonde de page manquante, `/__shoot-missing-page-…`)

- Captures : `/home/user/KYW-test-restaurant/.shots-le-royal-legacy-build/404/`
- Planche : `/home/user/KYW-test-restaurant/.shots-le-royal-legacy-build/404/planche.png`

| Indicateur | Desktop | Mobile (throttled) |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe | 2 serious : `document-title` (html sans `<title>`), `html-has-lang` (html sans `lang`) | - |
| LCP | 40 ms (pre) | 244 ms (pre) |
| CLS | 0 | 0 |
| FPS scroll | 60 | 60 |
| Débordement horizontal | non | non |
| Titre de page | vide | vide |
| `h1` | aucun | aucun |
| Hauteur de page | 900 px | 2121 px |

Clavier : un seul arrêt (`body`, le focus quitte la page), pas de focus invisible.
Survol : `noHoverChange` 0, `colorOnly` 0.

## Audit (`audit.mjs`, URL home)

- Résultat : **0 FAIL, 10 WARN**. Exit 0. Journal : `.logs/le-royal-legacy-build-audit.log`.
- WARN :
  - `/le-royal/legacy/` : og:image absent
  - `/le-royal/legacy/` : twitter:card absent
  - `site` : page 404 sans `<h1>`
  - `site` : pas de robots.txt
  - `site` : pas de sitemap (le build en crée pourtant un : `sitemap-index.xml`, voir journal de build)
  - `/le-royal/legacy/` : 4 fichiers TTF/OTF livrés (conseil : woff2)
  - `/le-royal/legacy/` : polices 376 KB (moins de graisses, variable ou sous-ensemble)
- Poids de la page la plus lourde : ~1061 KB (html 7, JS 1 gz, CSS 5 gz, polices 376, images 673).

## Points de contrôle des outils

- `scripts/planche.py` ne lit pas `--colonnes` ni `--largeur` : ces options et leurs valeurs sont traitées comme fichiers (« ignoré 4 », « ignoré 480 »). Les planches sont produites en 1920 px de large, 14 vignettes, 4224 px de haut.
- Le shoot a fait 53 lignes de journal ; le crawl n'a pas trouvé de page supplémentaire.

Aucun fichier source modifié, aucun commit.
