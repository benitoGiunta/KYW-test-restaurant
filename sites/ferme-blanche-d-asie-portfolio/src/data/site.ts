// Tout le contenu du site vit ici. Source : data/restaurants/ferme-blanche-d-asie/ (donnees.json, dossier.md, photos/index.json).
// Les trous des données réelles sont comblés par `placeholder: true` ou `null` (le composant ne rend rien) :
// aucun avis, chiffre, date ou personne inventé. Carte complète dans carte.json (56 références, transcrites du site actuel).
import carteJson from './carte.json';

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { numero: number; nom: string; description: string; allergenes: string; prix: string }
export interface Categorie { id: string; categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; lignes: string[]; note?: string; placeholder: boolean }
export interface Avis { texte: string; source: string; url?: string }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
/** Plat du rouleau : nom, trois mots tirés de la carte, prix réel ; pas de photo (aucun plat photographié lisible au dossier). */
export interface PlatRouleau { nom: string; mots: string; prix: string; numero?: number }
export interface Salle { nom: string; capacite: string; detail: string; photo: string }

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
  reservation: { outil: string; url: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  nombreReferences: number; // nombre de références annoncé par le dossier (constante, jamais un length)
  menuDecouverte: Menu;
  menusFetes: Menu[];
  emporter: { remise: string; texte: string };
  allergenes: string;
  salles: Salle[];
  avis: Avis[];
  notes: { source: string; note: string; nombre: string; aConfirmer: boolean }[];
  photos: Photo[];
  valeurs: string[];
  rouleau: { titre: string; note: string; plats: PlatRouleau[] };
  acces: { parking: string; terrasse: string; jardin: string };
  sceau: { initiales: string; placeholder: boolean };
  phraseHero: string;
  manifeste: { titre: string; texte: string };
  pratique: { paiements: string; langues: string; commande: string };
}

const photo = (src: string, alt: string, largeur = 1400, hauteur = 841): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

