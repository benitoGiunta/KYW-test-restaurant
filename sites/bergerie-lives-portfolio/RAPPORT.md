# RAPPORT : bergerie-lives portfolio (QA, 27/11/2026)

Gabarit Velours requalifié en maison d'hôtes / domaine de mariage (voir DESIGN.md). Build : 7 pages, `dist/bergerie-lives/portfolio/`.

## QA (captures de l'agent « captures » + vérifications ciblées)
- Console 0 erreur, 0 requête en échec, 0 débordement, CLS 0, 60 fps, LCP mobile max 1,4 s, clavier sans blocage, mouvement réduit OK.
- axe : 0 violation sur accueil et chambres ; 1 sur la 404 (contraste de `.kyw-footer__note`, 4,36:1). Corrigé par surcharge locale (`#566368`, `src/styles/base.css`) ; présent dans le CSS du build.
- Planche accueil lue (bureau + mobile) : hero, chapitres, galerie N&B, pied de page KYW et mention visibles. Chiffre « 20 » du chapitre piscine vérifié en capture mobile ciblée : affiché (la planche l'avait saisi en cours de défilement).
- Faux positifs non corrigés : `skipLinkFirst: false`, WARN sitemap/robots, 404 brute de serve.mjs, « 21 contrastes à vérifier » (axe incomplete, texte sur photo, sans violation).
- WARN audit : phrases répétées sur /chambres/ (accroche reprise en chapô et corps) : conservées, acceptables.
- Cible tactile 128x20 sur la 404 (lien dans le texte) : tolérée (lien en ligne).

## Placeholders
Offre « Événement privé » (texte), formules de séminaire, tarifs des chambres, capacité (150 ou 250 à confirmer), « chambres sur place » et « véranda » à confirmer. Non affichés car non prouvés : avis, Booking, réseaux, GPS, nombre de chambres, prénoms des propriétaires.

## Points ouverts
- Curseur « Voir » de la galerie N&B sans lightbox (à renommer ou retirer).
- `pnpm index`, `gabarits/UTILISATION.md` et reports des défauts Velours dans `gabarits/velours/` : à faire par la session mère.
- Pied de page KYW : corriger le contraste à la source (`packages/kyw-footer`).

## Leçons structurelles
Proposée dans `data/usage/test-3/lecons-proposees/bergerie-lives.md` (contraste de la note du pied KYW).
