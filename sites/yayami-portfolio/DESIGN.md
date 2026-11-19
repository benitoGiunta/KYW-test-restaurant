# DESIGN : Yayami Sushi, variante portfolio (gabarit Nocturne)

## Concept
Le site actuel (yayami.be) est déjà noir, rouge et blanc, avec un logo script rouge et blanc et huit visuels de catégories sur
fond noir. La refonte garde cette nuit et la met en scène : une enseigne rouge qui s'allume dans le noir. Le halo suit le
pointeur et révèle les photos de la mosaïque, les titres sont des tubes en contour rouge, comme un néon de ruelle japonaise.

## Choix du gabarit (matrice /5)
| Gabarit | Positionnement | Ambiance | Contenu dispo | Type de carte | Outil | Signature | Total |
| --- | --- | --- | --- | --- | --- | --- | --- |
| nocturne | 4 | 5 | 4 | 4 | 3 | 5 | 25 |
| affiche | 3 | 3 | 3 | 5 | 3 | 4 | 21 (déjà donné à makimono, sushi) |
| velours | 1 | 3 | 2 | 1 | 1 | 2 | 10 |
| guinguette | 3 | 2 | 3 | 3 | 3 | 3 | 17 |
| journee | 3 | 2 | 3 | 3 | 3 | 3 | 17 |
| collage, cahier | 2 | 2 | 2 | 3 | 2 | 2 | 13 |

Décision : nocturne. 8 des 15 photos exploitables sont sur fond noir, ce qui est exactement ce que la mosaïque lumineuse
demande ; la carte est longue (47 plats, 9 menus) et se lit en listes nues ; le mot d'ordre (« aucune photo de jour »)
convient. Déjà donné à pepite (bar) : aucun autre gabarit sombre n'est libre et makimono, seul sushi, a reçu affiche.
Limite : pas de réservation, donc le bouton de coin droit devient « Commander ».

## Sections
- Conservées : hero volets, « À savoir » (ex-règles de la maison), mosaïque 12 photos, liste « Menus et box »,
  scène collante (devenue « La maison » : 4 faits du dossier), « Venir » (adresse, téléphone, horaires), loader (horloge de
  service 18h à 22h), boutons de coin, pied de page finale.
- Remplacées : « Au bar » et cocktails → « À boire » et `/boissons/` (3 bières, 4 ramune, prix réels) ; « Soirées »,
  privatisation → « Commander » (livraison, emporter, commande en ligne) et `/livraison/` (zone, paiement) ;
  réservation → `/commander/` (lien vers la commande en ligne, téléphone, horaires, à savoir) ; histoire et équipe →
  `/maison/` (faits du dossier, six plats en mosaïque).
- Retirées : équipe, avis, récit, formulaire de réservation (rien de prouvé ni d'utile : pas de réservation de table).
- Ajoutées : aucun composant neuf ; `carte.json` et `photos.json` tirés des données par script.

## Art direction
- Accent : `--c-accent` #ff4438 (rouge enseigne éclairci du #df0505 du site : 5,8:1 sur le noir, texte encre dessus),
  `--c-rouge` #a50d12 pour les bandes. Le halo passe de l'ambre au rouge (`lampe.ts`). Les noms de variables du gabarit
  (`--c-accent`, `.btn--ambre`) sont conservés : ce sont le contrat du moteur.
- Typographie : Panchang 700 (tubes), Supreme (texte), inchangées. Le script du logo vit dans le logo (`logo.webp`,
  blanc et rouge sur transparent) posé dans l'en-tête ; pas de police script ajoutée.
- Photos : 15 sources client en WebP (1800 px max), hero volets california roll et gyoza, mosaïque 12 plats, nigiri en
  N&B pour la scène. Favicon : disque rouge et coupe de bol ; OG : nigiri assombri et logo.
- Copy : vouvoiement, français, sans tiret cadratin ; aucune donnée inventée (voir ci-dessous).

## Placeholders et trous
Aucun `placeholder: true` : tout vient de donnees.json. Absents faute de données, donc non affichés : histoire, équipe, avis,
réseaux sociaux, e-mail. Pas de photo de salle ni de façade (aucune photo libre ajoutée en phase 1).

## Adéquation estimée : 78 %
1. Ambiance sombre et rouge, mosaïque de plats sur fond noir, cohérente avec l'identité existante du restaurant.
2. Carte complète et prix réels, commande en ligne en premier plan, horaires 7/7 calculés.
3. Structure (livraison, zone, emporter) qui répond au vrai usage du restaurant.
Limites : pas de lieu ni d'humain (aucune photo de salle, histoire inconnue) ; le halo et les tubes n'existent pas sur tactile ;
photos de plateaux en basse résolution écartées ; la formule à volonté en salle évoquée par des tiers n'est pas confirmée.
