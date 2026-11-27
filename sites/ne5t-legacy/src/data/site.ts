// Contenu de NE5T Hôtel & Spa (restaurant Intuition). Sources : data/restaurants/ne5t (dossier.md, donnees.json, photos/index.json).
// Rien d'inventé : un fait absent reste absent ou devient un slot « .fill » listé dans ETAT.md.

export const site = {
  nom: 'NE5T Hôtel & Spa',
  restaurant: 'Intuition',
  baseline: 'Une gastronomie décomplexée',
  tel: '+32 81 58 88 88',
  telHref: 'tel:+3281588888',
  telAffiche: '081 58 88 88',
  email: 'info@ne5t.com',
  adresse: { rue: 'Avenue Vauban 46', cp: '5000', commune: 'Namur' },
  roomraccoon: 'https://booking.roomraccoon.com/ne5t/fr/',
  facebook: 'https://www.facebook.com/ne5t.hotel.spa/',
  instagram: 'https://www.instagram.com/maisongersdorff/',
  tripadvisor: 'https://fr.tripadvisor.be/Hotel_Review-g188663-d3592392-Reviews-NE5T_Hotel_Spa-Namur_The_Ardennes_Wallonia.html',
  siteActuel: 'https://ne5t.com',
  presse: 'https://ne5t.com/revue-de-presse/',
};

export const nav = [
  { href: '', label: 'Accueil', id: 'accueil' },
  { href: 'restaurant/', label: 'Restaurant', id: 'restaurant' },
  { href: 'spa/', label: 'Spa', id: 'spa' },
  { href: 'suites/', label: 'Suites et duplex', id: 'suites' },
  { href: 'histoire/', label: 'Notre histoire', id: 'histoire' },
  { href: 'infos/', label: 'Infos et tarifs', id: 'infos' },
];

type P = { w: number; h: number; alt: string };
export const photos: Record<string, P> = {
  '00-logo-ne5t': { w: 640, h: 400, alt: 'NE5T Hôtel & Spa Restaurant' },
  '01-facade-nuit-piscine': { w: 1900, h: 1300, alt: 'Façade de la Maison Gersdorff de nuit, cour et bassin extérieur éclairés' },
  '02-facade-jour-bassin': { w: 1200, h: 800, alt: 'Façade en pierre de jour et bassin extérieur' },
  '03-ailes-batiment': { w: 1900, h: 1300, alt: 'Ailes du bâtiment en pierre, brique et bardage bois, allée d’accès' },
  '04-couple-cour': { w: 1920, h: 1280, alt: 'Un couple posant devant la façade en pierre' },
  '05-table-toast': { w: 1920, h: 1280, alt: 'Table dressée près d’une fenêtre, deux verres de vin blanc entrechoqués' },
  '06-plat-poisson': { w: 1920, h: 1080, alt: 'Plat de poisson blanc, coquillages et légumes dans un bol sombre' },
  '10-resto-dessert': { w: 800, h: 1200, alt: 'Dessert aux fraises sur assiette blanche, logo Intuition sur la nappe' },
  '11-resto-service-vin': { w: 800, h: 1200, alt: 'Service du vin blanc en terrasse' },
  '12-resto-table-terrasse': { w: 800, h: 1200, alt: 'Table pour deux près d’une baie vitrée, chaises blanches' },
  '14-spa-piscine-voutes': { w: 1800, h: 1200, alt: 'Piscine intérieure sous voûtes en brique du spa WellNE5T, transats' },
  '15-spa-pieds-eau': { w: 1920, h: 1280, alt: 'Deux personnes en peignoir, pieds dans un bassin sous voûte en brique' },
  '16-spa-sauna-infrarouge': { w: 1200, h: 420, alt: 'Sauna infrarouge, banc en bois et mur en pierre' },
  '17-duplex-salon-cheminee': { w: 1920, h: 1280, alt: 'Salon avec cheminée et canapé Chesterfield, bûches rangées' },
  '18-chambre-lit': { w: 1181, h: 787, alt: 'Chambre sous poutres, lit blanc, fauteuil jaune' },
  '20-duplex-salon-clair': { w: 1920, h: 1282, alt: 'Salon clair avec luminaire en dôme' },
};

export const carte = [
  { cat: 'Pour éveiller vos sens', plats: [{ nom: 'Bouchées apéritives' }] },
  { cat: 'Première impression', plats: [
    { nom: 'Œuf bio à 63°', desc: 'Crevettes grises, mousseline, épinards' },
    { nom: 'Saint-Jacques', desc: 'Purée de topinambours, chips de légumes, salicornes, écume de corail, bœuf épicé' },
  ] },
  { cat: 'Deuxième impression', plats: [
    { nom: 'Pêche du jour', desc: 'Siphon de pomme de terre, épinards, pata negra, coquillages, beurre blanc' },
    { nom: 'Biche', desc: 'Pommes dauphine, jus corsé aux airelles, écume au foie gras, tombée de chou au lard de Belgasconne' },
  ] },
  { cat: 'Pause affinée', plats: [{ nom: 'Fromage affiné de la Petite Ferme', prix: '14 €', note: '+ 9 € à la place du dessert' }] },
  { cat: 'Dessert', plats: [
    { nom: 'Brioche façon pain perdu', desc: 'Glace vanille, caramel, siphon à la noisette du Piémont' },
    { nom: 'Notre véritable Dame Blanche' },
  ] },
];

export const formules = [
  { nom: '3 services', prix: '60 €', note: 'Vins à table : 40 €' },
  { nom: '4 services', prix: '75 €', note: 'Vins à table : 50 €' },
  { nom: 'Lunch selon l’intuition du chef', prix: '50 €', note: 'Jeudi, vendredi et samedi midi. Carte blanche en 3 services. Deux verres, eau et café : 15 €' },
];

// Jours : l'écart « midi / soir » vient de donnees.json ; les heures exactes sont inconnues (slot .fill).
export const semaineResto = [
  { j: 'Lundi', h: 'Fermé', ferme: true },
  { j: 'Mardi', h: 'Fermé', ferme: true },
  { j: 'Mercredi', h: 'Le soir' },
  { j: 'Jeudi', h: 'Midi et soir' },
  { j: 'Vendredi', h: 'Midi et soir' },
  { j: 'Samedi', h: 'Midi et soir' },
  { j: 'Dimanche', h: 'Midi' },
];

export const suites = {
  suites: ['Suite Cosy', 'Suite Ne5t', 'Suite Terrasse', 'Suite Blanche'],
  duplex: ['Duplex Madeleine', 'Duplex Vauban'],
};

export const spaTarifs = [
  { nom: 'Trois heures au spa', prix: '35 €', note: 'Résidents. Non-résidents : 70 €' },
  { nom: 'Formules', prix: '90 à 195 €' },
  { nom: 'Massages', prix: '95 à 145 €' },
  { nom: 'Soins', prix: '50 à 95 €', note: 'Gamme Thémaé' },
];

export const equipe = [
  { nom: 'Benoît Gersdorff', role: 'Propriétaire' },
  { nom: 'Christine', role: 'Conception des intérieurs, avec l’architecte d’intérieur Pierre Brahy' },
  { nom: 'Nico', role: 'Le chef, qui cuisine au fil des arrivages' },
  { nom: 'Manu', role: 'Le vin et le rhum, la sélection et la cave' },
];
