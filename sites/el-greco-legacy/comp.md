# Comp avant build · El Greco

Fichiers : `.hallmark/comps/c1.html`, `c2.html` (tokens.css et base.css du site, sans clé d'image : pas de TOGETHER_API_KEY). Axe : poids gauche/droite du premier écran. c1 : titre 7 colonnes à gauche, index de 4 colonnes à droite. c2 : 5 colonnes titre, 6 colonnes index. Capture : une seule `screen-home-desktop.png` conservée (les deux captures partagent le même nom de sortie, c2 a écrasé c1 : limite de l'outil, notée en leçon proposée).
Choix : c1, le titre garde l'échelle d'affiche (signature) et l'index reste une colonne étroite de lignes à prix ; c2 écrasait le titre à 5 colonnes (deux lignes à 8,5 rem ne tiennent pas).
Inventaire des médiums : titre et repères = `code` ; photographies = `raster` (stock Pexels fourni par le client dans `photos/`, placeholders) ; carte, horaires = `code` ; aucune région `neither`. Les trois questions de reproduction : phase 2.

## Reproduction (phase 2, 1280x800)
Captures : comp `.hallmark/comps/c1.html` (rendu direct) et page construite (`sloplint --render --stage hero`). Masse : titre 713 px de large à 128 px dans le comp, ~660 px à 147 px (11,5vw) dans la page ; index de 3 lignes dans le comp, 6 dans la page. Intervalle : deux colonnes entre titre et index, identique. Entrée : le titre, puis l'index. Plus grand écart : le bloc est centré dans l'écran (`svh`) et l'index passe à six lignes ; gardé. Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.

