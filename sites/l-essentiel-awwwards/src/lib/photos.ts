// Photos du client (data/restaurants/l-essentiel/photos/). Crédit : « Photos : L’Essentiel ».
// Alt d’après le champ `sujet` de photos/index.json : aucun plat ni personne nommé sans preuve.
import facade from '../assets/photos/01-facade-enseigne.jpg';
import rideaux from '../assets/photos/02-salle-rideaux.jpg';
import chaises from '../assets/photos/03-salle-brique-chaises.jpg';
import brique from '../assets/photos/04-salle-brique.jpg';
import arche from '../assets/photos/05-salle-arche.jpg';
import tulipes from '../assets/photos/06-salle-tulipes-persiennes.jpg';
import ronde from '../assets/photos/07-salle-table-ronde.jpg';
import dressee from '../assets/photos/08-table-dressee.jpg';
import petitGris from '../assets/photos/09-plat-petit-gris.jpg';
import poisson from '../assets/photos/10-plat-poisson.jpg';
import biche from '../assets/photos/11-plat-biche.jpg';
import entree from '../assets/photos/12-plat-entree.jpg';
import dessert from '../assets/photos/13-dessert.jpg';
import chambre1 from '../assets/photos/14-chambre-ardoise-ou-charme.jpg';
import chambre2 from '../assets/photos/16-chambre-bois-ancien.jpg';
import chambre3 from '../assets/photos/17-chambre-poutre-lampe.jpg';
import maison from '../assets/photos/18-maison-hotes-jardin.jpg';
import coin from '../assets/photos/19-coin-table-bois.jpg';

export const photos = {
  facade: { src: facade, alt: 'La façade en brique avec l’enseigne manuscrite dorée sur un panneau noir.' },
  rideaux: { src: rideaux, alt: 'Une salle claire : tables rondes dressées et rideaux blancs.' },
  chaises: { src: chaises, alt: 'Des chaises en bois et cuir devant un mur de brique, des tables dressées.' },
  brique: { src: brique, alt: 'Salle à manger au mur de brique et à la poutre apparente, chaises cannées.' },
  arche: { src: arche, alt: 'Une arche ouvre sur une salle aux persiennes et au marbre noir.' },
  tulipes: { src: tulipes, alt: 'Une table longue, des tulipes blanches et des persiennes.' },
  ronde: { src: ronde, alt: 'Une table ronde en bois, des chaises et des rideaux.' },
  dressee: { src: dressee, alt: 'Une table dressée : verres, serviettes et assiette.' },
  petitGris: { src: petitGris, alt: 'Un plat de petits gris, herbes et écume, sur fond sombre.' },
  poisson: { src: poisson, alt: 'Un plat de poisson, avec une fleur de bourrache.' },
  biche: { src: biche, alt: 'Un plat de viande rouge accompagné de garnitures.' },
  entree: { src: entree, alt: 'Une entrée : poisson, légumes, sauce brune et herbes.' },
  dessert: { src: dessert, alt: 'Un dessert : sphères vertes sur une assiette claire.' },
  chambre1: { src: chambre1, alt: 'Une chambre d’hôtes : lit, serviettes et bois ancien.' },
  chambre2: { src: chambre2, alt: 'Une chambre d’hôtes à la tête de lit en bois ancien éclairée.' },
  chambre3: { src: chambre3, alt: 'Une chambre d’hôtes sous une poutre apparente, un luminaire rond.' },
  maison: { src: maison, alt: 'La maison à colombages des chambres d’hôtes, son jardin et un ciel bleu.' },
  coin: { src: coin, alt: 'Un coin de salle en bois devant une fenêtre.' },
} as const;
export type CleePhoto = keyof typeof photos;
