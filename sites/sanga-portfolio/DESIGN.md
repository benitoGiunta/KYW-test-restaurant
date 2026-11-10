# DESIGN : Sanga, variante portfolio (gabarit « Encre »)

## Choix du gabarit
Notes sur 5 : positionnement (ramen, udon, donburi) / ambiance (petite salle, comptoir de ramen) / richesse du contenu
(6 photos de plats, aucune de salle, carte longue de 30 lignes) / type de carte (carte longue, pas de menu unique) /
réservation (aucune, commande en ligne et téléphone) / signature (le moment mémorable a-t-il un sens ?).

| Gabarit | Pos. | Amb. | Contenu | Carte | Résa | Signature | Total |
| --- | --- | --- | --- | --- | --- | --- | --- |
| encre | 5 | 4 | 4 | 4 | 3 | 5 | 25 |
| affiche (déjà makimono) | 4 | 3 | 3 | 4 | 3 | 4 | 21 |
| comptoir | 3 | 3 | 3 | 2 | 3 | 3 | 17 |
| journee | 3 | 3 | 2 | 3 | 3 | 3 | 17 |
| guinguette | 2 | 3 | 3 | 4 | 3 | 3 | 18 |
| ardoise, braise, nocturne, forno, verger, cahier | 2 à 3 | 2 à 3 | 2 à 3 | 3 | 3 | 2 à 3 | 15 à 17 |
| collage, maree, velours, quatre-mains | 1 à 2 | 1 à 3 | 2 | 2 | 3 | 2 | 12 à 15 |

Décision : **encre**. La FICHE le cite pour « ramen et izakaya » et nomme sanga parmi ses cibles. Le Rouleau (bande
horizontale de 12 plats, traits de pinceau) montre une carte longue et des photos de bols sans exiger de photos de salle.
Seul écart : encre a déjà servi (ferme-blanche-d-asie), mais aucun autre gabarit ne s'accorde aussi bien ; le contenu
(ramen, pas de réservation) et la palette photo (bols clairs sous voile) distinguent le résultat.

## Concept
Le site est un rouleau peint : ivoire, encre, un seul rouge (le sceau), titres verticaux, chapitres numérotés. Le
Rouleau de l'accueil déroule douze plats RÉELS de la carte (noms, prix et mots du dossier), le sceau « S » mène à la
commande. Verbe de motion : glisse (inchangé, voir le DESIGN du gabarit : ease.out 1,2 s, scrub 0,8, rideau horizontal).

## Sections
- Conservées : hero, concept (manifeste + avis client), Rouleau épinglé, diptyque (devient « Les bouillons »), galerie en
  quinconce, Venir (plan + horaires), pied de page diptyque, pages Carte, 404.
- Retirées : chefs et équipe, citation Michelin, valeurs, formulaire de réservation, page d'exemple Emporter, boissons
  d'exemple, bons cadeaux, privatisation (rien de cela n'est au dossier).
- Ajoutées : « Sur place, à emporter, livré » (accueil), page `/maison/` (le bol, trois bouillons au choix, nouilles et
  riz, avis clients et note Google), page `/commander/` (commande en ligne Order & Eat, zones de livraison, paiement,
  plan, horaires), carte complète en six chapitres (Entrées, Ramen, Udon et soba, Donburi, Divers, Boissons).
- Composants modifiés : Rouleau (sans mention d'exemple), Plan (schéma de la rue Saint-Loup seule, aucun repère inventé),
  Sceau (S, « Commander »), Header, Footer. Aucun composant créé.

## Art direction
Palette et typographie du gabarit conservées (ivoire #F6F1E6, encre #19171A, vermillon #C6341F ; Shippori Mincho B1 +
Spectral) : l'esprit emaki convient à une maison japonaise sans kanji décoratif. Photos : bol vu de dessus (hero),
ramen chashu et udon tempura en diptyque vertical, gyoza, teriyaki-don, edamame. Voile sombre du gabarit sur le hero clair.
Favicon : « S » vermillon ; OG : recadrage 1200x630 du hero.

## Données illustratives et manques
Aucun placeholder dans les données de phase 1 : ce qui manque est absent (histoire, fondateurs, équipe, salle,
réseaux, e-mail, réservation, repères du quartier, accès gare ou parking). Avis : extraits Takeaway.com du dossier
(ponctuation et majuscule normalisées). Note Google 4,6 sur 892 avis : relevé Rankeat de mars 2026, non revérifié.

## Adéquation estimée : 78 %
1. Gabarit nommé pour ce type de maison, carte longue servie par le Rouleau et la page Carte.
2. Contenu 100 % issu du dossier, sans invention.
3. Commande, livraison et paiement mis en avant comme sur le site actuel.
Limites : pas de photo de salle ni de façade ni de personnes (galerie de six plats seulement, photos de 600 à 1024 px
pour la plupart), histoire inconnue (page Maison courte), plan sans repère, pas d'outil de réservation.

## Motion, signature et interactions (phase 2)
- Signature, le Rouleau : scène épinglée à `100svh` exactement (bande entièrement visible à 1280x720 et 1440x900), photo
  plafonnée à 30 svh (26 svh si la fenêtre fait 800 px ou moins). Le plat au centre du champ passe de photo lavée
  (`saturate(.45)`) à pleine couleur ; compteur « 08 / 12 » (le sceau final ne compte pas) ; deux boutons ronds précédent
  et suivant (44 px, désactivés aux extrémités, `:active` pressé) en plus des flèches du clavier et de la molette.
- Sceau : se pose avec une rotation de -10° vers 0 (le tampon), s'incline de 8° au survol, s'enfonce au clic, léger
  aimant au pointeur fin (`data-magnetic`). Curseur « Dérouler » au-dessus du rouleau (pointeur fin seulement).
- Hero : parallaxe de la photo (9 % en y, scrub), photo qui respire à l'intro, trait tracé, vapeur au repos.
  En-tête sans `mix-blend-mode: difference` (illisible sur photo claire sous voile) : ivoire plein, voile resserré
  plus sombre en haut (0,78 → 0,46) ; en-tête encre sur la 404.
- États : survol, focus visible et clic de `.btn`, `.link`, boutons du rouleau, sceau ; plat survolé = photo en couleur,
  zoom 1,05 de l'image dans le masque et prix vermillon.
- Reduced motion : pas d'épinglage ni de parallaxe ni de vapeur ; le rouleau devient un défilement horizontal natif
  (snap) avec les mêmes boutons, compteur et barre de progression ; transitions CSS neutralisées.
- Mobile : plats à 80 vw, boutons et compteur sous le rouleau, en-tête lisible (ivoire) sur la photo.
