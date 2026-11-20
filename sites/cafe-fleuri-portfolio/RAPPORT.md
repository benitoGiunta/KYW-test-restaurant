# RAPPORT QA : cafe-fleuri-portfolio (phase 3)
Hypothèse : QA-build.md de l'agent « captures » absent ; contrôles ciblés faits par script (3 largeurs × 6 pages).
## Contrôles
- 5 pages + 404 à 320/390/1440 : scrollWidth = largeur, 0 erreur console (hors 404 du serveur statique de test), 0 image cassée, 0 image sans alt, 1 h1 par page.
- noindex, mention « Maquette KYW… » et `kyw-signature` (un seul) : présents sur les 5 pages et dist/404.html.
## Corrections
- Typographie : « oeufs Benedict » devient « œufs Benedict » (3 occurrences, src/data/site.ts). Build refait, présent dans dist.
## Placeholders et données non prouvées
- Prix : tous `null` (aucun prix publié par la source), non affichés comme faits.
- `accrochePlaceholder: true` sur des accroches de brunch/carte (texte illustratif) ; photos libres Unsplash illustratives (légende « Photo libre, illustrative », crédits en colophon).
- Avis, abonnés : null.
## Restes connus (non corrigés, à juger en revue)
- Loader : compte de 00:00 à l'heure réelle, hors 9-16h affiche p. ex. 21:00 ; désactivé en mobile.
- Badge dupliqué (en-tête compact + hero), hérité du gabarit.
- Non fait : sloplint, capture visuelle complète (pas de QA-build.md), commit final [publier], gabarits/UTILISATION.md (gabarits/ protégé).
