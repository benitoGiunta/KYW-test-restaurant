// Photos du client (data/restaurants/bayti/photos/), servies par astro:assets. Alt : ce que montre la photo (champ « sujet » de index.json).
import heroMezzes from '../assets/photos/hero-mezzes.jpg';
import mezzesPelouse from '../assets/photos/mezzes-pelouse.jpg';
import mezzesAutomne from '../assets/photos/mezzes-automne.jpg';
import mezzesPortrait from '../assets/photos/mezzes-portrait.jpg';
import coffret from '../assets/photos/coffret.jpg';
import buffet from '../assets/photos/buffet.jpg';
import kebbehMains from '../assets/photos/kebbeh-mains.jpg';
import desserts from '../assets/photos/desserts.jpg';
import rouleaux from '../assets/photos/rouleaux.jpg';
import rakakatNoir from '../assets/photos/rakakat-noir.jpg';
import mezzesAil from '../assets/photos/mezzes-ail.jpg';
import carrelageBol from '../assets/photos/carrelage-bol.jpg';
import pickles from '../assets/photos/pickles.jpg';
import mutabal from '../assets/photos/mutabal.jpg';
import houmous from '../assets/photos/houmous.jpg';
import cookies from '../assets/photos/cookies.jpg';
import baklava from '../assets/photos/baklava.jpg';
import pain from '../assets/photos/pain.jpg';
import simit from '../assets/photos/simit.jpg';
import makanek from '../assets/photos/makanek.jpg';
import brochettes from '../assets/photos/brochettes.jpg';
import boite from '../assets/photos/boite.jpg';

export const photos = {
  heroMezzes: { src: heroMezzes, alt: 'Bols de mezzés, houmous à la betterave, falafels et salades, posés sur l’herbe et les fleurs.' },
  mezzesPelouse: { src: mezzesPelouse, alt: 'Sélection de mezzés en bols kraft sur une pelouse fleurie, vue du dessus.' },
  mezzesAutomne: { src: mezzesAutomne, alt: 'Six bols de mezzés sur des feuilles d’automne, vue du dessus.' },
  mezzesPortrait: { src: mezzesPortrait, alt: 'Bols de mezzés disposés sur des feuilles d’automne, vue du dessus.' },
  coffret: { src: coffret, alt: 'Coffret traiteur en bois garni de bols de mezzés et de pain libanais, sur de la mousse.' },
  buffet: { src: buffet, alt: 'Buffet de mezzés sur une nappe rouge, pour un événement traiteur.' },
  kebbehMains: { src: kebbehMains, alt: 'Deux bols tenus à deux mains : kebbeh frits d’un côté, falafels de l’autre.' },
  desserts: { src: desserts, alt: 'Deux bols de desserts, une crème et un gâteau pistache et rose, sur des feuilles dorées.' },
  rouleaux: { src: rouleaux, alt: 'Bols de houmous, rouleaux croustillants, falafel et kefta, vue du dessus.' },
  rakakatNoir: { src: rakakatNoir, alt: 'Rouleau croustillant au fromage et kebbeh à la pistache sur fond noir.' },
  mezzesAil: { src: mezzesAil, alt: 'Huit bols de mezzés et du pain libanais sur un lit d’ail des ours.' },
  carrelageBol: { src: carrelageBol, alt: 'Bol de mezzé sombre posé sur un carrelage vert, vue du dessus.' },
  pickles: { src: pickles, alt: 'Pickles de navet rose dans une assiette bleue tenue par une main, sur un carrelage vert.' },
  mutabal: { src: mutabal, alt: 'Purée d’aubergine dans un bol, sur un carrelage vert.' },
  houmous: { src: houmous, alt: 'Houmous garni de tomates cerises, tenu à deux mains, sur un carrelage vert.' },
  cookies: { src: cookies, alt: 'Soft baked cookies cassés à la main, sur un plat en verre posé sur un carrelage vert.' },
  baklava: { src: baklava, alt: 'Baklavas à la pistache sur un présentoir en verre.' },
  pain: { src: pain, alt: 'Pain libanais grillé, empilé, mezzés en arrière-plan.' },
  simit: { src: simit, alt: 'Simit dans une corbeille en tissu sur un carrelage vert.' },
  makanek: { src: makanek, alt: 'Deux bols de makanek, saucisses en sauce tomate et citron, tenus à deux mains.' },
  brochettes: { src: brochettes, alt: 'Brochettes de poulet et de poivron dans une boîte kraft.' },
  boite: { src: boite, alt: 'Boîte traiteur ouverte, compartiments de mezzés, en sous-bois.' },
} as const;
export type CleePhoto = keyof typeof photos;
