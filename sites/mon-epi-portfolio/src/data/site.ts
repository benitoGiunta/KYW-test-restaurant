// Tout le contenu du site vit ici. Source : data/restaurants/<slug>/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date?: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }

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
  email: { valeur: string | null; placeholder: boolean };
  reservation: { outil: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  valeurs: string[];
}


const photo = (src: string, alt: string, largeur = 1280, hauteur = 853): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

export const site: Restaurant = {
  slug: 'mon-epi',
  nom: 'Monepi',
  baseline: "Prendre le temps de faire de l’excellent pain artisanal.",
  description:
    'Monepi, boulangerie artisanale à Loyers (Namur) : pains au levain bio cuits au four à bois, farines moulues sur meules de granit, viennoiseries et pains sans gluten.',
  url: 'http://www.monepi.be',
  typeCuisine: 'Boulangerie artisanale, pains au levain bio cuits au four à bois',
  adresse: { rue: 'Rue Es Fays', numero: '43', cp: '5101', commune: 'Loyers (Namur)', pays: 'BE' },
  geo: { lat: 50.4527485, lon: 4.956183 },
  telephone: '+32 491 18 29 35',
  email: { valeur: null, placeholder: false },
  reservation: { outil: 'téléphone' },
  // Seul le vendredi est publié par le client (monepi.be/contact). Les autres jours restent « à confirmer » :
  // aucun jour n'est déclaré fermé ni ouvert sans preuve, et seul le vendredi alimente le balisage schema.org.
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'à confirmer' },
    { jour: 'mardi', creneaux: [], note: 'à confirmer' },
    { jour: 'mercredi', creneaux: [], note: 'à confirmer' },
    { jour: 'jeudi', creneaux: [], note: 'à confirmer' },
    { jour: 'vendredi', creneaux: [{ ouverture: '09:00', fermeture: '18:00' }] },
    { jour: 'samedi', creneaux: [], note: 'à confirmer' },
    { jour: 'dimanche', creneaux: [], note: 'à confirmer' },
  ],
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/Monepi.boulangerie' }],
  carte: [],
  menus: [],
  histoire: [
    'Dirk Longin se forme comme boulanger-pâtissier, chocolatier et glacier à partir de 1980. En 1990, il est engagé à la boulangerie Monepi, à Loyers. Il reprend l’atelier en 1992.',
    'Depuis 1996, l’atelier moud ses farines sur des meules de granit : blé demi-gris, blé blanc, épeautre demi-gris et petit épeautre, issus de céréales bio certifiées. Le Moulin de Montigny et le Moulin de Ferrière sont cités parmi les partenaires.',
    'Le pain est cuit dans un four à bois breton, de forme ovale, à la voûte haute de 75 cm. Il chauffe de trois à quatre heures avec des fagots séchés deux ans au plus. Le levain est issu de l’agriculture biologique.',
  ],
  equipe: [{ nom: 'Dirk Longin', role: 'Boulanger-pâtissier, gérant', placeholder: false }],
  // Extraits de la section « Vos avis » du site actuel : repris tels quels (orthographe comprise), sans note ni date.
  avis: [
    { texte: 'Du pain fait à l’ancienne avec de bonnes farines et levain… Bravo… Ça devient rare dans notre beau pays…', auteur: 'Gaetan Gillet', source: 'monepi.be, « Vos avis »', placeholder: false },
    { texte: 'Boulangerie exceptionnelle ! Cuissons au feu de bois, farine moulue sur place, un lieu où on peut retrouver le goût et l’authenticité du pain à l’ancienne !', auteur: 'Brieuc Goddevrind', source: 'monepi.be, « Vos avis »', placeholder: false },
    { texte: 'Jolie petit atelier. Produits locaux avec du bon levain. Il produit sa propre farine ! Super !', auteur: 'Stacy Maëva', source: 'monepi.be, « Vos avis »', placeholder: false },
  ],
  photos: [
    photo('/photos/pains-ronds-pelle.webp', 'Pains ronds striés de farine sur la pelle, devant le four'),
    photo('/photos/mie-croute.webp', 'Gros plan sur la croûte et la mie d’un pain'),
    photo('/photos/faconnage.webp', 'Mains façonnant des pâtons sur la pelle'),
    photo('/photos/pain-four.webp', 'Pain à croûte farinée dans le four'),
    photo('/photos/four-flammes.webp', 'Flammes dans le four à bois', 1800, 1200),
    photo('/photos/four-chauffe.webp', 'Four à bois en chauffe, voûte en briques', 1800, 1200),
    photo('/photos/voute-four.webp', 'Voûte en briques du four, incandescente'),
    photo('/photos/four-bouche.webp', 'Bouche du four à bois, flammes visibles'),
    photo('/photos/petits-pains-raisins.webp', 'Trois petits pains aux raisins sur fond noir'),
    photo('/photos/pains-plats.webp', 'Deux petits pains plats dorés sur fond noir'),
    photo('/photos/viennoiseries-raisins.webp', 'Viennoiseries roulées aux raisins sur fond noir'),
    photo('/photos/gaufres.webp', 'Deux gaufres sur fond noir'),
    photo('/photos/baguette-ficelle.webp', 'Une baguette et une ficelle sur fond noir'),
    photo('/photos/pains-graines.webp', 'Pains longs aux graines de sésame, de pavot et mélangées'),
    photo('/photos/pain-seigle.webp', 'Pain de seigle entier et tranché'),
    photo('/photos/pains-ronds-claie.webp', 'Deux pains ronds à croûte farinée sur une claie'),
    photo('/photos/pains-rustiques.webp', 'Pains rustiques sur une claie en bois'),
    photo('/photos/pains-chocolat.webp', 'Pains au chocolat'),
    photo('/photos/tarte-fraises.webp', 'Tarte aux fraises'),
    photo('/photos/petrissage.webp', 'Mains pétrissant une pâte sur un plan fariné'),
    photo('/photos/enfournement-moules.webp', 'Pains de mie en moule sortant du four', 1800, 1200),
    photo('/photos/boulanger-four.webp', 'Un boulanger enfournant devant le four à bois'),
    photo('/photos/pain-moule.webp', 'Gros plan sur un pain de mie doré'),
    photo('/photos/enfournement.webp', 'Pâtons enfournés à la pelle', 1800, 1200),
  ],
  valeurs: [
    'Farines moulues sur pierre, sur place : blé demi-gris, blé blanc, épeautre demi-gris, petit épeautre',
    'Céréales bio certifiées',
    'Cuisson au four à bois, avec des fagots séchés deux ans au plus',
    'Levain issu de l’agriculture biologique',
    'Une collaboration avec le Moulin de Montigny et le Moulin de Ferrière',
  ],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Heure à la française : '19:00' → '19 h', '12:30' → '12 h 30'. */
