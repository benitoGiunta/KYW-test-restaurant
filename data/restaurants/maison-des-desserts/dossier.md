# La Maison des Desserts, Namur (dossier de recherche, 20/11/2026)

## Site actuel
- https://lamaisondesdesserts.be, sans redirection. Laravel/Inertia (pied de page « WeKode »), 0 erreur console sur l'accueil, 62 requêtes (capture du 20/11/2026, `site-actuel/infos.json`).
- Structure : accueil (hero photo de la vitrine de Noël, titre « La Maison des Desserts », « Artisan boulanger-pâtissier à Namur depuis 1987 », deux boutons, bandeau « Noël — 25 déc. », histoire, horaires, trois spécialités Boulangerie / Pâtisserie / Chocolaterie, FAQ, pied de page), puis Boutique (sous-domaine shop.), Galerie, Jobs, Carte, Contact, CGU, plan du site.
- Palette observée : fond sombre chaud, or/crème ; titres en serif didone (Playfair-like), texte sans-serif ; bascule clair/sombre. Technos : ogl (WebGL), aucune librairie d'animation détectée (infos.json).
- Carte : un PDF de 6 pages dans un viewer zoomable (`/storage/menu/g77s….pdf`, copié dans `site-actuel/carte.pdf`). Pages 1 et 4 : suggestions du moment ; 2 et 3 : carte des fêtes 2026-2027 (boulangerie, galette, bûches) ; 5 : cuisine et boissons ; 6 : crêpes, glaces, gaufres, thés.
- Réservation de table : aucune. Commande en ligne de produits (retrait entre 8h et 18h, Bancontact/Visa/Mastercard : FAQ du site).
- Points faibles : voir `donnees.json` → `site_actuel_analyse` (dates 1946/1987/1993 incohérentes, carte en PDF, horaires répétés 17 fois dans le HTML).

## Photos
19 fichiers dans `photos/` (index.json) : 2 façades, 3 salles, 5 pâtisseries, 5 pains, 1 gros plan de mie, 3 vignettes probablement de banque d'images (qualité 2), logo 330 x 150. Toutes tirées du site client (galerie et images du site). Aucun filigrane de tiers vu.

## Identité
- Nom public : « La Maison des Desserts » ; logo « E. de HUCORNE » (site, carte). Baseline du titre : « Pâtisserie artisanale au cœur de Namur depuis 1946 ».
- Histoire (site) : chocolaterie créée en 1946 rue de Fer ; salon de thé-pâtisserie créé en 1993 dans le quartier Saint-Loup du vieux Namur ; troisième génération aux commandes ; bâtisse du 17e siècle. Reprise par Etienne de Hucorne en 1974 (DH 05/2020, à confirmer).
- Signature de la carte des fêtes : « Henry de Hucorne » (carte PDF).
- Spécialités : pâtisseries, macarons de Paris, biétrumés, pralines Namuco, cougnous, crêpes, gaufres, vacherins, bûches.

## Offre et carte
Transcrite en entier dans `donnees.json` → `carte` (13 catégories, 142 lignes) : suggestions d'automne (10 plats, 17 à 28 €), cuisine de midi (croques 16 à 18 €, burgers 17 à 20 €, poke bowl 24 €, salades 21 €, quiches 17 €), desserts, crêpes (8,60 à 18,20 €), glaces, gaufres, vacherins, boissons, boulangerie et fêtes.
Incertains : prix du chocolat chaud viennois et des mignardises (lecture du PDF).

## Pratique
- Rue Haute Marcelle 17, 5000 Namur ; 081 22 74 51 ; info@mddnam.be ; BCE 0897.742.324 ; GPS 50,4669 / 4,8675 (JSON-LD du site).
- Horaires : mardi à samedi 8h00-18h00, fermé lundi et dimanche ; cuisine 12h00-15h00 ou 11h30-17h30 selon le plat, croques de 12h00 à 17h30 le samedi ; petit déjeuner 8h30-10h30. Fêtes 2026 : ouvert 20/12, 21/12, 27/12, 28/12 ; fermé 25/12 et 01/01 ; 20/12 et 31/12 fermeture à 17h00 (carte PDF).
- Commandes de Noël jusqu'au 22/12 18h00, du Nouvel An jusqu'au 29/12 18h00 (carte PDF).
- Parking, transports, privatisation, livraison, langues : inconnus.

## Réputation
Notes Google et TripAdvisor : `null` (non affichées par le site ; TripAdvisor inaccessible). WebSearch : avis mêlés, éloges sur les pâtisseries et les salles, critiques sur le service, avis souvent anciens (2015, 2019). Aucun extrait cité tel quel.

## Réseaux
Facebook (page La maison des desserts), Instagram @lamaisondesdesserts : abonnés et dernier post inconnus.

## Presse
La DH, 01/05/2020, réouverture (url dans donnees.json) ; Le Vif Weekend, « Namur : 10 adresses dédiées aux gourmandises sucrées » (date inconnue). Pas de récompense vérifiée.

## Concurrence
Non recherchée (sobriété) : inconnu.

## Ce qui manque
Voir `donnees.json` → `manques`.

## Matière à site
1. La chocolaterie naît en 1946, rue de Fer, à Namur (site).
2. La Maison des Desserts ouvre son salon de thé en 1993 dans le quartier Saint-Loup (site).
3. La maison occupe une bâtisse du 17e siècle, rue Haute Marcelle 17 (site).
4. La troisième génération dirige aujourd'hui la maison (site).
5. Boulangerie, pâtisserie et chocolaterie travaillent sous le même toit (site).
6. Les réalisations sont fabriquées par les équipes de la maison (carte des fêtes).
7. Ouvert du mardi au samedi, de 8h00 à 18h00 (site).
8. Les biétrumés sont la spécialité chocolatière de la maison (site).
9. On y déjeune de croques, quiches, burgers et salades, puis de crêpes, gaufres et coupes glacées (carte).
10. Les cougnous, bûches et galettes se commandent en ligne ou au 081 22 74 51 (site, carte).
Trous à combler en données fictives marquées : avis clients, notes, presse, équipe, prix moyen, capacité, parking, réservation.
