# DESIGN — Le 54 (variante portfolio, gabarit « Velours »)

## Choix du gabarit
Matrice (adéquation /5, lue sur les FICHE.md ; les 4 premiers sont les finalistes, les autres écartés sur un critère éliminatoire).

| Gabarit | Positionnement | Ambiance | Matière dispo | Carte | Réservation | Signature | Total /30 |
|---|---|---|---|---|---|---|---|
| **velours** | 5 | 5 | 4 | 5 | 3 | 4 | **26** |
| ardoise | 4 | 3 | 4 | 4 | 3 | 3 | 21 (déjà donné à 3 restaurants) |
| nocturne | 2 | 4 | 3 | 2 | 3 | 3 | 17 (bar, galerie de 12 photos) |
| encre | 3 | 3 | 3 | 3 | 3 | 3 | 18 (déjà utilisé) |
| maree, affiche, guinguette, collage, journee, forno, braise, comptoir | 1 à 2 | 1 à 2 | | | | | éliminés (ambiance lumineuse, populaire ou thématique) |

Décision : **Velours**. Table gastronomique à menu de saison en services, Gault&Millau, salle intime de 34 couverts,
chiffres vrais (3 ou 4 services, 48 / 65 €, 3 Collignon, reprise 2010). Gabarit encore jamais donné en portfolio.
Photos : salle noir et blanc très sombre (hero), gestes de dressage convertibles en N&B : cadre exact de Velours.

## Direction artistique (adaptée au restaurant)
- Palette tirée du logo (pinceau bleu nuit, losange doré) : `--c-bg #16273f` (bleu nuit), `--c-deep #0a121f`, or `#c9a24a` en aplat (jamais de dégradé), or clair `#e3cb8f`, ivoire `#eee6d8`. Remplace vert sapin et cuivre ; contrastes inchangés (or sur bleu nuit ≈ 6:1).
- Typographie du gabarit conservée (Boska capitales + Source Serif 4) ; le logo du restaurant n'est pas réutilisé tel quel (fond peint) : monogramme « 54 » dans le cercle de l'en-tête, favicon losange doré + 54.
- OG image : recadrage 1200x630 de la salle noir et blanc.

## Sections
- Conservées : hero, bande des guides, chapitres à chiffre monumental (services, prix, famille), citation qui s'allume, onglets, galerie N&B, carte de clôture, pages menu / formules / histoire / réservation / 404.
- Retirées : chapitre « 2 chefs » à portraits (aucun portrait du chef), bons cadeaux (inconnu), privatisation du samedi, citation Michelin, formulaire de démonstration.
- Ajoutées / transformées : onglets « La maison » (salle, cuisine, venir) à la place du samedi ; page `/salle/` (offres alternées + infos pratiques en liste, remplace `/privatisation/`) ; bande des guides avec Gault&Millau et resto.be (9,2/10, 251 avis, sans lien : URL inconnue) ; marques « à confirmer » (`.illu`) sur menus 2 et 4 services, horaires, lundi, couverts.
- Composants créés : aucun nouveau composant ; `horairesResume` réécrit (jours non contigus : « tous les jours sauf … »).

## Données
Tout vient de `data/restaurants/le-54/` (site client, Gault&Millau, resto.be, Trouve Ton Resto). Aucun avis, aucune baseline, aucun
nom de dessert inventé : baseline = description factuelle ; citation = fragment verbatim de Trouve Ton Resto (Lorry K.).
Chiffre « 4 services » : le menu se décline en 3 ou 4 services (site). Non résolu : nom exact des services.

## Adéquation estimée : 82 %
1. Ton gastronomique feutré, un menu unique en services et des chiffres vrais : le propos de Velours.
2. Palette du logo (bleu nuit + or) et photos de salle N&B prolongent l'identité existante.
3. Contenu 100 % prouvé, pas de matière fabriquée.
Limites : aucun portrait ni photo de façade, services non nommés, horaires à confirmer, pas d'outil de réservation en ligne (téléphone et formulaire du site actuel), note Google inconnue.
