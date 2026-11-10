# DESIGN.md · Le Ponti 2 · variante awwwards

## Brief
- Sujet : Le Ponti 2, restaurant italien et pizzeria familial de Jambes (Namur), avenue du Bourgmestre Jean Materne 87. Fermé le lundi, ouvert mardi à dimanche 11 h 30 à 14 h 30 et 18 h à 21 h 30.
- Publics : midi (actifs, menu 40 €), soir (familles, pizzas), habitués du quartier, de passage. Métier : réserver (Barestho, tél. 081 30 40 75), venir, lire la carte.
- Ressources : 4 photos exploitables (façade de nuit, pâtes, pizza, escalopes), logo bordeaux et or (pont à trois arches), carte complète de 99 lignes. Contraintes : statique, `base` /le-ponti-2/awwwards/, noindex, pas de backend.
- Hypothèses : histoire, équipe, avis, parking, vins inconnus donc absents ; aucun contenu fictif ; le « 2 » du nom n'est pas expliqué.

## Concepts (trois territoires)
| | Concept | Territoire | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|
| A | **Le pont à trois arches** : la carte se traverse, trois arches = trois spécialités | nom et logo, lieu (Jambes, Meuse) | 4 | 5 | 5 | 1 |
| B | **L'échelle des prix** : vingt pizzas rangées de 14 à 23 € | système formel | 4 | 4 | 4 | 2 |
| C | **Deux services** : la page bascule midi clair / soir sombre | rythme horaire | 3 | 4 | 4 | 3 |
Ancres : A le logo (pont à trois arches) et les trois familles photographiées ; B 20 pizzas de 14 à 23 € ; C horaires 11:30-14:30 / 18:00-21:30, lundi fermé.
Test de l'échange : A échoue chez un autre restaurant (le pont est le logo de celui-ci). **Choix : A**, car le nom, le logo et la carte disent la même chose. Détails gardés : « le lundi, le pont est levé » (de C) pour les horaires et la 404.

### Concept Card
- Idée : on traverse la carte d'une rive à l'autre, par trois arches.
- Métaphore : le pont (ponti) : tablier, arches, deux rives (avant, après), pont levé le lundi.
- Signature (recette) : la traversée, une arche s'ouvre (clip-path en arche, motion.md « mask reveal ») sur chaque spécialité ; phase 2.
- Émotion (3 premières secondes) : entrer de nuit sous une enseigne dorée, puis voir l'assiette.
- Verbe : franchir (un mouvement continu, d'un bord à l'autre, sans rebond).
- Capture : le hero, « Le Ponti 2 » en or et crème à gauche, assiette de pâtes dans une arche à droite.
- Ancre : logo à trois arches, vingt pizzas, lundi fermé.
- Théâtre : loader non (restaurant : l'action est réserver ou lire la carte) ; GL non (les photos du client suffisent, le concept tient dans la géométrie de l'arche et le mouvement CSS/GSAP).

## Système
- Palette (références : façade de nuit de la photo 01, logo bordeaux et or du site actuel, assiettes bleu-vert des photos 02 et 05) : ground `#1a0b0e`, ink `#f4e9d4`, muted `#c2ad92`, accent `#e0a73f` (or), curtain `#6e1626` (bordeaux du logo, pied et rideau), plate `#5fb6b0` (section menu). Ligne : ink à 20 %. Défaut n° 1 (crème + serif + terracotta) écarté : fond nuit, crème en encre.
- Typo : Boska (display, Fontshare, 400, 400 italique, 700), Hanken Grotesk (corps et UI, variable 400 à 700). Échelle `--t-mega` 12,5 rem max à `--t-xs` 0,75 rem ; display interligne 0,88 à 1,02, interlettrage -0,02 à -0,045 em ; corps 16 à 18 px, interligne 1,55 ; prix `tabular-nums` ; espaces insécables dans « 21 € » et « 11 h 30 ».
- Grille : 12 colonnes, gutter fluide, lignes fortes à gauche (col. 1) et à la colonne 8 ; humeurs d'espacement : hero serré, énoncé très aéré, menu plein cadre coloré, carte dense. Rayon : l'arche (`--arche`) en haut des médias, angles droits partout ailleurs.
- Mouvement (phase 2) : famille `ease.inOut` expo pour les arches, durées 0,8 à 1,2 s ; hover : CTA (remplissage or vers contour), nav (soulignement qui se trace), lignes de carte (prix en or) ; repos : le pont du pied glisse très lentement (déplacement du motif).
- Compositions : accueil = poster (hero) / énoncé / filmstrip de trois arches (scroll-snap au mobile) / données (menu 40 €) / paire asymétrique (façade + horaires) / pied final (pont + mot). Carte = sommaire en arches, groupes alternés, listes à points de prix, photos collantes en paire décalée. Mobile 390 px : hero empilé, arches en bande à défilement, listes en une colonne.
- Test de généricité : un modèle atterrirait sur nappe crème + terracotta et grille de pizzas ; changé : fond nuit, arche comme seul gabarit de média, bande turquoise pour le menu, pont en pied.

