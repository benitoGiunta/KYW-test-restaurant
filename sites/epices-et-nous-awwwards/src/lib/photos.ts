// Photos du client (data/restaurants/epices-et-nous/photos/). Crédit : « Photos : Épices & Nous ». Alt d'après le champ `sujet` de index.json.
import saumon from '../assets/photos/01-plat-saumon-girolles.jpg';
import sauce from '../assets/photos/03-plat-sauce-versee.jpg';
import table from '../assets/photos/04-table-verres.jpg';
import salleAvant from '../assets/photos/05-salle-avant.jpg';
import toast from '../assets/photos/06-plat-girolles-toast.jpg';
import tranche from '../assets/photos/08-cuisine-saumon-tranche.jpg';
import scampis from '../assets/photos/09-plat-scampis-plats.jpg';
import poele from '../assets/photos/10-cuisine-girolles-poele.jpg';
import biche from '../assets/photos/11-plat-biche-carottes.jpg';
import verriere from '../assets/photos/12-salle-verriere.jpg';
import facade from '../assets/photos/13-facade.jpg';
import girollesSauce from '../assets/photos/14-plat-girolles-sauce.jpg';
import volaille from '../assets/photos/15-plat-volaille-girolles.jpg';
import galette from '../assets/photos/17-plat-galette-lard.jpg';
import ardoise from '../assets/photos/20-plat-viande-ardoise.jpg';
import pass from '../assets/photos/21-cuisine-pass.jpg';
import chouFleur from '../assets/photos/22-plat-volaille-chou-fleur.jpg';
import amuse from '../assets/photos/23-amuse-bouche-veloutes.jpg';

export const photos = {
  saumon: { src: saumon, alt: 'Un filet de saumon à la peau dorée et des girolles sautées, sur un plat gris.' },
  sauce: { src: sauce, alt: 'Une sauce beurre blanc versée sur des scampis grillés, des linguine et des légumes, une main tient une serviette.' },
  table: { src: table, alt: 'Une table dressée, deux verres et une serviette, dans une salle sombre.' },
  salleAvant: { src: salleAvant, alt: 'La salle avant, ses tables dressées, un luminaire blanc et le comptoir en bois.' },
  toast: { src: toast, alt: 'Des girolles sur un toast, dans une assiette blanche.' },
  tranche: { src: tranche, alt: 'Des mains tranchent un filet de saumon frais en cuisine.' },
  scampis: { src: scampis, alt: 'Deux plats longs de scampis et de linguine.' },
  poele: { src: poele, alt: 'Des girolles dans une poêle en inox.' },
  biche: { src: biche, alt: 'Viande rouge tranchée, carottes et purées de couleur sur une ardoise noire.' },
  verriere: { src: verriere, alt: 'La verrière : une table dressée sous le toit vitré, un tableau au mur.' },
  facade: { src: facade, alt: 'La façade grise de la maison à Erpent, son œil-de-bœuf et l’enseigne Épices & Nous.' },
  girollesSauce: { src: girollesSauce, alt: 'Une sauce brune versée à la casserole sur des girolles, sur un toast.' },
  volaille: { src: volaille, alt: 'Une volaille aux girolles dans une assiette creuse.' },
  galette: { src: galette, alt: 'Une galette dorée, du lard croustillant et de jeunes pousses dans une assiette grise.' },
  ardoise: { src: ardoise, alt: 'Viande rosée tranchée, carottes en rubans et purées jaunes sur une ardoise noire.' },
  pass: { src: pass, alt: 'Le passe de la cuisine : une main, un pot d’ustensiles en inox et des casseroles.' },
  chouFleur: { src: chouFleur, alt: 'Une volaille dorée, de la crème et des fleurettes de chou-fleur aux amandes.' },
  amuse: { src: amuse, alt: 'Trois petits verrines de velouté vert et des bouchées sur des tuiles.' },
} as const;
export type CleePhoto = keyof typeof photos;
