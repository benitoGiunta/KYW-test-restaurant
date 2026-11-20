# DESIGN, Le Panorama (variante awwwards, « Le tour d'horizon »)

## Brief
- Sujet : Le Panorama, brasserie au sommet de la Citadelle de Namur (Route Merveilleuse 82), pavillon vitré, terrasse sur plusieurs niveaux, carte d'automne 2026 signée Yves Mattagne, four à bois, bière Pano. Ouvert tous les jours, 8 h à 23 h (site client, à confirmer).
- Publics : petit-déjeuner (8 h à 10 h 30), midi et soir de brasserie, touristes montés par le téléphérique, groupes dès 7 personnes, habitués de la terrasse.
- Métier : réserver (tel, formulaire du client), venir (plan, téléphérique), lire la carte (44 plats, de 12 à 98 euros).
- Ressources : 20 photos pro du client (16 retenues), aucun logo vectoriel, données complètes sauf avis, desserts, horaires précis (RAPPORT.md).
- Contraintes : statique (Astro 5), `base` /panorama-citadelle/awwwards/, noindex, pas de backend.

## Trois concepts (test de l'échange, notes sur 5 : originalité / adéquation / faisabilité / portabilité, bas = mieux)
1. **Le tour d'horizon** (territoire : lieu, 360 degrés, la journée de 8 h à 23 h). Règle de mise en page : une règle graduée de 8 h à 23 h traverse chaque page. Verbe : balayer. Typo : grotesque large serrée. Palette : gravier, ardoise, vert Meuse. Signature : la règle et son soleil qui avance (motion.md, scrub sur l'horloge). Frame : le titre et la règle sur la vue de la Meuse. Ancre : « Ouvert tous les jours de 8 h à 23 h » et « vue à 360° ». Notes 4 / 5 / 4 / 2. Échange : avec un autre restaurant la phrase ne tient pas (le soleil sur la règle des heures d'ouverture, au rebord d'un rocher).
2. **Le four ouvert** (territoire : matière, feu). Chaque page se lit comme une tarte flambée qui cuit, du pâle au charbon. Notes 3 / 3 / 3 / 3. Écarté : proche de l'exemple « braise » interdit, et le four n'est qu'un des piliers du lieu. Fournit un détail : l'état « charbon » de la section nuit.
3. **La cave en coupe** (territoire : pierre, étages du rocher). Le site est une coupe verticale, du ciel à la cave. Notes 4 / 3 / 2 / 3. Écarté : cotes d'altitude non prouvées (aucun chiffre vrai dans le dossier), et la carte n'y tient pas. Fournit un détail : l'index « De la terrasse à la cave » de l'accueil.
Choix : le 1, seul concept qui tient du hero au pied, à la carte (grille des heures), à la réservation (horaires) et à la 404.

