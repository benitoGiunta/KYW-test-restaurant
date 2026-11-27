# Monepi Boulangerie (slug mon-epi) — dossier de recherche (27/11/2026)

**Alerte de catégorie** : Monepi est une **boulangerie artisanale**, pas un restaurant (pas de salle, pas de réservation de table). La refonte devra être une vitrine de boulangerie ; `type_cuisine` était `null` dans restaurants.json. Hypothèse retenue : on documente la boulangerie telle quelle.

## Site actuel
- http://www.monepi.be, WordPress (+ jQuery, Bootstrap), 0 erreur console, 99 requêtes (capture-site.mjs). Pas de meta description.
- Structure : accueil (slider 5 images, « Principaux services », « Notre boulanger », « Vos avis »), À propos, 5 pages produits, Galerie (vide), Contact. Page « Quiches » du menu en 404. URLs de thème de démonstration (`products-grid`, `pie-chart`).
- Palette : ocre/orange (#e8b370 environ) sur blanc, texte gris ; logo noir et or. Police sans-serif géométrique (Poppins/Open Sans, à confirmer). Mobile lisible (menu burger).
- Réservation : téléphone uniquement (monepi.be/contact).

## Photos
25 fichiers dans `photos/` (24 photos, 1 logo), index dans `photos/index.json`. Origine monepi.be/wp-content/uploads/2020/06 (jusqu'à 4080 px, réduites à 2400). Sujets : four à bois en chauffe, façonnage, pétrissage, pains sur claie, viennoiseries, gaufres, tarte aux fraises. Qualité 4-5. Aucun filigrane. Facebook non tenté en téléchargement (403 habituel).

## Identité
- Nom : Monepi (enseigne « Monepi Boulangerie » d'après le logo). Titre du site : « Prendre le temps de faire du bon pain artisanal » (monepi.be).
- Dirk Longin, boulanger-pâtissier, chocolatier et glacier de formation depuis 1980 ; engagé en 1990 chez Monepi à Loyers, reprise de l'atelier en 1992 (monepi.be/about-us).
- Four à bois breton, voûte de 75 cm, ovale (« four à arômes »), chauffe de 3 h à 4 h avec fagots séchés 2 ans maximum ; construit en 2002 (about-us) ou 2000 (accueil) : à confirmer.
- Meunerie à meules de granit depuis 1996, 4 farines : blé demi-gris (~75 %), blé blanc (~65 %), épeautre demi-gris (~75 %), petit épeautre (~80 %). Céréales bio certifiées ; partenaires Moulin de Montigny, Moulin de Ferrière (about-us).
- BCE 0690300401 « Longin, Dirk », actif (restaurants.json).

## Offre et carte
Prix en € ; détail complet dans `donnees.json` (carte). Pains au levain 800 g : blé complet 3,00 ; pur épeautre demi-gris 4,30 ; blé demi-gris 3,00 ; épeautre + 35 % seigle 4,15 ; petit épeautre 4,00-8,00. Pains à la levure : 11 références (2,30 à 5,90, cramique 5,60). Viennoiseries : pain au chocolat 1,35, gaufre 2,30, baulus 1,50, boule au chocolat 1,30, gosette aux pommes 2,50, boule aux raisins 1,30. Petite boulangerie : baguette/tresse 1,90, pistolet 0,65, ficelle 1,25, sandwich 0,65, mendiant 1,30, faluche 0,80-1,60. Sans gluten 4,00-7,00 (châtaigne, quinoa). Quiches : page introuvable. « Douceurs » : pâtisseries selon saisons et évènements (accueil).

## Pratique
- Rue Es Fays 43, 5101 Loyers (Namur) ; GPS 50.4527485 / 4.956183 (Nominatim, bâtiment confirmé).
- Tél. +32 491 18 29 35 (site). Ancien numéro 081 58 92 35 (L'Avenir 2016).
- Horaires : vendredi 9h00-18h00 (monepi.be/contact). Autres jours inconnus ; un guide ancien cité par la recherche web mentionne vendredi et dimanche matin (à confirmer).
- Autres points de vente listés : Biomanie (Wanze), Ferme de Graux (Fernelmont), Bio&Co (Andenne), L'épicerie d'Ernest (Thon).
- E-mail : inconnu. Take-away/livraison : inconnu.

## Réputation
Google : note et nombre inconnus (Restaurant Guru affiche des chiffres contradictoires, non repris). Extraits (monepi.be, « Vos avis », non vérifiables) : voir `donnees.json`.

## Réseaux
Facebook : https://www.facebook.com/Monepi.boulangerie (abonnés et dernier post inconnus). Instagram, TikTok : inconnus.

## Presse
L'Avenir, 28/03/2016, « Des pains cuits au feu de bois » (citations : « rien ne vaut un pain artisanal cuit à l'authentique feu de bois », « chaque pain est garanti du producteur au consommateur »). Le Vif Weekend, « Dirk Longin, boulanger à Loyers » (page 403, contenu non lu).

## Concurrence
Non recherchée (hors budget, segment boulangerie bio différent des restaurants) : inconnu.

## Ce qui manque
Horaires complets, avis Google, e-mail, page Quiches, Instagram, concurrents, confirmation que l'activité est ouverte au public à Loyers.

## Matière à site
1. Monepi fait son pain au levain, bio, cuit au four à bois.
2. Dirk Longin est boulanger-pâtissier de formation depuis 1980.
3. La boulangerie de Loyers est reprise par Dirk Longin en 1992.
4. La farine est moulue chaque semaine sur meules de granit depuis 1996.
5. Quatre farines : blé demi-gris, blé blanc, épeautre demi-gris, petit épeautre.
6. Le four breton, ovale, a une voûte haute de 75 cm.
7. Il chauffe 3 h à 4 h avec des fagots séchés jusqu'à 2 ans.
8. Pains sans gluten à la châtaigne ou au quinoa.
9. Pain au chocolat 1,35 €, gaufre 2,30 €, pain pur épeautre 4,30 €.
10. Boutique à Loyers, rue Es Fays 43, ouverte le vendredi de 9h à 18h.

Trous à combler en données fictives marquées : horaires hors vendredi, avis Google, e-mail, quiches, concurrents.
