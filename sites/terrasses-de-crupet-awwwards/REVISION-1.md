# Révision 1 · Les Terrasses de Crupet · awwwards
Hypothèse : F3 hors périmètre (révision ciblée F0, F1, F2). F2-4 (vignettes) non traité : voir tableau.

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 | corrige | `.brand__name` en visually-hidden sous 560 px au lieu de `display: none` (`src/styles/base.css`) ; nom visible inchangé en desktop | axe `link-name` : 0 sur 5 pages à 390 et 360 px ; 0 débordement à 1440/390/360 |
| F1-2 | corrige | `tabindex="0"` + `aria-label="Terrasse, salle, bar"` sur `ul.trois__row` (`src/pages/index.astro`), sans `role="region"` (évite `listitem`) | axe 0 violation sur home à 390 px |
| F2-1 | corrige | `.split-line-mask { padding-top: .2em; margin-top: -.2em }` (`src/styles/engine.css`) : le masque `overflow: clip` de SplitText rognait l'accent ; vaut pour tous les titres scindés | capture clip 1440 et 390 : « À la carte » avec accent |
| F2-2 | corrige | `.site-footer` passe de `<footer>` à `<section aria-label="Contact">` (`src/layouts/Base.astro`) ; paquet `kyw-footer` intact | 1 seul `<footer` par page dans dist ; axe 0 violation sur 5 pages x 3 largeurs |
| F2-3 | corrige | a-propos : « Parking et accès : informations non communiquées. » ; reservation : même mention, « ou par e-mail » retiré de la description, formulaire « Écrire » supprimé (adresse e-mail conservée) ; CSS `.mailto` retirée | grep de dist : 0 « ou par e-mail », « renseignez », « stationnement », « Ouvrir mon e-mail » |
| F2-4 | reporté | non traité dans ce passage (budget ; touche `src/data/site.ts`) : à reprendre | n/a |

Compte : corrigés 5, refusés 0, impossibles 0, reportés 1 (F2-4). Publiable : oui sous réserve de F2-4 (mineur) et des F3.
