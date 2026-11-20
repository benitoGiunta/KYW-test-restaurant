// Photos du client (data/restaurants/maison-des-desserts/photos/). Crédit : « Photos : La Maison des Desserts ».
// Alt d'après le champ `sujet` de photos/index.json. Non utilisées : 09 (640 px), 16 à 18 (probables banques d'images), 19 (logo).
import facadeNoel from '../assets/photos/01-facade-vitrine-noel.jpg';
import facade from '../assets/photos/02-facade-jour.jpg';
import salleColonne from '../assets/photos/03-salle-colonne.jpg';
import salleRayures from '../assets/photos/04-salle-tableau-rayures.jpg';
import salleFenetre from '../assets/photos/05-salle-fenetre.jpg';
import millefeuille from '../assets/photos/06-patisserie-millefeuille.jpg';
import entremetsChocolat from '../assets/photos/07-patisserie-entremets-chocolat.jpg';
import entremetsRouge from '../assets/photos/08-patisserie-entremets-rouge.jpg';
import entremetsDore from '../assets/photos/10-patisserie-entremets-dore.jpg';
import painCroute from '../assets/photos/11-pain-rond-croute.jpg';
import painCraquele from '../assets/photos/12-pain-rond-craquele.jpg';
import painGraines from '../assets/photos/13-pain-aux-graines.jpg';
import painCampagne from '../assets/photos/14-pain-campagne.jpg';
import mie from '../assets/photos/15-mie-baguette.jpg';

export const photos = {
  facadeNoel: { src: facadeNoel, alt: 'La façade en pierre bleue et sa vitrine décorée de Noël, rue Haute Marcelle, éclairées à la tombée du jour.' },
  facade: { src: facade, alt: 'La façade de la maison avec son enseigne verte et ses vitrines de pâtisserie, de jour.' },
  salleColonne: { src: salleColonne, alt: 'La salle du salon de thé, sa colonne et ses tables dressées.' },
  salleRayures: { src: salleRayures, alt: 'Un mur rayé gris, un tableau et des tables dressées dans la salle.' },
  salleFenetre: { src: salleFenetre, alt: 'La salle près de la fenêtre : rideaux gris, une table et des chaises.' },
  millefeuille: { src: millefeuille, alt: 'Une tranche de gâteau feuilleté au chocolat et à la crème, sur fond clair.' },
  entremetsChocolat: { src: entremetsChocolat, alt: 'Un entremets au chocolat sur fond sombre, avec l’étiquette de la maison.' },
  entremetsRouge: { src: entremetsRouge, alt: 'Un entremets rond au glaçage rouge, avec l’étiquette de la maison.' },
  entremetsDore: { src: entremetsDore, alt: 'Un entremets rond doré noué d’un ruban, sur une table en marbre.' },
  painCroute: { src: painCroute, alt: 'Un pain rond à la croûte dorée sur fond clair.' },
  painCraquele: { src: painCraquele, alt: 'Un pain rond à la croûte craquelée sur fond clair.' },
  painGraines: { src: painGraines, alt: 'Un petit pain rond aux raisins et aux graines.' },
  painCampagne: { src: painCampagne, alt: 'Un pain de campagne sur fond clair.' },
  mie: { src: mie, alt: 'Gros plan sur la mie et la croûte d’une baguette.' },
} as const;
export type CleePhoto = keyof typeof photos;
