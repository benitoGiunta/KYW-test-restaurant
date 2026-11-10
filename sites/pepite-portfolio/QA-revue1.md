# QA revue 1 — pepite / portfolio

Faits seulement (mesures, sans analyse de design). Build : `dist/pepite/portfolio/`, servi en local sur `http://127.0.0.1:4501/pepite/portfolio/` (serveur arrêté après les mesures).

Build : exit 0, 7 pages (404, carte, histoire, index, reservation, soirees, vins).

## Captures et planches

Une capture par type de page (shoot `--crawl --nav`). L'audit a parcouru 6 pages.

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/pepite/portfolio/` | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-revue1/home/planche.png` |
| Carte `/pepite/portfolio/carte/` (type `pepite-item`) | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-revue1/pepite-item/` | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-revue1/pepite-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-revue1/404/planche.png` |

Remarque : `scripts/planche.py` traite les valeurs `4` et `480` de `--colonnes 4 --largeur 480` comme des fichiers et les ignore (« ignoré 4 », « ignoré 480 »). La planche est tout de même produite en 4 colonnes de 480 px.

## Chiffres (report.json)

| Mesure | Accueil | Carte (pepite-item) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0, contrastNeedsReview 17) | 0 (contrastNeedsReview présent, non compté) | 0 |
| LCP desktop | 136 ms (img) | 88 ms (h1.hero__titre) | 36 ms (pre) |
| CLS desktop | 0.02 | 0.025 | 0 |
| LCP mobile (throttled) | 1236 ms (img) | 1864 ms (p.lead) | 248 ms (pre) |
| CLS mobile | 0.001 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments en débordement (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop (worst frame) | 60 (17 ms) | 60 (33 ms) | 61 (17 ms) |
| Texte caché (hiddenText) | 0 | 0 | 0 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : premier arrêt = lien d'évitement | non (« Aller au contenu » en premier arrêt) | non | non (aucun arrêt, focus sorti de la page) |
| Clavier : focus bloqué | non | non | non |
| Survol : changement absent / couleur seule / couvert | 0 / 0 / 0 (7 cibles) | 0 / 0 / 0 (6 cibles) | 0 / 0 / 0 (0 cible) |
| Suivi du curseur | oui | oui | non |
| Mouvement en mode réduit (`moving`) | non | non | non |

Autres notes : `loadMs` nul sur certaines mesures (à lire avec les vitals, non utilisé ici). Les FPS desktop sont mesurés sur rendu logiciel headless.

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 8 WARN**.
- WARN :
  1. `/pepite/portfolio/` : phrase répétée 2x « Le menu se déguste tel quel ou à l'assiette. »
  2. `/pepite/portfolio/` : phrase répétée 3x « Boutique dès 16h, cave à manger dès 19h »
  3. `/pepite/portfolio/` : phrase répétée 2x « Boutique dès 10h30, cave à manger dès 19h ; samedi midi sur demande »
  4. `/pepite/portfolio/reservation/` : phrase répétée 3x « Boutique dès 16h, cave à manger dès 19h »
  5. `/pepite/portfolio/reservation/` : phrase répétée 2x « Boutique dès 10h30, cave à manger dès 19h ; samedi midi sur demande »
  6. site : la page 404 n'a pas de `<h1>`
  7. site : pas de `robots.txt`
  8. site : pas de `sitemap`

Fichiers source non modifiés, aucun commit.
