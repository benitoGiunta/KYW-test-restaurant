// Photos du client (data/restaurants/sanga/photos/, origine : médias du site sanganamur.be). Crédit : « photos : Sanga ».
// Alt d'après le champ `sujet` de photos/index.json. Non utilisées : 05 (vue de dessus, fond blanc) et 06 (edamame),
// d'aspect banque d'images, origine à confirmer ; 07 (logo de 155 px).
import udon from '../assets/photos/01-udon-tempura.jpg';
import ramen from '../assets/photos/02-ramen-chashu-gyoza.jpg';
import gyoza from '../assets/photos/03-gyoza.jpg';
import teriyaki from '../assets/photos/04-teriyaki-don.jpg';

export const photos = {
  udon: { src: udon, alt: 'Un bol d’udon à damier bleu et blanc : crevettes tempura, algues, oignons verts et copeaux croustillants.' },
  ramen: { src: ramen, alt: 'Un ramen au chashu dans un bol noir, des gyoza et une louche en bois sur une table en bois sombre.' },
  gyoza: { src: gyoza, alt: 'Des gyoza grillés alignés sur un plat allongé, avec un bol de sauce et une feuille de salade.' },
  teriyaki: { src: teriyaki, alt: 'Un donburi de poulet sauce teriyaki sur un plateau laqué, avec une salade et des algues.' },
} as const;
export type CleePhoto = keyof typeof photos;
