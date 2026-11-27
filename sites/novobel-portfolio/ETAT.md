# ETAT novobel-portfolio (phase 3 sur 3, QA terminée)

## Fait (phase 1, voir DESIGN.md) : contenu, 7 pages, photos, footer KYW, noindex.

## Fait (phase 2)
- `src/motion/novobel.ts` (nouveau, appelé par `setup.ts` via `onPage`) : jauge d'avancement de la page sous l'en-tête (`--p`, pilotée par le défilement), fil à plomb jaune des étapes (scrub) avec numéros qui s'allument (`.est-atteinte`), chiffres clés qui montent (texte final dans le HTML), trait jaune sous le nom et les h1 (CSS + classe `est-trace`), parallaxe bornée des `.bande`, portraits `.deux figure` qui se découvrent, formulaire de devis.
- `setup.ts` : ne lance plus que `lignesEcrites`, `apercu` et `novobelMotion` (les fonctions d'horaires, onglets, etc. restent définies mais inutilisées). Correctif gabarit local : `overwrite: true` -> `'auto'` dans `apercu()` (l'aperçu restait figé en haut à gauche).
- Bandeau des métiers : marquee réel (6 copies dont 5 `aria-hidden`, pause au survol), statique et à la ligne en reduced motion (avant : texte coupé en mobile).
- Formulaire de devis (`contact.astro`, `data-devis`) : `novalidate` posé par JS, messages en français par champ (`aria-invalid`, `aria-describedby`), résumé `role=status`, focus sur le premier champ invalide, puis `mailto:` prérempli (objet + corps) et état « message prêt » ; sans JS : validation native + mailto.
- États : survol de l'étape et des flèches de lien, appui des boutons, focus des champs, `aria-current` de la barre basse sur la page Devis. Tableau « Repères » de la maison : valeurs à la ligne (débordait à 589 px en 390 en reduced motion).
- Vérifié (Playwright ciblé, pas de shoot complet) : 6 pages x 3 profils (1440, 390 tactile, 390 reduced motion) sans erreur console ni débordement horizontal ; clics réels des 5 liens d'en-tête OK ; bas de page : footer KYW et mention Maquette au-dessus de la barre basse (1440 et 390) ; reduced motion : 0 texte caché ; aperçu au survol des projets suit le pointeur ; formulaire vide / invalide / valide OK.
- Build OK : `scripts/q.sh np-build6 node scripts/build-site.mjs sites/novobel-portfolio`.

## Reste (phase 3 / captures)
- Shoot et audit complets par l'agent captures (axe, contraste du trait jaune sur clair non applicable : décoratif ; rouge `#9b1c1c` des erreurs sur `#edebe4`).
- Page Services : fil des étapes à regarder en capture (même composant `.etapes`).
- Logo client (`02-site.png`) non intégré ; `pnpm index`, commit de lot et publication non faits ; `gabarits/UTILISATION.md` à compléter par la session mère (ardoise : novobel).

## Pièges
- `.form label` du gabarit est `display: grid` : les labels du devis sont dans `.champ label { display: block }`.
- Le fil injecté (`.etapes__fil`) et la piste `::before` sont à `left: 0` de `.etapes` (padding-left ajouté) ; les compteurs n'animent que `.stats .num`.
- Lenis/ScrollTrigger : les captures doivent défiler à la molette.

## Phase 3 (QA)
- Contrôle ciblé 7 pages x 2 profils : aucun défaut, aucune correction. Build final OK. RAPPORT.md écrit. Serveur arrêté.
- Reste : `pnpm index`, publication, UTILISATION.md (session mère).
