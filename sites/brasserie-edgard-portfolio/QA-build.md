# QA build : brasserie-edgard / portfolio

Build : `scripts/q.sh brasserie-edgard-portfolio-build-build` (exit 0, 7 pages, sortie `dist/brasserie-edgard/portfolio/`).
Serveur de test : `dist` sur 127.0.0.1:4501, arrêté après contrôle.
Captures : `shoot.mjs --crawl --nav`, journal `.logs/brasserie-edgard-portfolio-build-shoot.log`.
Audit : `audit.mjs`, journal `.logs/brasserie-edgard-portfolio-build-audit.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/brasserie-edgard/portfolio/` | `.shots-brasserie-edgard-portfolio-build/home/` | `.shots-brasserie-edgard-portfolio-build/home/planche.png` |
| Carte `/brasserie-edgard/portfolio/carte/` (page atteinte par navigation) | `.shots-brasserie-edgard-portfolio-build/brasserie-edgard-item/` | `.shots-brasserie-edgard-portfolio-build/brasserie-edgard-item/planche.png` |
| 404 (page inconnue) | `.shots-brasserie-edgard-portfolio-build/404/` | `.shots-brasserie-edgard-portfolio-build/404/planche.png` |

Le crawl de la navigation a fait 3 pages shootées ; l'audit a crawlé 6 pages.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total / serious) | 0 / 0 | 0 / 0 | 1 / 1 |
| Axe contraste à vérifier | 23 | 14 | 0 |
| LCP desktop (ms) | 96 | 88 | 52 |
| CLS desktop | 0.003 | 0.003 | 0 |
| LCP mobile, throttlé (ms) | 3336 | 1156 | 264 |
| CLS mobile | 0.006 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors-champ (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Texte masqué en mouvement réduit | 0 | 0 | 0 |

Détails :
- 404 : axe `color-contrast` (serious), 2 nœuds : `.kyw-footer__note` et un `span`, `#6b787d` sur `#fbfaf8`, ratio 4.36:1 (requis 4.5:1).
- 404 : cible trop petite « la page d'accueil » 128x20 (desktop et mobile).
- Accueil clavier : 12 arrêts ; focus invisible 0, sans focus visible 0, bloqué non ; lien d'évitement en premier arrêt : non (`skipLinkFirst` = false).
- Accueil : hauteur desktop 8511 px, mobile 8375 px ; FPS scroll desktop 60 (environnement headless, plancher seulement).

## Audit (audit.mjs)

- Résultat : **0 FAIL, 15 WARN**.
- Aucun FAIL.
- WARN (15) :
  - meta description de l'accueil : 182 caractères (cible 50 à 160) ;
  - phrases répétées sur 6 pages (horaires, « Du lundi au vendredi, le midi. », « 10:00 à 22:30 cuisine fermée de 15 h à 18 h ») ;
  - groupes : saut de titre h1 vers h3 ;
  - site : pas de robots.txt ; pas de sitemap (audit ; le build a pourtant créé `sitemap-index.xml`).
