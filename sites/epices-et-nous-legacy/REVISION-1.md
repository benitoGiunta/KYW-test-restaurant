# Révision 1 · Épices & Nous · legacy (révision ciblée F0 à F2)

Aucun F0. F3 non traités (hors périmètre). Build : `scripts/q.sh revision-build pnpm build:site` exit 0.

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `index.astro` : « Parmi les classiques revisités : l’Américain maison et le hamburger gourmand » ; « La spécialité de la maison » devient « Notre plat signature » | grep « Aussi à la carte » dans dist = 0 |
| F2-1 | corrige (partiel) | `Base.astro` : `openingHoursSpecification` (mar-ven 12:00-13:45, mar-sam 19:00-20:30), `og:image` (table-1600.webp), twitter card large | grep dist : openingHoursSpecification et og:image présents. Canonical refusé : domaine de publication inconnu (maquette noindex) ; og:image en chemin relatif au site |
| F2-2 | corrige | `site.ts` : « 4 mai » et « 26 mars » suffixés « , date illustrative » ; `actusDatees` (entrées datées d’une année) utilisé par l’accueil | accueil sans les deux entrées ; /actualites/ : 2 mentions |
| F2-3 | corrige | vignette Plats de la carte : `viande` devient `scampis` ; hero réservation : `table` devient `verriere` ; hero menu : `saumon` devient `sauce` (même assiette que girolles) | build OK ; non capturé |
| F2-4 | corrige | `page.css` : `padding-block: 0.4rem` + `inline-block` sur `.close__liens a`, `.site-header .tel`, `.link` | Playwright 1440 : 0 lien < 24 px sur accueil, menu, carte, réservation ; scrollWidth 1440 |
| F2-5 | corrige | `menu.astro` : photo en 3/2, 52vw | hero menu 587 px (968 avant) à 1440x900 ; carte, réservation 587 |

Hypothèses : sloplint et capture visuelle non relancés (révision ciblée) ; le recadrage 3/2 des photos portrait `sauce` n’a pas été vérifié à l’œil. DESIGN.md inchangé. Publiable : oui, sous réserve de la revue suivante.
