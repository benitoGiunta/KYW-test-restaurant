# ETAT · Don Dino legacy · phase 1 (construction-1)

## Fait
- Audit (AUDIT.md), deal Squeeze, draw 16177b, scaffold, stamp, comps c1/c2 (c1 choisi), DESIGN.md, comp.md.
- Contenu : `src/data/site.ts` + `src/data/carte.json` (115 plats, 12 rubriques, tirés de donnees.json, apostrophes typographiques).
- 6 routes + 404 : accueil (hero Index, horaires, pile Du four à la table, rubriques de carte, pile La salle et le bar, réservation), /carte/ (115 plats), /reservations/ (formulaire illustratif `data-endpoint=""`, lien vers la demande en ligne d'origine), /groupes/, /a-propos/, /contact/.
- Photos en WebP 800/1600 dans `public/photos/`, logo PNG recoloré en blanc chaud par masque CSS.
- Build : `pnpm build:site sites/don-dino-legacy` passe, 6 pages, `dist/don-dino/legacy/`. KywFooter, noindex, mention présents sur chaque page.

## Reste (phases 2 et 3)
- Nav mobile (pour l'instant rangée de pastilles défilante), états des contrôles et du formulaire, jour courant (`data-today` via script), un reveal au plus.
- Aucun contrôle en navigateur fait : sloplint --render, captures 1440 et 375, contraste, tailles tactiles (44 px), débordement horizontal, sticky des piles à vérifier ; tuile « Sur place » dans `.stack__shots` à équilibrer à 1440.
- RAPPORT.md, DESIGN.md § Sweep, trois questions de comp.

## Décisions et hypothèses
- Thème Squeeze (vert) : rappelle le vert du logo ; logo recoloré en blanc chaud (le rouge du logo disparaît, remplacé par la pêche des contrôles).
- h1 réduit à 7 mots (`reworded`, gate 58). Bandeaux cookies, avertissement navigateur, FR/EN/NL, newsletter : `dropped`. Recrutement : lien externe vers dondino.be/fr/jobs dans le pied.
- Hero : Index (draw) ; nav « search-led » remplacée par bord à bord (pas de recherche).
- Écart à confirmer : le site annonce « 20 pizzas à partir de 9,30 € », la carte PDF en liste 26 de 10,50 à 17,80 € ; la maquette suit la carte PDF.
- Presse : seulement les noms Petit Futé et L'Avenir, titres marqués `data-placeholder`. Desserts et boissons absents : mention « demandez à la salle » sur /carte/ à vérifier.
- Photo « homme tenant une pizza » : alt neutre, personne non nommée.
- Aucun avis, note ni chiffre inventé (7 j/7 et 115 plats viennent des données).
