# Oh la Vache ! · variante awwwards · DESIGN.md

## Brief
- **Sujet** : Oh la Vache !, resto grill d'Erpent (Chaussée de Marche 581, 5101 Namur), cuisine française et italienne, fondues, pierrades, raclettes, burgers Angus, treize gin'to. Enseigne noire à taches de vache (photo 14), terrasse (canapés, parasols, pergola), salle sous tente avec lustre et rideaux rouges (photos 16, 17).
- **Publics** : le midi (actifs, familles : plats enfants, salades, pâtes), le soir et le week-end (groupes, couples : fondues, pierrades, viandes), la nuit (verres, gin'to, cocktails), automobilistes de la chaussée (aucun bus ni train).
- **Métier du site** : réserver (téléphone uniquement), venir, lire la carte (aujourd'hui 16 images JPG sur le site actuel).
- **Ressources** : 17 photos client (qualité smartphone), carte transcrite (22 rubriques, prix d'octobre 2024), horaires du site. Aucun texte d'histoire, aucune équipe, aucun avis fiable.
- **Contraintes** : site statique Astro sous `base` /oh-la-vache/awwwards/, pas de backend, pas de e-mail public du restaurant (celui du site est celui de la société, donc non repris).
- **Hypothèses** : horaires de donnees.json (vendredi à 23 h 45 et fermeture éventuelle du mardi à confirmer, dit sur la page) ; « heures » de la carte = classement éditorial ; histoire : 3 phrases factuelles + 1 phrase `placeholder: true` affichée « Illustratif ».

## Trois concepts
| | A. Une seule note | B. De 11 h à minuit moins le quart | C. Le morceau |
|---|---|---|---|
| Territoire | table partagée (fondue, pierrade, raclette dès 2 couverts, un seul paiement par table) | rythme horaire : 7j/7, 11 h à 22 h 30, 23 h 45 du vendredi au dimanche ; terrasse de jour, salle rouge de nuit | boucherie : la vache, les morceaux (Tomahawk 1,3 kg, côte à l'os, entrecôtes) |
| Règle | tout par deux, diptyques | la page est une journée : sections jour/nuit, carte rangée par heure | schéma de découpe, rubriques en morceaux |
| Verbe | partager | faire tourner (l'horloge, la table) | trancher |
| Palette | rose des sets de table | noir et lait de l'enseigne, rouge des rideaux | rouge viande |
| Ancre | « un seul paiement par table » | « Semaine 11:00 à 22:30, weekend 11:00 à 23:45, 7j/7 » | Tomahawk 88 € |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 3 / 4 / 5 / 3 | 4 / 5 / 4 / 2 | 3 / 3 / 3 / 3 |
Choix : **B**, car la carte d'Oh la Vache ! va du croque du midi au dernier gin'to et les photos (terrasse au soleil, tente rouge) sont déjà les deux moitiés du jour. Test de l'échange : avec un autre restaurant, « 23 h 45 » et la tente rouge n'existent pas. A fournit le détail de la page Maison (on règle une seule note) ; C est écarté (le schéma de découpe ne couvre qu'un tiers de la carte).

## Concept Card
- **Idée** : Oh la Vache ! tient toute la journée ; le site est une journée de service, de 11 h au dernier verre à 23 h 45.
- **Métaphore** : la page est un cadran ; chaque section a son heure, la lumière passe du lait au noir.
- **Signature (et recette)** : la tache de vache comme seul contour arrondi (clip-path), et l'heure qui avance au scroll (phase 2 : compteur d'heure sur une horloge unique GSAP, `motion.md` scrub léger + `ease.inOut`).
- **Émotion (3 premières secondes)** : un nom énorme, noir sur lait, l'enseigne dans une tache : franc, gourmand, sans chichi.
- **Verbe** : faire tourner.
- **Capture** : le pied « 23 : 45 » en rouge sur noir, partageable.
- **Ancre** : horaires 7j/7, 11:00 à 22:30 (23:45 le week-end), site du restaurant.
- **Théâtre** : loader non (restaurant de route, le nom et le téléphone doivent apparaître tout de suite) ; GL non (photos smartphone, le craft est dans la typo, les taches et l'horloge).
Le concept tient jusqu'au pied (« 23 : 45 »), la carte (4 heures), la réservation (horaires en cadran de liste) et la 404 (« Minuit moins le quart. Cette page est partie. »).

## Système
- **Palette** : ground jour `#f7f6f2` (lait de l'enseigne), ink `#0c0c0c` (noir d'enseigne), muted `#55524b`, line `#cfcbc0`, accent `#c8141f` (rideaux rouges, photos 16 et 17), accent texte `#b4101a` ; nuit : ground `#0c0c0c`, muted `#b9b5ab`, accent `#ff4b55` ; rose de set de table `#d6247f` réservé (une apparition, phase 2). Curtain `#0c0c0c`. Références : enseigne et pylône (photo 14), rideaux (17), sets roses (10, 11). Pas de crème+terracotta : lait neutre + noir + rouge. Contrastes : ink/lait 18:1, muted/lait 7,6:1, muted/nuit 9,6:1, accent/nuit 6,3:1.
- **Typo** : une seule famille variable, Bricolage Grotesque 300 à 800 (Google Fonts, un fichier woff2 préchargé), rôles par graisse : display 800 interlettrage -0,03 à -0,045 em, interligne 0,88 à 0,95, `text-wrap: balance` ; corps 400/500 ; UI 600/700 en 13 à 14 px ; prix `tabular-nums`. Échelle fluide `--t-mega` (3,6 à 12 rem), `--t-xl`, `--t-l`, `--t-m`, `--t-body`, `--t-s`, `--t-xs`. Insécables « 24 € », « 11 h » (classe `nw`/U+00A0), vraies apostrophes.
- **Grille** : 12 colonnes (1 colonne au téléphone), lignes fortes à gauche (gutter) et à la colonne 6 (carte, maison), 4 humeurs d'espacement (`serre`, `normal`, `aere`, `entracte`). Règle de forme : angles vifs, seule exception la tache.
- **Mouvement (planifié, phase 2)** : easings `ease.inOut` pour les rideaux, `ease.out` pour les entrées ; stagger 40 ms ; hovers : CTA = remplissage rouge (balayage), nav = filet qui se déploie, lignes de carte = décalage de 1 rem + rouge ; liens texte soulignés. Repos : l'horloge du pied et la pastille de l'accueil respirent lentement (hors reduced motion). Transition de page : rideau noir (un panneau).
- **Plan de composition (accueil)** : poster (titre cols 1-7, photo en tache cols 8-12) ; énoncé (nuit) ; paire asymétrique jour/nuit (7 cols + 4 cols décalés) ; index de la journée (4 lignes) ; données (4 chiffres + 3 menus) ; bande de photos (scroll-snap) ; pied (23 : 45). Carte : en-tête, puis 4 blocs « heure » (titre collant cols 1-4, listes cols 6-12). Mobile 390 : titre 3,6 rem sur une ligne, photo en tache 26 rem, lignes d'index en 3 colonnes, bande à défilement, tête sans nav (bouton Appeler).
- **Test de généricité** : un modèle générique mettrait un héros plein cadre sombre avec 3 cartes de plats ; ici l'heure est le plan. Hero plein cadre remplacé par une tache, cartes remplacées par l'index horaire.

## Mouvement (phase 2, réalisé)
- **Module pilote** `src/motion/cadran.ts` : une variable, l'heure du service (progression de défilement 0 à 1 = 11:00 à 23:45, au quart d'heure). Elle écrit l'horloge de l'en-tête (`[data-horloge]`), fait tourner la tache de la marque comme une aiguille des heures (`[data-aiguille]`, 0,5° par minute, ± 6° au pointeur), fait tourner la tache du hero sur elle-même (`[data-cadran]`, 3° par seconde au repos + heure + pointeur, photo contre-tournée donc toujours droite) et fait battre les deux-points du pied « 23 : 45 » (`[data-deux]`) quand il est visible. La 404 épingle 23:45 (`data-state="1"`).
- **Moment signature** : l'heure qui avance au scroll (recette « Counter » de motion.md, appliquée à une heure réelle : les bornes 11:00 et 23:45 sont les horaires du restaurant) et la tache qui tourne. Au pied, l'en-tête affiche 23:45 au moment où paraît « 23 : 45 ».
- **Continuité** : pas de loader (décision phase 1). Transition de page = balayage d'aiguille : le rideau noir couvre l'écran par un masque conique de 0 à 360° (0,7 s, `ease.inOut`), puis se retire en continuant dans le même sens (0,7 s). Le menu mobile s'ouvre par le même balayage. Intro : h1 en mots (`data-split="words" data-intro`), la tache du hero se pose en tournant (-35° à 0°, échelle 0,78 à 1, 1,4 s, `ease.out`, enveloppe `[data-pose]` distincte de celle du pilote).
- **Micro-interactions (3 traitements)** : CTA = balayage d'aiguille rouge (masque conique `--cta` de 0 à 360°, 0,45 s), texte blanc ; nav et liens utilitaires = filet ou soulignement qui se trace, liens texte soulignés au repos ; lignes d'index = décalage de 1 rem, rouge, la flèche fait un tour (360°). Tout sous `(hover: hover)`, même état au `:focus-visible`, `:active` présent (CTA 0,97, ligne 0,5 rem).
- **Repos** : la tache du hero tourne à vitesse constante (pas de sinus, pas de point mort), l'aiguille de la marque suit le pointeur, les deux-points du pied battent la seconde. Tout est en pause hors écran (ScrollTrigger `onToggle`), à zéro en mouvement réduit.
- **Mouvement réduit** : ni Lenis, ni intro, ni rotation, ni battement ; l'horloge de l'en-tête reste du texte (mise à jour sans animation) ; rideau et menu sans balayage (masque à 360°).
- **Mobile 390** : bouton « Menu » (`aria-expanded`), overlay plein écran nuit hors du `<header>` (le `mix-blend-mode: difference` de l'en-tête ne s'y applique pas), heures décoratives devant chaque lien, CTA « Appeler » 44 px ; l'horloge de l'en-tête est masquée sous 40 rem (place).

## Sur-utilisation de la skill
1. Trois concepts notés, ancre, test de l'échange : § Trois concepts. 2. Aucun exemple travaillé (ni braise, ni pavage, ni cadre, ni solde, ni phrase unique) : le cadran horaire n'est pas dans concepts.md comme exemple. 3. Concept Card : § Concept Card, verbe « faire tourner ». 4. Concept au pied, carte, réservation, 404 : `Footer.astro:12`, `carte.astro` (blocs heure), `404.astro:7`. 5. Moment signature : la tache et l'heure qui avance (recette : phase 2). 6. Palette de 6 rôles + références : § Système. 7. Défauts évités : pas de crème+serif+terracotta, pas d'acide sur noir (rouge, 6,3:1), pas de dégradé, pas de verre, pas d'eyebrow sur chaque titre (un seul, « À table, en chiffres »), pas de 01/02/03, pas d'Inter/Fraunces/Playfair. 8. Test de généricité : § Système. 9. Détails : `::selection` rouge, focus rouge 3 px, favicon = la tache (`public/favicon.svg`), OG composée (`public/og.png`), pied « 23 : 45 », 404 dans le concept.
10. Police : Bricolage Grotesque, 1 fichier. 11. Échelle fluide unique `tokens.css`. 12. Display : interlettrage négatif, balance. 13. Corps 16 à 18 px, UI 13 à 14 px AA. 14. Typographie française : insécables, apostrophes, guillemets.
15. Grille 12 colonnes, deux lignes fortes ; pas de cadre quatre coins (justifié : la tache remplace le cadre). 16. Une famille de section au plus une fois par page. 17. Hero : nom, cuisine, téléphone en 3 s (mesuré : CTA à y = 620 à 1440×900). 18. Mobile 390 recomposé (mesuré : CTA y = 659 et 722, scrollWidth 390).

Phase 2 :
19. Menu mobile accessible : `src/components/Header.astro` (bouton `aria-expanded`, `role="dialog"`, `aria-modal`), `src/motion/menu.ts:18-19` (Tab piégé, Échap), retour du focus vérifié (script Playwright : « echap false false focus true », 7 Tab restent dans le menu). [x]
20. Engine verbatim (copié en phase 1), `astro.ts`, `transition:persist="curtain"` (`Base.astro:71`), `transition:animate="none"` (`Base.astro:35`) ; ni `#gl` ni `#cursor` (pas de GL, curseur natif). [x]
21. Une horloge : grep `addEventListener('scroll'` et `requestAnimationFrame` hors `src/engine/` = 0 ; tout par `gsap.ticker` (`cadran.ts`, `idle.ts`). [x]
22. Code de page dans `onPage()` avec nettoyage : `cadran.ts:47` et `:90`, `menu.ts`, `setup.ts` (intro). [x]
23. Aucune CSS `transform` sur élément GSAP : `site.css` ne contient aucun `transform:` ; rotations par la propriété `rotate` (pilote) ; `[data-pose]` sans transform CSS. [x]
24. Module pilote `src/motion/cadran.ts` avec `startIdle()` (`idle.ts:8`) et pointeur (`idle.ts:14`, ± 6° et ± 12°). [x]
25. Loader décidé : non (Concept Card, restaurant de route) ; aucun composant ni `role="status"`. [x]
26. Transition du concept : balayage conique, 0,7 s par sens (`setup.ts`). Mesure `d-90..92` en phase 3. [x]
27. Intro `data-intro` sur chaque h1 (`data-split="words"`), tache du hero qui se pose ; mesure du premier frame en phase 3. [x]
28. Épinglages : aucun pin ni scrub (les titres de la carte sont `position: sticky` CSS). Sans objet. [x]
29. Repli statique : sections `.jour`/`.nuit` peintes en CSS, rien n'est caché sans `.motion` (`engine.css:67`) ; contrôle réduit : 0 élément caché, `rotate` vide. [x]
30. Copies décoratives `aria-hidden` : horloge de l'en-tête, heures du menu, « 23 : 45 » du pied et de la 404 ; aucun titre dupliqué. [x]
31. Une famille d'easing (`ease.out` entrées, `ease.inOut` rideau et menu, `cubic-bezier(0.215, 0.61, 0.355, 1)` = power3.out pour les hovers CSS), Timing de motion.md, stagger 35 ms (mots) et 50 ms (menu). [x]
32. Un traitement par rôle, 3 au total, dans le verbe « faire tourner » (balayage, aiguille de la flèche) : § Mouvement. [x]
33. Hover sous `@media (hover: hover)` (`site.css:213`), même état au `:focus-visible`, visible en réduit (transitions coupées, états conservés). [x]
34. Liens texte soulignés au repos (`.lien`, `.pied__tel`). [x]
35. `hover.noHoverChange` : phase 3 (report.json). [ ]
36. `idleMotion` : tache du hero à 3°/s mesurée (rotate 8,3° puis 12,8° après 1,5 s, script Playwright) ; `report.json` en phase 3. [ ]
37. Curseur natif visible, aucun contenu ne dépend du hover (menu au clic, lignes lisibles au repos). [x]
38. Pas de blur, pas de `box-shadow` au scroll, pas de `will-change`. [x]
39. Réduit : ni Lenis (engine), ni GL, ni scrub, ni loader ; `hidden` = 0 mesuré ; `report.json` en phase 3. [x]
40. GL : sans objet, décision écrite (Concept Card). [x]
41. Sans objet (pas de GL). [x]
44. Skip link en premier (`Base.astro`), focus 3 px rouge, blanc dans l'en-tête (difference). [x]
45. Contraste : blanc sur rouge de balayage #c8141f ≈ 5,9:1 ; à mesurer en phase 3. [ ]
46. Texte réel partout (SplitText), rien dans un canvas. [x]
47. Cibles : « Menu » 46 × 44, « Appeler » 44 px de haut, liens du pied 44 px ; mesure complète en phase 3. [x]
