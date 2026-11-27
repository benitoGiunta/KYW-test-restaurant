# Comp · Dumont Bouge legacy

Phase 2 : aucun comp HTML construit (c1 poids à gauche, c2 poids à droite) : le premier écran a été corrigé directement en Astro puis relu en capture 1280x800 et 375x812. `comp: 0 built, no key`. À faire en phase 3 si le temps le permet.

Réponses de reproduction (sur le héros Poster tel que construit, 1280x800 mesuré) :
- **Masse** : la façade tient 61 % du premier écran sous la nav (hauteur hero 728 px, bande charbon 283 px soit 39 %), le poids visuel est en bas à gauche (nom en display, réservation à droite).
- **Intervalle** : 72 px de coup de pinceau au-dessus de la bande, 40 px de padding vertical dans la bande, nom et phrase séparés de 12 px ; la bande respire plus que la façade, ce qui garde le nom lisible.
- **Entrée** : la nav (téléphone, liens, logo central, Réserver), la façade, le trait rose qui se pose de gauche à droite en 700 ms, puis la bande. L'œil entre par la façade et descend sur le trait vers le nom.
Plus grand écart avec la maquette de départ (comp provisoire de phase 1) : le trait ne chevauche plus la bande (multiply sur charbon = traînée sombre) ; il est entièrement au-dessus, sur la photo.

Inventaire des médiums : façade, vitrine, salade, plateau = raster (photos du client) ; pains et latte = raster de bibliothèque (placeholder) ; coup de pinceau = raster du client (texture 487 px étirée en 13:1, effet de balayage assumé, `mix-blend-mode: multiply` sur la photo) ; logo = raster du client ; icône du menu = CSS.
