# DESIGN — Escale en Vue ! (variante portfolio, gabarit Guinguette)

## Concept
Le site est une table de terrasse au-dessus de la vallée : on y attrape et déplace des objets dessinés au trait
(parasol, transat, verre, bouteille, citron, fourchette) et des tirages à cadre blanc (les 8 photos exploitables du
restaurant). Le trait du gabarit rejoint le logo du client (dessin au trait vert : maison, arbre, enfants).

## Choix du gabarit (matrice /5)
Lecture des FICHE.md des gabarits non encore utilisés pour un restaurant du dépôt (guinguette, journee, cahier, velours,
collage) ; les gabarits déjà attribués (UTILISATION.md) sont écartés à adéquation égale.

| Gabarit | Positionnement | Ambiance | Contenu dispo | Carte | Réservation | Signature | Total |
| --- | --- | --- | --- | --- | --- | --- | --- |
| guinguette | 5 | 5 | 4 (8 photos sur 12 tirages) | 3 | 4 (téléphone) | 5 (table de terrasse) | 26 |
| journee | 2 | 3 | 1 (6 moments inconnus) | 2 | 3 | 2 | 13 |
| cahier | 3 | 3 | 2 (origines inconnues) | 2 | 3 | 3 | 16 |
| velours | 1 | 2 | 1 | 1 | 2 | 2 | 9 |
| collage | 3 | 3 | 3 | 2 | 3 | 3 | 17 |

Décision : **guinguette**. Terrasse saisonnière familiale, joyeuse, photos de terrasse au flash (le gabarit les
attend, cf. FICHE « Limites »). Non utilisé jusqu'ici (`gabarits/UTILISATION.md` à mettre à jour : fichier protégé,
voir ETAT.md).

## Sections
- Conservées : hero poster + objets saisissables, la maison, la table (signature), la carte, avis, manifeste, horaires,
  page Carte, page La maison, page Réserver, 404.
- Retirées : équipe (inconnue), page À emporter (inconnue), formulaire de réservation (aucun outil en ligne, téléphone
  seul), formules et bons cadeaux, privatisation du samedi (propre à la référence), citation Michelin.
- Transformées : « Avis » = quatre notes tierces sourcées (aucun extrait inventé) ; « Terrasse et événements » =
  « Terrasse » (toutes les tables dehors, saison, carte bancaire, parking à confirmer) ; carte longue = offre réelle
  sans prix + carte d'exemple de saison marquée `placeholder`.
- Ajoutées : état de saison (marquee « Saison 2026 terminée, prochaine ouverture à confirmer » : `data-saison-terminee`),
  ligne « Saison » dans les horaires.

## Composants créés ou modifiés
- `Objet.astro` : cornet de frites remplacé par un transat au trait (même viewBox, même trait) ; le loader utilise le parasol.
- `Marquee.astro` + `motion/setup.ts` : mode « saison terminée » (aucune date en dur, aucun calcul d'ouverture).
- `Tirage` : champ `cote` (les sources carrées vont de 382 à 640 px ; aucune variante agrandie).

## Art direction
- Palette : lin, **corail du parasol rouge** (photo 01), **vert du logo** assombri `#3f5d2a` (variable `--c-canard`,
  texte clair dessus à plus de 7:1), paille, encre. Le bleu ciel de l'ancien site n'est pas repris (le vert tient la marque).
- Typo : Zodiak (titres, italique) + Satoshi, inchangées (le nom du site actuel est en serif capitale).
- Favicon : maison au trait + soleil corail. OG : recadrage de la photo 01 (1200×630, sans texte).
- Titre hero : « Faites escale, et une vue ! » (baseline du client) ; slogan = phrase du site actuel.

## Adéquation estimée : 80 %
1. Terrasse, vue, bières, convivialité : la table à tirages et les objets disent le lieu.
2. Contenu honnête : aucune carte ni prix inventé, notes tierces sourcées, saison dite terminée.
3. Photos de terrasse réelles.
Limites : aucune photo de plat soignée ni de façade, 3 photos à faible résolution (cadre 382 px), carte et prix
absents, pas d'équipe ni d'histoire, pas de réservation en ligne.
