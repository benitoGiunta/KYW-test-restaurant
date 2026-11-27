// Données réelles : data/restaurants/novobel/ (dossier.md, donnees.json, site-actuel/). Rien d'inventé ici.
export const societe = {
  nom: 'Novobel',
  descripteur: 'Construction et rénovation',
  baseline: 'La qualité avant tout',
  adresse: { rue: '14, Rue Emile Cuvelier', cp: '5000', ville: 'Namur', pays: 'Belgique' },
  tel: '+32 488 466 413',
  telHref: 'tel:+32488466413',
  email: 'info@novobel.com',
  facebook: 'https://www.facebook.com/profile.php?id=100064109591379',
  siteOrigine: 'https://www.novobel.com',
};

export const nav = [
  { href: '', label: 'Accueil', id: 'accueil' },
  { href: 'services/', label: 'Services', id: 'services' },
  { href: '#a-propos', label: 'À propos', id: 'apropos', home: true },
  { href: 'projects/', label: 'Projets', id: 'projects' },
  { href: 'jobs/', label: 'Carrière', id: 'jobs' },
];

export const metiers = [
  { titre: 'Rénovation complète', texte: 'Transformation d’immeubles, maisons et bureaux en logements modernes et performants.' },
  { titre: 'Gros œuvre et structure', texte: 'Maçonnerie, démolition, renforcement et mise aux normes des bâtiments.' },
  { titre: 'Finitions et aménagements', texte: 'Plafonnage, peinture, revêtements de sol, menuiseries et équipements sur mesure.' },
  { titre: 'Installations techniques', texte: 'Électricité, plomberie, chauffage et solutions énergétiques durables.' },
  { titre: 'Gestion de projet clé en main', texte: 'Coordination des travaux, respect des délais et accompagnement personnalisé.' },
];

export const etapes = [
  { titre: 'Conception', sous: 'Sur mesure pour vous', texte: 'De l’étude à la définition du projet : les corps de métier de Novobel exposent les options possibles et répondent aux questions avant le premier coup de pioche.' },
  { titre: 'Accompagnement', sous: 'Selon vos besoins', texte: 'Novobel prend en charge le projet de rénovation de fond en comble et concilie besoins et budget. Le client est tenu informé de l’avancement à chaque étape.' },
  { titre: 'Finitions', sous: 'La meilleure qualité', texte: 'Novobel assure l’ensemble des finitions avec ses propres corps de métier : plafonnage, peinture, sols et menuiseries.' },
  { titre: 'Livraison', sous: 'Délais respectés', texte: 'Novobel respecte les délais de chantier à l’aide d’un planning minutieux, transmis aux clients dès le début de la mission. Nous passons en revue l’état d’avancement de chaque poste et proposons des réunions régulières avec les architectes ainsi que tous les intervenants du chantier.' },
];

// Titres et descriptions repris mot pour mot du site d'origine ; le nombre de logements est lu dans la description.
export const projets = [
  { nom: 'Astrid', logements: 4, texte: 'Conversion d’un espace de bureau en 4 appartements haut standing' },
  { nom: 'Bellevue', logements: 14, texte: 'Transformation d’un immeuble de bureaux en 14 appartements de standing' },
  { nom: 'Joseph', logements: 6, texte: 'Transformation d’une maison unifamiliale et arrière-maison en 6 appartements avec cour intérieure' },
  { nom: 'Citadelle', logements: 4, texte: 'Rénovation d’une maison de maître en 4 appartements' },
];

export const offres = [
  { poste: 'Conducteur de chantier', lieu: 'Namur, Belgique' },
  { poste: 'Carreleur', lieu: 'Namur, Belgique' },
  { poste: 'Électricien', lieu: 'Namur, Belgique' },
  { poste: 'Plafonnage et cloisonnage', lieu: 'Namur, Belgique' },
  { poste: 'Stage d’architecte d’intérieur', lieu: 'Namur, Belgique' },
  { poste: 'Ouvrier polyvalent', lieu: 'Namur, Belgique' },
];

// Photos du site d'origine (probablement de stock, sauf indication) : à remplacer par des photos de chantiers Novobel.
export const photos = {
  combles: { src: 'photos/combles.webp', w: 1800, h: 1202, alt: 'Un ouvrier prend des mesures sous un velux dans des combles blancs en cours de rénovation, échelle en bois à côté', alt_a_remplacer: 'Un chantier Novobel de finition, combles ou plafonds' },
  halle: { src: 'photos/halle.webp', w: 1800, h: 1202, alt: 'Deux personnes en gilets orange regardent un grand plateau vide' },
  cuisine: { src: 'photos/cuisine.webp', w: 736, h: 552, alt: 'Cuisine noire avec îlot en marbre, parquet clair, dans un appartement rénové' },
  mesure: { src: 'photos/mesure.webp', w: 1800, h: 1202, alt: 'Deux ouvriers accroupis mesurent une dalle de béton sur un chantier' },
  visite: { src: 'photos/visite-chantier.webp', w: 1800, h: 1013, alt: 'Quatre personnes en gilets jaunes traversent un plateau de bureaux en chantier' },
  outils: { src: 'photos/outils.webp', w: 1800, h: 1200, alt: 'Gant de travail et clés à molette dans une ceinture à outils en cuir' },
};
