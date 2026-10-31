// Photos du client (data/restaurants/atelier-de-bossime/photos/), servies par astro:assets.
// Alt : ce que montre la photo. Le portrait n° 18 n'est pas utilisé (identité « à confirmer »).
import salleSoir from '../assets/photos/salle-soir.jpg';
import platVeloute from '../assets/photos/plat-veloute.jpg';
import cocktailCoupe from '../assets/photos/cocktail-coupe.jpg';
import bouteilles from '../assets/photos/bouteilles.jpg';
import tableBrique from '../assets/photos/table-brique.jpg';
import vitrineJardin from '../assets/photos/vitrine-jardin.jpg';
import platTarte from '../assets/photos/plat-tarte-champignons.jpg';
import facadeNuit from '../assets/photos/facade-nuit.jpg';
import platVolaille from '../assets/photos/plat-volaille.jpg';
import equipeTrois from '../assets/photos/equipe-trois.jpg';
import dressage from '../assets/photos/dressage.jpg';
import cuisineOuverte from '../assets/photos/cuisine-ouverte.jpg';
import ferme from '../assets/photos/ferme.jpg';
import serviceFenil from '../assets/photos/service-fenil.jpg';
import dessertChocolat from '../assets/photos/dessert-chocolat.jpg';
import plateau from '../assets/photos/plateau.jpg';
import duoCuisine from '../assets/photos/duo-cuisine.jpg';
import platConcombre from '../assets/photos/plat-concombre.jpg';
import cocktailSour from '../assets/photos/cocktail-sour.jpg';
import platTomate from '../assets/photos/plat-tomate.jpg';
import platCanard from '../assets/photos/plat-canard.jpg';
import platPoireau from '../assets/photos/plat-poireau.jpg';
import platSauceRouge from '../assets/photos/plat-sauce-rouge.jpg';

export const photos = {
  salleSoir: { src: salleSoir, alt: 'La salle au service du soir : murs de briques, plafond incliné du fenil, tables occupées.' },
  platVeloute: { src: platVeloute, alt: 'Une assiette vue de haut : velouté vert, légumes taillés, croquette, et un pot de sauce à côté.' },
  cocktailCoupe: { src: cocktailCoupe, alt: 'Un cocktail mousseux dans une coupe, au bar, bouteilles dans le flou.' },
  bouteilles: { src: bouteilles, alt: 'Une membre de l’équipe étiquette à la main des bouteilles de boisson maison rouge.' },
  tableBrique: { src: tableBrique, alt: 'Une table dressée pour deux contre le mur de briques, une plante en pot.' },
  vitrineJardin: { src: vitrineJardin, alt: 'La salle vue de dehors, à travers la baie vitrée où se reflète le jardin.' },
  platTarte: { src: platTarte, alt: 'Une tartelette garnie de champignons crus tranchés finement, sur une assiette de grès.' },
  facadeNuit: { src: facadeNuit, alt: 'Le restaurant de nuit : la grande baie éclairée dans le bâtiment de briques, l’escalier extérieur.' },
  platVolaille: { src: platVolaille, alt: 'Volaille et carottes nappées de sauce dans une assiette creuse grise.' },
  equipeTrois: { src: equipeTrois, alt: 'Trois membres de l’équipe en cuisine, tabliers Bossimé, en train de rire.' },
  dressage: { src: dressage, alt: 'Six assiettes dressées en même temps à la pince par la brigade, sur le passe.' },
  cuisineOuverte: { src: cuisineOuverte, alt: 'Un cuisinier en tablier dresse au passe de la cuisine ouverte, les plans inox derrière lui.' },
  ferme: { src: ferme, alt: 'Le bâtiment de la ferme en briques et tuiles rouges, herbes hautes et graminées devant.' },
  serviceFenil: { src: serviceFenil, alt: 'Sous la charpente du fenil, un membre de l’équipe présente la carte à une table de quatre.' },
  dessertChocolat: { src: dessertChocolat, alt: 'Un dessert à la tuile de chocolat ajourée, une sauce chocolat versée sur l’assiette.' },
  plateau: { src: plateau, alt: 'Un serveur en tablier Bossimé porte un plateau de deux assiettes et un livret.' },
  duoCuisine: { src: duoCuisine, alt: 'Deux cuisiniers en tablier Bossimé posent devant la cuisine.' },
  platConcombre: { src: platConcombre, alt: 'Concombre sauté, sésame et noisettes dans une assiette claire.' },
  cocktailSour: { src: cocktailSour, alt: 'Un cocktail sour mousseux, rondelle d’agrume séchée, à côté d’une pochette de cuir.' },
  platTomate: { src: platTomate, alt: 'Tomates du potager et fleurs de bourrache ; un jus vert est versé à la bouteille sur l’assiette.' },
  platCanard: { src: platCanard, alt: 'Canard rosé sur une assiette ronde, pain maison et crème en ramequin.' },
  platPoireau: { src: platPoireau, alt: 'Poireau grillé, herbes et galette brune sur une assiette claire.' },
  platSauceRouge: { src: platSauceRouge, alt: 'Trois pièces posées sur une sauce rouge intense, vues de haut.' },
} as const;
export type CleePhoto = keyof typeof photos;
