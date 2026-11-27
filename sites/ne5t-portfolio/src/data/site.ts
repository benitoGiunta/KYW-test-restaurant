// Tout le contenu du site « NE5T Intuition » (gabarit Velours adapté) vit ici.
// Source : data/restaurants/ne5t/dossier.md, donnees.json, photos/index.json (recherche du 27/11/2026).
// Une donnée, un drapeau : `placeholder: true` ne vaut que pour le champ qu'il accompagne. Toute sous-donnée non prouvée
// par le dossier est absente ou porte son propre drapeau et une marque visible là où elle s'affiche.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

/** Les heures exactes sont inconnues (dossier) : on ne code que les services (midi / soir). */
export interface Horaire { jour: Jour; midi: boolean; soir: boolean; note?: string }
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean; services?: number; quand?: string; vins?: string }
export interface Membre { nom: string; role: string; texte: string; photo?: string; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
/** Chiffre monumental d'un chapitre : seulement des nombres prouvés par le dossier (preuve citée). */
export interface Chiffre { valeur: number; libelle: string; sousLibelle?: string; preuve: string; placeholder: false }
export interface Distinction { nom: string; detail: string; url: string; placeholder: boolean }
export interface Offre { nom: string; texte: string; textePlaceholder: boolean; photo: string }
export interface Suite { nom: string; style?: string }

export interface Restaurant {
  slug: string;
  nom: string; // marque courte, titre du hero
  restaurant: string; // nom de la table
  nomLong: string; // schema.org, pied de page
  monogramme: string; // cercle de l'en-tête et du pied de page
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  telephone: string; // format international
  email: { valeur: string; placeholder: boolean };
  reservation: { restaurant: string; chambres: { outil: string; url: string } };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[]; // « à table » : prénoms prouvés par le site client
  maison: Membre[]; // propriétaires et intérieurs
  photos: Photo[];
  valeurs: string[];
  chiffres: { services: Chiffre; prix: Chiffre; suites: Chiffre; couverts: Chiffre };
  presse: Distinction[];
  citation: { texte: string; source: string; url: string; placeholder: boolean };
  offres: Offre[];
  suites: Suite[];
  spa: { surface: string; horaires: string; tarifs: { libelle: string; valeur: string }[]; note: string };
  sejour: { chambres: string; petitDejeuner: string };
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });

