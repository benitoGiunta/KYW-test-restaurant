# ETAT bayti-awwwards, fin de la phase 3 (QA)

## Phase 3
- QA-build.md absent : audit + shoot ciblé de l'accueil faits ici. 3 corrections (tabindex `.strip`, hover logo, hover `.lien`), vérifiées : 0 FAIL, axe 0, noHoverChange et colorOnly vides, LCP 2020, CLS 0,02.
- Reste : QA complète des autres pages, critique jury neuf (non fait), relecture des 13 contrastNeedsReview. RAPPORT.md écrit.


## Fait (phase 1)
- Concept « Rue du Pont » (n° 6 le jour, n° 15 le soir), verbe « longer », sans loader ni GL ; système, contenu réel, 5 pages, 404 ; voir `DESIGN.md` § phase 1.

## Fait (phase 2)
- Pilote `src/motion/rue.ts` : fil fixe `#fil` (trace + passant suivant le défilement), fond `#fond` qui glisse jour, carreau, nuit (scrub par section), repos (pavés du fil 8 px/s, pointeur).
- Transition « longer » (`src/motion/setup.ts`), intro du hero (`data-intro`), reveals déclaratifs (titres en lignes, photos en `clip`, liste des services).
- Hovers à 3 traitements, `:focus-visible` et `:active` ; lien KYW souligné au survol.
- Menu mobile accessible (`Header.astro`, `src/motion/menu.ts`) sous 48 rem.
- Pied du site passé de `<footer>` à `<section aria-label>` (le paquet KYW porte le seul `<footer>`).
- Favicons PNG 32 px et `apple-touch-icon` 180 px tirés de `favicon.svg`, liés dans `Base.astro`.
- Build passe, `pnpm index` fait. Contrôles Playwright (1440, 390, 360, réduit) : 0 erreur console, `scrollWidth` = fenêtre, 0 texte caché après défilement et en réduit, menu (ouverture, piège, Échap, retour du focus) conforme, navigation Carte 1,7 s chargement compris.
- Checklist 19 à 47 dans `DESIGN.md` (35 et 45 ouvertes, 27 et 36 à confirmer).

## Reste (phase 3)
- Shoot complet (agent captures) : `settledMs`, `idleMotion`/`idleAt`, `hover.noHoverChange`, axe contraste (notamment pendant le glissement de ton et sur `#fil` en différence), LCP (h1 en `chars` + photo du hero), `loaderMs` nul.
- Vérifier le fil fixe au téléphone en bas de page (au-dessus du pied KYW, `body` a 2,25 rem de marge basse sous `.motion`).
- RAPPORT.md, cases 9 et 15 de la phase 1.

## Décisions et pièges
- Sections transparentes seulement sous `html.fond-on` (classe du pilote, restaurée dans `astro:after-swap`) ; sans elle, chaque section garde son aplat.
- Le repos doit changer plus de 648 px en 1,5 s à 1440 : pavés de 12 px sur 24, 2 px de haut, 8 px/s (demi-période en 1,5 s).
- Titres contenant `&nbsp;` (h1 de la carte et de la réservation) non découpés par SplitText.
- `.btn--plein` en `background-color` (le raccourci `background` effaçait l'aplat de survol).
