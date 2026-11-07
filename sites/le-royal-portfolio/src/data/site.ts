// Tout le contenu du site vit ici. Source : data/restaurants/le-royal/{dossier.md,donnees.json,photos/index.json}.
// Une donnée, un drapeau : `placeholder: true` ne vaut que pour le champ qu'il accompagne. Toute donnée non prouvée par le
// dossier est absente (null, rien rendu) ou marquée visiblement. La carte est celle du PDF d'août 2026 (carte.json).
// Histoire, équipe, desserts, bon cadeau, privatisation, stationnement : inconnus, donc non affichés.
import carteBrute from './carte.json';

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';
export type Service = 'midi' | 'soir';
export type Groupe = 'table' | 'bar';
export type Badge = 'végé' | 'maison' | 'local';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat {
  nom: string;
  description: string;
  prix: string | null;
  placeholder: boolean; // le plat lui-même est-il une invention ? (jamais ici : carte réelle)
  badges?: Badge[];
  apercu?: string; // photo 4:5 dans public/photos (aperçu flottant / vignette mobile)
}
export interface Categorie {
  categorie: string;
  groupe: Groupe;
  exemple: boolean;
  note?: string;
  prix?: string;
  plats: Plat[];
}
export interface Menu { nom: string; prix: string; description: string; quand: string; placeholder: boolean }
export interface Note { source: string; note: string; nombre: number; precision: string }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
// `note` : mention visible sous la ligne (null = rien). Chaque entrée est un fait du dossier, jamais une invention.
export interface Suggestion { jour: Jour; texte: string; prix: string | null; note: string | null }

export interface Restaurant {
  slug: string;
  nom: string;
  nomLignes: [string, string];
  baseline: string;
  description: string;
  url: string;
  typeCuisine: string;
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  acces: { texte: string; placeholder: boolean }[];
  geo: { lat: number; lon: number };
  telephone: string;
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; url: string; note: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  suggestions: Suggestion[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[];
  notes: Note[];
  photos: Photo[];
  motsSalle: string[]; // mots géants de la section terrasse (tous prouvés par le dossier)
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });

// Aperçus 4:5 : seulement quand la photo montre bien la ligne (sujet de photos/index.json).
const apercus: Record<string, string> = {
  'Moules marinières': '/photos/apercu-moules.webp',
  'Chouffe': '/photos/apercu-chouffe.webp',
  'Apéritif maison': '/photos/apercu-cocktails.webp',
  'Portion mixte': '/photos/apercu-planche.webp',
  'Le verre': '/photos/apercu-vins.webp',
};
const badges: Record<string, Badge[]> = {
  'Duo fondus fromage maison': ['maison'],
  'Duo croquettes crevettes grises maison': ['maison'],
  'Boulettes maison': ['maison'],
  'Royal Burger maison': ['maison'],
  'Vol-au-vent maison (poularde)': ['maison'],
  'Penne aux 4 fromages': ['végé'],
};
const carte: Categorie[] = (carteBrute as { categorie: string; groupe: Groupe; note?: string; plats: { nom: string; description: string; prix: string }[] }[]).map((c) => ({
  categorie: c.categorie,
  groupe: c.groupe,
  exemple: false,
  note: c.categorie.startsWith('Moules jumbo') ? `${c.note ? c.note + ' ' : ''}Le mardi et le jeudi, l'ardoise de la terrasse annonce les moules jumbo à 20 € (conditions à confirmer).` : c.note,
  plats: c.plats.map((p) => ({ nom: p.nom, description: p.description, prix: p.prix, placeholder: false, apercu: apercus[p.nom], badges: badges[p.nom] })),
}));

