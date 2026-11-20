# Audit Hallmark · Don Dino · 2026-11-20

Source : dondino.be (HTML sauvegardé, 9 pages, captures desktop et mobile). Genre inféré : playful (brasserie pizzeria familiale, patron en salle, ambiance décontractée). `sloplint --before` : 395 FAIL, 415 REFLEX, 51 WARN sur 9 pages (rapport `.hallmark/before.txt`).

## Lecture en quatre lignes
- Pour quoi : réserver une table (formulaire ou téléphone) et consulter la carte ; l'action unique est la réservation.
- Ce qui reste : le split photo/texte du hero, la photo de pâtes, les horaires 7 j/7, la visite virtuelle, le logo manuscrit vert et rouge, le patron « Dino ».
- Ce qui se lit généré : gate 78 (titres de section à 29 px sous un hero de 44 px), 77 (sections minces), 59 (écarts de 66 px), 29 (verre flou), 80 (illustration SVG de 300 px), 44c (hero qui s'arrête à 327 px sur 900).
- Ce qui est cassé : carte uniquement en PDF de 8 pages avec encarts publicitaires ; bandeau cookies et avertissement navigateur sur le hero ; 11 mots dans le h1 ; pages internes quasi vides.

## Structure d'origine
Pages : accueil, Menu et Pizzas, Réservations, Groupes et Privatisation, À propos (concept, histoire, équipe, presse, visite virtuelle), Recrutement, Contact. Nav : 6 liens + sélecteur FR/EN/NL, bandeau rose « Visite virtuelle ». Hero : split 50/50, photo de spaghetti à gauche, h1 en capitales et bouton « Nous contacter » à droite. Animations : aucune notable. Mobile 375 : logo énorme, hero empilé, texte au ras du bord (72). Copie : succincte, h1 de 11 mots.

## Findings par tier
- Floor : 10a (189, transitions de propriétés de layout), 62 (104, contenu masqué sans script), 48 (34, couleurs littérales), 33 (19), 7a (16), 34 (12), 44d (10), 76 (9), 44b (1), 26a (1).
- Reflex : 39b (boutons hors 44 à 52 px), 44c, 59, 72, 77, 78, 80.
- Finish : F1 guillemets droits, F3 text-wrap, F19 quatre graisses, F21 niveaux de titres, F22 texte justifié.
- Jugées : 58 (h1 de 11 mots), 29 (verre), 49 (libellé long « S'abonner à notre newsletter »), 85 (newsletter réflexe).

## Axes d'amélioration
Faible coût : tokens, text-wrap, états de focus, 404. Moyen : carte HTML lisible (115 plats), hero à 7 mots. Seul le full règle : composition (hero en liste de prix, piles de photos), thème vert plein, hiérarchie de titres.
