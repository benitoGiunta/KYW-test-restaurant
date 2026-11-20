// Photos du client (data/restaurants/champs-elysees/photos/), servies par astro:assets.
// Crédit : « photos : Champs Élysées ». Alt : ce que montre la photo (champ `sujet` de photos/index.json).
import facade from '../assets/photos/01-facade.jpg';
import fenetre from '../assets/photos/02-salle-fenetre.jpg';
import banquette from '../assets/photos/03-salle-banquette.jpg';
import brique from '../assets/photos/04-salle-mur-brique.jpg';
import tables from '../assets/photos/05-salle-tables-dressees.jpg';
import lampe from '../assets/photos/06-salle-banquette-lampe.jpg';
import frites from '../assets/photos/07-plat-frites.jpg';
import casserole from '../assets/photos/08-casserole-vapeur.jpg';
import biere from '../assets/photos/09-biere-pression.jpg';
import spritz from '../assets/photos/10-spritz-terrasse.jpg';
import lecture from '../assets/photos/11-menu-lecture.jpg';
import menuTable from '../assets/photos/12-menu-table.jpg';
import logo from '../assets/photos/13-mascotte-bouteille.png';
import mascotte from '../assets/photos/14-mascotte-orange.png';

export const photos = {
  facade: { src: facade, alt: 'Façade blanche et bleu nuit de la brasserie, avec sa terrasse, avenue Albert Ier' },
  fenetre: { src: fenetre, alt: 'Salle avec banquette bleu-vert, lampes suspendues et grande baie vitrée' },
  banquette: { src: banquette, alt: 'Banquette capitonnée et boiseries blanches à médaillons verts' },
  brique: { src: brique, alt: 'Mur de briques sombres, miroir cerné de vert et tables dressées' },
  tables: { src: tables, alt: 'Tables dressées devant la banquette, verres et sets de table en cuir' },
  lampe: { src: lampe, alt: 'Banquette, table dressée et suspension globe' },
  frites: { src: frites, alt: 'Assiette de frites sous une sauce crémeuse aux champignons et aux câpres' },
  casserole: { src: casserole, alt: 'Casserole fumante, avec un verre de bière Chimay au premier plan' },
  biere: { src: biere, alt: 'Bière tirée à la pression dans un verre Chimay' },
  spritz: { src: spritz, alt: 'Spritz tenu à la main sur la terrasse, assiette au premier plan' },
  lecture: { src: lecture, alt: 'Cliente lisant la carte à la couverture « Menu »' },
  menuTable: { src: menuTable, alt: 'Carte et carte des vins posées sur la table' },
  logo: { src: logo, alt: 'Champs Élysées, bistro convivial' },
  mascotte: { src: mascotte, alt: 'Le serveur de la maison, dessin orange : un plateau et une bouteille levés' },
} as const;
export type CleePhoto = keyof typeof photos;
