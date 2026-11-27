// Photos du client (data/restaurants/oh-la-vache/photos/). Crédit : « Photos : Oh la Vache ! ». Alt d'après `sujet` de photos/index.json.
// Non utilisées : 00-logo (le logo n'est pas reproduit), 01 et 05 et 07 (portraits basse qualité).
import facade from '../assets/photos/14-facade.jpg';
import canapes from '../assets/photos/04-terrasse-canapes.jpg';
import pergola from '../assets/photos/11-terrasse-pergola.jpg';
import tenteRouge from '../assets/photos/16-tente-salle-rouge.jpg';
import tenteLustre from '../assets/photos/17-salle-tente-lustre.jpg';
import entrecote from '../assets/photos/15-entrecote-frites.jpg';
import gin from '../assets/photos/12-plateau-boissons-gin.jpg';
import ardoise from '../assets/photos/10-terrasse-ardoise.jpg';
import moules from '../assets/photos/02-moules-frites.jpg';
import dessert from '../assets/photos/06-dessert-fondant.jpg';
import charcuterie from '../assets/photos/13-planche-charcuterie.jpg';
import nachos from '../assets/photos/08-plateau-nachos-cocktail.jpg';
import tables from '../assets/photos/09-terrasse-tables.jpg';
import caprese from '../assets/photos/03-assiette-caprese-jambon.jpg';

export const photos = {
  facade: { src: facade, alt: 'La façade du restaurant et son enseigne noire à taches de vache, Oh la Vache !, Chaussée de Marche.' },
  canapes: { src: canapes, alt: 'La terrasse, ses canapés, ses parasols et un luminaire rond.' },
  pergola: { src: pergola, alt: 'La terrasse sous pergola, tables dressées sur le gazon, ardoise des suggestions.' },
  tenteRouge: { src: tenteRouge, alt: 'La salle sous tente le soir, éclairée de rouge, avec son lustre.' },
  tenteLustre: { src: tenteLustre, alt: 'La salle sous tente en journée : lustre, rideaux rouges, tables dressées.' },
  entrecote: { src: entrecote, alt: 'Une entrecôte grillée, des frites en panier, de la salade et une sauce.' },
  gin: { src: gin, alt: 'Un plateau de boissons : une bouteille de gin, deux tonics et deux verres.' },
  ardoise: { src: ardoise, alt: 'La terrasse au soleil, parasol noir et ardoise des suggestions.' },
  moules: { src: moules, alt: 'Des moules-frites servies avec une ardoise de boissons.' },
  dessert: { src: dessert, alt: 'Un dessert au chocolat avec une boule de glace.' },
  charcuterie: { src: charcuterie, alt: 'Une planche de charcuterie et un verre de rosé.' },
  nachos: { src: nachos, alt: 'Un plateau de nachos et des cocktails.' },
  tables: { src: tables, alt: 'La terrasse, tables et parasols.' },
  caprese: { src: caprese, alt: 'Une assiette de tomate-mozzarella, jambon cru et salade.' },
} as const;
export type CleePhoto = keyof typeof photos;
