# DESIGN : Le Brunchist (variante awwwards)

## Brief
- Sujet : Le Brunchist, café-brunch et cafés de spécialité, place d'Armes 8, 5000 Namur (donnees.json, dossier.md du 20/11/2026).
- Publics : habitués du centre de Namur, couples et groupes du week-end, touristes à la recherche d'un brunch, travailleurs du midi (mercredi à vendredi).
- Métier du site : venir (adresse, horaires), voir la carte, appeler. Pas de réservation en ligne connue.
- Ressources : aucune photo du client, aucune carte, aucun e-mail. Site actuel bloqué par un anti-robot (non contourné). Tout complément est `placeholder: true` dans `src/data/site.ts`.
- Contraintes : statique, `base` /le-brunchist/awwwards/, français, vouvoiement, aucun tiret cadratin.
- Hypothèses : voir l'en-tête de `site.ts` (adresse et téléphone récents, horaires mer.-dim. 9 h 30 à 15 h 30, prix et descriptions illustratifs).

## Trois concepts
| | Idée | Territoire | Orig. | Adéq. | Faisab. | Port. (bas = mieux) |
|---|---|---|---|---|---|---|
| A. Le mot-valise | Brunch = breakfast + lunch : le site se lit de 9 h 30 à 15 h 30, les heures d'ouverture ; le sol passe du jaune d'œuf au matcha puis au café | Nom et rythme horaire | 4 | 5 | 5 | 2 |
| B. L'extraction | La page s'écoule comme un espresso (25 s, crema, anneau de tasse) | Matière du métier | 3 | 4 | 4 | 4 |
| C. Le service dépareillé | Chaque catégorie sur une assiette de forme différente (vaisselle vintage, à confirmer), rassemblement place d'Armes | Lieu et objet | 3 | 3 | 5 | 3 |
Choix : A, seul concept qui ne tient que pour ce restaurant (test de l'échange : « un brunch du mercredi au dimanche, 9 h 30 à 15 h 30, mot-valise » ne s'applique à aucun autre). B fournit la 404 (la dernière tasse), C est écarté (fait non confirmé).

## Concept Card
- Idée : un brunch est un créneau, pas un plat ; le site est ce créneau, de 9 h 30 à 15 h 30.
- Métaphore : l'horloge du service ; le sol de la page suit l'heure (jaune d'œuf, matcha, lait vert, café).
- Signature (et recette) : le cadran du service, phase 2 : un seul pilote (progression de scroll, `onScroll`) commande l'heure affichée, le disque jaune qui s'étale en `clip-path: circle()` d'une bande à l'autre et une règle d'heures. Recettes motion.md « scroll-driven clip reveal » et patterns.md « driver module ».
- Émotion (3 premières secondes) : chaleur franche, appétit, une matinée sans hâte.
- Verbe : s'étaler (comme un jaune, comme une tartine) : ease.soft, longues durées, jamais de rebond.
- Capture : le hero, « Brunchist » en 800 serré sur jaune d'œuf, disque « 9 h 30 » ; ou le pied « 15 h 30 » jaune sur café.
- Ancre : horaires 9 h 30 à 15 h 30, mercredi à dimanche ; nom mot-valise.
- Théâtre : loader non (un café ne fait pas attendre, LCP prime) ; GL non (aucune photo, formes CSS suffisent, aucun gain justifié).

## Système
- Palette : ground jaune d'œuf #F2B52C (matin), matcha #C3D38F (midi), lait vert #E1E8C4 (après-midi), café #24160F (fermeture, curtain) ; ink #21140D ; muted #4D3A1A ; line encre à 28 % ; accent confiture de griotte #A5200E (jaune sur café). Références : œuf poché, matcha de cérémonie, espresso. Défaut crème + serif + terracotta écarté.
- Typo : Cabinet Grotesk (Fontshare, 800 display, 500 texte), DM Mono 400 (disque horaire). Échelle `--t-mega` 15,5 rem à `--t-xs` 0,8125 rem. Display : interlettrage -0,045 em, interligne 0,9 à 1, `text-wrap: balance`, marge -0,04 em d'alignement optique. Prix `tabular-nums`, insécables « 24 € », « 9 h 30 ».
- Grille : 12 colonnes (une colonne au téléphone), lignes fortes à gauche (gouttière) et à la colonne 5 (carte) ; humeurs d'espacement : serré, large, hero. Rayon : pilules et disques seulement.
- Mouvement (phase 2, fait) : famille d'easing de l'engine (`ease.out` révélations, `ease.inOut` rideau et menu, `ease.soft` pointeur), jamais de rebond. Hovers, 3 traitements dans le verbe « s'étaler » : remplissage bas-haut (CTA, bouton Menu), trait qui s'étale ou s'épaissit (nav, liens texte, soulignés au repos), décalage à droite (lignes d'index, plats). Repos : la trotteuse du disque (une perle griotte) fait le tour du cadran au rythme réel des secondes, à vitesse constante (la « respiration » prévue en phase 1 est écartée : points morts sinusoïdaux, leçon le-royal).
- Plan de composition (familles uniques par page) : accueil = affiche (hero), statement (mot-valise), index (trois moments), données (semaine en barres), paire asymétrique (histoire), pied composé. Carte = affiche courte puis trois chapitres à tête collante (index). Histoire = affiche, narration (étapes + récit), paire (équipe), liste (presse). Venir = affiche + appel, trois colonnes. 404 = « 15 h 31 ».
- Mobile 390 : titres recomposés (mega 3,2 à 4 rem), lignes d'index empilées, semaine en deux lignes, pied en une colonne.
- Test de généricité : un modèle atterrirait sur crème, serif, photo d'assiette. Changé : sol jaune d'œuf plein, grotesque 800 serré, mot-valise typographique, aucune photo d'inconnus.

