# ETAT · Wok de Jin legacy · fin de la phase 2

## Fait (phase 2)
- Nav slab : « Réserver » passe en contour or (un seul primaire corail par écran), menu mobile en `popover` (sous 60rem, toggle 48 px, `aria-expanded` synchronisé, lien d'ancre et Échap referment), brand réduit au logo sous 22,5rem.
- Saut au contenu visible au focus, `main tabindex=-1`, `scroll-padding-top`, défilement doux si mouvement autorisé.
- États : `:focus-visible`, `:active`, `:disabled` sur `.btn`, `.btn--outline`, `.nav-toggle`, liens ; tous les `:hover` sous `(hover: hover)`.
- Motion calme : un reveal (`[data-reveal]`, opacité + 16 px, sous `.js`), signature : le prix géant pose son filet (`scaleX`), le hero se pose (`settle`, 1,6 s). Reduced motion : tout à l'état final, sans script tout est visible.
- Horaires : jour courant (heure de Bruxelles) en `aria-current="date"` avec pastille « Aujourd’hui ».
- Responsive : tarifs restackés au téléphone (`data-label`), prix géant fluide, hero mobile resserré et recadré, boutons pleine largeur à 40rem.
- Correctifs phase 1 : slots `salle-rouge` (hero) et `salle-large` qui s'effondraient à 0 px de haut (FAIL F18), `color` explicite sur `.hero`/`.band`, `--space-3xs`.
- Comp reproduite (1280x800 côte à côte, écart : nav ajoutée, masse du titre un peu plus petite) ; hero review `self`.
- Build : `pnpm build:site sites/wok-de-jin-legacy` passe (3 pages, noindex, KywFooter, mention présents).

## Reste (phase 3 et captures)
- Shoot complet par l'agent « captures » ; vérifier le recadrage du hero mobile (`object-position: 60% 82% !important` sous 40rem, car `Photo` écrit un `object-position` en ligne).
- `sloplint` statique : FAIL 34 faux positif attendu ; WARN 25 (mesure 28ch des chapeaux), NOTE 58 (hero réveillon 17 mots, texte client) laissés.
- Placeholders : slot `.fill` « lien de commande à fournir » (à emporter), déjà listé en phase 1. Aucun formulaire : l'original réserve par `tel:` et lien externe.

## Pièges
- `Photo` pose `object-position` en ligne : tout recadrage CSS demande `!important`.
- Les `[data-slot]` ne portent pas de hauteur propre : leur donner `aspect-ratio` ou `inset: 0`.
- Menu mobile : le `::backdrop` du popover couvre aussi la barre de nav (assombrie, toggle encore lisible).
- Dev server : lancé port 4321, arrêté en fin de phase.

## Fin de la phase 3 (QA)
- Corrigé : `twitter:card` (Base.astro). Les autres constats de QA-build sont des faux positifs ou sous seuil (voir RAPPORT.md).
- Build final passe ; RAPPORT.md écrit. Serveur de test arrêté (PID noté, kill).
- Reste : lien de commande à emporter (slot `.fill`), sweep sloplint/finish review non refaits.
