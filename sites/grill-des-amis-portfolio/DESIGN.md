# DESIGN, Le Grill des amiS, variante portfolio (gabarit « Braise »)

Sources : `data/restaurants/grill-des-amis/{dossier.md,donnees.json,photos/}`. Phase 1 (construction) : contenu, pages et mise en page statique ; animations avancées et QA navigateur restent à faire.

## Choix du gabarit

Matrice (sur 5 : positionnement / ambiance / matière dispo / type de carte / réservation / signature). Les gabarits non listés (affiche, cahier, collage, guinguette, journee, maree, nocturne, velours, verger, forno, encre, quatre-mains, comptoir) ont été écartés à la lecture des fiches : aucun ne fait du feu le sujet.

| Gabarit | Pos. | Amb. | Matière | Carte | Résa | Signature | Total /30 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Braise** | 5 | 5 | 4 (17 photos, 2 chambres de maturation, grill) | 4 (carte longue en liste index) | 4 | 5 (cuisson couche par couche d'une entrecôte) | **27** |
| Ardoise | 4 | 3 | 4 | 5 | 5 | 3 | 24 (déjà utilisé trois fois) |
| Nocturne | 3 | 4 | 3 | 3 | 4 | 3 | 20 |
| Velours | 3 | 3 | 3 | 4 | 4 | 2 | 19 |

Décision : Braise. Le restaurant est un grill au feu de bois qui fait maturer ses viandes ; la température descendante (900 à 20 °C) et la scène de cuisson en couches portent exactement ce sujet. Braise n'était pas dans `gabarits/UTILISATION.md` pour une variante portfolio.

## Concept

Une soirée au feu, du grill allumé à la table. Le thermomètre fixe garde le gabarit ; la signature devient « l'entrecôte du moment, couche par couche » (assiette, pièce, purée et légumes, sauce).

## Sections

- Conservées : hero, manifeste, cuisson, carte (liste index), les mains, salle (mur de 5 photos), avis (marquee), pratique, pied de page finale, 404.
- Adaptées : « carte du soir » devient « Au feu de bois » (7 grillades avec prix, lien vers la carte) ; « les mains » devient Elise et Gaëtan avec la photo des patrons et la chambre de maturation ; carte filtrée Entrées / Au feu / Boissons (10 catégories transcrites du PDF du 14 octobre 2026) ; page histoire devenue « La maison » (viande, maturation, feu) ; page privatisation devenue `/traiteur/` (menus sur mesure, barbecues livrés, privatisation à confirmer).
- Retirées : bon cadeau (pas dans les données), équipe de quatre (deux personnes connues), réseaux sociaux (aucun).

## Direction artistique

- Palette du gabarit (noir fumée, brun braise, ivoire) ; accent poussé vers un rouge-orangé (`#f2684d`, `#f47a5e` sur les deux premiers paliers de `STOPS`) pour rappeler le rouge saturé du site actuel.
- Typographie du gabarit (Melodrama, Literata).
- Photos : 17 images du dossier en WebP 1800 px max ; hero sur le grill et ses flammes ; OG et favicon (losange « GS ») produits pour l'occasion.
- Couches de la scène de cuisson : produites par un script ponctuel (photo 02 étendue en carré, masques polygonaux flous), voir ETAT.md.

## Adéquation estimée : 82 %

1. Le sujet (feu, viande maturée, découpe sur place) est la raison d'être du gabarit.
2. Carte longue lisible et filtrable, prix visibles, Menu Viandard mis en avant.
3. Contenu 100 % issu du dossier ; les trous (avis, e-mail, rôle d'Elise, privatisation) sont marqués illustratifs.

Limites : pas de photo nette des patrons (identité à confirmer), pas de vrais avis, pas de réseaux sociaux, scène de couches de qualité moyenne (assiette rectangulaire en perspective), plan schématique et non réel.
