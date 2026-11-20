# ETAT : Épices & Nous, variante awwwards (construction-1 terminée)

## Fait
- Brief, 3 concepts, Concept Card, système (DESIGN.md, checklist 1 à 18 prouvée).
- Scaffold Astro 5 (ClientRouter), engine copié verbatim de la variante huile-sur-le-feu (sans GL), tokens.css et site.css propres au concept, polices Boska et Switzer (4 fichiers).
- Contenu `src/data/site.ts` (coordonnées, horaires, carte complète, menu 52 €, équipe, histoire, repères), `src/lib/photos.ts` (17 photos du client avec alt d'après `sujet`).
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, 404 ; head complet (titre, description 136 à 150 car., canonical, OG, JSON-LD Restaurant, noindex) ; favicon SVG, 32 px, apple-touch, og.png composée.
- Build OK (`pnpm build:site`), 5 pages, `dist/epices-et-nous/awwwards/` écrit, pied KYW et mention d'illustration vérifiés dans le HTML.

## Reste (phases 2 et 3)
- Phase 2 : mouvement (scrub du nom et du &, révélations, apparition du plat au curseur sur la carte, rideau final, `prefers-reduced-motion`), loader non prévu, `src/motion/` à créer au-delà de `setup.ts`.
- QA navigateur complète (captures desktop, mobile, reduced motion, axe, clavier, LCP) ; les images lazy n'ont pas été vues chargées (le `imgKO` de la mesure est le lazy-loading, pas une erreur, à confirmer en QA).
- RAPPORT.md, `pnpm index`, commit final avec `[publier]` si l'orchestrateur le demande.
- Vérifier : menu mobile absent par choix (nav en ligne, « Appeler » masqué sous 760 px, le téléphone est dans le hero et le pied) ; contraste du `.cta` sur nappe (texte blanc sur `#8a4a0b`).

## Décisions
- Concept A « Deux voix » (passe cuisine/salle), loader non, GL non, immobilité de repos.
- Pas d'e-mail (donnees.json le donne `null`) : pas de `mailto:` ni de formulaire ; réservation par `tel:` et lien Wix du client.
- Aucun placeholder fictif : tout vient de donnees.json. Michelin et Gault&Millau sont en texte (repères de l'histoire), à confirmer ; pas d'avis, pas de logos de presse. Sophie : nom de famille Delvigne (site actuel), la variante « Kervyn » du G&M n'est pas reprise.
- Photos 06, 08, 18, 19 non utilisées (06 importée dans photos.ts sans emploi) ; 16 retirée.
- Aucun commit ne contient `[publier]`.
