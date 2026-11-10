// Photos du client (data/restaurants/le-54/photos/). Crédit : « Photos : Le 54 ». Alt d'après le champ `sujet`
// de photos/index.json : aucun plat ni personne nommé sans preuve ; les assiettes sont des vues d'archives.
import salle from '../assets/photos/01-salle-noir-blanc.jpg';
import salle2 from '../assets/photos/02-salle-sombre.jpg';
import langoustine from '../assets/photos/03-plat-langoustine.jpg';
import betterave from '../assets/photos/04-plat-betterave.jpg';
import saintJacques from '../assets/photos/05-plat-saint-jacques.jpg';
import sauce from '../assets/photos/06-dressage-sauce.jpg';
import bolBleu from '../assets/photos/07-plat-bol-bleu.jpg';
import geste from '../assets/photos/08-geste-dressage.jpg';
import bolsTruffe from '../assets/photos/09-bols-truffe.jpg';
import bolNoir from '../assets/photos/10-plat-bol-noir.jpg';
import assietteBlanche from '../assets/photos/11-assiette-blanche.jpg';
import tartare from '../assets/photos/12-tartare.jpg';
import soupe from '../assets/photos/13-soupe-homard.jpg';
import dessert from '../assets/photos/14-dessert-amandes.jpg';

export const photos = {
  salle: { src: salle, alt: 'La salle en noir et blanc : tables nappées de blanc, verres et chaises sombres.' },
  salle2: { src: salle2, alt: 'La salle à manger, parquet sombre et tables nappées, vue de côté.' },
  langoustine: { src: langoustine, alt: 'Assiette blanche : langoustine, herbes et émulsion.' },
  betterave: { src: betterave, alt: 'Assiette de betteraves et de légumes en fleurs, vue de dessus.' },
  saintJacques: { src: saintJacques, alt: 'Noix de Saint-Jacques dans un bol bleu, crème et ciboulette.' },
  sauce: { src: sauce, alt: 'Une sauce versée sur un plat de légumes, en salle.' },
  bolBleu: { src: bolBleu, alt: 'Un plat dans un bol bleu, posé sur une table de la salle.' },
  geste: { src: geste, alt: 'Deux mains dressent des feuilles et des pousses dans un bol noir.' },
  bolsTruffe: { src: bolsTruffe, alt: 'Plusieurs bols bleus alignés, purée et copeaux.' },
  bolNoir: { src: bolNoir, alt: 'Une sauce versée dans un bol noir, sur une table dressée.' },
  assietteBlanche: { src: assietteBlanche, alt: 'Grande assiette blanche, un petit dressage au centre, vue de dessus.' },
  tartare: { src: tartare, alt: 'Tartare dressé sur une assiette blanche.' },
  soupe: { src: soupe, alt: 'Velouté mousseux et morceau de homard dans une assiette creuse blanche.' },
  dessert: { src: dessert, alt: 'Dessert aux amandes effilées dans un bol brun.' },
} as const;
export type CleePhoto = keyof typeof photos;
