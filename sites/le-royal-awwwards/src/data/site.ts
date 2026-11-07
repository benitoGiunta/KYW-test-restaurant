// Contenu du Royal Namur. Source : data/restaurants/le-royal/ (donnees.json, dossier.md, photos/index.json).
// Hypothèses (aussi dans RAPPORT.md) :
//  - Histoire, équipe, année d'ouverture, chef : inconnus, donc absents (aucune invention) ; la page « À propos » ne dit que ce que le dossier prouve.
//  - Adresse : Place du Théâtre 13 (site et Rankeat) ; une source donne le n° 2, à confirmer.
//  - Horaires : cuisine 12 h à 14 h 30 et 18 h à 22 h, 7 j/7 (site) ; la carte PDF indique « ouvert de 11 h à 23 h ».
//  - Ardoise « moules jumbo à 20 € mardi et jeudi » : vue sur la photo 04, conditions exactes à confirmer.
//  - Aucun élément `placeholder: true` dans cette phase : les plats viennent tous de la carte PDF (août 2026).
import carteBrute from './carte.json';

export const site = {
  nom: 'Le Royal Namur',
  court: 'Le Royal',
  baseline: 'L’élégance d’une brasserie au cœur de Namur',
  description: 'Brasserie de la Place du Théâtre à Namur : moules jumbo, boulettes maison, vins du patron, terrasse face au Théâtre. Cuisine ouverte 7 jours sur 7.',
  typeCuisine: 'Brasserie belge contemporaine',
  adresse: { rue: 'Place du Théâtre', numero: '13', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4639, lon: 4.8681 },
  telephone: '+3281220133',
  telephoneLisible: '081 22 01 33',
  telephoneHref: 'tel:+3281220133',
  email: 'resto@leroyalnamur.be',
  reservationUrl: 'https://bookings.zenchef.com/results?rid=383850&pid=1001',
  carteUrl: 'https://www.openstreetmap.org/?mlat=50.4639&mlon=4.8681#map=18/50.4639/4.8681',
  siteActuel: 'https://www.leroyalnamur.be',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/p/Brasserie-Le-Royal--100063773521000/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/leroyalnamur/' },
  ],
  avis: { google: { note: '4,0', nombre: '577' }, tripadvisor: { note: '3,7', nombre: '272' } },
  credit: 'Photos : Le Royal Namur',
} as const;

export const services = [
  { nom: 'Midi', debut: '12:00', fin: '14:30', libelle: '12 h à 14 h 30' },
  { nom: 'Soir', debut: '18:00', fin: '22:00', libelle: '18 h à 22 h' },
] as const;
export const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'] as const;
export const joursSchema = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export type Plat = { nom: string; description: string | null; prix: number | string; placeholder: boolean };
export type Categorie = { categorie: string; plats: Plat[]; note?: string };
export const carte = carteBrute as Categorie[];
export const nomCategorie = (c: string) => c.replace(/\s*\(.*\)$/, '');
export const prix = (p: number | string) =>
  typeof p === 'number' ? `${p.toFixed(2).replace('.', ',')} €` : `${p} €`;

// Plats d'accueil : tirés de la carte par leur nom exact (pas de duplication de prix).
const nomsAccueil = ['Boulettes maison', 'Royal Burger maison', 'Vol-au-vent maison (poularde)', 'Tartare de bœuf à l’italienne', 'Brochette de bœuf géante ±\u00a0350\u00a0g, 3 sauces'];
export const platsAccueil = carte.flatMap((c) => c.plats).filter((p) => nomsAccueil.includes(p.nom));
export const moules = carte.find((c) => c.categorie.startsWith('Moules'))!.plats;

export const fetes = { sans: '50', avec: '65' } as const;
