# DESIGN : Incorrect, variante portfolio (gabarit « Affiche »)

## Choix du gabarit
Matrice (sur 5) : adéquation positionnement / ambiance / contenu disponible / type de carte / réservation / signature.

| Gabarit | Pos. | Amb. | Contenu | Carte | Résa | Signature | Total |
| --- | --- | --- | --- | --- | --- | --- | --- |
| affiche | 5 | 5 | 3 | 4 | 5 | 5 | 27 |
| nocturne | 4 | 5 | 1 (12 photos exigées, 3 disponibles) | 3 | 5 | 3 | 21 |
| guinguette | 3 | 2 | 3 | 3 | 4 | 3 | 18 |
| forno | 4 | 3 | 3 | 4 | 4 | 4 | 22 (déjà utilisé : dolce-vita-wepion) |
| collage, braise, cahier | 2 à 3 | 2 à 3 | 2 à 3 | 3 | 4 | 2 à 3 | 16 à 19 |
| velours, comptoir, encre, maree, journee, verger, ardoise, quatre-mains | 1 à 2 | 1 à 2 | n/a | 2 à 3 | 4 | 1 à 2 | moins de 15 |

Décision : **affiche**. Pizzeria créative à l'ambiance rock, carte courte en prix, non gastro, gabarit non encore utilisé. Une affiche de concert
colle bien à « pizzeria rock-n-roll » ; nocturne (cité en cible dans sa fiche) exige 12 photos de nuit, nous en avons 3.

## Sections (accueil)
Conservées : hero (nom contour + plein, pastille d'état, plat, marquee des pizzas), définition (humoristique, illustrative), « Ça s'empile »
(le Dwight Schrute en 5 couches), carte bento (6 plats réels), horaires, comment ça marche (sur place / à emporter), galerie inclinée (8 cartes),
visite (plan schématique rue Haute Marcelle).
Pages : `/carte/` (11 catégories réelles + « Ce qu'il y a dedans »), `/histoire/` (Alex et Estelle), `/reservation/` (Barestho), `/a-emporter/`, `/404`.
Retirées : menu du jour et formules (aucune donnée), équipe de 4 (2 personnes connues, sans photo : silhouettes), avis clients (aucun : on cite la presse).
Ajoutées : `faits` (pâte 48 h, farine Bodson, kimchi maison, vente à emporter, chacun avec sa source) à la place des formules ; `horairesNote`.
Composants créés : aucun ; `Plat.astro` redessiné (tartine au levain en 5 couches), `Bento` sans paragraphe vide, `.rinv` (R inversé du logo).

## Art direction
- Palette (mêmes jetons, valeurs changées) : rouge-orange `#ff4b2b` (sauce piquante), jaune acide `#d9f24a` (« on acid »), vert sapin nuit `#123b2a`,
  crème `#f1ecdd`, encre vert-noir `#0a1511`, betterave `#c21e56` (couche du plat). Le vert très foncé du site actuel porte les sections vertes et le pied.
- Typo : Archivo (gabarit) ; le « Я » du logo n'existe pas dans Archivo : un R en miroir (`.rinv`) dans l'en-tête et le pied, nom du hero écrit « Incorrect ».
- Photos : 3 originales du client, recadrées en 8 vues (salle, passe, gants, croûte, table, verres, assiette) ; aucune photo libre (le tirage Picsum n'est pas de la cuisine).
- Favicon : R inversé jaune sur encre. OG : recadrage de la photo de table.

## Adéquation estimée : 82 %
1. Ton et couleurs en phase avec « rock-n-roll » et la carte (noms de plats drôles qui claquent en affiche).
2. Carte réelle complète (11 catégories, prix exacts), horaires en gros, réservation Barestho partout.
3. Dwight Schrute (vraie signature) en 5 couches.
Limites : 3 photos seulement (galerie par recadrages), pas de portraits, horaires à confirmer, logo non repris en SVG (Я), hero rouge plutôt que le vert du site actuel.
