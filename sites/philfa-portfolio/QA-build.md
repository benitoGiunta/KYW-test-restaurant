# QA build : philfa / portfolio

Phase : test · Passe : build · Rôle : captures. Faits uniquement, aucun avis de design.

Build : `sites/philfa-portfolio` construit sans erreur (6 pages, `dist/philfa/portfolio/`). Journal : `.logs/philfa-portfolio-build-build.log`.

Serveur de prévisualisation : `http://127.0.0.1:4501/philfa/portfolio/` (arrêté après les captures).

## Captures et planches

Le crawl (`--crawl --nav`) a produit 3 dossiers, un par type de page (le script ne prend qu'une page par type).

| Dossier | Page | Captures | Planche |
|---|---|---|---|
| `.shots-philfa-portfolio-build/home/` | accueil `/philfa/portfolio/` | 39 fichiers (report.json, d-*, h-*, k-*, m-*, r-*) | `.shots-philfa-portfolio-build/home/planche.png` |
| `.shots-philfa-portfolio-build/philfa-item/` | `/philfa/portfolio/carte/` | 38 fichiers | `.shots-philfa-portfolio-build/philfa-item/planche.png` |
| `.shots-philfa-portfolio-build/404/` | page 404 | 40 fichiers (non relevé) | `.shots-philfa-portfolio-build/404/planche.png` |

Les planches ont été produites sans les options `--colonnes` et `--largeur` (ces options étaient ignorées : `planche.py` les lit comme fichiers). Taille de chaque planche : 1920 x 5280 px, 19 images.

Un relance de `planche.py` avec les options placées avant les fichiers a échoué (`unknown file extension`) ; les planches de la première passe ont été conservées.

Autre point : le premier lancement de `shoot.mjs --crawl --nav` est resté bloqué sur l'accueil pendant plus de 10 minutes (1 fichier produit). Relancé avec un délai de 900 s, il a abouti.

Fichier journal du crawl : `.logs/philfa-portfolio-build-shoot.log`.

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte (philfa-item) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (0 serious) | 0 (0 serious) | 1 : `color-contrast`, impact serious, 2 nœuds |
| Contrastes à vérifier (axe) | 27 | 17 | 0 |
| LCP desktop | 68 ms (`p.hero__slogan`) | 68 ms (`p.lead`) | 28 ms (`p`) |
| LCP mobile | 3984 ms (`img`) | 1076 ms (`p.lead`) | 228 ms (`p`) |
| CLS desktop | 0.019 | 0.006 | 0 |
| CLS mobile | 0.007 | 0 | 0 |
| FPS scroll desktop | 58 (pire trame 33 ms) | 60 (17 ms) | 60 (17 ms) |
| FPS scroll mobile | 60 (17 ms) | 60 (17 ms) | 60 (17 ms) |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Cibles tactiles trop petites (desktop / mobile) | 0 / 0 | 0 / 0 | 1 / 1 : « la page d'accueil » 128x20 |
| Éléments cachés (glHidden) | aucun | non relevé | non relevé |
| Focus visible manquant | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Lien d'évitement en premier | non | non | non |
| Focus bloqué | non | non | non (focus sorti de la page après le dernier lien) |
| Navigation testée | vers `/carte/` | vers `/` | vers `/` |

Notes du script : les FPS desktop tournent en headless sur GPU logiciel (plancher, pas une mesure matérielle). Le mobile est à 4x de ralentissement CPU et 4G lente : LCP et FPS mobile font foi.

## Audit (audit.mjs)

5 pages crawlées. Résultat : **0 FAIL, 14 WARN**.

WARN (14) :
- Accueil : meta description de 180 caractères (cible 50 à 160) ; phrase répétée 2 fois (« Horaires du jour… ») ; phrase répétée 2 fois (« La salle et sa baie vitrée ») ; phrase répétée 10 fois (« 12:00 à 14:30, 18:15 à 21:00 »).
- Carte, Histoire, Terrasse, Réservation : phrase « Horaires du jour… » répétée 2 fois ; « 12:00 à 14:30, 18:15 à 21:00 » répétée 5 fois, sauf Réservation (10 fois).
- Site : pas de `robots.txt` ; pas de `sitemap`.

Journal de l'audit : `.logs/philfa-portfolio-build-audit.log`.

## Sorties brutes utiles

- `.shots-philfa-portfolio-build/summary.json` : résumé par type de page.
- `.shots-philfa-portfolio-build/<page>/report.json` : rapport complet (non recopié).
