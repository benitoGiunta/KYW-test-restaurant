# Les Potes au Feu — dossier client

Recherche effectuée le 28/10/2026. Sources entre parenthèses. `inconnu` = non trouvé ; `(à confirmer)` = douteux.
Contrainte de session : **le quota WebSearch était épuisé dès le départ** (0 recherche possible) ; tout vient du site
du client, du Guide MICHELIN, de la BCE, de Nominatim et de tentatives directes (Facebook, Instagram, TripAdvisor,
TheFork, Gault&Millau, Google Maps : toutes bloquées, voir « Ce qui manque »).

## Site actuel

- URL : https://www.lespotesaufeu.be (pas de redirection ; `finalUrl` identique). Titre : « Les potes au feu - Restaurant
  bistronomique situé à Namur ». Meta description : « Damien Gorjanec et François Schepens ont créé un restaurant basé sur
  les produits frais et de saison mais aussi sur une ambiance conviviale. » (site-actuel/infos.json)
- Fabricant : E-net Business (agence namuroise « créateur de sites Internet pour commerçants, indépendants & PME »),
  CMS propriétaire E-net (`/templates/les-potes-au-feu/`, `/page/*.html`, `/categorie/*.html`), Bootstrap, jQuery,
  lightslider, Leaflet/OpenStreetMap, Font Awesome, SDK Zenchef, plugin Facebook Page, lecteur YouTube. © Copyright 2026
  (pied de page). Aucune erreur console sur l'accueil ; 113 requêtes ; page de 4 375 px de haut.
