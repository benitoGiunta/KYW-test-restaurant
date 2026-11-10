// Photos du client (data/restaurants/huile-sur-le-feu/photos/). Crédit : « photos : L'Huile sur le Feu ».
// Alt d'après le champ `sujet` de photos/index.json. Non utilisées : 05 (portrait non identifié), 18 à 20 (logos).
import croquette from '../assets/photos/01-plat-croquette-scampi.jpg';
import facade from '../assets/photos/02-facade.webp';
import salle from '../assets/photos/03-salle.webp';
import flambage from '../assets/photos/04-flambage-poele.webp';
import lustre from '../assets/photos/06-lustre-huiles.webp';
import cocktail from '../assets/photos/07-cocktail-pain.webp';
import presse from '../assets/photos/08-detail-presse-huile.webp';
import salade from '../assets/photos/09-salade-legumes-grilles.webp';
import bruschette from '../assets/photos/10-bruschette-assiette.webp';
import carpaccio from '../assets/photos/11-carpaccio.webp';
import sauceOrange from '../assets/photos/12-plat-sauce-orange.webp';
import allee from '../assets/photos/13-boutique-allee.webp';
import flacons from '../assets/photos/15-boutique-flacons-oco.webp';
import oliveraie from '../assets/photos/16-oliveraie.webp';
import branche from '../assets/photos/17-branche-olivier.webp';

export const photos = {
  croquette: { src: croquette, alt: 'Une croquette de scampi dans une sauce crémeuse, relevée de roquette, vue de dessus.' },
  facade: { src: facade, alt: 'La façade en pierre, sa porte vitrée et l’enseigne Oliviers & Co, L’Huile sur le Feu.' },
  salle: { src: salle, alt: 'La salle aux murs ocre, le tableau noir et les tables dressées.' },
  flambage: { src: flambage, alt: 'Le flambage d’une poêle dans la cuisine ouverte.' },
  lustre: { src: lustre, alt: 'Un lustre fait de flacons d’huile dorée.' },
  cocktail: { src: cocktail, alt: 'Un cocktail rouge et de petits pains sur une planche en bois.' },
  presse: { src: presse, alt: 'Le détail d’une presse à huile et de brins séchés sur un mur ocre.' },
  salade: { src: salade, alt: 'Une salade de légumes grillés et de tomates, du pain et un verre de vin rouge.' },
  bruschette: { src: bruschette, alt: 'Une assiette de bruschette et de légumes grillés.' },
  carpaccio: { src: carpaccio, alt: 'Un carpaccio garni de roquette, un verre de vin blanc et une bouteille d’huile d’olive.' },
  sauceOrange: { src: sauceOrange, alt: 'Un plat en sauce orange dans une assiette creuse, avec un verre de rosé.' },
  allee: { src: allee, alt: 'L’allée de la boutique, bordée d’étagères de produits.' },
  flacons: { src: flacons, alt: 'Des flacons d’huile et des coffrets Oliviers & Co posés sur une table.' },
  oliveraie: { src: oliveraie, alt: 'Une oliveraie au soleil couchant.' },
  branche: { src: branche, alt: 'Une main tient une branche d’olivier.' },
} as const;
export type CleePhoto = keyof typeof photos;
