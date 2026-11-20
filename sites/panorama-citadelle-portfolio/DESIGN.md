# DESIGN, Le Panorama (variante portfolio, gabarit « Journée »)

## Choix du gabarit

Notes sur 5, à partir des rubriques « Pour qui » des FICHE.md (lecture ciblée, pas des 15 fiches en entier) et du dossier.

| Gabarit | Positionnement | Ambiance | Contenu dispo | Carte | Réservation | Signature | Total /30 |
|---|---|---|---|---|---|---|---|
| journee | 5 (brasserie 7 j/7, matin au soir) | 5 (lumière qui tourne, terrasse, vue) | 4 (6 moments couverts par PDF carte, petits-déj, 16 photos) | 4 (carte longue + formules) | 4 (Zenchef, lien externe) | 5 (le ciel qui change = le « panorama ») | 27 |
| ardoise | 4 (brasserie carte longue) | 3 | 4 | 5 | 4 | 3 | 23 (déjà 3 usages) |
| guinguette | 3 (brasserie à terrasse, plus familiale) | 4 | 3 | 3 | 3 | 3 | 19 |
| braise | 3 (four à bois, mais le feu n'est qu'un volet) | 3 | 3 | 3 | 4 | 3 | 19 |
| velours | 2 (gastro, mais carte longue et brasserie) | 2 | 2 | 2 | 4 | 3 | 15 |
| nocturne | 2 (soir) | 3 | 2 | 2 | 4 | 2 | 15 |

Décision : **journee**. Le restaurant est ouvert de 8h à 23h, vit du petit-déjeuner au dernier verre et sa promesse est
la vue : un ciel qui suit les heures de la journée est le « moment mémorable » naturel. Gabarit encore jamais attribué
(absent de `gabarits/UTILISATION.md`, hors réf. Les Potes au Feu).

## Sections

Conservées : hero cadran (badge ouvert, horloge, chips des 6 moments), 6 moments à ciel changeant, frise, horaires à flèches,
page carte heure par heure, page réservation (formulaire sans backend), page « La maison », 404.

| Moment | Contenu réel |
|---|---|
| 8h Petit-déjeuner | 4 formules du PDF (12 à 25 €), photo du pavillon |
| 10h La salle et la terrasse | médaillons salle / terrasse / bar, faits du dossier (400 places annoncées, 120 en salle) |
| 12h Le déjeuner | extraits de carte + index des 5 tartes flambées du four à bois |
| 17h L'apéro | 5 assiettes à partager du PDF, La Pano (photo du verre) |
| 19h Le dîner | extraits poissons, viandes, plat pour deux ; menu des fêtes 2026 à 110 € |
| 23h Le dernier verre | horaires, itinéraire, 2 lignes illustratives |

Retirées : plat de la semaine par jour, happy hour, brunch (page et médaillons d'assiettes : aucune donnée ni photo d'assiette), avis clients (aucun cité par le dossier).
Ajoutées : carte complète en 6 catégories (page carte), page `/petit-dejeuner/` (remplace `/brunch/`), bloc presse (RTBF, Moustique, Gault&Millau) dans « La maison ».
Aucun composant créé ; `Horaires.astro` relabellisé (Ouverture 8h-23h / Brasserie 11h-23h « à confirmer »).

## Direction artistique

Phase 1 : tokens, polices (Bricolage Grotesque, Rethink Sans) et ciel du gabarit inchangés. À faire en phase 2 : accent tiré du vert des
tabourets du bar, vérification du contraste, favicon (aucun logo client disponible : favicon du gabarit conservé), OG image faite (vue sur la Meuse, 1200x630).
Photos : 16 des 20 photos du dossier (WebP ≤ 1800 px, variante 960 px), alt tirés du champ `sujet`. Écartées : 14 et 16 (qualité 3), 18 (identité du chef non confirmée), 19 gardée avec alt neutre.

## Adéquation estimée : 85 %

1. Rythme du lieu (8h-23h, terrasse, bar, dîner) fidèlement traduit par les six moments.
2. Contenu réel complet (carte d'automne, petits-déjeuners, fêtes, 16 photos pro), très peu de placeholders.
3. Vue et lumière portées par la signature du gabarit.

Limites : pas de vraies photos d'assiettes ni de logo ; horaires contradictoires (8h/11h) ; desserts et vins absents ; pas d'avis cités ;
réservation par lien Zenchef externe.
