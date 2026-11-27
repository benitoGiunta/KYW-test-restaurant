// Photos du client (data/restaurants/bergerie-lives/photos/), servies par astro:assets. Crédit : « photos : La Bergerie de Lives ».
// Alt : ce que montre la photo (champ « sujet » de photos/index.json), sans nommer de personne.
import facade from '../assets/photos/01-facade-domaine.jpg';
import cour from '../assets/photos/02-cour-domaine.jpg';
import verandaTables from '../assets/photos/03-veranda-tables-mariage.jpg';
import verandaDressee from '../assets/photos/04-veranda-table-dressee.jpg';
import verandaSalon from '../assets/photos/05-veranda-salon.jpg';
import verandaCocktail from '../assets/photos/06-veranda-cocktail.jpg';
import ceremonieJardin from '../assets/photos/07-ceremonie-laique-jardin.jpg';
import ceremonieAssemblee from '../assets/photos/08-ceremonie-assemblee.jpg';
import sortieCeremonie from '../assets/photos/09-sortie-ceremonie.jpg';
import jardinBancs from '../assets/photos/10-jardin-bancs.jpg';
import tonneau from '../assets/photos/11-tonneau-fleurs.jpg';
import piscine from '../assets/photos/12-piscine-sous-eau.jpg';
import chaises from '../assets/photos/13-chaises-mr-mrs.jpg';
import coupleSerre from '../assets/photos/14-couple-serre-nb.jpg';
import bassin from '../assets/photos/15-bassin-jardin.jpg';
import tonnelle from '../assets/photos/16-tonnelle-automne.jpg';
import chambre from '../assets/photos/17-chambre-boisee.jpg';
import tableFleurs from '../assets/photos/18-table-fleurs.jpg';
import fleursTable from '../assets/photos/19-fleurs-table.jpg';
import planTable from '../assets/photos/20-plan-de-table-roues.jpg';
import buffet from '../assets/photos/23-buffet-petits-fours.jpg';
import roses from '../assets/photos/24-roses-vase.jpg';
import sax from '../assets/photos/25-saxophoniste.jpg';

export const photos = {
  facade: { src: facade, alt: 'Façade en pierre et toits de tuiles du domaine, pelouse et allée gravillonnée sous un grand arbre' },
  cour: { src: cour, alt: 'La cour du domaine, bordée de bâtiments de pierre, sous un arbre majestueux' },
  verandaTables: { src: verandaTables, alt: 'Tables rondes dressées en blanc sous la véranda vitrée, bouquet de fleurs au centre' },
  verandaDressee: { src: verandaDressee, alt: 'Table de réception dressée dans la véranda, verres, couverts et bouquet' },
  verandaSalon: { src: verandaSalon, alt: 'Coin salon blanc dans la véranda, plantes vertes et verrière' },
  verandaCocktail: { src: verandaCocktail, alt: 'Mange-debout noirs sous la verrière de la véranda, jardin en arrière-plan' },
  ceremonieJardin: { src: ceremonieJardin, alt: 'Cérémonie laïque dans le jardin : arche fleurie, tonneau de bois et bancs en bois' },
  ceremonieAssemblee: { src: ceremonieAssemblee, alt: 'Assemblée réunie face à un cercle de bois et un tonneau, dans le jardin du domaine' },
  sortieCeremonie: { src: sortieCeremonie, alt: 'Sortie de cérémonie dans le jardin, invités en fête de chaque côté de l’allée' },
  jardinBancs: { src: jardinBancs, alt: 'Rangées de bancs en bois sous les arbres du jardin, prêtes pour une cérémonie' },
  tonneau: { src: tonneau, alt: 'Tonneau de bois entouré de fleurs et d’herbes sous les arbres, livrets de cérémonie posés devant' },
  piscine: { src: piscine, alt: 'Nageuse sous l’eau dans la piscine, eau turquoise et bulles' },
  chaises: { src: chaises, alt: 'Deux chaises habillées de housses blanches et de toile de jute, assises de la table d’honneur' },
  coupleSerre: { src: coupleSerre, alt: 'Photographie en noir et blanc d’un couple enlacé sous les arceaux d’une serre' },
  bassin: { src: bassin, alt: 'Bassin du jardin entouré de bambous et de nénuphars' },
  tonnelle: { src: tonnelle, alt: 'Tonnelle de vigne aux feuilles d’automne dorées, feuilles mortes sur le sol' },
  chambre: { src: chambre, alt: 'Chambre lumineuse aux boiseries chaudes, grand lit blanc et fenêtre cintrée' },
  tableFleurs: { src: tableFleurs, alt: 'Roses et fleurs des champs dans un vase, verres alignés sur une table de réception' },
  fleursTable: { src: fleursTable, alt: 'Deux vases de roses et de fleurs des champs sur une nappe blanche, véranda ensoleillée' },
  planTable: { src: planTable, alt: 'Plan de table accroché à deux roues de vélo, cartes rubanées et fleurs séchées' },
  buffet: { src: buffet, alt: 'Buffet de petits fours sur une longue table blanche' },
  roses: { src: roses, alt: 'Roses roses dans des vases en verre sur une table blanche' },
  sax: { src: sax, alt: 'Saxophoniste jouant en plein air devant le feuillage du jardin' },
} as const;
export type CleePhoto = keyof typeof photos;
