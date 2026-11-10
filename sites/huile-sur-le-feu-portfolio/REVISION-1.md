# Révision 1 · huile-sur-le-feu · portfolio (ciblée F1, F2)

| id | décision | changé | preuve |
|---|---|---|---|
| F1-1 | corrige | `histoire.astro` : bloc `.media--vide` supprimé (nom + rôle sous un filet, `base.css` `.equipe li`) | hauteur de la fiche 68 px (1440) et 53 px (390), capture 1440 |
| F2-1 | corrige | parenthèses internes retirées (`histoire`, `boutique`, `carte`, `huiles` : « huile de la maison ») | grep dist : 0 occurrence |
| F2-2 | corrige | horaires de boutique remplacés par « Horaires du restaurant, affichés en bas de page », eyebrow supprimé, « coffrets » retiré de la description | grep dist |
| F2-3 | corrige | ligne des Pouilles réécrite sans « table de famille » ; portrait retiré de la galerie (3 images, `.galerie--3`) | galerie 3 figures, sans débordement |
| F2-4 | corrige | `role="text"` sur `.citation` | axe serious/critical : 0 sur accueil, histoire, réservation, boutique, 1440 et 390 |
| F2-5 | corrige | liste des horaires retirée du composant `Acces` (frise + pied conservés), `.plan` en une colonne | grep dist ; scrollWidth = largeur |
| F2-6 | corrige | eyebrows : 1 par page (2 sur accueil et réservation avec la frise), numéros 01-06 retirés de 3 listes | comptage dans dist |

Bonus F3 : « Voir le plan » (F3-3). Non traités : F3-1, F3-2, F3-4, F3-5, F3-6.
Hypothèse : `role="text"` accepté par axe 4.x (0 violation mesurée). DESIGN.md inchangé.
