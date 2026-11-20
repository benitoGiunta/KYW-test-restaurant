// Tout le contenu du site vit ici. Source : data/restaurants/yayami/donnees.json et photos/index.json (carte.json et
// photos.json en sont tirés par script). Aucune donnée inventée : histoire, équipe, avis, réseaux et e-mail sont inconnus
// du dossier, donc absents (les composants ne rendent rien). Aucun `placeholder: true` n'est nécessaire en phase 1.
import carteJson from './carte.json';
import photosJson from './photos.json';

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export type Famille = 'bière' | 'ramune';
export interface Boisson { nom: string; description: string; prix: string; famille: Famille }
export interface Regle { texte: string; placeholder: boolean }
export interface Mode { nom: string; description: string; quand: string; placeholder: boolean }
export interface Mosaique { src: string; placeholder: boolean }

export interface Restaurant {
  slug: string;
  nom: string;
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number; lon: number };
  telephone: string; // format international
  email: { valeur: string; placeholder: boolean };
  commande: { outil: string; url: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  photos: Photo[];
  livraison: { minimum: string; zone: string[]; remise: string; paiement: string[] };
  specialites: { nom: string; photo: string }[];
  accroche: { titre: [string, string]; sousTitre: string; bande: string; carte: string; boissons: string; maison: string; complementAdresse: string };
  regles: Regle[];
  originStory: string[]; // 4 phrases courtes, tirées des faits du dossier
  boissons: Boisson[];
  modes: Mode[];
  mosaique: Mosaique[]; // 12 photos sombres, dans l'ordre d'affichage
}

