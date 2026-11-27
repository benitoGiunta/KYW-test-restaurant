// Source : data/restaurants/mon-epi/donnees.json et dossier.md. Tout champ absent du dossier vaut null (rien n'est rendu) ou porte placeholder: true.
export const site = {
  nom: 'Monepi',
  enseigne: 'Monepi Boulangerie',
  baseline: 'Prendre le temps de faire de l’excellent pain artisanal',
  description: 'Boulangerie artisanale à Loyers, près de Namur : pains au levain bio cuits au four à bois, farines moulues sur meules de granit.',
  url: 'http://www.monepi.be',
  adresse: { rue: 'Rue Es Fays', numero: '43', cp: '5101', commune: 'Loyers (Namur)' },
  geo: { lat: 50.4527485, lon: 4.956183 },
  telephone: '+32 491 18 29 35',
  telephoneAffiche: '+32 491 18 29 35',
  email: null as string | null,
  facebook: 'https://www.facebook.com/Monepi.boulangerie',
  instagram: null as string | null,
  // Seul le vendredi est publié par monepi.be/contact ; le reste est à confirmer (placeholder).
  horaires: { vendredi: '9 h 00 à 18 h 00' },
  pointsDeVente: [
    { nom: 'Biomanie', lieu: 'Wanze' },
    { nom: 'Ferme de Graux', lieu: 'Fernelmont' },
    { nom: 'Bio&Co', lieu: 'Andenne' },
    { nom: 'L’épicerie d’Ernest', lieu: 'Thon' },
  ],
  farines: ['Blé demi-gris', 'Blé blanc', 'Épeautre demi-gris', 'Petit épeautre'],
  moulins: ['Moulin de Montigny', 'Moulin de Ferrière'],
  // Extraits de la section « Vos avis » de monepi.be, mot pour mot, à vérifier avec le client.
  avis: [
    { texte: 'Du pain fait à l’ancienne avec de bonnes farines et levain... Bravo... Ça devient rare dans notre beau pays...', auteur: 'Gaetan Gillet' },
    { texte: 'Boulangerie exceptionnelle ! Cuissons au feu de bois,farine moulue sur place,un lieux où on peut retrouver le goût et l authenticité du pain a l ancienne !', auteur: 'Brieuc Goddevrind' },
    { texte: 'Jolie petit atelier. Produit locaux avec du bon levain. Il produit sa propre farine ! Super !', auteur: 'Stacy Maëva' },
  ],
  presse: [
    { media: 'L’Avenir', titre: 'Des pains cuits au feu de bois', date: '28 mars 2016', url: 'https://lavenir.net/cnt/dmf20160328_00802732/des-pains-cuits-au-feu-de-bois' },
    { media: 'Le Vif Weekend', titre: 'Dirk Longin, boulanger à Loyers', date: null as string | null, url: 'https://weekend.levif.be/lifestyle/culinaire/dirk-longin-boulanger-a-loyers/article-normal-344851.html' },
  ],
  nav: [
    { href: '', label: 'Accueil' },
    { href: 'a-propos/', label: 'Monepi' },
    { href: 'produits/', label: 'Nos produits' },
    { href: 'galerie/', label: 'Galerie' },
    { href: 'contact/', label: 'Contact' },
  ],
};
