// Contenu de La Bergerie de Lives (sources : data/restaurants/bergerie-lives/{donnees.json,dossier.md}, site actuel bergerielives.be, 27/11/2026).
// HYPOTHESES : ce n'est pas un restaurant. La maquette est requalifiee en site de maison d'hotes, domaine de mariage et seminaires.
// La page « carte » devient « Le domaine » (/le-domaine/). Aucun horaire, tarif de chambre, avis, reseau ni GPS n'est connu : rien n'est invente,
// les champs sont a null et le gabarit ne rend rien. Capacite de salle contradictoire (150 / 250) : non affichee. Batiment du XIXe : a confirmer.
// Seul prix reel : journee piscine 20 EUR par personne. Les entrees `placeholder: true` sont illustratives.
export const restaurant = {
  nom: 'La Bergerie de Lives',
  baseline: 'Maison d’hôtes, salle de mariage, espace séminaire',
  description: 'Domaine à Lives-sur-Meuse, Namur : chambres d’hôtes, piscine chauffée, sauna et jacuzzi, salle de mariage et séminaires. Le domaine se privatise le temps d’un weekend.',
  adresse: { rue: 'Rue de Mosanville 100', cp: '5101', commune: 'Namur', localite: 'Lives-sur-Meuse' },
  telephone: '+32 493 86 10 29',
  telephoneAffiche: '0493 86 10 29',
  email: 'labergeriedelives@gmail.com',
  reservationUrl: 'https://www.bergerielives.be/reservations',
  siteActuel: 'https://www.bergerielives.be',
  horaires: null as null | { jour: string; plage: string }[], // inconnus
  reseaux: [] as { nom: string; url: string }[], // inconnus
  geo: null as null | { lat: number; lon: number },
};
export const planUrl = 'https://www.openstreetmap.org/search?query=' + encodeURIComponent('Rue de Mosanville 100, 5101 Namur');

export type Offre = { id: string; nom: string; accroche: string; texte: string; photo: string; liste: string[] };
export const offres: Offre[] = [
  { id: 'chambres', nom: 'Chambres', accroche: 'Dormir dans la pierre, nager le matin.', photo: 'chambre',
    texte: 'Toutes les chambres donnent accès à la piscine, au sauna et au jacuzzi. Le petit déjeuner, varié et bio, est servi en chambre ou en salle.',
    liste: ['Wifi gratuit dans toutes les chambres', 'Cuisine partagée à disposition des hôtes'] },
  { id: 'mariages', nom: 'Mariages', accroche: 'Le domaine entier, rien que pour vous.', photo: 'ceremonieJardin',
    texte: 'Depuis 2017, le domaine reçoit des mariages. Il est privatisé le temps d’un weekend complet : cérémonie au jardin, réception sous la véranda vitrée.',
    liste: ['Domaine privatisé un weekend complet', 'Cérémonie laïque dans le jardin', 'Réception sous la véranda vitrée', 'Visite du domaine d’environ 30 minutes avant de choisir'] },
  { id: 'seminaires', nom: 'Séminaires', accroche: 'Des salles au vert, près de Namur.', photo: 'verandaSalon',
    texte: 'Le domaine propose plusieurs salles pour réunir une équipe, dans un cadre de verdure.',
    liste: ['Plusieurs salles au choix', 'Véranda lumineuse et jardin'] },
];
export const services = [
  { nom: 'Piscine extérieure chauffée', detail: 'D’avril à octobre' },
  { nom: 'Jacuzzi et sauna extérieurs', detail: 'Pour tous les hôtes' },
  { nom: 'Petit déjeuner bio', detail: 'En chambre ou en salle' },
  { nom: 'Cuisine partagée', detail: 'À disposition des hôtes' },
  { nom: 'Wifi gratuit', detail: 'Dans toutes les chambres' },
];
export const journeePiscine = { prix: 20, unite: 'par personne', note: 'Journée piscine, au 0493 86 10 29.' };
export const activites = ['Les caves à vin', 'La citadelle de Namur', 'Les musées Rops et Trema', 'Le marché du samedi', 'Les brocantes', 'Les loisirs de la vallée de la Meuse'];
export const histoire = [
  'La Bergerie de Lives est un domaine de pierre et de tuiles à Lives-sur-Meuse, dans la commune de Namur. Le lieu fut un restaurant étoilé : la presse régionale en parlait déjà en 2013.',
  'Depuis 2017, de nouveaux propriétaires y ont installé des chambres d’hôtes et accueillent des mariages et des séminaires. Le domaine n’a pas de restaurant aujourd’hui.',
  'Le domaine se visite avant de choisir une date : la visite dure environ 30 minutes.',
];
export const presse = [
  { media: 'La DH', titre: 'La Bergerie est toujours ouverte', date: '19 avril 2013' },
  { media: 'L’Avenir', titre: 'Lisa et Christophe, nouveaux propriétaires de la Bergerie', date: '14 juin 2017' },
];
