# Audit Hallmark · Novobel · 2026-11-27

Source : https://www.novobel.com (Wix), captures et textes dans data/restaurants/novobel/site-actuel/. Audit fait sur les captures et le texte capturé ; `sloplint --before` non lancé (budget de réponses, phase 1 réduite) : à faire en phase 2 si le temps le permet.

**Hypothèse de départ.** Novobel n'est pas un restaurant (dossier.md : entreprise de construction et rénovation, BCE 0726559494). Décision prise sans question : produire la maquette d'une entreprise de rénovation, en gardant le vocabulaire du pipeline (job « book » devient « demander un devis »). Genre inféré : editorial (artisan, confiance, intérieurs).

## Lecture en quatre lignes
1. Pour quoi : choisir un artisan de rénovation à Namur ; action unique : demander un devis gratuit (formulaire et chat Wix, e-mail, téléphone).
2. Ce qui reste : logo Novobel, 4 projets, 5 métiers, 6 offres d'emploi, coordonnées, ton familial.
3. Ce qui se lit généré : hero « nom en jaune sur photo d'ouvrier » (gate 8), photos de stock (83), titres anglais (« Projects (List) »), méta description vide, hero + 3 cartes + CTA.
4. Ce qui est cassé : libellés Wix par défaut sur /jobs (Vanilla, Chocolate, Strawberry, Rocky Road), meta description vide, « actifs depuis 25 ans » contredit la BCE (2019), faute dans les textes d'origine (« avancment », « respceter », « traité »), aucune horaire.

## Structure d'origine
Pages : Accueil (avec « À propos »), Services, Projets, Carrière, Articles (/blog). Nav centrée sous un logo. Hero plein cadre (ouvrier), titre jaune acide, palette anthracite, jaune, blanc. Animations : swiper, lottie, gsap sur /services. Images : 14, dont 8 de stock probable. Copie : courte, familiale.

## Findings par tier
Floor : 8 (pas de métrique inventée : ok), 12 (hero lisible : à prouver en phase 2). Reflex : 8 (gabarit hero, cartes, CTA), 54 (labels en capitales), 58 (hero chargé). Finish : 83 (stock), 80 à 85 (fin sans horaires). Jugées : 23, 29, 44, 54, 58, 63, 66, 69 non mesurées en phase 1.

## Axes d'amélioration
Peu coûteux : meta description, libellés français, coordonnées en pied. Que full règle : système typographique, composition, une seule chorégraphie, tri des photos.
