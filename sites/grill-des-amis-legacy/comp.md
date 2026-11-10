# Comp avant build · Le Grill des amiS (legacy)

Aucune clé `TOGETHER_API_KEY` : deux comps HTML du premier écran, `.hallmark/comps/c1.html` et `c2.html` (captures `.hallmark/comps/o1/` et `o2/`), tokens et base réels, photo `grill-flammes.webp`.
- **Axe varié** : poids gauche contre centre (plaque basse à gauche, texte aligné à gauche ; plaque centrée).
- **Choix** : c1. La plaque à gauche tombe sur la grille, la zone la plus sombre de la photo ; la pièce de viande et la pince restent libres à droite. Centrée, la plaque aurait recouvert les flammes.
- **Inventaire des médiums** : code (nav, rangées de carte, horaires) ; raster (13 photos du client, logo et monogramme du client) ; neither (aucune région sans soutien).
- Les trois questions de reproduction viennent en phase 2.

## Phase 2 : reproduction (capture 1280x800 côte à côte, comp à gauche, build à droite)

- **Masse** : dans la comp, la plaque occupe un tiers de la largeur et le titre tombe en quatre lignes (« SPÉCIALIST / E VIANDES » coupé par `max-width: 9ch`) ; construit, le titre tient en deux lignes (`min(10vw, 15dvh)`, `max-width: 18ch`), la masse de texte est plus basse et plus large, la pièce de viande et la pince restent libres à droite.
- **Intervalle** : comp, 24 px entre titre, phrase et boutons ; construit, même pas de 24 px (`--space-lg`), 16 px entre les deux boutons, légende à 24 px sous eux.
- **Entrée** : l'oeil entre par la pince et la pièce (centre droit), puis descend au titre ; dans la comp il entrait par le titre en haut à gauche. La barre slab de 80 px ajoutée au build pousse le tout de 80 px vers le bas.
- **Plus grand écart** : le titre en quatre lignes de la comp, gardé en deux lignes au build (défaut de césure corrigé en phase 1, conservé volontairement). Le bouton « Téléphoner » (contour) a été ajouté à côté du primaire plein.
- Hero review `self` (aucun outil sous-agent) : verdict `ship`, 1 finding (légende du hero en `--color-muted` sur photo, contraste faible) résolu par `--color-ink-2`.
