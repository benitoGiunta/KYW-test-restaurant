# REVISION-1 — le-lodge-wepion (awwwards)

F0 : aucun. Hypothèse : les 5 findings F1/F2 sont traités ; F2-5 déjà corrigé dans le paquet (`#55646a`, ~5,7:1 sur #fbfaf8), non modifié.

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 | corrige | `src/data/site.ts` reperes[0] : « L’Italien, tartare de bœuf » (24 €, garnitures de `donnees.json`) | grep `dist/index.html` : 1 occurrence |
| F1-2 | corrige | `site.ts` `reouverture: 'envisagé fin 2026…'` | grep `envisagée` sur dist : 0 |
| F2-1 | corrige | `carte.astro` `.mur` `tabindex="0"` + `:focus-visible` (`site.css`) | Playwright 390 px : focus() atteint `.mur` ; scrollWidth 390 |
| F2-2 | corrige | `carte.astro` : « La carte du relais d’Erpent n’est pas connue… » | grep `demandez-la` : 0 |
| F2-3 | corrige | `site.css` `@media (max-width:40rem) .entete p {grid-column:1/-1}` | largeur du chapeau 350 px sur 390 (avant ~180) |
| F2-4 | corrige | `carte.astro` : intro et pied de carte sans décompte ni date de collecte | grep `Quatre-vingt|diaporama` : 0 |
| F2-5 | déjà fait | paquet `kyw-footer` : `#55646a` déjà en place | lecture du CSS |

Non vérifié : axe complet (laissé à la revue suivante). Site publiable : oui.
