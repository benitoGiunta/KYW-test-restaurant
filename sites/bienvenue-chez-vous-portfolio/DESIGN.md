# DESIGN — Bienvenue chez vous, variante portfolio (gabarit « Velours »)

## Choix du gabarit
Matrice (sur 5) des gabarits retenus pour examen ; les 15 FICHE ont été parcourues, seuls les plausibles sont notés.

| Gabarit | Positionnement | Ambiance | Matière dispo | Carte | Réservation | Signature | Total /30 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| velours | 5 (table de chef, menu à étapes) | 5 (intime, feutré) | 4 (nombres vrais : 4 escales, 69 €, 1 chef, 2002) | 5 (menus à prix fixes) | 4 (téléphone seul) | 4 (chapitres-chiffres) | **27** |
| nocturne | 3 | 4 (bougies, tables intimes) | 3 | 3 | 3 | 3 | 19 |
| cahier | 3 | 2 | 3 | 2 | 3 | 3 | 16 |
| collage | 1 | 1 | 2 | 2 | 2 | 2 | 10 |
| journee | 2 | 2 | 2 | 3 | 3 | 2 | 14 |

Décision : **Velours**, jamais utilisé (UTILISATION.md : le gabarit n'a pas encore de restaurant). Il est fait pour une
table de chef à menu unique et petite salle ; les chiffres vrais du dossier (4 escales, 69 €, 1 chef, 2002) alimentent
ses chapitres sans rien inventer.

## Concept
Le restaurant est un voyage en escales : chaque chapitre se dévoile comme un rideau sur un chiffre monumental,
rouge de l'enseigne, posé sur une photo d'assiette. Chiffres : **4** escales, **69** euros, **1** chef, **2002**.
Photos en couleur : les assiettes sont la matière forte du restaurant (le gabarit les voulait en noir et blanc, retiré).

## Direction artistique (changements par rapport au gabarit)
- Palette : bordeaux profond `#2e1216` (fond), `#170a0c` (profond), rouge d'enseigne `#e0614d` en aplat (4,9:1 sur le fond,
  réservé aux textes de 1,25 rem et plus ou aux surfaces), rose pâle `#f2bfae` (texte secondaire), ivoire `#f4ece1`.
- Typographie, grille, rideau, motion : inchangés (Boska + Source Serif 4, radius 0, chapitre en rideau).
- Photos : 20 recadrages WebP générés depuis `data/restaurants/bienvenue-chez-vous/photos/` ; hero = dessert smiley
  (photo de l'accueil actuel). Favicon : cercle rouge avec « B ». OG : dessert smiley.

## Sections
- Conservées : hero, bande des guides (Gault&Millau, Jeune Chef de l'année 2016), chapitres 4 escales / 69 euros / 1 chef,
  citation (avis Trouve Ton Resto), onglets, galerie, carte de clôture 2002, pages menu, formules, réservation, 404.
- Retirées : portraits N&B (aucune photo du chef), bloc « équipe en salle » (le chef est seul), formulaire, Zenchef.
- Transformées : « Le samedi / privatisation » devient **À emporter** (`/emporter/`) : repas hebdomadaire et box, fêtes
  et buffets, boutique et chèque cadeau (le restaurant n'a pas d'offre de privatisation prouvée). « Les chefs » devient « Le chef ».
- Ajoutées : mention des mercredis à prix réduit (sans tarif, ambigu), accords A/B/C, relevé de menu d'octobre 2026.
- Composants créés : aucun (réutilisation de Chapitre, HeroPage, onglets, triptyque).

## Adéquation estimée : 80 %
Raisons : (1) table de chef à menu en étapes, intimiste ; (2) chiffres vrais et photos d'assiettes remarquables ;
(3) identité rouge reprise de l'enseigne. Limites : pas de photo de salle ni du chef (ambiance de salle absente), pas de
module de réservation, tarifs et horaires à confirmer, signature « rideau » sobre pour un lieu au ton plus chaleureux
et fantaisiste (la page actuelle est joyeuse, ce site est plus feutré).
