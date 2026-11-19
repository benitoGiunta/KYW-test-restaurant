# ETAT.md : wok-de-jin awwwards (fin de la phase 1 sur 3)

## Fait
- Concept « La semaine à volonté », DESIGN.md (brief, 3 concepts notés, Concept Card, système, checklist 1 à 18).
- Scaffold, engine verbatim (copié de le-royal-awwwards, sans GL), tokens.css, engine.css, polices Tanker et Switzer.
- Contenu `src/data/site.ts` (réel : tarifs, horaires, adresse, téléphone, réveillon) ; photos du client dans `src/assets/photos/` (visages 10 et 11 écartés).
- 5 pages statiques : `/`, `/carte/`, `/a-propos/`, `/reservation/`, 404. Pied composé (`Footer.astro`) + `KywFooter`.
- Build OK (`pnpm build:site sites/wok-de-jin-awwwards` vers `dist/wok-de-jin/awwwards/`). Mesures Playwright 1440, 1280, 1024, 390, 360, 320 : pas de débordement horizontal, `.display` left >= gouttière.

## Reste (phases 2 et 3)
- Phase 2 : signature (cases de la semaine qui se servent, case du service en cours allumée par `Intl` Europe/Brussels, respiration au repos), `data-split`/`data-reveal` branchés dans `motion/`, hovers d'images éventuels, reduced motion.
- Phase 3 : QA navigateur (shoot, axe, audit), OG composée (actuelle provisoire : aplat + photo, sans texte), checklist 9 et 19+, RAPPORT.md, `pnpm index`, commit final avec `[publier]`.
- Aucun `data-reveal` encore posé (aucun lien dans un bloc révélé à vérifier).

## Décisions et hypothèses
- Pas de loader, pas de GL (voir DESIGN.md).
- Correspondance jour/tarif DEDUITE des trois onglets du site client : lundi, mercredi, jeudi, vendredi = midi 16,80 et soir 23,80 ; samedi et dimanche = 27,80 aux deux services ; marquée `hypothese: true` dans `site.ts` et signalée sur la page (« confirmez-le à la réservation »). A confirmer.
- Téléphone : 081 30 68 88 (site client) ; le mobile +32 487 888 968 de restaurants.json n'est pas utilisé.
- Réservation générale : lien vers wokdejin.com (seule URL dédiée connue : réveillon).
- Aucun placeholder fictif : rien d'inventé (pas d'avis, d'e-mail, de réseau, d'histoire, de parking).
- Photos 2048 px des salles recadrées à 1600 px (sharp) avant import.
- Serveur de mesure : port 4417, PID noté puis arrêté.
