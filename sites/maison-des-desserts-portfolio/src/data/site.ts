// Tout le contenu du site vit ici. Source : data/restaurants/<slug>/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Presse { media: string; titre: string; date: string | null; url: string }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export type CouleurActivite = 'vert' | 'rose' | 'bleu' | 'postit' | 'cacao';
/** Un savoir-faire de la maison (une couleur-section). */
export interface Activite { id: string; nom: string; motItalique: string; couleur: CouleurActivite; accroche: string; texte: string; specialites: string[]; photo: string; photo2?: string }
/** Jour des fêtes de fin d'année (carte des fêtes 2026-2027). */
export interface JourFete { date: string; etat: 'ouvert' | 'ferme'; note: string }
export interface Sticker { texte: string; placeholder: boolean }

export interface Restaurant {
  slug: string; nom: string; baseline: string; description: string; url: string; typeCuisine: string;
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number; lon: number };
  telephone: string;
  email: { valeur: string; placeholder: boolean };
  boutique: { nom: string; url: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[];
  presse: Presse[];
  photos: Photo[];
  valeurs: string[];
  activites: Activite[];
  fetes: { jours: JourFete[]; commandes: { noel: string; nouvelAn: string }; galette: string };
  stickers: Sticker[];
  quartier: { phrase: string; placeholder: boolean };
  manifeste: { avant: string; italique: string; apres: string };
}

import carteJson from './carte.json';

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });
const ouvert = (n?: string): Horaire['creneaux'] => [{ ouverture: '08:00', fermeture: '18:00' }];

