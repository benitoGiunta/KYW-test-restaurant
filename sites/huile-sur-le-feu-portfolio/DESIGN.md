# DESIGN : L'Huile sur le Feu, variante portfolio (gabarit « Marée »)

## Choix du gabarit
Notes /5 : adéquation positionnement (méditerranéen, Pouilles) · ambiance (salle ocre, huile dorée, feu) · richesse contenu (16 photos, carte longue de 51 lignes, 2 menus) · type de carte · réservation (Barestho) · signature.

| Gabarit | Pos. | Amb. | Contenu | Carte | Résa | Signature | Total /30 | Remarque |
|---|---|---|---|---|---|---|---|---|
| maree | 5 | 4 | 5 | 5 | 5 | 4 | 28 | cible nommée dans sa FICHE ; non utilisé ; lumineux, méditerranéen ; la houle devient une nappe d'huile |
| forno | 4 | 4 | 4 | 4 | 3 | 3 | 22 | déjà donné à dolce-vita-wepion (pâtes, italien) ; fond sombre |
| braise | 3 | 4 | 3 | 3 | 4 | 4 | 21 | « feu » mais viandes ; déjà donné à grill-des-amis |
| velours | 2 | 3 | 3 | 1 | 4 | 3 | 16 | menu unique gastronomique, carte longue impossible |
| verger | 3 | 3 | 3 | 3 | 3 | 2 | 17 | roue des saisons sans matière (saisons non datées) |
| guinguette, collage, journee, cahier | 2 | 2 | 3 | 3 | 3 | 2 | 15 | ambiances inadaptées |

Décision : **Marée**. Ambiance lumineuse sans section sombre (la salle est ocre, les photos chaudes), liste « index » idéale pour une carte de 10 catégories, ligne de temps des services exacte (mardi au samedi, midi et soir), la houle devient la nappe d'huile versée.

## Concept
Tout est posé sur une nappe d'huile : un filet ondulant sépare chaque paire de sections et découpe le bas de la photo du hero (flambage de la poêle, photo 04). Le nom s'étire bord à bord. Verbe : coule. Loader « huile versée » 0 cl → 50 cl.

## Art direction
- Palette : ivoire chaud #FBF7EE, encre bordeaux #3F1420 (logo et site actuel), lin d'olive #ECE8CF (remplace l'écume), sable #D9C58E, flamme #BD4413 (rare : badges, survols). Polices du gabarit inchangées (Gambetta, General Sans, Martian Mono).
- Photos du dossier uniquement (16 WebP, 1800 px max) ; aucune photo libre, donc pas de crédit.
- Logo : favicon et OG repris du dossier (19, 20). Logo négatif blanc copié dans `public/photos/logo-negatif.svg` (non utilisé en phase 1).

## Sections
Conservées : hero horizon, ligne de temps des services (Maree), listes index, bloc plein cadre teinté (devenu « boutique »), infos pratiques (ex-règles), accès, réservation, footer finale.
Transformées : écailler → **Les huiles** (page /huiles/, huile et plat associé quand le menu Gourmet le prouve) ; terrasse → **La boutique** (/boutique/, Oliviers & Co) ; histoire des deux chefs → **La maison** (Giuseppe Santamaria seul, 3 repères, avis Mapstr cités avec source et année).
Retirées : plan dessiné de la Meuse (`Plan.astro` supprimé, remplacé par `Acces.astro` : adresse, lien carte OpenStreetMap, horaires), photos libres d'eau, section équipe étoffée (une seule personne connue), formulaire conservé sur /reservation/ (démonstration, renvoie vers Barestho).
Ajoutées : composant `Acces.astro`, jeu de données `huiles`.

## Données et placeholders
Réel : nom, adresse, téléphone, e-mail, horaires, carte complète (51 lignes), menus Gourmet et Enfants, réseaux, Barestho, histoire (site du client), avis Mapstr.
Illustratif (`placeholder: true`, affiché « illustratif ») : parking, privatisation, vente à emporter (infos pratiques) ; coffrets cadeaux (boutique). Pas d'avis Google, de note, d'équipe ni de prix de boutique inventés.

## Adéquation estimée (phase 1, avant QA) : 82 %
1. Positionnement méditerranéen, tons chauds et page dédiée aux huiles. 2. Carte longue et services lisibles. 3. Boutique et histoire traitées avec les seules données prouvées.
Limites : date d'ouverture contestée (2005 selon le site), photos peut-être générées, pas de note ni d'avis vérifiés, aucune photo de l'équipe, nappe d'huile encore bleutée à vérifier visuellement en phase 2.
