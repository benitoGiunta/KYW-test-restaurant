# Comp · Brasserie Edgard (legacy)

- Fichiers : `.hallmark/comps/c1.html`, `c2.html` ; captures `c1.png`, `c2.png`, planche `planche.png` (tokens.css et base.css du site).
- Axe qui varie : image-led contre type-led (poids de la photo).
- c1 : façade plein cadre, plaque de papier en bas à gauche. c2 : texte à gauche, photo à droite (Stage).
- **Choix : c1.** La façade éclairée est la chose la plus forte du dossier et le site d'origine s'ouvrait déjà sur elle ; c2 la réduit à une vignette et ressemble au hero « texte + image » le plus courant. Défaut de c1 noté : la plaque touche le bord gauche du bâtiment, à reprendre en phase 2 (décalage ou recadrage).
- Inventaire des médiums : façade, salle, terrasse, plats = `raster` (photos du client) ; logo = `code` (SVG du client) ; carte, horaires, prix = `neither` (texte).
- Stamp : `comp: 2 built, no key · c1 chosen`.

## Reproduction (phase 2, capture 1280x800 côte à côte avec c1)
- **Masse** : la façade garde la même masse (bâtiment pleine largeur, ciel en haut, chaussée en bas, sans recadrage). La plaque, elle, change : c1 la posait en bloc de 31 rem à gauche, sur le flanc du bâtiment ; elle est maintenant une bande basse sur toute la largeur du conteneur, posée sur la chaussée.
- **Intervalle** : c1 laissait 0 px entre la plaque et le bord du bâtiment (défaut noté en phase 1). Maintenant la plaque commence sous la ligne des vitrines, environ 40 px de chaussée entre les deux ; 24 px la séparent du bas du hero.
- **Entrée** : le regard va à l'enseigne éclairée, puis au titre dans la plaque, puis au bouton plein. Pas d'animation d'entrée (motion still, le hero est le LCP).
- **Plus grand écart** : la plaque est devenue une bande de deux colonnes (titre | phrase et actions) au lieu d'un bloc ; décision prise pour dégager l'enseigne et le flanc gauche, qui étaient couverts. Sur téléphone, la photo passe au-dessus et la plaque la chevauche de 64 px (l'ancienne plaque cachait toute la façade).
- Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.
