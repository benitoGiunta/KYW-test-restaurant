# Audit Hallmark · Chez Guillaume · 2026-11-01

**Source** : https://chezguillaume.be (WordPress + Elementor, Swiper, Lottie, OGL), captures et HTML dans `data/restaurants/chez-guillaume/site-actuel/`. CSS externe absent du HTML sauvegardé : sloplint rend un repli (polices et feuilles non chargées), les tells de rendu sont donc lus sur les captures `desktop-pleine-page.png`. Avant : 45 FAIL, 18 REFLEX, 10 WARN (`.hallmark/before.txt`, un seul fichier HTML recensé).

**Genre inféré** : playful (comedy club, ton humoristique, illustrations au trait, sorties en famille et entre amis) ; l'atmosphérique est écarté, la salle est claire et chaleureuse.

## Lecture en quatre lignes
1. Pour quoi : réserver un spectacle (billetterie par événement) et, avec lui, une table ; action unique : « Réserver » sur l'agenda.
2. Reste : l'identité rouge/crème et l'humour (« On va voir qui ? »), les illustrations au trait, l'agenda complet avec ses fiches, les photos de qualité éditoriale, les routes (accueil, restaurant, agenda, privatisation, bon cadeau, FAQ).
3. Se lit généré : gabarit « hero, 3 cartes, calendrier, bandeau, contact » (8) ; hero sans photo, 820 px de vide (79) ; 49 % de photos sous le hero (83) ; contrôles hors 44 à 52 px (39b) ; noir et blanc purs (7b) ; échelle d'espacement hors grille 4 px (24b) ; ni :active ni :disabled (26b).
4. Cassé : un script lève une erreur au chargement (render) ; description meta vide (F23) ; tableau du calendrier de 8 colonnes illisible à 375 px (F25) ; titres de spectacles en capitales coupés (F26) ; « Maccheronicomedy » sans `overflow-wrap` (50) ; adresse de pied (Rue Lelièvre, Pl. Saint-Aubain 4) différente de celle de la BCE à Jambes.

## Structure d'origine
Pages : `/`, `/restaurant/` (onglets Menu du soir et Brunch), `/events/` (billetterie), `/privatisation-evenements-dentreprise-a-namur/`, `/bon-cadeau/`, `/faq/`, fiches `/evenements/<slug>/`. Nav : Accueil, Spectacles, Agenda, Restaurant, Privatisation, Bon cadeau, FAQ, Contact, bouton Programme, Facebook, Instagram. Accueil : hero crème avec dessin au trait et « On va voir qui ? », split texte et photo du bar, trois prochains spectacles (affiches), calendrier mensuel, bandeau rouge « Privatise Chez Guillaume », bande de quatre photos, contact, pied rouge. Animations : Lottie, Swiper. Posture : calme à légèrement animée, pas de scroll chorégraphié. Mobile 375 : calendrier en 8 colonnes, texte rouge sur crème peu contrasté. Copie : humoristique et directe, à garder.

## Findings par tier (before.txt, résumé)
- Floor : 50 (overflow-wrap du titre « Maccheronicomedy »), render (script en erreur).
- Reflex : 7b (noir et blanc purs, ×6), 24b (×6), 26b (×2), 39b, 71, 79, 83.
- Finish : F1 (apostrophe droite), F23 (meta description), F24 (bordure et ombre), F25 (tableau 8 colonnes à 375), F26 (titres orphelins), 41, 58 (95 mots), 77 (1 section).
- Jugées (gates.md § 5) : 6b composition de hero absente de la photo ; 8 gabarit en séquence ; 9 aucune masse sous le hero ; 23 rouge en grands aplats (assumé, marque) ; 29 aucune ; 44 hero sans visuel ; 54 eyebrow « Restaurant & Comedy Club » au-dessus du titre ; 58 mots ; 63 aucune puce ; 66 aucun autocollant ; 69 horaires dits deux fois (FAQ et pied) ; 77 à 79 vide du hero ; 80 illustrations de marque (dessins au trait, gardés comme marque, non reproduits : aucun fichier source) ; 83 photos 49 %.

## Axes d'amélioration (par coût)
1. Description meta, apostrophes, `overflow-wrap`, états :active/:disabled (faible).
2. Contrôles 44 à 52 px, espacement sur grille, couleurs teintées (moyen).
3. Calendrier restacké en liste (Index) au lieu d'un tableau à 8 colonnes (moyen).
4. Seul le full règle : hero composé (photo + billetterie), composition des sections, un seul reveal, pied en lettre.
