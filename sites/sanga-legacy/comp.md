# Comp du premier écran · Sanga (phase 1)

- Fichiers : `.hallmark/comps/c1.html`, `c2.html` (avec `tokens.css`, `base.css`) ; captures `.hallmark/comps/c1/screen-home-desktop.png` et `c2/…`, planche dans le scratchpad.
- Axe qui varie : le poids gauche ou droite (texte à gauche 7fr, photo portrait à droite 5fr ; contre photo paysage à gauche 5fr, texte à droite 7fr).
- Choix : **c1**. Le titre de sept mots tient sur trois lignes, le puits de commande doit rester dans le premier écran à 1280 x 800 (à mesurer en phase 2), la photo verticale (3:4, 720 x 960) correspond au format réel de la seule photo chaude du dossier ; c2 impose une photo paysage que le dossier n'a pas pour cette place.
- Inventaire des médiums : titre, phrase, puits téléphone et bouton = région `code` ; photo du hero = `raster` (photo du client, `photos/ramen.jpg`) ; photo large (deux bols vus de dessus) = `raster` ; photo de fin = aucune ; rien en `neither`. Les trois questions de reproduction viennent en phase 2.
- Stamp : `comp: 2 built, no key · c1 chosen`.

## Reproduction (phase 2, capture 1280 x 800 côte à côte avec la comp c1)

- **Masse** : le titre de trois lignes en Yeseva et le puits tiennent la moitié gauche, la photo la moitié droite ; reproduit (le titre à 4,4 vw, le puits à 640 px). La photo du build est plus haute que le pavé de la comp (le pavé était un aplat de substitution).
- **Intervalle** : texte, phrase, puits espacés de 24 et 40 px comme en comp ; le vide entre le puits et la photo est plus large dans la comp (colonnes 7/5) ; dans le build la photo remplit sa colonne, l'écart texte et photo est d'environ 64 px.
- **Entrée** : comp sans nav ; le build ajoute la barre de 72 px et centre le hero dans le reste de l'écran (`min-height: 100svh - 72px`), le puits finit à 624 px sur 800.
- **Plus grand écart** : le pavé (aplat) remplacé par la vraie photo, plus contrastée que la comp ; gardée, c'est la photo du client. Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.
