# QA revue 1 : le-servais / legacy (captures)

Build : `sites/le-servais-legacy` → `dist/le-servais/legacy/` (exit 0, 7 pages Astro).
Serveur local : `dist` sur `http://127.0.0.1:4503/le-servais/legacy/` (arrêté après les captures).
Journaux : `.logs/le-servais-legacy-revue1-{build,shoot,audit,planche-*}.log`.

## Captures et planches par page

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/le-servais/legacy/`) | `/home/user/KYW-test-restaurant/.shots-le-servais-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-servais-legacy-revue1/home/planche.png` |
| Carte (`/le-servais/legacy/carte/`) | `/home/user/KYW-test-restaurant/.shots-le-servais-legacy-revue1/le-servais-item/` | `/home/user/KYW-test-restaurant/.shots-le-servais-legacy-revue1/le-servais-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-servais-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-servais-legacy-revue1/404/planche.png` |

Le crawl de l'audit annonce 6 pages ; le shoot n'en a capturé que 3 (accueil, carte, 404). Les autres pages (contact, évènements, groupes, carte cadeau) n'ont pas de dossier de captures.

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| LCP desktop (ms) | 168 | 128 | 52 |
| LCP mobile throttled (ms) | 1620 | 1284 | 228 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles petites (mobile / desktop) | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop / mobile | 60 / 60 | 61 / 61 | 60 / 61 |
| Éléments texte cachés en mouvement réduit | 0 | 0 | 0 |
| Focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier | non | non | non |
| Piège clavier (`stuck`) | non | non | non |
| Tabulations parcourues | 12 | 12 | 1 |
| Survol : sans changement / couleur seule | 1 / 6 | 1 / 6 | 0 / 0 |
| Survol : éléments recouverts / curseur suiveur | 0 / non | 0 / non | 0 / non |

Le journal du shoot indique « 3 pages shot ». Les notes du report précisent que le FPS desktop tourne sans GPU (valeur indicative) et que le mobile est en ralentissement CPU x4.

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 10 WARN**.

WARN :
1. `/le-servais/legacy/` : phrase répétée 5x « 9 h 00 à 1 h 00 »
2. `/le-servais/legacy/` : phrase répétée 2x « 9 h 00 à 2 h 00 »
3. `/le-servais/legacy/carte/` : phrase répétée 2x « 11 h 30 à 22 h 00, vendredi et samedi jusqu’à minuit »
4. `/le-servais/legacy/carte/` : phrase répétée 5x « 9 h 00 à 1 h 00 »
5. `/le-servais/legacy/carte/` : phrase répétée 2x « 9 h 00 à 2 h 00 »
6. `/le-servais/legacy/contact/` : phrase répétée 5x « 9 h 00 à 1 h 00 »
7. `/le-servais/legacy/contact/` : phrase répétée 2x « 9 h 00 à 2 h 00 »
8. site : la page 404 n'a pas de `<h1>`
9. site : pas de `robots.txt`
10. site : pas de `sitemap` (le build produit pourtant `sitemap-index.xml`)

Audit : 6 pages crawlées, page la plus lourde `/le-servais/legacy/` (~651 KB ; 1 JS gz, 5 CSS gz, 90 polices, 550 images).

## Pièges relevés

- `scripts/planche.py` : les options `--colonnes 4 --largeur 480` sont lues, mais `4` et `480` sont aussi pris pour des fichiers et ignorés (« ignoré 4 », « ignoré 480 »). Les planches sont produites (1920 px de large = 4 colonnes × 480).

## Non fait

Aucun fichier source modifié, aucun commit. Serveur arrêté.
