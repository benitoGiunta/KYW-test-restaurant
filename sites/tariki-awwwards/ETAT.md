# ETAT, Tariki awwwards

## Phase 1 (construction-1), fait
- Concept « la route » (DESIGN.md), système, scaffold (engine copié de sites/huile-sur-le-feu-awwwards), polices Young Serif, Schibsted Grotesk, Amiri (mot arabe seul).
- Pages : accueil, carte (soir + midi), histoire, réservation (tel, en ligne, mailto, formulaire mailto), 404. Pied KYW, noindex, JSON-LD, favicon, OG.

## Phase 2 (construction-2), fait
- Pilote `src/motion/route.ts` + `src/motion/idle.ts` : tracé du fil (clip-path du calque `data-route-fil`), étapes qui s'allument, voyageur placé par la progression de la page, penché par le pointeur ; fil de l'en-tête (`--route-p`) et fil vertical de la carte remplis par la même variable ; repos : pointillés qui coulent + halo du voyageur (ticker, pause hors écran).
- `Route.astro` : props `p` (position statique en réduit), `epingle` (404 à 0,6), `intro` (héros, 404). Pied : `p={1}`.
- `src/motion/pages.ts` : carte, rubrique lue en `aria-current="location"` (bande recentrée au téléphone) ; histoire, étapes allumées à la lecture (`--fil`).
- Reveals `data-split`/`data-reveal`/`data-intro` sur les 5 pages ; parallaxe déplacée sur `.hero__media-in` (le cadre est révélé en clip).
- Rideau : fil et voyageur sur son bord d'attaque (`.curtain__fil`).
- Hovers : voyageur posé sur la ligne d'index, survol de la marque, `.resa__tel`, liens du menu, lien KYW souligné ; `:active` ; `::selection` ocre ; `.split-line` avec marge haute (accents des capitales).
- Corrigé : espace manquant dans « Appeler le 0492… » (CTA flex : `.cta > .nw { margin-left }`) ; en-tête opaque (texte de la carte visible dessous).
- Mesures (`.logs/tariki-aw2-check*.log`, script scratchpad) : aucune erreur console, `scrollWidth` = viewport sur 5 pages à 1440 et 390, aucun texte caché dans le viewport après l'intro, réduit `hiddenText=0` et immobile, menu mobile conforme, navigation ClientRouter vers la carte OK.
- Build OK (`scripts/q.sh … pnpm build:site sites/tariki-awwwards`).

## Reste (phase 3)
- Shoot complet (agent captures), lire `report.json` : `idleMotion`/`idleAt`, `settledMs`, `noHoverChange`, contraste, cibles, axe ; points 35, 36, 45, 47 de DESIGN.md.
- RAPPORT.md, Lighthouse, OG à revérifier (inchangée).
- À juger : écart vertical entre CTA et route dans le héros à 1440×900 (environ 100 px), fil de la carte rempli par la progression de page (pas par rubrique).

## Décisions et hypothèses
- Repos révisé : la Concept Card disait « immobilité » ; la route qui coule sous le voyageur porte le verbe « cheminer », DESIGN.md mis à jour.
- Pas de loader, pas de GL, pas de follower de curseur, pas de `data-magnetic` (le `scale` de `:active` des CTA serait absorbé par GSAP).
- Carte du soir = page « La carte » ; « Le début du voyage » 18 € omis. Adresse Rue de l'Ouvrage 2. Aucun avis, chef, date, citation.
- « ş » de « turşu » hors du sous-ensemble latin des polices (repli système).
