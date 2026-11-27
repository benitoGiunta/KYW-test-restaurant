# ETAT · oh-la-vache · awwwards · phase 1 (construction-1)
## Fait
- DESIGN.md (brief, 3 concepts, Concept Card, système, checklist 1 à 18).
- Scaffold Astro 5 (engine copié du site huile-sur-le-feu-awwwards, sans modification), tokens.css, site.css, Base (head complet, JSON-LD Restaurant, noindex), Header, Footer (pied « 23 : 45 » + KywFooter), Horaires, Photo.
- Contenu : `src/data/site.ts` (hypothèses en tête), `carte.json` (22 rubriques de donnees.json, regroupées en 4 heures), `lib/photos.ts` (14 photos client, alt d'après `sujet`).
- 5 pages statiques : `/`, `/carte/`, `/histoire/` (« La maison »), `/reservation/`, 404. Build OK : `dist/oh-la-vache/awwwards/`.
- Mesures hero (1440×900, 1280×720, 1024×768, 390×844) : CTA dans le pli partout, aucun débordement horizontal, aucun `.display` sous le gutter.
## Reste (phases 2 et 3)
- Mouvement : engine démarre (`setupMotion` = rideau seulement) ; ajouter l'horloge qui avance au scroll, reveals (`data-split`/`data-reveal` toujours posés avec `data-intro`), hovers de lignes, repos (pastille, horloge du pied), menu mobile (la nav est masquée sous 64 rem : seul « Appeler » reste, à remplacer par un menu).
- Phase 3 : QA navigateur (captures, axe, clavier, reduced motion), RAPPORT.md, checklist 42 à 63, `pnpm index`, commit de `dist/`.
- Photos lazy non vérifiées visuellement ; recadrage de la tache du hero (`object-position: 80% 50%`) à contrôler.
## Décisions
- Concept B (cadran 11 h à 23 h 45), un seul panneau de rideau, pas de loader ni de GL.
- Réservation par téléphone uniquement ; pas de `mailto:` (aucun e-mail public du restaurant). Pas de logo reproduit (photo 00 non utilisée).
- Donnée douteuse non corrigée : adresse « 58 » au hero du site actuel vs 581 ; horaires du vendredi et mardi à confirmer.
