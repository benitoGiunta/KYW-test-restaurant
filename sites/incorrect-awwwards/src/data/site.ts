// Contenu d'INCORЯECT. Sources : data/restaurants/incorrect/{donnees.json,dossier.md}.
// HYPOTHÈSES (voir RAPPORT.md) : horaires = ceux du Fooding (mar-sam soir, sam midi), sources divergentes, affichés « à confirmer » ;
// e-mail non repris (personnel dans restaurants.json, null dans donnees.json) ; aucun avis, aucune note, aucune place chiffrée ;
// 3 photos seulement (pas de portrait d'Alex ni d'Estelle : initiales en typographie) ; aucun contenu fictif (placeholder: aucun).
import carte from './carte.json';

export const site = {
  nom: 'INCORЯECT',
  nomTexte: 'Incorrect',
  baseline: 'La pizzeria rock-n-roll d’Alex et Estelle',
  description: 'INCORЯECT, pizzeria rock-n-roll à Namur : pizzas au levain à la pâte reposée 48 heures, dips au kimchi, bières craft. Rue Haute Marcelle 35. Réservation en ligne.',
  typeCuisine: 'Pizza napolitaine créative au levain',
  adresse: { rue: 'Rue Haute Marcelle', numero: '35', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.464418, lon: 4.8639223 },
  telephone: '+3281138561',
  telephoneLisible: '081 13 85 61',
  telephoneHref: 'tel:+3281138561',
  reservationUrl: 'https://incorrect.reservation.barestho.com/',
  planUrl: 'https://www.openstreetmap.org/?mlat=50.464418&mlon=4.8639223#map=18/50.464418/4.8639223',
  reseaux: [
    { nom: 'Instagram', url: 'https://www.instagram.com/incorrect.namur/' },
    { nom: 'Facebook', url: 'https://www.facebook.com/p/Incorrectnamur-61557438170846/' },
  ],
  credit: 'Photos : INCORЯECT',
  siteActuel: 'https://www.incorrect.pizza',
} as const;

/** Horaires du Fooding (mar-sam 18 h 30 à 21 h 30, sam midi 12 h à 14 h, fermé dim-lun) : sources divergentes, à confirmer. */
export const horaires = [
  { jour: 'Lundi', creneaux: [] as string[] },
  { jour: 'Mardi', creneaux: ['18 h 30 à 21 h 30'] },
  { jour: 'Mercredi', creneaux: ['18 h 30 à 21 h 30'] },
  { jour: 'Jeudi', creneaux: ['18 h 30 à 21 h 30'] },
  { jour: 'Vendredi', creneaux: ['18 h 30 à 21 h 30'] },
  { jour: 'Samedi', creneaux: ['12 h à 14 h', '18 h 30 à 21 h 30'] },
  { jour: 'Dimanche', creneaux: [] as string[] },
];
export const horairesNote = 'Horaires à confirmer : les sources consultées ne concordent pas.';
export const jourSchema = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export type Plat = { nom: string; prix: number | number[]; note?: string; description?: string; des?: boolean; placeholder?: boolean };
export type Categorie = { categorie: string; plats: Plat[] };
export const menu = carte as Categorie[];
const cat = (début: string) => menu.find((c) => c.categorie.startsWith(début))!;
export const pizzasClassiques = cat('Les pizzas classiques').plats;
export const pizzasDeNous = cat('Les pizzas de nous').plats;
export const enAttendant = cat('En attendant').plats;
export const trio = [
  enAttendant.find((p) => p.nom === 'Dwight Schrute')!,
  enAttendant.find((p) => p.nom === 'M.A.G.A')!,
  pizzasDeNous.find((p) => p.nom === 'Ananas Montana')!,
];

export const equipe = [
  { initiale: 'A', nom: 'Alexandre Hocquet', role: 'En cuisine', texte: 'Ancien boulanger, diplômé de l’école hôtelière de Namur. Passé par L’Air du Temps à Liernu, Bon-Bon à Bruxelles et Les Terres d’ici à La Hulpe.' },
  { initiale: 'E', nom: 'Estelle', role: 'Accueil et salle', texte: 'Elle reçoit, elle fait sourire, elle tient la salle. Son nom de famille n’est pas public.' },
] as const;

export const presse = [
  { media: 'L’Avenir / DH', titre: 'On a testé Incorrect, le resto qui revisite les pizzas à Namur', date: '5 février 2025', url: 'https://www.lavenir.net/lifestyle/2025/02/05/on-a-teste-incorrect-le-resto-qui-revisite-les-pizzas-a-namur-L5NPR5YKS5BSDMBTQMWJMJYWD4/' },
  { media: 'Le Fooding', titre: 'Restaurant Incorrect', date: '21 avril 2025', url: 'https://lefooding.com/en/restaurants/incorrect' },
  { media: 'ELLE Belgique', titre: 'INCORЯECT : l’adresse qui révolutionne la pizza', date: '31 octobre 2025', url: 'https://www.elle.be/fr/462592-incor%D1%8Fect-ladresse-qui-revolutionne-la-pizza.html' },
] as const;

export const pratique = [
  { titre: 'Terrasse', texte: 'Terrasse.' },
  { titre: 'Animaux', texte: 'Les animaux sont acceptés.' },
  { titre: 'À emporter', texte: 'Les pizzas se prennent aussi à emporter.' },
  { titre: 'Climatisation', texte: 'La salle est climatisée.' },
] as const;
