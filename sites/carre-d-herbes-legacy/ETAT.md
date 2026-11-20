# ETAT · carre-d-herbes · legacy · construction phase 1/3 (20/11/2026)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.txt`), approche conservée, deal/draw/scaffold Solstice (long-light), stamp, `DESIGN.md` (Picks, Approche, Composants, checklist), deux comps (`comp.md`).
- Contenu réel dans `src/data/site.ts` (menus, horaires, actualités, avis, citation), 13 photos client en WebP dans `public/photos/`.
- 9 pages statiques : accueil, le-restaurant, nos-menus (Switcher, tous panneaux visibles sans script), fetes-2026, actualites, contact, reservations (formulaire `data-endpoint=""`), bon-cadeau, 404. Nav, colophon, KywFooter sur chaque page.
- Build OK : `dist/carre-d-herbes/legacy/`.

## Reste (phases 2 et 3)
- Rendu navigateur : `sloplint --render`, contraste, fold 1280x800, mobile 375 (menu `<details>`, rangées empilées), tailles tactiles 44 px.
- Reveal unique éventuel, états des boutons (8 états), validation du formulaire, RAPPORT.md, entrée finale du Sweep.
- Retaper `comp.md` : captures c1/c2 écrasées (même nom de sortie), à refaire séparément.
- `og.jpg` et données structurées JSON-LD absents (pas de GPS : ne pas en inventer).

## Décisions et hypothèses
- Posture Poster gardée (le draw proposait Ledge) ; nav barre bord à bord (le draw proposait pilule flottante) ; pied colophon pris du draw.
- Sous-pages de menus fusionnées dans `/nos-menus/` et `/fetes-2026/` ; page « On recrute » supprimée (`dropped`, l’offre de juin 2025 reste en actualité, à confirmer) ; case newsletter supprimée (gate 85) ; bandeau cookies supprimé ; IBAN de la page « à emporter » non repris.
- Accord mets-vins 69, 89, 113 € repris de `donnees.json`. Citation Zeldin reprise avec casse de phrase (reworded).
- Aucun placeholder, aucune donnée fictive. À vérifier : avis de Stéphane Materne (repris mot pour mot), usage des photos de plats issues de Facebook, note Gault&Millau non affichée (à confirmer).
- Pas de carte (GPS inconnu) ; adresse en texte.
- `sloplint src` : FAIL 34 sur Base.astro = faux positif (clip dans base.css) ; rendu non exécuté.
