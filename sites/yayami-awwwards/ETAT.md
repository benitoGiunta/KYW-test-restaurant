# ETAT yayami-awwwards, construction-3 (2026-11-19)
Fait : QA phase 3. Corrections (piste menus focusable, phrase répétée de la carte, cibles « Ouvrir le plan », survols page courante / marque / téléphone réservation, repos du jumeau 18 deg/s + respiration), rebuild OK, shoots complets accueil, carte, réservation, maison, 404.html : 0 erreur, axe 0, noHoverChange vide, audit 0 FAIL. RAPPORT.md écrit.
Reste : critique jury indépendant (outil Agent absent) et seconde passe ; repos sur les pages sans paire ; relecture à l'œil des `contrastNeedsReview` ; publication `[publier]` par le superviseur.
Pièges : un rebuild vide `dist/` (racine QA copiée) ; la « 404 » de shoot sans `/404.html` est la réponse brute de serve.mjs ; shoot = 2,5 min par page.
