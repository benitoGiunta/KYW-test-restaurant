# QA build : be-belge / portfolio (passe build, phase test)

Build : `scripts/q.sh be-belge-portfolio-build-build` : exit 0, 7 pages (404, carte, index, maison, menu, privatisation, reservation). Sortie `dist/be-belge/portfolio/`.
Serveur local : port 4501, arrêté après captures.

## Captures et planches

Le crawl a produit 3 dossiers de captures (les 6 pages du crawl audit ne sont pas toutes capturées : `carte`, `maison`, `privatisation`, `reservation` absents du shoot).

| Page | Dossier captures | Planche |
|---|---|---|
| home (`/be-belge/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-be-belge-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-be-belge-portfolio-build/home/planche.png` |
| be-belge-item (`/menu/`) | `/home/user/KYW-test-restaurant/.shots-be-belge-portfolio-build/be-belge-item/` | `/home/user/KYW-test-restaurant/.shots-be-belge-portfolio-build/be-belge-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-be-belge-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-be-belge-portfolio-build/404/planche.png` |

Note : `planche.py` a traité `--colonnes 4 --largeur 480` comme des fichiers (« ignoré 4 », « ignoré 480 ») ; les planches ont été produites en 1920 px de large avec 19 images chacune, paramètres par défaut.

## Chiffres par page (report.json)

| Mesure | home | be-belge-item (menu) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| axe : violations serious | 0 | 0 | 1 (color-contrast, `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4.36:1, seuil 4.5:1) |
| axe : contrastNeedsReview | 21 | 3 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 80 | 52 | 48 |
| LCP mobile throttlé (ms) | 1284 | 1140 | 216 |
| Débordement horizontal | non | non | non |
| Petites cibles | 0 | 0 | 1 (« la page d'accueil », 128x20) |
| FPS scroll desktop | 60 | 60 | 60 |
| Hauteur page desktop (px) | 7357 | 3323 | 900 |
| Éléments cachés / texte réduit | 0 | 0 | 0 |
| Mouvement réduit | non signalé | non signalé | non signalé |
| Focus clavier visible manquant | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Lien d'évitement en premier | false | false | false |
| Survol sans changement | 0 | 0 | 2 (liens du pied de page) |
| Survol changement couleur seul | 2 | 0 | 0 |
| Mouvement permanent au repos | non | non | non |

Clavier, ordre des arrêts (`keyboard.stops`) : home 12 arrêts, menu 12 arrêts, 404 3 arrêts (le focus quitte la page après « Réalisé par »).

## Audit (audit.mjs)

- FAIL : 0
- WARN : 7
  - `/be-belge/portfolio/` : titre de 73 caractères (max 70)
  - `/be-belge/portfolio/` : meta description de 173 caractères (cible 50-160)
  - `/be-belge/portfolio/` : phrase répétée 2 fois « mercredi, jeudi, vendredi et dimanche, 12:00 à 13:30 »
  - `/be-belge/portfolio/` : phrase répétée 2 fois « jeudi, vendredi et samedi, 19:00 à 20:30 »
  - `/be-belge/portfolio/reservation/` : phrase répétée 2 fois « 12:00 à 13:30, 19:00 à 20:30 »
  - site : pas de robots.txt
  - site : pas de sitemap (le build a pourtant écrit `sitemap-index.xml` dans `sites/be-belge-portfolio/dist`, à vérifier à la racine servie)
- Crawl : 6 pages, page la plus lourde `/be-belge/portfolio/` ~1585 KB (images 1459 KB, fonts 109 KB, 6 JS gz, 6 CSS gz).
