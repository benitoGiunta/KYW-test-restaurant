# DESIGN.md · Le 54 (Dave, Namur) · variante awwwards

Stack : Astro 5 (ClientRouter), GSAP, Lenis. Pas d'OGL (pas de GL : la matière est la photo et le plan). Pas de loader : le premier écran sert déjà le nom, la table et l'action.

## Brief
- **Sujet** : Le 54, table gastronomique de Dave (Namur), rue de Longeau 54. Chef Jonathan Collignon ; Michel et Véronique Collignon ont repris la maison en 2010. Cuisine de saison, artisans locaux. Menu du moment en 3 services (48 €) ou 4 services (65 €), wagyu A5 et zarzuela en supplément. 34 couverts (donnees.json), terrasse, parking en face.
- **Publics** : couples et tablées de fête du soir ; déjeuners du dimanche et d'affaires ; gourmets de Namur et de la vallée de la Meuse qui lisent Gault&Millau ; habitués qui viennent réserver.
- **Métier du site** : réserver (téléphone, e-mail), lire la carte, venir (adresse, parking, horaires).
- **Ressources** : 14 photos du client (plats en bols bleus et noirs, geste de dressage, deux vues de salle en noir et blanc et sombre), pas de façade ni d'équipe. Logo du client non réutilisé (logo par défaut du gabarit de leur site).
- **Contraintes** : statique, `base` `/le-54/awwwards/`, noindex, pied KYW, aucun backend.
- **Hypothèses** (aussi `site.ts` et RAPPORT.md) : 34 couverts = donnée réelle, plan de salle illustratif ; lundi « à confirmer » (le site le dit ouvert, la-carte.be fermé) ; 65 € pour le 4 services (G&M : 62 €) ; aucun score Gault&Millau, aucun avis chiffré ; plats non attribués aux services.

## Trois concepts, trois territoires
Test de l'échange : la phrase doit échouer pour un autre restaurant.

| | Phrase | Territoire | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|
| A. **Cinquante-quatre** | Le numéro de porte devient l'unité : 5 et 4 partout. | Nom et adresse | 3 | 3 | 5 | 3 |
| B. **Trente-quatre couverts** | Une salle où chaque place compte : le site se compose comme un plan de salle de 34 places. | Lieu et salle (service, couverts) | 4 | 5 | 4 | 1 |
| C. **Dressage à la pince** | Chaque élément se pose un par un, comme un dressage. | Métier (geste) | 3 | 4 | 4 | 4 |

- **A** : tient seulement dans le hero (un 54 géant) ; les menus 3 et 4 services n'en dépendent pas. Écarté. Il ne fournit que le `Le 54` géant du hero.
- **C** : n'importe quelle table gastronomique dit « dressage ». Écarté. Il fournit le verbe.
- **B retenu** : la phrase ne tient qu'avec un restaurant de 34 couverts ; elle règle la carte (deux formules, deux places allumées), la réservation (nombre de couverts), le pied (registre de 34 ronds) et la 404 (« cette table n'existe pas »).
- **Ancre** : 34 couverts maximum (donnees.json, pratique.couverts), 3 services à 48 €, 4 services à 65 €.

