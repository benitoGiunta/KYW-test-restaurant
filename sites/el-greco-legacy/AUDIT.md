# Audit Hallmark · El Greco · 2026-11-20

Source : https://elgrecorestaurant.com (WordPress/Elementor), HTML des 5 pages sauvegardé dans `.hallmark/site-actuel/` (CSS externes absents, tells lus aussi sur `data/restaurants/el-greco/site-actuel/*.png`). Genre inféré : editorial (restaurant familial, consommateur, ton considéré). Job : book.

## Lecture en quatre lignes
- Pour quoi : donner envie de dîner grec à Bouge et réserver (action unique : réserver, par le bouton de l'en-tête ou le téléphone 081 20 07 47).
- Ce qui reste : la carte complète avec prix (HTML texte), la carte des boissons détaillée, la palette bleu et blanc, le titre « Saveurs grecques », les 5 routes.
- Ce qui se lit généré : dégradés violet-bleu hérités du thème WordPress (2a), blanc pur (7a), `transition: all` et animation de hauteur du slider (10a), hero centré sur photo plein cadre avec titre blanc très fin (illisible sur la façade blanche), pluie de boutons ; 264 FAIL, 62 REFLEX, 37 WARN au total (`.hallmark/before.txt`, surtout du CSS WordPress non utilisé).
- Ce qui est cassé : bloc d'avis vide au rendu (widget Featurable), `dummy.png` oublié, hero sur deux photos de stock différentes (bureau et mobile), libellés anglais (Open, All rights reserved), horaires sans jours, page histoire d'un paragraphe, logo de 489 px.

## Structure d'origine
Pages : `/` (hero « Saveurs grecques », neuf spécialités sur trois colonnes, bouton Découvrir le menu, avis), `/our-menu/`, `/carte-des-boissons/`, `/about-us/`, `/contact/`. Nav : bouton Réservation, logo, menu burger. Footer : logo, adresse, téléphone, e-mail, « Open 18:00 - 23:00 », Facebook, Instagram, © 2024. Hero : plein cadre photo stock (Santorin), titre blanc ultra-léger au centre. Animations : slider Revolution. Mobile 375 : hero haut de 1150 px, titre sur la photo. Copie : courte, « Depuis 1986… » sur la page histoire.

## Findings par tier (sélection)
- Floor : 2a dégradés violet (x10), 7a blanc pur, 10a `transition: all` et hauteur animée, 48 couleurs littérales hors tokens.
- Reflex : 58 mots par écran, 77 une section par page, hero centré photo.
- Finish : F1 apostrophes droites, F3 pas de `text-wrap: balance`, F21 h2 puis h6, F23 pas de meta description sur la carte des boissons, F26 titres qui finissent sur un orphelin.
- Jugées (gates.md § 5) : 6b hero en vh, 8 gabarit hero/colonnes/CTA, 54 libellés en capitales espacées partout, 63 aucun point médian, 69 horaires dits deux fois sans jours, 83 deux photos de stock sur la même page.

## Axes d'amélioration
1. Coût faible : apostrophes, balance, description, horaires avec jours, libellés français.
2. Moyen : lisibilité du titre (blanc fin sur façade blanche), carte en Rows avec prix alignés.
3. Seul le full : composition du premier écran, système typographique, chrome. Ce que rien ne règle : aucune photo du restaurant ou des plats.
