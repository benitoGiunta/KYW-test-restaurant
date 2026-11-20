# Révision 1 · legacy · Le D’Arville (ciblée F0-F2)

| id | décision | changement | preuve |
|---|---|---|---|
| F0 | aucun | n/a | n/a |
| F1-1 | corrige | `index.astro` : « Chasse, poissons et homard du vivier. » | grep « arrivages » dans dist : 0 |
| F2-1 | corrige | `chambres.astro` : légende « Une chambre colorée de la villa Barabas. » (alt déjà neutre) | grep « suite orientale. » : 0 |
| F2-2 | corrige | `Pied.astro` : `<footer>` devenu `<section aria-label>` | 1 seul `<footer>` sur 9 pages ; axe contentinfo/region/landmark-unique : 0 sur 8 pages x 1440/390 |
| F2-3 | corrige en partie | `Base.astro` : JSON-LD + `url`, `image`, `sameAs` (2 Facebook) ; pas d'`openingHoursSpecification` : le dossier ne donne aucune heure (« heures inconnues »), on n'invente pas | grep `sameAs` dans dist/index.html |
| F2-4 | corrige | `Pied.astro` prop `phrase` : la phrase géante n'apparaît que sur l'accueil (+ CSS `.pied__cols:first-child{margin-top:0}`) | `pied__sentence` présent dans 1 page sur 9 |
| F2-5 | corrige | numéros 01 à 04 retirés de la liste de l'accueil | `class="n"` : 0 dans index.html |
| F2-6 | partiel | phrase « la table se prend au restaurant » retirée ; regroupement des 3 pages refusé (changement de navigation et d'architecture, hors révision ciblée ; données absentes du dossier) | grep : 0 |

Hypothèses : `page === 'accueil'` pilote la phrase du pied. F3 non traités (hors liste). Débordement horizontal 0 mesuré sur 8 pages x 2 largeurs. sloplint non relancé (changements de texte et de balises seulement).
