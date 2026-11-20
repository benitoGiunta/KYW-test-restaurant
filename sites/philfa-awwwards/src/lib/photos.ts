// Photos du client (data/restaurants/philfa/photos/, origine : médias de philfa.be). Crédit : « photos : PhilFa ».
// Alt d'après le champ `sujet` de photos/index.json. Non utilisée : 09 (façade, 400 px, trop faible). Aucune photo de plat n'existe.
import couloir from '../assets/photos/01-salle-couloir.jpg';
import vitrine from '../assets/photos/02-salle-vitrine.jpg';
import tableLongue from '../assets/photos/03-salle-table-longue.jpg';
import lampe from '../assets/photos/04-salle-lampe-table.jpg';
import plantes from '../assets/photos/05-table-plantes.jpg';
import detail from '../assets/photos/06-detail-salle-plante.jpg';
import niches from '../assets/photos/07-table-niches-colorees.jpg';
import terrasse from '../assets/photos/08-terrasse.jpg';
import bar from '../assets/photos/10-bar-bouteilles.jpg';
import etagere from '../assets/photos/11-etagere-spiritueux.jpg';
import cave from '../assets/photos/12-bar-cave-vitree.jpg';

export const photos = {
  couloir: { src: couloir, alt: 'La salle en longueur : mur sombre, plaque de métal rouillé, banquettes roses et chaises moutarde, la vitrine au fond.' },
  vitrine: { src: vitrine, alt: 'La salle vue depuis le fond : baie vitrée, tables rondes et hélice décorative au mur.' },
  tableLongue: { src: tableLongue, alt: 'La salle en profondeur : une longue table en bois, des suspensions et une fresque murale.' },
  lampe: { src: lampe, alt: 'Une table dressée avec sa lampe, la salle et ses plantes au fond.' },
  plantes: { src: plantes, alt: 'Une table dressée devant un mur d’étagères de plantes vertes.' },
  detail: { src: detail, alt: 'Détail de la salle : une table ronde, des chaises rose et ocre, une branche au premier plan.' },
  niches: { src: niches, alt: 'Une table pour deux sous quatre niches lumineuses de couleurs différentes.' },
  terrasse: { src: terrasse, alt: 'La terrasse à l’avant : chaises cannées et tables rondes sous les parasols.' },
  bar: { src: bar, alt: 'Le comptoir et ses bouteilles de spiritueux, gins et rhums.' },
  etagere: { src: etagere, alt: 'Une étagère ronde en bois portant des rhums et des gins.' },
  cave: { src: cave, alt: 'Le bar en bois, la cave à vins vitrée et les hauts tabourets.' },
} as const;
export type CleePhoto = keyof typeof photos;
