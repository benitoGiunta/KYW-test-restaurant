# DESIGN : Be Belge… et d'ailleurs (variante awwwards)

## Brief
- **Sujet** : restaurant de cuisine belge et de saison « avec influences d'ailleurs », Avenue de Marlagne 203, Wépion (Namur). Menu du chef en 3 services (57 €) ou 4 services (72 €), vins en option (28 € / 35 €). Salle au mur de pierre et à la cheminée, terrasse ombragée avec foyer, jardin. Privatisation 15 à 34 assis, 20 à 40 en walking dinner.
- **Publics** : déjeuner (mercredi, jeudi, vendredi, dimanche), dîner (jeudi, vendredi, samedi), couples et tablées du week-end, groupes à privatiser, habitués de Wépion et Namur.
- **Métier du site** : réserver (Zenchef ou téléphone), lire la carte, savoir où et quand venir.
- **Ressources** : 10 photos de lieux (aucune de plat ni de personne), 2 logos (non utilisés : fond transparent clair, illisibles sur fond clair), carte réelle sans prix de plats.
- **Contraintes** : site statique Astro, `base` /be-belge/awwwards/, aucun backend, noindex.
- **Hypothèses** : voir ETAT.md. Aucun fait inventé : chef, équipe, histoire, avis, boissons, parking absents.

