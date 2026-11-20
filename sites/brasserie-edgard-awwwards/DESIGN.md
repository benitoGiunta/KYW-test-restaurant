# DESIGN.md : Brasserie Edgard, variante awwwards « Le cadran »

## Brief
- **Sujet** : Brasserie Edgard (« Mr Edgard »), brasserie belge à Saint-Servais (Namur), Chaussée de Waterloo 473. Ouverte tous les jours de 10 h à 22 h 30, cuisine fermée de 15 h à 18 h sauf week-end et jours fériés. 71 plats, lunch 14,50 € / 21,50 €, menus de groupe 34 à 49 €.
- **Publics** : le midi (affaires, lunch en semaine), le soir (famille, grande faim), les groupes (plus de 10, 16 au maximum), les habitués. Métier : réserver (Barestho ou téléphone), venir, lire la carte.
- **Ressources** : 30 photos du client (salle, bois sculpté, terrasse, façade, 6 plats), logo SVG foncé et blanc, données de carte complètes. Pas d'avis, d'histoire ni de presse.
- **Contraintes** : statique (Astro), `base` `/brasserie-edgard/awwwards/`, réservation sans backend.
- **Hypothèses** (aussi en tête de `site.ts`) : la salle reste ouverte pendant la pause de cuisine (ouverture 10 h à 22 h 30 sans coupure) ; e-mail repris de restaurants.json avec réserve ; groupes « plus de 10, 16 au maximum » repris tel quel ; aucun plat ni donnée fictif.

