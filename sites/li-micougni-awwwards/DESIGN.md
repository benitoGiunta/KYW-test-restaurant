# DESIGN.md · Li Micougni · variante awwwards « Les demi-fous »

## Brief
- **Sujet** : Li Micougni, restaurant ouvert en 2026, Rue des Brasseurs 110, 5000 Namur. Produits locaux et de saison, ardoises à partager, grillades au charbon de bois, terrasse de 30 couverts en cour privée (donnees.json, dossier.md du 10/11/2026).
- **Publics** : le midi (mercredi à vendredi, à confirmer), le soir, les touristes du centre historique, les habitués, les groupes (privatisation). **Métier du site** : réserver (téléphone d'abord), consulter la carte, venir.
- **Ressources** : 17 photos du client (salle, terrasse, grill, ardoises, plats, polaroïds, logo), carte complète de 50 lignes, logo (coq, clocher, pont). Ni façade, ni équipe, ni avis, ni GPS.
- **Contraintes** : site statique Astro sous `base` /li-micougni/awwwards/, réservation sans backend, noindex.
- **Hypothèses** : adresse d'exploitation (pas le siège BCE) ; horaires non publiés donc tous marqués « à confirmer », aucun `OpeningHoursSpecification` ; aucun plat, avis ni prénom inventé ; histoire reformulée depuis le site du client sans nommer de personne.

## Trois concepts
| | Territoire | Phrase | Règle de mise en page | Verbe | Ancre | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|---|---|---|
| A. **Les demi-fous** | nom, étymologie | Chaque titre est coupé en deux moitiés décalées ; elles se recollent quand on s'attable. | Toute grande ligne est coupée à 55 % de sa hauteur, moitié basse décalée de 0,07 em ; le pied recolle le nom. | recoller | Le nom wallon : « vous êtes tous les bienvenus, même les demi-fous » (site du client) | 4 | 5 | 5 | 1 |
| B. **La girouette** | lieu, culture | Le coq du logo tourne vers le vent : la page se tourne vers l'heure du service. | Boussole d'orientation fixe en marge. | pivoter | Coq, clocher et pont du logo | 3 | 3 | 4 | 4 (tout coq wallon l'utiliserait) |
| C. **L'ardoise à partager** | matière, service | Le site est une ardoise posée entre deux convives. | Blocs en paires, craie sur ardoise. | glisser | Ardoises « pour deux », ardoise gravée au logo | 3 | 5 | 4 | 2 |

**Choix : A.** Test de l'échange : la phrase ne tient avec aucun autre restaurant (elle repose sur le nom). B est écarté (portable, et un coq est un décor), il ne fournit que le logo du pied. C est écarté comme structure, il fournit un détail : la section « Les ardoises, pour deux » et la palette ardoise et craie. Aucun exemple travaillé de concepts.md n'est repris (ni braise qui refroidit, ni pavage, ni cadre, ni solde courant, ni phrase unique).

## Concept Card
```
Idée:        Chaque titre de Li Micougni est coupé en deux moitiés décalées, comme les « demi-fous » que le nom wallon accueille ; elles ne se recollent qu'à table.
Métaphore:   Le demi et l'entier : la demi-portion, la demi-folie, l'ardoise qui se partage à deux. Personne n'est entier tout seul.
Signature:   Le recollement : la moitié haute et la moitié basse d'un titre glissent jusqu'à s'aligner (--ecart de 0,07 em vers 0), recette scrub de motion.md ; au pied, le nom est déjà recollé et passe en orange.
Émotion:     Espièglerie chaleureuse : on pousse une porte où personne ne se prend au sérieux, mais la cuisine est sérieuse.
Verbe:       RECOLLER : deux moitiés se rejoignent sec (ease.out), avec un léger jeu à l'arrivée, jamais d'élastique.
Capture:     « Li Micougni » géant en craie sur ardoise, moitié basse décalée, au-dessus du grill au charbon allumé.
Ancre:       Le nom wallon et sa phrase d'accueil, « même les demi-fous » (site du restaurant).
Théâtre:     Loader non : un restaurant se juge en 3 secondes, la page doit servir tout de suite ; le rideau brun rouge de transition suffit. GL non : la signature est typographique et les photos du client portent l'image.
```

## Système
- **Palette** (rôles) : `ground` #1d1916 ardoise chaude de la carte · `ink` #f1e8d8 craie du lettrage (14,4:1) · `muted` #bcae9b (8,0:1) · `line` #4d433a trait de craie · `accent` #e57f35 orange du logo éclairci (6,2:1 sur ground) · `curtain` #7a2416 brun rouge du lettrage du logo et des banquettes · surface `orange` #d97631 avec encre #2a0e07 (5,7:1) et encre douce #4a1a0d (4,6:1). Références réelles : logo du client (orange et brun rouge), ardoise gravée (photo 08), banquettes rouges et fauteuils bruns (photos 03, 04). Défaut n° 1 (crème, serif, terracotta) écarté : le fond est ardoise et non crème, l'orange est celui du logo, et il ne sert que de seconde moitié.
- **Typo** : Young Serif 400 (titres, noms de plats, prix en grand ; Google Fonts, ronde et chaude comme le lettrage du logo) et Schibsted Grotesk 400 à 900 (corps, UI). Deux fichiers, deux préchargés. Échelle fluide `--t-mega` 4,5 à 24 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body` 16 à 18 px, `--t-s` 15 px, `--t-xs` 13 px. Display : interlettrage -0,035 em (mega), -0,03 (xl), -0,025 (l) ; interligne 0,95 à 1,02 ; `text-wrap: balance` sur les titres. Corps 1,5 de ligne, mesure 34 à 40 rem. Prix `tabular-nums`, insécables « 24,50 € », « +2 € », apostrophes courbes, « œ ».
- **Grille** : 12 colonnes au bureau (4 au téléphone), gouttière fluide 20 à 48 px, deux lignes verticales fortes : colonne 6/7 (la « faille » de la carte, rubrique à gauche, plats à droite) et colonne 8/9 (photos). Humeurs d'espacement : serre (3 u), normal (7 u), aere (12 u), entracte (18 u). Rayon : 0 partout.
- **Mouvement (réalisé en phase 2)** : famille `ease` de l'engine (`expo.out` entrées, `expo.inOut` rideau et menu, courbe `power3.out` en CSS pour les survols de 0,35 à 0,45 s). **Pilote** `src/motion/recoller.ts` : une variable par titre, son avancée vers la hauteur de lecture (ScrollTrigger, `top 88%` vers `top 38%`), écrit `--ecart = 0,07 em × (1 − expo.out(avancée))` + intro + souffle + pointeur, sur `gsap.ticker`, lissé (jeu à l'arrivée par retard, sans élastique). Le h1 s'ouvre à 0,39 em (CSS sous `html.motion`, donc dès le premier frame) et se recolle à 0,07 em en 1,1 s dans l'intro, puis à 0 sur les premiers 55 % d'écran défilés ; le nom du pied passe de 0,07 à 0 jusqu'à la fin de page. **Pointeur** : ±0,015 em selon la position horizontale (vitesse de défilement au toucher). **Repos** : la faille respire (sinus ±0,008 em, déphasé par titre, réduit à 25 % une fois recollé), horloge retirée quand aucun titre n'est à l'écran, rien en mouvement réduit. **Transition** : deux moitiés de rideau brun rouge (coupe à 55 %) se rejoignent, haute depuis la gauche, basse depuis la droite (0,75 s), puis le rideau recollé se lève (0,8 s). **Survols** (3 traitements, tous « recoller ») : remplissage en deux moitiés qui se rejoignent (CTA, boutons Menu et Fermer) ; trait en deux moitiés qui se rejoignent au centre (nav, index de la carte, liens utilitaires, liens texte soulignés au repos, téléphones) ; titre-lien coupé qui se recolle (marque de l'en-tête, liens du menu). Changement par rapport à la phase 1 : les plats et photos ne réagissent plus au survol (ce ne sont pas des liens). **Reveals** : `data-reveal="clip"` sur les photos hors premier écran, `up` sur les lignes de plats de l'accueil, `data-split="lines"` sur deux textes courts ; aucun sur un bloc à lien. Ni loader, ni curseur suiveur, ni GL (décisions de la Concept Card).

## Plan de composition
```
ACCUEIL  affiche  : [Li Micougni (demi)            ]   énoncé : [Vous êtes tous les bienvenus, même les demi-fous] (orange)
                    [texte+CTA | photo grill 16/10 ]   ardoises : paire asymétrique + liste de 3 ; grill : index + photo haute ;
                    lieux : mur (salle large, terrasse haute, fenêtres) ; réservation (orange) : téléphone + horaires ; pied : nom recollé
CARTE    tête, index de rubriques (strip scroll-snap), puis 10 rubriques : titre collant et vignette à gauche | plats à droite ; menus (orange)
HISTOIRE texte serif + polaroïds ; photo large ; valeurs (orange) en liste
RÉSERVATION  4 canaux (téléphone, e-mail, e-mail préparé, formulaire du client) ; horaires, venir, sur place (orange)
404      « 404 » en deux moitiés, phrase dans la voix, deux sorties
Mobile 390 : titre en deux lignes (Li / Micougni, 4,75 diviseur), photo avant le texte, en-tête resserré (3 liens), rubriques empilées, strip d'index à défilement horizontal.
```
**Test de généricité** : « un modèle générique atterrirait-il ici ? » Oui sur : hero titre géant + photo (changé : titre coupé en deux, CTA et adresse sous le titre), liste de plats avec prix (changé : rubrique collante et deux demi-pages), pied de contacts (changé : le nom recollé en orange). Non sur le reste : la coupe est le système.

## Sur-utilisation de la skill
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : § Trois concepts. ✔
2. Aucun exemple travaillé repris : § Trois concepts (dernier paragraphe). ✔
3. Concept Card au format exact, verbe « recoller » défini : § Concept Card. ✔
4. Concept au pied (`Footer.astro:14` nom recollé), à la carte (`carte.astro` titres Demi, deux demi-pages `.rubrique`), à la réservation (`reservation.astro` h1 Demi), à la 404 (`404.astro` « 404 » coupé). ✔
5. Moment signature et recette : le recollement, `--ecart` piloté par l'avancée de chaque titre (`src/motion/recoller.ts:26-37`), ouverture du h1 (`site.css` `html.motion h1`), nom du pied recollé en fin de page ; mesuré : h1 0,670 em au chargement, 0,077 em à 2,2 s, 0,0055 em à scrollY 720, pied −0,002 em en fin de page. ✔
6. Palette 4 à 6 rôles, références nommées : § Système, `tokens.css:17-26`. ✔
7. Aucun des 8 « defaults to avoid » (crème + serif + terracotta écarté et justifié ; pas d'acide sur noir, ni dégradé violet, ni verre dépoli, pas d'eyebrow sur chaque titre, pas de 01/02/03 décoratifs, ni Inter, Fraunces, Instrument Serif, Playfair). ✔ (`grep -ri "01\b" src/pages` vide)
8. Test de généricité : § Plan de composition. ✔
9. « 7 vers 8 » : sélection `::selection` (`engine.css`, `.orange ::selection` dans `site.css`) ; focus dans l'accent (`engine.css`, surchargé en encre sur orange) ; favicon de l'identité, un M coupé en deux moitiés (`public/favicon.svg`) ; OG provisoire logo et grill (`public/og.png`, à composer en phase 3) ; pied en composition finale ; 404 dans le concept. ◐ (OG en phase 3)
10. Polices : Young Serif et Schibsted Grotesk, 2 fichiers, 2 préchargés (`Base.astro`). ✔
11. Échelle fluide unique, grands sauts : `tokens.css:28-34`. ✔
12. Display réglé : `.mega`, `.titre-page`, `.titre-section` (`site.css`). ✔
13. Corps et UI : 16 à 18 px, UI 13 à 15 px en AA (contrastes calculés ci-dessus). ✔
14. Typographie française : insécables dans `eur()` et `site.ts`, apostrophes courbes, aucun tiret long (`grep` vide). ✔
15. Grille 12 colonnes, lignes fortes 6/7 et 8/9 ; pas de cadre quatre coins, remplacé par la faille centrale de la carte (justifié : le concept est la coupe). ✔
16. Famille de section au plus une fois par page : accueil = affiche, énoncé, paire, index+média, mur, données ; chacune une fois. ✔
17. Hero en 3 s : nom, cuisine, ville, CTA Réserver et Appeler dans le premier écran à 1440×900 (CTA à y 729 à 789, mesuré). ✔
18. Mobile 390 recomposé : titre recalculé, en-tête resserré, strip d'index `overflow-x` + `scroll-snap`, `scrollWidth` 390 sur les 5 pages. ✔

### Phase 2 (mouvement et interactions)
19. Menu mobile accessible : `Header.astro` (bouton `aria-expanded`, `aria-controls="menu"`, `<dialog>` plein écran), `src/motion/menu.ts` (focus sur le premier lien, boucle Tab l. 40-44, Échap natif, focus rendu au bouton l. 32-37, fermeture au passage en bureau et au départ d'une transition) ; mesuré à 390×844 : boîte 390×844, 14 Tab, 0 sortie, Échap ferme, `aria-expanded` false, focus sur « Menu ». ✔
20. Engine verbatim (`src/engine/`, inchangé en phase 2), `astro.ts` ; `transition:persist` sur `#curtain` (`Base.astro:71`), `transition:animate="none"` sur `<html>` (`Base.astro:34`) ; `#gl` et `#cursor` sans objet (ni GL ni suiveur, décision écrite). ✔
21. Une horloge : `grep "addEventListener('scroll'|requestAnimationFrame" src/motion src/components src/pages` vide ; le pilote et le repos tournent sur `gsap.ticker`. ✔
22. Code de page dans `onPage()` avec nettoyage : `recoller.ts:42` (retour l. 59), `menu.ts:11` (retour l. 55). ✔
23. Aucune CSS `transform` sur élément GSAP : le rideau (`.curtain__h`, `.curtain__b`) n'a que `top`/`bottom`/`height` ; la moitié basse des titres bouge par `translate` (propriété individuelle) lu d'une variable, jamais tweenée en transform. ✔
24. Module pilote avec `startIdle` et pointeur : `src/motion/idle.ts` (recette motion.md), consommé par `recoller.ts:29-31`, appelé une fois depuis `setup.ts`. ✔
25. Loader décidé : aucun (Concept Card, « Théâtre »), aucun composant ni `role="status"`. ✔
26. Transition du concept ≤ 1 s par sens : 0,81 s à l'aller (0,75 + 0,06), 0,85 s au retour (`setup.ts`). ✔
27. Intro : l'ouverture du h1 est posée en CSS avant le script (premier frame déjà coupé), recollée à 0,07 em en 1,1 s ; le texte réel (moitié haute) n'est jamais caché (LCP). ✔
28. Épinglages : aucun pin GSAP ; les têtes de rubrique de la carte restent en `position: sticky` (phase 1) ; `#main` en `overflow-x: clip`, qui ne casse pas le sticky. ✔
29. Repli statique dessiné : sans `.motion`, les titres gardent l'écart de 0,07 em (`tokens.css`), le pied est recollé (`.pied__nom { --ecart: 0em }`) ; mesuré en mouvement réduit : pas de `.motion`, pas de Lenis, `--ecart` 0,07 em sans style en ligne, 0 bloc caché. ✔
30. Copies décoratives `aria-hidden` : moitié basse `.demi__b` (`Demi.astro`), nom du pied (`Footer.astro:11`) ; aucun titre dupliqué pour les lecteurs d'écran. ✔
31. Une famille d'easing (`ease.*`, et l'équivalent CSS de `power3.out` pour les survols), durées du tableau Timing, staggers 40 à 60 ms (rideau 60, menu 60, sortie 50). ✔
32. Un traitement par rôle, 3 au total, dans le verbe : § Mouvement, `site.css` bloc « Interactions ». ✔
33. Survol sous `@media (hover: hover)`, même état sur `:focus-visible` hors media, visible en réduit (transitions à 0,01 ms, état final identique) ; `:active` sur CTA (`scale: 0.97`) et liens (opacité). ✔
34. Liens texte soulignés au repos (`.lien`, `text-decoration: underline`), le survol remplace le trait fin par le trait recollé de 2 px. ✔
35. `hover.noHoverChange` : à lire dans le report.json de phase 3 ; la page courante (`aria-current`) garde un survol (trait recollé et couleur). ◐ (phase 3)
36. `desktop.idleMotion` : souffle de la faille sur le ticker (mesuré 0,0773 vers 0,0684 em en 1,5 s sans entrée) ; à confirmer par report.json. ◐ (phase 3)
37. Curseur natif visible, aucun suiveur ; rien ne dépend du survol au toucher (menu et liens au clic). ✔
38. Aucun flou animé, aucun `box-shadow` au défilement, aucun `will-change` posé. ✔
39. Réduit : ni Lenis, ni GL, ni scrub, ni loader (mesuré ci-dessus) ; `reduced.hiddenText` et `reduced.moving` en phase 3. ◐ (phase 3)
40. GL sans objet (Concept Card, « Théâtre ») ; le socle d'engine est déjà sans lignes `// GL`. ✔
41. Sans objet (pas de GL). ✔
44. Lien d'évitement en premier (`Base.astro:70`), anneau de focus dans l'accent partout, encre sur orange. ✔ (à confirmer par report.json)
45. Contraste AA : jetons calculés en phase 1 ; nouveaux états : CTA survolé craie sur ardoise et orange sur encre (inversions des paires mesurées). ◐ (phase 3)
46. Texte réel partout, aucun canvas. ✔
47. Cibles : « Réserver » et « Menu » de l'en-tête mobile 44 px de haut (mesuré 44×104 et 44×78), CTA 52 px, liens de nav 44 px. ✔
