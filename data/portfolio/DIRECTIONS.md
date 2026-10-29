# Directions artistiques de la collection KYW (15 gabarits)

Source : 105 sites évalués (`eval-1..7.json`, captures regardées par planches-contact pour les 40 premiers), restaurant de référence Les Potes au Feu, références des skills awwwards et hallmark. Les cahiers complets sont dans `directions.json` (c'est l'entrée de l'agent `portfolio-gabarit`). Les gabarits ne copient rien : ils empruntent des mécaniques et produisent une composition propre à KYW.

## Contraintes communes

- **stack** : Astro + GSAP (ScrollTrigger, SplitText, Draggable, Flip si besoin) + Lenis ; moteur de la skill awwwards.
- **canvas_ogl** : Autorisé pour 3 directions au plus ; utilisé par 2 : nocturne (halo lampe, canvas 2D) et maree (houle, path SVG recalculé au ticker, pas de WebGL). Les 13 autres sont CSS / SVG / GSAP uniquement.
- **interdits** : Aucune vidéo tournée, aucun modèle 3D sur mesure : toute « déconstruction » d'un plat se fait en photos détourées en couches (PNG/WebP) ou en SVG.
- **obligations_kyw** : KywFooter sur chaque page, noindex, mention « Maquette KYW, certaines données sont illustratives », placeholder: true sur toute donnée fictive, jamais de récompense ni de chiffre inventé.

## Les 15 directions

### 1. Braise (`braise`)

**Pitch.** Le site est une soirée au feu : il part du noir incandescent du passe et refroidit chapitre après chapitre jusqu'à l'ivoire de la table, une seule variable de température pilotant couleur, lumière et texte.

- Cible : grillades et viandes maturées, bistronomie au feu, ramen et bouillons, cuisine au four à bois. Ambiance : incandescent, lent, charbon.
- Idée : Une variable --temp (de 900 °C à 20 °C) descend au fil du scroll ; elle règle le fond (noir fumée → brun braise → ivoire), la teinte des titres, l'intensité d'un halo radial et le chiffre du thermomètre fixé en bas à gauche.
- Signature : Chapitre « cuisson » épinglé : une photo de plat ou de pièce de viande est découpée en 4 couches détourées (fond, pièce, garniture, sauce) ; au scrub les couches se déposent une à une sur le fond, pendant que le thermomètre descend et que la liste 01-04 à gauche s'allume. Recette : ScrollTrigger pin + scrub 1 sur une timeline ; chaque couche est un <img> avec clip-path inset et translateY ; --temp est un CSS custom property tweené par gsap.to(document.documentElement) sur chaque chapitre ; Lenis pour la douceur.
- Verbe de mouvement : *couve puis s'embrase*. Canvas : non.
- Palette : ground_depart `#141110`, ground_arrivee `#F2E8D8`, ink `#F4EDE2`, accent_braise `#E8632C`, muted_cuivre `#B5703F`, line_cendre `#5E5650`.
- Typo : Melodrama (Fontshare) pour display (titres, chiffres de température) ; Literata (Google) pour texte et UI.
- Structure : Hero → Manifeste → Cuisson (signature) → Carte → Les mains → Salle → Avis → Pratique → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, privatisation (le feu éteint : page claire).
- Mobile 390 : Le thermomètre reste (valeur seule) et la scène de couches survit en pin vertical (70 vw) ; les chapitres passent à 100 svh ; le hero garde le nom à 20 vw sur deux lignes.
- Reduced motion : Pas de pin ni de scrub : les couches sont affichées déposées, --temp change par section (transition de couleur 0 s), le thermomètre affiche la valeur de la section visible, le halo est statique.
- Risques : Le site « sombre à accent orange » est un cliché : il est évité parce que la palette change réellement (le site finit clair) et que l'orange n'est jamais un aplat de bouton isolé. / Grain + dégradé partout = slop : un seul artefact, un seul halo. / Pin trop long : limiter la section cuisson à 250 % de hauteur.
- Restaurants indicatifs : Les Potes au Feu, Le Grill des Amis, Sanga, L'Huile sur le Feu.
- Références (score) :
  - [shorodo](https://shorodo.nagoya/) (8.85) : Le thermomètre fixe (valeur + réglette) interpolé par ScrollTrigger scrub, le texte qui s'allume ligne par ligne du gris au blanc, l'inversion globale noir → ivoire au dernier chapitre, l'objet coupé dont les deux moitiés s'écartent au scrub. Capture : `data/portfolio/captures/shorodo/p2-frame-06.png`.
  - [saisonsf](https://saisonsf.com/) (7.5) : Le dégradé radial braise (orange chaud → noir) comme fond de section, et le triptyque de photos portrait sur fond bleu nuit. Capture : `data/portfolio/captures/saisonsf/desktop-frame-4.png`.
  - [akaneyajapan](https://akaneyajapan.com/en/) (7.2) : Le hero de braises plein cadre avec un signe vertical centré et une phrase de deux lignes dessous ; le « chapeau » de section (petit mot ocre au-dessus du titre) ; le diptyque révélé par clip-path. Capture : `data/portfolio/captures/akaneyajapan/desktop-haut.png`.

### 2. Quatre mains (`quatre-mains`)

**Pitch.** Deux colonnes, deux voix : l'écran est coupé en deux couleurs qui défilent à des vitesses différentes et ne se rejoignent qu'aux moments où les deux chefs cuisinent ensemble.

- Cible : duo de chefs ou d'associés, bistronomie, lieux à deux activités (restaurant + bar, cave + table, restaurant + scène). Ambiance : bicolore, franc, complice.
- Idée : La page est un diptyque : colonne gauche vert bouteille (le premier chef, le salé, le soir), colonne droite moutarde (le second, le sucré, le midi). Les deux colonnes défilent à des vitesses différentes (ScrollTrigger scrub, translateY de la colonne droite à 0.85 × du scroll) et se resynchronisent sur les sections communes (carte, réservation) où la frontière disparaît.
- Signature : Le nom du restaurant en Switzer 700 sur toute la largeur, les lettres coupées par la frontière (vert sur moutarde / moutarde sur vert, via deux copies du texte dans deux conteneurs clip-path inset). Au scroll la frontière glisse de 50 % à 0 % puis à 100 % selon le chapitre (gsap.to sur --split), ce qui « donne la parole » à l'un ou l'autre. Lenis + un seul ScrollTrigger global qui expose le progrès.
- Verbe de mouvement : *se rejoint*. Canvas : non.
- Palette : ground_gauche `#1E4A3E`, ground_droite `#E6B13A`, ink `#111311`, paper (sections communes) `#F7F5EE`, line `#2C2C2A`.
- Typo : Switzer (Fontshare) pour tout (display, texte, nav) ; Fragment Mono (Google) pour meta et numéros.
- Structure : Hero diptyque → Parcours (deux chronologies) → La rencontre → Carte à quatre mains → Salle et bar → Avis → Réserver → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, les-deux-chefs (deux colonnes complètes).
- Mobile 390 : Le diptyque devient un empilement de bandes de couleur alternées (vert / moutarde) ; le nom coupé survit sur deux lignes bicolores ; le défilement différencié est remplacé par un léger parallaxe des photos.
- Reduced motion : Colonnes synchrones, frontière fixe à 50 %, nom coupé statique, crossfade de la liste à 0 s (changement immédiat).
- Risques : Les textes coupés par la frontière deviennent illisibles (défaut de Mugaritz) : seul le nom est coupé, jamais un paragraphe. / Le bicolore peut virer « drapeau » : garder un papier neutre pour les sections communes et des photos sobres. / Scroll différencié = mal de mer : écart de vitesse limité à 15 %.
- Restaurants indicatifs : Les Potes au Feu, Pépite, cave à manger.
- Références (score) :
  - [mugaritz](https://www.mugaritz.com/) (8.0) : Le split-screen vertical bicolore dont les deux moitiés défilent indépendamment, le logo posé sur la frontière avec mix-blend-mode, le nom géant pleine largeur coupé en deux couleurs par la frontière, la liste numérotée 01-05 à filets. Capture : `data/portfolio/captures/mugaritz/desktop-frame-1.png`.
  - [restaurantgem](https://restaurantgem.com) (7.9) : Le hero split photo / texte avec parallaxe, et la liste de plats dont le survol bascule la grande photo voisine. Capture : `data/portfolio/captures/restaurantgem/desktop-frame-3.png`.
  - [centralrestaurante](https://centralrestaurante.com.pe/) (7.3) : Le diptyque plein écran de deux images en vis-à-vis (une colorée, une noir et blanc) et la composition en escalier autour d'un axe. Capture : `data/portfolio/captures/centralrestaurante/desktop-haut.png`.

### 3. Affiche (`affiche`)

**Pitch.** Chaque écran est une affiche de rue : aplats francs, grotesque extra-large, horaires monumentaux et un plat qui s'empile couche par couche comme une liste numérotée.

- Cible : pizzeria créative, street food et friterie, brasserie populaire, burger. Ambiance : criard, joyeux, direct.
- Idée : Le site est une pile d'affiches collées les unes sur les autres : chaque section a sa couleur, son titre énorme, son bord dentelé ; passer à la suivante, c'est coller une affiche par-dessus (clip-path qui descend).
- Signature : Section épinglée « ça s'empile » : la pizza (ou le burger, le sandwich) photographiée en 5 couches détourées (pâte, sauce, garniture 1, garniture 2, finition) s'empile au scrub pendant que la liste 01-05 s'allume ; au dernier état, le prix claque en 200 px. Recette : ScrollTrigger pin + scrub, 5 <img> en translateY/rotate, SplitText pour le prix, Lenis.
- Verbe de mouvement : *claque comme un volet*. Canvas : non.
- Palette : rouge coquelicot `#E3352B`, jaune `#F6C33A`, vert gazon `#1F8A4C`, crème `#F4EEDF`, ink `#15110F`.
- Typo : Archivo (Google (variable wdth 62-125)) pour display (titres, horaires, prix) ; Archivo (Google) pour texte et UI.
- Structure : Hero affiche → Définition → Ça s'empile (signature) → Carte bento → Horaires → Comment ça marche → Galerie inclinée → Visite → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, a-emporter (commande / click & collect).
- Mobile 390 : Les affiches restent pleines écran (100 svh) ; le hero empile nom + plat détouré ; la galerie inclinée devient scroll-snap horizontal natif ; la signature survit en pin vertical avec la liste sous la pile.
- Reduced motion : Rideau remplacé par un fondu de 0.2 s, pile affichée complète, cartes et badges statiques (le badge rotatif ne tourne pas).
- Risques : Le pop multicolore vire au « site de fast-food générique » si les photos sont des banques d'images : exiger de vraies photos reportage, encadrées. / Trop de mouvement : un seul objet en lévitation à la fois. / Les capitales partout fatiguent : paragraphes en bas de casse 17 px.
- Restaurants indicatifs : Incorrect, La Ferme Blanche d'Asie, Le Ponti 2, Sanga.
- Références (score) :
  - [bar-topas](https://bar-topas.ch/) (8.1) : Les bandes de couleur en rideau, les horaires en cartes typographiques énormes avec « ¡HOY! » sur le jour courant, la liste 01-05 d'un pincho qui s'assemble au scroll (ici en couches PNG, pas en 3D), les bords dentelés entre sections, la pastille « ouvert jusqu'à ». Capture : `data/portfolio/captures/bar-topas/desktop-frame-6.png`.
  - [gourouindianfood](https://www.gourouindianfood.fr/) (7.65) : Le titre pleine largeur dont une lettre est remplacée par un badge circulaire à texte rotatif, la grille bento de plats sur aplats de couleur, les boutons rectangulaires à bord 1 px, le fond à rayons. Capture : `data/portfolio/captures/gourouindianfood/desktop-frame-5.png`.
  - [madie](https://madie.es) (8.4) : Le titre sur deux registres (contour puis plein) et le séparateur ondulé entre deux aplats. Capture : `data/portfolio/captures/madie/desktop-haut.png`.

### 4. Cahier (`cahier`)

**Pitch.** Le site est le cahier de la maison : papier, stylo bille, sommaire pointillé, timbres et annotations manuscrites, où le menu du jour s'écrit sous vos yeux.

- Cible : ferme-table et produits locaux, néo-bistrot, traiteur, boulangerie-restaurant. Ambiance : manuscrit, honnête, quotidien.
- Idée : Un cahier d'écolier quadrillé (fond CSS répété à 24 px) sur lequel tout est posé : textes en mono comme tapés à la machine, titres en slab, corrections et flèches en bleu bille, photos collées comme des timbres. Les pages du site sont les pages du cahier.
- Signature : Le menu du jour s'écrit : trois lignes (entrée, plat, dessert) en écriture bille bleue tracées par stroke-dashoffset (SVG généré depuis Caveat via la police → paths pré-exportés) quand la section entre à l'écran, puis la date est tamponnée (scale 1.4 → 1, rotation -6°, 0.25 s). Recette : ScrollTrigger once, gsap.fromTo strokeDashoffset, tampon en back.out ; Lenis.
- Verbe de mouvement : *se pose comme du papier*. Canvas : non.
- Palette : papier `#F5F0E4`, quadrillage `#E3DCCB`, encre bille `#2448A6`, rouge correcteur `#D43D2E`, mine `#5E5B55`, kraft `#D8C39B`.
- Typo : Sometype Mono (Google) pour texte, nav, prix, sommaire ; Bespoke Slab (Fontshare) pour display (titres de pages, chiffres) ; Caveat (Google) pour annotations manuscrites (information réelle uniquement).
- Structure : Couverture → Menu du jour (signature) → Le sommaire de la carte → Fournisseurs → Carte postale du chef → L'équipe → Avis en marge → Pratique → Dos du cahier.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, producteurs, traiteur-evenements (page « commande »).
- Mobile 390 : Le quadrillage et les timbres restent ; la marge d'annotations passe sous chaque bloc ; le menu du jour tracé survit (SVG responsive) ; le header en cellules devient 2 cellules.
- Reduced motion : Menu du jour affiché tracé, tampon posé, timbres droits ; aucune rotation animée.
- Risques : La manuscrite partout = slop : Caveat réservée aux annotations qui portent une information (origine, date, correction). / Le « vintage » kitsch (tache de café, scotch) : interdit ; seuls quadrillage, timbres et tampons. / Mono en corps long : limiter à 64ch et 16 px minimum.
- Restaurants indicatifs : L'Atelier de Bossimé, Partage, Li Micougni, Pépite, cave à manger.
- Références (score) :
  - [tabkitchenbakery](https://tabkitchenbakery.com/) (7.15) : Le menu en sommaire de livre (plat, pointillés, numéro 01-06, ligne active sur fond), les cartes d'équipe inclinées avec prénom en fat italic, flèche manuscrite « (Team Kitchen) » et photo arrondie, le cadre ovale à double filet. Capture : `data/portfolio/captures/tabkitchenbakery/desktop-frame-4.png`.
  - [pizza-amici](https://www.pizza-amici.nl/) (7.9) : Les cartes polaroid à bord dentelé en slider, les timbres photo qui s'empilent, la carte postale signée du chef, les annotations en écriture bleue posées en biais. Capture : `data/portfolio/captures/pizza-amici/desktop-frame-2.png`.
  - [thefatduck](https://www.thefatduck.co.uk/) (7.5) : Le header en cellules (adresse | nom | boutons), la liste d'expériences à filets « Learn more → », les croquis au trait en marge qui bougent en parallaxe. Capture : `data/portfolio/captures/thefatduck/desktop-frame-1.png`.

### 5. Marée (`maree`)

**Pitch.** Un site d'eau et d'air pour une table au bord de la Meuse : nom bord à bord sur l'horizon, ligne de houle qui ondule au scroll et plan du quai dessiné au trait.

- Cible : brasserie de fruits de mer, terrasse au bord de l'eau, table méditerranéenne lumineuse. Ambiance : lumineux, salin, ample.
- Idée : Tout est posé sur une ligne d'horizon : une ligne de houle SVG (path sinusoïdal) traverse le site, ondule avec la vitesse de scroll et sépare ciel (texte) et eau (photos). Le nom s'étire d'un bord à l'autre comme un quai.
- Signature : La houle : un path SVG de 2 ondes fixé entre les sections, dont l'amplitude est pilotée par la vélocité Lenis (gsap.quickTo sur une variable d'amplitude, path recalculé au ticker) ; au repos elle respire lentement ; sous le hero elle « monte » et découpe la photo (clip-path: path()). Recette : Lenis onScroll velocity → amplitude ; gsap.ticker pour le path ; clip-path path() sur l'image du hero.
- Verbe de mouvement : *ondule*. Canvas : oui.
- Palette : ground `#FBFBF8`, ink (bleu Meuse) `#17395B`, écume `#D8E3EA`, sable `#D5C4A1`, accent bouée `#D73C2C`.
- Typo : Gambetta (Fontshare) pour display (nom, titres) ; General Sans (Fontshare) pour texte et UI ; Martian Mono (Google) pour meta (horaires, marées, numéros de carte).
- Structure : Hero horizon → Marée des services → L'écailler → La carte → La terrasse → Règles maison → Le plan → Réserver → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, terrasse, ecailler (arrivages).
- Mobile 390 : Nom bord à bord sur deux lignes ; houle conservée (amplitude réduite) ; plan au trait pleine largeur ; ligne de temps défilable.
- Reduced motion : Houle statique (amplitude 6 px fixe, pas de recalcul), plan affiché tracé, nom sans étirement.
- Risques : Bleu + blanc + serif = site d'hôtel : évité par la houle vivante, la mono des marées et le rouge bouée rare. / Le plan dessiné doit être vrai (rues réelles) : le tracer à partir d'OpenStreetMap, pas inventer. / Houle au ticker sur mobile : limiter à 30 fps et pause hors écran.
- Restaurants indicatifs : La Brasserie du Quai, L'Huile sur le Feu.
- Références (score) :
  - [mirazur](https://www.mirazur.fr/) (7.5) : Le wordmark serif bord à bord posé sur la photo d'horizon avec trois univers sous lui, la pile de CTA bordés en haut à droite, la citation en mono espacée, la carte dessinée au trait avec adresses numérotées 1-5. Capture : `data/portfolio/captures/mirazur/desktop-haut.png`.
  - [haven-annecy](https://haven-annecy.fr/) (7.95) : Le line-art SVG qui se dessine au scroll (stroke-dashoffset) : contour de pays, devanture ; les lettres-photo (background-clip: text) ; la nav avec horaires sous chaque entrée. Capture : `data/portfolio/captures/haven-annecy/desktop-frame-6.png`.
  - [slurpramen](https://slurpramen.dk/) (8.1) : Le wordmark à lettres étirées d'un bord à l'autre fixé en bas du hero, les cartes de lieu à étiquette de coin (jour, places, horaires) et les badges de règles maison (« pas de réservation, chiens bienvenus »). Capture : `data/portfolio/captures/slurpramen/desktop-frame-2.png`.

### 6. Journée (`journee`)

**Pitch.** Du café du matin au dernier cocktail : le site est une frise de la journée dont la lumière et la palette tournent avec l'heure, et qui s'ouvre à l'heure réelle du visiteur.

- Cible : brasserie ouverte 7 jours, brunch et petit-déjeuner, lieu qui vit matin, midi et soir (bar, café, salle). Ambiance : solaire, continu, ponctuel.
- Idée : La page est un cadran : six moments (7h café, 9h brunch, 12h déjeuner, 17h apéro, 19h dîner, 23h dernier verre) se suivent au scroll ; une variable --heure pilote la couleur du ciel (aube, blanc, ocre, corail, nuit), la position d'un soleil / lune sur la frise sticky et la chip active. Au chargement, le site scrolle doucement jusqu'au moment correspondant à l'heure réelle (après le hero) et le badge annonce « ouvert jusqu'à 23h ».
- Signature : Le ciel qui tourne : fond en dégradé linéaire à deux arrêts, tweené par ScrollTrigger sur chaque moment (gsap.to sur --ciel-haut / --ciel-bas), pendant que sur la frise sticky un disque passe de soleil (ocre) à lune (ivoire) en 6 crans et que les chiffres de l'heure défilent (tabular, SplitText chars). Recette : 6 ScrollTrigger onToggle + une timeline de couleurs, Lenis scrollTo pour l'arrivée à l'heure réelle.
- Verbe de mouvement : *tourne comme une horloge*. Canvas : non.
- Palette : aube `#FBF6EC`, midi `#FFFFFF`, soleil (accent) `#E79A2E`, crépuscule `#D9614E`, nuit `#13203A`, ink `#1B1B1B`.
- Typo : Bricolage Grotesque (Google (opsz)) pour display (titres, heures géantes) ; Rethink Sans (Google) pour texte et UI.
- Structure : Hero cadran → 7h Café → 9h Brunch → 12h Déjeuner → 17h Apéro → 19h Dîner → 23h Dernier verre → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, brunch, evenements (si agenda).
- Mobile 390 : La frise devient une barre horizontale de 6 points fixée sous le header ; le ciel change toujours ; les médaillons passent en scroll-snap ; l'arrivée à l'heure réelle est conservée.
- Reduced motion : Pas de scrollTo automatique ; le ciel change par section sans tween ; l'heure s'affiche sans défilement de chiffres.
- Risques : Six sections de même gabarit = monotonie : varier les layouts (split, médaillons, liste, bande, statement). / Le dégradé de ciel peut tourner au « glow IA » : deux arrêts seulement, pas de flou, pas de violet. / L'arrivée automatique à l'heure réelle peut dérouter : limitée au premier chargement, jamais sous reduced-motion.
- Restaurants indicatifs : La Brasserie du Quai, Chez Guillaume, Le Royal Namur, La Ferme Blanche d'Asie, Le Félicien, Le Servais.
- Références (score) :
  - [florporto](https://florporto.com/) (7.65) : La frise du jour sticky à droite (morning / afternoon / evening avec un soleil qui descend), l'heure locale en direct en haut du hero et le thème jour / nuit qui suit l'heure réelle, les sections « coffee from 10:00 ». Capture : `data/portfolio/captures/florporto/desktop-frame-2.png`.
  - [delice](https://delice.ca/) (8.3) : La barre supérieure de promotions récurrentes qui alterne les messages, le bloc horaires par jour avec flèches et lignes salle / bar / happy hour, les médaillons ronds de plats à titre courbé. Capture : `data/portfolio/captures/delice/desktop-bas.png`.
  - [hangar-7](https://www.hangar-7.com/de/) (7.45) : Le badge « ouvert aujourd'hui 09:00 - 22:00 » à point coloré calculé selon le jour, et le hero épinglé à chips qui changent le média. Capture : `data/portfolio/captures/hangar-7/desktop-haut.png`.

### 7. Comptoir (`comptoir`)

**Pitch.** Blanc, silence et précision : l'assiette est le seul sujet, dressée sous vos yeux composant par composant, dans un site où rien ne bouge sans raison.

- Cible : gastronomique, sushi et omakase, table d'auteur à menu unique. Ambiance : blanc, précis, silencieux.
- Idée : Le site est un passe : une surface blanche sur laquelle les assiettes arrivent une à une. Rien n'est décoré ; la hiérarchie vient de la graisse (200 contre 400) et de l'espace. Un seul geste animé : le dressage.
- Signature : Le dressage : une assiette vue du dessus, vide, au centre ; au scrub, 4 à 5 composants détourés (photo du plat découpée en couches) se posent à la pince, chacun avec son nom en italique Sentient qui apparaît à côté (ligne fine qui relie le composant au mot). Recette : ScrollTrigger pin 220 % + scrub 0.8 ; chaque composant en scale 1.15 → 1 + autoAlpha ; lignes SVG stroke-dashoffset ; Lenis.
- Verbe de mouvement : *respire*. Canvas : non.
- Palette : ground `#FFFFFF`, ink `#161616`, muted `#8C8780`, line `#E6E3DD`, accent céladon (rare) `#9FB8A8`.
- Typo : Hanken Grotesk (Google) pour display et texte ; Sentient (Fontshare) pour accent (légendes de composants, citations).
- Structure : Hero → Phrase → Dressage (signature) → Le menu → Le chef → La salle → Distinctions → Réserver → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, menu (page longue du menu unique).
- Mobile 390 : Les images ne sont plus collées au bord (marge 16 px) ; le dressage survit en pin vertical 80 vw ; titres en 200 à 28 px minimum pour rester lisibles.
- Reduced motion : Dressage affiché complet avec légendes, fondus à 0 s, filets dessinés.
- Risques : Le « minimal crème interchangeable » (défaut d'ABaC) : contré par le dressage (contenu du restaurant) et le logo vertical. / Les titres en 200 illisibles sur mobile : taille mini 28 px, contraste AA vérifié. / Blanc + rien = page vide à la capture : les reveals doivent être courts (≤ 0.8 s) et déclenchés tôt.
- Restaurants indicatifs : L'Atelier de Bossimé, L'Essentiel, Le 54, Li Micougni, Makimono.
- Références (score) :
  - [restaurantcastor](https://restaurantcastor.be/) (7.6) : La page blanche aux photos collées au bord gauche, le titre en capitales ultra-light à droite, le logo tourné à 90° fixé en bas à gauche, les deux traits diagonaux colorés aux coins d'une photo. Capture : `data/portfolio/captures/restaurantcastor/desktop-frame-2.png`.
  - [bolenius-rembrandtpark](https://bolenius-rembrandtpark.nl/) (7.45) : Le hero à objet tenu en main au centre encadré de deux slogans, le lien italique posé sur un filet qui se dessine sur toute la colonne, la pastille Reserve + cadeau flottante. Capture : `data/portfolio/captures/bolenius-rembrandtpark/desktop-frame-5.png`.
  - [abacrestaurant](https://www.abacrestaurant.com/) (7.1) : La cadence de blocs 50/50 photo / aplat avec petite capitale, titre fin et lien souligné ; le formulaire à champs soulignés sur une seule ligne de base. Capture : `data/portfolio/captures/abacrestaurant/desktop-bas.png`.

### 8. Nocturne (`nocturne`)

**Pitch.** Un bar après minuit : noir, mosaïque de photos bord à bord, lettres en tube ambré et un halo qui suit la main du visiteur comme une lampe de comptoir.

- Cible : bar à cocktails, cave à manger et bar à vins le soir, restaurant-club, soirées. Ambiance : sombre, ambré, tendu.
- Idée : Le site est éclairé à la lampe : tout est noir, et une tache de lumière ambrée (canvas 2D, dégradé radial lissé par quickTo) suit le pointeur et révèle les photos à sa portée (mix-blend-mode screen sur un calque). Les titres sont des tubes : contour ambré qui s'allume (plein) au survol.
- Signature : La lampe : un canvas fixe plein écran dessine un halo radial (rayon 260 px, ambre à 55 %) qui suit le pointeur avec inertie ; au-dessus de la mosaïque, les photos sont posées à 35 % de luminosité et passent à 100 % dans le halo (calque de l'image dupliqué, masqué par mask-image: radial-gradient positionné via variables). Recette : canvas 2D + gsap.quickTo sur x/y ; --lx/--ly sur :root pour les masques CSS ; sur tactile, le halo suit la vélocité de scroll et se centre. Compte comme 1 canvas (sur 3 autorisés).
- Verbe de mouvement : *vibre*. Canvas : oui.
- Palette : ground `#0A0A0C`, accent ambre (tube) `#F0A63B`, rouge profond `#9E1B28`, ink `#EDE8DF`, line fumée `#3A383B`.
- Typo : Panchang (Fontshare) pour display (titres en capitales, contour) ; Supreme (Fontshare) pour texte, carte, UI.
- Structure : Hero volets → Règles de la maison → Mosaïque → La carte des cocktails → Origin story → Soirées → Venir → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, cocktails, soirees-privatisation.
- Mobile 390 : La mosaïque passe à 2 colonnes bord à bord ; le halo suit le scroll ; les titres sont pleins (pas de contour) ; les volets du hero s'ouvrent verticalement.
- Reduced motion : Pas de halo (images à 100 %), volets ouverts, titres pleins, phrases d'origin story empilées.
- Risques : « Noir + néon » générique : la couleur néon est un ambre chaud, pas un rose ou un vert acide, et le halo est le concept, pas un effet. / Canvas lourd : un seul canvas, rayon fixe, pause hors écran. / Lisibilité : le texte n'est jamais dépendant du halo.
- Restaurants indicatifs : Chez Guillaume, Incorrect, Le Servais, Pépite, cave à manger.
- Références (score) :
  - [drinkkong](https://www.drinkkong.com/) (7.3) : La mosaïque bord à bord sans marge (2/3 + 1/3 inversée toutes les deux rangées, gouttière noire), le titre en contour seul (text-stroke), les boutons fixés aux coins bas (distinction à gauche, BOOK NOW à droite), le footer « règles de la maison ». Capture : `data/portfolio/captures/drinkkong/desktop-frame-3.png`.
  - [11elevenbar](https://11elevenbar.com/) (6.85) : Le hero à volets photo qui s'ouvrent autour du logo, l'« origin story » épinglée (phrases qui se succèdent), la carte de cocktails en liste nue serif. Capture : `data/portfolio/captures/11elevenbar/desktop-frame-1.png`.
  - [danslenoir](https://danslenoir.com/) (6.45) : Le halo de lumière qui suit la souris (glow-wrapper) sur fond noir, le masque-logo de révélation et la barre CTA collante réservation + carte cadeau. Capture : `data/portfolio/captures/danslenoir/desktop-haut.png`.

### 9. Verger (`verger`)

**Pitch.** Un site qui pousse : axe central, vignettes carrées d'ingrédients, roue des saisons qui tourne au scroll et producteurs nommés comme des étiquettes d'origine.

- Cible : gastronomie durable et ferme-table, cuisine de saison et produits locaux, table végétale. Ambiance : botanique, lent, documenté.
- Idée : La page est un calendrier agricole : une roue des 12 mois (SVG) tourne au scroll et met en avant les produits du moment ; chaque plat est relié à son producteur par une étiquette d'origine (nom, village, distance en km). Axe central strict, vignettes carrées, mots empilés.
- Signature : La roue des saisons : un SVG circulaire de 12 secteurs avec le nom des mois et 24 vignettes carrées d'ingrédients accrochées au cercle ; au scrub elle tourne de 360° sur la section (ScrollTrigger pin 300 %), le mois courant (réel, date du jour) reste en haut et son secteur se colore ; les 4 plats liés apparaissent en escalier autour. Recette : rotation GSAP sur le groupe SVG, contre-rotation des vignettes pour rester droites, pin + scrub 1, Lenis.
- Verbe de mouvement : *pousse*. Canvas : non.
- Palette : ground `#F8F6F0`, ink vert feuille `#2E5B3A`, texte `#262420`, accent rose radis `#DD7A8E`, terre `#5A4634`, line pierre `#CFCAC0`.
- Typo : Newsreader (Google (opsz)) pour display et texte éditorial ; Sofia Sans Condensed (Google) pour mots empilés, étiquettes, meta.
- Structure : Hero → Citation → Roue des saisons (signature) → Les producteurs → La carte du mois → Le potager / la salle → Questions → Réserver → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, producteurs, saisons (archive des 4 cartes).
- Mobile 390 : Axe central conservé (tout centré) ; roue à 90 vw épinglée ; étiquettes empilées ; mots empilés à 12 vw.
- Reduced motion : Roue fixe sur le mois courant, mots affichés, clip-paths ouverts, accordéon sans transition.
- Risques : Le « vert + crème + feuilles » de site bio : pas d'illustration de feuille, pas de kraft ; le vert est l'encre, pas un décor. / Roue SVG lourde : 24 vignettes en WebP 280 px, rotation sur un seul groupe. / Producteurs inventés = mensonge : les marquer illustratifs et les remplacer par les vrais à l'adaptation.
- Restaurants indicatifs : Les Potes au Feu, L'Atelier de Bossimé, Partage, Le 54, Li Micougni.
- Références (score) :
  - [centralrestaurante](https://centralrestaurante.com.pe/) (7.3) : L'axe central strict avec vignettes carrées de 280 px, le titre en capitales condensées légères empilées un mot par ligne, la composition en escalier texte / vignette, les liens soulignés en petites capitales placés aux extrémités. Capture : `data/portfolio/captures/centralrestaurante/desktop-frame-1.png`.
  - [studenterkilden](https://studenterkilden.dk/en) (7.25) : Le preloader-logo saisonnier (la branche change d'hiver à automne), la FAQ accordéon révélée ligne par ligne, les cartes à bouton flèche carré dans le coin. Capture : `data/portfolio/captures/studenterkilden/desktop-frame-6.png`.
  - [graza](https://www.graza.co/) (8.2) : L'étiquette d'origine posée sur la photo (« Now serving olives from Alentejo — Harvesting season »), la typo machine à écrire pour les meta, le bouton pleine largeur. Capture : `data/portfolio/captures/graza/desktop-haut.png`.

### 10. Forno (`forno`)

**Pitch.** Farine, pâte et four : un site brut de fournil où la photo du four grossit jusqu'à remplir l'écran, où les noms des pâtes défilent en capitales géantes et où un compte à rebours annonce la prochaine fournée.

- Cible : pizzeria napolitaine, trattoria, pâtes fraîches et four à bois, boulangerie-restaurant. Ambiance : brut, chaud, farineux.
- Idée : Le site est une fournée : il commence dans le noir du four (brun), la pâte lève (les blocs grossissent), le marquee crie les noms, puis la farine (crème) prend tout l'écran pour la carte. Le compte à rebours de la prochaine fournée (ou du prochain service) bat en permanence dans le header.
- Signature : La levée : une photo du four (ou de la pizza) en vignette de 320 px centrée sur fond brun grossit au scrub jusqu'à couvrir l'écran (scale + width via ScrollTrigger pin 250 %), tandis que le titre « AU FOUR » en Big Shoulders 20 vw rétrécit à 4 vw et se cale en coin ; à la fin, le marquee de pâtes à deux lignes en sens inverse traverse l'image. Recette : pin + scrub sur deux tweens inversés, marquee gsap avec timeScale lié à la vélocité Lenis.
- Verbe de mouvement : *lève comme une pâte*. Canvas : non.
- Palette : ground four `#2B1E19`, farine `#F3EDE2`, accent tomate `#C6362A`, croûte `#B98558`, cendre `#8E8A84`.
- Typo : Big Shoulders Display (Google) pour display (titres, marquee, compte à rebours) ; Erode (Fontshare) pour texte, carte.
- Structure : Loader + hero → Manifeste → La levée (signature) → Les pâtes / les pizzas → Le fournil → Les gens → Emporter → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, a-emporter, pates-fraiches (ou pizzas : catalogue complet).
- Mobile 390 : La levée survit (70 → 100 vw) ; le marquee passe à une ligne ; le catalogue en 2 colonnes ; le compte à rebours reste dans le header.
- Reduced motion : Levée affichée pleine largeur, marquee statique sur une ligne, loader remplacé par le logo fixe, compte à rebours sans animation de chiffres.
- Risques : Le cliché italien (vert-blanc-rouge, nappe, Vespa) : interdit ; la seule couleur chaude est la tomate. / Pin de levée trop long ou saccadé sur mobile : will-change et image en WebP 1600 px max. / Marquee partout : un seul par page.
- Restaurants indicatifs : La Dolce Vita Wépion, Incorrect, Le Ponti 2, L'Huile sur le Feu.
- Références (score) :
  - [impastofornoantico](https://www.impastofornoantico.com/) (7.8) : La vignette centrée qui s'élargit jusqu'à la pleine largeur au scrub pendant que le titre se réduit, le marquee géant à deux lignes en sens inverse (CIABATTA FOCACCIA…), la grille de photos asymétrique à parallaxe différenciée, le loader-logo tracé, le footer en couches. Capture : `data/portfolio/captures/impastofornoantico/desktop-frame-1.png`.
  - [bigmammagroup](https://www.bigmammagroup.com/) (7.55) : La carte rouge à compte à rebours (jours, heures, minutes, secondes en serif), le carrousel de cartes qui déborde à droite, le titre dont un groupe de mots est souligné d'un trait épais et sert de lien. Capture : `data/portfolio/captures/bigmammagroup/desktop-frame-3.png`.
  - [madie](https://madie.es) (8.4) : Le catalogue de produits détourés (vignette, nom gras, mention best-seller, description italique) avec en-tête de catégorie à compteur, et le titre contour puis plein. Capture : `data/portfolio/captures/madie/desktop-frame-3.png`.

### 11. Encre (`encre`)

**Pitch.** Ivoire, encre et un sceau vermillon : la carte se déroule comme un rouleau peint, le texte se lit à la verticale et chaque section s'ouvre par un signe.

- Cible : sushi et omakase, ramen et izakaya, table asiatique contemporaine. Ambiance : calme, tracé, vertical.
- Idée : Le site est un rouleau (emaki) : fond ivoire, encre noire, un seul rouge (le sceau). Les titres se lisent de haut en bas, les sections s'ouvrent par un signe (numéro ou caractère), et la carte se déroule horizontalement dans une section épinglée, comme on déroule un rouleau sur une table.
- Signature : Le déroulé : section épinglée où la carte (8 à 12 plats) est peinte sur une bande horizontale de 400 vw qui glisse de droite à gauche au scrub ; chaque plat apparaît sous un trait de pinceau SVG (mask-image animé par stroke-dashoffset) et le sceau vermillon se pose à la fin. Recette : ScrollTrigger pin + scrub sur translateX de la bande, masques SVG par plat, Lenis ; sur mobile, scroll-snap horizontal natif.
- Verbe de mouvement : *glisse comme un rouleau*. Canvas : non.
- Palette : ground ivoire `#F6F1E6`, ink `#19171A`, accent sceau vermillon `#C6341F`, muted pierre `#8A847A`, lavis `#DCD6CB`.
- Typo : Shippori Mincho B1 (Google) pour display (titres, texte vertical, chapeaux) ; Spectral (Google) pour texte, carte.
- Structure : Hero → Concept → Le rouleau (signature) → Histoire → Le chef / l'équipe → Galerie → Venir → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, carte (rouleau complet, défilement horizontal sur desktop), emporter.
- Mobile 390 : Le rouleau devient un scroll horizontal natif avec snap ; les titres verticaux repassent horizontaux ; la colonne de texte prend 100 % moins 32 px ; le sceau et les chapeaux restent.
- Reduced motion : Rouleau en scroll horizontal natif sans pin, masques ouverts, signe tracé affiché, titres sans allumage.
- Risques : Japonisme de pacotille (kanji décoratifs, cerisiers) : aucun caractère japonais sans sens ; les chapeaux sont des numéros ou des initiales. / Texte vertical illisible en français : réservé aux titres de 1 à 4 mots. / Rouleau trop long : 12 plats maximum, page carte dédiée pour le reste.
- Restaurants indicatifs : La Ferme Blanche d'Asie, Makimono, Sanga.
- Références (score) :
  - [akaneyajapan](https://akaneyajapan.com/en/) (7.2) : Le « chapeau » de section (petit signe ocre au-dessus du titre centré), la colonne de texte de 420 px centrée, le diptyque de photos révélé par clip-path, le header en mix-blend-mode difference, le footer en diptyque décalé. Capture : `data/portfolio/captures/akaneyajapan/desktop-frame-2.png`.
  - [shorodo](https://shorodo.nagoya/) (8.85) : Le texte vertical (writing-mode) en colonnes qui s'allume caractère par caractère, le sceau rond en pied, le plan d'accès dessiné avec temps de marche depuis les gares. Capture : `data/portfolio/captures/shorodo/p2-frame-12.png`.
  - [masanyc](https://masanyc.com/) (6.65) : La galerie en quinconce sur fond crème, le numéro de section en serif suivi d'un libellé, l'horloge locale dans la nav. Capture : `data/portfolio/captures/masanyc/desktop-frame-2.png`.

### 12. Velours (`velours`)

**Pitch.** Vert sapin, cuivre et chiffres monumentaux : un site feutré pour une table étoilée, où chaque rideau se lève sur un nombre qui dit tout (5 tables, 7 services, 2 chefs).

- Cible : gastronomique étoilé ou Gault&Millau, fine dining à menu unique, salle intime à peu de couverts. Ambiance : feutré, précieux, contenu.
- Idée : La maison se raconte par ses nombres vrais : le nombre de tables, de services du menu, de chefs, d'années. Chaque chapitre s'ouvre comme un rideau de velours (clip-path depuis le haut) sur un chiffre monumental en cuivre posé sur la photo, puis le texte suit. Pas de nombre inventé : le gabarit n'affiche que ce que le dossier contient.
- Signature : Le rideau : chaque section est masquée par un pan vert sapin (clip-path: inset(0 0 100% 0) → inset(0)) qui se lève en 1.1 s expo.inOut quand la section arrive au tiers de l'écran, révélant la photo ; le chiffre cuivre compte de 0 à sa valeur (tabular, 0.9 s) et se décale de 40 px en parallaxe scrubbée sur la photo. Recette : ScrollTrigger once pour le rideau, scrub pour le parallaxe, gsap.to sur un compteur, Lenis.
- Verbe de mouvement : *se dévoile comme un rideau*. Canvas : non.
- Palette : ground vert sapin `#1B3730`, ground profond `#0E1512`, accent cuivre `#C48F60`, cuivre clair (texte secondaire) `#E2BE94`, ink ivoire `#EEE6D8`.
- Typo : Boska (Fontshare) pour display (nom, chiffres, titres en capitales) ; Source Serif 4 (Google) pour texte.
- Structure : Hero → Logos de guides → Chapitre 1 : les services → Chapitre 2 : les tables → Citation → Chapitre 3 : les mains → Chef's table / privatisation → Galerie N&B → Carte de clôture → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, menu (services détaillés), chefs-table-privatisation.
- Mobile 390 : Chiffres à 160 px au-dessus des photos, photos pleine largeur, rideaux conservés, galerie en scroll horizontal natif, curseur désactivé.
- Reduced motion : Rideaux levés, chiffres affichés à leur valeur, citation entièrement allumée, onglets sans rotation automatique.
- Risques : Le « noir et or » hôtelier : le cuivre n'est jamais un dégradé métallisé, toujours un aplat ; le vert sapin évite le noir pur. / Chiffres inventés pour faire joli : interdit, chapitre supprimé si la donnée manque. / Trop de rideaux : un par section, jamais sur les blocs internes.
- Restaurants indicatifs : L'Essentiel, Le 54.
- Références (score) :
  - [restaurantzimmerl](https://www.restaurantzimmerl.at/) (7.35) : Le chiffre serif cuivre de 250 px posé à cheval sur le coin d'une photo suivi du nom en petites capitales (« 23 GÄNGE »), le filet vertical pointillé de lecture, les logos de guides en cuivre monochrome, la galerie noir et blanc, le curseur à double cercle. Capture : `data/portfolio/captures/restaurantzimmerl/desktop-frame-2.png`.
  - [theinnatlittlewashington](https://www.theinnatlittlewashington.com/) (7.6) : La citation en italique géante dont les mots s'allument au scrub, les onglets à barre de progression qui changent la photo de fond. Capture : `data/portfolio/captures/theinnatlittlewashington/desktop-frame-1.png`.
  - [khufus](https://khufus.com) (7.2) : Les chapitres numérotés en filigrane pâle derrière le surtitre, le triptyque de photos verticales décalées, le script réservé à un sous-titre. Capture : `data/portfolio/captures/khufus/desktop-bas.png`.

### 13. Collage (`collage`)

**Pitch.** Un lieu à plusieurs vies (table, scène, brunch) collé comme un fanzine : aplats de couleur par activité, logo-étiquette qui absorbe le nom de la section, agenda en cahier ligné.

- Cible : restaurant + scène ou comedy club, lieu multi-activités (bar, brunch, événements), brasserie à agenda. Ambiance : collé, militant, drôle.
- Idée : Chaque activité du lieu a sa couleur et son aplat ; le site est un collage de ces aplats, bordés d'un filet noir 2 px, avec des étiquettes, des stickers et un agenda ligné. Le logo en cases reste collé en haut à gauche et affiche où l'on est.
- Signature : Le logo-étiquette : trois cases bordées (nom coupé en syllabes), fixées ; à chaque section, une quatrième case de la couleur de la section se colle au logo avec le nom de l'activité (« Scène », « Brunch », « Bar ») par un petit mouvement de sticker (scale 1.15 → 1, rotate -4° → 0, 0.3 s back.out). Recette : ScrollTrigger onToggle par section → gsap timeline sur la case ; Lenis.
- Verbe de mouvement : *se colle*. Canvas : non.
- Palette : rose bonbon (scène) `#F6A1C8`, vert pelouse (table) `#1E8C4E`, bleu ciel (brunch) `#8ED0EA`, écru (commun) `#F2EEE6`, ink `#0B0B0B`, post-it `#F7E25A`.
- Typo : Libre Caslon Display (Google) pour display et titres ; Space Mono (Google) pour texte, agenda, bulles.
- Structure : Hero → Manifeste → Table (vert) → Scène (rose) → Brunch (bleu) → Privatiser → Avis → Infos → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, agenda (tous les événements), privatisation.
- Mobile 390 : Les aplats restent pleine largeur ; le logo-étiquette passe à 2 cases + section ; l'agenda empile date et carte ; les objets en bord sont retirés.
- Reduced motion : Cases du logo affichées sans animation (la case de section change de texte instantanément), stickers statiques, stagger supprimé.
- Risques : Le collage peut devenir illisible : filets 2 px et grille stricte, une seule police de titre. / Couleurs bonbon = site enfantin : Caslon et le noir des filets tiennent le sérieux. / Objets détourés gratuits : seulement ceux qui désignent une activité réelle.
- Restaurants indicatifs : Chez Guillaume, Le Royal Namur, Le Servais.
- Références (score) :
  - [degroeneafslag](https://www.degroeneafslag.nl/) (7.75) : Le logo en trois cases fixé en haut à gauche qui absorbe un quatrième bloc avec le nom de la section courante, les sections en aplats de couleur avec titre posé sur une étiquette blanche ou noire et un mot en italique, l'agenda sur lignes de cahier avec post-it, les objets détourés en bord. Capture : `data/portfolio/captures/degroeneafslag/desktop-frame-2.png`.
  - [cravburgers](https://www.cravburgers.shop/) (7.1) : Les vagues SVG organiques de transition entre deux fonds, les stickers qui se soulèvent au survol (image flap), le titre à contour épais. Capture : `data/portfolio/captures/cravburgers/desktop-frame-1.png`.
  - [lepainquotidien](https://www.lepainquotidien.com/be/en) (7.2) : La nav en cellules bordées d'un filet 1 px, le damier 50/50 texte / photo cerné d'un filet continu, la carte d'article posée sur une photo. Capture : `data/portfolio/captures/lepainquotidien/desktop-frame-2.png`.

### 14. Ardoise (`ardoise`)

**Pitch.** La carte d'abord : un site d'ardoise anthracite où la liste des plats est la page d'accueil, avec prix tabulaires, aperçu au survol et suggestion du jour qui s'efface et se réécrit.

- Cible : brasserie classique à carte longue, bistrot de quartier, restaurant de place, ouvert midi et soir. Ambiance : net, quotidien, lisible.
- Idée : La page d'accueil est l'ardoise : pas de hero photo, mais la carte complète en liste typographique sur fond anthracite, craie blanche, prix tabulaires, catégories en onglets midi / soir. Les photos n'arrivent qu'au survol (aperçu flottant) et sur la page salle. La suggestion du jour est réécrite chaque matin.
- Signature : La suggestion du jour : en haut de l'ardoise, la ligne « Aujourd'hui : … » s'efface (clip-path inset de gauche à droite, 0.5 s) puis se réécrit mot à mot (SplitText words, stagger 0.08) quand on change de jour avec les flèches ; le reste de l'ardoise ne bouge pas. Recette : gsap timeline effacement / réécriture, données des 7 jours, Lenis. L'index list a un aperçu photo qui suit le pointeur (recette motion.md).
- Verbe de mouvement : *s'efface et se réécrit*. Canvas : non.
- Palette : ground ardoise `#2A2E2D`, ink craie `#F3F1EA`, accent craie jaune `#E9D064`, muted `#9A9D9B`, ground clair (pages salle, contact) `#EDEBE4`.
- Typo : Cabinet Grotesk (Fontshare) pour display (catégories, mots géants, prix du jour) ; Schibsted Grotesk (Google) pour texte, lignes de carte, UI.
- Structure : Barre d'état → Ardoise (accueil) → Formules → La salle → La maison → Horaires et accès → Barre de réservation fixe → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, salle-terrasse, formules-groupes.
- Mobile 390 : L'ardoise reste la première chose vue (nom, suggestion, onglets sticky, lignes avec vignettes inline) ; les mots géants passent à 14 vw ; la barre basse reste.
- Reduced motion : Lignes affichées d'un coup, suggestion changée sans effacement, aperçu statique à droite de la ligne au focus, marquee statique.
- Risques : La « police craie » et la texture tableau noir : interdites ; l'ardoise est une couleur et une liste. / Page d'accueil sans photo = austère : l'aperçu au survol, la craie jaune et la barre d'état donnent la vie. / Liste trop longue sur mobile : onglets sticky et catégories repliables.
- Restaurants indicatifs : La Brasserie du Quai, Le Royal Namur, Le Félicien, Le Grill des Amis.
- Références (score) :
  - [rumbekeplatse](https://rumbekeplatse.be) (8.15) : Le menu de 60 lignes lisible d'un coup : ligne nom / pointillés / prix cerclé, badges « vegie », catégories à pictogramme ; le marquee d'état d'ouverture dépendant de l'heure. Capture : `data/portfolio/captures/rumbekeplatse/desktop-frame-2.png`.
  - [restaurantgem](https://restaurantgem.com) (7.9) : La liste de plats à filets dont le survol bascule la grande photo voisine (featured-menu-item). Capture : `data/portfolio/captures/restaurantgem/desktop-frame-3.png`.
  - [esperitroca](https://esperitroca.com/) (7.45) : La barre de réservation fixe en bas de l'écran à libellés en capitales espacées, et les mots-titres géants empilés alignés alternativement. Capture : `data/portfolio/captures/esperitroca/desktop-frame-2.png`.

### 15. Guinguette (`guinguette`)

**Pitch.** Lin, corail et bleu canard : un one-page de fête familiale où l'on attrape les objets au trait, où les avis arrivent en cartes inclinées et où les photos s'étalent comme sur une table de terrasse.

- Cible : brasserie familiale et terrasse, friterie et grill convivial, pizzeria de quartier. Ambiance : joyeux, dessiné, attrapable.
- Idée : Le site est une table de terrasse un dimanche : on y pose et déplace des choses. Les illustrations au trait (frite, fourchette, verre, parasol : SVG dessinés pour le gabarit) sont saisissables, les photos s'empilent comme des tirages, les avis se posent en cartes.
- Signature : La table : le mur de photos et d'objets draggables (GSAP Draggable + InertiaPlugin absent → inertie maison par quickTo), 12 tirages à cadre blanc et 6 objets au trait, posés avec rotations aléatoires autour du titre « Dimanche à la terrasse » ; un badge rotatif « attrapez-moi » ; sur mobile, les tirages se déplacent au toucher et se remettent en rail. Recette : Draggable type x,y, bounds sur la section, zIndex au drag ; rail scroll-snap sur mobile ; Lenis.
- Verbe de mouvement : *rebondit*. Canvas : non.
- Palette : ground lin `#EFE8DA`, accent corail `#EF5E47`, bleu canard `#1F6D74`, paille `#F1CF6B`, ink `#1F1A17`.
- Typo : Zodiak (Fontshare) pour display (titres, mots géants, avis) ; Satoshi (Fontshare) pour texte, menu, nav.
- Structure : Marquee d'état → Hero → La maison → La table (signature) → Le menu → Avis → Manifeste corail → Horaires → Footer.
- Pages : accueil, carte, histoire-equipe, reservation-contact, 404, terrasse-evenements, a-emporter.
- Mobile 390 : Les objets draggables passent à 3 et restent saisissables ; la table devient un rail de tirages scroll-snap avec rotation conservée ; le menu reste une carte blanche à lignes pointillées.
- Reduced motion : Objets posés sans rebond (toujours saisissables), tirages droits en grille, avis sans flou, marquee statique.
- Risques : Les draggables sur le texte (défaut de Rumbeke) : zone d'exclusion autour des titres. / Clipart et emoji : interdits ; les objets sont dessinés une fois dans le style du gabarit. / Trop de rebond : bounce réservé à l'entrée du hero et aux boutons.
- Restaurants indicatifs : Partage, La Dolce Vita Wépion, Le Félicien, Le Grill des Amis, Le Ponti 2.
- Références (score) :
  - [rumbekeplatse](https://rumbekeplatse.be) (8.15) : Le hero à illustrations au trait saisissables (GSAP Draggable), le slogan en italique décalé sous le titre serif, le mot « Reviews » géant qui passe du flou au net pendant que des cartes d'avis inclinées glissent par-dessus, les ornements de coins, le mot géant coupé par le bas du footer. Capture : `data/portfolio/captures/rumbekeplatse/desktop-haut.png`.
  - [sunbeambagels](https://sunbeambagels.com/) (7.1) : Le mur de polaroids draggables autour d'un titre avec badge rotatif « Drag me », la nav en pilule flottante fixée en bas, le rail de photos arrondies horizontal. Capture : `data/portfolio/captures/sunbeambagels/desktop-frame-6.png`.
  - [haven-annecy](https://haven-annecy.fr/) (7.95) : Le mot géant pâle en filigrane chevauché par un mot manuscrit qui s'écrit, et la galerie de photos qui défile toute seule. Capture : `data/portfolio/captures/haven-annecy/desktop-frame-2.png`.

## Tableau de diversité

Règle : deux directions ne partagent jamais plus d'un critère (vérifié par le générateur sur la famille de chaque valeur).

| # | Direction | Palette | Typo | Structure | Motion verb | Cible |
|---|---|---|---|---|---|---|
| 1 | Braise | sombre → ivoire, accent braise | serif de texte + display condensée haute contraste | one-page à chapitres épinglés | couve puis s'embrase | grillades, feu |
| 2 | Quatre mains | bicolore clair (vert / moutarde) | grotesque unique monumentale + mono | split-screen deux colonnes | se rejoint | duo, deux activités |
| 3 | Affiche | aplats primaires (rouge, jaune, vert, crème) | grotesque extended black | pile d'affiches pleine largeur | claque comme un volet | pizza créative, street food |
| 4 | Cahier | papier + bille bleue + rouge | mono + slab + manuscrit | multi-pages carnet (document) | se pose comme du papier | ferme-table, traiteur |
| 5 | Marée | blanc + bleu Meuse + écume | serif display large + sans + mono | photographique à horizon + plan | ondule | fruits de mer, bord de l'eau |
| 6 | Journée | ciel qui tourne (aube → nuit) | sans humaniste + display opsz | frise chronologique sticky | tourne comme une horloge | brasserie 7j/7, brunch |
| 7 | Comptoir | blanc pur, céladon rare | grotesque 200 + italique serif accent | éditorial asymétrique multi-pages | respire | gastronomique, omakase |
| 8 | Nocturne | noir + ambre tube | wide grotesk capitales contour | mosaïque bord à bord + canvas | vibre | bar à cocktails |
| 9 | Verger | blanc cassé + vert feuille + rose radis | serif éditorial opsz + condensée light | axe central strict + roue | pousse | durable, saison |
| 10 | Forno | brun four → farine + tomate | condensée capitales + serif | blocs flottants + marquee + levée | lève comme une pâte | pizzeria, pâtes, four |
| 11 | Encre | ivoire + encre + vermillon | mincho vertical + serif | rouleau horizontal épinglé | glisse comme un rouleau | sushi, ramen, asiatique |
| 12 | Velours | vert sapin + cuivre | serif capitales fines haute contraste | chapitres à chiffres monumentaux | se dévoile comme un rideau | étoilé, fine dining |
| 13 | Collage | aplats rose / vert / bleu + écru | Caslon + mono | sections-couleur + logo-étiquette + agenda | se colle | multi-activités, scène |
| 14 | Ardoise | anthracite + craie | grotesque journal black | index-first : la carte est l'accueil | s'efface et se réécrit | brasserie classique, carte longue |
| 15 | Guinguette | lin + corail + canard + paille | serif display italique + sans | one-page ludique draggable | rebondit | familial, terrasse |

## Mapping indicatif restaurants → directions

Chaque restaurant a au moins 2 directions plausibles ; la première est la plus naturelle. L'agent `variante-portfolio` reste libre de son choix argumenté.

| Restaurant | Cuisine | Directions plausibles |
|---|---|---|
| Les Potes au Feu | bistronomique, produits locaux | quatre-mains, braise, verger |
| L'Atelier de Bossimé | gastronomique durable, ferme-table | verger, cahier, comptoir |
| Partage | cuisine locale à partager | guinguette, verger, cahier |
| La Brasserie du Quai | brasserie, fruits de mer | maree, journee, ardoise |
| Chez Guillaume | brasserie, repas-spectacle, brunch | collage, journee, nocturne |
| La Dolce Vita Wépion | italienne, pizzeria | forno, guinguette |
| Le Royal Namur | brasserie belge contemporaine | journee, ardoise, collage |
| Incorrect | pizza napolitaine créative | affiche, forno, nocturne |
| L'Essentiel | gastronomique française créative | velours, comptoir |
| La Ferme Blanche d'Asie | asiatique / chinoise | encre, journee, affiche |
| Le Félicien | brasserie classique | ardoise, journee, guinguette |
| Le Grill des Amis | grillades, viandes maturées | braise, guinguette, ardoise |
| Le 54 | gastronomique française inventive | velours, comptoir, verger |
| Le Ponti 2 | italienne, pizzeria | forno, guinguette, affiche |
| Le Servais | brasserie belge, bar à cocktails | nocturne, journee, collage |
| Li Micougni | produits locaux de saison | verger, cahier, comptoir |
| Makimono | sushi, uramaki créatif | encre, comptoir |
| Pépite, cave à manger | partage méditerranéen-marocain, bar à vins | nocturne, cahier, quatre-mains |
| Sanga | ramen japonais | encre, braise, affiche |
| L'Huile sur le Feu | méditerranéenne, pâtes fraîches | forno, braise, maree |

Couverture : Braise (4), Quatre mains (2), Affiche (4), Cahier (4), Marée (2), Journée (6), Comptoir (5), Nocturne (4), Verger (5), Forno (4), Encre (3), Velours (2), Collage (3), Ardoise (4), Guinguette (5).

## Sites retenus par direction (score total)

- **Braise** : shorodo 8.85, saisonsf 7.5, akaneyajapan 7.2
- **Quatre mains** : mugaritz 8.0, restaurantgem 7.9, centralrestaurante 7.3
- **Affiche** : bar-topas 8.1, gourouindianfood 7.65, madie 8.4
- **Cahier** : tabkitchenbakery 7.15, pizza-amici 7.9, thefatduck 7.5
- **Marée** : mirazur 7.5, haven-annecy 7.95, slurpramen 8.1
- **Journée** : florporto 7.65, delice 8.3, hangar-7 7.45
- **Comptoir** : restaurantcastor 7.6, bolenius-rembrandtpark 7.45, abacrestaurant 7.1
- **Nocturne** : drinkkong 7.3, 11elevenbar 6.85, danslenoir 6.45
- **Verger** : centralrestaurante 7.3, studenterkilden 7.25, graza 8.2
- **Forno** : impastofornoantico 7.8, bigmammagroup 7.55, madie 8.4
- **Encre** : akaneyajapan 7.2, shorodo 8.85, masanyc 6.65
- **Velours** : restaurantzimmerl 7.35, theinnatlittlewashington 7.6, khufus 7.2
- **Collage** : degroeneafslag 7.75, cravburgers 7.1, lepainquotidien 7.2
- **Ardoise** : rumbekeplatse 8.15, restaurantgem 7.9, esperitroca 7.45
- **Guinguette** : rumbekeplatse 8.15, sunbeambagels 7.1, haven-annecy 7.95

Sites utilisés dans deux directions (pour un composant précis, dit dans le cahier) : shorodo, akaneyajapan, centralrestaurante, madie, delice, rumbekeplatse, restaurantgem, haven-annecy, bolenius-rembrandtpark. Les familles « bar nocturne » (drinkkong, 11elevenbar, danslenoir) et « collage » (degroeneafslag) ont peu de représentants bien notés : complétées par des composants d'autres familles.

## Méthode et limites

- 105 sites lus dans les 7 fichiers d'évaluation ; les 40 meilleurs regardés en planches-contact (haut + 3 frames + mobile) par lots de 8, notes prises après chaque lot.
- Familles proposées par les évaluateurs reformulées en 15 familles réellement différentes ; les familles trop proches en capture (noir et or hôtelier, minimal crème, luxe institutionnel) ont été fusionnées ou écartées.
- Les sites inaccessibles, les vitrines sans intérêt (Strikingly, Wix) et les mécaniques dépendant de vidéo tournée ou de 3D sur mesure (diverxo, sketch, sunbeam 3D) n'ont fourni que des principes, jamais une signature.
