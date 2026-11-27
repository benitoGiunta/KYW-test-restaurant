# NE5T Intuition, variante portfolio : DESIGN

Gabarit retenu : **Velours** (`gabarits/velours/`). Passe construction-1 (concept, contenu, pages statiques, build).

## Choix du gabarit (matrice sur 5)

Lecture des FICHE.md (pas des 15 apercu.png : phase de test sobre). Restaurant : table gastronomique décomplexée dans un hôtel
et spa de charme, menu du mois à prix fixes (3 services 60 €, 4 services 75 €), peu de photos de plats mais des photos
d'architecture et de spa très fortes, pas d'outil de réservation en ligne (téléphone), pas de distinction ni d'avis.

| Gabarit | Positionnement | Ambiance | Matière dispo | Carte | Réservation | Signature | Total |
| --- | --- | --- | --- | --- | --- | --- | --- |
| velours | 5 | 5 | 4 | 5 (menu en services, prix unique) | 3 | 4 (rideau + chiffre vrai) | 26 |
| comptoir | 4 | 3 (blanc, froid pour pierre et brique) | 3 | 4 | 3 | 3 | 20 |
| verger | 3 | 3 | 3 (menu change, mais pas de produits localisés) | 4 | 3 | 3 | 19 |
| ardoise | 2 (brasserie, carte longue) | 2 | 3 | 2 | 4 | 3 | 16 |
| nocturne | 3 | 3 (pas de photos de nuit côté salle) | 3 | 2 | 3 | 3 | 17 |
| encre, affiche, guinguette, forno, braise, cahier, collage, journee, maree, quatre-mains | 1 à 2 | 1 à 3 | 1 à 3 | 1 à 3 | 2 à 3 | 1 à 3 | 10 à 16 |

Décision : **Velours**. Pourquoi : il vit de nombres vrais et ce restaurant en a quatre (4 services, 60 €, 6 suites et duplex,
45 couverts) ; son ton feutré, précieux et contenu convient à une table d'hôtel de charme ; non utilisé à ce jour
(`gabarits/UTILISATION.md` ne le cite pas ; non mis à jour ici, dossier `gabarits/` intouchable dans ce run : à reporter).

## Sections conservées, retirées, ajoutées

- Conservées : hero, bande de presse (devient « Revue de presse de la maison », 5 médias du site client, aucun titre inventé),
  chapitres « 4 services » et « 60 euros », citation à mots qui s'allument, onglets, galerie N&B, carte de clôture,
  pages menu / formules / maison / privatisation / réservation / 404.
- Retirées : bande des guides (aucune distinction trouvée), chapitre « 2 chefs » (portraits inconnus), « année de fondation »
  (inconnue), formulaire et Zenchef (le restaurant dit réserver par téléphone), bons cadeaux (non prouvés).
- Ajoutées : chapitre « 6 suites et duplex » (hôtel), page `/sejour/` « Suites et spa » (spa WellNE5T, tarifs, six hébergements,
  tarifs indicatifs, RoomRaccoon pour les chambres), onglets « Autour de la table » (privatisation, repas en suite, spa),
  menu du mois lu par temps (bouchées, deux impressions, pause affinée, dessert) avec choix « ou ».

## Composants

Aucun nouveau composant : `Chapitre`, `HeroPage`, onglets, galerie, `.offre`, `.triptyque` du gabarit réutilisés. Classes ajoutées
dans `base.css` : `.menu__ou`, `.menu__plat`, `.menu__prix`, `.recit__photo`.
Pas de numérotation de services dans le menu : le rapport entre les cinq temps de la carte et les « 3 ou 4 services » des formules
n'est pas prouvé (points « · »).

## Art direction

- Palette : vert sapin du gabarit remplacé par un **bleu nuit** (`#16222f`, fond profond `#0a1017`) tiré de la façade de nuit
  (hero) et du site actuel ; cuivre remplacé par un **ambre** (`#d09a4e`, texte clair `#e4c590`), l'ambre de la photo et du logo
  doré Intuition. Contrastes : ivoire 13,0:1, cuivre clair 9,7:1, ambre 6,5:1 sur le fond.
- Typographie du gabarit conservée (Boska capitales, Source Serif 4) : aucune écriture propre à l'identité à reprendre.
- Hero : façade de nuit (1900 px, qualité 5). Photos recadrées carré pour les chapitres, 2:3 pour les plats, N&B pour la galerie.
- Favicon : monogramme « N5 » ambre sur bleu nuit ; OG : façade de nuit 1200x630. Logo du client non repris (640 px, qualité 3).
- Citation : aucun avis dans le dossier ; la phrase est la devise de la maison (« Une seule invitation : suivre notre intuition »),
  étiquetée « La devise de la maison », renvoyant à la page restaurant de ne5t.com.

## Adéquation estimée : 82 %

Raisons : (1) Velours colle au ton (gastronomie contenue, prix fixes, nombres vrais) ; (2) la photographie d'architecture et de spa
porte le hero et deux pages ; (3) l'offre hôtel + spa + table est couverte par une page dédiée et trois onglets.
Limites : peu de photos de plats (3 exploitables), heures d'ouverture inconnues, aucun avis ni distinction, adresse à trancher
(Avenue Vauban 46 retenue contre Allée de Menton 26), pas de portraits (Nico et Manu illustrés par des photos de service neutres,
sans les nommer en légende), gabarit calme qui n'exploite pas le mouvement de l'eau ou de la pierre.
