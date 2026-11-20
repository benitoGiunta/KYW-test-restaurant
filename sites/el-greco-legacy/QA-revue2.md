# QA revue 2 : el-greco / legacy (captures et audit, faits seulement)

Build : `sites/el-greco-legacy` → `dist/el-greco/legacy/` (exit 0, 6 pages, sitemap créé).
Serveur de test : `http://127.0.0.1:4503/el-greco/legacy/` (arrêté après les captures).

## Pages capturées

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/el-greco/legacy/`) | `/home/user/KYW-test-restaurant/.shots-el-greco-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-el-greco-legacy-revue2/home/planche.png` |
| Carte (`/our-menu/`) | `/home/user/KYW-test-restaurant/.shots-el-greco-legacy-revue2/el-greco-item/` | `/home/user/KYW-test-restaurant/.shots-el-greco-legacy-revue2/el-greco-item/planche.png` |
| 404 (page introuvable) | `/home/user/KYW-test-restaurant/.shots-el-greco-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-el-greco-legacy-revue2/404/planche.png` |

Chaque planche : 19 images, 4 colonnes, 480 px de large (1920 × 5280 px).
Résumé de capture : `/home/user/KYW-test-restaurant/.shots-el-greco-legacy-revue2/summary.json`.
Les pages `about-us`, `contact` et `carte-des-boissons` sont listées par l'audit mais n'ont pas de dossier de captures.

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (`color-contrast`, sérieuse) |
| Contraste à vérifier | 0 | 0 | 0 |
| CLS bureau / mobile | 0,008 / 0,007 | 0,016 / 0,002 | 0 / 0 |
| LCP bureau (ms, élément) | 472 (span) | 412 (p.lead) | 48 (p) |
| LCP mobile (ms, élément) | 864 (p.lead) | 748 (p.lead) | 244 (p) |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Cibles tactiles petites bureau / mobile | 1 / 1 | 1 / 2 | 1 / 1 |
| Éléments hors cadre (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Survol : changement de couleur seul / sans changement | 3 / 2 | 3 / 2 | 0 / 2 |
| Mouvement en réduit / texte masqué | non / 0 | non / 0 | non / 0 |
| FPS défilement bureau (pire trame ms) | 59 (33) | 60 (17) | 60 (17) |

Mobile mesuré avec throttling (`throttled: true`) sur les trois pages.

## Détail des points notables

- 404 : la violation axe `color-contrast` (sérieuse) est la seule violation axe relevée sur les trois pages.
- Audit (`audit.mjs`) : 5 pages explorées, page la plus lourde `/el-greco/legacy/` ~700 Ko (HTML 4, JS 1 gz, CSS 5 gz, polices 521 Ko, images 169 Ko).
- Audit : 0 FAIL, 70 WARN. Exemple de WARN : `/el-greco/legacy/contact/`, polices 521 Ko (moins de graisses, police variable, sous-ensemble).
- Journaux : `/home/user/KYW-test-restaurant/.logs/el-greco-legacy-revue2-shoot.log`, `/home/user/KYW-test-restaurant/.logs/el-greco-legacy-revue2-audit.log`.

## Lignes FAIL de l'audit

Aucune (0 FAIL).

## Nombre de WARN de l'audit

70 WARN.

## Fichiers non modifiés

Aucun fichier source modifié, aucun commit. Seuls `sites/el-greco-legacy/QA-revue2.md` et les dossiers `.shots-el-greco-legacy-revue2/` et `.logs/` ont été écrits.
