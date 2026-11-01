# La Dolce Vita (Wépion) · variante awwwards « Il neon »

Phase 1 sur 3 (construction-1), 01/11/2026. Agent variante-awwwards, auto-notation `self`.

## Brief

- **Sujet** : La Dolce Vita, ristorante pizzeria au 1080 chaussée de Dinant, 5100 Wépion (Namur), depuis 2017. Armando en cuisine, Antigone pour l'atmosphère et l'accueil. 86 plats en dix chapitres (dont 30 pizze), dolci maison, ardoise de suggestions, à emporter avec livraison dès deux plats (18 h à 22 h).
- **Publics** : habitués de Wépion et du sud namurois (le soir, les pizze, l'emporter) ; midi en semaine (lundi, jeudi, vendredi, dimanche) ; familles (carte bambini) ; passants de la chaussée de Dinant le long de la Meuse, l'été (terrasse).
- **Métier du site** : appeler (réservation par téléphone uniquement), lire la carte entière avec ses prix, savoir quand c'est ouvert (mardi fermé, mercredi et samedi midi fermés), trouver l'adresse.
- **Ressources** : 14 photos du client de bonne qualité (façade de nuit, néon, salle olive, plats, geste de la pâte), logo crème, devise « Se è dolce, la vita è più bella », baseline « À Wépion, l'Italie prend son temps ».
- **Contraintes** : statique Astro 5, servi sous `/dolce-vita-wepion/awwwards/`, aucune réservation en ligne, aucun avis affiché (chiffres non vérifiés), pied KYW et noindex.
- **Hypothèses** : en tête de `src/data/site.ts` (réservation téléphone seule, pas de mois d'ouverture, pas de nom de famille, traduction de la devise par KYW, plan en lien de recherche).

## Trois concepts

| | A. Il neon | B. La pâte qui s'ouvre | C. L'ardoise |
|---|---|---|---|
| Territoire | Nom et lieu : le néon « la dolce vita » écrit le nom de la maison sur le mur végétal (photo 03) | Matière du métier : la pâte étalée à la main (photo 14, section « Le geste » du site client) | Système formel : la carte comme seule structure, écrite à la craie |
| Phrase | Le site est la salle le soir : une seule source de lumière, le néon, qui écrit un mot par page. | Chaque titre s'ouvre en largeur comme une pâte sous les paumes. | Tout le site est une ardoise qu'on efface et réécrit. |
| Règle de mise en page | Un seul mot allumé par page (script en tube), tout le reste est du texte « éteint » sur la grille du mur | Titres en largeur variable, blocs qui s'élargissent du centre | Une colonne de craie, rien hors de la liste |
| Verbe | allumer | étirer | effacer |
| Voix typo | script monoline (tube) + grotesque de travail | grotesque à axe de largeur | manuscrite craie |
| Palette | mur olive le soir, tube blanc, rose cerisier | farine, marbre noir du plan de travail | ardoise, craie |
| Signature | allumage du néon lettre à lettre, bourdonnement au repos | titres qui passent du serré au large au défilement | texte qui s'efface au défilement |
| Frame partageable | « la dolce vita » allumé, halo rose, sur le mur olive | un titre à mi-étirement | l'ardoise à moitié effacée |
| Ancre | le néon réel de la salle (photo 03, dossier « néon la dolce vita ») | la photo 14 et la section « Le geste » | l'ardoise des suggestions (photos 05, 06) |
| Originalité | 4 | 3 | 2 |
| Adéquation | 5 | 4 | 3 |
| Faisabilité | 5 | 3 | 4 |
| Portabilité (bas = mieux) | 2 | 3 | 4 |

**Test de l'échange** : A ne tient qu'avec ce restaurant (le néon écrit son nom à lui, dans sa salle) ; B tiendrait pour toute pizzeria (style) ; C pour toute brasserie à ardoise (style).
**Choix : A**, le seul dont l'ancre est le nom du restaurant écrit dans sa propre salle. B ne fournit qu'un détail (la photo du geste dans la section équipe), C l'idée de dater l'ardoise sur l'accueil.

## Concept Card

- **Idée** : La Dolce Vita est un nom écrit en lumière sur un mur de la salle ; le site est cette salle, le soir, et chaque page a son mot allumé.
- **Métaphore** : la salle de nuit, le néon comme unique source de lumière, le texte courant comme le mobilier dans la pénombre.
- **Signature (et recette)** : le néon `Neon.astro` (une lettre = un segment de tube, `data-i`). Phase 2 : allumage segment par segment par la variable `--lum` (0 → 1 en 3 à 4 paliers irréguliers, 60 à 90 ms par palier, timeline GSAP en positions absolues, `motion.md` « text reveal »), puis bourdonnement de repos (`--lum` entre 0,92 et 1 sur le ticker, en pause hors écran, coupé en reduced motion). Hovers des cibles primaires : le libellé « s'allume » (halo `--halo`).
- **Émotion (3 premières secondes)** : entrer dans une salle chaude un soir, le nom de la maison qui s'allume.
- **Verbe** : allumer.
- **Capture** : `public/og.png`, le hero « la dolce vita » allumé à côté de la façade de nuit.
- **Ancre** : le néon blanc « la dolce vita » sur le mur végétal de la salle (photo 03, dossier § Matière à site n° 7).
- **Théâtre** : loader **non** (l'allumage du néon dans le hero est le premier moment, un loader le doublerait) ; GL **non** (le halo est un `text-shadow` réglé par une variable, le concept ne demande ni déformation ni image en shader).

Le concept tient jusqu'au bout : carte (« la carta », prix en rose du halo, plat survolé allumé), histoire (« la storia » et la photo du vrai néon), réservation (« pronto ? », la formule italienne au téléphone), 404 (« la d lce v ta » : deux segments grillés, « Un tube a grillé. »), pied (« più bella » allumé sur la salle éteinte `--c-curtain`).

## Système

### Palette (6 rôles, références réelles)

| Rôle | Hex | Référence | Contraste sur ground |
|---|---|---|---|
| ground | `#1a2017` | mur olive de la salle dans la pénombre (photo 04) | |
| ink | `#f4ede4` | tube blanc chaud du néon (photo 03) | 14,3:1 |
| muted | `#aab49c` | sauge du mur végétal | 7,7:1 |
| line | `#3b4634` | joints du mur olive | 1,7:1 (filets seulement) |
| accent | `#f4a6bc` | branches de cerisier en fleur de la salle (photos 04, 05) | 8,7:1 |
| curtain | `#0c0f0a` | la salle éteinte (rideau de transition, pied) | |

Sections « jour » (réservation) : façade blanche `#f2f0ea`, encre `#1a2017` (14,6:1), muted `#4f5a46` (6,4:1), accent texte `#a3304f` (6,0:1). Calcul WCAG par script Python (01/11).
Défaut n° 1 évité : fond sombre olive, pas de crème, pas de serif, pas de terracotta (alors que le site actuel est justement vert forêt, crème, terracotta et serif italique).

### Typographie

- **Sacramento** (Astigmatic, Google Fonts) : script monoline, le seul tracé qui ressemble à un tube de néon plié. Rôle unique : le mot allumé de chaque page, les prénoms, le logo d'en-tête. Interlettrage 0 décidé (un interlettrage négatif casserait les liaisons du script), interligne 0,95, `padding-block` contre la coupe des hampes.
- **Archivo** (Omnibus-Type, Google Fonts, variable 400 à 800) : grotesque de travail, la voix « éteinte » : corps, carte, prix, numéros. Titres de section en 700, interlettrage -0,03 em ; chiffres d'appel en 800, -0,045 em.
- Échelle fluide unique 390 → 1440 (`tokens.css`) : mega 5,5 → 17 rem, xl 3,75 → 9, l 2 → 3,75, m 1,25 → 1,625, body 1 → 1,0625, s 0,875, xs 0,8125. Sauts d'environ × 2.
- Corps 16 à 17 px, interligne 1,55, mesure `max-width: 62ch`. UI 13 à 14 px en AA (muted 7,7:1). Prix `tabular-nums` en rose. Insécables : prix « 24 € », heures « 12 h », « ± 300 g » ; guillemets « » et apostrophes typographiques.

### Grille

12 colonnes (4 sous 48 rem), gouttière fluide. Lignes fortes : deux filets verticaux fixes au bord de la gouttière (`body::after`), le filet bas de l'en-tête et le haut du pied ferment le cadre quatre coins. Espacement en quatre humeurs : `--serre`, `--normal`, `--aere`, `--nuit`. Rayon : 0 partout, sauf le rond plein du tube sur les CTA (`--radius-tube`).

### Mouvement (planifié, phase 2)

- Easing : `ease.out` (entrées), `ease.inOut` (transition), `ease.soft` (UI). Durées : allumage 0,9 à 1,2 s, transition 0,45 s sortie + 0,6 s entrée, hovers 0,3 s.
- Traduction du verbe : rien ne glisse ni ne rebondit ; les choses s'allument (opacité et halo par paliers) et s'éteignent.
- Rôles de hover (trois traitements) : 1. CTA « Réserver / Appeler » : le tube se remplit de rose avec halo ; 2. nav, plats, numéros, liens fléchés : le libellé s'allume (`--halo`) ; 3. liens utilitaires : changement de couleur.
- État de repos : le néon bourdonne (`--lum` 0,92 à 1, lent, irrégulier), seul objet en mouvement au repos.
- Transition : la salle s'éteint (rideau `--c-curtain`, deux battements puis noir, 0,32 s), la page suivante sort du noir (0,6 s) pendant que son néon s'allume (`src/motion/setup.ts`).

### Plan de composition

Accueil :
```
[poster]   surtitre                       | photo façade de nuit
           LA DOLCE VITA (néon, 8 col.)   |
           baseline / Réserver · Carte    |
[statement] « Se è dolce, la vita è più bella »  + 3 faits (2017 · 86 · 2)
[paire asym.] photo ardoise 5 col. | L'ardoise du moment (3 plats réels, datés)
[mur]      À table : 6 photos décalées sur 12 colonnes (bande défilante au téléphone)
[narration] geste (portrait) | Deux prénoms, une maison
[pied final] più bella (néon) · venir · horaires · contact · colophon · KYW
```
Carte : tête « la carta » ; sommaire collant défilant ; chapitres en index (titre collant 3 col. | liste 6 col. | photo collante 3 col.) ; bon à savoir + CTA.
Histoire : tête « la storia » ; récit en paire (photo du vrai néon | 3 paragraphes) ; bande de la salle (deux photos, défilante au téléphone) ; « Qui vous reçoit » (deux prénoms en script).
Réservation : tête « pronto ? » ; données (deux numéros géants) ; section jour sur la façade blanche (horaires, adresse, terrasse, emporter, photo) ; formulaire mailto ; média plein cadre (façade).
404 : poster du néon grillé, h1, trois chemins de retour.
Mobile 390 : 4 colonnes, néon à 25vw sur une ligne, CTA du hero masqué (doublon du menu), faits empilés, mur et salle en bandes `overflow-x` + `scroll-snap`, chapitres de carte en bloc, horaires pleine largeur.

### Test de généricité

- Hero « nom + photo + CTA » : un modèle générique y atterrirait. Changé : le nom est un objet lumineux (le néon), la photo est la façade de nuit, pas un plat.
- Section avis : un modèle générique y atterrirait. Supprimée (chiffres non vérifiés) ; remplacée par la devise et trois faits vérifiables.
- Carte en grille de cartes : changé en index avec titres et photos collants.
- Réservation par formulaire : changé, le téléphone est en tête en très grand (seul canal réel), le formulaire n'ouvre qu'un e-mail.

## Sur-utilisation de la skill (phase 1)

1. [x] Trois concepts, trois territoires, notés, ancre, test de l'échange : § Trois concepts.
2. [x] Aucun exemple travaillé de concepts.md : néon, ni braise, ni pavage, ni mise en place, ni cadre seul, ni solde, ni phrase unique.
3. [x] Concept Card exacte, verbe compris : § Concept Card.
4. [x] Concept au pied, carte, réservation, 404 : `src/components/Footer.astro` (« più bella »), `src/pages/carte.astro` (« la carta »), `src/pages/reservation.astro` (« pronto ? »), `src/pages/404.astro` (`grilles={[4, 10]}`).
5. [x] Un moment signature et sa recette : § Concept Card, `src/components/Neon.astro` (segments `data-i`), `--lum` et `--halo` dans `src/styles/tokens.css`.
6. [x] Palette 6 rôles, références réelles : § Palette, `src/styles/tokens.css`.
7. [x] Aucun des 8 « defaults to avoid » : pas de crème + serif + terracotta, pas d'acide sur noir, pas de dégradé violet, pas de verre dépoli, surtitres seulement en tête de page (pas sur chaque titre), pas de numéros décoratifs, ni Inter, Fraunces, Instrument Serif ou Playfair.
8. [x] Test de généricité : § Test de généricité.
9. [x] Détails 7 → 8 : sélection rose (`site.css` `::selection`), focus dans l'accent (`:focus-visible`), favicon du tube (`public/favicon.svg`), OG composée depuis le hero (`public/og.png`), pied en composition finale (néon sur `--c-curtain`), 404 dans le concept.
10. [x] Polices : 2 fichiers (`public/fonts/`), 2 préchargés, `@font-face` sous la base (`tokens.css`).
11. [x] Échelle fluide unique, grands sauts : `tokens.css` `--t-*`.
12. [x] Display réglé : `.neon` (interligne 0,95, interlettrage justifié, `text-wrap: balance`, hampes protégées), `.titre-l` (-0,03 em, 1,02).
13. [x] Corps et UI : `body` 1,55, `p { max-width: 62ch }`, UI 13 à 14 px à 7,7:1.
14. [x] Typographie française : U+00A0 dans `prix()`, `heure()`, `notesCarte` (`site.ts`), « ± 300 g » (`carte.ts`), guillemets et apostrophes typographiques.
15. [x] Grille, lignes fortes, cadre : `.wrap` 12 colonnes, `body::after` (deux filets), filets d'en-tête et de pied.
16. [x] Famille de section au plus une fois par page : § Plan de composition.
17. [x] Hero en 3 s : mesure Playwright (01/11, `.logs/aw-mesure.log`) à 1440×900 : h1 32→940 × 231→466, CTA bas 635, photo 968→1407 ; 1280×720 : CTA bas 595 ; 1024×768 : CTA bas 530 ; 390×844 : h1 157→243, « Voir la carte » et le menu « Appeler » visibles.
18. [x] Mobile 390 recomposé : `@media (max-width: 47.99rem)` de `site.css` (4 colonnes, néon 25vw, lignes `auto`, bandes `overflow-x` + `scroll-snap`) ; `scrollWidth` = 390 et 320 sur les 5 pages (mesure du 01/11).

## Mouvement livré (phase 2, 01/11/2026)

- **Pilote** `src/motion/neon.ts` : une variable, le courant `--lum` de chaque segment de tube, écrite en ligne sur les seuls `.neon__l` des tubes visibles (IntersectionObserver), arrondie au centième et écrite seulement si elle change. Allumage par paliers irréguliers dans un ordre mélangé (un vrai néon ne s'allume pas de gauche à droite) ; repos : respiration 0,9 à 1 et hoquet d'un segment toutes les 4 à 9 s ; sur la 404, les tubes grillés tentent de repartir et retombent ; pointeur : le tube se renforce jusqu'à 1,15 à moins de 260 px ; au toucher : baisse de tension quand on défile vite.
- **Halo** : `--halo` est déclaré sur `*` (tokens.css) et non plus sur `:root`, sinon le `--lum` écrit sur un enfant n'entrait pas dans le calcul. Couleur du segment : `color-mix` entre le tube allumé `#fff6f0` et le tube éteint `#4c5644`.
- **Hovers** : animation CSS `allumer` (paliers discrets de `--lum`, 0,42 s) sur le libellé ou le CTA ; même état sur `:focus-visible` ; `:active` marqué (CTA rose foncé, libellés à mi-courant).
- **Reveals** : `data-split="lines"` sur les h2 et la devise, `data-reveal` sur les photos hors premier écran et les trois faits ; rien sur le h1, l'accroche, la photo du hero ni la première photo de l'histoire (LCP).
- **Pas de magnétisme ni de suiveur de curseur** : rien ne glisse dans ce concept (verbe « allumer ») ; `#cursor` absent, décision écrite.
- **Mesure du repos** (01/11, 1440×900, diff de pixels par 0,5 s, seuil 24) : 0,00 à 0,15 % ; amplitude compatible avec `settledMs`, à confirmer en phase 3 par `report.json` (`idleMotion`, `settledMs`).
- Favicon PNG 32 px et `apple-touch-icon` 180 px rendus depuis `favicon.svg` (sharp).

## Sur-utilisation de la skill (phase 2)

19. [x] Menu mobile accessible : popover natif plein écran (390×844 mesuré), `aria-expanded` tenu à jour (`src/motion/menu.ts:14`, `:31`), focus sur le premier lien (`:18`), focus piégé (`:26-29`, 8 Tab restent dans le menu), Échap (natif, mesuré : `aria-expanded=false`, focus rendu à `.tete__menu`, `:22`). Journal `.logs/aw2-test.log`.
20. [x] Engine verbatim (`src/engine/`), `astro.ts`, `transition:persist="curtain"` (`Base.astro:77`), `transition:animate="none"` (`Base.astro:40`) ; `#gl` et `#cursor` sans objet (ni GL ni suiveur).
21. [x] Une horloge : grep `addEventListener('scroll'|requestAnimationFrame` vide dans `src/motion`, `src/components`, `src/pages` ; tout par `gsap.ticker` (`neon.ts:28`, `:132`).
22. [x] Code de page dans `onPage()` avec nettoyage : `neon.ts:75` (retire le tick, déconnecte l'observateur, `:133`), `neon.ts:142` (ResizeObserver, `:154`), `menu.ts:7` (`:35`).
23. [x] Aucune CSS `transform` sur élément GSAP : grep `transform` dans `site.css` ne renvoie que `text-transform` ; le néon est piloté par variable, pas par transformation.
24. [x] Module pilote avec `startIdle` (`neon.ts:22`) et pointeur (`neon.ts:112-113`), appelé une fois depuis `setup.ts:18-21`.
25. [x] Loader décidé : aucun (Concept Card, l'allumage du hero est le premier moment), ni composant ni `role="status"`.
26. [x] Transition du concept : sortie 0,32 s, entrée 0,65 s (`setup.ts:12-16`), mesurée : rideau `hidden` après navigation vers `/carte/`.
27. [x] Intro : l'allumage du premier tube est ajouté à `intro` (`neon.ts:93`) ; mesuré à 150 ms (segments à 0 ou en palier) puis 0,96 partout à 2,15 s ; le premier frame stable est le néon allumé (`.shots/aw2-hero.png`).
28. [x] Épinglages : aucun pin GSAP ; éléments collants CSS calés sur les hauteurs réelles `--tete-h` et `--sommaire-h` (`neon.ts:142`, mesurées 82 px et 51 px sur `/carte/`).
29. [x] Repli statique : en mouvement réduit tout est allumé (`--lum: 1`, `site.css:470`), tubes grillés de la 404 éteints (mesure : `1 1 1 1 0 … 0 1 1`), aucune animation.
30. [x] Copies décoratives : le tube est `aria-hidden`, le texte est porté une fois en `sr-only` (`Neon.astro`) ; aucun titre dupliqué.
31. [x] Une famille d'easing (`ease.*` de l'engine, courbe power3 en CSS pour les transitions d'UI), durées du tableau Timing (hovers 0,3 à 0,42 s, reveals de l'engine, transition ≤ 0,65 s), stagger d'allumage `min(80 ms, 0,7 s / n)` et 60 ms sur les faits et le mur.
32. [x] Trois traitements dans le verbe : CTA qui se remplit et s'allume, libellés qui s'allument, liens utilitaires couleur + soulignement (`site.css:436-468`).
33. [x] Hover sous `@media (hover: hover)` (`site.css:451`), mêmes états sur `:focus-visible` (`:446-450`), visibles en réduit (seule l'animation est coupée).
34. [x] Liens texte `.lien` soulignés au repos (accent).
35. [x] Phase 3 : `hover.noHoverChange` de l'accueil et de la carte = marque « Wépion » et « La carte » (lien courant) ; marque corrigée (soulignement accent sur « Wépion », `site.css:459`), lien courant de la nav justifié (page en cours, `aria-current`). `colorOnly` lu à l'œil : « Voir la carte », « La carte », téléphone = halo de néon par paliers (traitement du verbe, pas une simple couleur) ; « Ouvrir le plan » prend désormais couleur, épaisseur et décalage du soulignement (`site.css:458`).
36. [x] `desktop.idleMotion` = false (QA-build, accueil et carte) : immobilité assumée et écrite ici. Le repos du néon est un bourdonnement de 0,15 % de pixels par 0,5 s (mesure phase 2) plus les hoquets ; l'augmenter pour franchir le seuil de l'outil ferait passer `settledMs` à null (leçon chez-guillaume) et trahirait le concept (un néon qui pulse fort est un néon en panne).
37. [x] Curseur natif visible (aucun `cursor: none`), aucun contenu ni action dépendant du hover au toucher.
38. [x] Pas de `filter: blur`, pas de `box-shadow` au scroll (seulement au survol des CTA), aucun `will-change`.
39. [x] Réduit : ni Lenis (engine), ni GL, ni scrub, ni loader ; mesuré : 0 élément caché, `motion=false`. Champs `report.json` en phase 3.
40. [x] GL sans objet, décision écrite (Concept Card) ; lignes `// GL` retirées de l'engine.
41. [x] Sans objet (pas de GL).
44. [x] Skip link en premier (`Base.astro`), anneau `:focus-visible` dans l'accent (`site.css:5`), rose foncé sur la section jour ; confirmation `report.json` en phase 3.
45. [x] Phase 3 : axe 0 violation de contraste ; 2 `contrastNeedsReview` sur l'accueil = segments du tube pendant l'allumage (texte porté en `sr-only`, tube `aria-hidden`), vus à l'œil sur `d-01-hero` : allumé, blanc chaud sur fond nuit. Ancienne note : (contraste mesuré sur chaque état) ; le tube à `--lum` 0 n'existe qu'à l'allumage et sur les segments grillés décoratifs (le texte lisible est le `sr-only` et le h1).
46. [x] Texte réel partout, aucun canvas.
47. [x] Cibles : CTA 48 px, « Appeler » d'en-tête et « Menu » 44 px (`min-height: 2.75rem`) ; confirmation phase 3.

## QA et ship (phase 3, 01/11/2026)

Sources : `QA-build.md` (agent captures : accueil, carte, 404 brute), puis captures ciblées `.shots/reservation/` et `.shots/carte/` après corrections, `.shots/audit.txt`.

Corrections de la passe :
- Marque d'en-tête : `aria-label` « la dolce vita Wépion, accueil » (contient le texte visible) et espace entre les deux spans (`Header.astro:13`) ; axe `label-content-name-mismatch` levé (mesure : nom = « la dolce vita Wépion, accueil », texte = « la dolce vita Wépion »).
- Survol de la marque : « Wépion » passe au clair et se souligne en accent.
- Cibles tactiles du pied (« Ouvrir le plan », e-mail) : 21 px vers 44 px (`.pied__col .lien`, mesure 44/44 à 390 et 1440).
- Sommaire collant de la carte au téléphone : le premier chapitre collait au bord (snap sans marge) ; `scroll-padding-inline: var(--gutter)`, premier lien à 16 px.
- Réservation : horaires listés deux fois (WARN audit x6) ; le pied de cette page renvoie au détail plus haut (`Footer.astro`, prop `page`).

Checklist phase 3 :

42. [x] `lang="fr"` sur les 5 pages, un h1 par page (404 : « Un tube a grillé. »), landmarks header/main/footer, listes pour horaires et plats.
43. [x] Titres uniques (`Base.astro`), description par page, canonical, OG (`public/og.png`), `twitter:card`, favicon SVG + PNG 32 + apple-touch 180, `sitemap-index.xml`, JSON-LD `Restaurant` (grep `dist/…/index.html`).
48. [x] `<Picture>` avec `width`/`height`, webp, hero `fetchpriority="high"` (1 occurrence), lazy ailleurs, alt d'après `sujet`.
49. [x] LCP mobile 1264 ms accueil (`img`), 1188 ms carte (texte) (QA-build).
50. [x] CLS 0 desktop et mobile sur toutes les pages capturées ; polices `font-display: swap`.
51. [x] JS 61 Ko gz, page la plus lourde ~959 Ko, polices woff2 seulement (audit.txt « heaviest page »). Les JPG originaux émis par Astro dans `_astro/` (jusqu'à 725 Ko) ne sont référencés par aucune page (grep vide) : pas de poids servi.
52. [~] `settledMs` 3461 (accueil, `.shots/home`) et 2464 (réservation) ; `scrollFps` desktop 54 accueil (pire trame 83 ms, contre 50 avant retrait du reveal de galerie), 60 carte et réservation, mobile 60 partout. Accueil desktop à 1 FPS de la cible : écart noté dans RAPPORT.md.
53. [x] 0 tiret cadratin ou demi-cadratin dans `dist/` (contrôle Python).
54. [x] Audit (`.shots/audit.txt`) : 0 FAIL ; phrase répétée corrigée ; cibles de la réservation (e-mail, plan) passées à 44 px (`site.css:371`) ; seul WARN restant « no sitemap » (faux positif sous `base`, `sitemap-index.xml` présent).
55. [x] Accroche « À Wépion, l'Italie prend son temps. » (6 mots), chiffres vrais (2017, 86 plats, 2 modes), « Réserver » dans l'en-tête de chaque page.
56. [x] Aucun `placeholder: true` nécessaire ; 0 « lorem », « example.com », « TODO ».
57. [x] « Photos : La Dolce Vita » et colophon dans le pied.
58. [x] `grep -L 'name="robots"'` vide sur les 5 HTML.
59. [x] `KywFooter` sur chaque page (refus du build sinon), mention rendue, absent de `noHoverChange`.
60. [x] `BASE_URL` partout, 0 requête échouée (report.json de chaque page).
61. [ ] Deux passes de critique neuf : impossible sans outil Agent dans cette session ; auto-notation marquée « Self-score, non indépendant » (RAPPORT.md).
62. [~] Lecture de l'idée : auto-notation, donc non probante.
63. [x] Accessoire retiré : le reveal « up » échelonné de la galerie de l'accueil (`index.astro:74`), qui laissait des trous sur `d-04/d-05-scroll` pendant le défilement ; les photos sont peintes d'emblée (lazy). Scores ≥ 8 non prouvés (auto-notation), voir RAPPORT.md.
