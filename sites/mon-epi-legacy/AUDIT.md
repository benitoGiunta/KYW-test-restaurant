# Audit Hallmark · Monepi Boulangerie · 27/11/2026

Source : http://www.monepi.be (WordPress, thème de démonstration, HTML sauvegardé dans `data/restaurants/mon-epi/site-actuel/`, captures lues). Genre inféré : editorial (artisan, récit, produits à prix). Note : Monepi est une boulangerie, pas un restaurant (dossier.md).

## Lecture en quatre lignes
1. Pour quoi : montrer une boulangerie au four à bois ; action unique : appeler (aucune réservation en ligne).
2. Ce qui reste : le récit (four breton, meunerie à meules de granit, Dirk Longin), les photographies de très bonne qualité, la carte détaillée avec compositions.
3. Ce qui se lit généré : Poppins partout (REFLEX 1), pas d'état `:active` (26b), majuscules espacées en nav (FAIL 67), slider de 5 images avec points (18), photos à 43 % de la page sous le hero (83), trou de 685 px sous le hero (79), titres collés à ce qui précède (71).
4. Ce qui est cassé : page Quiches en 404, galerie vide, pas de meta description (F23), script en erreur au chargement (render), bandeau supérieur à 1,84:1 (40), noms d'URL de thème (`pie-chart`).

## Structure d'origine
Pages : accueil, À propos, 5 pages produits, Galerie, Contact. Nav : Accueil, Monepi, Nos produits, Galerie, Contact. Pied : adresse et réseaux sommaires. Hero : slider 5 images, titre en capitales sur photo. Animations : slider (Revolution), reveals. Mobile 375 : lisible, menu burger. Copie : « Prendre le temps de faire de l'excellent pain artisanal ».

## Findings par tier (before.txt, 449 FAIL, 36 REFLEX, 8 WARN)
Floor : 62 contenu masqué au repos (`.tp-bullet`), 67 majuscules en nav, render (script lève). Reflex : 1, 24b, 26b, 39b (bouton 36 px), 71, 79, 83. Finish : F1 apostrophes droites, F2 points de suspension, F3 pas de `text-wrap: balance`, F21 h2 puis h5, F23 meta description. Jugées : 6b, 8, 9, 23, 29, 44, 54, 58, 63, 66, 69, 77 (0 section détectée), 78 et 79, 80 à 85 : à passer en phase 3 sur le rendu final.

## Axes d'amélioration
Coût faible : meta description, états `:active`, `balance`, typographie. Moyen : nav sans capitales, boutons 48 px, une photo fixe au lieu du slider. Ce que seul full règle : le système (Poppins, ocre sur blanc) et la composition (hero qui ouvre sur la carte, bande brune, frise).
