# ETAT — el-greco / portfolio / phase 1 (construction-1)

## Fait
- Gabarit guinguette copié et adapté (matrice et décisions dans DESIGN.md).
- `src/data/site.ts` + `src/data/carte.json` (carte réelle générée depuis donnees.json, 12 catégories, 62 lignes, typographie française).
- Pages : accueil, carte, histoire (la maison), reservation, 404. Pages terrasse et à emporter supprimées (pas de matière).
- Palette bleue, 3 objets au trait ajoutés, favicon, OG, photos de stock recadrées (`public/photos/`, `s/` = 640 px).
- Build OK : `scripts/q.sh greco-build pnpm build:site sites/el-greco-portfolio` (5 pages), noindex et mention Maquette présents.

## Reste (phases 2 et 3)
- Aucune QA navigateur faite : mise en page statique non vérifiée visuellement (desktop 1440, mobile 320/360/390, débordements, contraste du bleu ciel sur surfaces, `.btn::before` bleu ciel, rideau et loader).
- Motion non retouchée : vérifier `table()` avec 6 tirages (positions en % posées au jugé), hero avec amphore/olive/brochette, `avis()` avec 4 cartes (sans « Exemple d'avis »).
- Réviser le rendu de `.carte__grille` avec la carte longue (12 colonnes de texte), page `/carte/`.
- RAPPORT.md non écrit ; photos libres supplémentaires (`photos.mjs`) non cherchées (3 photos de stock suffisent pour le test).
- Arbitrer : avis négatifs non cités ; slogan marqué « exemple » ; marquee affiche « Horaires du jour à confirmer » lundi à mercredi.
- `gabarits/UTILISATION.md` non mis à jour (gabarits/ protégé en phase de test) : ajouter « guinguette | el-greco ».

## Décisions et hypothèses
- guinguette retenu faute de photos : les objets dessinés portent l'identité.
- Titre « Saveurs grecques » (hero du site actuel) ; pas de baseline inventée dans la meta (« Saveurs grecques à Bouge, aux portes de Namur » = reformulation du dossier).
- Réservation : téléphone et e-mail uniquement (outil tiers non identifié) ; formulaire de démonstration retiré.
- Avis : 4 positifs, auteurs non nommés, source « Trustindex ».
- Fonts Zodiak/Satoshi conservées ; logo non utilisé en grand.
