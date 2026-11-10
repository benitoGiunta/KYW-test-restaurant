# ETAT · le-felicien · awwwards · construction-3 (phase 3 sur 3, terminée)

## Fait (phase 1)
Voir l'historique git : concept « L'échelle », système, scaffold, 5 pages statiques, favicon, OG, build.

## Fait (phase 2)
- Signature : curseur de budget (`components/Budget.astro`, vrai `input range` 0 à 40 €) sur l'accueil (défaut 25 €, rangs hors budget biffés) et sur la carte (défaut 40 €, plats et points hors budget biffés) ; phrase calculée depuis la carte réelle (`phraseBudget()` dans `src/data/site.ts`).
- Module pilote `src/motion/echelle.ts` : repos (trait de lecture du hero, 18 s pour 0 à 40 €, cran de 1 €, en pause hors écran), pointeur (le trait se cale sur l'euro sous le pointeur), intro (règle tracée en 40 crans, épingles qui tombent), règles de section tracées à l'entrée, curseur de rubrique au survol d'un plat.
- `src/motion/menu.ts` : menu mobile `<dialog>` plein écran (sous 48 rem), état « Ouvert, cuisine jusqu'à … / Fermé, la cuisine ouvre à … » calculé à l'heure de Bruxelles (en-tête dès 64 rem, dans le menu sinon).
- `src/motion/setup.ts` : transition rideau vert + règle jaune en `steps(40)` (0,67 s / 0,6 s).
- Reveals `data-split="lines"` sur les h2, `data-reveal` sur listes et figure sans lien.
- Hovers sous `(hover: hover)` + jumeaux `:focus-visible`, `:active`, anneau `--focus` par fond, `::selection` jaune, hover du lien KYW.
- Corrections : « Trois repères » (accent manquant), légende du hero masquée au bureau (règle CSS écrasée), règle du hero ramenée à 5,5 rem sous 64 rem, « Réserver » de l'en-tête à 44 px.
- Build OK. Contrôle Playwright (scratchpad, `felaw2-check.mjs`) : aucune erreur console ; `scrollWidth` = largeur à 390/360/320 sur les 5 pages ; menu (aria-expanded, focus piégé, Échap, retour du focus) ; réduit : 0 bloc caché, pas de Lenis.

## Reste (phase 3)
- Shoot complet et `report.json` : `hover.noHoverChange`, `idleMotion`, `settledMs`, `reduced.*`, axe (contraste du jaune), LCP, cibles.
- Juger le premier frame (intro de la règle) et le curseur de budget au téléphone (glisser au doigt).
- `RAPPORT.md`, jury/sloplint (self), `pnpm index`.

## Décisions et pièges
- Pas de loader ni de GL (Concept Card). Pas de follower de curseur.
- Le titre et l'accroche du hero restent sans `data-intro` (LCP) ; l'intro est portée par la règle.
- Les lignes hors budget passent en `--c-muted` + prix biffé, jamais en opacité (axe).
- Le `<dialog>` du menu se ferme au clic sur un lien avant la navigation (sinon il reste au-dessus du rideau).
- L'état d'ouverture ne gère pas les veilles de jours fériés (22 h) : la note des horaires le dit.

## Fait (phase 3)
QA sur QA-build.md : horaires dupliqués pied/page corrigés, hover du logo, focus de l'input range. Reservation capturée. Build et audit : 0 FAIL. RAPPORT.md écrit.
## Reste
Score jury indépendant (`/jury`), test tactile réel du curseur, `invisibleFocus` sur l'input = faux positif (opacité 0).

## Revue 1 (relecteur-site, 10/11/2026)
Fait : REVUE-1.md écrit (verdict A_CORRIGER : 0 F0, 1 F1, 4 F2, 4 F3). Contrôles faits : axe complet 5 pages x 1440/390, console, liens, 68 plats contre donnees.json, état d'ouverture à 5 instants, clavier du curseur, menu, reduced-motion.
Reste : le réviseur traite F1-1 (accents coupés par les masques SplitText, `engine.css:68`), F2-1 à F2-4, puis revue 2.
Pièges : QA-revue1 limité à 3 pages et sa « 404 » est la réponse brute de serve.mjs ; scripts maison dans le scratchpad `felaw-r1-*`.

## Revue 2 (relecteur-site, 10/11/2026)
Fait : REVUE-2.md écrit (verdict PUBLIABLE : 0 F0, 0 F1, 0 F2, 4 F3 hérités). Les 5 corrections de REVISION-1 vérifiées (axe 10 cas, accents sur tous les h2, 404, grep dist). Reste : F3 optionnels (21 h 30, sitemap, hover couleur seule, étiquette du hero mobile).
Pièges : QA-revue2 limité à 3 pages (accueil, carte, 404 brute) ; scripts maison `felaw-r2-*` dans le scratchpad ; la capture d'élément d'un h1 à line-height 0,84 coupe l'accent (artefact, vérifier par clip de page).
