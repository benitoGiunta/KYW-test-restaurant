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
- Mouvement (phase 2, fait) : une famille d'easing (`ease.out` entrées, `ease.inOut` rideau et menu, `ease.soft` filet du pointeur), durées du tableau Timing. Module pilote `src/motion/services.ts` : l'heure réelle de Bruxelles devient une position dans les 14 services ; elle écrit la ligne d'état (accueil, réservation : « Service du soir en cours, jusqu'à 23 h 30 » ou « Prochain service : ce soir, dès 18 h »), allume la case courante (encre, filet d'avancement) ou marque la suivante, souligne le jour courant des horaires. Pointeur : au bureau, un filet rouge glisse vers la colonne du jour survolé et revient au jour courant. Repos : la trotteuse de l'horloge de service suit les secondes réelles (gsap.ticker, pause hors écran, nulle en réduit) ; le reste est immobile (brief calme, motion.md « Idle state »). Signature : les cases se posent du haut jour après jour (60 ms par jour, 30 ms midi/soir). Hovers (3 traitements) : aplat qui monte du bas sur les CTA (le geste du rideau), filet rouge sous la nav et les numéros de téléphone, liens texte soulignés au repos dont le trait s'épaissit et rougit ; utilitaires en couleur. Loader : aucun (décision de phase 1). Transition : rideau rouge puis vert montant, 0,7 s par sens.
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
16. [x] Une famille de section au plus une fois par page : les pâtes passent en bande de trois photos (`.trio`, `pages/index.astro`, `site.css` § Pâtes), la paire ne sert plus qu'aux pizzas.
17. [x] Hero en 3 s, mesuré : h1, CTA et média dans la flottaison à 1440x900 (CTA y 692), 1280x720 (y 677), 1024x768 (y 448), 390x844 (y 367).
18. [x] Mobile 390 recomposé : `site.css` `@media (max-width: 640px)`.

### Phase 2 (construction-2)
19. [x] Menu mobile accessible : `aria-expanded`, plein écran, focus piégé, Échap, retour du focus (`motion/menu.ts:19-55` ; contrôle Playwright 390 : `aria-expanded=true`, focus sur « Fermer », après Échap `hidden` et focus sur « Menu », journal `.logs/dd-aw2-check.log`).
20. [x] Engine verbatim (identique à huile-sur-le-feu, `diff -rq`), `engine/astro.ts`, `transition:persist="curtain"` et `transition:animate="none"` sur `<html>` (`layouts/Base.astro:38,75`) ; ni `#gl` ni `#cursor` (pas de GL, pas de suiveur).
21. [x] Une horloge : aucun `addEventListener('scroll')`, `requestAnimationFrame` ni `setInterval` dans `src/motion` (grep vide) ; l'état se relit toutes les 30 s par `gsap.ticker` (`services.ts`).
22. [x] Code de page dans `onPage()` avec nettoyage (`services.ts:65-125`, tickers et écouteurs retirés).
23. [x] Aucune CSS `transform` sur un élément animé par GSAP (`site.css` : seuls `text-transform` ; `.horloge__aiguille` n'a que `transform-origin`, `.sem__fil` passe par `scale: var(--av) 1`, non animé par GSAP).
24. [x] Module pilote `motion/services.ts` + `motion/idle.ts` (`startIdle`, pointeur lissé, vitesse de défilement au toucher), appelé une fois par `setup.ts`.
25. [x] Loader décidé : aucun (Concept Card, « Théâtre ») ; ni composant ni `role="status"`.
26. [x] Transition du concept : rideau rouge puis vert, 0,6 s + 0,1 s de décalage par sens (`setup.ts`), < 1 s.
27. [x] Intro `data-split="lines" data-intro` sur les h1 des 5 pages ; photo du hero peinte au premier rendu, posée par une échelle 1,12 vers 1 (jamais cachée, LCP).
28. [x] Épinglages : aucun (index de carte en `position: sticky` CSS seulement).
29. [x] Repli statique dessiné : sans `.motion`, cases pleines, horloge à midi, état du service calculé quand même (`site.css` fin, contrôle réduit : 0 texte caché, `.logs/dd-aw2-check.log`).
30. [x] Copies décoratives : aucune ; filet, horloge et fil d'avancement `aria-hidden="true"`.
31. [x] Une famille d'easing (`ease.*`), Timing respecté (lignes 1,2 s, images 1,3 s, rideau 0,6 à 0,7 s), stagger 30 à 80 ms.
32. [x] Un traitement par rôle, 3 au total (CTA, nav et téléphones, liens texte), dans le verbe (`site.css` § Phase 2).
33. [x] Survol sous `@media (hover: hover)` (`site.css:237`), même état au `:focus-visible`, `:active` présent ; en réduit, l'aplat et le filet apparaissent sans glissement (transitions 0,01 ms).
34. [x] Liens texte soulignés au repos (`.lien`), lien du pied KYW souligné au survol et au focus.
35. [ ] `hover.noHoverChange` : phase 3 (`report.json`).
36. [x] Immobilité écrite, hors trotteuse de l'horloge de service (repos réel mais petit) ; `idleMotion` à lire en phase 3.
37. [x] Curseur natif, aucun suiveur ; rien ne dépend du survol (filet du pointeur désactivé au toucher et sous 1024 px).
38. [x] Pas de blur animé, pas de `box-shadow` au défilement (l'ombre interne de la case suivante est statique), pas de `will-change`.
39. [x] Réduit : Lenis coupé par l'engine, pas de GL, pas de scrub, pas de loader ; contrôle Playwright `reducedMotion: reduce` : 0 élément caché.
40. [x] GL : sans objet, décision écrite (Concept Card) ; lignes `// GL` absentes de l'engine.
41. [x] Sans objet (pas de GL).
44. [ ] Skip link premier, focus visible : code en place (`Base.astro:74`, `engine.css` `:focus-visible` dans l'accent) ; preuve `report.json` en phase 3.
45. [ ] Contraste AA : phase 3 (la case courante passe en encre sur crème inversé, le texte suit).
46. [x] Texte réel partout, rien dans un canvas.
47. [ ] Cibles : liens isolés en `inline-block` + `padding-block` (`site.css:233`), CTA 52 px, « Appeler » d'en-tête 40 px ; mesure en phase 3.
