# QA build : ferme-blanche-d-asie-awwwards

Passe : build · Rôle : captures · Serveur local : `dist/` sur port 4502 (arrêté après usage)
Build : `scripts/build-site.mjs sites/ferme-blanche-d-asie-awwwards` exit 0 (5 pages construites, 1,60 s).
Journaux : `.logs/ferme-blanche-d-asie-awwwards-build-*.log`

## Pages capturées

Dossier de captures : `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-build/`

| Page | URL | Dossier | Planche |
|---|---|---|---|
| Accueil | `/ferme-blanche-d-asie/awwwards/` | `.shots-ferme-blanche-d-asie-awwwards-build/home/` | `.shots-ferme-blanche-d-asie-awwwards-build/home/planche.png` |
| Carte (`ferme-blanche-d-asie-item`) | `/ferme-blanche-d-asie/awwwards/carte/` | `.shots-ferme-blanche-d-asie-awwwards-build/ferme-blanche-d-asie-item/` | `.shots-ferme-blanche-d-asie-awwwards-build/ferme-blanche-d-asie-item/planche.png` |
| 404 | `/__shoot-missing-page-…` | `.shots-ferme-blanche-d-asie-awwwards-build/404/` | `.shots-ferme-blanche-d-asie-awwwards-build/404/planche.png` |

Le crawl de l'audit a relevé 4 pages (dont `/reservation/`), le shoot en a capturé 3 : `reservation` n'a pas de dossier de captures.

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Contraste à revoir (axe) | 18 | 19 | 0 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau / mobile (ms) | 156 / 1120 | 68 / 1088 | 28 / 212 |
| FPS défilement bureau / mobile | 60 / 60 | 60 / 60 | 61 / 60 |
| Hauteur page bureau / mobile (px) | 8058 / 6525 | 6720 / 7683 | 900 / 2121 |
| Débordement horizontal | non (`overflowX: false`) | non | non |
| Texte caché (`reduced.hiddenText`) | 0 | 0 | 0 |
| Mouvement en réduit (`reduced.moving`) | false | false | false |
| Éléments de focus clavier | 12 | 12 | 1 |
| Cibles de survol testées | 7 (5 changent visuellement, 1 `none`, 1 `moves`) | non extrait | non extrait |

Notes du rapport : FPS bureau mesuré en rendu logiciel headless (plancher, non représentatif) ; mobile en ralentissement CPU x4 et 4G lente.

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 7 WARN**.

WARN :
1. `/carte/` : phrase répétée 2 fois, « Mise en bouche : salade de bœuf et avocat. »
2. `/reservation/` : phrase répétée 2 fois, « Du lundi au vendredi 12 h à 14 h 30 18 h à 23 h »
3. `/reservation/` : phrase répétée 2 fois, « Samedi 12 h à 14 h 30 18 h à minuit »
4. `/reservation/` : phrase répétée 2 fois, « Dimanche 12 h à 15 h 30 18 h à 23 h »
5. Site : la page 404 n'a pas de `<h1>`
6. Site : pas de `robots.txt`
7. Site : pas de `sitemap`

Note : le sitemap est généré par Astro (`sitemap-index.xml` créé au build) ; l'audit ne le trouve pas à la racine testée.
