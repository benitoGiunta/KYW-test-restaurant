# Comp du premier écran · Épices & Nous

- Fichiers : `.hallmark/comps/c1.html` (+ `c1.png`), `c2.html` (+ `c2.png`), sur `tokens.css` et `base.css`.
- Axe varié : poids image/texte du hero. c1 = champ photo plein cadre, titre posé sur un rebord de papier (Ledge). c2 = diptyque, texte à gauche et photo à droite.
- Choix : **c1**. Raison : la photo de table sombre porte l'ambiance du lieu dès l'écran 1, la réservation reste au rebord, et c2 donne un hero « gabarit à deux colonnes » que les pages internes utilisent déjà.
- Inventaire des médiums : photo de table (région `raster`, source réelle `04-table-verres.jpg`) ; logo (`raster`, `27-logo-blanc-fond-brun.png`) ; rebord, barre, boutons (`code`) ; aucun élément `neither`.
- Les trois questions de reproduction (phase 2, capture 1280x800 de la page contre `c1.png`) :
  - Masse : champ photo sur toute la largeur, hauteur 100dvh moins la barre (728 px), rebord de papier sur les 55 % bas à gauche, soit la même répartition que la comp ; la photo garde sa moitié droite entière.
  - Intervalle : titre 3 lignes en Sentient 300 (64 px), légende, deux actions, filet orange et prix, espacés de 16 px comme dans la comp ; seul l'intervalle sous le prix est plus serré (40 px de remplissage).
  - Entrée : rebord qui monte de 14 px en 600 ms, photo qui se pose (1,035 vers 1), filet orange du prix tiré à 360 ms ; la comp est statique.
  - Plus grand écart : dans la comp le rebord s'arrête à la gouttière (89 px) et laisse un liseré de photo à gauche ; dans le build il va jusqu'au bord de l'écran, aligné sur le conteneur par `--marge`. Gardé : plus net, et le texte reste aligné sur le logo. Deuxième écart : photo réchauffée par `sepia(0.22)`.
  - Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.
- Note : la photo de table est bleutée alors que la palette est chaude ; à juger en phase 2 (alternatives : `05-salle-avant`, `12-salle-verriere`).
