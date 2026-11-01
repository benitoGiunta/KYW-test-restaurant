# Comp du premier écran · Chez Guillaume

- Fichiers : `.hallmark/comps/c1.html`, `c2.html` (même `page.css`), captures `c1.png`, `c2.png`, planche `planche.png`.
- Axe unique : poids gauche/droite (texte à gauche et photo à droite, ou l'inverse avec le billet en haut à droite).
- **Choix : c1.** Raison : le billet « Prochains spectacles » posé bas-gauche sur la photo laisse le comédien dégagé ; en c2 le billet recouvre le visage et le micro, et le titre tombe bas à droite, loin de la nav.
- Inventaire des médiums : titre, texte, boutons et billet = `code` ; photo de scène = `raster` (photo du client `05-scene-humoriste.jpg`, 1000 px) ; nappe bleue (sugar paper) = `code` ; aucune région `neither`.
- Reproduction (capture 1280x800 du build contre `c1.png`) :
  - **Masse** : le titre (deux lignes, 5 colonnes) et la photo (7 colonnes) se tiennent comme en comp ; le billet couvre le bas gauche de la photo sans toucher le visage ni le micro. Plus grand écart : hauteur de la scène, plafonnée par `dvh` (`clamp(460px, 72dvh, 680px)`) au lieu des 640 px fixes, donc la photo est plus courte à 720 px de haut ; le billet porte trois spectacles au lieu de deux (comp à deux lignes), il monte donc d'environ 70 px sur la photo.
  - **Intervalle** : texte et photo à 98 px à 1440 (marge négative de 24 px de la scène, exigée par sloplint 44c), 32 px de gouttière à 1280 ; filets du billet à 12 px, même rythme qu'en comp.
  - **Entrée** : le billet se pose (translation de 24 px et rotation de 1,5°, 700 ms, sous `prefers-reduced-motion: no-preference`), le reste est peint au premier rendu. Plus grand écart : « Voir l'agenda » passe de primaire rempli à bouton calme (le rouge plein est réservé à la billetterie : nav, billet, barre) ; décision, non un oubli.
- Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.
