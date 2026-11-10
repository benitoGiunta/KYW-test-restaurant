# Révision 1 · Makimono awwwards

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `reservation.astro` (libellé « Écrire un e-mail »), `site.css` (`.reserver__cta > *{min-width:0}`, bouton `white-space: normal`, `overflow-wrap`) | scrollWidth = clientWidth à 320, 360 et 390 px (réservation et accueil) ; le 2 px restant à 320 venait de `.liens-commande`/`.texte`, corrigé aussi |
| F2-1 | corrigé | `Header.astro` (« Contact »), `reservation.astro` (h1 « Contact », title « Nous joindre et venir », intro et description sans « réserver »), `index/a-propos/Footer.astro` (« Nous joindre et venir »), `a-propos.astro` (« page Contact ») | grep `Réserver` dans `dist/` : 0 |
| F2-2 | corrigé | `carte.astro` : phrase sur les allergies retirée | grep « se signalent au chef » : 0 |
| F3-1 | corrigé | `site.css` `text-transform: none` ; `Footer.astro` « , le soir » | pied mesuré : « lundi au samedi », « dimanche, le soir » |
| F3-3 | corrigé (imports) | `photos.ts` : 4 imports et entrées retirés | 0 JPEG dans `dist/_astro` ; og.png non recompressé (hors liste) |
| F3-4 | corrigé | `a-propos.astro` : « Ce que la carte indique » | grep |
| F3-2, F3-5, F3-6 | non traités | hors liste F0 à F2 | |

Décisions de design inchangées. Hypothèse : le nom de page `reservation` (URL) est conservé pour ne pas casser les liens.
