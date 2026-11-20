# RAPPORT : le-lodge-wepion / portfolio (QA, passe construction-3)

## Corrections
- Contraste du pied de page KYW (`.kyw-footer__note`, 4,36:1 sur fond clair, axe serious sur la 404) : couleur locale `#4f5b60` (`src/styles/base.css`), vérifiée en capture 1440 de la 404 (mention Maquette KYW et logo visibles).
- Méta description ramenée de 171 à 138 caractères.
- Texte « à confirmer par téléphone » (procédure non prouvée) remplacé par « à confirmer » dans l'encart Wine & More.

## Vérifications ciblées (build 01:25, serveur local arrêté)
- Nav à 1100 px (6 liens) : une ligne, sans débordement. 404 : h1 présent, page sans débordement.
- `.carte` de l'accueil à 360 : 16 à 344 px (le -9/369 était transitoire du reveal), pas de débordement à 360, 768, 1100, 1440.
- Pied de page à 360, 768, 1440 : mention « Maquette KYW, certaines données sont illustratives » et logo KYW visibles.
- Audit de la passe build : 0 FAIL, 15 WARN, tous des faux positifs ou sans suite (phrases répétées entre bandeau et pied, robots.txt/sitemap cherchés à la racine, description corrigée). 0 erreur console, 0 requête en échec.

## Placeholders
Aucun (`placeholder: true` absent). Données illustratives : accueil provisoire Erpent et réouverture à confirmer ; avis cités sans note ; aucun horaire publié.

## Points ouverts
- Cibles tactiles petites sur la 404 (1) et survols « couleur seule » (Pause) : mineurs, non corrigés.
- Défaut `.rail`/`.table__rail` à reporter dans `gabarits/guinguette` (protégé) ; `gabarits/UTILISATION.md` à mettre à jour par l'orchestrateur.
- `pnpm index` et commit `[publier]` laissés à l'orchestrateur.

## Leçons structurelles
Voir `data/usage/test-1/lecons-proposees/le-lodge-wepion.md`.
