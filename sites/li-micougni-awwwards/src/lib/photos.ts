// Photos du client (data/restaurants/li-micougni/photos/, redimensionnées à 1600 px). Crédit : « Photos : Li Micougni ».
// Alt d'après le champ `sujet` de photos/index.json : aucune personne ni aucun plat nommé sans preuve.
import salade from '../assets/photos/01-plat-salade-chevre.jpg';
import grill from '../assets/photos/02-grill-charbon.jpg';
import salle from '../assets/photos/03-salle.jpg';
import tables from '../assets/photos/04-salle-tables.jpg';
import fenetres from '../assets/photos/05-salle-fenetres.jpg';
import terrasse from '../assets/photos/06-terrasse.jpg';
import ardoise from '../assets/photos/07-ardoise-partage.jpg';
import ardoiseLogo from '../assets/photos/08-ardoise-logo.jpg';
import rouget from '../assets/photos/09-plat-rouget.jpg';
import viande from '../assets/photos/10-plat-viande.jpg';
import poisson from '../assets/photos/11-plat-poisson-creme.jpg';
import saumon from '../assets/photos/12-plat-saumon-fume.jpg';
import bol from '../assets/photos/13-plat-roast-beef.jpg';
import veloute from '../assets/photos/14-plat-veloute.jpg';
import service from '../assets/photos/15-salade-chevre-service.jpg';
import polaroids from '../assets/photos/16-polaroids.jpg';
import logo from '../assets/photos/17-logo.jpg';

export const photos = {
  salade: { src: salade, alt: 'Une salade au chèvre chaud dressée en cuisine, sur une assiette creuse blanche.' },
  grill: { src: grill, alt: 'Le grill au charbon de bois dans la cour : les flammes derrière la vitre, sous la hotte en inox.' },
  salle: { src: salle, alt: 'La salle vue en large : banquettes rouges, fauteuils bruns, tables en bois sous des suspensions.' },
  tables: { src: tables, alt: 'La salle, avec ses tables en bois et ses fauteuils bruns le long de la banquette rouge.' },
  fenetres: { src: fenetres, alt: 'La salle côté fenêtres, un bouquet de fleurs au premier plan et des tables dressées.' },
  terrasse: { src: terrasse, alt: 'La terrasse arrière dans la cour privée : une longue table dressée sous un grand parasol.' },
  ardoise: { src: ardoise, alt: 'Une ardoise de charcuteries et de fromages, avec raisin, olives et pain.' },
  ardoiseLogo: { src: ardoiseLogo, alt: 'Le logo Li Micougni gravé sur une ardoise, avec de la roquette et des olives au bord.' },
  rouget: { src: rouget, alt: 'Un rouget sur un lit de purée, sauce verte, carottes et légumes, dans une assiette creuse.' },
  viande: { src: viande, alt: 'Une viande nappée de sauce, purée de patate douce, carotte et endive, dans une assiette creuse.' },
  poisson: { src: poisson, alt: 'Un poisson en sauce crémeuse avec des pommes de terre grenaille, dans une assiette creuse.' },
  saumon: { src: saumon, alt: 'Du saumon fumé avec mascarpone et un gressin, sur une assiette beige.' },
  bol: { src: bol, alt: 'Un bol de viande en tranches sur une crème verte, avec du fromage frais.' },
  veloute: { src: veloute, alt: 'Un velouté garni de croûtons, d’un œuf et d’herbes, dans un bol blanc.' },
  service: { src: service, alt: 'Une salade au chèvre chaud, pommes et betterave, portée à l’assiette au service.' },
  polaroids: { src: polaroids, alt: 'Un tableau de photos instantanées au mur, devant un vase de fleurs.' },
  logo: { src: logo, alt: 'Le logo Li Micougni : un coq, un clocher et un pont, lettrage rouge brun sur fond orange.' },
} as const;
export type CleePhoto = keyof typeof photos;
