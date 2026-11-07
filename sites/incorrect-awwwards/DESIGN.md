# INCORЯECT, variante awwwards : « Le demi-tour »

## Brief
- Sujet : INCORЯECT, pizzeria rock-n-roll d'Alex et Estelle, rue Haute Marcelle 35, Namur. Pizza au levain créative, pâte reposée 48 h (Le Fooding), farine Bodson (L'Avenir), bières craft, cuisine très végétale.
- Publics : le soir (cœur de l'activité), samedi midi, curieux venus de la presse (L'Avenir, ELLE, Le Fooding), habitués. Métier : réserver (Barestho), appeler, lire la carte (le PDF du site actuel est le point faible).
- Ressources : 3 photos exploitables (salle, pizza au four, table), logo Я, carte complète. Pas de portraits, pas d'avis, pas d'e-mail public, horaires divergents.
- Contraintes : site statique Astro sous `base` /incorrect/awwwards/, aucun backend, réservation par lien externe et `tel:`.
- Hypothèses : horaires du Fooding affichés « à confirmer » ; aucun contenu fictif (aucun `placeholder`) ; manque de photos compensé par la typographie et par la réutilisation cadrée des trois images.

## Trois concepts
| Concept | Territoire | Phrase | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|
| **A. Le demi-tour** (retenu) | nom, graphie | Une lettre est fausse, le reste est juste : le Я retourné, comme la pizza qu'on tourne d'un demi-tour au four | 5 | 5 | 4 | 2 |
| B. Quarante-huit heures | matière (levain) | Le site lève comme la pâte : tout se lit en heures de repos | 4 | 4 | 3 | 3 |
| C. Face B | culture (rock) | La carte est une setlist, les plats des morceaux | 3 | 4 | 4 | 4 |

Test de l'échange : B et C tiennent avec une autre pizzeria (levain, musique). A n'existe que pour ce restaurant (le logo à R inversé est son nom). Choix : A. De B on garde un détail (le chiffre « 48 h » en donnée), de C rien. Ancre : le R inversé du logo (fait réel, `photos/06-logo.svg`).

