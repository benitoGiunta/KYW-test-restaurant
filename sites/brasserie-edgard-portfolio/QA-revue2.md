# QA revue 2 — brasserie-edgard (portfolio)

Build : `dist/brasserie-edgard/portfolio/` (7 pages, exit 0). Serveur local 127.0.0.1:4501 (arrêté).
Captures : `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-portfolio-revue2/`
Note : le crawl a trouvé 6 pages (audit) mais le shoot n'a produit que 3 dossiers (home, brasserie-edgard-item, 404). Les pages carte, lunch, groupes, salle, reservation n'ont pas de capture.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| home | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-portfolio-revue2/home/planche.png` |
| brasserie-edgard-item (carte) | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-portfolio-revue2/brasserie-edgard-item/` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-portfolio-revue2/brasserie-edgard-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-portfolio-revue2/404/planche.png` |

Les planches ont été générées avec `scripts/planche.py` ; les options `--colonnes 4 --largeur 480` ne sont pas reconnues par le script (elles ont été prises pour des fichiers source, « ignoré »). Chaque planche fait 1920 × 5280 px, 19 images.

## Chiffres par page (report.json / summary.json)

| Indicateur | home | brasserie-edgard-item | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 1 (`color-contrast`, 2 nœuds : `.kyw-footer__note` #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| Contrastes à vérifier (axe) | 22 | 13 | — |
| CLS desktop | 0,001 | 0,001 | 0 |
| CLS mobile | 0,004 | 0 | 0 |
| LCP desktop (ms) | 116 (`p.hero__slogan`) | 120 (`p.lead`) | 48 (`p`) |
| LCP mobile (ms) | 3256 (`img`) | 1148 (`p.lead`) | 252 (`p`) |
| FPS desktop / mobile | 60 / 59 | 60 / 60 | 60 / 60 |
| Débordement horizontal | non (desktop et mobile) | non (desktop et mobile) | non (desktop et mobile) |
| Éléments débordants | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites | 0 | 0 | 1 |
| Texte caché réduit | 0 | 0 | 0 |
| Focus visible absent | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Survol sans changement | 0 | 0 | 2 |
| Information par la couleur seule | 0 | 0 | 0 |
| Lien d'évitement en premier | non | non | non |
| Mouvement réduit respecté | non (`movingReduced` = false) | non | non |
| Hero stabilisé (ms) | null | 2432 | 2214 |
| Clavier (ordre des arrêts) | aller au contenu, accueil brasserie, accueil, … | aller au contenu, accueil brasserie, accueil, carte, … | la page d'accueil, « Réalisé par », sortie de la page (body) |

Remarque : sur la page 404, le parcours clavier fait sortir le focus de la page après le lien « Réalisé par » (`body: focus left the page`) ; le lien d'évitement n'est pas le premier arrêt sur les trois pages.

## Audit (`audit.mjs`)

- **FAIL : 0**
- **WARN : 13**
  - 10 × « sentence repeated » : bloc horaires (« Horaires du jour Ouvert tous les jours, 10 h à 22 h 30 Chaussée de Wat… », « Du lundi au vendredi, le midi. », « 10:00 à 22:30 cuisine fermée de 15 h à 18 h ») répété 2 à 5 fois sur home, carte, lunch, groupes, salle, reservation.
  - 1 × « no robots.txt »
  - 1 × « no sitemap » (le sitemap-index.xml est pourtant généré par le build dans `dist/` ; le contrôle de l'audit ne le trouve pas à la racine du site testé)
- Poids le plus lourd : `/brasserie-edgard/portfolio/`, ~924 Ko (HTML 7, JS 20 gz, CSS 7 gz, polices 69, images 821).
- 6 pages crawlées.
