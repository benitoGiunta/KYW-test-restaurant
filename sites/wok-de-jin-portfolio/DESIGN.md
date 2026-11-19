# DESIGN — Wok de Jin, variante portfolio (gabarit « guinguette », adapté)

## Choix du gabarit
Gabarits non encore utilisés (UTILISATION.md) : cahier, collage, guinguette, journee, velours. Les gabarits déjà donnés à d'autres restaurants ne sont retenus que s'ils sont nettement meilleurs (aucun ne l'est : un buffet n'est ni un bistro de feu, ni une pizzeria, ni un bar).

| Gabarit | Positionnement | Ambiance | Matière dispo (22 photos, tarifs, pas d'histoire) | Type de carte | Réservation | Signature | Total /30 |
|---|---|---|---|---|---|---|---|
| guinguette | 5 (familial, tablées) | 4 (joyeux, objets au trait, palette recolorable) | 5 (12 tirages carrés possibles) | 4 (lignes à pointillés = tarifs) | 4 | 5 (la table à tirages : « grande tablée ») | 27 |
| collage | 3 | 3 | 4 | 3 | 4 | 3 (activités multiples absentes) | 20 |
| journee | 2 (7 jours mais 2 services) | 3 | 3 | 3 | 4 | 2 (cadran sans matin) | 17 |
| velours | 1 (gastronomique) | 1 | 3 | 1 (menu unique) | 4 | 2 | 12 |
| cahier | 1 (produits locaux) | 2 | 2 | 1 | 4 | 1 | 11 |
| ardoise / affiche / forno (déjà utilisés) | 3 | 3 | 3 | 3 | 4 | 3 | 19 |

Décision : guinguette. Le moment mémorable (attraper des photos et des objets sur une table) devient « la grande tablée » : un buffet, des groupes, des objets de table (théière, baguettes, nigiri).

## Direction artistique
- Palette (noms de jetons du moteur conservés) : lin rosé #f4e9de, corail #ef5e47 (rose-rouge du site actuel), `--c-canard` devient le bordeaux #5c1626, `--c-paille` devient l'or #e4b24c, encre #231517. Zodiak (titres) et Satoshi (texte) inchangés.
- Objets au trait redessinés dans `Objet.astro` (même viewBox, même trait 2,4) : bol fumant, baguettes, lanterne, nigiri, théière, wok. Loader : le bol.
- Caractères chinois décoratifs du site actuel : non repris (aucune police CJK embarquée, risque de tofu).
- Photos : 19 WebP (1800 px max) + 19 recadrages carrés 640 px (`public/photos/s/`) ; photos 10 et 11 (visages, droit à l'image à confirmer) non utilisées ; logo rond copié dans `public/photos/logo.png` (non affiché pour l'instant).

## Sections
- Conservées : hero poster, tirage + texte (devient « Le buffet »), la table (signature, « La grande tablée »), carte blanche (devient « Les tarifs »), manifeste corail (devient « Réveillon »), horaires, pied de page finale, page réservation, 404.
- Retirées : avis (aucun avis vérifié au dossier), équipe (inconnue), histoire (inconnue), terrasse, page « carte longue d'exemple », mot géant « Avis ».
- Ajoutées : « Cuisine ouverte » (wok et teppanyaki, 2 tirages), page `/reveillon/` (réelle : 80 €, DJ, acompte), page `/emporter/` (service réel, sans plat ni prix : la carte est un outil externe non lu).
- Pages : `/`, `/tarifs/`, `/maison/`, `/reveillon/`, `/emporter/`, `/reservation/`, 404.

## Composants créés ou modifiés
`Objet.astro` (6 nouveaux objets), `Marquee.astro` (« Midi et soir, fermé le mardi », calculé), classes `.puces` et `.liste-reveillon` (base.css). Le reste du gabarit est inchangé.

## Adéquation estimée : 80 %
1. Esprit familial et joyeux, grande tablée : correspond au positionnement (groupes, enfants, anniversaires).
2. Tarifs lisibles d'emblée (le site actuel les cache derrière des onglets) et réveillon mis en avant sans modale.
3. 19 photos réelles pleinement utilisées par la table à tirages.
Limites : pas d'avis, pas d'histoire, pas d'e-mail, pas de carte à emporter ; la palette lin/corail est plus claire que le bordeaux profond du site actuel ; lien de réservation générique = site actuel.
