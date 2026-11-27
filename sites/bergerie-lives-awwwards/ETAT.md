# ETAT : bergerie-lives awwwards, fin de la phase 2 (construction-2)

## Fait (phase 1)
- Concept « Le Clos », système, 5 pages statiques, JSON-LD, OG, favicon, sitemap, noindex, pied KYW (voir DESIGN.md).

## Fait (phase 2)
- Pilote `src/motion/clos.ts` (`--ouv`, battants du hero à l'intro, cadres scrubbés, repos des piquets, vignette d'index qui suit le pointeur), `idle.ts`, `menu.ts`, `setup.ts` (rideau à deux battants).
- Menu téléphone plein écran (`Header.astro`), hovers par rôle sous `(hover: hover)` + `:focus-visible` + `:active`, lien KYW souligné au survol.
- Intros : `data-intro` sur les h1 de chaque page (404 comprise), chapeaux en `fade` ; titres de sections intérieures en `data-split`.
- CTA du hero dans la flottaison : bas à 824 (1440x900), 628 (1280x720), 757 (1024x768), 729 (390x844).
- Favicons PNG 32 px et `apple-touch-icon` 180 px rendus depuis `favicon.svg`.
- Build `scripts/q.sh build pnpm build:site sites/bergerie-lives-awwwards` : passe (5 pages). Mesure Playwright : aucune erreur console, aucun débordement à 390, réduit sans texte caché.
- DESIGN.md : section « Mouvement livré » et checklist 19 à 47.

## Reste (phase 3)
- Shoot complet (agent captures), points 35, 36 (`idleMotion`), 45, 26 (d-90..92) par `report.json` ; LCP (h1 en `data-split data-intro`) à vérifier.
- `og.png` : capture du hero de la phase 1, toujours juste (le hero final est identique après intro) ; à refaire seulement si le hero change.
- RAPPORT.md (données douteuses listées dans la phase 1).
- Au téléphone, le nom de l'en-tête passe sur deux lignes (« La Bergerie de / Lives ») à côté de « Appeler » et « Menu » : acceptable, à juger en revue.

## Décisions et pièges
- Pas de loader, pas de GL, pas de suiveur de curseur (décisions de la Concept Card).
- Battants du hero visibles seulement sous `.motion` ; animation CSS de secours qui les cache à 4 s si le script ne joue pas.
- Repos dimensionné pour `shoot.mjs` : piquets de 32 px x 3 px, 5 px/s (le seuil `idleMotion` est 0,05 % de pixels changés en 1,5 s).
- Captures ciblées : `.shots/aww2/` (non commité).

## Phase 3 (QA) : terminée
- Corrigé : cibles tactiles, LCP mobile (preload du hero, variantes 640/960/1280), hover du nom d'en-tête. Build passe, audit 0 FAIL. Voir RAPPORT.md.
- Reste : critique jury indépendant (Agent absent), purge des JPEG sources de `_astro/`, shoot des pages histoire/reservation.
