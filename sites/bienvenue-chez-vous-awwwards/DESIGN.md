# DESIGN.md : Bienvenue chez vous (variante awwwards)

## Brief
- **Sujet** : Bienvenue chez vous, table de chef-patron (Cédric Delsaut) au premier étage d'une maison de maître, rue Pépin 33, Namur. Repas en « escales » sur réservation, boutique d'artisans, traiteur. Depuis 2002. Source : `data/restaurants/bienvenue-chez-vous/`.
- **Publics** : habitués et couples du soir (réservent par téléphone), déjeuners d'affaires du midi (formule 49 €), curieux et touristes qui ne trouvent aujourd'hui ni téléphone, ni adresse, ni horaires sur le site Wix.
- **Métier du site** : réserver (tel), venir (adresse, étage), lire la carte du mois et les formules.
- **Ressources** : 24 photos de plats de qualité (fonds blancs, sauces vertes, fleurs), façade, enseigne rouge, carte de visite. Pas de photo du chef ni de la salle. Ton personnel du chef.
- **Contraintes** : statique, `base=/bienvenue-chez-vous/awwwards/`, noindex, pied KYW.
- **Hypothèses** : téléphone et horaires de sources tierces (G&M, Restaurant Guru) donc à confirmer ; prix des plats non publiés (aucun inventé) ; tarif du mercredi ambigu (non affiché en euros). Voir RAPPORT.md en phase 3.

## Trois concepts
| | A. Escales | B. Au premier étage | C. L'assiette blanche |
|---|---|---|---|
| Territoire | Le menu du restaurant (grignotages, escales, douceurs, Voyage Signature) | Le lieu : maison de maître, façade, escalier, étage | La matière : dressage, assiette ronde, couleur sur blanc |
| Phrase | Le site se lit comme le repas : une route, des escales | On monte, étage par étage, chez le chef | Chaque photo est une assiette, tout le reste est la nappe |
| Règle de mise en page | Une ligne verticale (la route) traverse chaque page, chaque section est une escale posée sur elle | Sections empilées comme des étages numérotés | Cadres ronds, grands vides blancs |
| Verbe | Voyager (servir) | Monter | Dresser |
| Signature | Le point « escale » se remplit au passage, l'assiette s'ouvre en cercle | La façade glisse vers le haut | L'assiette se pose |
| Ancre | « Le Repas, 4 escales, 69 € » : le mot est celui de la carte | 33 rue Pépin, premier étage, depuis 2020 | Le dessert smiley aux fraises |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 4 / 5 / 4 / 2 | 4 / 4 / 3 / 3 | 3 / 4 / 4 / 5 |

**Test de l'échange** : A ne tient pas avec un autre restaurant (le vocabulaire « escales », « Grignotages », « Voyage Signature » est celui de la maison). C est un style transférable à toute table dressée : il ne fournit que le détail du rond (photo de plat). B fournit la 404 (« Mauvais palier ») et le texte de l'histoire (« Au premier étage »). **Choix : A**, raison : seul concept dont le système formel vient de la carte du client et qui tient de l'accueil à la 404.

