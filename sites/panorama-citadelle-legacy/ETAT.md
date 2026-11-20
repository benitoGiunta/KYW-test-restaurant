# ETAT · panorama-citadelle-legacy · phase 2 sur 3 terminée

## Fait (phase 2)
- Nav : bandeau avec menu popover sous 60rem (Accueil, Le Panorama, La carte), Réserver et Menu toujours visibles, Échap et clic sur un lien ferment, 320 à 768 px sans débordement.
- Boutons : huit états (`:active` translateY 1 px, `:disabled`, `aria-busy`), tous les `:hover` sous `(hover: hover)`, transitions listées.
- Formulaire (reservation-contact) : `novalidate`, validation au blur puis à l'input, aide `min-height: 1lh`, `aria-invalid` + `aria-describedby`, statut « Rien n'a été envoyé : ce formulaire n'est pas encore relié » (testé : vide, e-mail faux, valide).
- Horaires : jour courant (fuseau Europe/Brussels) marqué `aria-current="date"` + « Aujourd'hui » par script, sans script la liste reste complète.
- Carte : index des rubriques en rail horizontal au téléphone, rubrique courante soulignée (IntersectionObserver) ; apostrophes droites de carte.ts passées en typographiques (4).
- Mouvement : thème Solstice « still » : aucun reveal ; signature = filet du guichet qui se trace (CSS, reduced-motion : état final). Waivers sloplint réécrits au format à trois champs.
- sloplint hero (self, pas d'outil Agent) : 0 REFLEX, FAIL 34 faux positif connu (`overflow-x: clip` dans base.css, prouvé par scrollWidth). Build OK, KywFooter et noindex sur les 5 routes, `pnpm index` fait.

## Reste (phase 3)
Captures complètes par l'agent « captures » puis QA 375/768/1440, jury, RAPPORT.md, entrée finale du journal `.hallmark/log.json` (forme de nav : banner), sloplint par route, comp HTML non construite (waived budget), photos 18/19 (chef, cuisinier) non utilisées, horaires « à confirmer ».

## Pièges
- sloplint : waiver = trois champs `waive <gate> · <preuve> · <raison>`, une porte par ligne, raison d'au moins 24 caractères partageant un mot avec la page ; un Floor (70) ne se waive pas.
- Le menu popover doit être neutralisé au-dessus de 60rem (voir page.css, bloc Nav).
- Serveur de dev (port 4741) arrêté en fin de phase.
