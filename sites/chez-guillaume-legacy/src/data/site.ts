// Données réelles : data/restaurants/chez-guillaume/{donnees.json,dossier.md,site-actuel/}. Rien d'inventé.
export const resto = {
  nom: 'Chez Guillaume',
  baseline: 'Restaurant & Comedy Club',
  rue: 'Rue Lelièvre, Pl. Saint-Aubain 4',
  ville: '5000 Namur',
  tel: '081 26 25 65',
  telHref: 'tel:081262565',
  email: 'hello@chezguillaume.be',
  emailHref: 'mailto:hello@chezguillaume.be',
  emailTables: 'restaurant@chezguillaume.be',
  billetterie: 'https://chezguillaume.be/events/',
  agendaOrigine: 'https://chezguillaume.be/#agenda',
  carte: 'https://maps.app.goo.gl/qbXXBCSLb2a3TdbL9',
  facebook: 'https://www.facebook.com/profile.php?id=61558313910793',
  instagram: 'https://www.instagram.com/chez.guillaume/',
  site: 'https://chezguillaume.be',
  mentions: 'https://chezguillaume.be/politique-de-confidentialite/',
};

export const nav = [
  { id: 'agenda', label: 'Agenda', href: 'agenda/' },
  { id: 'restaurant', label: 'Restaurant', href: 'restaurant/' },
  { id: 'privatisation', label: 'Privatisation', href: 'privatisation/' },
  { id: 'bon-cadeau', label: 'Bon cadeau', href: 'bon-cadeau/' },
  { id: 'faq', label: 'FAQ', href: 'faq/' },
];

// Horaires de la FAQ (retenus, voir ETAT.md) : lun-sam 18 h 00 à minuit, dim 10 h 00 à 18 h 00. jour = Date.getDay().
export const horaires = [
  { jour: 1, nom: 'Lundi', h: '18 h 00 à minuit' },
  { jour: 2, nom: 'Mardi', h: '18 h 00 à minuit' },
  { jour: 3, nom: 'Mercredi', h: '18 h 00 à minuit' },
  { jour: 4, nom: 'Jeudi', h: '18 h 00 à minuit' },
  { jour: 5, nom: 'Vendredi', h: '18 h 00 à minuit' },
  { jour: 6, nom: 'Samedi', h: '18 h 00 à minuit' },
  { jour: 0, nom: 'Dimanche', h: '10 h 00 à 18 h 00' },
];

