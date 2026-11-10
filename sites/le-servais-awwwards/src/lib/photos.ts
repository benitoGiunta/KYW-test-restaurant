// Photos du client (data/restaurants/le-servais/photos/). Crédit : « Photos : Le Servais ».
// Alt d'après le champ `sujet` de photos/index.json : aucune personne ni aucun plat nommé sans preuve.
import comptoir from '../assets/photos/01-bar-comptoir.jpg';
import terrasse from '../assets/photos/02-terrasse-facade.jpg';
import spaghetti from '../assets/photos/03-plat-spaghetti-bolognaise.jpg';
import dejeuner from '../assets/photos/04-petit-dejeuner-cafe.jpg';
import verriere from '../assets/photos/05-salle-veranda.jpg';

export const photos = {
  comptoir: { src: comptoir, alt: 'Le comptoir du bar sous les tuyaux apparents et les suspensions, une barmaid au fond de la salle.' },
  terrasse: { src: terrasse, alt: 'Des clients attablés avec leurs verres sur la terrasse, devant la façade en pierre du bar.' },
  spaghetti: { src: spaghetti, alt: 'Une assiette de spaghetti sauce tomate siglée Le Servais, un verre de bière tenu à la main.' },
  dejeuner: { src: dejeuner, alt: 'Petit-déjeuner sur une table en marbre : café dans une tasse turquoise, jus d’orange, viennoiserie.' },
  verriere: { src: verriere, alt: 'Une salle vitrée couverte de plantes, deux fauteuils orange autour d’une petite table (photo illustrative).' },
} as const;
export type CleePhoto = keyof typeof photos;
