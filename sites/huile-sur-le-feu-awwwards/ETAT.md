# ETAT : huile-sur-le-feu, awwwards, phase 3 (construction-3) terminée

## Fait
- Phases 1 et 2 : voir RAPPORT.md et DESIGN.md. Phase 3 : QA sur QA-build.md, corrections (cibles tactiles `.lien`, phrases répétées, amplitude de la goutte au repos), rebuild OK, shoot ciblé accueil : 0 erreur, LCP mobile 2308, CLS 0, audit 0 FAIL / 1 WARN.
- RAPPORT.md écrit ; leçons ajoutées à agents/lecons/construction.md ; `pnpm index` et commit faits.

## Reste
- Critique jury indépendant (pas d'outil Agent ici), OG composée (`og.mjs`), apple-touch, contrastes `<em>` ail/truffe sur papier, revue à l'œil des `contrastNeedsReview`, idleMotion confirmé par le détecteur. Voir RAPPORT.md « Points non résolus ».

## Revue 1 (relecteur-site) : fait
- REVUE-1.md écrit : A_CORRIGER, 0 F0, 1 F1, 3 F2, 3 F3. Serveur de test (port 4761) arrêté.
- Reste pour la révision : F1-1 (retirer les `style="grid-column"` de histoire.astro:28,37,38 et reservation.astro:37,51, colonne de 165 px à 390 px, titres « Marchovelette » et « Santamaria » coupés jusqu'à 768 px), F2 (sommaire de la carte, og.png vide, répétitions), F3.
- Piège : `scrollWidth` de page et axe ne voient pas ce défaut ; mesurer `.paire__texte` et les `.split-line-mask` (scrollWidth > clientWidth).
