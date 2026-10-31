# DESIGN — L'Atelier de Bossimé, variante portfolio

Gabarit retenu : **Verger** (`gabarits/verger/`, calendrier agricole, roue des saisons). Source du contenu :
`data/restaurants/atelier-de-bossime/` (dossier.md, donnees.json, photos/index.json, recherche du 31/10/2026).

## Choix du gabarit

Notes sur 5. Critères : P positionnement (gastronomique durable, ferme-table), A ambiance (ancien fenil en briques,
poutres, baies sur le potager, ferme), C richesse du contenu disponible (25 photos de qualité, histoire courte mais
réelle, aucun plat nommé, aucun producteur nommé), M type de carte (lunch 2/3 services, menus de 3 à 7 Moments à
composer sur livret ou en carte blanche, aucun plat publié), R réservation (Zenchef en ligne + téléphone), S sens de la
signature pour Bossimé.

| Gabarit | P | A | C | M | R | S | Total /30 | Remarque |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Verger** | 5 | 4 | 4 | 4 | 5 | 5 | **27** | ferme-table et locavore par définition ; la roue des saisons parle du potager de 45 variétés ; ne demande ni plats nommés ni duo |
| Comptoir | 5 | 3 | 3 | 2 | 5 | 3 | 21 | cite Bossimé dans sa fiche, mais exige un plat réel en 5 composants nommés et un menu unique de 6 à 8 services nommés : rien de cela n'est publié ; blanc clinique éloigné des briques et du bois |
| Cahier | 4 | 4 | 2 | 3 | 5 | 3 | 21 | ferme-table aussi, mais exige menu du jour daté, origine de chaque plat et 6 producteurs nommés : tout serait fictif |
| Velours | 4 | 3 | 4 | 3 | 5 | 3 | 22 | les nombres vrais existent (2011, 45, 7 Moments), mais le vert sapin feutré et le « menu unique » ne disent pas la ferme |
| Encre | 3 | 2 | 3 | 2 | 5 | 2 | 17 | table calme, mais registre asiatique |
| Nocturne | 2 | 2 | 3 | 2 | 5 | 1 | 15 | bar de nuit, aucune photo de jour exigée : la ferme est une photo de jour |
| Braise | 2 | 3 | 3 | 2 | 5 | 1 | 16 | le feu n'est pas le sujet |
| Quatre mains | 2 | 3 | 2 | 2 | 5 | 1 | 15 | exige deux voix (duo de chefs) : un seul chef |
| Journée | 2 | 3 | 3 | 3 | 5 | 2 | 18 | six moments de la journée, Bossimé n'en a que deux |
| Ardoise | 2 | 2 | 3 | 2 | 5 | 2 | 16 | carte longue d'abord : la carte de Bossimé n'a aucun plat écrit |
| Affiche | 1 | 1 | 3 | 2 | 5 | 1 | 13 | criard, à éviter en gastronomie |
| Forno | 1 | 2 | 3 | 2 | 5 | 1 | 14 | four à pizza |
| Guinguette | 1 | 2 | 3 | 2 | 5 | 1 | 14 | terrasse familiale |
| Marée | 1 | 2 | 3 | 2 | 5 | 1 | 14 | mer |
| Collage | 2 | 2 | 3 | 2 | 5 | 2 | 16 | lieu à plusieurs vies ; l'agenda gourmand est trop mince |

**Décision : Verger** (27/30), six points devant Comptoir et Cahier. Verger n'était utilisé par aucun restaurant
(`gabarits/UTILISATION.md` mis à jour). Comptoir, que sa fiche destinait à Bossimé, reste pertinent si le client
fournit un jour un plat signature nommé et photographié en composants.

## Sections : conservées, retirées, ajoutées

