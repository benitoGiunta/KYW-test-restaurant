# Audit Hallmark · NE5T Hôtel & Spa (restaurant Intuition) · 2026-11-27

Source : https://ne5t.com (WordPress, thème gdlr), capture `data/restaurants/ne5t/site-actuel/`. Genre inféré : editorial à l'origine, atmospheric pour la refonte (façade de nuit, pierre, lampes). Sloplint `--before` : 62 FAIL, 17 REFLEX, 5 WARN (`.hallmark/before.txt`) ; le rendu a signalé un repli de polices (CSS externe non rechargé).

Lecture en quatre lignes
1. Pour réserver une table au restaurant Intuition (par téléphone) ou séjourner et aller au spa.
2. Reste : photographie de nuit plein écran, offre claire (menu du mois, formules, spa tarifé), ton « gastronomie décomplexée ».
3. Se lit généré : dégradés violet-bleu WP (2a), #fff/#000 purs (7a), 580 mots (58), 53 % de photos sous le hero (83), sections collées (59).
4. Cassé : shortcode `[gdlr_button]` visible, aucun focus visible (26a), pas de reduced-motion (27), widget Zenchef alors que la réservation est par téléphone.

Structure d'origine : accueil long (hero photo, nav capitales condensées, bouton flottant « Réserver une table »), 13 pages (histoire, environs, presse, 6 suites, packages, infos, spa, restaurant, séminaire, réservation, tarifs, contact). Cinq familles de polices. Mobile non lu en détail (mobile-haut.png existe).

Axes par coût : cheap = tokens, focus, reduced-motion ; moyen = recomposer les sections ; seul full règle la hiérarchie typographique et le rythme.
