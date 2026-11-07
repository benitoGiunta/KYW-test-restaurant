# DESIGN — L'Essentiel, variante portfolio (gabarit « Comptoir »)

## Choix du gabarit

Matrice (sur 5 : positionnement / ambiance / richesse du contenu / type de carte / réservation / signature), lue sur les FICHE.md :

| Gabarit | Pos. | Amb. | Contenu | Carte | Résa | Signature | Total /30 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| comptoir | 5 | 4 | 4 | 5 | 4 | 4 | 26 |
| velours | 5 | 3 | 3 | 4 | 4 | 4 | 23 |
| encre | 3 | 3 | 3 | 3 | 4 | 3 | 19 |
| quatre-mains | 2 | 3 | 2 | 3 | 4 | 3 | 17 |
| verger | 3 | 3 | 3 | 3 | 4 | 3 | 19 |
| ardoise, braise, cahier, collage, forno, guinguette, journee, maree, nocturne, affiche | 1 à 3 | 1 à 3 | 2 à 3 | 1 à 3 | 3 à 4 | 1 à 3 | 10 à 18 |

Décision : **comptoir**. Sa FICHE cite L'Essentiel parmi ses cibles (table gastronomique, assiette seule sujet, carte en deux assiettes
et menus numérotés). Velours est le second choix (étoile, cuivre, rideau) : son ambiance feutrée vert sapin et cuivre sert moins bien
une salle claire de brique et de bois blond, et ses « nombres vrais » (année d'ouverture, tables, chefs) manquent au dossier.
Comptoir n'est utilisé par aucun autre restaurant (UTILISATION.md).

## Sections

Conservées : hero (assiette collée au bord, ici la façade et l'enseigne), phrase manifeste, dressage (scène épinglée), liste numérotée,
split photo / aplat, quinconce, bande de distinctions, réserver, pied de page finale. Pages : `/`, `/menu/` (la carte, deux assiettes),
`/carte/` (menus Affaire, Plaisir, Balade, deux assiettes, accords), `/maison/` (ancien « Les chefs »), `/reservation/`, `/404`.
Retirées : portraits N&B des chefs (aucun portrait exploitable, chef non confirmé), avis cités (aucun extrait prouvé), bon cadeau (aucun
montant ni modalité dans le dossier), boissons illustratives. Ajoutées : `/chambres/` (4 chambres d'hôtes, tarifs du site actuel,
bandeaux), section « Chambres » de l'accueil, fermetures annuelles sur `/reservation/`, accords mets et boissons sur `/carte/`,
distinctions sourcées (Michelin, Gault&Millau 2024, note Google). Composant créé : `.bandeau` (photo panoramique 3,4:1).

## Direction artistique

- Tokens du gabarit conservés (blanc, encre `#161616`, Hanken Grotesk 200/400, Sentient italique) ; accent céladon remplacé par le
  laiton de l'enseigne, `#9a7a35` (3,9:1 sur blanc, usage : filets, focus, surfaces ; jamais en texte courant).
- Hero : la façade de brique et l'enseigne manuscrite dorée, recadrée 4:5 (identité du lieu). Le logo PNG fourni (300 px) est trop
  petit pour être servi : favicon à la lettre « e » en italique laiton sur encre.
- Dressage : recadrages de la photo du mignon de biche (1489 x 433, plats de 2018) ; seul « Mignon de biche » est sûr, les quatre
  autres composants sont nommés d'après l'intitulé de la carte et portent « illustratif » (limite : pas de détourage fin).
- Photos de plat en bandeaux (435 px de haut) : servies à leur largeur, jamais en plein cadre ; les splits utilisent les photos de salle
  (2400 px d'origine).
- Copy : vouvoiement, faits du dossier uniquement, aucun tiret cadratin, espaces insécables avant € et %.

## Adéquation estimée : 80 %

1. Ambiance : blanc, silence, un seul geste animé, conforme à une table étoilée où l'assiette est le sujet.
2. Structure : carte en deux assiettes, menus numérotés, services du midi et du soir, tout y a sa place sans forcer le gabarit.
3. Matière : façade, salles et chambres de haute qualité (2021) donnent un site riche.

Ce qui limite : photos de plats de 2018 en bandeaux 435 px (pas de vue de dessus détourée), aucun portrait du chef ni de l'équipe, pas
d'avis cités, année d'ouverture et parcours inconnus, dressage en recadrages et non en détourage.
