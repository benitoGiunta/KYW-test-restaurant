# Révision 1 · pepite-portfolio

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `motion/setup.ts` (horloge figée sur l'ouverture 19:00, seule la barre avance), `Loader.astro` (plus de `data-a`), `site.ts` (commentaire) ; le statut « ouvert » n'affiche aucune heure de fin | compteur lu = 19:00 en fin de loader ; statut testé avec horloge fixée |
| F1-2 | corrige | `engine/loader.ts` (MIN 0,8 s, lissage 0,2, seuil 97, loader masqué par CSS = sortie immédiate), `setup.ts` (sortie 0,2 + 0,7 s) | is-loaded desktop 1,9 à 2,0 s (2 passes) ; mobile CPU x4 + 4G lente = DCL (3,7 s) + 5 ms, soit 1,6 s de moins qu'avant |
| F2-1 | corrige | `site.ts` : citations intégrales | grep `saumon est une merveille` dans dist/histoire |
| F2-2 | corrige | `base.css` (capitalize retiré), `Footer.astro` (majuscule initiale) | dist : « Lundi au mercredi » |
| F2-3 | corrige | `carte.astro`, `index.astro` : supplément marqué « + », 01 à 05 | dist : 01 02 03 04 + 05 |
| F2-4 | corrige | `histoire.astro` : cadre vide supprimé, nom et rôle seuls | 0 `membre__initiale` dans dist |
| F2-5 | corrige | `site.ts` : URL du widget Tablebooker (restaurantId 50470946) | grep dist/reservation |
| F2-6 | corrige | `site.ts` : mosaïque réordonnée, photos de moins de 720 px dans les petites cases (~467 px) ; grandes cases : 1600, 1024, 1024, 860, 860 et 690 px (dessert, agrandi 1,4x, la seule concession) | capture `.shots-pepite-portfolio-rev/mos.png` |
| F2-7 | corrige | `site.ts` (`boutique` jeudi/vendredi 16:00, samedi 10:30), `index.astro`, `setup.ts` | jeudi 17 h : « Boutique ouverte, cave à manger dès 19h » ; samedi 11 h idem ; jeudi 20 h : « ouverte ce soir » |
| F2-8 | corrige | `site.ts` : « de vive voix », « Dates à demander », « à la boutique » retirés, « sur demande » seul ; « en soirée » devient « sur demande » | grep dist : 0 occurrence |
| F3-4 | corrige en passant | téléphone `+32 476 62 01 82` partout | grep dist |

Hypothèses : le statut « ouvert » garde la fermeture illustrative 23:00 en interne, jamais affichée. F3 non traités (hors liste).
