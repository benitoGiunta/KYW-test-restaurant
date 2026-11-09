# DESIGN — La Ferme Blanche d'Asie · variante portfolio (gabarit « Encre »)

## Choix du gabarit
Note sur 5 : positionnement asiatique / ambiance / richesse du contenu / type de carte / réservation / signature. Lecture des FICHE.md (pas de capture d'aperçu relue : sobriété).

| Gabarit | Pos. | Amb. | Contenu | Carte | Résa | Signature | Total |
|---|---|---|---|---|---|---|---|
| encre | 5 | 3 | 4 | 4 | 4 | 4 | 24 |
| ardoise | 3 | 3 | 3 | 5 | 4 | 3 | 21 |
| journee | 3 | 3 | 3 | 3 | 3 | 3 | 18 |
| guinguette | 3 | 4 | 3 | 3 | 3 | 3 | 19 |
| velours | 2 | 3 | 1 | 1 | 3 | 3 | 13 |
| autres (affiche, braise, cahier, collage, maree, nocturne) | ≤ 2 | ≤ 3 | ≤ 3 | ≤ 3 | ≤ 3 | ≤ 2 | ≤ 16 |

Décision : **encre**. Sa FICHE cite ce restaurant parmi ses cibles ; il n'a encore été attribué à personne (UTILISATION.md). Ses limites sont contournées : le rouleau tient 12 plats (on en choisit 12 sur 56, la page Carte porte les 56), le texte vertical est réservé aux titres courts (le nom en trois colonnes), le plan est redessiné.

## Concept Card
Idea: la table ronde à plateau tournant se déroule : la carte est un rouleau de douze plats réels, le nom du restaurant se lit en trois colonnes verticales.
Metaphor: le plateau tournant, remplacé par le rouleau (même geste : faire défiler les plats un à un).
Signature: Le Rouleau (accueil, section épinglée, traits de pinceau SVG, sceau « FB » qui se pose).
Emotion: partager, prendre son temps.
Motion verb: glisse (inchangé, système du gabarit).

## Sections
- **Conservées** : hero, concept (01), Rouleau (02), diptyque (03), portraits (04), quinconce (05), Venir (06), pages Carte, Réserver, 404.
- **Retirées** : histoire des chefs, portraits d'équipe (aucune histoire, aucun nom au dossier), page « À emporter » d'exemple, rouleau d'exemple, citation Michelin, Zenchef.
- **Adaptées** : « Les chefs » devient « Les salles » (V.I.P. 26, grande salle ≈ 300) ; « L'histoire » devient « La maison » (le lieu, pas de légende) ; Carte = carte réelle numérotée 56 références + menu découverte + à emporter.
- **Ajoutées** : page `/maison/` (lieu, extérieur, cuisine, avis cités, bon à savoir), page `/salles/` (privées, menus de Noël 45 € et réveillon 65 €, acompte), section « Groupes » sur Réserver, ancres de catégories et allergènes sur Carte.
- **Composants** : Plan.astro redessiné (schéma du domaine : parking, bâtiment, terrasse, jardin et kiosque, allée) ; Rouleau.astro sans marques « exemple » (plats réels) ; ligne de carte à trois chiffres (`.ligne--carte`).

## Art direction
Tokens du gabarit inchangés (ivoire #F6F1E6, encre #19171A, vermillon #C6341F, pierre #66605A ; Shippori Mincho B1 + Spectral). Le vermillon du sceau rejoint le rouge des motifs au sol de la salle ronde et le jaune/doré des photos reste dans les images. Sceau « FB ». Photos : recadrage du bas (10 %) pour retirer le filigrane « Find Your Place », WebP 1400 px, variantes 960 px pour les héros ; cocotte et wok éclaircis (sources très sombres). Aucun kanji décoratif (le logo 莊園 du client n'est pas repris : 200 px seulement).

## Honnêteté des données
Réel : carte (56), prix, horaires, adresse, téléphone, e-mail, salles, fêtes, remise à emporter, avis cités (source nommée), notes (Resto.be marquée « à confirmer »). Corrections de transcription : « nid d » devient « nid d'hirondelle » (menu de Noël), apostrophes, « Bœuf ». Absent donc non affiché : baseline propre, histoire, équipe, année, avis Google, Instagram, desserts de Noël (mention explicite), karaoké (un seul avis). Photos de plats : aucune lisible, la cocotte et le wok ne sont reliés à aucun nom de plat.

## Taux d'adéquation estimé : 78 %
1. Gabarit nommé pour ce restaurant, motif de table ronde et rouleau cohérents avec le partage.
2. Carte réelle complète et lisible, plats à emporter, salles et fêtes traités à part.
3. Données honnêtes, sans invention.
Limites : photos de salles lumineuses et jaunes (le gabarit attend du sombre et chaud, le voile du hero compense), aucune photo de plat, ton plus calme que le restaurant familial, pas de réservation en ligne.

## Règles dures (QA en phase 2 et 3)
- [ ] 0 FAIL audit, 0 erreur console, pas de débordement 1440/390 (nom du hero en trois colonnes, en-tête à 4 liens)
- [ ] Reduced motion : rouleau en défilement natif, tracés affichés
- [ ] Hero peint au premier rendu ; hover par rôle ; idle vapeur
- [ ] Mini-script Playwright : clics réels sur les liens d'en-tête, bas de page avec KYW visible
