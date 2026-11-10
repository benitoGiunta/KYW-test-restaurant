# DESIGN : Makimono, variante portfolio (gabarit « Affiche »)

## Choix du gabarit

Notes sur 5 (positionnement / ambiance / contenu disponible / type de carte / commande / signature). Les 15 FICHE.md ont été lus ; seuls les candidats plausibles sont notés.

| Gabarit | Pos. | Amb. | Contenu | Carte | Cmd | Signature | Total | Remarque |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| affiche | 5 | 5 | 4 | 4 | 5 | 5 | 28 | street food, carte directe, « défie le fast-food », page à emporter déjà prévue ; la pile en 5 couches = Create.Your.Roll (base, protéine, fillings, toppings, sauces) |
| comptoir | 4 | 3 | 3 | 3 | 2 | 3 | 18 | citait Makimono mais pensé pour table d'auteur à plat unique ; trop feutré pour du fast-casual |
| encre | 4 | 3 | 3 | 2 | 2 | 3 | 17 | rouleau de 12 plats maximum, déjà utilisé pour ferme-blanche-d-asie ; carte de plus de 100 lignes |
| forno | 2 | 4 | 3 | 3 | 3 | 3 | 18 | univers pizza |
| guinguette | 3 | 3 | 3 | 3 | 3 | 2 | 17 | familial, terrasse, trop rond |
| ardoise | 3 | 2 | 4 | 4 | 2 | 3 | 18 | brasserie à carte longue, déjà trois fois utilisé |

Décision : **affiche**, jamais utilisé (aucune ligne dans `gabarits/UTILISATION.md`). Le moteur de motion, les tokens et les composants sont conservés ; seuls le contenu, les couleurs, `Plat.astro` et les pages changent.

## Concept

Chaque écran est une affiche collée sur la précédente, comme au gabarit. Chez Makimono : l'affiche d'un fast-food créatif. Nom coupé en deux registres (« Maki » contour, « mono » plein, comme la typographie MAKI MONO du menu), le roll composé qui s'empile en cinq couches au défilement (la mécanique de Create.Your.Roll), prix calculé à la fin.

## Art direction

- Palette tirée du site actuel (rose poudré, noir/gris foncé, blanc) : `--rouge` devient rose poudré `#f4a3bb`, `--jaune` saumon `#ff9f66`, `--vert` nori `#17261f`, `--creme` `#fbf4ec`, `--ink` inchangé. Les noms de jetons sont conservés (contrat du moteur). Texte encre sur rose et saumon, crème sur nori.
- Archivo (gabarit) conservée : le script manuscrit du logo n'est pas repris en police (logo JPEG blanc non détourable proprement, à revoir en phase 2).
- Favicon : pastille rose, roll en coupe. OG : photo Creative Box recadrée 1200x630.
- Photos : 16 WebP (max 1800 px) dans `public/photos/`, alt tirés du champ `sujet` de `photos/index.json`.

## Sections

Conservées : hero + marquee, définition, « Ça s'empile » (scène épinglée), carte en bento, horaires, trois gestes, galerie inclinée, adresse + plan.
Retirées : équipe, histoire, « Deux potes » (aucune donnée : fondateurs et équipe inconnus), réservation (aucun outil), menu du jour, avis inventés.
Ajoutées : avis réels (3 extraits Google via Restaurant Guru, note 4,6 sur 532 « à confirmer »), page `/composer/` (Create.Your.Roll et Create.Your.Bowl, groupes de choix avec prix), page `/commander/` (Deliverect, Ordering Club, boxes, traiteur), page `/venir/`.

Pages : `/`, `/carte/`, `/composer/`, `/commander/`, `/venir/`, `404`.

## Composants créés ou modifiés

`Plat.astro` redessiné (roll composé en 5 couches `data-couche`), CSS `.liste(s)` (carte compacte : accompagnements, desserts, boissons), `.groupe(s)` (choix de Create.Your.*), `carte.json` (carte complète transcrite, générée depuis `donnees.json`), type `Categorie.format`.

## Adéquation estimée : 82 %

1. Le gabarit parle le langage du restaurant (fast-casual créatif, commande en ligne, carte directe) et sa pile en couches illustre Create.Your.Roll.
2. Toute la carte réelle est reprise (rolls, nigiri, poké, boxes, accompagnements, desserts, softs, alcools, boissons chaudes), photos pro de la carte exploitées.
3. Palette rose/noir fidèle au site actuel.

Limites : pas d'histoire ni d'équipe (pages « maison » impossibles sans faits), photos de salle et façade moyennes (smartphone), plat dessiné en SVG et non détouré photo, aucun outil de réservation, logo mascotte non intégré.
