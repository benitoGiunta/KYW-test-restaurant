// Photos du client (data/restaurants/wok-de-jin/photos/). Crédit : « Photos : Wok de Jin ».
// Alt d'après le champ `sujet` de photos/index.json. Les photos 10 et 11 (visages, droit à l'image à confirmer) ne sont pas utilisées.
import sashimi from '../assets/photos/06-sashimi-saumon.jpg';
import sushis from '../assets/photos/07-buffet-sushis-tapis.jpg';
import makis from '../assets/photos/08-makis-crevette.jpg';
import mer from '../assets/photos/04-buffet-fruits-de-mer.jpg';
import homards from '../assets/photos/05-buffet-homards-huitres.jpg';
import wokIngredients from '../assets/photos/09-buffet-wok-ingredients.jpg';
import wokChef from '../assets/photos/02-chef-wok-flamme.jpg';
import teppanyaki from '../assets/photos/03-chef-teppanyaki.jpg';
import desserts from '../assets/photos/01-desserts-macarons.jpg';
import salleRouge from '../assets/photos/12-salle-tables-rouges.jpg';
import salleLarge from '../assets/photos/13-salle-large.jpg';
import tableDressee from '../assets/photos/14-table-dressee.jpg';
import jeux from '../assets/photos/15-salle-de-jeux.jpg';
import salleBuffet from '../assets/photos/17-salle-buffet.jpg';
import reveillonDesserts from '../assets/photos/19-reveillon-desserts.jpg';
import reveillonSushis from '../assets/photos/22-reveillon-sushis.jpg';

export const photos = {
  sashimi: { src: sashimi, alt: 'Assiette de sashimi de saumon, avec salade et radis.' },
  sushis: { src: sushis, alt: 'Le tapis de sushis du buffet, plateaux de nigiris et de makis alignés.' },
  makis: { src: makis, alt: 'Makis et rolls à la crevette sur un plateau noir.' },
  mer: { src: mer, alt: 'Bacs de poissons et de fruits de mer frais au buffet.' },
  homards: { src: homards, alt: 'Homards et huîtres au buffet.' },
  wokIngredients: { src: wokIngredients, alt: 'Bacs de viandes et de légumes à composer pour le wok.' },
  wokChef: { src: wokChef, alt: 'Un cuisinier au wok, la flamme dans la poêle.' },
  teppanyaki: { src: teppanyaki, alt: 'Un cuisinier à la plaque de teppanyaki.' },
  desserts: { src: desserts, alt: 'Buffet de desserts : macarons, pâtisseries et chocolats.' },
  salleRouge: { src: salleRouge, alt: 'La salle, chaises rouges autour de tables rondes.' },
  salleLarge: { src: salleLarge, alt: 'Vue large de la salle, chaises rouges et décor chinois.' },
  tableDressee: { src: tableDressee, alt: 'Table dressée au premier plan, la salle rouge et noire derrière.' },
  jeux: { src: jeux, alt: 'La salle de jeux pour enfants.' },
  salleBuffet: { src: salleBuffet, alt: 'La salle et l’îlot du buffet.' },
  reveillonDesserts: { src: reveillonDesserts, alt: 'Desserts du buffet de réveillon.' },
  reveillonSushis: { src: reveillonSushis, alt: 'Plateaux de sushis du buffet de réveillon.' },
} as const;
export type CleePhoto = keyof typeof photos;
