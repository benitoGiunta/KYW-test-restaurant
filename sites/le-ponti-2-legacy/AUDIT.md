# Audit Hallmark · Le Ponti 2 · 2026-11-10

Source : https://www.leponti2.be (WordPress, Divi, Complianz), captures et HTML dans data/restaurants/le-ponti-2/site-actuel/. Genre inféré : editorial (restaurant familial de quartier, crème et bordeaux). Job : book.

## Lecture en quatre lignes
1. Pour quoi : réserver une table (Barestho, téléphone) et consulter une carte italienne complète avec prix.
2. Reste : palette crème et bordeaux, carte HTML complète, horaires clairs, trois pages (Accueil, Menu, Contact), réservation en ligne.
3. Se lit généré : dégradés violet-bleu du thème WordPress (2a), blanc et noir purs (7a, 7b), quatre familles de polices (37), échelle d'espacement hors grille (24b), aucun état :active (26b).
4. Cassé : image qui ne charge pas (76), bannière cookies mi-anglaise avec gabarits visibles, 736 px de vide sous le hero à 1440 (79), texte collé au bord à 375 (72), contrôles de 24 px (39b).

## Structure d'origine
Pages : /, /menu/, /contact/. Nav en pilule flottante (Accueil, Menu, Contact, sélecteur FR/EN/NL, Réserver ma table), bouton jaune Barestho flottant. Hero : texte à gauche, photo de pâtes à droite, deux boutons. Trois blocs carte. Peu de photos (4 correctes), pas d'avis ni d'histoire. Mobile : hero lisible mais interlettrage large sur l'étiquette.

## Findings (before.txt : 191 FAIL, 76 REFLEX, 11 WARN, surtout hérités de Divi/WordPress)
- Floor : 2a, 7a, 34, 48, 76. Reflex : 7b, 24b, 26b, 37, 39b, 72, 79. Finish : F3, F15, F22.
- Jugées : 54 (étiquette en capitales espacées), 63 (point médian dans l'étiquette du hero), 77 (une section en tout), 8 (hero, trois blocs, CTA).

## Axes d'amélioration
Peu coûteux : jetons de couleur, une police display, états des contrôles, gouttière mobile. Full seulement : composition du hero (pleine largeur), catalogue de la carte, section horaires en Schedule, pied en colonnes.
