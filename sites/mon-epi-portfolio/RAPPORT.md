# RAPPORT mon-epi, variante portfolio (QA, phase 3)

## Placeholders
Aucun (`placeholder: true` nulle part). Rien d'inventé : avis cités avec auteur et source, horaires du vendredi seuls publiés, autres jours « à confirmer ».

## Shoot / audit (agent captures, QA-build.md)
- 0 FAIL audit, 0 erreur console, CLS 0, axe : 0 violation sur accueil et pains, clavier et mouvement réduit propres.
- Faux positifs ignorés : 404 brute de serve.mjs (contraste, cible 128 x 20 px, sans h1) ; la vraie `404.html` répond 200, titre « Page introuvable | Monepi », 1 h1 ; WARN robots/sitemap sous `base`.

## Corrections de cette passe
1. Défilement horizontal réel en mobile (scrollX possible) : accueil 424 px de large à 390 (tampon rouge, timbres), points-de-vente 398 (polaroid). Corrigé : `html { overflow-x: clip }` et tampon à retour à la ligne sous 600 px. Vérifié à 320 px sur les 6 pages : scrollWidth = 320, scrollX = 0.
2. Points-de-vente : phrases répétées 4 fois (WARN audit). Retirées des cartes, une seule phrase sous la grille. Capture 390 px vérifiée.

## Points ouverts
- Survol « couleur seule » (3 à 4 cas) : signalé par l'audit, non corrigé (états focus et active présents).
- Contraste vert épi sur kraft : axe 0 violation, mais 79 à 140 contrastes non calculables (fonds à texture) : à voir à l'œil par le réviseur.
- `pnpm index` et publication laissés à la session mère ; `gabarits/UTILISATION.md` à mettre à jour par elle.

## Leçons structurelles
- `scrollWidth` du gabarit cahier dépassait en mobile à cause d'éléments inclinés : `html { overflow-x: clip }` à intégrer au gabarit (non touché, gabarits/ protégé).
