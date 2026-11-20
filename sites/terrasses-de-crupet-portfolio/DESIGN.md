# DESIGN — Les Terrasses de Crupet · variante portfolio (gabarit « guinguette »)

Le DESIGN.md du gabarit (tokens, typo, motion, composants) reste la référence technique : `gabarits/guinguette/DESIGN.md`.

## Choix du gabarit (matrice, sur 5)
Restaurant : brasserie familiale de village, terrasse en été, chalet d'hiver, cuisine de terroir, carte longue (9 catégories), Zenchef, 22 photos (salle, plats, bar), pas d'histoire ni d'équipe ni d'avis connus.

| Gabarit | Positionnement | Ambiance | Contenu dispo | Carte longue | Réservation | Signature | Total |
|---|---|---|---|---|---|---|---|
| guinguette | 5 | 5 | 4 | 5 | 4 | 4 | 27 |
| journee | 4 | 3 | 3 | 4 | 4 | 3 | 21 |
| cahier | 3 | 3 | 2 | 3 | 3 | 3 | 17 |
| velours | 1 | 3 | 2 | 1 | 3 | 3 | 13 |
| braise / ardoise (déjà utilisés) | 3 | 3 | 3 | 4 | 4 | 3 | 20 |

Décision : **guinguette**, jamais attribué (UTILISATION.md : `gabarits/` protégé, ligne à ajouter par l'orchestrateur). Brasserie familiale avec terrasse = « Pour qui » exact de la fiche ; la carte à pointillés et prix cerclés supporte 9 catégories ; la table de 12 tirages absorbe les photos (sujets : salle, plats, bar, chalet). Pas d'équipe ni d'histoire exigée.

## Sections
- Conservées : marquee d'état, hero poster (titre « Un moment hors du temps », slogan = baseline réelle), la maison (facade), la table (12 tirages), menu (6 catégories sur l'accueil), avis, manifeste, horaires, pied de page finale.
- Retirées : menu unique / formules, carte longue d'exemple, équipe, privatisation du samedi, avis réel.
- Réécrites : Carte (9 catégories réelles), La maison (faits connus seulement, valeurs en pastilles), Terrasse et chalet d'hiver (faits du dossier, plus d'exemple), À emporter (menus de fêtes réels 37 à 69 €, retrait 24 et 31 décembre), Réserver (Zenchef, téléphone, e-mail du site).
- Composants créés : aucun ; `itineraire()` (lien OSM par adresse, GPS inconnu) ; `geo` optionnel.

## Direction artistique
- Palette du lieu : cuivre du médaillon `#d98a56` (remplace le corail), vert profond de la salle `#1d5a4e` (remplace le canard), lin et paille conservés ; texte cuivre `#9c4620`, encre sur aplat cuivre (contraste).
- Polices Zodiak et Satoshi inchangées. Favicon : T cuivre sur rond vert. OG : vue aérienne du village.
- Photos : 22 WebP (≤ 1800 px) + variantes 640 px ; alt tirés du champ `sujet` ; sources 675 à 1200 px, jamais agrandies.

## Taux d'adéquation estimé : 78 %
1. Brasserie familiale avec terrasse et ambiance conviviale = cœur de cible du gabarit.
2. Carte réelle riche (9 catégories, prix) et photos de plats et de salle suffisantes pour la table.
3. Palette reprise du lieu (cuivre, vert).
Limites : la table pensée pour des photos de terrasse au flash ; photos majoritairement portrait (recadrées carré) ; aucun avis, histoire ni équipe ; objets au trait génériques (pas de fondue).
