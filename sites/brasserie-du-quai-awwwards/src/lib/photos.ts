// Photos du client (data/restaurants/brasserie-du-quai/photos/), servies par astro:assets.
// Crédit : « photos : La Brasserie du Quai ». Alt : ce que montre la photo.
import huitres from '../assets/photos/01-huitres.jpg';
import tartare from '../assets/photos/02-plat-tartare-saumon.jpg';
import viande from '../assets/photos/03-plat-viande.jpg';
import terrasseCouverte from '../assets/photos/04-terrasse-couverte.jpg';
import terrasse from '../assets/photos/05-terrasse-meuse.jpg';
import terrassePortrait from '../assets/photos/06-terrasse-meuse-portrait.jpg';
import baies from '../assets/photos/07-salle-baies-vitrees.jpg';
import banquette from '../assets/photos/08-salle-banquette.jpg';
import cuisineOuverte from '../assets/photos/09-salle-cuisine-ouverte.jpg';
import panorama from '../assets/photos/10-salle-panorama.jpg';
import bar from '../assets/photos/11-bar.jpg';
import bouteilles from '../assets/photos/12-bar-bouteilles.jpg';
import cave from '../assets/photos/13-cave-a-vins.jpg';
import table from '../assets/photos/14-table-dressee.jpg';
import hibou from '../assets/photos/15-deco-hibou.jpg';
import machine from '../assets/photos/16-deco-machine-a-ecrire.jpg';
import facade from '../assets/photos/17-facade-meuse.jpg';
import banquetteLongue from '../assets/photos/18-salle-banquette-longue.jpg';
import equipe from '../assets/photos/19-equipe-cuisine-martin-remy.jpg';
import boeuf from '../assets/photos/20-plat-boeuf.jpg';
import volaille from '../assets/photos/21-plat-volaille-croquettes.jpg';
import ceviche from '../assets/photos/22-ceviche.jpg';
import sole from '../assets/photos/23-service-sole.jpg';
import ecailler from '../assets/photos/24-chef-ecailler.jpg';

export const photos = {
  huitres: { src: huitres, alt: 'Six huîtres ouvertes sur la glace pilée, un demi-citron dans le plat en métal.' },
  tartare: { src: tartare, alt: 'Le chef pose une crème au siphon sur un tartare de saumon dressé dans une assiette blanche.' },
  viande: { src: viande, alt: 'Une assiette de viande en tranches, croquettes, choux de Bruxelles et sauce, tenue à la main.' },
  terrasseCouverte: { src: terrasseCouverte, alt: 'La terrasse couverte et chauffée, clients attablés le long des vitres.' },
  terrasse: { src: terrasse, alt: 'La terrasse sous les parasols verts, tables en bois face à la Meuse et aux maisons de l’autre rive.' },
  terrassePortrait: { src: terrassePortrait, alt: 'La terrasse au bord de la Meuse, vue en hauteur, tables de teck sous les parasols.' },
  baies: { src: baies, alt: 'La salle aux chaises de cuir brun, ouverte par de grandes baies vitrées sur la terrasse et la Meuse.' },
  banquette: { src: banquette, alt: 'La salle et sa banquette de cuir fauve le long des tables en bois dressées.' },
  cuisineOuverte: { src: cuisineOuverte, alt: 'La salle vue vers la cuisine ouverte, étagères de bois et banquette.' },
  panorama: { src: panorama, alt: 'La salle en panorama, banquette courbe et suspensions dorées, le bar au fond.' },
  bar: { src: bar, alt: 'Le comptoir en bois clair du bar devant ses étagères bleu nuit.' },
  bouteilles: { src: bouteilles, alt: 'Les étagères du bar chargées de bouteilles et de verres.' },
  cave: { src: cave, alt: 'Les casiers de la cave à vins, bouteilles couchées.' },
  table: { src: table, alt: 'Une table dressée, serviettes blanches et verres à pied, la cave en arrière-plan.' },
  hibou: { src: hibou, alt: 'Une lampe en forme de hibou blanc aux yeux orange, posée dans une niche sombre.' },
  machine: { src: machine, alt: 'Une machine à écrire ancienne exposée dans une niche, au-dessus d’une rangée de verres.' },
  facade: { src: facade, alt: 'La brasserie au bord de la Meuse au crépuscule, parasols verts sur la berge.' },
  banquetteLongue: { src: banquetteLongue, alt: 'La longue banquette de la salle et ses tables dressées.' },
  equipe: { src: equipe, alt: 'Martin et Rémy, les deux cuisiniers, accoudés au passe de la cuisine.' },
  boeuf: { src: boeuf, alt: 'Des tranches de bœuf rosé sur une garniture, une assiette blanche sur table de bois.' },
  volaille: { src: volaille, alt: 'Une assiette de volaille et croquettes dorées, vue de haut sur une table en bois.' },
  ceviche: { src: ceviche, alt: 'Un ceviche dans une assiette creuse blanche, huile d’herbes verte.' },
  sole: { src: sole, alt: 'Un serveur présente une sole meunière, salade et citron sur un plat rectangulaire.' },
  ecailler: { src: ecailler, alt: 'L’écailler ouvre des huîtres au banc, en tablier sombre, lunettes sur le nez.' },
} as const;
export type CleePhoto = keyof typeof photos;
