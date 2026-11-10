// Tout le contenu du site vit ici. Source : data/restaurants/sanga/ (donnees.json, dossier.md, photos/index.json).
// Tout ce qui n'est pas prouvé par le dossier est absent (histoire, équipe, salle, réseaux, e-mail) ou marqué `placeholder`.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; bouillon?: boolean; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Avis { texte: string; auteur: string; source: string; date: string; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
/** Plat du rouleau : nom, quelques mots du dossier, prix ; `photo` optionnelle (photo réelle du restaurant). */
export interface PlatRouleau { nom: string; mots: string; prix: string; photo?: string; placeholder: boolean }
export interface Bouillon { nom: string; sens: string }
export interface Zone { prix: string; codes: string[] }

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
  commande: { outil: string; url: string };
  horaires: Horaire[];
  reseaux: { nom: string; url: string }[];
  carte: Categorie[];
  avis: Avis[];
  noteGoogle: { note: string; nombre: string; source: string };
  photos: Photo[];
  bouillons: Bouillon[];
  nombreRamen: number; // constante issue du dossier (cinq ramen), jamais un length
  prixRamen: { min: string; max: string };
  rouleau: { titre: string; plats: PlatRouleau[] };
  livraison: { zones: Zone[]; gratuite: string; rayon: string };
  paiement: string[];
  sceau: { initiales: string };
  phraseHero: string;
  manifeste: { titre: string; texte: string };
}

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });
const plat = (nom: string, prix: string, description = '', bouillon = false): Plat => ({ nom, description, prix, bouillon, placeholder: false });
const choix = (nom: string, prix: string, description = '') => plat(nom, prix, description, true);

