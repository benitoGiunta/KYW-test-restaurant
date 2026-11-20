// Données réelles : data/restaurants/escale-en-vue/ (dossier.md, donnees.json, site-actuel/). Rien d'inventé ; null = non rendu.
export const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const u = (p = '') => base + p.replace(/^\//, '');
const nb = ' ';

export const resto = {
  nom: `Escale en Vue${nb}!`,
  baseline: 'Terrasse et restaurant saisonniers, cuisine fraîcheur créative, familiale et locale',
  adresse: { rue: 'Rue de la Rêche-Terre 21', cp: '5100', ville: 'Dave (Namur)' },
  geo: { lat: 50.413908, lon: 4.89467 },
  tel: '0493 46 79 71',
  telHref: 'tel:+32493467971',
  mail: 'info@escale-en-vue.be',
  facebook: 'https://facebook.com/escale.en.vue/',
  instagram: 'https://www.instagram.com/escale_en_vue/',
  carte: 'https://maps.app.goo.gl/ZLBSuP111Ss6wFLc9',
  siteActuel: 'https://www.escale-en-vue.be',
};

export const saison = { debut: '2026-06-19', fin: '2026-09-06', texte: `Saison 2026${nb}: du 19 juin au 6 septembre`, statut: 'terminée' };

// Affiche d'horaires 2026 (site-actuel/horaires-2026.jpg). Lundi à mercredi fermés.
export const jours = [
  { jour: 'Jeudi', ouvert: true, de: '17 h 30', a: '20 h 30', note: 'Le soir' },
  { jour: 'Vendredi', ouvert: true, de: '17 h 30', a: '21 h 30', note: 'Le soir' },
  { jour: 'Samedi', ouvert: true, de: '11 h 30', a: '21 h 30', note: 'Midi et soir' },
  { jour: 'Dimanche', ouvert: true, de: '11 h 30', a: '17 h 00', note: 'Midi et après-midi' },
  { jour: 'Lundi', ouvert: false },
  { jour: 'Mardi', ouvert: false },
  { jour: 'Mercredi', ouvert: false },
];

// Carte : aucun prix publié, aucun n'est affiché. Plats du jour cités par les posts Facebook du client.
export const carte = [
  { titre: 'Apéro planchette', detail: 'À partager sur la terrasse, avec une vue sur la vallée.', quand: 'Du jeudi soir au dimanche midi' },
  { titre: 'Plat du jour maison', detail: 'Parmigiana, tagliatelles fraîches, filet de poulet mariné. Une variante végé est prévue.', quand: 'Sur réservation, dès le vendredi soir' },
  { titre: 'Bières régionales et trappistes', detail: 'Achel, Chimay, Orval, Rochefort, Westmalle et d’autres.', quand: null },
  { titre: 'Softs de qualité', detail: 'Pour accompagner l’apéro et le repas.', quand: null },
];

export const photos = {
  planchette: { src: 'photos/planchette.webp', w: 1152, h: 1536, alt: 'Planchette apéro et verre de jus sur une table de terrasse, la vallée en fond' },
  trappistes: { src: 'photos/trappistes.webp', w: 1024, h: 575, alt: 'Huit bouteilles de bières trappistes alignées sur une table' },
  murPierre: { src: 'photos/mur-pierre.webp', w: 1080, h: 1620, alt: 'Chaises de terrasse sur le gravier devant un mur de pierre portant l’affiche du restaurant' },
  transats: { src: 'photos/transats.webp', w: 1279, h: 720, alt: 'Prairie clôturée avec des transats jaunes, une colline au fond' },
  logo: { src: 'photos/logo.webp', w: 512, h: 512, alt: 'Logo d’Escale en Vue : une maison dessinée au trait, un arbre et deux silhouettes' },
};
