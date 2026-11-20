# DESIGN : Carré d'herbes, variante awwwards « Un carré, des assiettes »

## Brief
- Sujet : restaurant gastronomique décontracté, maison de bord de Meuse à Wépion (Namur). Chef Damien Herbay, Anne-Sophie Gevaert-Herbay en salle. Cuisine de saison faite maison, menus uniquement (2 à 5 assiettes, 38 à 85 €).
- Publics : midi (lunch 38 €), soir (menus longs), touristes de la Meuse, habitués, fêtes. Métier du site : réserver par téléphone (pas de réservation en ligne), voir les menus, venir (horaires, parking).
- Ressources : 26 photos du client (salles, parc, plats), logo (flamme verte #8FB356), données `data/restaurants/carre-d-herbes/`.
- Contraintes : site statique Astro, `base` /carre-d-herbes/awwwards/, noindex, pied KYW. E-mail et GPS inconnus : aucun mailto, plan en lien externe. Hypothèses listées en tête de `src/data/site.ts`. Aucun contenu fictif ajouté.

## Trois concepts (notes 1 à 5 : originalité / adéquation / faisabilité / portabilité, bas = mieux)
1. **Un carré, des assiettes** (territoire : métier et nom). Le nom est un carré (tour carrée, carré potager), la cuisine se compte en assiettes rondes (menus de 2 à 5). Règle : les lieux sont des carrés, les plats des ronds. Ancre : menus 2/3/4/5 assiettes à 38/55/68/85 €. Notes 4 / 5 / 5 / 2. **Retenu** : seul concept qui tient du hero à la 404 sur une donnée propre au restaurant.
2. **Entre deux villes** (territoire : Meuse, lieu). Page lue comme un trajet Namur, Wépion, Profondeville, bornes kilométriques. Ancre : baseline « entre Namur et Profondeville ». Notes 3 / 3 / 4 / 3. Écarté : distances et GPS inconnus, donc inventés. Fournit un détail : la phrase d'accès de la page Réservation.
3. **Le potager** (territoire : saison). Herbier, l'ordre de cueillette des aromates, vert dominant. Ancre : carré potager d'aromates. Notes 2 / 4 / 4 / 4. Écarté : herbier = cliché, aucune liste d'herbes dans les sources. Fournit un détail : le vert du logo comme accent.
Test de l'échange : « on compte en assiettes, le carré est le lieu, le rond est le plat » ne tient pas avec un autre restaurant (le nom et les menus en assiettes sont propres à Carré d'herbes).

## Concept Card
- **Idée** : un nom carré, une cuisine ronde. Tout ce qui est lieu est carré, tout ce qui est plat est rond, et on compte en assiettes.
- **Métaphore** : la mise en place d'un menu sur une table : on pose n assiettes dans un carré.
- **Signature (et recette)** : « Compter les assiettes » : au survol d'un menu, les n ronds se remplissent en cascade (CSS en phase 1) ; en phase 2 les ronds se posent en clip-path cercle avec stagger 60 ms (recette motion.md, reveal par masque) et le disque du hero se dresse dans son carré.
- **Émotion (3 premières secondes)** : calme précis, la netteté d'une assiette dressée à la pince.
- **Verbe** : dresser.
- **Capture** : le disque du plat noir posé dans un carré vert décalé, sous le nom en lettres larges.
- **Ancre** : menus en 2, 3, 4 et 5 assiettes (38, 55, 68, 85 €), tour carrée de la façade, carré potager.
- **Théâtre** : loader non (le restaurant se lit en 3 secondes, un loader retarderait « Appeler ») ; GL non (le concept tient en géométrie CSS, les photos sont le matériau).

