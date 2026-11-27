# Audit Hallmark · Bayti · 2026-11-27

Source : site Wix bayti.be (7 pages sauvegardées dans `.hallmark/site-actuel/`, captures dans `data/restaurants/bayti/site-actuel/`). Genre inféré : playful (cuisine familiale, ton chaleureux, couleurs vives des photos), vérifié contre editorial.

## Lecture en quatre lignes
1. Pour quoi : montrer deux adresses voisines (restaurant du soir, comptoir traiteur de jour) et le traiteur d'événements ; action unique : réserver (Barestho) ou appeler.
2. Ce qui reste : les photos très soignées, la baseline « Deux mondes, une table. », les prix de la carte, les routes.
3. Ce qui se lit généré : eyebrow en capitales espacées (54, 67), carrousel de reveals Wix, script italique dans un titre roman (38i), trois cartes blanches sur noir (8), petits corps de texte (75), sections collées (59).
4. Ce qui est cassé : rendu CSS externe Wix absent hors ligne (fallback), un seul avis, trous de hiérarchie h1 puis h6 (F21), deux boutons pleins côte à côte (F4).

## Structure d'origine
Sept pages : accueil, notre histoire, carte traiteur (/menu), carte restaurant, avis, galerie, Bayti chez vous. Nav noire fixe avec Réserver ; hero plein écran photo de mezzés (Poster) ; deux boutons Traiteur / Restaurant ; section « Deux mondes, une table » ; trois expériences en cartes ; « Une table vous attend » ; formulaire de contact ; pied noir. Animations Wix (swiper, lottie) : non reprises.

## Findings (before.txt : 2421 FAIL surtout du CSS Wix, 465 REFLEX)
Floor : 34 (scroll horizontal Wix), 48 (couleurs en dur). Reflex : 59, 72, 75, 77, 78, 79. Finish : F1 à F4, F7, F20, F21. Jugées : 8 (gabarit hero, 3 cartes, CTA), 54 (eyebrow), 38i (script italique), 63 (point médian dans les méta), 58 (622 mots sur la carte traiteur).

## Axes d'amélioration
Peu coûteux : tokens, typographie, espacement, hiérarchie des titres. Seul le full règle : la composition des sections, le hero, le pied, la carte en Rows.
