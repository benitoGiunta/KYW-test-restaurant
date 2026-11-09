# Comp du premier écran · La Ferme Blanche d’Asie (legacy)

- Chemins : `.hallmark/comps/c1.html` (+ `c1.png`), `.hallmark/comps/c2.html` (+ `c2.png`), construits avec `tokens.css` et `base.css`, capture desktop `capture.mjs`.
- Axe qui varie : **poids image-led / type-led**. c1 : photo de la salle ronde plein cadre, plaque de texte sur la photo (Poster). c2 : titre à gauche sur le fond, photo cadrée à droite (Stage).
- Choix : **c1**. Le site d’origine ouvre sur une photo plein cadre ; c2 est le hero texte-à-côté-d’une-photo que l’on lit comme généré. Défaut vu sur c1 : la plaque à gauche recouvrait la table ronde, le sujet de la photo ; elle passe à droite, sur le mur sombre (la zone calme de l’image).
- Inventaire des médiums : hero = `raster` (photo du client `09-salle-ronde`, recadrée sous le filigrane) ; offre 29 € = `code` (chiffre en Young Serif) ; salle plein cadre = `raster` (`01-salle-principale`) ; carte, salles privées, horaires = `code` ; salles privées = `raster` (`10-table-ronde`, légende neutre, la photo n’est pas prouvée comme étant la salle V.I.P.). Aucune région sans soutien : pas de photo de plat lisible, aucune n’est montrée (les deux images de cuisine sont trop sombres, écartées).
- Questions de reproduction : phase 2.

## Questions de reproduction (phase 2)
- **Masse** : la photo plein cadre porte l'écran, la plaque sombre en occupe environ un cinquième (36 rem sur 1280 px). Reproduit : photo à 100 % de la largeur, `min-height: calc(100dvh - 64px)`.
- **Intervalle** : bord de la plaque à 16 px du bas et 64 px du bord droit, titre sur trois lignes, deux boutons à 12 px d'écart. Reproduit.
- **Entrée** : le regard va au titre en Young Serif, puis au bouton ocre ; la table ronde reste libre. Reproduit.
- Capture 1280x800 (`.hallmark/shots/*-hero-1280x800.png`) contre `c1.png` : plus grand écart = la plaque est à droite (c1.png date d'avant le changement de côté décidé en phase 1, la plaque y recouvrait la table) et la barre de nav pleine hauteur de 64 px (slab) coiffe la photo, absente de la comp. Gardé : la plaque à droite, la nav slab ; photo recadrée de 64 px, sans perte du sujet.
- Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.

## Hero review (self, pas d'outil Agent)
`hero-review: ship · 1 finding · 1 resolved` : à 375x812 le second bouton passait sous la ligne de flottaison ; titre à 2,5 rem et gouttières réduites sous 40 rem, plaque à 796 px sur 812 (mesuré à 375x812, 320x568, 390x664). sloplint `--render --stage hero` : 0 FAIL, 0 REFLEX.
