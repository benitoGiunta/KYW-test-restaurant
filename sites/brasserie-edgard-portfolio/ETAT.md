# ETAT — brasserie-edgard-portfolio (phase 3 sur 3, QA terminée)

## Fait (phases 1 et 2)
- Phase 1 : gabarit Guinguette, contenu réel, 7 pages, photos, build (voir DESIGN.md).
- Phase 2 : logo « Mr Edgard » intégré à l'en-tête (survol, focus) ; `heroTexte()` (titre qui se pose, slogan/adresse/boutons en cascade, filet à 5 s) ; `carteIndex()` (index sticky des catégories, aria-current, pastille centrée) ; section avis retirée sans effet résiduel (`avis()` supprimée) ; survol des plats (prix corail) ; nav mobile resserrée (Accueil masqué sous 400 px, le logo ramène à l'accueil) ; prix longs coupés aux « / » et en petit ; objet du manifeste recentré au-dessus du titre en mobile (il recouvrait le « P ») ; flèches clavier des objets : un seul axe par tween + `overwrite: 'auto'` (flèches rapprochées ne s'écrasent plus) ; `.footer, .kyw-footer` en relative / z-index content.
- Mesures (scratchpad, Playwright, 1440 / 1024 / 768 / 390 / 360 / 320) : aucun scrollWidth > largeur, aucune erreur console sur 6 pages, clics réels sur les 6 liens de l'en-tête OK (elementFromPoint = `<a>`), bas de page 1440 et 390 : bande KYW, mention « Maquette KYW, certaines données sont illustratives » et logo visibles sur les 6 pages. Marquee ouvert/fermé testé par `page.clock` (mer 9 h fermé, 12 h ouvert, 23 h « prochain service jeudi »). Drag souris des tirages OK (borné à la scène), drag des objets du hero OK (retour au point de départ s'ils sont lâchés sur le texte : voulu). Reduced motion : 0 animation en cours, loader masqué, objets posés visibles.
- Build ok (`scripts/q.sh edgard-p2-build pnpm build:site sites/brasserie-edgard-portfolio`).

## Reste (phase 3, après l'agent captures)
- Lire `QA-<étape>.md` de l'agent captures et corriger les écarts ; shoot et audit complets non faits ici.
- Vérifier visuellement : prix longs de /carte/ en mobile (pastille sur 2 lignes), objet du manifeste, état hover des tirages de /salle/.
- Objets SVG du manifeste/table à 768 px dépassent légèrement à droite (coupés par overflow, pas de scroll horizontal) : à regarder.
- CSS mort `.avis__*`, `.carte-avis*` dans base.css (avis retirés) : à nettoyer.
- sloplint, audit, `pnpm index`, commit, push : `pnpm index` à faire avec le commit final.

## Pièges
- Test de drag : lâcher l'objet hors de la zone du texte du hero, sinon il rebondit à sa place.
- Hero : `is-loaded` précède la fin de la chute des objets d'environ 2 s (Draggable créé à la fin) : attendre avant de tester.
- Aucun commit des `dist/` d'autres restaurants ; `git add` par chemins seulement.

## Phase 3 (QA)
- Fait : meta description, h2 sr-only /groupes/, CSS avis supprimé, build ok, RAPPORT.md écrit.
- Reste : LCP mobile accueil (3,3 s throttlé), objets SVG à 768 px ; publication par la session de correction.
