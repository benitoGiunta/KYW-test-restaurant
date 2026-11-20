# Audit Hallmark · Épices & Nous · 2026-11-20

Source : site Wix epicesetnous.com, capturé le 20/11/2026 (`data/restaurants/epices-et-nous/site-actuel/`, copie du HTML dans `.hallmark/site-actuel/`). Genre inféré : **editorial** (restaurant de couple, carte de saison, matière chaude et papier ; rien d'atmosphérique ni de ludique).

## Lecture en quatre lignes
1. Pour quoi : réserver une table à Erpent (action unique : « Réserver une table », module Wix) après avoir lu la carte, le menu à 52 € et les horaires.
2. Ce qui reste : la bande brun taupe et l'orange du logo, la carte et le menu complets en texte, les photos de plats, les mentions Michelin et Gault&Millau, l'histoire du couple.
3. Ce qui se lit généré, par gate : 7b (blanc pur ×35), 24b (marges hors échelle ×147), 37 (7 familles de polices), 38ii (titres en italique), 59 (sections sans espace), 77 et 78 (section mince, titres de section plus petits que le titre du hero), 58 (482 mots, h1 de 43 mots).
4. Ce qui est cassé : photos plaquées avec cadre blanc et marques incrustées (déjà recadrées dans `photos/`), texte bord à bord à 375 px (72), pages internes de 1,3 à 1,8 Mo, coquilles (« suit sur peau »), carte non datée, onglet Saint-Valentin vide, pied « ByCM Management ».

## Structure d'origine
- Pages : `/` (accueil long), `/carte`, `/menu`, `/reservations` (module Wix), `/about` (« On parle de nous »), `/blog` (Actualités), plus `/cuisine`, `/salle`, `/terrasse`, `/chef` (galeries).
- Nav : Home, Carte, Menu, Reservation, On parle de nous, Actualités, Se connecter. Pied : adresse, horaires, contact, réseaux, liens, mention ByCM.
- Hero : bande brune, texte en italique centré (43 mots), façade détourée et polaroïd, bouton orange « Réserver une table ». Sections : histoire sur fond crème, deux ambiances et terrasse, la cuisine et le menu à 52 € (panneaux orange et crème), carte, découverte en images, adresse et horaires.
- Animations : slider et effets Wix. Images : plats, salle, façade, badges tiers. Mobile 375 : hero lisible mais texte pleine largeur, logo énorme. Copie : française, chaleureuse, coquilles.

## Findings par tier (before.txt : 1024 FAIL, 195 REFLEX, 8 WARN, la plupart générés par le CSS Wix)
- Floor : 7b blanc pur, 38ii italique, 34 débordement, F3 pas de `text-wrap: balance`.
- Reflex : 24b, 25 (mesure de 107 caractères), 37, 39b (contrôles hors 44 à 52 px), 44c, 49b, 59, 72, 77, 78.
- Jugées (gates § 5) : 6b hero sans masse photo sous le titre ; 8 gabarit hero, histoire, trois panneaux ; 54 et 58 intitulés figuratifs et texte long ; 63 aucun ; 69 horaires répétés quatre fois (accueil, menu, réservation, pied) ; 83 pas de stock ; 85 aucun bandeau d'inscription.

## Axes d'amélioration, par coût
1. Gratuit : un seul jeu de polices, casse de phrase, horaires dits une fois, marges sur l'échelle.
2. Moyen : hero Ledge avec photo réelle de la salle ou de la table, menu à 52 € en tête, carte en Rows avec prix à droite.
3. Seul « full » règle : la composition (split, rows, énoncé), le pied en lettre, la hiérarchie des titres.
