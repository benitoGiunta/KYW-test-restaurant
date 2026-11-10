// Photos du client (data/restaurants/pepite/photos/), servies par astro:assets. Crédit : « photos : Pépite ».
// Alt d'après le champ `sujet` de photos/index.json. Le triptyque 06 est recadré en trois panneaux.
import cave from '../assets/photos/cave.jpg';
import vitrine from '../assets/photos/vitrine.jpg';
import bouteilles from '../assets/photos/bouteilles.jpg';
import couvert from '../assets/photos/couvert.jpg';
import tabouret from '../assets/photos/tabouret.jpg';
import service from '../assets/photos/service.jpg';
import dessert from '../assets/photos/dessert.jpg';
import bougie from '../assets/photos/bougie.jpg';

export const photos = {
  cave: { src: cave, alt: 'Une table dressée aux bougies sous la voûte en pierre de la cave, des casiers à bouteilles à gauche.' },
  vitrine: { src: vitrine, alt: 'Le logo « pépite, cave à manger » en vitrine, la salle et ses lumières floues derrière.' },
  bouteilles: { src: bouteilles, alt: 'Une rangée de bouteilles de vin, une personne floue derrière.' },
  couvert: { src: couvert, alt: 'Un couteau à manche de bois et une fourchette sur une serviette blanche, sur une table en bois.' },
  tabouret: { src: tabouret, alt: 'Un tabouret cuivré au premier plan, d’autres alignés derrière, la salle floue.' },
  service: { src: service, alt: 'Une personne tient une bouteille de vin dans la salle éclairée à la bougie.' },
  dessert: { src: dessert, alt: 'Un dessert dressé sur une assiette, garni de filaments rouges.' },
  bougie: { src: bougie, alt: 'Une bougie et un photophore sur une table, dans une lumière dorée.' },
} as const;
export type CleePhoto = keyof typeof photos;
