# ETAT · bienvenue-chez-vous · variante legacy · phase 2 sur 3 terminée

## Fait (phase 1)
Audit, deal/draw/stamp, comp, DESIGN.md, données réelles, 7 routes, 17 photos WebP.

## Fait (phase 2)
- Nav : forme slab (gate 42, edge-aligned écarté), menu Popover sous 60rem (Echap, clic extérieur, `aria-expanded`), « Réserver » cerclé (un seul primaire rempli par page), « Réserver » repris dans le menu sous 22rem, skip link et logo `aria-label`.
- Boutons : états hover (sous `(hover: hover)`), `:active`, `:disabled`, transitions listées ; `.btn--lg` en nowrap, réduit au téléphone.
- Switcher midi/soir : Home et End ajoutés, panneaux visibles sans script (vérifié).
- Signature : entrée de la plaque du hero (CSS), flèche des « Aussi chez nous ».
- Hero mobile : photo 92vw au-dessus de la plaque (le sourire n'est plus couvert). Hero review en auto-notation (`self`).
- Finitions : `::selection`, scroll-padding 5.5rem, `svh`, liens 44 px au tactile, `.addr` sans débordement à 320.
- Build OK, 7 routes avec noindex, mention et kyw-signature ; aucun tiret cadratin ; aucun débordement 320/375/1280 sur 6 routes.

## Reste (phase 3 et captures)
- Agent captures : shoot complet (non fait ici), vérifier le menu Popover sur toutes les routes mobiles.
- Phase 3 : Sweep, RAPPORT.md, gates § 5.
- Slot `boutique` sans photo (`.fill`), toujours à fournir. Numéro, horaires, e-mail : à confirmer (tiers).

## Pièges
- sloplint `src` : FAIL 34 faux positif (règle dans `base.css` via `@import`), WARN 49 sur le libellé du téléphone (nowrap en CSS).
- Le widget sombre flottant en bas des captures est l'outil de dev Astro, pas le site.
- Hypothèses : sepia gardé ; pas de formulaire (tel: est la réservation) ; entrée de plaque seulement, posture calme.
