# DESIGN.md : Pépite, cave à manger (variante awwwards, « Le filon »)

## Brief
- Sujet : Pépite, cave à manger, 44 rue Notre-Dame, Namur. Boutique de vins d'auteurs et assiettes à partager. Ouverte en 2017 par Catherine Mathieu. Jeudi à samedi.
- Publics : habitués du soir (cave dès 19 h), clients de la boutique (dès 16 h, samedi dès 10 h 30), touristes et Namurois en quête d'une adresse à vins, groupes (privatisation).
- Métier du site : réserver (téléphone, e-mail, site du client), venir (adresse, horaires), lire le tableau de la semaine.
- Ressources : 8 photos du client (ambiance, bouteilles, couvert ; aucune photo de plat), identité cuivre et serif (site actuel). Contraintes : statique, `base` /pepite/awwwards/, pas de backend.
- Hypothèses : voir `src/data/site.ts` (fondation 2017, téléphone 0476, aucun prix inventé, aucun placeholder).

## Concepts (trois territoires)
| | A. Le filon | B. Le tableau | C. La bougie |
|---|---|---|---|
| Territoire | nom (pépite, pépite d'or) et cave | métier : la carte réécrite chaque semaine | lieu : soirées sans gaz ni électricité |
| Phrase | un fil de cuivre traverse la cave, chaque assiette est une pépite accrochée au fil | le site est un tableau qu'on efface et qu'on réécrit | la page n'est éclairée que par une flamme |
| Règle de mise en page | un fil vertical, des losanges aux étapes | lignes de craie, tout en liste | un cercle de lumière autour du curseur |
| Verbe | affleurer | effacer | vaciller |
| Signature | le fil se trace au scroll, chaque pépite affleure (`motion.md` : trait SVG/`scaleY` lié au scroll + reveal par `clip-path`) | texte qui s'efface et se réécrit (SplitText) | masque radial suivant le curseur |
| Ancre | « pépite » = nom ; menu de 5 assiettes | So Soir 2017 : « Ici pas de menu, mais un tableau » | Le Vif 2022 : menu 100 % sans gaz ni électricité |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 4 / 5 / 5 / 2 | 3 / 5 / 4 / 3 | 4 / 4 / 3 / 3 |

Test de l'échange : A tombe si l'on met un autre nom (la pépite est le nom du lieu et le cuivre son tabouret). B convient à toute ardoise de brasserie (le dépôt a déjà le gabarit « ardoise »). C : la bougie est un détail, pas une structure de carte. Choix : **A**, il tient jusqu'au pied, à la carte et à la 404. B ne fournit que le mot « tableau » (titre de la carte), C la 404 (bougie éteinte) et la section « Parfois, à la bougie ».

## Concept Card
- Idée : un fil de cuivre traverse la cave de Pépite ; chaque assiette du tableau de la semaine est une pépite accrochée au fil.
- Métaphore : le filon : on creuse, on trouve, on partage ce qu'on a trouvé.
- Signature (et recette) : le fil de cuivre se trace avec le scroll le long du tableau de la semaine et chaque losange affleure à son passage (phase 2 : `scaleY` du fil piloté par ScrollTrigger + reveal `clip-path` des noms, `motion.md`).
- Émotion (3 premières secondes) : entrer dans une cave chaude, un nom immense en serif sur fond brun, une table aux bougies.
- Verbe : affleurer (les choses montent à la surface, lentement, `ease.out`).
- Capture : le « Pépite » géant à gauche, la table voûtée à droite, « cave à manger » en cuivre italique.
- Ancre : « pépite » (nom), le cuivre du tabouret (photo 05), la cave voûtée (photo 01), le menu de 5 assiettes à 58 €.
- Théâtre : loader non (restaurant : l'adresse et l'action doivent être lisibles en 3 s) ; GL non (aucune photo de plat, 8 photos modestes, le fil CSS/SVG suffit).

## Système
- Palette (références réelles : pierre de la cave, serviette de lin, tabouret en cuivre, lumière de bougie) : ground `#1b130f`, ink `#f1e6d6`, muted `#bba78f`, line `#43322a`, accent `#d2874a`, curtain `#0e0907` ; sections claires : lin `#efe4d3`, encre `#1b130f`, muted `#5b4a3e`, cuivre oxydé `#8c4a1c` (5,6:1). Défaut n° 1 (crème + serif contrasté + terracotta) évité : le fond principal est sombre, le lin n'est qu'un contrepoint (citation, bandeau), et le cuivre vient de la photo 05.
- Typo : Boska (Fontshare, display, romain + italique : le logo du client est un serif à empattements évasés) ; DM Mono (Google, corps et UI : le site actuel utilise une mono pour le corps). 4 fichiers (boska 400, italique, DM Mono 400 et 500), 2 préchargés (Boska 400, DM Mono 400). Échelle `--t-mega` 16 rem … `--t-xs` 0,75 rem, sauts ×2. Display : interlettrage de -0,03 à -0,05em, interligne 0,88 à 1. Corps 15 à 17 px, mesure ≤ 62 car., prix `tabular-nums`, insécables et « » appliqués.
- Grille : 12 colonnes, gouttière fluide, lignes fortes : le fil de cuivre (gauche des étapes) et la colonne 7 des pages intérieures ; 4 humeurs d'espacement (`serre`, `normal`, `aere`, `entracte`). Rayon 0 partout.
- Mouvement (phase 2, fait) : une famille d'easing, `ease.out` (expo.out) pour affleurer et `--e-out` (même courbe) pour les transitions CSS ; `ease.inOut` pour le rideau et le menu. Pilote `src/motion/filon.ts` : la profondeur (progression du défilement) se distribue à la lueur du fil du hero (vitesse suivant la vitesse du défilement), au fil du tableau (tracé au scroll, `scaleY` scrubbé) et à la dernière pépite du pied (`--profondeur`) ; le pointeur avive la lueur (`--proche`). Hovers : deux traitements, (1) le tracé : un fil de cuivre de 2 px se trace sous le mot de gauche à droite (liens texte, nav, utilitaires, téléphone, marque), (2) le CTA : le cuivre se retire vers le bas et le libellé affleure par le bas (copie `text-shadow`) ; `cta--vide` à l'inverse, le cuivre monte du bas. Pas de zoom d'image au survol : aucune image n'est un lien (décision). Repos : une lueur court à vitesse constante sur le fil du hero et revient par le haut (`gsap.utils.wrap`), la dernière pépite du pied vacille comme une bougie ; 404 : un filet de fumée monte de la bougie éteinte (keyframes CSS, figé en réduit). Rideau : pierre qui monte du sol bordée d'un fil de cuivre (0,7 s puis 0,85 s). Loader : aucun (décision phase 1).
- Plan de composition (accueil) : 1 poster (titre + portrait) ; 2 statement sur lin (citation de la patronne) ; 3 narration sur fil (tableau) ; 4 paire asymétrique (bouteilles + vins) ; 5 filmstrip (servir, goûter, bougie) sur lin ; 6 données + CTA ; pied : dernière pépite et « À table. ». Carte : poster, fil, index sur lin. Histoire : poster-paire, statement, index presse. Réservation : actions + colonne de données. 404 : bougie éteinte. Mobile 390 : colonne unique, portrait décalé à droite, strip en `scroll-snap`, titres re-réglés (`16,5vw`).
- Test de généricité : un modèle atterrirait-il sur « Hero + 3 cartes » ? Oui, donc changé : pas de cartes, le tableau est un fil, la carte est une liste d'index, la presse un index daté.

## Sur-utilisation de la skill
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus.
2. Aucun exemple travaillé de concepts.md (ni braise, ni pavage, ni gril, ni cadre, ni solde, ni phrase unique) : le fil de cuivre n'y figure pas.
3. Concept Card au format exact, verbe « affleurer » : ci-dessus.
4. Concept présent au pied (`Footer.astro` : `.pied__pepite`, dernière pépite), à la carte (`Etapes.astro` dans `carte.astro`), à la réservation (index et fil dans la colonne, `.resa__infos` bordée) et à la 404 (`404.astro` : bougie éteinte).
5. Moment signature : le fil se trace et les pépites affleurent (recette phase 2) ; état statique prêt (`.etapes`, `.etape::before` dans `site.css`).
6. Palette 6 rôles plus lin, références réelles : ci-dessus (`tokens.css`).
7. Les 8 défauts évités : crème+terracotta (justifié ci-dessus), pas d'acide sur noir, pas de dégradé violet, pas de verre dépoli (`grep backdrop` vide), pas d'eyebrow sur titre, pas de 01/02/03, ni Inter, Fraunces, Instrument Serif, Playfair.
8. Test de généricité : ci-dessus.
9. Détails 7 vers 8 : sélection (`::selection` inversée dans `engine.css`, version lin dans `.lin ::selection`), focus dans l'accent (`:focus-visible`), favicon de l'identité (`public/favicon.svg` : la pépite), OG composée (`public/og.png`, capture du hero), pied en composition finale, 404 dans le concept. Cases « sélection » et « focus » : réglées par code, preuve visuelle en phase 3.
10. Polices : `public/fonts/` (4 fichiers), `@font-face` dans `tokens.css`, 2 préchargements dans `Base.astro`.
11. Échelle fluide unique `--t-*` de `tokens.css`, grands sauts (16 rem contre 0,75 rem).
12. Display réglé : `.display`, `.titre-mega`, `.hero__nom` (`site.css`).
13. Corps et UI : DM Mono 15 à 17 px, UI 12 à 14 px.
14. Typographie française : insécables dans `site.ts` et les pages, « » à espaces insécables, apostrophes courbes ; aucun tiret cadratin (contrôle Python vide).
15. Grille 12 colonnes (`.grid`), lignes fortes (fil, colonne 7). Cadre quatre coins non retenu : le fil est la structure, l'en-tête (nom à gauche, nav à droite) et le pied suffisent.
16. Une famille de section au plus une fois par page : accueil poster, statement, narration, paire, filmstrip, données (les familles `.lin` de la citation et du strip diffèrent).
17. Hero en 3 s : nom, cuisine, adresse, CTA « Réserver » et téléphone visibles (mesure : CTA bas à 692 px à 1280×720, 764 à 1440×900).
18. Mobile 390 recomposé : `@media (max-width: 48rem)` de `site.css` ; strip `overflow-x` + `scroll-snap` ; `scrollWidth` = 390 sur les 4 pages (mini-script).
19. Menu mobile accessible : `<dialog>` modal plein écran (`Header.astro`, `site.css` `.panneau`), `aria-expanded` (`motion/menu.ts:16,25`), focus piégé et Échap natifs, focus rendu (`menu.ts:28`). Mesure Playwright 390 : ouvert, `aria-expanded=true`, focus sur « Accueil », 7 tabulations restent dans le menu, Échap ferme, `aria-expanded=false`, focus sur le bouton.
20. Engine verbatim (`src/engine/`, copié du site frère), adaptateur `engine/astro.ts`, `transition:persist="curtain"` (`Base.astro:74`), `transition:animate="none"` sur `<html>` (`Base.astro:37`). Ni `#gl` ni `#cursor` : pas de GL, curseur suiveur non retenu (décision phase 1).
21. Une horloge : `grep addEventListener('scroll')|requestAnimationFrame` hors `src/engine/` vide ; repos sur `gsap.ticker.add(tick)` (`filon.ts:54`).
22. Code de page dans `onPage()` avec nettoyage : `filon.ts:97` (IntersectionObserver déconnecté), `menu.ts:39` ; ScrollTrigger et tweens dans le `gsap.context` de l'engine.
23. Aucune CSS `transform` sur un élément animé par GSAP : `grep 'transform:' site.css` ne renvoie que `text-transform` ; pépites en losange par `clip-path` (plus de `rotate(45deg)`), animées en `scale` par GSAP.
24. Module pilote `src/motion/filon.ts` : variable profondeur, influence du pointeur (`filon.ts:55`, `--proche`), `startIdle()` (`filon.ts:51`) appelé une fois depuis `setup.ts`.
25. Loader : non (Concept Card, restaurant lisible en 3 s) ; aucun composant ni `role="status"`.
26. Transition du concept : pierre qui monte du sol + fil de cuivre (`setup.ts`, `site.css:242`), 0,7 s à l'aller, 0,85 s au retour (≤ 1 s par sens). Mesure : `/carte/` atteint par clic, rideau caché et h1 visible.
27. Intro `data-intro` : « Pépite » en caractères, « cave à manger » en mots, photo en `clip` qui monte du bas, texte du hero, fil qui descend puis sa pépite (`filon.ts`, intro). Mesure à 3 s : 0 élément du hero masqué (1440, 1280, 390).
28. Épinglages : aucun épinglage ; le fil du tableau est scrubbé (`scrub: 0.6`, `invalidateOnRefresh: true`, `filon.ts:64`).
29. Repli statique dessiné : sans `.motion`, fil plein, pépites posées, lueur fixée au tiers du fil (`site.css:103`). Mesure réduit sur les 5 pages : 0 élément masqué, pas de `lenis`, deux captures à 1,2 s identiques.
30. Copies décoratives `aria-hidden` : fil, lueur, pépites, « À table. » ; la copie du libellé CTA est un `text-shadow` (pas de texte dupliqué).
31. Une famille d'easing (`ease.*` et `--e-out`) ; durées : reveals 0,9 à 1,3 s, pépite 0,6 s, hovers 0,6 à 0,7 s ; staggers 18 à 80 ms (texte du tableau 80 ms, bande 80 ms, menu 60 ms).
32. Deux traitements au total (tracé, CTA qui se vide), tous deux dans le verbe « affleurer » ; jamais un simple changement de couleur sur un lien principal.
33. Survols sous `@media (hover: hover)` (`site.css:39,55`), mêmes états sur `:focus-visible` (`site.css:38,52,53`), `:active` présent ; restent visibles en réduit (seules les durées tombent). Mesure : survol du CTA, `background-size` 100 % 100 % vers 100 % 0 %, couleur cuivre, libellé décalé de 42 px.
34. Liens texte soulignés au repos (`.lien` : filet `currentColor` de 1 px, `.lien-util` : filet `--c-line`).
37. Curseur natif toujours visible ; rien ne dépend du hover au toucher (le menu est un bouton, le pointeur seulement avive la lueur).
38. Aucun `filter: blur` ni `box-shadow` animé ; halo de la pépite en `radial-gradient` et `opacity` ; aucun `will-change` posé.
40. GL : sans objet, décision écrite (Concept Card) ; lignes `// GL` retirées de l'engine.
46. Texte réel partout, rien dans un canvas.
47. Cibles : liens texte en `inline-block` + `padding-block: 0.3em`, bouton « Menu » et « Fermer » 44 px, CTA 48 px, « Réserver une table » et « Appeler » (réservation) 64 px.
Mesures de repos (diff PIL de deux captures à 1,5 s d'intervalle, seuil 8) : 4 298 pixels (0,33 %) à 1440×900, 1 943 pixels (0,59 %) à 390×844, sous le seuil `settled` de 1 %. Hero mobile : CTA bas à 817 px à 390×844 (photo plafonnée à 36 svh). Les points 35, 36, 39, 41, 44, 45 se prouvent par `report.json` en phase 3.

