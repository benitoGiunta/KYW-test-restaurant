# ETAT brasserie-edgard-awwwards, construction-3 (20/11/2026)

## Fait (phase 1)
- Brief, 3 concepts, Concept Card « Le cadran », système, checklist 1 à 18 (DESIGN.md). Scaffold Astro 5, engine verbatim, 5 pages, contenu réel (71 plats, 23 photos du client), favicon, og.png.

## Fait (phase 2)
- Module pilote `src/motion/cadran.ts` : heure de Namur (Europe/Brussels, fériés belges calculés) distribuée aux aiguilles, arc courant (`is-now`), statut écrit du hero (`[data-statut]`), plage « Maintenant » de la journée (`[data-plage]`) ; week-end et fériés : la pause devient cuisine (`is-continu`).
- Signature : l'aiguille du hero tourne de minuit à l'heure de Namur (1,6 s, intro), puis l'arc courant s'allume. Pointeur : aiguille fantôme et lecture « 18 h · cuisine ouverte » au centre du cadran (bureau).
- Repos : trotteuse en temps réel sur chaque cadran plein (hero, pied), aiguille de la 404 qui cherche l'heure ; `gsap.ticker`, pause hors écran, rien en réduit.
- Transition : secteur de bois qui balaie l'écran depuis midi (0,8 s / 0,9 s), `setup.ts`.
- Reveals : h1 `data-split="lines" data-intro` (5 pages), h2 `.display` en `data-split`, blocs sans lien en `data-reveal`, parallaxe légère sur deux plats et la véranda.
- Hovers : plaque CTA qui se remplit en tournant (`@property --tour`), soulignement redessiné (liens, nav, onglets), menu plein écran ; sous `(hover: hover)`, mêmes états sur `:focus-visible` et `:active`.
- Finitions : `favicon-32.png`, `apple-touch-icon.png`, lien KYW souligné au survol, `scroll-padding-inline` sur la bande photo.
- Contrôle Playwright (1440, 390, réduit ; 5 pages) : 0 erreur console, 0 requête échouée, `scrollWidth` = largeur, 0 bloc caché dans le premier écran, menu mobile OK (Échap, retour du focus), navigation avec rideau OK.
- Build OK (`scripts/q.sh build pnpm build:site sites/brasserie-edgard-awwwards`). Checklist 19 à 47 dans DESIGN.md.

## Fait (phase 3)
- QA corrigée : cibles 24 px, survols (logo, tel, liens courants), descriptions < 160, audit 0 FAIL, captures ciblées des 5 pages sans erreur. RAPPORT.md écrit. Build final OK.

## Reste (non fait en phase 3)
- Passe jury indépendante (outil Agent), relecture à l'œil des contrastNeedsReview, test du statut à plusieurs instants, og.png à revérifier.

## Ancien reste (phase 2)
- Shoot complet par l'agent captures, puis : `idleMotion` (trotteuse assez grande ? sinon épaissir la pastille), `settledMs`, `hover.noHoverChange`, contraste, clavier, cibles (`cta--petit` 40 px), LCP (h1 en `data-intro`).
- Tester le statut à plusieurs instants (`page.clock.install` + `timezoneId`) : avant 10 h, 16 h en semaine, 16 h le samedi, après 22 h 30.
- Titre mobile : `left` 13 px < gutter 16 signalé en phase 1, à remesurer. Planche de la carte mobile non vue.
- RAPPORT.md, points 42 à 63.

## Décisions
- Pas de loader, pas de GL, pas de curseur suiveur (curseur natif, `crosshair` sur les cadrans).
- Cuisine supposée ouverte jusqu'à 22 h 30 (aucune heure de dernière commande connue) ; jours fériés belges légaux (10 dates) traités comme le week-end.
- Le focus initial du menu mobile va au bouton « Fermer » (premier focusable).
