// Données réelles : data/restaurants/pepite (donnees.json, dossier.md, site-actuel/page.html).
export const base = import.meta.env.BASE_URL;
export const resto = {
  nom: 'Pépite, cave à manger',
  court: 'Pépite',
  baseline: 'Cave à manger',
  adresse: { rue: 'Rue Notre-Dame', numero: '44', cp: '5000', ville: 'Namur' },
  geo: { lat: 50.4601105, lon: 4.8665145 },
  tel: '0476/620182',
  telHref: 'tel:+32476620182',
  email: 'catherine.mathieu@me.com',
  siteActuel: 'https://pepite-caveamanger.be',
  facebook: 'https://www.facebook.com/Pépite-cave-à-manger-248386248950963/',
  instagram: 'https://www.instagram.com/pepitecaveamanger/',
  reserver: 'https://reservations.tablebooker.com?lang=fr&source=website&restaurantId=50470946',
  commander: 'https://docs.google.com/forms/d/e/1FAIpQLSdulzGsY_sAu8MYyF1h2rYsvRugKUnyvZ0u4YQ-H8a0YmW0Sg/viewform',
  plan: 'https://www.google.be/maps/place/Rue+Notre+Dame+44,+5000+Namur/@50.4601105,4.8643258,17z/data=!3m1!4b1!4m5!3m4!1s0x47c199730e9bb7ed:0x596752212c624cf9!8m2!3d50.4601105!4d4.8665145',
};

// Menu affiché sur le site d'origine pour la semaine du 12 au 14 novembre 2026 (renouvelé : fréquence non écrite).
export const menu = {
  jours: 'du jeudi 12 au samedi 14 novembre',
  prix: '58 €',
  note: 'À déguster tel quel, ou à l’assiette selon vos envies.',
  verre: 'Vin au verre de 5,50 € à 12,50 €',
  plats: [
    { n: '1', titre: 'Les incontournables', detail: 'Sardines Papa Anzoi, caponata siciliana' },
    { n: '2', titre: 'Betterave, grenade, feta', detail: '' },
    { n: '3', titre: 'Potimarron rôti', detail: 'Noisettes et beurre noisette, câpres, sauge, parmesan' },
    { n: '4', titre: 'Poulet confit au fenouil et à la clémentine', detail: 'Grenailles à l’origan, ou version végétale' },
    { n: '5', titre: 'Pomme au four', detail: 'Glace spéculoos, toffee' },
  ],
  fromages: 'Assortiment de fromages, en supplément : 12 €',
  avis: 'Les entrées se partagent, chacun reçoit son plat et son dessert. Signalez vos intolérances ou allergies.',
};

export const selections = ['Chou', 'Chouchou', 'Chou Chéri'];

export const horaires = [
  { jour: 'Lundi', ferme: true },
  { jour: 'Mardi', ferme: true },
  { jour: 'Mercredi', ferme: true },
  { jour: 'Jeudi', boutique: '16 h 00', cave: '19 h 00' },
  { jour: 'Vendredi', boutique: '16 h 00', cave: '19 h 00' },
  { jour: 'Samedi', boutique: '10 h 30', cave: '19 h 00', note: 'Samedi midi et privatisation sur demande' },
  { jour: 'Dimanche', ferme: true },
];

// Extraits repris mot pour mot du site d'origine (section Press), à faire valider.
export const presse = [
  { media: 'Le Vif', date: '29 novembre 2022', texte: 'Trois soirs par mois, pépite vous sert un menu 100 % sans gaz ni électricité, à la lumière des bougies.' },
  { media: 'Juliette & Victor', date: '4 janvier 2018', texte: 'Gagnant du prix « POP of the year » du Gault & Millau 2018, le nouveau restaurant de Catherine Mathieu a réinvesti les murs de son ancien resto, Cuisinémoi.' },
  { media: 'Chef Magazine', date: 'janvier-février 2018', texte: 'Pépite, le vin en partage.' },
  { media: 'So Soir !', date: '30 septembre 2017', texte: 'Ici pas de menu, mais un tableau. Huit propositions à partager.' },
];
