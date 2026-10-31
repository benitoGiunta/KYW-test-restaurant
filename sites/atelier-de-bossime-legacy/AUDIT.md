# Audit Hallmark · L’Atelier de Bossimé · 31/10/2026
Source : https://www.atelier-de-bossime.be, HTML sauvegardé le 31/10/2026 (accueil, carte, cuisine, réservation, contact, copiés dans `.hallmark/site-actuel/`), captures desktop et mobile du client (`data/restaurants/atelier-de-bossime/site-actuel/`).
Genre inféré : editorial parce que le site est clair, crème, photographique et parle d’une table gastronomique de ferme, sans registre nocturne ni ludique (page non estampillée : genre déduit, pas lu).

Commande : `sloplint.mjs .hallmark/site-actuel --genre editorial --render --before` → 93 FAIL, 88 REFLEX, 32 WARN sur 5 fichiers ; 68 liens, 20 champs, 13 handlers enregistrés dans `.hallmark/before.json` ; 25 captures dans `.hallmark/site-actuel/.hallmark/before/` (le CSS E-net absolu se charge mal hors ligne : les tells de couleur et de type sont lus sur les captures du client).

## La lecture en quatre lignes
- Pour quoi : des gourmets de Namur, Bruxelles et Liège qui viennent pour une table gastronomique durable ; l’action unique est réserver (Zenchef, ou le téléphone).
- Ce qui marche et reste : la photographie (25 photos de qualité : salle en briques sous la charpente, cuisine ouverte, assiettes), le hero photo plein cadre avec sa carte crème posée à gauche, le logo aux trois accents, le Zenchef 24 h/24, la carte en onglets avec ses prix.
- Ce qui se lit comme généré ou daté : 3 vignettes photo-titre-« Lire la suite » répétées deux fois (3, 8), 4 valeurs en icônes dans des pastilles (3, F5), titres en capitales trackées et « Notre » en orange devant chaque titre (67, 38iii), copie SEO dense et superlatifs (« expérience unique », « exceptionnelle », 19), module d’avis E-net « 4,84/5 » (46a), bande newsletter « club privé » (85), barre de partage flottante (66).
- Ce qui est cassé : bandeau cookies Usercentrics qui masque le bas de chaque écran, défilement horizontal à 320 px (34, scrollWidth 2396), aucun `:focus-visible` (26a), 3 images 404 et un script qui plante sur chaque page (76, render), coquilles (« octobre 20226 », « surpirse », « solgan », « chauqe »), horaires sans heure de fin dispersés dans le texte, téléphone écrit « +32 (0)0478 ».

## Structure du site d'origine
- Type : multi-pages E-net (accueil one-page de 7 725 px + carte, cuisine, réservation, contact, et salle de réunion, agenda, news, jobs non capturés) · nav : barre utilitaire (téléphone, Loyers, services en ligne) + logo à gauche, six liens à droite · footer : quatre colonnes de liens (index columns) + mentions E-net.
- Sections de l’accueil dans l’ordre : hero (Poster : slider photo plein cadre, carte crème avec logo, accroche et « Réservez une table »), 3 vignettes (Notre cuisine, Notre carte, Réserver), « Encore plus ? » chèques-cadeaux et services, logos de récompenses, « Bossimé - Restaurant » + bouton, bande aubergine « Menu à votre choix » + vignettes répétées, engagement circuit court + devise, news + club privé, 4 valeurs en icônes, avis E-net, footer.
- Pages intérieures : slider bannière, fil d’Ariane, long texte ; carte en six onglets (Lunch, 3/4/5/7 Moments, Jeune gastronome) ; réservation = iframe Zenchef + liste d’étapes ; contact = carte Leaflet + formulaire 7 champs + coordonnées.
- Animations : slider auto (lightslider), parallaxe (paroller), barre de partage fixe ; aucune chorégraphie de scroll (gates 18, 27, 62 : 31 % du texte caché après chargement sur l’accueil).
- Images : photos du restaurant, aucune stock · ratio photo sous le hero : ~100 % sur la carte et la cuisine (83).
- Mobile : bandeau orange « Réservez une table » + bouton d’appel en tête, burger ; texte collé aux bords (72) ; liens qui replient (49b ×40).
- Copie : français SEO, « Découvrez » partout, superlatifs, tirets cadratins et capitales de titre, faits contradictoires (40 ou 70 producteurs, 2011 ou 2010), aucune heure de fermeture.

## Findings par tier (depuis before.txt)
Floor : 93 FAIL · 34 ×40 (overflow 320 px), 44d ×9 (texte à 8 px du bord à 1920), 26a ×8, 48 ×6 (couleurs en ligne), 58 ×5, 73 ×5 (texte sous un élément), 76 ×5 (images 404), render ×5 (script qui plante), 44b ×4 (action sous le pli), 40 ×2, 7a, 10a, 50, 62.
Reflex : 88 · 49b ×40, 26b ×10, 39b ×5 (boutons de 17 px), 44c ×5, 59 ×5, 72 ×5, 77 ×5, 78 ×5 (titres à 24 px), 83 ×4, 25 ×2, 71, 79.
Finish : WARN F1 ×5, F2, F21 ×2, F26 ×5 ; WARN 42 ×5 (footer quatre colonnes), 58 ×5 (jusqu’à 1 447 mots par page).
Jugées (captures) : 6b confirmée (hero : carte centrée-gauche, deux éléments centrés) · 8 confirmée (hero, trois vignettes, CTA, footer) · 9 confirmée (coutures toutes identiques, blanc sur blanc) · 23 écartée (orange sous 5 %) · 29 écartée · 44 confirmée à 1280 (bandeau cookies) · 54 confirmée (« Notre » en eyebrow coloré) · 58 confirmée · 63 confirmée (« Lire la suite → ») · 66 confirmée (barre de partage verticale) · 69 confirmée (horaires répétés trois fois sur la carte) · 77-79 confirmées · 80-82 écartées · 83 confirmée · 84 écartée (Zenchef réel) · 85 confirmée (club privé).

## Axes d’amélioration (classés par coût pour la page)
1. Retirer le bandeau cookies, le slider auto et la barre de partage : la photo et l’action redeviennent visibles au premier écran (44b, 66, 18).
2. Un système : une encre, un pigment, deux familles, une échelle d’espace ; titres ≥ 40 px (48, 78, 59).
3. Les horaires en un tableau, une fois par page, avec le jour courant (69, anatomy book).
4. La carte en livre de jour lisible au téléphone, prix tabulaires, ancres d’onglets gardées.
5. Focus, tailles de contrôles, gouttières, overflow (26a, 39b, 72, 34).
6. Couper la copie SEO à une idée par écran, sans superlatifs ni coquilles (19, 58).
La profondeur la plus légère qui règle tout : full (contrainte KYW). Ce que seul full règle : la composition (vignettes répétées → index de rangs), le hero (photo + carte gardés mais recomposés), le chrome (footer colophon, barre de réservation mobile).
