// Photos du client (data/restaurants/ne5t/photos/, toutes issues de ne5t.com), servies par astro:assets.
// Alt : champ « sujet » de photos/index.json ; aucune personne nommée sans preuve.
import facadeNuit from '../assets/photos/facade-nuit.jpg';
import facadeJour from '../assets/photos/facade-jour.jpg';
import ailes from '../assets/photos/ailes.jpg';
import toast from '../assets/photos/toast.jpg';
import poisson from '../assets/photos/poisson.jpg';
import bouchees from '../assets/photos/bouchees.jpg';
import salle from '../assets/photos/salle.jpg';
import servicePlat from '../assets/photos/service-plat.jpg';
import dessert from '../assets/photos/dessert.jpg';
import vin from '../assets/photos/vin.jpg';
import terrasse from '../assets/photos/terrasse.jpg';
import porte from '../assets/photos/porte.jpg';
import spaVoutes from '../assets/photos/spa-voutes.jpg';
import spaPieds from '../assets/photos/spa-pieds.jpg';
import salonCheminee from '../assets/photos/salon-cheminee.jpg';

export const photos = {
  facadeNuit: { src: facadeNuit, alt: 'La façade en pierre de la Maison Gersdorff de nuit, fenêtres allumées, cour et bassin extérieur éclairés.' },
  facadeJour: { src: facadeJour, alt: 'La façade en pierre de jour, reflétée dans le bassin extérieur.' },
  ailes: { src: ailes, alt: 'Les ailes du bâtiment en pierre, brique et bardage bois, vues depuis l’allée d’accès.' },
  toast: { src: toast, alt: 'Une table dressée près d’une fenêtre, deux verres de vin blanc qui s’entrechoquent.' },
  poisson: { src: poisson, alt: 'Un plat de poisson blanc, coquillages et légumes, dans un bol sombre.' },
  bouchees: { src: bouchees, alt: 'Des bouchées apéritives et des verres de cocktail sur une table.' },
  salle: { src: salle, alt: 'La salle du restaurant, tables dressées sous les poutres.' },
  servicePlat: { src: servicePlat, alt: 'Le service d’un plat à table, un cuisinier en veste blanche nappe l’assiette de sauce.' },
  dessert: { src: dessert, alt: 'Un dessert aux fraises sur une assiette blanche, la nappe porte le logo Intuition.' },
  vin: { src: vin, alt: 'Le service du vin blanc en terrasse, la bouteille penchée sur le verre.' },
  terrasse: { src: terrasse, alt: 'Une table pour deux contre un mur de pierre et de brique, chaises blanches, au soleil.' },
  porte: { src: porte, alt: 'La porte vitrée du restaurant, marquée du logo Intuition et du mot Entrée.' },
  spaVoutes: { src: spaVoutes, alt: 'La piscine intérieure du spa WellNE5T sous des voûtes en brique, avec des transats.' },
  spaPieds: { src: spaPieds, alt: 'Deux personnes en peignoir, les pieds dans un bassin sous une voûte en brique.' },
  salonCheminee: { src: salonCheminee, alt: 'Un salon avec cheminée et canapé Chesterfield, bûches rangées à côté.' },
};
export type PhotoCle = keyof typeof photos;
