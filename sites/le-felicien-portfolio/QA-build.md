# QA build : le-felicien / portfolio

Passe : build · Rôle : captures · Faits seulement, aucune analyse de design.

## Build

- Commande : `node scripts/build-site.mjs sites/le-felicien-portfolio` (via `scripts/q.sh`), exit 0.
- Sortie : `dist/le-felicien/portfolio/`, 7 pages construites en 1,79 s (404, carte, formules, histoire, index, reservation, salle).
- Serveur : `serve.mjs dist --port 4501`, PID 12827, arrêté après les captures.

## Captures et planches

Le shoot a produit 3 dossiers (`summary.json`) : `home`, `le-felicien-item` (URL `/carte/`) et `404`.
L'audit a crawlé 6 pages (`/`, `/carte/`, `/formules/`, `/histoire/`, `/reservation/`, `/salle/`) : les 4 pages `formules`, `histoire`, `reservation`, `salle` ne sont pas dans les dossiers de captures.

| Page | Dossier de captures | Planche |
|---|---|---|
| home (`/le-felicien/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-le-felicien-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-portfolio-build/home/planche.png` (1920 x 5280, 19 images) |
| le-felicien-item (`/carte/`) | `/home/user/KYW-test-restaurant/.shots-le-felicien-portfolio-build/le-felicien-item/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-portfolio-build/le-felicien-item/planche.png` (1920 x 5280, 19 images) |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-felicien-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-portfolio-build/404/planche.png` (1920 x 4224, 14 images) |

Note : `planche.py` a traité `--colonnes 4` et `--largeur 480` comme des fichiers (« ignoré 4 », « ignoré 480 »). Les planches ont été produites avec les largeurs par défaut.

## Chiffres (report.json, summary.json)

| Indicateur | home | le-felicien-item (carte) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Contraste à revoir (axe) | 4 | 0 | 0 |
| LCP desktop | 112 ms | 92 ms | 52 ms |
| LCP mobile (throttled) | 1100 ms | 1092 ms | 244 ms |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal | non | non | non |
| Petites cibles tactiles | 0 | 0 | 0 |
| Texte caché réduit | 0 | 0 | 0 |
| FPS desktop / mobile (scroll) | 60 / 60 | 60 / 60 | 60 / 60 |
| Mouvement avec reduced-motion | non | non | non |
| Focus clavier sans indicateur visible | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Arrêts clavier | 12 | 12 | 1 (sortie de la page) |
| Lien d'évitement en premier | non | non | non |
| Hover sans changement | 1 | 0 | 0 |
| Hover couleur seule | 2 | 2 | 0 |
| Titre (`<title>`) | « Le Félicien \| Brasserie à Suarlée (Namur) » | « La carte \| Le Félicien » | vide |
| H1 | « LE FÉLICIEN » | « LA CARTE » | aucun |

Mouvement idle : actif sur `home` et `le-felicien-item` (`idleMotion: true`), inactif sur `404`.
Hauteur de page desktop : home 9443 px, carte 7640 px, 404 900 px.

## Audit (`audit.mjs`)

- Bilan : **0 FAIL, 12 WARN**.
- WARN :
  - meta description trop longue : `/` (176 car.), `/histoire/` (193 car.), cible 50-160.
  - phrase répétée 2x « Ouvert 7 jours sur 7 : midi 12h00 à 14h00, soir dès 18h00 » : `/`, `/carte/`, `/formules/`, `/histoire/`, `/reservation/`, `/salle/`.
  - phrase répétée 2x « Le lundi midi, cuisine du marché décidée le jour même. » : `/`.
  - page 404 sans `<h1>`.
  - pas de `robots.txt`.
  - pas de `sitemap`.
- Poids de la page la plus lourde : `/salle/`, environ 805 KB (html 4, JS 62 Ko gz, CSS 6 Ko gz, polices 111, images 623).

## Journaux

- `/home/user/KYW-test-restaurant/.logs/le-felicien-portfolio-build-build.log`
- `/home/user/KYW-test-restaurant/.logs/le-felicien-portfolio-build-shoot.log`
- `/home/user/KYW-test-restaurant/.logs/le-felicien-portfolio-build-audit.log`
- `/home/user/KYW-test-restaurant/.logs/serve-portfolio.log`
