# ETAT · pizzeria-doria legacy · construction-2 (phase 2 sur 3)

## Fait (phase 2)
- Nav slab sticky (72px, `--z-sticky-nav`), menu `popover` sous 60rem (bouton « Menu », aria-expanded synchronisé, Échap, retour du focus), nav visible sans popover au bureau et dans les navigateurs sans popover (`@supports`), skip link conservé.
- Contrôles : `.btn` (hover sous `(hover: hover)`, `:active`, `:disabled` et `aria-disabled` par trois canaux), `.pill` (active, aria-current sur la section ciblée du menu), liens et pied à 44px sous `(pointer: coarse)`.
- Un reveal (`[data-reveal]` : casiers et avis, cascade 60 ms, opacité et translate), sous `.js`, filet de sécurité 4 s, aucun masquage en reduced motion.
- Signature : jour courant des casiers marqué par script (Europe/Brussels), bordure pêche et « aujourd'hui ».
- Hero : recadrage paysage 1600x1000 (`<picture>`, portrait 800x1200 sous 40rem), plaque pleine largeur sur deux colonnes (la pizza n'est plus masquée), `svh` partout. Hero review auto-notée `fix · 2 findings · 2 resolved` (DESIGN.md).
- Photos inutilisées supprimées (friture, roquette, burrata, pizza-basilic) ; adresse du Fin : ville hors du lien (REFLEX 49b).
- Vérifié en navigateur : scrollWidth = viewport sur 4 routes à 375 et 1440, 0 erreur console, sans JS tout est visible, reduced motion opacité 1, tab 1 = skip link, nav sticky top 0.
- Build OK (`scripts/q.sh build pnpm build:site sites/pizzeria-doria-legacy`), noindex, mention et signature sur les 5 pages. Serveur de dev arrêté.

## Reste (phase 3 et agent captures)
- Shoot complet (agent captures) puis QA : contrastes sur captures, axe, LCP du hero (98 Ko paysage, 65 Ko portrait).
- sloplint `--stage` complet sur le build (le stage hero seulement a tourné) ; les FAIL 34 et 50 restent des faux positifs (base.css).
- Comps c1 et c2 jamais construites : comp.md l'assume.
- Hero toujours une photo de stock marquée `data-placeholder` ; avis datés de 2023 à vérifier avec le client.

## Décisions et hypothèses
- Pas de formulaire : le téléphone (`tel:`) est la réservation du site d'origine, conservé ; cases 23 et 29 n'ont donc pas de champ à tester.
- Pas d'outil Agent dans cette session : la revue hero est une auto-notation (`self`).
- Un seul sticky de page (la nav) ; `.carte__titre` (sticky de colonne sur /menu/, grande largeur) a `top: calc(var(--nav-h) + 24px)` pour passer sous la nav ; `--nav-h` est dans `:root`.
- Leçon proposée : data/usage/test-1/lecons-proposees/pizzeria-doria.md.
