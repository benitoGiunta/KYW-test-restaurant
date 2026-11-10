# QA build : huile-sur-le-feu-portfolio

Passe `build`, rôle captures. Serveur local `dist/` sur http://127.0.0.1:4501 (arrêté après usage).
Build : exit 0, 7 pages Astro construites (404, boutique, carte, histoire, huiles, index, reservation).

## Captures et planches

| Dossier de captures | Planche | Page couverte |
|---|---|---|
| `.shots-huile-sur-le-feu-portfolio-build/home/` | `.shots-huile-sur-le-feu-portfolio-build/home/planche.png` (19 images) | `/huile-sur-le-feu/portfolio/` |
| `.shots-huile-sur-le-feu-portfolio-build/huile-sur-le-feu-item/` | `.shots-huile-sur-le-feu-portfolio-build/huile-sur-le-feu-item/planche.png` (19 images) | `/huile-sur-le-feu/portfolio/carte/` |
| `.shots-huile-sur-le-feu-portfolio-build/404/` | `.shots-huile-sur-le-feu-portfolio-build/404/planche.png` (14 images) | `__shoot-missing-page` (404) |

Remarques de capture : le crawl annonce 6 pages, mais `shoot.mjs --crawl --nav` n'a produit que 3 dossiers (home, carte, 404). Le dossier `huile-sur-le-feu-item` contient la page carte. `planche.py` lit `--colonnes` et `--largeur` comme des fichiers et les ignore avec un message, mais la planche sort bien en 4 colonnes de 480 px.

## Mesures (report.json)

| Page | Erreurs console | Requêtes en échec | axe serious | axe violations | LCP desktop | CLS desktop | LCP mobile | CLS mobile | Débordement X (desk/mob) | Éléments cachés | Cibles trop petites (desk/mob) | Focus clavier sans style | Focus invisible | Skip link premier | Hover sans changement |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home | 0 | 0 | 0 | 0 (23 contrastes à revoir) | 204 ms | 0.043 | 1128 ms | 0.013 | non / non | 0 | 0 / 0 | 0 | 0 | non | 0 |
| carte | 0 | 0 | 0 | 0 | 232 ms | 0.002 | 2216 ms | 0 | non / non | 0 | 0 / 0 | 0 | 0 | non | 2 |
| 404 | 0 | 0 | 2 | document-title, html-has-lang | 44 ms | 0 | 236 ms | 0 | non / non | 0 | 0 / 0 | 0 | 0 | non | 0 |

Autres relevés : FPS desktop 60 et mobile 60 (rendu logiciel, à lire comme un plancher). Titre home : 73 caractères. Titre 404 : vide, pas de h1.
Mouvement réduit : pas de mouvement ni de texte caché sur les pages relevées.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 10
  1. `/huile-sur-le-feu/portfolio/` titre de 73 caractères (limite 70)
  2. Phrase répétée 10 fois sur l'accueil : « 12:00 à 14:30, 18:00 à 21:15 »
  3. Même phrase répétée 5 fois sur `carte/`, `huiles/`, `boutique/`, `histoire/`
  4. Même phrase répétée 10 fois sur `reservation/`
  5. Page 404 sans h1
  6. Pas de robots.txt
  7. Pas de sitemap (le build en génère pourtant un : `sitemap-index.xml` dans `dist/`)

Poids le plus lourd : `/huile-sur-le-feu/portfolio/histoire/`, ~757 KB (5 HTML, 7 JS gz, 7 CSS gz, 41 polices, 698 images).

Aucun fichier source modifié, aucun commit.
