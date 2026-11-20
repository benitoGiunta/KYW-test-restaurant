# ETAT — Le D'Arville, portfolio, phase 2 sur 3 (construction-2)

## Fait (phase 1)
- Gabarit Velours, données, 22 photos WebP, 8 pages, favicon/OG, build qui passe (voir DESIGN.md).

## Fait (phase 2, mesuré en navigateur sur serveur propre, port 4471)
- Signature conservée et vérifiée : rideaux de chapitre (5, levés une fois), compteurs (2, 73, 2, 200, 20 arrivent à leur valeur), loader, transition de page, citation au scrub, onglets à barre (flèches clavier OK, un seul panneau visible).
- Ajouts motion : hero, la photo se pose (scale 1,07 à 1, transform seul, fin d'intro à matrix identité) ; pages intérieures, filet cuivre qui se dessine sous le titre (`data-filet`, `pageIntro()` dans `src/motion/setup.ts`) et chiffre filigrane qui compte ; filet de lecture cuivre dans l'en-tête (CSS `animation-timeline: scroll()`, reduced motion exclu).
- États : survol des lignes de carte, formules, offres, chambres, triptyque, portraits (pointeur fin seulement, annulés en reduced motion) ; focus-visible ivoire sur boutons/nav/onglets ; flèche des liens ; lien courant du pied.
- Corrigé : galerie qui débordait de 83 px à 1024-1100 (largeur d'item calculée) ; `data-reveal` retiré de 5 blocs contenant des liens (guides, menu__cote, formules__pied, resa__infos x2) ; horaires du pied en une colonne ; « Du Lundi Au Mercredi » devenu « Du lundi au mercredi » (`::first-letter`).
- Clics réels de l'en-tête à 1440 : 7 liens (logo, 5 pages, Réserver) changent l'URL, elementFromPoint = `<a>`, en-tête 73 px (une ligne). Bas de page 1440 (accueil, menu, réservation) : bande du site, mention « Maquette KYW, certaines données sont illustratives » et logo KYW visibles ; noindex présent.
- Mobile 390 : menu ouvert au toucher, Échap ferme ; aucun débordement horizontal à 320, 360, 390, 768, 1024, 1440 sur les 7 pages (hors galerie à défilement voulu) ; 0 erreur console.
- Reduced motion : `html.motion` absent, 0 rideau, aucun texte `visibility: hidden` sur accueil, menu, histoire, carte.
- Build : `pnpm build:site` passe (8 pages).

## Reste
- Phase 3 : agent « captures » (shoot + audit complets, QA-<étape>.md), RAPPORT.md, `pnpm index`, commit final avec `[publier]`, `gabarits/UTILISATION.md` (`| velours | le-d-arville |`, consigne figée : à reporter par l'orchestrateur).
- Non vérifié par capture : 404 (lire `dist/…/404.html`, pas la réponse du serveur), contraste du filigrane (décoratif, aria-hidden), heure d'ouverture (aucune pastille calculée sur ce site : heures illustratives affichées).
- Limites d'adéquation inchangées : photos 2018 HDR, pas d'avis cités, pas de logo vectoriel.

## Pièges
- `dist/le-d-arville/awwwards/` est modifié par un autre agent : ne pas l'ajouter au commit (ajouter seulement `sites/le-d-arville-portfolio/` et `dist/le-d-arville/portfolio/`).
- Leçon proposée : `data/usage/test-1/lecons-proposees/le-d-arville.md` (agents/ non touché).
