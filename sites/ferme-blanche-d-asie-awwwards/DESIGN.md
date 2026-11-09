# DESIGN : La Ferme Blanche d'Asie, variante awwwards « Le plateau tournant »

## Brief
- Sujet : restaurant asiatique et chinois, Allée de la Maison Blanche 20, 5020 Malonne (Namur). Ouvert 7 jours sur 7, midi et soir. Source : `data/restaurants/ferme-blanche-d-asie/` (donnees.json, dossier.md, photos/).
- Publics : midi (menus abordables), soir et week-end (familles, tables rondes), groupes et fêtes (salle V.I.P. 26, salle privée environ 300), habitués qui commandent sur tablette.
- Métier du site : réserver (téléphone d'abord), consulter la carte numérotée de 56 plats, venir (parking privé).
- Ressources : 10 photos de salles et d'extérieur (filigrane photographe recadré sous 855 px), 2 images de cuisine sombres, logo 200 px (non utilisé, trop petit), carte complète avec prix, menus de fêtes transcrits.
- Contraintes : statique Astro, `base` /ferme-blanche-d-asie/awwwards/, pas de backend de réservation (tel:, mailto:), français, vouvoiement.
- Hypothèses : aucune donnée inventée. Histoire, équipe, chef, année : inconnus donc absents. Aucun `placeholder`.

## Trois concepts
| | A. Le plateau tournant | B. La cour de ferme | C. Le bon numéro |
|---|---|---|---|
| Territoire | matière du métier (service à la chinoise) | lieu (ferme blanche, Malonne) | système formel (carte numérotée 1 à 200) |
| Phrase | La page est une table ronde : tout se pose au centre et tourne vers vous. | Le site est le plan d'une cour blanche, chaque salle un bâtiment. | La carte est la seule structure : chaque plat a son numéro, la page se lit en numéros. |
| Règle de mise en page | le cercle est l'unité (disques, anneaux, ronds de catégorie) ; le reste est orthogonal | plan au sol, cartouches | colonne de numéros fixes |
| Verbe | tourner d'un cran | traverser | cocher |
| Palette | laque brune, ivoire, or des chaises | blanc chaux, ardoise, vert bambou | encre sur papier de carte |
| Signature | anneau de texte et disques qui tournent avec le défilement (motion.md, pilote unique `--rot`) | plan interactif des salles | tablette fictive (interdit : faux écran) |
| Ancre | table ronde à plateau tournant (photos 09 et 10) | bâtiment blanc et kiosque (photos 04, 05) | numérotation de la carte |
| Originalité / adéquation / faisabilité / portabilité | 4 / 5 / 5 / 2 | 3 / 4 / 3 / 3 | 3 / 3 / 5 / 3 |

Test de l'échange : A ne tient qu'avec un restaurant à table ronde et plateau tournant (la phrase ne se déplace pas sur une pizzeria). B tient avec n'importe quelle ferme, C avec n'importe quelle carte numérotée. **Choix : A**, raison : seul concept ancré sur une photo réelle du client, tenable de la carte au pied et à la 404. Détails repris des écartés : les numéros de plats de C (colonne `plat__num`), la « ferme blanche » de B (sections ivoire = murs blancs).

## Concept Card
- **Idée** : le site est une table ronde, les plats se posent au centre et on les fait tourner pour se servir.
- **Métaphore** : le plateau tournant de la salle à table ronde ; on passe, on se sert, on repasse.
- **Signature (et recette)** : anneau de texte qui tourne autour du disque photo du hero et des ronds de catégorie, piloté par une seule variable `--rot` liée au défilement (motion.md, driver unique, repos : rotation lente). Phase 2.
- **Émotion (3 premières secondes)** : chaleur de salle laquée, un disque doré qui tourne doucement : on est déjà à table.
- **Verbe** : tourner d'un cran (rotation par paliers qui ralentit en fin de course, `ease.inOut`).
- **Capture** : le hero, titre ivoire sur laque et disque de la salle ronde cerclé d'or sous son anneau de texte.
- **Ancre** : la salle à table ronde et plateau tournant (photos du client 09 et 10) et les 56 plats numérotés.
- **Théâtre** : loader non (restaurant de quartier, la réservation prime, 3 secondes pour agir) ; GL non (le disque photo et l'anneau SVG portent le concept sans canvas).

## Système
- **Palette** (rôle, hex, contraste) : ground `#1c1410` laque des poutres et nappes ; ink `#f2e8d2` carrelage ivoire (14,6:1) ; muted `#c2b296` (9,3:1) ; line `#4d3a2d` ; accent `#e3a924` or des chaises (9:1 sur ground) ; accent texte sur ivoire `#a8281d` rouge du médaillon de sol (6,3:1) ; curtain `#a8281d`. Sections « ferme blanche » : fond ivoire, encre laque. Références réelles : photos 01, 08, 09 (chaises, nappes, médaillon rouge au sol).
- **Défauts évités** : pas de crème+serif+terracotta (l'ivoire n'est que le second ton d'une alternance laque/ivoire, accent or et rouge laque, serif Zodiak), pas d'acide sur noir, pas de dégradé violet ni de verre dépoli, pas d'eyebrow sur chaque titre (seulement hero et en-têtes de page), pas de 01/02/03 décoratifs (les numéros de la carte sont les vrais).
- **Typo** : Zodiak 700 (Indian Type Foundry, Fontshare) display, Hanken Grotesk 400 à 700 (Google Fonts) texte et UI. Échelle fluide `--t-mega` 3,4 à 11,5 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body` 16 à 18 px, `--t-s` 15 px, `--t-xs` 13 px. Display : interlettrage -0,03 em, interligne 0,95, `text-wrap: balance`. Prix en `tabular-nums` seulement pour les numéros ; prix « 4,90 € » avec U+00A0. 2 fichiers de police, 2 préchargés.
- **Grille** : 12 colonnes (une colonne au téléphone), gouttière fluide, deux lignes verticales fortes (col. 7 et col. 9). Humeurs d'espacement : `--serre`, `--normal`, `--aere`, `--entracte`. Rayon : 0 partout, 50 % pour les disques (règle unique : le cercle appartient au plateau).
- **Mouvement (planifié, phase 2)** : easing `ease.inOut` pour les rotations, `ease.out` pour les révélations ; durées 0,35 s hover, 0,7 s transition, rotation scroll 1 tour par page. Hover : CTA (le fond or tourne d'un quart), nav (filet or), plats et ronds (le rond se remplit d'or), liens (soulignement or). Repos : l'anneau tourne à 6 degrés par seconde, immobile en reduced motion.
- **Plan de composition** : hero poster (titre + disque), bande horaires (données), énoncé asymétrique sur ivoire (statement), quatre plateaux (index de ronds, strip au téléphone), mur de salles (3 vignettes inégales, strip au téléphone), ferme (média + texte), avis (citations), pied final ivoire.
```
HERO   [titre La Ferme / Blanche / d'Asie ......][ anneau + disque ]
BANDE  [Tous les jours][lun-ven][sam][dim]
ÉNONCÉ (ivoire) [phrase géante .....]  [texte][photo table ronde]
PLATEAUX [(4)][(20)][(31)][(5)]
MUR (ivoire) [photo large][portrait][portrait]
FERME  [photo large ..........][titre + adresse]
AVIS   [citation][citation]
PIED (ivoire) [Servez-vous.] [Venir][Horaires][Contact] [CTA]
```
- **Mobile 390** : titre `--t-mega` 3 lignes, CTA empilés, disque centré 30 rem max, strips `overflow-x` + `scroll-snap` (plateaux, mur), header réduit à marque, La carte, Réserver.
- **Test de généricité** : un modèle générique ferait « sushi noir et rouge, lanternes, kanji géants ». Changé : pas de rouge dominant ni de kanji décoratif, alternance laque/ivoire tirée des photos, cercle comme seule forme, numéros de carte réels.

## Pages et 404
`/` accueil, `/carte/` (index numéroté, menus), `/a-propos/` (la maison : salles, pratique), `/reservation/` (tel, mailto, horaires, adresse, groupes), 404 « Plateau vide. » avec un rond 404.

## Sur-utilisation de la skill (phase 1)
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus. [x]
2. Aucun exemple travaillé de concepts.md (ni braise, ni pavage, ni gril, ni cadre, ni solde, ni phrase unique) : concept A hors liste. [x]
3. Concept Card au format exact, verbe « tourner d'un cran » compris. [x]
4. Concept au pied (mot « Servez-vous. »), carte (ronds de catégorie, numéros), réservation (blocs en rondeur de service), 404 (rond 404, « Plateau vide. ») : `src/styles/site.css` `.rayon__rond`, `.erreur__rond`, `.pied__mot`. [x]
5. Un moment signature et sa recette : anneau `--rot` (phase 2). [x] planifié
6. Palette 4 à 6 rôles, références réelles : `src/styles/tokens.css:13-24`. [x]
7. Aucun des 8 « defaults to avoid » : voir Système § Défauts évités. [x]
8. Test de généricité : ci-dessus. [x]
9. Détails 7 vers 8 : sélection `::selection` (engine.css), focus en accent (`:focus-visible` or), favicon de l'identité (`public/favicon.svg` anneau et point rouge), OG composée (`public/og.png`, capture du hero), pied composition finale, 404 dans le concept. [x]
10. Polices : Zodiak 700 et Hanken Grotesk, `public/fonts/` (2 fichiers), préchargées dans `Base.astro`. [x]
11. Échelle fluide unique, grands sauts : `tokens.css` `--t-*`. [x]
12. Display réglé : `.display` dans `site.css` (-0,03 em, 0,95, balance). [x]
13. Corps 16 à 18 px, UI 13 à 15 px, interligne 1,5. [x]
14. Typographie française : U+00A0 dans les prix (`eur()`), apostrophes ’, « » dans les avis. [x]
15. Grille 12 colonnes, lignes fortes, cadre quatre coins : non retenu (justifié : le cercle tient lieu de cadre). [x]
16. Une famille de section au plus une fois par page : accueil (poster, données, statement, index de ronds, mur, média+texte, citations, pied). [x]
17. Hero en 3 secondes : mesures à 1440×900 et 1280×720, CTA dans la fenêtre (y 767 et 665). Tablette 1024×768 : CTA sous la ligne de flottaison (y 818), accepté. [x]
18. Mobile 390 recomposé : `site.css` blocs `max-width: 56rem` et `48rem`, strips snap. [x]

## Mouvement réalisé (phase 2)
- **Pilote** `src/motion/plateau.ts` : une variable, l'angle du plateau = repos (3 degrés par seconde) + défilement (un tour par page, crans de 15 degrés rattrapés en ralentissant) + pointeur (penche de 12 degrés au plus ; au toucher, vitesse de défilement) + intro (un tiers de tour). Écrite en `--rot` sur les seuls porteurs visibles `[data-rot]` (IntersectionObserver) : anneau du hero, sceau de l'en-tête, ronds de catégorie (accueil, carte, sens alterné), rond 404 (rapport 3), anneau du menu. Les ronds symétriques portent un point d'orbite (`.orbite::before`) pour que la rotation se voie sans faire tourner les chiffres.
- **Intro** (chaque page) : le plateau arrive d'un tiers de tour, le texte de l'anneau s'allume, le disque se pose (`scale` 0,9 vers 1, sans opacité : photo LCP peinte d'emblée) ; h1 jamais caché ; `hero__lieu` et `page-lieu` en `data-reveal="fade" data-intro`.
- **Reveals** : `data-split="lines"` sur les h2 d'affichage, `data-reveal="clip"` sur les photos hors flottaison, `up` sur les avis ; aucun reveal sur un bloc qui contient un lien.
- **Transition** : rideau rouge en disque qui s'ouvre depuis le point de clic (Entrée : centre) pendant qu'un anneau d'or tourne d'un quart, 0,6 s par sens.
- **Hovers, trois rôles** : CTA, le fond tourne d'un quart autour du coin bas gauche (`conic-gradient` + `@property --a`, 0,45 s) ; liens texte et nav, soulignés au repos (1 px), un trait d'accent de 2 px fait le tour de gauche à droite ; ronds de catégorie, le rond se remplit d'or en un tour complet (0,6 s). Tous sous `(hover: hover)`, mêmes états sur `:focus-visible`, `:active` en `scale: .97` ou opacité.
- **Menu mobile** (< 40 rem) : bouton « Menu » `aria-expanded`, `<dialog>` modal plein écran (`.panneau`, pour ne pas croiser `.menu` de la carte), premier lien `autofocus`, Échap ferme, focus rendu au bouton, un clic de lien ferme avant le rideau. « Réserver » reste dans l'en-tête (44 px).
- **Curseur** : pas de follower (décision : le plateau suffit, aucun libellé utile) ; curseur natif seul.
- **Mouvement réduit** : pilote non démarré (`--rot` vide, points en position de repos), ni Lenis ni scrub, reveals inactifs (engine), transition en fondu court, transitions CSS à 0,01 ms (états de survol visibles instantanément).

## Sur-utilisation de la skill (phase 2)
19. Menu mobile accessible : `src/components/Header.astro` (dialog `#menu`, `aria-expanded`, `autofocus`), `src/motion/menu.ts` ; mesuré : ouvert 390×844 plein écran, focus « Accueil », Échap ferme, focus rendu à « Menu », `aria-expanded` false. [x]
20. Engine verbatim (copie le-royal), `src/engine/astro.ts`, `transition:persist` sur `#curtain` (`Base.astro:74`), `transition:animate="none"` sur `<html>` (`Base.astro:37`) ; ni `#gl` ni `#cursor` (sans objet, décisions écrites). [x]
21. Une horloge : `gsap.ticker` dans `plateau.ts` ; grep `addEventListener('scroll'|requestAnimationFrame` hors engine : aucun résultat. [x]
22. Code de page dans `onPage()` avec nettoyage : `plateau.ts` (`io.disconnect`), `menu.ts` (listeners retirés, dialog fermé). [x]
23. Aucune transform CSS sur élément GSAP : l'anneau tourne par la propriété `rotate: var(--rot)` et GSAP n'anime que l'opacité de son `<text>` ; `.plateau__disque`, `.curtain__panel`, `.curtain__anneau`, `.panneau__anneau` sans transform CSS (grep `transform` dans site.css : seulement `text-transform`). [x]
24. Module pilote avec `startIdle` et pointeur : `src/motion/plateau.ts`, appelé une fois par `setup.ts`. [x]
25. Loader : non (décision phase 1, restaurant de quartier, réservation d'abord) ; aucun composant ni `role="status"`. [x]
26. Transition du concept 0,6 s par sens (`setup.ts`) ; mesurée : clic accueil vers carte, rideau masqué et h1 « La carte » en moins de 0,7 s. [x]
27. Intro : plateau d'un tiers de tour, anneau qui s'allume, disque qui se pose ; premier frame = hero complet (h1, accroche, CTA, photo peints). [x]
28. Épinglages : aucun (sans objet). [x]
29. Repli statique : `html:not(.motion)` remet les points d'orbite à 0 degré ; anneau, ronds, photos peints ; mesuré en réduit : 0 élément caché. [x]
30. Copies décoratives : anneau SVG et « Servez-vous. » `aria-hidden`, aucun titre dupliqué. [x]
31. Une famille d'easing (expo de l'engine ; `--e-out`, `--e-inout` en CSS), stagger engine 80 ms (lignes), menu 50 ms. [x]
32. Trois traitements par rôle, tous du verbe « tourner » : quart de tour (CTA), tour complet (ronds), trait qui fait le tour (liens). [x]
33. Hover sous `(hover: hover)`, mêmes états sur `:focus-visible`, visibles en réduit (transition 0,01 ms). [x]
34. Liens texte soulignés au repos (`.lien`, `.lien-util`, `.pied__tel` : trait 1 px). [x]
35. `noHoverChange` : à lire au report.json de la phase 3 ; lien KYW souligné au survol (`site.css`). [ ] phase 3
36. Repos : `idleMotion` attendu true ; diff mesurée 0,77 % (1440) et 0,93 % (390) en 1,2 s à 4 degrés par seconde, ramené à 3 pour rester sous le seuil `settled`. [ ] report.json en phase 3
37. Curseur natif visible, aucun contenu au survol seul, menu au toucher. [x]
38. Pas de blur animé ni de `box-shadow`, aucun `will-change` posé. [x]
39. Réduit : `lenis` absent, `--rot` vide, 0 élément caché (mesuré). [x]
40. GL : sans objet, décision écrite (Concept Card), engine sans lignes `// GL`. [x]
41. Sans objet. [x]
44. Skip link en premier (`Base.astro`), anneau de focus en accent (or sur laque, rouge sur ivoire). [x]
45. Contraste : CTA or texte laque 9:1, rempli ivoire texte laque ; CTA sur ivoire laque/ivoire 14,6:1, rempli rouge `#a8281d` texte ivoire 6,3:1. À confirmer par axe en phase 3. [ ]
46. Texte réel partout, aucun canvas. [x]
47. Cibles : « Réserver » d'en-tête 44 px, « Menu » 44 px (mesurés à 390), CTA 48 px. [x]