## Système
- **Palette** (références : assiette noire texturée des photos, flamme verte du logo, mur de brique blanchie de la salle). `ground` #171A15 ardoise verte, `ink` #EDE9DD porcelaine (14,5:1), `muted` #A7A89A (7,3:1), `line` #343A30, `accent` #8FB356 flamme verte (7,3:1), `curtain` #8FB356. Thème « pierre » alterné : fond #DDE2D0, encre #171A15 (13,3:1), muted #53584A (5,5:1), accent #4A6A26 (4,7:1).
- **Typo** : Archivo variable (graisse 800, largeur 118 %, interlettrage -0,035em, interligne 0,88 à 1) pour les titres, les prix et l'UI ; Newsreader 400 et italique pour le corps (17 à 20 px, interligne 1,5). 3 fichiers, 2 préchargés. Échelle `--t-mega` 3,6 à 11,5 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body`, `--t-s`, `--t-xs`. Prix `tabular-nums`, espaces insécables avant € et dans les heures.
- **Grille** : 12 colonnes, gutter fluide. Lignes fortes : marge gauche et colonne 4 (le quart, `--axe`). Rayon : 0 pour les lieux, 50 % pour les plats. Espaces : serre, normal, aéré, entracte.
- **Mouvement (planifié, phase 2)** : easing `ease.out` pour les entrées, `ease.inOut` pour le rideau vert (couvercle qui monte). Hovers : CTA = rond qui se dresse dans le bouton ; nav = soulignement qui se trace ; menus et plats = ronds qui se remplissent. Repos : un rond de l'accent respire dans le hero (phase 2), sinon immobilité décidée.
- **Plan de composition** : Accueil : poster (nom + disque), énoncé typographique, index des menus, paire asymétrique de carrés, mur de ronds, données (horaires). Carte : poster + index des menus (patron index), liste éditoriale des plats avec ronds collants, fêtes en deux colonnes, infos. Histoire : poster à photo, récit à deux colonnes, paire de carrés, liste d'équipe. Réservation : poster téléphone, données horaires, média accès. 404 : assiette vide dans un carré.
- **Mobile 390** : titres recomposés (nom sur deux lignes à 16 px de gutter), ronds de l'index sur une ligne dédiée, grilles à une colonne, disque centré sous le titre.
- **Test de généricité** : un modèle générique poserait un hero plein cadre sur une photo de salle, trois cartes égales et une carte en pavage. Changé : hero typographique + disque, index de menus par nombre de ronds, plats en liste éditoriale.

## Sur-utilisation de la skill
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : § Trois concepts. OK
2. Aucun exemple travaillé de concepts.md (braise, pavage, mise sur le gril, cadre, solde, phrase unique) : le carré est un lieu, pas un pavage ni un cadre de page. OK
3. Concept Card au format exact, verbe « dresser » : § Concept Card. OK
4. Concept au pied (numéro de téléphone géant, `Footer.astro`), à la carte (ronds par menu, `carte.astro`), à la réservation (poster téléphone), à la 404 (assiette vide dans un carré, `404.astro`). OK
5. Moment signature et recette : « Compter les assiettes », `.idx__lien:hover .rondes i` dans `site.css` (cascade CSS) ; phase 2 : ronds posés un par un à l'entrée (`src/motion/assiettes.ts` `compterLesAssiettes`, stagger 60 ms) et remplis en cascade par `clip-path: circle()` au survol et au focus (`site.css` bloc « Phase 2 »). OK
6. Palette de six rôles avec références réelles : § Système. OK
7. Défauts évités : pas de crème/terracotta (ardoise et vert herbe), pas d'acide sur noir pur (vert flamme du logo client, #8FB356, 7,3:1, justifié par la marque), pas de dégradé violet, pas de verre dépoli, pas d'eyebrow, pas de 01/02/03, pas d'Inter/Fraunces/Playfair. OK
8. Test de généricité : § Système. OK
9. Détails 7 vers 8 : focus dans l'accent (`engine.css` :focus-visible), favicon carré + rond (`public/favicon.svg`), sélection inversée ; favicon PNG 32 px et `apple-touch-icon` 180 px (phase 2) ; OG composée provisoire (à refaire en phase 3), pied composé (`pied__tel`), 404 dans le concept. Partiel
10. Polices : Archivo variable + Newsreader, `public/fonts/`, @font-face dans `tokens.css`. OK
11. Échelle fluide unique, sauts x1,6 à x2,6 : `tokens.css`. OK
12. Display réglé : interlettrage négatif, interligne 0,88 à 1, `text-wrap: balance` : `.display` dans `site.css`. OK
13. Corps 17 à 20 px interligne 1,5, UI 13 à 15 px en AA : `tokens.css`. OK
14. Typographie française : insécables avant € et dans les heures, « » et apostrophes courbes dans `site.ts`. À vérifier en phase 3 (apostrophes droites dans les gabarits Astro)
15. Grille 12 colonnes, lignes fortes (marge, quart), carré vert décalé du hero comme cadre justifié. OK
16. Une famille de section au plus une fois par page : plan de composition. OK
17. Hero en 3 s : nom, cuisine, adresse, « Réserver au 081 34 48 19 » dans le premier écran (mesure : CTA à y 727 en 1440x900, 629 en 1280x720). OK
18. Mobile 390 recomposé : aucun débordement horizontal mesuré sur les 4 pages, `left` des `.display` = 16 px. OK

