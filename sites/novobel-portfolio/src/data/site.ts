// Tout le contenu du site vit ici. Source : data/restaurants/novobel/{dossier.md,donnees.json,site-actuel/}.
// ATTENTION : Novobel n'est pas un restaurant mais une entreprise de construction et de rénovation (BCE 0726559494).
// Le gabarit « Ardoise » est donc détourné : l'ardoise devient le tableau de chantier (projets en lignes, services en étapes).
// Une donnée, un drapeau : `placeholder: true` marque ce qui n'est pas prouvé par le dossier et s'affiche « illustratif ».

export interface Projet { nom: string; description: string; logements: number; placeholder: boolean; apercu: string }
export interface Etape { n: string; titre: string; accroche: string; texte: string }
export interface Offre { titre: string; lieu: string; type: string }
export interface Photo { nom: string; alt: string; largeur: number; hauteur: number; largeurs: number[]; placeholder: boolean }

const photo = (nom: string, alt: string, largeur: number, hauteur: number, largeurs = [800, 1600], placeholder = true): Photo => ({ nom, alt, largeur, hauteur, largeurs, placeholder });

export const site = {
  slug: 'novobel',
  nom: 'Novobel',
  nomLignes: ['Novo', 'bel'] as [string, string],
  baseline: 'La qualité avant tout',
  metier: 'Construction & Rénovation',
  description: 'Novobel, entreprise de construction et de rénovation à Namur : conception, accompagnement, finitions et livraison de votre chantier, de l\'étude à la remise des clés.',
  url: 'https://www.novobel.com',
  adresse: { rue: 'Rue Emile Cuvelier', numero: '14 boîte 1', cp: '5000', commune: 'Namur', pays: 'BE' },
  telephone: '+32 488 466 413',
  email: 'info@novobel.com',
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100064109591379' }],
  devis: { delai: 'sous 24 h', gratuit: true }, // « Devis gratuit sous 24h ! » : affirmé par le site actuel
  introduction: [
    'Vous avez besoin de travaux de rénovation pour votre maison ou vos locaux ? Novobel accompagne ses clients dans la transformation et l\'embellissement de leurs espaces, du petit projet au chantier de grande envergure.',
    'Notre équipe garde une approche familiale et une vraie proximité avec ses clients : gestion complète du projet, de l\'étude initiale à la remise des clés, suivi rigoureux et coordination de chaque chantier.',
  ],
  valeurs: ['Approche familiale', 'Proximité client', 'Respect des délais'],
  etapes: [
    { n: '01', titre: 'Conception', accroche: 'Sur mesure pour vous', texte: 'Vous êtes propriétaire d\'un terrain ou d\'un bien à transformer : avec ses corps de métier spécialisés, Novobel vous aide à réaliser votre projet personnalisé. Nos experts vous expliquent toutes vos options et répondent à vos questions.' },
    { n: '02', titre: 'Accompagnement', accroche: 'Selon vos besoins', texte: 'Spécialisée dans la rénovation de fond en comble, Novobel prend en charge votre projet et concilie vos besoins et votre budget, avec une communication claire sur l\'état d\'avancement à chaque étape.' },
    { n: '03', titre: 'Finitions', accroche: 'La meilleure qualité', texte: 'Novobel se charge de l\'ensemble des finitions : nos différents corps de métier prennent le relais pour aménager le lieu qui vous ressemble, avec l\'expérience et les outils nécessaires.' },
    { n: '04', titre: 'Livraison', accroche: 'Délais respectés', texte: 'Un planning minutieux est transmis dès le début de la mission. Nous passons en revue l\'avancement de chaque poste et proposons des réunions régulières avec les architectes et tous les intervenants du chantier.' },
  ] as Etape[],
  metiers: ['Rénovation complète', 'Gros œuvre', 'Finitions', 'Installations techniques', 'Menuiserie', 'Peinture et tapisserie'],
  projets: [
    { nom: 'Astrid', description: 'Conversion d\'un espace de bureau en 4 appartements haut standing', logements: 4, placeholder: false, apercu: 'astrid' },
    { nom: 'Bellevue', description: 'Transformation d\'un immeuble de bureaux en 14 appartements de standing', logements: 14, placeholder: false, apercu: 'bellevue' },
    { nom: 'Joseph', description: 'Transformation d\'une maison unifamiliale et arrière-maison en 6 appartements avec cour intérieure', logements: 6, placeholder: false, apercu: 'joseph' },
    { nom: 'Citadelle', description: 'Rénovation d\'une maison de maître en 4 appartements', logements: 4, placeholder: false, apercu: 'citadelle' },
  ] as Projet[],
  offres: [
    { titre: 'Conducteur de chantier', lieu: 'Namur', type: 'Emploi' },
    { titre: 'Carreleur', lieu: 'Namur', type: 'Emploi' },
    { titre: 'Électricien', lieu: 'Namur', type: 'Emploi' },
    { titre: 'Plafonnage et cloisonnage', lieu: 'Namur', type: 'Emploi' },
    { titre: 'Stage architecte d\'intérieur', lieu: 'Namur', type: 'Stage' },
    { titre: 'Ouvrier polyvalent', lieu: 'Namur', type: 'Emploi' },
  ] as Offre[],
  gerance: { source: 'BCE', noms: ['Diamant Mata', 'Jetmira Mata', 'Besim Mata'], bce: '0726559494', forme: 'SRL' },
  photos: {
    mansarde: photo('mansarde', 'Un artisan peint le plafond d\'une mansarde claire, échelle et pots de peinture au sol', 1600, 1068),
    silhouettes: photo('silhouettes', 'Silhouettes d\'ouvriers autour d\'une benne à béton au coucher du soleil', 1600, 1067),
    grue: photo('grue', 'Ouvrier harnaché sur un ferraillage, chaînes de grue dans le ciel', 1600, 1067),
    mesure: photo('mesure', 'Deux ouvriers mesurent une dalle au mètre ruban', 1600, 1068),
    halle: photo('halle', 'Deux personnes en gilet dans un grand volume vide avant travaux', 1600, 1068),
    outils: photo('outils', 'Gants de travail, clés et outils glissés dans une ceinture de chantier', 1600, 1067),
    equipe: photo('equipe', 'Quatre personnes en gilet jaune traversent un plateau de bureaux en chantier', 1600, 900),
    cuisine: photo('cuisine', 'Cuisine noire avec îlot en marbre dans un appartement rénové, parquet', 736, 552, [800]),
    sejour: photo('sejour', 'Séjour rénové avec cuisine ouverte, table ronde et canapé', 1600, 900),
    salon: photo('salon', 'Grand séjour contemporain avec cuisine à îlot de marbre', 1600, 900),
    salleAManger: photo('salle-a-manger', 'Coin repas lumineux dans un appartement rénové, fenêtres hautes et miroir doré', 1600, 1066),
  },
} as const;

export const telHref = () => `tel:${site.telephone.replace(/\s/g, '')}`;
export const mailHref = () => `mailto:${site.email}`;
export const adresseLigne = () => `${site.adresse.rue} ${site.adresse.numero}, ${site.adresse.cp} ${site.adresse.commune}`;
export const totalLogements = () => site.projets.reduce((s, p) => s + p.logements, 0);
