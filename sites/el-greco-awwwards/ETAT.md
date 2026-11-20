# ETAT : El Greco awwwards, fin de la phase 2 (construction-2)

## Fait (phase 1)
- Concept « allonger », système, pages `/`, `/carte/`, `/histoire/`, `/reservation/`, 404, Base (noindex, JSON-LD, OG), pied + KywFooter. Voir DESIGN.md 1 à 18.

## Fait (phase 2)
- Module pilote `src/motion/allonger.ts` : `--etire` (intro `data-intro` ou entrée au scroll) sur `[data-allonge]` (h1 de chaque page, cadre du hero, cadre de l'histoire, prix du mezze, « À table ») ; `--defile` scrubbé sur le hero ; respiration des images `[data-respire]` (ticker GSAP, pause hors écran, pointeur) ; filet de la rubrique lue dans le sommaire de la carte (`.is-actif`, aussi en mouvement réduit).
- `src/motion/idle.ts` (copié de huile-sur-le-feu), `src/motion/menu.ts` (adapté : panneau qui monte, liens qui s'étirent), `setup.ts` appelle rideau + pilote + menu.
- Reveals : `data-split="lines"` sur les h2 display, `data-reveal="clip"` (depuis la base) sur les crèmes, le cadre du mezze et les trois repères.
- Hovers par rôle sous `(hover: hover)` + `:focus-visible` + `:active`, `::selection` dans l'accent, lien KYW souligné au survol.
- Menu mobile sous 40rem (Menu, Appeler 44 px dans l'en-tête), favicon PNG 32 px et `apple-touch-icon` 180 px.
- Mesures Playwright (port 4417, serveur arrêté) : intro finie (`--etire` = 1), repos 22 px en 1,5 s, 0 texte caché en fin de page, menu (aria-expanded, focus piégé, Échap, retour du focus, fermeture à la navigation), `scrollWidth` = largeur à 390/360/320 sur 5 pages, réduit sans mouvement ni texte caché, 0 erreur console ni requête échouée.
- Build OK (`scripts/q.sh build pnpm build:site sites/el-greco-awwwards`). DESIGN.md : checklist 19 à 47.

## Reste (phase 3)
- Shoot complet par l'agent captures, puis : `hover.noHoverChange`, `idleMotion`/`idleAt`, `reduced.*`, `smallTargets`, axe contraste (35, 36, 39, 45, 47).
- OG à recomposer, RAPPORT.md, checklist 42 à 63.
- À juger : le premier rendu montre le h1 et le cadre du hero tassés (0,28) pendant ~1 s, voulu (signature) ; si le jury le lit comme un saut, réduire à 0,5.

## Décisions
- Pas de loader, pas de GL, pas de curseur personnalisé (inchangé).
- L'en-tête à 3 liens de la phase 1 devient, sous 40rem, marque + Appeler + Menu (Appeler visible au téléphone, requis par la phase 2).
- Les h1 ne sont pas en `data-split` (LCP : peints au premier rendu) ; l'intro passe par `--etire`, ajouté à la timeline `intro` de l'engine.
