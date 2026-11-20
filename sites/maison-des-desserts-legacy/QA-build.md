# QA build : maison-des-desserts / legacy

Faits extraits des `report.json` et de l'audit. Aucune analyse de design.

Build : `dist/maison-des-desserts/legacy/` (6 pages construites, exit 0).
Serveur de contrôle : `dist` sur 127.0.0.1:4503, arrêté après les captures.
Base URL : `http://127.0.0.1:4503/maison-des-desserts/legacy/`

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/`) | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-legacy-build/home/planche.png` |
| Carte (`/carte`) | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-legacy-build/maison-des-desserts-item/` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-legacy-build/maison-des-desserts-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-legacy-build/404/planche.png` |

Les pages galerie, jobs et contact ont été crawlées par l'audit mais n'ont pas de dossier de captures (le shoot n'a produit que 3 dossiers).

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 1 (desktop : ressource 404) | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 : color-contrast, serious (`.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| LCP desktop | 460 ms (img) | 376 ms (p.desc) | 52 ms (p) |
| LCP mobile | 976 ms (img) | 832 ms (p.lead) | 232 ms (p) |
| CLS desktop | 0,007 | 0,001 | 0 |
| CLS mobile | 0,045 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 2 / 0 | 1 / 0 | 1 / 1 |
| Texte caché (reduced-motion) | 0 | 0 | 0 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | non (focus quitte la page après « Réalisé par ») |
| Clavier : premier arrêt = lien d'évitement | non | non | non |
| FPS scroll mobile (pire trame) | 60 (17 ms) | 60 (17 ms) | 61 (17 ms) |
| loadMs desktop / mobile | 794 / 1822 ms | 738 / 1551 ms | 22 / 419 ms |

Le mouvement réduit ne montre aucun texte caché et aucune animation active sur les trois pages.

## Audit (`audit.mjs`)

Résultat : 0 FAIL, 39 WARN. Pages crawlées : 5 (accueil, carte, galerie, jobs, contact). Poids le plus lourd : galerie, environ 2009 Ko (fonts 103 Ko, images 1893 Ko).

WARN, par type :
- Métadonnées absentes sur `/jobs` : og:image, twitter:card, lien favicon.
- Métadonnées absentes sur `/contact` : canonical, og:title, og:description, og:image, twitter:card, lien favicon.
- Site : pas de `robots.txt`, pas de sitemap (dans la sortie de l'audit).
- Police TTF livrée sur les 5 pages (`ieVq2YZDLWuGJpnzaiwFXS9tYvBRzyFLlZg_f_Ncs2Za4Q.ttf`) : format woff2 attendu.

Seules les 20 dernières lignes de sortie ont été affichées par `q.sh` ; les WARN listés ci-dessus sont ceux visibles. Le journal complet est `/home/user/KYW-test-restaurant/.logs/maison-des-desserts-legacy-build-audit.log`.

## Lignes FAIL

Aucune.
