# Audit Hallmark · Wok de Jin · 2026-11-19

Source : https://wokdejin.com (Next.js, one-page + /reveillon), HTML et captures dans `data/restaurants/wok-de-jin/site-actuel/`. Genre inféré : editorial (restaurant familial, photos, pas d'outil). Sloplint `--before` sur page.html et reveillon.html : 21 FAIL, 20 REFLEX, 10 WARN (`.hallmark/before.txt`). CSS externe absent : lecture des tells sur les captures ; rendu en repli de police.

## Lecture en quatre lignes
1. Pour quoi : venir manger au buffet à Jambes ; action unique : réserver une table (réveillon : réserver avec acompte).
2. Reste : photos réelles, tarifs et horaires clairs, ton chaleureux, noir et corail, les trois routes.
3. Se lit généré : 58 (164 mots sur un écran, hero à trois blocs), 63 (chaînes à point médian), 38i (em dans les titres), 73 (image sur texte), caractères chinois décoratifs et pastilles façon gabarit.
4. Cassé : modale « Réveillon » à l'arrivée qui masque le haut de page, logo qui ne charge pas (76), pas d'état :focus-visible (26a), tarifs derrière des onglets.

## Structure d'origine
Pages : /, /reveillon, /reveillon/reserver (outil externe), /confidentialite. Nav : Le buffet, Nos tarifs, Nous trouver, Réserver une table, bandeau réveillon. Sections : hero, trois actions, réveillon, buffet (3 cartes), wok et teppanyaki, tarifs à onglets, salle (4 vues), salle de jeux, à emporter, accès et horaires, avis. Animations : modale, pas de lib. Mobile : mêmes sections empilées. Copie : chaleureuse, avec tirets et points médians.

## Findings par tier
Floor : 19, 26a, 34, 38i, 44d, 58, 63, 73, 76. Reflex : 26b, 39b, 44c, 49b, 59, 71, 72, 77, 78. Finish et jugées : 8 (gabarit hero, cartes, CTA), 54 (eyebrows en capitales sur chaque section), 69 (horaires répétés), 83 (caractères décoratifs), 85 (bande d'avis).

## Axes d'amélioration
Peu coûteux : focus, états, 44 px, `dvh`. Moyen : tarifs sans onglet, copie sans tirets. Seul le full règle : composition (photos plein cadre, prix en signature), échelle de titres, rythme des sections.
