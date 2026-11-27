# DESIGN, Monepi Boulangerie (variante awwwards)

## Brief
- **Sujet** : Monepi, boulangerie artisanale bio à Loyers (Namur), Dirk Longin. Pas un restaurant : pas de table, commande par téléphone (hypothèse retenue, dossier.md). Route `/reservation/` conservée, libellé « Commander ».
- **Publics** : habitués du vendredi, curieux du pain au levain et de l'épeautre, personnes sans gluten, gens de passage depuis Namur ou Andenne.
- **Métier du site** : voir les pains (carte), comprendre pourquoi ils sont différents, appeler, venir.
- **Ressources** : 18 photos du client (four en feu, pains sur claie, façonnage), logo, 4 farines et leurs taux, prix complets, 5 repères d'histoire. Manques : horaires hors vendredi, e-mail, quiches, avis (rien d'inventé).
- **Contraintes** : statique, `base` `/mon-epi/awwwards/`, noindex, pied KYW.

## Trois concepts
| | Extraction | La voûte de 75 cm | Le fagot sec |
|---|---|---|---|
| Territoire | métier (mouture) | lieu (architecture du four) | temps (chauffe, séchage) |
| Phrase | Un pain se lit à ce qu'il garde du grain. | Tout le site se découpe en arche. | Le bois sèche deux ans, le four chauffe quatre heures. |
| Règle de page | l'échelle 65 à 80 % ordonne les sections | masques en arche sur chaque image | frise du temps verticale |
| Ancre | 4 farines à ≈ 65, 75, 75, 80 % d'extraction, meules de granit depuis 1996 | voûte ovale de 75 cm | fagots séchés 2 ans, chauffe 3 à 4 h |
| Originalité / adéquation / faisabilité / portabilité | 4 / 5 / 5 / 1 | 3 / 4 / 4 / 2 | 3 / 3 / 3 / 2 |

Test de l'échange : la phrase 1 ne tient avec aucun autre commerce (le taux d'extraction est propre à une boulangerie qui moud). Les 2 et 3 tiennent pour tout four à bois. **Choix : Extraction.** De « La voûte » reste le détail de l'arche (masque des photos hero et four, favicon) ; du « fagot » rien, trop proche d'une page qui refroidit.

## Concept Card
- **Idée** : le taux d'extraction, part du grain qui reste dans la farine. Le site est une échelle de 65 à 80 %.
- **Métaphore** : le tamis. On passe du grain entier à la farine ; la page garde ou laisse passer.
- **Signature (et recette)** : l'échelle. Quatre barreaux (65, 75, 75, 80 %) dont la barre se remplit au défilement (motion.md, scrub de `scaleX` lié à ScrollTrigger, phase 2) ; la même barre ferme chaque page au pied.
- **Émotion (3 premières secondes)** : appétit et rigueur : un chiffre braise sur suie, un four allumé.
- **Verbe** : tamiser (garder, laisser passer).
- **Capture** : hero, « 75 % » en Tanker orange braise à gauche, arche de flamme à droite.
- **Ancre** : quatre farines moulues sur meules de granit depuis 1996 (about-us de monepi.be).
- **Théâtre** : loader non (le premier frame est le chiffre, aucune attente à masquer) ; GL non (les photos de feu portent la lumière, budget léger, faisabilité).

