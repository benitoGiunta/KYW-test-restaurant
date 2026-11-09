# QA revue 1 — ferme-blanche-d-asie-portfolio

Faits uniquement (mesures et journaux). Build : `dist/ferme-blanche-d-asie/portfolio/`, sans erreur (`.logs/ferme-blanche-d-asie-portfolio-revue1-build.log`). Serveur local `dist` sur le port 4501, arrêté après la capture.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/ferme-blanche-d-asie/portfolio/` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-portfolio-revue1/home/planche.png` |
| Carte `/carte/` (gabarit « item » du crawl) | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-portfolio-revue1/ferme-blanche-d-asie-item/` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-portfolio-revue1/ferme-blanche-d-asie-item/planche.png` |
| 404 (page inexistante) | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-portfolio-revue1/404/planche.png` |

Le crawl a relevé 5 pages (accueil, carte, maison, salles, réservation) ; `shoot.mjs` n'a produit de dossiers que pour 3 gabarits (accueil, carte, 404). Les pages `maison`, `salles` et `reservation` n'ont pas de dossier de captures dans cette passe.

## Mesures par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console (`errors`) | 0 | 0 | 0 |
| Requêtes en échec (`failed`) | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms) | 152 | 108 | 36 |
| LCP mobile, throttled (ms) | 1276 | 2256 | 240 |
| Chargement bureau / mobile (ms) | 255 / 2990 | 118 / 2957 | 24 / 228 |
| Débordement horizontal mobile | non | non | non |
| Éléments trop petits mobile (cibles) | 0 | 0 | 0 |
| Texte caché (`reduced.hiddenText`) | 0 | 0 | 0 |
| Animation sous mouvement réduit (`reduced.moving`) | non | non | non |
| WebGL mobile actif | non | non | non |
| Tabulation clavier (arrêts) | 12 | 12 | 1 (focus sort de la page) |
| Survols capturés (`hover`) | 5 | 5 | 5 |

Mesures bureau à titre indicatif : le FPS de défilement est mesuré en rendu logiciel (plancher, pas une mesure réelle) ; le mobile est en ralentissement CPU x4.

## Audit (`audit.mjs`, journal `.logs/ferme-blanche-d-asie-portfolio-revue1-audit.log`)

- FAIL : **0**
- WARN : **10**
  - 7 × « sentence repeated 2x » : horaires `12:00 à 14:30, 18:00 à 23:00` (accueil, réservation, ×3 variantes), `12:00 à 14:30, 18:00 à 00:00`, `12:00 à 15:30, 18:00 à 23:00`; et « Mise en bouche : salade de bœuf et avocat » répétée (`/salles/`).
  - 404 : page sans `<h1>`.
  - Site : pas de `robots.txt`.
  - Site : pas de `sitemap` détecté par l'audit (le build Astro a pourtant écrit `sitemap-index.xml` dans `sites/ferme-blanche-d-asie-portfolio/dist`).
- Poids de la page la plus lourde : ~1998 KB (images 1926 KB, fontes 54 KB, JS 7 KB gz, CSS 7 KB gz).

## Problèmes relevés par les mesures

- 404 : deux violations axe sérieuses (`document-title`, `html-has-lang`).
- 404 : pas d'`<h1>`.
- Pas de `robots.txt` ni de `sitemap` détectés par l'audit.
- Mesures à relire : LCP mobile de la carte à 2256 ms (contre 1276 ms sur l'accueil), la plus haute du lot.
