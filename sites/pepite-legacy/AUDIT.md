# Audit Hallmark · Pépite, cave à manger · 2026-11-10

Source : https://pepite-caveamanger.be (HTML sauvegardé `data/restaurants/pepite/site-actuel/page.html`, captures desktop et mobile). Genre inféré : editorial (cave à manger, vitrine de marque, un thème sombre est dealt mais le genre d'origine est éditorial).

## Lecture en quatre lignes
1. Pour quoi : choisir ses assiettes de la semaine, acheter des vins d'auteurs, réserver (Tablebooker, ou appel/SMS 0476/620182).
2. Ce qui reste : le graphisme signé (blanc, noir, cuivre, serif et mono), la carte de la semaine, les photos de la cave, les extraits de presse, les horaires.
3. Ce qui se lit généré : texte monospace centré sur 61 % de largeur (77, 78), sections minces à 4 px d'écart (59), photos à 48 % de la page (83), hero à 370 px (44c).
4. Ce qui est cassé : défilement horizontal à 320 px (34), image `pepite-restaurant.png` introuvable (76), CORS Tablebooker en console, coquille « Acceuil », doublons de sections, actualités figées 2017-2022.

## Structure d'origine
One-page Drupal : Cave à manger (accueil, sélections « Chou, Chouchou & Chou Chéri »), Events (2018), À propos, News, Photos (carrousel), Assiettes (menu de la semaine), Réservation, Press (scans), Contact. Animations : carrousels et reveals au scroll. Images : 8 photos clientes dont une cave voûtée, bouteilles, couvert. Mobile 375 : texte au bord de l'écran (72). Copie : mélange FR/EN, majuscules espacées.

## Findings par tier (`.hallmark/before.txt`)
- Floor : 34 (x8, scroll horizontal), 44d (x2), 58 (144 mots), 76 (image cassée).
- Reflex : 26b (pas de :active ni :disabled), 44a, 44c, 59, 71, 72, 77, 78, 83.
- Finish : F1 (19 apostrophes droites), F2 (8 « ... »), F21 (h2 puis h4).
- Jugées (gates.md § 5) : 6b non évalué, 8 gabarit « sections de texte centrées », 54 et 67 majuscules espacées dans les titres de menu, 58 trop de mots, 63 pas de séparateurs, 69 horaires dits deux fois (contact et description), 80 à 85 pas de logos ni métriques (aucun inventé). Le rendu a signalé un repli de polices : lecture faite aussi sur les captures.

## Axes d'amélioration
Faible coût : gutter, `overflow-x: clip`, apostrophes, un seul h1. Moyen : carte en rangées, horaires en Schedule, hiérarchie de titres. Seul `full` règle : le système typographique (un seul serif, plus de monospace), la composition (photo plein cadre contre texte centré étroit), la fusion des doublons.