export const heureFr = (hm: string) => { const [h, m] = hm.split(':'); return `${Number(h)} h${m && m !== '00' ? ` ${m}` : ''}`; };

/** Horaires lisibles : '9 h à 18 h' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${heureFr(c.ouverture)} à ${heureFr(c.fermeture)}`).join(', ') : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;


/* ------------------------------------------------------------------------------------------------
   Données propres au concept « Cahier du fournil ». Tout ce qui n'est pas prouvé est `placeholder: true`.
   ------------------------------------------------------------------------------------------------ */

import carteJson from './carte.json';

export interface LigneSommaire { nom: string; prix: string | null; origine?: string; originePlaceholder?: boolean; placeholder: boolean }
export interface CategorieSommaire { categorie: string; note?: string; lignes: LigneSommaire[] }
export interface Fournisseur { nom: string; produit: string; detail: string; photo: string; note: string; placeholder: boolean }
export interface PointDeVente { nom: string; commune: string; note: string; placeholder: boolean }
export interface Fait { nom: string; texte: string }

const notes: Record<string, string> = {
  'Pains au levain': 'Au levain bio, cuits au four à bois.',
  'Pains à la levure': 'Onze références, de la baguette de blé blanc au pain multigraines.',
  Viennoiseries: 'Toutes à la farine d’épeautre blanche.',
  'Petite boulangerie': 'Baguette, pistolet, ficelle, faluche et le reste du comptoir.',
  'Sans gluten': 'Variantes châtaigne et quinoa.',
};

