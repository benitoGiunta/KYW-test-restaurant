# Audit Hallmark · Le Servais · 2026-11-10

Source : leservais.be (Wix, capture du 10/11/2026 dans `data/restaurants/le-servais/site-actuel/`). Le HTML sauvegardé est un shell Wix sans CSS exploitable : `sloplint --before` n'a pas été lancé, les findings viennent de la lecture des captures (`desktop-pleine-page.png`, `mobile-haut.png`) et de `infos.json`.

Genre inféré : playful (bar à cocktails et brasserie ouverts toute la journée, ton jeune, affiches colorées), la couleur de marque turquoise (#1b7f87 environ) restant le fil.

## Lecture en quatre lignes
1. Pour quoi : réserver une table (bouton Réservation vers book.leservais.be) ou lire la carte (deux PDF).
2. Ce qui reste : le turquoise, la police condensée, l'adresse « au départ du téléphérique », les horaires 7/7, les routes Groupes/Privatisation, Événements, Carte cadeau, Contact, les deux PDF.
3. Ce qui se lit généré : carrousel d'affiches en défilement automatique (gate 18), hero photo posée sous un titre centré étroit, pages d'événements remplies d'exemples Wix (« ven. 04 avr. »), photos de stock mêlées aux vraies (gate 83).
4. Ce qui est cassé : erreurs de script Wix (`$w(...).hide`, `Write is not defined`), « Événements » en double dans la nav, une colonne de 600 px au centre d'un écran de 1440, 275 requêtes.

## Structure d'origine
Pages : accueil, groupes-privatisation, événements, carte-cadeau, contact-3, event-list. Nav : sept liens en capitales condensées turquoise + pastille Réservation + panier. Accueil : titre, photo du comptoir, adresse et horaires sur deux colonnes, liens PDF, réseaux, rail d'affiches. Pas de pied de page propre. Mobile 375 : colonne unique, nav en menu Wix.

## Findings par tier (lecture des captures)
- Floor : 9 (tout en capitales condensées teintées), 12 (hero : titre + photo, pas d'action au-dessus du pli desktop).
- Reflex : 18 carrousel auto, 83 stock, 85 absence de pied de page utile, 63 flèche entre « dimanche → jeudi ».
- Finish : photos non recadrées, texte de 12 px en capitales (22 mots de lead en bloc), panier sans objet.
- Jugées : 6b, 8, 23, 29, 44, 54, 58, 66, 69 touchées (capitales partout, répétition des horaires).

## Axes d'amélioration
Faible coût : nav dédoublonnée, horaires en tableau, boutons réservation et carte au premier écran. Moyen : carte lisible en HTML (prix en colonne). Seul `full` règle : le système typographique et la composition de l'accueil.
