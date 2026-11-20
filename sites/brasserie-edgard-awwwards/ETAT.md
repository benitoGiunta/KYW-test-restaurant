# ETAT brasserie-edgard-awwwards, construction-1 (20/11/2026)

## Fait
- Brief, 3 concepts, Concept Card, système et checklist 1 à 18 dans DESIGN.md. Concept retenu : « Le cadran » (anneau de 24 h : salle 10 h à 22 h 30, cuisine, pause 15 h à 18 h).
- Scaffold Astro 5 : engine verbatim (copié de brasserie-du-quai, octet pour octet identique à chez-guillaume), tokens, Base, Header, Footer (KywFooter), Dial, Photo, menu mobile.
- Contenu : `src/data/site.ts`, `src/data/carte.ts` (71 plats générés depuis donnees.json, aucun fictif), `src/lib/photos.ts` (23 photos du client, alt d'après `sujet`).
- 5 pages : accueil, carte, a-propos (La maison), reservation, 404. Favicon, og.png (capture du hero).
- Build OK : `dist/brasserie-edgard/awwwards/` (5 pages, noindex, pied KYW).
- Mesures : aucun débordement, aucune requête échouée, CTA du hero dans la flottaison à 1440×900.

## Reste (phases 2 et 3)
- Phase 2 : aiguille à l'heure de Namur + arc courant qui s'allume (statut « cuisine ouverte / fermée maintenant »), révélations (`data-reveal`, `data-split`), hover finis, parallaxe légère, filmstrip, rideau de transition à tester.
- Phase 3 : QA navigateur (captures, axe, clavier, reduced-motion, LCP), `RAPPORT.md`, points 42 à 63 de la checklist, ajuster le titre mobile (left 13 px < gutter 16, alignement optique retiré en fin de phase 1 : à remesurer).
- Ajouter une planche de contrôle de la page carte (mobile) : non vue en phase 1.

## Décisions
- Pas de loader, pas de GL (justifiés dans la Concept Card).
- La salle reste ouverte 15 h à 18 h : déduit des horaires 10 h à 22 h 30 sans coupure ; à confirmer avec le client.
- Page « Histoire » remplacée par « La maison » (/a-propos/) : histoire inconnue, texte factuel tiré des photos et du site.
- Réservation : Barestho en CTA principal, `tel:` ensuite, `mailto:` avec mention « non enregistrée » du site.
- Prix : relevé du 20/11 sur le site client, mention « à confirmer sur place ».
