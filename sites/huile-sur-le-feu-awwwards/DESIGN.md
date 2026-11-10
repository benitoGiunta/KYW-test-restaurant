# DESIGN : L'Huile sur le Feu (variante awwwards)

## Brief
- **Sujet** : L'Huile sur le Feu, restaurant méditerranéen d'inspiration pouilles, pâtes fraîches maison, cuisine ouverte, boutique d'huiles Oliviers & Co dans la même maison. Rue de Marchovelette 19, 5000 Namur. Fondateur : Giuseppe Santamaria.
- **Publics** : midi (actifs du centre, 12 h à 14 h 30), soir (couples, groupes, 18 h à 21 h 15), touristes de la citadelle, habitués qui viennent aussi chercher une huile.
- **Métier du site** : réserver (Barestho ou téléphone), lire la carte, venir. Trois secondes pour savoir : nom, cuisine, bouton Réserver.
- **Ressources** : 15 photos exploitables du client (cuisine, salle, plats, boutique, oliveraie), carte complète (10 catégories, 9 à 33 €), deux menus (49,90 et 25 €), horaires, coordonnées. Aucun avis ni distinction affichés par le client : aucun n'est inventé.
- **Contraintes** : statique Astro, servi sous `base` /huile-sur-le-feu/awwwards/, noindex, pied KYW, pas de backend (réservation par lien externe, `tel:`, `mailto:`).
- **Hypothèses** : 2005 donné « selon le site » (Yelp 2002, Kompass 2007 divergent) ; photos d'aspect très lisse (génération possible, non confirmée) : usage prudent, alt neutres d'après `sujet` ; portrait non identifié exclu ; parking, terrasse, privatisation absents (inconnus).

## Trois concepts (trois territoires)
| | A. Le filet (matière) | B. La presse (lieu et outil) | C. Le lustre (système formel, boutique) |
|---|---|---|---|
| Phrase | Chaque plat reçoit l'huile choisie pour lui : la page se teinte de cette huile. | La page se presse comme une olive : le contenu se comprime puis rend son jus. | La carte est un catalogue d'étiquettes de flacons numérotés. |
| Règle de mise en page | Un filet doré vertical dans la marge, qui verse dans chaque plat. | Colonnes qui se resserrent au scroll. | Grille d'étiquettes identiques. |
| Verbe | verser | presser | étiqueter |
| Voix typo | Bodoni (Parme) romain et italique, corps grotesque | Grotesque lourd condensé | Mono et capitales |
| Palette | bordeaux nuit, or d'huile, huiles colorées | vert olive, métal | crème, étiquette |
| Signature | filet qui coule et teinte l'accent (GSAP, SVG) | écrasement scroll (shader GL) | tri filtrable |
| Ancre | « chaque assiette reçoit l'huile choisie pour elle » (truffe, piment, mandarine, menthe, ail, persil nommés dans la carte) | presse à huile (photo 08) | lustre de flacons (photo 06) |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 5 / 5 / 4 / 1 | 4 / 3 / 2 / 3 | 3 / 3 / 5 / 3 |
Test de l'échange : A ne tient avec aucun autre restaurant (les huiles nommées dans la carte sont propres à cette maison). B convient à n'importe quelle huilerie ; C à n'importe quelle épicerie. **A choisi** : seule à s'appuyer sur un fait propre à la carte et à descendre jusqu'à la ligne de plat. B donne la presse en détail de la page histoire (photo 08), C donne la 404 (le flacon vide).

