// Données du Panorama : tout vient de data/restaurants/panorama-citadelle (donnees.json, dossier.md, PDF du site).
export type Plat = { nom: string; desc: string | null; prix: string };
export type Rubrique = { titre: string; id: string; plats: Plat[] };
export const carte: Rubrique[] = [
 {
  "titre": "Pour l’apéro à partager",
  "id": "pour-l-apero-a-partager",
  "plats": [
   {
    "nom": "Brocolinette",
    "desc": "tzatziki, bubu arare, combava, grenade, menthe",
    "prix": "16,50 €"
   },
   {
    "nom": "Crevettes Nobashi croustillantes",
    "desc": "mousseline aigre-douce, kalamansi",
    "prix": "21,00 €"
   },
   {
    "nom": "Calamars frits",
    "desc": "shichimi, lime",
    "prix": "16,50 €"
   },
   {
    "nom": "Croquettes de jambon ibérico (5 pc)",
    "desc": null,
    "prix": "19,00 €"
   },
   {
    "nom": "Poulet karaage",
    "desc": "sauce plum barbecue fumé",
    "prix": "21,00 €"
   }
  ]
 },
 {
  "titre": "Instant de folie",
  "id": "instant-de-folie",
  "plats": [
   {
    "nom": "Tartare de bœuf Angus coupé au couteau",
    "desc": "caviar Dauricus, crème aigrelette, blinis",
    "prix": "59,00 €"
   }
  ]
 },
 {
  "titre": "Au four à bois",
  "id": "au-four-a-bois-flammekueche",
  "plats": [
   {
    "nom": "Tarte flambée tradition",
    "desc": "lardons, oignons, crème",
    "prix": "19,00 €"
   },
   {
    "nom": "Tarte flambée gratinée",
    "desc": "lardons, oignons, crème, fromage",
    "prix": "21,00 €"
   },
   {
    "nom": "Tarte flambée saumon",
    "desc": "chlorophylle aneth, graines de moutarde",
    "prix": "23,00 €"
   },
   {
    "nom": "Tarte flambée gratinée « raclette »",
    "desc": "champignons des bois, salade de blé, noix",
    "prix": "24,00 €"
   },
   {
    "nom": "Tarte flambée chicon gratin",
    "desc": "chiffonnade de jambon cuit",
    "prix": "24,00 €"
   }
  ]
 },
 {
  "titre": "Entrées froides",
  "id": "entrees-froides",
  "plats": [
   {
    "nom": "Huîtres Cancale creuses n°3",
    "desc": null,
    "prix": "26,00 €"
   },
   {
    "nom": "Sashimi de saumon à la flamme Kombujime",
    "desc": "vinaigrette huître, tonburi façon taboulé de mer, huile de livèche",
    "prix": "26,00 €"
   },
   {
    "nom": "Noix de Saint-Jacques",
    "desc": "Italicus, coco, fenouil, concombre, crème épaisse Isigny, aneth",
    "prix": "29,00 €"
   },
   {
    "nom": "Marbré de foie gras de canard et anguille fumée",
    "desc": "chutney de pomme balsamico, pain de campagne toasté",
    "prix": "27,50 €"
   },
   {
    "nom": "Œuf mimosa",
    "desc": "thon, anchois, bacon, laitue",
    "prix": "12,00 €"
   }
  ]
 },
 {
  "titre": "Entrées chaudes",
  "id": "entrees-chaudes",
  "plats": [
   {
    "nom": "Noix de Saint-Jacques snackées",
    "desc": "chou kimchi, pecorino, poire, chlorophylle aneth, sésame",
    "prix": "29,00 €"
   },
   {
    "nom": "Croquettes de crevettes grises (2 pc)",
    "desc": "persil frit, citron",
    "prix": "25,00 €"
   },
   {
    "nom": "Fondus au fromage Vieux Bruges (2 pc)",
    "desc": "persil frit, citron",
    "prix": "19,00 €"
   },
   {
    "nom": "Feuilleté au ragoût de champignons des bois",
    "desc": "abricot, vin jaune, ciboule",
    "prix": "23,00 €"
   },
   {
    "nom": "Foie gras de canard poêlé",
    "desc": "chiconette confite, Amaretto, râpé de truffe, amande",
    "prix": "27,50 €"
   },
   {
    "nom": "Poêlée de cuisses de grenouilles",
    "desc": "beurre à l’ail, persil",
    "prix": "23,00 €"
   }
  ]
 },
 {
  "titre": "Poissons",
  "id": "poissons",
  "plats": [
   {
    "nom": "Sole n°2",
    "desc": "fondue d’épinards, purée au beurre ou frites",
    "prix": "Prix du jour"
   },
   {
    "nom": "Tartare de thon façon Américain",
    "desc": "sucrine, frites",
    "prix": "35,00 €"
   },
   {
    "nom": "Thon à la flamme",
    "desc": "teriyaki, légumes au wok, oignons frits, sésame, cacahuètes, coriandre, riz jasmin",
    "prix": "36,00 €"
   },
   {
    "nom": "Dos de cabillaud",
    "desc": "miso, pak-choï grillé, riz jasmin",
    "prix": "36,00 €"
   },
   {
    "nom": "Soupe de poisson façon bouillabaisse",
    "desc": "aïoli, fromage, pain toasté",
    "prix": "35,00 €"
   },
   {
    "nom": "Homard « café de Paris » (1/2 ou entier)",
    "desc": "frites",
    "prix": "39,00 € / 75,00 €"
   }
  ]
 },
 {
  "titre": "Viandes",
  "id": "viandes",
  "plats": [
   {
    "nom": "Américain de bœuf Holstein",
    "desc": "sucrine, frites, mayonnaise",
    "prix": "28,00 €"
   },
   {
    "nom": "Spare ribs de porc laqué",
    "desc": "cébette, sésame, oignons frits, cacahuètes, frites",
    "prix": "34,00 €"
   },
   {
    "nom": "Pain de viande porc et veau",
    "desc": "chicons confits au foie gras, rattes",
    "prix": "29,50 €"
   },
   {
    "nom": "Ris de veau",
    "desc": "béarnaise, sucrine, frites",
    "prix": "45,00 €"
   },
   {
    "nom": "Burger",
    "desc": "sauce américain, tomate, estragon, cerfeuil, câpres, salade, bacon, cheddar, frites",
    "prix": "29,50 €"
   },
   {
    "nom": "Filet de bœuf en croûte de poivre noir concassé, flambé au cognac",
    "desc": null,
    "prix": "45,50 €"
   }
  ]
 },
 {
  "titre": "Tout pour deux à partager",
  "id": "tout-pour-deux-a-partager",
  "plats": [
   {
    "nom": "Bar de ligne en croûte de sel",
    "desc": "beurre blanc, légumes de saison (± 50 min d’attente)",
    "prix": "98,00 €"
   },
   {
    "nom": "Épaule d’agneau",
    "desc": "zaatar, tzatziki aubergine, relish, menthe, grenade, pain gyros",
    "prix": "98,00 €"
   },
   {
    "nom": "Chateaubriand mariné teriyaki (cuisson lente 5 h)",
    "desc": "légumes au wok, oignons frits, sésame, cacahuètes, coriandre, riz jasmin",
    "prix": "94,00 €"
   }
  ]
 },
 {
  "titre": "Sur le grill",
  "id": "sur-le-grill",
  "plats": [
   {
    "nom": "Rib-eye Black Angus",
    "desc": "accompagnements, salade, frites, sauce au choix",
    "prix": "45,50 €"
   },
   {
    "nom": "Onglet irlandais Angus",
    "desc": null,
    "prix": "35,00 €"
   },
   {
    "nom": "Brochette de filet de bœuf",
    "desc": null,
    "prix": "36,00 €"
   }
  ]
 },
 {
  "titre": "Gibier",
  "id": "gibier",
  "plats": [
   {
    "nom": "Chevreuil façon Arlequin",
    "desc": "miso, soubise, agrume, croquette des gigues, nougatine, poire vanille",
    "prix": "48,00 €"
   }
  ]
 },
 {
  "titre": "Kids",
  "id": "kids",
  "plats": [
   {
    "nom": "Boulet à la liégeoise",
    "desc": null,
    "prix": "19,00 €"
   },
   {
    "nom": "Coquillettes jambon fromage",
    "desc": null,
    "prix": "19,00 €"
   },
   {
    "nom": "Spaghetti bolognaise",
    "desc": null,
    "prix": "19,00 €"
   }
  ]
 }
];