## Système
- **Palette** (rôles) : `ground` #17100C suie du four (fond des photos) ; `ink` #F1E7D5 farine ; `muted` #B9A68D son ; `line` rgb(241 231 213 / .18) ; `accent` #EE5A1C braise (lue sur la photo 05) ; `curtain` #0D0806. Inversion « farine » : fond #F1E7D5, texte #17100C, muted #5D4C3B, accent de petit texte #B23A0A. Or de l'épi du logo #C9B03A réservé aux détails. Références : photos 05 et 06 du client, logo Monepi.
- **Typo** : Tanker (Fontshare, 400) pour les chiffres et titres, capitales, interlettrage -0,012em, interligne 0,82 à 0,92 ; Switzer (Fontshare, 400 et 500) pour le texte. Échelle fluide `--t-mega` 7 à 33 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body` 16 à 18 px, `--t-s`, `--t-xs`. Prix en `tabular-nums`, insécables avant « % », « € », « h ».
- **Grille** : 12 colonnes (6 colonnes de lecture en mobile), lignes fortes à la colonne 1, 7 et 9 ; espacements `serre`, `normal`, `aere`. Une règle de forme : l'arche (ellipse) pour les photos du four, angles vifs ailleurs.
- **Mouvement (à planifier, phase 2)** : easing `ease.out` et `ease.inOut` de l'engine ; durées : petits 0,35 s, grands 0,9 s. Verbe tamiser : les éléments entrent par un masque qui laisse passer (clip). Hovers : CTA = remplissage vertical braise (fait en CSS), nav = soulignement qui se remplit, lignes de carte = titre en braise + aperçu photo (phase 2). **Repos** : un grain de farine tombe lentement dans le chiffre du hero (phase 2) ; sinon immobilité décidée.
- **Plan de composition** : accueil = poster (chiffre + arche) / statement / données (échelle) / paire asymétrique (four) / mur (5 pains, rail à défilement horizontal en mobile) / pied d'adresse (farine) / pied final (échelle). Carte = index à titre collant. Histoire = paire + frise (données) + citation + paire. Commande = appel + colonnes d'infos + média plein cadre. 404 = « 0 % ».
- **Mobile 390** : chiffre recadré sur toute la largeur, arche basse en 2e rangée, rail `overflow-x` + `scroll-snap`, carte sur une colonne, pied empilé.
- **Test de généricité** : « un modèle atterrirait-il ici ? » Oui sur le hero type « grand mot + photo » : changé pour un chiffre unique de 25 rem comme affiche. Oui sur la liste de prix : changé en index avec farine et taux nommés sur chaque pain. Oui sur 404 : « Restée dans le son ».

## Sur-utilisation de la skill
1. [x] Trois concepts, trois territoires (métier, lieu, temps), notés, ancre, test de l'échange : tableau ci-dessus.
2. [x] Aucun exemple travaillé de concepts.md (ni braise qui refroidit, ni pavage, ni gril, ni cadre, ni solde, ni phrase unique) : `grep` du tableau.
3. [x] Concept Card au format exact, verbe « tamiser ».
4. [x] Concept au pied (`Footer.astro`, échelle 65, 75, 75, 80), à la carte (farine et taux sur chaque pain, `carte.astro`), à la commande (infos), à la 404 (`404.astro`, « 0 % », « Restée dans le son »).
5. [x] Moment signature : l'échelle qui se remplit ; recette scrub de `scaleX` (phase 2) ; statique : `.barreau::after` largeur `--w` (`site.css`).
6. [x] Palette de six rôles, références : photos 05 et 06 du client, logo.
7. [x] Aucun des 8 défauts : fond crème + serif + terracotta écarté (fond suie, grotesque condensée, braise vue sur photo) ; pas d'acide sur noir ; pas de dégradé violet ; pas de verre dépoli ; pas d'eyebrow sur chaque titre (labels seulement sur 4 blocs d'information) ; pas de 01/02/03 ; ni Inter, Fraunces, Instrument Serif ni Playfair.
8. [x] Test de généricité fait (trois changements).
9. [~] Détails 7 vers 8 : sélection (`::selection` engine), focus braise (`:focus-visible`), favicon arche + flamme (`public/favicon.svg`), OG composée (`public/og.png`), pied en composition finale, 404 dans le concept : fait. Hover et QA en navigateur : phase 2 et 3.
10. [x] Polices : Tanker 400, Switzer 400 et 500, 3 fichiers, 2 préchargés (`Base.astro`).
11. [x] Échelle fluide unique `tokens.css`, `--t-mega` 7 rem à 33 rem contre `--t-s` 0,875 rem.
12. [x] Display réglé : capitales, interlettrage négatif, interligne 0,82 à 0,92, `text-wrap: balance`.
13. [x] Corps 16 à 18 px, interligne 1,55, UI 13 à 14 px, contrastes calculés dans `tokens.css`.
14. [x] Typographie française : insécables, apostrophes courbes, « » ; aucun tiret cadratin.
15. [x] Grille 12 colonnes, lignes fortes colonnes 1, 7, 9 ; cadre quatre coins non retenu (l'échelle des filets horizontaux le remplace).
16. [x] Chaque famille de section une seule fois par page.
17. [x] Hero en 3 s : chiffre, titre, CTA visibles sans défiler à 1440×900, 1280×720, 1024×768 et 390×844 (CTA bas : 691, 641, 555, 610 px).
18. [x] Mobile 390 recomposé : chiffre `clamp`, arche basse, rail `scroll-snap`, aucun débordement horizontal (`scrollWidth` 390 sur 4 pages).

### Phase 2 (mouvement, interactions)
Pilote : `src/motion/tamis.ts` (variable unique : part du défilement lue de 65 à 80 %, distribuée à la jauge de l'en-tête, aux barreaux et au filet du pied ; pointeur qui écarte les grains ; `startIdle`). Appelé une fois par `src/motion/setup.ts`. Signature : l'échelle se remplit au défilement (scrub `--b` sur `scale` des `::after`) et la jauge de l'en-tête compte de 65 à 80 % sur chaque page.
19. [x] Menu mobile sous 40 rem : `Header.astro` bouton « Menu » `aria-expanded`/`aria-controls`, overlay plein écran (`site.css`, `.entete.is-open .nav`), focus piégé et Échap (`tamis.ts`, `initMenu`). Mesure 390 : ouverture `aria-expanded=true`, nav 390×844, focus sur « Carte », Tab boucle Carte > Histoire > Commander > Fermer, Échap rend le focus au bouton, clic sur un lien ferme puis navigue.
20. [x] Engine verbatim, `astro.ts` (`start(setupMotion)` dans `Base.astro`), `transition:persist` sur `#curtain`, `transition:animate="none"` sur `<html>`. `#gl` et `#cursor` sans objet (ni GL ni follower, décision ci-dessous).
21. [x] Une horloge : `grep "addEventListener('scroll'|requestAnimationFrame" src/motion src/pages src/components src/layouts` vide ; grains sur `gsap.ticker`, jauge par `onScroll` de l'engine. (Le seul listener scroll est celui, verbatim, de `engine/scroll.ts` en mouvement réduit.)
22. [x] Code de page dans `onPage()` (`tamis.ts`), nettoyages rendus (menu, idle, observateur, pointeur) ; aucun code DOM au niveau module.
23. [x] Aucune CSS `transform` sur un élément GSAP : barreaux et pied par `scale: var(--b) 1` (GSAP tweene `--b`), jauge, image du hero, grains et liens du menu sans transform CSS. Les `transform` CSS restants (`.btn::before`, `.entete` en `frame-away`) ne sont pas animés par GSAP.
24. [x] Module pilote avec `startIdle` (grains) et pointeur (`pointermove` sur le hero écarte les grains de 90 px).
25. [x] Loader : aucun, décidé en phase 1 (le premier frame est le chiffre ; aucun `#loader` dans `Base.astro`).
26. [x] Transition du concept : le rideau suie bordé d'un filet braise tombe (0,7 s) puis continue sa chute (0,8 s), `setup.ts`. Mesure : après clic sur « Carte », rideau `hidden`, h1 visible à 2,6 s.
27. [x] Intro : `data-split="lines" data-intro` sur chaque h1 (5 pages), image du hero de 1,12 à 1 (déjà peinte), grains en fondu. Le chiffre « 75 % » reste peint au premier frame (LCP).
28. [x] Épinglage : aucun pin ; scrubs `start: top 92%`, `end: top 50%`, `invalidateOnRefresh: true`. Titres de rayon en `position: sticky` CSS (phase 1).
29. [x] Repli statique : sans mouvement, barreaux pleins (`--b` absent = 1), grains semés immobiles, h1 et blocs visibles (mesure réduit : 0 élément caché sur 5 pages, pas de classe `lenis`).
30. [x] Copies décoratives : chiffre du hero, grains, jauge, échelle du pied en `aria-hidden` ; aucun titre dupliqué.
31. [x] Une famille d'easing (`ease.out`, `ease.inOut`, `ease.soft` de l'engine) ; durées 0,35 à 0,5 s (petits), 0,7 à 1,6 s (grands) ; stagger 60 ms (menu), 80 ms (lignes engine).
32. [x] Trois traitements, verbe « la barre se remplit » : CTA remplissage vertical, nav et liens du pied soulignement qui se remplit, lignes de carte filet de la longueur du taux de la farine + titre braise. Liens texte : soulignement qui s'épaissit en braise.
33. [x] `:hover` sous `@media (hover: hover)`, même état sur `:focus-visible` (`site.css`, bloc phase 2) ; `:active` sur `.btn`, liens, `.menu-btn`.
34. [x] Liens texte `.lien` soulignés au repos.
35. [ ] Phase 3 (`report.json`).
36. [~] Repos : grains en écoulement constant (24 grains de 4 à 6 px, 0,05 à 0,1 hauteur par seconde) mesurés en mouvement (transform change en 1,5 s) ; `idleMotion` à lire en phase 3.
37. [x] Curseur natif, pas de follower ; rien ne dépend du hover (aperçu de ligne = décor, prix et farine toujours écrits).
38. [x] Aucun blur ni `box-shadow`, aucun `will-change`.
39. [x] Réduit : ni Lenis (pas de classe `lenis`), ni scrub, ni grains animés, ni loader ; 0 texte caché (mesure).
40. [x] GL sans objet, décision écrite en Concept Card ; lignes `// GL` retirées de l'engine.
41. [x] Sans objet (pas de GL).
44. [~] Skip link « Aller au contenu » en premier (`Base.astro`), focus braise (`engine.css`) ; à confirmer en phase 3.
45. [ ] Phase 3.
46. [x] Tout le texte est du DOM, aucun canvas.
47. [~] Bouton Menu 44 px (mesuré), CTA 48 px, liens de nav et du pied 44 px ; mesure complète en phase 3.
