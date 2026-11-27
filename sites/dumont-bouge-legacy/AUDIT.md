# Audit Hallmark · Dumont Bouge · 2026-11-27

**Source** : site Wix (Thunderbolt) dumontbouge.com, HTML et captures sauvegardés dans `data/restaurants/dumont-bouge/site-actuel/` (copie de travail dans `.hallmark/site-actuel/`). Genre inféré : editorial (boulangerie, pâtisserie, tea-room : on vient manger et réserver, pas utiliser un outil).

## Lecture en quatre lignes
1. Pour quoi : choisir dans la carte (pains, gâteaux, sandwichs, tea-room), puis réserver une table ou appeler le 081 22 96 02.
2. Ce qui reste : la façade en plein écran, le coup de pinceau rose, le charbon et les crèmes, la serif fine, les quatre cartes complètes avec leurs prix, les horaires Bouge et Namur, le formulaire de réservation.
3. Ce qui se lit généré : vignettes égales Pâtisserie / Restauration / Sandwicherie (gate 8), noir pur et blanc pur (7a), quatre graisses en usage (F19), pas de meta description (F23), guillemets droits (F1), paragraphe de héros de 48 mots (58).
4. Ce qui est cassé : logo coupé dans l'en-tête, cartes en iframes au style incohérent avec le site, gâteaux sans prix, mobile peu soigné, h1 suivi de h3 (F21).

## Structure d'origine
Pages : accueil, /boulangerie, /pâtisserie, /emporter (Sandwicherie, titre « Dagobert »), /menu (Tea-room, titre « Dumont »), /reservations. Nav : quatre boutons noirs, « Réserver une table », téléphone. Accueil : photo de façade plein écran, bandeau rose en coup de pinceau, fond gris foncé avec texte de présentation, trois vignettes. Chaque carte est une iframe filesusr.com avec recherche et onglets (Fraunces, Work Sans). Pas d'animation notable. Peu de photos. Mobile 375 : boutons empilés, titre coupé.

## Findings (sloplint --before : 422 FAIL, 129 REFLEX, 36 WARN, détail dans `.hallmark/before.txt`)
- Floor : 7a noir et blanc purs (nombreux), 34 et 44d à vérifier au rendu, F21 h1 puis h3.
- Reflex : 8 vignettes égales, 40 contraste 4,24:1 sur dégradé (boulangerie), 58 héros de 48 mots, 77 pages de 3 à 4 sections.
- Finish : F1 guillemets droits, F3 pas de text-wrap: balance, F19 quatre graisses, F23 pas de meta description.
- Jugées : 29 glass panel sur emporter et menu, 3 side stripe sur la page d'accueil.

## Axes d'amélioration
Peu coûteux : meta description, typographie, un seul jeu de graisses. Moyen : cartes natives au lieu d'iframes, prix des formats lisibles. Seul le mode full règle : l'identité (rose et charbon) portée par un système, la composition de l'accueil, la cohérence entre les cartes et le site, le mobile.