export const site: Restaurant = {
  slug: 'sanga',
  nom: 'Sanga',
  baseline: 'Le premier restaurant de ramen à Namur',
  description: 'Sanga, restaurant de ramen à Namur : ramen aux bouillons miso, shio ou shoyu, udon, soba, donburi et gyoza, sur place, à emporter ou livrés.',
  url: 'https://www.sanganamur.be',
  typeCuisine: 'Cuisine japonaise, ramen',
  adresse: { rue: 'Rue Saint-Loup', numero: '8', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4642, lon: 4.8636 },
  telephone: '+32 81 24 10 38',
  commande: { outil: 'Order & Eat', url: 'https://www.sanganamur.be' },
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    ...(['mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as Jour[]).map((jour) => ({
      jour,
      creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '22:00' }],
    })),
  ],
  reseaux: [],
  carte: [
    {
      categorie: 'Entrées',
      plats: [
        plat('Edamame', '6,00 €'),
        plat('Gyoza grillés', '6,00 €'),
        plat('Tori-kara', '7,20 €', 'Poulet frit.'),
        plat('Tori-kara, sauce Amazu', '8,00 €', 'Poulet frit.'),
      ],
    },
    {
      categorie: 'Ramen',
      plats: [
        choix('Ramen simple', '13,80 €'),
        choix('Ramen au poulet', '15,50 €', 'Poulet, pousses de bambou, algues, oignons verts et légumes de saison.'),
        choix('Chashu ramen', '15,80 €', 'Chashu, demi-œuf mollet, pousses de bambou, algues, oignons verts et légumes de saison.'),
        choix('Negikara ramen', '16,50 €'),
        choix('Ramen au canard', '16,80 €'),
      ],
    },
    {
      categorie: 'Udon et soba',
      plats: [
        plat('Kitsune udon ou soba', '12,50 €'),
        plat('Soba végétarien', '12,50 €'),
        plat('Udon tempura scampi', '15,80 €', 'Sauce bouillon de poisson, trois pièces.'),
        plat('Udon au canard', '17,80 €', 'Grand bol de soupe aux nouilles udon, canard rosé, algues et oignons verts.'),
      ],
    },
    {
      categorie: 'Donburi',
      plats: [
        plat('Chashu-don', '16,50 €', 'Chashu en sauce, servi avec salade et miso.'),
        plat('Karaage-don', '16,80 €', 'Poulet frit en sauce, servi avec salade et miso.'),
        plat('Katsudon', '16,80 €', 'Porc pané aux œufs, servi avec salade et miso.'),
        plat('Teriyaki-don', '17,80 €', 'Poulet et oignons verts en sauce, servi avec salade et miso.'),
        plat('Unagidon', '18,80 €', 'Unagi (anguille) en sauce sucrée au soja, servi avec salade et soupe.'),
        plat('Yakiniku-don', '18,80 €', 'Bœuf grillé à la sauce soja à la japonaise, servi avec salade et soupe.'),
      ],
    },
    {
      categorie: 'Divers',
      plats: [plat('Œuf', '1,50 €'), plat('Riz', '2,00 €'), plat('Rôti de porc', '3,80 €'), plat('Wakame', '3,50 €'), plat('Poulpe mariné', '5,20 €')],
    },
    {
      categorie: 'Boissons',
      plats: [
        plat('Coca-Cola, 33 cl', '2,50 €'),
        plat('Coca-Cola Zero, 33 cl', '2,50 €'),
        plat('Thé froid, 50 cl', '4,20 €'),
        plat('Thé au lychee, 33 cl', '4,20 €'),
        plat('Thé au melon, 33 cl', '4,20 €'),
        plat('Iki', '4,50 €'),
        plat('Limonade japonaise, 20 cl', '4,50 €'),
        plat('Asahi', '4,80 €'),
        plat('Kirin', '4,80 €'),
      ],
    },
  ],
  avis: [
    { texte: 'Un vrai régal ! Autant à emporter que sur place !', auteur: 'Rachel', source: 'Avis client Takeaway.com', date: '2026-11-01', placeholder: false },
    { texte: 'Délicieux, mais un peu onéreux.', auteur: 'Anne-Cha', source: 'Avis client Takeaway.com', date: '2026-08-18', placeholder: false },
    { texte: 'Incroyable.', auteur: 'Laurie', source: 'Avis client Takeaway.com', date: '2026-08-13', placeholder: false },
  ],
  noteGoogle: { note: '4,6', nombre: '892', source: 'Google, relevé Rankeat de mars 2026' },
  photos: [
    photo('/photos/ramen-deux-bols.webp', 'Deux bols de ramen vus de dessus, baguettes en bois, fond clair', 1800, 1200),
    photo('/photos/ramen-chashu-gyoza.webp', 'Ramen au chashu et gyoza sur une table en bois, louche en bois', 720, 960),
    photo('/photos/udon-tempura.webp', 'Bol d’udon aux crevettes tempura, algues et oignons verts, bol à damier bleu', 720, 960),
    photo('/photos/gyoza.webp', 'Gyoza grillés sur un plat allongé, sauce et salade verte', 1024, 576),
    photo('/photos/teriyaki-don.webp', 'Donburi au poulet sauce teriyaki sur un plateau laqué, salade et algues', 1024, 576),
    photo('/photos/edamame.webp', 'Edamame au sel dans un bol blanc sur une natte de bambou', 600, 600),
  ],
  bouillons: [
    { nom: 'Miso', sens: 'Le bouillon à la pâte de soja fermentée.' },
    { nom: 'Shio', sens: 'Le bouillon au sel.' },
    { nom: 'Shoyu', sens: 'Le bouillon à la sauce soja.' },
  ],
  nombreRamen: 5,
  prixRamen: { min: '13,80 €', max: '16,80 €' },
  phraseHero: 'Ramen, udon et donburi, rue Saint-Loup, à Namur.',
  manifeste: {
    titre: 'Un bol, trois bouillons',
    texte: 'Chaque ramen se choisit en bouillon miso, shio ou shoyu. Autour du bol : udon, soba, donburi et gyoza grillés, dans une ambiance chaleureuse.',
  },
  rouleau: {
    titre: 'Le rouleau',
    plats: [
      { nom: 'Edamame', mots: 'entrée', prix: '6,00 €', placeholder: false },
      { nom: 'Gyoza grillés', mots: 'entrée', prix: '6,00 €', photo: '/photos/gyoza.webp', placeholder: false },
      { nom: 'Tori-kara', mots: 'poulet frit', prix: '7,20 €', placeholder: false },
      { nom: 'Ramen simple', mots: 'bouillon au choix', prix: '13,80 €', placeholder: false },
      { nom: 'Ramen au poulet', mots: 'poulet, bambou, algues', prix: '15,50 €', placeholder: false },
      { nom: 'Chashu ramen', mots: 'chashu, demi-œuf mollet', prix: '15,80 €', photo: '/photos/ramen-chashu-gyoza.webp', placeholder: false },
      { nom: 'Negikara ramen', mots: 'bouillon au choix', prix: '16,50 €', placeholder: false },
      { nom: 'Ramen au canard', mots: 'bouillon au choix', prix: '16,80 €', placeholder: false },
      { nom: 'Udon tempura scampi', mots: 'bouillon de poisson', prix: '15,80 €', photo: '/photos/udon-tempura.webp', placeholder: false },
      { nom: 'Udon au canard', mots: 'canard rosé, algues', prix: '17,80 €', placeholder: false },
      { nom: 'Teriyaki-don', mots: 'poulet, salade, miso', prix: '17,80 €', photo: '/photos/teriyaki-don.webp', placeholder: false },
      { nom: 'Yakiniku-don', mots: 'bœuf grillé, soja', prix: '18,80 €', placeholder: false },
    ],
  },
  livraison: {
    zones: [
      { prix: 'dès 25 €', codes: ['5000', '5001', '5002', '5003', '5004'] },
      { prix: 'dès 35 €', codes: ['5020', '5100'] },
    ],
    gratuite: 'Livraison gratuite.',
    rayon: 'Rayon de 6 km dès 35 €.',
  },
  paiement: ['Bancontact', 'Maestro', 'MasterCard', 'Visa', 'Espèces à la livraison'],
  sceau: { initiales: 'S' },
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
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

/** Jours consécutifs aux mêmes horaires regroupés (« lundi au mercredi ») : un créneau écrit une fois par groupe. */
const maj = (t: string) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase().replace(/^(.)/, (c) => c);
export const horairesGroupes = (r: Restaurant = site) => {
  const g: { jours: string; texte: string }[] = [];
  let debut = '', fin = '', texte = '', n = 0;
  const pousser = () => { if (debut) g.push({ jours: maj(n === 1 ? debut : `${debut} ${n === 2 ? 'et' : 'au'} ${fin.toLowerCase()}`), texte }); };
  for (const h of r.horaires) {
    const t = horaireTexte(h);
    if (debut && t === texte) { fin = h.jour; n++; continue; }
    pousser(); debut = fin = h.jour; texte = t; n = 1;
  }
  pousser();
  return g;
};

/** Plages d'ouverture extrêmes (pour min/max d'un champ heure), calculées depuis les créneaux. */
export const plageHoraire = (r: Restaurant = site) => {
  const c = r.horaires.flatMap((h) => h.creneaux);
  return { min: c.map((x) => x.ouverture).sort()[0], max: c.map((x) => x.fermeture).sort().at(-1) };
};

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
