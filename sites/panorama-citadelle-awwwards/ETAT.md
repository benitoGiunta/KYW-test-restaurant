# ETAT, Le Panorama (awwwards), fin de la phase 3 (QA)
## Fait
- QA-build.md lu ; cibles tactiles corrigées (`.lien` inline-block, min-height 24 px) ; contraste 404 non reproduit ; rebuild OK ; captures ciblées accueil et 404 propres ; audit 0 FAIL, 2 WARN justifiés ; RAPPORT.md écrit.
## Reste
- Critique jury indépendant (2 passes), revérifier carte, hovers, idleMotion, settledMs, FPS ; relire `contrastNeedsReview` ; OG depuis le hero ; « retirer un accessoire » ; points 61 à 63.
## Pièges
- `shoot.mjs` sur une page dépasse 120 s : lancer en arrière-plan. Hovers sautés (`--hovers 0`).

## Relecteur-site passe 1 (20/11/2026)
Fait : REVUE-1.md (A_CORRIGER : 0 F0, 1 F1, 3 F2, 5 F3). Mesures maison : axe 5 pages x 3 largeurs, liens (133, 0 KO), prix (44 plats), reduced-motion, LCP/CLS CDP x4, Tab. Serveur PID 30997 et 4872 arrêtés.
Reste : corriger F1-1 (focus du mur de photos mobile), F2-1 horaires, F2-2 photos doublons, F2-3 espaces insécables ; puis revue passe 2.
Pièges : captures QA = accueil, carte, 404 brute (la vraie 404.html a été capturée dans .shots-panorama-citadelle-awwwards-revue1/rev1/).
