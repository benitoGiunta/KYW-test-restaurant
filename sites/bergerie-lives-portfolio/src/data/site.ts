// Tout le contenu du site vit ici. Source : data/restaurants/bergerie-lives/dossier.md, donnees.json et site-actuel/ (27/11/2026).
// La Bergerie de Lives n'est PAS un restaurant : maison d'hôtes, domaine de mariage, séminaires (hypothèse du dossier).
// Une donnée, un drapeau : `placeholder: true` ne vaut que pour le champ qu'il accompagne ; tout ce que le dossier ne prouve
// pas est marqué « illustratif » ou absent (null).

export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
/** Chiffre monumental d'un chapitre : seulement des nombres prouvés par le dossier (preuve citée). */
export interface Chiffre { valeur: number; libelle: string; sousLibelle?: string; preuve: string; placeholder: false }
export interface Offre { nom: string; texte: string; textePlaceholder: boolean; photo: string }
export interface Service { nom: string; texte: string }
export interface Presse { media: string; titre: string; date: string; url: string }
export interface Activite { nom: string; texte: string }

export interface Domaine {
  slug: string;
  nom: string;
  sigle: string;
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  adresse: { rue: string; numero: string; cp: string; commune: string; localite: string; pays: string };
  telephone: string; // format international
  email: string; // prouvé par le site actuel
  reservation: { outil: string; url: string; note: string };
  reseaux: Reseau[];
  histoire: string[];
  photos: Photo[];
  chiffres: { weekend: Chiffre; bienEtre: Chiffre; piscine: Chiffre; visite: Chiffre; depuis: Chiffre };
  services: Service[];
  chambres: { intro: string; points: string[]; tarifNote: string; nombreNote: string };
  mariage: { intro: string; etapes: Service[]; brochureNote: string; capaciteNote: string };
  offres: Offre[]; // onglets de l'accueil : mariage, séminaire, événements privés
  seminaire: { intro: string; points: string[] };
  activites: Activite[];
  presse: Presse[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });

