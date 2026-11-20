# QA revue 1 — escale-en-vue-legacy (captures, audit)

Faits seulement. Serveur : `dist/` servi sur http://127.0.0.1:4503 (arrêté après usage). Captures et planches ci-dessous.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/escale-en-vue/legacy/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-legacy-revue1/home/planche.png` (14 images) |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-legacy-revue1/404/planche.png` (19 images) |

Rapports : `<dossier>/report.json`. Synthèse : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-legacy-revue1/summary.json`.

## Chiffres par page

| Mesure | Accueil | 404 |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe (sérieuses) | 0 | 1 règle `color-contrast`, 2 nœuds : `.kyw-footer__note` et un `span` (#6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 104 (élément : img) | 32 (élément : p) |
| LCP mobile, throttlé (ms) | 1540 (élément : img) | 212 (élément : p) |
| Débordement horizontal desktop / mobile | non / non | non / non |
| Éléments hors écran (offenders) | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop | 1 : « escale-en-vue.be » 115×19 | 1 : « la page d'accueil » 128×20 |
| Cibles tactiles petites mobile | 0 | 0 |
| FPS défilement desktop / mobile | 60 / 60 | 60 / 61 |
| Hauteur page desktop / mobile (px) | 4108 / 4691 | 900 / 844 |
| Mouvement en mode réduit (`reduced`) | texte caché 0, mouvement non | texte caché 0, mouvement non |
| Mouvement au repos (`idleMotion`) | non | non |
| Clavier : arrêts de tabulation | 12 | 3 |
| Clavier : focus non visible / invisible | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non |
| Clavier : focus bloqué | non | non (le focus quitte la page après le dernier arrêt) |
| Survol : cibles testées (réaction) | 5 (couleur 1, mouvement 2, aucune 2) | 2 (aucune 2) |
| Note du rapport | `--nav` : aucun lien vers une autre page n'a pu être cliqué | voir `notes` dans `report.json` |

Titre (`<title>`) : accueil « Escale en Vue ! Terrasse et restaurant à Dave, Namur » ; 404 « Page introuvable · KYW ».
H1 : accueil « Une terrasse au-dessus de la vallée. » ; 404 « Page introuvable ».

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 2
  - `site` : no robots.txt
  - `site` : no sitemap
- Pages crawlées : 1. Page la plus lourde : `/escale-en-vue/legacy/`, ~737 KB ; html 4, JS 1 (gz), CSS 4 (gz), polices 57, images 670.

## Remarques d'exécution

- `planche.py` ignore les options `--colonnes` et `--largeur` : elles sont lues comme des fichiers (« ignoré 4 », « ignoré 480 »). Les planches sont produites avec la disposition par défaut (1920 px de large).
