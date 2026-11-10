# QA revue 1 — le-54-portfolio (rôle captures)

Build : `sites/le-54-portfolio` → `dist/le-54/portfolio/` (exit 0, 7 pages). Serveur local 127.0.0.1:4501 (arrêté après usage).

## Pages capturées

| Page | Dossier captures | Planche |
|---|---|---|
| Accueil `/le-54/portfolio/` | `.shots-le-54-portfolio-revue1/home/` | `.shots-le-54-portfolio-revue1/home/planche.png` |
| Menu `/le-54/portfolio/menu/` | `.shots-le-54-portfolio-revue1/le-54-item/` | `.shots-le-54-portfolio-revue1/le-54-item/planche.png` |
| 404 `/__shoot-missing-page-*` | `.shots-le-54-portfolio-revue1/404/` | `.shots-le-54-portfolio-revue1/404/planche.png` |

Synthèse : `.shots-le-54-portfolio-revue1/summary.json`. Rapports : `.shots-le-54-portfolio-revue1/<page>/report.json`.

## Chiffres (report.json / summary.json)

| Mesure | Accueil | Menu | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 148 | 108 | 40 |
| LCP mobile throttled (ms) | 1376 | 1200 | 240 |
| Débordement horizontal desktop | oui (1 élément : `img`) | non | non |
| Débordement horizontal mobile | non | non | non |
| FPS desktop / mobile (scroll) | 60 / 60 | 60 / 60 | 61 / 61 |
| Éléments cibles trop petits | 0 | 0 | 0 |
| Texte caché réduit | 0 | 0 | 0 |
| Focus visible absent | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Pas de changement au survol | 0 | 0 | 0 |
| Lien d'évitement en premier | non | non | non |
| Dépend de la couleur seule | 1 | 0 | 0 |
| Mouvement au repos | non | non | non |
| Préférence mouvement réduit respectée | non | non | non |

Notes : sur l'accueil, la capture desktop indique 1 élément en débordement (`img`) alors que le mobile ne déborde pas. Le 404 n'a ni `<title>` ni `lang` sur `<html>`.

## Audit (`audit.mjs`, journal `.logs/le-54-portfolio-revue1-audit.log`)

- Résultat : **0 FAIL, 6 WARN**.
- WARN :
  1. `/le-54/portfolio/` : phrase répétée 2x « Tous les jours sauf mardi et mercredi, 18:30 à 21:00 »
  2. `/le-54/portfolio/` : phrase répétée 2x « Tous les jours sauf mardi, mercredi et samedi, 12:00 à 14:00 »
  3. `/le-54/portfolio/reservation/` : phrase répétée 3x « 12:00 à 14:00, 18:30 à 21:00 »
  4. site : page 404 sans `<h1>`
  5. site : pas de `robots.txt`
  6. site : pas de `sitemap`
- 6 pages explorées ; page la plus lourde `/le-54/portfolio/` : ~650 KB.

## Journaux

- Build : `.logs/le-54-portfolio-revue1-build.log`
- Captures : `.logs/le-54-portfolio-revue1-shoot.log`
- Audit : `.logs/le-54-portfolio-revue1-audit.log`
