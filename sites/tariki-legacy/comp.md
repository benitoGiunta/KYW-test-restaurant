# Comp du premier écran · Tariki

- Fichiers : `.hallmark/comps/c1.html`, `c2.html` (mêmes `tokens.css` et `base.css`), captures `c1.png`, `c2.png` (1440).
- Axe unique : poids gauche/droite (titre à gauche et plaque du logo en haut à droite, ou l'inverse : plaque bas-gauche, titre aligné à droite).
- **Choix : c1.** Raison : le titre se lit dans l'ordre naturel (gauche, bas) et la plaque crème du logo, en haut à droite, équilibre la masse sans masquer les flammes ; en c2 le titre aligné à droite se lit à rebours et la plaque tombe sur le foyer le plus clair.
- Inventaire des médiums : titre, phrase, boutons = `code` ; braises = `raster` (photo du client `01-braises.jpg`, 1920 px, WebP 1920 et 900) ; plaque du logo = `raster` (`04-logo-fond-noir.png`, 403 x 373, PNG transparent, texte noir donc posé sur une plaque crème comme sur le site d'origine) ; aucune région sans copie.
- Reproduction (phase 2, capture 1280x800 côte à côte avec `c1.png`) :
  - Masse : titre bas gauche et plaque haut droite, braises en diagonale entre les deux ; reproduit (plaque à 120 px du haut après correction du hero).
  - Intervalle : l'écart titre à plaque est celui du comp (le feu entre les deux), le titre est resté plus petit (clamp 8vw) que dans le comp 1440 ; accepté.
  - Entrée : l'œil entre par le titre en bas à gauche puis monte à la plaque ; identique.
  - Plus grand écart : la première capture montrait la photo sur 800 px seulement (`.fig__slot` en `aspect-ratio: 1` dans le hero) et la plaque à mi-hauteur ; corrigé (`width: 100%; aspect-ratio: auto`, grille du hero étirée, plaque `align-self: start`). Reste : sloplint 44c (texte loin de la plaque), levé par `waive 44c` (page.css).
- Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.
