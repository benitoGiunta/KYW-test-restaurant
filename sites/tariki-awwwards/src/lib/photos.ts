// Photos du client (data/restaurants/tariki/photos/). Crédit : « Photos : Tariki ».
// Alt d'après le champ `sujet` de photos/index.json. 01 et 02 : visuels d'ambiance du site du client (possiblement banque d'images) ;
// 03 : couloir d'arcades, rendu possiblement généré, n'est pas le restaurant. Non utilisées : 05 à 07 (affiches de carte, qualité 1), 04 (logo).
import braises from '../assets/photos/01-braises.jpg';
import feu from '../assets/photos/02-feu-de-camp.jpg';
import arcades from '../assets/photos/03-arcades.jpg';

export const photos = {
  braises: { src: braises, alt: 'Des braises rougeoyantes et des flammes sur du bois, dans le noir.' },
  feu: { src: feu, alt: 'Un feu de camp qui brûle sur fond noir.' },
  arcades: { src: arcades, alt: 'Un couloir d’arcades de pierre ocre, illustration d’ambiance orientale.' },
} as const;
export type CleePhoto = keyof typeof photos;