export const cahier = {
  titre: 'Cahier du fournil',
  lieu: 'Loyers',
  /** Bande signature : trois lignes manuscrites (faits publiés par le client, aucun plat « du jour » inventé),
   *  tampon = prochain créneau d'ouverture confirmé (vendredi 9 h à 18 h), calculé dans motion/cahier.ts. */
  fournee: {
    jourOuvert: [5], // getDay() : vendredi, seul jour publié (site.horaires)
    tamponDefaut: 'vendredi, de 9 h à 18 h',
    lignes: [
      { service: 'Farine', texte: 'moulue sur place, meules de granit' },
      { service: 'Levain', texte: 'bio, pétri puis laissé pousser' },
      { service: 'Four', texte: 'à bois, 3 à 4 h de chauffe' },
    ],
  },
  /** Sommaire des pains : la carte réelle (carte.json, tirée de donnees.json par script) ; l'annotation en marge est la composition. */
  sommaire: (carteJson as { categorie: string; lignes: { nom: string; prix: string; dedans: string }[] }[]).map((c) => ({
    categorie: c.categorie,
    note: notes[c.categorie],
    lignes: c.lignes.map((l) => ({ nom: l.nom, prix: l.prix, origine: l.dedans, placeholder: false })),
  })) as CategorieSommaire[],
  /** Mur de six timbres : les quatre farines du moulin de l'atelier et les deux moulins partenaires cités par le client.
   *  Les photos illustrent le pain, pas le moulin (aucune photo du moulin dans le dossier). */
  fournisseurs: [
    { nom: 'Blé demi-gris', produit: 'farine, environ 75 %', detail: 'moulue sur place', photo: '/photos/pains-ronds-claie.webp', note: 'taux annoncé par la boulangerie', placeholder: false },
    { nom: 'Blé blanc', produit: 'farine, environ 65 %', detail: 'moulue sur place', photo: '/photos/baguette-ficelle.webp', note: 'la plus claire des quatre', placeholder: false },
    { nom: 'Épeautre demi-gris', produit: 'farine, environ 75 %', detail: 'moulue sur place', photo: '/photos/mie-croute.webp', note: 'celle des pains purs épeautre', placeholder: false },
    { nom: 'Petit épeautre', produit: 'farine, environ 80 %', detail: 'moulue sur place', photo: '/photos/pain-four.webp', note: 'la plus complète', placeholder: false },
    { nom: 'Moulin de Montigny', produit: 'partenaire cité', detail: 'céréales bio certifiées', photo: '/photos/petrissage.webp', note: 'moulin partenaire', placeholder: false },
    { nom: 'Moulin de Ferrière', produit: 'partenaire cité', detail: 'céréales bio certifiées', photo: '/photos/faconnage.webp', note: 'moulin partenaire', placeholder: false },
  ] as Fournisseur[],
  faits: [
    { nom: 'Le levain', texte: 'Issu de l’agriculture biologique. Les pains « au levain » de la carte en portent, les pains « à la levure » non.' },
    { nom: 'La mouture', texte: 'Les quatre farines sont moulues sur pierre, sur place, depuis 1996.' },
    { nom: 'Le four', texte: 'Un four à bois breton ovale, voûte de 75 cm, chauffé trois à quatre heures avant la cuisson.' },
  ] as Fait[],
  postale: {
    titre: 'Un mot du fournil',
    signataire: 'Monepi, Loyers',
    lignes: [
      'Ici, on prend le temps : un levain bio, des farines moulues sur place, un four à bois que l’on chauffe pendant des heures.',
      'Dirk Longin est à la boulangerie depuis 1990 et en a repris l’atelier en 1992. À côté du pain, il y a des viennoiseries à l’épeautre, des gaufres et, selon les saisons et les évènements, des douceurs.',
    ],
    placeholder: false,
  },
  /** Autres points de vente listés par le client (monepi.be). Horaires et gamme non publiés : mention visible. */
  pointsDeVente: [
    { nom: 'Biomanie', commune: 'Wanze', note: 'point de vente', placeholder: false },
    { nom: 'Ferme de Graux', commune: 'Fernelmont', note: 'point de vente', placeholder: false },
    { nom: 'Bio&Co', commune: 'Andenne', note: 'point de vente', placeholder: false },
    { nom: 'L’épicerie d’Ernest', commune: 'Thon', note: 'point de vente', placeholder: false },
  ] as PointDeVente[],
  equipePhrase: 'Boulanger-pâtissier, chocolatier et glacier de formation depuis 1980. A repris l’atelier en 1992.',
};
