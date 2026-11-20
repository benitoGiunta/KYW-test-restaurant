# Audit Hallmark · Champs Elysées · 20/11/2026

Source : https://champselysees.be (WordPress, Divi, « © By Poush »), captures et HTML sauvegardés dans `data/restaurants/champs-elysees/site-actuel/` (index, la-carte, contact, fetes-patronales). CSS externe absent : les tells sont lus sur les captures. Genre inféré : **editorial** (brasserie de quartier, photographies chaudes, carte à lire).

## Lecture en quatre lignes
1. Pour quoi : réserver une table (widget Zenchef flottant) et lire la carte ; public local, familles, déjeuners.
2. Ce qui reste : le motif d’éventails vert et orange, les photos de salle, l’ordre one-page, la carte en PDF devenue rubriques, les fêtes patronales.
3. Ce qui se lit généré : hero « bulle crème » sur motif (gate 8 : séquence hero, à propos, carte, galerie), filigrane script rose sur l’à propos (54, texte décoratif), galerie en grille uniforme de trois, bandeau cookies et widget qui masquent la page.
4. Ce qui est cassé : adresse incohérente (5000 Namur / 5000 Jambes / 5100 Jambes), carte en PDF de 16 pages, formulaire citant « Les Terrasses du Prince », widget Zenchef et cookies envahissants sur mobile.

## Structure d’origine
Pages : `/` (one-page : hero, à propos, la carte, fêtes patronales, heures d’ouverture, réservations, galerie, contact), `/la-carte/`, `/contact/`, `/fetes-patronales/` (+ flipbook externe). Nav : logo à gauche, cinq liens à droite (À propos, La carte, Réservations & bons cadeaux, Galerie, Contact). Footer : coordonnées, navigation, réseaux, « © By Poush ». Hero : photo de motif plein écran et bulle crème. Animations : carrousel Swiper et reveals Divi. Images : 12 photos 2025, mascotte, logo. Mobile 375 : widget Zenchef ouvert en bas, cookies. Copie : chaleureuse, longue au premier paragraphe (85 mots).

## Findings par tier (captures et `.hallmark/before.txt` : 146 FAIL, 66 REFLEX, 9 WARN, en grande partie le CSS Divi ; 62 `.et_animated` caché au repos, 7b noir et blanc purs, 24b échelle, 26b :active, 37 six familles, 42 pied à quatre colonnes)
- Floor : 9 (eyebrow filigrane « Bistro convivial » en script), 12 (hero visible sans scroller : oui), 13 (paragraphe d’à propos de 85 mots), 7 (reveals sans repli à vérifier).
- Reflex : 8 (hero, à propos, 3 cartes, CTA), 18 (carrousel Swiper), 70 (formulaire).
- Finish / jugées : 6b, 23, 29, 44 (hero en 940 px de haut mais bulle décentrée), 54 (eyebrow), 58 (mots du hero), 63 (ampersand de « Réservations & bons cadeaux »), 66, 69 (horaires dits trois fois : section, widget, pied), 77 à 79 (corps étroit), 80 à 85 (illustration serveur utilisée comme décor).

## Axes d’amélioration
Peu coûteux : adresse unique, un seul horaire, réservation répétée à côté de la carte, formulaire avec champs étiquetés. Coût moyen : carte HTML par rubriques (fait ici). Seul le full règle : composition du hero (plaque de carte sur photo), rythme photo / texte, pied en mast.
