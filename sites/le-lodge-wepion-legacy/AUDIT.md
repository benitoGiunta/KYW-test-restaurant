# Audit Hallmark · Le Lodge Wépion · 20/11/2026

Source : https://www.lodgewepion.be (Webflow), HTML et captures sauvegardés dans `data/restaurants/le-lodge-wepion/site-actuel/`. Genre inféré : editorial (brasserie et tea-room, corps clair, hero sombre). CSS externe absent : sloplint a rendu `page.html` seul, les tells viennent aussi des captures.

## Lecture en quatre lignes
1. Pour quoi : réserver une table (Barestho) à la brasserie de la Meuse ; action unique « Réserver ».
2. Ce qui reste : les photos 2024 soignées, la serif élégante des titres, le logo blanc, la structure one-page (hero, présentation, vue, tea-room, galerie, réservation, contact), le bandeau Wine & More.
3. Ce qui se lit généré : trois blocs image/texte en alternance dans des cartes blanches (gate 8), titres de section plus petits que le hero (78), boutons en capitales espacées (54, 67), 14 mots au h1 (58).
4. Ce qui est cassé : aucun `:focus-visible` (26a), défilement horizontal à 320 (34), `overflow-wrap` absent sur « brasserie/restaurant » (50), vidéo sans poster (28b), fenêtre modale d'annonce à l'ouverture, e-mail hotmail, carte en diaporama Google Slides non indexable.

## Structure d'origine
Une page `/` plus `/cookies`. Nav : Carte, Tea room, Réserver, Contact. Hero poster vidéo, flèche vers le bas ; présentation ; trois blocs alternés ; galerie de 8 photos ; carte « Réservez dès maintenant » ; pied sombre (adresse, contact, horaires 11:30-22:30, réseaux). Bouton flottant « Réserver ». Pas d'animation de scroll connue. Mobile : captures `mobile-*.png`. Copie : générique (« charme unique », « expérience gastronomique inoubliable »).

## Findings (before.txt, 7 FAIL, 7 REFLEX, 4 WARN)
Floor : 26a (pas de focus), 34 (overflow), 50 (mot long). Reflex : 26b (actif, désactivé), 28b (vidéo sans poster), 49b (lien du bandeau sur 2 lignes à 320), 59 (espacement), 77 (section mince « Réservez »), 78 (h2 sous le h1). Warn : 58, F1 (apostrophes droites), F26. Jugés : 8 (gabarit alterné), 54 et 67 (capitales), 69 (horaires dits trois fois ailleurs), 85 néant.

## Axes d'amélioration
Faible coût : focus, overflow, apostrophes, poster. Moyen : carte réelle en lignes lisibles et indexables au lieu du diaporama, bandeau de fermeture visible. Seul le full règle : composition des trois blocs, échelle des titres, pied en colonnes d'index.
