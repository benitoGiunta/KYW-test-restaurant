// Photos du client (data/restaurants/les-potes-au-feu/photos/), recadrées pour le site. Alt : ce que montre la photo.
// Sara n'est identifiée qu'« à confirmer » dans photos/index.json : les alts ne la nomment pas.
import assietteBoeuf from '../assets/photos/assiette-boeuf.jpg';
import assietteDessert from '../assets/photos/assiette-dessert.jpg';
import assietteSaintJacques from '../assets/photos/assiette-saint-jacques.jpg';
import assietteTartare from '../assets/photos/assiette-tartare.jpg';
import barCocktails from '../assets/photos/bar-cocktails.jpg';
import chefDamien from '../assets/photos/chef-damien.jpg';
import chefFrancois from '../assets/photos/chef-francois.jpg';
import cuisinePasse from '../assets/photos/cuisine-passe.jpg';
import cuisinePate from '../assets/photos/cuisine-pate.jpg';
import cuisineSalage from '../assets/photos/cuisine-salage.jpg';
import equipeTrio from '../assets/photos/equipe-trio.jpg';
import salleAmpoules from '../assets/photos/salle-ampoules.jpg';
import salleBanquette from '../assets/photos/salle-banquette.jpg';
import salleClientsBar from '../assets/photos/salle-clients-bar.jpg';
import serviceFrites from '../assets/photos/service-frites.jpg';
import serviceTable from '../assets/photos/service-table.jpg';

export const assiettes = {
  boeuf: { src: assietteBoeuf, alt: 'Le bœuf confit vu de haut : carottes et cromesquis sur une assiette rouge.' },
  dessert: { src: assietteDessert, alt: 'Un dessert d’une carte précédente vu de haut : rosace de pommes, glace et éclats de tuile.' },
  'saint-jacques': { src: assietteSaintJacques, alt: 'Les Saint-Jacques snackées vues de haut, mousseline et tuile noire sur une assiette bleue.' },
  tartare: { src: assietteTartare, alt: 'Un tartare de bœuf, roquette et tuiles sur une assiette noire, vu de haut.' },
} as const;

export const photos = {
  barCocktails: { src: barCocktails, alt: 'Au bar, deux cocktails rouges dosés sous les ampoules.' },
  chefDamien: { src: chefDamien, alt: 'Damien Gorjanec en cuisine, tablier noir, devant la hotte rouge.' },
  chefFrancois: { src: chefFrancois, alt: 'François Schepens en cuisine, tablier noir, devant la hotte rouge.' },
  cuisinePasse: { src: cuisinePasse, alt: 'Damien et François au passe, sous les lampes chauffantes, dressent les assiettes.' },
  cuisinePate: { src: cuisinePate, alt: 'Des mains travaillent une pâte sur une balance de cuisine : tout est fait maison.' },
  cuisineSalage: { src: cuisineSalage, alt: 'Une main sale une pièce de viande tranchée sur la plaque.' },
  equipeTrio: { src: equipeTrio, alt: 'Damien et François rient sur une banquette avec une membre de l’équipe, autour d’une table en chêne.' },
  salleAmpoules: { src: salleAmpoules, alt: 'Ampoules à filament suspendues devant une étagère en bois et des murs sombres.' },
  salleBanquette: { src: salleBanquette, alt: 'La salle de jour : banquette, coussins moutarde, lambris vert de gris, tables en chêne et chaises blanches.' },
  salleClientsBar: { src: salleClientsBar, alt: 'Des clients attablés au bar, le soir, sous les ampoules chaudes.' },
  serviceFrites: { src: serviceFrites, alt: 'Une membre de l’équipe sourit en portant des paniers de frites, les chefs en fond.' },
  serviceTable: { src: serviceTable, alt: 'François verse une sauce à la cuillère sur une assiette, à table, devant une cliente.' },
} as const;
