# Audit Hallmark · La Maison des Desserts · 2026-11-20

Source : https://lamaisondesdesserts.be (HTML et captures sauvegardés dans `data/restaurants/maison-des-desserts/site-actuel/`), 5 routes rendues (accueil, carte, galerie, contact, jobs). Journal complet : `.hallmark/before.txt` (93 FAIL, 38 REFLEX, 39 WARN, tous sur la sortie Tailwind du site d'origine).

**Genre inféré** : editorial. Salon de thé et pâtisserie familiale, matière photographique (vitrine, pâtisseries, pains), serif didone d'origine, ton de tradition ; aucun signal atmosphérique ou ludique.

## Lecture en quatre lignes
1. Pour quoi : choisir une pâtisserie ou un déjeuner et venir (ou commander au retrait, boutique externe) ; l'action unique est de découvrir la carte puis passer en boutique.
2. Ce qui reste : le hero photo de la vitrine, l'histoire (1946, 1993, troisième génération), les trois métiers, les horaires, la FAQ de commande, la carte complète, la galerie, les emplois, le contact.
3. Ce qui se lit généré : gate 3 (trois tuiles à icône pour les spécialités), 29 (verre flouté sur la nav), 42 (pied à cinq colonnes), 74 (palette Tailwind par défaut), 11 (zoom au survol sur 5 images), 81 (trois images vides, dégradés).
4. Ce qui est cassé : horaires répétés 17 fois dans le HTML de l'accueil, dates 1946/1987/1993 incohérentes, carte uniquement en PDF, pas de titre distinct par page, `h1` suivi d'un `h3`, bandeau « Noël — 25 déc. » sans date de fin.

## Structure d'origine
Pages : `/`, `/carte`, `/galerie`, `/contact`, `/jobs` (+ boutique sur sous-domaine, CGU, plan du site). Nav : logo doré, six liens, bascule clair/sombre. Pied : cinq colonnes. Hero : photo plein écran de la vitrine de Noël, titre centré en didone, deux boutons. Animations : WebGL léger (ogl), pas de bibliothèque d'animation. Images : galerie réelle, trois vignettes probablement de banque d'images (qualité 2, non reprises). Mobile 375 : voir `site-actuel/mobile-haut.png`. Copie : claire, courte, fautes mineures (« à la date que vous avez sélectionné »).

## Findings par tier (extraits de before.txt)
- Floor : 34 (overflow), 48 (couleurs hors jetons), 54 (capitales espacées), 63 (points médians dans les horaires « Lun · Fermé »).
- Reflex : 68 (10 slots vides sur la page contact), 77 (section FAQ mince), 78 (titres de section 30 px sous un hero de 72 px), 79 (vide sous le hero de la carte et de la galerie), 81 (3 images vides), 85 (page jobs close sur un e-mail réflexe, conservé car c'est son unique objet).
- Jugées : 6b, 8 (hero, trois cartes, appel), 23, 29, 44, 54, 58, 63, 66, 69 (horaires dits 17 fois), 77 à 79, 80 à 85 : toutes reprises dans DESIGN.md § Sur-utilisation.

## Axes d'amélioration
Faible coût : titres de page, hiérarchie des titres, apostrophes et espaces insécables, horaires dits une fois. Moyen : carte en HTML indexable et lisible au téléphone, une seule composition par section. Seul `full` règle : le système (papier, serif léger, filets), la composition du hero et du pied, la carte comme index et lignes.
