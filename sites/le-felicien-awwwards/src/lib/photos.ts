// Photo et illustration du client (data/restaurants/le-felicien/photos/). Alt d'après le champ `sujet` de photos/index.json.
import plat from '../assets/photos/01-plat-pates-brasserie.jpg';
import couverture from '../assets/photos/04-illustration-couverture-carte.jpg';
export const photos = {
  plat: { src: plat, alt: 'Une assiette de pâtes et de légumes posée sur un comptoir, l’arrière-plan flou.' },
  couverture: { src: couverture, alt: 'Illustration dessinée de la salle : lustre à facettes, casiers à bouteilles, tonneaux, comptoir et escalier, dans des verts de crayon.' },
} as const;
export type CleePhoto = keyof typeof photos;
