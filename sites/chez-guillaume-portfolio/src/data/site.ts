// Tout le contenu du site vit ici. Source : data/restaurants/<slug>/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; url?: string; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export type CouleurActivite = 'vert' | 'rose' | 'bleu';
/** Une activité du lieu : `reelle: false` = activité illustrative du gabarit (marquée partout où elle s'affiche). */
export interface Activite { id: string; nom: string; motItalique: string; couleur: CouleurActivite; accroche: string; reelle: boolean }
/** Événement d'exemple : jamais de date en dur, seulement un jour de semaine et une heure. */
export interface Evenement { titre: string; jour: Jour; heure: string; activite: string; photo: string; detail: string; placeholder: boolean }
export interface Formule { nom: string; prix: string; lignes: string[]; placeholder: boolean }
export interface Sticker { texte: string; placeholder: boolean }

export interface Restaurant {
  slug: string;
  nom: string;
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number | null; lon: number | null }; // null : non géocodé (dossier)
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
  activites: Activite[];
  evenements: Evenement[];
  brunch: Formule;
  stickers: Sticker[];
  privatisation: { phrase: string; placeholder: boolean };
  quartier: { phrase: string; placeholder: boolean };
  manifeste: { avant: string; italique: string; apres: string };
  /** Formules hors menus (lundi, ticket du dimanche). */
  formules: Formule[];
  bonCadeau: { phrase: string; url: string };
  faq: { q: string; r: string }[];
  programmation: { phrase: string; url: string };
}

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