export const site: Restaurant = {
  slug: 'ferme-blanche-d-asie',
  nom: 'La Ferme Blanche d’Asie',
  baseline: 'Restaurant asiatique à Malonne, près de Namur.', // sous-titre du site actuel : « Restaurant asiatique »
  description:
    'La Ferme Blanche d’Asie, restaurant asiatique à Malonne (Namur) : dim sum, canard laqué, menu découverte à 29 €, grandes salles, salle V.I.P. et parking privé.',
  url: 'https://www.lafermeblanchedasie.be',
  typeCuisine: 'Cuisine asiatique, chinoise',
  adresse: { rue: 'Allée de la Maison Blanche', numero: '20', cp: '5020', commune: 'Malonne (Namur)', pays: 'BE' },
  geo: { lat: 50.4510732, lon: 4.817696 },
  telephone: '+32 81 44 64 89',
  email: { valeur: 'lafermeblanchedasie@gmail.com', placeholder: false },
  reservation: { outil: 'téléphone', url: 'tel:+3281446489' },
  horaires: [
    { jour: 'lundi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '23:00' }] },
    { jour: 'mardi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '23:00' }] },
    { jour: 'mercredi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '23:00' }] },
    { jour: 'jeudi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '23:00' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '23:00' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '00:00' }] },
    { jour: 'dimanche', creneaux: [{ ouverture: '12:00', fermeture: '15:30' }, { ouverture: '18:00', fermeture: '23:00' }] },
  ],
  reseaux: [{ nom: 'Facebook', url: 'https://fr-fr.facebook.com/lafermeblanchedasie/' }],
  carte: carteJson as Categorie[],
  nombreReferences: 56,
  menuDecouverte: {
    nom: 'Menu découverte',
    prix: '29 €',
    description: 'Cinq services, par personne, à partir de deux personnes.',
    lignes: ['Bœuf aux oignons', 'Canard aux fruits frais', 'Poulet sauce coriandre', 'Filet de perche sauce coriandre', 'Scampis à l’ail'],
    placeholder: false,
  },
  menusFetes: [
    {
      nom: 'Menu de Noël',
      prix: '45 €',
      description: 'Par personne.',
      lignes: [
        'Mise en bouche : salade de bœuf et avocat',
        'Potage au choix : piquant, nid d’hirondelle, tomate ou raviolis chinois',
        'Entrée : scampis sautés aux tomates',
        'Assortiment de plateaux : calamars au curry jaune, dorade royale au beurre à l’ail, bœuf aux oignons, canard sirop d’érable, poulet basilic',
      ],
      note: 'Dessert au choix : le détail n’est pas lisible sur l’affiche d’origine, à compléter par le restaurant.',
      placeholder: false,
    },
    {
      nom: 'Menu du réveillon du nouvel an',
      prix: '65 €',
      description: 'Par personne. Acompte de 20 € par personne à la réservation.',
      lignes: [
        'Mise en bouche : salade de bœuf et avocat',
        'Potage aux légumes et scampis de rizière',
        'Entrée : tomate farcie au poulet thaï',
        'Plat au choix : ribs de porc à l’ail, canard laqué aux cèpes umami, scampis façon du chef, fondue de dorade au curry et lait de coco (à réserver à l’avance) ou nouilles royales (bœuf, poulet, calamars, scampis)',
        'Dessert : flan au matcha',
      ],
      placeholder: false,
    },
  ],
  emporter: { remise: '-10 %', texte: 'Les plats à emporter bénéficient de 10 % de réduction. Commande par téléphone au 081 44 64 89.' },
  allergenes: 'Les allergènes ne sont indiqués que pour les potages ; pour les autres plats, demandez conseil en salle.',
  salles: [
    { nom: 'Salle V.I.P.', capacite: '26 personnes au maximum', detail: 'Toilette privée et accès direct à la terrasse.', photo: '/photos/salle-ronde.webp' },
    { nom: 'Grande salle privée', capacite: 'Environ 300 personnes', detail: 'Pour les réceptions, repas de famille et fêtes de groupe.', photo: '/photos/salle-longue.webp' },
  ],
  avis: [
    { texte: 'Très bon chinois, carte variée, grand parking et surtout commande via une tablette ce qui permet de déterminer le rythme et de prendre son temps... ou pas pour les pressés.', source: 'Trouve Ton Resto', url: 'https://www.trouvetonresto.be/la-ferme-blanche-d-asie-restaurant-malonne/10512' },
    { texte: 'Accueil chaleureux aussi bien du patron que du personnel, cuisine raffinée.', source: 'Trouve Ton Resto' },
    { texte: 'Service rapide, gentillesse du personnel, beau cadre, très bonne nourriture. Prix abordable.', source: 'Resto.be' },
    { texte: 'Accueil agréable, cadre reposant, menus variés et délicieux. Prix très abordable. Je reviendrai.', source: 'Resto.be' },
  ],
  notes: [
    { source: 'Resto.be', note: '9,1/10', nombre: '201 avis', aConfirmer: true },
    { source: 'Trouve Ton Resto', note: '4,4/5', nombre: '6 avis', aConfirmer: false },
  ],
  photos: [
    photo('/photos/salle-poutres.webp', 'Salle à poutres sombres, tables dressées avec verres et lampes suspendues'),
    photo('/photos/salle-principale.webp', 'Salle principale, tables dressées sous les lustres'),
    photo('/photos/salle-longue.webp', 'Salle en longueur le long des baies vitrées, longue tablée'),
    photo('/photos/salle-ronde.webp', 'Salle avec table ronde à plateau tournant, rideaux et lustre'),
    photo('/photos/table-ronde.webp', 'Table ronde à plateau tournant, salle voisine à poutres'),
    photo('/photos/coin-salon.webp', 'Coin salon avec canapés en cuir et fresque florale'),
    photo('/photos/facade-jardin.webp', 'Le bâtiment vu du jardin, kiosque en bois et pelouse'),
    photo('/photos/facade-kiosque.webp', 'Le bâtiment vu du jardin avec son kiosque chinois'),
    photo('/photos/terrasse.webp', 'Terrasse avec parasols et bambous devant le bâtiment'),
    photo('/photos/parking.webp', 'Le bâtiment et son parking privé'),
    photo('/photos/cocotte.webp', 'Cocotte noire et ingrédients, herbes et sauce, sur une planche', 1916, 850),
    photo('/photos/wok.webp', 'Wok de crevettes sautées, la main du cuisinier', 1919, 1000),
  ],
  valeurs: ['Service rapide', 'Salle climatisée', 'Parking privé', 'Plats à emporter à -10 %', 'Accueil en français et en chinois'],
  phraseHero: 'Une grande table asiatique, ronde, qui tourne et se partage.',
  manifeste: {
    titre: 'La table qui tourne',
    texte:
      'Cinquante-six plats à la carte, du dim sum au canard laqué, un menu découverte à cinq services dès deux personnes, et des tables rondes à plateau tournant. On commande sur tablette, à son rythme : on vient en famille, on partage, on prend son temps.',
  },
  rouleau: {
    titre: 'Le rouleau',
    note: 'Douze plats de la carte, avec leur numéro et leur prix. La carte complète compte cinquante-six références.',
    plats: [
      { nom: 'Menu découverte', mots: 'cinq services, dès deux personnes', prix: '29 €' },
      { nom: 'Canard laqué', mots: 'servi avec crêpes', prix: '17,50 €', numero: 81 },
      { nom: 'Casserole de fruits de mer', mots: 'fruits de mer, casserole', prix: '20,00 €', numero: 48 },
      { nom: 'Plat royal', mots: 'spécialité de la carte', prix: '19,90 €', numero: 49 },
      { nom: 'Scampis à l’ail', mots: 'scampis, ail', prix: '16,90 €', numero: 57 },
      { nom: 'Bœuf aux oignons', mots: 'bœuf, oignons', prix: '15,90 €', numero: 88 },
      { nom: 'Canard aux fruits frais', mots: 'canard, fruits frais', prix: '16,50 €', numero: 80 },
      { nom: 'Poulet sauce coriandre', mots: 'poulet, coriandre', prix: '14,00 €', numero: 73 },
      { nom: 'Assortiment de dim sum', mots: 'assortiment, dim sum', prix: '7,10 €', numero: 22 },
      { nom: 'Assortiment de sushis', mots: 'assortiment, sushis', prix: '7,90 €', numero: 19 },
      { nom: 'Raviolis traditionnels', mots: 'entrée, raviolis', prix: '7,10 €', numero: 25 },
      { nom: 'Potage piquant', mots: 'champignons, oignons, filet de canard', prix: '4,90 €', numero: 1 },
    ],
  },
  acces: {
    parking: 'Parking privé devant le bâtiment.',
    terrasse: 'Terrasse avec parasols et bambous.',
    jardin: 'Jardin avec kiosque en bois.',
  },
  sceau: { initiales: 'FB', placeholder: false },
  pratique: {
    paiements: 'Espèces, Visa, Mastercard, Maestro et Bancontact.',
    langues: 'Accueil en français et en chinois.',
    commande: 'Commande sur tablette à table, à votre rythme.',
  },
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
export const horairesGroupes = (r: Restaurant = site) => {
  const g: { jours: string; texte: string }[] = [];
  let debut = '', fin = '', texte = '', n = 0;
  const pousser = () => { if (debut) g.push({ jours: n === 1 ? debut : `${debut} ${n === 2 ? 'et' : 'au'} ${fin}`, texte }); };
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
