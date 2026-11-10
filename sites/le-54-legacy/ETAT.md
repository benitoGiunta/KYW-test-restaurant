# ETAT · le-54 · variante legacy · phase 2 (construction-2) terminée

## Fait (phases 1 et 2)
- Phase 1 : AUDIT.md, comp.md, DESIGN.md, thème Atelier, 7 pages, composants Nav, Fig, Horaires, Reserve, Footer, 14 photos du client.
- Phase 2 : reveal unique (`data-reveal`, `.js`, IntersectionObserver, visible sans script et sous `reduce`), signature d'entrée (salle qui se pose, plaque qui se révèle), nav sticky `--z-sticky-nav` et menu `popover` animé avec `aria-expanded`, formulaire de contact en huit états (labels, aide `min-height: 1lh`, `aria-invalid`, validation blur puis input, message honnête « Rien n'a été envoyé »), boutons `:hover` en `(hover: hover)`, `:active`, `:disabled`, `:focus-visible` sans transition, `.btn--big` 52 px, horaires restackés sous 40 rem, safe-area dans la gouttière, `.foot` allongé (gap de 60 px avec le KywFooter, REFLEX 59).
- Corrections de rendu : photos de showcase qui débordaient de 68 px à 375 (`min-height` + `aspect-ratio`) ; `.pagehead` et titres du contact au rang de section.
- Mesures (Playwright, serveur de dev) : 0 débordement sur 7 pages x 5 largeurs (320 à 1920) ; boutons 44 à 60 px sans retour à la ligne ; menu mobile ouvert puis fermé par Échap (`aria-expanded` suit) ; formulaire : erreurs, focus, message honnête ; reveal : 12 éléments, 12 visibles sans script et sous `reduce`, 0 non révélé après défilement.
- sloplint `--render --url` sur les 6 pages : 0 FAIL, 0 REFLEX, 0 WARN (waiver 77 pour les sections minces de fin de page) ; hero review `--stage hero` : 0 FAIL.
- Hero review : pas d'outil Agent en session, donc auto-notation `self` sur la planche des quatre captures : `ship`, 0 finding. Comp reproduite (voir comp.md).
- Build OK : `scripts/q.sh build pnpm build:site sites/le-54-legacy` ; KywFooter, noindex et mention sur les 7 pages ; aucun tiret cadratin.

## Reste (phase 3)
- Captures complètes par l'agent « captures » puis revue des gates § 5, finish review (`self`), RAPPORT.md, `pnpm index`, commit et push.
- WebGL « air » d'Atelier non fait : décision de rester sans (papier uni, caractère calm). Polices Fontshare/Google : hors ligne, repli Georgia / sans-serif, à recapturer si la capture montre un repli.
- Le reveal laisse les blocs sous le pli transparents tant qu'on n'a pas défilé : une capture pleine page sans défilement les montrera vides (faux défaut), défiler par pas d'une demi-fenêtre.
- Mardi marqué « jour courant » par un script de six lignes (`aria-current="date"`) : à vérifier un autre jour.

## Décisions et hypothèses
- Aucun bouton rempli (Atelier : « no colour-filled control »), donc F4 respecté sans primaire plein ; le survol remplit d'encre.
- Placeholders du formulaire : formats seulement (`nom@exemple.be`, `+32 81 00 00 00`), pas des données du restaurant.
- Phase 1 conservée : lundi « à confirmer », horaires de Trouve Ton Resto, menus 3 et 4 services, pas d'extrait d'avis.

## Pièges
- sloplint : un waiver est rejeté si sa raison ne partage aucun mot avec la page ; mieux vaut corriger (REFLEX 59 réglé par la marge basse du pied).
- `scripts/q.sh` : le nom de journal ne doit pas contenir de « / ».
- Serveur de dev arrêté (PID noté puis `kill`).
