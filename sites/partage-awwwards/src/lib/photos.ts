// Photos du client (data/restaurants/partage/photos/), servies par astro:assets. Crédit : « photos : Partage ».
// Alt : ce que montre la photo. Seul le portrait 09 est nommé (Charles Jeandrain, « portrait du chef » au dossier).
import salleDuo from '../assets/photos/01-salle-table-duo.jpg';
import claustraTable from '../assets/photos/05-salle-claustra-table.jpg';
import tableCitronnier from '../assets/photos/06-table-dressee-citronnier.jpg';
import claustraLogo from '../assets/photos/07-salle-claustra-logo.jpg';
import salleLarge from '../assets/photos/08-salle-vue-large.jpg';
import signeMural from '../assets/photos/04-salle-signe-mural.jpg';
import chefPortrait from '../assets/photos/09-chef-portrait-sourire.jpg';
import facadeEquipe from '../assets/photos/10-facade-equipe.jpg';
import cuisinierPortrait from '../assets/photos/11-cuisinier-portrait.jpg';
import jambon from '../assets/photos/12-plat-jambon-iberique.jpg';
import serviceBouteille from '../assets/photos/13-salle-service-bouteille.jpg';
import bol from '../assets/photos/14-plat-bol-assaisonnement.jpg';
import tartines from '../assets/photos/15-plat-tartines.jpg';
import passe from '../assets/photos/16-cuisinier-passe.jpg';
import verres from '../assets/photos/17-verres-table.jpg';
import citron from '../assets/photos/18-plat-citron-presse.jpg';
import chefCuisine from '../assets/photos/19-chef-cuisine-hero.jpg';

export const photos = {
  salleDuo: { src: salleDuo, alt: 'Une table pour deux en chêne clair contre le mur blanc de la salle.' },
  claustraTable: { src: claustraTable, alt: 'Une table dressée près du claustra ajouré à motifs de triangles.' },
  tableCitronnier: { src: tableCitronnier, alt: 'Couvert dressé sur une table de pierre claire, verres à vin et serviette roulée, un citronnier derrière.' },
  claustraLogo: { src: claustraLogo, alt: 'La salle vue entre le claustra et le mur, l’enseigne murale aux lames noires au fond.' },
  salleLarge: { src: salleLarge, alt: 'Vue d’ensemble de la salle : chaises en chêne, murs de briques peintes, l’enseigne aux quatre lames noires.' },
  signeMural: { src: signeMural, alt: 'L’enseigne murale de Partage : quatre lames noires empilées, découpées en arcs, sur la brique blanche.' },
  chefPortrait: { src: chefPortrait, alt: 'Charles Jeandrain, lunettes noires, sourit bras croisés devant la cuisine.' },
  facadeEquipe: { src: facadeEquipe, alt: 'Quatre membres de l’équipe posent devant la façade noire marquée PARTAGE, dans le piétonnier.' },
  cuisinierPortrait: { src: cuisinierPortrait, alt: 'Un cuisinier barbu en veste noire, un quartier d’agrume à la main, dans la cuisine sombre.' },
  jambon: { src: jambon, alt: 'Une assiette de jambon ibérique tranché, gressins croisés et biscuit, vue de haut.' },
  serviceBouteille: { src: serviceBouteille, alt: 'Un membre de la salle présente en riant une bouteille à une table.' },
  bol: { src: bol, alt: 'Une main assaisonne un bol de légumes taillés en brunoise sur le passe.' },
  tartines: { src: tartines, alt: 'Deux tartines garnies et couvertes d’herbes fraîches sur une assiette rectangulaire.' },
  passe: { src: passe, alt: 'Un cuisinier dresse une poêlée de légumes rôtis au passe, sous la lampe.' },
  verres: { src: verres, alt: 'Deux verres à vin et deux gobelets ambrés sur une table, couverts noirs posés devant.' },
  citron: { src: citron, alt: 'Un demi-citron pressé à la main au-dessus d’un bol de fritures dorées.' },
  chefCuisine: { src: chefCuisine, alt: 'Charles Jeandrain en veste blanche, penché sur le passe de la cuisine inox.' },
} as const;
export type CleePhoto = keyof typeof photos;
