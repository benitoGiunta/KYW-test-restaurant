# Revue portfolio · Makimono · passe 3
Verdict : A_CORRIGER (0 F0, 2 F1, 2 F2, 4 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une affiche de rue rose, saumon et encre aux titres géants et aux cartes à ombre dure, dont la signature est la scène épinglée « Ça s'empile » qui monte un roll étape par étape jusqu'à son prix.

Base : `dist/` (12:13) postérieur à `src/` (`find -newer` vide, base.css 12:12), `QA-revue3.md` (12:21) postérieur au dist : réutilisés (0 console, 0 requête en échec, LCP mobile 1,1 s, CLS ≤ 0,001, 0 axe critique). Serveur propre sur le port 4771 (PID 2594, arrêté). Mesures complémentaires : 2 scripts maison (axe-core de `node_modules`, 6 pages dont `404.html` réel x 4 largeurs ; `Range.right` des heures, du bento, des gestes et des titres, 5 pages x 7 largeurs de 320 à 1920) et 5 captures ciblées lues. Mesure à la molette, puis 1,8 s de repos.

Scores /10 :
- Design 6 : identité intacte, mais les heures des 7 cartes d'horaires sont rognées à toutes les largeurs sous 1920 px et le bento de /carte/ casse « CALIFORNI/A » à 1024 px.
- Usabilité 5 : sur l'accueil et /venir/, « 14h30 » et « 22h00 » sont illisibles (`mk3r-hor-1440.png`, `mk3r-hor-390.png`) : l'information pratique centrale du site est tronquée.
- Créativité 8 : pile « Ça s'empile », prix calculé et plat dessiné inchangés, propres à ce restaurant.
- Contenu 8 : faits, prix et liens conformes au dossier, casse des ingrédients de /composer/ normalisée ; reste le doublon de /venir/.
- Technique 7 : 0 console, 0 requête en échec, 0 lien mort, 0 axe critique, `scrollWidth` = fenêtre partout ; mais du contenu dépasse sous `overflow: clip` (dt/dd right 1498 pour 1440).

## Vérification des corrections annoncées (REVISION-2.md)

| id | verdict | preuve |
|---|---|---|
| F1-1 + F2-3 horaires | NON CORRIGÉ (aggravé) | `Range.right` des `dd` moins `right` de la carte : +84 px à 1440 (436 pour 352), +72 à 390, +77 à 320, +77 à 1024 et 1280, +66 à 768 ; 0 seulement à 1920. REVISION-2 mesurait les boîtes `dd`, pas le texte |
| F1-2 bento | PARTIEL | 0 écart à 320, 390, 768, 1280, 1440, 1920 ; à 1024 px (3 colonnes, seuil `max-width: 1023px`) 19 prix sur 28 sortent de leur carte de 17 à 18 px (« 11,80 € », « 14,00 € », « 10,50 à 11,00 € ») et 3 titres sont coupés (« CALIFORNI/A ») ; `mk3r-bento1024.png`, `mk3r-bento1024b.png` |
| F1-3 « COMPOSEZ » | OK | `mk3r-comp1440.png` : mot entier ; `Range.right` ≤ boîte du h1 à 390, 1024, 1280, 1440, 1920 ; « COMMANDER » entier |
| F2-1 gestes à 1024 | OK | 1 colonne à 1024 (`mk3r-gestes1024.png`), 0 écart ; reste 336 pour 320 sur /commander/ (F3-3) |
| F2-2 casse | OK | `grep` du dist : 0 ancienne forme (Oignons Frits, Coco Râpé, Tofu Frit, Nori Frit, Cream Cheese, Tempura Flakes, Saumon Snacké, Thon Snacké, Jeunes Oignons, Sauce Teriyaki) ; reste « Graines de Tournesol » (F3-2) |
| F3 | non traité | annoncé |

## Findings

### F1 (majeurs)

**F1-1 · Horaires : heures rognées sur accueil et /venir/ à 320, 390, 768, 1024, 1280 et 1440 px (7 cartes).**
Preuve : `mk3r-hor-1440.png` : « 14h3 », « 22h » coupés par la carte voisine ou par le bord ; `mk3r-hor-390.png` : « 14h3 », « 22h0 » rognés par le bord de l'écran ; `dd` mesuré 409 px de texte pour une carte de 350 (police 41,6 px = le plafond 2,6 rem, jamais réduit). Axe : `DT`/`DD` right 1498 pour une fenêtre de 1440, 436 pour 390, 1075 pour 1024. Cause : `base.css:194` `font-size: min(2.6rem, 17cqi)` : 17 cqi vaut ≈ 51 px dans le contenu de la carte, donc la taille reste 2,6 rem ; or « 12h00 → 14h30 » occupe 9,8 em en `font-stretch: 125%`, soit une taille max de ≈ 9 cqi ; en plus la carte `display: grid` n'a pas de colonne `minmax(0, 1fr)`, la piste s'élargit au contenu `nowrap` (dd 409 > carte 350).
Correction : `font-size: min(2.6rem, 9cqi)` (ou `8.8cqi`), `grid-template-columns: minmax(0, 1fr)` sur `.horaires__jour`, puis remesurer `Range.right` des `dt`/`dd` ≤ `right` de la carte − 2 à 320, 390, 768, 1024, 1280, 1440, 1920 ; la mesure de la révision (boîte de l'élément) ne détecte pas ce défaut, utiliser `Range.getClientRects()`.

**F1-2 · Bento /carte/ à 1024 px : prix et descriptions hors des cartes, titres coupés.**
Preuve : `mk3r-bento1024b.png` : « 11,80 € » et « 14,00 € » mordent la bordure (€ coupé à 1008), « SAUMON SNACKÉ » et « FINES HERBES » dépassent ; `mk3r-bento1024.png` : « CALIFORNI/A CLASSIC », « CRISPY CALIFORNI/A » (`overflow-wrap: anywhere`, `base.css:177`) ; le script : 19 prix hors carte, 3 mots coupés ; même cause sur /commander/ à 1024 (3 prix hors carte de 18 px). 0 écart à 768, 1280, 1440. Cause : 3 colonnes dès 1024 (`base.css:185` ne bascule à 2 colonnes que sous 1024) avec `.bento__prix` en `--t-xl` sans plafond.
Correction : passer à 2 colonnes jusqu'à 1199 px (`max-width: 1199px`) comme les gestes, ou borner le prix en `cqi` ; remesurer prix et mots (`Range` par mot) à 1024, 1100, 1280.

### F2 (mineurs)

**F2-1 · /carte/ à 768 px : « ACCOMPAGNEMENTS » chevauche « DESSERTS ».** Preuve : `mk3r-acc768.png` ; h3 432 px de texte dans une boîte de 348 (768), 489 pour 476 (1024). Correction : taille du h3 de rubrique réduite à 768 (`clamp`/`cqi`) ou colonnes de titres à `minmax(0, 1fr)` avec `overflow-wrap: break-word` sur ce seul titre ; remesurer à 768 et 1024.

**F2-2 · axe `aria-prohibited-attr` (serious), inchangé depuis la passe 2 : 3 nœuds sur l'accueil, 1 sur chacune des 5 autres pages** (`aria-label` posé par SplitText sur `<p>`/`<strong>` : `.definition`, `strong[data-empile-prix]`, `.footer__adieu`, `aria-label="Itadakimasu !"` du pied). Correction : `aria: false` dans `SplitText.create` (`engine/reveal.ts:24`), ou `role="text"` sur ces éléments.

### F3 (finition)

**F3-1 · axe `landmark-no-duplicate-contentinfo` (modéré) sur les 6 pages** : 2 `<footer>` (pied du site + `kyw-footer`). Passer le pied du site en `<div>` ; attention : un `<div>` peut faire apparaître `region` sur son contenu.

**F3-2 · /venir/ « La salle » : phrase doublon** (« terrasse sur la rue. Façade vitrée et terrasse sur la rue Saint-Loup. ») ; pied « Itadaki / masu ! » coupé en deux mots (une ligne par mot) ; casse résiduelle « Graines de Tournesol », « Tempura de Scampis » parmi des ingrédients en minuscules ; apostrophes droites (« Ça s'empile », « Salade d'algues », « d'une boule ») à passer en U+2019.

**F3-3 · /commander/ à 320 px : les titres « Commandez » (336) et « Sur place, ou… » (324) dépassent de 4 à 16 px** ; `h2` « Create.Your.Bowl » 728 pour 722 à 768 (6 px). Sans effet à 390 et plus.

**F3-4 · Contraste à vérifier à l'œil** : texte SVG « Commander · Commander » et flèche « → » mesurés à 1,78:1 par canvas (crème sur rose), classés `incomplete` par axe ; non vérifié visuellement.

## Ce qui est bien (à ne pas casser)
1. Pile « Ça s'empile » (5 étapes, prix 10,10 €) et titres « COMPOSEZ » / « COMMANDER » désormais entiers de 390 à 1920.
2. Contenu fidèle au dossier : adresse Rue Saint-Loup, téléphone du site +32 483 03 88 47, liens, « Pas d'outil de réservation en ligne trouvé » honnête ; mention « Maquette KYW, certaines données sont illustratives », `noindex, nofollow`, un seul logo KYW, `lang="fr"`, un seul h1, JSON-LD `Restaurant`, 404 conçue (h1 « Affiche arrachée ») sur les 6 pages.
3. Technique : 0 erreur console, 0 requête en échec, liens internes tous en 200, aucun `scrollWidth` > fenêtre, 0 violation `color-contrast`, `prefers-reduced-motion` sans contenu caché.

## Hypothèses et limites
- PUBLIABLE exige 0 débordement : F1-1 (cartes d'horaires, toutes largeurs sauf 1920) et F1-2 (1024) l'interdisent.
- `scrollWidth` et la mesure des boîtes sont trompeurs ici (`overflow: clip`) : seuls `Range.getClientRects()` et les captures montrent le défaut.
- Liens externes (Deliverect, Ordering Club, réseaux, Maps) comparés au dossier, non testés par réseau. « Douze recettes signatures » est conforme au dossier (12 recettes), non retenu.
- Pas de sloplint (variante portfolio) ; auto-notation `self`, aucun critique externe.
- Nœuds `nav` à right 786 (768 px) : menu fermé hors écran, non retenus.
