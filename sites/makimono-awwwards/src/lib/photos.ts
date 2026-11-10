// Photos du client (data/restaurants/makimono/photos/). Crédit : « photos : Makimono ».
// Alt d'après le champ `sujet` de photos/index.json : aucune personne ni aucun plat nommé sans preuve.
import planche from '../assets/photos/02-rolls-planche-jalapeno.jpg';
import pokeGros from '../assets/photos/04-poke-bowl-gros-plan.jpg';
import salleFenetres from '../assets/photos/06-salle-fenetres.jpg';
import salleTables from '../assets/photos/07-salle-tables.jpg';
import mochis from '../assets/photos/08-mochis-fraises.jpg';
import facade from '../assets/photos/09-facade-terrasse.jpg';
import accomp from '../assets/photos/10-accompagnements-gyoza.jpg';
import snacke from '../assets/photos/11-rolls-saumon-snacke.jpg';
import assiette from '../assets/photos/12-rolls-assiette.jpg';
import flambe from '../assets/photos/13-nigiri-saumon-flambe.jpg';
import creative from '../assets/photos/14-creative-box.jpg';
import chicken from '../assets/photos/15-poke-chicken.jpg';

export const photos = {
  planche: { src: planche, alt: 'Deux plateaux de rolls, saumon snacké et rolls garnis de piment vert, sur une ardoise noire.' },
  pokeGros: { src: pokeGros, alt: 'Poké bowl au saumon, avocat, edamame et tobiko, en gros plan.' },
  salleFenetres: { src: salleFenetres, alt: 'La salle : tables en bois, chaises en métal, grandes fenêtres et parquet sombre.' },
  salleTables: { src: salleTables, alt: 'La salle : tables en bois clair, chaises en métal, étagères au mur.' },
  mochis: { src: mochis, alt: 'Mochis roses et verts empilés, entourés de fraises.' },
  facade: { src: facade, alt: 'La façade vitrée de la rue Saint-Loup, avec sa terrasse et l’ardoise « Freshly made with love ».' },
  accomp: { src: accomp, alt: 'Accompagnements vus du dessus : gyoza, poulet frit, tempura de scampis, wakame, soupe miso et riz.' },
  snacke: { src: snacke, alt: 'Rolls au saumon snacké nappés de sauce teriyaki et de ciboulette, sur fond sombre.' },
  assiette: { src: assiette, alt: 'Rolls aux sésames noirs, oignons verts et mayonnaise, sur une assiette marbrée bleue.' },
  flambe: { src: flambe, alt: 'Nigiri de saumon flambés au chalumeau sur une assiette noire, la flamme encore visible.' },
  creative: { src: creative, alt: 'Creative Box : assortiment de rolls garnis de tobiko et de sauce épicée.' },
  chicken: { src: chicken, alt: 'Poké Chicken : poulet katsu, nachos, cream cheese et coriandre.' },
} as const;
export type CleePhoto = keyof typeof photos;
