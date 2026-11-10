# Audit Hallmark · Li Micougni · 10/11/2026

Source : https://www.limicougni.com (Webador), 7 pages, captures dans `data/restaurants/li-micougni/site-actuel/`. Genre inféré : editorial (restaurant-brasserie convivial, la matière est la salle et les plats, pas un produit). Job : book.

## Lecture en quatre lignes
1. Pour réserver une table ou demander un évènement, par un formulaire de contact ; public namurois, action unique : « Réserver maintenant ».
2. Reste : les vraies photos de salle et de plats, la phrase « même les demi-fous », la terrasse de 30 couverts, la carte complète, les 7 routes.
3. Se lit généré : hero centré en 26 px sous 127 px de bande (44c, 79), têtes de section à 32 px (78), écarts de 50 px (59), accordéon FAQ sans marge (72), pas d'états :active/:disabled (26b).
4. Cassé : aucune adresse ni téléphone en clair, carte en PDF seulement, image « Menu du jour » vide, coquilles (« nnécessaires », « Évènement privée »), bandeau cookies publicitaires.

## Structure d'origine
Pages : accueil, vitrine du restaurant, menu, notre terrasse arrière, évènement privé, à propos de nous, contact. Nav horizontale de sept liens sous un logo carré et un nom en capitales. Hero photo (verres, jambon), titre centré, bouton contour. Accueil : texte, trois cartes (terrasse, menu du jour, évènements), FAQ de trois questions, formulaire + carte Mapbox. Pied : réseaux, mailto. Aucune animation. Mobile : empilé sans défaut majeur. Copie : correcte mais générique, coquilles.

## Findings (sloplint --before, before.txt : 32 FAIL, 18 REFLEX, 6 WARN sur le Webador rendu, dont une grande part de CSS du constructeur)
- Floor : 34/40/41 contrastes et débordements du constructeur, 54 eyebrow absent, stamp absent (20).
- Reflex : 24b échelle d'espacement, 26b états, 44c et 79 hero, 59 écarts, 72 boîte serrée, 78 têtes de section.
- Jugées (gates.md § 5) : 6b hero centré sur un axe, 8 gabarit « hero, 3 cartes, FAQ, contact », 9 sections séparées de la même façon, 23 accent en bande beige-or.

## Axes d'amélioration
Peu coûteux : adresse, téléphone et carte en HTML, coquilles. Moyens : états des contrôles, hiérarchie des têtes. Seul le full règle : composition (hero, rangs de carte, horaires en Schedule), système typographique.
