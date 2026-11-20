# Révision 1 · philfa legacy (F2 seulement, aucun F0/F1)
| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F2-1 | corrige | pied du site : `<footer>` devenu `<section aria-label="Coordonnées">` (`index.astro`) | axe 1440 et 390 px : 0 violation ; 1 seul `<footer>` (kyw-footer) |
| F2-2 | corrige | `centre-ville` dans `<span class="nowrap">` (`index.astro`, `page.css`) | 1 seul rect pour le span à 1440 et 390 px |
| F2-3 | corrige | dt « Le menu du moment est renouvelé », dd « Toutes les 6 semaines » (`index.astro`) | grep `dist/` : présents |
| F3-1 | corrige | `.salle .ph` max 1200 px centré, `object-position 72% 55%` (`page.css`) | largeur mesurée 1200 px à 1440 |
| F3-2 | corrige | `.band--404` sans marge haute, padding réduit (`404.astro`, `page.css`) | h1 à y 142 au lieu de ~222+ ; bande vide absente (mesure, pas de capture) |
| F3-3 | corrige | description 404 réécrite (`404.astro`) | grep `dist/404.html` |
| F3-4 | corrige | survol du logo : soulignement jaune (`page.css`) | CSS présent, non capturé |
| F3-5 | corrige | horaires « 12 h à 14 h 30 » / « 18 h 15 à 21 h » (espaces fines insécables, `site.ts`) ; JSON-LD inchangé ; note « Fermé le 11 novembre. » déplacée sous le tableau, 16 px | texte mesuré, écart note/tableau 16 px |

Build vert ; sloplint : seul FAIL 34 (faux positif connu, règle dans base.css). scrollWidth = largeur de fenêtre à 1440 et 390 px. 8 corrigés, 0 refusé, 0 impossible. Publiable : oui. Pas de capture visuelle finale (mesures seulement).
