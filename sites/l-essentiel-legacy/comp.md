# Comps · L’Essentiel (phase 1)

- `.hallmark/comps/c1.html` : photo 8 colonnes, comptoir de réservation 5 colonnes à droite, chevauchant. `c2.html` : comptoir 5 colonnes à gauche, photo 7. Axe variant : poids gauche/droite.
- Choix : **c1**. La photo (tulipes, persiennes) pèse à gauche comme dans le slider d’origine ; le comptoir à droite se lit en dernier, à côté de l’action. (Les deux captures ont écrasé le même PNG ; comps vérifiés au rendu du build.)
- Inventaire des médiums : hero `raster` (salle-tulipes, source client) ; bento du lieu `raster` ; distinctions `code` (deux chiffres réels) ; carte, horaires `code` ; logo manuscrit `neither` (PNG 300 px à tracé clair, illisible sur parchemin : mot-symbole en Grenze Gotisch, la vraie enseigne se voit sur la façade). Les trois questions de reproduction : phase 2.

## Phase 2 : questions de reproduction (capture 1280x800 côte à côte : `.hallmark/shots/*hero-1280x800.png` et `comps/c1.html`)
- **Masse** : la photo porte le poids à gauche (8 colonnes sur 12), le comptoir de 5 colonnes à droite la recouvre d’une colonne. Reproduit. Le fichier `c1.html` enregistré rend en miroir (comptoir à gauche, photo étroite) parce que les deux comps ont écrasé le même PNG en phase 1 ; le build suit la description de c1.
- **Intervalle** : comptoir décalé de 64 px sur la photo, double filet de 4 px en haut du comptoir, 32 px de gouttière de colonne. Reproduit ; en bas la photo dépasse le comptoir de 56 px à 1280 de large.
- **Entrée** : l’œil va à la photo, puis au titre gothique du comptoir, puis au bouton ultramarine. Reproduit ; le comptoir se pose en 420 ms (translation de 24 px, une fois).
- **Plus grand écart** : le comptoir bâti est plus haut que dans le comp (titre en trois lignes dans `max-width: 9ch`, un second bouton « Appeler »). Gardé : le téléphone est une réservation du site d’origine, le titre en trois lignes tient la masse du comptoir.
- Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)` ; `hero-review: self · ship · 3 findings · 3 resolved`.
