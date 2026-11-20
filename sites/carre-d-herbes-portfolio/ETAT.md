# ETAT : carre-d-herbes · portfolio · phase 2 sur 3 (20/11/2026)

## Fait en phase 1
- Gabarit velours, contenu 100 % dossier, 7 pages, 22 photos WebP, og, favicon, pied KYW, noindex, build OK.

## Fait en phase 2
- **Signature « carré d'herbes »** (hero) : filet cuivre `<rect pathLength="100">` tracé en 1,6 s à la fin du loader, quatre coins carrés plantés en stagger, photo du hero qui se pose (scale 1,1 → 1) puis recule de 8 % au défilement. Statique en reduced motion (tracé peint, coins visibles, aucune transform). Code : `carre()` dans `src/motion/setup.ts`, CSS en fin de `base.css`.
- **Filet de progression** d'en-tête (`--progres` écrit par ScrollTrigger, `.header::after`), masqué en reduced motion.
- **Interactions** : galerie glissable à la souris, flèches clavier (bande focalisable seulement si elle défile), couleur chaude qui se lève au passage au centre sur tactile ; bouton « Suspendre/Reprendre le défilement des offres » (WCAG 2.2.2, caché en reduced motion) ; « Copier le numéro » sur la réservation (annonce `role=status`) ; états `:active` des liens, focus visibles.
- **Correction** : photos des onglets des fêtes recouvraient le voile (z-index) : texte illisible sur le macaron clair ; photos en -2 et voile latéral. Contraste vérifié à l'oeil en 1440 (à confirmer par la revue).
- **Mobile** : 0 débordement mesuré (320, 360, 390, 768, 1440 x 7 pages, nav comprise) ; cadre du hero resserré (0,5 rem) ; nom de l'en-tête et h1 réduits sous 380 px ; menu mobile ouvre et ferme (Échap).
- **Finitions** : U+00A0 avant « € » (19 occurrences, site.ts et carte.astro) ; 0 tiret cadratin ; 0 erreur console.
- Tests Playwright (journal `.logs/cdh-p2-test.log`) : clics réels sur 4 liens d'en-tête OK (elementFromPoint = `<a>`), pause des onglets tient 7 s, copie du numéro OK, reduced motion : 0 texte caché.
- Build OK : `pnpm build:site sites/carre-d-herbes-portfolio` (7 pages). Serveur de test arrêté.

## Reste (phase 3 et agent captures)
- Shoot complet (desktop, mobile, reduced, clavier) par l'agent captures ; relire le contraste du hero (voile sur photo de salle claire) et de la page fêtes (mêmes onglets ?).
- Vérifier `/fetes/` et `/histoire/` (triptyque) en mobile en capture ; bas de page en fenêtre (mention Maquette + logo KYW) non re-testé.
- RAPPORT.md à écrire (placeholders : aucun ; points ouverts : G&M 13,5 vs 14/20, Tripadvisor non repris, e-mail/GPS inconnus, photos plats Facebook « usage à confirmer »).
- `pnpm index`, commit dist, push : non fait (phase 3). `gabarits/UTILISATION.md` à mettre à jour (protégé).

## Pièges
- `scripts/q.sh` + `cat` interdit au-delà de 80 lignes (hook). Le curseur-suiveur apparaît en haut à gauche tant que la souris n'a pas bougé (comportement du moteur, pas un défaut).
- À 1440, la galerie (5 vignettes) tient sans défiler : le glisser ne se voit qu'en dessous de ~1300 px.
- Fêtes 2026 à retirer après le 31/12.
