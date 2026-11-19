# ETAT — wok-de-jin · portfolio · phase 1 sur 3

## Fait
- Gabarit guinguette copié et adapté (DESIGN.md : matrice, décisions, adéquation 80 %).
- `src/data/site.ts` : contenu réel (tarifs, horaires, réveillon, photos avec alt), aucune invention (avis, équipe, histoire, e-mail vides).
- 7 pages construites en statique : accueil, tarifs, maison, réveillon, à emporter, réservation, 404.
- 19 photos WebP + 19 recadrages 640 px, og.jpg, favicon bordeaux/corail.
- Build OK : `scripts/q.sh wok-build node scripts/build-site.mjs sites/wok-de-jin-portfolio` -> `dist/wok-de-jin/portfolio/` (5 Mo). noindex, mention Maquette et pied KYW présents.

## Reste (phases 2 et 3)
- QA navigateur : shoot, audit, mesures de débordement (h1 « Buffet asiatique » en 2 lignes à 320/360/390 px, objets du hero, grille 12 tirages).
- Motion : vérifier hero/table/marquee avec les nouveaux objets, reduced motion.
- Contrôles des leçons : clics réels sur l'en-tête (6 liens), capture du bas de page 1440.
- Contraste : texte sur bordeaux (sections `--canard`) et sur corail (axe).
- Typographie : U+00A0 dans les guillemets, apostrophes ; relire les textes.
- Écrire RAPPORT.md (placeholders : aucun `placeholder: true` côté contenu ; e-mail jamais affiché).
- Décider si le logo rond (`public/photos/logo.png`) entre dans l'en-tête ou le loader.

## Décisions et hypothèses
- Réservation générique : lien vers wokdejin.com (le site actuel porte « Réserver une table ») ; réveillon : lien réel `/reveillon/reserver`.
- Téléphone : 081 30 68 88 (site) ; le mobile de restaurants.json (+32 487 888 968) n'est pas utilisé.
- Photos 10 et 11 (visages) exclues. Caractères chinois décoratifs non repris.
- `gabarits/UTILISATION.md` NON mis à jour (gabarits/ protégé) : ajouter la ligne « guinguette | wok-de-jin » à la fin du lot.
- Aucun défaut de gabarit corrigé dans `gabarits/` (protégé).
- Aucune commande de serveur lancée (pas de PID).