export const site: Restaurant = {
  slug: 'maison-des-desserts',
  nom: 'La Maison des Desserts',
  baseline: 'Pâtisserie artisanale au cœur de Namur depuis 1946',
  description: 'La Maison des Desserts, pâtisserie, boulangerie, chocolaterie et salon de thé dans une bâtisse du 17e siècle du vieux Namur, rue Haute Marcelle.',
  url: 'https://lamaisondesdesserts.be',
  typeCuisine: 'Salon de thé, pâtisserie, boulangerie, chocolaterie, petite restauration',
  adresse: { rue: 'Rue Haute Marcelle', numero: '17', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4669, lon: 4.8675 },
  telephone: '+32 81 22 74 51',
  email: { valeur: 'info@mddnam.be', placeholder: false },
  boutique: { nom: 'Boutique en ligne', url: 'https://shop.lamaisondesdesserts.be' },
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: ouvert() },
    { jour: 'mercredi', creneaux: ouvert() },
    { jour: 'jeudi', creneaux: ouvert() },
    { jour: 'vendredi', creneaux: ouvert() },
    { jour: 'samedi', creneaux: ouvert() },
    { jour: 'dimanche', creneaux: [], note: 'fermé' },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/p/La-maison-des-desserts-100089286496824/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/lamaisondesdesserts/' },
  ],
  carte: carteJson as Categorie[],
  menus: [
    { nom: 'Wake up !', prix: '8,50 €', description: 'Une viennoiserie, une boisson chaude, un jus de fruits frais.', placeholder: false },
    { nom: 'Bulles au déjeuner', prix: '20,00 € par personne', description: 'Petit déjeuner festif, sur réservation, deux personnes minimum, de 8h30 à 10h30.', placeholder: false },
  ],
  histoire: [
    "La chocolaterie naît en 1946, rue de Fer, à Namur. La famille la reprend et la fait grandir.",
    "En 1993, elle ouvre le salon de thé et la pâtisserie de la rue Haute Marcelle, dans le quartier Saint-Loup, au cœur du vieux Namur.",
    "La maison occupe une bâtisse du 17e siècle. Boulangerie, pâtisserie et chocolaterie travaillent sous le même toit.",
    "Aujourd'hui, la troisième génération est aux commandes. Toutes les réalisations sont fabriquées par les équipes de la maison.",
  ],
  presse: [
    { media: 'La DH', titre: 'Namur : la Maison des desserts rouvre le 8 mai prochain', date: '2020-05-01', url: 'https://www.dhnet.be/regions/namur/2020/05/01/namur-la-maison-des-desserts-rouvre-le-8-mai-prochain-W6SRU4RVSBC6PORXMFMHGMQDII/' },
    { media: 'Le Vif Weekend', titre: 'Namur : 10 adresses dédiées aux gourmandises sucrées', date: null, url: 'https://weekend.levif.be/voyage/bons-plans-voyage/namur-10-adresses-dediees-aux-gourmandises-sucrees/' },
  ],
  photos: [
    photo('/photos/facade-vitrine-noel.webp', 'Façade et vitrine décorée de Noël, rue Haute Marcelle', 1400, 1050),
    photo('/photos/facade-jour.webp', 'Façade de la maison avec enseigne verte et vitrines de pâtisserie, de jour', 1400, 1050),
    photo('/photos/salle-colonne.webp', 'Salle du salon de thé avec colonne et tables dressées', 1400, 1867),
    photo('/photos/salle-rayures.webp', 'Salle : mur rayé, tableau et tables', 1400, 1867),
    photo('/photos/salle-fenetre.webp', 'Salle près de la fenêtre, rideaux gris, table et chaises', 1400, 1867),
    photo('/photos/millefeuille.webp', 'Tranche de gâteau feuilleté au chocolat et crème, sur fond crème', 1400, 1400),
    photo('/photos/entremets-chocolat.webp', 'Entremets au chocolat sur fond sombre, étiquette de la maison', 1400, 1400),
    photo('/photos/entremets-rouge.webp', 'Entremets rond au glaçage rouge, étiquette de la maison', 1400, 1400),
    photo('/photos/entremets-dore.webp', 'Entremets rond doré avec ruban, sur table en marbre', 1013, 1175),
    photo('/photos/pain-croute.webp', 'Pain rond à la croûte dorée sur fond clair', 1400, 1867),
    photo('/photos/pain-craquele.webp', 'Pain rond à la croûte craquelée sur fond clair', 1400, 1867),
    photo('/photos/pain-graines.webp', 'Petit pain rond aux raisins et graines', 1400, 1867),
    photo('/photos/pain-campagne.webp', 'Pain de campagne sur fond clair', 1400, 1867),
    photo('/photos/mie-baguette.webp', "Gros plan sur la mie et la croûte d'une baguette", 1400, 1050),
    photo('/photos/chocolat-epices.webp', 'Carrés de chocolat, cannelle, badiane et vanille', 853, 1280, true),
  ],
  valeurs: ['Fabriqué par les équipes de la maison', 'Savoir-faire artisanal sur trois générations'],
  manifeste: { avant: 'Pain, pâtisserie, chocolat et salon de thé, sous un même toit, depuis ', italique: '1946', apres: '.' },
  activites: [
    { id: 'patisserie', nom: 'Pâtisserie', motItalique: 'à la vitrine', couleur: 'rose', accroche: 'Les entremets,', texte: 'Entremets, millefeuilles, macarons de Paris, vacherins : la vitrine change avec les saisons et les fêtes.', specialites: ['Entremets et pâtisseries', 'Macarons de Paris', 'Vacherins et gâteaux glacés'], photo: '/photos/entremets-rouge.webp', photo2: '/photos/millefeuille.webp' },
    { id: 'boulangerie', nom: 'Boulangerie', motItalique: 'croûte', accroche: 'Le pain, de la', texte: "Pains ronds, pain de campagne, baguette, cramique et craquelin : la boulangerie travaille dans la même maison que la pâtisserie.", specialites: ['Pains de 400 g', 'Cramique et craquelin', 'Galette des rois'], photo: '/photos/pain-craquele.webp', photo2: '/photos/mie-baguette.webp' },
    { id: 'chocolaterie', nom: 'Chocolaterie', motItalique: 'biétrumés', accroche: 'Le chocolat, les', texte: "La chocolaterie est l'origine de la maison : pralines artisanales, pralines Namuco et biétrumés, la spécialité chocolatière.", specialites: ['Biétrumés', 'Pralines Namuco', 'Pralines artisanales'], photo: '/photos/chocolat-epices.webp' },
    { id: 'salon', nom: 'Salon de thé', motItalique: 'jusqu\'à 18 h', accroche: 'À table,', texte: 'Petit déjeuner, croques, quiches, burgers et salades le midi, puis crêpes, gaufres et coupes glacées tout l\'après-midi.', specialites: ['Cuisine de midi', 'Crêpes et gaufres', 'Glaces et vacherins'], photo: '/photos/salle-colonne.webp', photo2: '/photos/salle-fenetre.webp' },
  ],
  fetes: {
    jours: [
      { date: '20 décembre', etat: 'ouvert', note: 'fermeture à 17h00' },
      { date: '21 décembre', etat: 'ouvert', note: '' },
      { date: '25 décembre', etat: 'ferme', note: '' },
      { date: '27 décembre', etat: 'ouvert', note: '' },
      { date: '28 décembre', etat: 'ouvert', note: '' },
      { date: '31 décembre', etat: 'ouvert', note: 'fermeture à 17h00' },
      { date: '1er janvier', etat: 'ferme', note: '' },
    ],
    commandes: { noel: "jusqu'au 22 décembre, 18h00", nouvelAn: "jusqu'au 29 décembre, 18h00" },
    galette: 'à partir du 2 janvier',
  },
  stickers: [
    { texte: 'Fabriqué par la maison', placeholder: false },
    { texte: 'Depuis 1946', placeholder: false },
    { texte: 'Bâtisse du 17e siècle', placeholder: false },
  ],
  quartier: { phrase: 'Quartier Saint-Loup, dans le vieux Namur, rue Haute Marcelle.', placeholder: false },
};

export const activiteDe = (id: string): Activite => {
  const a = site.activites.find((x) => x.id === id);
  if (!a) throw new Error(`Activité inconnue : ${id}`);
  return a;
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas). */
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

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
