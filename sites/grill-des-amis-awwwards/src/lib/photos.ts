// Photos du client (data/restaurants/grill-des-amis/photos/), alt d'après le champ `sujet` de photos/index.json.
import plat from '../assets/photos/01-plat-viande-verre-vin.jpg';
import entrecote from '../assets/photos/02-plat-entrecote-sauce.jpg';
import salle from '../assets/photos/03-salle-vue-comptoir.jpg';
import buches from '../assets/photos/04-salle-mur-buches.jpg';
import terrasse from '../assets/photos/05-terrasse-chaises.jpg';
import table from '../assets/photos/06-table-verres-rouge.jpg';
import grill from '../assets/photos/07-grill-pince-flammes.jpg';
import decoupe from '../assets/photos/08-decoupe-cote-os.jpg';
import tranchee from '../assets/photos/09-viande-tranchee-puree.jpg';
import braise from '../assets/photos/11-braise-feu-de-bois.jpg';
import chambre from '../assets/photos/12-chambre-maturation.jpg';
import cocktail from '../assets/photos/13-cocktail-pornstar.jpg';
import equipe from '../assets/photos/15-patrons-tabliers.jpg';
import cocktails from '../assets/photos/17-cocktails-trois.jpg';
export const photos = {
  plat: { src: plat, alt: 'Assiette de viande grillée, croquettes et légumes, avec deux verres de vin rouge.' },
  entrecote: { src: entrecote, alt: 'Pièce de viande grillée, sauce dans une petite casserole, purée et champignons sur un plateau.' },
  salle: { src: salle, alt: 'Verres à vin suspendus et lampes rouges au plafond de la salle, baie vitrée au fond.' },
  buches: { src: buches, alt: 'Une table devant un mur de bûches empilées, dans la salle du restaurant.' },
  terrasse: { src: terrasse, alt: 'La terrasse devant le restaurant, chaises colorées autour des tables.' },
  table: { src: table, alt: 'Table dressée : verres de vin, plats à partager et bougies rouges.' },
  grill: { src: grill, alt: 'Une pièce de viande saisie à la pince au-dessus du feu de bois.' },
  decoupe: { src: decoupe, alt: 'Découpe d’une côte à l’os avec une scie à main.' },
  tranchee: { src: tranchee, alt: 'Viande rouge tranchée sur un plat, purée orange à côté.' },
  braise: { src: braise, alt: 'Une pièce de viande sur la grille, flammes du feu de bois.' },
  chambre: { src: chambre, alt: 'Deux armoires de maturation éclairées en bleu, pièces de viande visibles.' },
  cocktail: { src: cocktail, alt: 'Un cocktail à la mousse dans une coupe, sur un fond de bois.' },
  equipe: { src: equipe, alt: 'Deux personnes en tablier devant le mur d’ardoise de la salle.' },
  cocktails: { src: cocktails, alt: 'Trois cocktails colorés sur un comptoir en lattes de bois.' },
} as const;
export type CleePhoto = keyof typeof photos;
