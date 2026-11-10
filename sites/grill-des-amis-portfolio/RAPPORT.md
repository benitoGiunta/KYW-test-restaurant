# RAPPORT, Le Grill des amiS, portfolio (QA, phase 3)

## Résultat QA
- Build : `pnpm build:site sites/grill-des-amis-portfolio` passe (6 pages).
- Audit (agent captures) : 0 FAIL, 12 WARN, tous écartés : phrases « répétées » = clones du marquee d'avis et horaires affichés à plusieurs endroits ; robots.txt, sitemap et « 404 sans h1 » = faux positifs sous `base` (le 404.html porte un h1, `noindex, nofollow` présent).
- Home (shoot complet) : 0 erreur console, 0 requête en échec, axe 0 violation (39 contrastes « à revoir » sur fonds dégradés/photos), CLS 0,001 (desktop) et 0,01 (mobile), LCP 336 ms desktop, 1,46 s mobile 4G, pas de débordement horizontal. Page carte relue sur 3 captures desktop : lisible à tous les paliers de température.
- Mention « Maquette KYW, certaines données sont illustratives » et `noindex` présents sur les 6 pages.

## Corrigé
- Carte et accueil : le numéro du 10e plat s'affichait « 010 » ; formaté sur deux chiffres (`padStart`). Vérifié sur page rebuildée : 0 numéro à longueur anormale, 0 erreur.

## Placeholders
- E-mail `contact@legrilldesamis.be` (illustratif, non rendu si absent du dossier).
- Elise : rôle exact à préciser.
- 3 avis (Marc L., Sophie D., Julien P.) : illustratifs, source « avis illustratif ».
- 4 couches de la scène de cuisson (assiette, entrecôte, purée et légumes, sauce) : images recomposées, `placeholder: true`.
- Privatisation, bon cadeau, traiteur : réduits au fait du dossier, montants marqués illustratifs.

## Points ouverts
- Scène de cuisson faite de photos détourées (couteau et casserole débordent l'assiette) : limite de qualité connue.
- Page « viandes » dédiée non créée (maturation traitée dans « La maison »).
- Shoot mobile de la carte interrompu (limite de temps) : mobile vérifié en phase 2 (320 à 390 px, sans débordement) et sur la home (captures).
- Kicker du hero mobile (corail sur photo) de contraste moyen : non mesuré.

## Leçons structurelles
- `padStart(2, '0')` plutôt que `0{i + 1}` dès qu'une liste peut dépasser 9 éléments (gabarit Braise à corriger de même).
