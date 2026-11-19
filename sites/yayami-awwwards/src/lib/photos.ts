// Photos du client (data/restaurants/yayami/photos/), crédit « Photos : Yayami Sushi ». Alt d'après le champ `sujet` de index.json.
import nigiri from '../assets/photos/23-nigiri-saumon-noir.jpg';
import california from '../assets/photos/18-california-roll-noir.jpg';
import assortiment from '../assets/photos/19-maki-assortiment-noir.jpg';
import gyoza from '../assets/photos/21-gyoza-noir.jpg';
import wakame from '../assets/photos/17-salade-wakame.jpg';
import asahi from '../assets/photos/22-biere-asahi.jpg';
import ramune from '../assets/photos/20-ramune.jpg';
import chirashi from '../assets/photos/02-chirashi-bowl.jpg';
import matsu from '../assets/photos/03-menu-matsu.jpg';
import udon from '../assets/photos/10-udon-poulet.jpg';
import tempura from '../assets/photos/14-tempura-crevettes.jpg';
import rond from '../assets/photos/08-plateau-rond.jpg';

export const photos = {
  nigiri: { src: nigiri, alt: 'Un nigiri au saumon posé sur son riz, reflété sur un fond noir.' },
  california: { src: california, alt: 'Deux California rolls au sésame sur fond noir, graines de sésame éparpillées.' },
  assortiment: { src: assortiment, alt: 'Assortiment de maki et California rolls alignés sur fond noir.' },
  gyoza: { src: gyoza, alt: 'Gyoza grillés posés sur une feuille de salade, fond noir.' },
  wakame: { src: wakame, alt: 'Salade d’algues wakame dans un bol, avec une sauce et un quartier de citron.' },
  asahi: { src: asahi, alt: 'Une bouteille de bière Asahi à côté d’un verre rempli.' },
  ramune: { src: ramune, alt: 'Une bouteille de limonade japonaise Ramune.' },
  chirashi: { src: chirashi, alt: 'Chirashi bowl : riz au sésame, crevettes, avocat, sashimi, omelette et wasabi.' },
  matsu: { src: matsu, alt: 'Plateau du Menu Matsu : nigiri au saumon et à l’anguille, maki au saumon, wasabi et gingembre.' },
  udon: { src: udon, alt: 'Nouilles udon sautées au poulet, parsemées de sésame.' },
  tempura: { src: tempura, alt: 'Crevettes en tempura dans un panier rouge, avec une sauce soja.' },
  rond: { src: rond, alt: 'Grand plateau rond de maki, California rolls, nigiri et temaki.' },
} as const;
export type CleePhoto = keyof typeof photos;
