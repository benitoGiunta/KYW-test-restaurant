# ETAT : le-brunchist portfolio, passe construction-1 (phase 1/3)

## Fait
- Gabarit journee copié et adapté (DESIGN.md), site.ts réécrit depuis donnees.json/dossier.md, 6 pages, composant Ligne, frise 9h-16h, build OK (`scripts/q.sh bru-build pnpm build:site sites/le-brunchist-portfolio`, dist/le-brunchist/portfolio/).
- Photos : 9 WebP 1600x1067 (public/photos), credits.json. og.jpg régénérée.
- Données inventées marquées : prix (tag « prix illustratif »), lignes « exemple » (café filtre, tartines de saison, cake, cookie, thé), photos, avis absents hors 2 extraits Restaurant Guru.

## Reste (phases 2 et 3)
- QA navigateur : shoot/audit, clics d'en-tête, bas de page 1440 (mention KYW), mobile 320/360/390, médaillons, bande terrasse, badge ouvert (page.clock, Europe/Brussels).
- Vérifier `.hero` à nom de 2 mots (« Le / Brunchist »), `.colophon` (classe sans CSS : ajouter un style discret), contraste du tag sur ciel corail.
- srcset/variantes mobiles des photos (une seule taille 1600 pour l'instant, LCP à mesurer).
- Favicon (celui du gabarit), JSON-LD sans geo ni acceptsReservations.
- Mettre à jour gabarits/UTILISATION.md (journee : le-brunchist).

## Décisions / pièges
- Route /reservation/ conservée pour la page « Venir, réserver » (pas d'outil de réservation).
- Anciennes photos du gabarit déplacées hors dépôt (rm refusé par le garde-fou) : public/photos ne contient que les nouvelles.
- Aucun commit fait ; ne pas écrire `[publier]` avant la fin du restaurant.