export const site: Restaurant = {
  slug: 'le-royal',
  nom: 'Le Royal Namur',
  nomLignes: ['Le Royal', 'Namur'],
  baseline: "L'élégance d'une brasserie au cœur de Namur",
  description:
    'Le Royal Namur, brasserie belge Place du Théâtre : la carte, les moules jumbo, la terrasse face au Théâtre, les horaires de la cuisine (7 jours sur 7) et la réservation en ligne.',
  url: 'https://www.leroyalnamur.be',
  typeCuisine: 'Brasserie belge contemporaine',
  adresse: { rue: 'Place du Théâtre', numero: '13', cp: '5000', commune: 'Namur', pays: 'BE' },
  acces: [
    { texte: 'Sur la Place du Théâtre, la terrasse fait face au Théâtre de Namur.', placeholder: false },
    { texte: "La carte annonce une ouverture de 11h à 23h ; la cuisine sert de 12h à 14h30 et de 18h à 22h.", placeholder: false },
  ],
  geo: { lat: 50.4639, lon: 4.8681 },
  telephone: '081 22 01 33',
  email: { valeur: 'resto@leroyalnamur.be', placeholder: false },
  reservation: { outil: 'Zenchef', url: 'https://bookings.zenchef.com/results?rid=383850&pid=1001', note: 'La cuisine est ouverte tous les jours, à midi et le soir.' },
  horaires: (['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as Jour[]).map((jour) => ({
    jour,
    creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:00' }],
  })),
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/p/Brasserie-Le-Royal--100063773521000/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/leroyalnamur/' },
  ],
  // Chaque jour met en avant un plat réel de la carte (prix de la carte d'août 2026) ; mardi et jeudi : l'ardoise de la terrasse.
  suggestions: [
    { jour: 'lundi', texte: 'Spécialité de la carte : boulettes maison, sauce au choix', prix: '21,90 €', note: 'à la carte tous les jours' },
    { jour: 'mardi', texte: "À l'ardoise de la terrasse : moules jumbo", prix: '20 €', note: 'conditions à confirmer' },
    { jour: 'mercredi', texte: 'Spécialité de la carte : Royal Burger maison', prix: '22,90 €', note: 'à la carte tous les jours' },
    { jour: 'jeudi', texte: "À l'ardoise de la terrasse : moules jumbo", prix: '20 €', note: 'conditions à confirmer' },
    { jour: 'vendredi', texte: 'Spécialité de la carte : vol-au-vent maison de poularde', prix: '22,90 €', note: 'à la carte tous les jours' },
    { jour: 'samedi', texte: 'Spécialité de la carte : brochette de bœuf géante, trois sauces', prix: '28,90 €', note: 'à la carte tous les jours' },
    { jour: 'dimanche', texte: "Spécialité de la carte : tartare de bœuf à l'italienne", prix: '23,90 €', note: 'à la carte tous les jours' },
  ],
  carte,
  menus: [
    { nom: 'Fêtes patronales, 3 services', prix: '50 €', quand: 'Sans boissons', description: 'Entrées : terrine de chevreuil au foie gras, saumon gravlax ou tarte fine au potimarron. Plats : civet de biche, suprême de pintade aux pleurotes, filet de lieu ou risotto aux champignons des bois. Desserts : tarte fine aux pommes ou crémeux au chocolat.', placeholder: false },
    { nom: 'Fêtes patronales, avec boissons', prix: '65 €', quand: 'Le même menu, boissons comprises', description: 'Apéritif maison et mises en bouche, trois verres de vin, trois softs ou trois pils, puis café ou thé.', placeholder: false },
    { nom: 'Moules jumbo', prix: '20 €', quand: "Mardi et jeudi, d'après l'ardoise de la terrasse", description: 'Moules jumbo de 1,350 kg ; les recettes et leurs prix habituels sont sur la carte. Conditions exactes à confirmer.', placeholder: false },
  ],
  histoire: [
    "Située sur la Place du Théâtre de Namur, la Brasserie Le Royal vous accueille dans un cadre élégant et chaleureux où la cuisine de brasserie se savoure avec générosité.",
    'Déjeuner d\'affaires, dîner entre amis ou pause avant ou après un spectacle : la terrasse fait face au Théâtre de Namur.',
    'La cuisine est ouverte sept jours sur sept, à midi et le soir. Moules jumbo, boulettes maison, Royal Burger, vol-au-vent de poularde et pièces du boucher font la carte ; le vin du patron se sert au verre, au quart, à la demi ou à la bouteille.',
  ],
  notes: [
    { source: 'Google', note: '4,0', nombre: 577, precision: "relevé sur Rankeat, 2026" },
  ],
  photos: [
    photo('/photos/terrasse.webp', 'Terrasse sous parasols noirs face au Théâtre de Namur, avec une ardoise annonçant les moules jumbo à 20 € le mardi et le jeudi', 1200, 1600),
    photo('/photos/terrasse-960.webp', 'Terrasse sous parasols noirs face au Théâtre de Namur, avec une ardoise annonçant les moules jumbo à 20 € le mardi et le jeudi', 960, 1280),
    photo('/photos/facade.webp', 'Façade en brique de la brasserie sur la place, ciel bleu', 1200, 896),
    photo('/photos/facade-800.webp', 'Façade en brique de la brasserie sur la place, ciel bleu', 800, 597),
    photo('/photos/moules.webp', 'Table de terrasse : moules, frites, spaghetti et verres de vin', 900, 1200),
    photo('/photos/cocktails.webp', 'La carte du Royal et deux cocktails sur une table de terrasse, façade du théâtre derrière', 900, 1200),
    photo('/photos/chouffe.webp', 'Cinq bouteilles de bière Chouffe alignées sur une table de terrasse', 900, 1200),
    photo('/photos/planche.webp', 'Planche de charcuterie et deux verres qui trinquent, façade de la brasserie en arrière-plan', 900, 1200),
    photo('/photos/plats.webp', 'Table dressée : salade de viande grillée, croquettes, plat de volaille et menu imprimé', 900, 1200),
    photo('/photos/vins.webp', 'Assiette, verres de vin blanc et rouge et menu imprimé', 900, 1200),
  ],
  motsSalle: ['Terrasse', 'Théâtre', 'Brasserie'],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;
export const horaireTexte = (h: Horaire) => (h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé');
/** Numéro belge au format international (0 initial remplacé par +32). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '').replace(/^0/, '+32')}`;
export const carteDe = (groupe: Groupe) => site.carte.filter((c) => c.groupe === groupe);
/** Créneau d'un service pour un jour : 'midi' = ouverture avant 15:00. */
export const creneauService = (h: Horaire, s: Service) => h.creneaux.find((c) => (s === 'midi' ? c.ouverture < '15:00' : c.ouverture >= '15:00')) || null;
const h = (t: string) => t.replace(':', 'h').replace(/h00$/, 'h');
/** Libellé statique des services (repli sans JS de la barre d'état) : tous les jours identiques = une phrase. */
export const servicesTexte = () => {
  const m = creneauService(site.horaires[0], 'midi'); const s = creneauService(site.horaires[0], 'soir');
  const identiques = site.horaires.every((x) => horaireTexte(x) === horaireTexte(site.horaires[0]));
  if (identiques && m && s) return `Cuisine ouverte 7 jours sur 7, de ${h(m.ouverture)} à ${h(m.fermeture)} et de ${h(s.ouverture)} à ${h(s.fermeture)}`;
  return site.horaires.map((x) => `${x.jour} ${horaireTexte(x)}`).join(', ');
};
