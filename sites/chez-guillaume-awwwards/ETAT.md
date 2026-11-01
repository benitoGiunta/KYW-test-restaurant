# ETAT, chez-guillaume-awwwards (fin de phase 1, construction-1, 01/11/2026)

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

## Reste (phases 2 et 3)

- Phase 2 : signature (time-code de régie qui roule de top en top, pastille « top », barre de régie collée sous
  l'en-tête au téléphone), horloge de repos dans `.tete__horloge` (`data-horloge`, heure de Bruxelles + prochain
  top calculé des horaires, mise à jour à la minute), rideau de transition bordeaux (`setTransition`), reveals,
  intro du hero (sans `data-intro` sur h1 et accroche, LCP).
- Phase 3 : QA navigateur et jury, OG composée proprement, RAPPORT.md (données douteuses : horaires FAQ incohérents
  avec les spectacles, adresse BCE à Jambes, cheffe 2026 non confirmée ; aucun fictif utilisé), points 42 à 63.
- À vérifier : captures en pleine page avec images lazy (les figures sous la flottaison sont vides en capture
  `fullPage` sans défilement, pas un défaut du site) ; noms de menus sur deux lignes dans l'index de l'accueil à
  1440 (acceptable, ou passer à `m.court`).

## Décisions

- Pas de loader, pas de WebGL (restaurant, photos de 1000 px) ; pas de cadre quatre coins : régie + en-tête + pied.
- Accent `#CD3B08` réservé aux grands titres et aplats (4,15:1) ; texte et fond de CTA au survol en `#A8300A`.
- Heure du spectacle du soir jamais écrite (non publiée) ; « après le repas ».
- Prix par menu seulement (aucun prix par plat inventé) ; boissons sans prix.
- Aucun élément fictif : pas de `placeholder: true` à ce stade.
- `.hero__titre` plafonné à `19svh` pour garder le CTA visible à 1280×720.
