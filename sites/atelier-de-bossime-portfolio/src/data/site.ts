// Tout le contenu du site vit ici. Source : data/restaurants/atelier-de-bossime/dossier.md, donnees.json et photos/index.json
// (recherche du 31/10/2026). Règle « une donnée, un drapeau » : tout champ non prouvé porte son propre `placeholder: true`
// (ou un drapeau nommé) et une marque visible là où il s'affiche.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; photoPlaceholder?: boolean; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; url?: string; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }

export interface Restaurant {
  slug: string;
  nom: string;
  nomCourt: string;
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
  menus: Menu[];
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  valeurs: { titre: string; texte: string; placeholder: boolean }[];
}

const photo = (src: string, alt: string, largeur = 800, hauteur = 800): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

export const site: Restaurant = {
  slug: 'atelier-de-bossime',
  nom: "L'Atelier de Bossimé",
  nomCourt: 'Bossimé',
  baseline: 'Cuisine gastronomique issue du circuit court, servie dans l’ancien fenil de la ferme, à deux pas du potager.',
  description:
    "L'Atelier de Bossimé, ferme gastronomique à Loyers (Namur) : légumes du potager, circuit court, menus en Moments à composer ou en carte blanche. Étoile verte MICHELIN.",
  url: 'https://www.atelier-de-bossime.be',
  typeCuisine: 'Cuisine française moderne, cuisine bio, gastronomie durable',
  adresse: { rue: 'Rue Bossimé', numero: '2B', cp: '5101', commune: 'Loyers (Namur)', pays: 'BE' },
  geo: { lat: 50.4548436, lon: 4.9317527 },
  telephone: '+32 478 13 71 25',
  // Adresse issue de la base KYN (data/restaurants.json), non vue sur le site du restaurant : affichée, à confirmer au rapport.
  email: { valeur: 'info@bossime.be', placeholder: false },
  reservation: { outil: 'Zenchef', url: 'https://bookings.zenchef.com/results?rid=367643' },
  // Ouvertures : site du restaurant (midi lun-ven dès 12 h, soir lun-sam dès 19 h, dimanche fermé) ; fermetures : Guide MICHELIN.
  horaires: [
    { jour: 'lundi', creneaux: [{ ouverture: '12:00', fermeture: '16:00' }, { ouverture: '19:00', fermeture: '23:30' }] },
    { jour: 'mardi', creneaux: [{ ouverture: '12:00', fermeture: '16:00' }, { ouverture: '19:00', fermeture: '23:30' }] },
    { jour: 'mercredi', creneaux: [{ ouverture: '12:00', fermeture: '16:00' }, { ouverture: '19:00', fermeture: '23:30' }] },
    { jour: 'jeudi', creneaux: [{ ouverture: '12:00', fermeture: '16:00' }, { ouverture: '19:00', fermeture: '23:30' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '16:00' }, { ouverture: '19:00', fermeture: '23:30' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '19:00', fermeture: '23:30' }] },
    { jour: 'dimanche', creneaux: [], note: 'fermé' },
  ],
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/atelierdebossime/' }],
  carte: [
    {
      categorie: 'Le lunch, du lundi au vendredi midi',
      plats: [
        { nom: 'Lunch 2 services', description: 'à composer sur le livret ou en surprise', prix: '42 €', placeholder: false },
        { nom: 'Lunch 3 services', description: 'à composer sur le livret ou en surprise', prix: '52 €', placeholder: false },
        { nom: 'Verre de vin', description: 'option sans alcool : 10 €', prix: '12 €', placeholder: false },
        { nom: 'Chariot de fromages affinés belges', description: 'confits, fruits secs, pain maison', prix: '16 €', placeholder: false },
      ],
    },
    {
      categorie: 'Les Moments, à composer ou en carte blanche',
      plats: [
        { nom: 'Menu 3 Moments', description: 'au choix sur le livret ou carte blanche', prix: '68 €', placeholder: false },
        { nom: 'Menu 4 Moments', description: 'au choix sur le livret ou carte blanche', prix: '80 €', placeholder: false },
        { nom: 'Menu 5 Moments', description: 'au choix sur le livret ou carte blanche', prix: '92 €', placeholder: false },
        { nom: 'Menu 7 Moments', description: 'sur réservation, deux jours à l’avance', prix: '130 €', placeholder: false },
      ],
    },
    {
      categorie: 'Boissons',
      plats: [
        { nom: 'Apéritif au verre', description: '', prix: '16 €', placeholder: false },
        { nom: 'Vin au verre', description: '', prix: '12 €', placeholder: false },
        { nom: 'Bière artisanale', description: '', prix: '6 €', placeholder: false },
        { nom: 'Eau', description: 'volume à confirmer', prix: '12 €', placeholder: false },
        { nom: 'Café ou thé', description: '', prix: '4 €', placeholder: false },
        { nom: 'Carte des vins', description: 'bouteilles', prix: '44 à 160 €', placeholder: false },
      ],
    },
  ],
  menus: [
    { nom: 'Lunch 2 ou 3 services', prix: '42 € / 52 €', description: 'Du lundi au vendredi midi. Servi en une heure sur demande.', placeholder: false },
    { nom: 'Menus en Moments', prix: '68 à 130 €', description: '3, 4, 5 ou 7 Moments, le midi et le soir. Le 7 Moments se réserve deux jours à l’avance.', placeholder: false },
    {
      nom: 'Soirées de l’agenda gourmand',
      prix: '160 €',
      description:
        'La dernière en date : soirée NeZ ZeN (3e édition), jeudi 22 octobre 2026, avec la parfumerie namuroise NeZ ZeN. Trois mises en bouche, menu 4 services, accords mets et boissons avec ou sans alcool, tout compris.',
      placeholder: false,
    },
    { nom: 'Chèques-cadeaux', prix: 'montant libre', description: 'Proposés par la maison : modalités à demander au restaurant.', placeholder: true },
  ],
  histoire: [
    'En 2011, Ludovic Vanackere a vingt ans quand il ouvre Bossimé dans un coin de la ferme familiale, à Loyers : huit tables au départ, au milieu de l’exploitation.',
    'Le restaurant occupe l’ancien fenil, rénové en matériaux durables. La cuisine est ouverte sur la salle, et de grandes baies vitrées donnent sur les jardins.',
    'Au potager, environ 45 variétés de légumes poussent en bio, sur un sol vivant, à partir de semences anciennes. Le reste arrive en circuit court, de producteurs de la région.',
    'Autour du restaurant, le projet Bossimé a grandi : une centaine d’hectares, une quarantaine de personnes, une brasserie à La Confluence, à Namur, des plats en bocaux (L’Avenir, janvier 2024).',
  ],
  equipe: [
    { nom: 'Ludovic Vanackere', role: 'Chef et fondateur', photo: '/photos/portrait-chef.webp', photoPlaceholder: true, placeholder: false },
    { nom: 'La brigade', role: 'Cuisine ouverte sur la salle', photo: '/photos/duo-cuisine.webp', placeholder: false },
    { nom: 'La salle', role: 'Accueil et service sous la charpente', photo: '/photos/service-table-grenier.webp', placeholder: false },
    { nom: 'Le bar', role: 'Cocktails et boissons maison', photo: '/photos/bouteilles-etiquetees.webp', placeholder: false },
  ],
  avis: [
    { texte: 'Merveilleux endroit, on se laisse porter par un menu créatif et inattendu.', auteur: '@herverose06', source: 'Mapstr', url: 'https://mapstr.com/place/5gNqTSgPA9g', placeholder: false },
    { texte: 'Excellent ! Et j’adore la démarche intégrée avec les maraîchers.', auteur: '@fredcote', source: 'Mapstr', url: 'https://mapstr.com/place/5gNqTSgPA9g', placeholder: false },
    { texte: 'Gastro français. Top et cadre incroyable.', auteur: '@lolodef', source: 'Mapstr', url: 'https://mapstr.com/place/5gNqTSgPA9g', placeholder: false },
  ],
  photos: [
    photo('/photos/plat-veloute-vert.webp', 'Assiette vue du dessus : velouté vert, légumes en bâtonnet, quenelle brune et pot de sauce'),
    photo('/photos/plat-veloute-vert-560.webp', 'Assiette vue du dessus : velouté vert, légumes en bâtonnet, quenelle brune et pot de sauce', 560, 560),
    photo('/photos/ferme-batiment.webp', 'La ferme en briques et tuiles rouges, herbes hautes au premier plan'),
    photo('/photos/vitrine-salle-jardin.webp', 'La salle vue à travers la baie vitrée, reflets de verdure'),
    photo('/photos/salle-service-soir.webp', 'La salle au service du soir : briques, poutres et tables occupées'),
    photo('/photos/dressage-assiettes.webp', 'Dressage en brigade : une pince pose les derniers éléments sur une rangée d’assiettes'),
    photo('/photos/chef-cuisine-ouverte.webp', 'Un cuisinier au passe de la cuisine ouverte'),
    photo('/photos/portrait-chef.webp', 'Portrait d’un cuisinier en tablier Bossimé, lunettes, la salle en arrière-plan', 600, 600),
    photo('/photos/duo-cuisine.webp', 'Deux cuisiniers en tablier Bossimé devant la cuisine', 600, 600),
    photo('/photos/equipe-cuisine-trois.webp', 'Trois membres de l’équipe, souriants, dans la cuisine'),
    photo('/photos/service-table-grenier.webp', 'Un membre de l’équipe présente la carte à une table, sous la charpente de l’ancien fenil'),
    photo('/photos/bouteilles-etiquetees.webp', 'Étiquetage à la main de bouteilles de boisson maison rouge'),
    photo('/photos/plateau-plats.webp', 'Un serveur en tablier Bossimé porte un plateau de deux assiettes'),
    photo('/photos/table-brique.webp', 'Table dressée contre un mur de briques, deux chaises beiges'),
    photo('/photos/salle-chaises.webp', 'La salle vue de biais : chaises, mur de briques, plante sur une table'),
    photo('/photos/facade-nuit.webp', 'La façade vitrée du restaurant, de nuit, sur le bâtiment de briques'),
    photo('/photos/plat-tarte-champignons.webp', 'Tartelette aux champignons crus tranchés, jeunes pousses'),
    photo('/photos/plat-volaille-carottes.webp', 'Volaille et carottes, sauce versée dans une assiette creuse grise'),
    photo('/photos/dessert-chocolat.webp', 'Dessert à la tuile de chocolat, sauce chocolat versée'),
    photo('/photos/plat-concombre.webp', 'Concombre sauté, sésame et noisettes dans une assiette claire', 600, 600),
    photo('/photos/plat-tomate-borage.webp', 'Tomates et fleur de bourrache, jus vert versé à la bouteille', 641, 641),
    photo('/photos/plat-canard-pain.webp', 'Canard rosé, pain maison et crème en ramequin', 641, 641),
    photo('/photos/plat-poireau-galette.webp', 'Poireau grillé, herbes et galette brune', 641, 641),
    photo('/photos/plat-sauce-rouge.webp', 'Trois pièces sur une sauce rouge intense, vue du dessus', 641, 641),
    photo('/photos/cocktail-coupe.webp', 'Cocktail en coupe, mousse et éclaboussure'),
    photo('/photos/cocktail-sour.webp', 'Cocktail sour mousseux au zeste séché', 600, 600),
  ],
  valeurs: [
    { titre: 'Circuit court', texte: 'Le potager de la ferme et un réseau de producteurs de la région.', placeholder: false },
    { titre: 'Agriculture biologique', texte: 'Culture bio sur sol vivant, variétés anciennes.', placeholder: false },
    { titre: 'Zéro déchet', texte: 'Contenants réutilisables, rien ne se perd.', placeholder: false },
    { titre: 'Des métiers de qualité', texte: 'Former et faire grandir les talents de la maison.', placeholder: false },
  ],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Horaires lisibles : '12:00 à 16:00, 19:00 à 23:30' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

// ---------------------------------------------------------------------------------------------
// Données propres au gabarit « Verger ».
// ---------------------------------------------------------------------------------------------

export const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

// Calendrier INDICATIF d'un potager belge (savoir général, pas la liste des 45 variétés de Bossimé, inconnue) : `placeholder: true`,
// mention « calendrier indicatif » visible sous la roue. `mois` trié = présence ; `pic` = position de la vignette sur la roue.
export interface Ingredient { nom: string; pic: number; mois: number[]; placeholder: boolean }
export const ingredients: Ingredient[] = [
  { nom: 'Topinambour', pic: 1, mois: [1, 2, 12], placeholder: true },
  { nom: 'Chou kale', pic: 1, mois: [1, 2], placeholder: true },
  { nom: 'Poireau', pic: 2, mois: [1, 2, 11, 12], placeholder: true },
  { nom: 'Endive', pic: 2, mois: [1, 2], placeholder: true },
  { nom: 'Radis', pic: 3, mois: [3, 4], placeholder: true },
  { nom: 'Épinard', pic: 3, mois: [3, 4, 10], placeholder: true },
  { nom: 'Asperge', pic: 4, mois: [4, 5], placeholder: true },
  { nom: 'Rhubarbe', pic: 4, mois: [4, 5], placeholder: true },
  { nom: 'Petit pois', pic: 5, mois: [5, 6], placeholder: true },
  { nom: 'Fraise', pic: 5, mois: [5, 6], placeholder: true },
  { nom: 'Bourrache', pic: 6, mois: [6, 7, 8, 9], placeholder: true },
  { nom: 'Fève', pic: 6, mois: [6, 7], placeholder: true },
  { nom: 'Courgette', pic: 7, mois: [7, 8], placeholder: true },
  { nom: 'Tomate', pic: 7, mois: [7, 8, 9], placeholder: true },
  { nom: 'Haricot vert', pic: 8, mois: [8, 9], placeholder: true },
  { nom: 'Concombre', pic: 8, mois: [7, 8, 9], placeholder: true },
  { nom: 'Champignon', pic: 9, mois: [9, 10, 11], placeholder: true },
  { nom: 'Poire', pic: 9, mois: [9, 10], placeholder: true },
  { nom: 'Courge', pic: 10, mois: [10, 11], placeholder: true },
  { nom: 'Betterave', pic: 10, mois: [9, 10, 11], placeholder: true },
  { nom: 'Carotte', pic: 11, mois: [10, 11], placeholder: true },
  { nom: 'Céleri-rave', pic: 11, mois: [1, 11, 12], placeholder: true },
  { nom: 'Chou de Bruxelles', pic: 12, mois: [1, 12], placeholder: true },
  { nom: 'Panais', pic: 12, mois: [1, 2, 12], placeholder: true },
];

/** Autour de la roue : quatre assiettes RÉELLEMENT photographiées à Bossimé. Les noms des plats ne sont pas publiés (livret remis
 *  à table) : le libellé est une description de la photo (`nomDescriptif: true`, signalé sous la roue). Aucun rattachement à un
 *  mois n'est affiché (`liaisonPlaceholder: true`). */
export interface PlatDuMois { nom: string; service: string; ingredient: string; photo: string; placeholder: boolean; nomDescriptif: boolean; liaisonPlaceholder: boolean }
export const platsDuMois: PlatDuMois[] = [
  { nom: 'Tomates, bourrache et jus vert', service: 'Vu dans l’assiette', ingredient: 'Tomate', photo: '/photos/plat-tomate-borage.webp', placeholder: false, nomDescriptif: true, liaisonPlaceholder: true },
  { nom: 'Concombre sauté, sésame et noisettes', service: 'Vu dans l’assiette', ingredient: 'Concombre', photo: '/photos/plat-concombre.webp', placeholder: false, nomDescriptif: true, liaisonPlaceholder: true },
  { nom: 'Tartelette aux champignons crus', service: 'Vu dans l’assiette', ingredient: 'Champignon', photo: '/photos/plat-tarte-champignons.webp', placeholder: false, nomDescriptif: true, liaisonPlaceholder: true },
  { nom: 'Poireau grillé, herbes et galette', service: 'Vu dans l’assiette', ingredient: 'Poireau', photo: '/photos/plat-poireau-galette.webp', placeholder: false, nomDescriptif: true, liaisonPlaceholder: true },
];

/** Citations réelles : devises du site du restaurant et extraits d'avis Mapstr. */
export const citations = [
  { texte: 'L’exigence de la cuisine, la simplicité de la nature.', source: 'atelier-de-bossime.be', placeholder: false },
  { texte: 'Remettre la ferme au milieu du village.', source: 'la devise de la maison', placeholder: false },
  { texte: 'Dans l’ancienne ferme de Bossimé. Circuit très court.', source: 'avis Mapstr, @dahutmermaid', placeholder: false },
];

/** Distinctions : seules les preuves du dossier ; l'année Gault&Millau est incertaine (2017 ou 2018). */
export const distinctions = [
  { nom: 'Étoile verte MICHELIN', detail: 'gastronomie durable', placeholder: false },
  { nom: 'Gault&Millau', detail: 'jeune chef de l’année', annee: '2018', anneePlaceholder: true, placeholder: false },
  { nom: 'Prix namurois', detail: 'dont les Alfer', placeholder: false },
];

/** Le projet Bossimé en nombres (L'Avenir, 22/01/2024 ; site du restaurant). Un nombre non prouvé n'apparaît pas. */
export const chiffres = [
  { valeur: '2011', libelle: 'ouverture, par un chef de vingt ans', source: 'site du restaurant' },
  { valeur: '8', libelle: 'tables au départ, dans la ferme familiale', source: 'L’Avenir, 2024' },
  { valeur: '45', libelle: 'variétés de légumes au potager, environ', source: 'site du restaurant' },
  { valeur: '100', libelle: 'hectares pour le projet Bossimé, environ', source: 'L’Avenir, 2024' },
  { valeur: '40', libelle: 'personnes à l’année, environ', source: 'L’Avenir, 2024' },
  { valeur: '300', libelle: 'repas par jour avec la brasserie et les bocaux, environ', source: 'L’Avenir, 2024' },
];

/** Questions fréquentes : réponses prouvées par le dossier sauf drapeau. */
export interface Question { q: string; r: string; placeholder: boolean }
export const questions: Question[] = [
  { q: 'Menu surprise ou à composer ?', r: 'Les deux. Composez vos Moments sur le livret remis à table, ou laissez carte blanche à la cuisine, comme au premier jour.', placeholder: false },
  { q: 'Allergies et intolérances ?', r: 'Signalez-les lors de votre réservation : la cuisine s’adapte.', placeholder: false },
  { q: 'Déjeuner en une heure ?', r: 'Du lundi au vendredi midi, le lunch peut être servi en soixante minutes : demandez-le en arrivant.', placeholder: false },
  { q: 'Groupes et événements ?', r: 'Jusqu’à 60 personnes assises ou 120 en dînatoire debout. Dès dix personnes, la maison peut ouvrir en dehors des horaires.', placeholder: false },
  { q: 'Accès en fauteuil roulant ?', r: 'L’entrée se fait par un escalier de cinq marches : l’accès reste réduit jusqu’aux travaux prévus en 2027. Appelez-nous, nous chercherons une solution.', placeholder: false },
  { q: 'Les chiens sont-ils admis ?', r: 'Oui, les chiens sont acceptés.', placeholder: false },
  { q: 'Où se garer ?', r: 'Réponse à compléter par le restaurant (exemple : parking dans la cour de la ferme).', placeholder: true },
];

/** Quatre saisons : ingrédients du calendrier indicatif et une assiette RÉELLE photographiée à Bossimé, rangée dans la saison de son
 *  produit principal (`saisonPlaceholder: true` : la date de la photo est inconnue). Aucune carte de saison inventée. */
export interface Saison { nom: string; mois: number[]; photo: string; legende: string; saisonPlaceholder: boolean }
export const saisons: Saison[] = [
  { nom: 'Printemps', mois: [3, 4, 5], photo: '/photos/plat-veloute-vert.webp', legende: 'Velouté vert, légumes en bâtonnet', saisonPlaceholder: true },
  { nom: 'Été', mois: [6, 7, 8], photo: '/photos/plat-tomate-borage.webp', legende: 'Tomates, bourrache et jus vert', saisonPlaceholder: true },
  { nom: 'Automne', mois: [9, 10, 11], photo: '/photos/plat-tarte-champignons.webp', legende: 'Tartelette aux champignons crus', saisonPlaceholder: true },
  { nom: 'Hiver', mois: [12, 1, 2], photo: '/photos/plat-poireau-galette.webp', legende: 'Poireau grillé, herbes et galette', saisonPlaceholder: true },
];
