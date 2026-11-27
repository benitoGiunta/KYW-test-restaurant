# ETAT · bienvenue-chez-vous · variante legacy · phase 1 sur 3

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.txt`), approche conservée (Photographic, multi-pages, calme), deal/draw/scaffold/stamp (Solstice, seed abf07f), comp (`comp.md`), `DESIGN.md` (Picks, composants, checklist).
- `src/data/site.ts` (données réelles, helper `fr()` pour l'insécable), `Base`, `Nav`, `Photo`, `Carte` (Switcher midi/soir), `Horaires`, `Reservation`, `Footer` ; pages index, presentation, resto, boutique, traiteur, contact, 404.
- 17 photos du client converties en WebP dans `public/photos/`.
- Build OK : `dist/bienvenue-chez-vous/legacy/` ; noindex, mention KYW et `kyw-signature` présents sur les 7 routes ; aucun tiret cadratin.

## Reste (phases 2 et 3)
- Phase 2 : sloplint --render sur le build, captures desktop/mobile (non vues : le CSS n'a pas été regardé dans un navigateur), états des boutons, nav mobile (liens en défilement horizontal, à valider), décider si le sepia de `base.css` (photo warm) ternit les roses et verts des plats.
- Slot nommé `boutique` sans photo, texte « Photo de la boutique à fournir » (`.fill`).
- Comp : c1 et c2 se sont écrasées à la capture ; aucune des deux n'a été regardée.
- Phase 3 : Sweep, RAPPORT.md, gates § 5.

## Décisions et hypothèses
- Draw abf07f partiellement refusé (voir DESIGN.md) : Photographic et Poster gardés.
- Téléphone, horaires, e-mail : sources tierces, signalés « à confirmer » dans la page ; aucun avis ni note affichés.
- Mercredis : 99 € Confort et 109 € Confort + repris du texte du site, marqués à confirmer. Box : 199 € (174 € sans boissons) ; le « 109 € » du dossier n'est pas repris (ambigu).
- Formules midi/soir déduites des lignes du site (49 € midi seulement ; 69 € midi et soir ; 79 € soir ; 94 € Voyage Signature).
- Boutique : contenu limité à la copie de la page Présentation ; « Chèque cadeau » et « Parking aisé » n'ont qu'un titre dans le dossier, la phrase d'accompagnement est neutre.
- `dropped` : pages « copie-de- », Presse vide, liens « J'aime » vers sites tiers, © 2013.
