// Tout le contenu du site vit ici. Source : data/restaurants/grill-des-amis/donnees.json, dossier.md et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// le gabarit les affiche, la revue les signale, le client les remplace.
//
// Hypothèses (toutes marquées placeholder) : e-mail de contact ; trois avis clients (le site actuel n'affiche que du texte
// d'exemple Wix) ; températures de cuisson du chapitre « cuisson » ; identité des deux personnes de la photo des patrons ;
// formule de privatisation (inconnue). Horaires du mardi, mercredi et dimanche : fermés (déduit, à confirmer).
// Aucun réseau social, aucune récompense, aucune note tierce : rien n'est affiché faute de source vérifiable.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; photo?: string }
export interface Categorie { categorie: string; plats: Plat[]; service?: 'entrees' | 'feu' | 'boissons'; note?: string }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean; phrase?: string }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
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
  valeurs: string[];
  manifeste: { avant: string; motCle: string; apres: string };
  cuisson: { plat: string; intro: string; couches: Couche[] };
  traiteur: { intro: string; formules: { nom: string; texte: string; placeholder: boolean }[] };
  colophon: string[];
}


const photo = (src: string, alt: string, largeur: number, hauteur: number, legende?: string, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder, legende });
const eur = (s: string | null) => (s ? s.replace(/(\d)€/, '$1 €') : null);
const p = (nom: string, prix: string | null, description = ''): Plat => ({ nom, description, prix: eur(prix), placeholder: false });
const cat = (categorie: string, service: Categorie['service'], plats: Plat[], note?: string): Categorie => ({ categorie, service, plats, note });

