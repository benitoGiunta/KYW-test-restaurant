// Tout le contenu du site vit ici. Source : data/restaurants/tariki/donnees.json, dossier.md et photos/index.json.
// Les trous des données réelles sont soit passés à `null` (le composant ne rend rien), soit marqués `placeholder: true`.
//
// Hypothèses : carte du soir = version de la page « La carte » du site actuel (celle de l'accueil a des prix supérieurs, à confirmer) ;
// « Le début du voyage » (18 €) n'existe que sur la version d'accueil (à confirmer) ; les quatre couches du plat et leurs températures
// sont illustratives (aucune photo de plat dans le dossier) ; aucune équipe, aucun avis, aucune coordonnée GPS, aucun bon cadeau,
// aucune privatisation : rien n'est inventé, les pages correspondantes n'existent pas ; 3 visuels du site actuel (banque d'images
// ou rendu IA possibles) : droits à confirmer.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; photo?: string }
export interface Categorie { categorie: string; plats: Plat[]; service?: 'midi' | 'soir'; note?: string }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean; aConfirmer?: boolean }
export interface Etape { pays: string; texte: string }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean; legende?: string }
export interface Reseau { nom: string; url: string }
export interface Couche { id: string; nom: string; detail: string; temp: number; src: string; placeholder: boolean }

export interface Restaurant {
  slug: string;
  nom: string;
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number; lon: number } | null;
  telephone: string; // format international
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; url: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[]; // un paragraphe par entrée
  chemin: Etape[];
  presse: { media: string; date: string; texte: string; url: string };
  photos: Photo[];
  valeurs: string[];
  manifeste: { avant: string; motCle: string; apres: string };
  cuisson: { plat: string; intro: string; couches: Couche[] };
  colophon: string[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, legende?: string, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder, legende });
const p = (nom: string, description: string, prix: number): Plat => ({ nom, description, prix: `${prix} €`, placeholder: false });

