# Audit Hallmark · Le 54 · 2026-11-10

Source : https://www.le54dave.be (capturé le 2026-11-10, `data/restaurants/le-54/site-actuel/`, copie dans `.hallmark/site-actuel/`). Genre inféré : editorial (restaurant gastronomique, photographies sobres ; le deal a été fait en atmospheric puis le thème Atelier retenu porte editorial).

## Lecture en quatre lignes
1. Pour quoi : donner envie de réserver une table gastronomique à Dave, à deux pas de Namur ; l'action unique est la réservation (téléphone ou formulaire de contact).
2. Ce qui reste : la barre latérale blanche avec le logo bleu et or, la pastille Gault&Millau, les photographies de salle en noir et blanc, la page de menu courte et complète, l'adresse et les téléphones.
3. Ce qui se lit généré : gate 58 (140 mots dans le premier écran de /a-propos), 77 et 79 (sections minces, 237 à 582 px de vide), 78 (titres à 39 px), 75 (texte à 10,2 px), 25 (mesure de 99 à 102 caractères), 26b (états :active et :disabled absents).
4. Ce qui est cassé : page /reservations vide, aucun :focus-visible (26a), pas de `overflow-x: clip` (34), contraste 2,85:1 (40), logo « default » du gabarit, Google Analytics UA obsolète, menu mobile peu lisible.

## Structure d'origine
- Pages : accueil, a-propos, lacarte (« Menus »), reservations (vide), galerie (« Photos »), contact. Nav : barre latérale fixe de 300 px (logo, six liens, pastille G&M, Facebook, Instagram, adresse). Footer : pas de pied, l'adresse est dans la barre.
- Hero : slider plein écran de cinq photographies de salle en noir et blanc très sombres, avec points. Animations : le slider automatique. Images : photos de salle et de plats, logo pinceau bleu et losange doré. Mobile 375 : hamburger gris sur photo noire. Copie : une section courte par page.

## Findings par tier (before.txt : 21 FAIL, 28 REFLEX, 13 WARN)
- Floor : 26a (aucun focus visible), 34 (overflow-x), 40 (contraste 2,85:1), 58 (140 mots).
- Reflex : 25 (mesure 99 à 102 ch), 26b (:active, :disabled), 39b (contrôles Leaflet et « totop » hors 44 à 52 px), 44c (hero finit à 168 ou 513 px sur 900), 75 (10,2 px), 77 (section de 53 % sans masse), 78, 79.
- Finish et jugées : F1 (apostrophes droites), F21 (h2 suivi d'un h4), 6b, 8 (hero, sections, CTA), 69 (horaires absents de l'accueil).

## Axes d'amélioration
- Peu coûteux : focus, états, tailles de texte, apostrophes, contraste, `overflow-x: clip`.
- Moyens : recomposer le menu en rows, la page de réservation (aujourd'hui vide) en comptoir avec les deux numéros, les horaires en tableau.
- Seul le mode full règle : la barre latérale de 300 px (nav, hero et pied), le slider, la composition « une section par page ».
