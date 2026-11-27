// Contenu de La Bergerie de Lives. Source : data/restaurants/bergerie-lives/ (site-actuel, dossier.md, donnees.json).
// Rien d'inventé : ce qui manque est un slot `fill` (horaires d'accueil) ou absent. Requalification : maison d'hôtes et domaine de mariage, pas un restaurant.

export const resto = {
  nom: 'La Bergerie de Lives',
  baseline: 'Maison d’hôtes, salle de mariage et espace séminaire',
  domaine: 'Domaine de la Bergerie',
  tel: '+32 493 86 10 29',
  telHref: 'tel:+32493861029',
  email: 'labergeriedelives@gmail.com',
  adresse: { rue: 'Rue de Mosanville 100', cp: '5101', commune: 'Lives-sur-Meuse (Namur)' },
  siteActuel: 'https://www.bergerielives.be',
  reserverWix: 'https://www.bergerielives.be/reservations',
  mariageWix: 'https://www.bergerielives.be/mariage-et-location',
};

export const nav = [
  { label: 'Chambres', href: '#chambres', accueil: true },
  { label: 'Services', href: '#services', accueil: true },
  { label: 'Mariage et location', href: 'mariage-et-location/' },
  { label: 'Galerie', href: '#galerie', accueil: true },
  { label: 'Contact', href: '#contact', accueil: true },
];

// Photos du client : public/photos/<id>.webp (1600 px) et <id>-800.webp quand la source dépasse 900 px.
// Alt : ce que montre la photo (champ « sujet » de photos/index.json), sans nom propre ni lieu supposé.
export const photos = {
  facade: { id: '01-facade-domaine', w: 1600, h: 1066, w2: 800, alt: 'Façade en pierre du domaine, toits de tuiles, puits et pelouse' },
  veranda: { id: '03-veranda-tables-mariage', w: 1600, h: 1097, w2: 800, alt: 'Véranda aux tables dressées pour un mariage' },
  tableDressee: { id: '04-veranda-table-dressee', w: 1600, h: 1185, w2: 800, alt: 'Table dressée dans la véranda' },
  ceremonie: { id: '07-ceremonie-laique-jardin', w: 1600, h: 1059, w2: 800, alt: 'Cérémonie laïque dans le jardin' },
  sortie: { id: '09-sortie-ceremonie', w: 1600, h: 1147, w2: 800, alt: 'Sortie de cérémonie' },
  jardin: { id: '10-jardin-bancs', w: 1600, h: 1067, w2: 800, alt: 'Jardin et bancs' },
  tonneau: { id: '11-tonneau-fleurs', w: 1080, h: 1080, w2: 800, alt: 'Tonneau garni de fleurs' },
  piscine: { id: '12-piscine-sous-eau', w: 1600, h: 891, w2: 800, alt: 'La piscine vue sous l’eau' },
  chaises: { id: '13-chaises-mr-mrs', w: 1600, h: 1067, w2: 800, alt: 'Deux chaises « Mr » et « Mrs »' },
  couple: { id: '14-couple-serre-nb', w: 1600, h: 1067, w2: 800, alt: 'Couple serré l’un contre l’autre, photographie en noir et blanc' },
  tableFleurs: { id: '18-table-fleurs', w: 1600, h: 1067, w2: 800, alt: 'Table fleurie' },
  chambre: { id: '17-chambre-boisee', w: 960, h: 640, w2: 800, alt: 'Chambre aux boiseries' },
  mariees: { id: '22-mariees-arche', w: 1600, h: 2400, w2: 800, alt: 'Mariées sous une arche' },
  buffet: { id: '23-buffet-petits-fours', w: 1024, h: 768, w2: 800, alt: 'Buffet de petits fours' },
  saxo: { id: '25-saxophoniste', w: 1279, h: 2400, w2: 800, alt: 'Saxophoniste' },
  salon: { id: '05-veranda-salon', w: 1024, h: 768, w2: 800, alt: 'Salon de la véranda' },
} as const;

export const apropos = {
  phrase: 'Depuis 2017, nous vous accueillons au sein du Domaine de la Bergerie.',
  texte:
    'Nous vous proposons des chambres soignées avec un accès à la piscine, au sauna et au jacuzzi. Nous vous accueillons également pour l’un des plus beaux moments de votre vie, votre mariage.',
};

