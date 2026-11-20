# RAPPORT : carre-d-herbes / portfolio (phase 3 QA, 20/11/2026)

## Placeholders
Aucun. Données illustratives signalées par la mention « Maquette KYW » sur chaque page.

## QA (captures ciblées, pas de shoot complet : le `--crawl` de l'agent captures s'était bloqué sur l'accueil)
- Mesure Playwright, 7 pages x (1440, 390) : 0 erreur console, 0 requête en échec / 4xx, 0 image cassée, 0 débordement horizontal, 1 h1, `noindex, nofollow`, mention Maquette KYW présente.
- Planche accueil de l'agent captures lue : hero, sections, galerie, pied, transitions OK.
- Bas de page (fenêtre) fêtes 1440, fêtes et histoire 390 : bandeau KYW + mention visibles.
- Corrigés : (1) libellé « Du Lundi Au Mercredi » (text-transform: capitalize) devenu « Du lundi au mercredi » (`::first-letter`) ; (2) colonne horaires du pied de page trop étroite en 1440 (texte sur 4 lignes) : grille 1,1/1,7/0,9/0,9 dès 1000 px. Vérifié par capture de /fetes/.
- Non refait : audit.mjs, axe, LCP/CLS (non mesurés), clavier complet, reduced motion (testés en phase 2).

## Points ouverts
- G&M 13,5 vs 14/20 (source divergente), Tripadvisor non repris, e-mail et GPS inconnus, photos de plats Facebook « usage à confirmer ».
- Fêtes 2026 à retirer après le 31/12. `gabarits/UTILISATION.md` à mettre à jour (protégé).
- Le shoot `--crawl --nav` se bloque sur l'accueil (boucle à localiser dans shoot.mjs).
