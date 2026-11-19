# DESIGN.md : Yayami Sushi, variante awwwards (phase 1)

## Brief
Sujet : Yayami Sushi, restaurant japonais « Japanese Sushi & take away », 15 rue de Bruxelles, 5000 Namur, 081 34 37 89, ouvert 7 jours sur 7 de 12 h à 14 h et de 18 h à 22 h (donnees.json, yayami.be au 2026-11-19).
Publics : midi (bureaux, emporter rapide), soir (livraison familiale dès 30 €), habitués (reprise du menu connu), curieux qui cherchent la carte et les prix.
Métier : commander (appel ou site de la maison), venir chercher (-10 %), lire la carte et ses prix. Pas de réservation de table en ligne (dossier).
Ressources : 47 plats et 9 menus avec prix réels, 13 photos du client (8 fonds de studio noirs, très cohérentes), logo blanc et rouge. Pas d'histoire, d'équipe, d'e-mail, de réseaux, d'avis : rien n'est inventé, ces blocs n'existent pas.
Contraintes : statique Astro, `base` /yayami/awwwards/, noindex, pied KYW.
Hypothèses : la photo `sujet` fait foi pour les alt ; la formule à volonté citée par des tiers n'est pas reprise (non confirmée).

## Trois concepts
| Concept | Phrase | Territoire | Originalité / adéquation / faisabilité / portabilité (bas = mieux) |
|---|---|---|---|
| **A. Deux pièces** (retenu) | Le nigiri se vend par deux (4,50 €) ; le site se compose par paires. | matière du métier (la pièce) + système formel (carte comme structure) | 4 / 5 / 5 / 1 |
| B. Le sceau de commande | Chaque commande est tamponnée en rouge. | métaphore du travail (le bon de commande) | 3 / 3 / 4 / 3 |
| C. Sept codes postaux | Le site est la carte de la livraison. | lieu (Namur et ses 7 codes) | 3 / 4 / 3 / 2 |
Test de l'échange : « tout va par paires » avec un autre restaurant ne tient pas, car l'ancre est le prix « 4,50 € les 2 pièces » du site officiel. B et C ne fournissent qu'un détail : le sceau rouge (disque de prix) et la zone en pastilles (section « Sept codes postaux »).
Aucun exemple travaillé de concepts.md n'est utilisé.

## Concept Card
- **Idée** : on ne vend pas une pièce, on en pose deux. Chaque bloc du site est une paire (deux cellules, deux services, deux photos, deux pastilles) posée sur un fil.
- **Métaphore** : le plateau laqué noir sur lequel le sushiman pose deux pièces.
- **Signature (et recette)** : « le sceau » : un disque rouge qui se pose sur la photo (échelle 0 vers 1 avec ressort léger, `motion.md` § reveals), puis son jumeau en filet vient s'y appairer au scroll ; phase 2.
- **Émotion (3 premières secondes)** : un nigiri brillant sur noir, un prix, un numéro à appeler.
- **Verbe** : poser (deux pièces).
- **Capture** : le hero : « Yayami Sushi » à gauche, nigiri saumon à droite, sceau « Nigiri 4,50 € les deux pièces ».
- **Ancre** : « Nigiri, 4,50 € les 2 pièces » (7 références, donnees.json).
- **Théâtre** : loader non (restaurant de commande rapide, le contenu prime) ; GL non (photos de studio déjà spectaculaires, coût et risque sans gain). Transition de page : deux volets rouges.

## Système
- **Palette** : ground `#000000` (noir des photos), ink `#f3efe8` (riz), muted `#aaa29b`, line `#2f2a29`, accent `#df0505` (rouge du logo, surfaces), accent texte `#ff5a4d`, curtain `#df0505` ; section « riz » `#efe9df` / `#140f0e` / `#b30303`. Références : ardoise noire et laque du site actuel, drapeau rouge du logo. Noir + rouge ne relève pas du défaut n° 1 (crème, serif contrasté, terracotta) : le fond est noir, la crème n'est qu'une section.
- **Typo** : Shippori Mincho 700 (display, mincho japonaise, latin, Google Fonts) et Hanken Grotesk 400 à 700 variable (corps). 2 fichiers, 2 préchargés. Échelle fluide `--t-mega`…`--t-xs` (tokens.css), display interligne 0,9 à 1, interlettrage -0,02 à -0,035 em, `text-wrap: balance`, prix `tabular-nums`, insécables « 4,50 € », « 12 h ».
- **Grille** : 12 colonnes, lignes fortes à la colonne 7 (hero, carte) ; 4 humeurs d'espacement (`--serre`, `--normal`, `--aere`, `--entracte`) ; rayon 0, seuls les disques sont ronds.
- **Mouvement (phase 2)** : easing `ease.out` / `inOut` de l'engine ; hovers : CTA (remplissage), nav (filet), plats/photos (léger déplacement) ; repos : le disque jumeau en filet pulse à peine.
- **Plan de composition** : Accueil : poster (hero) / statement + paire de faits (riz) / index carte + paire de photos asymétriques / filmstrip des menus / données (7 codes postaux) / pied final. Carte : paires asymétriques photo collante + liste index (une photo par rubrique qui en a une). Réservation : statement + données. Mobile 390 : une colonne, hero texte puis photo, bande des menus en scroll-snap, liste de rubriques pleine largeur.
- **Test de généricité** : « un modèle générique atterrirait-il ici ? » : hero rouge sur noir avec photo flottante, oui : remplacé par un hero en deux pièces (sceau lié au prix réel) ; liste de plats à points de conduite : remplacée par filets et prix en display ; footer : devenu le mot « Deux pièces. » avec la paire d'actions.