| Page | Conservé | Retiré | Ajouté ou transformé |
| --- | --- | --- | --- |
| Accueil | hero duo (mots empilés + vignette carrée), citation + escalier, roue des saisons, liste de menu, paires asymétriques, FAQ, bande réserver | « menu unique de saison 4 services » (n'existe pas) | h1 « La ferme / à table » ; liste des menus en Moments + prix du lunch ; autour de la roue, **4 assiettes réellement photographiées** à Bossimé (libellés descriptifs signalés) au lieu de 4 plats du menu ; **distinctions** en étiquettes (étoile verte, Gault&Millau, prix namurois) ; **avis cités** (3 extraits Mapstr sourcés et liés) |
| La carte | hero, catégories en liste, formules, escalier photo | menu dégustation 4 services, suppléments | lunch, Moments, boissons (prix réels) ; formules : lunch, Moments, **soirées de l'agenda gourmand** (soirée NeZ ZeN du 22/10/2026, réelle), chèques-cadeaux (modalités marquées « à confirmer ») |
| Saisons | hero, 4 cartes de saison, ingrédients du calendrier indicatif | 4 × 6 plats d'exemple inventés | une assiette **réelle** de Bossimé par saison (saison marquée « indicative ») |
| Producteurs | — | page entière (aucun producteur nommé dans le dossier : 6 fiches inventées) | remplacée par **La ferme** (`/ferme/`) : potager (45 variétés, bio, sol vivant, semences anciennes), 4 engagements en liste index (« trois accents sur le E »), **le projet en nombres** (6 nombres sourcés L'Avenir 2024 et site), distinctions, accès (35/30/40 min) |
| Histoire | hero, escalier, équipe en vignettes, galerie 6 photos | deux portraits de chefs, rôles inventés | récit en 4 paragraphes (2011, fenil, potager, projet Bossimé) ; « La maison » : chef (portrait marqué « à confirmer ») + brigade, salle, bar en photos collectives, sans nom inventé |
| Réservation | bouton Zenchef pleine largeur, téléphone, formulaire de démonstration, horaires | privatisation du samedi | bloc **Groupes, réunions et événements** (60 assis, 120 debout, ouverture dès 10 personnes, salle de réunion), e-mail, escalier de cinq marches signalé à l'adresse |
| 404 | inchangée | | |

## Composants créés ou modifiés

- `Logo.astro` (nouveau) : marque d'après le logo du client, serif droite « Bossime » dont le E porte **trois accents
  orange** (SVG, un par pilier de la durabilité), sous-titre « Ferme gastronomique » en condensée ; nom accessible
  « L'Atelier de Bossimé » en `sr-only`. Dans l'en-tête à la place du nom en italique.
- `Roue.astro` : titre « Ce qui pousse, ce qui vient », plats remplacés par les assiettes photographiées (lien vers
  `/saisons/`), note sous la roue qui explique le calendrier indicatif et les libellés descriptifs.
- Classes nouvelles dans `base.css` (bloc « Adaptation ») : `.distinctions`, `.avis`, `.index--valeurs`, `.chiffres`
  (nombres en condensée 300, même voix que les mots empilés), `.saison__photo`.
- `site.ts` : `distinctions`, `chiffres`, `saisons` avec photo réelle, `platsDuMois` avec `nomDescriptif`,
  `equipe[].photoPlaceholder`.

## Direction artistique

- Gabarit conservé : axe central, trois largeurs, mots empilés en Sofia Sans Condensed 300, Newsreader au corps,
  silences de 300 px, verbe « pousse », roue au scroll, branche du mois en pied de page.
- Palette recalée sur le logo : encre **aubergine** `#4a2742` (le `#291a28` du logo, éclairci pour se distinguer du
  texte `#262420`), accent **orange des trois accents** `#e8552a` (surfaces, points, traits, feuille du mois, jamais
  de texte : 2,9:1 sur crème), fond crème un peu plus chaud `#f7f3ec`. Le vert du gabarit disparaît : les photos
  du potager et des assiettes apportent le vert.
- Photos : 25 photos du client recadrées en carrés (ratio du gabarit) avec un point focal choisi par photo,
  WebP 800 px (600/641 px quand la source est plus petite), hero en `srcset` 560/800 préchargé.
- Favicon : B serif crème sur aubergine avec les trois accents orange. OG : l'assiette du velouté vert (visuel du hero
  du site actuel) en 1200×630.

## Adéquation estimée : 84 %

1. Le concept du gabarit (calendrier agricole, ce qui pousse) est exactement le discours de Bossimé (potager de
   45 variétés, circuit court, étoile verte) ; la roue a un sens ici, ce n'est pas un décor.
2. La photographie du client est abondante et de qualité : chaque vignette est une vraie photo de la maison, aucune
   photo libre.
3. Les contenus réels couvrent la carte (prix complets), les horaires, la réservation, l'histoire, les nombres du projet
   et des distinctions vérifiables.

Ce qui limite encore : aucun plat nommé (la roue montre des assiettes décrites d'après la photo et un calendrier
indicatif, pas la liste réelle des variétés) ; aucun producteur nommé ; l'identité du portrait du chef à confirmer ;
le logo n'existe qu'en 270 px (marque redessinée en texte + SVG, à valider par le client) ; heures de fermeture
issues du Guide MICHELIN.
