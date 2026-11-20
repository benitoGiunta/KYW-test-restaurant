# Audit Hallmark · Les Terrasses de Crupet · 2026-11-20

Source : https://www.lesterrassesdecrupet.be (WordPress/Divi, HTML et captures sauvegardés dans `data/restaurants/terrasses-de-crupet/site-actuel/`). Genre inféré : atmospheric (salle lumineuse, fauteuils orange, bar vert, soirée), brasserie familiale.

**Lecture en quatre lignes**
- Pour quoi : réserver une table (widget Zenchef, téléphone) et consulter la carte ; action unique : « Réserver une table ».
- Ce qui reste : photos pro 2025, carte du 15 octobre, horaires 7 j/7, Zenchef, téléphone, réseaux, postes à pourvoir, chalet d'hiver.
- Ce qui se lit généré : dégradés violet-bleu en :root (2a), blanc pur (7a), bulle verte organique générique (8), 4 colonnes de pied (42), 93 mots sur un écran (58), pas de text-wrap balance (F3), trois largeurs de conteneur (F15), justifié sans césure (F22).
- Ce qui est cassé : « Lorem ipsum » résiduel sous Réservations, carte en flipbook 3D, bannière cookies qui couvre le héros, logo 300 px qui se perd sur la photo, contrastes insuffisants (40), formulaire d'emploi lourd.

**Structure d'origine** : one-page. Nav (À propos, La carte, Réservations, Job, Contact), héros photo plein écran avec bulle verte, À propos (deux colonnes), vidéo, La carte (flipbook), heures d'ouverture et adresse, galerie de 8 photos, formulaire « Postulez », pied 4 colonnes. Pas d'animation de scroll marquée. Mobile 375 : empilé, bulles vertes gardées.

**Findings** (`sloplint --before` : 202 FAIL, 90 REFLEX, 16 WARN, journal complet dans `.hallmark/before.txt`, la majorité vient de Divi) : Floor 2a, 7a, 40, 41, 42 ; Reflex 58, 77 ; Finish F3, F15, F19 (4 graisses), F22. Jugées : 8 (gabarit hero + bulle), 54 (eyebrow script « Brasserie restaurant »), 63, 69 (adresse et horaires redits), 77 (une seule section mesurable).

**Axes d'amélioration** : peu coûteux (copie, contraste, un conteneur, pied nommé) ; moyen (carte lisible en Switcher à la place du flipbook, réservation visible en nav et en héros) ; seul le mode full règle le système (couleurs, polices, composition) et le héros.
