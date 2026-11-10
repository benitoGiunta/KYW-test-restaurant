// Photos du restaurant (data/restaurants/le-ponti-2/photos/). Crédit : « Photos : Le Ponti 2 ».
// Alt d'après le champ `sujet` de photos/index.json.
import facade from '../assets/photos/01-facade-nuit.jpg';
import escalopes from '../assets/photos/02-escalopes.jpg';
import pizza from '../assets/photos/04-pizza-maison.jpg';
import pates from '../assets/photos/05-trio-pates.jpg';

export const photos = {
  facade: { src: facade, alt: 'La façade de nuit : enseigne lumineuse « Le Ponti 2 Restaurant » sur la rue.' },
  escalopes: { src: escalopes, alt: 'Une escalope gratinée sur une assiette bleue, d’autres plats en préparation derrière.' },
  pizza: { src: pizza, alt: 'Une pizza à la roquette et aux copeaux de parmesan, posée sur une assiette blanche.' },
  pates: { src: pates, alt: 'Assiettes de pâtes à la tomate, au pesto et aux scampis, avec des verres et une bouteille de vin.' },
} as const;
export type CleePhoto = keyof typeof photos;