export const site: Domaine = {
  slug: 'bergerie-lives',
  nom: 'La Bergerie de Lives',
  sigle: 'BL',
  baseline: "Maison d'hôtes, salle de mariage et séminaires, au bord de la Meuse, à Namur.",
  description:
    "La Bergerie de Lives, à Namur : chambres d'hôtes avec piscine, sauna et jacuzzi, domaine privatisé le temps d'un weekend de mariage, salles de séminaire.",
  url: 'https://www.bergerielives.be',
  adresse: { rue: 'Rue de Mosanville', numero: '100', cp: '5101', commune: 'Namur', localite: 'Lives-sur-Meuse', pays: 'BE' },
  telephone: '+32 493 86 10 29',
  email: 'labergeriedelives@gmail.com',
  reservation: {
    outil: 'bouton Réserver du site actuel',
    url: 'https://www.bergerielives.be/reservations',
    note: 'Pour un mariage, une visite de 30 minutes se programme sur place avec les propriétaires.',
  },
  reseaux: [],
  histoire: [
    "Depuis 2017, les propriétaires accueillent au Domaine de la Bergerie des hôtes de passage et des mariages. Leur idée tient en peu de mots : vous recevoir chez eux.",
    "La presse locale a suivi la maison : La DH évoquait en 2013 l'ancien restaurant du lieu, L'Avenir présentait en 2017 les nouveaux propriétaires. Aujourd'hui, la Bergerie reçoit des hôtes en chambres, des cérémonies et des séminaires.",
  ],
  photos: [
    photo('/photos/facade.webp', "Façade en pierre du domaine, bâtiments à toits d'ardoise et grand arbre, allée gravillonnée au premier plan", 1800, 1200),
    photo('/photos/facade-960.webp', 'Façade en pierre du domaine et son arbre, vue resserrée pour mobile', 960, 640),
    photo('/photos/cour.webp', "Cour du domaine par temps clair : allée, lampadaire, bâtiments en pierre", 886, 591),
    photo('/photos/veranda-tables.webp', 'Véranda vitrée dressée pour un mariage : tables rondes, chaises blanches, bouquet rose et blanc', 1800, 1234),
    photo('/photos/veranda-table-dressee.webp', 'Table de mariage dressée sous la véranda, verres, assiettes et composition florale', 1600, 1185),
    photo('/photos/veranda-salon.webp', 'Véranda en salon : fauteuils blancs, plantes et verrière', 1024, 768),
    photo('/photos/veranda-cocktail.webp', 'Véranda aménagée pour un cocktail : mange-debout noirs et verrière', 1024, 768),
    photo('/photos/ceremonie-jardin.webp', "Cérémonie laïque dans le jardin : arche fleurie, tonneau et bancs sous les arbres", 1800, 1192),
    photo('/photos/ceremonie-assemblee.webp', "Cérémonie dans le jardin devant un cercle de fleurs, invités assis sous les arbres", 1600, 1188),
    photo('/photos/sortie-ceremonie.webp', 'Sortie de cérémonie : les mariés avancent entre les invités qui applaudissent', 1600, 1147),
    photo('/photos/jardin-bancs.webp', 'Jardin ombragé et rangées de bancs prêtes pour une cérémonie', 1600, 1067),
    photo('/photos/tonneau-fleurs.webp', "Tonneau et arche de fleurs dans le jardin, tables dressées au premier plan", 1080, 1080),
    photo('/photos/piscine.webp', "Personne qui plonge dans une piscine d'eau turquoise, vue sous l'eau", 1800, 1003),
    photo('/photos/bassin.webp', 'Bassin du jardin bordé de bambous et de nénuphars', 1200, 1800),
    photo('/photos/tonnelle.webp', "Tonnelle aux feuilles d'automne, allée couverte", 960, 640),
    photo('/photos/chambre.webp', 'Chambre boisée avec grand lit, rideaux jaunes et fenêtre cintrée', 960, 640),
    photo('/photos/table-fleurs.webp', 'Table dressée, verres et vases de roses sur une cheminée en pierre', 1600, 1067),
    photo('/photos/plan-de-table.webp', "Plan de table accroché à une roue de vélo, cartes en kraft", 1200, 1866),
    photo('/photos/buffet.webp', 'Buffet de petits fours sur une table nappée de blanc', 1024, 768),
    photo('/photos/roses.webp', 'Vases de roses roses sur une table de la véranda', 1200, 2170),
    photo('/photos/nb-chaises.webp', "Dossiers de chaises en toile de jute brodés « Mr » et « Mrs », en noir et blanc", 1400, 933),
    photo('/photos/nb-couple.webp', 'Couple de mariés enlacé sous une tonnelle de serre, en noir et blanc', 1400, 933),
    photo('/photos/nb-noeud.webp', "Détail d'un costume : nœud papillon fleuri et boutonnière, en noir et blanc", 1200, 1033),
    photo('/photos/nb-arche.webp', "Deux mariées lisant leurs vœux devant une arche fleurie, en noir et blanc", 1000, 1500),
    photo('/photos/nb-saxo.webp', 'Saxophoniste jouant dans le jardin, en noir et blanc', 1000, 1876),
  ],
  chiffres: {
    weekend: { valeur: 1, libelle: 'Un weekend complet', sousLibelle: 'Le domaine, rien que pour vous', preuve: 'Site actuel, page Mariage et location : « privatiser le domaine le temps d\'un weekend ».', placeholder: false },
    bienEtre: { valeur: 3, libelle: 'Trois espaces de détente', sousLibelle: 'Piscine, sauna et jacuzzi', preuve: 'Site actuel : toutes les chambres donnent accès à la piscine, au sauna et au jacuzzi.', placeholder: false },
    piscine: { valeur: 20, libelle: 'Euros la journée piscine', sousLibelle: 'Par personne, sur réservation', preuve: 'Site actuel : « Journée piscine 20 €/pp » ; réservation au 0493 86 10 29.', placeholder: false },
    visite: { valeur: 30, libelle: 'Minutes de visite', sousLibelle: 'Pour découvrir le domaine avant de vous décider', preuve: 'Site actuel, page Mariage et location : visite de 30 min.', placeholder: false },
    depuis: { valeur: 2017, libelle: 'Chez nous depuis', sousLibelle: 'Chambres d\'hôtes et mariages au bord de la Meuse', preuve: 'Site actuel : « Depuis 2017, nous vous recevons chez nous ».', placeholder: false },
  },
  services: [
    { nom: 'Petit déjeuner bio', texte: 'Un petit déjeuner varié et bio, servi en chambre ou en salle.' },
    { nom: 'Piscine extérieure chauffée', texte: "Ouverte aux hôtes d'avril à octobre." },
    { nom: 'Sauna et jacuzzi', texte: 'Accessibles depuis toutes les chambres, dans le domaine.' },
    { nom: 'Cuisine partagée', texte: 'Une cuisine à la disposition des hôtes.' },
    { nom: 'Wifi gratuit', texte: 'Dans toutes les chambres.' },
  ],
  chambres: {
    intro: "Des chambres d'hôtes dans le domaine, à Lives-sur-Meuse, avec petit déjeuner bio.",
    points: [
      'Petit déjeuner varié et bio, en chambre ou en salle',
      'Piscine extérieure chauffée d\'avril à octobre, sauna et jacuzzi',
      'Cuisine partagée et wifi gratuit',
      'Journée piscine à 20 € par personne, sur réservation',
    ],
    tarifNote: 'Tarifs et disponibilités sur demande, par téléphone ou par e-mail.',
    nombreNote: 'Pour le nombre de chambres, contactez la maison.',
  },
  mariage: {
    intro: "Depuis 2017, la Bergerie reçoit des mariages. Parce que ce moment passe trop vite, les propriétaires privatisent le domaine pour un weekend complet.",
    etapes: [
      { nom: 'La cérémonie au jardin', texte: 'Arche fleurie, bancs sous les arbres, cérémonie laïque : le jardin se prête à la cérémonie en plein air.' },
      { nom: 'La véranda', texte: 'Une véranda vitrée pour dresser les tables, servir le cocktail ou installer un salon.' },
      { nom: 'Le weekend', texte: 'Le domaine est privatisé pour vous le temps d\'un weekend complet, plutôt que d\'une seule journée.' },
      { nom: 'La visite', texte: 'Une visite de 30 minutes se programme avec les propriétaires pour découvrir les lieux et poser vos questions.' },
    ],
    brochureNote: 'La brochure Mariage (PDF explicatif et tarifaire) et le calendrier se trouvent sur le site actuel de la maison.',
    capaciteNote: 'Pour la capacité de la salle, contactez la maison.',
  },
  offres: [
    { nom: 'Mariage', texte: "Le domaine entier pendant un weekend : cérémonie au jardin, repas sous la véranda, nuit sur place. Une brochure explicative et tarifaire est disponible auprès de la maison.", textePlaceholder: false, photo: '/photos/ceremonie-jardin.webp' },
    { nom: 'Séminaire', texte: 'Plusieurs salles et plusieurs formules selon vos besoins, dans un cadre calme au bord de la Meuse.', textePlaceholder: false, photo: '/photos/veranda-salon.webp' },
    { nom: 'Événement privé', texte: "Anniversaire, fête de famille, réception : la maison accueille aussi vos autres événements privés. Formule et tarif à construire avec les propriétaires.", textePlaceholder: true, photo: '/photos/buffet.webp' },
  ],
  seminaire: {
    intro: "Plusieurs salles, dont une véranda vitrée sur le jardin, et plusieurs formules selon vos besoins.",
    points: [
      'Une véranda vitrée sur le jardin et plusieurs autres salles',
      'Plusieurs formules selon vos besoins',
      'Chambres d\'hôtes au domaine',
      'Piscine, sauna et jacuzzi pour la pause',
    ],
  },
  activites: [
    { nom: 'La Citadelle de Namur', texte: "La plus belle citadelle d'Europe, selon le site de la maison." },
    { nom: 'Les musées', texte: 'Musée Félicien Rops et Musée Trema.' },
    { nom: 'Le marché du samedi', texte: 'Marché à Namur le samedi.' },
    { nom: 'Les caves à vin', texte: 'Caves à vins dans les souterrains de Namur.' },
    { nom: 'Loisirs et brocantes', texte: 'Balades, loisirs et brocantes des environs.' },
  ],
  presse: [
    { media: "L'Avenir", titre: 'Lisa et Christophe, nouveaux propriétaires de la Bergerie', date: '2017-06-14', url: 'https://www.lavenir.net/regions/namur/2017/06/14/lisa-et-christophe-nouveaux-proprietaires-de-la-bergerie-J2KMG2A3YZCEZJIUEVGEMD3Z5M/' },
    { media: 'La DH', titre: 'La Bergerie est toujours ouverte', date: '2013-04-19', url: 'https://www.dhnet.be/archives-journal/2013/04/19/la-bergerie-est-toujours-ouverte-QNBW7GRN2FFEBHRITAXQNABWQY/' },
  ],
};

export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Domaine = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune} (${r.adresse.localite})`;

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Domaine = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
