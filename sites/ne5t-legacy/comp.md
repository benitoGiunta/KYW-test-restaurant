# Comp · NE5T legacy
Fichiers : `.hallmark/comps/c1.html` (Poster, photo plein cadre, texte en bas à gauche), `c2.html` (Stage, texte 5 col., photo 7 col.). Axe : image-led plein cadre contre type-led en colonnes. Captures : `.hallmark/comps/c1/`, `c2/`.
Choix : c1, car l'original est un Poster et la façade de nuit est le signal. Réserve honnête : dans la capture c1 la photo ne s'affiche pas (calque z-index -1 sous le fond du body), seul le texte sur dégradé est jugé ; c2 confirme que la photo tient seule. Le build réel (hero--poster) corrige l'empilement.
Inventaire des médiums : hero = raster (01-facade-nuit-piscine) ; chiffres du spa et des chambres = code (Young Serif) ; reste = type et photos du client.

## Reproduction (phase 2, 1280x800, c1 contre build réel)
- Masse : texte en bas à gauche sur grand vide sombre. Le build y met la photo de nuit plein cadre ; la masse de texte (titre sur deux lignes, chapeau, boutons) reste dans le tiers bas gauche, même poids.
- Intervalle : titre, chapeau, boutons séparés par 16 et 24 px comme c1 ; le second bouton (contour) est un ajout du build.
- Entrée : la comp n'avait pas d'entrée ; le build ajoute la montée du titre après le voile de lumière.
- Plus grand écart : la comp c1 ne montrait pas la photo (calque z-index) et pas de nav ; le build ajoute la nav en dalle et la façade. Gardé : la façade est le signal voulu.
