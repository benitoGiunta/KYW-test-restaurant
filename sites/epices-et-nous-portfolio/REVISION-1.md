# REVISION-1 · Épices & Nous · portfolio (révision ciblée F1, F2)
| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `src/layouts/Base.astro` : titre « Restaurant à Erpent (Namur), menu 3 services à 52 € » | `<title>` et `og:title` de dist/index.html relus, plus de « Bistronomie » |
| F1-2 | corrigé | `src/styles/base.css` : centrage de la bande à partir de 1280 px (en dessous, défilement) | mesure : 1024, 1100, 1180 première vignette à 32-36 px, défilement possible (scrollWidth > clientWidth), page sans débordement ; 1280 propre |
| F2-1 | corrigé | `src/pages/index.astro` : `tabindex=0`, `role=region`, `aria-label` | axe 390 px : 0 violation `scrollable-region-focusable` |
| F2-2 | corrigé | `src/components/Footer.astro` : `<footer>` du site devenu `<section aria-label>` | axe accueil, carte, histoire, 404 : 0 `landmark-no-duplicate-contentinfo`, 0 `region` |
| F2-3 | corrigé | `src/pages/carte.astro` : « La carte des boissons n'est pas reprise sur cette maquette. » | texte dans le source |
| F2-4 | corrigé (légende) | `src/data/site.ts` : le texte de La terrasse précise que la photo montre la façade | texte dans le source |
| F2-5 | corrigé | `src/pages/404.astro` : h1 « Page introuvable », phrase « vous attend toujours » | h1 lu en Playwright sur 404.html |
| F2-6 | corrigé | `HeroPage.astro` + `base.css` : chiffre filigrane rendu par `::before { content: attr(data-valeur) }` | axe color-contrast : 0 sur carte et histoire à 1440 |

Hypothèse : F3 non traités (hors consigne). Corrigés 8, refusés 0, impossibles 0. Publiable : oui, sous réserve de la revue suivante.