export const site: Restaurant = {
  slug: 'tariki',
  nom: 'Tariki',
  baseline: 'De notre route… jusqu’à votre table.',
  description: 'Tariki, cuisine levantine au feu de bois à Namur : grillades au charbon et à flamme ouverte, mezzés à partager, carte volontairement courte.',
  url: 'https://www.tarikirestaurant.be',
  typeCuisine: 'Cuisine levantine, grillades au feu de bois',
  adresse: { rue: 'Rue de l’Ouvrage', numero: '2', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: null,
  telephone: '+32 492 92 18 39',
  email: { valeur: 'info@tarikirestaurant.be', placeholder: false },
  reservation: { outil: 'le module de réservation du restaurant', url: 'https://www.tarikirestaurant.be#reservation' },
  horaires: [
    { jour: 'lundi', creneaux: [{ ouverture: '18:00', fermeture: '21:00' }] },
    { jour: 'mardi', creneaux: [{ ouverture: '18:00', fermeture: '21:00' }] },
    { jour: 'mercredi', creneaux: [{ ouverture: '11:30', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '21:00' }] },
    { jour: 'jeudi', creneaux: [{ ouverture: '11:30', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '21:00' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '11:30', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '21:00' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '11:30', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '21:00' }] },
    { jour: 'dimanche', creneaux: [], note: 'fermé' },
  ],
  reseaux: [{ nom: 'Instagram', url: 'https://www.instagram.com/tariki.restaurant' }],
  carte: [
    {
      categorie: 'Le soir, à grignoter',
      service: 'soir',
      note: 'Une carte volontairement courte, à partager. Allergènes signalés sur la carte : fruits à coque, lait, sésame ; demandez en salle.',
      plats: [
        p('Noix de cajou fumées', 'Épices du Levant', 4),
        p('Olives Kalamata', 'Agrumes, persil', 4),
        p('Bagel de Jérusalem', 'Huile d’olive, zaatar', 5),
        p('Expérience épicée', 'Piments turşu, beurre cumin-harissa, pickles de légumes', 6),
      ],
    },
    {
      categorie: 'Le soir, à partager',
      service: 'soir',
      plats: [
        p('Houmous', 'Pois chiches, tahini, aromates', 9),
        p('Labneh', 'Ail confit, zaatar, huile d’olive', 9),
        p('Mutabal', 'Aubergines fumées, sésame, grains de grenade', 9),
        p('Rakakat', 'Feta, menthe, miel chaud (4 pièces)', 10),
        p('Falafel', 'Tahini, pickles (4 pièces)', 10),
        p('Fatayer', 'Chaussons d’épinards acidulés (3 pièces)', 11),
        p('Halloumi', 'Halloumi grillé, parmesan, citron, dukkah', 11),
        p('Kebbeh', 'Mélasse de grenade, pistaches (3 pièces)', 12),
        p('Muhammara x Stracciatella', 'Poivron rouge rôti, stracciatella, tomates fraîches', 13),
      ],
    },
    {
      categorie: 'Le soir, au feu de bois',
      service: 'soir',
      note: 'Cuites au charbon, à flamme ouverte.',
      plats: [
        p('Tawook', 'Poulet, toum, sauce Tariki, légumes grillés', 17),
        p('Brocoli rôti', 'Tarator, huile d’Alep, pignons de pin', 18),
        p('Kefta', 'Agneau, shakshouka, bawaz, légumes grillés', 19),
        p('Maquereau', 'Tahini à l’oignon caramélisé, salade d’herbes fraîches', 26),
        p('Magret de canard', 'Jus réduit à la grenade, salade d’herbes fraîches', 32),
      ],
    },
    {
      categorie: 'Le soir, accompagnements et desserts',
      service: 'soir',
      plats: [
        p('Batata Harra', 'Grenailles dorées, relevées, citronnées', 8),
        p('Salade Fatoush', 'Légumes croquants, tuile au thym, vinaigrette sumac', 8),
        p('Glace Ashta', 'Confiture de rose, barbe à papa', 9),
        p('Baklava pistache', 'Pistache croustillante, glacée et fondante', 11),
      ],
    },
    {
      categorie: 'Le midi, sandwichs au feu de bois',
      service: 'midi',
      note: 'Du mercredi au samedi. Prix de la carte du midi du site actuel.',
      plats: [
        p('Tawook', 'Poulet, toum, sauce Tariki, pickles de légumes', 9),
        p('Tawook épicé', 'Poulet, spicy toum, sauce Tariki, pickles de légumes', 9),
        p('Falafel', 'Falafels croustillants, tahini, pickles de légumes', 9),
      ],
    },
  ],
  menus: [
    {
      nom: 'Formule midi',
      prix: '17 €',
      description: 'Un sandwich (tawook, tawook épicé ou falafel), un accompagnement (houmous, mutabal, salade fatoush ou batata harra) et une pièce de baklava.',
      placeholder: false,
    },
    {
      nom: 'Le début du voyage',
      prix: '18 € par personne',
      description: 'Le soir, dès deux personnes : une sélection de mezzés à partager avant les grillades (houmous, rakakat, halloumi, falafel).',
      placeholder: false,
      aConfirmer: true,
    },
  ],
  histoire: [
    'Tariki veut dire « mon chemin ». Celui de la maison commence en Syrie, passe par le Liban, la Turquie et la Grèce, avant de trouver un foyer en Belgique.',
    'Bayti est né de cette gratitude, puis Bayti le Comptoir. Tariki ouvre un nouveau chapitre, autour du feu : des grillades cuites au charbon et à flamme ouverte, des mezzés posés au milieu de la table.',
    'La carte est volontairement courte. On y partage, on y goûte, on y revient : le tawook au toum et à la sauce Tariki, la kefta d’agneau, le magret de canard à la grenade.',
  ],
  chemin: [
    { pays: 'Syrie', texte: 'Le point de départ.' },
    { pays: 'Liban', texte: 'Premier détour, première table à partager.' },
    { pays: 'Turquie', texte: 'Le feu, les épices, les pickles.' },
    { pays: 'Grèce', texte: 'La mer, les herbes, le citron.' },
    { pays: 'Belgique', texte: 'Un foyer, Bayti, puis Tariki.' },
  ],
  presse: {
    media: 'Moustique',
    date: '2026-09-11',
    texte: 'Tariki figure parmi les adresses namuroises recommandées par Éric Boschman, comme troisième volet d’une trilogie après Bayti.',
    url: 'https://www.moustique.be/tendances/2026/09/11/restaurants-a-namur-14-bonnes-adresses-recommandees-par-eric-boschman-KSBTVPGC4BC5FJJNIZBNYJKQ4I/',
  },
  photos: [
    photo('/photos/braises.webp', 'Braises rougeoyantes et flammes sur du bois', 1800, 1013, 'Le charbon, avant le service'),
    photo('/photos/feu-de-camp.webp', 'Un feu de camp sur fond noir', 1024, 1024, 'Visuel d’ambiance, à remplacer', true),
    photo('/photos/arcades.webp', 'Un couloir d’arcades ocre, visuel d’ambiance et non le restaurant', 1800, 1428, 'Illustration orientale, non contractuelle', true),
  ],
  valeurs: ['Cuisson au charbon et à flamme ouverte', 'Partage', 'Hospitalité'],
  manifeste: {
    avant: 'Une route commencée en Syrie, un foyer trouvé en Belgique, et maintenant un feu. Du charbon, de la flamme ouverte, des mezzés posés au milieu de la table et une carte volontairement courte. Ici, on cuisine pour',
    motCle: 'partager.',
    apres: '',
  },
  cuisson: {
    plat: 'Tawook',
    intro: 'Le plat du feu, couche par couche. Illustration : étapes et températures illustratives.',
    couches: [
      { id: 'fond', nom: 'L’assiette', detail: 'Chaude, prête à recevoir', temp: 520, src: '/couches/fond.webp', placeholder: true },
      { id: 'piece', nom: 'Le poulet', detail: 'Grillé au charbon, à flamme ouverte', temp: 420, src: '/couches/piece.webp', placeholder: true },
      { id: 'garniture', nom: 'Les légumes', detail: 'Grillés au même feu', temp: 300, src: '/couches/garniture.webp', placeholder: true },
      { id: 'sauce', nom: 'Toum et sauce Tariki', detail: 'Posés au dernier moment', temp: 180, src: '/couches/sauce.webp', placeholder: true },
    ],
  },
  colophon: [
    'Visuels : site actuel du restaurant (braises, feu de camp, arcades : banque d’images ou rendu généré possibles, droits à confirmer) ; dessin du plat : KYW, illustratif.',
    'Caractères : Melodrama (Fontshare) et Literata (Google Fonts).',
  ],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const x = site.photos.find((y) => y.src === src);
  if (!x) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return x;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** '19:00' → '19 h', '19:30' → '19 h 30'. */
export const heure = (s: string) => s.replace(/^0/, '').replace(/:00$/, ' h').replace(':', ' h ');
/** Horaires lisibles : '12 h à 14 h, 19 h à 21 h' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${heure(c.ouverture)} à ${heure(c.fermeture)}`).join(', ') : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

/** Libellé de chapitre du thermomètre selon la température. */
export const chapitreDe = (t: number) => (t >= 400 ? 'cuisson' : t >= 200 ? 'dressage' : t >= 60 ? 'table' : 'nuit');
