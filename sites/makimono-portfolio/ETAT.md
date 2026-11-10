# ETAT : makimono-portfolio (fin de la phase 1 sur 3)

## Fait
- Gabarit **affiche** choisi (matrice dans DESIGN.md), copié sans node_modules ni dist, UTILISATION.md mis à jour.
- Contenu : `src/data/site.ts` + `src/data/carte.json` (carte 2026 complète). Photos : 16 WebP dans `public/photos/`, OG et favicon refaits.
- Pages construites (mise en page statique) : `/`, `/carte/`, `/composer/`, `/commander/`, `/venir/`, `404`. Histoire, réservation, à-emporter du gabarit supprimées.
- Palette Makimono dans `tokens.css`, `Plat.astro` redessiné, CSS ajouté en fin de `base.css`. En-tête : Composer / Commander / Venir.
- Build OK : `scripts/build-site.mjs sites/makimono-portfolio` écrit `dist/makimono/portfolio/` (6 pages). Mention maquette, noindex, KywFooter présents.

## Reste (phases 2 et 3)
- QA navigateur : captures desktop/mobile/reduced motion, débordements (21 cartes bento, groupes Create.Your.*), contrastes (texte encre sur rose #f4a3bb et saumon #ff9f66, crème sur nori), cibles tactiles, en-tête mobile à 4 liens.
- Motion : vérifier la scène « Ça s'empile » avec les nouvelles couches, galerie inclinée avec photos portrait, marquee, pastille « ouvert » (midi et soir), rideau (`--c-curtain` = rose).
- Texte de la pastille de repli : « Midi et soir, dim. le soir ». Possible intégrer le logo mascotte (`public/photos/logo.webp`, fond blanc) ; typographie script du logo non reprise.
- Retirer le CSS mort (`.equipe`, `.nav__cta`) si le sloplint le demande ; `scripts/q.sh` sloplint, audit, jury de phase 3 ; `pnpm index` et commit des `dist/` après QA.

## Décisions et hypothèses
- Téléphone : +32 483 03 88 47 (site actuel) ; `restaurants.json` donne +32 495 90 82 74, non repris, à confirmer.
- Korean Futo affiché « 10,50 à 11,00 € » (le menu se contredit, à confirmer). Aucun badge végé/épicé (non transcrits par plat).
- Placeholders : définition du nom (`definition.placeholder`, sens courant du mot japonais, pas un fait du restaurant), exemple de roll à 10,10 € (`signature.placeholder`, calculé avec les prix de la carte : 4,00 + 3,50 + 2 x 0,80 + 0,50 + 0,50).
- Avis : trois extraits Google via Restaurant Guru, initiales seulement ; note 4,6 sur 532 marquée « à confirmer ». Aucune réservation de table : appel téléphonique mentionné sur `/venir/` (TripAdvisor : « mieux vaut réserver »). Livraison 30 km = traiteur/événements (site actuel). Uber Eats cité au dossier mais sans lien : non affiché.
- Plan de la section adresse : schéma SVG sans nom de quartier ni repère inventé.
