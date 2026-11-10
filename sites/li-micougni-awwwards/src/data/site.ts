// Données de Li Micougni (data/restaurants/li-micougni/donnees.json et dossier.md, recherche du 10/11/2026).
// Hypothèses, toutes reprises dans RAPPORT.md :
// - Adresse d'exploitation : Rue des Brasseurs 110, 5000 Namur (la BCE indique un siège différent, Rue des Framboises 11 : ignoré).
// - Horaires : le détail n'est pas publié et les sources se contredisent. Seuls les faits du site du restaurant sont affichés,
//   chaque ligne est marquée « à confirmer » ; aucun OpeningHoursSpecification n'est publié (aucun jour entièrement confirmé).
// - Aucun avis, note, distinction ni citation de presse : le dossier n'en contient pas.
// - Pas de photo de l'équipe ni de la façade : aucune personne n'est montrée ni nommée.
import carteJson from './carte.json';

export const NBSP = ' ';

export const restaurant = {
  nom: 'Li Micougni',
  slogan: 'Restaurant de produits locaux et de saison, grillades au charbon de bois',
  description: 'Li Micougni, restaurant au centre de Namur : produits locaux et de saison, ardoises à partager, grillades au charbon de bois et terrasse dans une cour privée.',
  typeCuisine: 'Cuisine de saison, produits locaux, grillades au charbon de bois',
  adresse: { rue: 'Rue des Brasseurs', numero: '110', cp: '5000', commune: 'Namur', pays: 'BE' },
  telephone: '+32470597596',
  telephoneLisible: `+32${NBSP}470${NBSP}59${NBSP}75${NBSP}96`,
  email: 'limicougni@gmail.com',
  reservationUrl: 'https://www.limicougni.com/contact',
  planUrl: 'https://www.openstreetmap.org/search?query=Rue%20des%20Brasseurs%20110%2C%205000%20Namur',
  reseaux: [
    { nom: 'Facebook', url: 'https://facebook.com/61585258150821/' },
    { nom: 'Instagram', url: 'https://instagram.com/limicougninamur' },
  ],
  credit: 'Photos : Li Micougni',
  couvertsTerrasse: 30,
  // Horaires : texte du site actuel et de l'annuaire Namur CentreVille. « confirme: false » partout.
  horaires: [
    { jour: 'Lundi', texte: 'Fermé', confirme: true },
    { jour: 'Mardi', texte: 'Dès 17 h', confirme: false },
    { jour: 'Mercredi', texte: 'Midi et soir', confirme: false },
    { jour: 'Jeudi', texte: 'Midi et soir', confirme: false },
    { jour: 'Vendredi', texte: 'Midi et soir', confirme: false },
    { jour: 'Samedi', texte: 'Horaire non publié', confirme: false },
    { jour: 'Dimanche', texte: 'Jusqu’à 17 h', confirme: false },
  ],
} as const;

export type Plat = { nom: string; description: string | null; prix: number | null; supplement?: boolean; placeholder?: boolean };
export type Rubrique = { categorie: string; plats: Plat[] };
export const carte = carteJson as Rubrique[];

/** « 24,50 € » ou « 27 € » avec espace insécable. */
export const eur = (n: number) => `${n.toLocaleString('fr-BE', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}${NBSP}€`;

export const rubrique = (debut: string) => carte.find((r) => r.categorie.startsWith(debut))!;

export const menus = [
  { nom: 'Menu de la semaine', prix: null as number | null, texte: 'Entrée et plat, plat et dessert, ou trois services, avec des suggestions hors carte. Prix non publié par le restaurant.' },
  { nom: 'Menu enfant', prix: 18, texte: 'Croquette au fromage et boulette sauce tomate, ou boulette sauce tomate et boule de glace au choix.' },
];

export const histoire = [
  'Li Micougni est né de l’amitié de deux passionnés de l’horeca. Ils ont ouvert en 2026, au centre de Namur, une maison où l’on vient pour se retrouver.',
  'Le nom est wallon : les demi-fous y sont les bienvenus, comme tout le monde. La cuisine suit les saisons et les producteurs d’ici, les sauces sont faites maison, les grillades passent par le charbon de bois.',
  'La carte change au fil des mois. Les boulettes de Mamy Max, elles, restent.',
];

export const valeurs = ['Produits locaux et de saison', 'Fait maison', 'Carte évolutive', 'Convivialité et partage'];
