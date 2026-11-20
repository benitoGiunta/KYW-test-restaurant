# ETAT · maison-des-desserts · variante legacy · construction-2 (phase 2 sur 3)

## Fait (phase 2)
- Nav : sticky 72 px (64 sous 60 rem), `<nav popover>` plein cadre sous 60 rem (bouton Menu/Fermer, `aria-expanded`, Échap, fermeture au passage en large), skip link visible au focus, `main tabindex=-1`, `scroll-padding-top` = nav + 24 px, index de la carte sticky sous la nav.
- Contrôles : `.btn` 48 px, `:active` (1 px de `transform`), `:disabled`, focus inset sur les champs, aucun `transition: all`, survol dans `@media (hover: hover)`, `(pointer: coarse)` à 48 px.
- Formulaires (contact, jobs) : `novalidate`, validation blur puis input, `aria-invalid`/`aria-describedby`, placeholders formats, message « Rien n’a été envoyé… », libellés de boutons en verbe.
- Switcher des métiers (accueil, `role=tablist`, flèches/Home/End, sans script : 3 panneaux), jour courant et état d'ouverture dans les horaires, zoom de la galerie (`<dialog>`), rubrique courante dans l'index de la carte, un seul reveal (`data-reveal` posé par script, absent sous reduced motion).
- Hero : titre ramené à `clamp(2.75rem, 3.2vw + 1.25rem, 4.25rem)` (trois lignes), hero en `min-height: calc(100dvh - var(--nav-h))` centré sur bureau (le premier écran dépassait à 1440 x 900), waive 44c écrit au stamp. Contraste du crayon relevé (`--color-pencil` 46 %), scrims en tokens, `thead` caché des horaires supprimé (FAIL 73), prix de la carte autorisés à passer à la ligne (FAIL 34 à 375), notes retirées des libellés de l'index de la carte (FAIL 49a).
- Hero review : pas d'outil sous-agent dans cette session, auto-notation `self` (3 findings : fold 1440 résolu, contraste 4,32:1 résolu, 44c waived). Comp : trois questions répondues dans `comp.md`.
- Vérifié (script Playwright, 24 contrôles OK) : nav une ligne à 1280, menu mobile, tab stops, skip link, formulaires, lightbox, index carte, 6 pages à 375 sans débordement, reduced motion, sans JavaScript, reveal. Build `pnpm build:site` OK, pied KYW et noindex sur les 6 routes, aucun tiret cadratin.
- sloplint `--render --stage page` : accueil sans FAIL (hors faux positif 34 de `src`), contact et carte avec les restes ci-dessous.

## Reste (phase 3)
- QA navigateur complète par l'agent captures (fold 1280 x 800, 375, contraste, axe), polices réelles (Fontshare et Google Fonts non joignables).
- sloplint page restant sur la carte : FAIL 34 (prix, à relire après le dernier correctif : le script maison ne trouve plus aucun élément au-delà de 375 px), REFLEX 71 (têtes plus proches du bloc précédent que du suivant dans les listes de plats, à examiner), REFLEX 78 (h2 de 39 px sous un h1 de 84 px sur les sous-pages : têtes d'article, à waiver avec preuve ou h2 agrandis), REFLEX 83 galerie (54 % de photos : c'est la galerie, waive à écrire), 44c « hero » sur contact, jobs, galerie (pas de hero, page d'outil).
- Pied KYW (paquet) : liens de 24 px de haut au téléphone, non modifiable ici.
- RAPPORT.md, sweep final, revue.

## Pièges
- `waive` s'écrit à trois champs : `waive <gate> · <preuve du garde> · <raison>` ; deux champs = « malformed waiver ».
- `sloplint --stage` accepte `hero` ou `page` seulement.
- Hook : `curl`, `python3 scripts/planche.py` et tout script de contrôle passent par `scripts/q.sh`.
- Les agents des variantes awwwards et portfolio de ce restaurant travaillent dans le même dépôt : ne committer que `sites/maison-des-desserts-legacy/` et `dist/maison-des-desserts/legacy/`.

## Hypothèses
- Nav sticky choisie pour que le menu mobile reste accessible après défilement ; le primaire de la nav (Boutique en ligne) et celui du hero partagent la même recette.
- Aperçu du switcher : trois premières lignes de la rubrique de la carte liée (la rubrique « fetes » pour Chocolaterie, wiring de la phase 1).
- Placeholders de téléphone et d'e-mail : formats génériques (`0470 00 00 00`, `nom@exemple.be`), pas des données du client.
