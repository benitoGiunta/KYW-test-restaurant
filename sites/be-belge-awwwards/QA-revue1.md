# QA revue 1 : be-belge awwwards (captures et audit, faits)

Build : `pnpm build:site sites/be-belge-awwwards` (script `scripts/build-site.mjs`), exit 0, 5 pages construites, sortie `dist/be-belge/awwwards/`.
Serveur local : `serve.mjs dist --port 4502`, arrêté après usage.
Journaux complets : `.logs/be-belge-awwwards-revue1-*.log`.

## Pages capturées

Captures : `.shots-be-belge-awwwards-revue1/<page>/` (d-*.png bureau, m-*.png mobile, h-*.png survol, k-*.png clavier, report.json).
Planche : `.shots-be-belge-awwwards-revue1/<page>/planche.png`.

| Page | URL | Dossier captures | Planche |
|---|---|---|---|
| Accueil | /be-belge/awwwards/ | `.shots-be-belge-awwwards-revue1/home/` | `.shots-be-belge-awwwards-revue1/home/planche.png` |
| Carte | /be-belge/awwwards/carte/ | `.shots-be-belge-awwwards-revue1/be-belge-item/` | `.shots-be-belge-awwwards-revue1/be-belge-item/planche.png` |
| 404 | /__shoot-missing-page-… | `.shots-be-belge-awwwards-revue1/404/` | `.shots-be-belge-awwwards-revue1/404/planche.png` |

Note : l'audit indique « 4 pages crawled », le shoot n'a produit que 3 dossiers de page (accueil, carte, 404).

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (`a11y.violations`) | 0 | 0 | 1 (`color-contrast`, serious, 2 nœuds) |
| Alertes contraste à revoir | 9 | 7 | 0 |
| LCP bureau (ms) | 64 | 60 | 40 |
| LCP mobile (ms, 4x CPU, 4G lente) | 1388 | 984 | 212 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS défilement bureau / mobile | 60 / 60 | 60 / 60 | 60 / 61 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Cibles de survol testées | 7 | 7 | 2 |
| Focus clavier sans indicateur visible | 0 | 0 | 0 |
| Focus clavier invisible | 0 | 0 | 0 |
| Lien d'évitement en premier | non | non | non |
| Focus bloqué | non | non | non |
| Arrêts de tabulation | 12 | 12 | 3 |

Le WebGL n'est pas actif sur les trois pages (`glOn` faux).

## Audit (`audit.mjs`, racine http://127.0.0.1:4502/be-belge/awwwards/)

Résultat : 0 FAIL, 10 WARN.

- WARN « sentence repeated 2x » (8) :
  - `/be-belge/awwwards/` : « Mercredi 12 h à 13 h 30 », « Samedi 19 h à 20 h 30 », « Dimanche 12 h à 13 h 30 ».
  - `/be-belge/awwwards/reservation/` : « Mercredi 12 h à 13 h 30 », « Jeudi 12 h à 13 h 30, 19 h à 20 h 30 », « Vendredi 12 h à 13 h 30, 19 h à 20 h 30 », « Samedi 19 h à 20 h 30 », « Dimanche 12 h à 13 h 30 ».
- WARN « no robots.txt » (site).
- WARN « no sitemap » (site ; `sitemap-index.xml` est pourtant créé par le build dans `sites/be-belge-awwwards/dist`, à vérifier côté URL publiée).

Page `/reservation/` : crawlée par l'audit, non capturée par le shoot.

## Fichiers non modifiés

Aucun fichier source modifié, aucun commit.
