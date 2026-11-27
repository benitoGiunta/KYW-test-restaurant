# Audit Hallmark · La Bergerie de Lives · 2026-11-27

Source : `data/restaurants/bergerie-lives/site-actuel/` (Wix, 3 pages, HTML sauvegardé rendu en local ; la police d'origine n'a pas chargé, voir ci-dessous). Genre inféré : editorial (maison d'hôtes et mariage, ton calme, photographique). Constat du dossier : ce n'est pas un restaurant, la maquette est requalifiée en maison d'hôtes et domaine de mariage (job « book » gardé : réserver une chambre, une visite).

## Lecture en quatre lignes
1. Pour : choisir une chambre avec piscine, sauna et jacuzzi, ou visiter le domaine pour un mariage ; action unique : Réserver.
2. Reste : les belles photos de domaine et de cérémonie, les services, la liste d'activités namuroises, les trois routes.
3. Se lit généré : 67 (labels en capitales), 7b (blanc pur), 24b (marges hors échelle, 165 occurrences), 37 (9 familles de polices), 59 (écart de sections 55 px).
4. Cassé : bandeau cookies qui mange le bas de l'écran, mobile coupé (capture), « Weelness », © 2023 et « depuis plus de 3 ans » datés, page Réservations vide, un script qui lève une exception au rendu.

## Structure d'origine
Pages : accueil (à propos, chambres, services, galerie, activités, avis d'hôtes en titre seul, contact), mariage et location (récit, brochure, calendrier, visite 30 min, séminaire), réservations (contact seulement). Nav : accueil, chambres, galerie, contact, mariage et location, bouton Réserver, sélecteur de langue. Footer : bloc contact + formulaire (5 champs) + © 2023. Hero : titre centré, trois lignes de baseline, grande photo de façade sous un bandeau. Animations : slideshow Wix, pas de scroll choreography. Images : 25 photos client exploitables, logo bélier 109 px. Mobile 375 : texte coupé. Copie : courte, correcte, deux fautes.

## Findings (before.txt : 592 FAIL, 207 REFLEX, 12 WARN)
- Floor : 67 x5 (labels), 34 (overflow), rendu : exception de script.
- Reflex : 7b x37, 24b x165, 37, 39b (champs 37 px), 44c (hero finit à 1025 px sur 900), 49b, 59.
- Finish : F1 guillemets droits x12, F2 points de suspension x2, F3 pas de text-wrap balance, F7 même recette de boîte x12, F21 h1 puis h5.
- Jugées : 77 (2 sections seulement), 8 (hero, trois cartes, CTA évité), 54 et 58 (copie courte, rien à couper). Avis d'hôtes : titre sans contenu, supprimé (ligne `dropped`).

## Axes d'amélioration
Faible coût : supprimer le bandeau cookies de la maquette, typographie française, états des champs. Moyen : réécrire la page Réservations, refaire le mobile. Seul full règle : fond, famille typographique, composition des sections, pied.