## Sur-utilisation de la skill
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : § Concepts.
2. Aucun exemple travaillé de concepts.md repris (pas de braise, pavage, gril, cadre, solde, phrase unique).
3. Concept Card au format exact : § Concept Card, verbe « franchir ».
4. Concept au pied (`Footer.astro`, `Pont.astro`), à la carte (`carte.astro` : groupes « Avant le pont », « La traversée »), à la réservation (`.resa__porte` en arche), à la 404 (« Pont coupé. »).
5. Moment signature : arches qui s'ouvrent, recette mask reveal (à coder en phase 2).
6. Palette 6 rôles et références réelles : § Système, `src/styles/tokens.css`.
7. Défauts évités : pas de crème/terracotta, pas d'acide sur noir, pas de dégradé violet, pas de verre dépoli, pas d'eyebrow systématique (une seule : `.arches__tete`), pas de 01/02/03, pas d'Inter/Fraunces/Instrument/Playfair.
8. Test de généricité : § Système.
9. Détails 7 vers 8 : `::selection` et focus en or (engine.css + tokens), favicon d'arches (`public/favicon.svg`), OG composée (`public/og.png`, rendue par script depuis HTML, pas une capture de page), pied composé, 404 dans le concept.
10. Polices : `public/fonts/` 4 fichiers, 2 préchargés (`Base.astro`).
11. Échelle fluide unique : `tokens.css` (`--t-*`).
12. Display réglé : `.hero__titre`, `.display`, `h2` dans `site.css`.
13. Corps et UI : `--t-body`, `--t-s`, `--t-xs`.
14. Typographie française : insécables via `prix()` et `creneaux`, « » à vérifier en phase 3.
15. Grille et lignes fortes : `.grille`, `.wrap` (pas de `padding: X 0`). Cadre quatre coins : non, justifié par l'arche comme seul cadre.
16. Une famille de section au plus par page : accueil (poster, énoncé, filmstrip, données, paire, pied).
17. Hero en 3 s : nom, cuisine, CTA Réserver et Appeler dans le premier écran (rect : CTA à 710 px à 1440 x 900, 378 px à 390 x 844).
18. Mobile 390 recomposé : `@media (max-width: 48rem)` de `site.css` ; strip `overflow-x` + `scroll-snap` pour les arches.