## Concept Card
- **Idée** : un nom écrit « incorrect » avec une seule lettre à l'envers ; tout le site est correct, sauf un r par mot de titre.
- **Métaphore** : on tourne la pizza d'un demi-tour sur la pelle à mi-cuisson ; le Я fait son demi-tour de la même façon.
- **Signature (et recette)** : le Я du mot INCORЯECT pivote de 180° (rotateY) à l'entrée et au survol, puis revient ; recette `motion.md` (transform individuel, `ease.inOut`), phase 2.
- **Émotion (3 premières secondes)** : un sourire complice, « ils osent », avec un nom énorme et un four.
- **Verbe** : retourner.
- **Capture** : le hero : INCORЯECT pleine largeur, la pizza sortant du four à côté.
- **Ancre** : logo à R inversé (INCORЯECT, graphie du site actuel).
- **Théâtre** : loader non (un site de restaurant doit montrer l'action en 3 s, la transition de page suffit) ; GL non (3 photos, aucune matière qui l'exige ; la typographie fait l'image).

Le concept vit partout : titres de page (`LA CAЯTE`, `HISTOIЯE`), pied (`À L'ENDЯOIT ?` répond à la 404), carte (titres de catégories), réservation, 404 (« Cette page est incorrecte », bouton « Revenir à l'endroit »). Règle : dans chaque mot d'un titre d'affichage, le dernier r est retourné (`src/lib/retourne.ts`).

## Système
- **Palette** : ground #0d1a13 (vert bouteille du site actuel), ink #ece9e1 (blanc du mur de la salle), muted #a3b1a8, line #2b3e33, accent #ff5b35 (croûte léopard), curtain #ff5b35. Sections « mur » : fond #ece9e1, encre #0d1a13, accent brique #b8341a (façade et briques de la salle). Références : le fond vert du site incorrect.pizza, les photos 01 et 02.
- **Typo** : Archivo variable (wdth 62 à 125, wght 100 à 900) : affichage 900 condensé 62 % en capitales, texte 400 largeur normale, intertitres 700 à 800 largeur 72 à 80 % ; Martian Mono 400 pour les métadonnées, prix, légendes. Échelle fluide `--t-mega` (poster, 22,4 vw) `--t-xl` `--t-l` `--t-m` `--t-body` `--t-s` `--t-xs`. Display : interligne 0,82 à 0,9, interlettrage -0,012 à -0,02 em, `text-wrap: balance`. Prix `tabular-nums`, insécables « 14,50 € », « 18 h 30 ».
- **Grille** : 12 colonnes (une colonne au téléphone), lignes fortes à la colonne 5 (carte) et 7 (accueil, réservation), 4 humeurs d'espacement (serre, normal, aéré, entracte). Rayon 0 partout.
- **Mouvement (planifié)** : famille `ease.out|inOut` de l'engine ; verbe retourner : le Я pivote ; CTA : la croûte monte (fait en CSS) ; nav et liens : soulignement qui se dessine ; utilitaires : couleur. Repos : le Я du hero se balance d'un quart de tour toutes les quelques secondes (phase 2) ; transition de page : volets de croûte.
- **Composition** : accueil = poster (hero), statement (mur), média plein cadre, données (3 chiffres), paire asymétrique (photo collante + index). Carte = en-tête, index sticky (titre à gauche, liste à droite), photo, mur de colonnes (« Autour des pizzas »). Histoire = statement, deux fiches, plein cadre, mur (levain), liste de presse. Réservation = deux colonnes (agir, horaires), mur (avant de venir). Mobile 390 : une colonne, mot-poster à 22 vw, listes à une colonne, mur en une colonne.
- **Test de généricité** : « un modèle générique atterrirait-il ici ? » Oui sur le hero (grand mot + photo) : le mot est le logo retourné, la photo est choisie pour le geste du four. Oui sur les listes d'index : titres de catégorie collants à gauche, prix en mono accent. Pas de carte en grille de cartes, pas d'eyebrow sur chaque titre.

## Sur-utilisation de la skill
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus. [x]
2. Aucun exemple travaillé de concepts.md (braise, pavage, gril, cadre, solde, phrase unique). [x]
3. Concept Card au format, verbe « retourner ». [x]
4. Concept au pied (`Footer.astro`, `À L'ENDЯOIT ?`), carte (`carte.astro` h2), réservation, 404 (`404.astro`). [x]
5. Moment signature et recette : le Я pivote (rotateY 180°), fait en phase 2 (`src/motion/demitour.ts`). [x]
6. Palette 6 rôles, références nommées. [x]
7. Défauts à éviter : crème + serif + terracotta écarté (grotesque condensé, vert bouteille) ; pas d'acide sur noir (orange croûte, 5,3:1) ; ni dégradé violet, ni verre dépoli ; eyebrow absent des titres ; chiffres décoratifs absents ; polices hors liste de réflexes. [x]
8. Test de généricité : ci-dessus. [x]
9. Détails 7 vers 8 : sélection aux couleurs du système (engine.css), focus dans l'accent (`:focus-visible`), favicon Я (`public/favicon.svg`), OG composée depuis le hero (`public/og.png`), pied en composition finale, 404 dans le concept. [x, à vérifier en phase 3]
10. Polices : Archivo (variable) + Martian Mono, 2 fichiers, 1 préchargé (`Base.astro`). [x]
11. Échelle fluide unique `tokens.css`, sauts mega 22 vw à body 1 rem. [x]
12. Display réglé (interligne, interlettrage, balance). [x]
13. Corps 16 à 19 px, UI 12 à 14 px. [x, contrastes à mesurer en phase 3]
14. Typographie française : insécables, apostrophes courbes, « » absents (aucune citation). [x]
15. Grille 12 colonnes, lignes fortes ; cadre quatre coins non retenu (le poster plein cadre fait office). [x]
16. Une famille de section au plus une fois par page. [x]
17. Hero en 3 s : nom, cuisine, réserver, appeler. [x]
18. Mobile 390 recomposé : mesuré sans débordement (scrollWidth 390), `.display` à gauche ≥ 16 px. [x]

## Mouvement (phase 2, fait)
- **Pilote** `src/motion/demitour.ts` : une variable, l'angle de chaque Я (`rotationY`) = tour (entrée, survol ; 0 = Я, 180 = R à l'endroit) + vitesse de défilement Lenis (± 50°) + pointeur et repos (h1 seulement). Entrée d'un titre : demi-tour aller-retour (0,7 s, `ease.inOut`, pause 0,35 s) ; survol ou focus d'un titre ou de la marque : le r reste à l'endroit ; `data-endroit` (404, « Revenir à l'endroit ») remet toute la page à l'endroit.
- **Repos** : `startIdle()` après 1,4 s sans geste, le Я du h1 se balance de ± 26° (période 3,4 s) ; écrit seulement si visible (IntersectionObserver), rien en mouvement réduit.
- **Transition** (`setup.ts`) : volet croûte puis volet vert bouteille portant un grand R qui fait son demi-tour ; aller 0,85 s, retour 0,95 s.
- **Intro accueil** : titre et texte peints au premier rendu (LCP) ; le Я fait son demi-tour, la photo du four se pose (`scale` 1,1 vers 1, 1,6 s).
- **Reveals** : `data-split="lines"` sur tous les titres d'affichage (sauf h1 de l'accueil et 404), `data-split="chars"` sur le mot du pied, `data-reveal="up"` sur chiffres et fiches (stagger 60 ms), parallaxe ± 7 % sur l'image dans son cadre (`Photo parallax`, marge `scale: 1.16`). Pas de loader, pas de GL, pas de curseur suiveur, un seul `data-magnetic` (CTA du hero).
- **Menu mobile** (`menu.ts`, `Header.astro`) : sous 40 rem, Carte et Histoire passent dans un `<dialog>` plein écran ; « Réserver » reste visible (44 px).

