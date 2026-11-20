# Comp · Le Lodge Wépion (phase 1)

Deux comps du premier écran : `.hallmark/comps/c1.html` (image-led : façade de nuit plein cadre, plaque papier en bas à gauche) et `c2.html` (type-led : colonne de texte 5/12, photo 7/12). Axe : poids image contre texte. Capture : `.hallmark/comps/screen-home-desktop.png` (les deux captures portent le même nom, la seconde a écrasé la première ; choix fait sur la composition lue dans le code et la capture de c2, limite connue).
Choix : **c1**. Raison : le hero d'origine est un poster plein écran ; la photo de nuit est la signature, et la plaque porte la phrase de fermeture sans la rogner.
Inventaire des médiums : façade de nuit `raster` (photo client 08, 2400x1600) ; terrasse `raster` (03, carrée 1145 px, recadrée 21/9) ; galerie `raster` ; logo `raster` vectoriel client (SVG blanc) ; aucune région `code`, aucune `neither`.

## Reproduction (phase 2, 20/11/2026)
Capture 1280x800 de c1 (`/tmp/.../comp-c1.png`, côte à côte avec `hero-1280x800.png` du build).
- **Masse** : photo de nuit plein cadre, plaque papier en bas à gauche ; reproduit. Le build ajoute le bandeau et la barre (130 px) au-dessus de la photo.
- **Intervalle** : plaque calée sur la gouttière, 40 px du bas ; reproduit.
- **Entrée** : plaque qui monte de 18 px en 640 ms, photo qui se pose (scale 1,045 vers 1) ; la comp était statique.
- **Plus grand écart** : le titre de la plaque tenait sur 2 lignes dans la comp, 3 dans le build (max-width 14ch) ; corrigé (20ch, corps réduit à 3,25 rem max) : 2 lignes à 1280, 3 à 375.
`comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`
