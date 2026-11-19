# ETAT, Tariki awwwards, phase 1 (construction-1)

## Fait
- Concept « la route » (DESIGN.md), système, scaffold (engine copié de sites/huile-sur-le-feu-awwwards, tokens et site.css propres), polices Young Serif, Schibsted Grotesk, Amiri (mot arabe seul).
- Pages : accueil, carte (soir + midi, données de donnees.json), histoire, réservation (tel, en ligne, mailto, formulaire mailto), 404. Pied KYW, noindex, JSON-LD Restaurant, favicon, OG.
- Build OK (`pnpm build:site sites/tariki-awwwards` vers dist/tariki/awwwards/). Mesures Playwright du héros aux 4 viewports, aucun débordement horizontal.

## Reste (phases 2 et 3)
- Signature : tracé du fil au scroll (`data-route-fil`, `.route__fil`), étapes qui s'allument, état actif de `.carte__route` (aria-current), révélations `data-split`/`data-reveal`, parallaxe `data-parallax` (attribut posé, sans effet).
- QA navigateur complète, axe, Lighthouse, RAPPORT.md, vérification des transitions (rideau latéral en place, non testé).
- Photos : seulement 3 visuels d'ambiance du client ; aucun plat. Option : photos.mjs marqué placeholder si le jury juge la carte trop sèche.

## Décisions et hypothèses
- Carte du soir = version de la page « La carte » (prix inférieurs) ; « Le début du voyage » 18 € omis (à confirmer).
- Adresse Rue de l'Ouvrage 2 (pas celle de la BCE, qui est Bayti). Pas de GPS : plan par recherche OpenStreetMap.
- Aucun avis, chef, équipe, date d'ouverture, citation de presse. Arcades légendées « illustration ».
- Les libellés d'étapes (« Au bord du chemin », « La halte », « Le foyer », « À côté du feu », « L'arrivée ») sont de la voix du concept, pas des faits.
- Pas de loader, pas de GL (justifiés dans DESIGN.md).
- Points à surveiller : « ş » de « turşu » hors du sous-ensemble latin de Young Serif et Schibsted (repli système).
