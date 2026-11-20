// Contenu du site « Champs Élysées » (variante awwwards). Source : data/restaurants/champs-elysees/ (donnees.json, dossier.md).
// HYPOTHÈSES (voir RAPPORT.md) :
// - Adresse : « 5100 Jambes (Namur) » (restaurants.json) ; le site du client écrit 5000 : douteux, non corrigé.
// - Horaires : ceux du site du client (lun-sam 11 h-22 h, dim 11 h-16 h) ; Rankeat dit 10 h-23 h 30 : à confirmer.
// - Réservation : widget Zenchef du client (lien externe) ; aucun backend.
// - Aucun avis, note, distinction ni chef nommé en cuisine actuelle : rien n'est inventé. Aucun `placeholder` sur ce fichier.
export const restaurant = {
  nom: 'Champs Élysées',
  nomLong: 'Les Champs Élysées',
  baseline: 'Bistro convivial',
  description:
    'Brasserie ouverte en 1984 avenue Albert Ier à Jambes (Namur) : croquettes artisanales, boulettes, vol-au-vent, bières de caractère, de 11 h à 22 h sans fermer.',
  cuisine: 'Brasserie',
  telephone: '+3281231426',
  telephoneAffiche: '081 23 14 26',
  email: 'resto@champselysees.be',
  adresse: { rue: 'Avenue Albert Ier', numero: '149', cp: '5100', commune: 'Jambes (Namur)', pays: 'BE' },
  geo: { lat: 50.4670366, lon: 4.8852896 },
  planUrl: 'https://www.google.com/maps?q=50.4670366,4.8852896',
  reservationUrl: 'https://bookings.zenchef.com/results?rid=377536&pid=1001',
  siteClient: 'https://champselysees.be',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/p/Brasserie-Les-Champs-%C3%89lys%C3%A9es-100057095544488/' },
  ],
  instagram: '@champselysees.namur',
  credit: 'photos : Champs Élysées',
  ouverture: '13 juillet 1984',
  couverts: 120,
} as const;

// Jours : ouvert (début, fin) en heures décimales ; la barre de la semaine en tire sa longueur.
export const horaires = [
  { jour: 'Lundi', ouvre: 11, ferme: 22 },
  { jour: 'Mardi', ouvre: 11, ferme: 22 },
  { jour: 'Mercredi', ouvre: 11, ferme: 22 },
  { jour: 'Jeudi', ouvre: 11, ferme: 22 },
  { jour: 'Vendredi', ouvre: 11, ferme: 22 },
  { jour: 'Samedi', ouvre: 11, ferme: 22 },
  { jour: 'Dimanche', ouvre: 11, ferme: 16 },
] as const;
export const heure = (h: number) => `${h} h`;

export const fetes = {
  titre: 'Menu des fêtes patronales',
  service: 'Trois services, entrée, plat et dessert au choix',
  prixSans: 50,
  prixAvec: 65,
  avecDetail: 'apéritif maison, trois verres de vin, softs ou pils, café ou thé',
  entrees: ['terrine de chasse', 'velouté de potimarron à la châtaigne', 'saumon gravlax'],
  plats: ['civet de marcassin', 'suprême de pintade aux pleurotes', 'médaillons de sole'],
  desserts: ['omelette norvégienne', 'mousse au chocolat', 'panna cotta caramel-noix'],
};

export const signatures = [
  { nom: 'Croquettes artisanales', detail: 'fromage ou crevettes', cat: 'entrees' },
  { nom: 'Boulettes', detail: 'sauce tomate, liégeoise ou Sambre et Meuse', cat: 'plats-brasserie' },
  { nom: 'Vol-au-vent maison', detail: '', cat: 'plats-brasserie' },
  { nom: 'Cordon bleu maison', detail: '', cat: 'plats-brasserie' },
  { nom: 'Petits gris de Namur', detail: 'huit pièces', cat: 'entrees' },
  { nom: 'Burger des Champs', detail: 'bœuf de Famenne, fromage de Maredsous', cat: 'plats-brasserie' },
] as const;

export const equipe = [
  { nom: 'Maurice Druart', role: 'Fondateur, patron', note: 'Surnommé « Momo »', source: 'La DH, 4 août 2024' },
  { nom: 'Teresa', role: 'Patronne, associée', note: 'Originaire de Tropea, en Calabre', source: 'La DH, 4 août 2024' },
] as const;

export const histoire = {
  paragraphes: [
    'La brasserie ouvre le 13 juillet 1984 avenue Albert Ier, à l’emplacement de l’ancien café Le Sportman, à deux pas de l’hôpital Saint-Camille.',
    'Maurice Druart, que tout le monde appelle Momo, lance la maison. Teresa, originaire de Tropea en Calabre, le rejoint quelques mois plus tard. Ils la dirigent ensemble.',
    'Aujourd’hui, une équipe de neuf personnes sert environ cent vingt couverts, du midi au soir, tous les jours de la semaine.',
  ],
  citation: { texte: 'De caractère difficile. Je suis directe. Ceux qui viennent pour moi ont dû apprendre à m’aimer.', auteur: 'Teresa', source: 'La DH, 4 août 2024' },
  chef: 'Le chef Philippe Huens a tenu les fourneaux pendant vingt-huit ans (La DH, 4 août 2024).',
  chiffres: [
    { v: '1984', l: 'ouverture, le 13 juillet' },
    { v: '120', l: 'couverts environ' },
    { v: '9', l: 'personnes en équipe' },
    { v: '7 j/7', l: 'selon le site de la maison' },
  ],
} as const;

export const pratique = [
  { t: 'Adresse', d: 'Avenue Albert Ier 149, à Jambes, côté Namur. Terrasse sur l’avenue, devant la façade blanche.' },
  { t: 'Repère', d: 'À deux pas de l’hôpital Saint-Camille, dans l’ancien café Le Sportman.' },
  { t: 'Groupes', d: 'Pour plus de dix personnes, la maison demande de l’appeler directement.' },
  { t: 'Enfants', d: 'Le menu des djônes, jusqu’à douze ans, propose des quantités adaptées.' },
] as const;

// Photos : fichiers de src/assets/photos (voir lib/photos.ts) ; alt d'après le champ `sujet` de photos/index.json.
