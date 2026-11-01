// Photos du client (data/restaurants/dolce-vita-wepion/photos/), servies par astro:assets. Crédit : « photos : La Dolce Vita ».
// Alt d'après le champ `sujet` de photos/index.json : aucune personne ni aucun plat nommé sans preuve.
import facadeSoir from '../assets/photos/01-facade-soir-poster.jpg';
import facadeEnseigne from '../assets/photos/02-facade-enseigne.jpg';
import neon from '../assets/photos/03-neon-dolce-vita.jpg';
import salleOlive from '../assets/photos/04-salle-mur-olive.jpg';
import salleArdoise from '../assets/photos/05-salle-ardoise-vins.jpg';
import chariot from '../assets/photos/06-chariot-vins-ardoise.jpg';
import terrasse from '../assets/photos/07-terrasse-jour.jpg';
import planche from '../assets/photos/08-planche-antipasti.jpg';
import burrata from '../assets/photos/09-burrata-estivale.jpg';
import palourdes from '../assets/photos/10-linguine-vongole.jpg';
import escalope from '../assets/photos/11-escalope-dolce-vita.jpg';
import margherita from '../assets/photos/12-pizza-margherita.jpg';
import moelleux from '../assets/photos/13-dolci-moelleux.jpg';
import geste from '../assets/photos/14-geste-poster.jpg';

export const photos = {
  facadeSoir: { src: facadeSoir, alt: 'La façade blanche et la terrasse du restaurant le soir, chaussée de Dinant, sous l’enseigne éclairée.' },
  facadeEnseigne: { src: facadeEnseigne, alt: 'La façade blanche, ses jardinières fleuries et l’enseigne « La Dolce Vita Restaurant 081 85 54 20 ».' },
  neon: { src: neon, alt: 'Le néon blanc « la dolce vita » en lettres attachées sur un mur végétal.' },
  salleOlive: { src: salleOlive, alt: 'La salle : tables en bois blond, banquettes et chaises sombres, mur vert olive et fleurs de cerisier roses.' },
  salleArdoise: { src: salleArdoise, alt: 'La salle avec son chariot à bouteilles de vin, une ardoise, le mur végétal et des branches fleuries roses.' },
  chariot: { src: chariot, alt: 'Des bouteilles de vin rouge sur un chariot, devant l’ardoise des suggestions.' },
  terrasse: { src: terrasse, alt: 'La terrasse de jour : salon de jardin sur les pavés, devant la façade.' },
  planche: { src: planche, alt: 'Une planche en bois de charcuteries, fromages et olives.' },
  burrata: { src: burrata, alt: 'Une assiette décorée garnie de burrata, jambon cru, figues, fruits jaunes et basilic.' },
  palourdes: { src: palourdes, alt: 'Des pâtes longues aux palourdes et tomates sur une assiette bleue décorée.' },
  escalope: { src: escalope, alt: 'Une escalope gratinée à la sauce tomate sur une assiette grise.' },
  margherita: { src: margherita, alt: 'Une pizza margherita au basilic sur un plateau noir.' },
  moelleux: { src: moelleux, alt: 'Un moelleux au chocolat, une boule de glace, de la chantilly et des fruits rouges sur une assiette allongée.' },
  geste: { src: geste, alt: 'Deux mains étalent une pâte à pizza sur un plan de travail sombre.' },
} as const;
export type CleePhoto = keyof typeof photos;
