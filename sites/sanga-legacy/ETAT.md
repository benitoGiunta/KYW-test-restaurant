# ETAT · Sanga, variante legacy · fin de la phase 2 (construction-2)

## Fait (phases 1 et 2)
- Phase 1 : audit, deal/draw (Solstice), comps, DESIGN.md, pages `/` et `404`, carte complète, build.
- Phase 2 : menu mobile Popover (sous 60 rem, avec lien d'appel), états des boutons et liens (hover sous `(hover: hover)`, focus-visible, `:active`, `:disabled`), cibles tactiles 44 px sous `(pointer: coarse)`, jour courant dans les horaires (`aria-current="date"`), safe-area dans `--gutter`, `scroll-padding-top` calé sur la barre, `scroll-behavior: smooth` hors mouvement réduit, `accent-color`, nav sur fond plein.
- Hero : `figure` à marge 0 (bug : marge de 40 px par défaut), photo en `svh` (min(100svh - 15rem, 42rem)), hero centré (`min-height: 100svh - 72px`), adresse sur une ligne (clamp, `nowrap`). Sloplint `--render --stage hero` : 0 FAIL, 0 REFLEX. Hero review : `self` (pas d'outil Agent), ship. Reproduction de la comp écrite dans `comp.md`.
- Motion : aucun reveal (Solstice : « No reveal »), choix assumé et noté dans DESIGN.md § Composants. Pas de formulaire ni de switcher (pas d'outil de réservation, carte en séquence).
- Mesures Playwright (1280, 768, 375) : 0 débordement horizontal, menu ouvert au toucher et au clavier, fermé par Échap et clic sur un lien, sans JavaScript hero et photo visibles. Build : `pnpm build:site sites/sanga-legacy` passe ; noindex, `kyw-signature`, mention KYW présents sur `index.html` et `404.html`.

## Reste (phase 3)
- Sweep, jugées gates.md § 5, `RAPPORT.md`, Reflex 65 (« crème + Yeseva + accent d'hue 24 ») : déplacer l'accent avant toute dérogation (`waive 65` rejeté).
- NOTE 58 : 115 à 117 mots sur un écran à 1440 vers y = 2150 (probablement Udon et donburi ou Compléments) : à couper ou à structurer.
- WARN 28a sur `Plein.astro` (image `lazy` sous le pli, faux positif sur le LCP) : laisser ou commenter ; vérifier la bande 21:9 (crop de la photo 05) en capture.
- Photos 01 (udon), 03, 04 (donburi) copiées mais non placées ; placer si l'équilibre le demande.
- Captures complètes et audit : agent « captures » ; `pnpm index` et push à la publication.

## Décisions et pièges
- Pas de réservation : « Commander » (Order & Eat) et `tel:` ; aucun faux formulaire.
- Le hover de ligne de carte du thème (« a row lights ») est refusé : gate 11 (pas de hover sur un non-interactif).
- Piège : `figure` garde sa marge navigateur de 40 px ; sloplint le voit comme un écart texte/photo (44c) ; reset `.photo { margin: 0 }`.
- Piège : `.hallmark/shots/localhost-4321-*` sont régénérés à chaque appel de sloplint `--render` ; sloplint attend ~2 s après un changement de CSS (HMR) avant de rendre.
- Aucun `.fill` ni `data-placeholder`. Serveur de dev arrêté.
