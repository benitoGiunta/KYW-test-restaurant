# DESIGN, Le Félicien, variante portfolio (gabarit « Ardoise »)

Sources : `data/restaurants/le-felicien/{dossier.md,donnees.json,photos/}`. Phase 1 (construction) : contenu, pages et mise en page statique ; animations avancées et QA navigateur restent à faire.

## Choix du gabarit

Matrice (sur 5 : positionnement / ambiance / matière dispo / type de carte / réservation / signature). Les gabarits non listés (comptoir, encre, velours, quatre-mains, nocturne, braise, verger, forno, maree) sont écartés d'emblée : cible gastronomique, asiatique, bar ou feu, sans rapport avec une brasserie classique à carte longue.

| Gabarit | Pos. | Amb. | Matière | Carte | Résa | Signature | Total /30 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Ardoise** | 5 | 4 | 5 | 5 | 5 | 4 | **28** |
| Journée | 4 | 3 | 2 (6 moments, 6 photos à la bonne lumière) | 3 | 4 | 3 | 19 |
| Guinguette | 4 | 3 | 2 (12 tirages) | 4 | 4 | 3 | 20 |
| Affiche | 3 | 2 | 3 | 3 | 4 | 3 | 18 |
| Cahier | 2 | 3 | 2 (origine de chaque produit) | 3 | 3 | 3 | 16 |
| Collage | 3 | 2 | 2 | 2 | 3 | 3 | 15 |

Décision : **Ardoise**. Sa fiche cite Le Félicien parmi ses cibles, la carte (68 lignes réelles) est la première chose qu'on veut lire, et le gabarit vit de typographie : il tient avec une seule vraie photo, là où Journée, Guinguette ou Collage exigent 6 à 12 images. Écart de 8 points avec le suivant. Ardoise a déjà servi (Le Royal, Partage) : la règle « préférer le gabarit non utilisé » ne joue que si deux gabarits sont proches, ce qui n'est pas le cas ici (écart 8 points).

## Adaptation

- **Direction artistique** : ardoise anthracite remplacée par un vert brasserie `#1e3224` (logo du client ~`#2d5736`, assombri pour garder le contraste), craie `#f3f1ea`, craie jaune `#e9d064` en accent (inchangé), muted `#a5b5a8`. Typographie du gabarit conservée (Cabinet Grotesk, Schibsted Grotesk) : le script du logo (Allura) reste dans le logo, placé en pied de page (version inverse). Favicon : « F » craie jaune sur vert ; OG : logo inverse sur vert.
- **Onglets** : MIDI | SOIR remplacés par **La carte** (midi et soir, identique) | **Midi** (suggestions de la semaine mardi au vendredi, cuisine du marché le lundi) | **Le bar** (cocktails, bières, softs). Défaut : la carte. Suggestion du jour : lundi réel, mardi à vendredi illustratifs (assignation d'un plat à un jour), week-end sans suggestion.
- **Sections conservées** : ardoise (accueil), formules (3 prix géants : suggestions 25 €, bambins dès 10 €, banquets dès 27 €), la salle, la maison, horaires et accès, réservation (Tablebooker), 404.
- **Sections retirées** : bon cadeau (rien au dossier), privatisation du samedi (propre aux Potes au Feu), avis cités (aucun extrait citable : `avis` supprimé), portraits des chefs et trio (aucune photo).
- **Sections ajoutées** : bloc « Premier étage » (banquets, réceptions, e-mail événements) en remplacement du bon cadeau ; « Presse » (L'Avenir, 26/01/2026) sur la page maison.
- **Composants** : aucun créé ; `Ardoise.astro` (3 onglets), `Footer.astro` (logo client), `histoire`, `salle`, `formules`, `carte`, `index` réécrits côté contenu.
- **Photos** : 1 vraie photo (pâtes, 2020, marquée dans l'alt), 1 illustration (couverture de la carte), 6 photos libres Unsplash (`placeholder: true`, légende « photo libre d'illustration », crédits sur la page salle) ; aperçus au survol seulement sur les 3 plats de pâtes (photo de pâtes) et le café gourmand (photo de café), jamais sur un plat sans rapport.
- **Données illustratives** : suggestions mardi à vendredi (attribution par jour), stationnement et transports (à venir), capacité (300 selon la presse, à confirmer), photos libres.

## Taux d'adéquation estimé : 78 %

Raisons : (1) carte réelle complète au centre de la page d'accueil, ce que fait Ardoise ; (2) horaires 7j/7 midi et soir pilotant état d'ouverture, tableau et JSON-LD ; (3) vert du client et logo repris. Limites : une seule photo réelle (salle, plats, façade absents), aucun avis citable, ambiance brasserie de 300 couverts peu rendue sans images, pas de carte des vins.
