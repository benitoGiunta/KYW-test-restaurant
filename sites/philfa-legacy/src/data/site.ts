// Données PhilFa : data/restaurants/philfa/donnees.json (dossier de recherche du 20/11/2026). Rien d'inventé.
export const base = import.meta.env.BASE_URL;
export const u = (p: string) => `${base.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;
export const resto = {
  nom: 'PhilFa',
  adresse: { rue: 'Rue de Marchovelette', numero: '21/23', cp: '5000', ville: 'Namur' },
  geo: { lat: 50.4626126, lon: 4.8668955 },
  tel: '+3281226111', telAffiche: '+32 81 22 61 11',
  reservation: 'https://philfa.reservation.barestho.com/',
  bonCadeau: 'https://philfa.reservation.barestho.com/shopping/',
  facebook: 'https://www.facebook.com/RestaurantPhilFaNamur',
  instagram: 'https://www.instagram.com/philfa_restaurant',
  siteActuel: 'https://www.philfa.be/',
  cartePdf: 'https://de.cdn-website.com/f5e6e73c2a634caa83c9ceb49c29c65e/files/uploaded/CARTE+%281%29.pdf',
  momentPdf: 'https://de.cdn-website.com/f5e6e73c2a634caa83c9ceb49c29c65e/files/uploaded/MOMENT-dedf24cd.pdf',
  carteOsm: 'https://www.openstreetmap.org/?mlat=50.4626126&mlon=4.8668955#map=18/50.4626126/4.8668955',
};
export const horaires = [
  { jour: 'Lundi', ferme: true }, { jour: 'Mardi' }, { jour: 'Mercredi' }, { jour: 'Jeudi' }, { jour: 'Vendredi' }, { jour: 'Samedi' }, { jour: 'Dimanche', ferme: true },
].map((h) => ({ ...h, midi: h.ferme ? null : '12\u202fh à 14\u202fh\u202f30', soir: h.ferme ? null : '18\u202fh\u202f15 à 21\u202fh' }));
export const momentPrix = { deux: '35 €', trois: '41 €' };
export const moment = [
  { service: 'Entrée', choix: ['Saumon frais mariné, agrumes menthe, citron et bâtonnets de poireaux crus', 'Poêlée de champignons, beurre à l’ail, fines herbes, mini croque-monsieur, huile de truffe'] },
  { service: 'Plat', choix: ['Mijoté de blanc de volaille façon coq au vin, lardons et frites', 'Dos de loup de mer, choucroute nature, sauce dijonnaise, purée de pomme de terre aux herbes'] },
  { service: 'Dessert', choix: ['Glace au chocolat goût Nutella, crème battue', 'Sorbet banane, caramel et meringue d’amandes caramélisées'] },
];
export const carte = [
  { cat: 'À partager, à l’apéro ou en entrée', plats: [
    ['Charcuteries, fromages et rillettes', '17 € (2 pers.) ; 22 € (3 à 4 pers.)'],
    ['Assortiment de minis croquettes, 6 pièces', '18 €'], ['Scampis frits, sauce tartare', '20 €'], ['Foie gras et ses toasts briochés', '27 €'],
    ['Croquettes au fromage, 2 pièces', '18 €'], ['Croquettes aux crevettes, 2 pièces', '23 €'],
    ['Potatoes assaisonnés aux épices du monde, non piquant', '11 €'], ['Mini croques-monsieur, jambon, fromage, huile de truffe, 2 à 4 pers.', '22 €'],
    ['Cuisses de grenouille, beurre à l’ail et fines herbes', '21,50 € en entrée ; 26 € en plat'] ] },
  { cat: 'Salades', plats: [['Salade de foie gras, magret fumé et canard confit, coulis de mangue', '27 €'], ['Salade, saint-jacques et sauce balsamique', '28 €']] },
  { cat: 'Poissons', plats: [['Solettes meunières, frites, salade mixte', '30 €'], ['Saint-jacques sauce bisque et petits légumes, riz basmati', '30 €'], ['Feuilleté de scampis, riz basmati, safran, poêlée de légumes', '27 €']] },
  { cat: 'Viandes', plats: [
    ['Tartare de bœuf coupé au couteau, salade et frites', '25 €'], ['Boulettes sauce tomate et chorizo, frites', '22,50 €'],
    ['Aloyau irlandais de bœuf tranché, sauce, poivre, roquette et parmesan', '29 €'], ['Civet de marcassin, pomme aux airelles et gratin dauphinois', '30 €'],
    ['Filet de biche sauce grand veneur, chou vert, champignons, pomme aux airelles, croquettes', '39 €'],
    ['Filet pur bœuf de Limousin, beurre de ferme, ail, échalotes confites, chicons braisés, frites', '37 €'],
    ['Parmentier de canard confit, magret fumé et chou vert crémé', '29 €'] ] },
  { cat: 'Végétarien', plats: [['Ravioles aux cèpes, crème au pesto et parmesan', '26 €']] },
  { cat: 'Pour les bambins, jusqu’à 12 ans', plats: [['Boulette sauce tomate et frites', '12,50 €'], ['Petit steak de bœuf, salade, frites, mayo ou ketchup', '19 €']] },
];
