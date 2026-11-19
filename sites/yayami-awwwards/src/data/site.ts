// Yayami Sushi, variante awwwards « Deux pièces ». Source : data/restaurants/yayami/ (donnees.json, dossier.md, site officiel yayami.be au 2026-11-19).
// Hypothèses : aucune histoire, équipe, avis, réseaux ni e-mail dans le dossier : rien n'est inventé, ces blocs n'existent pas.
// Les 47 plats et 9 menus de carte.json viennent du site officiel (prix réels). Aucun `placeholder` n'est utilisé.
import carte from './carte.json';

export const site = {
  nom: 'Yayami Sushi',
  baseline: 'Japanese Sushi & take away',
  description: 'Yayami Sushi, restaurant japonais au 15 rue de Bruxelles à Namur : nigiri, maki, temaki, plats chauds, à emporter ou livrés à domicile, ouvert 7 jours sur 7.',
  typeCuisine: ['Sushi', 'Japonaise'],
  adresse: { rue: 'Rue de Bruxelles', numero: '15', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4652249, lon: 4.8631295 },
  telephone: '+3281343789',
  telephoneLisible: '081 34 37 89',
  telephoneHref: 'tel:+3281343789',
  commandeUrl: 'https://www.yayami.be/shop/',
  planUrl: 'https://www.openstreetmap.org/?mlat=50.4652249&mlon=4.8631295#map=18/50.4652249/4.8631295',
  credit: 'Photos : Yayami Sushi',
  livraison: { seuil: 30, codes: ['5000', '5001', '5002', '5003', '5004', '5020', '5100'] },
  emporterRemise: 10,
  paiements: ['Espèces à la livraison', 'Espèces à l’emporter', 'Bancontact', 'Maestro', 'MasterCard', 'Visa'],
};

export const services = [
  { cle: 'midi', libelle: 'De 12 h à 14 h', debut: '12:00', fin: '14:00' },
  { cle: 'soir', libelle: 'De 18 h à 22 h', debut: '18:00', fin: '22:00' },
] as const;
export const joursSchema = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export const categories = carte.categories;
export const menus = carte.menus;

/** Format français : 4,50 € (espace insécable). */
export const euro = (n: number) => `${n.toFixed(2).replace('.', ',')} €`;
/** Prix mini d'une catégorie, pour l'index de l'accueil. */
export const prixMini = (nom: string) => Math.min(...categories.find((c) => c.nom === nom)!.plats.map((p) => p.prix));
