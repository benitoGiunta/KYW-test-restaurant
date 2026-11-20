# ETAT, champs-elysees-awwwards, construction-3 (20/11/2026)
## Fait
- Phases 1 et 2 (voir DESIGN.md). Phase 3 : corrections QA (cibles petites, survol du logo, phrase répétée de l'histoire, `idleMotion`), build OK, audit 0 FAIL, captures ciblées accueil, histoire, 404 (voir RAPPORT.md).
## Reste
- Critique jury neuf (scores), revue à l'œil des contrastes, nouvelle capture carte et réservation, vérifier og.png, désigner l'accessoire retiré, compléter DESIGN.md points 42 à 63 avec preuves.
## Pièges
- Le shoot d'une page dure 2 à 4 min : le lancer en fond. `idleMotion` exige un changement de > 0,05 % des pixels en 1,5 s.
- La 404 du shoot --crawl est la réponse brute de serve.mjs : shooter `404.html`.
