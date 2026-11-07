# ETAT : incorrect-portfolio (phase 3 sur 3 faite : QA terminée)

## Phase 3
Contraste corrigé (encre sur rouge, `--rouge-texte`), axe 0 violation vérifié, build OK. Voir RAPPORT.md. Reste : report gabarit et UTILISATION.md (protégés).

## Fait en phase 1 (inchangé)
Gabarit affiche adapté, contenu réel, palette, Plat.astro (Dwight Schrute en 5 couches), 8 recadrages, 6 pages, noindex, KywFooter, mention maquette.

## Fait en phase 2
- **Bug majeur corrigé** : `.hero` (grid) prenait la largeur du marquee nowrap (13 000 px), plat hors écran et titre jamais coupé. `minmax(0, 1fr)` sur `.hero`, `.hero__grille`, `.bento`, `.horaires`. Hero recomposé : titre pleine largeur (grid-row 1, 17svh max), texte et CTA à gauche, plat à droite en bas ; à 1280×720 CTA et marquee visibles ; à 390 titre à 11,5 vw.
- Ça s'empile : liste plafonnée en svh (4,8svh), prix `nowrap` plafonné (14svh / 9vw), plat limité en hauteur ; à 1440×900, 1280×720 et reduced-motion tout tient dans un écran. Nouveau geste de signature : le prix claque (rotate -7° → -2°, scale 1,18 → 1, spring) en fin de scrub.
- Bento : prix sur une ligne (clamp 1,8 à 3,2 rem). Horaires : 4 colonnes minmax(0,1fr), heures `clamp(2rem, 3.6vw, 3.6rem)` (plus de colonne coupée à 1440).
- Menu mobile : bouton « Menu » collé à droite, focus sur le premier lien à l'ouverture, retour au bouton à la fermeture (Échap ou bouton), Tab/Maj+Tab bouclent, lien suivi ferme, fermeture au passage en desktop.
- Pastille « ouvert » et carte « aujourd'hui » : heure de Namur (Intl Europe/Brussels). Testé par `page.clock` : mar 19h = « Ouvert jusqu'à 21h30 », lun 15h = « Fermé · ouvre mardi 18h30 », sam 13h = ouvert jusqu'à 14h00, sam 15h = « Ouvre à 18h30 ».
- Magnétisme léger (0,25) sur les deux CTA du hero.
- Contrôles OK : 0 erreur console, 0 débordement horizontal (320, 360, 390, 1280, 1440 × 6 pages), clics réels des 4 liens d'en-tête depuis 3 pages (URL change), bas de page 1440 (bande KYW, mention maquette, logo visibles), reduced-motion (pas de classe `motion`, 0 élément caché, 0 animation CSS, empile lisible).

## Reste (phase 3 et agent captures)
- Shoot/audit complets non faits (axe, contraste jaune/rouge-orange, tailles de cibles, légendes de galerie à ~11 px à vérifier).
- Revoir en capture : pages carte (7 petites cartes Suppléments), histoire, réservation, à emporter, 404 en mobile ; galerie desktop (pin) et mobile (snap) ; plan SVG de la visite (étiquettes qui chevauchent les routes, mineur).
- Hero mobile : vérifier que « INCORRECT » reste sur une ligne à 320 et 360 (11,5 vw ; 13 vw cassait en INCOR / RECT à 390).
- `gabarits/UTILISATION.md` : ajouter `affiche | incorrect` (protégé). Défaut du gabarit affiche à reporter dans `gabarits/affiche/` : `.hero` sans `minmax(0, 1fr)` (voir lecons/construction.md).

## Pièges
- `scrollWidth` ne voit pas un hero élargi par un marquee (overflow-x: clip) : mesurer les positions.
- Les polygones décoratifs et cartes inclinées dépassent de la fenêtre par construction (clip), ce n'est pas un défaut.
- Le shoot d'une page > 120 s : lancer en arrière-plan.

## Révision 1 (07/11/2026)
F1-1 et F2-1 à F2-7 corrigés, voir REVISION-1.md. Reste : F3 (formats d'heures, JSON-LD horaires, données de carte).
