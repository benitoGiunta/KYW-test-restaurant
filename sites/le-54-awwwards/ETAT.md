# ETAT · Le 54 · awwwards · fin de la phase 1 (construction-1)

## Fait
- DESIGN.md : brief, 3 concepts notés (retenu : « Trente-quatre couverts »), Concept Card, système (palette, typo, grille, mouvement planifié, plan de composition, généricité), checklist points 1 à 18.
- Scaffold, engine (copié de le-royal-awwwards, sans GL ni loader), tokens, `site.css`, `Base.astro` (head, JSON-LD, ClientRouter, rideau), `Header`, `Footer` (pied avec registre de 34 ronds), `Plan.astro` (SVG 34 places), `Mur.astro`, `Photo.astro`, `lib/photos.ts`, `data/site.ts`.
- 5 pages statiques : `/`, `/carte/`, `/histoire/`, `/reservation/` (tel, mailto, formulaire mailto, plan en lien), 404 dessinée.
- Favicon SVG et PNG, OG capturée du hero (provisoire), polices (Zodiak 400 + italique, Hanken variable).
- Build OK (`scripts/q.sh build pnpm build:site sites/le-54-awwwards`), `dist/le-54/awwwards/` écrit. Mesure hero 1440×900, 1280×720, 1024×768, 390×844, 360×800 : CTA au premier écran, `left` des `.display` = gouttière, `scrollWidth` = largeur sur les 5 pages. RAPPORT.md écrit.

## Reste (phases 2 et 3)
- Phase 2 : `src/motion/couverts.ts` (pilote unique, variable `n`) : « la salle se dresse » (stagger des 34 places au premier écran), place allumée au repos (idle, horloge GSAP, reduced motion), réservation : champ « nombre de couverts » qui allume N places ; reveals (`data-reveal`, `data-split` sur les titres), hovers (soulignement, photos du mur), registre du pied animé, curseur non prévu. Vérifier la transition (voile d'émail du bas).
- Phase 3 : QA navigateur, audit axe, LCP, mobile tactile, OG refaite après la signature, sloplint, points 42 à 63 de la checklist, `pnpm index`, RAPPORT final.
- Pas encore vérifié : `shoot.mjs`, `audit.mjs`, `.motion` actif (tout est visible sans `.motion` pour l'instant), focus visibles au clavier, lien actif de la nav, hover réel.

## Décisions et pièges
- Pas de loader, pas de GL (justifié dans DESIGN.md). Pas de `data-reveal` ajouté en phase 1 : contenu entièrement visible.
- `public/kyw/` copié de le-royal-awwwards (signature du pied KYW).
- Plan : cases `cases` dans `Plan.astro` (index de case : nombre de places) ; `lit` allume les N premières places (`data-n`).
- Les 404 capturées par l'agent captures peuvent être la réponse brute du serveur : voir `dist/le-54/awwwards/404.html`.
- Le pied n'a pas de second `<footer>` (`<section aria-label>`), conforme à la leçon du 07/11.
- `pnpm index` non lancé en phase 1 (à faire en phase 3).
