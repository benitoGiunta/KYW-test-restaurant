# ETAT : El Greco awwwards, fin de la phase 1 (construction-1)

## Fait
- Brief, trois concepts notés, Concept Card, système (palette, typo, grille, plan, mobile), checklist 1 à 18 : `DESIGN.md`.
- Scaffold (package.json, astro.config.mjs), engine copié verbatim de huile-sur-le-feu-awwwards (sans GL), `tokens.css`, `engine.css`, `site.css`, Archivo variable (un fichier).
- Contenu : `src/data/site.ts` (hypothèses en tête), `src/data/carte.ts` (générée depuis donnees.json), `src/lib/photos.ts`.
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, `404`. Base.astro (head, JSON-LD Restaurant, noindex, canonical, OG), Header, Footer + KywFooter.
- Build OK (`scripts/q.sh build pnpm build:site sites/el-greco-awwwards`, 5 pages). Mesures Playwright : CTA du hero dans la flottaison à 1440x900 (837), 1280x720 (696), 1024x768 (716) ; `scrollWidth` = largeur sur 5 pages à 390 ; display à gauche = gutter.
- OG : `public/og.png` capturé depuis le hero (provisoire).

## Reste
- Phase 2 : SplitText des h1 (`data-split="lines" data-intro` toujours ensemble), `data-reveal="clip"` sur cadres hauts, allongement des colonnes de crèmes, idle du cadre du hero, hover JS éventuel (index), rideau déjà dans `motion/setup.ts`.
- Phase 3 : QA, contraste, axe, perf, OG recomposée, apple-touch-icon facultatif, checklist 42 à 63.
- Vérifier : photo `terrasses` (mezze) en lazy non chargée sur capture pleine page (attendue, à confirmer en défilant) ; hero très vide à droite du titre sur 1440 (acceptable, à juger en revue).

## Décisions
- Pas de loader, pas de GL. En-tête sticky sur une rangée (3 liens), sans menu replié. Pas de curseur personnalisé.
- Réservation par `tel:`, `mailto:` et lien vers la page contact du site actuel ; aucun formulaire.
- Aucun `footer` propre au site : le pied est une `section` + `KywFooter`.
- Serveur de mesure (port 4400) arrêté en fin de session.
