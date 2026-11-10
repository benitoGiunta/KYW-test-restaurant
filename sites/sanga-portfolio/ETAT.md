# ETAT : sanga-portfolio, fin de la phase 2 (motion, signature, interactions)

## Fait (phase 2)
- Rouleau : scène épinglée à 100 svh pile (bande entière visible à 1280x720 et 1440x900, mesuré), plat actif en
  couleur, compteur « 08 / 12 », boutons précédent/suivant (désactivés aux extrémités), flèches clavier, curseur « Dérouler ».
- Sceau : tampon (rotation -10° vers 0 à la pose), aimant, état :active. Hero : parallaxe photo. États :active/focus sur btn, link, boutons.
- En-tête : mix-blend-mode difference retiré (illisible sur le hero), ivoire sur photo, encre sur la 404 ; voile du hero resserré en haut.
- Reduced motion : défilement natif avec mêmes boutons/compteur ; vérifié (aucune erreur console, 0 débordement horizontal).
- Contrôles faits (scripts maison, 1440 et 390) : clics réels de l'en-tête 3/3 sur 4 pages, pied KYW + mention visibles en bas
  de chaque page, 404 incluse, aucune erreur console. Build : `scripts/q.sh build node scripts/build-site.mjs sites/sanga-portfolio` OK.
- DESIGN.md complété (section phase 2).

## Reste (phase 3 : captures puis revue)
- Shoot/audit complets par l'agent « captures » ; contraste du h1 du hero et des plats lavés (photo seulement) à vérifier à l'audit.
- Titre vertical « Le rouleau » en mobile (~220 px de haut) : à juger sur capture, réduire si trop dominant.
- Photos libres (salle, façade) seulement si la revue l'exige (`placeholder: true`, crédit colophon).
- RAPPORT.md, `pnpm index`, push (non faits : phase 3 et publication).

## Pièges
- La bande du Rouleau est clippée par `overflow: hidden` de la piste si sa hauteur dépasse la rangée de grille : photo plafonnée en svh.
- Le snap CSS place scrollLeft à ~40 px au départ en mode libre : seuils de désactivation à 1,5 % de la course, pas 0.
- serve.mjs (port 4417) meurt à chaque rebuild : le relancer ; serveur arrêté en fin de passe.
