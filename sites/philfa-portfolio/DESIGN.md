# DESIGN, PhilFa (variante portfolio, gabarit Guinguette)

## Choix du gabarit
Matrice (sur 5) des gabarits plausibles pour une brasserie de centre-ville, carte longue par catégories, salle feutrée, terrasse, aucune photo de plat, aucun avis vérifié :

| Gabarit | Positionnement | Ambiance | Contenu dispo | Carte | Réservation | Signature | Total /25 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| guinguette | 5 (brasserie, terrasse, enfants) | 4 | 5 (12 photos recadrables en carré) | 4 | 5 | 4 (table de tirages, 12 photos de salle) | 27 |
| ardoise | 5 | 3 (anthracite, photos au survol : salle peu mise en valeur) | 3 | 5 | 5 | 3 | 24 |
| maree | 3 (pas de produits de la mer) | 2 | 3 | 3 | 5 | 2 | 18 |
| journee | 3 (fermé 2 jours, pas de 7h-23h) | 3 | 3 | 3 | 5 | 2 | 19 |
| velours | 2 (12/20, carte longue) | 3 | 3 | 2 | 5 | 3 | 18 |

Décision : **guinguette**. Raisons : brasserie familiale avec terrasse et menu bambins ; le gabarit se nourrit de photos de lieu (nous en avons 12, aucune de plat) ; il n'a pas encore servi dans `UTILISATION.md` (ardoise y compte déjà trois restaurants). `gabarits/UTILISATION.md` est protégé : à mettre à jour par la session mère (guinguette : philfa).

## Art direction
- Palette tirée de la salle et du logo : crème `#f1ebdd`, olive `#4a5a24` (remplace le canard : logo vert olive), ocre `#dc9f3b` (chaises ocre, remplace le corail en aplat), rose `#a23c5d` (banquettes, remplace corail-ink pour les textes), paille `#f0cf85`. Les noms des jetons du moteur sont conservés (`--c-canard`, `--c-corail`).
- Typographie du gabarit conservée (Zodiak titres, Satoshi texte) : le logo PhilFa est une sans légère, aucune écriture propre à reprendre.
- Objets au trait conservés (parasol = terrasse, verre, frites, fourchette, bouteille = bar, citron) : tous cohérents avec une brasserie.
- Photos : 12 originaux en WebP (1800 px max) et 12 recadrages carrés 640 px (`public/photos/s/`) pour la table de tirages. Pas de photo de plat : la page carte montre la salle. OG image : salle (03). Favicon : monogramme PF olive.

## Sections
- Conservées : hero poster, la maison, la table (signature, 12 tirages), le menu, avis, manifeste, horaires, pied de page finale.
- Adaptées : menu de l'accueil = 4 catégories réelles + menu du moment (35 / 41 €) ; avis = fiche Gault&Millau (paraphrase, non verbatim) + 3 cartes « Exemple d'avis » (placeholder) ; page « La maison » = histoire sourcée (2013, rénovation 2020, patrons, équipe sans photos) ; page « Terrasse et salle » = faits réels (20 places ombragées, 55 en salle).
- Retirées : page « À emporter » (take-away inconnu), privatisation du samedi (inconnue), carte longue d'exemple, portraits de chefs, bon cadeau en formule (mentionné en texte).
- Ajoutées : ligne « Exception : Fermé le 11 novembre ».
- Composants créés : aucun (moteur et composants du gabarit inchangés).

## Adéquation estimée : 78 %
1. Concept de table de terrasse et public familial cohérents avec brasserie, terrasse et menu bambins.
2. Carte réelle complète (24 plats) et menu du moment intégrés, horaires et réservation Barestho réels.
3. Palette et photos issues du lieu lui-même.
Limites : aucune photo de plat ni d'équipe, aucun avis vérifié (exemples marqués), ton ludique un peu plus festif que la salle feutrée.
