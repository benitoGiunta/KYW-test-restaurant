# Audit Hallmark · Le Grill des amiS · 2026-11-10

Source : https://www.legrilldesamis.be (Wix Studio), captures et HTML dans `data/restaurants/grill-des-amis/site-actuel/`. Genre inféré : atmospheric (salle sombre, feu de bois, bandeau noir, or et rouge), job : réserver une table.

## Lecture en quatre lignes
- **Pour quoi** : réserver (Wix Bookings ou téléphone 081/61 72 60) et montrer que la maison est le spécialiste des viandes maturées.
- **Ce qui reste** : le losange GS rouge et or, la photo de salle plein écran, les photos de viande du client, la devise « pour le plaisir de nos amis », les routes réserver, carte, à propos, traiteur, contact.
- **Ce qui se lit généré** : médaillons bordeaux incrustés au hero (18), marquee « RESTAURANT VIANDARD » (18), trois témoignages en texte d'exemple Wix (46a), rouge saturé avec texte rouge sur orangé (contraste), bouton « Se connecter » et panier sans usage, formulaire « être informé en premier » (85).
- **Ce qui est cassé** : carte en images et PDF (pas de HTML), coquille « Jeudredi » et « Votre texte de paragraphe » dans le PDF, horaires ambigus, nav mobile sur deux lignes.

## Structure d'origine
Pages : accueil, réserver, carte, à propos, traiteur, contact, actualités, événements, spécial viandes, terrasse, plats (galeries). Nav : barre noire (logo losange, six liens, deux pilules, connexion, panier). Hero : photo de salle plein écran, deux boutons, trois médaillons. Pied : horaires, adresse, téléphone, mentions Wix. Animation : un bandeau défilant. Mobile 375 : hero haut, médaillons empilés, bandeau orangé. Copie : ADN, spécialiste, viandes, traiteur lisibles et réels.

## Findings par tier
- Floor : 46a témoignages d'exemple ; 54 et 67 libellés en capitales espacées ; contraste rouge sur orangé.
- Reflex : 8 gabarit hero, À propos, bandeau, actualités, avis ; 18 marquee ; 85 formulaire d'inscription.
- Finish : 63 puces décoratives ; 69 horaires dits deux fois (hero, pied) ; 77 à 79 sections minces sur l'accueil ; 83 aucune photo de plat dans la carte HTML (inexistante).
- Jugées (gates § 5) : 6b `vh` du hero Wix, 9 ombres, 29 icônes, 44 fold, 58 mots par écran, 66 hiérarchie des boutons, 69 répétition, 80 à 85 réflexes de pied.

## Axes d'amélioration
Peu coûteux : carte en HTML, un seul bouton principal, horaires une fois. Moyens : hero sans médaillons, pied en lettre. Seul le mode full règle : système typographique (condensé en capitales fines), surfaces par la lumière, composition des sections.
