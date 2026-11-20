# Comp avant build · La Maison des Desserts (legacy)

Comps : `.hallmark/comps/c1.html` (texte à gauche, tirage à droite) et `c2.html` (miroir), captures `c1.png` et `c2.png` (1440 x 900), rendues avec `tokens.css` et `base.css`, polices de repli (réseau fermé). Axe varié : poids gauche ou droite.

**Choix : c1.** Le titre en cinq colonnes ouvre la lecture comme le titre centré d'origine (le regard part du nom), le tirage encadre la droite et laisse la nav, le titre et les actions alignés sur la même marge. c2 place le poids visuel de la photo sous la première lecture et éloigne les boutons du bord de pouce droit en mobile, sans gain.

Inventaire des médiums du premier écran :
- Titre, phrase, actions, index de la carte : `code`.
- Tirage de la façade (vitrine de Noël, 1600 x 1200) : `raster`, source réelle `photos/01-facade-vitrine-noel.jpg`.
- Aucune région `neither`. Questions de reproduction : phase 2.

Stamp : `comp: 2 built, no key · c1 chosen`.

## Phase 2 : reproduction (vérifiée à 1280 x 800)

Capture : page vivante `localhost:4321` côte à côte avec `c1.png` (planche du scratchpad, hero-1280x800 contre c1).
- **Masse** : le tirage (7 colonnes sur 12, passe-partout et ombre) porte la masse, à droite ; le titre en Sentient 300 et l'index sont le contrepoids à gauche. Reproduit : même répartition 5/7, même marge de 64 px.
- **Intervalle** : 32 px entre colonnes, titre, phrase, actions, index séparés par 24 px ; filets d'encre de l'index. Reproduit, avec l'index en plus (absent de la comp c1).
- **Entrée** : l'œil lit le titre (le plus grand corps), puis descend aux deux actions, puis traverse vers la façade. Reproduit.
- **Plus grand écart** : le titre fait 61 px à 1280 (75 px dans la comp) et l'index de quatre rubriques s'ajoute sous les actions. Raison : à 1440 x 900 le premier écran dépassait (le hero finissait à 988 px, REFLEX 44c) ; titre ramené à `clamp(2.75rem, 3.2vw + 1.25rem, 4.25rem)`, remplissage resserré, hero en `min-height: calc(100dvh - var(--nav-h))` centré sur le bureau. Le titre garde trois lignes.

Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.
