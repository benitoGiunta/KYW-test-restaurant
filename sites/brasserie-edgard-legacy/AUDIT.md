# Audit Hallmark · Brasserie Edgard (Mr Edgard) · 2026-11-20

Source : https://www.brasserieedgard.be (WordPress, Elementor, Link-Eat), six pages sauvegardées dans `data/restaurants/brasserie-edgard/site-actuel/`. Genre inféré : editorial (brasserie familiale, grande carte, photos chaudes ; ni sombre, ni ludique).

## Lecture en quatre lignes
1. Pour : réserver une table (Barestho) et lire la carte ; clientèle familiale et d'affaires de Saint-Servais.
2. Reste : la façade de nuit plein écran, la carte complète et ses prix, le lunch, les menus de groupe, l'ordre des routes.
3. Se lit généré : hero de 2011 px (44c), sections collées (59), titres à 30 et 35 px (78), pied sur une newsletter (85), quatre graisses (F19), pas de meta description (F23).
4. Cassé : menus dupliqués dans le HTML, « Cuisine fermé », prix sans « € », images de galerie 15 et 17 en 404, bouton Barestho flottant qui couvre le contenu.

## Structure d'origine
Accueil (slider façade, logo centré, menu scindé gauche et droite, bouton flottant rose), La carte (ancres entrées, viandes, poissons, pâtes, salades, enfants, desserts), Lunch et suggestions, Menu groupe (menu, carte réduite, formulaire), Galerie, Contact (coordonnées, newsletter). Mobile : hero très haut, façade recadrée, burger.

## Findings par tier (before.txt : 121 FAIL, 73 REFLEX, 42 WARN)
- Floor : tokens et polices absents, overflow, états de focus (CSS externe Elementor, majoritairement non rendu hors ligne : lecture sur les captures).
- Reflex : 44c, 59, 72 (texte au bord à 375), 78, 79, 83 (galerie 65 % de photos, légitime), 85.
- Finish : F1 guillemets droits, F2 points de suspension, F15, F19, F21 (h2 puis h4), F23, F26.
- Jugées : 8 (gabarit hero, cartes, CTA) non applicable, 58 (h1 de 8 mots, paragraphe de 36 mots), 77 (3 sections par page), 69 (horaires répétés).

## Axes d'amélioration
Faible coût : meta description, « € », guillemets, hiérarchie des titres, réservation sans bouton flottant. Moyen : échelle typographique, espacement, carte en rows. Seul `full` règle : composition du hero, rythme photo et texte, pied de page, et la carte lisible à 375 px.
