# ETAT : maison-des-desserts, variante awwwards (construction-1 faite)

## Fait
- Brief, 3 concepts, Concept Card, système et checklist 1 à 18 dans DESIGN.md. Concept choisi : la journée de la maison (cadran 8 h à 18 h).
- Scaffold Astro 5 + engine (copié de la base commune, sans GL), polices Hedvig Letters Serif et Schibsted Grotesk, tokens.css, site.css, favicon SVG, og.png (hero), pied KYW.
- Données : `src/data/site.ts` (coordonnées, journée, histoire), `src/data/carte.ts` (142 lignes générées depuis donnees.json, 6 chapitres horaires), `src/lib/photos.ts` (14 photos du client).
- Pages statiques complètes : accueil (7 tranches), carte, histoire, reservation, 404. `scripts/q.sh mdd-build pnpm build:site` passe (5 pages, dist/maison-des-desserts/awwwards/). Mesures hero à 1440, 1280, 1024, 390 : aucun débordement, `.display` à gauche >= gutter, 0 requête en échec.

## Reste (phases 2 et 3)
- Signature : aiguille de scroll 8 h à 18 h + fond interpolé par variable sur `<html>` (lire `data-heure` des tranches, `data-ton` donne les couleurs) ; l'en-tête doit suivre le fond (`data-sur`).
- Reveals (`data-reveal`/`data-split` non posés), repos, hovers plats/images, sommaire de la carte collant, aperçu des plats.
- Mur d'entremets : décalages à vérifier en navigateur (images lazy non vues en capture pleine page). Pas de QA navigateur ni axe ni LCP faits. `pnpm index`, `apple-touch-icon` et `favicon-32.png` non produits. RAPPORT.md à écrire en phase 3.

## Décisions et pièges
- Pas de loader ni de GL (voir Concept Card). Rideau de page : un seul panneau gris.
- Pas de réservation de table : CTA appel, e-mail, boutique (`shop.lamaisondesdesserts.be`). Dates 1987 (bandeau) et 1974 (DH, à confirmer) non reprises ; 1946 et 1993 viennent de l'histoire du site.
- À signaler en RAPPORT : prix « à confirmer » (chocolat chaud viennois sans prix affiché, mignardises 3,50 € à confirmer) ; carte PDF « 20/12 et 31/12 fermeture à 17 h » incohérente avec les jours ouverts, seul le 20/12 est repris ; libellés « Après-midi », « Toute la journée » = regroupement éditorial sans horaire source ; légendes de photos = champ `sujet`.
- Le mot « baguette » du texte du pain s'appuie sur la photo 15 (mie de baguette) et non sur une ligne de carte.
