// Photos du client (data/restaurants/bienvenue-chez-vous/photos/), servies par astro:assets.
// Alt : ce que montre la photo (champ `sujet` de photos/index.json). Crédit : photos Bienvenue chez vous.
import huitres from '../assets/photos/huitres.jpg';
import lapin from '../assets/photos/lapin-agrumes.jpg';
import carpaccio from '../assets/photos/carpaccio-saint-jacques.jpg';
import saumon from '../assets/photos/saumon-vert.jpg';
import tomates from '../assets/photos/tomates-fleurs.jpg';
import facade from '../assets/photos/facade.jpg';
import carteVisite from '../assets/photos/carte-visite.jpg';
import bouchees from '../assets/photos/plateau-bouchees.jpg';
import viande from '../assets/photos/viande-carotte.jpg';
import asperges from '../assets/photos/asperges.jpg';
import terrine from '../assets/photos/terrine-marguerite.jpg';
import canard from '../assets/photos/canard-betterave.jpg';
import poisson from '../assets/photos/poisson-fleurs.jpg';
import plateauViande from '../assets/photos/plateau-viande.jpg';
import enseigne from '../assets/photos/enseigne.jpg';
import smiley from '../assets/photos/dessert-smiley.jpg';
import stJacques from '../assets/photos/saint-jacques-vert.jpg';
import lapinsEmporter from '../assets/photos/lapins-emporter.jpg';
import platEmporter from '../assets/photos/plat-emporter.jpg';
import foieGras from '../assets/photos/foie-gras-truffe.jpg';
import crustace from '../assets/photos/crustace-fleurs.jpg';
import salade from '../assets/photos/salade.jpg';

export const photos = {
  huitres: { src: huitres, alt: 'Huîtres garnies de perles végétales et de fleurs comestibles' },
  lapin: { src: lapin, alt: 'Assiette créative aux agrumes, avec un lapin jaune sculpté' },
  carpaccio: { src: carpaccio, alt: 'Carpaccio de noix de Saint-Jacques, crème verte et salicorne' },
  saumon: { src: saumon, alt: 'Saumon, jus vert et perles sur une assiette blanche' },
  tomates: { src: tomates, alt: 'Tomates multicolores, sorbet et fleurs comestibles' },
  facade: { src: facade, alt: 'Façade de la maison de maître de la rue Pépin, à Namur' },
  carteVisite: { src: carteVisite, alt: 'Carte de visite Bienvenue chez vous, glissée dans une serviette roulée sur une table en bois' },
  bouchees: { src: bouchees, alt: 'Plateau de douze verrines de bouchées' },
  viande: { src: viande, alt: 'Assiette grise : viande, carottes et fleurs dessinées' },
  asperges: { src: asperges, alt: 'Asperges, sauce verte et algues' },
  terrine: { src: terrine, alt: 'Assiette claire, fleur croquante et agrumes' },
  canard: { src: canard, alt: 'Magret en tranches, betterave rose et framboise' },
  poisson: { src: poisson, alt: 'Poisson, févettes, asperges et capucines' },
  plateauViande: { src: plateauViande, alt: 'Plateau en carton : viande, champignons et feuilles dorées' },
  enseigne: { src: enseigne, alt: 'Enseigne rouge « Bienvenue chez vous, fine cuisine et créativité »' },
  smiley: { src: smiley, alt: 'Dessert en forme de smiley rose, entouré de fraises' },
  stJacques: { src: stJacques, alt: 'Saint-Jacques snackées sur une sauce verte' },
  lapinsEmporter: { src: lapinsEmporter, alt: 'Barquettes à emporter : lapins jaunes et lard' },
  platEmporter: { src: platEmporter, alt: 'Plat à emporter dans un bol kraft : légumes et asperges' },
  foieGras: { src: foieGras, alt: 'Assiette gris perle, truffe noire et sauce brune' },
  crustace: { src: crustace, alt: 'Crustacé, fleurs comestibles et tuile en dentelle' },
  salade: { src: salade, alt: 'Salade composée colorée, sorbet vert et feta' },
} as const;
export type CleePhoto = keyof typeof photos;
