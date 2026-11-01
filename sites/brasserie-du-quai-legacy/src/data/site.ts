// Données de La Brasserie du Quai : tout vient de data/restaurants/brasserie-du-quai/ (dossier.md, donnees.json,
// site-actuel/*.txt et page.html). Rien d'inventé ; les faits absents sont marqués « à confirmer » ou en slot `.fill`.
import carteBrute from './carte.json';
import photosBrutes from './photos.json';

export const resto = {
  nom: 'La Brasserie du Quai',
  accroche: 'Une expérience au fil de l’eau',
  adresse: { rue: '9 rue du Quai', cp: '5000', commune: 'Namur' },
  tel: '081 65 70 03',
  telHref: 'tel:+3281657003',
  email: 'info@brasserieduquai.be',
  bce: 'BE 0564.802.096',
  facebook: 'https://www.facebook.com/brasserieduquai/',
  instagram: 'https://www.instagram.com/brasserieduquai/',
  // Câblage conservé du site d'origine : module Zenchef rid=379458 (page.html), bons cadeaux Brydge (cheque-cadeau/page.html).
  zenchef: 'https://bookings.zenchef.com/results?rid=379458&fullscreen=1',
  bonCadeau: 'https://widgets.brydge.app/giftvouchers?companyId=68c271720b245cad4fb89282&apiKey=pub_190fc3e9fff6ef7b0b7840cf05070eed&mode=fixed',
  maps: 'https://www.google.com/maps/dir//La+Brasserie+du+Quai,+Rue+du+Quai+9,+5000+Namur/@50.4655919,4.8773242,16z/data=!4m9!4m8!1m0!1m5!1m1!1s0x47c19911aa229431:0xc9e0f2c15b05480c!2m2!1d4.8798991!2d50.4655919!3e0?entry=ttu',
  michelin: 'https://guide.michelin.com/en/namur/namur/restaurant/brasserie-du-quai',
};

// Horaires : deux saisons, seule donnée publiée (page Réservation du site d'origine). Jours de fermeture inconnus.
export const saisons = [
  { id: 'hiver', nom: 'De novembre à avril', mois: [10, 11, 0, 1, 2, 3], midi: ['12:00', '14:30'], soir: ['18:00', '21:30'] },
  { id: 'ete', nom: 'De mai à octobre', mois: [4, 5, 6, 7, 8, 9], midi: ['12:00', '14:30'], soir: ['18:00', '22:00'] },
];
// Banc d'écailler : du jeudi au lundi inclus (site d'origine, page L'écailler). 0 = dimanche.
export const ecaillerJours = [
  { jour: 4, nom: 'Jeudi', ouvert: true },
  { jour: 5, nom: 'Vendredi', ouvert: true },
  { jour: 6, nom: 'Samedi', ouvert: true },
  { jour: 0, nom: 'Dimanche', ouvert: true },
  { jour: 1, nom: 'Lundi', ouvert: true },
  { jour: 2, nom: 'Mardi', ouvert: false },
  { jour: 3, nom: 'Mercredi', ouvert: false },
];

// Prix : « 20.00 » → « 20 € », « 19.20 » → « 19,20 € » (espace insécable avant €).
export const euro = (v: string) => {
  const n = Number(v);
  if (Number.isNaN(n)) return v;
  return `${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')} €`;
};

export type Plat = { nom: string; description: string | null; prix: string; placeholder: boolean };
export type Categorie = { categorie: string; plats: Plat[] };
const carte = carteBrute as Categorie[];
const cat = (nom: string) => carte.find((c) => c.categorie === nom)!;

// La carte (route /la-carte/) : ordre du site d'origine. Les ancres gardent les noms de rubriques.
export const laCarte = [
  { id: 'entrees', titre: 'Les entrées', plats: cat('Les entrées').plats },
  { id: 'poissons', titre: 'Les poissons', plats: cat('Les plats : poissons').plats },
  { id: 'viandes', titre: 'Les viandes', plats: cat('Les plats : viandes').plats },
  { id: 'pates', titre: 'Les pâtes fraîches', plats: cat('Pâtes fraîches').plats },
  { id: 'accompagnements', titre: 'Accompagnements et sauces', plats: cat('Accompagnements et sauces').plats },
  { id: 'enfants', titre: 'Pour les enfants', plats: cat('Pour les enfants').plats },
];

