# ETAT : le-lodge-wepion · variante awwwards · construction-1 (phase 1 sur 3)

## Fait
- Brief, trois concepts notés, Concept Card, système (palette, typo, grille, plan) : `DESIGN.md`. Concept retenu : « Deux rives » (berge verticale, nuit de Wépion / jour d'Erpent).
- Scaffold Astro (engine copié verbatim d'un site livré, sans GL), `tokens.css`, `engine.css`, `site.css`, `Base.astro` (head complet, JSON-LD sans horaires), en-tête, pied (`Footer.astro` + `KywFooter`), menu téléphone.
- Contenu : `src/data/site.ts` (hypothèses en tête), `src/data/carte.ts` (88 lignes générées depuis `donnees.json`, aucun plat inventé), `src/lib/photos.ts` (12 photos en WebP ≤ 1800 px, alt d'après `sujet`).
- Pages : accueil, `/carte/`, `/histoire/`, `/reservation/`, 404. Statique complet sans `.motion`. Build OK (`scripts/q.sh build pnpm build:site sites/le-lodge-wepion-awwwards`), `dist/le-lodge-wepion/awwwards/` écrit.
- Mesures Playwright aux 4 viewports : h1, photo, CTA du héros dans la flottaison, pas de débordement horizontal sur les 4 pages, aucun `.display` à moins de 16 px du bord, zéro erreur de requête.

## Reste (phases 2 et 3)
- Phase 2 : pilote « le passage » (berge pilotée par le défilement, `clip-path`), idle (ondulation de la berge), rideau et hovers au verbe « traverser », aperçu de plat sur la carte (curseur et toucher), `setup.ts` complet ; poser `data-intro` toujours avec `data-split`/`data-reveal` (déjà fait sur les h1 et photos).
- Phase 3 : QA navigateur (shoot, audit, axe), image OG (`og.mjs`, absente : `public/og.png` manquant), favicon PNG/apple-touch si utile, `RAPPORT.md`, `pnpm index`, commit final avec `[publier]`.
- À vérifier : « 15 septembre 2026 » se coupe en fin de ligne dans le héros (insécable à poser) ; sloplint non lancé.

## Décisions
- Ni loader ni GL (l'information « fermé, relais à Erpent » doit être immédiate).
- Appel et réservation : numéro du relais 0496 92 55 13 (fenêtre du site client, à confirmer) ; ligne de Wépion citée à part.
- Aucun horaire du relais ; horaires de Wépion présentés comme ceux d'avant l'incendie, avec la contradiction de la source tierce signalée.
- JSON-LD sans `openingHoursSpecification` (pas de faux horaires). Photo 11 non utilisée.
- Aucun placeholder : tout vient du dossier ; la 2008 et les 160 couverts sont marqués « à confirmer ».

## Pièges
- `.photo img` est en `position: absolute` (sinon la hauteur intrinsèque de l'image gonfle la ligne du héros) : chaque `.photo` doit avoir une hauteur (aspect-ratio ou grille).
- Serveur de mesure : port 4410, arrêté.
