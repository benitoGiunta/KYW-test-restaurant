# Révision 1 · Li Micougni · legacy

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 | corrigé | `src/styles/page.css` : `.bento__lead` et `.bento__lead2` sans `aspect-ratio` forcé ni `min-height: 100%` (la cellule de grille fixe la taille) | mesure Playwright 1440 px : saumon 864×1072 (x 64), viande 864×1072 (x 512), vignettes 416×520, aucun recouvrement, scrollWidth 1440 ; planche vérifiée à l'œil |
| F2-1 | corrigé (cause = F1-1 + image paresseuse) | `vitrine-du-restaurant.astro` : première image `priority` (eager) | LCP mobile (×4, 4G lente) 992 ms et 992 ms en deux passes en série (4484 ms avant) |
| F2-2 | corrigé | `vitrine-du-restaurant.astro` : title « les plats en photos », méta sur les plats, chapeau sans promesse de nouveautés, H2 « Les plats en photos » | grep dist : 0 occurrence de nouveautés / coulisses / salle en photos |
| F2-3 | corrigé | `page.css` : `.foot a, .link, .lieu a` en `inline-flex` `min-height: 24px` ; lien de crédits en `inline-block` + `padding-block: 3px` | mesure à 390 px sur accueil, contact, vitrine : 0 lien sous 24 px |
| F2-4 | corrigé | `page.css` (≤ 60rem) : 4e et 6e vignettes en pleine largeur | mesure à 390 px : plus de cellule seule (velouté et plat en bol 358×269) |

Hypothèse : le chapeau d'origine du site client promet des « nouveautés » ; le finding demande du neutre, donc retiré. DESIGN.md inchangé. sloplint : 0 FAIL. Non traités (F3) : F3-1 à F3-6.
