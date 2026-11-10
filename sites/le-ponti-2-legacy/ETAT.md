# ETAT : le-ponti-2 legacy (phase 2 sur 3 faite)

## Fait (phase 1)
- Audit, DESIGN.md, comp.md, deal Solstice, draw 781aef, contenu réel (src/data), pages /, /menu/, /contact/, 404, photos du client.

## Fait (phase 2)
- src/scripts/ui.js (un seul module) : menu mobile `<dialog>`, jour courant et état ouvert/fermé des horaires (heure de Bruxelles), reveal des neuf cartes, rubrique en cours de l'index.
- Nav collante (`.js .nav`), index de la carte collant sous la nav, `scroll-padding-top` ajusté ; barre mobile 64 px (nom, Réserver, Menu) ; boutons à 44 px, états hover (sous `(hover: hover)`), active, focus-visible, disabled ; focus or sur la bande brune.
- Mesures Playwright (1280, 375, 320) : aucun débordement horizontal, aucune erreur console, menu ouvert/fermé (Échap, lien, focus rendu), index collant à 82 px, reveal visible sans JS et en mouvement réduit.
- sloplint hero : 0 FAIL, 1 NOTE (lead de 19 mots, texte du client). Revue hero en auto-notation (`self`), comp reproduite (comp.md). Build vert (`dist/le-ponti-2/legacy/`), noindex, kyw-signature et mention KYW sur les 4 pages.

## Reste (phase 3)
- QA navigateur sur 5 largeurs (l'agent captures les fournit), revue finish, hallmark Sweep, RAPPORT.md, `pnpm index`.
- sloplint `--render` page-stage sur /, /menu/, /contact/ à refaire après la phase 2.
- À regarder en captures : bande « Ouvert maintenant » (ligne d'état) dans le puits des horaires ; carte `.cat` en 2 colonnes à 600 px ; 7 rubriques toujours typographiques (4 photos seulement).

## Pièges
- Les jours fériés ne sont pas gérés : l'état ouvert/fermé dit « d'après les horaires habituels ».
- La ligne d'état est vide sans JS (min-height 1lh réservé, pas de décalage).
- Un espace en tête d'un `<span>` dans un `inline-flex` est supprimé : envelopper tout le libellé d'un bouton dans un `<span>`.
- Le linter exige `.js` dans le sélecteur d'un état caché au repos : `.js.reveal-on [data-reveal]`.
- Pas de formulaire, pas de switcher : rien à y ajouter, la réservation est le lien Barestho.
- sloplint statique : 1 WARN F15 (trois écarts de colonnes : 24, 32, 64 px ; 24 px vient probablement de .nav__bar et .actions) à trancher en phase 3.
