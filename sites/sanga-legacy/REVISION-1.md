# Révision 1 · sanga legacy (F2 seulement, revue 1 sans F0/F1)

| id | décision | changement | preuve |
|---|---|---|---|
| F2-1 | corrige | `Nav.astro` : 6 ancres en `${base}#…` | dist 404.html : `href="/sanga/legacy/#carte"` |
| F2-2 | corrige | `Nav.astro` : `aria-label` retiré de `.nav__brand` | grep dist : 0 occurrence ; nom accessible = texte visible |
| F2-3 | corrige | `Pied.astro` : `footer.pied` devenu `section aria-label` | 1 seul `<footer>` dans dist/index.html (celui de kyw-footer) |
| F2-4 | corrige | `page.css` : bloc ≤ 22,5 rem (gap, padding nav, padding tableau, th auto) | Playwright 320 px : scrollWidth 320, table.right 304, bouton Menu right 304 ; 390 : 374 ; 1440 OK |
| F2-5 | corrige | `Pied.astro` : crédit neutre « Photographies : sanganamur.be. » | grep source |
| F2-6 | corrige | `Base.astro` : `openingHoursSpecification` (mar-dim 12-14 et 18-22) + `image` | `grep -c openingHours` = 1 dans dist |
| F3-1 | corrige (bonus) | `.adresse__tel a` inline-flex, 44 px ; survol ajouté (F3-2) | mesure : hauteur 44 px |
| F3-3 | corrige en partie | « Livraison gratuite. » retiré du lead | grep dist : 0 |
| F3-4 | partiel | 3 photos inutilisées supprimées de `public/photos` ; twitter:card et WOFF2 non traités | dist/photos : 2 fichiers |

Non fait : sloplint non relancé (changements de contenu minimes, hors passe ciblée). DESIGN.md inchangé.
Hypothèse : crédit photo neutre plutôt que légende « illustrative ».
