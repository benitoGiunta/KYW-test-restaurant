# RAPPORT : philfa / awwwards (phase 3, QA)

Self-score, non indépendant : aucun critique neuf (pas d'outil Agent) ; pas de carte jury. Les points 61 à 63 de la checklist restent non prouvés.

## Corrections de la passe
- Meta descriptions accueil (172) et carte (185) ramenées sous 160 caractères (audit : plus de WARN de longueur).
- LCP mobile accueil 3496 ms puis 1228 ms : le nom du hero n'est plus caché en CSS sur téléphone (intro du nom réservée au desktop, ouverture des moitiés et fil conservés), intro desktop raccourcie (settledMs 2273).
- Cibles tactiles : `.lien` en inline-block de 24 px ; 0 petite cible desktop et mobile sur l'accueil.
- 404 : la violation `color-contrast` venait de la réponse brute de serve.mjs ; `404.html` direct : 0 violation axe, 0 erreur.

## Preuves (accueil `.shots/home/report.json`, 404 `.shots/404html/report.json`)
0 erreur console, 0 requête échouée, CLS 0 à 0,002, pas de débordement horizontal, reduced.hiddenText 0, idleMotion true. `audit.txt` : 0 FAIL, 1 WARN (sitemap sous la racine de QA ; `sitemap-index.xml` présent dans le build). Page la plus lourde 1817 Ko, JS 60 Ko gz, polices woff2. Meta robots présent sur toutes les pages.

## Non vérifié
Captures ciblées de carte, histoire et réservation après correction (cibles `Ouvrir le plan` et `page de réservation` corrigées par le même CSS, non remesurées) ; 22 `contrastNeedsReview` de l'accueil non relus à l'oeil ; OG raffinée (og.mjs) non refaite ; jury indépendant absent.

## Placeholders
Aucun `placeholder: true` ajouté dans cette passe (liste de phase 1 dans `src/data/site.ts` et DESIGN.md). Carte relevée sur le site actuel, dates des plats de saison inconnues (note affichée sur la carte).
