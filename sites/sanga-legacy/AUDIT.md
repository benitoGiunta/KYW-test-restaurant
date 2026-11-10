# Audit Hallmark · Sanga · 10/11/2026

Source : https://www.sanganamur.be (WordPress, thème Flatsome, plateforme Order & Eat), HTML sauvegardé `data/restaurants/sanga/site-actuel/page.html` et captures desktop et mobile. Genre inféré : **editorial** (restaurant de quartier, une carte à lire, aucune dominante sombre ni ludique).

## Lecture en quatre lignes
1. Pour quoi : commander des ramen ou appeler ; l'action unique est « Commander » (Order & Eat), le téléphone en second.
2. Ce qui reste : le premier restaurant de ramen à Namur, la carte en six rubriques, le téléphone 081 24 10 38, Rue Saint-Loup 8, les horaires (mardi à dimanche, midi et soir), les zones et minimums de livraison, les moyens de paiement.
3. Ce qui se lit généré : couleurs en dur par centaines (gate 48), pur blanc et noir (7a), carrousel de tuiles de catégories identiques (24b), titres sans équilibre (F3).
4. Ce qui est cassé : aucune balise `<title>` sémantique propre, fautes (« Biéres », « Pouple », « Ouef », « vegitarian »), « Openingsuren » en néerlandais, images produits en placeholder sur les catégories, 15 px de débordement à 375 (gate 34), hiérarchie h3 puis h6.

## Structure d'origine
- Pages : une seule page d'accueil (one-page) ; la boutique (catégories, panier, compte) est un parcours Order & Eat. Nav « Home | menu », recherche, compte, panier à droite, logo bol centré.
- Hero : photo pleine largeur de deux bols de ramen, voile rose grisé, « Irashaimase! Bienvenue! », adresse, téléphone, deux phrases (posture Poster).
- Sections : « Commandez maintenant » (six vignettes de catégories sur fond blanc), coordonnées, horaires, zones de livraison, logos de paiement, pied « Member of Order & Eat ».
- Animations : aucune notable (parallaxe du hero Flatsome). Images : cinq photos de plats de 2018 à 2021 (saturées), aucune photo de salle. Mobile 375 : tuiles sur deux colonnes, débordement de 15 px. Copie : français mêlé de néerlandais et d'anglais (« Openingsuren », « miso taste »).

## Findings par tier (before.txt : 138 FAIL, 82 REFLEX, 7 WARN, sur du CSS de thème)
- Floor : 48 (113 couleurs littérales), 7a (17 pur blanc ou noir), 40 (3), 34 (débordement x), 19 (tiret « – » dans le copy), 67 (étiquettes capitales). 
- Reflex : 24b (74, grille de tuiles identiques), 79, 72, 59, 49b, 44c, 39b, 26b, 1.
- Finish et jugées : 6b (hauteur `vh` du hero), 8 (hero, tuiles, CTA : gabarit gardé en séquence, composition neuve), 9 (pas de bloc de preuve : aucune métrique inventée), 23, 29, 44 (fold), 54 et 58 (copie à alléger), 63, 66, 69 (horaires et adresse répétés trois fois, à dire une fois), 77 à 79 (mesure et pied de hero), 80 à 85 (images de catalogue à un tiers, pas de bloc newsletter).

## Axes d'amélioration (par coût)
1. Gratuit : tokens de couleur, titres équilibrés, accents et casse, fautes corrigées, `<title>` et description.
2. Faible : la carte complète lisible sur la page (le site d'origine n'affiche aucun plat ni aucun prix sans passer par Order & Eat), horaires en tableau, zones de livraison en deux paliers.
3. Seul « full » règle : la hiérarchie typographique, le système de composition (Rows, Showcase, Band, Schedule) et le ton de l'ensemble.
