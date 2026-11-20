// Photos du client (data/restaurants/le-lodge-wepion/photos/), toutes d'avant l'incendie. Alt d'après `sujet` de photos/index.json.
// Non utilisée : 11 (personne devant une enseigne « Le Beau Rivage », à ne pas utiliser). Logo : public/logo-blanc.svg.
import facadeJour from '../assets/photos/01-facade-jour.webp';
import salleClaire from '../assets/photos/02-salle-claire.webp';
import terrasse from '../assets/photos/03-terrasse-meuse.webp';
import coupelle from '../assets/photos/04-dessert-coupelle.webp';
import salleMeuse from '../assets/photos/05-salle-vue-meuse.webp';
import bol from '../assets/photos/06-plat-bol-soupe.webp';
import dessertAssiette from '../assets/photos/07-dessert-assiette.webp';
import facadeNuit from '../assets/photos/08-facade-nuit.webp';
import viande from '../assets/photos/09-plat-viande-assiette-noire.webp';
import salleVoutee from '../assets/photos/10-salle-voutee.webp';
import feuillete from '../assets/photos/12-plat-feuillete-sauce.webp';
import panee from '../assets/photos/13-plat-viande-panee.webp';

export const photos = {
  facadeJour: { src: facadeJour, alt: 'La façade du Lodge de jour, vue du côté de la Meuse, sous un ciel clair.' },
  salleClaire: { src: salleClaire, alt: 'La salle claire, ses tables dressées et sa grande baie vitrée.' },
  terrasse: { src: terrasse, alt: 'La terrasse sous un store, avec la Meuse et les rochers en face.' },
  coupelle: { src: coupelle, alt: 'Un dessert servi dans une coupelle posée sur une assiette sombre.' },
  salleMeuse: { src: salleMeuse, alt: 'Des tables près de la fenêtre, le soir, avec la Meuse derrière la vitre.' },
  bol: { src: bol, alt: 'Un plat servi dans un bol, avec son accompagnement, sur une table dressée.' },
  dessert: { src: dessertAssiette, alt: 'Un dessert meringué dans une assiette blanche.' },
  facadeNuit: { src: facadeNuit, alt: 'La façade du Lodge au crépuscule, vue depuis la berge.' },
  viande: { src: viande, alt: 'Un plat de viande sur une assiette noire, avec des verres à vin.' },
  salleVoutee: { src: salleVoutee, alt: 'La salle aux fenêtres cintrées et aux tables rondes.' },
  feuillete: { src: feuillete, alt: 'Un feuilleté nappé de sauce crémeuse dans une assiette creuse noire.' },
  panee: { src: panee, alt: 'Une viande panée, de la salade et une sauce dans un petit pot.' },
} as const;
export type CleePhoto = keyof typeof photos;
