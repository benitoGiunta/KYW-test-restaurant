# QA revue 1 : le-felicien / portfolio (captures)

Build : `pnpm build:site` via `scripts/build-site.mjs`, exit 0 (7 pages, `dist/le-felicien/portfolio/`).
Serveur : `dist` sur 127.0.0.1:4501 (arrêté après usage).
Captures : `shoot.mjs --crawl --nav` : 3 dossiers de pages produits (sur 6 pages explorées par l'audit).

## Pages capturées

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/le-felicien/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-le-felicien-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-portfolio-revue1/home/planche.png` |
| Carte (`/le-felicien/portfolio/carte/`) | `/home/user/KYW-test-restaurant/.shots-le-felicien-portfolio-revue1/le-felicien-item/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-portfolio-revue1/le-felicien-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-felicien-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-portfolio-revue1/404/planche.png` |

Note : `planche.py` a reçu `--largeur 480` sans prise en compte (la valeur `480` a été traitée comme fichier, « ignoré 480 »). Les planches ont été produites en largeur par défaut (1920 px).

## Chiffres (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0) | 0 (serious 0) | 2 (serious 2 : `document-title`, `html-has-lang`) |
| Contraste à vérifier (axe) | 4 | 0 | 0 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms) | 88 | 80 | 36 |
| LCP mobile (ms) | 1072 | 1084 | 212 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments cachés (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites (mobile) | 0 | 0 | 0 |
| Clavier : piège, focus invisible, focus absent, lien d'évitement en premier | non, [], [], non | non, [], [], non | non, [], [], non |
| Survol sans changement | 1 (`h-02` bouton « La carte midi et soir ») | 0 | 0 |
| Réduction de mouvement : mouvement / texte caché | non / 0 | non / 0 | non / 0 |
| Temps de chargement bureau / mobile (ms) | 169 / 2817 | n.d. | n.d. |
| Mobile throttled | oui | n.d. | n.d. |

Lecture brute : le lien d'évitement n'est pas le premier focus (`skipLinkFirst` = false) sur les trois pages mesurées.

## Audit (`audit.mjs`)

- 6 pages explorées depuis `/le-felicien/portfolio/`.
- Résultat : **0 FAIL, 9 WARN**.
- Poids le plus lourd : `/le-felicien/portfolio/salle/`, environ 805 KB (HTML 4, JS 62 gz, CSS 6 gz, polices 111, images 623).
- WARN :
  - Phrase répétée 2 fois, « Ouvert 7 jours sur 7 : midi 12h00 à 14h00, soir dès 18h00 », sur les 6 pages.
  - `site` : la page 404 n'a pas de `<h1>`.
  - `site` : pas de `robots.txt`.
  - `site` : pas de `sitemap` (la build a créé `sitemap-index.xml` dans `sites/le-felicien-portfolio/dist`, à vérifier dans `dist/le-felicien/portfolio/`).

Fichiers source non modifiés. Aucun commit.