export const chambres = {
  // Le site d'origine dit « depuis plus de 3 ans » (daté) : phrase neutralisée, la date est dans « Depuis 2017 ».
  texte:
    'Nos chambres sont toutes équipées et bénéficient d’un accès à la piscine, au sauna et au jacuzzi présents sur place.',
  piscineJour: { titre: 'Journée piscine', prix: '20 €', unite: 'par personne', info: 'Infos et réservation au 0493 86 10 29' },
};

export const services = [
  { nom: 'Petit déjeuner', texte: 'Un petit déjeuner varié et bio vous est servi en chambre ou dans la salle du petit déjeuner.' },
  { nom: 'Wifi gratuit', texte: 'Toutes nos chambres bénéficient du wifi gratuit ainsi que d’une télévision.' },
  { nom: 'Mariage', texte: 'Nous vous proposons le domaine de façon exclusive pour l’un des plus beaux moments de votre vie.' },
  // Hallmark · reworded "Weelness" to "Bien-être" · faute de frappe du site d'origine
  { nom: 'Bien-être', texte: 'Toutes nos chambres bénéficient d’un accès au jacuzzi ainsi qu’au sauna extérieur tout au long de l’année.' },
  { nom: 'Piscine', texte: 'Piscine extérieure chauffée en saison, d’avril à octobre.' },
  { nom: 'Cuisine à disposition', texte: 'Pour plus de confort, nous vous proposons une cuisine partagée.' },
];

export const activites = [
  { nom: 'Visite des caves à vins', texte: 'Namur est riche en découvertes culinaires : venez découvrir les caves à vins dans les souterrains de Namur.', lien: { label: 'Visite de cave à vin', href: 'https://www.grafe.be/vins-grafe/fr/10260-loenotheque-grafe-lecocq.html' } },
  { nom: 'Sites culturels', texte: 'Venez découvrir la plus belle citadelle d’Europe, ainsi que de nombreux musées.', lien: { label: 'Citadelle de Namur', href: 'https://www.citadelle.namur.be/fr' }, lien2: [
    { label: 'Félicien Rops', href: 'https://www.museerops.be/' },
    { label: 'Tréma', href: 'https://www.museedesartsanciens.be/' },
  ] },
  { nom: 'Visite du marché', texte: 'Le marché de Namur a lieu tous les samedis.', lien: { label: 'Horaires des marchés', href: 'https://www.namur.be/fr/economie/commerce/marches' } },
  { nom: 'Loisirs', texte: 'Namur est une ville d’eau : kayak, bateau sans permis, paddle, mais aussi escalade, bowling, cinéma.' },
  { nom: 'Brocantes', texte: 'De nombreuses brocantes et expositions ont lieu dans les environs.' },
];

export const mariage = {
  titre: 'Votre mariage tout un weekend au domaine',
  lead: 'Nous privatisons le domaine le temps d’un weekend pour vous.',
  paragraphes: [
    'Depuis 2017, nous vous recevons chez nous pour le plus beau jour de votre vie. Et pourquoi ce beau jour ne serait-il pas un weekend complet ?',
    'À La Bergerie, nous trouvons que ce moment passe trop vite. Nous avons donc décidé de privatiser le domaine le temps d’un weekend pour vous.',
    'Pour plus d’informations, contactez-nous via le formulaire de contact ou programmez une visite avec le bouton « Réserver une visite ». Nous vous accueillons également pour vos autres événements privés et séminaires.',
  ],
  documents: [
    { nom: 'Tarifs et informations', texte: 'Tarifs et informations sur le site d’origine.', href: resto.mariageWix, label: 'Voir la page sur le site d’origine' },
    { nom: 'Calendrier mariage', texte: 'Les dates du domaine, sur le site d’origine.', href: resto.mariageWix, label: 'Voir la page sur le site d’origine' },
    { nom: 'Visite et informations événements', texte: 'Visite de 30 minutes.', href: 'reservations/#visite', label: 'Réserver une visite', interne: true },
  ],
};

export const seminaire = {
  titre: 'Un cadre d’exception pour vos réunions',
  paragraphes: [
    'Nous vous proposons différentes salles et formules en fonction de vos besoins.',
    'Nous avons tout ce qu’il vous faut pour vos séminaires et nous vous proposons plusieurs formules pour que votre événement soit une réussite.',
  ],
};
