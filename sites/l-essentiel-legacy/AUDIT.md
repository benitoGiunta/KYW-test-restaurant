# Audit Hallmark · L’Essentiel · 2026-11-07

Source : https://www.lessentiel.be (WordPress, Enfold probable, © 2019), captures et HTML dans `data/restaurants/l-essentiel/site-actuel/`. Rendu avant : `.hallmark/before.txt` (accueil seule ; CSS externe non chargé, plusieurs FAIL viennent du thème WordPress).
Genre inféré : editorial (restaurant gastronomique, matière photographique, ton calme). Travail : réserver une table.

## Lecture en quatre lignes
1. Pour réserver une table (ou une chambre) dans une tannerie du XVIIe siècle à Temploux ; action unique : réserver.
2. Reste : les belles photos de salle, la carte complète tarifée, les six routes, les fermetures annuelles publiées à l’avance.
3. Se lit généré : slider de trois photos (18), texte maigre sur fond blanc/gris (77), liens en capitales (54), quatre graisses (F19), pas de meta description (F23), h1 suivi d’un h3 (F21).
4. Cassé : © 2019, résidus de code Word dans la carte, vignettes de 400 px, logo de 300 px à tracé clair, étoile Michelin absente du texte.

## Structure d’origine
Pages : le restaurant (/), les chambres, carte et menus (/carte-menus-2/), réservation (calendrier maison), contact (formulaire), recrutement (/actualites/). Nav à six entrées en capitales, bande téléphone et réseaux, slider plein écran de trois photos puis un paragraphe, « Un lieu, des ambiances » et « La terrasse ». Pied : contact, horaires, fermetures. Mobile 375 : colonnes empilées, texte maigre.

## Findings par tier (before.txt)
Floor : 54 (capitales), F19 graisses, F21 niveaux de titres. Reflex : 77 (six sections minces), 58 (93 mots d’un écran), 18 (carrousel). Finish : F1 guillemets droits, F3 text-wrap, F23 meta description. Jugées : 8 gabarit « slider, paragraphe, deux blocs » ; 69 horaires dits deux fois dans le pied d’origine ; 85 sans objet.

## Axes d’amélioration
Peu coûteux : titres en casse de phrase, meta, niveaux de titre. Moyens : carte en Rows, horaires en Schedule. Seul le full règle : composition (hero Counter, bento du lieu), système typographique et couleur, distinctions Michelin et Gault&Millau mises en avant.
