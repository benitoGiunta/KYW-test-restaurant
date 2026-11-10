# Comp avant build · Le 54

Deux comps du premier écran, `.hallmark/comps/c1.html` et `c2.html` (captures `c1.png`, `c2.png`, planche `planche.png`), avec `tokens.css` et `base.css`. Axe unique : **photographie plein cadre contre photographie sur sept colonnes** (type-led / image-led).
- c1 : la salle en noir et blanc en affiche, plaque de papier au pied à gauche.
- c2 : le titre sur cinq colonnes à gauche, la photographie sur sept à droite, sur papier.

**Choix : c1.** Raison : l'original ouvrait sur une photographie plein écran de la salle ; la posture Poster est gardée (redesign full garde la posture), la photographie très sombre fait contraste avec la plaque claire, et c2 réduit une photographie déjà peu lumineuse à un vignettage.

## Inventaire des médiums
- Hero : `raster` (source réelle, `photos/01-salle-noir-blanc.jpg`, 2400 × 1524).
- Menu, horaires, comptoir de réservation : `code` (rows, tableau, boutons).
- Showcases : `raster` (tartare, velouté, 2400 px de source). Galerie : `raster` (14 photographies du client).
- Aucune région `neither`. Les trois questions de reproduction viennent en phase 2.

Stamp : `comp: 2 built, no key · c1 chosen`.

## Reproduction (phase 2, vérifiée à 1280x800 : `.hallmark/comps/c1.png` contre `localhost-4321-le-54-legacy-hero-1280x800.png`)
- **Masse** : même place (plaque de papier au pied à gauche, salle plein cadre) ; la plaque est plus haute dans le site (deux actions ajoutées) et plus large (34 rem), elle couvre un peu plus de la table du fond.
- **Intervalle** : la comp n'avait pas de barre de navigation ; le site retire 72 px de haut pour la nav sticky, donc la plaque monte et l'intervalle titre, phrase, actions est plus aéré (24 px de gap).
- **Entrée** : identique, l'œil va à la plaque puis à la fenêtre éclairée ; la comp posait le titre seul, le site pose en plus « Réserver une table » en bouton hairline.
- **Plus grand écart** : la hauteur de la plaque (environ +80 px) et la nav. Décision : gardé, c'est la réservation dans le premier écran (anatomy.md § book) ; le titre reste lisible sur la salle sombre.
Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.
