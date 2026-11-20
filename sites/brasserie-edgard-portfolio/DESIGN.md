# DESIGN — Brasserie Edgard, variante portfolio (gabarit Guinguette)

## Choix du gabarit
Notes sur 5 (positionnement / ambiance / matière / carte de 71 plats / réservation / signature). Exclus d'emblée : affiche, braise, comptoir, encre, forno, maree, nocturne, quatre-mains, velours, verger, cahier (gastronomie, asiatique, four, fruits de mer, bar de nuit, duo de chefs, saisons).

| Gabarit | Positionnement | Ambiance | Matière | Carte | Résa | Signature | Total |
| --- | --- | --- | --- | --- | --- | --- | --- |
| guinguette | 5 | 4 | 5 | 4 | 5 | 4 | 27 |
| ardoise | 4 | 3 | 3 | 5 | 5 | 3 | 23 (déjà donné 3 fois) |
| journee | 4 | 3 | 3 | 3 | 4 | 3 | 20 |
| collage | 2 | 3 | 3 | 3 | 3 | 2 | 16 |

Décision : **Guinguette**. Brasserie familiale ouverte tous les jours, terrasse, photos de terrasse et de plats (le gabarit en réclame), jamais utilisé. Ardoise convenait pour la carte mais est déjà donné trois fois.

## Direction artistique
- Palette du gabarit gardée (lin, corail, paille, encre). Seul le canard devient un bleu nuit `#1d4a6b` (façade de nuit, ciel du site actuel) ; le corail rappelle le bouton rose-rouge et l'orange du logo.
- Zodiak et Satoshi inchangées ; objets au trait : frites, parasol, verre, fourchette, bouteille, citron.
- Photos réelles du dossier (WebP 1800 px max, carrés 640 px pour « la table »), favicon « E », OG tirée de la façade.

## Sections
- Conservées : hero, la maison, la table (12 tirages), extrait de carte, manifeste, horaires, pied « À table ! ».
- Retirées : avis (aucun extrait réel), équipe (seul « Titi » cité, à confirmer), histoire (inconnue), page « À emporter » (seul le supplément emballage de 0,60 € est connu), carte longue d'exemple.
- Ajoutées : Lunch et suggestions (accueil et page), Menus de groupe (34 / 39 / 49 €, plus de 10 à 16 personnes), La salle et la terrasse.

## Pages
`/` · `/carte/` (71 plats réels) · `/lunch/` · `/groupes/` · `/salle/` · `/reservation/` (Barestho) · `404`.

## Données
Source : `donnees.json`, copie transformée dans `src/data/carte.json` et `suggestions.json`. Aucun placeholder de contenu ; avis, histoire, équipe, boissons absents.

## Adéquation estimée : 78 %
1. Gabarit festif et familial avec terrasse, adapté à une clientèle famille et affaires.
2. Carte complète aux prix réels, lunch et groupes mis en avant.
3. Photos réelles de la salle, de la terrasse et des plats.
Limites : ambiance dessinée plus légère que la salle en bois sculpté ; pas de boissons ni d'histoire ; six photos de plats seulement.
