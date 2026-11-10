# Audit Hallmark · Makimono · 10/11/2026

Source : https://www.makimono.be (one-page Bootstrap 3 / jQuery, © 2019), sauvegardé dans `data/restaurants/makimono/site-actuel/` (page.html, captures desktop et mobile). Le CSS externe n'est pas sauvegardé : le rendu de `sloplint --before` est en repli (Bootstrap absent), les tells visuels sont lus sur les captures PNG. Journal complet : `.hallmark/before.txt`, `before.json`.

**Genre inféré** : playful (fast-casual japonais à mascotte, prix doux, « Rapide & Frais »), thème tiré au sort Halftone. Job : book, adapté en commande (aucun outil de réservation de table connu).

## Lecture en quatre lignes
1. Pour quoi : donner envie de commander des uramaki créatifs à Namur ; action unique, la commande en ligne (page online_order), plus le traiteur pour les fêtes.
2. Ce qui reste : le logo mascotte, la photo plein écran des plats, la baseline « Creative uramaki made with love », les photos pro de la carte, la carte complète 2026.
3. Ce qui se lit généré : 26a (aucun focus), 27 (animate-box sans motion-reduce), 30a (emoji dans un h3), 34, 44d (texte à 8 px du bord à 1920), 48 (couleurs en ligne), 62 (61 % du texte caché après chargement, WOW.js), 77 (sections minces), 59 (écarts de 20 px), 39b (boutons de 20 px).
4. Ce qui est cassé : logo.JPG, font.png et 1s.jpg ne chargent pas, `<img>` sans source (modale recrutement), pas de `<title>`, e-mail et lien TripAdvisor de l'ancienne enseigne Miss Maki, deux blocs d'horaires contradictoires, carte en PDF image de 26 pages, 5 erreurs console, 91 requêtes.

## Structure d'origine
- Une page : hero plein écran (logo carré blanc + baseline sur photo), nav collante (Home, Événement, Livraison, Menu, Photos, Contact), bloc événement (fête, rayon de 30 km, e-mail), livraison (lien de commande), menu (PDF), galerie lightbox de 9 photos, contact, horaires et carte Google, modale de recrutement de livreurs (texte en commentaire, image absente).
- Animations : WOW.js (reveals au scroll), Owl Carousel, scroll lissé. Mobile 375 : hamburger Bootstrap, hero très haut (le logo occupe tout l'écran).
- Copie : courte, en français, baseline en anglais, emoji dans le titre « Vous organisez une fête ? ».

## Findings par tier (before.txt, 11 FAIL, 6 REFLEX, 3 WARN)
- Floor : 26a, 27, 30a, 34, 44d, 48 x2, 62, 76 x2.
- Reflex : 26b x2, 39b, 44c, 59, 77.
- Finish : F1 (apostrophes droites), F21 (h1 puis h3).
- Jugées (gates.md § 5, lues sur captures) : 8 (séquence hero, 3 blocs, galerie : gabarit Bootstrap), 9 (hero photo et logo carré collé au centre), 23 (rose poudré générique sans système), 54 et 58 (peu de texte, rien à couper), 63 (RAS), 66 (RAS), 69 (horaires dits deux fois dans le HTML), 77 à 79 (sections minces), 80 à 85 (RAS, photos du client, pas de logos ni de métriques).

## Axes d'amélioration, par coût
1. Tokens, focus, `motion-reduce`, `overflow-x: clip`, emoji, `<title>`, noindex : peu cher.
2. Carte en texte indexable au lieu du PDF image : moyen (transcrite par la recherche, `carte.json`).
3. Horaires uniques, e-mail et téléphone cohérents : peu cher.
4. Seul full règle : composition (hero, rythme, sections minces, trame), système typographique, lien entre mascotte, photos sombres de la carte et la page.
