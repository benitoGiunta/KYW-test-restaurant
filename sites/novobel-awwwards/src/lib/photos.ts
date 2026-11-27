// Photos du site actuel de Novobel (data/restaurants/novobel/photos/), servies par astro:assets.
// Ce sont des images du site novobel.com, pour la plupart des photos de stock probables (dossier.md) : crédit
// « photos : site novobel.com » et mention « images d'illustration » sur les pages. Alt d'après `sujet` de index.json.
import visite from '../assets/photos/01-visite-plateau.jpg';
import ferraillage from '../assets/photos/03-ferraillage.jpg';
import couchant from '../assets/photos/04-benne-couchant.jpg';
import mesure from '../assets/photos/05-mesure-dalle.jpg';
import entrepot from '../assets/photos/06-entrepot-vide.jpg';
import cuisine from '../assets/photos/08-cuisine-marbre.jpg';
import salon from '../assets/photos/09-salon-fenetre.jpg';
import outils from '../assets/photos/12-outils.jpg';
import combles from '../assets/photos/14-combles-echelle.jpg';

export const photos = {
  visite: { src: visite, alt: 'Quatre personnes en gilets jaunes et casques traversent un plateau de bureaux en chantier.' },
  ferraillage: { src: ferraillage, alt: 'Un ouvrier harnaché marche sur un ferraillage de chantier, des chaînes de levage au-dessus de lui.' },
  couchant: { src: couchant, alt: 'Silhouettes d’ouvriers au coucher du soleil autour d’une benne à béton suspendue à la grue.' },
  mesure: { src: mesure, alt: 'Deux ouvriers accroupis mesurent une dalle au mètre ruban.' },
  entrepot: { src: entrepot, alt: 'Deux personnes en gilets orange regardent un grand volume vide aux murs de béton.' },
  cuisine: { src: cuisine, alt: 'Une cuisine noire avec un îlot en marbre dans un appartement rénové, parquet clair au sol.' },
  salon: { src: salon, alt: 'Une pièce claire et rénovée : fenêtre drapée, table ronde et deux fauteuils sur un parquet.' },
  outils: { src: outils, alt: 'Gant de travail et outils (clé à molette, clé serre-tube) rangés dans une ceinture de cuir.' },
  combles: { src: combles, alt: 'Un ouvrier prend des mesures sous une fenêtre de toit dans des combles en rénovation, une échelle à côté.' },
} as const;
export type CleePhoto = keyof typeof photos;
