# Révision 1 · sanga · awwwards

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F0 | aucun | - | - |
| F1-1 | corrigé | page `reservation` renommée `venir` (`pages/venir.astro`) : titre « Venir », description, chapô « pas de réservation en ligne : on vient, on appelle ou on commande », phrase « appelez avant de venir » retirée ; `Header.astro` (nav « Venir », CTA « Appeler » en `tel:`), `Footer.astro`, `carte.astro` (« Horaires et accès ») | grep `dist/` : seul « ne propose pas de réservation en ligne » subsiste ; `dist/sanga/awwwards/reservation/` n'existe plus |
| F2-1 | corrigé | `a-propos.astro` : citation exacte « assez connu pour ses ramen », « la carte est la même » retiré, « Le prix ne change pas… » remplacé par « Chaque ramen se choisit en bouillon miso, shio ou shoyu, au même prix affiché » | grep dist |
| F2-2 | corrigé | `site.css` : `.tete__appel` masqué sous 340 px | scrollWidth <= largeur à 320, 360, 390 sur 4 pages (mesure Playwright) |
| F3-1 | corrigé | `404.astro` : `data-reveal` retiré | clip-path = polygon (crête) mesuré |
| F3-2 | corrigé | `Base.astro` : pas de canonical sur la 404 | grep : 0 canonical |
| F3-3 | corrigé | `site.ts` : « […] » et « (orthographe rectifiée) » | - |
| F3-5 | corrigé | `site.css` : `.tel-grand:hover` | couleur passe de washi à vermillon + souligné |
| F3-6 | corrigé | `site.ts` crédit « Photos du restaurant, origine à confirmer » | - |
| F3-7 | corrigé | `site.ts` note Donburi alignée sur le dossier | - |
| F3-4 | refusé (finition, hors liste F0-F2) | - | - |

Hypothèse : URL `/reservation/` supprimée (maquette noindex, aucun lien externe). 404 : og:url conservé.
