# QA revue 2 : brasserie-du-quai (awwwards)

Passe : revue2 · Rôle : captures · Build : `pnpm build:site` via `scripts/build-site.mjs`, exit 0, 5 pages, `dist/brasserie-du-quai/awwwards/`.

Serveur : le lancement de `serve.mjs --port 4502` a échoué (EADDRINUSE, journal `.logs/serve-awwwards.log`). Captures et audit ont été faits contre le serveur déjà présent sur le port 4502 (PID 28177, démarré 17:04, même répertoire `dist`, relancé après le build de 17:28). Ce processus n'a pas été arrêté : il n'appartient pas à cette passe.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/brasserie-du-quai/awwwards/` | `.shots-brasserie-du-quai-awwwards-revue2/home/` | `.shots-brasserie-du-quai-awwwards-revue2/home/planche.png` |
| Fiche carte `/brasserie-du-quai/awwwards/carte/` | `.shots-brasserie-du-quai-awwwards-revue2/brasserie-du-quai-item/` | `.shots-brasserie-du-quai-awwwards-revue2/brasserie-du-quai-item/planche.png` |
| Page 404 (`__shoot-missing-page-…`) | `.shots-brasserie-du-quai-awwwards-revue2/404/` | `.shots-brasserie-du-quai-awwwards-revue2/404/planche.png` |

Chaque dossier contient `report.json`, les captures `d-*` (bureau), `m-*` (mobile), `h-*` (survol), `r-*` (réduit) et les fichiers de transition. Planches : 4 colonnes, 480 px de large.

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total / serious) | 0 / 0 | 0 / 0 | 2 / 2 (`document-title`, `html-has-lang`) |
| Axe contraste à vérifier | 11 | 18 | 0 |
| LCP bureau (ms) | 144 (`span.quai__ligne`) | 208 (`span.quai__ligne`) | 56 (`pre`) |
| LCP mobile (ms) | 1312 (`img`) | 1076 (`p.chapo`) | 272 (`pre`) |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Chargement bureau / mobile (ms) | 212 / 2524 | 264 / 2316 | 45 / 268 |
| FPS défilement bureau / mobile | 60 (pire trame 17 ms) / 53 (33 ms) | 60 (17 ms) / 55 (50 ms) | 61 / 60 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments cachés (texte masqué, reduced motion) | 0 | 0 | 0 |
| Cibles tactiles trop petites bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments en débordement (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Canvas WebGL présent | non | non | non |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | sans objet |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non ; mais le focus sort de la page (`body: focus left the page`) |
| Survol : éléments sans changement visible | 0 (`Toute la carte` : changement de couleur seul) | 0 (`Ouvrir le plan` : couleur seule) | sans objet |

Notes du rapport : les FPS bureau sont mesurés en headless sur GPU logiciel ; les chiffres mobiles sont à 4x de ralentissement CPU et 4G lente.

## Audit (audit.mjs)

- Résultat : **0 FAIL, 4 WARN**.
- Pages parcourues : 4 (poids de la plus lourde, accueil : environ 681 Ko ; HTML 5, JS 61 Ko gz, CSS 6 Ko gz, polices 105, images 505).
- Lignes WARN :
  - `/brasserie-du-quai/awwwards/reservation/` : phrase répétée 2 fois, « Midi : 12 h à 14 h 30 ».
  - site : la page 404 n'a pas de `<h1>`.
  - site : pas de `robots.txt`.
  - site : pas de `sitemap`.

## Fichiers

- Journaux : `.logs/brasserie-du-quai-awwwards-revue2-build.log`, `-shoot.log`, `-audit.log`, `-planche-*.log`.
- Aucun fichier source modifié, aucun commit.
