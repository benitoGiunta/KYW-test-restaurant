# DESIGN : Le Ponti 2, variante portfolio (gabarit « Guinguette » adapté)

## Choix du gabarit
Dossier : restaurant italien et pizzeria de quartier à Jambes, « esprit familial », terrasse quand la météo le permet,
carte longue (99 lignes), 4 photos exploitables, aucune histoire, équipe ni avis. Notes sur 5 (positionnement, ambiance,
contenu disponible, type de carte, réservation, signature) :

| Gabarit | Note | Raison |
| --- | --- | --- |
| guinguette | 22/25 | pizzeria de quartier et brasserie familiale citées en cible ; carte longue prévue ; table de photos recadrables ; réservation externe |
| forno | 21/25 | pizzeria et trattoria, mais déjà donné à dolce-vita-wepion (UTILISATION.md) |
| affiche | 17/25 | pizzeria criarde : ton trop pop pour une trattoria familiale ; déjà utilisé (incorrect) |
| ardoise | 17/25 | carte d'abord, mais sans onglets midi/soir distincts, et déjà utilisé trois fois |
| comptoir, velours, encre | 6 à 9/25 | tables d'auteur : contresens |
| nocturne, braise, cahier, verger, maree, journee, collage, quatre-mains | 8 à 14/25 | signature sans objet ici (feu, saison, duo, scène, fruits de mer) |

Décision : **guinguette**, non encore utilisé. Il y a une signature de « table » où l'on attrape des objets et des tirages,
cohérente avec une table familiale ; carte réelle longue absorbée sans retouche du moteur.

## Concept
Une table de trattoria le dimanche en famille (émotion, pas un fait affiché : le restaurant est ouvert le dimanche).
Verbe : rebondit (hero et boutons). Signature conservée : « La table du Ponti », 12 tirages et 3 objets saisissables.

## Direction artistique
- Palette tirée du logo et des assiettes : lin `#efe8da`, **bordeaux `#7a2231`** (jeton `--c-corail`, texte clair `--c-on-corail`
  `#fbf4e6`, 9,6:1), canard `#1f6d74` (assiettes turquoise des photos), **or `#e3c27a`** (jeton `--c-paille`, surfaces seulement), encre.
- Typo inchangée : Zodiak (titres, proche du serif du logo) + Satoshi.
- Objets au trait : `frites` remplacé par `pizza`, nouveau `pont` (pont à trois arches du logo) ; parasol, verre, bouteille,
  fourchette, citron conservés. Favicon : pont bordeaux sur lin.
- Photos : 4 sources (pâtes, pizza, escalopes, façade de nuit) recadrées par `sharp` en 12 tirages carrés (640 px, `public/photos/s/`)
  et 4 pleins formats WebP. Pas de photo libre (les 4 suffisent pour la table ; limite : répétition visible des sujets).

## Sections
- Conservées : marquee d'état, hero, la maison, la table, le menu (extraits Pizzas / Pâtes / Escalopes panées), manifeste, horaires,
  pied de page finale « Buon appetito ! », pages Carte, La maison, Terrasse, Réserver, 404.
- Remplacées : section « Avis » (aucun avis en texte) par « À ne pas manquer » : mot géant « Ponti » flou puis net, 4 cartes inclinées tirées
  de la carte réelle (Pizza Maison, Saltimbocca, Tiramisu, Spritz Ponti).
- Retirées : équipe (inconnue), page À emporter (inconnue), privatisation du samedi (propre au gabarit), carte d'exemple.
- Ajoutées : section « Menu 3 services » (40 €) sur la page Carte, e-mail réel sur Réserver.

## Données et placeholders
Tout vient de `donnees.json` (carte dans `src/data/carte.json`, prix « 21,00 € » ramenés à « 21 € »). Aucun placeholder : histoire réduite à des faits
prouvés, aucun avis, aucune équipe, terrasse limitée à « lorsque la météo le permet » (places et jours « à confirmer »).

## Adéquation estimée : 80 %
1. Ton familial, carte longue et pizzas bien servis par la table et la carte à pointillés.
2. Palette bordeaux, or, turquoise issue du logo et des photos.
3. Réservation Barestho et téléphone au premier plan.
Limites : quatre photos seulement (recadrages répétitifs), pas d'histoire ni d'équipe, objets au trait encore à valider en QA, animations
non vérifiées en phase 1.
