# DESIGN : Escale en Vue ! (variante awwwards)

## Brief
Sujet : terrasse et restaurant saisonniers à Dave (Namur), rue de la Rêche-Terre 21, au-dessus de la vallée de la Meuse ; petites assiettes fraîches et locales, apéro planchette, bières trappistes et régionales, toutes les tables dehors. Publics : habitués du week-end, promeneurs et touristes de la vallée, amateurs de bière, familles. Métier : venir (jeudi au dimanche), réserver le plat maison par téléphone, lire la carte. Ressources : 7 photos exploitables (paysage de terrasse, planchette, bol, panorama, trappistes, transats), logo vert (non repris). Contraintes : statique, `base` `/escale-en-vue/awwwards/`. Hypothèses : aucune carte ni prix (prix `null`, rien d'inventé), histoire et équipe inconnues (titulaire BCE seulement), saison 2026 terminée, GPS et parking à confirmer, aucun avis rendu.

## Trois concepts (trois territoires)
| | A. L'horizon (lieu) | B. Les 80 jours (saison) | C. Huit bouteilles (cave) |
|---|---|---|---|
| Phrase | Une ligne d'horizon traverse chaque page : au-dessus le titre, au-dessous la table | La page est le calendrier de la saison 19 juin au 6 septembre | La carte est une étagère de bouteilles alignées |
| Règle | Titres posés sur la ligne, 2 px | Colonnes = semaines | Colonnes verticales étroites |
| Verbe | Se poser | Compter | Aligner |
| Voix / palette | Grotesque large, ciel pâle + vert-ardoise + rouge parasol | Mono, papier | Étiquettes, brun bouteille |
| Ancre | Toutes les tables sont en extérieur, face à la vallée | Saison 2026 du 19 juin au 6 septembre | Photo des huit trappistes |
| Notes (originalité, adéquation, faisabilité, portabilité) | 4, 5, 5, 2 | 3, 4, 4, 3 | 3, 3, 4, 4 |
Test de l'échange : A échoue chez un restaurant sans vue (la ligne vient du lieu) ; B et C se transposent. **Choix : A**. Détail repris de C : alignement des bières en liste. De B : la mention de saison dans la section du soir.

## Concept Card
- **Idée** : le restaurant est un point de vue ; la page est ce qu'on voit depuis la table.
- **Métaphore** : l'escale, le temps de poser son verre et de regarder la ligne de la colline d'en face.
- **Signature (et recette)** : l'horizon, trait de 2 px plein cadre qui porte chaque titre ; phase 2 : le trait se trace au chargement et les sections « soir » passent du ciel au vert (motion.md, trait SVG/scaleX lié au scroll).
- **Émotion (3 premières secondes)** : un grand titre posé sur une ligne, l'air et le ciel d'un après-midi dehors.
- **Verbe** : se poser (entrées en descente lente, easing `ease.soft`, jamais de rebond).
- **Capture** : « Escale en vue ! » en lettres larges sur le trait, photo de la terrasse au-dessous à droite.
- **Ancre** : toutes les tables sont en extérieur, face à la vallée ; ouvert du jeudi soir au dimanche après-midi.
- **Théâtre** : loader non (site de quelques pages, la photo suffit) ; GL non (le trait et la typographie portent l'idée, photos de faible résolution).

## Système
- **Palette** : ground `#e4eef1` (ciel d'après-midi), ink `#11262b` (vert-ardoise du logo), muted `#475e63`, line `#9cb4ba`, accent `#b8341d` (parasol rouge de la photo 01), curtain `#1d3a33` ; soir `#1d3a33` / `#f3e6cf` / accent `#f0a24b`. Références : photos du client (ciel, parasol, transats) et ardoise de la planchette. Ni crème, ni terracotta, ni acide sur noir.
- **Typo** : Anybody variable (display, `font-stretch` 118 %, graisse 780, interlettrage -0,025 em, interligne 0,92) ; Albert Sans (corps 16 à 18 px, interligne 1,55). Échelle `--t-mega` à `--t-xs`. Prix `tabular-nums` (aucun prix publié). Insécables « 5100 », « 17 h 30 », « ! ».
- **Grille** : 12 colonnes, lignes fortes : trait d'horizon (haut du contenu) et rupture verticale à la colonne 5 (index) ; humeurs d'espacement serre / normal / aéré / entracte. Rayon 0.
- **Mouvement (phase 2, fait)** : pilote `src/motion/horizon.ts`, une variable : l'heure (progression du défilement, figée à 0,3 sur la 404 par `data-heure`). Elle fait descendre le soleil derrière chaque trait d'horizon et vire sa couleur (et celle du parasol de la marque) du rouge parasol vers l'orange du soir (`--heure`, `color-mix`) ; les sections du soir montent en vert depuis leur bord (clip-path scrubbé). Intro : le trait se trace (`--trace`, 1,3 s `ease.inOut`), les lettres du h1 descendent et se posent dessus (`data-pose`, chars, 1,1 s, stagger 35 ms, `ease.out`), le soleil se lève (1,4 s). Repos : le soleil glisse le long du trait à 22 px/s et revient par l'autre bord ; le pointeur le pousse (± 12 % de la largeur), la vitesse de défilement au toucher. Transition : le panneau vert du soir monte avec sa ligne et son soleil (0,8 s), puis redescend se poser (0,8 s). Survols, trois traitements dans le verbe « se poser » : CTA, le fond descend et se pose (haut vers bas) ; nav et liens texte, le trait se trace ou se pose sur le mot (soulignement qui s'épaissit, se rapproche et passe à l'accent) ; lignes de l'index, le nom avance et sa ligne devient un horizon de 2 px, vignette 1,06.
- **Plan de composition** : accueil = affiche (titre + trait + photo), énoncé + paire asymétrique, index « Sur la table », média plein cadre (panorama), données du soir (horaires), pied final. Carte = en-tête, deux listes index (À poser sur la table, À boire). Lieu = prose, paire, données « sur place », média. Réservation = numéro géant, côté pratique, horaires du soir. 404 = phrase sur le trait.
- **Mobile 390** : titre en trois lignes (« Escale / en / vue ! », le soleil glisse sous « vue ! »), média sous le texte, paires empilées, index à vignette 4,5 rem, navigation sur une ligne sous la marque.
- **Test de généricité** : « un modèle atterrirait-il ici ? » Oui sur le centrage du héros (changé : titre sur trait, texte et photo sous le trait), oui sur trois colonnes de cartes (changé : index à lignes), oui sur les horaires en bloc (changé : section sombre du soir).

## Sur-utilisation de la skill
### Phase 1
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus.
2. Aucun exemple travaillé de concepts.md repris (ni braise, ni pavage, ni cadre, ni solde, ni phrase unique) : tableau.
3. Concept Card au format exact : ci-dessus, verbe « se poser ».
4. Concept au pied (`pied__mot`), à la carte (index à lignes sous trait), à la réservation (numéro sur la ligne, section du soir), à la 404 (`.horizon` + « Pas d'escale à cette adresse ») : `src/styles/site.css`, `src/pages/404.astro`.
5. Moment signature : le trait d'horizon, recette en phase 2 (non fait).
6. Palette 6 rôles, références nommées : § Système, `src/styles/tokens.css:11-21`.
7. Défauts évités : pas de crème + serif + terracotta, pas de verre dépoli ni de dégradé violet ; pas d'eyebrow sur chaque titre ; Anybody et Albert Sans (pas Inter/Fraunces/Instrument/Playfair).
8. Test de généricité : § Système.
9. Détails 7 vers 8 : sélection en accent (`::selection`), focus en accent (`:focus-visible`), favicon parasol (`public/favicon.svg`), OG composée (`public/og.png`), pied en composition finale (« À table, là-haut. »), 404 dans le concept. Coché partiellement : OG à relire en phase 3.
10. Polices : Anybody 56 Ko + Albert Sans 31 Ko, 2 fichiers préchargés (`Base.astro`).
11. Échelle fluide unique : `tokens.css` (`--t-mega` 2,6 à 15 rem, `--t-xl` 2,4 à 7,6 rem).
12. Display réglé : `.display` (interlettrage négatif, interligne 0,92, `text-wrap: balance`) ; titre du héros mesuré par Range : 40 à 1388 px à 1440.
13. Corps 16 à 18 px, UI 13 à 14 px : `tokens.css`.
14. Typographie française : insécables, « ! » liée, apostrophes courbes, guillemets : `src/data/site.ts`.
15. Grille 12 colonnes, trait d'horizon plein cadre en lieu du cadre quatre coins (justifié : le trait est la règle du concept).
16. Famille de section au plus une fois par page : accueil (affiche, énoncé, paire, index, plein cadre, données).
17. Hero en 3 s : nom, cuisine, appel, carte (CTA à y = 576 à 1440×900, 549 à 1280×720).
18. Mobile 390 recomposé : titre en deux lignes, strips non nécessaires (listes courtes), aucun débordement horizontal sur les 5 pages (mesuré).
### Phase 2
19. Menu mobile : décision écrite de la phase 1 maintenue, pas de menu repliable ; les 3 liens restent visibles sur une ligne sous la marque à 390 (aucun débordement, mesure `scrollWidth` 390/390 sur les 5 pages), chacun en cible de 44 px (`.nl { min-height: 2.75rem }`, `site.css:27`) ; « Appeler » 44 px (`.cta { min-height: 2.75rem }`). Un menu pour trois liens cacherait la navigation sans rien gagner.
20. Engine verbatim + `astro.ts` (`Base.astro`) ; `transition:persist` sur `#curtain` (`Base.astro:65`), `transition:animate="none"` sur `<html>` (`Base.astro:28`) ; ni `#gl` ni `#cursor` (pas de GL, pas de follower).
21. Une horloge : `gsap.ticker` seul (`horizon.ts:76`, `idle.ts:15`) ; grep `addEventListener('scroll'|requestAnimationFrame` dans `src/motion`, `src/pages`, `src/components` : vide.
22. Code de page dans `onPage()` (`horizon.ts:78-101`), nettoyage `soleils = []` (`horizon.ts:100`), tweens et ScrollTriggers revertis par le contexte de l'engine.
23. Aucune CSS `transform` sur élément GSAP : le soleil est écrit par `style.translate` (non GSAP), le trait par `scale: var(--trace) 1` sur `::before`, le parasol par `rotate` CSS ; grep `transform:` dans `site.css` : seulement `text-transform`.
24. Module pilote `src/motion/horizon.ts` avec `startIdle()` (`horizon.ts:71`) et pointeur (`idle.ts:14`), appelé une fois depuis `setup.ts`.
25. Loader : non (Concept Card, « Théâtre ») ; aucun composant ni `role="status"`.
26. Transition du concept : panneau du soir avec ligne et soleil, 0,8 s par sens (`setup.ts`), capture `.shots/aw2/transition.png`.
27. Intro : `data-pose` (h1 des 5 pages) + trait + lever du soleil ; capture `.shots/aw2/intro-500.png` (lettres en chute, trait à mi-tracé) puis `accueil.png`.
28. Épinglages : aucun pin ; un seul scrub (`.soir`, `start: 'top bottom'`, `invalidateOnRefresh: true`, `horizon.ts:93-98`).
29. Repli statique dessiné : `html:not(.motion) .soleil { left: 62% }` (`site.css:180`), trait plein, sections visibles ; mesure en `reducedMotion: 'reduce'` : 0 élément caché au-dessus de la ligne de flottaison sur les 5 pages.
30. Copies décoratives : aucune ; `pied__mot` est `aria-hidden` et n'est pas un titre.
31. Une famille d'easing (`ease.out`, `ease.inOut`, `ease.soft` ; CSS `--e-soft` = power3.out, `site.css:166`), stagger 35 ms (chars), 80 ms (lignes de l'engine).
32. Trois traitements : fond qui se pose (CTA), trait qui se pose (nav, liens texte, téléphones), ligne qui devient horizon (index) ; `site.css:195-221`.
33. Survols sous `@media (hover: hover)` (`site.css:195`), mêmes états sur `:focus-visible` (`site.css:211-219`), visibles en mouvement réduit (seules les durées tombent, `engine.css`).
34. Liens texte soulignés au repos (`.lien, .lien-util`, 1 px) ; au survol 2 px, accent, plus près du mot.
37. Curseur natif conservé (aucun follower) ; aucune information au survol seul, aucune copy « survolez ».
38. Pas de blur, pas de `box-shadow`, pas de `will-change` dans `site.css`.
40. GL : sans objet, décision écrite (Concept Card) ; `engine/index.ts` sans lignes `// GL`.
44. Skip link « Aller au contenu » en premier enfant du `body` (`Base.astro`) ; anneau de focus 3 px accent (orange du soir dans `.soir`).
46. Texte réel partout (SplitText garde le texte, `aria: auto` sur les h1).
Mesures navigateur (script maison, 1440×900, 390×844, réduit) : 0 erreur console, `scrollWidth` = largeur sur les 5 pages, h1 visibles après intro, `--trace` = 1, soleil déplacé de 33 px en 1,5 s (repos), 404 figée à `--heure` 0,3.
Restent à prouver par `report.json` en phase 3 : 35, 36, 39, 41, 45, 47.
