// Contenu de NE5T Hôtel & Spa, restaurant Intuition (data/restaurants/ne5t/donnees.json + dossier.md, relevé du 27/11/2026).
// HYPOTHÈSES (aucune question posée) :
// - Adresse : le site du client donne Avenue Vauban 46 ; restaurants.json donne Allée de Menton 26 (siège BCE). On affiche Vauban 46, contradiction notée dans RAPPORT.md.
// - Heures de service : inconnues. On ne publie que les jours (mercredi soir au dimanche midi, lunch jeudi, vendredi, samedi) ; aucune heure inventée.
// - Aucun prix de plat à la carte : le restaurant ne vend qu'en formules. Aucun avis, note, presse ou distinction : rien n'est affiché.
// - Le menu change chaque mois : le contenu est celui relevé sur ne5t.com ; aucune date en dur.
// - Le couple photographié dans la cour n'est pas nommé ni utilisé comme « équipe » (identité non confirmée).
// - `placeholder: true` : texte de liaison ou information à confirmer, non fourni par le client.

const nb = ' ';
export const eur = (n: number) => `${n}${nb}€`;

export const site = {
  nom: 'Intuition',
  maison: 'NE5T Hôtel & Spa',
  nomComplet: 'Intuition, restaurant du NE5T Hôtel & Spa',
  baseline: 'Une gastronomie décomplexée',
  invitation: 'Une seule invitation : suivre notre intuition.',
  description: 'Intuition, la table du NE5T Hôtel & Spa à Namur : une gastronomie décomplexée, un menu qui change chaque mois, dans une ancienne ferme en carré au-dessus de la Meuse.',
  typeCuisine: 'Gastronomique, cuisine de saison',
  adresse: { rue: 'Avenue Vauban', numero: '46', cp: '5000', commune: 'Namur', pays: 'BE' },
  telephone: '+3281588888',
  telephoneLisible: '081 58 88 88',
  telephoneHref: 'tel:+3281588888',
  email: 'info@ne5t.com',
  emailHref: 'mailto:info@ne5t.com',
  chambresUrl: 'https://booking.roomraccoon.com/ne5t/fr/',
  planUrl: 'https://www.openstreetmap.org/search?query=Avenue%20Vauban%2046%2C%205000%20Namur',
  siteClient: 'https://ne5t.com',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/ne5t.hotel.spa/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/maisongersdorff/' },
    { nom: 'TripAdvisor', url: 'https://fr.tripadvisor.be/Hotel_Review-g188663-d3592392-Reviews-NE5T_Hotel_Spa-Namur_The_Ardennes_Wallonia.html' },
  ],
  credit: 'Photos : NE5T Hôtel & Spa',
};

// Jours de service (donnees.json > horaires). Heures non communiquées.
export const jours = [
  { jour: 'Lundi', service: 'Fermé', ferme: true, placeholder: true },
  { jour: 'Mardi', service: 'Fermé', ferme: true, placeholder: true },
  { jour: 'Mercredi', service: 'Soir' },
  { jour: 'Jeudi', service: 'Midi (lunch) et soir' },
  { jour: 'Vendredi', service: 'Midi (lunch) et soir' },
  { jour: 'Samedi', service: 'Midi (lunch) et soir' },
  { jour: 'Dimanche', service: 'Midi' },
];

// Le menu du mois : les titres des services sont ceux du restaurant.
export const impressions = [
  { cle: 'eveil', titre: 'Pour éveiller vos sens', note: '', plats: [{ nom: 'Bouchées apéritives' }] },
  { cle: 'premiere', titre: 'Première impression', note: 'et/ou', plats: [
    { nom: 'Œuf bio à 63°', desc: 'Crevettes grises, mousseline, épinards' },
    { nom: 'Saint-Jacques', desc: 'Purée de topinambours, chips de légumes, salicornes, écume de corail, bœuf épicé' },
  ] },
  { cle: 'deuxieme', titre: 'Deuxième impression', note: 'ou', plats: [
    { nom: 'Pêche du jour', desc: 'Siphon de pomme de terre, épinards, pata negra, coquillages, beurre blanc' },
    { nom: 'Biche', desc: 'Pommes dauphine, jus corsé aux airelles, écume au foie gras, tombée de chou au lard de Belgasconne' },
  ] },
  { cle: 'pause', titre: 'Pause affinée', note: '', plats: [
    { nom: 'Fromage affiné de la Petite Ferme', desc: `${eur(14)}, ou +${eur(9)} à la place du dessert` },
  ] },
  { cle: 'dessert', titre: 'Dessert', note: 'ou', plats: [
    { nom: 'Brioche façon pain perdu', desc: 'Glace vanille, caramel, siphon à la noisette du Piémont' },
    { nom: 'Notre véritable Dame Blanche' },
  ] },
];

export const formules = [
  { cle: 'trois', nom: '3 services', prix: 60, vins: 40, note: 'Par personne' },
  { cle: 'quatre', nom: '4 services', prix: 75, vins: 50, note: 'Par personne' },
  { cle: 'lunch', nom: 'Lunch carte blanche', prix: 50, vins: 15, note: 'Jeudi, vendredi et samedi midi, selon l’intuition du chef', vinsLabel: '2 verres, eau et café' },
];
export const suite = { supplement: 15, preavis: 24 };
export const privatisation = { couverts: 45 };

export const equipe = [
  { nom: 'Nico', role: 'Chef', detail: 'Cuisine au fil des arrivages : franche, sincère et intuitive.' },
  { nom: 'Manu', role: 'Vin et rhum', detail: 'Sélectionne les flacons et vous laisse aussi choisir en cave.' },
  { nom: 'Benoît Gersdorff', role: 'Propriétaire', detail: 'Le service des palaces, l’accueil d’une maison de famille.' },
  { nom: 'Christine et Pierre Brahy', role: 'Intérieurs', detail: 'Imaginés par Christine, avec l’architecte d’intérieur Pierre Brahy.', placeholder: true },
];

export const histoire = [
  'Une ancienne ferme en carré, au-dessus de la Meuse, à deux pas de la citadelle de Namur. Il a fallu près de dix ans de rénovations, pierre par pierre : certaines pierres ont été numérotées pour être reposées à l’identique.',
  'La Maison Gersdorff abrite aujourd’hui quatre suites, deux duplex, le spa WellNE5T et, au cœur de l’hôtel, Intuition.',
];

export const maison = {
  spa: ['250 m² de spa ouvert aussi aux clients extérieurs', 'Piscine intérieure chauffée à 33°', 'Hammam, sauna infrarouge, tisanerie', 'Tous les jours de 9 h 30 à 20 h 30'],
  suites: 'Quatre suites et deux duplex, chacun son style, du design contemporain au bois vieilli et chaulé.',
};

// photos/index.json fait foi pour les alt (champ « sujet »).
export const faits = [
  { cle: 'jours', k: 'Du mercredi soir au dimanche midi', v: 'Fermé le lundi et le mardi (à confirmer).', placeholder: true },
  { cle: 'lunch', k: 'Lunch carte blanche', v: 'Jeudi, vendredi, samedi midi, à 50 €.' },
  { cle: 'suite', k: 'Repas en suite', v: 'À réserver 24 h à l’avance, supplément de 15 %.' },
  { cle: 'privat', k: 'Privatisation', v: '45 couverts, proposition sur mesure.' },
];
