# RAPPORT, epices-et-nous / portfolio (QA, phase 3)

## QA
- Source : `QA-build.md` (agent captures) + vérifications ciblées de cette passe. Aucune correction de code nécessaire.
- Accueil et menu : 0 erreur console, 0 requête en échec, 0 violation axe, CLS 0, pas de débordement, LCP mobile ralenti 1320 / 1188 ms. Planche d'accueil lue : hero, chiffres, galerie, pied de page avec mention KYW, mobile (menu, cartes, pied) cohérents.
- « 404 » du rapport (1 violation `color-contrast`) : réponse brute de `serve.mjs`, pas la page du site (faux positif connu). Vérifié sur `/epices-et-nous/portfolio/404.html` : 0 violation axe, 0 erreur console, h1 « Rideau », `lang="fr"`, `noindex, nofollow`, mention KYW, en-tête et pied présents, scrollWidth = 1440.
- WARN audit : phrases répétées = horaires et phrase terrasse, volontaires (données du dossier) ; robots.txt présent dans `dist/` et sitemap-index.xml produit : faux positifs de l'audit sous `base`.
- Contrastes « à vérifier » (25 accueil, 11 menu) : texte sur photos/voiles, non résolus par axe ; lecture visuelle des planches correcte.
- Build final : `scripts/build-site.mjs sites/epices-et-nous-portfolio` exit 0, 7 pages, 404 présente.

## Placeholders
- E-mail : `placeholder: true`, valeur vide, aucun mailto affiché.
- Menu 52 € sans créneau, citation Gault&Millau sans date, mention Michelin sans année, 1999 = ouverture, boissons « à demander au restaurant » : hypothèses de la phase 1, issues du dossier, non inventées.
- Données ailleurs : `placeholder: false` (prouvées par le dossier).

## Points ouverts
- Défauts à reporter dans `gabarits/velours/` (protégé, non touché) : z-index des photos d'onglets, `capitalize` sur `.horaires dt`, chiffres 4 caractères sans plafond mobile, `data-reveal` sur blocs à liens.
- `gabarits/UTILISATION.md` : ajouter `velours | epices-et-nous`.
- `pnpm index` et commit `[publier]` en fin de restaurant : non faits ici.

## Leçons structurelles
- Voir `data/usage/test-1/lecons-proposees/epices-et-nous.md`.
