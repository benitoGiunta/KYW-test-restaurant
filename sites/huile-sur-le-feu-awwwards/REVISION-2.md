# Révision 2 · L'Huile sur le Feu (awwwards)

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 titre « Venir rue de Marchovelette » coupé à 1024/1100 | corrige | `src/styles/site.css:87` : `@media (min-width: 821px) and (max-width: 1279px) { .paire__texte--g { grid-column: 1 / 8; } }` (colonne élargie, l'image reste en 8/13) | Playwright (0 `.split-line-mask` avec scrollWidth > clientWidth + 2) sur 4 pages x 1024, 1100, 1180, 1280 : réservation sans écart. Rebuild via q.sh OK. |
| F3-1, F3-2, F3-3 | non traités (hors liste F0/F1/F2 de cette passe) | | |

Hypothèse : tolérance de 2 px (arrondis sous-pixel, sinon 27 faux positifs de 1 px).
Reste observé hors périmètre : accueil, « Les menus et les heures » (3 px à 1180 et 1280) et « étagères » (3 px à 1180), probable débordement d'italique de 3 px à surveiller en revue.
