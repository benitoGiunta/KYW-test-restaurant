// Contenu de Bayti (sources : data/restaurants/bayti/donnees.json + dossier.md, recherche du 27/11/2026).
// Hypothèses de la variante awwwards :
// - Horaires : mardi à samedi, restaurant 18 h à 21 h, comptoir 11 h à 19 h ; dimanche et lundi fermés (déduit par la recherche, à confirmer).
// - Aucun fondateur, chef ni année d'ouverture connus : rien n'est inventé, pas de section équipe.
// - Aucun avis ni note inventés : un seul extrait réel (Brenda C., avis Google repris par bayti.be/avis, date inconnue).
// - Aucun plat fictif : tout vient de la carte de bayti.be (prix du menu du soir : 45 € pour les 8 services, pas de prix par plat).
// - Orthographe « Rakatat » (menu du soir) et « Rakakat » (carte à emporter) conservées telles que sources.
import carte from './carte.json';

const NB = ' ';

export const site = {
  name: 'Bayti',
  baseline: 'Deux mondes, une table.',
  description:
    'Bayti, cuisine du Moyen-Orient revisitée d’une touche européenne, Rue du Pont à Namur : menu du soir en 8 services et comptoir traiteur de jour.',
  url: 'https://kyw-test-restaurant.vercel.app',
  telephone: '0492 07 25 76',
  telephoneHref: '+32492072576',
  email: 'info@bayti.be',
  reservationUrl: 'https://bayti.reservation.barestho.com/',
  facebook: 'https://www.facebook.com/profile.php?id=100067102638326',
  instagram: 'https://www.instagram.com/bayti.be/',
  siteClient: 'https://www.bayti.be',
  credit: 'Photos : Bayti',
  geo: { lat: 50.4624432, lon: 4.8678736 },
};

export const adresses = {
  restaurant: {
    numero: '15', nom: 'Bayti', role: 'Le restaurant', moment: 'Le soir',
    ouverture: `18${NB}h${NB}à${NB}21${NB}h`, debut: 18, fin: 21,
    rue: 'Rue du Pont', cp: '5000', commune: 'Namur',
  },
  comptoir: {
    numero: '6', nom: 'Bayti Le Comptoir', role: 'Le comptoir traiteur', moment: 'Le jour',
    ouverture: `11${NB}h${NB}à${NB}19${NB}h`, debut: 11, fin: 19,
    rue: 'Rue du Pont', cp: '5000', commune: 'Namur',
  },
};

export const jours = ['Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
export const fermes = ['Dimanche', 'Lundi'];

export const carteUrl = (n: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Bayti, Rue du Pont ${n}, 5000 Namur`)}`;

export const menuSoir = {
  prix: 45,
  nombre: 8,
  services: carte.soir as { n: number; nom: string; description: string }[],
};

export const menuDecouverte = {
  nom: 'Menu Découverte à emporter',
  prix: 28,
  detail:
    'Houmous bayti, muhammara de Damas, labneh à l’ail, feuilles de vigne, rakakat au fromage, rouleaux de Jérusalem, jawaneh de poulet, pain libanais, sauce à l’ail au summak.',
};

export type Plat = { nom: string; description: string | null; prix: number; piece: boolean | null; regimes: string[] | null };
export const carteJour = carte.jour as { nom: string; plats: Plat[] }[];

export const prix = (n: number) => `${String(n).replace('.', ',')}${NB}€`;

export const avis = {
  texte:
    'Un véritable petit coin du Moyen-Orient au cœur de Namur. Chaque mezzé est un voyage divin pour les papilles des saveurs authentiques, variées et parfaitement équilibrées.',
  auteur: 'Brenda C.',
  source: 'avis Google repris sur bayti.be',
};

export const histoire = [
  'Bayti signifie « foyer » en arabe classique. Le nom dit tout : recréer, autour d’une table familiale, la cuisine de notre enfance.',
  'Celle du Moyen-Orient, traditionnelle, mezzés, kebbeh, falafel, rakakat, que l’on partage. Avec une touche personnelle, et un geste européen qui la revisite sans la trahir.',
  'Rue du Pont, à Namur, la maison a deux portes : le n° 15 pour le dîner en huit services, le n° 6 pour le comptoir et le traiteur. Et, pour vos événements, Bayti vient chez vous.',
];

export const valeurs = ['Cuisine « comme à la maison »', 'Moyen-Orient et touche européenne', 'Menus sur mesure pour événements'];
