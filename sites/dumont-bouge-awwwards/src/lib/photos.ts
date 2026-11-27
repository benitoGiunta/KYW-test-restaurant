// Photos du client (data/restaurants/dumont-bouge/photos/). Crédit : « Photos : Dumont Bouge ». Alt d'après `sujet` de photos/index.json.
import vitrine from '../assets/photos/vitrine.jpg';
import salade from '../assets/photos/salade.jpg';
import miniSandwichs from '../assets/photos/mini-sandwichs.jpg';
import facade from '../assets/photos/facade.jpg';

export const photos = {
  vitrine: { src: vitrine, alt: 'La vitrine de la pâtisserie : tartes aux fruits rouges, fraises et framboises alignées sur le comptoir noir.' },
  salade: { src: salade, alt: 'Assiette de toasts de chèvre gratinés, jambon cru, carottes râpées, tomates et jeunes pousses.' },
  miniSandwichs: { src: miniSandwichs, alt: 'Plateau de mini-sandwichs sur petits pains brillants, jambon, fromage et crudités.' },
  facade: { src: facade, alt: 'La façade de Dumont Bouge chaussée de Louvain, entrée vitrée, terrasse couverte et parvis pavé.' },
} as const;
export type CleePhoto = keyof typeof photos;
