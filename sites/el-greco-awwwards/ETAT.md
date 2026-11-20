# ETAT : El Greco awwwards, fin de la phase 3 (QA)
## Fait
- Audit 0 FAIL ; CLS mobile 0 partout ; cibles tactiles 44 px ; OG recomposée ; repos hero adouci ; build final OK. Détail dans RAPPORT.md.
## Reste
- Critique jury indépendant (`/jury`), relecture des `contrastNeedsReview`, `settledMs` null sur l'accueil (repos continu), jpg 520 Ko non référencé dans `_astro/`, shoot complet carte et histoire.
## Pièges
- Édits faits pendant un shoot de fond perdus une fois : relire par grep avant rebuild. QA par racine `.qa-root` (non commitée).
