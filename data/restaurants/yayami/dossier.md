# Dossier Yayami Sushi (recherche-client, 2026-11-19)

Hypothèses : le site officiel (yayami.be) fait foi pour la carte, les horaires et le téléphone ; les annuaires tiers ne sont cités qu'en « à confirmer ». Dénomination BCE : YANG BANG, n° 0635691676 (data/restaurants.json).

## Site actuel
- yayami.be (pas de redirection) : WordPress + WooCommerce, thème Flatsome, plateforme « Member of Order & Eat » (commande en ligne). Titre : « yayami sushi – Restaurant japonais à Namur – plats à emporter et livraison à domicile » (page.html).
- Structure : one-page d'accueil (héro ardoise noire + fleurs de cerisier + logo YAYAMI blanc/rouge ; « Japanese Sushi & take away », adresse, téléphone, « Livraison gratuit à partir de 30€, ramasser sur place -10% » ; 8 cartes « Faites votre choix » : Nigiri, Maki, Temaki, Menu, Plats chaud, Salades, Bières, Boissons ; pied de page : horaires, zone de livraison, moyens de paiement). Navigation minimale « HOME | MENU », recherche, compte, panier. Boutique /shop/ et catégories /product-category/<cat>/ (captures dans site-actuel/pages/, HTML).
- Palette : noir/anthracite, rouge #df0505 (variable thème), blanc ; titres script manuscrit (type Dancing Script) et corps Lato (à confirmer). Aucune animation notable (technos « ogl, next » = faux positifs ; jQuery).
- Bandeau fixe rouge « nous sommes fermés maintenant / voir le menu » (capture hors horaires).
- Points faibles : « Livraison gratuit », « Commandez - vous », pas de description riche, visuels de 2020, aucune réservation de table, aucun lien réseaux, aucune adresse e-mail. Points forts : thème sombre cohérent, logo net, carte complète avec prix, horaires et zone affichés. Qualité : correcte mais générique (modèle de plateforme).
- Captures : site-actuel/desktop-*.png, mobile-*.png, infos.json.

## Photos
25 images dans photos/ (index.json) : 8 visuels de catégories sur fond noir (nigiri saumon, maki, gyoza, bière, ramune, salade wakame) très cohérents avec une refonte sombre ; photos de plateaux et plats chauds de qualité variable (photos de téléphone, certaines noms WeChat) ; logo.png (blanc/rouge sur transparent, 1672x274). Pas de photo de salle, de façade ni d'équipe : à compléter par des photos libres marquées placeholder. Les détourages PNG 800x600 des nigiri/maki unitaires sont des cut-outs sur transparent, non retenus. Écartés : stock « retina_pixta » (042), boules de sésame (041, basse résolution), motif de remplacement (043). Sujet de 040 et 033 : à confirmer.

## Identité
- Nom public : « Yayami Sushi » (restaurants.json) ; logo « YAYAMI ». Baseline : « Japanese Sushi & take away » (site).
- Histoire, fondateurs, chef, année d'ouverture : inconnu.
- Cuisine : sushi, maki, temaki, plats chauds (udon, riz, gyoza, yakitori, karaage), salades.

## Offre et carte
Voir donnees.json (47 plats, 9 menus/box, avec prix du site). Extraits : nigiri 4,50 € les 2 pièces ; maki 5,50 à 10 € ; temaki 6 € ; Chirashi bowl 18,90 € ; Menu Matsu 19,90 € ; Menu Miko 27,90 € ; Sakana Box 42,90 € ; udon poulet 15,80 € ; Asahi 3,90 € ; Ramune 3,50 € (site, 2026-11-19). La numérotation des plats a des trous (31-37, 43-50 absents des catégories) : le site n'affiche pas ces numéros. Descriptions absentes pour la plupart des plats ; ne pas les inventer.

## Pratique
- Adresse : Rue de Bruxelles 15, 5000 Namur (site, pied de page ; OSM : Yayami, 15;17 Rue de Bruxelles, GPS 50.4652249 / 4.8631295, Nominatim).
- Téléphone : 081 34 37 89 (site). E-mail : inconnu (celui des annuaires est personnel, non repris).
- Horaires : « Ouvert 7/7, de 12h à 14h et de 18:00h à 22h00 » (site).
- Livraison gratuite dès 30 € ; zone : 5000, 5001, 5100, 5020, 5004, 5002, 5003 ; -10 % à l'emporter (site). Paiement : cash livraison/emporter, Bancontact, Maestro, MasterCard, Visa (site).
- Commande : en ligne sur le site ; réservation de table : aucune.

## Réputation (non affichée par le site, à confirmer)
WebSearch du 2026-11-19 (chiffres des snippets, non vérifiés, donc null dans donnees.json) : Restaurant Guru 4,2/5 ; Lacarte.menu 4,2/5 ; Tripadvisor 3,8/5 (145 avis) ; Sluurpy 4,0/5 ; Trouve Ton Resto 3,5/5 (2 avis). Thèmes : sushi frais et copieux, formule à volonté, commande par tablette parfois instable, qualité inégale (riz sec, soupe miso fade), midi 16,90 à 19 €. Contradiction : ces tiers décrivent un restaurant en salle à volonté, alors que le site ne présente que emporter et livraison (à confirmer, possiblement un ancien format). Aucun extrait cité tel quel (Tripadvisor 403).

## Réseaux
Aucun lien Facebook, Instagram ou TikTok sur le site : inconnu.

## Presse
Aucune trouvée.

## Concurrence (Namur, sushi / japonais)
inconnu : non recherché (budget sobriété) ; à ne pas inventer.

## Ce qui manque
E-mail pro, histoire, réseaux, notes vérifiées, descriptions de plats, allergènes, photos de lieu. Bandeau « fermé » à ne pas reprendre.

## Matière à site
1. Yayami Sushi est un restaurant japonais au 15 rue de Bruxelles, à Namur.
2. La maison se présente comme « Japanese Sushi & take away ».
3. On y commande nigiri, maki, temaki, plats chauds, salades, bières et boissons.
4. Les nigiri se prennent par deux pièces, à 4,50 € (saumon, thon, omelette, crevette, surimi, saumon mi-cuit, bœuf mi-cuit).
5. Le Chirashi bowl est proposé à 18,90 €.
6. Le Menu Matsu (3 sushi saumon, 3 thon, 3 crevette, 3 anguille, 6 maki saumon) coûte 19,90 €.
7. Une Vegetarian Box existe, à 17,90 €.
8. La carte compte des plats chauds comme nouilles udon, riz japonais, gyoza grillés, yakitori et karaage.
9. La livraison est gratuite à partir de 30 € à Namur et dans plusieurs codes postaux voisins (5000, 5001, 5100, 5020, 5004, 5002, 5003).
10. Ouvert 7 jours sur 7, de 12h à 14h et de 18h à 22h ; 10 % de remise pour qui vient chercher sa commande.
Trous à combler par du fictif marqué illustratif : histoire, équipe, avis, réseaux, photos de salle et de façade, e-mail.
