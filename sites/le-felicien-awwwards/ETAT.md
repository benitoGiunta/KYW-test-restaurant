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
