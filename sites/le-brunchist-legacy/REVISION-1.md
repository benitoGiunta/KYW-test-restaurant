# Révision 1 · Le Brunchist · legacy (révision ciblée)

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `Carte.astro` : « Plats cités par des sources tierces, au salé, au sucré et au verre. » | grep dist : 0 « citent le plus », nouvelle phrase présente |
| F2-1 | corrigé | `Base.astro` : JSON-LD + `image` (photo hero) et `openingHoursSpecification` (mercredi à dimanche 09:30-15:30, depuis `horaires`) | extrait JSON-LD du dist |
| F2-2 | corrigé | `Pied.astro` : `<footer class="mast">` devenu `<section aria-label>` ; seul le footer de `kyw-footer` reste | grep dist : 1 `<footer` sur index.html et 404.html (axe non relancé, pas de QA complète) |
| F2-3 | corrigé | `site.ts` : « Wendy S. » ; `Presse.astro` : « en anglais, illustratif » ajouté à la source | grep dist : 0 « Sajid », mention présente |
| F3-1 | corrigé | `Pied.astro` : « (à confirmer) » après les horaires | grep dist |
| F3-2 | corrigé | `Horaires.astro`, `Carte.astro` : espace insécable avant « : », point final dans le `.fill` | source |
| F3-3, F3-4, F3-5 | non traités | hors liste F0-F2 ; F3-5 déjà waivé (sloplint WAIVED 59) | sloplint : 0 FAIL, 2 WARN (lazy hors LCP), 1 WAIVED |

Build : OK (`pnpm build:site`). Aucune décision de design changée, DESIGN.md inchangé. Serveur de test (port 4893) arrêté.
Hypothèse : genre sloplint `editorial` (lu dans DESIGN.md).
