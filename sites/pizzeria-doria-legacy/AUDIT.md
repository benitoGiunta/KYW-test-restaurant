# Audit Hallmark · Pizzeria Doria · 2026-11-19

Source : pizzeriadoria.be (WordPress/Elementor, hébergeur PEPUP), captures `data/restaurants/pizzeria-doria/site-actuel/`, HTML de l’accueil rendu par sloplint (`.hallmark/before.txt`, 217 FAIL, 36 REFLEX, 12 WARN, dont l’essentiel vient du CSS Elementor/WordPress et du plugin 404). Genre inféré : editorial (restaurant de quartier, consommation familiale), thème final playful par le deal.

## Lecture en quatre lignes
1. Pour quoi : choisir un plat et réserver ou commander à emporter ; l’action unique est le téléphone (+32 81 44 44 08).
2. Ce qui reste : horaires et coordonnées visibles d’emblée, carte complète avec prix, la salle des coffres, la commande à emporter (pizzy.be, PDF).
3. Ce qui se lit généré : dégradés violet-bleu par défaut WordPress (2a), blanc pur partout (7a), quatre familles de polices (37), 14 sections (59), photos à 49 % de la page (83), hero qui ne laisse que 49 px de contenu (44c), boutons hors 44 à 52 px (39b), textes à 12 px (75).
4. Ce qui est cassé : modale de suggestions qui masque l’accueil, © 2024, onglet « Menu 2025 », coquilles (« Décrouvrez », « à changé », « Disclamer »), suggestions de /menu/ périmées, photos Unsplash présentées comme celles du restaurant.

## Structure d’origine
Pages : `/` (one-page), `/menu/` (6 onglets), `/vins/`, `/contact/`. Nav : Accueil, Menu 2026, Les vins, Contact, script calligraphique. Hero plein écran sur une pizza (stock) avec logo et bouton « Commander à emporter en ligne ou par téléphone ». Sections de l’accueil : horaires, offre à emporter, cornets et paninis, aperçu du menu en trois vignettes, histoire, à propos, offre d’emploi, avis Tripadvisor (2023), réservation. Animations : carrousel et lottie. Mobile 375 : colonne unique, lisible. Copie : coquilles, prix mixtes.

## Findings par tier (before.txt)
- Floor : 2a dégradés, 7a blanc pur, 48 couleurs hors tokens, 34 overflow.
- Reflex : 37, 39b, 44c, 59, 72, 75, 77, 83.
- Finish : F1 guillemets droits, F2 points de suspension, F3 text-wrap, F19 six graisses, F24 bordure et ombre.
- Jugées (gates.md § 5), lues sur capture : 8 (gabarit hero, cartes, bouton), 54 (titres en capitales espacées), 58 (trop de mots à l’écran), 69 (horaires dits deux fois : bandeau et corps), 77-79 (sections minces), 83 (photos de stock), 85 (pas de newsletter, bien).

## Axes d’amélioration
Peu coûteux : corriger coquilles et prix, ôter la modale, 44 px de cible. Moyen : une police, un vert, une photo par rôle. Seul full règle : la composition (hero, sections), la hiérarchie carte/horaires et le fait que la salle des coffres, identité du lieu, soit montrée.
