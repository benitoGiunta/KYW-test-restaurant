// Photos du client (data/restaurants/mon-epi/photos/), servies par astro:assets. Crédit : photos Monepi.
// Alt : ce que montre la photo (champ `sujet` de photos/index.json). Le boulanger de la photo 22 n'est pas nommé
// (identité non précisée par le site client). Le logo (25) n'est pas affiché en photo : le mot MONEPI est recomposé en type.
import pains01 from '../assets/photos/01-pains-ronds-sortie-four.jpg';
import faconnage03 from '../assets/photos/03-faconnage.jpg';
import flammes05 from '../assets/photos/05-four-flammes.jpg';
import flammes06 from '../assets/photos/06-four-flammes-large.jpg';
import voute07 from '../assets/photos/07-voute-four.jpg';
import facade08 from '../assets/photos/08-four-facade.jpg';
import raisins09 from '../assets/photos/09-petits-pains-raisins.jpg';
import gaufres12 from '../assets/photos/12-gaufres.jpg';
import baguette13 from '../assets/photos/13-baguette-ficelle.jpg';
import graines14 from '../assets/photos/14-pains-graines.jpg';
import seigle15 from '../assets/photos/15-pain-seigle.jpg';
import ronds16 from '../assets/photos/16-pains-ronds.jpg';
import rustiques17 from '../assets/photos/17-pains-rustiques.jpg';
import chocolat18 from '../assets/photos/18-pains-chocolat.jpg';
import tarte19 from '../assets/photos/19-tarte-fraises.jpg';
import petrissage20 from '../assets/photos/20-petrissage.jpg';
import boulanger22 from '../assets/photos/22-boulanger-four.jpg';
import enfourne24 from '../assets/photos/24-enfournement.jpg';

export const photos = {
  painsPelle: { src: pains01, alt: 'Quatre pains ronds striés de farine posés sur la pelle, devant le four.' },
  faconnage: { src: faconnage03, alt: 'Des mains façonnent des pâtons sur la pelle.' },
  flammes: { src: flammes05, alt: 'Une haute flamme au centre du four à bois, sous la voûte de briques rougie.' },
  flammesLarge: { src: flammes06, alt: 'Le four à bois en chauffe : la voûte de briques éclairée par le feu.' },
  voute: { src: voute07, alt: 'La voûte en briques du four, incandescente.' },
  facade: { src: facade08, alt: 'La bouche du four à bois dans son mur de briques, flammes visibles.' },
  raisins: { src: raisins09, alt: 'Trois petits pains aux raisins sur fond noir.' },
  gaufres: { src: gaufres12, alt: 'Deux gaufres dorées sur fond noir.' },
  baguette: { src: baguette13, alt: 'Une baguette et une ficelle sur fond noir.' },
  graines: { src: graines14, alt: 'Des pains longs aux graines de sésame, de pavot et mélangées.' },
  seigle: { src: seigle15, alt: 'Un pain de seigle entier et un pain tranché, posés sur une claie en bois.' },
  ronds: { src: ronds16, alt: 'Deux pains ronds à croûte farinée sur une claie en bois.' },
  rustiques: { src: rustiques17, alt: 'Des pains rustiques sur une claie en bois.' },
  chocolat: { src: chocolat18, alt: 'Des pains au chocolat.' },
  tarte: { src: tarte19, alt: 'Une tarte aux fraises.' },
  petrissage: { src: petrissage20, alt: 'Des mains pétrissent une pâte sur un plan fariné.' },
  boulanger: { src: boulanger22, alt: 'Un boulanger enfourne à la pelle devant le four à bois, les pains rangés sur l’étagère à gauche.' },
  enfourne: { src: enfourne24, alt: 'Des pâtons enfournés à la pelle dans le four à bois.' },
} as const;
export type CleePhoto = keyof typeof photos;