## Concept Card
- **Idée** : le site est un repas en escales ; on avance sur une seule route, d'une escale à l'autre, jusqu'à la table.
- **Métaphore** : le menu de dégustation comme itinéraire (grignotages, escales, douceurs).
- **Signature (et recette)** : l'escale qui s'allume et l'assiette qui s'ouvre. Phase 2, `motion.md` : au passage du défilement, le point de la route se remplit (`scale` + couleur, ScrollTrigger `toggleActions`) et la photo ronde se révèle par `clip-path: circle(0 → 50%)` en `ease.out`, 0,9 s ; au repos, la bague de l'assiette du hero tourne lentement de quelques degrés sur l'horloge GSAP.
- **Émotion (3 premières secondes)** : on entre dans une salle sombre où une assiette blanche brille ; on sait : cuisine française créative, Namur, réserver.
- **Verbe** : servir (les éléments arrivent comme des assiettes posées, posément, puis ne bougent plus).
- **Capture** : le hero (grand « Bienvenue chez vous » en Gambetta, assiette de Saint-Jacques cerclée de rouge sur fond nuit, la route à gauche).
- **Ancre** : les formules réelles du site client (49, 69, 79, 94 €) et le vocabulaire des escales ; 33 rue Pépin ; seul chef en cuisine, salle et cave.
- **Théâtre** : loader non (la page doit répondre en 3 s à quelqu'un qui cherche un numéro de téléphone ; pas de contenu lourd à masquer). GL non (les photos de plats sont la matière, un shader les dégraderait ; coût mobile injustifié).

## Système
- **Palette** (rôles, références réelles) : ground `#16110f` (la salle aux bougies le soir, brun nuit) ; ink `#f3eee7` (nappe blanche) ; muted `#b3a99f` (fumée de bougie, 7,6:1) ; line `rgb(243 238 231 / .18)` (fil de nappe) ; accent `#ff5a4e` (rouge de l'enseigne de la rue et de la carte de visite, 6,5:1) ; curtain = accent. Défaut n° 1 (crème + serif + terracotta) évité : fond sombre, rouge d'enseigne vif, pas de crème en fond.
- **Typo** : Gambetta 500 + italique (display : serif classique raffiné, l'italique porte la voix du chef et le mot en rouge), Switzer 400/600 (corps et UI). Ni Inter, ni Fraunces, ni Playfair. Échelle fluide `--t-mega` à `--t-xs` (tokens.css). Display : interlettrage -0,04 à -0,02 em, interligne 0,9 à 1,02, `text-wrap: balance`. Corps 16 à 18 px, interligne 1,55, mesure 60ch ; UI 13 px 600. Prix `tabular-nums`, insécables via `lib/typo.ts` (« 49 € », « 12 h 30 »), vraies apostrophes et guillemets.
- **Grille** : 12 colonnes (flex/scroll-snap au téléphone), ligne forte n° 1 = la route (rail vertical à gauche, tout au long de la page), ligne forte n° 2 = bord gauche du bloc de texte à la colonne 7 (paire asymétrique). Humeurs d'espacement : hero compact, `pause` (très aéré), `serre`, défaut. Règle de rayon : angle droit partout, photo de plat ronde (`--radius-plate`), boutons en pilule.
- **Mouvement (planifié)** : famille `ease.out` pour les arrivées, `ease.inOut` pour les transitions de page (rideau rouge) ; verbe servir = arriver de 24 px plus bas avec un léger flou d'opacité, durée 0,7 à 0,9 s, stagger 60 ms. Hovers : CTA (remplissage inversé, déjà en CSS), nav (soulignement rouge), plats/photos (aperçu rond au curseur sur la carte, phase 2), liens texte (épaisseur du soulignement). Repos : la bague rouge de l'assiette du hero tourne de quelques degrés (une horloge, pause hors écran, coupé en reduced motion).
- **Plan de composition** (familles distinctes par page) :
  - Accueil : poster (hero texte + assiette) / statement / index (formules) / mur (six assiettes décalées) / paire asymétrique (façade + chef) / pied final (téléphone en grand).
  - Carte : poster-titre / index à vignettes (carte du mois) / données (formules + accords) / paire (mercredis) / index (traiteur) / statement court.
  - Histoire : poster / média plein cadre (façade) / paire (chef + carte de visite) / données (repères 2002, 2016, 2020) / duo (maison + enseigne) / statement.
  - Réservation : poster avec téléphone en grand / données (formulaire mailto + horaires) / accès et infos.
  - 404 : poster « Mauvais palier ».
  - Patron de la carte : liste index avec vignette ronde ; au phase 2, aperçu au curseur (desktop) et vignette visible au toucher.
  - Mobile 390 : h1 recomposé (`clamp`), assiette décalée à droite sous le texte, mur en bande `overflow-x` + `scroll-snap`, formules empilées (nom + prix sur une ligne), index de la carte nom + vignette, en-tête réduit à la marque ronde + 3 liens.
- **Test de généricité** : « un modèle générique atterrirait-il ici ? » Hero centré sur dégradé : non (asymétrique, route). Trois cartes égales : non (lignes d'index). Eyebrow sur chaque titre : non (aucun). Numéros décoratifs : non (les années et les escales sont des faits). Remplacé : le pied générique par un mot « Bienvenue chez vous… » géant en italique rouge (la signature manuscrite de l'enseigne traduite en serif italique).

## Sur-utilisation de la skill (phase 1)
1. **Trois concepts, trois territoires, notés, ancre, test de l'échange** : tableau ci-dessus (menu, lieu, matière). Coché.
2. **Aucun exemple travaillé** : ni braise qui refroidit, ni pavage, ni mise en place sur gril, ni cadre, ni solde, ni phrase unique. Coché.
3. **Concept Card exacte, verbe compris** : § Concept Card (Idée / Métaphore / Signature / Émotion / Verbe / Capture / Ancre / Théâtre). Coché.
4. **Concept au pied, carte, réservation, 404** : pied `Footer.astro` (mot géant + route), carte (`pages/carte.astro`, escales ordonnées), réservation (horaires et accès), 404 « Mauvais palier » (`pages/404.astro`). Coché.
5. **Un moment signature et sa recette** : § Concept Card, recette phase 2. Coché (planifié).
6. **Palette 4 à 6 rôles, références réelles** : `src/styles/tokens.css:6-12`. Coché.
7. **Aucun des 8 « defaults to avoid »** : pas de hero centré sur blob, pas de trois cartes égales, pas de dégradé violet, pas de crème + terracotta (fond nuit, rouge d'enseigne), pas d'acide sur noir (rouge chaud, pas de vert acide), pas de verre dépoli, pas d'eyebrow sur titre (`grep eyebrow src` vide), pas de 01/02/03. Coché.
8. **Test de généricité** : § Test de généricité. Coché.
9. **Details that separate 7 from 8** : sélection en rouge (`site.css:2`), focus dans l'accent (`site.css:3`), favicon de l'identité (`public/favicon.svg`, bague de l'assiette), OG composée provisoire (`public/og.png`, à recomposer en phase 3), pied comme composition finale (`Footer.astro`), 404 dans le concept. Partiel : OG à finir en phase 3.
10. **Polices** : Gambetta (2 fichiers) + Switzer (2 fichiers) = 4 fichiers, 2 préchargés (Gambetta 500, Switzer 400), `public/fonts/`. Coché.
11. **Échelle fluide unique, grands sauts** : `tokens.css` (`--t-mega` 54 à 168 px, `--t-xs` 13 px). Coché.
12. **Display réglé** : `site.css` `.display`, `.hero h1` (interlettrage, interligne, balance). Coché.
13. **Corps et UI** : `--t-body` 16 à 18 px, interligne 1,55, UI 13 px 600. Coché.
14. **Typographie française** : `lib/typo.ts`, apostrophes, « », vouvoiement. Coché.
15. **Grille, lignes fortes, cadre** : route (rail) + bord de colonne 7 ; pas de cadre quatre coins (justifié : la route remplace le cadre, une seule ligne structurante). Coché.
16. **Famille de section au plus une fois par page** : voir plan de composition (la carte utilise deux listes index : carte du mois et traiteur, à différencier en phase 2 par des vignettes et un traitement distincts ; point à surveiller). Partiel.
17. **Hero en 3 s** : nom, cuisine, lieu, deux actions (Réserver, Appeler), horaires dans le premier écran (mesuré à 1440×900 : h1 [105,152,851,419], CTA haut 600, assiette [900,187,1392,679]). Coché.
18. **Mobile 390 recomposé** : mesuré, `scrollWidth = 390`, h1 à gauche 44 px, mur en strip scroll-snap. Coché (revérifier en capture en phase 3).

## Mouvement réalisé (phase 2)
- **Module pilote** `src/motion/escales.ts`, appelé une fois par `src/motion/setup.ts` : la progression sur la route (défilement) remplit le fil rouge du rail (`.route__fil`, scrub), allume chaque escale au passage (`.is-lit`), ouvre les assiettes (`clip-path: circle(0 → 50%)`, 0,9 s, `ease.out`, stagger 60 ms sur le mur) ; la vitesse de défilement accélère l'escale qui tourne autour de l'assiette du hero ; le pointeur penche l'assiette (± 8 px, `quickTo`).
- **Repos** : `startIdle()` fait tourner l'escale (point rouge et arc de la bague) autour de l'assiette du hero à 10 degrés par seconde, vitesse constante (pas de point mort), sur `gsap.ticker`, en pause hors écran (IntersectionObserver), absente en mouvement réduit (bague statique, escale à midi).
- **Pas de loader** (décision de phase 1) ; intro : h1 `data-split="lines" data-intro`, accroche `data-reveal="up" data-intro`, assiette posée (scale 0,94 → 1, rotation -4° → 0) sans jamais être cachée (LCP), actions et infos en fondu montant (stagger 60 ms).
- **Transition de page** : l'assiette rouge s'ouvre depuis le point de clic (clavier : centre du lien), 0,7 s `ease.inOut`, puis se referme sur la première escale de la page suivante, 0,7 s (`setup.ts`). Mouvement réduit : fondu 0,2 s de l'engine.
- **Hovers par rôle** (3 traitements) : CTA = l'assiette pleine devient contour (remplissage inversé, `scale: .97` à l'appui) ; navigation, grands numéros et menu = le trait rouge se pose depuis la gauche ; plats = l'assiette s'avance (`scale: 1.05`) et le nom glisse de 0,25 em. Liens texte soulignés au repos (le trait s'épaissit), « suite » : la flèche avance. Tout sous `@media (hover: hover)`, même état sur `:focus-visible`, `:active` présent.
- **Carte** : la liste du traiteur (`.index--traiteur`) se distingue de la carte du mois (nom en `--t-l`, vignette 7,5 rem, prix en rouge) ; pas d'aperçu au curseur : les vignettes rondes montrent déjà chaque plat, un follower les doublerait (décision).
- **Menu mobile** : bouton « Menu » (`aria-expanded`, `aria-controls`), `<dialog>` modal plein écran (focus piégé et Échap natifs, focus rendu au bouton par l'événement `close`), rubriques posées comme des escales sur une route, « Appeler » 44 px ; un lien ferme le dialog avant la transition.

## Sur-utilisation de la skill (phase 2)
19. **Menu mobile accessible** : `Header.astro:19` (bouton, `aria-expanded`), `:23` (dialog), `:49-51` (ouverture, fermeture, focus rendu) ; test Playwright 390 : ouvert 390×844, focus sur « Fermer », Échap ferme, `aria-expanded=false`, focus sur `.nav__menu` ; un lien du menu navigue et le dialog est fermé. Coché.
20. **Engine verbatim, astro.ts, persist** : `src/engine/*` inchangé ; `Base.astro:31` `transition:animate="none"`, `:63` `transition:persist` sur `#curtain` ; pas de `#gl` ni de `#cursor` (ni GL ni follower, décision). Coché.
21. **Une horloge** : `grep "addEventListener('scroll'|requestAnimationFrame" src/motion src/components src/pages src/layouts` = 0 ; repos par `gsap.ticker` (`escales.ts:19`). Coché.
22. **Code de page dans `onPage()` avec nettoyage** : `escales.ts:42-95` (retour des nettoyages : ticker, IO, pointermove, fil), `Header.astro:45` (listeners retirés, dialog fermé). Coché.
23. **Aucune CSS `transform` sur élément GSAP** : `grep transform site.css` ne renvoie que `text-transform` ; hovers en `scale`/`translate` sur des éléments que GSAP ne transforme pas (images rondes : GSAP n'y anime que `clip-path`). Coché.
24. **Module pilote avec `startIdle` et pointeur** : `escales.ts:12` (`startIdle`), `:27` (pointeur). Mesure : rotation de `.bague__tour` différente à 1,5 s d'écart (test Playwright). Coché (idleMotion à confirmer en phase 3 par `report.json`).
25. **Loader décidé** : aucun (Concept Card, Théâtre) ; pas de composant ni de `role="status"`. Coché.
26. **Transition du concept ≤ 1 s par sens** : `setup.ts` leave 0,7 s, enter 0,7 s ; test : rideau visible avec `circle(129% at 80% 3,5%)` à 400 ms après le clic sur « La carte », masqué à l'arrivée. Coché.
27. **Intro `data-intro`, premier frame** : h1 de chaque page `data-split="lines" data-intro` (5 pages), assiette du hero peinte dès le premier rendu (capture `.shots/p2/home-1440.png`). Coché.
28. **Épinglages** : aucun pin ; un seul scrub (`.route__fil`) avec `invalidateOnRefresh: true` (`escales.ts:55`). Coché.
29. **Repli statique dessiné** : en mouvement réduit `onPage` sort tôt (`escales.ts:43`) : rail gris, escales en contour, assiettes pleines, bague statique ; test : `motion=false`, `lenis=false`, 0 élément caché, pas de fil. Coché.
30. **Copies décoratives** : `.pied__mot` et SVG de bague `aria-hidden="true"`, aucun titre dupliqué. Coché.
31. **Une famille d'easing** : `ease.out` / `ease.inOut` / `ease.soft` de l'engine, CSS en `cubic-bezier(0.16, 1, 0.3, 1)` (expo.out) ; durées 0,6 à 1,2 s ; stagger 60 ms (mur, actions). Coché.
32. **Un traitement par rôle, 3 au total** : `site.css` § Rôle 1, 2, 3. Coché.
33. **Hover sous `(hover: hover)`, aussi sur `:focus-visible`** : `site.css` lignes 231, 244, 254, 263 + règles `:focus-visible` voisines. Coché.
34. **Liens texte soulignés au repos** : `.lien` (`site.css:36`), `.suite` (bordure), `.nav__menu`, `.menu__fermer`. Coché.
35. `hover.noHoverChange` : phase 3 (`report.json`).
36. `idleMotion` : phase 3 ; amplitude prévue ~46 px par 1,5 s pour un point de 22 px + arc de 3 px (≈ 1 000 px² changés, au-dessus du seuil de 648).
37. **Curseur natif, rien ne dépend du hover** : pas de follower ; au toucher, vignettes visibles et menu au clic. Coché.
38. **Pas de blur animé, pas de `box-shadow` au scroll** : grep `blur` vide ; aucun `will-change`. Coché.
39. **Réduit** : test Playwright ci-dessus ; `reduced.*` de `report.json` en phase 3.
40. **GL** : sans objet, décision écrite (Concept Card, Théâtre). Coché.
41. Sans objet.
44. **Skip link et focus** : skip link premier enfant de `body` (`Base.astro`), anneau 2 px accent (`site.css:3`), états focus des 3 rôles. Coché (clavier mesuré en phase 3).
45. Contraste AA : phase 3.
46. **Texte réel** : tout titre est du texte SplitText, aucun canvas. Coché.
47. **Cibles** : « Réserver » d'en-tête et « Menu » à 2,75 rem (44 px), « Appeler » des menus 44 px ; mesure en phase 3.
