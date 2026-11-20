# DESIGN.md : La Maison des Desserts, variante awwwards (phases 1 et 2)

## Brief
- Sujet : salon de thé, boulangerie, pâtisserie et chocolaterie, Rue Haute Marcelle 17, 5000 Namur (quartier Saint-Loup, vieux Namur), 081 22 74 51, mardi à samedi 8 h à 18 h.
- Publics : habitués du petit déjeuner et du pain, déjeuner de midi (croques, burgers, salades), goûter et commandes de fêtes, touristes du vieux Namur.
- Métier du site : venir (adresse, horaires), lire la carte (142 lignes, aujourd'hui un PDF), joindre la maison (appel, e-mail, boutique en ligne).
- Ressources : 14 photos du client utilisées (façades, salle, entremets, pains), pas de photo d'équipe. Contraintes : statique, `base` /maison-des-desserts/awwwards/.
- Hypothèses : aucune réservation de table publiée (CTA = appel, e-mail, boutique) ; histoire limitée aux faits du site (1946, 1993, 17e siècle, 3e génération) ; aucun contenu fictif (aucun `placeholder`).

## Trois concepts (territoires différents)
| | Idée | Territoire | Originalité | Adéquation | Faisabilité | Portabilité (bas = mieux) |
|---|---|---|---|---|---|---|
| A. La journée de la maison | Le site est un cadran de comptoir, 8 h à 18 h ; la carte est rangée dans l'ordre des horaires de service | rythme horaire | 4 | 5 | 4 | 2 |
| B. L'étiquette | Chaque réalisation porte l'étiquette de la maison, la carte est une vitrine d'étiquettes | métier (vitrine) | 3 | 4 | 5 | 4 |
| C. La bâtisse du 17e | La visite pièce par pièce d'une maison : fournil, laboratoire, salon | lieu (Saint-Loup, vieux Namur) | 3 | 3 | 3 | 3 |

Choix : **A**. Test de l'échange : « un cadran qui range la carte selon les horaires de service 8 h 30, 9 h, 11 h 30, 12 h, jusqu'à 17 h 30 et 18 h » ne tient qu'avec cette maison (ses fenêtres de cuisine sont inhabituelles, la carte PDF les affiche catégorie par catégorie). Écartés : B fournit un détail (légende des entremets : « porte l'étiquette de la maison », section pâtisserie), C fournit la 404 (« cette page est fermée »).

