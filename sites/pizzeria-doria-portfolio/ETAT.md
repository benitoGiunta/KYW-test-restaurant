# ETAT : pizzeria-doria-portfolio (fin de la phase 3 sur 3, passe construction-3, QA terminée)

## Fait (phase 1)
- Gabarit guinguette adapté, DESIGN.md, `site.ts` + `carte.json` (181 lignes), tokens, objets pizza/basilic/tomate, filet tricolore, 7 pages, photos WebP, OG, favicon, footer KYW (un seul `<footer>`).

## Fait (phase 2)
- Table : bug du rail visible en bureau corrigé (`.table .table__rail`), padding de section retiré (scène = 100svh), deux rangées de 4 + bande libre pour le titre, tirages en `min(15vw, 22svh)` : recouvrement titre/tirages = 0 à 1440×900, 1280×720, 1024×768. Badge à texte plus long que le cercle corrigé (textLength 270), version mobile « glissez ».
- Signature : repose de travers au lâcher, « Remettre la table », curseur « Attrapez », clavier (testés : drag, reset, flèches, focus rendu).
- Hero : intro titre + accroche ; filet de lecture sous le tricolore (progres = 1 en bas de page).
- Marquee : `Intl` Europe/Brussels, testé sous `page.clock` (lundi midi, mardi, jeudi 12 h 30 et 15 h, samedi 20 h, dimanche 23 h), `min-width: 100vw` par groupe, pause au survol.
- États et finitions : `:active`, survol des lignes de carte, `:hover` sous `(hover: hover)`, CSS de l'avis supprimé.
- Mobile 320/360/390 : plus de débordement (page À emporter à 340, photos inclinées de /carte/ à 363), rail calé sur la gouttière. Reduced motion : 0 animation, 0 texte caché sur 6 pages.
- Build vert (`scripts/q.sh doria-p2-build node scripts/build-site.mjs sites/pizzeria-doria-portfolio`), noindex, mention Maquette, un logo KYW, aucun tiret cadratin sur les 6 pages.

## Reste (phase 3 et captures)
- Shoot/audit complets (agent captures) : contrastes (encre sur #ea5a43, #b8301f sur lin, lin sur canard), clics réels d'en-tête, bas de page en fenêtre (footer KYW visible), LCP loader/hero (deux passes).
- Option : en-tête sticky (80 px) masque la première rangée de tirages quand la section est calée en haut d'écran ; acceptable, à juger sur capture.
- RAPPORT.md (placeholders, shoot, audit), sloplint auto-noté `self`, script du logo en titrage, vrai logo vectoriel.

## Pièges
- Les mesures Playwright du bureau doivent attendre le loader (7 s sur l'accueil).
- `gabarits/UTILISATION.md` toujours à compléter (protégé) : « guinguette : pizzeria-doria ». Défauts à reporter dans `gabarits/guinguette` (protégé) : `.table__rail` écrasé par `.rail`, badge trop long, `.table` avec padding, marquee en `getDay()` local, rail mobile en marge négative hors `.wrap`.

## Phase 3 (QA)
- Fait : axe 0 violation sur 7 pages, clics d'en-tête OK, footer KYW visible en fenêtre, build final vert, RAPPORT.md écrit. Rien à corriger.
- Reste : points mineurs de RAPPORT.md (vide au-dessus du pied de /carte/, sloplint self, logo vectoriel).
