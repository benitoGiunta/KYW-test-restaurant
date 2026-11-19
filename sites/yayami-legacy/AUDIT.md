# Audit Hallmark · Yayami Sushi · 2026-11-19

Source : yayami.be (WordPress, Flatsome, plateforme Order & Eat), HTML sauvegardé (`data/restaurants/yayami/site-actuel/`), captures bureau et mobile. Genre inféré : atmospheric (ardoise noire, fleurs de cerisier, logo blanc et rouge). `sloplint --before` sans rendu (captures du dossier lues à la place) : 341 FAIL, 182 REFLEX, 16 WARN (`.hallmark/before.txt`), presque tous issus du thème et du plugin de commande.

**Lecture en quatre lignes**
1. Pour quoi : commander des sushis à emporter ou en livraison à Namur ; action unique : « Commandez-vous » vers la boutique en ligne.
2. Ce qui reste : le noir ardoise, le rouge #df0505 du logo, le logo, la carte complète avec prix, adresse, téléphone, horaires, zone de livraison, moyens de paiement, photos de plats sur fond noir.
3. Ce qui se lit généré : 7a et 48 (blancs purs, couleurs hors jetons), 24b (marges hors échelle), 26b (pas d'état :active), F3, F21 ; hero « bandeau fixe » rouge « nous sommes fermés maintenant » ; huit cartes identiques « Faites votre choix » avec un bouton rouge chacune.
4. Ce qui est cassé : « Livraison gratuit », « Commandez - vous » (19 : tirets), pas de hauteur de titres cohérente, contraste 2,74:1 sur le bouton Bancontact (40), transition de largeur (10a), pas d'overflow-x: clip (34).

**Structure d'origine** : one-page d'accueil + boutique (/shop/, /product-category/<cat>/) ; nav « HOME | MENU », recherche, compte, panier ; hero ardoise centré avec logo, baseline, adresse, téléphone, offre ; 8 cartes catégories ; pied : téléphone, adresse, horaires, zone, paiement. Aucune animation, aucune réservation, aucun réseau social. Mobile 375 : empilé, bandeau rouge fixe. Copie : courte, quatre fautes (« gratuit », « Commandez - vous », « ramasser sur place », majuscule/minuscule).

**Findings par tier** (jugées § 5, lues sur capture) : Floor 12 (hero tient à 1280 x 800), 13 (hero court, ok) ; Reflex 8 (gabarit hero + 8 cartes + CTA), 9 (huit cartes au même squelette), 23, 29, 54 (titres script décoratifs), 58, 63 ; Finish 66, 69 (adresse dite deux fois), 77 à 79 ; 80 à 85 : photos du client, pas de stock (83 ok), pas de newsletter (85 ok).

**Axes d'amélioration** : peu coûteux (jetons, marges, états, accents) ; moyen (hiérarchie de la carte, offre en tête) ; seul « full » règle la composition du hero et le gabarit de huit cartes.
