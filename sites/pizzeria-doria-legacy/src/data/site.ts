import carte from './carte.json';

export const resto = {
  nom: 'Pizzeria Doria',
  adresse: 'Rue Fond de Malonne 66',
  ville: '5020 Malonne (Namur)',
  tel: '+32 81 44 44 08',
  telHref: 'tel:+3281444408',
  email: 'info@pizzeriadoria.be',
  facebook: 'https://www.facebook.com/pizzeriadoria/',
  tripadvisor: 'https://fr.tripadvisor.be/Restaurant_Review-g188663-d15148602-Reviews-Pizzeria_Doria-Namur_The_Ardennes_Wallonia.html?m=19905',
  pizzy: 'https://pizzy.be/pizzeria-doria',
  pdfEmporter: 'https://www-static.pizzeriadoria.be/wp-content/uploads/2026/06/menu_emporter_pizzeria_doria_site.pdf?media=1793961880',
  carteGps: 'https://www.openstreetmap.org/?mlat=50.4404882&mlon=4.7950329#map=18/50.4404882/4.7950329',
  tva: 'BE1004.184.580',
  baseline: 'Venez passer un moment chaleureux et convivial aux saveurs de l’Italie chez Doria.',
};

// Horaires du site d'origine (accueil et contact). Dimanche et jours fériés : soir seulement.
export const horaires = [
  { jour: 'Lundi', h: ['12:00 à 13:30', '18:00 à 21:30'] },
  { jour: 'Mardi', h: [] as string[] },
  { jour: 'Mercredi', h: [] as string[] },
  { jour: 'Jeudi', h: ['12:00 à 13:30', '18:00 à 21:30'] },
  { jour: 'Vendredi', h: ['12:00 à 13:30', '18:00 à 22:00'] },
  { jour: 'Samedi', h: ['12:00 à 13:30', '18:00 à 22:00'] },
  { jour: 'Dimanche', h: ['18:00 à 21:30'] },
];
export const horairesNote = 'Dimanche et jours fériés : 18:00 à 21:30. Mardi et mercredi : fermé, jours fériés compris. Cuisine fermée à partir de 21:00 du mardi au jeudi et le dimanche, de 21:30 le vendredi et le samedi.';

export const suggestions = {
  titre: 'Suggestions du moment, novembre 2026',
  lignes: [
    { nom: 'Pizza aux cèpes', prix: 18, desc: 'Cèpes, fior di latte, saucisse au fenouil, speck, copeaux de parmesan' },
    { nom: 'Risotto aux cèpes', prix: 20, desc: 'Chair de saucisse au lambrusco, cèpes, déglaçage au lambrusco, crème de parmesan, speck. Préparé à la commande, 30 minutes d’attente' },
    { nom: 'Panna cotta', prix: 8, desc: 'Fruits des bois, copeaux de chocolat blanc et zeste de citron' },
  ],
};

export const midis = {
  titre: 'Cornets de pâtes et paninis maison',
  quand: 'Les midis du lundi au vendredi, les jours scolaires, sauf le mardi et le mercredi.',
  cornets: [
    ['Jambon crème', 5], ['Tomate crème', 5], ['Bolognaise', 5], ['Arrabiata', 5], ['Carbonara', 5], ['Quatre fromages', 5.5], ['Saumon', 6],
  ] as [string, number][],
  paninis: [
    ['Tomate, mozzarella, balsamique et pesto', 6], ['Chèvre, miel et salade', 6], ['Saumon, salade, ail et oignons', 7.5], ['Parme, roquette, tomate, copeaux et balsamique', 7.5],
  ] as [string, number][],
};

export const avis = [
  { titre: 'Expérience à refaire', texte: 'Nourriture délicieuse, bien servie et très copieuse. Personnel sympathique et serviable. Bonne ambiance, beau cadre.', qui: 'Aurélie C', date: '9 octobre 2023' },
  { titre: 'Tutto ottimo!', texte: 'Tutto ottimo! Cibo di qualità, locale carino e personale super accogliente. Lo consiglio vivamente!', qui: 'Petra B', date: '13 juin 2023' },
  { titre: 'Pizzeria délicieuse, simple et efficace', texte: 'Bel endroit, simple et efficace, la nourriture est très bonne, décors spécial (nous avons mangé dans un coffre de banque). Je recommande cette pizzeria si vous passez vers Namur.', qui: 'Roam63401968725', date: '6 mai 2023' },
];

export const emploi = {
  titre: 'Offre d’emploi : serveur ou serveuse (H/F)',
  taches: ['Accueil des clients', 'Préparation de cocktails et d’apéritifs', 'Service en salle', 'Encodage des commandes', 'Encaissement'],
  dispo: 'Du mardi au dimanche, congé un week-end sur deux, jours fériés congé le matin.',
  conditions: ['Être motivé et dynamique', 'Travailler en équipe', 'Capacité à être à l’écoute', 'Avoir une expérience en restauration', 'Pas d’étudiant'],
  fin: 'Prenez contact directement avec la Pizzeria Doria avec votre CV. Engagement en CDI sous réserve de période d’essai.',
};

type Plat = { nom: string; description: string | null; prix: number; placeholder: boolean };
type Cat = { categorie: string; plats: Plat[] };
const cartes = carte as Cat[];
const cat = (n: string) => cartes.find((c) => c.categorie === n)!;

export const groupesMenu = [
  { id: 'aperitif', titre: 'Apéritifs et boissons', cats: [cat('Apéritifs'), cat('Bières'), cat('Softs')] },
  { id: 'pizza', titre: 'Pizzas et pains', cats: [cat('Pizzas')] },
  { id: 'pasta', titre: 'Pasta', cats: [cat('Pasta')] },
  { id: 'viandes', titre: 'Viandes et salades', cats: [cat('Salades & Antipasti'), cat('Viandes')] },
  { id: 'desserts', titre: 'Glaces et desserts', cats: [cat('Glaces & Desserts')] },
  { id: 'cafe', titre: 'Café et digestifs', cats: [cat('Café'), cat('Digestifs')] },
];
export const groupeVins = [cat('Vins (bouteilles 75 cl)'), cat('Vins au verre et pichets')];

const nbsp = ' ';
export const prix = (n: number) => `${n.toFixed(2).replace('.', ',').replace(/,00$/, '')}${nbsp}€`;
const propres = /^(San|Grana|Gorgonzola|Taleggio|Bufala|Pecorino|Ricotta|Burrata|Parme|Parmesan|Nduja|Spianata|Stracciata|Eggusto|Italie|Philom)/;
export const liste = (d: string | null) => {
  if (!d) return '';
  const p = d.split(/\s+-\s+/).map((s, i) => (i === 0 || propres.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1)));
  return p.join(', ').replace(/ · /g, ', ');
};
export const nomCat = (c: string) => ({ 'Salades & Antipasti': 'Salades et antipasti', 'Glaces & Desserts': 'Glaces et desserts', 'Vins (bouteilles 75 cl)': 'Vins en bouteille, 75 cl', 'Vins au verre et pichets': 'Vins au verre et en pichet', Pasta: 'Pasta', Viandes: 'Viandes' } as Record<string, string>)[c] ?? c;
