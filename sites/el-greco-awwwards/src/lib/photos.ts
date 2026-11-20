// Photos d'illustration de stock (Pexels), copiées de data/restaurants/el-greco/photos/. Le dossier n'a aucune photo du restaurant.
// Non utilisée : 05-logo.png (logo manuscrit bleu marine, 489 px) servi seulement en petit sur fond clair.
import clocher from '../assets/photos/01-stock-clocher-cyclades.jpg';
import terrasses from '../assets/photos/02-stock-santorin-terrasses.jpg';
import coupole from '../assets/photos/03-stock-eglise-coupole-bleue.jpg';
import logo from '../assets/photos/05-logo.png';
import { photosInfo } from '../data/site';

export const photos = {
  clocher: { src: clocher, alt: photosInfo.clocher.alt },
  terrasses: { src: terrasses, alt: photosInfo.terrasses.alt },
  coupole: { src: coupole, alt: photosInfo.coupole.alt },
  logo: { src: logo, alt: 'Logo manuscrit El Greco, bleu marine.' },
};
export type CleePhoto = keyof typeof photos;