## Sur-utilisation de la skill
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus.
2. Aucun exemple travaillé de concepts.md (ni braise, ni pavage, ni gril, ni cadre, ni solde, ni phrase unique) : concept A absent de la liste.
3. Concept Card exacte, verbe « s'étaler » défini.
4. Concept au pied (« 15 h 30 », src/components/Pied.astro), carte (chapitres par heure, carte.astro), réservation (page « Venir »), 404 (« 15 h 31 », 404.astro).
5. Moment signature : cadran du service, recette nommée (phase 2).
6. Palette 4 à 6 rôles, références réelles : § Système.
7. Défauts écartés : pas de crème, pas d'acide sur noir, pas de dégradé violet, pas de verre dépoli, pas d'eyebrow systématique, pas de 01/02/03 (les heures sont fonctionnelles), pas d'Inter/Fraunces/Instrument/Playfair.
8. Test de généricité : § Système.
9. 7 à 8 : sélection (`::selection` du moteur), focus accent (`:focus-visible` dans l'accent, jaune sur café), favicon du disque (public/favicon.svg), OG à composer (phase 3), pied composé, 404 dans le concept.
10. Polices : Cabinet 500/800 + Mono 400, 3 fichiers, 2 préchargés (public/fonts, Base.astro).
11. Échelle fluide unique : tokens.css.
12. Display réglé : `.display` dans site.css.
13. Corps 17 à 19 px, interligne 1,55, mesure 38 em ; UI 13 à 15 px.
14. Typographie française : insécables, apostrophes courbes, « » absents (aucune citation).
15. Grille 12 colonnes et lignes fortes : site.css `.grid`, `.chap`, `.index__ligne` ; pas de cadre quatre coins (bandes pleines à la place, justifié par le sol qui change).
16. Une famille de section au plus une fois par page : plan ci-dessus.
17. Hero en 3 s : nom, cuisine, adresse, jours, deux actions à 1440×900 (CTA à y 838 à 890, mesuré).
18. Mobile 390 recomposé : `@media (max-width: 47.99rem)`, pas de débordement (scrollWidth 390 sur 5 pages, mesuré).

### Phase 2 (mouvement et interactions)
19. Menu mobile accessible : `<dialog>` modal plein écran (src/components/Header.astro), `aria-expanded` tenu, focus piégé, Échap, focus rendu au bouton (src/motion/menu.ts). Mesuré à 390 : ouvert `exp=true`, 390×844, focus sur « Fermer », 7 tabulations restent dans le dialog, Échap `exp=false` focus `entete__menu` ; clic sur un lien ferme le dialog avant la navigation.
20. Engine verbatim, `src/engine/astro.ts` ; `transition:animate="none"` sur `<html>` (Base.astro:33), `transition:persist` sur `#curtain` (Base.astro:70). `#gl` et `#cursor` sans objet (pas de GL, pas de follower : décision).
21. Une horloge : grep `addEventListener('scroll'` et `requestAnimationFrame` hors engine = 0 ; tout par `onScroll`, ScrollTrigger et `gsap.ticker` (cadran.ts:64).
22. Code de page dans `onPage()` avec nettoyage rendu : cadran.ts:17, menu.ts:8.
23. Aucune CSS `transform` sur un élément GSAP : disque, trotteuse, fil de la règle, barres, panneau du rideau n'ont que `transform-origin` ; la trotteuse est centrée par `left: calc(50% - 1px)`, pas par `translate`.
24. Module pilote `src/motion/cadran.ts` : une variable (heure du service tirée du scroll) vers en-tête, règle, disque, sol, lettres gommées, barres ; pointeur (disque qui penche, cadran.ts:54) ; repos par la trotteuse sur `gsap.ticker`, en pause hors écran (IntersectionObserver). L'engine n'a pas de `startIdle()` : le repos est démarré à la fin de l'intro (`intro.call`).
25. Loader : non (Concept Card), aucun composant ni `role="status"`.
26. Transition du concept (src/motion/setup.ts) : le café s'étale en cercle depuis le point de clic, le jaune au centre (0,75 s), puis se résorbe (0,8 s) ; mesuré : rideau masqué et h1 visible après navigation.
27. Intro : accueil, le disque s'étale (`clip-path: circle()` 0 à 50 %) et la trotteuse rejoint l'heure réelle, méta du hero en `data-split` + `data-intro` ; pages intérieures et 404 : h1 `data-split="lines" data-intro`. Le h1 de l'accueil reste statique (LCP, leçon construction).
28. Épinglages : aucun pin ; scrubs en `invalidateOnRefresh` (disque, sol).
29. Repli statique : sans `.motion`, pas de cercle sur le sol (`.motion .band.etale` seulement), trotteuse posée à 6 h (180°), lettres gommées à 45 % en CSS. Mesuré en réduit : `caches` 0 sur 5 pages, `etale` 0, pas de `.lenis`.
30. Copies décoratives `aria-hidden` : heure de l'en-tête, disque, « 15 h 30 » du pied, « 15 h 31 » de la 404, heures des chapitres.
31. Easing : `ease.*` seulement ; durées 0,6 à 1,4 s, stagger 18 à 80 ms (moteur) et 40 à 60 ms (barres, menu).
32. Trois traitements de hover dans le verbe : voir § Système.
33. `:hover` sous `@media (hover: hover)` (9 blocs dans site.css), même état sur `:focus-visible`, `:active` présent (CTA, nav, liens, menu).
34. Liens texte soulignés au repos (`.lien`).
37. Curseur natif conservé (aucun follower) ; rien ne dépend du survol au toucher.
38. Aucun blur animé, aucun `box-shadow` au scroll, aucun `will-change`.
39. Réduit : ni Lenis, ni scrub, ni loader (mesuré, voir 29).
40. GL : sans objet, décision écrite (Concept Card) ; pas de `#gl`.
44. Lien d'évitement en premier (Base.astro), anneau de focus dans l'accent, jaune sur café (en-tête, menu, pied).
46. Texte réel partout, aucun canvas.
47. Cibles : « Menu » 73×44, « Appeler » 84×44 à 390 (mesuré).
Mesures phase 2 : `scrollWidth` = fenêtre à 320, 360, 390 et 1440 sur les 5 pages ; bas des CTA du hero 819 (1440×900), 674 (1280×720), 706 (1024×768), 812 (390×844) ; 0 erreur console ou requête échouée au bureau. Points 35, 36, 41, 45 : phase 3 (`report.json`).
