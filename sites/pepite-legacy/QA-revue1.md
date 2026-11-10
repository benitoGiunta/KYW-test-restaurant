# QA revue 1 : pepite / legacy (captures)

Build : `scripts/q.sh pepite-legacy-revue1-build` (exit 0, sortie `dist/pepite/legacy/`).
Serveur : `dist/` sur `http://127.0.0.1:4503/pepite/legacy/` (arrêté après les captures).
Journaux : `.logs/pepite-legacy-revue1-*.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/pepite/legacy/` | `.shots-pepite-legacy-revue1/home/` | `.shots-pepite-legacy-revue1/home/planche.png` |
| 404 (`/__shoot-missing-page-…`) | `.shots-pepite-legacy-revue1/404/` | `.shots-pepite-legacy-revue1/404/planche.png` |

Rapports : `.shots-pepite-legacy-revue1/<page>/report.json` ; synthèse : `.shots-pepite-legacy-revue1/summary.json`.

## Chiffres par page (report.json)

| Mesure | Accueil | 404 |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe (sérieuses) | 0 | 2 : `document-title` (1), `html-has-lang` (1) |
| Contraste à vérifier (axe) | 42 | 0 |
| LCP desktop / mobile (ms) | 404 / 848 (élément `img.hero__img` / `h1#h-titre`) | 52 / 236 (élément `pre`) |
| CLS desktop / mobile | 0,001 / 0,001 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non |
| Cibles tactiles trop petites | 0 | 0 |
| Éléments de texte cachés réduits | 0 | 0 |
| FPS défilement desktop / mobile | 61 / 60 | 61 / 60 |
| Mouvement en réduit | non | non |
| Mouvement au repos | non | non |
| Clavier : lien d'évitement en premier | non | non |
| Clavier : focus non visible | 0 | 0 |
| Clavier : focus invisible | 0 | 0 |
| Survol sans changement | 1 | 0 |
| Survol : changement couleur seul | 6 | 0 |
| Clavier : arrêts | 12 (liens de navigation et CTA) | aucun (le focus quitte la page) |

Titre desktop accueil : « Pépite, cave à manger à Namur : vins d’auteurs et assiettes à partager ». Titre de la 404 : vide.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 8
  1. `/pepite/legacy/` : phrase répétée 2 fois, « Boutique dès 16 h 00 Cave à manger dès 19 h 00 ».
  2. `site` : la 404 n'a pas de `<h1>`.
  3. `site` : pas de `robots.txt`.
  4. `site` : pas de `sitemap`.
  5. à 8. `/pepite/legacy/` : quatre polices livrées en TTF/OTF (et non WOFF2).

Poids de la page la plus lourde : ~477 KB (html 5, JS 1 gz, CSS 5 gz, polices 244, images 223).
