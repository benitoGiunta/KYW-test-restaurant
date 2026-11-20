// Données réelles : data/restaurants/tariki/donnees.json et dossier.md (site tarikirestaurant.be, 19/11/2026).
// Aucun élément fictif : rien n'est marqué placeholder. Les prix du soir sont ceux de la page « La carte » (deux versions chez le client : à vérifier).
export const resto = {
  nom: 'Tariki',
  baseline: 'De notre route… jusqu’à votre table.',
  cuisine: 'Cuisine levantine au feu de bois',
  site: 'https://www.tarikirestaurant.be',
  rue: 'Rue de l’Ouvrage 2',
  ville: '5000 Namur',
  tel: '+32 492 92 18 39',
  telHref: 'tel:+32492921839',
  email: 'info@tarikirestaurant.be',
  instagram: 'https://www.instagram.com/tariki.restaurant',
  instagramNom: '@tariki.restaurant',
};

export type Plat = { nom: string; desc: string; prix: number };
export type Rubrique = { id: string; titre: string; plats: Plat[] };

export const midi: Plat[] = [
  {
    "nom": "Tawook",
    "desc": "Poulet, toum, sauce Tariki, pickles de légumes",
    "prix": 9
  },
  {
    "nom": "Tawook épicé",
    "desc": "Poulet, spicy toum, sauce Tariki, pickles de légumes",
    "prix": 9
  },
  {
    "nom": "Falafel",
    "desc": "Falafels croustillants, tahini, pickles de légumes",
    "prix": 9
  }
];
export const formuleMidi = { nom: 'Formule midi', prix: 17, desc: 'Un sandwich, un accompagnement (houmous, mutabal, salade fatoush ou batata harra) et une pièce de baklava.' };
export const soir: Rubrique[] = [
  {
    "id": "grignoter",
    "titre": "À grignoter",
    "plats": [
      {
        "nom": "Noix de cajou fumées",
        "desc": "Épices du Levant",
        "prix": 4
      },
      {
        "nom": "Olives Kalamata",
        "desc": "Agrumes, persil",
        "prix": 4
      },
      {
        "nom": "Expérience épicée",
        "desc": "Piments turşu, beurre cumin-harissa, pickles de légumes",
        "prix": 6
      },
      {
        "nom": "Bagel de Jérusalem",
        "desc": "Huile d’olive, zaatar",
        "prix": 5
      }
    ]
  },
  {
    "id": "partager",
    "titre": "À partager",
    "plats": [
      {
        "nom": "Houmous",
        "desc": "Pois chiches, tahini, aromates",
        "prix": 9
      },
      {
        "nom": "Labneh",
        "desc": "Ail confit, zaatar, huile d’olive",
        "prix": 9
      },
      {
        "nom": "Muhammara x Stracciatella",
        "desc": "Poivron rouge rôti, stracciatella, tomates fraîches",
        "prix": 13
      },
      {
        "nom": "Mutabal",
        "desc": "Aubergines fumées, sésame, grains de grenade",
        "prix": 9
      },
      {
        "nom": "Rakakat",
        "desc": "Feta, menthe, miel chaud (4 pcs)",
        "prix": 10
      },
      {
        "nom": "Fatayer",
        "desc": "Chaussons d’épinards acidulés (3 pcs)",
        "prix": 11
      },
      {
        "nom": "Halloumi",
        "desc": "Halloumi grillé, parmesan, citron, dukkah",
        "prix": 11
      },
      {
        "nom": "Falafel",
        "desc": "Tahini, pickles (4 pcs)",
        "prix": 10
      },
      {
        "nom": "Kebbeh",
        "desc": "Mélasse de grenade, pistaches (3 pcs)",
        "prix": 12
      }
    ]
  },
  {
    "id": "feu",
    "titre": "Au feu de bois",
    "plats": [
      {
        "nom": "Kefta",
        "desc": "Agneau, shakshouka, bawaz, légumes grillés",
        "prix": 19
      },
      {
        "nom": "Tawook",
        "desc": "Poulet, toum, sauce Tariki, légumes grillés",
        "prix": 17
      },
      {
        "nom": "Magret de canard",
        "desc": "Jus réduit à la grenade, salade d’herbes fraîches",
        "prix": 32
      },
      {
        "nom": "Maquereau",
        "desc": "Tahini à l’oignon caramélisé, salade d’herbes fraîches",
        "prix": 26
      },
      {
        "nom": "Brocoli rôti",
        "desc": "Tarator, huile d’Alep, pignons de pin",
        "prix": 18
      }
    ]
  },
  {
    "id": "accompagnements",
    "titre": "Accompagnements",
    "plats": [
      {
        "nom": "Batata Harra",
        "desc": "Grenailles dorées, relevées, citronnées",
        "prix": 8
      },
      {
        "nom": "Salade Fatoush",
        "desc": "Légumes croquants, tuile au thym, vinaigrette sumac",
        "prix": 8
      }
    ]
  },
  {
    "id": "desserts",
    "titre": "Desserts",
    "plats": [
      {
        "nom": "Glace Ashta",
        "desc": "Confiture de rose, barbe à papa",
        "prix": 9
      },
      {
        "nom": "Baklava pistache",
        "desc": "Pistache croustillante, glacée et fondante",
        "prix": 11
      }
    ]
  }
];

export const allergenes = 'Certains plats peuvent contenir des fruits à coque, du lait ou du sésame. Signalez toute allergie à l’équipe.';

// jour: 0 = dimanche (Date.getDay). Créneaux en 24 h constantes.
export const horaires = [
  { jour: 1, nom: 'Lundi', creneaux: ['18:00 à 21:00'] },
  { jour: 2, nom: 'Mardi', creneaux: ['18:00 à 21:00'] },
  { jour: 3, nom: 'Mercredi', creneaux: ['11:30 à 14:00', '18:00 à 21:00'] },
  { jour: 4, nom: 'Jeudi', creneaux: ['11:30 à 14:00', '18:00 à 21:00'] },
  { jour: 5, nom: 'Vendredi', creneaux: ['11:30 à 14:00', '18:00 à 21:00'] },
  { jour: 6, nom: 'Samedi', creneaux: ['11:30 à 14:00', '18:00 à 21:00'] },
  { jour: 0, nom: 'Dimanche', creneaux: [] as string[] },
];

export const route = [
  { n: '1', lieu: 'La Syrie', ligne: 'Un chemin commencé en Syrie' },
  { n: '2', lieu: 'Le Liban', ligne: 'passé par le Liban' },
  { n: '3', lieu: 'La Turquie et la Grèce', ligne: 'traversant la Turquie et la Grèce' },
  { n: '4', lieu: 'La Belgique', ligne: 'avant de trouver un foyer, Bayti, en Belgique' },
];
