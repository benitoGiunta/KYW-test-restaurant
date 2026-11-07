# DESIGN : Le Royal Namur, variante awwwards « Face à face »

## Brief
- Sujet : brasserie de la Place du Théâtre 13, Namur, face au Théâtre de Namur ; cuisine de brasserie généreuse (moules jumbo, boulettes, burger, vol-au-vent), vins du patron, bières au fût, terrasse. Cuisine ouverte 7 j/7, 12 h à 14 h 30 et 18 h à 22 h.
- Publics : midi (affaires), soir (amis), avant ou après spectacle, touristes de la place, habitués. Métier du site : réserver (Zenchef ou 081 22 01 33), venir, lire la carte.
- Ressources : 8 photos exploitables (terrasse face au Théâtre, façade en brique, plats, boissons), logo et couronne trop petits (non utilisés, wordmark composé). Contraintes : statique, `base` `/le-royal/awwwards/`.
- Hypothèses : histoire, équipe, chef, année d'ouverture inconnus et non inventés ; n° 13 retenu (une source donne le 2) ; ardoise à 20 € lue sur la photo 04, conditions à confirmer.

## Trois concepts
1. **Face à face** : le Royal est assis en face d'un théâtre. Phrase : « Une brasserie et un théâtre se regardent à travers une place. » Règle : chaque page est un diptyque, deux faces séparées par un axe (ligne fine à la colonne 7). Verbe : faire face. Voix : serif contrasté sec contre grotesque neutre. Palette : pierre claire, ardoise, brique, jaune des chaises. Signature : l'axe, deux moitiés qui se répondent (contre-défilement en phase 2). Ancre : terrasse face au Théâtre, photo 04. Originalité 4, adéquation 5, faisabilité 4, portabilité 2.
2. **L'ardoise** : tout s'affiche comme sur l'ardoise de la terrasse (moules jumbo à 20 € mardi et jeudi). Règle : tout est annoncé en craie. Verbe : afficher. Ancre : l'ardoise. Originalité 3, adéquation 4, faisabilité 5, portabilité 3. Écarté ; ne fournit que la section « ardoise » de l'accueil (fond nuit, prix en jaune).
3. **Deux services** : le jour se joue en deux temps, midi et soir. Règle : un cadran à deux arcs. Verbe : servir. Ancre : 12 h à 14 h 30 / 18 h à 22 h. Originalité 3, adéquation 3, faisabilité 4, portabilité 4. Écarté ; fournit la bande d'horaires.
- Test de l'échange : la phrase du concept 1 échoue avec tout autre restaurant (un théâtre en face, une place, un n° 13). Retenu pour cela.

