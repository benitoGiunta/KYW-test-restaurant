# Audit Hallmark · Bienvenue chez vous · 2026-11-27

Source : site Wix https://www.restobienvenuechezvous.com (captures et HTML de `data/restaurants/bienvenue-chez-vous/site-actuel/`). Genre inféré : editorial (restaurant de chef, job : réserver).

## Lecture en quatre lignes
- **Pour quoi** : réserver une table de chef (quatre tables, sur réservation) ; l'action unique est l'appel téléphonique, le site n'a aucun module.
- **Ce qui reste** : photos de plats remarquables, voix du chef, rouge de l'enseigne, « Depuis 2002 », les six rubriques (Accueil, Présentation, Resto, Boutique, Traiteur, Contact).
- **Ce qui se lit généré** : Floor 7a (noir et blanc purs), 10a (`transition: all`), Reflex 24b (marges hors échelle), 44c (hero de 55 px), 59 (sections sans écart), WARN 3, 19 (« All rights reserved »), 77 (deux sections), F1 à F3 (apostrophes droites, points de suspension). sloplint : 97 FAIL, 22 REFLEX, 7 WARN, presque tous du CSS Wix généré (`.hallmark/before.txt`).
- **Ce qui est cassé** : contenus des pages internes vides à la capture (chargés tard), ni téléphone, ni adresse, ni horaires dans le HTML, page Presse vide, une vingtaine de pages dont des doublons « copie-de- », pied « © 2013 ».

## Structure d'origine
Accueil : une photo plein cadre (dessert smiley) sous un bandeau noir, logo rouge manuscrit, « Depuis 2002 », nav Accueil / Présentation / Resto / Boutique / Traiteur / Contact et trois icônes de réseaux. Pages internes : textes courts en liste, diaporamas « press to zoom ». Pas de mobile soigné (colonnes Wix), copie à la première personne du chef.

## Findings par tier
- Floor : 7a, 10a, 44b/12 (le hero n'a ni phrase ni action), 62 (contenu invisible sans JS).
- Reflex : 24b, 44c, 59.
- Finish : F1, F2, F3.
- Jugées (gates.md § 5) : 8 gabarit « photo, bandeau, rien » ; 54 majuscules et petites capitales absentes ; 58 trop peu de mots utiles au premier écran ; 63 pas de points médians ; 77 à 79 page maigre ; 85 pied « All rights reserved ».

## Axes d'amélioration (du moins cher au plus cher)
1. Lisibilité : coordonnées, horaires, action « Réserver » dans la nav et le hero (copie seule).
2. Système : tokens, une échelle d'espaces, échelle typographique, ponctuation française.
3. Composition : carte en lignes, horaires en tableau, formules midi/soir.
4. Seul le mode full règle : l'ossature des pages (le contenu Wix est inatteignable proprement), la voix visuelle (rouge de l'enseigne devenu vermillon unique) et la hiérarchie photo / texte.