## Concept Card
- **Idée** : la journée de la maison, de 8 h à 18 h. Le site se lit comme un cadran de comptoir : une colonne d'heures, un filet vertical, des tranches de journée.
- **Métaphore** : le tableau d'horaires du comptoir, l'aiguille qui avance du pain du matin au cacao du soir.
- **Signature (et recette)** : l'aiguille. Un repère fixe dans la colonne d'heures avance avec le défilement de 8 h à 18 h et le fond de la page glisse de la farine au cacao par une variable globale sur `<html>` (motion.md, scrub sur une horloge, ground interpolé). Phase 2.
- **Émotion (3 premières secondes)** : « il est 8 h, la maison ouvre » : affiche typographique claire, façade, appel.
- **Verbe** : avancer (un remplissage avance de gauche à droite sur les CTA, un filet avance sous la navigation, l'aiguille avance sur la page).
- **Capture** : la tranche « De 8 h à 18 h, six rendez-vous » sur fond blé, et l'ardoise de la carte avec la colonne d'heures.
- **Ancre** : les fenêtres de service réelles de la carte (petit déjeuner 8 h 30 à 10 h 30, desserts 9 h à 17 h 30, cuisine 12 h à 15 h ou 11 h 30 à 17 h 30), fermeture à 18 h, ouvert du mardi au samedi.
- **Théâtre** : loader non (le site raconte déjà une ouverture, un compteur ajouterait un second rituel ; le contenu est du texte et des photos légères) ; GL non (les photos de pâtisserie sont leur propre spectacle, le client en a déjà un sur son site, le coût mobile n'est pas justifié). Rideau de transition : oui, un panneau gris rayé de la salle.

## Système
- **Palette (rôles)** : `ground` farine #E8E3DA (fond des photos de pains) ; `ink` cacao #231713 ; `muted` #5C4F46 ; `line` cacao à 28 % ; `accent` vert de l'enseigne #1F5C3F (photo 02), or de vitrine #E8A04A sur cacao ; `curtain` gris rayé #2D2E32 (photo 04). Tranches : matin farine, midi blé #EBC98C, goûter caramel #C98A45, soir cacao #231713. Références réelles : fonds des photos 11 à 14, croûte du pain, vitrine éclairée (photo 01), mur rayé de la salle (photo 04). Pas le défaut n° 1 : la farine est froide et grise, l'accent est un vert, le soir est sombre ; pas de terracotta.
- **Typo** : Hedvig Letters Serif 400 (display, noms, heures), Schibsted Grotesk 400 à 700 (corps, UI, prix tabulaires). Échelle fluide `--t-mega` à `--t-xs` (mega 122 px à 1440, 47 px à 390). Display : interlettrage -0,03em, interligne 0,95, `text-wrap: balance`. Corps 16 à 18 px, UI 13 à 14 px. Insécables « 24 € », apostrophes courbes, aucun tiret long.
- **Grille** : 12 colonnes (4 au téléphone). Ligne forte 1 : bord gauche de la colonne d'heures ; ligne forte 2 : filet vertical après la colonne 2. Espacements : serre, normal, aere, entracte. Rayon unique : 0, filets de 1 px.
- **Mouvement (planifié)** : easing de l'engine `ease.out/inOut`, rideau 0,6 s ; hovers : CTA = remplissage qui avance (accent), navigation = filet qui avance, plats/images = légère mise au repos du cadre à décider en phase 2, liens texte = soulignement qui s'épaissit. Repos : l'aiguille avance de quelques pixels par seconde sur l'horloge GSAP (hors écran en pause, off en reduced motion).
- **Plan de composition (accueil)** : affiche (hero, h1 + façade) / paire asymétrique (le pain) / données (la journée, six horaires) / mur (entremets) / média plein cadre + énoncé (salle) / statement (142 lignes) / pied final (18 h). Carte : sommaire en index d'heures puis chapitres, chaque chapitre = colonne d'heures collante + listes à filets. Mobile 390 : heures au-dessus du contenu, 4 colonnes, mur à 2 colonnes, photos pleine largeur.
- **Test de généricité** : un modèle atterrirait sur « hero centré + trois cartes » ou « crème + serif + terracotta » : écarté (affiche asymétrique, tranches de fond, colonne d'heures). Changé : le hero n'est pas une photo plein cadre sombre (comme le site actuel), la carte n'est pas un pavage.

## Mouvement (phase 2, réalisé)
- **Pilote** `src/motion/journee.ts` : une variable, l'heure (8 h à 18 h), lue sur le défilement entre les repères `data-heure` (tranches de l'accueil, chapitres chiffrés de la carte, en-têtes de la carte et de la réservation, pied à 18 h). Elle pilote : l'aiguille et l'heure du **cadran** fixe (règle 8 à 18 en bas à gauche, couleurs de la tranche qu'il survole, masqué dans le hero et le pied, absent si moins de deux repères : histoire, 404) ; la **lumière du jour** sur la façade du hero (un rai net qui avance avec l'heure) ; le **fond des tranches**, qui glisse de la couleur de la tranche précédente vers la sienne (ScrollTrigger scrub de `top bottom` à `top 35%`, variables écrites sur la seule tranche porteuse, encre choisie par calcul de contraste WCAG à chaque instant).
- **Repos** : `src/motion/idle.ts` (recette motion.md) ; dans le hero, l'heure dérive en aller-retour à vitesse constante (`wrapYoyo`, 0 à 45 min) et le pointeur la pousse de plus ou moins un quart d'heure : le rai de lumière avance sur la façade. Ticker actif seulement quand le hero est à l'écran, nul en mouvement réduit. Mesure : 1,5 s de repos à 1440 change l'image (test maison, octets PNG différents).
- **Intro** : h1 et chapeau en `data-split="lines" data-intro`, méta du hero en `data-reveal="fade"` ; la photo du hero reste peinte (LCP).
- **Rideau** : le gris rayé de la salle avance de gauche à droite (0,75 s puis 0,8 s, `expo.inOut`), l'aiguille dorée sur son bord avant.
- **Hovers** (3 traitements, verbe « avancer ») : remplissage qui avance (CTA), filet qui avance (navigation, sommaire, liens utilitaires, téléphones `.souligne`), soulignement qui s'épaissit (liens texte soulignés au repos). Survol sous `(hover: hover)`, même état sur `:focus-visible`, `:active` partout. Pas de suiveur de curseur.
- **Compteur** : 142 lignes comptées de 0 au premier passage (chiffre vrai, copie `aria-hidden`, valeur en `sr-only`).
- **Menu téléphone** : bouton « Menu » (`aria-expanded`, `aria-controls`), panneau plein écran cacao, lignes en masque, focus piégé, Échap, focus rendu, fermé au départ d'une navigation (`motion/menu.ts`, `setup.ts`). Sans JS, la navigation reste en ligne.
- **Mouvement réduit** : ni Lenis, ni scrub, ni cadran, ni lumière ; les tranches gardent leurs fonds statiques (le repli dessiné de la phase 1).

## Sur-utilisation de la skill
1. [x] Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus.
2. [x] Aucun exemple travaillé de concepts.md (ni braise, ni pavage, ni mise en place, ni cadre, ni solde, ni phrase unique).
3. [x] Concept Card au format exact, verbe « avancer » repris dans `.cta::before` (site.css) et `.nl::after`.
4. [x] Concept au pied (`Footer.astro` : « 18 h, La maison ferme. Rendez-vous à 8 h. »), à la carte (colonne d'heures, `carte.astro`), à la réservation (`reservation.astro`, heure 8 h) et à la 404 (« Cette page est fermée », heure 18 h).
5. [x] Moment signature et recette : l'aiguille, motion.md scrub + ground variable, planifié phase 2 (`data-heure` posé sur chaque tranche, `index.astro`).
6. [x] Palette 4 à 6 rôles, références réelles : `tokens.css`.
7. [x] Aucun des 8 « defaults to avoid » : voir test de généricité (hero asymétrique, pas de dégradé, pas d'eyebrow systématique, 01/02/03 absents, curseur natif).
8. [x] Test de généricité : ci-dessus.
9. [x] Détails 7 vers 8 (phase 2 : `::selection` dans l'accent, `favicon-32.png` et `apple-touch-icon.png` tirés de `favicon.svg`) : sélection (engine.css), focus dans l'accent (engine.css), favicon de l'identité (`public/favicon.svg`, cadran), OG composée (`public/og.png`, hero) faits ; pied en composition finale fait ; 404 dans le concept faite. Reste la validation en phase 3.
10. [x] Polices : 2 fichiers, 2 préchargés (`Base.astro`).
11. [x] Échelle fluide unique (`tokens.css`), mega à xl à l, grands sauts.
12. [x] Display réglé (`.display` dans site.css).
13. [x] Corps 16 à 18 px, UI 13 à 14 px.
14. [x] Typographie française : insécables dans `format.ts`, apostrophes courbes.
15. [x] Grille 12 colonnes, deux lignes fortes (colonne d'heures, filet vertical `.tranche::before`).
16. [x] Familles de section au plus une fois par page (accueil : affiche, paire, données, mur, plein cadre, statement, pied).
17. [x] Hero en 3 s : nom, nature, adresse, horaires, appel dans le premier écran (mesure 1440x900 : h1 bas 360, CTA bas 666).
18. [x] Mobile 390 recomposé : type re-réglé (`@media max-width: 760px`), 4 colonnes, heures au-dessus, mur à 2 colonnes ; le défilement horizontal est sans objet en phase 1 (mesure : débordement 0 sur 5 pages x 4 largeurs).
19. [x] Menu mobile accessible : `Header.astro` (bouton, `#menu hidden`), `motion/menu.ts` (focus piégé, Échap, retour du focus) ; test 390 : ouvert `aria-expanded=true`, focus « Fermer », 9 Tab restent dans le menu, Échap rend le focus à `.tete__menu`.
20. [x] Engine verbatim (`src/engine/`), `astro.ts`, `transition:persist` sur `#curtain` (`Base.astro`), `transition:animate="none"` sur `<html>` ; ni `#gl` ni `#cursor` (sans objet).
21. [x] Une horloge : grep `addEventListener('scroll'|requestAnimationFrame` dans `src/motion`, composants et pages = 0 ; tout par `onScroll`, ScrollTrigger et `gsap.ticker`.
22. [x] Code de page dans `onPage()` avec nettoyage (`journee.ts`, `menu.ts`).
23. [x] Aucune CSS `transform` sur un élément animé par GSAP (cadran, aiguille, lumière, lignes du menu, panneau du rideau) ; les `transform` CSS restent sur des `::before/::after` de survol.
24. [x] Module pilote avec `startIdle` et pointeur : `motion/journee.ts`, `motion/idle.ts`, appelés une fois dans `setup.ts`.
25. [x] Loader décidé : aucun (Concept Card), pas de composant ni de `role="status"`.
26. [x] Transition du concept 0,75 s et 0,8 s (`setup.ts`), à mesurer `d-90..92` en phase 3.
27. [x] Intro `data-intro` avec `data-split` sur chaque h1 ; capture `.shots/p2/a-hero.png`.
28. [x] Épinglages : aucun pin ; heures en `position: sticky` (CSS), scrub des fonds sans pin.
29. [x] Repli statique dessiné : `html:not(.motion) .cadran`, `.hero__lumiere` masqués, fonds statiques `[data-ton]` ; test réduit : 0 bloc caché, pas de classe `lenis`.
30. [x] Copies décoratives `aria-hidden` (cadran, lumière, chiffre animé), aucun titre dupliqué.
31. [x] Une famille d'easing (`ease.out/inOut/soft` de l'engine), durées du tableau Timing, stagger 60 à 80 ms.
32. [x] Trois traitements dans le verbe (voir « Mouvement »).
33. [x] Hover sous `(hover: hover)`, aussi sur `:focus-visible` (fin de `site.css`) ; à lire en phase 3 (`report.json`).
34. [x] Liens texte soulignés au repos (`.lien`).
35. [ ] `hover.noHoverChange` : phase 3.
36. [x] Repos : rai de lumière du hero (mesuré, voir « Mouvement ») ; `idleMotion` à confirmer par `report.json` en phase 3.
37. [x] Curseur natif visible, aucun suiveur, rien ne dépend du survol au toucher.
38. [x] Pas de blur animé ni de `box-shadow` au scroll, pas de `will-change`.
39. [x] Réduit : ni Lenis, ni scrub, ni loader (test maison) ; `reduced.*` à confirmer en phase 3.
40. [x] GL sans objet (Concept Card), lignes `// GL` retirées de l'engine.
41. [x] Sans objet (pas de GL).
44. [ ] Skip link premier et focus visible : anneau 2 px accent (`site.css`), à prouver en phase 3.
45. [ ] Contraste AA : encre recalculée pendant le glissement des fonds (`journee.ts`, `peindre`) ; à prouver en phase 3.
46. [x] Texte réel partout, aucun canvas.
47. [x] Cibles : CTA 49,6 px, « Menu » et « Fermer » 44 px, « Appeler » du menu 49,6 px ; à prouver en phase 3.
