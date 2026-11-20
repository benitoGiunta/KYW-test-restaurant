// Photos du client (data/restaurants/be-belge/photos/). Crédit : « photos : Be Belge… et d'ailleurs ».
// Alt : ce que montre la photo (champ « sujet » de photos/index.json), jamais de nom propre non prouvé.
import cheminee from '../assets/photos/01-salle-cheminee.webp';
import facade from '../assets/photos/02-facade-jardin.webp';
import tableaux from '../assets/photos/03-salle-tableaux.jpg';
import banquette from '../assets/photos/04-salle-banquette.jpg';
import brasero from '../assets/photos/05-brasero-terrasse.jpg';
import terrasse from '../assets/photos/06-terrasse.jpg';
import enseigne from '../assets/photos/07-enseigne.jpg';
import buffet from '../assets/photos/08-bar-buffet.jpg';
import applique from '../assets/photos/09-applique-murale.jpg';
import profondeur from '../assets/photos/10-salle-profondeur.jpg';

export const photos = {
  cheminee: { src: cheminee, alt: 'La salle à manger : un mur de pierre, une cheminée et des tables dressées.' },
  facade: { src: facade, alt: 'La pelouse et le bâtiment du restaurant vus du jardin, sous de grands arbres.' },
  tableaux: { src: tableaux, alt: 'Une table dressée devant un triptyque de tableaux rouges et le mur de pierre.' },
  banquette: { src: banquette, alt: 'La salle, sa banquette et ses tables dressées devant de grandes fenêtres.' },
  brasero: { src: brasero, alt: 'Une table de la terrasse et le foyer où brûle un feu de bois.' },
  terrasse: { src: terrasse, alt: 'La terrasse ombragée, ses chaises et ses tables sur un sol de terre cuite.' },
  enseigne: { src: enseigne, alt: 'L’enseigne métallique « be Belge … et d’ailleurs » sur une paroi perforée.' },
  buffet: { src: buffet, alt: 'Un buffet en bois portant des bouteilles et une vache colorée devant une fenêtre.' },
  applique: { src: applique, alt: 'Une applique murale lumineuse faite de deux carrés imbriqués, sur un mur sombre.' },
  profondeur: { src: profondeur, alt: 'La salle vue depuis l’entrée : l’enseigne en premier plan, les tables dressées au fond.' },
} as const;
export type CleePhoto = keyof typeof photos;
