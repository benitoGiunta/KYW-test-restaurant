# DESIGN — Li Micougni, variante portfolio (gabarit « Guinguette » adapté)

## Choix du gabarit
Notes sur 5 (lecture des FICHE.md, critères du prompt). Gabarits déjà attribués exclus d'office (quatre-mains, verger,
forno, comptoir, encre, ardoise, braise, affiche, collage). Candidats libres : cahier, guinguette, journee, maree, nocturne, velours.

| Gabarit | Positionnement | Ambiance | Matière dispo. | Carte | Réservation | Signature | Total /30 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| guinguette | 5 (bistrot convivial, grill, terrasse) | 5 (cour, grill, « même les demi-fous ») | 4 (17 photos, 12 tirages) | 5 (carte longue) | 3 | 5 (objets et tirages à attraper = partage) | **27** |
| cahier | 4 (produits locaux) | 3 | 2 (exige fournisseurs, inconnus) | 3 (carte du jour) | 3 | 3 (menu du jour écrit) | 18 |
| journee | 2 (7 jours, brunch) | 3 | 2 | 3 | 3 | 2 (ouvert mar-dim seulement) | 15 |
| maree | 1 (fruits de mer, eau) | 2 | 2 | 3 | 3 | 1 | 12 |
| nocturne | 2 (bar le soir) | 2 (photos de jour) | 3 | 3 | 3 | 2 | 15 |
| velours | 1 (gastronomique, menu unique) | 1 | 1 | 1 | 3 | 1 | 8 |

**Décision : guinguette.** Une maison née de l'amitié, des planches à poser au milieu de la table, un grill au
charbon dans la cour, une terrasse de 30 couverts : la « table de terrasse » où l'on attrape et déplace des objets
et des tirages est la bonne métaphore. Aucun autre restaurant ne l'a reçu.

## Concept adapté
Même moteur, même grille, même motion (rebond du hero et des boutons seulement). La table est celle de Li Micougni :
objets au trait de la maison (flamme de charbon, ardoise à partager, parasol, verre, bouteille, cornet de frites),
12 tirages carrés tirés des 16 photos du dossier, légendes d'après le champ `sujet` de `photos/index.json`.

## Direction artistique
- **Accent** : corail du gabarit remplacé par l'orange du logo `#d27635` (surfaces, traits, bande manifeste) ; texte
  d'accent `#9a3f1e` (5,6:1 sur lin) ; encre sur orange 5,2:1. Lin, canard, paille, encre inchangés.
- **Typo** : Zodiak + Satoshi du gabarit (pas de script propre à l'identité : le lettrage manuscrit du logo reste dans le logo).
- **Favicon** : monogramme M italique sur orange (le logo source est un JPEG, pas de SVG). OG : photo de salle 1200×630.

## Sections
- **Conservées** : hero poster, la maison, la table (signature), le menu (extrait de 4 catégories), manifeste, horaires, footer « À table ! ».
- **Transformées** : « Avis » devient « La maison en quatre cartes » (mot géant « Braise », 4 faits du dossier : aucun avis n'est publié) ;
  « équipe » devient « Ce qui fait la maison » (4 valeurs du dossier, aucun portrait ni nom de personne sans preuve) ;
  « terrasse » devient la page réelle (cour privée, 30 couverts, toute l'année) et la privatisation ; « réservation » = téléphone, e-mail, formulaire de démonstration vers un message e-mail.
- **Retirées** : page « À emporter » (inconnu au dossier), carte longue d'exemple, avis d'exemple, Zenchef.
- **Composants créés** : objets `flamme` et `ardoise` dans `Objet.astro`.

## Données et placeholders
- `site.horairesPlaceholder: true` : le site actuel annonce « mardi 17 h à dimanche 17 h » ; heures de fermeture, midi / soir, samedi non connus. Les créneaux sont illustratifs (mention « à confirmer / illustratif » visible), non publiés en JSON-LD.
- GPS inconnu : `geo: null`, lien d'itinéraire par recherche d'adresse. Adresse d'exploitation Rue des Brasseurs 110 (la BCE donne un autre siège).
- Menu de la semaine : prix non publié, rien d'affiché. Avis, presse, équipe : vides.

## Adéquation estimée (phase 1) : 80 %
1. Métaphore de la table partagée et du grill/cour très proche du dossier.  2. Carte réelle complète (≈ 60 plats) et 16 photos réelles.  3. Orange du logo repris.
Limites : horaires à confirmer, pas de photo de façade ni d'équipe, objets au trait génériques, pas d'avis.
