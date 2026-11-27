# RAPPORT : dumont-bouge / portfolio (phase test, passe construction-3, QA)

## Placeholders
Aucun (aucune entrée `placeholder: true` dans `src/data/site.ts`). Mention « Maquette KYW, certaines données sont illustratives » et noindex présents.

## QA (lecture de QA-build.md et des planches accueil et carte, capture ciblée du 404)
- Console : 0 erreur, 0 requête en échec (accueil, carte, 404). Pas de débordement horizontal.
- Axe : 0 violation sur accueil et carte. La violation `color-contrast` du 404 (`.kyw-footer__note`, #fbfaf8) vient du 404 brut de `serve.mjs`, pas du site (faux positif connu) : `/404.html` du site, rechargé et recapturé, donne 0 violation (`.shots/dumont-qa3-404`), hero lisible, boutons visibles.
- Planches accueil (desktop et mobile) et carte : rien de cassé (hero, astre, transitions, carte par moments, pied de page KYW lisible).
- Corrigé : deux tirets demi-cadratin « 7h–18h » et « 7h–17h » (horaires des adresses, `src/data/site.ts`) remplacés par « 7h à 18h » et « 7h à 17h ». Vérifié dans `dist/.../index.html` (1 occurrence « 7h à 18h », 0 « 7h–1 »). Build OK (`scripts/q.sh dumont-qa3-build pnpm build:site`).
- Non corrigé, volontaire : phrases répétées (carte et brunch : mêmes plats dans deux sections ou formules reprises de la carte réelle) ; WARN robots.txt/sitemap (faux positif sous `base`, noindex voulu) ; 404 sans hover visible sur liens d'un 404 serveur.
- Perf : CLS 0,052 accueil, LCP 136 ms bureau, 1432 ms mobile bridé, page la plus lourde ~1,1 Mo (images).

## Points ouverts
- Photo du tea-room (tarte, 1800x864) floue en portrait sur desktop.
- `public/photos/logo.png` inutilisé.
- Pages brunch, maison, réservation sans captures complètes (crawl par premier segment).
- `gabarits/UTILISATION.md`, `pnpm index`, publication : session mère.

## Leçons structurelles
Aucune nouvelle (faux positif 404 déjà connu).
