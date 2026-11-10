# Audit Hallmark · Le Félicien · 10/11/2026

**Source** : http://www.lefelicien.be (Drupal, Bootstrap), 4 pages sauvegardées dans `.hallmark/site-actuel/` ; `sloplint --before` : 35 FAIL, 16 REFLEX, 21 WARN (journal `.hallmark/before.txt`). Genre inféré : editorial (brasserie de classiques, public familial et d'affaires, texte et carte au centre).

**Lecture en quatre lignes**
- Pour quoi : réserver une table (Tablebooker) et lire la carte ; action unique « Réservez votre table », en nav et au milieu de l'accueil.
- Ce qui reste : identité verte (#2d5735 lu dans `--bs-primary`), logo script, copie de réouverture, carte HTML complète, routes /la-carte, /suggestions-de-la-semaine, /contact, Jobs externe.
- Ce qui se lit généré : accueil = carrousel de deux slides qui répètent le logo + cinq paragraphes centrés (58, 44c) ; sections collées à 53 px (59) ; boutons de 17 px (39b) ; aucun état actif ni désactivé (26b).
- Ce qui est cassé : images (`logowebsite.svg`, icônes) et jQuery non chargés dans la capture (76, render) ; carte en HTML avec lignes qui se recouvrent (73) ; pas de meta description (F23).

**Structure d'origine** : accueil, carte, suggestions, contact/réservation (iframe Tablebooker), Jobs ; nav à droite, logo à gauche, CTA pilule ; hero = champ vert + logo ; aucune photo récente ; mobile : menu burger correct ; copie longue, 924 mots sur la carte.

**Findings par tier** : Floor 58 (218 et 405 mots sur un écran), 63 (chaînes à points médians dans la carte), 73, 76 ; Reflex 26b, 39b, 44a/44c, 59 ; Finish F1, F2, F23, F26 ; gates jugées (§ 5) : à passer en phase 3.

**Axes d'amélioration** : (1) coût faible : meta description, états, tailles de boutons, apostrophes ; (2) moyen : une photo en tête, hiérarchie des sections, carte en lignes titre/prix ; (3) seul `full` règle : système typographique et composition de l'accueil.
