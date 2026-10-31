// Données de L'Atelier de Bossimé, reprises de data/restaurants/atelier-de-bossime/{dossier.md, donnees.json}
// et du HTML sauvegardé du site d'origine (atelier-de-bossime.be, 31/10/2026). Rien n'est inventé ici.
// Espaces insécables :   avant « : », « ; », « ! », « ? » et « € ».
const n = ' ';

export const resto = {
  nom: 'L’Atelier de Bossimé',
  court: 'Bossimé',
  adresse: { rue: 'Rue Bossimé 2B', ville: '5101 Loyers (Namur)' },
  telAffiche: `+32${n}478${n}13${n}71${n}25`,
  telHref: 'tel:+32478137125',
  email: 'info@bossime.be',
  // Le module Zenchef du site d'origine (page réservation, iframe) : même rid, même URL.
  // primaryColor : l'outremer du site (--color-accent) au lieu du noir d'origine (revue 1, R1-05) ; rid inchangé.
  zenchef: 'https://bookings.zenchef.com/results?rid=367643&lang=fr&primaryColor=2942ab',
  facebook: 'https://www.facebook.com/atelierdebossime/',
  plan: 'https://www.openstreetmap.org/?mlat=50.4548436&mlon=4.9317527#map=16/50.4548436/4.9317527',
  michelin: 'https://guide.michelin.com/be/fr/namur/loyers/restaurant/atelier-de-bossime',
  tva: `BE${n}0552.992.842`,
  rpm: `RPM${n}Namur${n}0552${n}992${n}842`,
  // Pages du site d'origine que cette maquette ne refait pas : liées telles quelles (câblage conservé).
  enLigne: {
    cheque: 'https://www.atelier-de-bossime.be/page/cheque-cadeau-bon-voucher-restaurant-gastronomique-namur.html',
    salles: 'https://www.atelier-de-bossime.be/categorie/location-salles-projet-durable-evenement-entreprise-team-building-namur.html',
    agenda: 'https://www.atelier-de-bossime.be/categorie/aganda-bossime.html',
    news: 'https://www.atelier-de-bossime.be/categorie/nos-dernieres-news.html',
    jobs: 'https://www.atelier-de-bossime.be/categorie/jobs.html',
  },
};

// Les routes conservées (slugs raccourcis des pages E-net d'origine, voir DESIGN.md § Approche).
export const nav = [
  { href: 'notre-cuisine/', label: 'Notre cuisine', page: 'notre-cuisine' },
  { href: 'notre-carte/', label: 'Notre carte', page: 'notre-carte' },
  { href: 'contactez-nous/', label: 'Contactez-nous', page: 'contactez-nous' },
];

// Horaires : pages carte, réservation et contact du site d'origine (« à partir de 12h », « à partir de 19h »,
// « Fermé dimanche »). L'heure de fermeture n'est pas sur le site (Michelin seul la donne) : non affichée.
// `jour` suit Date.getDay() (0 = dimanche).
export const horaires = [
  { nom: 'Lundi', jour: 1, midi: true, soir: true },
  { nom: 'Mardi', jour: 2, midi: true, soir: true },
  { nom: 'Mercredi', jour: 3, midi: true, soir: true },
  { nom: 'Jeudi', jour: 4, midi: true, soir: true },
  { nom: 'Vendredi', jour: 5, midi: true, soir: true },
  { nom: 'Samedi', jour: 6, midi: false, soir: true },
  { nom: 'Dimanche', jour: 0, midi: false, soir: false },
];

// La carte (page « Notre carte », onglets du site d'origine ; les `id` reprennent les ancres des onglets).
export const formules = [
  {
    id: 'onglet_lunch-42-52-47',
    nom: 'Lunch',
    quand: 'Du lundi au vendredi midi',
    // La source dit « sélectionner trois plats » aussi pour 2 services : le nombre n'est pas repris (revue 1, R1-03, à confirmer).
    texte: 'Accueil, puis les plats choisis sur le livret, ou la surprise. Servi en 60 minutes sur demande.',
    prix: [`2 services${n}: 42${n}€`, `3 services${n}: 52${n}€`],
    accord: `Un verre de vin${n}: 12${n}€`,
    sansAlcool: `10${n}€`,
  },
  {
    id: 'onglet_menu-3-moments-68-26',
    nom: 'Menu 3 Moments',
    quand: 'Midi et soir, sauf vendredi et samedi soir',
    texte: 'Accueil et mise en bouche, trois plats choisis sur le livret, ou la surprise.',
    prix: [`68${n}€`],
    accord: `Accord mets et vins${n}: 22${n}€`,
    sansAlcool: `20${n}€`,
  },
  {
    id: 'onglet_menu-4-moments-80-27',
    nom: 'Menu 4 Moments',
    quand: 'Midi et soir',
    texte: 'Accueil et mise en bouche, quatre plats choisis sur le livret, ou la surprise.',
    prix: [`80${n}€`],
    accord: `Accord mets et vins${n}: 32${n}€`,
    sansAlcool: `27${n}€`,
  },
  {
    id: 'onglet_menu-5-moments-92-28',
    nom: 'Menu 5 Moments',
    quand: 'Midi et soir',
    texte: 'Accueil et mise en bouche, cinq plats choisis sur le livret, ou la surprise.',
    prix: [`92${n}€`],
    accord: `Accord mets et vins${n}: 40${n}€`,
    sansAlcool: `34${n}€`,
  },
  {
    id: 'onglet_menu-7-moments-130-46',
    nom: 'Menu 7 Moments',
    quand: 'Sur pré-réservation, deux jours avant',
    texte: `Carte blanche au chef${n}: accueil, mise en bouche puis une suite de créations au rythme des saisons.`,
    prix: [`130${n}€`],
    accord: `Accord mets et vins${n}: 58${n}€`,
    sansAlcool: `46${n}€`,
  },
  {
    id: 'onglet_menu-jeune-gastronome-45',
    nom: 'Menu jeune gastronome',
    quand: 'Jusqu’à 14 ans',
    texte: 'Une version des plats adaptée par nos chefs pour les jeunes.',
    prix: [`39${n}€`],
    accord: null,
    sansAlcool: null,
  },
];

export const fromages = `Chariot de fromages affinés belges, confits, fruits secs et pain maison${n}: 16${n}€, en option sur le lunch et les menus 3, 4 et 5 Moments.`;

export const boissons = [
  { nom: 'Apéritif au verre', prix: `16${n}€` },
  { nom: 'Vin au verre', prix: `12${n}€` },
  { nom: 'Bière artisanale', prix: `6${n}€` },
  // Libellé du site d'origine « Eau l : 12 € » : le volume n'est pas lisible (à confirmer, voir RAPPORT.md).
  { nom: 'Eau', prix: `12${n}€`, note: 'volume à confirmer', placeholder: true },
  { nom: 'Café ou thé', prix: `4${n}€` },
  { nom: 'Carte des vins', prix: `de 44 à 160${n}€` },
];
