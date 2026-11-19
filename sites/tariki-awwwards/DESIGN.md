# DESIGN, Tariki (variante awwwards)

## Brief
Sujet : Tariki, cuisine levantine au feu de bois, Rue de l'Ouvrage 2, Namur. Publics : midi du mercredi au samedi (sandwich 9 €, formule 17 €), soir du lundi au samedi, habitués de Bayti, curieux de la carte. Métier : réserver, venir, lire la carte. Ressources : trois visuels d'ambiance du client (braises, feu, arcades illustrées), aucun plat ni salle, aucun avis. Contraintes : statique, `base` /tariki/awwwards/, noindex. Hypothèses : voir `src/data/site.ts` (tête) et ETAT.md.

## Trois concepts
| Concept | Territoire | Phrase | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|
| A. La route | étymologie (« mon chemin ») + récit migratoire | Le site est un chemin à cinq étapes qui finit à votre table. | 4 | 5 | 5 | 1 |
| B. La calligraphie | écriture arabe du logo, sens de lecture | Le mot s'écrit de droite à gauche, la carte se lit dans les deux sens. | 4 | 3 | 3 | 2 |
| C. Les trois portes | trilogie Bayti, Comptoir, Tariki | Trois adresses, trois seuils, un même foyer. | 3 | 3 | 4 | 1 |
Test de l'échange : A ne tient avec aucun autre restaurant (les cinq pays, la baseline et le nom sont à Tariki). Retenu : A. B fournit le mot arabe (en-tête, héros). C fournit la section « Trois adresses » de l'histoire.