## Sur-utilisation de la skill
1. [x] Trois concepts, territoires, notes, ancre, test de l'échange : § Trois concepts.
2. [x] Aucun exemple travaillé de concepts.md : § Trois concepts (dernière ligne).
3. [x] Concept Card au format exact, verbe « poser » : § Concept Card.
4. [x] Concept au pied (`Footer.astro:9` mot « Deux pièces. »), à la carte (`carte.astro` sceau + paires), à la réservation (paire d'actions `reservation.astro`), à la 404 (`404.astro:9` « Il manque une pièce. », paire de disques).
5. [x] Moment signature et recette : le sceau (Concept Card) ; hero `index.astro` `.sceau`.
6. [x] Palette 6 rôles, références nommées : § Système, `tokens.css:12-22`.
7. [x] Défauts à éviter : pas de crème+serif+terracotta, pas d'acide sur noir (rouge du logo), pas de dégradé violet ni de verre dépoli, pas d'eyebrow systématique, pas de 01/02/03 ; Inter/Fraunces/Instrument/Playfair non utilisées.
8. [x] Test de généricité : § Système.
9. [ ] Détails 7 à 8 : favicon d'identité fait (`public/favicon.svg`, deux disques), OG composée faite (`public/og.png`), pied en composition faite, 404 dans le concept faite, `::selection` fait (engine.css) ; focus dans l'accent fait (outline `--c-accent`, à vérifier sur fond noir en phase 3) ; reste QA navigateur.
10. [x] Polices : 2 familles, 2 fichiers, 2 préchargements (`Base.astro`), `tokens.css:3-6`.
11. [x] Échelle fluide unique : `tokens.css` `--t-*`, grands sauts mega/xl/l/m.
12. [x] Display réglé : `.display*` dans `site.css:5-8`.
13. [x] Corps 16 à 17 px, UI 13 à 14 px (`--t-s`, `--t-xs`), mesure `max-width` en ch.
14. [x] Typographie française : insécables dans `euro()` et les gabarits, apostrophes courbes dans `photos.ts` et `site.ts`.
15. [x] Grille 12 colonnes, ligne forte colonne 7, cadre à quatre coins non retenu : filets horizontaux et paires (justifié : le concept est la paire, pas le cadre).
16. [x] Famille de section au plus une fois par page (poster, statement/données riz, index, filmstrip, données zone, pied).
17. [x] Hero en 3 s : nom, cuisine, ville, appel et carte au-dessus de la flottaison (à confirmer en capture, phase 3).
18. [x] Mobile 390 recomposé par media queries (`site.css` `max-width: 52rem` et `40rem`), strip menus `overflow-x` + `scroll-snap` ; mesure Playwright en phase 3.

## Phase 2 : mouvement et interactions (construction-2, 2026-11-19)
- **Module pilote** `src/motion/paire.ts` : une variable p (distance entre les deux pièces d'une paire `[data-paire]`), tirée du défilement de la section (0 écartées, 1 posées), épinglée par `data-state` (404 : `0`, la pièce manque). Pointeur : le jumeau se penche (±7 % de sa taille) ; repos : le filet pointillé du jumeau tourne à 9 degrés par seconde (plateau). Entrée de repos `src/motion/idle.ts` (pointeur, vitesse de défilement au toucher).
- **Moment signature « le sceau »** : à l'intro, le sceau rouge se pose (échelle 1,5 vers 1, rotation -14 vers 0, `ease.spring`, 0,9 s), puis le jumeau en filet glisse vers lui (1,2 s, `ease.out`) et s'arrête à distance ; le défilement du hero les appaire. Même paire sur l'en-tête de `/carte/` et sur la 404.
- **Transition** : deux volets rouges, un par moitié d'écran, se posent l'un contre l'autre (0,6 s) puis s'écartent (0,7 s).
- **Hovers, 3 traitements dans le verbe « poser »** : CTA, la couleur se pose depuis le bas (`.cta::before`, `scale`) ; navigation et liens utilitaires, filet tiré ; lignes de l'index, un petit sceau se pose devant le nom qui se décale. Liens texte soulignés au repos, le rouge monte depuis le filet.
- **Repos** : décidé, `idleMotion` attendu vrai (rotation du jumeau, mesurée : captures différentes sur 1,5 s à 1440 et 390 et sur la 404).
- **Mouvement réduit** : ni Lenis, ni scrub, ni intro ; la paire est dessinée posée (jumeau contre le sceau), tout le texte visible (mesuré : 0 élément caché sur accueil, carte, 404).
- **En-tête** : s'écarte au défilement vers le bas (classe `frame-away`), revient en remontant et au focus clavier.

### Sur-utilisation, phase 2
19. [x] Menu mobile : `Header.astro` (bouton `aria-expanded`, `aria-controls="menu"`), `src/motion/menu.ts` (overlay plein écran, focus sur le premier lien, Tab piégé, Échap ferme, focus rendu au bouton, fermeture à `astro:before-preparation`) ; mesuré à 390 : ouvert `aria-expanded=true`, focus piégé après 6 Tab, Échap : `hidden` et focus sur le bouton.
20. [x] Engine verbatim (`src/engine/`), `astro.ts` (`Base.astro` `start(setupMotion)`), `transition:persist` sur `#curtain` (`Base.astro:70`), `transition:animate="none"` sur `<html>` (`Base.astro:33`) ; `#gl` et `#cursor` sans objet (ni GL ni curseur suiveur, décision écrite).
21. [x] Une horloge : grep de `addEventListener('scroll'` et `requestAnimationFrame` hors `src/engine/` : aucun résultat ; repos et pilote sur `gsap.ticker` (`idle.ts`, `paire.ts`).
22. [x] Code de page dans `onPage()` (`paire.ts`, `menu.ts`) avec nettoyage (`actives.clear()`, retrait des écouteurs `keydown` et `astro:before-preparation`) ; aucun code DOM au niveau module.
23. [x] Aucune CSS `transform` sur un élément animé par GSAP : sceau, jumeau, volets, cibles de reveal n'ont que `left/top/inset` ; les hovers CSS passent par `scale`/`translate` sur des éléments que GSAP ne touche pas (`.cta::before`, `.index__nom`, `.tete`).
24. [x] Module pilote `paire.ts` avec `startIdle()` et influence du pointeur (`idle.x * 14`, `idle.y * 10`), appelé une fois depuis `setup.ts`.
25. [x] Loader décidé : aucun (Concept Card « Théâtre ») ; pas de composant ni de `role="status"`.
26. [x] Transition du concept 0,6 + 0,04 s à l'aller, 0,7 + 0,09 s au retour, au plus 1 s par sens (`setup.ts`).
27. [x] Intro : `hero__bas` en `data-intro` (fondu, délai 0,5 s), sceau et jumeau ajoutés à la timeline d'intro (`paire.ts`) ; titre, accroche et photo du hero peints dès le premier rendu (LCP).
28. [x] Épinglages : aucun pin GSAP ; nav de la carte en `position: sticky` (phase 1).
29. [x] Repli statique dessiné : sans `.motion`, la paire est posée (`.jumeau { left: 80% }`, capture réduite) ; `site.css` « Mouvement réduit ».
30. [x] Copies décoratives `aria-hidden` : jumeau SVG, `pied__mot`, paires de la 404 et du menu ; aucun titre dupliqué.
31. [x] Une famille d'easing : `ease.out`, `ease.inOut`, `ease.spring` (sceau seul) de l'engine ; CSS en `cubic-bezier(0.215, 0.61, 0.355, 1)` (power3.out = `ease.soft`) ; staggers 50 à 80 ms (`data-delay` 0,05 à 0,08, menu 0,06).
32. [x] Trois traitements, un par rôle, dans le verbe « poser » : `site.css:189-230`.
33. [x] `:hover` sous `@media (hover: hover)`, même état sur `:focus-visible`, `:active` présent (`site.css:189-230`).
34. [x] Liens texte soulignés au repos (`.lien`, `text-decoration: underline`, `site.css:14`).
35. [ ] `hover.noHoverChange` : à lire dans `report.json` (phase 3).
36. [x] Repos : rotation du jumeau ; deux captures à 1,5 s d'écart différentes (1440, 390, 404) ; `idleMotion` à confirmer par `report.json`.
37. [x] Curseur natif visible (aucun `cursor: none`, pas de suiveur) ; rien ne dépend du hover au toucher (index, CTA, liens fonctionnent au clic).
38. [x] Pas de blur animé ni de `box-shadow` au scroll ; aucun `will-change`.
39. [x] Réduit : `lenis` absent de `<html>`, aucun scrub ni loader, 0 élément caché (mesure Playwright `reducedMotion: 'reduce'` sur accueil, carte, 404).
40. [x] GL sans objet, décision écrite (Concept Card « Théâtre ») ; lignes `// GL` retirées de l'engine.
41. [x] Sans objet (pas de GL).
44. [x] Lien d'évitement en premier (`Base.astro`) ; focus `--c-accent-texte` sur noir (6,7:1), `--c-riz-accent` sur riz (`site.css:185-186`).
45. [ ] Contraste AA à confirmer en phase 3 (états de hover : texte noir sur riz, blanc sur rouge 5,1:1).
46. [x] Tout le texte est dans le DOM (sceau : texte réel + `role="img"` et `aria-label`).
47. [x] Cibles : « Menu » 43 × 44, « Commander » 118 × 44 à 390 px ; `.tete__tel` passé en `.nl` (padding 0,75 rem) ; à confirmer par `report.json`.
