# Comp · Escale en Vue ! (legacy)

- Comps : `.hallmark/comps/c1.html` et `c2.html` (captures `c1.png`, `c2.png`), tokens et base du scaffold, fonts de repli.
- Axe varié : le poids du premier écran, texte à gauche et photo portrait à droite (c1) contre photo paysage à gauche et texte à droite (c2).
- Choix : **c1**. La planchette portrait (1152 x 1536) montre à la fois le plat et la vallée, et le titre long en trois lignes prend la masse à gauche, là où l'œil commence. c2 donne une photo paysage dont la moitié basse est un mobilier sombre sans fait à raconter.
- Inventaire des médiums : titre et horaires = `code` ; planchette, bières trappistes, mur de pierre = `raster` (photos du client) ; logo dessiné = `raster` (non utilisé en phase 1, voir ETAT.md) ; fond vert = `code`. Aucune région `neither`.
- Pas de clé image : `comp: 2 built, no key · c1 chosen`.

## Reproduction (phase 2, capture 1280x800 côte à côte : `.hallmark/comps/c1.png` et `.hallmark/shots/localhost-4331-escale-en-vue-legacy-hero-1280x800.png`)
- **Masse** : titre en trois lignes à gauche (colonnes 1 à 7), planchette portrait à droite, comme c1. Le build ajoute la pilule de nav au-dessus et une ligne de saison sous les actions.
- **Intervalle** : dans c1 le chapeau touchait le titre ; dans le build il y a 24 px entre les blocs du texte (`gap: var(--space-lg)`), et la photo est alignée au centre de la colonne, pas collée en haut.
- **Entrée** : titre, phrase, deux actions, saison puis photo ; rien ne s'anime (Squeeze : état seulement).
- **Plus grand écart** : l'écart vertical du texte (c1 centré plus bas, build remonté par le nav fixe) et le second bouton « Voir les horaires » en contour absent de c1 ; gardé, car il mène à l'horaire sans appeler.
- Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.
- Hero review : pas de sous-agent disponible en session d'agent ; sloplint `--render --stage hero` sans FAIL, lecture personnelle des quatre prises (`self`) : `hero-review: self · 0 findings` (photo nette, titre lisible 80 px, un seul primaire visible dans le héro, fold tenu à 1280x800 et 375x812).