## Sur-utilisation de la skill (phase 2)
19. Menu mobile : `<dialog>` modal (focus piégé, Échap natif), `aria-expanded` tenu par `menu.ts`, `autofocus` sur le premier lien, focus rendu au bouton. Mesure 390 : ouvert 390×800, focus « Accueil » ; Échap : fermé, `aria-expanded=false`, focus « Menu » ; lien du menu : fermé avant la transition, arrivée sur /histoire/. Sans JS : liens visibles (`html.js` conditionne le masquage). [x]
20. Engine verbatim (`src/engine/`), `astro.ts`, `transition:persist="curtain"` (`Base.astro:75`), `transition:animate="none"` (`Base.astro:39`) ; pas de `#gl` ni de `#cursor` (décisions). [x]
21. Une horloge : `grep addEventListener('scroll')|requestAnimationFrame` dans `src/motion`, `src/pages`, `src/components` = 0 ; pilote sur `gsap.ticker` (`demitour.ts:105`). [x]
22. Code de page dans `onPage()` avec nettoyage (`demitour.ts:34`, `menu.ts:6`, `setup.ts:42`) : ticker retiré, observateur et écouteurs défaits, tweens tués. [x]
23. Aucune CSS `transform` sur un élément animé par GSAP : `.r` et `.curtain__r` en `scale` individuel (GSAP l'absorbe et écrit `scale: none`, vérifié), CTA `:active` et `::before` en `translate`. [x]
24. Module pilote avec `startIdle` (`demitour.ts:19`) et pointeur (`pointeur.lisse * 40`). [x]
25. Loader : non (Concept Card), aucun `#loader` ni `role="status"`. [x]
26. Transition du concept ≤ 1 s par sens : 0,85 s et 0,95 s (`setup.ts`). [x]
27. Intro : premier frame = poster peint (h1 sans `data-intro`), le Я fait son demi-tour dans l'intro (`intro.add`), photo qui se pose. [x]
28. Épinglages : aucun pin GSAP ; titres de catégorie et photo du trio en `position: sticky` CSS. [x, sans objet]
29. Repli statique : sans `.motion`, rien n'est caché, Я immobile, marque qui se remet à l'endroit au survol par CSS (`html:not(.motion) .entete__nom:hover .r`). Mesure réduit sur /carte/ : `motion=false`, `lenis=false`, 0 élément caché. [x]
30. Copies décoratives `aria-hidden` : marque du menu, R du rideau (rideau `aria-hidden`), mot du pied ; aucun titre dupliqué. [x]
31. Une famille d'easing (`ease.inOut|out|soft`), durées du tableau Timing, stagger 50 à 60 ms. [x]
32. Traitements par rôle : CTA (croûte qui monte), nav et liens (trait qui se dessine ou s'épaissit), utilitaires (couleur, soulignés au repos), plus le verbe (la marque et les titres se remettent à l'endroit). [x]
33. Hover sous `@media (hover: hover)`, même état sur `:focus-visible`, visible en réduit (CSS seule) ; `:active` sur CTA et liens. [x]
34. Liens texte soulignés au repos (`.lien`, `.lien-gros`, `.lien-util`). [x]
35. `hover.noHoverChange` : phase 3 (`report.json`). [ ]
36. Repos : `startIdle`, ± 26° sur le h1 ; `idleMotion` à confirmer en phase 3. [x code]
37. Curseur natif visible, pas de suiveur ; au toucher, aucun survol requis (menu au bouton, pointeur ignoré si `isTouch`). [x]
38. Aucun blur animé, aucun `box-shadow` au scroll, aucun `will-change`. [x]
39. Réduit : ni Lenis, ni GL, ni scrub, ni loader (mesuré) ; `reduced.*` en phase 3. [x code]
40. GL : sans objet, décision écrite (Concept Card), aucune ligne `// GL` dans l'engine. [x]
41. Sans objet (pas de GL). [x]
44. Skip link en premier (`Base.astro`), focus dans l'accent ; preuve clavier en phase 3. [x code]
45. Contraste AA : phase 3. [ ]
46. Texte réel partout (SplitText sur du texte, aucun canvas). [x]
47. Cibles : « Réserver » et « Menu » 44 px à 320 à 390 (mesuré), CTA 52 px ; mesure complète en phase 3. [x code]
