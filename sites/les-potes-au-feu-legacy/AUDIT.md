# Audit Hallmark · Les Potes au Feu · 31/10/2026
Source : https://www.lespotesaufeu.be (5 routes : `/`, `/page/les-potes-au-feu.html`, `/categorie/le-menu-des-potes.html`, `/page/reservation-en-ligne.html`, `/page/contactez-nous.html`), HTML relu en direct le 31/10/2026 (`.hallmark/site-actuel/*.html`, non commité), captures du client du 28/10/2026 (`data/restaurants/les-potes-au-feu/site-actuel/`) et captures Hallmark `.hallmark/before/` (25 PNG : 1280x800, 1440x900, 1920x1080, 1440 full, 375 full par route).
Commande : `sloplint .hallmark/site-actuel --genre editorial --render --before --url <5 routes>` → 140 FAIL, 129 REFLEX, 48 WARN, 47 liens, 21 champs, 8 handlers enregistrés.
Genre inféré : editorial parce que la page n'est pas estampillée, que c'est un bistro de quartier sur fond blanc, à titres serif (Cormorant Garamond) et photos de reportage chaudes ; rien d'atmosphérique (fond clair) ni de ludique.

## La lecture en quatre lignes
- Pour quoi : des Namurois et visiteurs qui cherchent une table bistronomique ; l'action unique est **réserver** (Zenchef), puis offrir un bon cadeau.
- Ce qui marche et reste : les deux portraits des chefs côte à côte en ouverture (la rencontre), les photos de reportage chaudes (salle, passe, service), les textes personnels de l'histoire, la carte HTML avec ses prix, les horaires exacts, Zenchef.
- Ce qui se lit comme généré ou daté : bandeau de trois « piliers » en capitales trackées sous des icônes Font Awesome (67, 3), titres à mot coloré orange (« **Comme** des Potes », 38iii), « Découvrez notre concept en vidéo » (19), bannière cookies E-net qui couvre un tiers de l'écran, widget Zenchef ouvert par défaut qui masque le contenu, carrousel lightslider de 12 photos (83 : 433 % de la page en photos sur la page à propos), pied de page noir chargé de badges HTTPS/GDPR/CDE et de liens d'agence.
- Ce qui est cassé : aucun `:focus-visible` (26a, 15 occurrences), contraste insuffisant sur les textes gris et orange (40, 27 occurrences), texte à 10 px (75), 4 graisses (F19), CTA sous le pli sur les pages intérieures (44b), images qui ne chargent pas (76 : logo et galeries en rendu headless), script qui lève `$ is not defined` (render), lien de partage Twitter mort, avis « 5/5 (11 avis) » qui portent sur l'agence E-net et non sur le restaurant (46a).

