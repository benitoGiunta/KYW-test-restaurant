# DESIGN · Chez Guillaume · variante portfolio

## Choix du gabarit

Restaurant et comedy club (Namur, rue Lelièvre 4) : trois vies réelles, la table du soir (mer-sam, repas avant le
spectacle), la scène, le brunch du dimanche ; plus le lundi « face à la crise », la privatisation et le bon cadeau.
10 photos reportage (salle, scène, plats, bar, cuisine), pas de façade, aucun avis client publié, presse réelle.
Identité du site actuel : illustrations au trait, ton humoristique, rouge / rouille / crème (logo `#CD3B08`).

Notes sur 5 : positionnement · ambiance · richesse du contenu · type de carte · réservation · signature.

| Gabarit | Pos. | Amb. | Contenu | Carte | Résa | Signature | Total /30 | Remarque |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **collage** | 5 | 5 | 5 | 4 | 4 | 5 | **28** | conçu pour « restaurant avec scène ou comedy club, lieu à plusieurs vies » ; ses trois activités (table, scène, brunch) deviennent ici toutes réelles |
| nocturne | 4 | 3 | 3 | 3 | 3 | 3 | 19 | cite chez-guillaume, mais exige 12 photos de nuit et une carte de bar ; le brunch de jour y est hors ton |
| quatre-mains | 3 | 3 | 3 | 3 | 3 | 2 | 17 | deux voix (restaurant + scène) possibles, mais le diptyque vise un duo ; déjà utilisé (les-potes-au-feu) |
| journee | 3 | 3 | 3 | 3 | 3 | 2 | 17 | cadran de six moments ; Chez Guillaume n'en a que trois, le reste serait illustratif |
| guinguette | 2 | 3 | 3 | 3 | 3 | 3 | 17 | trait dessiné proche de l'identité, mais terrasse familiale |
| affiche | 3 | 3 | 3 | 3 | 3 | 2 | 17 | aplats francs, mais carte courte street food |
| ardoise, cahier, braise, forno, maree, encre, comptoir, velours, verger | 1-2 | 1-2 | 2-3 | 2-3 | 3 | 1 | 10-14 | positionnements sans rapport (brasserie à carte longue, feu, four, mer, asiatique, gastronomie, saison) |

**Retenu : Collage.** Écart de 9 points avec le suivant ; jamais utilisé en portfolio (`gabarits/UTILISATION.md` :
quatre-mains, verger). `gabarits/UTILISATION.md` n'est pas mis à jour : `gabarits/` est protégé dans cette passe
(consigne du workflow) ; ligne à ajouter par l'orchestrateur : `| collage | chez-guillaume |`.

## Concept

- **Idée** : le mur de flyers à l'entrée du comedy club. Chaque vie du lieu a son aplat : la table (vert), la scène
  (rouge rideau), le brunch (bleu) ; l'écru pour ce qui est commun (manifeste, privatisation, presse), le jaune post-it
  pour les infos pratiques.
- **Signature** (héritée) : le logo-étiquette « Chez · Guillaume » collé en haut à gauche absorbe une case de la couleur
  de la section avec le nom de l'activité (Table, Scène, Brunch, Privatiser).
- **Verbe de motion** : se colle. **Émotion** : « on va voir qui ce soir ? » (phrase du hero du site actuel, reprise en
  titre de la section scène).

## Adaptation

### Direction artistique
- **Accent** tiré du logo : rouille `#CD3B08` (`--c-rouille`, surfaces et favicon, jamais sous du texte courant).
- **Scène** : le rose du gabarit devient un rouge rideau `#EE7752` (rouille éclairci, ink dessus 6,9:1), écho des
  rideaux rouille et bordeaux des photos de salle et de la banquette rayée rouge et blanc. Vert table et bleu brunch
  conservés (contraste éprouvé, trois couleurs distinctes pour trois vies).
