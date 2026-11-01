# Audit Hallmark · Partage · 01/11/2026 (provisoire, phase 1)
Source : https://restaurantpartage.be, HTML sauvegardé le 01/11/2026 (copié dans `.hallmark/site-actuel/`), captures desktop/mobile du client. `sloplint --before` à lancer en phase 2 (HTML sauvegardé copié en `index.html` et `carte.html`).
Genre inféré : editorial parce que le site est une page blanche de texte et de photos, sans nuit ni jeu.

## La lecture en quatre lignes
- Pour quoi : des Namurois et visiteurs qui veulent une table ; l'action unique : réserver (Zenchef, rid=371394).
- Ce qui marche et reste : les photos de janvier 2026 (salle chaulée, plats, équipe), le texte de présentation, la sobriété.
- Ce qui se lit comme généré ou daté : nav et titres en capitales trackées (67, 54), trois boutons noirs remplis côte à côte (F4), portrait en pastille ronde, mur de 16 photos (83), footer noir 3 colonnes (42).
- Ce qui est cassé : carte en 5 GIF sans texte (illisible au téléphone, inaccessible), aucun horaire, logo cassé en mobile (« Logo Restaurant Partage Namur » en texte alternatif bleu), bandeau cookies qui couvre le bas de chaque écran.

## Structure du site d'origine
- Type : one-page + /carte/, /bon-cadeau/, /politique-de-confidentialite · nav : logo gauche, 3 liens, bouton rempli · footer : noir, 3 colonnes (adresse, logo et réseaux, Attablez-vous).
- Sections : hero (photo du chef en cuisine), présentation + portrait rond, boutons Menus/Bon cadeau/Réserver, réservation (iframe Zenchef) + façade, « En images » (16 photos), footer.
- Animations : aucune. Images : photos du client. Mobile : barre « Réserver | Carte » en tête, logo cassé.
