# Le Félicien · variante awwwards · « L'échelle »

## Brief
- **Sujet** : Le Félicien, brasserie classique belge et française à Suarlée (Namur), avenue d'Ecolys, au cœur du Business Village Ecolys. Lancée fin 2019, rouverte le jeudi 22 janvier 2026 (direction Maximilien de Sauvage, chef Sébastien Deprost, maître d'hôtel Sébastien Gilles). Ouverte 7 j/7, midi (12 h à 14 h) et soir (18 h à 21 h 30, 22 h vendredi et samedi). Baseline du client : « une brasserie pour tous ».
- **Publics** : employés du Business Village à midi (suggestions 25 €), habitants de Suarlée et de Namur le soir, familles (menu bambin dès 10 €), végétariens, groupes (banquets au premier étage dès 27 €).
- **Métier du site** : réserver (Tablebooker, téléphone, e-mail), lire la carte avec ses prix, venir. Statique, servi sous `base` `/le-felicien/awwwards/`.
- **Ressources** : une seule photo de plat (2020, qualité 3), l'illustration de la couverture de la carte d'automne 2026, le logo SVG vert (relevé #2e5735), aucune photo de salle, d'équipe, de façade. Pas de note d'avis, de parking ni de capacité fiable : rien d'affiché.
- **Hypothèses** : aucun complément fictif (pas d'Unsplash : la composition typographique et l'illustration du client suffisent, la photo d'archive est légendée « illustrative »). Le passage sur l'interruption de fin 2025 est neutralisé en « rouvre » (fait daté, source L'Avenir).

## Trois concepts
| | Territoire | Phrase | Ancre | Orig. | Adéq. | Faisab. | Portab. |
|---|---|---|---|---|---|---|---|
| A. **L'échelle** | système formel + marque | La carte est une règle graduée de 0 à 40 € : chaque plat, chaque public, chaque horaire se place à son prix. | « Une brasserie pour tous » et une carte réelle de 3,2 € (soft) à 38 € (entrecôte 350 g), bambins à 10 €, midi à 18 et 25 € | 4 | 5 | 5 | 3 |
| B. **L'écriteau** | lieu et réouverture | Un écriteau de porte « Ouvert / Fermé » que le site retourne selon l'heure de Bruxelles. | Réouverture du 22 janvier 2026, 7 j/7, deux services | 3 | 4 | 5 | 4 |
| C. **Le plan de salle** | métier (la salle) | Chaque page est un plan à deux niveaux : salle et premier étage, avec places à réserver. | Premier étage pour banquets, 300 à 400 couverts (à confirmer) | 3 | 3 | 3 | 3 |

Test de l'échange : B marche pour n'importe quelle table ouverte (portabilité 4) ; C repose sur une capacité non confirmée ; A ne tient qu'avec une carte qui court de 3 à 38 € sous une promesse « pour tous ». **Choix : A**. De B, on garde un détail : l'état « Ouvert maintenant » à l'heure belge (phase 2, en-tête). De C, rien.

## Concept Card
- **Idée** : le site est la règle de la brasserie : une échelle de 0 à 40 € sur laquelle chaque plat, chaque public et chaque service trouve sa graduation, parce que c'est une brasserie pour tous.
- **Métaphore** : le mètre pliant jaune du menuisier et le papier millimétré ; on mesure, on place, on lit sa propre taille.
- **Signature (et recette)** : le curseur de budget. Sur l'accueil, une épingle jaune glisse sur la règle et s'accroche au trait de l'euro le plus proche (`steps()`), la phrase dessous se réécrit (« Avec 25 €, un midi complet : entrée et plat ») et les plats de la carte au-delà du budget s'estompent. Recette motion.md « scrub / snap » sur un driver unique (le prix), sans GL.
- **Émotion (3 premières secondes)** : « c'est clair, c'est carré, je sais déjà ce que ça coûte » : confiance et appétit, pas de mystère.
- **Verbe** : jauger (placer au trait près : les éléments arrivent par crans, jamais par fondu mou).
- **Capture** : le hero : « LE FÉLICIEN » en capitales condensées sur toute la largeur, au-dessus de la règle graduée portant les épingles 10, 18, 25, 38 €.
- **Ancre** : la baseline « une brasserie pour tous » et la carte réelle de 3,2 à 38 €.
- **Théâtre** : loader non (une brasserie de bureaux et de familles : on vient chercher une carte et un téléphone, pas un préambule) ; GL non (aucun matériau de photo à déformer, la règle se dessine en CSS/SVG) ; transition de page oui : un rideau vert que le trait d'une règle traverse.

## Système
- **Palette** (références réelles) : ground `#eef0e8` papier de comptoir ; ink `#0f2417` vert bouteille ; muted `#4a5d50` ; line `#bdc7ba` trait de crayon ; accent `#e3a21a` jaune du mètre pliant (accent texte `#7a5200`) ; curtain/sombre `#2e5735` vert du logo du client (relevé sur son logo inverse). Contrastes : encre/papier 14,2:1 ; muted/papier 6,1:1 ; papier/vert 7,2:1 ; encre/jaune 7,3:1. Le défaut n° 1 (crème, serif contrasté, terracotta) est évité : papier verdi, grotesque condensée, jaune de règle.
- **Typo** : Big Shoulders Display 100 à 900 (display, capitales condensées, enseignes émaillées de brasserie, chiffres tabulaires pour les prix) et Schibsted Grotesk 400 à 900 (corps, journal solide). Polices : `public/fonts/` (2 fichiers, 81 Ko, 2 préchargés). Échelle fluide `--t-mega` (4,4 à 25 rem) / `--t-xl` / `--t-l` / `--t-m` / `--t-body` 17 à 19 px / `--t-s` / `--t-xs` : sauts 1 : 1,8 : 3 : 5,5. Display : interlettrage −0,02 em (mega), −0,015 (xl), −0,01 (l), interligne 0,84 à 0,95, `text-wrap: balance`, `padding-top` d'accent. Prix en `tabular-nums`, insécables « 24 € », « 12 h 30 », apostrophes ’ et « » sans exception dans `site.ts`/`carte.json`.
- **Grille** : 12 colonnes (gutter fluide 16 à 40 px, 1 colonne au téléphone), lignes fortes : filet de 2 px de tête de liste et trait de gauche du bloc « midi ». Humeurs d'espacement : `--serre`, `--normal`, `--aere`, `--entracte`. Rayon : 0 partout (tout est tiré à la règle). Cadre équivalent : filets de 2 px en tête de chaque liste (le cadre quatre coins ne sert pas une page sans image plein cadre).
- **Mouvement (phase 2)** : easing `ease.inOut`/`ease.out` de l'engine, crans `steps(8)` pour tout ce qui « s'accroche » ; durées 0,4 s (hover), 0,5 s (rideau), 0,8 s (règle qui se dessine). **Rôles de hover** : CTA = remplissage par crans (déjà posé en CSS) ; nav = soulignement gradué par crans (posé) ; plats = l'épingle de la rubrique se place au prix du plat survolé ; liens texte = soulignement qui s'éloigne ; utilitaires (tel, plan) = inversion couleur. **Repos** : un trait de lecture fin parcourt la règle du hero en 18 s (le concept respire ; immobile sous reduced motion).
- **Plan de composition** (accueil, une famille par section) :
  1. Poster : nom en pleine largeur, texte et CTA à gauche, photo à droite, règle à épingles dessous.
  2. Index : « À chacun son budget », 6 rangs (public, phrase, fourchette, plage jaune sur sa règle).
  3. Paire asymétrique : « Les grands classiques » (7/12) et l'illustration de couverture (4/12) avec liste de prix.
  4. Données (fond vert) : « Deux services, tous les jours », horaires en très grand.
  5. Énoncé (fond vert) : « Au premier étage, la table s'allonge. » + CTA e-mail événements.
  6. Pied final : « Venez comme vous êtes. », règle, trois colonnes, CTA, colophon, puis bandeau KYW.
  Carte : index en deux colonnes par rubrique, une règle à points par sous-rubrique. Maison : repères datés + équipe en lignes. Réservation : 4 colonnes (horaires, adresse, groupes, midi). 404 : « Hors échelle. », épingle « 404 » au-delà du 40.
  **Mobile 390** : une colonne, titre mega à 24 vw, légende des épingles sous la règle (les étiquettes flottantes disparaissent sous 64 rem), CTA pleine largeur, rubriques sur une colonne.
- **Test de généricité** : « un modèle atterrirait-il ici ? » Oui à crème + serif + terracotta (changé en papier verdi + grotesque condensée + jaune de règle) ; oui à un hero photo plein cadre (changé : la seule photo est ancienne, la typographie porte le hero) ; oui à un menu en cartes (changé en liste à règle) ; oui à « 01/02/03 » (aucun numéro décoratif).

## Sur-utilisation de la skill
1. [x] Trois concepts, trois territoires (formel, lieu, métier), notés, ancre, test de l'échange : § Trois concepts.
2. [x] Aucun exemple travaillé de concepts.md (ni braise, pavage, gril, cadre, solde courant, phrase unique).
3. [x] Concept Card au format exact, verbe « jauger » défini : § Concept Card.
4. [x] Concept au pied (`Footer.astro` : règle + « Venez comme vous êtes. »), à la carte (`carte.astro` : `Echelle` par bloc), à la réservation (horaires en colonnes, même règle de filets), à la 404 (`404.astro` : épingle hors échelle).
5. [x] Moment signature et recette : curseur de budget construit en phase 2 (`components/Budget.astro`, `motion/echelle.ts` `initBudget`), sur l'accueil et sur la carte.
6. [x] Palette 6 rôles, références nommées : § Système, `tokens.css`.
7. [x] Aucun des 8 « defaults to avoid » (ni crème serif terracotta, ni acide sur noir, ni dégradé violet, ni verre dépoli, ni eyebrow sur chaque titre, ni 01/02/03, ni Inter/Fraunces/Instrument/Playfair).
8. [x] Test de généricité fait : § Système.
9. [~] Détails 7 vers 8 : sélection (`::selection` encre sur papier, `engine.css`), focus dans l'accent (`:focus-visible` jaune, `engine.css`), favicon de l'identité (`public/favicon.svg`, règle + épingle), OG composée (`public/og.png`, nom + règle + épingles), pied composition finale (`Footer.astro`), 404 dans le concept (`404.astro`). Reste en phase 2/3 : vérification en navigateur.
10. [x] Polices : 2 fichiers `public/fonts/`, `@font-face` dans `tokens.css` (url avec base), 2 préchargements dans `Base.astro`.
11. [x] Échelle fluide unique, grands sauts : `tokens.css` (`--t-mega` à `--t-xs`).
12. [x] Display réglé : `site.css` `.display`, `.titre-*`, `.hero__titre`.
13. [x] Corps 17 à 19 px, interligne 1,5, mesure 34 à 44 rem max ; UI 13 à 15 px, AA mesuré sur la palette.
14. [x] Typographie française : insécables (`site.ts` `N`, `carte.json`), ’ et « », aucun tiret cadratin (grep ci-dessous).
15. [x] Grille 12 colonnes, filets forts de 2 px, `.wrap` sans `padding: X 0` (`site.css`).
16. [x] Une famille de section au plus une fois par page (accueil : poster, index, paire, données, énoncé, pied).
17. [x] Hero en 3 s : nom, « une brasserie pour tous », Suarlée Namur, CTA « Réserver » et « Appeler » visibles à 1440×900 (cta à y = 795 avant agrandissement du titre, recontrôle en phase 2).
18. [x] Mobile 390 recomposé : titre à 24 vw, colonnes uniques, légende sous la règle, CTA pleine largeur ; `scrollWidth` 390 sur les 5 pages.

### Phase 2 (construction-2)
Signature livrée : un vrai `<input type="range">` 0 à 40 € posé sur la règle (clavier, toucher, lecteur d'écran, utilisable sans script) ; l'épingle jaune rejoint la valeur en passant chaque cran (`steps(n)`, n = nombre d'euros parcourus) ; la phrase est calculée depuis la carte réelle (`phraseBudget()` dans `site.ts`, même texte au serveur et au client, annoncée par `aria-live`) ; au-delà du budget, les rangs (accueil) ou les plats (carte) passent en vert de gris avec prix biffé (pas d'opacité : contraste AA conservé). Sur la carte, survoler un plat place le curseur de sa rubrique à son prix. Le hero porte un trait de lecture qui parcourt la règle en 18 s, cran par cran, et que le pointeur reprend.

19. [x] Menu mobile : `Header.astro:20` bouton « Menu » `aria-expanded`, `Header.astro:24` `<dialog>` plein écran (focus piégé et Échap natifs de `showModal`), `menu.ts:61` focus rendu au bouton ; contrôlé par script Playwright à 390 px (ouvert `true/true`, 9 Tab restent dans le menu, Échap ferme, focus sur « Menu »).
20. [x] Engine verbatim (copié en phase 1, sans lignes GL), `engine/astro.ts`, `Base.astro:74` `transition:persist` sur `#curtain` (pas de `#gl` ni de `#cursor` : sans objet), `Base.astro:37` `transition:animate="none"`.
21. [x] Une horloge : `echelle.ts:49` `gsap.ticker.add` ; grep de `addEventListener('scroll'` et `requestAnimationFrame` dans `src/motion`, `src/components`, `src/pages` : aucun résultat.
22. [x] Code de page dans `onPage()` avec nettoyage : `echelle.ts:145`, `menu.ts:86` (listeners, ticker, IntersectionObserver, minuteur et curseurs retirés au retour).
23. [x] Aucune CSS `transform` sur élément animé : les épingles (CSS `translateX`) ne reçoivent que `clipPath`, leur `<b>` reçoit `y` ; le trait de lecture, les liens du menu et le `<dialog>` n'ont pas de `transform` CSS ; le curseur de budget passe par `--prix` (aucun tween de transform).
24. [x] Module pilote `motion/echelle.ts` : variable unique le prix (0 à 40 €, au cran), `startIdle()` (l. 16), influence du pointeur sur la règle du hero (l. 45), appelé une fois depuis `motion/setup.ts`.
25. [x] Loader : non, décision écrite (Concept Card § Théâtre) ; aucun composant ni `role="status"`.
26. [x] Transition du concept : rideau vert tiré par `ease.inOut`, règle jaune tracée en `steps(40)` ; sortie 0,67 s, entrée 0,6 s (`setup.ts:15-23`). Capture en cours de transition vérifiée (rideau + règle à mi-course).
27. [~] Intro : la règle du hero se trace en 40 crans, chiffres puis épingles tombent (timeline `intro`, `initTrace`) ; titre et accroche du hero laissés peints pour le LCP (leçon construction). Premier frame à juger par l'agent captures.
28. [x] Épinglages : aucun (sans objet).
29. [x] Repli statique : sans `.motion`, le trait de lecture est masqué (`site.css:265`), la règle est entière, le curseur de budget saute sans tween ; contrôle Playwright `reducedMotion: reduce` : 0 bloc caché, Lenis absent.
30. [x] Copies décoratives : le mot du pied et les règles sont `aria-hidden`, aucun titre dupliqué.
31. [x] Easing : `ease.out`/`ease.inOut` de l'engine plus `steps()` pour tout ce qui s'accroche ; staggers 50 à 80 ms (épingles 80, liens du menu 50, points 40 ms au plus bas sur 68 points).
32. [x] Trois traitements dans le verbe « jauger » : remplissage par crans (CTA, bouton Menu, téléphone en inversion), soulignement gradué (nav) et soulignement qui s'éloigne (liens texte), épingle qui se place au prix (plats, curseur de budget).
33. [x] Survol sous `@media (hover: hover)` (`site.css:197` et suivantes), même état sur `:focus-visible` ; en mouvement réduit, l'état change sans durée (engine.css).
34. [x] Liens texte soulignés au repos (`.lien`).
35. [ ] À prouver par `report.json` (phase 3).
36. [~] Repos : trait de lecture, cran de 1 € toutes les 0,45 s plus étiquette « n € » (≈ 1 500 px changés en 1,5 s à 1440) ; `idleMotion` à lire en phase 3.
37. [x] Curseur natif visible (pas de follower) ; aucune information au seul survol (curseur de rubrique décoratif, budget au clavier et au toucher).
38. [x] Aucun `blur` animé, aucun `box-shadow`, pas de `will-change`.
39. [x] Réduit : ni Lenis, ni GL, ni scrub, ni loader (contrôle Playwright) ; champs `reduced.*` en phase 3.
40. [x] GL : sans objet, décision écrite (Concept Card), lignes `// GL` retirées de l'engine.
41. [x] Sans objet.
44. [x] Skip link en premier (`Base.astro:73`) ; anneau de focus 2 px `--focus` (jaune assombri sur papier, jaune sur vert : `site.css:207-209`), piste du curseur entourée au focus (`site.css:282`).
45. [~] Contraste : aucune opacité sur texte, lignes hors budget en `--c-muted` (6,1:1) ; à prouver par axe en phase 3.
46. [x] Texte réel partout, aucun canvas.
47. [x] Cibles : « Réserver » de l'en-tête 91 × 44 px, « Menu » 67 × 44 px à 390 (mesure Playwright) ; CTA du hero 48 px.