## Concept Card
- **Idée** : à chaque plat son huile : un filet d'or coule dans la marge de la page et, plat après plat, prend la couleur de l'huile qui l'accompagne.
- **Métaphore** : le service à table, quand on verse l'huile choisie sur l'assiette (truffe blanche, piment, mandarine, menthe, ail, persil).
- **Signature (et recette)** : le filet qui coule (`motion.md`, tracé SVG piloté par le scroll, ScrollTrigger scrub) et qui change `--c-accent` selon l'huile du plat en vue (`[data-huile]`). Phase 2.
- **Émotion (3 premières secondes)** : chaleur et appétit : un nom immense en Bodoni sur fond bordeaux nuit, un fil d'or qui descend, la flamme de la poêle.
- **Verbe** : verser (départ lent, accélération douce, arrêt net, comme un filet d'huile).
- **Capture** : le hero (« L'Huile sur le Feu » en mégatype, filet doré à gauche, flambage à droite) et la carte avec une goutte de couleur devant chaque plat.
- **Ancre** : chaque plat de la carte nomme son huile (huile à la truffe, au piment, à la mandarine, à la menthe, à l'ail, au persil) ; la baseline « La Méditerranée dans votre assiette ».
- **Théâtre** : loader non (un restaurant se réserve en trois secondes, le rideau de transition suffit) ; GL non (le filet est un tracé SVG, la matière est dans les photos).
Le concept tient jusqu'au bout : au pied (le filet finit en goutte au-dessus de « À table. »), à la carte (goutte et nom d'huile par plat), à la réservation (les services midi et soir comme deux flacons), à la 404 (« Le flacon est vide »).

## Système
**Palette** (références : bordeaux #3f1420 et flamme #f08a32 du site actuel ; murs ocre des photos 03 et 08 ; étiquettes d'huile d'olive pouilles).
| Rôle | Hex | Usage |
|---|---|---|
| ground | #1b0d10 | fond (bordeaux de nuit), texte clair 14,5:1 |
| ink | #f5e9c9 | texte (crème d'étiquette) |
| muted | #c2aa86 | secondaire, 8:1 sur ground |
| line | #4b2c27 | filets, décoratif |
| accent | #e8a924 | or d'huile (CTA, filet), 9:1 sur ground |
| curtain | #2b0e17 | rideau de transition |
| papier / papier-fg | #f0dfb2 / #2b0e17 | sections claires (mur ocre du lieu) |
Huiles (`[data-huile]` redéfinit `--c-accent`) : truffe #d8c79c, piment #f0502f, mandarine #f89a3c, menthe #a3cc6d, ail #ece3c7, persil #86b653, toscane #e8a924.
Défaut n° 1 évité (pas de crème + serif contrasté + terracotta : ici fond sombre, accent or, huiles multiples). Pas d'acide sur noir, pas de dégradé violet, pas de verre dépoli, pas d'eyebrow systématique, pas de 01/02/03 décoratif.

**Typo** : Bodoni Moda (Google, variable 400 à 800, romain et italique) pour l'affichage, nom des huiles en italique ; Hanken Grotesk (400 à 700) pour le corps et l'interface. Quatre fichiers, deux préchargés (Bodoni romain, Hanken). Échelle fluide `--t-mega` (hero) `--t-xl` `--t-l` `--t-m` `--t-body` `--t-s` `--t-xs`. Display : interlettrage -0,03 em (mega) à -0,015 em, interligne 0,9 à 1,05, `text-wrap: balance`, descendantes réservées. Corps 16 à 18 px, interligne 1,55, mesure 62 car. UI 13 à 14 px. Prix `tabular-nums`, insécables « 24 € », « 12 h 30 », « » et apostrophes ’.

**Grille** : 12 colonnes (4 au téléphone), gutter fluide, trois lignes fortes (le filet dans la marge gauche, la colonne 7, le bord droit). Espacements : serré, normal, aéré, entracte (jamais un padding constant). **Rayon** : 0 partout, sauf la goutte (carré tourné, 3 angles arrondis). Cadre des quatre coins : le filet à gauche, la ligne `line` en pied de section, repères de coin du hero.

**Mouvement (phase 2)** : easings `ease.out` pour les entrées, `ease.inOut` pour le rideau, `ease.soft` pour le filet (verbe : verser). Durées : hover 0,25 s, entrées 0,8 à 1,1 s, rideau 0,7 s. Rôles de hover : CTA (l'huile monte du bas, remplissage or), nav et liens texte (le trait se verse de gauche à droite), plats et images (la goutte se remplit de l'huile, l'image recule de 1,03 à 1). **Repos** : la goutte au bout du filet gonfle lentement et retombe toutes les 6 s ; reduced motion : goutte fixe.

**Plan de composition** (famille unique par page)
- Accueil : poster (hero : mégatype + flambage), statement (« L'huile n'est pas la touche finale »), index (six huiles, goutte et accord), paire asymétrique (boutique Oliviers & Co, fond papier), mur (cinq photos), données (menus et horaires), pied final.
- Carte : poster court, données (deux menus), index (catégories, une ligne par plat avec goutte), colonnes compactes pour gins et vins, pied.
- Histoire : poster typographique + branche d'olivier, narration (quatre paragraphes), média plein cadre (oliveraie), paire (presse et lustre), pied.
- Réservation : poster (CTA Réserver et Appeler), données (horaires en deux flacons), paire (adresse, plan, mail), pied.
- 404 : « Le flacon est vide. », goutte vide, retour.
```
Accueil bureau           Accueil 390 px
| FIL | L'HUILE     [photo] |   | FIL | L'Huile        |
|     | sur le Feu   flamme |   |     | sur le Feu     |
|     | [Réserver][Appeler] |   |     | [photo 4:5]    |
|     |                     |   |     | [Réserver]     |
```
**Test de généricité** : « un modèle atterrirait-il sur crème + serif + eyebrow + trois cartes de plats ? » Oui pour la carte en cartes : remplacée par l'index à ligne (goutte, nom, huile, prix). Oui pour un hero photo plein cadre : remplacé par le titre immense en grille avec la photo en colonnes disjointes. Oui pour un bandeau d'avis : supprimé (aucun avis réel).

## Sur-utilisation de la skill
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : § Trois concepts. 
2. Aucun exemple travaillé de concepts.md (pas de braise qui refroidit, pavage, cadre, solde, phrase unique) : le concept est le filet d'huile par plat.
3. Concept Card au format exact, verbe « verser » : § Concept Card.
4. Concept au pied, à la carte, à la réservation, à la 404 : `Footer.astro` (goutte), `carte.astro` (`.plat__goutte`), `reservation.astro` (deux flacons), `404.astro`.
5. Moment signature (filet qui coule et teinte l'accent) et recette : § Concept Card ; implémentation en phase 2.
6. Palette de six rôles, références nommées : § Palette.
7. Les huit « defaults to avoid » : § Palette (aucun, justification du fond sombre : bordeaux du client).
8. Test de généricité : § Système.
9. Détails 7 vers 8 : sélection (`::selection` or), focus dans l'accent, favicon de l'identité (goutte), OG composée (phase 3 si besoin ; version provisoire), pied en composition finale, 404 dans le concept (à vérifier en phase 3).
10. Polices : Bodoni Moda et Hanken Grotesk, `public/fonts/`, `tokens.css`, `Base.astro` (préchargements).
11. Échelle fluide unique : `tokens.css` (`--t-mega` à `--t-xs`).
12. Display réglé : `site.css` (`.mega`, `.display`).
13. Corps et UI : `tokens.css` `--t-body`, `--t-s`, `--t-xs`.
14. Typographie française : données avec ’ et insécables (`prix`, `nw`).
15. Grille et lignes fortes : `site.css` `.wrap`, `.filet`.
16. Famille de section au plus une fois par page : § Plan de composition.
17. Hero en 3 s : nom, cuisine, Réserver visible (mesure au § ETAT.md).
18. Mobile 390 recomposé : `site.css` fin de feuille (bloc téléphone).

### Phase 2 (mouvement et interactions)
Décisions : pas de suiveur de curseur (curseur natif seul, `#cursor` absent), pas de `#gl` (pas de GL) ; menu plein écran ajouté sous 820 px (la nav en deuxième ligne de la phase 1 est remplacée, l'en-tête tient sur une ligne). Repos : la goutte au bout du filet gonfle 6 s puis lâche une perle et penche vers le pointeur (immobile en mouvement réduit).
19. [x] Menu mobile : `src/motion/menu.ts` (aria-expanded l. 31, Échap l. 19, piège Tab l. 20 à 24, focus rendu au bouton), overlay `.menu` plein écran (`site.css` « Menu plein écran ») ; vérifié à 390 px : aria-expanded true puis false, focus sur « Fermer », 9 Tab restent dans le menu, Échap rend le focus au bouton.
20. [x] Engine verbatim (phase 1), `engine/astro.ts`, `transition:persist` sur `#curtain` (`Base.astro` l. 73), `transition:animate="none"` sur `<html>` (l. 36) ; `#gl` et `#cursor` sans objet (absents).
21. [x] Une horloge : grep `addEventListener('scroll'` et `requestAnimationFrame` dans `src/motion`, `src/pages`, `src/components` : aucun ; repos et filet sur `gsap.ticker` (`filet.ts` l. 100, `idle.ts`).
22. [x] Code de page dans `onPage()` avec nettoyage : `filet.ts` (`startFilet`, retour qui tue triggers, ticker, resize), `menu.ts` (listeners retirés).
23. [x] Aucune CSS `transform` sur élément GSAP : fil (`scaleY` par GSAP, CSS `transform-origin` seul), pointe, souffle (CSS `translate` individuel), réceptacle du pied `.pied__recoit`, menu (clip-path) ; la goutte tourne par `rotate:` et n'est jamais animée par GSAP.
24. [x] Module pilote `src/motion/filet.ts` : progression de lecture et huile en vue distribuées au filet, à `--c-huile` (filet, goutte de la marque, rideau, goutte du pied), à `.is-versee` et au nom d'huile ; `startIdle()` (`idle.ts`) et pointeur (penche de la goutte).
25. [x] Loader décidé : aucun (Concept Card), pas de composant ni `role="status"`.
26. [x] Transition du concept : le rideau se verse de haut en bas, voile d'huile puis bordeaux (`setup.ts`), 0,77 s à l'aller, 0,8 s au retour.
27. [x] Intro `data-intro` + `data-split="lines"` sur chaque h1 (5 pages), média du hero en `clip` (délai 0,15), bas du hero en `up` (0,45).
28. [x] Épinglages : aucun pin ; un seul scrub (`filet.ts` l. 94, effacement du filet au pied).
29. [x] Repli statique : `html:not(.motion) .filet__pointe` masqué, filet entier immobile, images du mur à l'échelle 1 ; vérifié en `reducedMotion: reduce` : pas de `.motion`, pas de `.lenis`, 0 élément masqué.
30. [x] Copies décoratives : aucune ; le nom d'huile au bout du filet est dans un conteneur `aria-hidden`.
31. [x] Une famille d'easing (`ease.*` de l'engine, `cubic-bezier(0.33, 1, 0.68, 1)` = power3.out en CSS), hover 0,3 à 0,4 s, rideau 0,65 à 0,7 s, stagger 50 ms (menu).
32. [x] Trois traitements dans le verbe « verser » : remplissage qui monte (CTA), trait qui se verse (nav, liens, utilitaires, téléphone), goutte qui se remplit et image qui recule (plats, huiles, marque, mur) : `site.css` « Survols ».
33. [x] `:hover` sous `@media (hover: hover)` (`site.css` l. 216), mêmes états sur `:focus-visible`, `:active` présent ; états visibles en réduit (transitions à 0,01 ms).
34. [x] Liens texte `.lien` soulignés au repos.
36. [ ] À prouver en phase 3 (`desktop.idleMotion`) ; le code bouge la goutte au repos.
37. [x] Curseur natif seul ; aucune information ne dépend du survol.
38. [x] Ni blur animé, ni `box-shadow`, ni `will-change`.
39. [ ] À prouver en phase 3 (`reduced.*`) ; le code : pas de Lenis, pas de scrub, pas de loader.
40. [x] GL sans objet, décision écrite (Concept Card) ; lignes `// GL` retirées en phase 1.
41. Sans objet.
44. [ ] Skip link en premier (`Base.astro`), focus dans l'accent ; preuve clavier en phase 3.
47. [x] Cibles : nav et bouton Menu 44 px, CTA 48 px, `.cta--petit` 44 px, liens utilitaires 32 px.
