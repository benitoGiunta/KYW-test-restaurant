# Audit Hallmark · Oh la Vache ! · 2026-11-27

Source : https://ohlavache-erpent.be (HTML sauvegardé `data/restaurants/oh-la-vache/site-actuel/page.html`, captures). Rendu sloplint en repli de polices (CSS externe absent) : tells lus aussi sur `desktop-haut.png`. Genre inféré : editorial (restaurant familial, photo en tête). Enregistrement : `.hallmark/before.txt` (97 FAIL, 28 REFLEX, 9 WARN, dont l'essentiel vient de WordPress/Enfold, Facebook SDK).

## Lecture en quatre lignes
1. Pour quoi : un grill familial d'Erpent ; l'action unique est de réserver par téléphone (0494 29 44 72).
2. Reste : la façade et l'enseigne vache noir et blanc, la carte complète avec prix, la terrasse, le 7 j/7.
3. Se lit généré : dégradés violet-bleu et rose hérités du thème WP (2a), blancs et noirs purs (7a), 7 familles de polices (37), 68 % de photos sous le hero (83), reste de 732 px vide sous le hero (79).
4. Cassé : carte publiée en 16 images JPG, adresse « 58 » au hero (581 ailleurs), lien Facebook du pied vers « lepontdesanges », pas de meta description, aucun focus visible (26a), pas de prefers-reduced-motion (27).

## Structure d'origine
One-page : accueil (hero façade, adresse, boutons Info et Contactez-nous), menu (images), photos (galerie), contact (mailto, réseaux), événements (vide), bandeau d'offre d'emploi. Nav centrée en capitales. Slideshow auto, animations three/lottie. Mobile : colonne unique, hero 168 px de contenu. Copie : courte, aucune description de plat.

## Findings par tier
- Floor : 2a, 7a, 19 (tiret), 26a, 27, 34, 40 (contrastes 2,5 à 3,3), 48 (littéraux).
- Reflex : 7b, 24b, 37, 39b, 44c, 49b, 59, 77, 79, 83.
- Finish/jugées : 6b, 8 (gabarit hero puis blocs), 54 (capitales), 58, 77-79, 83.

## Axes d'amélioration, par coût
Peu cher : meta description, focus, reduced-motion, adresse 581, lien Facebook. Moyen : carte en vraies lignes de texte avec prix. Seul un full règle : composition du hero et rythme des sections, photos équilibrées, système typographique.
