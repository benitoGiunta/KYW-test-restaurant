# ETAT · champs-elysees legacy · construction-2 (phase 2 sur 3) · 20/11/2026

## Fait (phase 2)
- Nav : bandeau qui défile hors écran (sticky `top: -34px`), barre 76 px ; menu Popover plein écran sous 60rem (Réserver + Menu), fermeture au clic sur un lien, repli sans Popover.
- Hero : marge UA de `figure` supprimée (plein cadre), hauteur en `svh` bornée à 1000 px, empilé au téléphone (tirage puis plaque), plaque resserrée ; review `self` et comp reproduite (DESIGN.md § Phase 2).
- Contrôles : bouton huit états (hover sous `(hover: hover)`, `:active` 1 px, `:disabled`), cibles 44 px en `pointer: coarse`, `:focus-visible` partout.
- Horaires : jour courant et état d'ouverture (JS, heure de Bruxelles).
- Contact : formulaire validé au blur puis à l'input, `data-endpoint=""`, message « Rien n’a été envoyé », aide réservée d'une ligne, champs de 52 px.
- Un seul reveal (galerie, IntersectionObserver, sous `.js`), reduced-motion et sans script vérifiés (opacité 1).
- Page 404 ajoutée (`dist/champs-elysees/legacy/404.html`, requis par vercel.json).
- sloplint hero `--render --url` : 0 FAIL, 3 WARN (voir plus bas) ; build OK ; KywFooter, noindex, aucun tiret cadratin sur 5/5 pages.
- Tests navigateur ciblés (1280, 1000, 375) : pas de débordement horizontal, menu, validation, jour courant, aucune erreur console.

## Reste (phase 3)
- Sweep, RAPPORT.md, jury, `pnpm index`, publication par la session de correction ; captures complètes par l'agent « captures » (QA 1440 et 375, gate 83 part de photos).
- Lire les captures complètes du formulaire (états focus, erreur) et du menu ouvert avec polices réelles.

## Décisions et pièges
- WARN restants : 23 (bandeau vert 4,2 % + banquette teal de la photo, déclaré), 28a (logo de pied lazy, faux positif : l'image LCP est le hero), F15 (écarts de colonnes : ramenés à `--gap-columns`, à revérifier).
- Pas de sous-agent frais dans cette session : hero review en auto-notation `self`.
- Forme de bouton : contour fin partout (empreinte du thème), aucun rempli ; hover remplit d'encre.
- Aucune dérogation nouvelle ; waivers `8` et `83` réécrits au format `waive <gate> · quoi · pourquoi` (l'ancien format `answered 83` était rejeté : 83 est un Reflex).
- Hypothèses inchangées de la phase 1 (cp 5100 à confirmer, horaires du site d'origine, consentement à valider).
- État d'ouverture : calculé sur les horaires du site d'origine, à confirmer avec le client.
- Pièges : `grep -c '[—–]'` donne un faux positif en locale non UTF-8 (compter en Python) ; `figure` a 40 px de marge par défaut ; `.nav__banner p` héritait `max-width: 65ch` (retour à la ligne).
