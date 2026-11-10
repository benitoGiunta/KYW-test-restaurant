// Tout le contenu du site vit ici. Source : data/restaurants/<slug>/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string; libelle?: string } // creneaux vide = fermé ; libelle = texte affiché (remplace les heures)
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; /* '' = pas de prix affiché */ description: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean; rolePlaceholder?: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export type Famille = 'blanc' | 'rouge' | 'orange' | 'bulles';
export interface Vin { nom: string; ingredients: string; prix: string; famille: Famille; placeholder: boolean }
export interface Regle { texte: string; placeholder: boolean }
export interface Soiree { nom: string; description: string; quand: string; placeholder: boolean }
export interface Mosaique { src: string; placeholder: boolean }

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
  // Nocturne (la « lampe » devient la bougie)
  accroche: { titre: [string, string]; sousTitre: string; bande: string; carte: string; bar: string; soirees: string; demande: string; complementAdresse: string };
  regles: Regle[];
  originStory: string[]; // 4 phrases courtes, tirées de l'histoire
  vins: Vin[];
  soirees: Soiree[];
  mosaique: Mosaique[]; // 12 photos sombres, dans l'ordre d'affichage
}

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

const SOIR: Creneau[] = [{ ouverture: '19:00', fermeture: '23:00' }]; // fermeture illustrative : sert au statut et au loader, jamais affichée
const LIB_SEMAINE = 'Boutique dès 16h, cave à manger dès 19h';