export const site: Restaurant = {
  slug: 'chez-guillaume',
  nom: 'Chez Guillaume',
  baseline: 'Restaurant et comedy club au cœur de Namur. On y rit, on y mange, on y vit !',
  description:
    'Chez Guillaume, restaurant et comedy club à Namur : repas avant le spectacle du mercredi au samedi, brunch et stand-up le dimanche.',
  url: 'https://chezguillaume.be',
  typeCuisine: 'Brasserie, repas-spectacle, brunch',
  adresse: { rue: 'Rue Lelièvre', numero: '4', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: null, lon: null },
  telephone: '+32 81 26 25 65',
  email: { valeur: 'hello@chezguillaume.be', placeholder: false },
  reservation: { outil: 'la billetterie', url: 'https://chezguillaume.be/#agenda' },
  // Horaires de la FAQ du site (dossier : « FAQ retenue ») ; le repas du soir n'est servi que du mercredi au samedi.
  horaires: [
    { jour: 'lundi', creneaux: [{ ouverture: '18:00', fermeture: '00:00' }], note: 'lundi « face à la crise »' },
    { jour: 'mardi', creneaux: [{ ouverture: '18:00', fermeture: '00:00' }] },
    { jour: 'mercredi', creneaux: [{ ouverture: '18:00', fermeture: '00:00' }], note: 'repas 18:30 à 20:30' },
    { jour: 'jeudi', creneaux: [{ ouverture: '18:00', fermeture: '00:00' }], note: 'repas 18:30 à 20:30' },
    { jour: 'vendredi', creneaux: [{ ouverture: '18:00', fermeture: '00:00' }], note: 'repas 18:30 à 20:30' },
    { jour: 'samedi', creneaux: [{ ouverture: '18:00', fermeture: '00:00' }], note: 'repas 18:30 à 20:30' },
    { jour: 'dimanche', creneaux: [{ ouverture: '10:00', fermeture: '18:00' }], note: 'brunch 11:30 à 14:00, spectacle 15:00' },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61558313910793' },
    { nom: 'Instagram', url: 'https://www.instagram.com/chez.guillaume/' },
  ],
  carte: [
    {
      categorie: 'Menu Bonne Maman',
      plats: [
        { nom: 'Entrée', description: 'Tête pressée, salade de chicons', prix: null, placeholder: false },
        { nom: 'Plat', description: 'Boulettes liégeoises avec frites et salade', prix: null, placeholder: false },
        { nom: 'Dessert', description: 'Poire Belle-Hélène', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Menu de la Cheffe',
      plats: [
        { nom: 'Entrée', description: 'Rouget snacké, mousseline de saumon, travail autour de la betterave rouge', prix: null, placeholder: false },
        { nom: 'Plat', description: "Filet d'agneau, céleri-rave, pomme de terre fondante, poire confite au cidre, ail noir", prix: null, placeholder: false },
        { nom: 'Dessert', description: 'Riz au lait, compotée de coing, prune en pickles', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Menu végétarien',
      plats: [
        { nom: 'Entrée', description: 'Halloumi snacké, quenelle de tofu aux épinards, travail autour de la betterave rouge', prix: null, placeholder: false },
        { nom: 'Plat', description: 'Gnocchi de patate douce, céleri-rave, pomme de terre fondante, poire confite au cidre, ail noir', prix: null, placeholder: false },
        { nom: 'Dessert', description: 'Riz au lait, compotée de coing, prune en pickles', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Au bar',
      plats: [
        { nom: 'Cocktails maison', description: 'préparés au bar de la maison', prix: null, placeholder: false },
        { nom: 'Mocktails signatures', description: 'sans alcool', prix: null, placeholder: false },
        { nom: 'Vin rouge bio', description: 'un rouge à la carte', prix: null, placeholder: false },
        { nom: 'Vin blanc bio', description: 'un blanc à la carte', prix: null, placeholder: false },
      ],
    },
  ],
  // Prix des trois menus du mois (relevé d'octobre 2026) : 2 services / 3 services.
  menus: [
    { nom: 'Menu Bonne Maman', prix: '29 € / 39 €', description: '2 ou 3 services', placeholder: false },
    { nom: 'Menu de la Cheffe', prix: '39 € / 49 €', description: '2 ou 3 services', placeholder: false },
    { nom: 'Menu végétarien', prix: '29 € / 39 €', description: '2 ou 3 services', placeholder: false },
  ],
  histoire: [
    "Chez Guillaume ouvre ses portes en janvier 2025, rue Lelièvre, en face de la place Saint-Aubain. Derrière le nom, l'humoriste namurois Guillaume Wattecamps, alias GuiHome.",
    "L'idée tient en une phrase : un restaurant et un comedy club sous le même toit. Du mercredi au samedi, le repas est servi entre 18h30 et 20h30, juste avant le spectacle ; le dimanche, le brunch précède la scène.",
    "À l'ouverture, la cuisine est confiée à Tamara Truyts, ancienne sous-cheffe de Julien Malaisse (ELLE.be, janvier 2025). Chaque mois, trois menus : Bonne Maman, Cheffe et végétarien, en 2 ou 3 services.",
    "Les plats et les cocktails sont préparés dans la cuisine et au bar de la maison, avec des produits locaux et des recettes de saison.",
  ],
  equipe: [
    { nom: 'Guillaume Wattecamps, alias GuiHome', role: 'Fondateur, humoriste', placeholder: false },
    { nom: 'Notre cheffe', role: 'Cuisine : les menus du mois et le brunch', photo: '/photos/cuisine-dressage.webp', placeholder: false },
  ],
  // Aucun avis client affiché par le site : la section cite des titres de presse réels (donnees.json, presse).
  avis: [
    { texte: 'Le rire au menu et le succès en dessert', auteur: '', source: "L'Avenir", date: '2025-09-11', url: 'https://www.lavenir.net/regions/namur/2025/09/11/le-rire-au-menu-et-le-succes-en-dessert-huit-mois-apres-louverture-de-chez-guillaume-a-namur-on-veut-ouvrir-les-portes-a-toute-la-francophonie-O5MKQJTWSJDJFNBBFSTUZHX3WM/', placeholder: false },
    { texte: 'Chez Guillaume : le nouveau Comedy Club', auteur: '', source: 'ELLE.be', date: '2025-01', url: 'https://www.elle.be/fr/441761-chez-guillaume-le-nouveau-comedy-club-en-plein-centre-de-namur.html', placeholder: false },
    { texte: "La DH était à l'ouverture du restaurant-comedy club de GuiHome", auteur: '', source: 'La DH', date: '2025-01-09', url: 'https://www.dhnet.be/medias/divers/2025/01/09/la-dh-etait-a-louverture-du-restaurant-comedy-club-de-guihome-on-a-mis-des-baffles-meme-aux-chiottes-histoire-de-ne-rien-louper-des-blagues-PKSWVUPYS5BSJHL6Y2HXDI4UKI/', placeholder: false },
  ],
  // Alt d'après photos/index.json (champ `sujet`) : aucune personne nommée.
  photos: [
    photo('/photos/hero-scene.webp', 'Un humoriste au micro sur la scène, public de dos, mur blanc éclairé en arc', 1000, 625),
    photo('/photos/scene-micro.webp', 'Un humoriste au micro sur la scène, public de dos, mur blanc éclairé en arc', 1000, 1250),
    photo('/photos/scene-rires.webp', 'Trois personnes rient sur scène devant le mur blanc éclairé', 546, 683),
    photo('/photos/salle-projecteurs.webp', 'La salle : rampe de projecteurs, tables en bois clair, rideaux rouille', 1000, 1250),
    photo('/photos/salle-projecteurs-large.webp', 'La salle : rampe de projecteurs, tables en bois clair, rideaux rouille', 1000, 625),
    photo('/photos/salle-rideaux.webp', 'La salle : scène ronde, rideaux bordeaux et tables', 864, 1080),
    photo('/photos/salle-rideaux-large.webp', 'La salle : scène ronde, rideaux bordeaux et tables', 864, 540),
    photo('/photos/salle-banquette.webp', 'Banquette rayée rouge et blanc, table dressée avec verres et set illustré', 964, 1204),
    photo('/photos/plat-boudin.webp', 'Boudin, purée et compote sur une assiette à liseré rouge, verre de vin rouge', 1000, 1250),
    photo('/photos/brunch-tartelette.webp', "Tartelette au citron meringuée sur une assiette à liseré rouge, latte en arrière-plan", 1024, 1280),
    photo('/photos/brunch-cafe.webp', 'Un expresso coule dans une tasse à fleur rouge', 1024, 1280),
    photo('/photos/bar-cocktails.webp', 'Service de cocktails au bar : shaker et coupes', 1000, 1250),
    photo('/photos/cuisine-dressage.webp', 'Une cuisinière dresse des assiettes en cuisine', 1000, 1250),
  ],
  valeurs: ['Cuisine et bar maison', 'Produits locaux, recettes de saison', 'Un vin rouge et un vin blanc bio'],
  manifeste: { avant: 'On y rit, on y mange, on y ', italique: 'vit', apres: ' !' },
  activites: [
    { id: 'table', nom: 'Table', motItalique: 'le rire', couleur: 'vert', accroche: 'Le repas, avant', reelle: true },
    { id: 'scene', nom: 'Scène', motItalique: 'voir qui ?', couleur: 'rose', accroche: 'On va', reelle: true },
    { id: 'brunch', nom: 'Brunch', motItalique: 'stand-up', couleur: 'bleu', accroche: 'Le dimanche, brunch et', reelle: true },
  ],
  // Le rythme réel de la semaine (dossier) ; les artistes et les dates sont publiés sur la billetterie du site.
  evenements: [
    { titre: 'Repas-spectacle', jour: 'mercredi', heure: '18:30', activite: 'scene', photo: '/photos/scene-micro.webp', detail: 'Repas servi de 18h30 à 20h30, puis le spectacle. Repas obligatoire, hors ticket.', placeholder: false },
    { titre: 'Repas-spectacle', jour: 'jeudi', heure: '18:30', activite: 'scene', photo: '/photos/salle-projecteurs.webp', detail: 'Repas servi de 18h30 à 20h30, puis le spectacle. Repas obligatoire, hors ticket.', placeholder: false },
    { titre: 'Repas-spectacle', jour: 'vendredi', heure: '18:30', activite: 'scene', photo: '/photos/plat-boudin.webp', detail: 'Repas servi de 18h30 à 20h30, puis le spectacle. Repas obligatoire, hors ticket.', placeholder: false },
    { titre: 'Repas-spectacle', jour: 'samedi', heure: '18:30', activite: 'scene', photo: '/photos/salle-rideaux.webp', detail: 'Repas servi de 18h30 à 20h30, puis le spectacle. Repas obligatoire, hors ticket.', placeholder: false },
    { titre: 'Brunch à volonté', jour: 'dimanche', heure: '11:30', activite: 'brunch', photo: '/photos/brunch-tartelette.webp', detail: 'Buffet sucré-salé de 11h30 à 14h, 35 € (15 € moins de 12 ans).', placeholder: false },
    { titre: 'Spectacle du dimanche', jour: 'dimanche', heure: '15:00', activite: 'scene', photo: '/photos/scene-rires.webp', detail: 'Ticket 20 €, avec ou sans buffet.', placeholder: false },
    { titre: 'Lundi « face à la crise »', jour: 'lundi', heure: '18:00', activite: 'table', photo: '/photos/salle-banquette.webp', detail: 'Croque-monsieur et boisson, 12 €.', placeholder: false },
  ],
  brunch: {
    nom: 'Brunch du dimanche, buffet à volonté',
    prix: '35 €',
    lignes: [
      'Eau, jus d’orange et thé glacé à volonté',
      'Œufs brouillés et bacon',
      'Légumes chauds et salades',
      'Pains, fromages et charcuteries',
      'Pancakes et viennoiseries',
      'Desserts et granola',
      'Potage du jour, yaourt, fruits',
    ],
    placeholder: false,
  },
  formules: [
    { nom: 'Lundi « face à la crise »', prix: '12 €', lignes: ['Croque-monsieur et boisson', 'Spectacle sans repas complet'], placeholder: false },
    { nom: 'Ticket spectacle du dimanche', prix: '20 €', lignes: ['Spectacle à 15h', 'Avec ou sans buffet'], placeholder: false },
    { nom: 'Brunch, moins de 12 ans', prix: '15 €', lignes: ['Le même buffet, à volonté'], placeholder: false },
  ],
  stickers: [
    { texte: 'Cuisine maison', placeholder: false },
    { texte: 'Bar maison', placeholder: false },
    { texte: 'Produits locaux', placeholder: false },
    { texte: 'Vins bio', placeholder: false },
  ],
  privatisation: { phrase: "Le lieu se privatise pour vos team buildings, vos anniversaires et vos soirées d'entreprise, stand-up privé compris si vous le souhaitez.", placeholder: false },
  quartier: { phrase: 'Rue Lelièvre, en face de la place Saint-Aubain, au cœur de Namur.', placeholder: false },
  bonCadeau: { phrase: "Le bon cadeau s'offre par virement, avec la preuve envoyée par e-mail, ou en version papier sur place.", url: 'https://chezguillaume.be/bon-cadeau/' },
  programmation: { phrase: "Les artistes, les dates et les tickets de chaque soirée sont publiés sur l'agenda de la billetterie.", url: 'https://chezguillaume.be/#agenda' },
  faq: [
    { q: 'Le repas est-il compris dans le ticket ?', r: "Non. Du mercredi au samedi, le repas est obligatoire et se règle à part ; il est servi entre 18h30 et 20h30, avant le spectacle." },
    { q: 'Comment réserver une table ?', r: "Le soir, la table est liée au ticket du spectacle, pris sur la billetterie. Pour le brunch du dimanche, écrivez-nous ou appelez-nous." },
    { q: 'Peut-on venir sans manger ?', r: 'Le lundi « face à la crise » : croque-monsieur et boisson pour 12 €. Le dimanche, le ticket spectacle (20 €) se prend avec ou sans buffet.' },
    { q: 'Y a-t-il une option végétarienne ?', r: 'Oui : chaque mois, un menu végétarien en 2 ou 3 services, à côté des menus Bonne Maman et de la Cheffe.' },
    { q: 'Et à boire ?', r: 'Des cocktails maison, des mocktails signatures, un vin rouge et un vin blanc bio.' },
  ],
};

/** Jours de service (créneaux non vides), pour l'agenda sans date. */
export const joursService = (r: Restaurant = site) => r.horaires.filter((h) => h.creneaux.length).map((h) => h.jour);
export const activiteDe = (id: string): Activite => {
  const a = site.activites.find((x) => x.id === id);
  if (!a) throw new Error(`Activité inconnue : ${id}`);
  return a;
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
  h.creneaux.length
    ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') + (h.note ? ` (${h.note})` : '')
    : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
