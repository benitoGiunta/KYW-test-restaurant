// Photos du client (data/restaurants/incorrect/photos/). Crédit : « photos : INCORЯECT ».
// Alt d'après le champ `sujet` de photos/index.json : aucune personne ni aucun plat nommé sans preuve.
import salle from '../assets/photos/01-salle-cuisine-ouverte.jpg';
import four from '../assets/photos/02-pizza-four-gants.jpg';
import table from '../assets/photos/03-table-pizza-verte-bieres.jpg';

export const photos = {
  salle: { src: salle, alt: 'La salle : tables en bois, murs de briques et cuisine ouverte en arrière-plan.' },
  four: { src: four, alt: 'Une pizza à la croûte bien colorée sortant du four, tenue par des mains gantées de noir.' },
  table: { src: table, alt: 'Table en bois : une pizza aux herbes vertes, des verres de bière et une bouteille.' },
} as const;
export type CleePhoto = keyof typeof photos;