// Agenda relevé sur chezguillaume.be le 1er novembre 2026 (calendrier de novembre, lien de chaque fiche conservé).
export type Date_ = { d: string; titre: string; slug: string; type: 'spectacle' | 'brunch' | 'soiree'; complet?: boolean; heure?: string };
export const agenda: Date_[] = [
  { d: '2026-11-01', titre: '1 brunch, 5 humoristes !', slug: '1-brunch-5-humoristes-68', type: 'brunch' },
  { d: '2026-11-04', titre: '1 soirée, 5 humoristes !', slug: '1-soiree-5-humoristes-59', type: 'soiree' },
  { d: '2026-11-05', titre: 'Lola d’Estienne', slug: 'lola-destienne-4', type: 'spectacle' },
  { d: '2026-11-06', titre: 'Denis Richir', slug: 'denis-richir-10', type: 'spectacle', complet: true },
  { d: '2026-11-07', titre: 'Simon Cortisone', slug: 'simon-cortisone-7', type: 'spectacle' },
  { d: '2026-11-08', titre: '1 brunch, 5 humoristes !', slug: '1-brunch-5-humoristes-69', type: 'brunch', complet: true },
  { d: '2026-11-11', titre: '1 soirée, 5 humoristes !', slug: '1-soiree-5-humoristes-60', type: 'soiree' },
  { d: '2026-11-12', titre: 'Kostia', slug: 'kostia-7', type: 'spectacle' },
  { d: '2026-11-13', titre: 'Plateau Humour noir', slug: 'plateau-humour-noir-3', type: 'spectacle', complet: true },
  { d: '2026-11-14', titre: 'Simon Lepers', slug: 'simon-lepers', type: 'spectacle' },
  { d: '2026-11-15', titre: '1 brunch, 5 humoristes !', slug: '1-brunch-5-humoristes-70', type: 'brunch' },
  { d: '2026-11-16', titre: 'Pierre-Antoine', slug: 'pierre-antoine', type: 'spectacle', heure: '20 h 00' },
  { d: '2026-11-18', titre: '1 soirée, 5 humoristes !', slug: '1-soiree-5-humoristes-61', type: 'soiree' },
  { d: '2026-11-19', titre: 'Salva', slug: 'salva-2', type: 'spectacle', heure: '18 h 30' },
  { d: '2026-11-20', titre: 'Maccheronicomedy', slug: 'maccheronicomedy', type: 'spectacle', heure: '18 h 30' },
  { d: '2026-11-21', titre: 'Maria Bouraga', slug: 'maria-bouraga', type: 'spectacle' },
  { d: '2026-11-22', titre: '1 brunch, 5 humoristes !', slug: '1-brunch-5-humoristes-71', type: 'brunch' },
  { d: '2026-11-25', titre: '1 soirée, 5 humoristes !', slug: '1-soiree-5-humoristes-62', type: 'soiree' },
  { d: '2026-11-26', titre: 'Freddy Tougaux', slug: 'freddy-tougaux-10', type: 'spectacle' },
  { d: '2026-11-27', titre: 'Florent Losson', slug: 'florent-losson-6', type: 'spectacle', complet: true },
  { d: '2026-11-28', titre: 'Sum', slug: 'sum-2', type: 'spectacle' },
  { d: '2026-11-29', titre: '1 brunch, 5 humoristes !', slug: '1-brunch-5-humoristes-72', type: 'brunch' },
  { d: '2026-11-30', titre: 'Dena', slug: 'dena-2', type: 'spectacle' },
  { d: '2026-12-02', titre: '1 soirée, 5 humoristes !', slug: '1-soiree-5-humoristes-63', type: 'soiree' },
  { d: '2026-12-03', titre: 'La petite boucherie du bonheur', slug: 'la-petite-boucherie-du-bonheur', type: 'spectacle' },
  { d: '2026-12-05', titre: 'Hugo Simon', slug: 'hugo-simon-10', type: 'spectacle' },
  { d: '2026-12-06', titre: '1 brunch, 5 humoristes !', slug: '1-brunch-5-humoristes-73', type: 'brunch' },
];
export const prochains = ['pierre-antoine', 'salva-2', 'maccheronicomedy'].map((s) => agenda.find((a) => a.slug === s)!);

const JOURS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
const JOURS_LONGS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
export const dateFr = (d: string) => {
  const [y, m, j] = d.split('-').map(Number);
  const w = new Date(Date.UTC(y, m - 1, j)).getUTCDay();
  return { court: JOURS[w], long: JOURS_LONGS[w], jour: j === 1 ? '1er' : String(j), mois: MOIS[m - 1], moisCourt: MOIS[m - 1].slice(0, 4) + (MOIS[m - 1].length > 4 ? '.' : ''), annee: y };
};
export const urlEvenement = (slug: string) => `https://chezguillaume.be/evenements/${slug}/`;
export const typeLibelle = { spectacle: 'Spectacle', brunch: 'Brunch stand-up', soiree: 'Soirée stand-up' } as const;

// Menus d'octobre 2026 relevés sur le site (trois menus renouvelés chaque mois).
export const menus = [
  { nom: 'Menu Bonne Maman', prix2: '29 €', prix3: '39 €', plats: [['Entrée', 'Tête pressée, salade de chicons'], ['Plat', 'Boulettes liégeoises avec frites & salade'], ['Dessert', 'Poire Belle-Hélène']] },
  { nom: 'Menu de la Cheffe', prix2: '39 €', prix3: '49 €', plats: [['Entrée', 'Rouget snacké, mousseline de saumon, travail autour de la betterave rouge'], ['Plat', 'Filet d’agneau, céleri-rave, pomme de terre fondante, poire confite au cidre, ail noir'], ['Dessert', 'Riz au lait, compotée de coing, prune en pickles']] },
  { nom: 'Menu végétarien', prix2: '29 €', prix3: '39 €', plats: [['Entrée', 'Halloumi snacké, quenelle de tofu aux épinards, travail autour de la betterave rouge'], ['Plat', 'Gnocchi de patate douce, céleri-rave, pomme de terre fondante, poire confite au cidre, ail noir'], ['Dessert', 'Riz au lait, compotée de coing, prune en pickles']] },
];
export const brunchCarte = ['Eau, jus d’orange et thé glacé à volonté', 'Œufs brouillés & bacon', 'Légumes chauds & salades fraîches', 'Assortiment de pains, fromages & charcuteries', 'Pancakes & accompagnements', 'Viennoiseries, desserts & granola', 'Potage du jour', 'Yaourt, fruits & douceurs maison'];