export const site: Restaurant = {
  slug: 'pepite',
  nom: 'Pépite',
  baseline: 'Cave à manger',
  description: 'Pépite, cave à manger à Namur : vins d\'auteurs et assiettes à partager dans une cave voûtée, rue Notre-Dame. Ouvert du jeudi au samedi.',
  url: 'https://pepite-caveamanger.be',
  typeCuisine: 'Assiettes à partager, bar à vins',
  adresse: { rue: 'Rue Notre-Dame', numero: '44', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4601105, lon: 4.8665145 },
  telephone: '+32 476 62 01 82',
  email: { valeur: 'catherine.mathieu@me.com', placeholder: false }, // affiché sur le site actuel
  reservation: { outil: 'Tablebooker', url: 'https://reservations.tablebooker.com/' },
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: [], note: 'fermé' },
    { jour: 'mercredi', creneaux: [], note: 'fermé' },
    { jour: 'jeudi', creneaux: SOIR, libelle: LIB_SEMAINE },
    { jour: 'vendredi', creneaux: SOIR, libelle: LIB_SEMAINE },
    { jour: 'samedi', creneaux: SOIR, libelle: 'Boutique dès 10h30, cave à manger dès 19h ; samedi midi sur demande' },
    { jour: 'dimanche', creneaux: [], note: 'fermé' },
  ],
  reseaux: [
    { nom: 'Instagram', url: 'https://www.instagram.com/pepitecaveamanger/' },
    { nom: 'Facebook', url: 'https://www.facebook.com/Pépite-cave-à-manger-248386248950963/' },
  ],
  carte: [
    {
      categorie: 'Menu 5 services, du 12 au 14 novembre 2026',
      plats: [
        { nom: 'Les Incontournables', description: 'Sardines Papa Anzoi, caponata siciliana', prix: null, placeholder: false },
        { nom: 'Betterave, grenade, feta', description: '', prix: null, placeholder: false },
        { nom: 'Potimarron rôti', description: 'Noisettes et beurre noisette, câpres, sauge, parmesan', prix: null, placeholder: false },
        { nom: 'Poulet confit au fenouil et clémentine', description: "Grenailles à l'origan ; version végétale possible", prix: null, placeholder: false },
        { nom: 'Assortiment de fromages', description: 'Supplément', prix: '12 €', placeholder: false },
        { nom: 'Pomme au four', description: 'Glace spéculoos, toffee', prix: null, placeholder: false },
      ],
    },
  ],
  menus: [
    { nom: 'Menu 5 services', prix: '58 €', description: "Du 12 au 14 novembre 2026. À déguster tel quel ou à l'assiette : entrées à partager, plat et dessert individuels.", placeholder: false },
    { nom: 'Vin au verre', prix: '5,50 à 12,50 €', description: "Des vins d'auteurs, élaborés dans le respect du vivant.", placeholder: false },
    { nom: 'Gin Djîn par Sang Hoon Degeimbre', prix: '45 €', description: 'Bouteille de 500 ml, à la boutique.', placeholder: false },
    { nom: 'Colis cadeaux', prix: '', description: 'Sélections de vins « Chou, Chouchou & Chou Chéri », à offrir.', placeholder: false },
  ],
  histoire: [
    "Pépite est une cave à manger au 44 rue Notre-Dame, à Namur : une boutique de vins et, le soir, des assiettes à partager dans une cave voûtée.",
    "Le concept est celui de Catherine Mathieu. Il a ouvert en 2017 dans les murs de son ancien restaurant, Cuisinémoi, et la presse l'a remarqué très vite (Le Vif, Chef Magazine, Juliette & Victor).",
    "« Partager et se sentir bien sont les mots qui ont résonné en moi lors de la création de ce lieu », écrit la patronne sur le site de la maison.",
    "Les vins sont des vins d'auteurs, élaborés dans le respect du vivant. Les assiettes se choisissent à plusieurs, avec des produits de cultivateurs locaux, disent des clients.",
  ],
  equipe: [{ nom: 'Catherine Mathieu', role: 'Fondatrice, patronne', placeholder: false }],
  avis: [
    { texte: 'Menu simple, pas hyper travaillé mais avec d\'excellents produits et maîtrisé. Vins au top, patronne qui aime ses quilles et en parle volontiers. Chouette endroit.', auteur: '@bigdrich', source: 'Mapstr', date: '2026-04-19', placeholder: false },
    { texte: 'Superbe endroit où les plats innovants sont à partager. La carte des vins propose des flacons atypiques.', auteur: '@stephane.verstraeten', source: 'Mapstr', date: '2019-08-23', placeholder: false },
    { texte: 'Adresse super sympa. Vins très très bons et de superbes découvertes. Les plats à partager étaient tous aussi bons les uns que les autres.', auteur: '@margauxvdv', source: 'Mapstr', date: '2019-05-27', placeholder: false },
  ],
  photos: [
    photo('/photos/cave-voutee-table.webp', 'Cave voûtée en pierre, longue table de bois dressée, bougies et verres', 598, 899),
    photo('/photos/cave-table-detail.webp', 'Table dressée sous la voûte, bougie allumée et fleurs', 598, 479),
    photo('/photos/cave-voute-niche.webp', 'Voûte de la cave et casiers à bouteilles', 598, 420),
    photo('/photos/vitrine-logo.webp', 'Logo pépite, cave à manger, en vitrine ; salle chaude et floue derrière', 1024, 684),
    photo('/photos/salle-bokeh.webp', 'Salle floue aux lumières chaudes', 464, 384),
    photo('/photos/bouteilles-vins.webp', 'Une rangée de bouteilles de vin, personne floue derrière', 1600, 1066),
    photo('/photos/bouteilles-gauche.webp', 'Bouteilles de vin aux étiquettes colorées', 860, 966),
    photo('/photos/bouteilles-droite.webp', 'Bouteilles de vin blanc et rouge alignées', 860, 966),
    photo('/photos/couvert-table.webp', 'Couvert posé sur une serviette blanche, table en bois, poivre et sel', 1024, 683),
    photo('/photos/tabouret-cuivre.webp', 'Tabouret cuivré au premier plan, salle floue', 683, 1025),
    photo('/photos/service-bouteille.webp', 'Une personne en chemise blanche tient une bouteille, lumière chaude', 720, 1080),
    photo('/photos/dessert-assiette.webp', 'Dessert sur assiette, touche de rouge, lumière chaude', 690, 1040),
    photo('/photos/bougie-table.webp', 'Bougie et photophore sur une table, reflets chauds', 710, 1080),
    photo('/photos/atelier-ecriture.webp', "Mains qui écrivent à une table d'atelier, carafes et verres", 662, 662),
  ],
  valeurs: ['Partager', 'Se sentir bien', "Vins d'auteurs, élaborés dans le respect du vivant", 'Produits de cultivateurs locaux'],
  accroche: {
    titre: ['Cave', 'à manger'],
    sousTitre: "Rue Notre-Dame, à Namur : une boutique de vins d'auteurs et des assiettes à partager, sous une cave voûtée.",
    bande: 'Partager et se sentir bien : les mots qui ont résonné à la création du lieu, écrit la patronne.',
    carte: "Le menu à 5 services se déguste tel quel ou à l'assiette. Le plat existe en version végétale.",
    bar: "Des vins d'auteurs, élaborés dans le respect du vivant, au verre de 5,50 à 12,50 €.",
    soirees: 'Samedi midi, privatisation, soirées aux bougies : la cave se réserve sur demande.',
    demande: 'Une date, un nombre de convives, une envie : appelez ou envoyez un SMS au 0476 62 01 82.',
    complementAdresse: 'Stationnement difficile dans la rue : prévoyez le parking du Casino.',
  },
  regles: [
    { texte: 'Jeudi et vendredi : la boutique ouvre dès 16h, la cave à manger dès 19h.', placeholder: false },
    { texte: 'Samedi : la boutique ouvre dès 10h30, la cave à manger dès 19h.', placeholder: false },
    { texte: "Le menu se déguste tel quel ou à l'assiette.", placeholder: false },
    { texte: 'Le plat du menu existe en version végétale.', placeholder: false },
    { texte: 'Samedi midi et privatisation : sur demande.', placeholder: false },
  ],
  originStory: [
    "2017 : Catherine Mathieu ouvre Pépite dans les murs de son ancien restaurant, Cuisinémoi.",
    "Une cave voûtée, une boutique de vins d'auteurs, des assiettes à partager.",
    '« Partager » et « se sentir bien » : les mots qui ont résonné à la création du lieu.',
    'Des soirées aux bougies, sans gaz ni électricité, relayées par Le Vif en 2022.',
  ],
  vins: [
    { nom: 'Blanc vif', ingredients: "vin d'auteur, domaine et cépage à renseigner", prix: '7 €', famille: 'blanc', placeholder: true },
    { nom: 'Blanc de caractère', ingredients: "vin d'auteur, domaine et cépage à renseigner", prix: '9 €', famille: 'blanc', placeholder: true },
    { nom: 'Orange', ingredients: "vin de macération, domaine à renseigner", prix: '8 €', famille: 'orange', placeholder: true },
    { nom: 'Rouge léger', ingredients: "vin d'auteur, domaine et cépage à renseigner", prix: '7,50 €', famille: 'rouge', placeholder: true },
    { nom: 'Rouge de garde', ingredients: "vin d'auteur, domaine et cépage à renseigner", prix: '12 €', famille: 'rouge', placeholder: true },
    { nom: 'Pétillant', ingredients: 'vin vivant, domaine à renseigner', prix: '9 €', famille: 'bulles', placeholder: true },
  ],
  soirees: [
    { nom: 'Samedi midi', description: 'Le samedi, la boutique ouvre dès 10h30 et la table peut s\'ouvrir à midi.', quand: 'sur demande', placeholder: false },
    { nom: 'Privatisation', description: 'La cave voûtée se privatise. On en parle de vive voix.', quand: 'sur demande', placeholder: false },
    { nom: 'Soirées aux bougies', description: 'Un menu sans gaz ni électricité, à la bougie, relayé par Le Vif en 2022. Dates à demander à la maison.', quand: 'en soirée', placeholder: false },
  ],
  mosaique: [
    'cave-voutee-table', 'bouteilles-gauche', 'bougie-table', 'service-bouteille', 'vitrine-logo', 'dessert-assiette',
    'bouteilles-droite', 'tabouret-cuivre', 'cave-table-detail', 'couvert-table', 'salle-bokeh', 'atelier-ecriture',
  ].map((n) => ({ src: `/photos/${n}.webp`, placeholder: false })),
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Horaires lisibles : '12:00 à 14:00, 19:00 à 21:00' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.libelle ?? (h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé');

/** Jours de service du soir et bornes du service, pour les textes serveur et le loader. */
export function serviceSoir(r: Restaurant = site) {
  const soirs = r.horaires.filter((h) => h.creneaux.some((c) => c.ouverture >= '17:00'));
  const ouv = soirs.map((h) => h.creneaux.at(-1)!.ouverture).sort()[0] ?? '19:00';
  const ferm = soirs.map((h) => h.creneaux.at(-1)!.fermeture).sort().at(-1) ?? '21:00';
  const jours = soirs.map((h) => h.jour);
  const texte = jours.length > 2 && jours.every((j, i) => i === 0 || r.horaires.findIndex((h) => h.jour === j) === r.horaires.findIndex((h) => h.jour === jours[i - 1]) + 1)
    ? `du ${jours[0]} au ${jours.at(-1)} soir`
    : jours.join(', ');
  return { ouverture: ouv, fermeture: ferm, jours, texte };
}
export const heure = (h: string) => h.replace(':00', 'h').replace(':', 'h');

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
