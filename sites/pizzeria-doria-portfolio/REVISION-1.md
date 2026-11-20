# Révision 1 · Pizzeria Doria portfolio (liste F0, F1, F2 de REVUE-1)
Bilan : 8 corrigés, 0 refusé, 0 impossible. Aucun F0. Les F3-5 (JSON-LD `acceptsReservations: null`) et l'apostrophe de `histoire[1]` ont été faits au passage ; les autres F3 non traités.

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 nav mobile | corrige | `Header.astro` : « Accueil » masqué sous 768 px (le logo y mène), libellés courts (Vins, Maison, Emporter) ; `base.css` : gap 0, padding réduit, bloc `max-width: 359px` | `nav` scrollWidth = clientWidth à 390 (332) et 360 (332) ; 320 px : 256 = 256 ; 5 liens visibles, `doc.scrollWidth` = fenêtre ; capture /histoire/ 390 px |
| F1-2 bandeau | corrige | `motion/setup.ts` : « Ouvert jusqu'à X » | `page.clock`, contexte New York : lundi 12 h 30 → « Ouvert jusqu'à 13 h 30 » ; vendredi 21 h 45 → « Ouvert jusqu'à 22 h » ; mardi inchangé ; 0 « arrivée jusqu » dans dist (html et js) |
| F2-1 réservation | corrige | `Marquee.astro`, `Footer.astro`, `reservation.astro` (lead, meta description) : « Réservation : +32 81 44 44 08 » ; commentaire `site.ts` : mode en ligne à confirmer | grep dist : 0 « Réservation par », 0 « par téléphone » hors /emporter/ (commande, source dossier) ; 0 `acceptsReservations` |
| F2-2 horaires répétés | corrige | `Footer.astro` : tableau remplacé par « Fermé le mardi et le mercredi » + lien `/reservation/#horaires` (id ajouté) ; `emporter.astro` sans note de cuisine | « Cuisine fermée » : 1 occurrence sur / et /reservation/, 0 ailleurs |
| F2-3 histoire = accueil | corrige | `index.astro` : une phrase + lien ; `site.ts` : retrait « de pâte et de four, racontée sans chichis » ; `histoire.astro` : chapeau propre (plus la baseline copiée) | grep dist : 0 occurrence des deux expressions ; plus de paragraphe commun accueil/histoire |
| F2-4 cartes vides | corrige | `histoire.astro` : picto `membre__sans` retiré, cartes textuelles compactes | 0 `membre__sans` dans dist |
| F2-5 eyebrow + italique | corrige | eyebrows retirés (accueil x4, réservation) ; italiques retirés sur 6 titres ; restent le manifeste (accueil), « de famille » non italique, 404, carte/vins (non listés) | grep dist : `class="meta"` 1 (404), `<em>` 2 (carte, vins) |
| F2-6 texte non prouvé | corrige | `site.ts` : « pizzas et antipasti » ; `index.astro` : lien « Voir comment commander » | grep dist : 0 « grande tablée » |

Hypothèses : « Fermé le mardi et le mercredi » du pied vient du tableau d'horaires du dossier ; le chapeau de /histoire/ ne reprend que des faits du dossier (famille, Malonne, ancienne banque). Build final : `scripts/q.sh revision-build pnpm build:site` vert. DESIGN.md inchangé (décisions de design conservées : tricolore, pictos, scène).
