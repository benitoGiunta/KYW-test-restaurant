# Don Dino, variante awwwards : « Quatorze services »

## Brief
- Sujet : brasserie-restaurant-pizzeria à Naninne (Namur), chaussée de Marche 826. Ouvert depuis 2014, 7 jours sur 7, midi et soir, patron en salle (Placido Scalisi, dit « Dino »). Carte de 115 plats en 12 chapitres, pizzas de 10,50 à 17,80 €.
- Publics : familles du week-end, déjeuners de semaine (midi), groupes et fêtes (privatisation sur devis), habitués de Naninne et de la route de Marche, clients de passage.
- Métier du visiteur : réserver (téléphone, formulaire du client), venir (parking, PMR), lire la carte complète.
- Ressources : 12 photos du client (pizzas, pâtes, bar, four, salle), carte réelle, horaires réels. Aucun e-mail, avis, presse ni dessert/boisson connus.
- Contraintes : site statique, `base=/don-dino/awwwards/`, pas de backend, `noindex`.
- Hypothèses : voir `src/data/site.ts` (tête). Aucun placeholder : tout manque est omis, rien n'est inventé.

## Trois concepts
1. **Quatorze services** (retenu). Territoire : le rythme horaire. Règle : la semaine est la structure (7 jours x 2 services = 14 cases), la carte suit en chapitres, comme un service. Verbe : servir. Voix : capitales condensées d'enseigne de brasserie. Palette : vert du logo, rouge du filet du logo, crème des sets de table. Signature : grille des 14 services, cases du soir tardif (ven, sam) en rouge ; recette `motion.md` « stagger reveal par cases » (phase 2). Frame partageable : la grille des 14 cases. Ancre : « ouvert 7 jours sur 7 midi et soir » et la fermeture à 23 h 30 vendredi et samedi. Originalité 4, adéquation 5, faisabilité 5, portabilité 2.
2. **Il Condottiere** (écarté). Territoire : le patron, ténor et meneur d'hommes. Règle : l'ordre de bataille en capitales, la carte comme ordres du jour. Verbe : mener. Palette : rouge et noir. Signature : chef qui apparaît en grand. Ancre : le surnom « Il Condottiere » du site. Originalité 3, adéquation 4, faisabilité 3 (une seule photo non confirmée), portabilité 3. Ne fournit qu'un détail : la phrase « Le patron est en salle » (section accueil).
3. **Le four Cuppone** (écarté). Territoire : la pâte et le feu (four à gaz de la photo 07). Règle : tout ce qui sort du four. Verbe : enfourner. Palette : braise sur noir. Signature : pelle qui glisse. Ancre : le four. Originalité 3, adéquation 3, faisabilité 3 (une photo), portabilité 4 (toute pizzeria). Ne fournit que la photo du four, en fin de section salle.
Test de l'échange : « la semaine en 14 services » tient pour un restaurant ouvert 7/7 ; avec un restaurant fermé deux jours elle perd son sens, et la fermeture tardive du ven/sam et le patron en salle sont propres à Don Dino : accepté, la phrase n'est pas échangeable sans changer les cases.

## Concept Card
- Idée : un restaurant qui s'ouvre quatorze fois par semaine ; le site compte ses services avant ses plats.
- Métaphore : le planning de service d'une brasserie, 14 cases, deux par jour.
- Signature (et recette) : la grille des 14 services (accueil), reprise en liste horaires (réservation) ; apparition case par case, stagger sur l'axe du jour (`motion.md`, reveal en cascade, phase 2).
- Émotion (3 premières secondes) : « ici, on sert tout le temps », un hall de brasserie vivant, rouge et vert.
- Verbe : servir (rideau qui monte comme un rideau de comptoir ; cases qui se posent une à une).
- Capture : la grille des 14 cases, cases du soir tardif en rouge, sur le crème.
- Ancre : ouvert 7 jours sur 7, midi et soir ; service du soir jusqu'à 23 h 30 les vendredis et samedis ; patron en salle.
- Théâtre : loader non (le site est un menu pratique, un loader retarderait « Réserver ») ; GL non (le concept est typographique et tabulaire, les photos du client suffisent, aucun effet GL ne les servirait).

