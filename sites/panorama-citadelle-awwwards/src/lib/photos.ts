// Photos du client (data/restaurants/panorama-citadelle/photos/), servies par astro:assets. Crédit : « photos : Le Panorama ».
// Alt d'après le champ `sujet` de photos/index.json : aucune personne ni aucun plat nommé sans preuve (le portrait n'est pas nommé).
import salle from '../assets/photos/01-salle-principale.jpg';
import meuse from '../assets/photos/02-vue-meuse.jpg';
import platanes from '../assets/photos/03-terrasse-platanes.jpg';
import pergola from '../assets/photos/05-terrasse-pergola.jpg';
import guirlandes from '../assets/photos/06-terrasse-guirlandes.jpg';
import facade from '../assets/photos/07-facade-pavillon.jpg';
import aerienne from '../assets/photos/08-vue-aerienne.jpg';
import bar from '../assets/photos/09-bar-salle.jpg';
import comptoir from '../assets/photos/10-bar-barmaid.jpg';
import longueTable from '../assets/photos/11-table-longue-vitres.jpg';
import tableVerres from '../assets/photos/12-table-verres-vue.jpg';
import cave from '../assets/photos/13-entree-cave-vitree.jpg';
import pano from '../assets/photos/15-biere-pano.jpg';
import equipe from '../assets/photos/17-equipe-terrasse.jpg';
import portrait from '../assets/photos/18-portrait-chef.jpg';
import four from '../assets/photos/19-cuisinier-four-bois.jpg';

export const photos = {
  salle: { src: salle, alt: "La salle principale : mur de pierre, plafond de lattes de bois et tables dressées sous un lustre rond." },
  meuse: { src: meuse, alt: "La Meuse et la ville de Namur vues depuis la Citadelle, des promeneurs au premier plan." },
  platanes: { src: platanes, alt: "La terrasse de gravier sous des platanes taillés, le pavillon vitré en fond." },
  pergola: { src: pergola, alt: "La terrasse sous la pergola de platanes, devant la façade vitrée du pavillon." },
  guirlandes: { src: guirlandes, alt: "Tables de terrasse sous des guirlandes lumineuses, la Meuse floue derrière." },
  facade: { src: facade, alt: "Le pavillon vitré du Panorama et sa terrasse de gravier sous un ciel bleu." },
  aerienne: { src: aerienne, alt: "Vue aérienne du pavillon et de la terrasse, posés au rebord de la Citadelle." },
  bar: { src: bar, alt: "Le bar en marbre noir et ses tabourets verts, côté salle." },
  comptoir: { src: comptoir, alt: "Derrière le comptoir du bar, bouteilles et verres suspendus, une serveuse au travail." },
  longueTable: { src: longueTable, alt: "Une longue table dressée devant les baies vitrées qui donnent sur la ville." },
  tableVerres: { src: tableVerres, alt: "Une table dressée, des verres, la vallée floue en arrière-plan." },
  cave: { src: cave, alt: "L’entrée du restaurant et la cave à vin vitrée." },
  pano: { src: pano, alt: "Un verre de bière blanche Pano, brassée avec La Houppe, sur fond clair." },
  equipe: { src: equipe, alt: "L’équipe en salle posant sur la terrasse, une quinzaine de personnes." },
  portrait: { src: portrait, alt: "Portrait d’un homme en veste blanche de cuisinier, les bras croisés." },
  four: { src: four, alt: "Un cuisinier en blouse blanche devant le four à bois." },
} as const;
export type CleePhoto = keyof typeof photos;
