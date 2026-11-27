# DESIGN.md : Dumont Bouge, variante portfolio (gabarit « Journée »)

## Choix du gabarit

Matrice (sur 5 : positionnement, ambiance, richesse du contenu, type de carte, réservation, signature). Gabarits écartés d'emblée : gastronomie à menu fixe (comptoir, velours, nocturne, forno, braise, affiche, encre, maree), déjà utilisés ou sans rapport avec une boulangerie ouverte toute la journée.

| Gabarit | Position. | Ambiance | Contenu | Carte | Résa | Signature | Total /30 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| journee | 5 | 4 | 5 | 5 | 4 | 5 | 28 |
| cahier | 4 | 3 | 2 (origines des produits inconnues) | 4 | 3 | 3 | 19 |
| guinguette | 3 | 3 | 3 | 3 | 3 | 3 | 18 |
| collage | 2 | 3 | 2 | 2 | 3 | 3 | 15 |
| verger | 3 | 3 | 2 | 3 | 3 | 3 | 17 |

Décision : **Journée**. Dumont Bouge ouvre 7 jours sur 7 de 7h à 18h et enchaîne petit-déjeuner, pain, brunch, sandwichs, tea-room : c'est exactement le cadran du gabarit (un moment = un ciel). Journée n'a été donné à aucun autre restaurant (UTILISATION.md : à mettre à jour par la session mère, `gabarits/` est protégé ici).

## Concept

Une journée de boulangerie vue comme un cadran : 6 moments de 7h à 18h, le ciel change au scroll, un disque rose descend sur la frise. Le rose (#ef5d9c) est celui du coup de pinceau du logo et du site actuel ; il remplace le soleil orange du gabarit (`--soleil`), donc le disque, les boutons d'accent et la teinte haute du moment « tea-room ».

## Moments

| Heure | Titre | Source |
| --- | --- | --- |
| 7h | Le petit-déjeuner | formules 13,80 € et 14,50 €, 7h-11h (embed menu actuel) |
| 9h | Le pain et la vitrine | 13 pains, gâteaux à la commande ; médaillons : vitrine, tarte, plateau |
| 11h30 | Le brunch | 6 familles de plats, 11h30-15h |
| 14h | Les Dagobert | sandwichs, salades, paninis à emporter |
| 15h30 | Le tea-room | gaufres, crêpes, coupes |
| 17h30 | Avant la fermeture | ferme à 18h ; Bouge 7h-18h, Namur 7h-17h ; commande de gâteaux par téléphone |

## Sections

Conservées : hero cadran, split, médaillons, liste index, bande de cartes, paire asymétrique, horaires à flèches, pied de page. Retirées : équipe, avis, histoire (aucune donnée : jamais inventées). Adaptées : page « Histoire » devenue « La maison » (4 métiers, 2 adresses) ; « Le dîner » devenu « Le tea-room » ; plat de la semaine devenu familles du brunch ; page Brunch réelle ; carte complète (211 lignes, 23 catégories, `src/data/carte.json` tiré de donnees.json).

Composants modifiés : `Horaires` (Bouge / Namur au lieu de cuisine / bar), `Frise` (plage 7h-18h), driver `journee.ts` (thème `aprem`, heures décimales, rose). Aucun composant créé.

## Direction artistique

Typo, grille, motion : celles du gabarit (Bricolage Grotesque + Rethink Sans). Ciel : aube, midi, ocre, après-midi (blanc), corail (rose vers corail), nuit (17h30, fermeture). Pas d'animations avancées dans cette phase.

## Adéquation estimée : ~80 %

1. Le cadran 7h-18h colle au rythme réel de la maison et à ses quatre métiers.
2. La carte complète avec prix est reprise telle quelle ; aucune donnée fictive.
3. Le rose du logo donne une identité propre au gabarit.

Limites : peu de photos (6 exploitables, rien du tea-room intérieur ni du brunch), pas d'histoire ni d'équipe, pas de GPS, gâteaux sans prix, l'heure 15h30 / 14h / 17h30 des moments est éditoriale (la carte du tea-room ne donne pas d'heures hors petit-déjeuner et brunch).
