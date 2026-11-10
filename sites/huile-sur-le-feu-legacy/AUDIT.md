# Audit Hallmark · L’Huile sur le Feu · 10/11/2026

Source : https://www.lhuilesurlefeu.be (Astro + ogl, MOODD), HTML sauvegardé et captures dans `data/restaurants/huile-sur-le-feu/site-actuel/`. Mesure : `sloplint --render --before` sur 5 pages, journal `.hallmark/before.txt` : 515 FAIL, 42 REFLEX, 52 WARN (la quasi-totalité : gate 48, valeurs de couleur hors tokens ×269, et 67 ×80, étiquettes en capitales espacées).

Genre inféré : editorial (restaurant, photographie de plats et de salle, carte lisible) avec une matière sombre. Plus proche d'un lieu de table que d'une marque produit.

## Lecture en quatre lignes
1. Pour quoi : réserver une table (Barestho, téléphone) et lire la carte ; l'action unique est « Réserver ».
2. Ce qui reste : le flambage plein écran, la carte détaillée, la voix (peu de gestes, une huile par plat), les horaires, la boutique « bientôt en ligne ».
3. Ce qui se lit généré : 54 et 67 (surtitres en capitales espacées « NAMUR · CUISINE MÉDITERRANÉENNE », « NOTRE CARTE »), 63 (points médians entre les atouts), 26a (focus), 10a, 24b (14 px, 10 px hors échelle), 83/80 (photos très lisses, génération possible), 7a, tout en bordeaux sombre sans respiration.
4. Ce qui est cassé : bannière de cookies qui couvre le hero mobile, pas de focus visible, boutons en capitales espacées, listes orphelines (F20), police sans repli.

## Structure d'origine
Pages : accueil, /restaurant, /menu, /boutique (« Bientôt en ligne »), /contact, /privacy, /cookies ; FR, EN, IT, NL. Nav : logo centré, cinq liens, bouton Réserver, sélecteur de langue. Footer : colonnes contact, adresse, horaires, réseaux, mentions. Hero : photo de flambage sous voile bordeaux, titre centré, deux boutons, trois atouts. Animations : WebGL (ogl) discret, reveals. Images : 17 photos, rendu lisse. Mobile 375 : hero long, cookies par-dessus, boutons en capitales. Copie : en français, correcte, des tirets cadratins et des points médians.

## Findings par tier (before.txt)
- Floor : 48 (couleurs hors tokens), 26a (focus), 10a, 7a, 34, 50, 62, 76, 19, 54, 58, 63, 67.
- Reflex : 24b ×17, 39b ×5, 37 ×5, 44c ×4, 75 ×3, 83 ×2, 77, 78, 79, 80, 44a.
- Finish : F1 (apostrophes droites), F3, F7 (pilules sur non-contrôles), F20, F24.
- Jugées (gates.md § 5) : 8 (gabarit hero, trois atouts, CTA, séquence conservée en composition neuve), 9, 23 et 29 (hiérarchie du hero), 44, 54, 58 (hero trop de mots), 63, 66, 69 (horaires dits trois fois), 77 à 79, 80 à 85 (photos lisses en stock quasi unique).

## Axes d'amélioration, par coût
1. Peu cher : tokens, focus, apostrophes, suppression des capitales espacées et points médians.
2. Moyen : carte en rangées, horaires en Schedule, pied en phrase, nav avec seul bouton Réserver.
3. Seul full règle : système (bordeaux nuit partout → papier chaud + bandes bordeaux), composition de l'accueil (trois atouts en Bento, hero déplacé en bas à gauche), rythme photo / texte.
