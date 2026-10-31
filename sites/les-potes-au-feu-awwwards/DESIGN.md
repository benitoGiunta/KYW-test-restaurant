# DESIGN · Les Potes au Feu · variante awwwards

> Le producteur a été interrompu avant d'écrire ce fichier (REVUE-1, F0-1). Il est reconstitué par le réviseur (révision 1)
> à partir du code laissé (`tokens.css`, `site.css`, `src/motion/*`, `src/data/site.ts`) : il décrit le système tel qu'il
> existe, sans le réinventer. Les décisions prises pendant la révision sont signalées « (révision 1) ».

## Brief

- Sujet : Les Potes au Feu, bistronomie à quatre mains, avenue de la Plante 4, 5000 Namur. Menu unique de saison en
  quatre services (67 €) le soir du lundi au vendredi, lunch (40 €) et formule (52 €, à confirmer) le mercredi et le
  vendredi midi. Les chefs Damien Gorjanec et François Schepens apportent eux-mêmes les plats à table.
- Public : Namurois et visiteurs qui cherchent une table du soir (couples, amis), clients du midi en semaine.
- Action principale : réserver (Zenchef), sinon appeler.
- Source unique des faits : `data/restaurants/les-potes-au-feu/donnees.json`, recopiée dans `src/data/site.ts`.

## Concept

**Le site est un repas en quatre services, apporté à votre table par les chefs.**
Verbe : se poser, comme une assiette. Deux formes seulement : le disque (assiettes, boutons, pastilles) et le rectangle.
Trois lignes fortes de grille : colonnes 1, 5 et 8 (12 colonnes).

- Accueil : l'assiette du bœuf confit se pose dans le hero ; puis la scène « service » (fond chêne, la table haute du
  restaurant) où quatre assiettes défilent au scroll, une par service, avec la légende « Service n sur 4 ».
- Carte : liste index, aperçu de l'assiette au curseur (desktop), vignettes en ligne au toucher.
- Histoire : le récit des deux potes, un mur de photos du client, la bande (équipe).
- Réservation : page d'informations pratiques, sans formulaire ; Zenchef et téléphone.
- 404 : une assiette vide (le navet du logo), « Cette assiette n'est pas au menu ».

## Système

- Couleurs (`tokens.css`) : salle `#1b1a19`, porcelaine `#f3ebdd`, chêne patiné `#b7ab97` (texte secondaire), assiette
  rouge `#b4231d` (accent, boutons), table en chêne `#ac844d` (scène du service, rideau de transition, menu mobile),
  ocre du navet `#e5962a` (focus, liens, écriture manuscrite).
- Typographie : Bricolage Grotesque (display et texte, axes `opsz` et `wdth`), Caveat pour la note manuscrite des chefs.
- Motion : moteur awwwards (GSAP, Lenis, ClientRouter). Pas de loader (brief calme : le premier frame est l'assiette).
  Transition « le plateau passe » : un panneau chêne traverse l'écran. Module pilote `src/motion/service.ts` : une
  variable, la progression du service (0 à 3). Entrée de repos : l'assiette en cours tourne lentement et s'incline
  avec le pointeur (`idle.ts`). Survols par rôle : remplissage circulaire des boutons depuis le pointeur, point rouge
  et axe `wdth` sur la navigation, bande ocre sur les liens de texte.
- Repli sans mouvement : les quatre assiettes posées côte à côte, les chapitres en dessous, tout le texte visible.

## Décisions (révision 1)

- Les titres `h1` et les accroches des heros ne sont pas révélés (ni `data-split` ni `data-intro`) : ils sont peints au
  premier rendu pour le LCP (lecons.md). Les `h2` et les citations gardent le reveal en lignes masquées.
- L'assiette du hero se pose par transform seul (glisse et rotation), sans opacité : la photo reste l'élément LCP.
- Les légendes honnêtes des services 1 et 4 (assiette non photographiée, dessert d'une carte précédente) sont dans le
  texte du chapitre, visibles avec ou sans mouvement.
- Les prix incertains (formule midi à 52 €, boissons relevées par Le Fooding) portent une pastille « à confirmer »
  (classe `.illu`, contour ocre, forme disque).
- Le pied de page KYW garde le bandeau clair du paquet : son logo a des parties sombres qui disparaissaient sur le noir
  de la salle (surcharge sombre retirée).
- Les sections `.wrap` ne prennent que des `padding-block` : un `padding: X 0` écrasait le gutter de `.wrap` (texte
  collé au bord en 390 px et décalé de 3 px en 1440).
- Le chêne passe de `#a27a44` à `#ac844d` : l'encre de la scène du service était à 4,47:1 et le texte secondaire à
  3,25:1 (axe, 8 nœuds) ; désormais 5,1:1 pour l'encre et 4,6:1 pour le texte secondaire (`#2a2117`).
- Module pilote : l'assiette i est au centre quand le chapitre i passe la ligne des 55 % (`progress * n - 0,5`) ;
  l'ancienne formule `progress * (n - 1)` affichait « Service 2 » sur le chapitre 1.
- Histoire et réservation sont des pages calmes (`idleMotion` faux) : le mouvement y vient des reveals au défilement et
  des survols ; l'assiette qui respire est réservée à l'accueil, à la carte et à la 404.
- Hero de l'accueil : texte et assiette dans la même rangée de grille, assiette en colonnes 9 à 12 ; le h1 tient dans
  1440 × 900, 1280 × 720, 1024 × 768 et 1920 × 1080 (mesuré).
