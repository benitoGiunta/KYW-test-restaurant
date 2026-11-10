# Révision 1 · Le 54 awwwards (ciblée F0, F1, F2)

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `src/styles/site.css` : `.mur picture { display:block; width:100%; height:100% }` | Playwright, accueil et carte à 1440, 768, 390 px : chaque `img` dépasse son `figure` de +13 à +29 px en largeur et +10 à +36 en hauteur (scale 1.04), donc couvre le cadre sans vide ; `scrollWidth` = fenêtre |
| F2-1 | corrigé | `index.astro` : « La salle, tables dressées. » | grep `dist` : 0 « le soir » |
| F2-2 | corrigé | `site.ts` (fin du paragraphe retirée), `histoire.astro` (titre « En cuisine. », texte « La carte suit les saisons et se renouvelle souvent. ») | grep `dist` : 0 « Le geste avant » |
| F2-3 | corrigé | `Footer.astro` (« et le samedi midi », « Créneaux à confirmer »), `reservation.astro` (« Créneaux à confirmer ») | grep `dist` |
| F2-4 | corrigé | `photos.ts` : alts d'après les `sujet` (bols : « purée et copeaux » ; tartare sans caviar) | relecture |
| F3-1 | corrigé en passant | `site.ts` typeCuisine « Cuisine de saison et de marché » | build |
| F3-2 | partiel | occurrences réduites de 8 à 6 (histoire x2 retirées) ; « trente-quatre » en `.nw` au chapeau de réservation | build |
| F3-3 | non traité | hors liste F0 à F2 | passe 2 |

Build : `pnpm build:site` passe (5 pages). Aucun changement de DESIGN.md.