- Typo du gabarit conservée (Libre Caslon Display / Text, Space Mono) : le logo du restaurant est un lettrage vectoriel
  rouille sans script manuscrit à reprendre.
- Logo en deux cases (le nom a deux mots) ; le h1 du hero ajoute une troisième case plus petite « restaurant & comedy club ».
- Favicon « CG » en cases écru / rouille ; OG 1200×630 recadrée sur la scène.
- Photos : 10 photos du dossier en WebP (pleine taille ≤ 1024 px, variantes 640 / 800) ; trois recadrages paysage 16:10
  (`hero-scene`, `salle-projecteurs-large`, `salle-rideaux-large`) pour le hero et les cartouches sur photo. Alt d'après le
  champ `sujet` de `photos/index.json`, aucune personne nommée.

### Sections
| Page | Conservé | Retiré | Ajouté / changé |
| --- | --- | --- | --- |
| Accueil | hero, manifeste + bulle, Table, Scène (agenda), vague, Brunch + tasse, Privatiser, Infos | post-its « activité d'exemple », avis illustratifs, carte « le bâtiment » | Table : les trois menus du mois et leurs prix ; Scène : rythme réel de la semaine + renvoi billetterie ; Brunch : buffet réel, ticket du dimanche ; « La presse en parle » (3 titres réels) ; carte « Bon cadeau » |
| Carte | damiers alternés | postit « boissons d'exemple » | 3 menus (entrée, plat, dessert, prix 2/3 services), « Au bar » (cocktails, mocktails, vins bio), formules (brunch, lundi, ticket du dimanche, moins de 12 ans), liste du buffet |
| Agenda | Agenda ligné | bandeau « page d'exemple » | 7 rendez-vous réels sans date (mer-sam repas-spectacle, dim brunch 11h30 + spectacle 15h, lundi « face à la crise ») ; la programmation renvoie à la billetterie |
| Privatisation | cartouche + formulaire (devient un e-mail prérempli, phase 2) | formats mariage / chef à domicile | occasions réelles : team building, anniversaire, soirée d'entreprise, stand-up privé ; contact e-mail réel |
| Histoire | récit, fiches, galerie | fiches illustratives | « La maison » (GuiHome, notre cheffe), « Dans la presse » (liens réels datés) |
| Réservation | horaires, adresse | formulaire Zenchef de démo | trois voies réelles (billetterie du soir, brunch par e-mail / téléphone, bon cadeau `#bon-cadeau`), FAQ en volets `<details>` |
| 404 | « Décollé » | | texte adapté |

### Composants et données
- `site.ts` : champs ajoutés `formules`, `bonCadeau`, `programmation`, `faq`, `Avis.url` ; `geo` nullable (non géocodé),
  JSON-LD sans `geo`, avec `email`. `horaireTexte` ajoute la note du jour (« repas 18:30 à 20:30 »).
- Styles ajoutés : `.formules--colonne`, `.faq`, `.hero__case--petit`.
- Itinéraire : recherche OpenStreetMap par adresse (pas de coordonnées inventées).

## Adéquation estimée : 85 %

1. Le gabarit est fait pour un lieu à plusieurs vies avec scène : les trois activités sont toutes réelles, aucune n'est
   illustrative.
2. Contenu entièrement prouvé : menus du mois, prix, brunch, lundi, ticket du dimanche, privatisation, bon cadeau, FAQ,
   presse ; aucun avis ni chiffre inventé.
3. Accent et couleur de scène tirés du logo et des photos ; ton du lieu repris (« On y rit, on y mange, on y vit ! »,
   « On va voir qui ? »).

Limites : pas d'artistes ni de dates (la programmation vit sur la billetterie du site actuel, non branchée) ; aucune
photo de GuiHome ni de façade ; les illustrations au trait de l'identité ne sont pas reprises (aucun fichier source) ;
identité de la cheffe actuelle non confirmée (le récit date le nom à janvier 2025).
