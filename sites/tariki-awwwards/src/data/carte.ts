// Carte de Tariki, transcrite de donnees.json (carte du soir de la page « La carte » du client).
// Aucun plat fictif : placeholder: false partout. Généré puis relu à la main.
export interface Plat { nom: string; description: string; prix: number; placeholder?: boolean }
export interface Rubrique { id: string; titre: string; etape: string; plats: Plat[] }
export const soir: Rubrique[] = [
  { id: 'grignoter', titre: "À grignoter", etape: "Au bord du chemin", plats: [
    { nom: "Noix de cajou fumées", description: "Épices du Levant", prix: 4 },
    { nom: "Olives Kalamata", description: "Agrumes, persil", prix: 4 },
    { nom: "Expérience épicée", description: "Piments turşu, beurre cumin-harissa, pickles de légumes", prix: 6 },
    { nom: "Bagel de Jérusalem", description: "Huile d’olive, zaatar", prix: 5 },
  ] },
  { id: 'partager', titre: "À partager", etape: "La halte", plats: [
    { nom: "Houmous", description: "Pois chiches, tahini, aromates", prix: 9 },
    { nom: "Labneh", description: "Ail confit, zaatar, huile d’olive", prix: 9 },
    { nom: "Muhammara x Stracciatella", description: "Poivron rouge rôti, stracciatella, tomates fraîches", prix: 13 },
    { nom: "Mutabal", description: "Aubergines fumées, sésame, grains de grenade", prix: 9 },
    { nom: "Rakakat", description: "Feta, menthe, miel chaud (4 pièces)", prix: 10 },
    { nom: "Fatayer", description: "Chaussons d’épinards acidulés (3 pièces)", prix: 11 },
    { nom: "Halloumi", description: "Halloumi grillé, parmesan, citron, dukkah", prix: 11 },
    { nom: "Falafel", description: "Tahini, pickles (4 pièces)", prix: 10 },
    { nom: "Kebbeh", description: "Mélasse de grenade, pistaches (3 pièces)", prix: 12 },
  ] },
  { id: 'feu', titre: "Au feu de bois", etape: "Le foyer", plats: [
    { nom: "Kefta", description: "Agneau, shakshouka, bawaz, légumes grillés", prix: 19 },
    { nom: "Tawook", description: "Poulet, toum, sauce Tariki, légumes grillés", prix: 17 },
    { nom: "Magret de canard", description: "Jus réduit à la grenade, salade d’herbes fraîches", prix: 32 },
    { nom: "Maquereau", description: "Tahini à l’oignon caramélisé, salade d’herbes fraîches", prix: 26 },
    { nom: "Brocoli rôti", description: "Tarator, huile d’Alep, pignons de pin", prix: 18 },
  ] },
  { id: 'accompagnements', titre: "Accompagnements", etape: "À côté du feu", plats: [
    { nom: "Batata Harra", description: "Grenailles dorées, relevées, citronnées", prix: 8 },
    { nom: "Salade Fatoush", description: "Légumes croquants, tuile au thym, vinaigrette sumac", prix: 8 },
  ] },
  { id: 'desserts', titre: "Desserts", etape: "L’arrivée", plats: [
    { nom: "Glace Ashta", description: "Confiture de rose, barbe à papa", prix: 9 },
    { nom: "Baklava pistache", description: "Pistache croustillante, glacée et fondante", prix: 11 },
  ] },
];

export const midi: Plat[] = [
  { nom: "Tawook", description: "Poulet, toum, sauce Tariki, pickles de légumes", prix: 9 },
  { nom: "Tawook épicé", description: "Poulet, spicy toum, sauce Tariki, pickles de légumes", prix: 9 },
  { nom: "Falafel", description: "Falafels croustillants, tahini, pickles de légumes", prix: 9 },
];
