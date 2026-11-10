# Révision 1 · Le Grill des amiS · awwwards

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F0 | aucun | - | - |
| F1-1 | corrigé | `src/motion/menu.ts` : prochain jour ouvert sur 7 jours, « Fermé, rouvre demain/jeudi à 12 h » | simulation de 5 horloges (mardi 12 h, lundi 23 h, samedi 23 h : jeudi, jeudi, lundi) ; rendu réel « Fermé, rouvre jeudi à 12 h » à 1440 et 390 px |
| F1-2 | corrigé | `src/data/site.ts`, `src/pages/index.astro` : « à vue de la salle » et phrase gril/chambres retirés | grep `dist/` : 0 occurrence |
| F2-1 | corrigé | `src/styles/site.css` : en-tête `background: #14100e` opaque | `backgroundImage: none` mesuré |
| F2-2 | corrigé | `public/og.png` recomposé (photo de braise, nom, baseline, sans interface), 1200x630 | fichier régénéré (37 Ko) |
| F2-3 | corrigé | `index.astro` : « La terrasse est devant le restaurant, rue Saint-Joseph. L’intérieur est climatisé. » | grep 0 « Quelques tables » |
| F2-4 | corrigé | `site.css` : `.tete__marque { min-height: 2.75rem }` | hauteur mesurée 44 px à 1440 et 390 px, scrollWidth = largeur |
| F3-1 | corrigé | « Ouvert jusqu’à 14 h » | rendu |
| F3-2 | corrigé | `Base.astro` : `priceRange` retiré | grep 0 |
| F3-3 | corrigé | canonical absent sur la 404 | grep 0 dans 404.html |
| F3-4 | corrigé | `.plat__prix small { white-space: nowrap }` | non capturé (hypothèse) |
| F3-5 | corrigé | « la côte à l’os » seulement | grep 0 « hampe, onglet » |

Build `pnpm build:site` : OK. Pas de changement de DESIGN.md. Non fait : capture visuelle de l'en-tête sous contenu (opacité mesurée par CSS), commit non effectué.
