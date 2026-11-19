# DESIGN : Pizzeria Doria, variante portfolio (gabarit Guinguette adapté)

## Choix du gabarit

Notes sur 5 (positionnement / ambiance / matière disponible / type de carte / réservation / signature) ; total sur 30.

| Gabarit | Pos. | Amb. | Matière | Carte | Résa | Signature | Total | Remarque |
|---|---|---|---|---|---|---|---|---|
| guinguette | 5 | 4 | 3 | 4 | 3 | 4 | 23 | pizzeria de quartier citée dans la fiche, ton joyeux et familial, jamais utilisé |
| forno | 5 | 3 | 3 | 5 | 3 | 4 | 23 | déjà donné à dolce-vita-wepion (pizzeria) : écarté pour répartir la collection |
| affiche | 4 | 3 | 2 | 3 | 3 | 3 | 18 | déjà donné à incorrect (pizzeria) |
| ardoise | 3 | 3 | 3 | 4 | 3 | 3 | 19 | brasserie à carte unique, déjà trois fois |
| cahier / journee / collage / velours | 2 | 2 | 2 | 2 | 3 | 2 | 13 | fournisseurs, cadran, scène ou gastronomie : sans objet |

Décision : **guinguette**. Une pizzeria de famille et de quartier veut un site « attrapable », chaleureux, sans solennité.
La signature (objets au trait et tirages à déplacer sur une table) a un sens : la tablée. Limites connues de la fiche :
objets à redessiner, photos de lieu rares.

## Sections

- Conservées : accueil (marquee d'état, hero poster à objets saisissables, la maison, la table à 8 tirages, la carte, manifeste, horaires), carte, la maison, réserver et contact, 404.
- Retirées : avis (aucun avis cité au dossier, notes d'agrégateurs non vérifiées : non affichées), terrasse (inconnue), équipe photographiée, formulaire de réservation de démonstration, carte d'exemple.
- Ajoutées : page « Vins et boissons » (22 vins, verres et pichets, bières locales, apéritifs, digestifs, cadre de bouchons), page « À emporter » alimentée par les faits du dossier (Pizzy, téléphone, Payconiq et espèces, midis scolaires), section « Les midis » (cornets et paninis), suggestions de novembre 2026.
- Composant créé : `CarteBloc.astro` (catégories de la carte réelle, liste longue en deux colonnes, mention « fior di latte sans lactose sur demande »). `carte.json` est tiré de donnees.json par script (181 lignes, prix « 7,50 € »).

## Direction artistique

- Jetons : noms du moteur conservés, valeurs changées. `--c-corail` = rouge tomate #ea5a43 (aplats, encre dessus ; texte sur lin en #b8301f), `--c-canard` = vert sapin #1f5c3a (sections, basilic), `--c-paille` crème or du site actuel, lin et encre inchangés. Filet vert-blanc-rouge du logo en tête de page (`.tricolore`).
- Typographie : Zodiak et Satoshi du gabarit. Le script calligraphique du logo n'est pas repris en phase 1 (police non identifiée).
- Objets au trait redessinés : pizza, basilic, tomate (en plus de verre, fourchette, bouteille). Hero : « À table, chez Doria ».
- Photos : 4 du client (salle des coffres, friture, roquette, bouchons) et 4 libres marquées illustratives en légende et alt. Variantes 640 carré dans `public/photos/s/`. Logo carré en OG image.

## Adéquation estimée : 74 %

1. Ton, objets et tablée correspondent à une pizzeria familiale de quartier.
2. Carte complète réelle (181 lignes) rendue lisiblement, prix et mention sans lactose.
3. Salle des coffres mise en avant dès l'accueil.

Limites : peu de photos de plats (4 libres illustratives), pas d'avis, pas de logo vectoriel ni de script, réservation par téléphone seulement, motion à régler en phases 2 et 3.
