# ETAT · Le Lodge Wépion · variante legacy · construction-3 (20/11/2026)

## Fait (phases 1 et 2)
- Phase 1 : audit, deal Solstice, comp c1, contenu réel (`site.ts`, `carte.json`), one-page + `/cookies/` + 404, pied KYW, noindex (voir DESIGN.md).
- Phase 2 : nav sous 60rem en `<div popover>` plein écran (Menu / Fermer, Échap, liens ferment le menu, scroll du body verrouillé, retour du focus au bouton) ; bouton de la barre desktop en contour (un seul primaire rempli) ; barre fixe de réservation du téléphone masquée (`is-off`) tant qu'un bouton de `main` ou du pied est visible, safe-area ; huit états des boutons (`:active`, `:disabled`, `:focus-visible`), hover sous `@media (hover: hover)`, cibles 44 px (banner, liens, onglets, tél. inline en `pointer: coarse`) ; Switcher : flèches, Début, Fin, panneaux `tabindex=0`, fondu du panneau ; un seul reveal (`data-reveal`, 9 éléments, masqué seulement sous `.js` et `no-preference`, IntersectionObserver) ; entrée du hero (plaque +18 px, photo qui se pose) ; reduced motion mesuré (opacity 1, aucune animation) ; titre du hero ramené à 2 lignes (écart avec la comp c1).
- Mesures (dev, Playwright) : 0 débordement horizontal à 1440 et 375, 0 reveal resté caché après défilement, 0 erreur JS, menu mobile OK (ouverture, Échap, clic de lien).
- Sloplint hero (rendu) : 1 FAIL FP (34 sur `Base.astro`, `overflow-x: clip` est dans `base.css` importé), 1 NOTE 58 (carte, waive de phase 1). Hero review : `self` (pas d'outil Agent), verdict ship, 0 finding.
- Build : `scripts/q.sh build pnpm build:site sites/le-lodge-wepion-legacy` passe ; 3 routes avec `kyw-signature`, noindex, mention, 0 tiret cadratin.
- DESIGN.md : points 2b à 72 cochés ; comp.md : questions de reproduction répondues.

## Reste (phase 3)
- Captures complètes par l'agent « captures » (1440, 375, reduced motion, focus clavier), `QA-*.md`.
- Point 8 de DESIGN.md (QA navigateur), `RAPPORT.md`, JSON-LD absent, `pnpm index`, commit final avec `[publier]` (aucun commit de phases 1 et 2 ne le porte).
- Vérifier en capture : plaque du hero à 375 (3 lignes de titre), rail de galerie à 375, barre fixe qui disparaît sur les sections à bouton, menu popover sur Safari iOS (non testé).
- « Réalisé par » (pied KYW, 24 px de haut) : paquet, non modifié.

## Pièges et hypothèses
- Le widget de l'Astro dev toolbar apparaît en bas des captures du serveur de dev : l'ignorer (ou capturer le build).
- Pas de formulaire : la réservation est le lien Barestho d'origine (et `tel:`), donc points 23 et 29 sans objet.
- Restaurant fermé (incendie du 21/05/2026) : slots `.fill` (horaires Erpent, date de réouverture), 2 par page au plus ; hypothèses de phase 1 inchangées.
- Serveur de dev arrêté en fin de phase.

## Phase 3 (QA, 20/11/2026)
- Fait : build OK, 3 routes (pied KYW, noindex, 0 tiret), QA navigateur desktop 1440 et mobile 375 (0 débordement, 0 reveal caché, 0 erreur JS ou HTTP), RAPPORT.md écrit. Aucune correction nécessaire.
- Reste : `report.json` du shoot, axe, CLS, LCP (shoot complet bloqué en passe build et en passe QA) ; test Safari iOS du menu ; commit final avec `[publier]` à poser par l'orchestrateur ; `pnpm index`.
- Pièges : faux positif « images cassées » (lazy), voir RAPPORT.md.
