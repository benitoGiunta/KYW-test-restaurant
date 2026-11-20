// Photos du client (data/restaurants/le-d-arville/photos/), servies par astro:assets. Crédit : « photos : Le D’Arville ».
// Alt d'après le champ `sujet` de photos/index.json : aucun plat ni aucune personne nommé sans preuve.
import salle from '../assets/photos/01-salle-tables.jpg';
import assietteNoire from '../assets/photos/02-plat-assiette-noire.jpg';
import dressage from '../assets/photos/03-plat-dressage-sauce.jpg';
import dessert from '../assets/photos/04-dessert-assiette-blanche.jpg';
import voileRouge from '../assets/photos/05-terrasse-voile-rouge.jpg';
import jardin from '../assets/photos/06-jardin-salon.jpg';
import bassin from '../assets/photos/07-terrasse-bassin.jpg';
import terrasseTable from '../assets/photos/08-terrasse-table.jpg';
import etang from '../assets/photos/09-batiment-etang.jpg';
import salleBleue from '../assets/photos/10-salle-bleue.jpg';
import tableLampe from '../assets/photos/12-table-lampe.jpg';
import cuisine from '../assets/photos/14-cuisine-dressage.jpg';
import miseEnBouche from '../assets/photos/15-plat-bois-mise-en-bouche.jpg';
import chef from '../assets/photos/16-chef-facade.jpg';
import suiteOrientale from '../assets/photos/17-barabas-suite-orientale.jpg';
import suiteGlamour from '../assets/photos/18-barabas-suite-glamour.jpg';
import petitDej from '../assets/photos/19-barabas-salle-petit-dejeuner.jpg';
import barabas from '../assets/photos/20-barabas-facade.jpg';
import piscine from '../assets/photos/21-barabas-piscine.jpg';

export const photos = {
  salle: { src: salle, alt: 'La salle du restaurant : tables dressées, murs sombres, tableaux colorés et chaises en velours gris.' },
  assietteNoire: { src: assietteNoire, alt: 'Vue du dessus d’une assiette noire dressée de fleurs et de légumes, posée sur du bois.' },
  dressage: { src: dressage, alt: 'Une main verse la sauce à la cuillère sur une assiette blanche dressée de légumes et de pousses.' },
  dessert: { src: dessert, alt: 'Un dessert dressé sur une assiette blanche posée sur un rondin de bois, couverts dorés à côté.' },
  voileRouge: { src: voileRouge, alt: 'La terrasse sous un voile rouge, le jardin et une pierre sculptée.' },
  jardin: { src: jardin, alt: 'Un salon de jardin sur un ponton de bois dans la prairie, sous un grand ciel nuageux.' },
  bassin: { src: bassin, alt: 'La terrasse et le bâtiment en briques au bord d’un bassin planté.' },
  terrasseTable: { src: terrasseTable, alt: 'Une table dressée sur la terrasse pavée, sous le voile rouge.' },
  etang: { src: etang, alt: 'Le bâtiment en briques derrière l’étang et ses plantes aquatiques, la terrasse au loin.' },
  salleBleue: { src: salleBleue, alt: 'La salle à manger : banquette ondulée bleue, mur orangé et longue table dressée.' },
  tableLampe: { src: tableLampe, alt: 'Une table dressée près d’un mur de briques, une lampe noire et un grand tableau.' },
  cuisine: { src: cuisine, alt: 'Des mains en cuisine dressent de petits bols.' },
  miseEnBouche: { src: miseEnBouche, alt: 'Deux petites préparations servies sur une planche en bois.' },
  chef: { src: chef, alt: 'Portrait en pied du chef devant l’entrée en briques, sous l’enseigne « Le D’Arville ».' },
  suiteOrientale: { src: suiteOrientale, alt: 'Villa Barabas : une chambre colorée, bleu, orange et carreaux.' },
  suiteGlamour: { src: suiteGlamour, alt: 'Villa Barabas : la suite Glamour, tête de lit fuchsia et poutres apparentes.' },
  petitDej: { src: petitDej, alt: 'Villa Barabas : la salle rouge et noire, longue table dressée pour le petit-déjeuner.' },
  barabas: { src: barabas, alt: 'La façade blanche de la villa Barabas.' },
  piscine: { src: piscine, alt: 'La piscine extérieure de la villa Barabas, un jet d’eau et des pins en fond.' },
} as const;
export type Cle = keyof typeof photos;
