// Hypothèses (phase 1, voir ETAT.md) : adresse = Rue Basse 13, 5330 Crupet (Assesse), pas le siège BCE de restaurants.json.
// Histoire, équipe, chef, GPS, parking, avis : inconnus, rien d'inventé (aucun `placeholder`).
import carteBrute from './carte.json';

export const nbsp = ' ';
export const euro = (n: number) =>
  `${n.toLocaleString('fr-BE', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2 })}${nbsp}€`;

export const restaurant = {
  name: 'Les Terrasses de Crupet',
  short: 'Terrasses de Crupet',
  baseline: 'Un moment hors du temps au cœur du village.',
  description:
    'Brasserie familiale à Crupet : carbonnade à la bière, vol-au-vent de Mamy, plats à partager, cocktails et vins. Ouvert tous les jours.',
  cuisine: 'Brasserie familiale',
  street: 'Rue Basse 13',
  postalCode: '5330',
  locality: 'Crupet (Assesse)',
  country: 'BE',
  phone: '083 655 111',
  phoneHref: 'tel:+3283655111',
  email: 'resto@lesterrassesdecrupet.be',
  reservationUrl: 'https://bookings.zenchef.com/results?rid=367820',
  mapUrl: 'https://www.openstreetmap.org/search?query=Rue%20Basse%2013%2C%205330%20Crupet',
  siteActuel: 'https://www.lesterrassesdecrupet.be',
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61559320650854' },
    { label: 'Instagram', href: 'https://www.instagram.com/lesterrassesdecrupet/' },
  ],
  services: [
    { nom: 'Midi', de: '12 h', a: '14 h' },
    { nom: 'Soir', de: '18 h', a: '22 h' },
  ],
  jours: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  note: 'Tous les jours durant les congés scolaires.',
};

export type Plat = { nom: string; description: string | null; prix: number; placeholder?: boolean };
export type Categorie = { categorie: string; plats: Plat[] };
export const carte = carteBrute as Categorie[];

// Photo d'en-tête de chaque catégorie (clé de photos.ts).
export const photoCategorie: Record<string, string> = {
  'À partager': 'tartare',
  Entrées: 'fondue',
  Plats: 'viande',
  Enfants: 'burger',
  Desserts: 'cocktail',
  Cocktails: 'shaker',
  Bières: 'terrasse',
  'Vins (sélection)': 'vin',
  'Boissons chaudes': 'carte',
};

// Sélection de l'accueil : plats réels de la carte.
export const signatures = [
  'Carbonnade à la bière',
  'Poule au riz, le vol-au-vent de Mamy et frites fraîches',
  'Crupétois',
  'Os à moelle et tartare de bœuf',
  'Camembert au four',
  'Truite façon meunière',
];
export const platsParNom = (nom: string) =>
  carte.flatMap((c) => c.plats).find((p) => p.nom === nom)!;

export const menuFetes = { prix: '37 à 69 €', retrait: 'les 24 et 31 décembre' };

export const nav = [
  { href: 'carte/', label: 'La carte' },
  { href: 'a-propos/', label: 'Le lieu' },
  { href: 'reservation/', label: 'Réserver' },
];