export const site: Restaurant = {
  slug: 'ne5t',
  nom: 'NE5T',
  restaurant: 'Intuition',
  nomLong: 'NE5T Hôtel & Spa, restaurant Intuition',
  monogramme: 'N5',
  baseline: 'Une gastronomie décomplexée',
  description:
    "Intuition, la table de l'hôtel NE5T à Namur : menu du mois en 3 ou 4 services dès 60 €, cuisine de saison, ancienne ferme au-dessus de la Meuse.",
  url: 'https://ne5t.com',
  typeCuisine: 'Gastronomique, cuisine de saison',
  // Dossier : le site client donne Avenue Vauban 46 ; restaurants.json donne Allée de Menton 26 (siège BCE). On suit le site client.
  adresse: { rue: 'Avenue Vauban', numero: '46', cp: '5000', commune: 'Namur', pays: 'BE' },
  telephone: '+32 81 58 88 88',
  email: { valeur: 'info@ne5t.com', placeholder: false },
  reservation: {
    restaurant: 'Le restaurant se réserve par téléphone uniquement. Les allergies se signalent à la réservation.',
    chambres: { outil: 'RoomRaccoon', url: 'https://booking.roomraccoon.com/ne5t/fr/' },
  },
  // Dossier : « ouvert du mercredi soir au dimanche midi ; lunch jeudi, vendredi, samedi midi ». Lundi et mardi : à confirmer.
  horaires: [
    { jour: 'lundi', midi: false, soir: false, note: 'fermé (à confirmer)' },
    { jour: 'mardi', midi: false, soir: false, note: 'fermé (à confirmer)' },
    { jour: 'mercredi', midi: false, soir: true },
    { jour: 'jeudi', midi: true, soir: true, note: 'lunch carte blanche à midi' },
    { jour: 'vendredi', midi: true, soir: true, note: 'lunch carte blanche à midi' },
    { jour: 'samedi', midi: true, soir: true, note: 'lunch carte blanche à midi' },
    { jour: 'dimanche', midi: true, soir: false },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/ne5t.hotel.spa/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/maisongersdorff/' },
    { nom: 'TripAdvisor', url: 'https://fr.tripadvisor.be/Hotel_Review-g188663-d3592392-Reviews-NE5T_Hotel_Spa-Namur_The_Ardennes_Wallonia.html' },
  ],
  carte: [
    { categorie: 'Pour éveiller vos sens', plats: [{ nom: 'Bouchées apéritives', description: '', prix: null, placeholder: false }] },
    {
      categorie: 'Première impression',
      plats: [
        { nom: 'Œuf bio à 63°', description: 'Crevettes grises, mousseline, épinards', prix: null, placeholder: false },
        { nom: 'Saint-Jacques', description: 'Purée de topinambours, chips de légumes, salicornes, écume de corail, bœuf épicé', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Deuxième impression',
      plats: [
        { nom: 'Pêche du jour', description: 'Siphon de pomme de terre, épinards, pata negra, coquillages, beurre blanc', prix: null, placeholder: false },
        { nom: 'Biche', description: 'Pommes dauphine, jus corsé aux airelles, écume au foie gras, tombée de chou au lard de Belgasconne', prix: null, placeholder: false },
      ],
    },
    { categorie: 'Pause affinée', plats: [{ nom: 'Fromage affiné de la Petite Ferme', description: '+ 9 € à la place du dessert', prix: '14 €', placeholder: false }] },
    {
      categorie: 'Dessert',
      plats: [
        { nom: 'Brioche façon pain perdu', description: 'Glace vanille, caramel, siphon à la noisette du Piémont', prix: null, placeholder: false },
        { nom: 'Notre véritable Dame Blanche', description: '', prix: null, placeholder: false },
      ],
    },
  ],
  menus: [
    { nom: 'Formule en 4 services', prix: '75 €', services: 4, quand: 'par personne', vins: 'Sélection de vins à table : 50 €', description: 'Le menu du mois en quatre services, renouvelé chaque mois selon les saisons et les arrivages.', placeholder: false },
    { nom: 'Formule en 3 services', prix: '60 €', services: 3, quand: 'par personne', vins: 'Sélection de vins à table : 40 €', description: 'Le menu du mois en trois services.', placeholder: false },
    {
      nom: 'Lunch selon l’intuition du chef',
      prix: '50 €',
      services: 3,
      quand: 'jeudi, vendredi et samedi midi',
      vins: 'Forfait 2 verres de vin, eau et café : 15 €',
      description: 'Trois services, carte blanche du chef, par personne.',
      placeholder: false,
    },
  ],
  histoire: [
    "Une ancienne ferme en carré surplombe la Meuse, à deux pas de la citadelle de Namur. Il a fallu près de dix ans de rénovations, pierre par pierre, certaines numérotées pour être reposées à l'identique, pour en faire un hôtel et un spa : la Maison Gersdorff.",
    "Son propriétaire, Benoît Gersdorff, rêvait d'un lieu qui mêle le service des palaces et l'accueil d'une maison de famille. Son épouse Christine, épaulée par l'architecte d'intérieur Pierre Brahy, a imaginé les intérieurs.",
    "Au cœur de la maison, Intuition est une table confidentielle : une gastronomie décomplexée, une cuisine franche, sincère et intuitive, un menu qui change chaque mois. Une seule invitation : suivre notre intuition.",
  ],
  equipe: [
    { nom: 'Nico', role: 'Le chef', texte: "Il cuisine au fil des arrivages, une cuisine franche, sincère et intuitive. Le menu change chaque mois, au rythme des saisons.", photo: '/photos/cuisine-service.webp', placeholder: false },
    { nom: 'Manu', role: 'Le vin et le rhum', texte: "Il partage sa passion du vin et du rhum, et vous laisse aussi choisir votre flacon en cave.", photo: '/photos/cave-vin.webp', placeholder: false },
  ],
  maison: [
    { nom: 'Benoît Gersdorff', role: 'Propriétaire', texte: '', placeholder: false },
    { nom: 'Christine', role: 'Épouse du propriétaire, intérieurs avec Pierre Brahy', texte: '', placeholder: false },
    { nom: 'Pierre Brahy', role: "Architecte d'intérieur", texte: '', placeholder: false },
  ],
  presse: [
    { nom: 'DH', detail: 'La Dernière Heure', url: 'https://ne5t.com/revue-de-presse/', placeholder: false },
    { nom: "L'Avenir", detail: 'Presse régionale', url: 'https://ne5t.com/revue-de-presse/', placeholder: false },
    { nom: 'La Meuse', detail: 'Presse régionale', url: 'https://ne5t.com/revue-de-presse/', placeholder: false },
    { nom: 'RTL', detail: 'Télévision', url: 'https://ne5t.com/revue-de-presse/', placeholder: false },
    { nom: '7Dimanche', detail: 'Magazine', url: 'https://ne5t.com/revue-de-presse/', placeholder: false },
  ],
  chiffres: {
    services: { valeur: 4, libelle: 'services', sousLibelle: 'le menu du mois, 75 € par personne', preuve: 'dossier.md, Offre et carte : formule en 4 services 75 €', placeholder: false },
    prix: { valeur: 60, libelle: 'euros', sousLibelle: 'trois services, par personne', preuve: 'dossier.md, Offre et carte : formule en 3 services 60 €', placeholder: false },
    suites: { valeur: 6, libelle: 'suites et duplex', sousLibelle: 'quatre suites et deux duplex dans la ferme rénovée', preuve: 'dossier.md, Identité : quatre suites et deux duplex', placeholder: false },
    couverts: { valeur: 45, libelle: 'couverts', sousLibelle: 'pour privatiser le restaurant', preuve: 'dossier.md, Identité : privatisation du restaurant, 45 couverts', placeholder: false },
  },
  // Aucune citation d'avis dans le dossier : la phrase citée est la devise de la maison, tirée de la page Restaurant du site client.
  citation: { texte: 'Une seule invitation : suivre notre intuition.', source: 'La devise de la maison', url: 'https://ne5t.com/restaurant-intuition/', placeholder: false },
  offres: [
    { nom: 'Privatisation', texte: 'Le restaurant se privatise pour 45 couverts : un repas de famille, une réunion d’amis, une table d’entreprise.', textePlaceholder: true, photo: '/photos/tab-table-terrasse.webp' },
    { nom: 'Repas en suite', texte: 'Votre repas servi dans la suite, à réserver au moins 24 heures à l’avance. Supplément de 15 % sur le repas et les boissons.', textePlaceholder: false, photo: '/photos/tab-chambre.webp' },
    { nom: 'Spa WellNE5T', texte: '250 m² ouverts aux clients extérieurs, sept jours sur sept de 9h30 à 20h30. Trois heures à 35 € pour les résidents, 70 € pour les autres.', textePlaceholder: false, photo: '/photos/spa-voutes.webp' },
  ],
  // Noms des six hébergements : site client. Les photos ne sont pas associées nominativement (dossier : seules deux légendes le sont).
  suites: [
    { nom: 'Suite Cosy' },
    { nom: 'Suite Ne5t' },
    { nom: 'Suite Terrasse' },
    { nom: 'Suite Blanche' },
    { nom: 'Duplex Madeleine' },
    { nom: 'Duplex Vauban' },
  ],
  spa: {
    surface: '250 m²',
    horaires: 'Tous les jours de 9h30 à 20h30',
    tarifs: [
      { libelle: 'Trois heures d’accès, résidents', valeur: '35 €' },
      { libelle: 'Trois heures d’accès, non-résidents', valeur: '70 €' },
      { libelle: 'Formules', valeur: '90 à 195 €' },
      { libelle: 'Massages', valeur: '95 à 145 €' },
      { libelle: 'Soins', valeur: '50 à 95 €' },
    ],
    note: 'Réservation par téléphone de 9h à 18h, ou demande en ligne sur le site de la maison (réponse sous 24 heures).',
  },
  sejour: {
    chambres: 'Chambres de 260 € à 400 €, à titre indicatif.',
    petitDejeuner: 'Petit-déjeuner à 26 € pour les résidents, 30 € pour les autres.',
  },
  photos: [
    photo('/photos/hero-facade-nuit.webp', 'Façade en pierre de la Maison Gersdorff de nuit, cour et bassin extérieur éclairés', 1800, 1232),
    photo('/photos/hero-facade-nuit-960.webp', 'Façade en pierre de la Maison Gersdorff de nuit, cour et bassin extérieur éclairés', 960, 657),
    photo('/photos/chap-poisson-1200.webp', 'Plat de poisson blanc, coquillages et légumes dans un bol sombre', 1200, 1200),
    photo('/photos/chap-table-1200.webp', 'Table dressée près d’une fenêtre, deux verres de vin blanc entrechoqués', 1200, 1200),
    photo('/photos/chap-duplex-1200.webp', 'Salon avec cheminée et canapé Chesterfield, bûches rangées', 1200, 1200),
    photo('/photos/spa-voutes.webp', 'Piscine intérieure sous voûtes en brique du spa WellNE5T, transats', 1400, 933),
    photo('/photos/tab-table-terrasse.webp', 'Table pour deux près d’une baie vitrée, chaises blanches', 800, 500),
    photo('/photos/tab-chambre.webp', 'Chambre sous poutres, lit blanc, fauteuil jaune', 1180, 786),
    photo('/photos/plat-bouchees.webp', 'Bouchées apéritives et verres de cocktail sur une table', 800, 1200),
    photo('/photos/plat-dessert.webp', 'Dessert aux fraises sur assiette blanche', 800, 1200),
    photo('/photos/plat-poisson.webp', 'Plat de poisson blanc, coquillages et légumes dans un bol sombre', 800, 1200),
    photo('/photos/cuisine-service.webp', 'Service d’un plat à table par un cuisinier en veste blanche', 800, 1200),
    photo('/photos/cave-vin.webp', 'Service du vin blanc à table', 800, 1200),
    photo('/photos/gal-ailes-nb.webp', 'Ailes du bâtiment en pierre, brique et bardage bois, en noir et blanc', 900, 616),
    photo('/photos/gal-voutes-nb.webp', 'Piscine intérieure sous voûtes en brique, en noir et blanc', 900, 600),
    photo('/photos/gal-fenetre-nb.webp', 'Fenêtre avec rideaux et petite table, en noir et blanc', 900, 601),
    photo('/photos/gal-vin-nb.webp', 'Service du vin blanc à table, en noir et blanc', 800, 1200),
    photo('/photos/gal-pieds-nb.webp', 'Deux personnes en peignoir, pieds dans un bassin sous voûte en brique, en noir et blanc', 900, 600),
    photo('/photos/suite-chambre.webp', 'Chambre sous poutres, lit blanc, fauteuil jaune', 800, 1200),
    photo('/photos/suite-salon-clair.webp', 'Salon clair d’un duplex avec luminaire en dôme', 800, 1200),
    photo('/photos/suite-bain.webp', 'Salle de bain avec baignoire ovale éclairée, suite Terrasse', 800, 1200),
    photo('/photos/maison-jour.webp', 'Façade en pierre de jour et bassin extérieur', 1200, 800),
    photo('/photos/spa-pieds.webp', 'Deux personnes en peignoir, pieds dans un bassin sous voûte en brique', 1400, 933),
  ],
  valeurs: ['Produits de saison', 'Cuisine franche, sincère et intuitive', 'Accueil de maison de famille'],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un site ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Services d'un jour : « midi et soir », « soir », « midi » ou la note (fermé). */
export const horaireTexte = (h: Horaire) => {
  const s = [h.midi && 'midi', h.soir && 'soir'].filter(Boolean).join(' et ');
  return s ? (h.note && h.midi ? `${s}, ${h.note}` : s) : h.note || 'fermé';
};

/** Les 3 lignes d'horaires de la carte de clôture : soirs, midis, fermeture (calculées depuis `horaires`, jamais écrites en dur). */
export function horairesResume(r: Restaurant = site): { libelle: string; valeur: string }[] {
  const plage = (hs: Horaire[]) => (hs.length > 2 ? `du ${hs[0].jour} au ${hs[hs.length - 1].jour}` : hs.map((h) => h.jour).join(' et '));
  const soirs = r.horaires.filter((h) => h.soir);
  const midis = r.horaires.filter((h) => h.midi);
  const fermes = r.horaires.filter((h) => !h.midi && !h.soir);
  return [
    { libelle: 'Le soir', valeur: plage(soirs) },
    { libelle: 'Le midi', valeur: plage(midis) },
    { libelle: plage(fermes), valeur: 'fermé (à confirmer)' },
  ];
}

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

/** Recherche d'itinéraire par adresse (les coordonnées GPS sont inconnues : jamais de latitude inventée). */
export const itineraireUrl = (r: Restaurant = site) =>
  `https://www.openstreetmap.org/search?query=${encodeURIComponent(`${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`)}`;