## Système
- Palette (rôles) : ground `#12261c` vert bouteille de nuit (logo Don Dino) ; ink `#f3eedf` crème des sets de table (photo 11) ; muted `#b7c2aa` ; line `#33503f` ; accent `#e2452f` rouge du filet du logo (texte : `#f27a62`) ; curtain `#0b1812` ; papier `#f3eedf` avec accent cuit `#b02a18`. Références : enseignes de brasserie belges, drapeau italien désaturé (vert nuit, crème, rouge), étiquettes de San Pellegrino. Défaut n° 1 évité : fond vert foncé, titres en capitales sans empattement.
- Typo : Big Shoulders Display 800 (titres, capitales condensées, une graisse), Work Sans 400 à 700 (corps, UI). Échelle fluide `--t-mega` 3,6 à 14 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body`, `--t-s`, `--t-xs` ; display interlettrage -0,012 à -0,02 em, interligne 0,86 à 0,95, `text-wrap: balance` ; corps 16 à 18 px, mesure 62 car. ; prix `tabular-nums`, insécables « 24 € », « 12 h 30 », guillemets « ».
- Grille : 12 colonnes (gouttière fluide), lignes fortes à la colonne 1 et à la colonne 7 ; humeurs d'espacement serre / normal / aéré / entracte. Rayon 0.
- Mouvement (phase 2) : easing `ease.out` / `ease.inOut` de l'engine, rideau rouge puis vert montant du bas (déjà en place) ; hovers : CTA (inversion de fond), nav (filet rouge qui se déploie), liens texte (soulignement) ; repos : immobilité décidée (une carte pratique ne danse pas), cases de la semaine en cascade à l'entrée.
- Compositions : accueil = poster (h1 colonnes 1-8, photo 9-12), données (14 cases, papier), paire asymétrique (pizzas, pâtes inversée), narration en deux médias (patron en salle), index pratique (papier), pied. Carte = index sticky (téléphone : bandeau `scroll-snap`) + chapitres + photos pleine largeur. Histoire = statement + texte asymétrique + bande de deux photos. Réservation = actions / infos en deux colonnes. 404 = statement.
- Mobile 390 : titres re-réglés, semaine en lignes (jour puis midi / soir), paires en une colonne, index de carte en strip horizontal.
- Test de généricité : un modèle atterrirait sur « pizzeria rouge/blanc/vert, serif, photo de pizza plein cadre » : changé en vert nuit + capitales condensées + semaine comme structure.

## Sur-utilisation de la skill
1. [x] Trois concepts, trois territoires, notés, ancre, test de l'échange : § Trois concepts.
2. [x] Aucun exemple travaillé de concepts.md (braise, pavage, gril, cadre, solde, phrase unique) : § Trois concepts.
3. [x] Concept Card au format exact, verbe compris : § Concept Card.
4. [x] Concept au pied (« À table. » + horaires), à la carte (chapitres en services), à la réservation (liste des 14 services), à la 404 (« plus à la carte », « le service continue ») : `src/components/Footer.astro`, `pages/reservation.astro`, `pages/404.astro`.
5. [x] Moment signature et recette : grille des 14 services, `src/pages/index.astro` (`.sem`) ; animation en phase 2.
6. [x] Palette de 6 rôles + papier, références : § Système, `src/styles/tokens.css:6-22`.
7. [x] Défauts évités : pas de crème+terracotta+serif, pas d'acide sur noir, pas de dégradé violet, pas de verre, pas d'eyebrow, pas de 01/02/03, polices hors Inter/Fraunces/Playfair.
8. [x] Test de généricité : § Système.
9. [ ] « Details that separate 7 from 8 » : sélection (`engine.css` ::selection, ok), focus dans l'accent (`engine.css` :focus-visible, ok), favicon d'identité (`public/favicon.svg`, ok), OG composée provisoire (`public/og.png`, à refaire avec og.mjs en phase 3), pied en composition finale (ok), 404 dans le concept (ok). Coché en phase 3.
10. [x] Polices : 2 fichiers (14 + 50 Ko), 2 préchargées : `src/layouts/Base.astro`.
11. [x] Échelle fluide unique, sauts 3 à 4 fois : `tokens.css:24-30`.
12. [x] Display réglé : `site.css` `.display`.
13. [x] Corps 16 à 18 px, UI 13 à 14 px.
14. [x] Typographie française : insécables dans `lisible()`, `euro()`, guillemets « » et apostrophes ’.
15. [x] Grille 12 colonnes, lignes fortes aux colonnes 1 et 7 ; cadre quatre coins non retenu (le filet rouge du pied et des cases remplit ce rôle).
16. [ ] Une famille de section au plus une fois par page : la paire asymétrique est utilisée deux fois sur l accueil (pizzas, pâtes) ; à varier en phase 2 (transformer les pâtes en filmstrip ou mur de trois photos).
17. [x] Hero en 3 s, mesuré : h1, CTA et média dans la flottaison à 1440x900 (CTA y 692), 1280x720 (y 677), 1024x768 (y 448), 390x844 (y 367).
18. [x] Mobile 390 recomposé : `site.css` `@media (max-width: 640px)`.
