# Comp · Makimono legacy

Pas de `TOGETHER_API_KEY` : deux comps HTML du premier écran (`.hallmark/comps/c1.html`, `c2.html`, captures `c1.png`, `c2.png`), avec `tokens.css` et `base.css`.

- **Axe varié** : poids image-led (c1, poster plein cadre, plaque crème en bas à gauche) contre type-led (c2, texte à gauche sur 5 colonnes, photo carrée sur fond vermillon à droite).
- **Choix : c1.** Raison : c2 est un Stage « texte à côté d'une image », le hero le plus courant des pages générées, et il quitte la posture Poster de l'original ; c1 garde le plein cadre. Défaut de c1 mesuré : la plaque couvrait la flamme du chalumeau, le sujet de la photo. Correction à la construction : titre en `--text-display-s`, plaque plus basse et plus étroite (36 rem), photo recadrée à 50 % 40 %.
- **Inventaire des médiums** : hero = raster (photo cliente 13-nigiri-saumon-flambe) ; plaque, nav, carte, horaires = code ; logo = raster (00-logo) ; trame de points = code (CSS) ; aucune région sans source.
- Stamp : `comp: 2 built, no key · c1 chosen`.
- **Reproduction (phase 2, 1280x800 contre `c1.png`)** : Masse = plaque crème à gauche sur la photo plein cadre, photo à droite : reproduite. Intervalle = filet de 3 px, respiration de 40 px dans la plaque : reproduit. Entrée = titre, une phrase, bouton plein et lien : reproduite. Plus grand écart : la comp avait un titre Ultra de 5 lignes à 100 px et le nom en lettres dans la nav ; le build a un titre en `--text-display-s` (4 lignes, flamme dégagée, décision de phase 1) et le logo mascotte à la place du mot. Gardé tel quel. Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.
