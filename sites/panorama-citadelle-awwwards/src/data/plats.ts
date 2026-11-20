// Généré d'après data/restaurants/panorama-citadelle/donnees.json (carte d'automne 2026, PDF du site de l'établissement).
// Aucun plat fictif : `placeholder` reste absent. Prix en euros (nombre) ; « Prix du jour » passe par prixLibelle.
export interface Plat { nom: string; description: string | null; prix: number | null; prixAlt?: number; prixLibelle?: string; placeholder?: boolean }
export interface Categorie { id: string; titre: string; plats: Plat[] }
export const categories: Categorie[] = [
 {
  "id": "pour-l-apero-a-partager",
  "titre": "Pour l’apéro à partager",
  "plats": [
   {
    "nom": "Brocolinette",
    "description": "tzatziki, bubu arare, combava, grenade, menthe",
    "prix": 16.5
   },
   {
    "nom": "Crevettes Nobashi croustillantes",
    "description": "mousseline aigre-douce, kalamansi",
    "prix": 21
   },
   {
    "nom": "Calamars frits",
    "description": "shichimi, lime",
    "prix": 16.5
   },
   {
    "nom": "Croquettes de jambon ibérico (5 pc)",
    "description": null,
    "prix": 19
   },
   {
    "nom": "Poulet karaage",
    "description": "sauce plum barbecue fumé",
    "prix": 21
   }
  ]
 },
 {
  "id": "instant-de-folie",
  "titre": "Instant de folie",
  "plats": [
   {
    "nom": "Tartare de bœuf Angus coupé au couteau",
    "description": "caviar Dauricus, crème aigrelette, blinis",
    "prix": 59
   }
  ]
 },
 {
  "id": "au-four-a-bois-flammekueche",
  "titre": "Au four à bois (Flammeküeche)",
  "plats": [
   {
    "nom": "Tarte flambée tradition",
    "description": "lardons, oignons, crème",
    "prix": 19
   },
   {
    "nom": "Tarte flambée gratinée",
    "description": "lardons, oignons, crème, fromage",
    "prix": 21
   },
   {
    "nom": "Tarte flambée saumon",
    "description": "chlorophylle aneth, graines de moutarde",
    "prix": 23
   },
   {
    "nom": "Tarte flambée gratinée « raclette »",
    "description": "champignons des bois, salade de blé, noix",
    "prix": 24
   },
   {
    "nom": "Tarte flambée chicon gratin",
    "description": "chiffonnade de jambon cuit",
    "prix": 24
   }
  ]
 },
 {
  "id": "entrees-froides",
  "titre": "Entrées froides",
  "plats": [
   {
    "nom": "Huîtres Cancale creuses n°3",
    "description": null,
    "prix": 26
   },
   {
    "nom": "Sashimi de saumon à la flamme Kombujime",
    "description": "vinaigrette huître, tonburi façon taboulé de mer, huile de livèche",
    "prix": 26
   },
   {
    "nom": "Noix de Saint-Jacques",
    "description": "Italicus, coco, fenouil, concombre, crème épaisse Isigny, aneth",
    "prix": 29
   },
   {
    "nom": "Marbré de foie gras de canard et anguille fumée",
    "description": "chutney de pomme balsamico, pain de campagne toasté",
    "prix": 27.5
   },
   {
    "nom": "Œuf mimosa",
    "description": "thon, anchois, bacon, laitue",
    "prix": 12
   }
  ]
 },
 {
  "id": "entrees-chaudes",
  "titre": "Entrées chaudes",
  "plats": [
   {
    "nom": "Noix de Saint-Jacques snackées",
    "description": "chou kimchi, pecorino, poire, chlorophylle aneth, sésame",
    "prix": 29
   },
   {
    "nom": "Croquettes de crevettes grises (2 pc)",
    "description": "persil frit, citron",
    "prix": 25
   },
   {
    "nom": "Fondus au fromage Vieux Bruges (2 pc)",
    "description": "persil frit, citron",
    "prix": 19
   },
   {
    "nom": "Feuilleté au ragoût de champignons des bois",
    "description": "abricot, vin jaune, ciboule",
    "prix": 23
   },
   {
    "nom": "Foie gras de canard poêlé",
    "description": "chiconette confite, Amaretto, râpé de truffe, amande",
    "prix": 27.5
   },
   {
    "nom": "Poêlée de cuisses de grenouilles",
    "description": "beurre à l’ail, persil",
    "prix": 23
   }
  ]
 },
 {
  "id": "poissons",
  "titre": "Poissons",
  "plats": [
   {
    "nom": "Sole n°2",
    "description": "fondue d’épinards, purée au beurre ou frites",
    "prix": null,
    "prixLibelle": "Prix du jour"
   },
   {
    "nom": "Tartare de thon façon Américain",
    "description": "sucrine, frites",
    "prix": 35
   },
   {
    "nom": "Thon à la flamme",
    "description": "teriyaki, légumes au wok, oignons frits, sésame, cacahuètes, coriandre, riz jasmin",
    "prix": 36
   },
   {
    "nom": "Dos de cabillaud",
    "description": "miso, pak-choï grillé, riz jasmin",
    "prix": 36
   },
   {
    "nom": "Soupe de poisson façon bouillabaisse",
    "description": "aïoli, fromage, pain toasté",
    "prix": 35
   },
   {
    "nom": "Homard « café de Paris » (1 / 2 ou entier)",
    "description": "frites",
    "prix": 39,
    "prixAlt": 75
   }
  ]
 },
 {
  "id": "viandes",
  "titre": "Viandes",
  "plats": [
   {
    "nom": "Américain de bœuf Holstein",
    "description": "sucrine, frites, mayonnaise",
    "prix": 28
   },
   {
    "nom": "Spare ribs de porc laqué",
    "description": "cébette, sésame, oignons frits, cacahuètes, frites",
    "prix": 34
   },
   {
    "nom": "Pain de viande porc et veau",
    "description": "chicons confits au foie gras, rattes",
    "prix": 29.5
   },
   {
    "nom": "Ris de veau",
    "description": "béarnaise, sucrine, frites",
    "prix": 45
   },
   {
    "nom": "Burger",
    "description": "sauce américain, tomate, estragon, cerfeuil, câpres, salade, bacon, cheddar, frites",
    "prix": 29.5
   },
   {
    "nom": "Filet de bœuf en croûte de poivre noir concassé, flambé au cognac",
    "description": null,
    "prix": 45.5
   }
  ]
 },
 {
  "id": "tout-pour-deux-a-partager",
  "titre": "Tout pour deux à partager",
  "plats": [
   {
    "nom": "Bar de ligne en croûte de sel",
    "description": "beurre blanc, légumes de saison (± 50 min d’attente)",
    "prix": 98
   },
   {
    "nom": "Épaule d’agneau",
    "description": "zaatar, tzatziki aubergine, relish, menthe, grenade, pain gyros",
    "prix": 98
   },
   {
    "nom": "Chateaubriand mariné teriyaki (cuisson lente 5 h)",
    "description": "légumes au wok, oignons frits, sésame, cacahuètes, coriandre, riz jasmin",
    "prix": 94
   }
  ]
 },
 {
  "id": "sur-le-grill",
  "titre": "Sur le grill",
  "plats": [
   {
    "nom": "Rib-eye Black Angus",
    "description": "accompagnements, salade, frites, sauce au choix",
    "prix": 45.5
   },
   {
    "nom": "Onglet irlandais Angus",
    "description": null,
    "prix": 35
   },
   {
    "nom": "Brochette de filet de bœuf",
    "description": null,
    "prix": 36
   }
  ]
 },
 {
  "id": "gibier",
  "titre": "Gibier",
  "plats": [
   {
    "nom": "Chevreuil façon Arlequin",
    "description": "miso, soubise, agrume, croquette des gigues, nougatine, poire vanille",
    "prix": 48
   }
  ]
 },
 {
  "id": "kids",
  "titre": "Kids",
  "plats": [
   {
    "nom": "Boulet à la liégeoise",
    "description": null,
    "prix": 19
   },
   {
    "nom": "Coquillettes jambon fromage",
    "description": null,
    "prix": 19
   },
   {
    "nom": "Spaghetti bolognaise",
    "description": null,
    "prix": 19
   }
  ]
 }
];
export const menus = [
 {
  "nom": "Le Pano Express",
  "prix": 12,
  "description": "Boisson chaude, jus d’orange pressé, viennoiserie au choix (petit-déjeuner, 8h-10h30)"
 },
 {
  "nom": "Le Pano traditionnel",
  "prix": 15,
  "description": "Boisson chaude, jus d’orange, viennoiserie, pain beurre, assiette jambon fromage, confiture, Nutella"
 },
 {
  "nom": "Le Pano Gourmand",
  "prix": 25,
  "description": "Pano traditionnel + œuf au choix et bacon, yaourt muesli, fruits frais"
 },
 {
  "nom": "Le Pano Healthy",
  "prix": 15,
  "description": "Boisson chaude, jus d’orange, yaourt muesli, pain, beurre, confiture, fruits frais"
 },
 {
  "nom": "Menu des fêtes 2026",
  "prix": 110,
  "prixLibelle": "par personne, boissons non comprises",
  "description": "Coupe de champagne, trois mises en bouche, entrée au choix (foie gras, Saint-Jacques, raviole de homard), plat au choix (filet de veau et ris de veau, médaillon de sole), dessert au choix, café ou infusion"
 }
];
