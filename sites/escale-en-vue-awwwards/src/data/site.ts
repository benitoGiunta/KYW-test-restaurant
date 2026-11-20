// Données de Escale en Vue ! (variante awwwards). Source : data/restaurants/escale-en-vue/ (donnees.json, dossier.md).
// Hypothèses : aucune carte ni prix publiés (prix null, jamais inventés) ; histoire et équipe inconnues (non rendues
// au-delà du titulaire BCE) ; saison 2026 terminée, dates de reprise inconnues ; GPS « à confirmer » (plan en lien externe) ;
// parking gratuit « à confirmer » (Tripadvisor via recherche). Aucun avis rendu (notes tierces non vérifiées).
export const site = {
  nom: 'Escale en Vue !',
  nomCourt: 'Escale en Vue',
  description: 'Terrasse et restaurant saisonniers à Dave, au-dessus de la vallée de la Meuse : petites assiettes locales, bières régionales et trappistes, tables dehors.',
  baseline: 'Terrasse et restaurant saisonniers',
  typeCuisine: 'Petites assiettes saisonnières, apéro planchette',
  adresse: { rue: 'Rue de la Rêche-Terre', numero: '21', cp: '5100', commune: 'Dave (Namur)', localite: 'Dave', pays: 'BE' },
  geo: { lat: 50.413908, lon: 4.89467 },
  telephoneLisible: '0493 46 79 71',
  telephoneHref: 'tel:+32493467971',
  telephoneIntl: '+32493467971',
  email: 'info@escale-en-vue.be',
  siteClient: 'https://www.escale-en-vue.be',
  facebook: 'https://facebook.com/escale.en.vue/',
  instagram: 'https://www.instagram.com/escale_en_vue/',
  planUrl: 'https://www.openstreetmap.org/?mlat=50.413908&mlon=4.89467#map=17/50.413908/4.89467',
  reservationUrl: null as string | null, // pas d'outil en ligne : réservation par téléphone (plat maison)
  saison: 'Saison 2026 du 19 juin au 6 septembre, terminée',
  credit: 'Photos : Escale en Vue !',
  carteBancaire: true,
} as const;

export const reseaux = [
  { nom: 'Facebook', url: site.facebook },
  { nom: 'Instagram', url: site.instagram },
];

// Horaires 2026 (affiche du site client). `jour` complet ; `debut`/`fin` en 24 h.
export const horaires = [
  { jour: 'Lundi', ouvert: false }, { jour: 'Mardi', ouvert: false }, { jour: 'Mercredi', ouvert: false },
  { jour: 'Jeudi', ouvert: true, debut: '17:30', fin: '20:30' },
  { jour: 'Vendredi', ouvert: true, debut: '17:30', fin: '21:30' },
  { jour: 'Samedi', ouvert: true, debut: '11:30', fin: '21:30' },
  { jour: 'Dimanche', ouvert: true, debut: '11:30', fin: '17:00' },
] as const;
export const hm = (t: string) => t.replace(':', ' h ').replace(/ $/, '').replace('h 00', 'h');
export const schemaJours: Record<string, string> = { Jeudi: 'Thursday', Vendredi: 'Friday', Samedi: 'Saturday', Dimanche: 'Sunday' };

export interface Plat { nom: string; description: string; prix: number | null; placeholder?: boolean; photo?: string }
export interface Categorie { id: string; titre: string; note?: string; plats: Plat[] }
// Offre mentionnée par le client (pas de carte publiée) : aucun prix, aucun plat inventé.
export const carte: Categorie[] = [
  { id: 'table', titre: 'À poser sur la table', plats: [
    { nom: 'Apéro planchette', description: 'Du jeudi soir au dimanche midi.', prix: null, photo: 'planchette' },
    { nom: 'Plat du jour maison', description: 'Sur réservation à partir du vendredi soir. Parmigiana, tagliatelles fraîches, filet de poulet mariné, selon les posts de la saison 2026.', prix: null, photo: 'bol' },
    { nom: 'Variante végé', description: 'Une alternative végétarienne accompagne toujours les plats.', prix: null },
  ] },
  { id: 'verre', titre: 'À boire', plats: [
    { nom: 'Bières trappistes', description: 'Achel, Chimay, Gregorius, La Trappe, Orval, Rochefort, Westmalle, d’après la photo de la maison (liste exacte à confirmer).', prix: null, photo: 'trappistes' },
    { nom: 'Bières régionales', description: 'Une place faite aux brasseurs de la région.', prix: null },
    { nom: 'Softs de qualité', description: 'Mentionnés par la maison, sans détail.', prix: null },
  ] },
];

export const equipe = [{ nom: 'Olivier Evrard', role: 'Titulaire de l’établissement' }];

export const histoire = [
  'Escale en Vue ! est une terrasse et un restaurant saisonniers posés sur la colline de Dave, au-dessus de la vallée.',
  'Toutes les tables sont dehors. On y vient du jeudi soir au dimanche après-midi, le temps d’une saison courte.',
  'La cuisine se veut fraîche, créative, familiale et locale, avec des produits d’artisans et d’une coopérative de paysans-artisans, et des tomates et aubergines du jardin pour la parmigiana de fin d’été.',
];

export const pratique = [
  { titre: 'Tables', texte: 'Tables en extérieur uniquement.' },
  { titre: 'Paiement', texte: 'Carte bancaire acceptée.' },
  { titre: 'Parking', texte: 'Parking gratuit, à confirmer.' },
  { titre: 'Végétarien', texte: 'Une alternative végé est prévue à chaque plat.' },
];
