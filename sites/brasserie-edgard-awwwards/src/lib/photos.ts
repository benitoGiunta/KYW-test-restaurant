// Photos du client (data/restaurants/brasserie-edgard/photos/), crédit « photos : Brasserie Edgard ».
// Alt d'après le champ `sujet` de photos/index.json : aucun plat ni personne nommé sans preuve.
import facade from '../assets/photos/01-facade.jpg';
import baies from '../assets/photos/02-salle-baies-vitrees.jpg';
import bar from '../assets/photos/03-salle-bar.jpg';
import comptoir from '../assets/photos/05-comptoir-bois-sculpte.jpg';
import tables from '../assets/photos/06-salle-tables-dressees.jpg';
import horlogeSalle from '../assets/photos/07-salle-horloge.jpg';
import mur from '../assets/photos/08-mur-bois-passe-plat.jpg';
import veranda from '../assets/photos/10-salle-veranda.jpg';
import banquettes from '../assets/photos/11-salle-banquettes.jpg';
import mosaique from '../assets/photos/13-table-mosaique.jpg';
import terrasse from '../assets/photos/16-terrasse-parasols.jpg';
import terrasseRue from '../assets/photos/18-terrasse-exterieur.jpg';
import horloge from '../assets/photos/19-horloge-mosaique.jpg';
import lampes from '../assets/photos/20-lampes.jpg';
import coupelles from '../assets/photos/21-coupelles-aperitif.jpg';
import etagee from '../assets/photos/22-presentation-etagee.jpg';
import tartare from '../assets/photos/23-plat-tartare.jpg';
import volaille from '../assets/photos/24-plat-volaille-pates.jpg';
import salade from '../assets/photos/25-plat-salade.jpg';
import burger from '../assets/photos/26-plat-burger.jpg';
import viande from '../assets/photos/27-plat-viande-croquette.jpg';
import dessert from '../assets/photos/29-dessert-coupe-glacee.jpg';
import irish from '../assets/photos/30-irish-coffee.jpg';

export const photos = {
  facade: { src: facade, alt: 'La façade de la brasserie de nuit, l’enseigne lumineuse Mr Edgard au-dessus des baies éclairées.' },
  baies: { src: baies, alt: 'La salle sous les grandes baies cintrées, des clients attablés, le bois sculpté sur le côté.' },
  bar: { src: bar, alt: 'La salle et le comptoir-bar en bois sculpté, verres suspendus au-dessus.' },
  comptoir: { src: comptoir, alt: 'Le comptoir en bois sculpté et la salle en arrière-plan, plantes au premier plan.' },
  tables: { src: tables, alt: 'La salle, tables dressées, banquettes en cuir et baies cintrées.' },
  horlogeSalle: { src: horlogeSalle, alt: 'La salle, tables dressées, une horloge ronde au mur crème.' },
  mur: { src: mur, alt: 'Un mur de bois sculpté percé d’une ouverture sur la salle.' },
  veranda: { src: veranda, alt: 'L’espace lumineux côté terrasse couverte, tables dressées.' },
  banquettes: { src: banquettes, alt: 'La salle, banquettes grises et mur de bois sculpté.' },
  mosaique: { src: mosaique, alt: 'Une table dressée devant un panneau décoratif vert et un mur de bois sombre.' },
  terrasse: { src: terrasse, alt: 'La terrasse couverte, tables sous les parasols.' },
  terrasseRue: { src: terrasseRue, alt: 'La terrasse vue de la rue, parasol noir et garde-corps.' },
  horloge: { src: horloge, alt: 'L’horloge murale en mosaïque de verre, aiguilles rouges, sur un mur blanc.' },
  lampes: { src: lampes, alt: 'Petites lampes à abat-jour orange sur le rebord d’une baie.' },
  coupelles: { src: coupelles, alt: 'Des coupelles d’olives et de grignotages alignées sur un plateau.' },
  etagee: { src: etagee, alt: 'Une présentation étagée sur un fond de bois sculpté : salade, frites, sauces et une brochette suspendue.' },
  tartare: { src: tartare, alt: 'Un tartare de bœuf avec ses frites, sur un plat rectangulaire.' },
  volaille: { src: volaille, alt: 'Une assiette de viande grillée et de pâtes au parmesan.' },
  salade: { src: salade, alt: 'Une grande salade garnie sur un plat rectangulaire.' },
  burger: { src: burger, alt: 'Un burger et son seau de frites.' },
  viande: { src: viande, alt: 'Une assiette de viande et une croquette, le jus dressé en traits.' },
  dessert: { src: dessert, alt: 'Une coupe glacée aux fraises et à la chantilly.' },
  irish: { src: irish, alt: 'Deux Irish coffees servis en verre au comptoir.' },
} as const;
export type CleePhoto = keyof typeof photos;
