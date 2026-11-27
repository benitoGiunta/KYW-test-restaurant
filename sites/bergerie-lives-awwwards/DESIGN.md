# DESIGN.md : La Bergerie de Lives (variante awwwards, phases 1 et 2)

## Brief
- **Sujet** : La Bergerie de Lives, Rue de Mosanville 100, 5101 Lives-sur-Meuse (Namur). **Ce n'est pas un restaurant** (dossier.md, 27/11/2026) : maison d'hôtes, salle de mariage, séminaires, piscine chauffée avril à octobre, sauna et jacuzzi. Hypothèse retenue : la maquette est requalifiée en site de domaine. La page « carte » devient `/le-domaine/` ; pages : `/`, `/le-domaine/`, `/histoire/`, `/reservation/`, 404.
- **Publics** : couples qui cherchent un lieu de mariage (cœur de cible), équipes en séminaire, voyageurs en chambre d'hôtes, touristes de la citadelle de Namur.
- **Métier** : organiser une visite (30 min avant un mariage), réserver une chambre, appeler.
- **Ressources** : 25 photos du client (domaine, véranda, cérémonies au jardin, piscine, chambre), logo bélier trop petit (non utilisé). Pas de carte, horaires, tarifs de chambre, avis, réseaux, GPS : tout est `null`, rien n'est inventé. Capacité de salle contradictoire (150 / 250) : non affichée. Seul prix réel : journée piscine 20 € par personne.
- **Contraintes** : statique, Astro, `base` `/bergerie-lives/awwwards/`, noindex, pied KYW. Aucun `placeholder` n'a été nécessaire.

