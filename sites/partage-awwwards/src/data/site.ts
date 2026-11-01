// Contenu de Partage (variante awwwards). Source : data/restaurants/partage/{dossier.md, donnees.json}.
// Hypothèses (DESIGN.md « Faits manquants ») :
// 1. téléphone : 081 81 00 98 (site officiel) ; le numéro mobile cité par Le Fooding n'est pas repris ;
// 2. e-mail inconnu : aucun mailto ; 3. heures de service 12 h à 14 h et 18 h 30 à 22 h : placeholder (à confirmer) ;
// 4. réservation : lien du site actuel (#reservation), outil tiers non identifié ;
// 5. menus 4 services et homard (presse) non publiés ; 6. aucun avis client publié ;
// 7. seul le portrait 09 est nommé (Charles Jeandrain), les autres personnes ne le sont pas.

export interface Plat { nom: string; description?: string; prix?: number; bouteille?: number; prixTexte?: string; placeholder?: boolean }
export interface Categorie { categorie: string; plats: Plat[] }

export const site = {
  nom: 'Partage',
  signature: 'Charles Jeandrain',
  baseline: 'Cuisine à partager, piétonnier de Namur',
  description:
    'Partage, le bistro de Charles Jeandrain dans le piétonnier de Namur : des plats posés au milieu de la table, des produits locaux, un lunch à 38 € le midi.',
  typeCuisine: ['Bistro', 'Cuisine à partager', 'Cuisine belge'],
  adresse: { rue: 'Rue des Fossés Fleuris', numero: '18', cp: '5000', commune: 'Namur', repere: 'place Maurice Servais', pays: 'BE' },
  geo: { lat: 50.4626798, lon: 4.8651014 },
  telephone: '+32 81 81 00 98',
  telephoneHref: 'tel:+3281810098',
  telephoneLisible: '081 81 00 98',
  reservationUrl: 'https://restaurantpartage.be/#reservation',
  bonCadeauUrl: 'https://restaurantpartage.be/bon-cadeau/',
  carteUrl: 'https://www.openstreetmap.org/?mlat=50.46268&mlon=4.86510#map=18/50.46268/4.86510',
  ouverture: '12 novembre 2024',
  couverts: 'une trentaine de couverts',
  privatisation: 'de 20 à 30 personnes',
  reseaux: [
    { nom: 'Instagram', url: 'https://www.instagram.com/restaurant_partage_namur/' },
    { nom: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61566994066332' },
  ],
  parkings: [
    { nom: 'Parking Beffroi', distance: 'à 1 minute à pied' },
    { nom: 'Parking La Confluence', distance: 'à 2 minutes à pied' },
  ],
  citation: { texte: 'Le partage, c’est aussi un moment.', auteur: 'Charles Jeandrain', source: 'La DH, novembre 2024' },
  citationBistro: { texte: 'J’avais toujours dit que j’ouvrirais un bistro dans le centre de Namur.', auteur: 'Charles Jeandrain', source: 'La Libre, mai 2025' },
} as const;

// Service : heures retenues (placeholder, à confirmer) ; jours de fermeture officiels du site.
export const services = {
  midi: { ouverture: '12:00', fermeture: '14:00', lisible: '12 h à 14 h', placeholder: true },
  soir: { ouverture: '18:30', fermeture: '22:00', lisible: '18 h 30 à 22 h', placeholder: true },
} as const;

export const horaires = [
  { jour: 'Lundi', en: 'Monday', midi: false, soir: false },
  { jour: 'Mardi', en: 'Tuesday', midi: false, soir: true },
  { jour: 'Mercredi', en: 'Wednesday', midi: true, soir: true },
  { jour: 'Jeudi', en: 'Thursday', midi: true, soir: true },
  { jour: 'Vendredi', en: 'Friday', midi: true, soir: true },
  { jour: 'Samedi', en: 'Saturday', midi: true, soir: true },
  { jour: 'Dimanche', en: 'Sunday', midi: false, soir: false },
] as const;

export const lunch = {
  prix: 38,
  regle: 'Uniquement les midis, pour la table entière.',
  date: '21 octobre 2026',
  services: [
    { temps: 'Entrée', plat: 'Comme une pomme de terre au foie gras', detail: 'gel de porto, oignons rouges' },
    { temps: 'Entrée', plat: 'Raviole de champignons des bois', detail: 'bouillon beurré de champignons au soja' },
    { temps: 'Plat', plat: 'Volaille jaune à basse température', detail: 'embeurrée de chou vert, jus brun de volaille au poivre' },
    { temps: 'Dessert', plat: 'Crumble de pommes', detail: 'crème légère, glace vanille' },
  ],
  fromages: 'Fromages en supplément 16 €, ou à la place du dessert 9 €.',
};

// Spécialités citées par la presse et la carte (aucune n'est inventée)  ; aucune photo n'y est associée (les photos du client ne montrent pas ces plats).
export const specialites = [
  { nom: 'Croquettes de jambon ibérique', origine: 'Six pièces au milieu de la table, sur la carte de 2026.' },
  { nom: 'Arrosticini des Abruzzes', origine: 'Brochettes fumées au thym, en salle, devant vous (La Libre, 2025).' },
  { nom: 'Raviole ouverte au confit d’agneau', origine: 'Citée par La Libre et Le Fooding.' },
  { nom: 'Boulettes à la namuroise', origine: 'Le clin d’œil local de la maison (La Libre, 2025).' },
] as const;

export const equipe = [
  { nom: 'Charles Jeandrain', role: 'Chef et fondateur, aussi chef d’Attablez-vous' },
  { nom: 'Luca Recloux', role: 'Chef de cuisine' },
  { nom: 'Loïc Goumet', role: 'Salle, neuf ans chez Attablez-vous' },
  { nom: 'Antoine', role: 'Cuisine' },
] as const;

export const presse = [
  { media: 'La DH', date: '19 novembre 2024', titre: 'Une cuisine chaleureuse, moins guindée que celle d’Attablez-vous', url: 'https://www.dhnet.be/regions/namur/2024/11/19/le-chef-etoile-namurois-charles-jeandrain-ouvre-un-nouveau-restaurant-a-namur-une-cuisine-chaleureuse-moins-guindee-que-celle-dattablez-vous-TBUNVXXBUJBLXDLXOA2RDENOW4/' },
  { media: 'La Libre', date: '31 mai 2025', titre: 'On a testé Partage : bistro namurois à la cuisine gourmande', url: 'https://www.lalibre.be/lifestyle/magazine/2025/05/31/on-a-teste-partage-bistro-namurois-a-la-cuisine-gourmande-avec-des-touches-raffinees-ou-voyageuses-EQA32RRU65DRRCNS5PC3TU72OM/' },
  { media: 'Le Vif Weekend', date: 'Le resto de la semaine', titre: 'Partage à Namur, où la sharing food retrouve ses lettres de noblesse', url: 'https://weekend.levif.be/culinaire/restaurants/adresses/le-resto-de-la-semaine-partage-a-namur-ou-la-sharing-food-retrouve-ses-lettres-de-noblesse/' },
  { media: 'Le Fooding', date: 'Fiche du guide', titre: 'Restaurant Partage', url: 'https://lefooding.com/en/restaurants/partage' },
] as const;

/** Prix lisible : 8.5 → « 8,50 € » ; 16 → « 16 € » (espace insécable). */
export const euros = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')} €`;
