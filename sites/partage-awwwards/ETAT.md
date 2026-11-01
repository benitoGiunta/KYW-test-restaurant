# ETAT : partage-awwwards, construction phase 2 sur 3 terminée (01/11/2026)

## Fait
- **DESIGN.md** : brief, 8 hypothèses, trois concepts (A choisi : « Au milieu de la table »), Concept Card,
  palette (ardoise, chaux, joint, arête, ocre, chêne), typographie (Panchang 500/800 + General Sans 400/500),
  grille 12 colonnes avec chemin de table en colonnes 6 et 7, rôles de hover, état de repos prévu, plan de
  composition ASCII des 5 pages, test de généricité, liste de sur-utilisation (11 points cochés avec preuve).
- **Contenu** : `src/data/site.ts` (restaurant, services, horaires, lunch du 21/10/2026, spécialités, équipe,
  presse, `euros()`), `src/data/carte.ts` généré depuis `donnees.json` (4 catégories de cuisine, 14 de boissons),
  `src/lib/photos.ts` (17 photos du client, alt descriptifs).
- **Socle** : engine copié tel quel depuis `sites/atelier-de-bossime-awwwards/src/engine/` (verbatim d'engine.md,
  adaptateur `astro.ts`, sans GL), `engine.css`, `lib/url.ts`, `components/Photo.astro` (`fallbackFormat="webp"`),
  `motion/menu.ts` (menu plein écran accessible), `motion/setup.ts` minimal.
- **Pages statiques** : accueil (hero « PAR | assiette sur chêne | TAGE », citation, paire, index des spécialités,
  lunch, mur, CTA), carte (prix sur le chemin de table, lunch, boissons en deux colonnes), histoire (portrait,
  récit, équipe, presse), réservation (horaires, `tel:`, lien externe, accès, parkings, groupes, bon cadeau), 404.
- **Layout** : `Base.astro` (noindex nofollow, canonical, OG, JSON-LD Restaurant, 2 preloads, ClientRouter,
  skip link, `#curtain` persistant), `Header.astro`, `Footer.astro` (adresse | Réserver sur chêne | service,
  colophon, `KywFooter`). `public/favicon.svg`.
- **Build** : `scripts/q.sh awwwards-partage-build pnpm build:site sites/partage-awwwards` → exit 0, 5 pages,
  `dist/partage/awwwards/` 4,2 Mo. Vérifié par grep : noindex sur 5/5, `kyw-signature` sur 5/5, mention KYW,
  0 tiret cadratin, polices servies sous `/partage/awwwards/fonts/`.

## Fait en phase 2 (construction-2)
- **Module pilote `src/motion/partage.ts`** : variable unique `--ecart` écrite sur l'élément porteur (0 = mot entier,
  1 = coupure de repos = état CSS sans JS et en mouvement réduit, > 1 = l'écart s'ouvre au défilement). Hero : PAR
  et TAGE glissent d'une colonne (`--pas`), le chêne s'ouvre (`::before` en `scale`), l'assiette monte, grandit et
  tourne ; intro 1,2 s puis scrub `top top → bottom top` jusqu'à 1,6. Même coupure sur `.page-tete` (carte,
  réservation), `.perdu` (404) et `.pied__mot` (scrub à l'entrée du pied). Mobile : glissement horizontal 22 vw.
- **Verbe** : `glisse()` sur `.index__ligne` et `.plat` (bords vers le milieu, prix et pastille montent), une fois.
- **Reveals** : `data-split="lines"` sur les h2 `.titre-l`, `data-reveal="clip"` sur les photos sous le pli,
  `up` sur la citation et la photo centrale du mur. Aucun reveal sur h1, accroche ou bloc avec lien.
- **État de repos** : reflet de jour sur le chêne (`.reflet`, `--reflet` par `gsap.ticker` sur les seules bandes
  visibles via IntersectionObserver, 1 frame sur 2 au toucher, décalé par le pointeur).
- **Transition** (`setup.ts`) : deux demi-nappes de chêne portant « PAR » et « TAGE » se rejoignent (PARTAGE entier),
  0,7 s, puis s'écartent sur la nouvelle page, 0,8 s. En-tête `frame-away` au défilement vers le bas.
- **Survols ajoutés** : ligne d'index (pastille × 1,8, nom glisse 0,25 em vers le milieu), nom de plat.
- **Finitions** : `public/og.png` (og.mjs, vérifié à l'œil), `favicon-32.png`, `apple-touch-icon.png` (même dessin
  que favicon.svg) liés dans Base.astro. Assiette du hero ramenée à 100 % de la bande (elle mordait le R de PAR).
- **Mesures (mini-script Playwright, serveur 4741 arrêté par kill PID)** : hero 1440/1280/1024/390, `--ecart` = 1
  après intro, CTA au-dessus du pli partout (bas 655/563/535/672 px), aucun débordement horizontal, noms de plats
  sans débordement à 1440, 0 élément révélé encore caché après défilement complet (4 tailles), transition
  accueil → carte OK (rideau caché à la fin, `--ecart` = 1 sur la carte), 0 erreur console, mouvement réduit OK.
- Build `scripts/q.sh awwwards-partage-build4 …` exit 0 ; noindex 5/5.

## Reste (phase 3)
1. Shoot complet par l'agent « captures » puis lecture de `QA-*.md` : vérifier `idleMotion`, `hover.noHoverChange`,
   `scrollFps` mobile (reflet + scrub), LCP mobile (h1 du hero peint dès le premier rendu, assiette en `scale`).
2. Points à regarder dans les captures : carte à 1440, grand vide entre la barre d'ancres et « Starters » (hérité
   de la phase 1) ; titres `data-split` de la carte (STARTERS…) révélés à 88 %.
