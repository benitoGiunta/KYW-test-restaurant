// Photos du client (data/restaurants/pizzeria-doria/photos/) et trois photos libres illustratives.
// Alt d'après le champ `sujet` de photos/index.json : aucun plat ni personne nommé sans preuve.
import coffres from '../assets/photos/01-salle-des-coffres.jpg';
import friture from '../assets/photos/02-plat-friture-poisson.jpg';
import roquette from '../assets/photos/03-plat-carpaccio-roquette.jpg';
import bouchons from '../assets/photos/04-decor-bouchons.jpg';
import coupe from '../assets/photos/07-stock-pizza-coupe.jpg';
import basilic from '../assets/photos/08-stock-pizza-basilic.jpg';
import pate from '../assets/photos/09-stock-pate.jpg';

export const photos = {
  coffres: { src: coffres, alt: 'La salle des coffres : des murs de casiers métalliques, deux tables en bois et des chaises noires sous un plafond de pierre.' },
  friture: { src: friture, alt: 'Une assiette de friture de calamars et de gambas avec des œufs durs et de la salade, posée sur un plan en inox.' },
  roquette: { src: roquette, alt: 'Une assiette de roquette, de tomates cerises et de copeaux de fromage, striée de crème de balsamique.' },
  bouchons: { src: bouchons, alt: 'Un cadre de bouchons de liège posé en losange sur un mur orangé.' },
  coupe: { src: coupe, alt: 'Illustration libre : un pizzaiolo coupe une pizza à la roulette, une seconde pizza au premier plan.', illustratif: true },
  basilic: { src: basilic, alt: 'Illustration libre : un cuisinier garnit une pizza de feuilles de basilic.', illustratif: true },
  pate: { src: pate, alt: 'Illustration libre : des mains pétrissent une pâte sur un plan fariné.', illustratif: true },
} as const;
export type CleePhoto = keyof typeof photos;
