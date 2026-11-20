# DESIGN « La Maison des Desserts » (gabarit Collage adapté)

## Choix du gabarit
Notes sur 5 (positionnement / ambiance / contenu dispo / carte / réservation / signature) pour les gabarits non encore utilisés ou plausibles :

| Gabarit | Verdict | Raison |
| --- | --- | --- |
| collage | 4,5 | Lieu « à plusieurs vies » : pâtisserie, boulangerie, chocolaterie, salon de thé = 4 couleurs-sections ; la signature (case du logo qui se colle avec le nom de la section) a un sens direct |
| cahier | 3 | Boulangerie, mais exige des origines de produits que le dossier n'a pas |
| journee | 3 | Ouvert 8h-18h seulement, pas de cadran utile |
| velours | 1,5 | Gastronomique à menu unique : contre-sens |
| guinguette / verger | 2 | Ton terrasse ou saisons locavores absent du dossier |

Retenu : **collage** (jamais utilisé, cf. gabarits/UTILISATION.md ; mise à jour de ce fichier non faite en mode figé, à ajouter : `collage | maison-des-desserts`).

## Concept
Le mur de flyers d'une vitrine : chaque savoir-faire de la maison est un aplat pleine largeur (pâtisserie rose, boulangerie jaune, chocolaterie cacao, salon de thé bleu), le logo en cases absorbe le nom de la section. Verbe : se colle. Typo Libre Caslon (proche du didone du site actuel) + Space Mono.

## Sections
- Conservées : hero 3 cases, manifeste + bulle, blocs d'activité, bloc sur photo (fêtes), infos, pages carte et histoire, 404.
- Retirées : agenda, scène, brunch inventé, privatisation, équipe, avis (aucun avis citable), réservation (aucune réservation de table).
- Ajoutées : composant `Activite.astro` (aplat + photo alternée), page Fêtes (dates réelles de la carte PDF), page Contact (boutique en ligne, horaires), section presse (titres réels La DH, Le Vif), jeton `--c-cacao`.

## Art direction
Hero = façade de jour (enseigne verte) ; vitrine de Noël en bloc Fêtes. Favicon « MD » rose. OG = façade recadrée 1200x630. Carte complète (13 catégories, données transcrites du PDF) depuis `src/data/carte.json`.

## Adéquation estimée : 70 %
1. Structure multi-savoir-faire fidèle à la maison ; 2. toutes données réelles (carte, dates des fêtes, presse) ; 3. photos de pâtisserie et pain de qualité.
Limites : une seule photo chocolat (qualité 2, marquée illustrative), pas d'avis ni d'équipe, carte longue en liste, dates de fondation incohérentes sur le site client.