## Trois concepts (trois territoires)
| | Concept | Territoire | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|
| A | **Le Clos** : un domaine clos, ouvert à un seul groupe à la fois | lieu et métier (la privatisation d'un weekend) | 4 | 5 | 5 | 2 |
| B | **Le tonneau** : la cérémonie se célèbre sur un tonneau, autel de bois | matière et culture (vin, cave, 5 photos de cérémonies avec le tonneau) | 4 | 4 | 4 | 3 |
| C | **Le weekend** : le site s'écrit comme les heures du vendredi au dimanche | rythme horaire | 3 | 4 | 4 | 4 |
- **Choix : A.** Seul à porter l'offre commerciale (privatisation), la cible (mariages) et la métaphore du nom (bergerie = enclos), et à tenir jusqu'au pied et à la 404.
- **Test de l'échange** : « un domaine clos, ouvert à un seul groupe à la fois, dont la barrière s'ouvre devant vous » ne tient avec aucun autre lieu namurois : la privatisation par weekend et la bergerie sont propres à ce domaine.
- **Ancre** : « Le domaine est privatisé le temps d'un weekend complet pour les mariés » (site actuel) et le nom « Bergerie ».
- **Écartés** : B fournit un détail (le cercle de bois de la photo 08 inspire la forme des bords d'images en phase 2 si besoin) ; C fournit l'idée d'un rythme de sections courtes. Aucun exemple travaillé de concepts.md (braise, pavage, gril, cadre générique, solde, phrase unique) n'est repris : le cadre ici est une clôture (quatre piquets d'angle) et sert la métaphore, pas la décoration.

## Concept Card
- **Idée** : un domaine clos, ouvert à un seul groupe à la fois.
- **Métaphore** : la bergerie, l'enclos. Ce qui est dedans est gardé ; la barrière s'ouvre pour vous.
- **Signature (et recette)** : la barrière à deux battants : le rideau de transition et le hero s'ouvrent en deux moitiés (clip-path, `motion.md` « curtain / clip wipe », engine `data-reveal="clip"`). En phase 1 : cadres à quatre piquets d'angle et bouton à battant (fond qui s'ouvre de haut en bas).
- **Émotion (3 premières secondes)** : on arrive devant un grand portail, le nom géant, la façade en pierre ; calme, privé, protégé.
- **Verbe** : enclore (puis ouvrir).
- **Capture** : hero « La Bergerie de Lives » géant sur vert nuit avec la façade encadrée par quatre piquets laiton, ou le pied « Le domaine se ferme derrière vous. ».
- **Ancre** : privatisation d'un weekend complet ; nom « Bergerie ».
- **Théâtre** : loader non (le site est court, le premier cadre doit être le hero ; la barrière sert de rideau de page) ; GL non (les photos du client portent l'émotion, aucune matière à shader).

## Système
- **Palette** (rôles) : `ground` #17201a (vert nuit du feuillage, proche de Studio Green de Farrow & Ball), `ink` #eee8d8 (pierre claire), `muted` #aeb39f (mousse), `line` pierre à 20 %, `accent` #d9a04e (laiton du tonneau et du saxophone), `curtain` #0e1510. Humeur claire : `pierre` #e4dcc7 (proche de Hay, Farrow & Ball) avec encre #17201a et accent #7a4a12 (AA). Tuile #b4532f en réserve.
- **Typo** : Young Serif 400 (display, chaleureuse, vieux style, ni Fraunces ni Playfair) + Hanken Grotesk 400 à 700 (corps, UI). 2 fichiers woff2 (61 Ko), les deux préchargés. Échelle fluide `--t-mega` 3,4 à 14 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body` 16 à 18 px, `--t-s` 14 px, `--t-xs` 12 px. Display : interlettrage -0,02 à -0,035 em, interligne 0,88 à 1, `text-wrap: balance`. Corps interligne 1,55, mesure 62 car. Prix `tabular-nums`. Insécables et apostrophes typographiques dans les textes.
- **Grille** : 12 colonnes, gouttière fluide, lignes fortes à la colonne 5 (hero) et 7 (index, offres), 3 humeurs d'espacement (hero dense, sections 9 u, pied 4 u). Rayon 0 partout (piquets, pas d'arrondi).
- **Mouvement (planifié, phase 2)** : easing `ease.inOut` pour les battants, `ease.out` pour les révélations, durées 0,45 s (petit) à 1,1 s (hero). Rôles de hover : CTA = battant (déjà en CSS), nav = soulignement qui s'étire, images d'index = vignette qui suit la ligne, liens texte = soulignement qui épaissit. Repos (révisé en phase 2) : les piquets d'angle du hero veillent, va-et-vient de 0 à 12 px à vitesse constante et penchant vers le pointeur ; tout le reste se tient immobile (domaine calme).
- **Plan de composition** : accueil = poster (nom + photo encadrée) ; statement + paire asymétrique ; index de trois offres avec vignette ; mur horizontal (bande scroll-snap) ; données (services + 20 €) ; média plein cadre (piscine) ; pied final. Le domaine : offres alternées gauche/droite, données, proximité (liste). Histoire : récit + photos décalées. Réservation : CTA + dl + photo.
- **Mobile 390** : titre à 17 vw, hero en une colonne avec photo carrée, paire superposée, index sur deux rangées, bande scroll-snap à 72 vw, services en colonne, pied en une colonne.
- **Test de généricité** : un modèle générique mettrait crème + serif + terracotta (non : vert nuit et laiton), un hero plein écran avec voile (non : poster typographique avec cadre), trois cartes d'offres (non : index lignes), 01/02/03 (non). Quatre « oui » corrigés.

## Sur-utilisation de la skill
1. Trois concepts de trois territoires, notés, ancre, test de l'échange : tableau et lignes ci-dessus. [x]
2. Aucun exemple travaillé de concepts.md : section « Écartés ». [x]
3. Concept Card exacte, verbe « enclore » : ci-dessus. [x]
4. Concept au pied, à la carte (le domaine), réservation, 404 : `Footer.astro` (« Le domaine se ferme derrière vous. »), `le-domaine.astro` (offres en enclos), `reservation.astro` (cadre photo), `404.astro` (« Cette barrière ne s'ouvre sur rien. »). [x]
5. Moment signature et recette : barrière à deux battants (clip-path), phase 2 ; piquets d'angle déjà en CSS (`site.css` `.enclos`). [x]
6. Palette de 6 rôles, références Farrow & Ball nommées : `tokens.css:2-17`. [x]
7. Huit « defaults to avoid » : crème/serif/terracotta évité, pas d'acide sur noir, pas de dégradé violet, pas de verre dépoli, pas d'eyebrow sur chaque titre (`.titre-section` seulement sur 4 sections), pas de 01/02/03, pas d'Inter/Fraunces/Instrument/Playfair. [x]
8. Test de généricité : section Système. [x]
9. Détails 7 vers 8 : sélection laiton (`site.css:2`), focus laiton (`site.css:3`), favicon portail (`public/favicon.svg`), OG composée (`public/og.png`, hero), pied en composition (`.pied__cadre`), 404 dans le concept. [x]
10. Polices : `public/fonts/` 2 fichiers, `tokens.css:3-4`, préchargées dans `Base.astro`. [x]
11. Échelle fluide unique : `tokens.css` `--t-*`. [x]
12. Display réglé : `site.css` `.display`, `.hero__titre`. [x]
13. Corps et UI : 16 à 18 px, UI 12 à 14 px, `site.css:6`. [x]
14. Typographie française : « » et apostrophes ’ dans les textes (Python n'a pas été nécessaire : saisie directe). [x]
15. Grille, lignes fortes, cadre quatre coins (piquets, justifiés par la clôture) : `site.css` `.enclos`. [x]
16. Chaque famille de section au plus une fois par page : accueil poster, statement, index, mur, données, plein cadre, final. [x]
17. Hero en 3 s : mesure Playwright 1440x900 : h1 et photo visibles, CTA à l'écran après correction (voir ETAT.md). [x]
18. Mobile 390 recomposé : bloc `@media (max-width: 860px)` de `site.css` ; mesure 390 sans débordement (`over` = 0). [x]

## Mouvement livré (phase 2)
- **Pilote** `src/motion/clos.ts` : une variable, l'ouverture de l'enclos `--ouv` (0 fermé, 1 ouvert), lue par les piquets de chaque `.enclos` (`site.css`, `--o`, `--k`). Hero : deux battants `.battant` s'écartent à l'intro (1,1 s, `ease.inOut`), puis les piquets se posent. Cadres : `--ouv` scrubbé de `top bottom` à `top 40%`. Repos : `--resp` (va-et-vient `wrapYoyo`, 5 px/s) et `--pen` (pointeur, `idle.x`) sur le seul hero visible (IntersectionObserver + `gsap.ticker`). Index : la vignette s'ouvre en battant (`clip-path` 40 % vers 0) et suit le pointeur le long de la ligne (`quickTo`).
- **Transition** `src/motion/setup.ts` : rideau à deux battants qui se ferment au centre (0,75 s) puis s'ouvrent vers les bords (0,85 s), filet laiton sur l'arête de chaque battant. Mesure : navigation vers `/histoire/` complète, rideau caché ensuite.
- **Loader** : aucun (décision de la Concept Card) ; aucun `#loader` dans le HTML, `setLoaderFormat` inutilisé mais inoffensif.
- **Menu téléphone** `src/motion/menu.ts` + `Header.astro` : bouton « Menu » `aria-expanded`, `role="dialog"` plein écran, battants depuis le centre, focus piégé, Échap, focus rendu.
- **Rôles de hover (3 traitements)** : battant (fond qui monte) pour les boutons ; trait qui s'étire (nav) ou s'épaissit (liens texte, pied) ; vignette qui s'ouvre + nom qui avance d'un pas (index). Tous sous `@media (hover: hover)`, même état en `:focus-visible`, `:active` présent.

## Sur-utilisation de la skill (phase 2)
19. Menu mobile accessible : mesure Playwright 390x844 : `aria-expanded` true puis false, focus sur « Fermer », 10 tabulations sans sortir du menu, Échap ferme et rend le focus au bouton (`.logs/aww2-mesure.log`, ligne MENU). [x]
20. Engine verbatim + `astro.ts` ; `transition:persist="curtain"` (`Base.astro:63`), `transition:animate="none"` sur `<html>` (`Base.astro:31`) ; pas de `#gl` ni `#cursor` (sans GL, sans suiveur). [x]
21. Une horloge : grep `addEventListener('scroll'` et `requestAnimationFrame` hors `src/engine/` : aucun résultat ; repos par `gsap.ticker`. [x]
22. Code de page dans `onPage()` avec nettoyage : `clos.ts` (io, ticker, écouteurs), `menu.ts`. [x]
23. Aucune CSS `transform` sur élément GSAP : battants, panneaux du rideau et vignettes animés par `xPercent`/`x` ; seul `.bouton::before` (CSS pure) porte un `transform`. [x]
24. Module pilote `clos.ts` avec `startIdle()` (`idle.ts`) et pointeur (`--pen`, vignette). [x]
25. Loader décidé : aucun (Concept Card, Théâtre). [x]
26. Transition du concept : 0,75 s + 0,85 s (≤ 1 s par sens), `setup.ts`. Preuve d-90..92 en phase 3. [x]
27. Intro `data-intro` : h1 `data-split` de chaque page, méta et chapeaux `data-reveal="fade"`, battants du hero dans `page.intro` ; capture `.shots/aww2/d-intro-mi.png` puis `d-hero.png`. [x]
28. Épinglages : aucun épinglage (décision : site court, scrub léger des cadres seulement). [x]
29. Repli statique : `html:not(.motion)` : battants `display: none`, `--ouv` 1, vignettes entières ; mesure réduite : 0 texte ou image caché sur les 5 pages (ligne REDUIT). [x]
30. Copies décoratives : battants `aria-hidden`, nom du menu `aria-hidden` ; aucun titre dupliqué. [x]
31. Une famille d'easing : `ease.*` de l'engine en JS, `--e-out`/`--e-inout` (mêmes courbes expo) en CSS ; stagger sans objet (battants décalés de 0,05 s). [x]
32. Un traitement par rôle, 3 au total, dans le verbe (battant, trait, vignette qui s'ouvre). [x]
33. Hover sous `(hover: hover)`, aussi `:focus-visible`, visible en réduit (couleur, trait) : `site.css`. [x]
34. Liens texte soulignés au repos : `.lien, .pied a`. [x]
35. `hover.noHoverChange` : phase 3 (report.json). [ ]
36. Repos : `--resp` mesuré 7,9 puis 9,0 px à une seconde d'écart (ligne 1440x900) ; `idleMotion` à confirmer en phase 3. [x]
37. Curseur natif visible (aucun suiveur) ; vignettes entières au toucher (`clip-path` sous `hover: hover` seulement). [x]
38. Pas de blur animé, pas de `box-shadow` au scroll (filets statiques), pas de `will-change`. [x]
39. Réduit : `motion` absent, Lenis et intro sautés par l'engine, battants masqués, aucun texte caché (ligne REDUIT). [x]
40. GL sans objet (décision écrite, Concept Card) ; la seule ligne `// GL` restante est le commentaire d'en-tête de l'engine. [x]
41. Sans objet (pas de GL). [x]
44. Lien d'évitement en premier (`Base.astro`), anneau de focus laiton `site.css:4`. [x]
45. Contraste AA : à mesurer en phase 3 (`report.json`). [ ]
46. Texte réel partout, aucun canvas. [x]
47. Cibles : « Appeler » et « Menu » 44 px au téléphone (ligne MENU), boutons 44 px. [x]