## Concept Card
- Idée : Tariki signifie « mon chemin » ; chaque page est un tronçon de la même route, de la Syrie à Namur.
- Métaphore : le voyage. La carte est parcourue étape par étape, l'arrivée est la table.
- Signature (et recette) : le fil de la route se trace (calque doré découvert par clip-path, motion.md « draw »), les étapes s'allument quand il les atteint, puis un voyageur se place sur la route selon la progression de la page (départ Syrie en haut, arrivée « votre table » au pied).
- Émotion (3 premières secondes) : on lit « Tariki », le mot arabe, la baseline, et on voit déjà où mène le chemin.
- Verbe : cheminer.
- Capture : le héros (nom, mot arabe, fil à cinq étapes sur charbon) et le « Votre table. » final.
- Ancre : Syrie, Liban, Turquie, Grèce, puis la Belgique (récit du client) ; baseline « De notre route… jusqu'à votre table. ».
- Théâtre : loader non (le site est court, le fil du héros est l'ouverture) ; GL non (aucune photo de plat à déformer, le tracé SVG suffit).

## Système
Palette (rôles) : ground #15110d (charbon éteint), ink #efe5cf (lin), muted #b8a98f, line #3e3329, accent #e0a030 (ocre du logo), curtain #0a0705 ; sections « papier » #e7dcc4 / #1b140d (pierre d'arcade). Références : logo noir, crème et ocre du client, charbon de bois refroidi, enduit ocre des arcades. Le défaut n° 1 (crème, serif contrasté, terracotta) est évité : fond sombre, accent doré, serif massif.
Typo : Young Serif 400 (display, noms de plats, prix en lining nums), Schibsted Grotesk 400..900 (corps, UI), Amiri 700 réduit au mot طريقي (4 Ko). Échelle fluide `--t-mega` à `--t-xs` (tokens.css). Display : interlettrage -0,02 à -0,04 em, interligne 0,9 à 1, `text-wrap: balance`, `padding-bottom: 0.08em`. Corps 16 à 18 px, UI 13 à 14 px. Insécables : « 17 € », « 11 h 30 », « : ».
Grille : 12 colonnes (1 au téléphone), lignes fortes : le fil horizontal (accueil, pied) et le fil vertical (carte, histoire). Une règle de forme : angles vifs, seules les étapes sont des disques.
Mouvement (phase 2, livré) : une famille d'easing (`ease.out`, `ease.inOut` de l'engine), stagger 60 ms. Pilote `src/motion/route.ts` : une variable, la progression dans la page, place le voyageur sur chaque route visible, allume les étapes franchies, remplit le fil de l'en-tête (`--route-p` sur `<html>`) et le fil vertical de la carte ; le pointeur penche le voyageur (±1,5 % de la route). Rideau latéral dont le bord d'attaque porte le fil et le voyageur. Hover, trois traitements : CTA remplissage montant, soulignement qui se trace (nav, liens utilitaires, téléphones), voyageur qui se pose sur la ligne d'index. Repos (décision révisée en phase 2) : la route pointillée coule sous le voyageur à vitesse constante et son halo s'élargit en boucle (cheminer sans s'arrêter), en pause hors écran, à zéro en mouvement réduit.
Plan de composition : accueil = poster (héros), énoncé, index des étapes, affiche de prix sur papier (midi), paire asymétrique (arcades, horaires), pied final ; carte = fil vertical collant + listes ; histoire = narration (texte + fil vertical), trois colonnes, média plein cadre ; réservation = deux colonnes d'actions et de données ; 404 = fil interrompu. Mobile 390 : titres recalés par mot (`--mot`), fil horizontal conservé, fil de la carte en bande défilante `scroll-snap`.
Test de généricité : un modèle générique mettrait une photo de plat plein cadre et un menu en cartes ; ici aucune photo de plat n'existe, le fil, le mot arabe et les prix en affiche portent la page (oui corrigé).

## Sur-utilisation de la skill
1. Trois concepts notés, ancre, test de l'échange : tableau ci-dessus. [x]
2. Aucun exemple travaillé de concepts.md (ni braise qui refroidit, ni pavage, ni solde, ni phrase unique). [x]
3. Concept Card au format exact, verbe « cheminer ». [x]
4. Concept au pied (`Footer.astro`, fil + « Votre table. »), à la carte (fil vertical, étapes), à la réservation, à la 404 (`pages/404.astro`, fil cassé). [x]
5. Moment signature : le fil qui se trace puis le voyageur piloté par la progression (`src/motion/route.ts` `trace()` et `place()`, `components/Route.astro`). [x]
6. Palette de 6 rôles + papier, références nommées. [x]
7. Défauts évités (crème+terracotta, acide sur noir, dégradé violet, verre, eyebrow, 01/02/03 décoratifs, polices réflexes). L'index numérote 1 à 5 car c'est l'ordre des étapes. [x]
8. Test de généricité. [x]
9. Détails 7 vers 8 : sélection inversée (engine.css), focus ocre (`:focus-visible`), favicon `public/favicon.svg` (le fil et son point), OG composée `public/og.png`, pied en composition finale, 404 dans le concept. [x]
10. Polices : 3 fichiers, 2 préchargés. [x]
11. Échelle fluide unique. [x]
12. Display réglé. [x]
13. Corps et UI. [x]
14. Typographie française. [x]
15. Grille et lignes fortes (cadre quatre coins non retenu : le fil remplace le cadre). [x]
16. Une famille de section au plus une fois par page. [x]
17. Hero en 3 s : mesuré, CTA y ≤ 656 à 1440×900, ≤ 604 à 1280×720, ≤ 556 à 1024×768, 513 à 390×844. [x]
18. Mobile 390 recomposé, aucun débordement horizontal sur 5 pages. [x]

### Phase 2 (mouvement et interactions)
19. Menu mobile accessible : `motion/menu.ts:19` (Échap), `:23-24` (focus bouclé), `:31` (`aria-expanded`), focus rendu au bouton ; mesuré à 390 : ouvert `exp=true focus=Fermer`, Échap `exp=false hidden=true focus=Menu` (.logs/tariki-aw2-check3.log). [x]
20. Engine verbatim (copié de huile-sur-le-feu), `engine/astro.ts`, `transition:persist` sur `#curtain` (`Base.astro:72`), `transition:animate="none"` sur `<html>` (`Base.astro:35`) ; ni `#gl` ni `#cursor` (sans objet). [x]
21. Une horloge : aucun `addEventListener('scroll')`, `requestAnimationFrame`, `will-change` ni `blur(` dans `src/motion`, `components`, `pages`, `site.css` (grep vide) ; repos et pilote par `gsap.ticker` (`route.ts:90`, `idle.ts`). [x]
22. Code de page dans `onPage()` avec nettoyage : `route.ts:65` (retire le ticker, `--route-p`, l'écoute resize), `pages.ts` (ScrollTriggers du contexte), `menu.ts`. [x]
23. Aucune CSS `transform` sur un élément animé par GSAP : rideau (`xPercent`), calque du fil (`clipPath`), menu (`clipPath`), cibles de reveal, enveloppe de parallaxe `.hero__media-in` ; le voyageur est placé par `style.translate` hors GSAP. [x]
24. Module pilote avec `startIdle` (`route.ts:62`) et pointeur (`route.ts:42`, mesuré : voyageur de 7 px à 21,9 px quand le pointeur passe à droite). [x]
25. Loader décidé : aucun (Concept Card, « Théâtre »), pas de composant ni de `role="status"`. [x]
26. Transition du concept : rideau qui avance de gauche à droite, 0,6 s + 0,65 s, fil et voyageur sur son bord (`setup.ts`, `.curtain__fil`). [x]
27. Intro `data-intro` : mot arabe (fade), « Tariki » (split), baseline et CTA (up), photo (clip), puis tracé du fil 1,6 s à 0,35 s ; pages intérieures : titre et chapeau. Aucun texte caché dans le viewport après 2,6 s (5 pages, `hiddenInView=0`). [x]
28. Épinglages : aucun pin ni scrub de signature ; seule la parallaxe de l'engine (enveloppe de la photo du héros). [x]
29. Repli statique dessiné : sans `.motion`, fil complet, étapes allumées, voyageur à sa position `data-p` (héros 0, pied 1, 404 0,6), fil d'en-tête masqué, fils verticaux pleins ; mesuré en réduit : `hiddenText=0`, diff de captures 0 octet sur 1,5 s. [x]
30. Copies décoratives : aucune copie de titre ; `17 €` et le mot arabe sont `aria-hidden` et doublés par du texte réel. [x]
31. Une famille d'easing (`ease.out`, `ease.inOut`, courbe expo des transitions CSS), durées 0,4 à 1,6 s, stagger 60 ms (index). [x]
32. Trois traitements de hover dans le verbe : remplissage montant (CTA), tracé de soulignement (nav, utilitaires, téléphones, menu), voyageur posé sur la ligne (index). [x]
33. Hover sous `@media (hover: hover)` (`site.css:197`, `:315`), mêmes états sur `:focus-visible`, `:active` sur CTA, liens et lignes d'index. [x]
34. Liens texte (`.lien`) soulignés au repos, soulignement épaissi et plein au survol. [x]
35. `hover.noHoverChange` : à lire en phase 3 (marque d'accueil dotée d'un survol de couleur, lien KYW souligné). [ ]
36. `idleMotion` : route pointillée qui coule et halo du voyageur dans le héros (route top 771 à 1440×900) ; diff mesurée non nulle sur 1,5 s, champ `report.json` à lire en phase 3. [ ]
37. Curseur natif visible (pas de follower) ; rien ne dépend du survol au toucher (voyageur placé par le défilement, vitesse du défilement en entrée de repos au toucher). [x]
38. Pas de blur animé, pas de `box-shadow` au scroll, pas de `will-change`. [x]
39. Réduit : pas de Lenis (engine), pas de GL, pas de scrub, pas de loader ; `hiddenText=0`, rien ne bouge (mesures ci-dessus) ; `report.json` en phase 3. [x]
40. GL : sans objet, décision écrite (Concept Card), lignes `// GL` retirées de l'engine. [x]
41. Sans objet (pas de GL). [x]
44. Skip link en premier (`Base.astro:71`), anneau de focus ocre (`:focus-visible`). [x]
45. Contraste AA : en-tête désormais opaque (le texte ne passe plus dessous), étapes non atteintes de la 404 en `--c-muted` plutôt qu'en opacité ; mesure en phase 3. [ ]
46. Texte réel partout, aucun canvas. [x]
47. Cibles : nav et menu 44 px, CTA 48 px, « Appeler » 44 px ; mesure en phase 3. [ ]
