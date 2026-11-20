# DESIGN, Don Dino (variante portfolio)

## Choix du gabarit
Matrice (sur 5 : positionnement / ambiance / contenu dispo / type de carte / réservation / signature), 5 candidats retenus sur 16.

| Gabarit | Pos. | Amb. | Contenu | Carte | Rés. | Sign. | Total | Remarque |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| guinguette | 5 | 5 | 3 | 4 | 3 | 4 | 24 | pizzeria de quartier, famille, terrasse ; jamais utilisé |
| forno | 5 | 3 | 3 | 4 | 3 | 4 | 22 | four à bois, mais Don Dino est brasserie à carte de 115 plats ; déjà donné à dolce-vita-wepion |
| affiche | 4 | 3 | 2 | 3 | 3 | 3 | 18 | déjà utilisé, peu de photos |
| ardoise | 3 | 3 | 3 | 5 | 3 | 3 | 20 | carte longue mais ton brasserie sombre, déjà utilisé 3 fois |
| journee | 3 | 4 | 2 | 3 | 3 | 3 | 18 | ouvert 7j/7 mais cadran sans matière (pas de brunch/café) |

Décision : **guinguette** (FICHE : « pizzeria de quartier », « en famille le dimanche »). Terrasse, bar, patron en salle, ouvert 7j/7 : le ton joyeux et attrapable colle à « bonne ambiance ». Limite signalée par la FICHE : objets de guinguette, donc 3 objets redessinés pour la pizzeria.

## Sections
- Conservées : hero poster à objets saisissables, la maison, la table (tirages déplaçables, 11 au lieu de 12), carte blanche, avis, manifeste, horaires, pied de page, pages carte / maison / réservation / 404.
- Retirées : page « À emporter » (service inconnu), carte longue d'exemple du gabarit, formules et menu unique (aucun au dossier), équipe de 4 (remplacée par une fiche : le patron).
- Adaptées : accueil montre un extrait de la carte réelle (Pizzas, Pâtes, Entrées chaudes, 6 plats chacune) ; page carte = 115 plats en 12 rubriques tirés de donnees.json (`src/data/carte.json`) + desserts et boissons d'exemple marqués ; « Terrasse » devient « Terrasse et groupes » (terrasse, parking, accès, privatisation sur devis : faits du dossier).

## Composants créés / modifiés
`Objet.astro` : `frites`, `bouteille`, `citron` remplacés par `pizza`, `chope`, `basilic` (même trait, viewBox 100). Aucun autre composant ajouté.

## Art direction
Accent rouge tomate `#e8483a` (texte `#b8261b`) et vert basilic `#1d7a3f` à la place de corail / canard, tirés du logo (script vert, filet rouge). Zodiak et Satoshi conservés. Favicon pizza au trait sur rouge. OG : photo de la pizza sur planche recadrée 1200x630. Logo manuscrit non repris en typographie (phase 2).

## Adéquation estimée : 78 %
1. Ton joyeux, famille, terrasse et patron en salle collent à l'identité.
2. Les 11 photos utilisables servent la table ; la carte réelle complète est lisible en HTML.
3. Objets au trait adaptés (pizza, chope, basilic).
Limites : photos faibles (3 sous 600 px) et aucune photo de terrasse ni de façade ; pas d'avis réels ; desserts et boissons fictifs ; réservation = formulaire du site client, pas d'outil.
