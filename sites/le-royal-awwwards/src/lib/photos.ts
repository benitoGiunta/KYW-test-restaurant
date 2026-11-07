// Photos du client (data/restaurants/le-royal/photos/). Crédit : « photos : Le Royal Namur ».
// Alt d'après le champ `sujet` de photos/index.json : aucune personne ni aucun plat nommé sans preuve.
import bieres from '../assets/photos/01-bieres-chouffe.jpg';
import moules from '../assets/photos/02-moules-terrasse.jpg';
import cocktails from '../assets/photos/03-carte-cocktails.jpg';
import terrasse from '../assets/photos/04-terrasse-theatre.jpg';
import plats from '../assets/photos/05-plats-menu.jpg';
import vins from '../assets/photos/06-plat-vins.jpg';
import planche from '../assets/photos/07-planche-apero.jpg';
import facade from '../assets/photos/08-facade.jpg';

export const photos = {
  bieres: { src: bieres, alt: 'Cinq bouteilles de bière Chouffe alignées sur une table de terrasse.' },
  moules: { src: moules, alt: 'Table de terrasse : moules, frites, spaghetti et verres de vin.' },
  cocktails: { src: cocktails, alt: 'La carte du Royal et deux cocktails sur une table de terrasse, la façade du Théâtre derrière.' },
  terrasse: { src: terrasse, alt: 'La terrasse sous parasols noirs face au Théâtre de Namur, une ardoise annonce les moules jumbo à 20 €.' },
  plats: { src: plats, alt: 'Table dressée : salade de viande grillée, croquettes, plat de volaille et menu imprimé.' },
  vins: { src: vins, alt: 'Une assiette, des verres de vin blanc et rouge et un menu imprimé.' },
  planche: { src: planche, alt: 'Une planche de charcuterie et deux verres qui trinquent, la façade de la brasserie en arrière-plan.' },
  facade: { src: facade, alt: 'La façade en brique de la brasserie sur la place, sous un ciel bleu.' },
} as const;
export type CleePhoto = keyof typeof photos;