- Structure : site multipage, 4 entrées de navigation + utilitaires :
  1. Accueil `/` : barre supérieure (Namur · téléphone · statut « Fermé actuellement » en temps réel · Contact · mail ·
     Facebook · Twitter · partage) → en-tête logo centré, nav « ACCUEIL · LES POTES AU FEU · LE MENU DES POTES · bouton
     orange RÉSERVATION EN LIGNE » → hero : deux portraits des chefs côte à côte, carte blanche centrale « Les potes au
     feu. L'histoire d'une rencontre, celle de deux Potes passionnés. » + flèche → section « Comme des Potes » (texte +
     photo du trio) → section « Un vrai moment de cuisine » (photo dessert + texte) → bandeau gris boutons « Réservation
     en ligne › » / « Bon cadeau en ligne › » → « Découvrez notre concept en vidéo » (YouTube embed `dZtMOajOefE`,
     intitulé « Alfonse Les potes au feu. Aftermovie », chaîne « Les Potes Au Feu ») → bandeau 3 piliers « HOME MADE ·
     PRODUITS DES SAISONS · RENCONTRE ET CONVIVIALITÉ » → pied de page noir (badges HTTPS/GDPR/CDE, menu, services en
     ligne, plugin Facebook « Rejoignez-nous », mentions).
  2. `/page/les-potes-au-feu.html` (à propos) : bannière salle, titre « Les potes au feu », texte de l'histoire (voir
     Identité), galerie lightslider 12 photos « Notre concept en images ».
  3. `/categorie/le-menu-des-potes.html` (carte) : 3 blocs texte+photo (menu dégustation, formule midi, lunch), carte en
     HTML avec prix (pas de PDF).
  4. `/page/reservation-en-ligne.html` : iframe Zenchef `rid=379477` (une erreur console : « Invalid token received from
     AwsWafIntegration » dans l'iframe pendant la capture).
  5. `/page/contactez-nous.html` : formulaire (objet, civilité, nom, prénom, email, téléphone, message), carte Leaflet,
     adresse, horaires par jour, note privatisation, bloc « Les avis de nos clients 5/5 (11 avis) ».
  6. Utilitaires E-net : bon cadeau, boîte à idées, recommandation, cookies, conditions, partenaires web.
- Palette observée (CSS front_end/modules) : orange `#f38935` (CTA, mots-clés des titres, liens actifs), noir chaud
  `#1c1a1b` (pied de page, texte), blanc, gris `#f2f2f2`/`#f7f7f7` (bandeaux), rouge `#db0030` (statut « Fermé »), bleu
  `#00acf3` et vert `#29af4c` (badges). Logo : écriture manuscrite noire sur navet dessiné ocre, baseline
  « BISTRONOMIE » avec le O en orange.
- Polices (Google Fonts) : Cormorant Garamond 300/400/700 (titres et textes éditoriaux) + Nunito 300–900 (nav, UI).
- Images : portraits studio des chefs (1500×1999), galerie reportage 1140×642, 3 photos de plats 550×825, bannières
  2000×520. Pas de vidéo hébergée (YouTube).
- Animations : lightslider (galerie), scroll-to-top, flèche de défilement ; pas de gsap/lenis. Widget Zenchef flottant en
  bas à droite (rouge, « Pour toute réservation de dernière minute ou de plus de 6 personnes, merci de nous appeler au
  081640444 »).
- Réservation : Zenchef (widget flottant + page dédiée). Bon cadeau : formulaire (50 / 75 / 100 / 150 €, retrait sur place).
- Langue : français uniquement (widget Zenchef propose FR).
- Mobile (390 px) : en-tête empilé (logo, bouton tél orange, burger), bouton « Réservation en ligne » pleine largeur,
  hero en deux portraits ; le widget Zenchef recouvre tout le bas d'écran ; lisible mais lourd.
- Points faibles : bannière cookies E-net très envahissante (recouvre un tiers de l'écran sur toutes les pages) ; widget
  Zenchef ouvert par défaut et masque le contenu ; les « 11 avis 5/5 » de la page Contact sont des avis sur l'agence
  E-net Business (projets, devis, « Vraiment génial ce site ! »), pas sur le restaurant — trompeur ; hero vidéo externe ;
  pas de page galerie ni de page équipe dédiée ; aucune donnée structurée schema.org ; photos de plats en 550 px ;
  icône Twitter morte (lien de partage) ; pas d'adresse e-mail publique ; libellés de fichiers menus « 60 / 52 / 39 »
  trahissent d'anciens prix non mis à jour dans les noms ; pas de version NL/EN.
- Points forts : photos professionnelles cohérentes (reportage sombre et chaleureux), statut d'ouverture en direct,
  Zenchef intégré, textes personnels et bien écrits, horaires exacts, carte Leaflet, bon cadeau en ligne, © 2026.
- Captures : `site-actuel/*.png`, `site-actuel/pages/{a-propos,carte,contact,reservation}/`.

## Photos

28 fichiers dans `photos/` (voir `photos/index.json`) : 2 portraits verticaux des chefs (1500×1999), 1 trio, 4 plats,
12 photos reportage (salle, bar, cuisine, service), 2 bannières panoramiques, 3 photos Guide MICHELIN (1600×1600 : salle
de jour avec coussins moutarde, mains/pâte, plat boeuf confit), logo PNG, pictogramme SVG, navet ocre. 25 photos
exploitables ≥ 1140 px + 3 plats en 550 px (seules photos de plats « assiette » disponibles, à utiliser en petit).
Facebook/Instagram inaccessibles sans connexion : aucune photo réseaux. Le logo n'existe qu'en PNG 425×279 (pas de
vectoriel complet ; seul le navet du favicon est en SVG).

## Identité

- Nom public : **Les Potes au Feu** (graphie du logo : « Les potes au feu. » avec point final ; nav en capitales).
  Société : DAMFRA SRL, BCE 0741.540.749, constituée le 14/01/2020, siège Avenue de la Plante 4, 5000 Namur, NACE
  56.111 restauration à service complet, administrateurs Damien Gorjanec et François Schepens (BCE, consultée 28/10/2026).
- Baseline : « Bistronomie » (logo) ; accroche hero : « L'histoire d'une rencontre, celle de deux Potes passionnés. » ;
  trois piliers : « Home made · Produits des saisons · Rencontre et convivialité » (site).
- Histoire (page « Les potes au feu », texte intégral conservé dans `site-actuel/pages/a-propos/infos.json`) :
  « Il y a quatorze ans, François et Damien aiguisent leurs premiers couteaux au restaurant "la Plage d'Amée" situé à
  Namur. » Première expérience commune en cuisine, « deux gamins pleins d'envie ». Parcours distincts : François
  « continue ses classes aux États-Unis et à Montréal », Damien « se fait une place en Belgique et compte quelques
  expériences à l'étranger, notamment à Shanghai ». Retrouvailles autour de verres, projet de restaurant. « Début de
  l'hiver 2019, installés par hasard à une table dans ce lieu, ils ne savent pas encore que c'est là qu'ils ouvriront leur
  premier restaurant. […] Trois mois plus tard, ils ont entre leurs mains les clés de l'établissement. » Ouverture donc
  début 2020 (société créée 14/01/2020 — BCE). Date exacte d'ouverture : inconnue. Le texte dit « quatorze ans » sans
  date de rédaction : la rencontre date d'environ 2010-2012 (à confirmer).
- Concept (site) : « Une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local. Et un mot d'ordre : le
  plaisir. » « un art culinaire soigneusement travaillé, aux influences de saisons, qui tend vers le gastronomique »,
  « ils créent le lien à table, en servant eux-même leurs plats et en expliquant leur démarche au client », « Un
  restaurant à l'image des Potes : bon, généreux et accueillant. »
- Équipe (site, accueil) : François Schepens et Damien Gorjanec (chefs-propriétaires), « épaulés par la pétillante Sara
  et Jordan ». Rôles de Sara et Jordan : inconnus (salle/bar probable, à confirmer ; la femme blonde à lunettes des photos
  est vraisemblablement Sara, à confirmer). Attribution des portraits : fichiers `damien.jpg` (barbe rousse, chignon) et
  `francois.jpg` (cheveux bruns courts) du site.
- Type de cuisine / positionnement : bistronomie, produits locaux et de saison, fait maison ; Guide MICHELIN : « Cuisine
  française moderne », prix « €€ » / « Se faire plaisir » (schema.org de la fiche).
- Ambiance (photos + Michelin) : petite salle sombre et chaleureuse, murs vert-gris à chevrons et lambris, bar et tables
  hautes en chêne, tabourets/chaises blanches, banquette avec coussins moutarde, ampoules à filament, cuisine ouverte sur
  la salle avec hotte rouge et laiton. Nombre de couverts : inconnu. Terrasse : inconnu (aucune mention).
- Valeurs : fait maison, produits de saison, producteurs locaux (« ils soignent leurs relations avec les producteurs du
  coin qui leur fournissent des produits frais »), convivialité, service par les chefs eux-mêmes. Fournisseurs nommés :
  inconnu.

## Offre et carte

Carte HTML du 28/10/2026 (`/categorie/le-menu-des-potes.html`), pas de carte à la carte : le restaurant fonctionne en
menu unique.

- **Menu dégustation unique 4 services — 67 €** (du lundi au vendredi soir) :
  Mises en bouche · Légumes racines / Champignons / Noix · Saint-Jacques / Butternut / Passion · Boeuf confit / Carottes /
  Cromesquis de pdt · Soufflé au caramel / Chaï / Poire · Mignardise.
  Fromage à la place du dessert : +7 € ; fromage avant le dessert : +15 €. « Nous pouvons adapter notre menu en cas
  d'allergie ou intolérance (à signaler lors de votre réservation). Un menu végétarien est également possible (sur
  demande). »
- **Formule 3 services (le midi) — 52 €** : « formule 3 services à choix multiples inspirée de nos produits du moment ».
- **Lunch (entrée-plat ou plat-dessert) — 40 €** : « proposé en fonction de nos envies et servi à l'ensemble de la table.
  N'hésitez pas à nous contacter par téléphone pour en savoir plus sur sa composition ! »
- Historique de prix (noms de fichiers des images de la carte : `…4-services-60`, `…3-services-52`, `…39`) : le menu
  dégustation était à 60 € et le lunch à 39 € (à confirmer, date inconnue).
- Boissons, vins, cocktails : inconnu (photo de cocktails rouges au bar, verre de rosé en service — pas de carte publiée).
- Plats cités par le Guide MICHELIN : « cerises noires et griottes […] crumble de cacao et […] glace vanille au lait cru ».
- Plats visibles en photo : tartare de boeuf aux tuiles, Saint-Jacques snackées mousseline et tuile noire, boeuf confit
  carottes cromesquis (assiette rouge), rosace de pommes glace et tuile.
- Bons cadeaux : 50 / 75 / 100 / 150 €, demande en ligne, retrait au restaurant (page bon cadeau).
- Privatisation : « Le samedi : possibilité de privatisation du restaurant, mariage, chef à domicile. » (page contact).
- Take-away / livraison : inconnu (aucune mention).

## Pratique

- Adresse : Avenue de la Plante 4, 5000 Namur, Belgique (site, BCE, Michelin). Bord de Meuse, côté Citadelle, entre le
  Casino et le Royal Snail (carte Michelin). Géo Nominatim : 50.4586737, 4.8643452 ; la fiche Michelin indique
  50.4562085, 4.8621577 (écart ~300 m, à confirmer sur place).
- Téléphone : +32 (0)81 64 04 44 (site, Michelin). E-mail : inconnu (formulaire uniquement).
- Horaires (page contact, identiques sur Michelin) : lundi 19:00-21:00 · mardi 19:00-21:00 · mercredi 12:00-14:00 et
  19:00-21:00 · jeudi 19:00-21:00 · vendredi 12:00-14:00 et 19:00-21:00 · samedi fermé (privatisation possible) ·
  dimanche fermé. (Horaires = heures d'arrivée, dernier service 21:00.)
- Réservation : Zenchef, `rid=379477` ; URL widget https://bookings.zenchef.com/results?rid=379477 ; téléphone obligatoire
  pour dernière minute ou > 6 personnes. Michelin : « Cet établissement gère ses propres réservations. »
- Paiement (Michelin schema.org) : Mastercard, Visa.
- Accès, parking, transports : inconnu.
- Langues : site FR ; Michelin `knowsLanguage: fr-BE`.

## Réputation

- Guide MICHELIN Belgique 2026 : restaurant sélectionné, sans étoile ni Bib Gourmand visible sur la fiche (à confirmer :
  aucune icône de distinction dans le HTML rendu). « 97 personnes aiment cet endroit ». Avis d'inspecteur daté
  2026-05-04 : « Un duo d'amis, Damien Gorjanec et François Schepens, revisite le concept de bistronomie avec pour fil
  rouge la créativité. Légumes cultivés localement, associations originales et saveurs intenses sont au rendez-vous. Ils
  subliment ainsi des cerises noires et griottes en les associant à un crumble de cacao et de la glace vanille au lait
  cru. Un restaurant décontracté qui swingue sur tous les plans. Le plaisir déborde de l'assiette ! »
  (https://guide.michelin.com/fr/fr/namur/namur/restaurant/les-potes-au-feu)
- Google : note et nombre inconnus (Google Maps non lisible depuis la session). TripAdvisor : 403. TheFork : 403.
  Gault&Millau : 503 / certificat expiré. Restaurant Guru : 503.
- Les « 11 avis 5/5 » affichés sur le site concernent l'agence E-net Business (textes sur des devis et des projets web),
  **ne pas les réutiliser** comme avis clients du restaurant.
- Extraits d'avis clients : **aucun trouvé** (0 sur 5-10 demandés) ; seul l'avis Michelin ci-dessus est citable.

## Réseaux

- Facebook : https://www.facebook.com/lespotesaufeu.bistronomie/ (lien officiel du site) ; abonnés, fréquence, dernier
  post : inconnu (mur de connexion).
- Instagram : inconnu (handle non confirmé ; `lespotesaufeu` et `lespotesaufeu.bistronomie` renvoient au login sans
  prouver l'existence du compte).
- TikTok / autre : inconnu. YouTube : chaîne « Les Potes Au Feu » hébergeant l'aftermovie `dZtMOajOefE` (titre « Alfonse
  Les potes au feu. Aftermovie » ; nature de l'événement « Alfonse » : inconnue).
- Twitter : icône dans l'en-tête = simple lien de partage, pas de compte.

## Presse

- Guide MICHELIN Belgique 2026 (ci-dessus). Autre presse (L'Avenir, DH, Gault&Millau) : inconnu — recherche impossible
  (quota WebSearch) ; la recherche interne lavenir.net n'a rien renvoyé.

## Concurrence (segment bistronomie, Namur — d'après la fiche Michelin « Restaurants à proximité »)

- L'Espièglerie (Namur) — €€, cuisine moderne, sélection Michelin.
- Partage (Namur) — €€, cuisine moderne, sélection Michelin.
- Attablez-vous (Namur) — €€€, cuisine française créative, sélection Michelin.

## Ce qui manque

- Avis Google (note, nombre, extraits), TripAdvisor, TheFork : aucun accès.
- Abonnés et activité Facebook/Instagram ; photos récentes des réseaux.
- Adresse e-mail, nombre de couverts, terrasse, parking, accessibilité.
- Carte des boissons / vins ; composition du lunch et de la formule midi ; menus de fêtes.
- Presse locale, récompenses autres que la sélection Michelin.
- Date exacte d'ouverture (début 2020 d'après BCE + récit), biographies détaillées des chefs (restaurants précis aux
  États-Unis, Montréal, Shanghai), rôles exacts de Sara et Jordan.
- Logo vectoriel complet.

## Matière à site

Phrases vraies et réutilisables telles quelles :

1. Les Potes au Feu, c'est d'abord l'histoire d'une rencontre : il y a quatorze ans, François et Damien aiguisaient leurs premiers couteaux ensemble à la Plage d'Amée, à Namur.
2. François a fait ses classes aux États-Unis et à Montréal ; Damien s'est fait une place en Belgique et a cuisiné jusqu'à Shanghai.
3. Début de l'hiver 2019, installés par hasard à une table de ce lieu, ils ne savaient pas encore qu'ils y ouvriraient leur premier restaurant ; trois mois plus tard, ils en avaient les clés.
4. Une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local — et un mot d'ordre : le plaisir.
5. François et Damien accompagnent eux-mêmes leurs plats jusqu'à votre table et vous expliquent leur démarche, épaulés par la pétillante Sara et Jordan.
6. Menu dégustation unique en 4 services à 67 €, du lundi au vendredi soir : mises en bouche, légumes racines / champignons / noix, Saint-Jacques / butternut / passion, boeuf confit / carottes / cromesquis, soufflé au caramel / chaï / poire, mignardise.
7. Le midi, les mercredis et vendredis : formule 3 services à choix multiples à 52 € ou lunch entrée-plat / plat-dessert à 40 €, servi à l'ensemble de la table.
8. Le Guide MICHELIN Belgique 2026 écrit : « Un restaurant décontracté qui swingue sur tous les plans. Le plaisir déborde de l'assiette ! »
9. Le samedi, le restaurant se privatise : mariages, événements, ou chef à domicile.
10. Avenue de la Plante 4, au bord de la Meuse, à Namur — réservation en ligne via Zenchef ou au +32 (0)81 64 04 44 ; bons cadeaux de 50 à 150 €.

Trous à combler avec des données fictives marquées « illustratif » : note Google et extraits d'avis clients, nombre
d'abonnés Instagram/Facebook, e-mail de contact, nombre de couverts, carte des vins/cocktails, composition du lunch,
menus de fêtes, parking.