export const site: Restaurant = {
  slug: 'grill-des-amis',
  nom: 'Le Grill des amiS',
  baseline: 'Le spécialiste viandes, maturation et grillades à Namur.',
  description:
    'Le Grill des amiS, restaurant de viandes à Namur : grosses pièces découpées et maturées sur place, grillades au feu de bois, sauces et frites maison.',
  url: 'https://www.legrilldesamis.be',
  typeCuisine: 'Grillades, viandes maturées',
  adresse: { rue: 'Rue Saint-Joseph', numero: '10', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4662832, lon: 4.8644955 },
  telephone: '+32 81 61 72 60',
  email: { valeur: 'contact@legrilldesamis.be', placeholder: true },
  reservation: { outil: 'le site du restaurant', url: 'https://www.legrilldesamis.be/reserver' },
  horaires: [
    { jour: 'lundi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '21:30' }] },
    { jour: 'mardi', creneaux: [], note: 'fermé' },
    { jour: 'mercredi', creneaux: [], note: 'fermé' },
    { jour: 'jeudi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '21:30' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '21:30' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '21:30' }] },
    { jour: 'dimanche', creneaux: [], note: 'fermé' },
  ],
  reseaux: [],
  carte: [
    cat('Les entrées', 'entrees', [
      p('Croquettes aux 3 fromages maison', '18€'), p('Croquettes aux crevettes maison', '20€'), p('Mix de croquettes', '19€'),
      p('Scampi Black Tiger', '18€', 'À la crème d’ail, au Pastis ou sucré-salé'), p('Tataki de hampe de bœuf', '18€', 'Wakamé et huile thaï'),
      p('Gambas sautées', '19€', 'Lait de coco et curry rouge'), p('Carpaccio de bœuf salé et fumé par nos soins', '18€', 'Mayo de parmesan'),
      p('Foie gras de canard poêlé', '20€', 'Lit de pomme Granny à la vanille et jus réduit'),
    ]),
    cat('À partager, en entrée', 'entrees', [
      p('L’assiette de charcuteries', '25€/2 pers.', 'Produits locaux'),
      p('L’Assiette du Chef', '38€/2 pers.', 'Croquette du moment, tataki de hampe de bœuf et gambas sautées'),
    ]),
    cat('Les plats', 'feu', [
      p('Souris d’agneau cuite basse température', '30€', 'Jus au Corbière et romarin'), p('Escalope de porc Duroc panée', '21€', 'Sauce au choix'),
      p('Ribs mariné et cuit basse température', '25€', 'Sauce barbecue'), p('Solettes meunières', '30€'),
    ]),
    cat('Les grillades au feu de bois', 'feu', [
      p('Le Steak Premium Black Angus', '28€'), p('L’Onglet de bœuf', '30€', 'Servi bleu ou saignant'), p('La Brochette de bœuf Black Angus', '31€'),
      p('La Hampe de bœuf', '27€', 'Le morceau du boucher, longue bande de viande plate aux fibres longues'), p('Le Contrefilet Sélection', '28€'),
      p('L’Entrecôte du moment', '32€', 'Suivant l’arrivage de Rungis'), p('L’Entrecôte du moment aux petits gris', '38€', 'Petits gris, ail, persil, beurre'),
      p('L’Entrecôte du moment Terre et Mer', '40€', 'Scampi, ail, persil, beurre'), p('Brochettes d’agneau des Pyrénées', '34€'),
      p('La Côte de porc Duroc d’Olive maturée 14 jours', '30€'), p('Pluma de porc ibérique', '35€'), p('La trilogie du Chef, 400 g', '40€', 'Hampe, agneau, porc'),
      p('Le Surf and Turf', '32€', 'Volaille cuite basse température et gambas, jus de carcasse'), p('Le Menu Viandard', '69€', 'Cinq viandes choisies par le chef, voir plus bas'),
    ], 'Carte du 14 octobre 2026.'),
    cat('À partager, en grillade', 'feu', [
      p('Le Châteaubriand', '32€/pers.', 'Sélection Rungis, à partir de 2 personnes'),
      p('L’Assiette Découverte', '85€ pour 2 pers.', 'Une entrecôte Prestige et une entrecôte maturée'),
      p('L’Assiette des Amis, 1 kg', '110€', 'Une entrecôte premium, une entrecôte maturée, une hampe, un porc ibérique'),
    ]),
    cat('Les sauces maison et suppléments', 'feu', [
      p('Sauce champignons', '3,5€'), p('Sauce poivre concassé', '3,5€'), p('Sauce miel-moutarde', '3,5€'), p('Sauce truffe', '3,5€'), p('Sauce roquefort', '3,5€'),
      p('Béarnaise', '5€'), p('Supplément légumes chauds', '2€'), p('Supplément féculent', '2€'), p('Beurre maître d’hôtel maison', '2€'), p('Mayonnaise maison', '2€'),
    ], 'Les sauces sont préparées sur place, les frites et les croquettes sont maison.'),
    cat('Les bambins', 'feu', [p('Steak Premium', '14€'), p('Brochette d’agneau', '14€'), p('Escalope, sauce au choix', '14€'), p('Braisade de volaille', '14€')]),
    cat('Apéros', 'boissons', [
      p('Apéritif maison', '10€', 'Rhum blanc, fraise, citron vert'), p('Coupe de bulles, sélection maison', '10€'), p('Kir', '6€'), p('Kir Royal', '11€'),
      p('Martini blanc ou rouge', '6€'), p('Porto rouge', '6€'), p('Apérol Spritz', '10€'), p('Picon vin blanc', '10€', 'La recette de Gaëtan'),
      p('Le Dgin’ A Co Soif', '9€', 'Gin maison, citron vert et main de Bouddha ; bouteille à emporter, 50 €'), p('Le Gin du mois', '10€'),
    ]),
    cat('Cocktails', 'boissons', [
      p('Le Bisou « selon mon ami Max »', '12€', 'Ricard et Jet 27'), p('Le Pornstar Martini', '12€', 'Vodka, fruit de la passion, citron vert, vanille'),
      p('Le Negroni', '12€', 'Gin, Campari, vermouth rouge, fraise'), p('Le Cosmopolitan', '12€', 'Vodka, liqueur d’orange, cranberry'),
      p('La Margarita', '12€', 'Tequila, liqueur d’orange, citron vert'), p('Cocktails sans alcool', '10€', 'Apérol Spritz, Pisang Orange, Pornstar Martini ou Amaretto Sunrise'),
    ]),
    cat('Softs et bières', 'boissons', [
      p('Chaudfontaine plate ou pétillante, 50 cl', '5€'), p('Coca, Coca Zéro, Fanta, Sprite, Fuze Tea, Tonic, jus', '3,20€'), p('Lupulus au fût', '3€'),
      p('La Houppe, La Jambes en l’air, L’Aubel Pomme-Cerise', '6€'), p('La Canaille, L’Aubel Pure-IPA, Orval, Westmalle triple, Lefort triple, Karmeliet triple', '6,50€'),
      p('Bertinchamps triple, 50 cl', '8€'), p('Bières 0 %', '6€', 'Bertinchamps, Bertinchamps Passion, Karmeliet'),
    ]),
  ],
  menus: [
    { nom: 'Le Menu Viandard', prix: '69 € par personne', description: 'Dégustation de cinq viandes choisies par le chef, en trois services, féculents et sauces en accompagnement. À partir de deux personnes, pour la table entière ; dernière commande à 13 h 15 et à 20 h.', placeholder: false },
    { nom: 'Le lunch', prix: '15,50 €', description: 'Braisade de volaille, légumes chauds et frites, ou escalope de porc Duroc panée, sauce au choix (champignons, poivre concassé, truffe, roquefort, miel-moutarde) et frites.', placeholder: false },
    { nom: 'Le steak du midi', prix: '17 €', description: 'Un steak d’environ 250 g au déjeuner, d’après la carte du 14 octobre 2026.', placeholder: false },
  ],
  histoire: [
    'Le Grill des amiS est la maison d’Elise et de Gaëtan, rue Saint-Joseph, à Namur. Leur devise tient en une ligne : cuisine et grillades pour le plaisir de nos clients, nos amis.',
    'Gaëtan, le chef, choisit les viandes, les découpe et écrit la carte. Ici, on achète de grosses pièces brutes auprès de fournisseurs sélectionnés : la découpe se fait sur place, la maturation dans les deux chambres du restaurant.',
    'Le feu fait le reste. Les grillades cuisent au bois : entrecôte du moment selon l’arrivage de Rungis, hampe, onglet, côte de porc Duroc d’Olive maturée quatorze jours, pluma de porc ibérique.',
    'À côté de la viande, une cuisine faite sur place : sauces préparées sur place, frites et croquettes maison, poissons et volailles, suggestions renouvelées chaque semaine. Passionné de vin, Gaëtan soigne aussi les accords mets et vins.',
  ],
  equipe: [
    { nom: 'Gaëtan', role: 'Chef : viandes, découpe, carte et vins', placeholder: false, phrase: 'La cuisine est un art, l’art est science et la science est patience.' },
    { nom: 'Elise', role: 'La maison d’Elise et Gaëtan', placeholder: true, phrase: 'Signataire de la devise du restaurant.' },
  ],
  avis: [
    { texte: 'Une viande tendre, une cuisson juste et des frites maison comme on les aime. On y retourne entre amis.', auteur: 'Marc L.', source: 'avis illustratif', date: '2026-09-12', note: 5, placeholder: true },
    { texte: 'La découpe se fait sous vos yeux, les sauces sont faites maison et l’accueil est simple et chaleureux.', auteur: 'Sophie D.', source: 'avis illustratif', date: '2026-08-03', note: 5, placeholder: true },
    { texte: 'Le Menu Viandard à quatre : cinq viandes, trois services, et on a tout goûté. Le feu de bois, ça se sent.', auteur: 'Julien P.', source: 'avis illustratif', date: '2026-10-05', note: 5, placeholder: true },
  ],
  photos: [
    photo('/photos/grill-flammes.webp', 'Une pince retourne une pièce de viande sur le grill, les flammes au premier plan', 1800, 1200, 'Le grill, au feu de bois'),
    photo('/photos/plat-entrecote.webp', 'Entrecôte grillée, sauce au poivre dans sa casserole en cuivre, purée et légumes sur plat vert', 1800, 1518, 'L’entrecôte du moment'),
    photo('/photos/plat-viande-vin.webp', 'Une pièce de viande grillée dressée à côté d’un verre de vin rouge', 1200, 1800),
    photo('/photos/salle-comptoir.webp', 'La salle vue depuis le comptoir, tables dressées et lumière chaude', 1800, 1200, 'La salle, vue du comptoir'),
    photo('/photos/salle-buches.webp', 'Un mur de bûches empilées dans la salle du restaurant', 1200, 1800, 'Le mur de bûches'),
    photo('/photos/terrasse.webp', 'La terrasse du restaurant, chaises disposées autour des tables', 1800, 1198, 'La terrasse'),
    photo('/photos/table-verres.webp', 'Verres de vin rouge posés sur une table dressée', 1198, 1800),
    photo('/photos/decoupe-cote.webp', 'Une côte de bœuf à l’os découpée sur la planche', 1800, 1200, 'La côte, découpée sur place'),
    photo('/photos/viande-tranchee.webp', 'Tranches de viande rosée posées sur un plat avec de la purée de patate douce', 1800, 1200, 'La viande tranchée'),
    photo('/photos/decoupe-pince.webp', 'Une pince tient une pièce de viande pendant la découpe, gros plan', 1800, 1200),
    photo('/photos/braise-feu.webp', 'La braise rougeoyante du feu de bois', 1200, 1800, 'La braise'),
    photo('/photos/chambre-maturation.webp', 'Pièces de viande suspendues dans la chambre de maturation du restaurant', 1080, 1350, 'Une des deux chambres de maturation'),
    photo('/photos/cocktail-pornstar.webp', 'Un Pornstar Martini servi avec sa demi-passion', 1800, 1200),
    photo('/photos/verres-lumiere.webp', 'Verres alignés sous une lumière chaude', 1800, 1198),
    photo('/photos/patrons-tabliers.webp', 'Deux personnes en tablier devant le mur d’ardoise de la salle', 1200, 1800, 'Le restaurant, Namur', true),
    photo('/photos/table-plantes.webp', 'Une table dressée près des plantes, verre en premier plan', 1198, 1800),
    photo('/photos/cocktails-trois.webp', 'Trois cocktails alignés sur le comptoir', 1080, 1350, 'Trois cocktails avant le service'),
  ],
  valeurs: ['Découpe et maturation sur place', 'Grillades au feu de bois', 'Sauces préparées sur place', 'Frites et croquettes maison', 'Suggestions renouvelées chaque semaine'],
  manifeste: {
    avant: 'De grosses pièces achetées brutes, découpées et maturées sur place, puis cuites au feu de bois. Des sauces préparées sur place, des frites maison, et une devise : cuisine et grillades pour le plaisir de nos clients,',
    motCle: 'nos amis.',
    apres: '',
  },
  cuisson: {
    plat: 'L’entrecôte du moment',
    intro: 'Le plat signature, couche par couche. Étapes et températures illustratives.',
    couches: [
      { id: 'piece', nom: 'L’entrecôte', detail: 'Maturée, saisie au feu de bois', temp: 420, src: '/couches/piece.webp', placeholder: true },
      { id: 'garniture', nom: 'Purée et légumes', detail: 'Chauds, juste poêlés', temp: 300, src: '/couches/garniture.webp', placeholder: true },
      { id: 'sauce', nom: 'La sauce maison', detail: 'Poivre, champignons ou truffe', temp: 180, src: '/couches/sauce.webp', placeholder: true },
    ],
  },
  traiteur: {
    intro: 'Le feu de bois ne reste pas toujours à Namur : le Grill des amiS prépare aussi vos repas de groupe et livre ses barbecues chez vous.',
    formules: [
      { nom: 'Menus sur mesure', texte: 'Un menu en trois services avec buffets barbecue premium, écrit avec vous selon l’occasion et le nombre de convives.', placeholder: false },
      { nom: 'Barbecues livrés', texte: 'Le service clé en main : les grillades sont livrées chez vous.', placeholder: false },
      { nom: 'Privatiser la salle', texte: 'Pour un anniversaire ou un repas d’équipe, la salle peut s’envisager en groupe : conditions et nombre de couverts à confirmer par téléphone.', placeholder: true },
    ],
  },
  colophon: [
    'Photos : Le Grill des amiS (site du restaurant), droits à confirmer avant mise en ligne.',
    'Caractères : Melodrama (Fontshare) et Literata (Google Fonts).',
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

/** '19:00' → '19 h', '19:30' → '19 h 30'. */
export const heure = (s: string) => s.replace(/^0/, '').replace(/:00$/, ' h').replace(':', ' h ');
/** Horaires lisibles : '12 h à 14 h, 19 h à 21 h' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${heure(c.ouverture)} à ${heure(c.fermeture)}`).join(', ') : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

/** Libellé de chapitre du thermomètre selon la température. */
export const chapitreDe = (t: number) => (t >= 400 ? 'cuisson' : t >= 200 ? 'dressage' : t >= 60 ? 'table' : 'nuit');