## Concept Card
- **Idée** : le restaurant et le théâtre se font face ; le site joue ce vis-à-vis.
- **Métaphore** : la place entre deux façades, l'axe entre deux moitiés.
- **Signature (et recette)** : l'axe vertical à la colonne 7 et la place (trait brique) qui s'y écoule ; les deux faces de chaque diptyque contre-défilent (pilote `src/motion/face.ts`, parallaxe opposée) ; l'intro trace l'axe entre le titre et la photo ; la transition ferme deux volets, brique (brasserie) et ardoise (théâtre), qui se rejoignent sur l'axe. Repli sans JS ou en mouvement réduit = diptyque statique, place posée au milieu de l'axe.
- **Émotion (3 premières secondes)** : on est déjà sur la place, la terrasse devant le Théâtre, l'action est « Réserver une table ».
- **Verbe** : faire face (répondre : le remplissage des CTA vient du côté opposé, le prix répond au nom).
- **Capture** : accueil, titre « Le Royal Namur » en serif à gauche, photo de la terrasse à droite.
- **Ancre** : terrasse en face du Théâtre de Namur ; Place du Théâtre n° 13 ; ardoise mardi et jeudi.
- **Théâtre** : loader non (site de service, LCP prioritaire, le rideau de transition suffit) ; GL non (la photo de la place est le sujet, aucun effet n'apporte).

## Système
- **Palette** : ground `#e3e6e4` pierre claire de la place ; ink `#14181d` ardoise du Théâtre la nuit ; muted `#4a545c` pierre bleue mouillée ; line `#b7bec0` joints des pavés ; accent `#a2301e` brique de la façade (photo 08) ; curtain `#7a2417` brique sombre ; sections nuit : fond ink, texte ground, muted `#aab4ba`, jaune `#f0c232` des chaises de terrasse. Contrastes mesurés : ink/ground 14,2, muted/ground 6,2, accent/ground 5,6, blanc/accent 7,1, jaune/ink 10,6.
- **Défauts écartés** : pas de crème + terracotta (fond gris froid, brique de la façade du client, justifiée par la photo), pas d'eyebrow sur chaque titre, pas de 01/02/03, pas d'Inter/Fraunces/Playfair.
- **Typo** : Melodrama 500 et 700 (Fontshare, serif contrasté de brasserie, écho de la serif condensée du site actuel) pour le display ; Host Grotesk variable 400 à 700 (Google) pour le corps et l'UI. 3 fichiers, 2 préchargés (Melodrama 700, Host Grotesk). Échelle fluide `--t-mega` 68 à 248 px, `--t-xl`, `--t-l`, `--t-m`, `--t-body` 16 à 17 px, `--t-s` 14, `--t-xs` 13. Display : interlettrage -0,025em, interligne 0,95, `text-wrap: balance`. Prix `tabular-nums`, insécables (« 24 € », « 12 h 30 »).
- **Grille** : 12 colonnes (une seule en dessous de 48 rem). Lignes fortes : le gutter gauche et l'axe à la colonne 7. Espacement : `--serre`, `--normal`, `--aere`, `--entracte`. Rayon 0.
- **Mouvement (phase 2, réalisé)** : une famille d'easing (`ease.out` reveals et intro, `ease.inOut` rideau, `ease.soft` petits états ; CSS `cubic-bezier(0.16, 1, 0.3, 1)` et `(0.165, 0.84, 0.44, 1)` pour les survols). Pilote : une variable par diptyque (`[data-duo]`, progression ScrollTrigger) distribuée aux faces (`[data-face=a]` y = -p × amp, `[data-face=b]` y = +p × amp × 0,6 ; amp 80 px au hero, 40 px ailleurs, 24 px sur fêtes et réservation, 0 au téléphone) et à la place (`.axe__point`), décalée par le pointeur (±25 % de l'axe) ; repos : la place avance de 40 px/s (30 au téléphone) et revient par l'autre bout (`overflow: clip` de l'axe). Rôles de survol, 3 traitements : CTA = remplissage depuis le côté opposé (brique se couvre d'ardoise venue de la droite, contour se remplit depuis la gauche) ; nav = soulignement qui se trace ; plats = le nom et le prix avancent l'un vers l'autre, le prix passe en brique ; images = zoom 1,03 dans le cadre ; liens texte soulignés au repos (épaississement), utilitaires en couleur. Pas de loader, pas de GL, pas de curseur suiveur.
- **Plan de composition** : accueil = poster (titre + photo) / bande horaires / énoncé + diptyque asymétrique / nuit (ardoise + photo) / index de plats / diptyque menu des fêtes / pied final. Carte = index nom face au prix, rubriques en paires alternées (tête à gauche puis à droite). À propos = diptyque + données (Repères). Réservation = diptyque actions / lieu. 404 = énoncé seul. Mobile 390 : une colonne, l'axe devient un filet horizontal entre les deux faces (la place y glisse de gauche à droite, sans contre-défilement), photo de hero sous le titre, titre recalé à 21 vw. Sous 23 rem (368 px), la marque se réduit au « 13 » brique (le nom reste dans `aria-label`) pour que « La carte », « À propos » et « Réserver » tiennent sur une ligne.
- **Test de généricité** : un modèle générique mettrait un hero plein cadre sombre avec bouton centré. Remplacé : hero à deux moitiés écrit à l'échelle de la place, prix en face du nom, section nuit pour l'ardoise.

## Sur-utilisation de la skill
1. Trois concepts, trois territoires (lieu, matière, temps), notés, ancre, test de l'échange : § Trois concepts.
2. Aucun exemple travaillé de concepts.md utilisé (ni braise, pavage, gril, cadre, solde, phrase unique).
3. Concept Card au format exact, verbe compris : § Concept Card.
4. Concept au pied (« Face à face. », `Footer.astro`), à la carte (`.rubrique` alternées, nom face au prix), à la réservation (diptyque `reservation.astro`), à la 404 (« Hors de la place. »).
5. Moment signature : l'axe, la place qui s'y écoule et le contre-défilement des faces : `src/motion/face.ts`, mesure Playwright à 1440×900 (faces du hero à -79,7 px et +47,8 px après 1 800 px de molette ; place 562 → 697 px quand le pointeur descend).
6. Palette 6 rôles + nuit, références réelles (photos 04 et 08) : § Système.
7. Défauts à éviter : § Système, écartés ou justifiés.
8. Test de généricité : § Système.
9. Détails 7 vs 8 : sélection brique (`site.css` ::selection), focus dans l'accent (`:focus-visible`), favicon de l'identité (`public/favicon.svg`, deux faces brique et jaune), OG composée (`public/og.png`, capture du hero, à refaire phase 3), pied en composition finale, 404 dans le concept.
10. Polices : Melodrama + Host Grotesk, `public/fonts/`, 3 fichiers.
11. Échelle fluide unique `tokens.css`, sauts d'environ ×2.
12. Display réglé : `.display` dans `site.css`.
13. Corps 16 à 17 px, interligne 1,55, UI 13 à 14 px en AA.
14. Typographie française : insécables dans `prix()` et les données, apostrophes ’, « » ; zéro tiret cadratin (contrôle Python, 0 occurrence).
15. Grille 12 colonnes, ligne forte à la colonne 7 ; pas de cadre quatre coins, axe central justifié par le concept.
16. Famille de section au plus une fois par page : diptyque sur accueil (2 usages : face et fêtes, familles distinctes : énoncé + paire / tarifs) ; gardé en phase 2, le diptyque étant la règle du concept (amplitudes différentes : 40 et 24 px).
17. Hero en 3 s : mesuré à 1440×900 (CTA bottom 880), 1280×720 (715), 1024×768 (654), `lr-mesure.log`.
18. Mobile 390 recomposé : mesuré 390, 360, 320, `scrollWidth` = largeur, aucun débordement.

### Phase 2 (mouvement et interactions)
19. Menu mobile : sans objet, décision écrite (phase 1 et § Plan de composition) ; mesuré à 320 et 360 px : marque 26×41, « La carte » 52×44, « À propos » 58×44, « Réserver » 82×44, bord droit 304 / 344, `scrollWidth` = largeur (`.logs/aww2-check2.log`).
20. Engine verbatim (`src/engine/`, copié de chez-guillaume-awwwards), `astro.ts`, `transition:persist="curtain"` sur `#curtain` et `transition:animate="none"` sur `<html>` (`Base.astro` l. 36 et 73) ; pas de `#gl` ni de `#cursor` (aucun GL ni suiveur).
21. Une horloge : grep `addEventListener('scroll'` et `requestAnimationFrame` hors `src/engine/` = 0 ; pilote et repos sur `gsap.ticker` (`face.ts` l. 56, `idle.ts` l. 16).
22. Code de page dans `onPage()` avec nettoyage (`face.ts` l. 21 et 65 : ticker retiré, ScrollTriggers tués).
23. Aucune CSS `transform` sur un élément animé par GSAP (faces, axe, place, volets, cadres et listes révélés) : grep nul ; survols par `translate`/`scale` sur des enfants non animés (`.index__nom`, `.index__prix`, `.cadre img`, `::before`).
24. Module pilote `src/motion/face.ts` + `idle.ts` (`startIdle` l. 9, pointeur l. 15), appelé une fois depuis `setup.ts` l. 25.
25. Loader : non, décision de la Concept Card (aucun composant, aucun `role="status"`).
26. Transition du concept : deux volets brique et ardoise qui se rejoignent sur l'axe, 0,7 s à l'aller, 0,8 s au retour (`setup.ts`), capture à 400 ms vue (volets à mi-course).
27. Intro : l'axe du hero se trace de haut en bas (1,3 s, `ease.out`), la place s'y pose, le lieu se révèle par mots (`data-split="words" data-intro`) ; titre, accroche, CTA et photo peints au premier rendu (LCP).
28. Épinglages : aucun pin ; ScrollTriggers du pilote en lecture seule (`start` `top top` au hero, `top bottom` ailleurs, `invalidateOnRefresh: true`).
29. Repli statique dessiné : `html:not(.motion) .axe__point` (place au milieu de l'axe, `site.css` l. 76 et 167), faces immobiles, tous les textes visibles (mesure réduite : 0 élément caché sur accueil, carte, à propos).
30. Copies décoratives : « Face à face. » du pied en `aria-hidden="true"`, aucun titre dupliqué.
31. Une famille d'easing (`ease.*` de l'engine), durées du tableau Timing (reveals 0,9 à 1,3 s, rideau 0,7 et 0,8 s, survols 0,25 à 0,5 s), stagger de l'engine 18 à 80 ms.
32. Trois traitements, tous dans le verbe « faire face » : remplissage depuis le côté opposé (CTA), soulignement tracé (nav), nom et prix qui avancent l'un vers l'autre (plats) ; zoom cadré sur les images.
33. Survols sous `@media (hover: hover)` (`site.css` l. 183), même état sur `:focus-visible` et `:active` (l. 18 à 42) ; en réduit, transitions coupées mais états conservés (l. 198). Mesuré : Tab sur « Réserver » remplit le bouton, survol d'un plat = `translate` 9,6 px / -9,6 px.
34. Liens texte soulignés au repos (`.lien`, l. 18), lien du pied KYW souligné au survol et au focus (l. 23 et 187).
35. À prouver en phase 3 (`hover.noHoverChange`).
36. `idleMotion` : la place avance de 60 px par 1,5 s en continu, soit environ 720 pixels changés à 1440×900 (seuil de `shoot.mjs` : 0,05 %, 648 px) et 0,08 % par 1,2 s (sous le 1 % de `settledMs`) ; `report.json` en phase 3.
37. Curseur natif toujours visible ; rien ne dépend du survol au toucher (états `:active`, contenu visible).
38. Ni `filter: blur()` animé, ni `box-shadow` au défilement (seul `box-shadow` : contour statique du CTA courant), aucun `will-change`.
39. Réduit : pas de Lenis (engine), pas de GL, pas de scrub (le pilote sort à `face.ts` l. 19), pas de loader ; textes cachés = 0 (mesuré) ; `reduced.moving` en phase 3.
40. GL : sans objet, décision écrite dans la Concept Card ; lignes `// GL` retirées de l'engine (en-tête de `src/engine/index.ts`).
41. Sans objet (pas de GL).
44. Lien d'évitement premier arrêt de tabulation (mesuré : `skip-link Aller au contenu`), anneau de focus brique 3 px (`site.css` l. 9), jaune sur fonds ardoise.
45. Contraste : prix au survol en brique sur pierre 5,6:1, jaune sur ardoise 10,6:1 ; contrôle complet en phase 3.
46. Texte réel partout (SplitText découpe le DOM, aucun canvas).
47. Cibles : « Réserver » d'en-tête 44 px (`.cta--petit` porté à 2,75 rem), CTA 48 px, liens de nav 44 px (mesuré à 320 et 390).
9 bis. Finitions : `::selection` brique (`site.css` l. 8), favicon SVG + `favicon-32.png` + `apple-touch-icon.png` (180 px) générés depuis le SVG et liés dans `Base.astro`.

## Phase 3 (preuves)
42-43, 48-52 : `.shots/audit.txt` (0 FAIL), `.shots/*/report.json` (axe 0, LCP mobile 2316 ms, CLS 0, 60 fps). 53 : aucun tiret dans le texte rendu (script Python sur `dist/`). 54 : audit sans phrase répétée. 56 : aucun placeholder. 58 : `grep -L robots` vide. 59 : `KywFooter` sur 5 pages (build). 60 : 0 requête échouée. 61 à 63 : non prouvés (auto-notation, une passe, accessoire non retiré).