3. Jury (deux passes), RAPPORT.md, cocher le reste de DESIGN.md § Sur-utilisation, `pnpm index`, commit du `dist/`.

## Reste (historique phase 1, items 2 à 4 faits, 5 en partie)
1. **Aucune vérification en navigateur faite** (hors périmètre). Avant tout shoot : mesurer h1, CTA, assiette
   du hero à 1440×900, 1280×720, 1024×768, 390×844 (leçon 3.6 bis) ; la taille du mot (`--mot` dans `.hero`)
   est calculée pour que « TAGE » tienne en 5 colonnes, à vérifier visuellement (Panchang très large).
   Vérifier aussi la largeur des noms de plats dans `.plat__nom` à 1024 px et le débordement mobile.
2. **Module pilote `src/motion/partage.ts`** : coupure du mot (PAR vers la gauche, TAGE vers la droite, assiette
   qui monte sur le chêne) en hero sticky scrubbé ; même coupure en petit dans `.page-tete h1 .fente` et le
   pied de page (`.pied__mot`). Reveals `data-split`/`data-reveal` (jamais sur un bloc qui contient un lien).
3. **Transition de page** via `setTransition` : deux demi-nappes de chêne (`.curtain__g`, `.curtain__d`, déjà
   dans Base.astro, CSS à écrire) qui se rejoignent au milieu puis s'écartent, ≤ 1 s par sens.
4. **État de repos** (reflet lent sur le chemin de table, écrit sur l'élément visible, pas sur `<html>`) ou
   décision d'immobilité écrite. En-tête qui s'écarte au défilement (`frame-away`, CSS déjà prêt).
5. `og.png` (og.mjs, serveur de QA lancé), favicon PNG 32 et apple-touch-icon, puis QA complète, jury,
   RAPPORT.md, `pnpm index`, commit du `dist/`.

## Décisions
- Pas de loader, pas de WebGL (Concept Card, ligne Théâtre).
- Adresse Fossés Fleuris 18 (pas Tienne Maquet 16) ; téléphone 081 81 00 98 ; pas d'e-mail ; réservation en ligne
  = `https://restaurantpartage.be/#reservation` ; heures de service placeholder (signalées sur la page réservation).
- Menus 4 services et homard non publiés ; aucun avis, aucune note Google affichée.
- Photo 09 et 19 = Charles Jeandrain (dossier : « portrait du chef », « hero chef ») ; 19 n'est pas encore utilisée.
  Les cuisiniers des photos 11 et 16 et la personne de la photo 13 ne sont pas nommés.
- Spécialités affichées sans photo : aucune photo du client ne montre ces plats.
- Corrections typographiques seulement dans la carte : « Œuf », apostrophes, « Tripel Karmeliet », « Méditerranée ».
- `dist/partage/awwwards/` **non commité** en phase 1 (site inachevé, Vercel sert `dist/` tel quel) : le commiter
  en phase 3 avec `pnpm index`.
