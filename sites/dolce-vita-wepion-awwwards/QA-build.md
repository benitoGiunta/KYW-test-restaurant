# QA build : dolce-vita-wepion / awwwards

Serveur local : `dist/` sur http://127.0.0.1:4502 (arrêté après usage). Journaux : `.logs/dolce-vita-wepion-awwwards-build-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| `/dolce-vita-wepion/awwwards/` (accueil) | `.shots-dolce-vita-wepion-awwwards-build/home/` (41 fichiers) | `.shots-dolce-vita-wepion-awwwards-build/home/planche.png` |
| `/dolce-vita-wepion/awwwards/carte/` | `.shots-dolce-vita-wepion-awwwards-build/dolce-vita-wepion-item/` (41 fichiers) | `.shots-dolce-vita-wepion-awwwards-build/dolce-vita-wepion-item/planche.png` |
| `/__shoot-missing-page-…` (404) | `.shots-dolce-vita-wepion-awwwards-build/404/` (18 fichiers) | `.shots-dolce-vita-wepion-awwwards-build/404/planche.png` |

Le shoot a crawlé 4 pages ; la 4e est la page 404 volontaire.

## Mesures par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 1 (`label-content-name-mismatch`, 1 nœud) ; 1 grave ; 2 à revoir (contraste) | 1 (`label-content-name-mismatch`, 1 nœud) ; 1 grave ; 0 à revoir | 2 (`document-title`, `html-has-lang`) ; 2 graves |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 308 (`h1#hero-titre.hero__titre`) | 156 (`span.neon`) | 60 (`pre`) |
| LCP mobile (ms) | 1264 (`img`) | 1188 (`span.neon`) | 248 (`pre`) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors champ (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 2 / 2 | 2 / 2 | 0 / 0 |
| FPS scroll desktop / mobile | 50 (pire trame 133 ms) / 59 | 60 / 60 | 60 / 61 |
| Mouvement en réduction (reduced motion) | pas de mouvement ; 0 texte caché | idem | idem |
| Survol : cibles sans changement / couleur seule | 1 / 4 | 2 / 3 | 0 / 0 |
| Clavier : arrêts de tabulation | 12 ; 0 focus invisible ; pas de blocage | 12 ; 0 focus invisible ; pas de blocage | 1 (focus sorti de la page) |
| Lien d'évitement en premier | non | non | non |

Note : le lien « Aller au contenu » est présent mais n'est pas le premier arrêt (`skipLinkFirst` = false).

## Audit (audit.mjs)

- Pages crawlées : 4 ; page la plus lourde : `/dolce-vita-wepion/awwwards/`, ~959 Ko (HTML 5, JS 61 gz, CSS 6 gz, polices 57, images 829).
- **FAIL : 0**
- **WARN : 9**
  - 6 × `/dolce-vita-wepion/awwwards/reservation/` : phrase répétée 2 fois (horaires : « Lundi 12 h à 14 h · 18 h à 22 h », « Mercredi 18 h à 22 h », « Jeudi … », « Vendredi … », « Samedi 18 h à 22 h », « Dimanche … »).
  - 404 : page sans `<h1>`.
  - site : pas de `robots.txt`.
  - site : pas de `sitemap`.

## Erreurs relevées par ce passage

- La page `/dolce-vita-wepion/awwwards/reservation/` apparaît dans l'audit mais n'a pas été capturée par le shoot (crawl de 4 pages : accueil, carte, 404, et une page sans capture dans le journal).
- Le journal de shoot ne contient que les 2 pages « home » et « dolce-vita-wepion-item » plus la 404 ; la page `reservation` n'a pas de dossier de captures.
- Violation `label-content-name-mismatch` présente sur les pages accueil et carte.
- Pages 404 : `document-title` et `html-has-lang` en échec.

Aucun fichier source modifié, aucun commit.
