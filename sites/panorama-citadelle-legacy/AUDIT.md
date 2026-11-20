# Audit Hallmark · Le Panorama · 2026-11-20

**Source** : https://www.panoramanamur.be (WordPress, thème ak-panorama-2022, Vue/jQuery, Zenchef). HTML de l'accueil et des trois autres pages dans `data/restaurants/panorama-citadelle/site-actuel/` ; lecture sur les captures `desktop-pleine-page.png`, `mobile-*.png` (sloplint `--before` non lancé : le CSS externe du site n'est pas sauvegardé, tells lus sur les captures).
**Genre inféré** : editorial (restaurant de brasserie haut de gamme, photographies, carte signée d'un chef).

**Lecture en quatre lignes**
1. Pour : réserver une table au sommet de la Citadelle (bandeau « Réservez une table », widget Zenchef).
2. Reste : les quatre routes, les photographies, la vue, le chef, la Pano, les liens (tel, mailto, Facebook, Instagram, Maps).
3. Se lit généré : fond brun uniforme et texte clair centré (gate 8 hero + texte + deux boutons), sections plein écran à air identique (59), cookies et widget flottants qui couvrent le héros (44b).
4. Cassé : cartes uniquement en PDF, horaires contradictoires (8 h 00 à 23 h 00 en bandeau, brasserie 11 h 00 à 23 h 00 en page contact), coquille « Panaorama », pas de desserts.

**Structure d'origine** : 4 pages (accueil, Le Panorama, La carte, Réservation et contact), nav à trois liens plus réseaux, footer en quatre colonnes ; héros photo avec bandeau adresse, réservation, horaires ; vidéo plein écran ; mobile : même empilement ; copie descriptive et chaleureuse.

**Findings** (lecture visuelle) : Floor 12 (héros masqué par cookies et widget), 14 ; Reflex 8 (hero, texte, boutons), 59 ; Finish 54 (labels), 58 (volume de texte du footer) ; jugées 29 (texte centré long), 44.
**Axes d'amélioration** : carte en HTML (peu coûteux), horaires dits une fois, réservation sans widget flottant ; seul le full règle le système typographique et la composition.