### Phase 2 (mouvement, interactions)
Décisions : pas de loader (composant `Loader.astro` supprimé, aucun `role="status"`), pas de GL, pas de follower de curseur (curseur natif seul). Pilote unique `src/motion/pont.ts` : variable « traversée » (progression de la page) + dérive de repos + pointeur.
19. [x] Menu mobile : `Header.astro` (bouton « Menu » `aria-expanded`, `aria-controls="menu"`, `<dialog id="menu">` plein écran), `src/motion/menu.ts` (`showModal` : focus piégé et Échap natifs, `autofocus` sur le premier lien, focus rendu au bouton dans `onClose`). Mesure Playwright 390 px : ouvert, `aria-expanded=true`, focus « Accueil » ; après Échap fermé, focus sur le bouton.
20. [x] Engine verbatim (`src/engine/`), `astro.ts`, `transition:persist="curtain"` (`Base.astro:73`), `transition:animate="none"` (`Base.astro:36`). Pas de `#gl` ni `#cursor` (décision).
21. [x] Une horloge : `gsap.ticker` (`pont.ts` `tick`, `idle.ts`) ; grep `addEventListener('scroll')` et `requestAnimationFrame` dans `src/motion`, `src/components`, `src/pages` : aucun.
22. [x] Code de page dans `onPage()` avec nettoyage (`pont.ts` : ticker retiré, IntersectionObserver déconnecté ; `menu.ts` : écouteurs retirés, dialog fermé).
23. [x] Aucune CSS `transform` sur élément GSAP : figures `[data-arche]` (clip-path), `img` (GSAP seul), `.curtain__panel` (clip-path) ; les survols CSS utilisent `scale` sur des pseudo-éléments non animés par GSAP.
24. [x] Module pilote avec `startIdle` (`pont.ts:63`) et pointeur (`idle.x` dévie la vitesse du tablier `pont.ts:33`, l'assiette du hero suit le pointeur `pont.ts:37`).
25. [x] Loader décidé : aucun (restaurant, l'action est réserver ou lire la carte).
26. [x] Transition du concept (`setup.ts`) : sortie 0,8 s, le bordeaux monte du bas avec un bord en arche (on s'engage sous le pont) ; entrée 0,8 s, le tablier se lève comme un pont-levis. `ease.inOut`.
27. [x] Intro : accueil, le tablier du hero se trace de gauche à droite (`.hero__pont`, clip-path) et l'assiette se pose (scale 1,14 vers 1,06), titre, photo et CTA peints dès le premier frame ; pages intérieures, chapeau `data-intro data-reveal="fade"` (le h1 reste peint pour le LCP).
28. [x] Épinglages : aucun pin ; photos collantes de la carte en `position: sticky` CSS. 404 épinglée par `data-state="0.5"` (le pont coupé à mi-chemin).
29. [x] Repli statique : en mouvement réduit rien n'est caché (mesure : 0 élément `visibility: hidden` ou opacité 0 sur les 5 pages), arches ouvertes, pont immobile, filet de traversée seulement lié au défilement.
30. [x] Copies décoratives : `.pied__mot` `aria-hidden`, aucun titre dupliqué.
31. [x] Une famille d'easing (`ease.out`, `ease.inOut` de l'engine ; CSS `cubic-bezier(.87,0,.13,1)` équivalent expo.inOut pour les survols), durées : survols 0,45 à 0,6 s, lignes 1,2 s, arches 1,4 à 1,6 s, transitions 0,8 s ; stagger 60 ms (arches, liens du menu), 80 ms (lignes de l'engine).
32. [x] Trois traitements dans le verbe « franchir » (`site.css` § PHASE 2) : CTA (la couche franchit le bouton, entre à gauche, sort à droite), liens et nav (le trait franchit le mot), arches et sommaire (le contour doré se double à l'intérieur de l'arche).
33. [x] Survols sous `@media (hover: hover)`, mêmes états sur `:focus-visible`, `:active` présent ; en réduit les transitions passent à 0,01 ms mais l'état reste visible.
34. [x] Liens texte soulignés au repos (`.lien` : filet doré 1 px, `background-size: 100% 1px`).
35. [ ] Phase 3 (`report.json`).
36. [x] `idleMotion` : le tablier du hero glisse (14 unités/s, environ 17 px/s à 1440) ; mesure : 56 843 octets de capture différents en 1,5 s à 1440×900 ; pont du hero dans le premier écran (823 à 879 px à 1440×900, 661 à 717 à 1280×720, 510 à 550 à 390×844). À confirmer par `report.json` en phase 3.
37. [x] Curseur natif visible, rien ne dépend du survol au toucher (la carte et les arches sont des liens directs).
38. [x] Pas de blur animé, pas de `box-shadow` au scroll, aucun `will-change`.
39. [x] Réduit : `idle` à zéro, ticker du pont non ajouté, reveals ignorés par l'engine, transition en fondu court de l'engine ; confirmation `report.json` en phase 3.
40. [x] GL sans objet, décision écrite (Concept Card, Théâtre).
41. Sans objet (pas de GL).
44. [x] Skip link premier élément du `body` (`Base.astro`), anneau de focus or ; sur la bande turquoise, anneau en encre (`.menu :focus-visible`).
45. [ ] Phase 3.
46. [x] Texte réel partout (SplitText sur `enonce`, `adresse`, groupes de la carte, `pied__mot`), aucun canvas.
47. [x] Cibles : liens de nav, bouton Menu, CTA d'en-tête à 2,75 rem (44 px) ; CTA à 3 rem ; `.lien` en `inline-block` + `padding-block`. Mesure complète en phase 3.
Finitions : `::selection` or sur encre, favicon SVG + `favicon-32.png` + `apple-touch-icon.png` (180 px, issus du SVG d'arches), pied de page avec pont qui glisse.
