# DESIGN.md : Bayti, variante portfolio (gabarit « Journée »)

## Choix du gabarit

Matrice sur 5 (lecture des FICHE.md : les 15 gabarits ont été jugés sur leur fiche ; seuls les 6 candidats plausibles sont détaillés). Critères : positionnement, ambiance, matière disponible, type de carte, réservation, signature.

| Gabarit | Positionnement | Ambiance | Matière | Carte | Réserv. | Signature | Total /30 |
|---|---|---|---|---|---|---|---|
| journee | 5 (deux services, jour et soir) | 4 | 4 | 4 | 5 | 5 (le jour qui tourne = Comptoir 11h puis restaurant 18h) | 27 |
| collage | 4 (plusieurs vies, une couleur chacune) | 3 | 4 | 3 | 4 | 3 (logo en trois cases, nom d'un mot : case vide) | 21 |
| cahier | 3 (traiteur, produits) | 4 | 2 (pas d'origines ni de fournisseurs connus) | 3 | 3 | 3 (menu manuscrit) | 18 |
| velours | 3 (menu unique) | 2 (feutré, pas de salle photographiée) | 2 (chefs, année : inconnus) | 4 | 4 | 3 | 18 |
| guinguette | 2 | 2 | 3 | 3 | 3 | 3 | 16 |
| verger / forno | 2 | 3 | 3 | 3 | 3 | 2 | 16 |

**Décision : Journée.** Bayti a exactement deux horaires qui se suivent (Comptoir 11h-19h, restaurant 18h-21h) et un traiteur hors horaire : le cadran du gabarit raconte cela sans rien inventer. Journée n'est attribué à aucun restaurant dans `gabarits/UTILISATION.md` (non mis à jour : `gabarits/` protégé, voir ETAT.md).

## Concept

Un jour chez Bayti : le ciel tourne du blanc de midi (Comptoir, mezzés à emporter) au vert sombre du soir (menu unique en 8 services), puis la maison ferme. Le disque soleil/lune descend sur la frise (crans à 11h, 18h, 21h). Verbe de motion : tourne comme une horloge (inchangé, phase 2).

## Sections

- **Conservées** : hero cadran (badge ouvert calculé, horloge, chips), moment split (Comptoir), médaillons ronds à titre courbé (spécialités du Comptoir), paire inversée (restaurant), horaires à flèches, frise, pages carte, histoire, réservation, 404.
- **Retirées** : café 7h, brunch 9h, déjeuner 12h (plat de la semaine), apéro 17h (happy hour, bande de cartes), dernier verre 23h, page brunch, équipe (aucune personne connue).
- **Ajoutées** : intro panoramique « Bayti, le foyer », section « Bayti chez vous » (traiteur, hors frise, ciel ocre), page `/chez-vous/`, horaires Comptoir / restaurant à la place de cuisine / bar, deux adresses (n°15 et n°6) partout.
- **Composants modifiés** : `Horaires` (lignes Comptoir et restaurant, toutes réelles), `Frise` (3 crans, échelle 7h-23h gardée), `Footer` (deux adresses), `Header` (Chez vous).

## Art direction

- Palette : soleil orange (feuilles d'automne des photos) et ivoire inchangés ; nuit passée du bleu marine au vert sapin (`#12281f`, `#1f4234`, `#0a1a14`), tiré du carrelage vert et des fonds de feuilles des photos.
- Typographie : Bricolage Grotesque (titres) et Rethink Sans (texte), conservées : chaleureuses, lisibles, sans cliché oriental. Pas de calligraphie arabe (aucun logo vectoriel fourni).
- Photos : 33 photos du site client (WebP, 1800 px max). Aucune photo de salle ni de façade : les sections portent des assiettes, jamais de lieu.
- Favicon : demi-disque orange (soleil) sur vert sapin ; OG image : panoramique des mezzés recadré 1200x630.

## Contenu et données fictives

Aucune donnée inventée : texte issu de `donnees.json`, `dossier.md`. Pas d'équipe, pas de chef, pas d'année (inconnus) ; un seul avis (Brenda C., repris par bayti.be, sans date) ; note Google « 4,9 / +150 » non affichée (non vérifiée). Fermeture dimanche et lundi marquée « à confirmer ». Plan : pas de `placeholder: true` nécessaire en phase 1.

## Adéquation estimée : 82 %

1. Les trois temps du gabarit (jour, soir, fermeture) coïncident avec les horaires réels, la signature a un sens.
2. Photos culinaires très soignées, couleurs reprises (orange, vert).
3. Carte complète (menu 8 services, 4 catégories du Comptoir avec régimes).

Limites : aucune photo de salle ni de chef (le site reste « assiettes »), deux adresses à expliquer, traiteur sans tarif, motion avancée et QA navigateur encore à faire (phases 2 et 3).
