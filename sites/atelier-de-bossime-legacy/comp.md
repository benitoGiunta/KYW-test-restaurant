# Comp avant build · L’Atelier de Bossimé legacy

`TOGETHER_API_KEY` absent : pas d’image générée ; deux comps HTML du premier écran, construites avec `src/styles/tokens.css` et `base.css`, capturées par `capture.mjs --sizes desktop` (PNG 2x, 1440x900).

- c1 : `.hallmark/comps/c1.html` → `c1.png`
- c2 : `.hallmark/comps/c2.html` → `c2.png`

**Axe varié (un seul)** : image-led contre type-led. c1 pose la ferme en plein cadre et la carte de papier (titre, phrase, actions) en bas à gauche ; c2 met le titre sur un panneau de papier de cinq colonnes et la photo sur sept.

**Ce qui diffère** : c1 garde la posture du site d’origine (photo plein écran, carte crème à gauche) et laisse la ferme dire « ferme gastronomique » avant le texte ; c2 lit plus vite mais devient le hero texte-à-côté-de-photo le plus courant (layout.md § 6) et perd la photo à moitié.

**Choix** : c1, parce que la contrainte KYW garde la posture d’origine (Poster) et que la ferme est la chose la plus forte que le client possède.

## Inventaire des médiums (premier écran)
- Nav (logo, trois liens, Réserver) : code.
- Photo plein cadre : raster, `14-ferme-batiment.jpg` du client (2000x800).
- Carte de papier (titre, phrase, actions) : code.
- Logo : raster, `26-logo.png` du client (270x88, faible résolution : demande de matériel).
- Barre de réservation mobile : code.
- Aucune région coupée : chaque région a une source réelle.

## Reproduction (hero construit, capture `.hallmark/shots/*-hero-1280x800.png` contre c1)
- **Masse** : tenue ; la carte occupe ~40 % de la largeur comme dans c1, le titre passe de quatre à trois lignes après élargissement de la carte (46rem, titre à 15ch).
- **Intervalle** : tenu ; le bas de la carte est à ~50 px du pli à 1440x900, la photo respire au-dessus.
- **Entrée** : tenue ; l’œil entre par le toit de la ferme, descend vers le titre, puis le bouton pigment.

Plus grand écart : au téléphone, la carte couvre presque toute la photo et répétait le bouton de la barre mobile ; le bouton de la carte est masqué sous 40rem (la barre porte l’action), seul « Voir la carte » reste.
