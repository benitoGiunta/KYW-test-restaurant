# Comp · Yayami Sushi (legacy)

- Comps : `.hallmark/comps/c1.html` (texte à gauche, nigiri à droite, 6fr 6fr) et `c2.html` (photo à gauche 7fr, texte à droite 5fr), captures dans `.hallmark/comps/c1/` et `c2/`. Axe : poids gauche/droite (type-led contre image-led).
- Choix : **c1**. Le titre se lit en premier, le nigiri sur fond noir (mélangé au fond par `mix-blend-mode: lighten`) fait contrepoids à droite ; c2 enterre le titre sous une photo large qui n'a pas la taille d'un plateau Poster.
- Inventaire des médiums : titre, offre, boutons = `code` ; nigiri, Menu Matsu, plats = `raster` (photos du client) ; logo = `raster` (client). Aucune région `neither`. Pas de clé image : `no key`.

## Reproduction (phase 2, 1280x800, comp c1 contre build)
- **Masse** : la comp pose le titre sur 4 lignes à gauche et l'assiette à droite ; le build garde la même répartition, titre sur 3 lignes (colonne plus large, « Sushi à Namur, » tient sur une ligne).
- **Intervalle** : comp, titre à 28 px du bord et assiette à environ 370 px ; build, gouttière de 64 px, assiette de 560 px de cadre. Même respiration, le build ajoute nav et bande d'adresse.
- **Entrée** : le titre se lit en premier, puis l'assiette (même ordre que la comp).
- **Plus grand écart** : l'assiette du build paraissait plus petite que celle de la comp dans un cadre plus large ; corrigé par une mise à l'échelle 1,3 dans le cadre noir (1,1 au téléphone pour ne pas rogner la pointe). Second écart : la nav masthead et la bande d'adresse n'existent pas dans la comp, voulus.

