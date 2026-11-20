# ETAT : be-belge-portfolio (phase 3 sur 3, QA terminée)

Phase 3 : QA faite, titre/meta raccourcis, phrase téléphone inventée retirée, build OK. Voir RAPPORT.md. Reste : pnpm index + publication (session mère).


## Fait (phase 1)
- Gabarit velours adapté, données du dossier, 7 pages, photos WebP, tokens aubergine/ocre (voir DESIGN.md).

## Fait (phase 2)
- Motion : rideau des chapitres refait en variable `--lift` (0 à 100) sur un dégradé : le pan aubergine a un filet ocre de 2 px sur son bord qui monte (signature visible, le pan seul était de la couleur du fond). Photo du hero : recul 1,08 à 1 en 2,4 s au moment où le nom monte (desktop seulement). Loader, transition de page, compteurs (3 / 57 / 34 / 5), citation au scrub, onglets 6 s : conservés, vérifiés.
- Hero : saut de ligne forcé « BE BELGE… » / « ET D'AILLEURS » (`.hero__saut`, plus de « ET » seul en fin de ligne) ; tient en 390 (« D'AILLEURS » 254 px).
- États : curseur suiveur masqué jusqu'au premier mouvement (il s'affichait à 0,0) ; clavier des onglets (flèches, focus, un seul panneau visible) OK ; focus-visible, hover des boutons (rideau), menu mobile (44 px par lien, aria-expanded) OK.
- Finitions : sous-libellés des chiffres en majuscule initiale (« Le Menu du Chef… ») ; libellés d'horaires du pied « Lundi et mardi » (::first-letter, plus de « Lundi Et Mardi ») ; commentaires « sapin / cuivre / POTES » remplacés.
- Reduced motion : pas de pan, pas de loader, pas de curseur, compteurs et citation à leur valeur finale, hero peint au premier rendu (vérifié).
- Vérifié par script Playwright (3 viewports x 7 pages) : 0 erreur console, 0 débordement horizontal ; clics réels sur les 4 liens d'en-tête (3 pages) OK ; bas de page 1440 : mention Maquette KYW et logo KYW visibles ; 0 cible tactile < 24 px en 390.
- Build : `pnpm build:site sites/be-belge-portfolio` passe (7 pages).

## Reste
- Shoot / audit complet : agent « captures ». `pnpm index` et publication : non faits (phase 3 / session mère).
- Phase 3 : relire la planche mobile des pages /carte/, /privatisation/, /maison/ (seules l'accueil, /menu/ et la clôture ont été vues en 390) ; contraste du texte ocre petit sur aubergine à confirmer par axe.
- Le formulaire CSS `.form` n'est plus utilisé (réservation = lien Zenchef) : code mort, sans effet.

## Pièges / hypothèses
- Lien Zenchef déduit du rid 382492 (à vérifier). gabarits/UTILISATION.md non mis à jour (« velours : be-belge »).
- Rideau : `.motion .rideau` seulement ; `--lift` posé en style inline par GSAP, `visibility: hidden` à la fin.
