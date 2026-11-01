# ETAT, chez-guillaume-awwwards (fin de phase 2, construction-2, 01/11/2026)

## Fait

- Brief, trois concepts notés, Concept Card « La conduite » (verbe : enchaîner), système complet, plan de
  composition, test de généricité, checklist de sur-utilisation 1 à 18 : `DESIGN.md`.
- Scaffold Astro (`package.json`, `astro.config.mjs`, `tsconfig.json`) ; engine copié de `partage-awwwards`
  (engine.md verbatim sans lignes GL), `engine.css`, `lib/url.ts`, `components/Photo.astro`, `motion/menu.ts`.
- Jetons `src/styles/tokens.css` (palette plâtre / salle / rouge du logo `#CD3B08` / rideau `#5B1519`, contrastes
  calculés), polices Tanker (Fontshare) + Schibsted Grotesk variable (un fichier), 2 préchargées.
- Contenu `src/data/site.ts` (hypothèses en tête) ; photos `src/lib/photos.ts` (alt d'après `index.json`).
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/` (tel, mailto, billetterie externe, formulaire mailto
  « Ouvrir mon e-mail »), `404` (« On va voir qui ? », time-code « --:-- »). Composant `Top.astro` (régie + corps),
  `Header.astro` (logo client, nav, menu mobile), `Footer.astro` (« Rideau. », fin de conduite) + `KywFooter`.
- Head complet (titre et description uniques, canonical, OG, twitter, favicon rond du top, sitemap, robots
  `noindex, nofollow`, JSON-LD `Restaurant`). `public/og.png` provisoire (capture du hero 1200×630).
- Build OK : `scripts/q.sh build pnpm build:site sites/chez-guillaume-awwwards`.
- Mesures (mini-script Playwright, 1440×900, 1280×720, 1024×768, 390×844, 320×640, 5 pages) : aucun débordement,
  aucune image plus large que son parent, h1 et `.display` au gutter, CTA du hero au-dessus de la flottaison partout
  (1280×720 : CTA à 651-699 px), cibles < 24 px corrigées.

## Fait en phase 2 (construction-2, 01/11/2026)

- Module pilote `src/motion/conduite.ts` : top actif par ScrollTrigger, time-code à bandes masquées qui roule
  toujours en avant depuis le top précédent (tour complet si même heure), conservé entre les pages ; pastille
  « top » qui se pose ; barre de régie fixe sous l'en-tête au téléphone (`Header.astro`, `.barre`) ; poursuite
  du hero (`data-poursuite`, projecteur radial qui suit le pointeur, dérive au repos, balaie à l'intro) ; horloge
  de régie de l'en-tête (heure de Bruxelles, prochain top, deux-points qui battent la seconde).
- Rideau de transition plissé (`setup.ts`, `site.css` `.curtain__panel`), reveals `data-split="words"` sur les h2
  `display`, `data-reveal="clip"` sur les photos hors hero et hors première photo de page, « Rideau. » en chars.
- Survols sous `(hover: hover)`, `:focus-visible` et `:active` alignés, lien du pied KYW souligné au survol.
- `.split-line` à 0,16 em (capitales accentuées). Time-code du hero plafonné à la largeur de la régie
  (débordait de 30 à 40 px sur le h1 à 1024 et 1280).
- Contrôle (mini-script, pas de shoot) : 0 erreur console, 0 texte caché après défilement et en réduit, idle
  visible, réduit immobile, menu mobile OK, `scrollWidth` 390 = 390, transition 1,8 s aller-retour. Build OK.

## Reste (phase 3)

- Shoot complet et jury par l'agent captures, puis : `hover.noHoverChange`, `idleMotion`, contraste, cibles,
  `keyboard.stops[0]`, `settledMs` (points 35, 36, 44, 45, 47).
- OG composée proprement, RAPPORT.md (données douteuses : horaires FAQ incohérents avec les spectacles, adresse
  BCE à Jambes, cheffe 2026 non confirmée ; aucun fictif utilisé), points 42 à 63.
- À regarder : au téléphone, la barre peut doubler la régie en ligne quand le haut du top est à l'écran
  (déclenchement à 55 %) ; noms de menus sur deux lignes dans l'index à 1440.

## Décisions

- Pas de loader, pas de WebGL (restaurant, photos de 1000 px) ; pas de cadre quatre coins : régie + en-tête + pied.
- Accent `#CD3B08` réservé aux grands titres et aplats (4,15:1) ; texte et fond de CTA au survol en `#A8300A`.
- Heure du spectacle du soir jamais écrite (non publiée) ; « après le repas ».
- Prix par menu seulement (aucun prix par plat inventé) ; boissons sans prix.
- Aucun élément fictif : pas de `placeholder: true` à ce stade.
- `.hero__titre` plafonné à `19svh` pour garder le CTA visible à 1280×720.
- Repos : horloge de régie et poursuite, pas d'objet flottant ; horloge `aria-hidden` (l'information est dans le
  pied et la réservation).
- Pas de follower de curseur ni de `data-magnetic` : le verbe « enchaîner » porte sur le time-code et le rideau.
