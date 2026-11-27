# ETAT novobel legacy · phase 1 (construction-1)

## Fait
- Décision : Novobel est une entreprise de rénovation (dossier.md), pas un restaurant ; maquette d'entreprise, job « devis ». Aucune question posée.
- AUDIT.md (sur captures et texte, sans sloplint), deal/draw/scaffold (Atelier, seed renovation-craft-artisan-local-30cb·5a48c614·2026-11-27·r0, draw a6c482), stamp, DESIGN.md, comp.md (décision écrite).
- Contenu : src/data/site.ts (textes d'origine, coordonnées, 5 métiers, 4 étapes, 4 projets, 6 offres).
- 6 pages statiques : /, /services, /projects, /jobs, /blog (vide, slot .fill), 404. Pied KYW, noindex et mention vérifiés 6/6. Build OK (`pnpm build:site sites/novobel-legacy`), dist/novobel/legacy/.

## Reste (phases 2 et 3)
- Construire c1/c2 (ou corriger le stamp `comp:`), `sloplint --before` et `--render`, FAIL/REFLEX à zéro.
- Nav (popover, état courant), un reveal, focus, formulaire de devis (`data-endpoint=""`) ; QA navigateur 375/1280, captures.
- Vérifier le hero à 1280x800, le contraste du mast, les cibles tactiles.
- RAPPORT.md, Sweep, entrée de journal Hallmark finale.

## Décisions et hypothèses
- « Actifs depuis 25 ans » omis (BCE : 2019) ; à confirmer avec le client.
- Photos : 8 du site d'origine (stock probable, créditées) ; 10 et 11 (rendus 3D filigranés), 13 (voilier), 07 écartées. Cuisine (736 px) seulement en inset.
- Horaires d'accueil et articles du blog : slots `.fill` (2 au plus par page).
- « 28 logements » = 4+14+6+4, lus dans les descriptions de projets.
- Jaune acide d'origine abandonné (contraste) ; logo PNG non repris (wordmark texte).
- Leçon proposée : data/usage/test-3/lecons-proposees/novobel.md.