## Concept Card
- **Idée** : le Panorama est une vue ; le site est un tour d'horizon réglé sur les heures d'ouverture, de 8 h à 23 h.
- **Métaphore** : une règle d'horizon graduée à l'heure, sur laquelle avance un soleil, comme le jour avance sur la Meuse.
- **Signature (et recette)** : la règle de l'horizon, présente en hero, journée, réservation, pied et 404 ; le soleil se déplace avec le défilement (recette motion.md « scrub lié au scroll », transform seulement, phase 2).
- **Émotion (3 premières secondes)** : on est en hauteur, au bord, tout est dégagé et large.
- **Verbe** : balayer (le regard, la règle, la journée).
- **Capture** : titre « Le Panorama » en très grand sur gravier, la Meuse en pleine largeur dessous.
- **Ancre** : horaires 8 h à 23 h tous les jours et vue à 360° sur la Meuse (dossier.md, matière à site 1, 2).
- **Théâtre** : loader non (le hero est le contenu, l'image porte la vue) ; GL non (les photos du client suffisent et le soleil se fait en DOM).

## Système
- **Palette** : ground #e3e4df (gravier clair, photos 03 et 04), ink #11171b (ardoise du pavillon, photo 07), muted #55606a, line #b4b9b6, accent #1d5c58 (vert Meuse, photo 02), curtain #11171b ; nuit : #a9bd78 (vert des tabourets du bar, photo 09), #a4b0ab. Contrastes calculés dans tokens.css.
- **Typo** : Clash Grotesk 500 et 600 (display, Fontshare), Switzer 400 et 600 (corps, Fontshare), 4 fichiers, 2 préchargés. Échelle fluide `--t-mega` (3,4 à 14 rem), `--t-xl`, `--t-l`, `--t-m`, `--t-body` (16 à 18 px), `--t-s` 14 px, `--t-xs` 13 px ; display interlettrage -0,045 em (mega), -0,035 (xl), -0,025 (l), interligne 0,88 à 1 ; prix `tabular-nums` ; insécables dans « 8 h », « 19 € », « ».
- **Grille** : 12 colonnes (une seule colonne au téléphone), lignes fortes à gauche (gutter) et à la colonne 8 (actions et texte secondaire) ; quatre humeurs `--serre`, `--normal`, `--aere`, `--entracte`. Rayon 0 partout, le soleil seul est rond.
- **Mouvement (à planifier, phase 2)** : easing `expo.out` (entrées), `expo.inOut` (rideau) ; verbe « balayer » : révélations latérales par clip-path, soleil de la règle lié au scroll ; rideau ardoise horizontal. Hovers : CTA, fond qui s'inverse (fait en CSS) puis balayage en phase 2 ; nav, soulignement qui se trace (fait) ; plats et images, aperçu image sur l'index (phase 2) ; liens texte, épaisseur du soulignement ; utilitaires, couleur. Repos : le soleil dérive de quelques pixels sur la règle du hero (horloge GSAP, off sous reduced motion).
- **Plan de composition (accueil)** : poster (titre, baseline, actions) ; média plein cadre (Meuse + règle) ; paire asymétrique (façade + texte, vue aérienne décalée) ; index sombre « De la terrasse à la cave » avec vignettes ; narration en paire (four, Pano) ; données (journée sur la règle) ; pied final (appel, mur de trois photos, mot « Le Panorama » en géant, règle à 23 h). Carte : index sticky à gauche, catégories en liste (patron index, aperçu curseur en phase 2). Histoire : récit en paire, équipe en liste sombre, photos. Mobile 390 : titre sur une ligne (3,4 rem), actions pleine largeur, index de la carte en bande défilante, mur final en strip `scroll-snap`, règle une heure sur deux.
- **Test de généricité** : un modèle générique poserait un hero avec vue en fond, centré, flou ; ici le titre occupe la largeur sur fond gravier, la photo reste nette en dessous, la règle des heures porte l'ancre. Corrigé : pas de hero centré, pas de verre dépoli, pas d'eyebrow.

## Sur-utilisation de la skill (phase 1)
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : § Trois concepts. [x]
2. Aucun exemple travaillé de concepts.md (braise, pavage, gril, cadre, solde, phrase unique) : le concept 2 proche de la braise est écarté. [x]
3. Concept Card au format exact, verbe « balayer ». [x]
4. Concept au pied (`Footer.astro` : `Regle` à 23 h), carte (index et `Regle` absente mais heures 8 h à 10 h 30 et prix), réservation (`reservation.astro` : règle et horaires), 404 (`404.astro` : soleil au-delà du rebord). [x]
5. Moment signature et recette : le soleil sur la règle (motion.md scrub), phase 2. [x]
6. Palette 6 rôles, références photos 02, 03, 07, 09. tokens.css:15 à 26. [x]
7. Défauts évités : fond gravier froid (pas crème), pas de terracotta, pas d'acide sur noir (vert sauge #a9bd78 tiré des tabourets, justifié), pas de dégradé violet, pas de verre dépoli, pas d'eyebrow, pas de 01/02/03, pas d'Inter ni de serif de réflexe. Seul dégradé : scrim ardoise sous la règle du hero (lisibilité). [x]
8. Test de généricité : § Système. [x]
9. Détails 7 vs 8 : sélection (engine.css, ink), focus dans l'accent (engine.css `:focus-visible`), favicon de l'identité (`public/favicon.svg`, soleil sur règle), OG composée (`public/og.png`, capture du hero), pied composé (`Footer.astro`), 404 dans le concept. Focus en phase 3 pour la vérification navigateur. [x partiel]
10. Polices : 4 fichiers dans `public/fonts/`, 2 préchargés dans `Base.astro`. [x]
11. Échelle fluide unique : tokens.css:31 à 38, sauts × 2. [x]
12. Display réglé : site.css `.display`, `.hero__titre` (-0,045 em, interligne 0,88), `text-wrap: balance`. [x]
13. Corps 16 à 18 px interligne 1,5, UI 13 à 14 px, mesure 68ch. [x]
14. Typographie française : insécables, apostrophes courbes, guillemets (plats.ts généré avec insécables). [x]
15. Grille 12 col, lignes fortes (gutter, colonne 8), cadre quatre coins non retenu : le soleil et la règle structurent (justifié, pas de cadre). [x]
16. Familles de section : poster, média, paire, index, paire, données, pied, une fois chacune sur l'accueil. [x]
17. Hero en 3 s : nom, cuisine, horaires, CTA dans le premier écran (mesure : h1 top 107 px, CTA 454 px à 1440x900). [x]
18. Mobile 390 recomposé : titre une ligne, `scrollW` = 390 sur 4 pages mesurées, bande défilante, strip snap, règle une heure sur deux. [x]

## Mouvement (phase 2, réalisé)
- **Variable pilote** : l'heure, de 8 h à 23 h (`src/motion/horizon.ts`). Le défilement fait avancer la journée (haut de page 8 h, pied 23 h) ; le pointeur l'incline de 0,8 h au plus (vitesse de défilement au toucher) ; au repos, le soleil balaie ± 0,7 h à vitesse constante (aller-retour linéaire, pas de point mort). Consommateurs : soleils des règles `pilote` (hero avec étiquette d'heure, journée, pied), en pause hors écran (IntersectionObserver + `gsap.ticker`).
- **Intro du hero** : composition peinte dès la première image (h1 et photo jamais masqués) ; les mots du titre montent de 16 %, la règle se trace cran par cran de 8 h à 23 h (stagger 30 ms), le soleil se lève, la vue se pose (échelle 1,16 vers 1,08). La règle du hero passe en haut de la vue, sur un voile ardoise, pour que le soleil se lise dans le premier écran (1440x900 : y = 590 ; 1280x720 : 559 ; 390x844 : 514).
- **Signature** : la règle et son soleil, recette « scrub lié au scroll » + repos ; la vue du hero balaie l'horizon au défilement (`xPercent` 2 vers -2, scrub 0,6).
- **Révélations** : titres de section `data-split="lines"` (engine) ; images par balayage latéral `clip-path inset(0 100% 0 0)` vers 0 (1,4 s, `expo.out`), jamais au premier écran ; règles hors hero tracées cran par cran (25 ms).
- **Transition** : la nuit balaie l'écran de gauche à droite (0,7 s puis 0,85 s, `expo.inOut`), elle porte la ligne d'horizon et un soleil qui la traverse plus vite (parallaxe interne).
- **Hovers** (deux traitements, verbe balayer) : aplat qui balaie de gauche à droite (CTA ; liens texte en surlignage bas, soulignés au repos) ; trait qui se trace (navigation, index de la carte, où la section lue reste tracée et passe en vert Meuse).
- **Mobile** : pas de menu hamburger, décision phase 1 maintenue et mesurée : les 3 entrées tiennent à 320, 360 et 390 px (`scrollWidth` = largeur, cibles de l'en-tête ≥ 44 px).
- **Repli** : sans `.motion`, règles à leur marque (hero 20 h, journée 13 h, pied 23 h), étiquette masquée, images et titres visibles, aucune transition de page animée.

## Sur-utilisation de la skill (phase 2)
19. Menu mobile : sans objet, décision écrite (3 liens, mesure 320/360/390 : `scrollWidth` 320/360/390, `navRight` 304/344/374, 0 cible < 44 px dans `.tete`). [x]
20. Engine verbatim (`src/engine/`), `astro.ts`, `transition:persist` sur `#curtain` (Base.astro:77, pas de `#gl` ni `#cursor`), `transition:animate="none"` sur `<html>` (Base.astro:40). [x]
21. Une horloge : grep `addEventListener('scroll'|requestAnimationFrame` dans motion/, components/, pages/, layouts/ : 0 résultat ; ticker dans horizon.ts. [x]
22. Code de page dans `onPage()` avec nettoyage (horizon.ts:57 et 152 ; `io.disconnect`, `ticker.remove`, `removeEventListener('refresh')`). [x]
23. Aucune CSS `transform` sur élément GSAP : astre (x), crans (scaleY), mots du h1, `picture` du hero, rideau ; `.regle__h` (translateX CSS) et `.regle__etiquette` (translate CSS) animés en opacité seulement. [x]
24. Module pilote avec `startIdle` (horizon.ts:22) et pointeur (`idle.x`). [x]
25. Loader : non, décision de concept (phase 1) ; aucun composant ni `role="status"`. [x]
26. Transition du concept ≤ 1 s par sens : 0,7 s et 0,85 s (setup.ts). [x]
27. Intro du hero dans la timeline `intro` de l'engine (horizon.ts, `intro.add`), premier frame = composition complète (h1 et photo peints). [x]
28. Épinglages : aucun pin ; scrub de la vue avec `invalidateOnRefresh`. [x]
29. Repli statique dessiné : `html:not(.motion) .regle__etiquette`, règles à leur marque (Regle.astro). [x]
30. Copies décoratives `aria-hidden` (règles, rideau, `pied__mot`), pas de titre dupliqué. [x]
31. Une famille d'easing (`ease.out`, `ease.inOut`, `ease.soft` ; CSS `cubic-bezier(0.19, 1, 0.22, 1)` = expo.out), stagger 25 à 70 ms. [x]
32. Deux traitements dans le verbe (site.css:248 à 276). [x]
33. Hover sous `@media (hover: hover)` (site.css:269), même état sur `:focus-visible`, `:active` présent. [x]
34. Liens texte soulignés au repos (`.lien`, site.css:16). [x]
35. `hover.noHoverChange` : phase 3 (report.json). [ ]
36. Repos : mesuré, captures à 1,5 s d'écart différentes à 1440, 1280, 390, 320 (soleil + étiquette) ; `idleMotion` à lire en phase 3. [x partiel]
37. Curseur natif visible (pas de follower), rien ne dépend du hover au toucher. [x]
38. Pas de blur, pas de `box-shadow` au scroll, pas de `will-change`. [x]
39. Réduit : `startHorizon` sort tôt, Lenis absent (engine), 0 texte caché à 390 réduit sur les 5 pages (mesure). [x]
40. GL : sans objet, décision écrite (Concept Card). [x]
41. Sans objet. [x]
44. Skip link en premier (Base.astro), focus dans l'accent, `.nuit` en vert sauge. [x]
45. Contraste : liens du pied passés en vert sauge sur nuit (ils étaient en vert Meuse sur ardoise) ; voile ardoise 0,78 sous la règle du hero ; mesure en phase 3. [x partiel]
46. Texte réel, aucun canvas. [x]
47. Cibles : `.tete__nav a` 44 px, CTA 48 px. [x]