### Phase 2 (mouvement et interactions)
19. Menu mobile : `Header.astro` bouton « Menu » `aria-expanded` + `aria-controls`, panneau plein écran sous 40 rem (`site.css` « Menu mobile »), focus piégé, Échap, focus rendu (`src/motion/menu.ts`). Mesure 390 : `aria-expanded` true, premier focus « La carte », panneau 844 px, 6 Tab restent dans `.top`, Échap rend le focus à `.top__menu`. Sans JS : 3 liens en ligne (phase 1). OK
20. Engine verbatim (`src/engine/`), `astro.ts`, `transition:persist="curtain"` et `transition:animate="none"` (`Base.astro` l. 36 et 73) ; pas de `#gl` ni de `#cursor` (aucun GL, aucun follower : décidé). OK
21. Une horloge : grep `requestAnimationFrame|addEventListener('scroll')` dans `src/motion`, `src/pages`, `src/components` = 0 ; repos par `gsap.ticker`, rotation par `onScroll` de l'engine. OK
22. Code de page dans `onPage()` avec nettoyage rendu (`assiettes.ts`, `menu.ts`). OK
23. Aucune CSS `transform` sur `.hero__carre`, `.photo-p`, `.rondes i`, `.curtain__panel` (seul `.btn::before`, non animé par GSAP). OK
24. Module pilote `src/motion/assiettes.ts` : `startIdle` (orbite du carré, pointeur), tournette au défilement (`data-tournette`), signature ; appelé une fois depuis `setup.ts`. OK
25. Loader : non (décision de la Concept Card), aucun composant ni `role="status"`. OK
26. Transition : rideau vert, 0,7 s à l'aller, 0,75 s au retour (`setup.ts`) ; navigation interne vérifiée (accueil vers carte, h1 visible). OK
27. Intro : h1 de chaque page `data-split="lines" data-intro` ; accueil : le carré se trace (scale 0,62 vers 1) et l'assiette se pose en tournant (-32° vers 0) dans `intro`. OK
28. Épinglages : aucun pin ni scrub (sticky CSS de phase 1 seulement). Sans objet
29. Repli statique : sans `.motion`, rien n'est caché (`engine.css` `.motion [data-…]`), pilote coupé (`prefersReducedMotion`) ; mesure réduit : 0 élément caché sur 5 pages, carré immobile (dx 0). OK
30. Aucune copie décorative de texte ; ronds `aria-hidden`. OK
31. Easing `ease.out`/`ease.inOut` de l'engine, CSS `cubic-bezier(.16,1,.3,1)` (équivalent expo.out) ; stagger 60 ms (ronds) et 80 ms (lignes). OK
32. Traitements : CTA rond qui se dresse, nav trait tracé, menus ronds remplis + nom qui glisse, liens texte trait qui monte (3 verbes + lien texte). OK
33. Survols sous `@media (hover: hover)` (`site.css` l. 235), mêmes états sur `:focus-visible`, `:active` présent, transitions instantanées en réduit mais états visibles. OK
34. Liens texte `.lien` soulignés au repos. OK
36. Repos : orbite du carré du hero à vitesse constante (dx mesuré 4,6 px en 1,5 s sur un cadre de ~500 px, au-dessus du seuil de 648 px, sous 1 %) ; à confirmer par `report.json` en phase 3.
37. Curseur natif conservé, aucun follower ; rien ne dépend du survol (menu au clic, ronds posés au défilement). OK
38. Aucun blur animé, aucun `box-shadow`, pas de `will-change`. OK
39. Réduit : Lenis absent (classe `lenis` false), pas de GL, pas de scrub, pas de loader. OK
40. GL : sans objet, décision écrite (Concept Card). OK
44. Skip link en premier (`Base.astro`), focus dans l'accent (`engine.css` l. 33). OK
47. Cibles : bouton Menu 44 px, « Appeler » du panneau 52 px, CTA du hero 52 px. OK
35, 41, 45 : `report.json` en phase 3.