// L'écailler (route /lecailler/).
const huitres = cat("Banc d'écailler : huîtres");
export const ecailler = {
  huitres: huitres.plats.map((p) => {
    const [six, douze] = p.prix.split(' / ');
    return { nom: p.nom.replace(/^Les /, ''), six: euro(six), douze: euro(douze) };
  }),
  mer: cat("Banc d'écailler : produits de la mer").plats,
  plateaux: cat("Banc d'écailler : plateaux").plats.map((p) => {
    const m = p.nom.match(/^(.*) \((\d) pers\.\)$/);
    return { nom: m ? m[1] : p.nom, pers: m ? Number(m[2]) : 1, detail: p.description ?? '', prix: euro(p.prix) };
  }),
};

// Prix d'une ligne de carte : prix du jour en toutes lettres ; deux prix (1 pièce / 2 pièces) lus dans la description.
export const prixLigne = (p: Plat) => {
  if (p.prix === 'prix du jour') return { prix: 'Prix du jour', jour: true, detail: p.description };
  if (p.prix.includes(' / ')) {
    const [a, b] = p.prix.split(' / ');
    return { prix: `${euro(a)} · ${euro(b)}`, jour: false, detail: '1 pièce · 2 pièces' };
  }
  return { prix: euro(p.prix), jour: false, detail: p.description };
};

// Photos du client (public/photos, WebP produits par sharp). `l` = largeurs disponibles.
type PhotoInfo = { w: number; h: number; l: number[] };
export const photos = photosBrutes as Record<string, PhotoInfo>;
export const photo = (nom: string) => ({ nom, w: photos[nom].w, h: photos[nom].h, largeurs: photos[nom].l });

// Galerie (route /galerie/) : la légende dit ce que la photo montre (index.json du client).
export const galerie = [
  { nom: '07-salle-baies-vitrees', legende: 'La salle et ses baies vitrées sur la Meuse' },
  { nom: '05-terrasse-meuse', legende: 'La terrasse sous les parasols, face à la Meuse' },
  { nom: '01-huitres', legende: 'Huîtres sur glace, au banc d’écailler' },
  { nom: '08-salle-banquette', legende: 'Banquette de cuir fauve et tables de bois' },
  { nom: '23-service-sole', legende: 'La sole meunière, servie en salle' },
  { nom: '11-bar', legende: 'Le comptoir du bar' },
  { nom: '04-terrasse-couverte', legende: 'La terrasse couverte et chauffée' },
  { nom: '02-plat-tartare-saumon', legende: 'Tartare de saumon, crème au raifort' },
  { nom: '13-cave-a-vins', legende: 'Les casiers de la cave' },
  { nom: '09-salle-cuisine-ouverte', legende: 'La salle, vers la cuisine ouverte' },
  { nom: '24-chef-ecailler', legende: 'Saint-Jacques ouvertes à la commande' },
  { nom: '14-table-dressee', legende: 'Une table dressée, la cave au fond' },
  { nom: '17-facade-meuse', legende: 'La façade côté berges, au crépuscule' },
  { nom: '03-plat-viande', legende: 'Viande, croquettes et choux de Bruxelles' },
  { nom: '18-salle-banquette-longue', legende: 'La longue banquette jaune' },
  { nom: '12-bar-bouteilles', legende: 'Les bouteilles du bar' },
  { nom: '22-ceviche', legende: 'Poisson cru, huile verte' },
  { nom: '15-deco-hibou', legende: 'Le hibou lumineux de la salle' },
  { nom: '20-plat-boeuf', legende: 'Une pièce de bœuf dressée' },
  { nom: '16-deco-machine-a-ecrire', legende: 'La machine à écrire dans sa niche' },
  { nom: '21-plat-volaille-croquettes', legende: 'Volaille et croquettes' },
  { nom: '06-terrasse-meuse-portrait', legende: 'La terrasse, de haut' },
];

export const nav = [
  { href: 'reservation/', label: 'Réservation', page: 'reservation' },
  { href: 'cheque-cadeau/', label: 'Bon cadeau', page: 'cheque-cadeau' },
  { href: 'la-carte/', label: 'La carte', page: 'la-carte' },
  { href: 'lecailler/', label: 'L’écailler', page: 'lecailler' },
  { href: 'galerie/', label: 'Galerie', page: 'galerie' },
];
