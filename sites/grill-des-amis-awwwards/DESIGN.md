# Le Grill des amiS : variante awwwards « Du brut au feu »

## Brief
- **Sujet** : restaurant de viandes à Namur (Rue Saint-Joseph 10). Grosses pièces achetées brutes, découpées et maturées sur place (deux chambres), cuites au feu de bois. Chef : Gaëtan ; maison d'Elise et Gaëtan.
- **Publics** : midi (lunch 15,50 €, steak du midi 17 €), soir (grillades 27 à 40 €, Menu Viandard 69 €/personne), tables d'amis et de famille, touristes de la ville.
- **Métier du site** : réserver (téléphone d'abord, lien en ligne du client), venir, lire la carte.
- **Ressources** : 17 photos réelles du client (gril, découpe, chambre bleue, salle, terrasse), logo losange GS, carte complète transcrite du PDF. Aucun e-mail, réseau, avis ni année d'ouverture : rien n'est affiché à leur place.
- **Contraintes** : statique, `base` `/grill-des-amis/awwwards/` (liens et assets par `lib/url.ts`), noindex, pied KYW, français, vouvoiement, aucun tiret long.
- **Hypothèses** : mardi, mercredi, dimanche « fermé (à confirmer) » comme dans les données ; la photo des patrons est légendée sans nom (identité à confirmer) ; pas de plat fictif.

## Trois concepts (trois territoires)
| | Territoire | Phrase | Ancre | Originalité | Adéquation | Faisabilité | Portabilité (bas = mieux) |
|---|---|---|---|---|---|---|---|
| A. Du brut au feu | métier (la pièce suivie de l'achat au gril) | Le site suit une seule pièce de viande à travers quatre gestes, tous faits dans la maison. | achète brut, découpe, deux chambres de maturation, feu de bois (/viandes) | 4 | 5 | 4 | 1 |
| B. amiS | nom (le S final majuscule du logo) | Tout se compte en convives : la carte est lue par nombre de personnes. | Assiette des Amis 1 kg, Viandard dès 2 personnes | 3 | 4 | 5 | 3 |
| C. La planche | métaphore (le boucher) | La carte est une planche de découpe annotée. | hampe « morceau du boucher » | 3 | 3 | 3 | 3 |

Test de l'échange : A ne tient pas avec un autre restaurant (un restaurant sans chambre ni découpe sur place n'a pas les quatre gestes) ; B et C marcheraient pour toute table d'amis ou toute boucherie. **Choix : A**, parce qu'elle est la seule prouvée par les faits du client. B fournit un détail (le S de « amiS » en braise dans le titre), C un détail (les traits de coupe qui séparent chaque section).

## Concept Card
- **Idée** : le site suit une pièce de viande de l'achat à l'assiette, en quatre gestes faits sur place.
- **Métaphore** : le travail du boucher-grilleur ; chaque page est un geste (accueil : le feu, carte : la découpe, la maison : la maturation, réservation : le partage, 404 : la chambre vide).
- **Signature (et recette)** : la tranche. Les images et les blocs se révèlent par des coupes droites en `clip-path: inset()` (motion.md, recette « clip reveal »), pilotées par un seul driver : la progression de défilement dans « Du brut au feu » fait passer la photo de la chambre bleue à la braise. Phase 2.
- **Émotion (3 premières secondes)** : chaleur sombre et bruit de gril : un titre massif, une photo de flammes, deux boutons.
- **Verbe** : trancher (coupes nettes, droites, sans courbe ; les easings `ease.inOut` sec, jamais de rebond).
- **Capture** : « LE GRILL DES AMIS » en blanc os avec le S en braise, à côté de la photo des flammes.
- **Ancre** : le restaurant achète des grosses pièces brutes, les découpe et les fait maturer dans ses deux chambres (site du client, /viandes et publication du 15 mai).
- **Théâtre** : loader non (le contenu est une carte à lire vite, le feu suffit) ; GL non (les photos du client sont le sujet ; un shader volerait la braise réelle).

## Système
- **Palette** (rôles) : `ground` #14100e fonte du gril ; `ink` #efe6d8 os de boucher ; `muted` #a89d8e cendre ; `line` #3d312a trait de scie ; `accent` #e8452c braise (sur os : #b3200c) ; `curtain` #1c2f7a bleu des chambres de maturation ; sections claires « os » ; bordeaux #4a1118 relevé sur le médaillon « spécialiste viandes » du client. Références : les cartes de boucherie sur papier os, les armoires de maturation vitrées de la salle, le logo rouge et or du client.
- **Typo** : Anton (display, majuscules, 400) pour titres, noms de plats et prix ; Newsreader (corps, 400 à 700, italique pour les notes). Échelle fluide `--t-mega` à `--t-xs` dans tokens.css. Display : interligne 0,86 à 0,92, interlettrage -0,005em (Anton est déjà serré), `text-wrap: balance`. Corps 17 à 20 px, interligne 1,5. Prix `tabular-nums`, espaces insécables « 27 € », « 12 h à 14 h ».
- **Grille** : 12 colonnes (4 au téléphone), gouttière fluide ; deux lignes verticales fortes (le bord gauche et la ligne à 8/12 du hero) ; trois humeurs d'espacement (`--serre`, `--normal`, `--aere`) ; rayon 0 partout.
- **Mouvement (réalisé en phase 2, voir § Mouvement réalisé)** : easing `ease.inOut` de l'engine, coupes 0,45 à 0,5 s. Hovers : CTA = plein tranché de gauche à droite (`::before` en `clip-path`) ; nav = trait braise qui se tire ; lignes d'index et plats = décalage de 0,8 rem et passage en braise ; liens texte = soulignement. État de repos : les flammes de la photo du hero respirent (zoom 1 à 1,03 sur l'horloge GSAP) et le trait de coupe de chaque section se tire à l'entrée ; immobilité décidée ailleurs.
- **Plan de composition** (familles, chacune une seule fois par page) :
  - Accueil : poster (hero) ; narration en rangées (quatre gestes) ; index (pièces du boucher) ; données (69 € et ses trois faits) ; paires asymétriques (salle, terrasse) ; données secondaires (le midi, deux prix) ; pied final (mot géant et horaires).
  - Carte : poster + média plein cadre ; index à rubriques (titre collant à gauche, lignes à droite) ; interludes photo plein cadre.
  - Maison : paire texte et portrait ; statement (citation signée) ; liste d'ADN ; paire.
  - Réservation : paire (téléphone, services) ; paire (avant de venir, photo).
- **Mobile 390 px** : titres recalculés par `(100vw - 2 gutter) / k` (k mesuré au mot le plus large), grilles à une colonne, photos des gestes sous le texte, nav des rubriques en bande défilante `overflow-x` avec `scroll-snap`, menu en `<dialog>` plein écran.
- **Test de généricité** : « un modèle générique atterrirait-il ici ? » Oui sur : hero centré avec photo de steak (changé : titre en deux lignes à gauche, photo de braise verticale en colonne, ligne verticale), liste de plats en deux colonnes (changé : titre collant et index à prix tabulaires), fond noir et rouge de steakhouse (changé : sections os et bordeaux alternées, bleu des chambres pour le rideau et la 404), avis clients (supprimés, aucun réel).

## Sur-utilisation de la skill (preuves)
1. [x] Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus.
2. [x] Aucun exemple travaillé de concepts.md : ni braise qui refroidit, ni pavage, ni mise en place sur le gril, ni cadre, ni solde, ni phrase unique ; la maturation et la découpe sont des gestes réels du client.
3. [x] Concept Card au format exact, verbe « trancher » traduit en `clip-path inset` et easing sec (site.css `.cta::before`, setup.ts).
4. [x] Concept au pied (mot « À table, entre amis » et trait de coupe `.pied::before`), à la carte (index tranché, interludes), à la réservation (services par coupes), à la 404 (« Pièce introuvable », chambre bleue, lame braise) : `src/pages/*.astro`.
5. [x] Un moment signature et sa recette : la tranche, clip reveal, driver unique (phase 2).
6. [x] Palette en 6 rôles, références nommées : § Système.
7. [x] Défauts évités : pas de crème + terracotta (fonte et braise, os seulement en section claire), pas d'acide sur noir, pas de dégradé violet, pas de verre dépoli, pas d'eyebrow sur chaque titre (seul « Geste n sur 4 » en a un, séquence réelle), numérotation 1 à 4 réelle ; Anton et Newsreader choisis par le métier (affiche de boucherie, carte imprimée).
8. [x] Test de généricité : § Système.
9. [x] Détails 7 vers 8 : sélection `::selection` en os sur fonte (engine.css), focus en braise (`:focus-visible`), favicon losange GS (`public/favicon.svg`), OG composée depuis le hero (`public/og.png`), pied en composition finale, 404 dans le concept.
10. [x] Polices : Anton 400 (18 Ko) et Newsreader normal et italique (122 Ko), deux préchargées (Base.astro), `@font-face` sous `base` (tokens.css).
11. [x] Échelle fluide unique, grands sauts (`--t-mega` 5 à 24 rem contre `--t-body` 17 px) : tokens.css.
12. [x] Display réglé : interligne 0,86 à 0,92, balance, descendantes non coupées (`.display`, `.hero__titre`).
13. [x] Corps 17 à 20 px, interligne 1,5, mesures `max-width: 44ch à 56ch`, UI 13 à 15 px en AA (contrastes dans tokens.css).
14. [x] Typographie française : « » dans les citations, apostrophes ’, insécables avant € et h, `À` accentué en capitale.
15. [x] Grille 12 colonnes, ligne verticale du hero et traits de coupe ; cadre quatre coins non retenu (le trait de coupe en haut de section et la ligne à 8/12 portent la structure).
16. [x] Une famille de section au plus une fois par page : plan ci-dessus.
17. [x] Hero en 3 s : nom, « spécialiste viandes à Namur », Réserver et Appeler, flammes (mesuré à 1440, 1280, 1024, 390 : h1, CTA et média ne se chevauchent pas ; scrollWidth égal à la largeur).
18. [x] Mobile 390 recomposé : type re-réglé, grilles à une colonne, bande des rubriques en `overflow-x` + `scroll-snap`, signature adaptée (la tranche reste verticale en une colonne).

## Mouvement réalisé (phase 2)
- **Pilote** `src/motion/tranche.ts`, appelé une fois depuis `setup.ts` : une variable, le feu (0 = pièce crue en chambre bleue, 1 = braise), tirée de la progression dans la liste des quatre gestes (`ScrollTrigger` 65 % à 65 %), écrite en `--feu` sur la seule section `[data-feu]`. Elle règle le fil des gestes (`.gestes__fil`, coupe `clip-path` d'un dégradé bleu chambre vers braise : la pointe change de température) et allume les rangs passés (`.est-passe`). Mesure : 0,19 / 0,40 / 0,60 / 0,81 / 1,00 et 0 à 4 rangs à 1440 ; même progression à 390.
- **Signature, la tranche** : chaque photo `[data-tranche]` s'ouvre par une coupe droite de gauche à droite (`clip-path: inset(0 calc((1 - var(--coupe)) * 100%) 0 0)`), une lame braise de 3 px tenant le bord de la coupe ; une seule variable `--coupe` tweenée par GSAP (0,9 s, `expo.inOut`). Gestes, pièces, salle, interludes de la carte, figures de la maison et de la réservation.
- **Intro de l'accueil** (rien n'est caché, LCP intact) : photo des flammes de 1,08 à 1, lignes du titre qui se posent (14 %), lame qui tranche la photo de haut en bas, le S de « amiS » qui prend la braise (os vers braise). Pages intérieures et 404 : trait braise tiré sous le titre (`.page-tete__lame`).
- **Repos** (`startIdle`, `idle.ts`, horloge `gsap.ticker`) : la photo du hero respire (échelle 1,05 ± 0,02) et suit le pointeur (± 3 %), la lame la parcourt à vitesse constante (7 s, revient par le haut), en pause hors écran (`IntersectionObserver`), à zéro en mouvement réduit.
- **Transition** : la chambre bleue est tranchée de gauche à droite, une lame braise de 6 px au bord de coupe ; à l'arrivée la coupe repart vers la droite et découvre la page (0,5 s par sens, mesuré 1,14 s accueil vers carte, chargement compris).
- **Hovers, trois traitements** dans le verbe : (1) CTA plein tranché de gauche à droite (`.cta::before`) ; (2) trait braise tiré (nav, rubriques de la carte, liens texte épaissis en braise, téléphone de la réservation) ; (3) décalage tranché (lignes d'index, liens du menu, losange de la marque qui pivote de 45 degrés). Tout sous `@media (hover: hover)`, même état sur `:focus-visible`, `:active` présent.
- **Rubriques de la carte** : la rubrique lue s'allume (`aria-current="location"`) et la bande défile jusqu'à elle au téléphone.
- **Non retenu** : loader et GL (Concept Card), curseur suiveur et `data-magnetic` (mou, contraire au verbe « trancher »), aperçu au curseur des index (aucune photo par plat : on n'illustre pas un plat sans preuve).

## Sur-utilisation de la skill, phase 2 (preuves)
19. [x] Menu mobile : `<dialog>` modal plein écran (`.menu`, 100dvh), `aria-expanded` vrai puis faux, focus piégé (8 tabulations restent dans `#menu`), Échap ferme, focus rendu à « Menu » (contrôle Playwright à 390, journal `.logs/awwwards2-check.log`).
20. [x] Engine verbatim (`src/engine/`), `astro.ts`, `transition:persist="curtain"` sur `#curtain` (Base.astro:72), `transition:animate="none"` sur `<html>` ; pas de `#gl` ni de `#cursor` (non retenus).
21. [x] Une horloge : grep `addEventListener('scroll'|requestAnimationFrame` hors `src/engine/` = 0 ; repos par `gsap.ticker` (idle.ts, tranche.ts).
22. [x] Code de page dans `onPage()` avec nettoyage (tranche.ts:103 à 114, menu.ts:86 à 89).
23. [x] Aucune CSS `transform` sur un élément animé par GSAP : `scale`/`rotate` CSS seulement sur des pseudo-éléments et le losange (non animés par GSAP) ; GSAP écrit `--coupe`, `--y`, `scale`, `clipPath`.
24. [x] Pilote `tranche.ts` avec `startIdle()` et pointeur (`idle.x`, `idle.y` sur la photo du hero).
25. [x] Loader décidé : aucun (Concept Card), aucun `role="status"`.
26. [x] Transition du concept 0,5 s par sens (setup.ts), mesurée 1,14 s aller-retour fetch compris.
27. [x] Intro de l'accueil dans le timeline `intro` de l'engine (tranche.ts `introHero`), premier frame = photo et titre déjà peints.
28. [x] Épinglages : aucun pin ; titres de rubrique `sticky` CSS.
29. [x] Repli statique : `html:not(.motion)` cache lames du hero et du rideau, fil des gestes plein (`--feu: 1`), rangs en braise ; aucune coupe posée (classe `est-arme` posée par JS seulement).
30. [x] Copies décoratives : aucune copie de texte ; lames et fil `aria-hidden="true"`.
31. [x] Une famille d'easing : `expo.inOut` / `expo.out` de l'engine, `--e-coupe` et `--e-sortie` en CSS (mêmes courbes) ; `steps()` du menu remplacé ; stagger 50 à 80 ms.
32. [x] Trois traitements par rôle, dans le verbe (§ Mouvement réalisé).
33. [x] Hover sous `(hover: hover)`, aussi sur `:focus-visible` (site.css, grep `@media (hover: hover)`).
34. [x] Liens texte soulignés au repos (`.lien`, `.rdv-tel`).
36. [ ] À prouver en phase 3 (`idleMotion`, `idleAt`) ; repos en place (lame à vitesse constante : `--y` 0,07 vers 0,19 en 0,8 s mesuré).
37. [x] Curseur natif jamais masqué, aucun contenu au seul survol.
38. [x] Pas de blur animé ni `box-shadow` au scroll ; pas de `will-change`.
39. [x] Réduit (mesure Playwright `reducedMotion: reduce`) : texte caché 0 sur les 5 pages, pas de Lenis (engine), pas de scrub, pas de loader.
40. [x] GL : sans objet, décision écrite (Concept Card), lignes `// GL` retirées.
44. [x] Lien d'évitement premier, focus braise partout (engine.css).
47. [x] Cibles : CTA 52 px, « Menu » 44 px, liens isolés `padding-block` (`.lien`).
