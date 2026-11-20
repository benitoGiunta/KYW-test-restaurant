# DESIGN : Le Lodge Wépion, variante portfolio

## Choix du gabarit
Gabarit retenu : **guinguette** (non encore utilisé en portfolio, voir `gabarits/UTILISATION.md`).

| Gabarit | Positionnement | Ambiance | Contenu dispo | Carte | Réservation | Signature | Total /30 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| guinguette | 5 (brasserie familiale, terrasse) | 5 (bord de Meuse, terrasse) | 4 (12 photos, carte de 88 lignes) | 4 (carte longue, tirages de plats) | 5 (outil externe) | 4 (la table de tirages à attraper) | 27 |
| journee | 4 | 4 | 3 (horaires inconnus, moments illustratifs) | 3 | 4 | 3 (cadran sans horaires fiables) | 21 |
| maree | 3 | 4 | 3 | 3 | 4 | 3 | 20 |
| ardoise | 4 | 2 | 3 | 4 | 4 | 3 | 20 |
| velours, nocturne, encre | 1 à 2 | 1 à 2 | 2 | 1 | 4 | 2 | 12 à 14 |

Raisons : brasserie familiale avec terrasse sur l'eau, ce que décrit la fiche du gabarit ; carte longue qui passe bien en « carte blanche » à pointillés ; tea-room et desserts qui vont avec le ton joyeux. Limite : le ton joyeux doit composer avec l'incendie (voir décisions).

## Concept
Le site est la table de terrasse du Lodge. Lin, corail, canard (la Meuse), paille (bandeau d'annonce), Zodiak et Satoshi. Palette et typographie du gabarit inchangées : l'identité client (logo blanc, fond sombre) est sans écriture propre exploitable, le canard tient le rôle de l'eau.

## Sections
- Conservées : hero (objets au trait), la maison, la table (12 tirages), le menu (4 catégories en extrait), avis (3 extraits réels), manifeste, lieux, pages carte, la maison, réservation, 404.
- Ajoutées : bandeau d'annonce sur chaque page (fermeture, accueil à Erpent), marquee d'état statique, composant `Lieux` (Erpent / Wépion), page tea-room (crêpes, gaufres, glaces, desserts), bloc « Après l'incendie » avec liens presse.
- Retirées : formules (aucun menu au dossier), carte d'exemple, avis d'exemple, équipe à photos (une seule personne connue, sans photo), privatisation du samedi, page à emporter (seule donnée : une boîte à 1 €, mentionnée sur le tea-room).
- Transformées : terrasse (photos réelles, places et jours non communiqués), horaires (aucun horaire inventé : horaires de Wépion donnés comme historiques avec la contradiction signalée).

## Décisions d'art direction
- Le hero porte « Au bord de la Meuse », la fermeture est dite dès la première ligne (adresse du hero), le bandeau et le marquee.
- Les photos du client sont recadrées en carrés (`sharp`, position attention) pour les tirages ; 8 sources sont en portrait 2:3.
- Photo 11 (enseigne « Le Beau Rivage ») écartée.

## Adéquation estimée : 78 %
1. Brasserie familiale avec terrasse sur l'eau : le gabarit est fait pour cela.
2. Carte longue réelle (88 lignes) et 12 photos du client.
3. Situation de fermeture traitée sans faux horaires.
Limites : ton joyeux face à l'incendie, photos sombres de reportage et portraits recadrés, pas d'équipe ni d'avis datés, carte du lieu provisoire inconnue.