## Trois concepts (trois territoires)
| | A. Le cadran | B. Le sillon | C. L'ardoise du jour |
|---|---|---|---|
| Territoire | Rythme horaire, lieu (l'horloge en mosaïque de la salle) | Matière du lieu (bois sculpté en sillons du comptoir et des murs) | Service (suggestions, plat du jour) |
| Phrase | « La brasserie se lit comme un cadran : ouverte de 10 h à 22 h 30, cuisine en pause de 15 h à 18 h. » | « Chaque rubrique est un sillon creusé dans le bois. » | « La carte change au gré de l'ardoise. » |
| Règle de mise en page | Le temps découpe les sections ; l'anneau de 24 h revient du hero au pied | Courbes de niveau en fond, lignes sinueuses entre rubriques | Une colonne, une ardoise noire |
| Verbe | tourner | creuser | écrire |
| Voix typo | Serif contrasté Gambarino + grotesque Hanken | Gras condensé | Manuscrite |
| Palette | Mur crème, noyer, cuir caramel, verres prune | Bruns | Noir et craie |
| Signature | Aiguille qui prend l'heure de Namur et un anneau qui s'allume (motion.md, rotation scrubbée) | Dessin SVG animé en trait (webgl.md non nécessaire) | Écriture à la craie |
| Ancre réelle | Horaires exacts, pause de cuisine 15 h à 18 h, horloge murale en mosaïque (photo 19) | Bois sculpté (photos 03, 05, 08) | Suggestions du moment du site |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 4 / 5 / 5 / 2 | 3 / 4 / 3 / 3 | 2 / 3 / 4 / 4 |
- **Test de l'échange** : la phrase A tient seulement avec une maison qui a une coupure de cuisine de 15 h à 18 h et une horloge dans la salle. B tiendrait chez tout restaurant à décor sculpté, C chez n'importe quel bistrot. **A retenu** (la plus forte, et l'usage réel : savoir si la cuisine est ouverte).
- Détails repris des écartés : le bois sculpté devient la couleur des sections sombres, la terrasse et le pied (B) ; l'ardoise reste une idée de phase 3 pour les suggestions (C).
- Exemples travaillés de concepts.md évités : ni braise qui refroidit, ni pavage, ni gril, ni cadre, ni solde, ni phrase unique. Le cadran ne rend pas une « heure » abstraite : il porte une information métier.

## Concept Card
- **Idée** : la brasserie est lue comme un cadran de 24 h, midi en haut, minuit en bas. Un arc cuir pour la salle (10 h à 22 h 30), un arc prune pour la cuisine, un trou pointillé de 15 h à 18 h en semaine.
- **Métaphore** : le service d'une brasserie qui ne ferme pas, l'horloge en mosaïque de la salle.
- **Signature (et recette)** : l'aiguille du cadran du hero pointe l'heure de Namur et se déplace au chargement, l'arc de la plage courante s'allume (motion.md, rotation GSAP, `ease.out`).
- **Émotion (3 premières secondes)** : « C'est ouvert, je sais quand, je réserve. »
- **Verbe** : tourner (aiguille, transition de page par rideau de bois qui monte, sections qui s'enchaînent comme des plages horaires).
- **Capture** : le hero avec le cadran et la façade de nuit en bandeau.
- **Ancre** : horaires réels du client (10 h à 22 h 30, cuisine fermée 15 h à 18 h sauf week-end et fériés).
- **Théâtre** : loader non (une brasserie ouverte toute la journée ne fait pas attendre ; le rideau de transition suffit) ; GL non (le cadran est un SVG, aucun besoin de plan GL).

## Système
- **Palette** (rôles) : `ground` #f1e7cf (mur crème de la salle, photos 07 et 13), `ink` #231710 (noyer presque noir), `muted` #6b5645, `line` #d6c5a0, `accent` #a3214b (verres prune des tables, photos 06 et 14), `curtain` #2b1b12 (bois sculpté sombre du mur). Compléments : cuir caramel #c27a38 (chaises, décoratif), `bois-muted` #d6bd98 et `bois-accent` #e69a56 pour les sections sombres. Références : mur de la salle, cuir des chaises, verres de table, logo (#233D4D) du client.
- **Typo** : Gambarino (Fontshare, serif contrasté à large œil) pour les titres, Hanken Grotesk (Google, variable 100 à 900) pour le corps et l'UI. Échelle `--t-mega` 3,75 à 13 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body`, `--t-s`, `--t-xs`. Display : interlettrage -0,02 em, interligne 0,88 à 0,95, `text-wrap: balance`. Prix `tabular-nums`, insécables.
- **Grille** : 12 colonnes (une seule au téléphone), lignes fortes : filet noir sous la journée, bord gauche des titres, section sombre pleine largeur. Quatre humeurs d'espacement `serre`, `normal`, `aere`, `entracte`. Rayon : 0 sauf pastilles et boutons (formes rondes de l'horloge).
- **Mouvement (phase 2, en place)** : une famille d'easing (`ease.out` révélations et aiguille, `ease.inOut` transition et menu, `ease.soft` petites UI ; en CSS, `cubic-bezier(0.215, 0.61, 0.355, 1)` = power3.out), durées du tableau Timing, stagger 0,06 à 0,08 s. Trois traitements de survol : (1) plaque des CTA qui se remplit en tournant depuis midi (`conic-gradient` sur `@property --tour`, verbe « tourner »), (2) soulignement qui se redessine (liens, nav, onglets de la carte), (3) décalage des grands liens du menu plein écran. Repos : la trotteuse balaie chaque cadran en temps réel (60 s par tour), l'aiguille de la 404 cherche l'heure ; pause hors écran, rien en mouvement réduit.
- **Plan de composition** : Accueil = affiche (hero texte + cadran), média plein cadre (façade), index horaire (journée), mur asymétrique sur noyer (plats), paire texte/horloge + filmstrip (salle), données (14,50 €, groupes, 7 j / 7), pied final avec cadran. Carte = liste index à titre collant et vignette, filet pointillé entre lignes. Maison = média plein cadre, texte, paire décalée, section sombre de terrasse. Réservation = deux CTA et photo, puis blocs pratiques.
- **Mobile 390** : titres 19 vw, une colonne, cadran 24 rem centré, mur de plats décalé à 70 % de largeur, filmstrip en `overflow-x` + `scroll-snap`, menu plein écran.
- **Test de généricité** : un modèle générique mettrait une photo plein écran avec bouton rose. Ici le hero est un cadran qui dit l'ouverture ; la carte reste une carte lisible. Oui à « crème + serif » : justifié, la crème est celle du mur de la salle et l'accent est le prune des verres, pas la terracotta.

## Sur-utilisation de la skill (cochés avec preuve)
1. [x] Trois concepts, trois territoires, notés, ancre, test de l'échange : § Trois concepts.
2. [x] Aucun exemple travaillé : § Trois concepts, dernière ligne.
3. [x] Concept Card exacte, verbe « tourner » : § Concept Card.
4. [x] Concept au pied (`Footer.astro` : cadran et « Dix heures, vingt-deux heures trente. »), à la carte (rubriques, horaires du lunch), à la réservation (horaires), à la 404 (`404.astro` : cadran vide, « Cette page n'est pas à l'heure. »).
5. [x] Moment signature : aiguille à l'heure de Namur, recette motion.md rotation (phase 2) ; le cadran statique est en place (`Dial.astro`, `[data-dial-aiguille]`).
6. [x] Palette 6 rôles dérivés des photos : § Système, `tokens.css:21-33`.
7. [x] Défauts évités : pas de terracotta (prune), pas d'acide sur noir, pas de dégradé, pas de verre dépoli, pas d'eyebrow sur chaque titre (un seul, hero), pas de 01/02/03, polices ni Inter ni Fraunces ni Instrument ni Playfair. Crème + serif justifié plus haut.
8. [x] Test de généricité : § Système.
9. [~] Détails 7 vers 8 : sélection prune (`site.css` `::selection`), focus prune (caramel clair sur noyer), favicon cadran (`public/favicon.svg`), OG composée depuis le hero (`public/og.png`), pied en composition finale, 404 dans le concept. À vérifier en phase 3.
10. [x] Polices : Gambarino 400 (16 Ko), Hanken variable (34 Ko), 2 préchargées (`Base.astro`).
11. [x] Échelle fluide unique `tokens.css:39-46`, sauts d'environ ×2.
12. [x] Display réglé : `site.css` `.display` (interlettrage -0,02 em, interligne 0,95, balance).
13. [x] Corps 16 à 17 px, interligne 1,5 (`engine.css`), UI 13 à 14 px.
14. [x] Typographie française : insécables dans les heures et prix, « » et ’ ; aucun tiret cadratin (grep 0 dans `src/` et `dist/*.html`).
15. [x] Grille 12 colonnes, lignes fortes (filet de la journée, titres alignés), cadre équivalent : bords des sections pleine largeur noyer / crème.
16. [x] Une famille de section au plus une fois par page (accueil : affiche, plein cadre, index, mur, paire + filmstrip, données, pied).
17. [x] Hero en 3 s : nom, « brasserie belge », 10 h à 22 h 30, Réserver et Appeler au-dessus de la flottaison (mesure ci-dessous).
18. [x] Mobile 390 recomposé (`site.css`, bloc `max-width: 900px`).

### Mesures de grille (Playwright, 4 viewports, 5 pages)
Aucun débordement horizontal (`scrollWidth` = largeur). Hero : h1 et cadran sur colonnes disjointes (1440 : h1 26 à 821, cadran 854 à 1407 ; 1024 : h1 21 à 582, cadran 608 à 998). Aucune requête échouée. `left` des `.display` : 13 px à 390 pour une marge de 16 avant retrait de l'alignement optique négatif ; contrôlé de nouveau en phase 3.

### Phase 2 (construction-2, 20/11/2026) : mouvement et interactions
Module pilote `src/motion/cadran.ts` : une variable, l'heure de Namur (`Intl.DateTimeFormat` Europe/Brussels, jours fériés belges calculés), distribuée aux aiguilles, à l'arc courant (`is-now`, épaissi, les autres atténués), au statut écrit du hero (`[data-statut]`, « Ouvert maintenant. Cuisine ouverte jusqu'à 22 h 30. ») et à la plage « Maintenant » de la journée. Le week-end et les jours fériés, la pause pointillée devient un arc de cuisine plein (`is-continu`). Pointeur (bureau) : aiguille fantôme pointillée et lecture au centre (« 18 h · cuisine ouverte »).
19. [x] Menu mobile : `menu.ts` (aria-expanded, overlay plein écran, focus piégé, Échap) ; mesure Playwright 390 : ouvert `aria-expanded=true`, focus sur « Fermer » ; Échap : `false`, focus rendu à « Menu », `hidden`.
20. [x] Engine verbatim (`src/engine/`, inchangé), adaptateur `astro.ts`, `transition:persist` sur `#curtain` (`Base.astro:73`) ; ni `#gl` (pas de GL) ni `#cursor` (pas de follower, décision) ; `transition:animate="none"` sur `<html>` (`Base.astro:36`).
21. [x] Une horloge : `gsap.ticker` (`cadran.ts:141`) ; grep `addEventListener('scroll')` et `requestAnimationFrame` dans `src/motion`, `src/pages`, `src/components` : 0. Visibilité par `IntersectionObserver` (`cadran.ts:126`).
22. [x] Code de page dans `onPage()` avec nettoyage : `cadran.ts:93` et `:170`, `menu.ts`.
23. [x] Aucune CSS `transform` sur élément GSAP : grep `transform` dans `site.css` (hors text-transform, origin) = 0 ; style en ligne `transform-origin` retiré de l'aiguille (`svgOrigin` GSAP).
24. [x] Pilote avec `startIdle` (`cadran.ts:132`) et pointeur (`cadran.ts:166`), appelé une fois depuis `setup.ts`.
25. [x] Loader décidé : aucun (Concept Card, Théâtre) ; pas de composant ni de `role="status"`.
26. [x] Transition du concept : le bois balaie l'écran en secteur depuis midi, sens horaire (`setup.ts`, 0,8 s aller, 0,9 s retour + 0,05 s) ; mesure clic nav vers la carte : rideau `hidden` et h1 visible à l'arrivée, aucune erreur.
27. [x] Intro : h1 `data-split="lines" data-intro` sur les 5 pages, cadran du hero `data-reveal="fade" data-intro`, aiguille qui tourne de minuit à l'heure de Namur en 1,6 s (`cadran.ts:121`) puis l'arc courant s'allume. Premier frame lu en capture (`.shots/p2-hero.png`) ; preuve `settledMs` en phase 3.
28. [x] Épinglage : aucun pin GSAP ; titre de la journée en `position: sticky` (CSS).
29. [x] Repli statique : `html:not(.motion)` masque trotteuse, fantôme, lecture (`site.css:236`) ; aiguille posée à l'heure sans animation, statut et plage « Maintenant » écrits ; mesure réduit : 0 bloc caché dans le premier écran sur 5 pages. Preuve `r-*` en phase 3.
30. [x] Copies décoratives : aucune ; le cadran est `aria-hidden`, son information est écrite en texte (légende, statut).
31. [x] Une famille d'easing, Timing, stagger 0,06 à 0,08 s (`data-delay` 0,08 / 0,16 sur plages, plats, chiffres).
32. [x] Un traitement par rôle, trois au total, dans le verbe (§ Système, Mouvement).
33. [x] Hover sous `@media (hover: hover)` (`site.css:14, 26, 40, 54, 148`), même état sur `:focus-visible` et `:active` ; en réduit, transitions à 0,01 ms : l'état final reste visible.
34. [x] Liens texte soulignés au repos (`.lien`, trait 1 px `currentColor`).
35. [ ] `hover.noHoverChange` : phase 3 (report.json).
36. [ ] `idleMotion` : trotteuse de 2,5 px sur 196 unités avec pastille de 8 (environ 220 px à l'écran sur le hero 1440) ; à prouver en phase 3 par report.json.
37. [x] Curseur natif visible (`crosshair` sur les cadrans au bureau) ; au toucher, rien ne dépend du survol (fantôme désactivé par `isTouch()`).
38. [x] Pas de blur animé, pas de `box-shadow`, aucun `will-change`.
39. [x] Réduit : Lenis absent (classe `lenis` absente en réduit, mesure), pas de GL, pas de scrub hors `data-parallax` (désactivé par l'engine en réduit), pas de loader ; `reduced.hiddenText` à confirmer en phase 3.
40. [x] GL : sans objet, décision écrite (Concept Card, Théâtre).
41. [x] Sans objet (pas de GL).
44. [~] Skip link « Aller au contenu » en premier (`Base.astro:72`), anneau prune (bois clair sur noyer, `site.css:8-9`) ; preuve clavier en phase 3.
45. [ ] Contraste AA : statut et pastille « Maintenant » crème sur prune (#f1e7cf / #a3214b, environ 6:1) ; à prouver en phase 3 (axe).
46. [x] Texte réel : statut, plage et lecture en DOM ou en `<text>` SVG décoratif doublé par le texte de la page ; aucun canvas.
47. [~] Cibles : CTA 52 px, `cta--petit` 40 px, « Menu » et « Fermer » ≥ 40 px ; mesure en phase 3.
Finitions : `::selection` prune (`site.css:7`), favicon SVG du cadran + `favicon-32.png` + `apple-touch-icon.png` 180 px (`Base.astro`), lien du pied KYW souligné au survol et au focus.
