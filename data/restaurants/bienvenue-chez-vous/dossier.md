# Bienvenue chez vous, Namur : dossier de recherche (27/11/2026)

Sources : site client (capture 27/11/2026), Gault&Millau Belgium, Restaurant Guru, Trouve Ton Resto, La DH (18/05/2020). Détail structuré dans `donnees.json`.

## Site actuel
- Site Wix (https://www.restobienvenuechezvous.com), titre « Restaurant Bienvenue Chez Vous », description « Delsaut Cédric, Raffinement, Créativité, Convivialité, Resto Cosy, Romantique, Cuisine française de qualité » (infos.json). Aucune erreur console.
- Structure : accueil avec grande photo de dessert (smiley rose aux fraises), menu Accueil, Présentation, Resto, Boutique, Traiteur, Contact, icônes Facebook, Instagram, TikTok, « Depuis 2002 » sous le logo rouge. Une vingtaine de pages dont beaucoup de doublons « copie-de- ». Pied : « © 2013 ».
- Les captures Playwright des pages internes montrent un fond satin rouge vide (contenu chargé tardivement) ; les textes ont été récupérés par curl et rangés dans `site-actuel/textes/*.txt`.
- Points faibles : contenus invisibles à la capture, pas de téléphone ni d'adresse ni d'horaires dans le HTML, page Presse vide, aucun module de réservation, pages dupliquées, design daté. Points forts : photos de plats remarquables, voix du chef, identité forte.

## Photos
24 photos exploitables dans `photos/` (index.json) : 17 plats (qualité 4-5), traiteur, façade, enseigne, carte de visite. Crédit : le site remercie le photographe Anthony Florio pour certaines créations (à confirmer par photo). Logo seul non téléchargeable : utiliser l'enseigne (18) ou la carte de visite (10).

## Identité
- Nom : « Bienvenue Chez Vous… », baseline « fine cuisine et créativité », concept « Restaurant Passionomique » (site).
- Créé en 2002, d'abord à Bruxelles (site) ; déménagé en 2020 de l'avenue Cardinal Mercier (Salzinnes) vers la rue Pépin (La DH, 18/05/2020).
- Chef et propriétaire Cédric Delsaut, seul pour cuisine, salle et cave (Gault&Millau) ; Jeune Chef de l'année 2016 (Gault&Millau).
- Premier étage d'une maison de maître, 3 ou 4 tables (site : 4 ; DH : trois ou quatre), bougies, terrasse calme aux beaux jours (site). Capacité : 12 (Trouve Ton Resto), 26 (Exploremeuse) : à confirmer.
- Activité : actif à la BCE (0476895154, dénomination PASTISSARIA COOK) et site vivant (menus d'octobre/novembre 2026).

## Offre et carte
- Repas en « escales » (grignotages, escales, douceurs), menu non dévoilé, saison. Octobre 2026 : Saint-Jacques de Vincent (Port-en-Bessin, La Coquille qui Claque), œuf parfait bœuf Angus séché potiron noisettes, filet pur de veau saumuré coques et végétaux marins, dessert, biscuit chocolat fantaisie.
- Prix (site) : 49 € midi (3 escales), 69 € midi et soir (4 escales), 79 € soir (5 escales), 94 € Voyage Signature ; accords A, B, C en supplément (+29 à +64 €) ; vins au verre ou carte à prix coûtant + droit de bouchon. G&M : 5 escales 69 €, Confort 103 €, Confort + 113 € (écart avec le site : à confirmer).
- Mercredis à prix réduit « Fuck la vie chère » (soir, sur réservation, hors jours fériés) : tarifs ambigus, à confirmer.
- Traiteur à emporter : repas gourmand hebdomadaire (commande 24 h avant), Box Tapas 199 € pour 2, Box Bienvenue chez vous 109 € pour 2 (à confirmer), Noël et Nouvel An, buffets, walking dinner, brunch, pièces montées. Boutique de produits d'artisans, chèque cadeau, parking aisé (titres de menu).

## Pratique
- Rue Pépin 33, 5000 Namur (G&M, DH ; la DH écrit aussi 32). Téléphone +32 477 29 96 83 (G&M, Restaurant Guru). E-mail : `info@restaurantbienvenuechezvous.be` (restaurants.json, à confirmer).
- Horaires : fermé lundi et dimanche ; mardi à samedi 12:00-13:30/14:00 et 19:30-21:00 (G&M, Restaurant Guru, Trouve Ton Resto).
- Réservation : essentiellement sur réservation, par téléphone ; pas d'outil en ligne.

## Réputation
- Restaurant Guru : Google 4,9 (80 avis), Tripadvisor 4,8 (91), prix environ 100 € par personne. Tripadvisor rang 28 sur 341 à Namur (WebSearch). Non vérifié directement : laissés `null` dans donnees.json.
- Extraits : voir donnees.json (Trouve Ton Resto). Aucun avis négatif trouvé.

## Réseaux
Facebook (profil id 100036275366364), Instagram `resto_bienvenuechezvous_namur`, TikTok `@bienvenuechezvousnamur`. Abonnés et dernier post : inconnu (inaccessibles).

## Presse
La DH, 18/05/2020 (déménagement) ; Gault&Millau, Jeune Chef de l'année 2016. Page Presse du site vide.

## Concurrence
Non recherchée (budget) : inconnu.

## Ce qui manque
GPS, téléphone du site, horaires officiels, avis lisibles complets, abonnés, tarifs exacts, concurrents, page Contact (404 sur /merci).

## Matière à site
1. Bienvenue Chez Vous est né en 2002 (site).
2. C'est un « Restaurant Passionomique » au premier étage d'une maison de maître à Namur, rue Pépin (site).
3. Seulement quelques tables intimistes, aux lueurs des bougies (site).
4. Le chef Cédric Delsaut assure cuisine, salle et cave (Gault&Millau).
5. Il a été Jeune Chef de l'année 2016 (Gault&Millau).
6. Le menu est un voyage en escales, entre intemporels et créations de saison (site).
7. Les Saint-Jacques arrivent de petits bateaux de Port-en-Bessin (site).
8. Une cuisine française à base classique, avec une vision contemporaine (site).
9. Le restaurant propose aussi une boutique de produits d'artisans et un traiteur à emporter (site).
10. Les mercredis soir, un repas à prix réduit sur réservation (site).

Trous à combler par des données fictives marquées « illustratif » : avis, note, horaires exacts, galerie de salle, équipe de salle, citations.