const tous: Jour[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
const photos: Photo[] = photosJson.map((p) => ({ ...p, placeholder: false }));
const boisson = (nom: string, description: string, prix: string, famille: Famille): Boisson => ({ nom, description, prix, famille });

export const site: Restaurant = {
  slug: 'yayami',
  nom: 'Yayami Sushi',
  baseline: 'Japanese Sushi & take away',
  description:
    'Yayami Sushi, restaurant japonais à Namur : nigiri, maki, temaki et plats chauds, à emporter (-10 %) ou livrés gratuitement dès 30 €, 7 jours sur 7.',
  url: 'https://www.yayami.be',
  typeCuisine: 'Cuisine japonaise, sushi',
  adresse: { rue: 'Rue de Bruxelles', numero: '15', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4652249, lon: 4.8631295 },
  telephone: '+32 81 34 37 89',
  email: { valeur: '', placeholder: false }, // aucune adresse professionnelle connue : rien n'est affiché
  commande: { outil: 'commande en ligne', url: 'https://www.yayami.be/shop/' },
  horaires: tous.map((jour) => ({ jour, creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '22:00' }] })),
  reseaux: [],
  carte: carteJson.carte as Categorie[],
  menus: carteJson.menus as Menu[],
  photos,
  livraison: {
    minimum: '30 €',
    zone: ['5000', '5001', '5002', '5003', '5004', '5020', '5100'],
    remise: '10 %',
    paiement: ["Cash à la livraison", "Cash à l’emporter", 'Bancontact', 'Maestro', 'MasterCard', 'Visa'],
  },
  specialites: [
    { nom: 'Nigiri', photo: '/photos/nigiri-saumon-noir.webp' },
    { nom: 'Maki', photo: '/photos/maki-grille-wasabi.webp' },
    { nom: 'Chirashi bowl', photo: '/photos/chirashi-bowl.webp' },
    { nom: 'Nouilles udon sautées', photo: '/photos/udon-poulet.webp' },
    { nom: 'Raviolis grillés', photo: '/photos/gyoza-noir.webp' },
    { nom: 'Tempura de crevettes', photo: '/photos/tempura-crevettes.webp' },
  ],
  accroche: {
    titre: ['Sushi', 'à Namur'],
    sousTitre: 'Restaurant japonais rue de Bruxelles. Nigiri, maki, temaki et plats chauds, à emporter ou livrés chez vous.',
    bande: 'Nigiri, maki, temaki, plats chauds, salades, bières et boissons : toute la carte se commande en ligne.',
    carte: 'Nigiri, maki et temaki, des menus et des box à partager, des plats chauds, des salades, des bières et des boissons.',
    boissons: 'Trois bières japonaises et quatre ramune, la limonade japonaise, pour accompagner les sushi.',
    maison: 'Un restaurant japonais au 15 rue de Bruxelles, à Namur : des sushi, des plats chauds et la commande en ligne.',
    complementAdresse: 'Rue de Bruxelles, à Namur.',
  },
  regles: [
    { texte: 'Ouvert 7 jours sur 7, de 12h à 14h et de 18h à 22h.', placeholder: false },
    { texte: "10 % de remise si vous venez chercher votre commande sur place.", placeholder: false },
    { texte: 'On commande en ligne : le panier ouvre le site de commande de la maison.', placeholder: false },
    { texte: 'Paiement : cash à la livraison ou à l’emporter, Bancontact, Maestro, MasterCard, Visa.', placeholder: false },
  ],
  originStory: [
    'Yayami Sushi est un restaurant japonais, au 15 rue de Bruxelles, à Namur.',
    'Des nigiri à 4,50 € les deux pièces, des maki, des temaki, un chirashi bowl.',
    'Des plats chauds : nouilles udon, riz japonais, raviolis grillés, yakitori, karaage.',
    'À emporter ou livré chez vous, sept jours sur sept.',
  ],
  boissons: [
    boisson('Asahi', 'Bière japonaise', '3,90 €', 'bière'),
    boisson('Kirin Ichiban', 'Bière japonaise', '3,90 €', 'bière'),
    boisson('Sapporo', 'Bière japonaise', '4,20 €', 'bière'),
    boisson('Ramune lychee', 'Limonade japonaise', '3,50 €', 'ramune'),
    boisson('Ramune matcha', 'Limonade japonaise', '3,50 €', 'ramune'),
    boisson('Ramune melon', 'Limonade japonaise', '3,50 €', 'ramune'),
    boisson('Ramune plum', 'Limonade japonaise', '3,50 €', 'ramune'),
  ],
  modes: [
    { nom: 'Livraison', quand: 'dès 30 €', description: 'Gratuite à partir de 30 € de commande, dans sept codes postaux autour de Namur.', placeholder: false },
    { nom: "À l’emporter", quand: '-10 %', description: 'Vous passez prendre votre commande rue de Bruxelles, la remise est déduite sur place.', placeholder: false },
    { nom: 'Commande en ligne', quand: '7 jours sur 7', description: 'La carte complète, avec les prix, sur le site de commande de la maison.', placeholder: false },
  ],
  mosaique: [
    '/photos/nigiri-saumon-noir.webp', '/photos/maki-assortiment-noir.webp', '/photos/salade-wakame.webp', '/photos/biere-asahi.webp',
    '/photos/ramune.webp', '/photos/tempura-crevettes.webp', '/photos/brochette-grillee.webp', '/photos/udon-poulet.webp',
    '/photos/chirashi-bowl.webp', '/photos/menu-matsu.webp', '/photos/udon-scampis.webp', '/photos/udon-boeuf.webp',
  ].map((src) => ({ src, placeholder: false })),
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Horaires lisibles : '12:00 à 14:00, 19:00 à 21:00' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${heure(c.ouverture)} à ${heure(c.fermeture)}`).join(', ') : h.note || 'fermé';

/** Jours de service du soir et bornes du service, pour les textes serveur et le loader. */
export function serviceSoir(r: Restaurant = site) {
  const soirs = r.horaires.filter((h) => h.creneaux.some((c) => c.ouverture >= '17:00'));
  const ouv = soirs.map((h) => h.creneaux.at(-1)!.ouverture).sort()[0] ?? '19:00';
  const ferm = soirs.map((h) => h.creneaux.at(-1)!.fermeture).sort().at(-1) ?? '21:00';
  const jours = soirs.map((h) => h.jour);
  const texte = jours.length > 2 && jours.every((j, i) => i === 0 || r.horaires.findIndex((h) => h.jour === j) === r.horaires.findIndex((h) => h.jour === jours[i - 1]) + 1)
    ? `du ${jours[0]} au ${jours.at(-1)} soir`
    : jours.join(', ');
  return { ouverture: ouv, fermeture: ferm, jours, texte };
}
export const heure = (h: string) => h.replace(':00', 'h').replace(':', 'h');

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
