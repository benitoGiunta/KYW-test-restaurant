# Révision 1 · Le Panorama (awwwards)

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `.final__mur` : `role="group"`, `aria-label="Photos du lieu"`, `tabindex="0"`, contour de focus (`index.astro`, `site.css`) | grep dist/index.html : attributs présents (axe non relancé) |
| F2-1 | corrigé | héros : « (à confirmer) » ajouté (`index.astro`) | grep dist : 1 occurrence |
| F2-2 | corrigé | mur final : platanes et salle remplacés par tableVerres (12) et longueTable (11) (`index.astro`) | lecture du code, build OK |
| F2-3 | corrigé | U+00A0 avant `: ; ? !` et dans « » (`site.ts`, `index.astro`, `reservation.astro`, `histoire.astro`, alt `photos.ts`, `Footer.astro`) | grep dist : plus de « lettre espace : » dans le texte visible |
| F3-3 | corrigé | « devant les baies vitrées » retiré (`site.ts`) | grep dist : absent du texte La salle |
| F3-1, F3-2, F3-4, F3-5 | non traités (hors périmètre F0 à F2) | | |

Limites : pas de capture ni de nouvelle mesure axe (révision ciblée, vérifications par grep). Hypothèse : le mur final sur fond nuit garde la couleur de focus `--c-nuit-accent`.
