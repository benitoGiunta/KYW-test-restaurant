// Photos du client (data/restaurants/ferme-blanche-d-asie/photos/), recadrées sous le filigrane du photographe.
// Crédit : « Photos : La Ferme Blanche d'Asie ». Alt d'après le champ `sujet` de photos/index.json.
import principale from '../assets/photos/01-salle-principale.jpg';
import salon from '../assets/photos/02-coin-salon.jpg';
import longue from '../assets/photos/03-salle-longue.jpg';
import jardin from '../assets/photos/04-facade-jardin.jpg';
import terrasse from '../assets/photos/06-terrasse.jpg';
import poutres from '../assets/photos/08-salle-poutres.jpg';
import ronde from '../assets/photos/09-salle-ronde.jpg';
import table from '../assets/photos/10-table-ronde.jpg';
import cocotte from '../assets/photos/11-plat-cocotte.jpg';
import wok from '../assets/photos/12-wok-scampis.jpg';

export const photos = {
  principale: { src: principale, alt: 'Salle principale : tables dressées sous des lustres, chaises à dossier jaune.' },
  salon: { src: salon, alt: 'Coin salon avec canapés en cuir et fresque florale.' },
  longue: { src: longue, alt: 'Salle en longueur le long des baies vitrées, une longue tablée dressée.' },
  jardin: { src: jardin, alt: 'Le bâtiment vu du jardin, avec un kiosque en bois sur la pelouse.' },
  terrasse: { src: terrasse, alt: 'La terrasse sous parasols, bordée de bambous, devant le bâtiment blanc.' },
  poutres: { src: poutres, alt: 'Salle à poutres sombres, tables dressées avec verres.' },
  ronde: { src: ronde, alt: 'Salle avec une table ronde à plateau tournant, rideaux et lustre.' },
  table: { src: table, alt: 'Table ronde à plateau tournant, la salle à poutres voisine en arrière-plan.' },
  cocotte: { src: cocotte, alt: 'Une cocotte noire posée sur une planche, entourée d’herbes et de sauce.' },
  wok: { src: wok, alt: 'Un wok de crevettes sautées, la main du cuisinier au travail.' },
} as const;
export type CleePhoto = keyof typeof photos;
