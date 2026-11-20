# ETAT · Le D’Arville · variante legacy · fin de la phase 1 (construction-1)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.*`), approche conservée (Photographic 08, Poster, huit routes), deal / draw / scaffold Atelier (`2/3`, seed `restaurant-namur-gastronomic-seasonal-e85e·ef2833fe·2026-11-20·r0`, draw `73cd2c`), stamp en tête de `page.css`.
- Deux comps (`comp.md`), c1 retenu. `DESIGN.md` (Picks, Approche, Thème, Composants, Sur-utilisation 1 à 10 cochés).
- Contenu dans `src/data/site.ts` (données du dossier uniquement). 9 pages : accueil, carte, photos, chambres, seminaires, cheque-cadeau, traiteur-noel, reservation, 404. Mise en page statique, mobile par media queries (barre de réservation fixe sous 60 rem).
- 22 photos du client en WebP 800 et 1600 px ; PDF des vins copié (`public/carte-des-vins.pdf`).
- Build passe (`scripts/q.sh build pnpm build:site sites/le-d-arville-legacy`), pied KYW, noindex et mention présents sur les 9 routes. Sloplint `src` : seul FAIL 34 restant, faux positif connu (le `overflow-x: clip` est dans `base.css`).

## Reste
- Phase 2 : nav mobile (popover), états (hover déjà, focus, active posés), jour courant dans les horaires, un seul reveal, air WebGL d’Atelier (à décider, sinon papier fixe), trois questions de reproduction du comp, `data-endpoint` sans objet (pas de formulaire).
- Phase 3 : QA navigateur 375 et 1440, sloplint de rendu, contraste de la légende du hero sur photo claire, poids des pages (hero 1600 px), Sweep dans DESIGN.md, RAPPORT.md, entrée finale du journal.
- Aucune capture de la maquette n’a été regardée en phase 1 (hors comps) : vérifier le hero (photo en `height: 100%`), la galerie asymétrique et le passe-partout.

## Décisions et hypothèses
- Atelier plutôt que Hedgerow (photos claires HDR) ou Vellum (gothique). L’orange d’origine est abandonné (accent chaud interdit par le thème, logo absent).
- Shape Photographic au lieu du Catalogue tiré ; hero Poster au lieu de Stage.
- `.fill` (slots à compléter) : heures d’ouverture (Horaires), contenu du menu Bon Plan, tarifs des chambres, détails séminaires, montants du chèque cadeau, carte traiteur ; au plus un par page sauf carte (deux : heures et Bon Plan) et réservation (un).
- Avis, notes Tripadvisor, Trouve Ton Resto, Petit Futé, Gault&Millau et Delta d’Or non repris : chiffres variables ou contradictoires (15/20 contre 16/20), règle 46a.
- Desserts sans prix : prix non rendus. Dates : « menus d’actualité jusqu’au 20 décembre 2026 » et congés 2027 repris du site.
- Le widget Zenchef devient un lien « Réserver en ligne » vers ledarville.be/reservation/ ; « Réserver » de la nav et du hero va à la page `reservation/` de la maquette.
- Photo 16 légendée « Le chef devant l’entrée » (sujet de l’index) ; le nom Olivier Bourguignon vient du dossier (gaultmillau.be), pas de la photo.

## Pièges
- `sites/_test-legacy/` n’existe pas : `astro.config.mjs` copié de `cafe-fleuri-legacy`.
- Fig : la légende est hors du `data-slot` (base.css cache les enfants d’un slot qui contient une image).
- `pnpm-lock.yaml` modifié par un autre agent : ne pas l’ajouter au commit.
