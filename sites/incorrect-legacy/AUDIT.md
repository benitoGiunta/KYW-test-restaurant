# Audit Hallmark · INCORЯECT · 2026-11-07

Source : https://www.incorrect.pizza (Webflow + Astro, Lenis, OGL, jQuery), HTML et captures dans `data/restaurants/incorrect/site-actuel/` (copie `.hallmark/site-actuel/index.html`). Le rendu `sloplint --before` n'a pas été lancé : le HTML sauvegardé charge son CSS depuis un CDN, les tells sont lus sur les captures (desktop-pleine-page, mobile).
Genre inféré : playful (pizzeria rock-n-roll, ton bruyant, humour), tiré vers Overprint par le deal.

## Lecture en quatre lignes
1. Pour quoi : réserver une table (Barestho), action unique, bouton flottant « Réserver en ligne ».
2. Ce qui reste : l'identité (logo R inversé, ton rock, vert foncé et saumon), les 3 photos, la carte, le téléphone, Instagram et Facebook.
3. Ce qui se lit généré : texte justifié en majuscules mono illisible (gate 54, 58), polaroïds penchés décoratifs, deux marquees (« LA CARTE », « RÉSERVATION EN LIGNE »), pluie de reveals Lenis (gate 27).
4. Ce qui est cassé : aucun horaire, carte en PDF seulement, aucune adresse dans le texte courant, petite taille de corps, contraste faible du texte sur vert.

## Structure d'origine
One-page : logo et adresse, texte de présentation (≈ 350 mots en capitales), grande photo, bouton flottant, polaroïds, « La carte » (marquee + extrait de 9 pizzas + PDF), réservation (marquee), pied (Instagram, Facebook, téléphone). Fond vert très foncé, police mono, pas de pages secondaires, mobile en empilement simple.

## Findings par tier
- Floor : 9 (labels en capitales mono), 13 (≈ 350 mots au premier écran de texte), 7 (contenu lié aux animations), 12 (aucun horaire, adresse en petit).
- Reflex : 18 (marquees), 27 (reveals), 54 et 58 (copie en capitales justifiées), 63 (« PIZZERIA * RUE… »).
- Finish : 69 (adresse et téléphone répétés sans horaires), 85 (pas de pied structuré).
- Jugées : 8 (séquence photo, texte, carte, réservation : gabarit prévisible), 44 (largeur de ligne), 83 (3 photos réelles, pas de stock).

## Axes d'amélioration
Faible coût : horaires, adresse, lien PDF, carte en HTML, taille de corps. Moyen : deux marquees remplacés par un titre. Seul `full` règle : thème, typographie, composition.
