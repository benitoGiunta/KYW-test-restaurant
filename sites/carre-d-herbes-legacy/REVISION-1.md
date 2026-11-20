# Révision 1 · Carré d'herbes · legacy
Hypothèse : la revue ne contient ni F0 ; F1-1, F1-2 et les F2 sont traités, les F3 hors liste.

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 prix coupé /fetes-2026/ | corrigé | `fetes-2026.astro` : grille 7fr/5fr, prix scindé en deux lignes ; `page.css` `.row__p--multi { white-space: normal }` | mesure Range vs conteneur : 0 débordement à 390 et 1440 px |
| F1-2 « mercredi au dimanche » | corrigé | `reservations.astro` : « du jeudi au dimanche » + format « jj/mm/aaaa » (couvre F3-4) | texte mesuré dans `#date-h` |
| F2-1 erreur 404 console | corrigé | `public/favicon.svg` + `<link rel="icon">` dans `Base.astro` | 0 erreur console sur 4 pages x 2 largeurs |
| F2-2 horaires coupés | corrigé | `site.ts` `h()` : `replaceAll` (seule la 1re espace était insécable) ; `.schedule time { nowrap }` | 0 plage sur plusieurs lignes à 390 px |
| F2-3 SEO | corrigé | `public/og.jpg` 1200x630 (hero), balises og/twitter, JSON-LD Restaurant sans geo dans `Base.astro` | 1 bloc ld+json dans index.html, og.jpg dans dist |
| F2-4 cible tactile téléphone pied | corrigé | `.colophon .c1 p a { inline-block; min-block-size 24px }` | hauteur mesurée 31 px (avant 17) sur 4 pages |

Non traités (hors liste) : F3-1, F3-2, F3-3. Sloplint et axe non relancés (modifications limitées). Build : OK.
