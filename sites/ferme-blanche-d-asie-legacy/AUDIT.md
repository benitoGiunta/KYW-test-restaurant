# Audit Hallmark · La Ferme Blanche d’Asie · 09/11/2026

Source : https://www.lafermeblanchedasie.be (HTML sauvegardé `site-actuel/page.html`, captures desktop et mobile des cinq pages). Le CSS externe n’est pas sauvegardé : les tells de style se lisent sur les captures, le rendu de sloplint est en police de secours (avertissement `render`).
Genre inféré : **atmospheric** (fonds sombres, photos assombries, cuisine du soir) ; le deal confirme Spore.

## Lecture en quatre lignes
1. Pour quoi : réserver une table ou une salle par téléphone (081 44 64 89), consulter la carte de 56 plats ; l’action unique est l’appel.
2. Ce qui reste : le contenu complet (carte numérotée avec prix, horaires clairs, salle V.I.P. et salle privée, photos de salles de bonne taille), les cinq routes, le jaune d’accent (#ffc312 environ).
3. Ce qui se lit généré : modèle gratuit Colorlib « Pulse » (crédit en pied), titre centré sur slider de trois images assombries (73, 44c), quatre boutons jaunes de 17 px de haut (39b), titres de section à 24 px (78), pastilles « service rapide, climatisée, parking » en liste plate, mur de texte de 234 mots sur un écran (58).
4. Ce qui est cassé : logo `logo.png` non chargé dans le rendu (76), nom de plat tronqué « Potage crème nid d », menus de fêtes en affiches PNG non textuelles, aucun focus visible (26a), débordement horizontal à 320 px (34), aucune réservation en ligne (téléphone ou sur place seulement).

## Structure d’origine
- Pages : index, menu, reserve, photos, contact. Nav : Accueil, Menu, Réservation, Photos, Contact + téléphone cliquable ; burger en mobile.
- Accueil : hero slider (3 images, titre « Ferme Blanche d’Asie. », « Restaurant asiatique », deux boutons « Menu nouvel an » et « Menu Noël »), « Bienvenue » (texte sur la cuisine asiatique, salle V.I.P., acompte), trois pastilles, aperçu de la carte en onglets sur photo de wok, section « Menu », « Contact » (adresse, tél., e-mail, Facebook, horaires), pied Colorlib.
- Animations : slider auto et onglets (jQuery, Bootstrap). Images : photos de salles filigranées « Find Your Place », deux images de cuisine très sombres. Mobile 375 : hero correct, boutons empilés. Copie : descriptive, quelques fautes (« réservez la salle »).

## Findings par tier (before.txt : 13 FAIL, 7 REFLEX, 6 WARN)
- Floor : 26a pas de focus visible · 34 pas de `overflow-x: clip` et défilement horizontal à 320 · 44d texte plus large que 1600 px à 1920 · 58 234 mots sur un écran · 73 texte sous les points du slider · 76 image qui ne charge pas.
- Reflex : 26b pas d’état actif · 39b contrôles de 17 px · 44c hero qui s’arrête à 166 px · 59 espacement des sections de -7 px · 72 texte au bord en mobile · 77 cinq sections minces · 78 titres de section à 24 px.
- Finish : F1 apostrophes droites × 11 · F21 h2 suivi de h5.
- Jugées (gates.md § 5) : 6b, 9 hero en gabarit « slider, texte centré, deux boutons » · 23 pastilles sans masse · 54 aucun eyebrow mais titres centrés entre filets jaunes · 63 aucun point médian · 66 prix en pointillés acceptable, gardé en lignes · 69 horaires dits deux fois (contact et page réservation) · 80 à 85 : pied de modèle « All rights reserved » à retirer.

## Axes d’amélioration
- Faible coût : focus et états, apostrophes, `dvh`, gouttière mobile, logo en `mask-image`, nom de plat tronqué corrigé.
- Moyen : hiérarchie de la carte (numéro, nom, prix), titres à l’échelle du thème, hero sans slider.
- Seul le **full** règle : composition des sections (offre en chiffre, salle plein cadre, salles privées en split, horaires en tableau), système typographique (Young Serif sur Instrument Sans) et thème (fond chaud, ocre).
