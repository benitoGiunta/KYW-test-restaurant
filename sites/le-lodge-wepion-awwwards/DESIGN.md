# DESIGN.md : Le Lodge Wépion, variante awwwards « Deux rives »

## Brief
- **Sujet** : Le Lodge, brasserie, restaurant et tea-room au bord de la Meuse, Chaussée de Dinant 931, Wépion (Namur). Gérant : Grégory Jorion. Dossier du 20/11/2026.
- **Situation décisive** : le lieu est fermé depuis l'incendie du 21/05/2026. L'équipe sert à Erpent, au Wine & More (Chaussée de Marche 496), depuis le 15/09/2026 ; retour à Wépion envisagé fin 2026 ou début 2027, sans date. La maquette le dit, sans faux horaire ni fausse date.
- **Publics** : habitués de Wépion qui cherchent où est passée l'équipe ; familles du dimanche et du midi ; touristes de la Meuse ; clients du tea-room l'après-midi.
- **Métier du site** : réserver (téléphone, Barestho), savoir où aller aujourd'hui, consulter la carte (88 lignes), comprendre que le Lodge revient.
- **Ressources** : 12 photos d'avant l'incendie (photo 11 écartée : enseigne « Le Beau Rivage » et personne non identifiée), logo blanc SVG, carte complète, presse (L'Avenir, La DH).
- **Contraintes** : statique Astro, `base` /le-lodge-wepion/awwwards/, pas de backend, noindex, français, aucun tiret cadratin.
- **Hypothèses** (détail dans `site.ts` et RAPPORT.md) : numéro du relais 0496 92 55 13 repris de la fenêtre du site client, à confirmer ; horaires du relais inconnus donc absents ; ouverture 2008 d'une source tierce, à confirmer ; aucun avis, aucune note, aucune distinction.

## Trois concepts
| | Concept | Phrase | Règle de mise en page | Verbe | Ancre | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|---|---|---|
| A | **Deux rives** (lieu, culture : la Meuse) | Le Lodge est une berge qu'on ne peut plus aborder et une table qui continue de l'autre côté. | Un trait vertical, la berge, coupe chaque page : nuit de Wépion à gauche (mémoire), jour d'Erpent à droite (action). | traverser | Incendie du 21/05/2026, repli au Wine & More d'Erpent, GPS de Wépion | 5 | 5 | 4 | 1 |
| B | **Deux services** (matière : le service, rythme horaire) | Le Lodge change de lumière : brasserie le soir, tea-room l'après-midi. | Le fond passe du clair au sombre selon l'heure du plat. | virer | Tea-room l'après-midi, photos de jour et de nuit | 3 | 4 | 5 | 3 |
| C | **La saison de Wépion** (saison, lieu : fraises) | La carte est un calendrier : asperges au printemps, fraises de Wépion en juin. | La carte comme frise de mois. | mûrir | Fraises de Wépion, sirop de sureau, carte saisonnière | 3 | 4 | 4 | 2 |

**Choix : A**, parce que c'est le seul qui ne tient qu'avec ce restaurant (test de l'échange : avec un autre restaurant la phrase s'effondre, il faudrait un autre incendie, une autre berge) et qu'il porte l'information la plus utile au visiteur. B fournit un détail (la façade de jour et de nuit, appariée sur la page Histoire). C fournit un détail (la coupe de fraises de Wépion et la mention de saison de la carte).

## Concept Card
- **Idée** : Le Lodge est une rive que l'on ne peut plus aborder, Wépion, et une table qui continue de l'autre côté, Erpent ; chaque page est coupée par la berge.
- **Métaphore** : la Meuse et ses deux rives. À gauche ce qui est resté sur la berge (le lieu, les photos, le nom), à droite ce que l'on peut faire aujourd'hui (réserver, appeler, venir).
- **Signature (et recette)** : « le passage » (phase 2) : un pilote unique, la progression du défilement, déplace la berge (`clip-path` du panneau jour, recette motion.md « clip reveal driven by scroll ») ; au repos, la berge ondule de quelques pixels (idle) ; le rideau de page est une berge qui traverse l'écran.
- **Émotion (3 premières secondes)** : on comprend en un regard que le lieu est fermé, que l'équipe est ailleurs et qu'elle revient ; une pudeur chaleureuse, pas un bandeau d'alerte.
- **Verbe** : traverser.
- **Capture** : le héros, nuit de Wépion avec la terrasse sur la Meuse à gauche, jour d'Erpent avec « À table à Erpent, en attendant la berge. » à droite.
- **Ancre** : l'incendie du 21/05/2026, le Wine & More d'Erpent (Chaussée de Marche 496), le 931 Chaussée de Dinant (GPS 50.4234855, 4.8742231), le retour envisagé fin 2026.
- **Théâtre** : loader non (le site doit afficher l'état du lieu immédiatement, un loader retarderait l'information vitale) ; GL non (la berge est une ligne, pas un volume ; les photos du client portent la matière).

## Système
### Palette (rôles)
| Rôle | Hex | Source / usage | Contraste |
|---|---|---|---|
| ground | `#0e1519` | la nuit sur l'eau de la photo 08, rive de Wépion | ink 14,8:1 |
| ink | `#ece6d8` | la nappe et les assiettes blanches des photos 04 et 07 | |
| muted | `#a7b2ac` | les rochers pâlis de la photo 03 | 8,4:1 sur ground |
| line | `#2d3a3f` | décoratif | |
| accent | `#e3a857` | la lampe de la façade (photo 08), le bois noyer de la table (photo 09) | 8,8:1 sur ground |
| jour (rive d'Erpent) | `#d9ded5` / ink `#0e1519` / muted `#46524b` / accent `#7a4a12` | le calcaire et la salle claire des photos 02 et 03 | 13,5 ; 6,0 ; 5,5 |
| curtain | `#070b0d` | rideau de page | |

Références : photos du client (08, 03, 09, 02). Défaut n° 1 (crème, serif contrasté, terracotta) évité : la crème n'est qu'un blanc de nappe sur nuit, la rive claire est un gris-vert de pierre, l'accent est un ambre de lampe cuit sur le clair.

### Typographie
- **Display** : Gambetta 500 (Fontshare), romain et italique ; interlettrage -0,035 em, interligne 0,96, `text-wrap: balance`. **Corps/UI** : Host Grotesk 400 à 700 (Google, variable). Trois fichiers, deux préchargés.
- Échelle fluide unique (`tokens.css`) : `--t-mega` 3,6 à 12 rem, `--t-xl` 2,6 à 7, `--t-l` 1,9 à 3,9, `--t-m`, `--t-body` 16 à 18 px, `--t-s` 14 px, `--t-xs` 13 px.
- Prix en `tabular-nums` ; insécables « 24 € », « 11 h 30 », « : » ; apostrophes courbes.

### Grille et rythme
- 12 colonnes, gouttière fluide ; lignes verticales fortes : la berge (colonne 7/8) et la marge gauche. Mobile : la berge devient une ligne horizontale entre deux panneaux.
- Humeurs d'espacement : `--serre`, `--normal`, `--aere`, `--entracte`. Une règle de forme : angles vifs, un seul trait, la berge.

### Mouvement (réalisé, phase 2)
- Famille d'easing : `ease.out` (expo.out) pour les entrées, `ease.inOut` (expo.inOut) pour le rideau et le menu, une courbe CSS unique (power3.out, `cubic-bezier(0.215, 0.61, 0.355, 1)`) pour les survols ; lignes 1,2 s (stagger 80 ms), blocs 1,2 à 1,3 s (stagger 60 ms), rideau 0,75 à 0,8 s par panneau. Verbe « traverser » : tout entre par la droite et sort par la gauche, comme un bac.
- **Signature « le passage »** : composant `Berge.astro` (onde SVG ambre) entre les rives, à l'accueil et à la 404 (vertical au bureau, horizontal au téléphone) et sous l'en-tête des pages intérieures. Pilote unique `src/motion/berge.ts` : la progression du défilement dans le héros fait traverser le jour d'Erpent vers Wépion (`--bx` jusqu'à 42 % de la rive de nuit, panneau `.rives__crue` découpé sur le trait) ; le pointeur déplace le trait de ±6 px ; au repos l'onde coule le long de la berge à vitesse constante (plus vite au toucher pendant le défilement). Intro : le trait se dessine (clip 1,3 s), la photo de Wépion se pose (échelle 1,08 vers 1, jamais cachée), les titres montent par lignes.
- Rideau : panneau jour puis panneau nuit à bord ambre, de droite à gauche (0,87 s à l'aller, 0,9 s au retour). Tableau « Deux rives » : la colonne d'Erpent entre par la droite (clip).
- Hovers (trois traitements) : CTA = l'autre rive entre par la droite et remplit le bouton ; navigation et liens texte = un trait qui passe de droite à gauche (liens texte soulignés ambre au repos) ; utilitaires = éclaircissement et soulignement. Images : pas de survol (aucune image n'est un lien) ; aperçu de plat au curseur non retenu (la carte n'a que trois photos de plats, aucune n'est liée à une ligne).
- Repos : l'onde de la berge coule (environ 12 px/s) ; immobile en mouvement réduit.

### Plan de composition (accueil)
```
HÉROS poster      [ NUIT 7/12 : mention, H1 "Le Lodge Wépion", photo terrasse | JOUR 5/12 : H2, texte, CTA, adresse relais ]
STATEMENT         [        phrase display cols 2 à 11, note en dessous                                           ]
DONNÉES           [ Adresse / État / Réserver : Wépion (nuit) | Erpent (jour) ]
INDEX             [ six repères de la carte, cols 1-7 | photo plat cols 9-12 ]
MÉDIA PLEIN CADRE [ salle voûtée 21:9 ]
PAIRE ASYMÉTRIQUE [ tea-room texte cols 1-5 | dessert carré + dessert portrait décalés ]
PIED FINAL        [ "Deux rives, une table." / Erpent / Wépion / Ailleurs ]
```
Carte : liste index par catégorie (titre sticky à gauche, plats à droite) et un mur de trois photos après les tartares ; au téléphone, le mur devient une bande à `scroll-snap`. Mobile 390 : panneaux empilés, photo 2:1, CTA dans la flottaison (y = 711).

### Test de généricité
« Un modèle générique atterrirait-il ici ? » Oui sur : crème et terracotta, héros photo plein écran avec titre centré, bandeau d'alerte rouge pour la fermeture, 01/02/03. Changé : la fermeture devient la composition (deux rives), pas un bandeau ; fond nuit et pierre claire ; aucun eyebrow décoratif (les « mentions » portent des faits : adresse, état) ; l'accueil n'a pas de photo plein écran en héros.

## Sur-utilisation de la skill (phase 1)
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : § Trois concepts ci-dessus. [x]
2. Aucun exemple travaillé de concepts.md (pas de braise, pavage, mise en place sur gril, cadre, solde, phrase unique) : § Trois concepts. [x]
3. Concept Card au format exact, verbe « traverser » compris (bac, passage) : § Concept Card. [x]
4. Concept présent au pied, à la carte, à la réservation, à la 404 : `Footer.astro:11` (« Deux rives, une table. », deux adresses), `carte.astro` (mention « côté berge »), `reservation.astro` (h1 « côté relais »), `404.astro` (« Cette rive n'existe pas », deux panneaux nuit/jour). [x]
5. Moment signature et recette : « le passage », § Concept Card (réalisé en phase 2). [x] (plan)
6. Palette 4 à 6 rôles, références réelles : § Palette (photos 08, 03, 09, 02). [x]
7. Huit « defaults to avoid » : § Palette (crème justifiée), aucun acide sur noir, aucun dégradé violet, aucun verre dépoli, pas d'eyebrow sur chaque titre, pas de 01/02/03, ni Inter, ni Fraunces, ni Instrument Serif, ni Playfair (Gambetta et Host Grotesk). [x]
8. Test de généricité : § Test de généricité. [x]
9. Détails 7 à 8 : sélection `::selection` (engine.css) ; focus dans l'accent (`:focus-visible` accent) ; favicon de l'identité (`public/favicon.svg` : L du logo sur deux rives) ; pied en composition finale (`Footer.astro`) ; 404 dans le concept (`404.astro`). OG composée : à faire (phase 3). [x partiel]
10. Polices : `public/fonts/` 3 fichiers, `tokens.css:5-7`, préchargements `Base.astro`. [x]
11. Échelle fluide unique, grands sauts : `tokens.css` (`--t-mega` 3,6 à 12 rem). [x]
12. Display réglé : `.display` (`site.css`, interlettrage, interligne, balance). [x]
13. Corps et UI : 16 à 18 px, UI 13 à 14 px, contrastes calculés (tableau). [x]
14. Typographie française : insécables insérés par script (« 24 € », « 11 h 30 », « : »), apostrophes courbes, aucun tiret cadratin (grep vide). [x]
15. Grille 12 colonnes et lignes fortes : `site.css` (`.grille`, `.rives`) ; cadre quatre coins non retenu (la berge verticale tient lieu de structure). [x]
16. Une famille de section au plus une fois par page : accueil = poster, énoncé, données, index, média, paire, pied. [x]
17. Héros en 3 s : mesures Playwright, CTA dans la flottaison à 1440x900 (y 425), 1280x720 (404), 1024x768 (445), 390x844 (711). [x]
18. Mobile 390 recomposé : panneaux empilés, berge horizontale, photo 2:1, mur de la carte en bande `scroll-snap`, `scrollWidth` = 390 sur les 4 pages. [x]

## Sur-utilisation de la skill (phase 2)
19. Menu mobile accessible : `menu.ts:31` (`aria-expanded`), `.menu` plein écran (`site.css` « Menu téléphone »), focus piégé `menu.ts:18-24`, Échap `menu.ts:19`, retour du focus au bouton ; mesure Playwright 390 : 12 Tab restent dans le menu, Échap rend `aria-expanded=false` et le focus au bouton. [x]
20. Engine verbatim (`src/engine/`), adaptateur `astro.ts`, `transition:persist` sur `#curtain` (`Base.astro:73`), `transition:animate="none"` sur `<html>` (`Base.astro:36`) ; ni `#gl` ni `#cursor` (pas de GL, pas de suiveur : décision). [x]
21. Une horloge : `gsap.ticker` seul (`berge.ts:40`, `idle.ts:15`) ; grep `addEventListener('scroll')` et `requestAnimationFrame` dans `src/motion`, `src/components`, `src/pages` : aucun. [x]
22. Code de page dans `onPage()` avec nettoyage : `berge.ts:41` (retour `:71`), `menu.ts:9` (retour `:66`). [x]
23. Aucune CSS `transform` sur un élément GSAP : `transform` CSS seulement sur `.nl::after` (transition CSS) ; cibles GSAP (`.berge`, `.berge__onde`, `.photo img`, `.passage__jour`, `.repere`, panneaux du rideau, menu) sans `transform` CSS ; le décalage du trait passe par `translate: var(--bx)` sur le conteneur, l'onde par `yPercent` sur le SVG enfant. [x]
24. Module pilote `src/motion/berge.ts` : une variable (progression du héros), pointeur (`idle.x`, `berge.ts:30`), `startIdle()` (`berge.ts:39`), appelé une fois depuis `setup.ts`. [x]
25. Loader : non, décidé (§ Concept Card, Théâtre) ; aucun composant ni `role="status"`. [x]
26. Transition du concept (`setup.ts`) : jour puis nuit de droite à gauche, 0,87 s aller, 0,9 s retour (≤ 1 s par sens). [x]
27. Intro `data-intro` : h1 et h2 du héros en lignes, trait de la berge qui se dessine, photo peinte dès le premier rendu (capture réduite 1440 = état final dessiné). [x]
28. Épinglages : aucun pin ; un seul `ScrollTrigger` de progression (`berge.ts:58`, `top top` vers `bottom top`) ; titres de catégorie de la carte en `position: sticky` CSS. [x]
29. Repli statique dessiné : sans `.motion`, l'onde est tracée immobile, la crue invisible (`--bx` absent), tout le texte visible ; mesure réduit : `hidden` = 0, `motion` = false, `lenis` = false, captures identiques à 1,5 s d'écart. [x]
30. Copies décoratives : aucune copie de texte ; `Berge.astro` et `.rives__crue` en `aria-hidden="true"`. [x]
31. Une famille d'easing (`ease.*` de l'engine + une courbe CSS), Timing respecté, stagger 60 à 80 ms (§ Mouvement). [x]
32. Trois traitements par rôle dans le verbe (§ Mouvement, `site.css` « SURVOLS »). [x]
33. Survols sous `@media (hover: hover)` (`site.css:255`), même état sur `:focus-visible`, visibles en réduit (changement d'état sans durée) ; `:active` sur CTA et liens. [x]
34. Liens texte soulignés au repos (`.lien`, ambre). [x]
35. `hover.noHoverChange` : à prouver en phase 3 ; lien courant de la nav épaissi au survol, marque translatée, téléphone du pied souligné, lien du pied KYW souligné. [ ] (phase 3)
36. `desktop.idleMotion` : onde qui coule ; mesure 1440 et 390 : captures différentes à 1,5 s d'écart sur l'accueil. `report.json` en phase 3. [x partiel]
37. Curseur natif visible (aucun suiveur) ; rien ne dépend du survol au toucher. [x]
38. Pas de blur animé, pas de `box-shadow` au défilement, pas de `will-change`. [x]
39. Réduit : ni Lenis, ni GL, ni scrub, ni loader (mesure Playwright `reducedMotion: 'reduce'`, `lenis` false, rien ne bouge) ; `report.json` en phase 3. [x partiel]
40. GL : sans objet, décision écrite (§ Concept Card, Théâtre) ; aucune ligne `// GL` dans l'engine. [x]
41. Sans objet (pas de GL). [x]
44. Lien d'évitement en premier (`Base.astro`, « Aller au contenu »), focus ambre partout (`engine.css:33`), CTA et liens au même état qu'au survol. [x]
45. Contraste AA : à mesurer en phase 3 (axe), palette calculée en phase 1 ; la crue est un aplat de la couleur jour sans texte. [ ] (phase 3)
46. Texte réel partout, aucun canvas. [x]
47. Cibles : CTA 48 px, « Appeler » de l'en-tête 44 px (`.cta--petit`), liens de nav et bouton Menu 44 px, utilitaires 32 px. [x]
