# Revue portfolio · Makimono · passe 2
Verdict : A_CORRIGER (0 F0, 3 F1, 3 F2, 4 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une affiche de rue rose, saumon et encre aux titres géants, aux cartes à ombre dure et au plat dessiné, dont la signature est la scène épinglée « Ça s'empile » qui monte un roll étape par étape jusqu'à son prix (10,10 €).

Base : `dist/` (11:53) postérieur à `src/` (base.css 11:51), `QA-revue2.md` (11:59) postérieur au `dist/` : réutilisés (0 erreur console, 0 requête en échec, LCP mobile 1,04 s, CLS 0,019 / 0,001, 0 axe serious sur accueil et carte). Serveur propre sur le port 4761 (PID 25303, arrêté). Mesures complémentaires par scripts maison (axe-core de `node_modules`, 6 pages x 4 largeurs 1440/1024/768/390 ; `right` des cartes, des `dd`, des étapes et du bento à 6 largeurs ; pile 7 fenêtres ; contraste de la pile ; h1 composer à 6 largeurs) et 5 planches lues. Le balayage à 1024 et 1280 px, absent de la passe 1, révèle des défauts que 1440 et 390 ne montrent pas.

Scores /10 :
- Design 6 : identité intacte, mais les heures des horaires sortent des cartes, le titre « COMPOSEZ » perd son Z et le bento est tronqué à droite entre 1024 et 1280.
- Usabilité 6 : horaires lisibles à 768 et 1920 seulement ; à 390 le dernier chiffre de « 14h30 » et « 22h00 » est coupé par le bord de l'écran.
- Créativité 8 : la pile « Ça s'empile » tient maintenant en entier (5 étapes et prix visibles à 1280x720, 1440x780, 1440x900, 1920x1080), le plat et le prix calculé restent propres à ce restaurant.
- Contenu 8 : notes sans guillemets, procédure « par téléphone » retirée, note de travail Korean Futo retirée, phrase d'explication du « dès » ajoutée ; reste la casse du PDF sur 11 ingrédients de /composer/.
- Technique 7 : 0 console, 0 lien interne mort (15 liens, internes en 200), 0 axe critique ; mais `scrollWidth` reste égal à la fenêtre alors que du contenu dépasse (`overflow: clip`).

## Vérification des corrections annoncées (REVISION-1.md)

| id | verdict | preuve |
|---|---|---|
| F1-1 horaires | PARTIEL, voir F1-1 ci-dessous | Cartes dans la fenêtre (right ≤ 1416 à 1440, 1000 à 1024), mais les heures dépassent la carte de 18 px (1440), 23 (1280), 30 (1024 et 390), 0 (768, 1920) ; `mk2r-home1440-hor.png`, `mk2r-pl2.png` |
| F1-2 `ol` des gestes | OK à 390, 768, 1440 ; défaut résiduel à 1024 (F2-1) | `ol` 342 px à 390, 1416 à 1440 ; scrollWidth = fenêtre ; à 1024 « Dégustez » sort de 41 px (right 1041) |
| F1-3 pile | OK | Reduced et défilement : 5/5 étapes visibles, prix 470-564 (1440x900), 395-484 (1440x780), 574-694 (1920x1080), 360-441 (1280x720), 404-472 (1024x768), 582-640 (768x1024), 525-577 (390x844) |
| F2-1 notes | OK | « Nourriture 5 sur 5 … » sans guillemets, « Geys_ 70 », seul « Exceptionnel. » reste entre « » |
| F2-2 téléphone | OK | `venir` : « Pas d'outil de réservation en ligne trouvé. Téléphone : … » ; « par téléphone » et « appelez » : 0 |
| F2-3 Korean Futo | OK | « 10,50 à 11,00 € » et « Prix à confirmer » ; « page photo » : 0 |
| F2-4 « dès » | OK | `carte` : « Prix selon la protéine choisie, le plus bas est affiché » |
| F2-5 casse | PARTIEL | Carte : « Frits/Râpé/Sésames/Mexicain » = 0 en description ; /composer/ garde « Oignons Frits », « Coco Râpé », « Tofu Frit », « Nori Frit », « Cream Cheese », « Tempura Flakes », « Saumon Snacké », « Thon Snacké », « Jeunes Oignons », « Sauce Teriyaki » (`carte.json:600,612,806,822`) |
| F2-6 titres | NON CORRIGÉ sur desktop, voir F1-3 ci-dessous | `mk2r-pl4.png` : « COMPOSE » + Z coupé ; « COMMANDER » entier à 1440 |
| F2-7 sous-titres | OK | `mk2r-pl3.png` : chaque sous-titre colle à son titre, écart 0,5em entre étapes |
| F2-8 contraste | OK | 0 violation axe `color-contrast` dans `section.empile` (4 positions x 2 largeurs) ; état éteint calculé 6,3:1 (crème à 0,62 sur #17261f) ; l'état éteint n'a pas pu être capturé sous headless (5 étapes « allumées » dès l'arrivée), non vu à l'œil |

## Findings

### F1 (majeurs)

**F1-1 · Horaires : les heures dépassent de leur carte (accueil et /venir/, 390, 1024, 1280, 1440).**
Preuve : `base.css:193` `.horaires__jour dd` en `nowrap` avec `clamp(1.5rem, 2.4vw, 2.6rem)` (et `clamp(1.5rem, 4.2vw, 2.6rem)` sous 1024) ; `Range.getBoundingClientRect().right` des `dd` moins `right` de la carte = 18 px à 1440, 23 à 1280, 30 à 1024 et 390 (13 cartes sur 14). `mk2r-home1440-hor.png` : « 14h30 » et « 22h00 » mordent la bordure et l'ombre dure ; `mk2r-pl2.png` (390) : « 14h3 », « 22h0 » tronqués par le bord de l'écran (`dt`/`dd` right 395 pour 390). Cause : la correction F1-1 a bien borné les colonnes mais fixé une taille de heure trop grande pour la largeur de carte ; l'ancien « Jeudi coupé » est devenu « heure coupée ».
Correction : taille liée à la largeur de la carte (`container-type: inline-size` sur la carte et `cqi`), ou `font-size` ≤ 1,9rem à 1440/1280 et ≤ 1,5rem à 1024 et 390 ; remesurer `dd.right ≤ carte.right − padding` à 390, 768, 1024, 1280, 1440, 1920 ; ce contrôle manquait dans REVISION-1 (mesure sur les cartes seules).

**F1-2 · Bento de la carte : troisième colonne sortie de l'écran à 1024 et 1280 (accueil et /carte/).**
Preuve : `base.css:174` `grid-template-columns: repeat(3, 1fr)` (sans `minmax(0, …)`), `base.css:184` passe à 2 colonnes seulement sous 1024 ; `.bento__carte` right = 1131 pour une fenêtre de 1024 et 1291 pour 1280 (8 cartes sur /carte/). `mk2r-pl1.png` (haut gauche, haut droit) : « VOLCANO CALIFORN… », « Fresh Spring », prix « 8,20 € » coupés au bord. Absent de la passe 1 (largeurs 1440 et 390 seulement). `overflow: clip` cache le dépassement (scrollWidth = fenêtre).
Correction : `repeat(3, minmax(0, 1fr))`, `overflow-wrap: anywhere` sur `.bento__carte h3`, taille de titre et de prix bornée ; remesurer `right` des cartes à 1024, 1280, 1440.

**F1-3 · Titre « COMPOSEZ » tronqué en « COMPOSE » dès 768 px (page /composer/).**
Preuve : la classe `display--mot` (F2-6) impose `nowrap` ; texte à 933 px de large dans une boîte de 776 px (1440), 1235 pour 1040 (1920), 670 pour 548 (1024), 509 pour 407 (768) ; le dernier caractère (Z) est rogné par la boîte. Captures `mk2r-comp-1440.png`, `mk2r-comp-1920.png` (« COMPOSE » + moitié de Z), correct seulement à 390 (« COMPOSEZ » entier, 33 px). « COMMANDER » est entier. La correction a remplacé la coupe « COMP/OSEZ » par un mot amputé, pire pour le sens.
Correction : `display--mot` calé sur la longueur du mot (le plus long : `min(mega, 7vw)` pour « COMPOSEZ », 8 lettres) ou colonne de titre élargie ; remesurer `range.right ≤ box.right` du h1 à 768, 1024, 1280, 1440, 1920.

### F2 (mineurs)

**F2-1 · « En trois gestes » à 1024 px : titres coupés (« COMPOSE », « COMMAND », « DÉGUSTEZ » dépasse de 41 px).** Preuve : `etapes__trois` 3 colonnes dès 1024 (`mk2r-pl1.png`, bas gauche), `strong` « Dégustez » right 1041 pour 1024. OK à 390, 768, 1280, 1440, 1920. Correction : trois colonnes dès 1200 px, ou taille de titre en `cqi`.

**F2-2 · Casse du PDF encore présente sur 11 ingrédients de /composer/** (voir tableau F2-5) : mots à majuscule au milieu du nom (« Oignons Frits », « Coco Râpé », « Tempura Flakes ») alors que la carte est normalisée. Correction : même normalisation dans `carte.json:600,612,806,822` et les entrées voisines (Title Case réservé aux noms propres).

**F2-3 · Page /venir/ à 1024 : `dt`/`dd` de Jeudi dépassent de 4 px (right 1028)** ; même cause que F1-1 (`venir`, 3 nœuds). Correction : couverte par F1-1.

### F3 (finition)

**F3-1 · axe `aria-prohibited-attr` (serious) : 3 nœuds sur l'accueil, 1 sur chaque autre page** (`aria-label` posé par SplitText sur `<p>` et `<strong>` : `.definition`, `strong[data-empile-prix]`, `.footer__adieu`). Non traité (REVISION-1 ne le citait pas). Correction : `aria: false` de SplitText ou `role="text"`.

**F3-2 · axe `landmark-no-duplicate-contentinfo` (modéré) sur les 6 pages** : pied du site + `kyw-footer` (2 `<footer>`). Non traité.

**F3-3 · /venir/ « La salle » : phrase doublon** (« terrasse sur la rue. Façade vitrée et terrasse sur la rue Saint-Loup. »), photo de façade sous le titre « La salle » ; pied « Itadaki / masu ! » en deux mots (12 occurrences de « Itadaki » dans le dist). Non traité.

**F3-4 · Accueil : « Douze recettes signatures et plus »** (la carte en liste 21) ; texte SVG « Commander · Commander » et flèche « → » mesurés à 1,78:1 par canvas (crème sur rose) : axe les classe « incomplete », à vérifier à l'œil. Non traité.

## Ce qui est bien (à ne pas casser)
1. Pile « Ça s'empile » : 5 étapes, légende et prix visibles aux 7 fenêtres testées, sous-titres collés à leur titre, prix 10,10 € recalculé juste (4,00 + 3,50 + 2 x 0,80 + 0,50 + 0,50).
2. Contenu corrigé sans casse : notes Restaurant Guru affichées comme notes, adresse, téléphone du site actuel, liens Deliverect, Ordering Club, Facebook, Instagram, e-mail identiques au dossier ; « Pas d'outil de réservation en ligne trouvé » honnête ; mention « Maquette KYW, certaines données sont illustratives », `noindex`, un seul logo KYW, `lang="fr"`, un seul h1, sur les 6 pages et à 4 largeurs.
3. Technique : 0 erreur console, 0 requête en échec, 15 liens dont tous les internes en 200, LCP mobile 1,04 s, aucun `scrollWidth` > fenêtre, mobile 390 sans bento ni gestes coupés.

## Hypothèses et limites
- Exigence PUBLIABLE non atteinte : 3 F1 (débordements visibles à des largeurs courantes d'ordinateur portable : 1024, 1280, 1440) et `aria-prohibited-attr` serious.
- Liens externes (Deliverect, Ordering Club, réseaux, Maps) non testés par réseau, comparés au dossier seulement.
- État « éteint » de la pile non capturé (headless : 5 étapes allumées dès l'arrivée) ; contraste calculé, non vu.
- Pas de sloplint (variante portfolio) ; auto-notation `self`, aucun critique externe.
- Les nœuds `nav` à right 786 (768 px) sont le menu fermé hors écran, non retenus.
