// Photos du client (data/restaurants/chez-guillaume/photos/), servies par astro:assets. Crédit : « photos : Chez Guillaume ».
// Alt d'après le champ `sujet` de photos/index.json : aucune personne ni aucun plat nommé sans preuve.
import humoristes from '../assets/photos/01-humoristes-apres-spectacle.jpg';
import dessert from '../assets/photos/02-brunch-dessert.jpg';
import boudin from '../assets/photos/03-plat-boudin-puree.jpg';
import salleProjecteurs from '../assets/photos/04-salle-scene-projecteurs.jpg';
import scene from '../assets/photos/05-scene-humoriste.jpg';
import cocktails from '../assets/photos/06-cocktails-shaker.jpg';
import cuisine from '../assets/photos/07-cuisine-cheffe.jpg';
import cafe from '../assets/photos/08-cafe-expresso.jpg';
import salleRideaux from '../assets/photos/09-salle-rideaux-rouges.jpg';
import banquette from '../assets/photos/10-banquette-table-dressee.jpg';

export const photos = {
  humoristes: { src: humoristes, alt: 'Trois personnes rient sur la scène, devant le mur blanc éclairé.' },
  dessert: { src: dessert, alt: 'Une tartelette meringuée garnie d’une herbe, sur une assiette à liseré rouge, un café au lait derrière.' },
  boudin: { src: boudin, alt: 'Une main verse le jus sur une assiette de boudin, purée et compote, un verre de vin rouge à côté.' },
  salleProjecteurs: { src: salleProjecteurs, alt: 'La salle sous la rampe de projecteurs : tables en bois clair et rideaux couleur rouille.' },
  scene: { src: scene, alt: 'Un humoriste au micro sur la scène, le public de dos, des arcs de lumière sur le mur blanc.' },
  cocktails: { src: cocktails, alt: 'Au bar, un cocktail passé du shaker dans une coupe, deux autres coupes en attente.' },
  cuisine: { src: cuisine, alt: 'En cuisine, une cuisinière dresse des assiettes sur le plan de travail en inox.' },
  cafe: { src: cafe, alt: 'Un expresso coule dans une tasse blanche à fleur rouge.' },
  salleRideaux: { src: salleRideaux, alt: 'La scène ronde entre deux rideaux bordeaux, les tables dressées devant.' },
  banquette: { src: banquette, alt: 'Une banquette rayée rouge et blanc, une table dressée avec verres et set illustré.' },
} as const;
export type CleePhoto = keyof typeof photos;
