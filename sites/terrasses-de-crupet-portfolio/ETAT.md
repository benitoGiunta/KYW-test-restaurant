# ETAT — terrasses-de-crupet · portfolio · phase 2 sur 3 (construction-2) terminée

## Fait (phase 1)
- Gabarit guinguette adapté, 7 pages, données réelles (`site.ts`), 22 photos WebP, palette cuivre/vert, DESIGN.md (adéquation 78 %).

## Fait (phase 2)
- Mesures Playwright (320/360/390/768/1024/1440/1920) : aucun débordement horizontal, aucune erreur console sur les 6 pages ; clics réels sur les 6 liens d'en-tête (1440) OK ; bas de page (accueil, carte, réservation) avec bande KYW, mention « Maquette KYW » et logo visibles ; 404 OK.
- Table (signature) : le `.rail` mobile s'affichait aussi en desktop (doublon de 8 photos) → `.table__rail.rail`. Titre recentré sur la hauteur de scène (`--th`), tirages repoussés en couronne (5 haut, 5 bas, 2 côtés) pour laisser le titre lisible ; titre plafonné à 5 rem ; objets (verre, citron, fourchette) replacés. Glisser (inertie) et flèches clavier testés.
- Marquee : clonage JS des groupes (plus de trou à droite à 1440/1920) ; état ouvert/fermé testé par `page.clock` (13:00 ouvert, 15:30 fermé → 18:00, 23:30 → prochain service, 11:00 → 12:00).
- Hero : objets citron/fourchette décalés (plus de collision avec les boutons à 1920) ; chute et rebond OK, objets saisissables.
- Mobile : barre de nav du bas tient à 360/390 (police fluide, `navCourant()` centre le lien courant au-dessous de 360) ; 768-1023 : brand, nav et bouton Réserver resserrés (débordement de 2 px corrigé), `white-space: nowrap` sur la nav.
- Reduced motion (1440) : loader absent, objets visibles, 0 élément à opacité 0, 0 animation ; repli statique de la table sans JS.
- `audit.mjs` accueil + 5 pages : 0 FAIL, 15 WARN (phrases répétées = horaires, marquee aria-hidden ; sitemap/robots sous base = faux positifs connus).
- Build : `scripts/q.sh t2-build node scripts/build-site.mjs sites/terrasses-de-crupet-portfolio` passe. Leçon proposée : `data/usage/test-1/lecons-proposees/terrasses-de-crupet.md`.

## Reste (phase 3 / agent captures)
- Shoot complet et QA visuelle par l'agent captures ; contrôle des cartes d'avis « exemple » (4 cartes en 3+1 à 1440) ; relecture ponctuation (U+00A0) ; sloplint non lancé ; RAPPORT.md ; `pnpm index`, commit final `[publier]`.
- `gabarits/UTILISATION.md` : ajouter « guinguette | terrasses-de-crupet » (gabarits/ protégé, non modifié).
- Le badge « attrapez-moi » (bas droite de la table) recouvre un coin de la photo « Le plat arrive » en 1440 (décoratif, `aria-hidden`, sans clic) : à déplacer si la revue le juge gênant.
- Sous 360 px la nav du bas défile (310/292 à 320 px) : acceptable, lien courant centré.

## Pièges
- `.rail` générique bat `.table__rail` : toujours doubler la classe. Rebuild pendant un shoot de fond vide `dist/`.
