# QA revue 2 — le-felicien / awwwards (captures)

Build : `sites/le-felicien-awwwards` → `dist/le-felicien/awwwards/` (exit 0, 5 pages).
Serveur : `dist` sur `http://127.0.0.1:4502/le-felicien/awwwards/` (arrêté après les captures).
Captures : `.shots-le-felicien-awwwards-revue2/<page>/` (report.json, d-*, m-*, r-*, h-*, k-* selon page).

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-felicien/awwwards/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-awwwards-revue2/home/planche.png` |
| Carte `/le-felicien/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-awwwards-revue2/le-felicien-item/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-awwwards-revue2/le-felicien-item/planche.png` |
| 404 (page inexistante) | `/home/user/KYW-test-restaurant/.shots-le-felicien-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-awwwards-revue2/404/planche.png` |

Note : le crawl a trouvé 4 pages, 3 ont été capturées (`summary.json`). Le dossier `le-felicien-item` contient la carte.
`--nav` : aucun lien vers une autre page cliquable (aucune navigation testée).

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (0 serious) | 0 (0 serious) | 2 (`document-title`, `html-has-lang`, serious) |
| Contraste à revoir (axe) | 8 | 11 | 0 |
| LCP desktop | 124 ms | 132 ms | 44 ms |
| LCP mobile (throttled) | 1176 ms | 1244 ms | 224 ms |
| CLS desktop | 0 | 0 | 0 |
| CLS mobile | 0 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés (GL) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Clavier : focus invisible | input `INPUT` | input `INPUT` | aucun |
| Clavier : focus non visible | 0 | 0 | 0 |
| Clavier : lien d'évitement en premier (`skipLinkFirst`) | false | false | false |
| Clavier : focus bloqué | non | non | non |
| Mouvement réduit : texte caché / animation active | 0 / non | 0 / non | 0 / non |

Précisions :
- Le premier arrêt clavier de l'accueil et de la carte est « Aller au contenu » ; le champ `skipLinkFirst` reste à `false` dans le rapport.
- Le champ d'entrée `INPUT` est signalé « focus invisible » sur l'accueil et la carte.
- Le rapport 404 cible `/__shoot-missing-page-…` : la page 404 n'a ni `<title>` ni attribut `lang` sur `<html>`.
- Vitesse de défilement desktop : 60 fps (rendu logiciel headless, à prendre comme plancher).

## Audit (audit.mjs)

- FAIL : 0
- WARN : 3
- Poids de la page la plus lourde : ~293 KB (HTML 5, JS 64 gz, CSS 6 gz, polices 80, images 138).
