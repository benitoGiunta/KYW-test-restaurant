# ETAT, Le Panorama (awwwards), fin de la phase 3 (QA)
## Fait
- QA-build.md lu ; cibles tactiles corrigées (`.lien` inline-block, min-height 24 px) ; contraste 404 non reproduit ; rebuild OK ; captures ciblées accueil et 404 propres ; audit 0 FAIL, 2 WARN justifiés ; RAPPORT.md écrit.
## Reste
- Critique jury indépendant (2 passes), revérifier carte, hovers, idleMotion, settledMs, FPS ; relire `contrastNeedsReview` ; OG depuis le hero ; « retirer un accessoire » ; points 61 à 63.
## Pièges
- `shoot.mjs` sur une page dépasse 120 s : lancer en arrière-plan. Hovers sautés (`--hovers 0`).
