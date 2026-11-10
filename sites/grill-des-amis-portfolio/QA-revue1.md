# QA revue 1 : grill-des-amis, variante portfolio

Build : `sites/grill-des-amis-portfolio` → `dist/grill-des-amis/portfolio/` (exit 0, 6 pages).
Serveur de test : `http://127.0.0.1:4501/grill-des-amis/portfolio/` (arrêté après la passe).
Journaux : `.logs/grill-des-amis-portfolio-revue1-{build,shoot,audit}.log`.

## Captures et planches

| Dossier de page | Planche | Note |
|---|---|---|
| `.shots-grill-des-amis-portfolio-revue1/home/` | `.shots-grill-des-amis-portfolio-revue1/home/planche.png` | accueil |
| `.shots-grill-des-amis-portfolio-revue1/grill-des-amis-item/` | `.shots-grill-des-amis-portfolio-revue1/grill-des-amis-item/planche.png` | contenu de la page /carte/ (nom de dossier produit par le crawl) |
| `.shots-grill-des-amis-portfolio-revue1/404/` | `.shots-grill-des-amis-portfolio-revue1/404/planche.png` | URL inexistante, page 404 servie |

Le crawl a produit 3 dossiers de captures ; l'audit en compte 5 pages crawlées (/, /carte/, /histoire/, /traiteur/, /reservation/). Les pages histoire, traiteur et reservation n'ont pas de dossier de captures.
Index : `.shots-grill-des-amis-portfolio-revue1/summary.json`.

## Chiffres par page (report.json)

| Page | Erreurs console | Requêtes en échec | Débordement horizontal (desk / mob) | LCP desk / mob (ms) | CLS desk / mob | FPS défilement desk / mob | Axe graves | Cibles petites (desk / mob) | Focus invisible / sans focus visible | Hover sans changement |
|---|---|---|---|---|---|---|---|---|---|---|
| home | 0 | 0 | non / non | 224 / 1264 | 0.001 / 0.01 | 48 / 28 | 0 | 0 / 1 (« Le Grill des amiS » 116x18) | 0 / 0 | 0 |
| grill-des-amis-item (/carte/) | 0 | 0 | non / non | 176 / 1112 | 0.001 / 0 | 46 / 26 | 0 | 0 / 1 (« Le Grill des amiS » 116x18) | 0 / 0 | 0 |
| 404 | 0 | 0 | non / non | 48 / 252 | 0 / 0 | 60 / 61 | 2 (`document-title`, `html-has-lang`) | 0 / 0 | 0 / 0 | 0 |

Autres valeurs relevées :
- home : `idleMotion` true, `movingReduced` false, `hiddenTextReduced` 0, `colorOnly` 0. Contraste à vérifier (axe, `contrastNeedsReview`) : 39.
- grill-des-amis-item : `idleMotion` true, `colorOnly` 1, contraste à vérifier : 12.
- 404 : `idleMotion` false, aucun `<title>`, aucun `lang` sur `<html>`, aucune `<h1>`. Focus clavier : seul arrêt « body: focus left the page », pas de lien d'évitement.
- Champ `skipLinkFirst` = false sur les trois pages, alors que la liste des arrêts clavier commence par « Aller au contenu » sur home et /carte/ (incohérence du contrôle à vérifier).

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 12 WARN**.

WARN :
- Répétition de phrases (`sentence repeated`) :
  - `/grill-des-amis/portfolio/` : 4 phrases répétées 2x (dont « Le feu de bois, ça se sent. ») ; « 12 h à 14 h, 18 h à 21 h 30 » répétée 8x.
  - `/carte/`, `/histoire/`, `/traiteur/`, `/reservation/` : « 12 h à 14 h, 18 h à 21 h 30 » répétée 4x sur chaque page.
- Site : la page 404 n'a pas de `<h1>`.
- Site : pas de `robots.txt`.
- Site : pas de sitemap (l'audit ne détecte pas `sitemap-index.xml`, produit par le build dans `sites/grill-des-amis-portfolio/dist`).
