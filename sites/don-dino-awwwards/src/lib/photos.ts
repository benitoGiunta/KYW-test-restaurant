// Photos du client (data/restaurants/don-dino/photos/). Crédit : « Photos : Don Dino ». Alt d'après le champ `sujet` de index.json.
// Non utilisées : 05 (image de vidéo, 226 px d'origine), 13 (logo).
import moules from '../assets/photos/01-entree-moules-gratinees.jpg';
import toast from '../assets/photos/02-entree-tomates-mozzarella-toast.jpg';
import pizzaPlanche from '../assets/photos/03-pizza-planche-bois.jpg';
import spaghetti from '../assets/photos/04-pates-spaghetti.jpg';
import bar from '../assets/photos/06-bar-tireuses.jpg';
import four from '../assets/photos/07-pizzaiolo-four.jpg';
import jambonCru from '../assets/photos/08-pizza-jambon-cru-roquette.jpg';
import salleHomme from '../assets/photos/09-salle-homme-pizza.jpg';
import anchois from '../assets/photos/10-pizza-anchois-epinards.jpg';
import salle from '../assets/photos/11-salle-comptoir.jpg';
import escalope from '../assets/photos/12-plat-escalope-salade.jpg';

export const photos = {
  moules: { src: moules, alt: 'Des moules gratinées servies dans un plat blanc.' },
  toast: { src: toast, alt: 'Un toast garni de tomates cerises, de mozzarella et de roquette.' },
  pizzaPlanche: { src: pizzaPlanche, alt: 'Une pizza à l’aubergine et au poivron, posée sur une planche en bois.' },
  spaghetti: { src: spaghetti, alt: 'Une assiette de spaghetti persillés aux lardons.' },
  bar: { src: bar, alt: 'Le bar : trois tireuses à bière chromées, un serveur au second plan.' },
  four: { src: four, alt: 'Un pizzaïolo enfourne une pizza dans le four à gaz.' },
  jambonCru: { src: jambonCru, alt: 'Une pizza au jambon cru, à la tomate et à la roquette.' },
  salleHomme: { src: salleHomme, alt: 'Un homme en chemise blanche tient une pizza dans la salle, où des clients sont attablés.' },
  anchois: { src: anchois, alt: 'Une pizza aux anchois, aux olives noires et aux épinards, vue de dessus.' },
  salle: { src: salle, alt: 'La salle vue depuis le comptoir, tables dressées sous un plafond à luminaires carrés.' },
  escalope: { src: escalope, alt: 'Une escalope panée, une salade et un demi-citron dans une assiette blanche.' },
} as const;
export type CleePhoto = keyof typeof photos;
