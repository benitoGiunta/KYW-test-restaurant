// Photos du client (data/restaurants/escale-en-vue/photos/), crédit « photos : Escale en Vue ! ». Alt d'après `sujet`.
// Non utilisées : 08 à 11 (qualité 2, événement privé), 09 (possiblement générée), 13 (400x250), 12 (logo).
import parasol from '../assets/photos/terrasse-parasol.jpg';
import planchette from '../assets/photos/planchette.jpg';
import bol from '../assets/photos/bol-soleil.jpg';
import panorama from '../assets/photos/table-panorama.jpg';
import mur from '../assets/photos/mur-pierre.jpg';
import trappistes from '../assets/photos/trappistes.jpg';
import transats from '../assets/photos/transats.jpg';
export const photos = {
  parasol: { src: parasol, alt: 'La terrasse en gravier, un parasol rouge et la vallée au loin.' },
  planchette: { src: planchette, alt: 'Une planchette apéro et un verre de jus sur une table de terrasse, la vallée en fond.' },
  bol: { src: bol, alt: 'Un bol-salade et un verre sur une table en bois, au coucher du soleil.' },
  panorama: { src: panorama, alt: 'Une table avec une plante, une bière et un verre devant le panorama de la vallée.' },
  mur: { src: mur, alt: 'Des chaises de terrasse devant un mur de pierre, avec l’affiche du restaurant.' },
  trappistes: { src: trappistes, alt: 'Huit bouteilles de bières trappistes alignées.' },
  transats: { src: transats, alt: 'Une prairie clôturée, des transats jaunes et un panneau, une colline au fond.' },
} as const;
export type CleePhoto = keyof typeof photos;
