# Comp · Le D’Arville (phase 1)

Chemins : `.hallmark/comps/c1.html` (+ `c1.png`), `.hallmark/comps/c2.html` (+ `c2.png`), avec `src/styles/tokens.css` et `base.css`.
**Axe varié** : image-led contre type-led (poids du texte et de la photo). c1 : photo plein cadre, plaque de papier à la base. c2 : colonne de texte 5/12 à gauche, photo 7/12.
**Choix : c1.** Raison : l’original ouvrait sur une façade plein écran ; la posture Poster est gardée, la photo de lieu est le produit d’un restaurant, et la plaque (macrostructure 08) remplace le centrage Divi. c2 coupait la photo du bâtiment et laissait une colonne vide.

## Inventaire des médiums
- Hero : `raster` (photo cliente 09, bâtiment, étang, terrasse).
- Passe-partout du portrait : `raster` (photo cliente 16).
- Bandeau terrasse, galerie, chambres : `raster` (photos clientes).
- Carte, horaires, index des services : `code` (lignes, filets).
- Air WebGL du thème Atelier : `neither` ici, coupé en phase 1 (la copie ne le soutient pas ; décision phase 2).
Les trois questions de reproduction viennent en phase 2.

## Reproduction (phase 2, capture 1280x800 contre `.hallmark/comps/c1.png`)
- **Masse** : le poids reste en bas à gauche (plaque sur la photo plein cadre, titre en Sentient 300 au même corps) ; la plaque monte plus haut (38 % de la hauteur contre 27 %) parce qu'elle porte aussi le bouton et le lien, absents du comp.
- **Intervalle** : photo plein cadre sous une barre de 72 px dans les deux cas ; marge gauche de la plaque 64 px (comp 28 px), air sous la plaque 40 px : même rapport.
- **Entrée** : l'œil tombe d'abord sur le bâtiment en briques, puis sur le titre de la plaque : identique.
- Plus grand écart : la hauteur de la plaque. Gardé : le comp avait oublié le job (réserver), la plaque a besoin de son bouton. Le comp n'avait pas non plus les liens de nav.
- Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.

