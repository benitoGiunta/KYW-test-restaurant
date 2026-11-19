# ETAT : pizzeria-doria-portfolio (fin de la phase 1 sur 3, passe construction-1)

## Fait
- Gabarit guinguette copié (hors gabarits/), adapté : DESIGN.md (matrice et décisions), `src/data/site.ts` + `carte.json` (181 lignes réelles), tokens, objets pizza/basilic/tomate, filet tricolore.
- Pages : accueil, carte, vins, histoire (la maison), emporter, reservation, 404 (terrasse supprimée). Footer du site en `<section aria-label>` (un seul `<footer>`, celui de kyw-footer).
- Photos WebP (8) + variantes `s/` + OG + favicon. Build OK (`scripts/q.sh build node scripts/build-site.mjs sites/pizzeria-doria-portfolio`), noindex, mention Maquette et un seul logo KYW vérifiés par grep sur les 6 pages.

## Reste (phases 2 et 3)
- QA navigateur : table à tirages (8 au lieu de 12, positions `x/y` à vérifier), hero (6 objets), carrousel/rail mobile, liste longue en deux colonnes, marquee, loader (pizza), débordements 320 à 390, contrastes (encre sur #ea5a43, texte #b8301f sur lin).
- Vérifier `setup.ts` sans section `[data-avis]` (supprimée) et le badge « attrapez-moi ».
- Tirages : légende « photo libre » à contrôler ; RAPPORT.md ; sloplint ; mesure LCP.
- Option : script du logo en titrage, vrai logo vectoriel.

## Décisions et hypothèses
- Réservation par téléphone seulement (outil en ligne « à confirmer » au dossier). Pizzy = commande à emporter. Aucun avis, aucune note d'agrégateur affichée.
- Adresse du site retenue (66) contre 95 chez des tiers. Commune affichée « Malonne (Namur) ».
- Placeholders : 4 photos libres Unsplash (pizza coupée, basilic, pâte, burrata), marquées illustratives. Aucune autre donnée inventée.
- Suggestions de novembre 2026 en constante datée (affiche de la modale d'accueil).
- `gabarits/UTILISATION.md` non mis à jour (protégé) : à ajouter « guinguette : pizzeria-doria ».