export const evenementsPrives = ['Team buildings avec des activités sur mesure', 'Soirée stand-up privée', 'Événements d’entreprise', 'Anniversaires', 'Soirées de fin d’année', 'Départs à la retraite', 'Lancements et afterworks', 'Repas de groupe', 'Événements associatifs', 'Célébrations familiales'];

export const faq: { theme: string; items: [string, string][] }[] = [
  { theme: 'Horaires et localisation', items: [
    ['Quels sont les horaires d’ouverture de Chez Guillaume ?', 'Du lundi au samedi : 18 h 00 à minuit. Dimanche : 10 h 00 à 18 h 00. Pour les spectacles du soir, une table vous est automatiquement attribuée pour le repas une fois votre ticket acheté sur notre site.'],
    ['Où se trouve Chez Guillaume ?', 'Rue Lelièvre 4, 5000 Namur, juste en face de la place Saint-Aubain. Facile à trouver, difficile à oublier.'],
    ['À quelle heure arriver pour le repas du soir ?', 'Pour un timing optimal, nous vous conseillons d’arriver entre 18 h 00 et 19 h 00.'],
    ['À quelle heure arriver pour le buffet brunch ?', 'Le brunch est servi entre 11 h 30 et 14 h 00. Nous vous conseillons d’arriver entre 11 h 30 et 13 h 00, pour profiter du buffet tranquillement avant sa fermeture à 14 h 00. Le spectacle commence à 15 h 00.'],
  ] },
  { theme: 'Réservations', items: [
    ['Comment puis-je réserver une table ?', 'Pour une table en journée le week-end, appelez le 081 26 25 65 ou envoyez un mail à restaurant@chezguillaume.be. Pour le soir, direction l’agenda : la réservation d’une table est liée à l’achat de places de spectacle. Vous prenez deux places et votre table pour deux est réservée automatiquement.'],
    ['Peut-on privatiser Chez Guillaume pour des événements privés ?', 'Oui. Mariages, divorces ou team building, on est partants. Contactez-nous.'],
    ['Comment réserver les places de spectacle ?', 'Si la réservation n’est pas possible directement sur le site, vous pouvez simplement envoyer un mail à hello@chezguillaume.be. Si vous rejoignez des amis ou un groupe, précisez-le dans votre réservation : nous ferons en sorte de vous placer ensemble.'],
  ] },
  { theme: 'Cuisine et boissons', items: [
    ['Peut-on venir juste voir le spectacle sans manger ?', 'Le dimanche, vous pouvez assister aux spectacles avec ou sans repas. Nos lundis « face à la crise » vous permettent de profiter du spectacle avec un croque-monsieur et une boisson pour 12 €, sans obligation de repas complet.'],
    ['Avez-vous des options végétariennes ou sans gluten ?', 'Oui, bien sûr. Pour toutes allergies, intolérances ou régimes spécifiques, faites appel à nos serveurs, et on trouvera ensemble la solution. Le mieux est de nous prévenir avant votre visite.'],
    ['Vos vins sont-ils bio ou naturels ?', 'Vous trouverez sur notre carte des vins une référence de vin rouge et de vin blanc certifiés bio.'],
    ['Où sont préparés les plats et les boissons ?', 'Dans notre cuisine et notre bar.'],
  ] },
  { theme: 'Spectacles', items: [
    ['Est-il obligatoire de consommer le menu 2 ou 3 services le soir ?', 'Oui, c’est la règle, à l’exception des soirées « sans menu », qui ont généralement lieu un lundi ou un mardi. Le menu change chaque mois.'],
    ['Les enfants sont-ils acceptés ?', 'Bien sûr. Le dimanche, les enfants jusqu’à 12 ans peuvent profiter du buffet à volonté pour 15 €.'],
    ['Comment les humoristes peuvent-ils postuler pour jouer sur scène ?', 'En nous envoyant une vidéo ou un extrait.'],
  ] },
];
