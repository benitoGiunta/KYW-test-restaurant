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

# ETAT — phase 2 (construction-2)

## Fait (phase 2)
- Contrôles navigateur 1440 / 390 / 320 / 390 reduced-motion sur les 4 pages : aucun débordement horizontal, aucune erreur console, `is-loaded` posé, aucun élément `data-reveal` resté caché en reduced-motion.
- Clics réels sur chaque lien d'en-tête (1440, 4 pages) : URL change, `elementFromPoint` renvoie un lien ; bas de page : mention Maquette KYW et logo KYW visibles.
- Corrigé : (1) rail de photos visible en desktop en plus de la scène (`.rail` écrasait `.table__rail`) ; (2) tirages de « La table » posés sur le titre (y 63 à 64 %) ; (3) citron du hero sur le bouton « Voir la carte » (x 72 %, y 84 %) ; (4) amphore du manifeste sur le titre en mobile (masquée) ; (5) mot final « Kalí órexi ! » rogné en largeur à 390 (15,5vw) et trop coupé en hauteur (0,7em) ; (6) rail mobile collé au bord gauche (padding + scroll-padding) ; (7) reduced-motion : grille de tirages avec gouttière.
- Motion vérifiée : hero (objets rebondissent puis flottent), table (stagger, glisser-déposer testé à la souris), avis (mot flou au scrub), reveals.

## Reste (phase 3)
- Shoot complet par l'agent captures (non fait ici), audit axe, contraste du bleu ciel sur surfaces, clavier (flèches sur objets).
- RAPPORT.md à écrire ; `gabarits/UTILISATION.md` (guinguette | el-greco) à mettre à jour hors phase de test.
- Arbitrages inchangés : avis négatifs, slogan « exemple », horaires lundi à mercredi « à confirmer ».
- Mobile : la « table » est un rail non déplaçable (conforme au gabarit).

## Pièges
- Scripts de contrôle dans le scratchpad `/tmp/claude-0/greco-p2/` (hors dépôt). Serveur de phase 2 (port 4471) arrêté.

# ETAT — phase 3 (QA)
## Fait
- Audit (0 FAIL) et shoot des 4 pages : 0 erreur console, 0 violation axe, mobile et desktop lus. Aucune correction requise. RAPPORT.md écrit. Serveur (PID 715) arrêté.
## Reste
- UTILISATION.md hors phase de test ; arbitrages de contenu (horaires, slogan, réservation) à confirmer.
