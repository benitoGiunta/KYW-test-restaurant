# ETAT · Dumont Bouge legacy · phase 2 (construction-2) terminée

## Fait en phase 2
- Nav en trois parties (téléphone + 2 liens | logo | 2 liens + Réserver), menu popover sous 60 rem (liens, Réserver une table, téléphone ; Escape et clic extérieur natifs, testé à 375), skip link conservé.
- Héros : correction d'un bug de grille (pinceau et bande en deux colonnes) ; trait rose posé au-dessus de la bande, sur la façade ; animation d'entrée unique `brush-in` (700 ms), coupée en reduced motion.
- Formulaire de réservation : select natif pour les personnes (1 à 12), aide `min-height: 1lh` par champ, validation au blur puis à l'input, `aria-invalid`, focus sur le premier champ invalide, message « Rien n’a été envoyé : ce formulaire n’est pas encore relié. », date min = aujourd'hui (Bruxelles).
- Onglets du tea-room au clavier (flèches, Début, Fin), panneaux `tabindex=0`. Horaires : jour courant `aria-current="date"` + « (aujourd’hui) ».
- États : hover sous `(hover: hover)`, `:active`, `:disabled`, focus-visible instantané, focus sur fond charbon en rose clair ; tailles tactiles 44 px (`pointer: coarse`) ; safe-area et `viewport-fit=cover`.
- Build passe (`scripts/q.sh build pnpm build:site sites/dumont-bouge-legacy`) ; KywFooter, noindex, mention Maquette KYW sur les 7 routes ; aucun tiret cadratin ; aucun débordement horizontal à 375 sur 6 routes ; aucune erreur console.
- DESIGN.md (§ Phase 2, cases cochées avec preuve), comp.md (réponses Masse/Intervalle/Entrée).

## Décisions
- Garden interdit le reveal (§ Motion « état seulement ») : pas de reveal au scroll ; seule animation = le pinceau, signature. Cases 22 et F8 sans objet.
- Nav « three-part » : edge-aligned était dans les 3 derniers logs (42) ; quatre vraies destinations autorisent la forme. Label « Réserver » dans la barre (110 px), « Réserver une table » dans le menu mobile, le héros et la barre mobile.
- Hero review : pas d'outil Agent, donc auto-relecture `self` (stamp dans DESIGN.md).

## Reste (phase 3 et captures)
- Comp c1/c2 non construits (comp.md). RAPPORT.md, Sweep du DESIGN.md, entrée de `.hallmark/log.json` (le journal ne contient pas encore dumont-bouge-legacy : à vérifier).
- Contrôler en captures : le trait rose couvre l'entrée de la façade au téléphone (partial) ; contraste du texte sur la bande ; les iframes de cartes ne sont pas reproduites.
- Photos : pains et latte placeholders ; tea-room et brunch sans photo client.

## Pièges
- L'animation du pinceau dure 700 ms à l'arrivée : une capture prise avant 1 s montre le trait incomplet (pas un défaut). Attendre 1,5 s.
- sloplint FAIL 34 sur Base.astro est un faux positif (règle dans base.css) ; WARN 25 sur `.statement` assumé.
- Éléments `popover` : `display: contents` au bureau (page.css `.nav__links[popover]`), vrai popover sous 60 rem ; ne pas ajouter de `justify-self` hors du bloc bureau (il s'applique dans le popover en bloc).
- `<script>` du Base est inliné par Astro (petit module) ; ne pas chercher ses fonctions dans `_astro/page.*.js` (c'est le prefetch).

# Phase 3 (QA) terminée
- Corrigé : cibles des crédits photo (24 px). Build final OK, RAPPORT.md écrit.
- Faux positif : contraste 404 = dist/404.html racine, pas ce site.
- Reste : sweep sloplint, finish review, log hallmark, checklist 72 cases (non faits en phase 3).