## Concept Card
- **Idée** : Le 54 est une salle de trente-quatre couverts : le site se lit comme un plan de salle où chaque place compte.
- **Métaphore** : le plan de salle et la mise de table (nappe, assiette, couvert), du maître d'hôtel qui sait qui s'assied où.
- **Signature (et recette)** : « la salle se dresse » : au premier écran, les 34 places du plan se posent une à une (stagger `ease.soft`, `motion.md` stagger + `fromTo`), puis une place s'allume en accent ; sur la réservation, le nombre de couverts choisi allume autant de places (un seul pilote `couverts.ts`, variable `n`).
- **Émotion (3 premières secondes)** : on entre dans une petite salle sombre, la nappe est mise, un couvert est déjà réservé.
- **Verbe** : dresser (poser avec soin, un par un, sans jamais claquer).
- **Capture** : « Le 54 » en Zodiak géant à gauche, le plan de salle à droite avec deux places bleues allumées.
- **Ancre** : 34 couverts ; menu à 48 € ou 65 €.
- **Théâtre** : loader non (le hero porte déjà le nom, le plan et l'action ; un compteur retarderait la réservation) ; GL non (la photo de plat et le plan SVG suffisent, GL surchargerait une table qui joue la retenue).

## Système
### Palette (références : salle noir et blanc du client, bols en émail bleu, nappe blanche)
| Rôle | Hex | Usage |
|---|---|---|
| ground | `#0F1113` | nuit de la salle, fond principal |
| ink | `#ECE9E2` | nappe blanche, texte (15,6:1) |
| muted | `#A3A9AD` | légendes (8,1:1) |
| line | `#2B3034` | filets, nappes du plan |
| accent | `#7FB4CA` | émail bleu des bols, places allumées, focus (8,6:1) ; `#1B5671` sur les sections nappe (6,6:1) |
| curtain | `#1B4B63` | voile de transition |
Sections « nappe » : fond `#ECE9E2`, encre `#0F1113`, une seule par page (le menu et les prix à l'accueil). Défauts écartés : pas de crème + terracotta (ici crème inversée, serif contrasté sur nuit, accent bleu froid), pas d'acide sur noir, pas de dégradé.

### Typo
- Display : **Zodiak** 400 (Fontshare, Indian Type Foundry) et son italique pour un seul mot de chaque hero ; corps et UI : **Hanken Grotesk** variable 400 à 700 (Google). 3 fichiers, 2 préchargés (Zodiak 400, Hanken).
- Échelle fluide : `--t-mega` 5 à 17 rem, `--t-xl` 2,75 à 7, `--t-l` 1,9 à 3,75, `--t-m` 1,2 à 1,6, corps 1 à 1,0625, UI 0,875 et 0,8125. Grands sauts (mega ≈ 4 × xl).
- Display : interlettrage `-0.05em` (mega), `-0.035em` (xl), `-0.025em` (l) ; interligne 0,86 / 0,95 / 1,02 ; `text-wrap: balance` ; chiffres alignés (`lining-nums`) ; prix `tabular-nums` nowrap.
- Corps 16 à 17 px, interligne 1,5, mesure 62 car. au plus ; UI 13 à 14 px.
- Français : insécables dans « 48 € », « 12 h à 14 h » via `&nbsp;` et valeurs de données, apostrophes ’, guillemets « ».

### Grille et rythme
- 12 colonnes (gouttière fluide `--gutter` 1 à 2,5 rem), 4 colonnes visuelles au téléphone (empilé). Lignes verticales fortes : bord gauche (gouttière) et colonne 8 (plan, texte des paires). Pas de cadre quatre coins : le cadre est la salle dessinée du plan (rectangle) qui porte le même rôle.
- Humeurs d'espacement : `--serre` (3 u), `--normal` (7 u), `--aere` (12 u), `--entracte` (20 u). Rayon : 0 partout, sauf les ronds du plan (une assiette est ronde).

### Mouvement (planifié, phase 2)
- Famille : `ease.soft` pour poser (durées 0,5 à 0,9 s), `ease.inOut` pour la transition (voile d'émail qui monte du bas, 0,7 s ; c'est l'assiette qu'on pose).
- Verbe traduit : chaque élément arrive avec un léger `y` (12 à 24 px) et opacité, stagger 40 à 70 ms, ne rebondit jamais.
- **Rôles de hover (3 traitements)** : CTA = aplat bleu qui se vide en contour (déjà en CSS) ; nav et liens texte = soulignement qui se pose de gauche à droite ; images du mur = la photo se pose (scale 1,02 vers 1) avec légende. Utilitaires : couleur seule.
- **État de repos** : une place du plan s'allume, s'éteint puis une autre s'allume, sur l'horloge GSAP, lentement (toutes les 2,4 s), en pause hors écran, désactivé en reduced motion.

### Plan de composition
```
ACCUEIL   [poster]   Le 54 (mega)            | PLAN 34 places
                     lead + CTA              |
          [plein cadre] photo de salle, légende
          [données, NAPPE] h2 + 48 € | 65 € | 34 | 2010
          [paire asymétrique] photo 7 col  | texte 4 col
          [mur] 1 grande + 4 photos décalées
          [index] « Sur place » (liste de faits)
          [pied] registre de 34 ronds, « À votre table. », Venir | Service | Contact, CTA
CARTE     [poster] La carte   [données] 48 € | 65 €   [index] 4 plats (nom l, description)
          [index] suppléments   [mur] photos d'archives
HISTOIRE  [poster] Histoire   [statement + index] récit | équipe   [paire inversée] geste
RÉSERVATION [poster + CTA tel] [3 colonnes] horaires | venir | plan   [formulaire mailto]
404       [poster] Cette table n'existe pas.  plan vide
```
Patron de la carte : **index** (une ligne par plat, nom en Zodiak, description en colonne), puis mur de photos d'archives. Mobile 390 : titres re-réglés (hero 30 vw, pages 19 vw), plan sous le titre, paires empilées, mur en colonne (ratios fixes), registre du pied sur deux rangées de 17, CTA pleine largeur ; strips : aucun (pas de séquence).

### Test de généricité
« Un modèle générique atterrirait-il ici ? » Oui pour : hero titre + photo plein cadre sombre (remplacé par titre + plan de salle), accent doré (remplacé par émail bleu), eyebrow sur chaque titre (aucun), 01/02/03 décoratifs (aucun), carte en pavage de cartes (remplacée par index). Non pour : le plan de 34 places, le registre du pied, la 404.

## Sur-utilisation de la skill (phase 1, preuves)
1. [x] Trois concepts, trois territoires, notés, ancre, test de l'échange : § « Trois concepts ».
2. [x] Aucun exemple travaillé de concepts.md (ni braise, pavage, glissement sur gril, cadre, solde, phrase unique) : § « Trois concepts ».
3. [x] Concept Card au format exact, verbe « dresser » : § Concept Card.
4. [x] Concept au pied (`Footer.astro:11` registre de 34 ronds), carte (formules 2 places, `index`), réservation (`Plan.astro` et formulaire couverts, `reservation.astro`), 404 (`404.astro` plan vide, « Cette table n'existe pas »).
5. [x] Signature : « la salle se dresse » (stagger des 34 places, recette `motion.md` stagger) ; à construire en phase 2 (`src/motion/couverts.ts`).
6. [x] Palette 6 rôles, références réelles (salle, bols, nappe) : § Palette ; `tokens.css:15-26`.
7. [x] Défauts évités : crème + terracotta (non), acide sur noir (non, bleu froid), dégradé violet (non), verre dépoli (non), eyebrow par titre (non), 01/02/03 (non), Inter/Fraunces/Instrument Serif/Playfair (non : Zodiak et Hanken).
8. [x] Test de généricité : § Test de généricité.
9. [ ] « 7 vs 8 » : favicon d'identité (`public/favicon.svg`, assiette bleue), OG composée (`public/og.png` capturée du hero), 404 dans le concept, pied composition finale : faits. Sélection (`engine.css:30` `::selection`) et focus accent (`engine.css:33`) : hérités et vérifiés au CSS. OG à refaire en phase 3 après la signature.
10. [x] Polices : Zodiak 400 + italique, Hanken variable ; `public/fonts/` (3 fichiers, 80 Ko), `tokens.css:3-9`.
11. [x] Échelle fluide unique : `tokens.css` `--t-mega` à `--t-xs`.
12. [x] Display réglé : `site.css` `.d-mega/.d-xl/.d-l` (interlettrage, interligne, balance).
13. [x] Corps et UI : `tokens.css` (`--t-body`, `--t-s`, `--t-xs`) ; mesure `p { max-width: 62ch }`.
14. [x] Typographie française : nbsp dans les prix, apostrophes ’, « » ; contrôle des tirets cadratins par script : aucun.
15. [x] Grille 12 colonnes, lignes fortes (gouttière, colonne 8), cadre = salle du plan (justifié ci-dessus).
16. [x] Famille de section au plus une fois par page : accueil (poster, plein cadre, données, paire, mur, index, pied), carte (poster, données, index, index suppléments en `dl`, mur), histoire (poster, statement, paire), réservation (poster, trois colonnes, formulaire).
17. [x] Hero en 3 s : nom (h1 « Le 54 »), plan, lead, CTA « Réserver une table » visibles au premier écran (mesure : CTA bas à 702 px à 1280×720, 789 à 1440×900, 777 à 390×844).
18. [x] Mobile 390 recomposé : § Plan de composition ; `site.css` `@media (max-width: 48rem)` ; `scrollWidth` = 390 sur les 5 pages (mesure).

## Mouvement construit (phase 2)
- **Pilote** `src/motion/couverts.ts` : une variable `n` (couverts allumés) distribuée aux plans (`[data-plan]`), au registre du pied (`[data-registre]`) et à la phrase d'état (`[data-plan-etat]`, `aria-live`). Le champ « Nombre de couverts » de la réservation écrit `n` (aussi en mouvement réduit, sans délai).
- **Signature « la salle se dresse »** : nappes (stagger 50 ms) puis 34 places (stagger 35 ms, `ease.soft`, 0,5 s), puis `n` places s'allument une à une (40 ms) ; dans l'intro si le plan est au premier écran, sinon au défilement (une fois). Fin du dressage vers 2,2 s.
- **Repos** : « le maître d'hôtel cherche une place » : une place libre s'allume doucement (sinus sur 2,4 s) et un halo d'émail s'en écarte, puis une autre ; `gsap.ticker`, en pause hors écran (ScrollTrigger `onToggle`). **Pointeur** : la place la plus proche est désignée (contour d'émail) et devient la prochaine cherchée. Rien en mouvement réduit.
- **Registre du pied** : les 34 ronds se posent au défilement (stagger 25 ms), suivent `n` (réservation : 6 couverts = 6 ronds allumés ; 404 : aucun).
- **Transition** : voile d'émail qui monte (0,7 s) puis repart vers le haut (0,85 s), `ease.inOut` ; c'est la nappe qu'on tire. Pas de loader, pas de GL, pas de curseur suiveur (décisions de la phase 1, inchangées).
- **Reveals** : `data-split="lines"` sur les h2 d'affichage, `chars` sur « À votre table. » (copie décorative `aria-hidden`), `data-reveal="up"` sur listes et chiffres sans lien, `clip` sur les photos du mur et la paire de l'accueil. h1 et accroches jamais animés (LCP) ; première photo des pages intérieures peinte au premier rendu.
- **Menu mobile** (< 48 rem) : bouton « Menu » (`aria-expanded`), `<dialog>` modal plein écran (focus piégé et Échap natifs), la nappe du panneau se pose du haut (clip 0,6 s), lignes en stagger 60 ms, focus rendu au bouton, « Appeler » 52 px.
- Mobile : idem desktop pour le plan (sans pointeur) ; aucune copy « survolez ».

## Sur-utilisation de la skill (phase 2, preuves)
19. [x] Menu mobile : `Header.astro:18` (`aria-expanded`, `aria-controls`), `menu.ts:13-26` (`showModal`, Échap natif, focus rendu). Mesure 390×844 : ouvert `aria-expanded=true`, focus « Accueil », 8 Tab restent dans `#menu`, Échap ferme et rend le focus à « Menu » (`.logs/aw2-check.log`).
20. [x] Engine verbatim (copié en phase 1), `engine/astro.ts`, `transition:persist` sur `#curtain` (`Base.astro:74`), `transition:animate="none"` sur `<html>` (`Base.astro:37`) ; ni `#gl` ni `#cursor` (pas de GL, pas de suiveur : sans objet).
21. [x] Une horloge : `grep addEventListener('scroll'|requestAnimationFrame` hors engine : aucun ; repos sur `gsap.ticker` (`couverts.ts:140`).
22. [x] Code de page dans `onPage()` avec nettoyage : `couverts.ts:112` et `:151`, `menu.ts:37` et `:48`.
23. [x] Aucune CSS `transform` sur élément GSAP : `grep transform: site.css` = seulement `text-transform` ; places et nappes SVG animées par `scale` GSAP ; images du mur par la propriété `scale` (non animées par GSAP, la figure l'est).
24. [x] Pilote : `couverts.ts` (variable `n`, `veiller()` = repos, `pointermove` = influence du pointeur, `couverts.ts:100`) ; appelé une fois depuis `setup.ts:14`. Le repos est intégré au pilote (pas de `idle.ts` séparé : un seul consommateur).
25. [x] Loader décidé : aucun (Concept Card), pas de `role="status"`.
26. [x] Transition 0,7 s + 0,85 s, `ease.inOut` (`setup.ts`).
27. [x] Intro : dressage du plan ajouté à `intro` (`couverts.ts:137`), `data-intro` sur la note du plan (accueil, 404), les chiffres (carte), l'équipe (histoire). Premier frame : titre, accroche, CTA et salle vide déjà peints.
28. [x] Épinglages : aucun (pas de pin ni de scrub dans ce concept).
29. [x] Repli statique : sans `.motion`, plan servi dressé avec 2 places allumées (`site.css:85`, `Plan.astro` `is-lit`), registre servi avec 2 ronds. Mesure réduit : `motion=false`, 34 places visibles, 2 allumées, 0 bloc caché, pas de halo, pas de Lenis.
30. [x] Copie décorative « À votre table. » `aria-hidden` (`Footer.astro`), aucun titre dupliqué.
31. [x] Une famille : `ease.soft` (poser), `ease.out` (reveals engine), `ease.inOut` (voile, menu) ; `--e-soft` CSS = power3.out (`tokens.css:43`) ; staggers 25, 35, 40, 50, 60 ms.
32. [x] Trois traitements dans le verbe : trait qui se pose (liens texte, nav, marque, téléphone), aplat qui se vide (CTA), photo qui se pose (mur) ; utilitaires (réseaux) en couleur seule (`site.css:16-35`).
33. [x] Survols sous `@media (hover: hover)` (`site.css:27`, `:73`), même état sur `:focus-visible` (`.lien`, `.trait`, `.cta`, `.panneau__lien`), `:active` (`.cta`, `.lien`, `.tete__menu`) ; les états restent en réduit (seules les durées tombent).
34. [x] Liens texte soulignés au repos : `.lien` filet d'émail 1 px permanent (`site.css:20`).
35. [ ] `hover.noHoverChange` : à lire en phase 3 (`report.json`). Lien actif : trait qui s'épaissit à 2 px au survol ; pied KYW souligné (`site.css:259`).
36. [ ] `idleMotion` : repos construit (halo + place) ; à confirmer par `report.json` en phase 3.
37. [x] Curseur natif jamais masqué, aucun suiveur ; rien ne dépend du survol au toucher (pointeur ignoré si `isTouch()`).
38. [x] Ni `blur`, ni `box-shadow`, ni `will-change` (`grep` : aucun).
39. [x] Réduit : ni Lenis, ni GL, ni loader, ni dressage ; mesure `caches=0` (preuve `report.json` en phase 3).
40. [x] GL sans objet, décision écrite (Concept Card) ; lignes `// GL` retirées de l'engine (`engine/index.ts:8`).
41. [x] Sans objet (pas de GL).
44. [x] Skip link « Aller au contenu » premier élément du `<body>` ; anneau de focus d'émail (`engine.css`), champs (`site.css`).
45. [ ] Contraste : à mesurer en phase 3 (halo et place en veille décoratifs, dans un SVG `role="img"`).
47. [x] Cibles à 390 : marque 45 px, « Menu » 44 px, « Réserver » 44 px (`.cta--petit` 2,75 rem), « Appeler » du menu 52 px.