## Concepts (trois territoires, notés originalité / adéquation / faisabilité / portabilité, bas = mieux)
| | Concept | Territoire | Ancre | Notes |
|---|---|---|---|---|
| A | **Les trois points** : la phrase commence ici et se poursuit ailleurs ; chaque titre s'achève en « … » | nom et typographie | Le nom officiel contient « … » : « be Belge … et d'ailleurs » | 5 / 5 / 5 / 1 |
| B | **La tôle perforée** : une grille de trous comme matière du site | matière du lieu | L'enseigne en métal sur paroi perforée (photo 07) | 4 / 3 / 4 / 3 |
| C | **Le feu et la pierre** : page chauffée par le foyer de la terrasse | matière du métier | Foyer de la terrasse, mur de pierre | 3 / 4 / 3 / 4 (proche d'un exemple interdit) |

Test de l'échange : la phrase A ne tient avec aucun autre restaurant (le nom est le concept). B ne fournit que le détail du motif de pied et du fond de l'enseigne ; C est écarté (c'est le « page qui refroidit comme une braise »). **Choix : A**, parce que le nom du lieu est déjà un dispositif typographique que le site peut tenir de l'en-tête au pied, à la carte et à la 404.

## Concept Card
- **Idée** : « Be Belge » est une phrase qui ne s'arrête pas : trois points, puis « et d'ailleurs ».
- **Métaphore** : la ponctuation de suspension. Le Belge est le début de la phrase, l'ailleurs sa suite.
- **Signature (et recette)** : les trois points, pilote unique (une variable : progression de scroll de la section) ; ils pointent la suite : « et d'ailleurs » entre sous le nom au chargement, les titres de section « s'allument » point par point. Recette motion.md « scrub + SplitText par lignes » (phase 2).
- **Émotion (3 premières secondes)** : une maison qui accueille et qui invite à continuer la phrase ; calme, assuré.
- **Verbe** : **poursuivre** (un élément arrive, glisse horizontalement d'un cran, et laisse la suite visible).
- **Capture** : « Be Belge… » en géant, trois points rouges, « et d'ailleurs » décalé dessous, la salle de pierre à droite.
- **Ancre** : le nom officiel avec ses points de suspension ; l'enseigne en métal ; la carte où chaque plat part ailleurs (chorizo, lavande, paëlla).
- **Théâtre** : loader non (le site est léger et le nom est déjà le hero, un compteur n'ajoute rien) ; GL non (les photos sont des intérieurs ordinaires, un shader les abîmerait ; la signature tient en CSS/GSAP).

## Système
- **Palette** : ground #e9e8e4 (mur peint de la salle), ink #20152a (encre violette du logo), muted #5b5263, line #c6c1bb, accent #b3282d (rouge du triptyque ; texte #9a1f25), tôle #2a2630 (sections sombres, enseigne), pierre #8a6c46 (décor), curtain #20152a. Références : photos 03 et 07, logo officiel. Le défaut n° 1 (crème, serif contrasté, terracotta) est évité : fond blanc cassé froid, grotesque, rouge.
- **Typo** : Bricolage Grotesque 800/600 (display, Google, latin), Figtree 400 à 600 (corps et UI). Échelle fluide `--t-mega` (4,2 à 15 rem) … `--t-xs`. Display : interlettrage -0,035 à -0,04 em, interligne 0,92 à 1, `text-wrap: balance`. Corps 16 à 17 px, mesure 40 à 56 car. Prix `tabular-nums`, insécables « 57 € », « 12 h 30 », « » et ’.
- **Grille** : 12 colonnes (gutter fluide 1 à 2,5 rem), lignes fortes à la colonne 6 (hero, couples) et filet ink de 2 px au sommet des listes ; 4 humeurs d'espacement (serre, normal, aere, large). Rayon 0.
- **Mouvement (planifié)** : easings `ease.out` / `ease.inOut` de l'engine, 0,6 à 1,1 s ; traduction du verbe : entrée par décalage horizontal de 2 à 6 % puis fixe. Hovers : lien texte (soulignement qui s'épaissit), CTA (fond ink), nav (filet accent) ; 3 traitements. Repos : les trois points du hero respirent en séquence (phase 2).
- **Composition** : accueil = poster (nom + photo), statement, paires asymétriques « d'ici … d'ailleurs », données (menus sur tôle), filmstrip (strip horizontal à snap), jours (index), pied (phrase finale). Carte = index à points de conduite (le « … » devient le filet), titres collants à gauche. Histoire = récit + mur de photos + bloc privatisation. Réservation = actions, horaires, adresse, formulaire mailto. 404 = « Introuvable… et pourtant ailleurs ». Mobile 390 : type re-réglé, colonnes passées en pile, strip en `overflow-x` + `scroll-snap`.
- **Test de généricité** : « un modèle générique choisirait crème + serif + terracotta, un hero photo plein cadre et un menu en deux colonnes » : changé (fond froid, grotesque, rouge, hero typographique, index à points de conduite, paires d'ici / d'ailleurs).

## Sur-utilisation de la skill (phase 1)
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus.
2. Aucun exemple travaillé de concepts.md (ni braise, ni pavage, ni mise en place, ni cadre, ni solde courant).
3. Concept Card exacte, verbe « poursuivre » défini.
4. Concept au pied (`Footer.astro`, phrase « Be Belge… et d'ailleurs »), à la carte (`carte.astro`, titres « … » et points de conduite), à la réservation (« Réserver… »), à la 404 (`404.astro`).
5. Moment signature et recette : les trois points, scrub SplitText (phase 2, planifié).
6. Palette 6 rôles, références photos 03 et 07 et logo : `tokens.css:11-21`.
7. Défauts à éviter : pas de crème + serif + terracotta, pas d'acide sur noir, pas de dégradé violet ni de verre, pas d'eyebrow sur chaque titre, pas de 01/02/03, ni Inter ni Fraunces ni Playfair.
8. Test de généricité : section Système.
9. Détails 7 vers 8 : `::selection` ink, focus en accent (`engine.css`), favicon de l'identité (trois points, `public/favicon.svg`), OG composée (`public/og.png`), pied en composition finale, 404 dans le concept.
10. Polices : Bricolage 800/600, Figtree variable, 3 fichiers, 2 préchargés (`Base.astro`).
11. Échelle fluide unique `tokens.css:28-34`, grand saut mega / body.
12. Display réglé (`site.css` `.display`).
13. Corps 16 à 17 px, UI 13 à 14 px.
14. Typographie française : « » et ’ dans les données, insécables sur prix et heures (`heure()`).
15. Grille 12 colonnes, lignes à la colonne 6, filets 2 px.
16. Une famille de section au plus une fois par page : accueil (poster, statement, paires, données, filmstrip, index).
17. Hero en 3 s : nom, cuisine, CTA visibles à 1440x900 (CTA à y=661), mesuré.
18. Mobile 390 : titre 98 px de haut, CTA empilés, photo sous le texte, strip en snap ; aucun débordement horizontal (scrollWidth 390).

## Mouvement (phase 2, réalisé)
- **Pilote** `src/motion/points.ts` : une variable par groupe de points `p` (0 à 3, points allumés). Écrite par ScrollTrigger (titres : de `top 92%` à `top 62%`, scrub 0,6), par l'intro (hero et h1 des pages, `data-intro-points`), penchée par le pointeur vers la droite (la suite) et animée au repos par `idle.ts` (vague de 0,045 em). Un point éteint attend à gauche (−0,4 em, opacité 0,12) : la phrase arrive.
- **Signature** : « Be Belge » peint au premier rendu, ses trois points s'allument un à un, puis « et d'ailleurs » glisse depuis la gauche (`hero.ts`). À la carte, les points de conduite courent du plat vers le prix (`ScrollTrigger.batch`, clip-path).
- **Transition** : panneau d'encre qui entre par la gauche, trois points rouges s'y allument, sort par la droite (0,75 + 0,3 s / 0,85 s), `setup.ts`.
- **Hovers** : lien texte souligné qui s'épaissit ; bouton rempli d'encre, trois points glissent après le libellé ; nav à filet rouge tracé de gauche à droite.
- **Mouvement réduit** : ni Lenis ni pilote ni intro ; points pleins et immobiles, tout le contenu visible.

## Sur-utilisation de la skill (phase 2)
19. [x] Menu mobile : `Header.astro` (bouton `aria-expanded`, `role="dialog"`, volet plein écran), `motion/menu.ts` (focus piégé, Échap, retour au bouton) ; mesuré à 390 : ouvert `true`, Tab ×8 reste dans le volet, Échap ferme et rend le focus (`.logs/bebelge-c2-check2.log`).
20. [x] Engine verbatim + `astro.ts` ; `Base.astro:38` `transition:animate="none"`, `Base.astro:75` `transition:persist` sur `#curtain` ; pas de `#gl` ni de `#cursor` (sans GL ni suiveur, décision écrite).
21. [x] Une horloge : `gsap.ticker` (`idle.ts`, `points.ts`) ; grep `addEventListener('scroll'` et `requestAnimationFrame` hors engine : 0.
22. [x] Code de page dans `onPage()` avec nettoyage (`points.ts`, `hero.ts`, `menu.ts`).
23. [x] Aucune CSS `transform` sur élément GSAP (grep `transform` dans `site.css` : seulement `text-transform`) ; les points sont écrits par `style.translate`.
24. [x] Pilote `points.ts` avec `startIdle()` (`idle.ts`) et pointeur (`idle.x` penche les points vers la droite).
25. [x] Loader : non (décision de la Concept Card), aucun composant ni `role="status"`.
26. [x] Transition du concept ≤ 1 s par sens (`setup.ts`).
27. [x] Intro : titre et accroche peints (LCP), points puis « et d'ailleurs » dans la timeline `intro` (`hero.ts`) ; `intro-faite` posée à 2,6 s (mesure). Pas d'attribut `data-intro` de l'engine : l'intro est horizontale (verbe), écrite dans `hero.ts`.
28. [x] Pas d'épinglage (titres de la carte en `position: sticky`, sans ScrollTrigger).
29. [x] Repli statique : sans `.motion`, points pleins, `hero__suite` visible (garde-fou CSS à 3 s si le script échoue) ; réduit : 0 élément caché sur les 5 pages (mesure).
30. [x] Pas de copie décorative ; `Points.astro` et la phrase du pied en `aria-hidden`.
31. [x] Easing de l'engine seulement (`ease.out`, `inOut`, `soft`, courbe CSS équivalente à expo.out), durées du tableau, staggers 0,05 à 0,08 s.
32. [x] Un traitement par rôle, 3 au total, dans le verbe (`site.css` § Liens et boutons).
33. [x] Survol sous `@media (hover: hover)`, même état sur `:focus-visible`, `:active` présents ; visibles en réduit (transitions CSS à 0,01 ms, états conservés).
34. [x] Liens texte soulignés au repos (`.lt`).
36. [x] Repos : vague des points visibles (translate change à chaque frame, mesuré : écart de 0,02 à 0,07 em en 0,9 s) ; à confirmer par `idleMotion` en phase 3.
37. [x] Curseur natif, pas de suiveur ; rien ne dépend du survol au toucher.
38. [x] Ni blur animé, ni `box-shadow` au scroll, ni `will-change`.
39. [x] Réduit : pas de Lenis (engine), pas de pilote (`startPoints` sort), pas de loader.
40. [x] GL sans objet (décision écrite, Concept Card).
44. [x] Skip link en premier ; anneau accent, rouge relevé sur la tôle et dans le volet (`site.css` § Sélection et focus).
46. [x] Texte réel partout, aucun canvas.
47. [x] Cibles mobiles : « Réserver » 86×44, « Menu » 68×44, actions du volet 52 px de haut.
- Finitions : `::selection` rouge profond, `favicon-32.png` et `apple-touch-icon.png` (180) issus de `favicon.svg`.