## Structure du site d'origine
- Type : multi-pages, 5 routes utiles + 6 pages utilitaires E-net (bon cadeau, services en ligne, boîte à idées, recommandation, cookies, conditions, partenaires) · nav : barre supérieure (Namur, téléphone, statut « Fermé actuellement », Contact, partage) puis masthead à logo centré, deux liens à gauche, un lien et le bouton orange « Réservation en ligne » à droite · footer : noir, colonnes (Menu principal, Nos services en ligne, Rejoignez-nous + plugin Facebook), badges, mentions.
- Sections de l'accueil dans l'ordre : hero (diptyque des deux portraits plein cadre + carte blanche centrée « Les potes au feu. L'histoire d'une rencontre… », posture proche d'un Poster), « Comme des Potes » (texte + photo trio), « Un vrai moment de cuisine » (photo dessert + texte, en zigzag), bandeau gris « Réservation en ligne / Bon cadeau en ligne », « Découvrez notre concept en vidéo » (YouTube), trois piliers (icônes + capitales), footer.
- Pages intérieures : bannière photo de la salle (2000x520) + titre centré sur un navet ocre, puis le contenu (histoire et galerie ; carte en trois blocs photo + texte ; iframe Zenchef ; formulaire + carte Leaflet + horaires + avis E-net), puis le bandeau CTA et les piliers.
- Animations : aucune chorégraphie ; lightslider (galerie à vignettes, pas d'autoplay), flèche de défilement, scroll-to-top, widget Zenchef flottant (gates 18, 27, 62 : rien à garder en mouvement).
- Images : photos du restaurant (portraits studio 1500x1999, reportage 1140x642, plats 550x825, bannières 2000x520) · ratio photo sous le hero : ~45 % à l'accueil, 433 % sur la page à propos (galerie).
- Mobile : en-tête empilé (logo, téléphone, burger), bouton réservation pleine largeur, hero en deux portraits ; widget Zenchef et bannière cookies recouvrent le bas d'écran ; liens de pied de page qui replient (49b, 66 occurrences).
- Copie : français, ton personnel et chaleureux ; « Découvrez » (19) ; points de suspension à trois points (F2) ; apostrophes droites (F1) ; tiret demi-cadratin dans la carte (19) ; « Il y a quatorze ans » sans date de rédaction ; prix et horaires dits une fois par page.

## Findings par tier (depuis `.hallmark/before.txt`)
Floor : 140 FAIL · 7a (blanc pur), 10a (transition de `left`), 19 (tiret), 26a ×15 (aucun focus), 33 ×15 (svg sans aria), 34 ×27 (pas d'overflow-x: clip), 40 ×27 (contraste), 44b ×6 (CTA sous le pli), 44d ×11 (texte à 8 px du bord à 1920), 48 ×5 (couleurs en style inline), 49a ×10 (libellés de bouton qui replient), 50 (titre sans overflow-wrap), 58 ×10 (315 mots sur un écran), 76 ×5 (images cassées), render ×5 (script qui lève).
Reflex : 129 · 25 ×6 (prose à 231 caractères), 26b ×10 (pas d'`:active`/`:disabled`), 39b ×10 (boutons de 17 px), 44c ×10 (hero de 278 px sur 900), 49b ×66 (liens qui replient), 59 ×9 (16 px entre sections), 72 (texte collé au bord), 75 ×5 (texte à 10 px), 77 ×5 (sections minces), 78 ×4 (titres de section à 24 px), 79 ×2 (709 px de vide), 83 (433 % de photos).
Finish : 48 WARN · F1 ×5, F2 ×2, F19 ×5 (4 graisses), F21 (h1 → h3), F23 ×3 (pas de meta description), F25 ×4 (88 mots cachés au téléphone), F26 ×2 (titres qui finissent sur un moignon), render ×5 (polices de repli).
Jugées (depuis les captures, gates.md § 5) :
- 6b : hero sans posture déclarée, carte blanche centrée sur la couture des deux photos : confirmée.
- 8 : séquence hero, deux blocs texte+photo en zigzag, bandeau CTA, vidéo, piliers, footer : proche du gabarit, confirmée.
- 9 : chaque couture identique (blanc puis gris clair), confirmée.
- 23 : orange sur chaque titre et chaque bouton, au-delà de 5 % : confirmée.
- 29 : aucun halo : écartée.
- 44 : à 1280 le hero tient ; à 1920 la mesure s'étire (44d), confirmée.
- 54 : « Les potes au feu » au-dessus du titre de section en petit : eyebrow léger, confirmée.
- 58 : 315 mots sur un écran (histoire) : confirmée.
- 63 : chaîne « Namur · +32… » dans la barre supérieure : confirmée.
- 66 : flèche de défilement sous le hero (scroll cue) : confirmée.
- 69 : bandeau CTA répété en bas de chaque page, horaires une fois : écartée.
- 77-79 : bandeau CTA mince, 709 px de vide : confirmées.
- 80 : navet dessiné derrière les titres (logo du client, pas une illustration de remplissage) : écartée, c'est la marque.
- 81-82 : aucun : écartées.
- 83 : galerie de 12 photos : confirmée.
- 84 : le module Zenchef est réel (iframe) : écartée.
- 85 : la page se ferme sur le pied de page, pas sur une newsletter : écartée.

## Axes d'amélioration (classés par coût pour la page)
1. Accessibilité de base : focus visible, contraste, tailles de texte, `overflow-x: clip`, `dvh` (Floor, coût nul pour la composition).
2. Libérer l'écran : supprimer la bannière cookies E-net et le widget Zenchef flottant, garder Zenchef sur sa page.
3. Retirer les faux avis (avis sur l'agence E-net) et les badges d'agence du pied de page.
4. Un seul système : deux familles, trois graisses, un accent sous 5 %, une échelle d'espace, des titres de section à ≥ 40 px.
5. Recomposer le hero (diptyque gardé, texte posé bas, l'offre et le prix dans la phrase), les sections sans zigzag, les piliers en lignes typographiques, la galerie en rail.
6. Donner à la carte une forme de carte (switcher soir/midi, rangs avec prix tabulaires) et finir chaque page sur horaires, adresse et réservation.
La profondeur la plus légère qui règle tout : full (contrainte KYW). Ce que seul full règle : le hero (carte blanche centrée → puits bas), la composition en zigzag, les piliers en icônes, la galerie, le chrome (barre supérieure + pied de page d'agence).
