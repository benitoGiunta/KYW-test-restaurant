# Audit Hallmark · Le Royal Namur · 2026-11-07

**Source** : https://www.leroyalnamur.be (WordPress, thème Divi, agence Poush), HTML sauvegardé `data/restaurants/le-royal/site-actuel/page.html` et captures ; `sloplint --before` : 182 FAIL, 73 REFLEX, 12 WARN (`.hallmark/before.txt`, rendu non exécuté : lecture du HTML et des captures). **Genre inféré** : editorial (brasserie, cuisine, accueil, pas d'écran d'outil).

**Lecture en quatre lignes**
1. Pour quoi : choisir où manger Place du Théâtre et réserver (Zenchef ou 081 22 01 33).
2. Reste : identité brique et crème, logo blanc, motif couronne, copie « À propos », faits d'horaires et de contact.
3. Se lit généré : mise en page Divi par défaut (gates 8, 42 pied à 4 colonnes, 58 h1 de 10 mots, F15 trois largeurs de conteneur, 67 menu en capitales espacées).
4. Cassé : carte et menu des fêtes uniquement en PDF, six photos sans alt, bloc « Réservations » vide (rectangle brique sans contenu), lien de confidentialité vers lesterrassesduprince.be, erreur CSP console sur une image.

**Structure d'origine** : une page (`/`) et `/contact/` ; nav Menu, Réservations, À propos, Contact ; hero photo de façade avec bloc brique « Le Royal Namur » et bandeau de couronnes ; À propos (texte, photo planche, quatre vignettes) ; Nos délices (carte PDF, menu des fêtes PDF) ; Heures d'ouverture et réservations ; pied sombre en quatre colonnes. Animations : script ET (opacity 0 au repos). Images : six JPEG 1200 × 1600 sans alt. Mobile 375 : lu sur `mobile-haut.png`, hero conservé, texte petit. Copie : sobre, utilisable.

**Findings par tier** (extraits de `before.txt`)
- Floor : 39a focus par bordure ; 48 (x140) littéraux de couleur ; 62 contenu masqué au repos ; 67 liens de nav espacés en capitales.
- Reflex : 7b noir et blanc purs ; 24b valeurs hors échelle ; 26b pas de `:active` ni `:disabled` ; 37 six familles de polices ; 38iii mot accentué dans un titre.
- Finish : 3 filet latéral ; 29 lueur chromatique ; 40 contrastes ; 41 surfaces sombres ; 42 pied par défaut ; 58 h1 trop long ; F3 pas de `text-wrap: balance` ; F15 trois conteneurs ; F22 texte justifié.
- Jugées (gates § 5) : 8 gabarit « hero, texte/photo, cartes, bandeau » (waive 8, séquence gardée) ; 23 sections sans masse (le bloc réservations vide) ; 69 horaires dits deux fois (corps et pied) ; 80-85 aucun faux avis, aucune métrique : conforme.

**Axes d'amélioration** : par coût croissant : (1) carte en HTML plutôt qu'en PDF, alt sur les photos, un seul conteneur ; (2) horaires et contact lisibles, bouton de réservation dans la nav et le hero ; (3) système typographique et surfaces neufs (seul `full` règle). Ce que seul `full` règle : composition, thème et tokens.
