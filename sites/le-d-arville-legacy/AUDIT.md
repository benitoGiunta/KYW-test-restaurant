# Audit Hallmark · Le D’Arville · 2026-11-20

**Source** : ledarville.be (WordPress + Divi, Zenchef), HTML sauvegardé `data/restaurants/le-d-arville/site-actuel/page.html` et captures. **Genre inféré** : editorial (restaurant gastronomique, photographies de lieu, carte en texte).

## Lecture en quatre lignes
- Pour quoi : réserver une table dans une ferme gastronomique à Wierde ; l’action unique est la réservation (widget Zenchef).
- Ce qui reste : les huit routes, la carte à jour, les menus à 73 € et 90 €, les 22 photos du lieu, le PDF des vins, le téléphone et l’adresse.
- Ce qui se lit généré : gabarit Divi (hero slider, blocs centrés), 4 familles de polices (37), boutons de 41 px (39b), texte de 10,7 px (75), 816 px de vide sous le hero (79), cinq graisses (F19).
- Ce qui est cassé : « Select Page » affiché, bannière cookies et widget qui masquent le haut, pages Photos et Traiteur quasi vides, affiches d’événements en images.

## Structure d’origine
Pages : accueil, menus et carte, photos, séminaires, chambres Barabas, chèque cadeau, réservation et contact, traiteur de Noël. Nav Divi à huit entrées, hero en slider (façade en briques, « Restaurant gastronomique », bouton orange « Service traiteur »), intro, galerie, pied Divi. Fond blanc, accent orange, logo « b » (favicon seul, pas de vectoriel). Mobile 375 : mêmes blocs empilés (capture `mobile-pleine-page.png`). Copie : sobre, à jour au 16/11/2026.

## Findings (sloplint, `.hallmark/before.txt`)
283 FAIL, 102 REFLEX, 23 WARN, presque tous du thème Divi et du CSS inline. Retenus : Floor F1 apostrophes droites, F3 pas de `text-wrap: balance`, F19 cinq graisses, F21 h2 puis h5 ; Reflex 37, 39b, 75, 79 ; Finish 3 (liseré latéral), 10b, 29 (halo coloré), 40 (contraste sur dégradé), 41, 49, 77 (aucune section lisible), render (polices non chargées dans la capture). Jugées gates.md § 5 : 8 (hero, trois cartes, CTA : séquence gardée, composition neuve), 9, 54 (aucune statistique inventée), 58 et 63 (copie), 69 (horaires dits une fois), 83 (photos du client, pas de stock).

## Axes d’amélioration
Peu coûteux : apostrophes, `balance`, trois graisses, boutons 44 à 52 px, texte 16 px. Moyens : retirer cookies et widget du premier écran, une seule photographie de hero. Seul full règle : la matière (papier, serif léger, passe-partout), la composition du hero (plaque de papier à la base de la photo) et l’ordre de lecture (carte, terrasse, villa, horaires).
