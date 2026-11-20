# Revue awwwards · Yayami Sushi · passe 2
Verdict : PUBLIABLE (aucun F0 ni F1 ; 2 F2 et 4 F3 restent, à traiter si une révision 2 est lancée)
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un site noir et sobre où un sceau rouge « 4,50 € les deux pièces » et son jumeau pointillé racontent que le nigiri se vend par deux, avec une carte lisible, une bande crème remise et livraison, et des titres à empattements très grands.

Scores /10
- Design 7 : hero noir, rouge et crème cohérent avec le client, carte propre ; /a-propos/ reste maigre (deux paragraphes, deux photos) et /reservation/ garde un vide à gauche au-dessous des boutons (planche desktop).
- Usabilité 8 : plus aucun débordement (35 cas), menu et ancres de la carte OK (8 ancres, 0 cassée, liste défilante contenant des liens focalisables), 0 cible < 24 px.
- Créativité 6 : un seul gag graphique (sceau et jumeau), tenu sur toutes les pages jusqu'à la 404 ; le reste est sage ; le jumeau pointillé se pose toujours sur le reflet du nigiri sur le hero desktop.
- Contenu 7 : aucun fait faux, aucune invention ; texte court ; le même bloc de contact revient deux fois sur /reservation/.
- Technique 9 : axe 0 violation sur 35 cas, 0 erreur console, 0 requête en échec, LCP mobile 1,0 à 1,1 s sous CPU x4 + 4G lente (2 passes), CLS 0, 137 liens et ressources internes (0 mort).

Méthode et hypothèses : `QA-revue2.md` n'existe pas et les `.shots/` datent de la phase 3 (23:31 à 23:45), antérieurs à la révision ; je ne les ai pas réutilisés. `dist/` (00:08) est postérieur à `REVISION-1.md` (00:07) et aucun fichier de `src/` ou `public/` n'est plus récent que lui. Mesures faites par moi sur `dist/` servi (port 4783, serveur arrêté) : axe-core complet (node_modules) sur 5 pages x 7 largeurs (320, 360, 390, 412, 430, 768, 1440), `documentElement` et `body` contre la fenêtre, `Range` du h1 contre sa boîte, console, requêtes, un seul logo, mention, noindex, lang ; contraste nœud par nœud (canvas 1x1, opacité cumulée) à 1440 et 390 sur 5 pages ; reduced-motion ; LCP et CLS ; positions du « : » caractère par caractère à 5 largeurs ; liens par fichiers de `dist/` ; extraction de texte des 4 pages et de la 404. Non refait : le texte de la carte (47 plats, 9 menus, passe 1, aucun fichier de données modifié sauf l'apostrophe), la reprise du jumeau au repos (animation, non mesurée).

## Vérification des corrections annoncées par REVISION-1
| id | annonce | résultat |
|---|---|---|
| F1-1 | `.display--fit` sur le h1 « Commander » | CONFIRMÉ : `scrollWidth - clientWidth` = 0 et `body` = 0 sur les 5 pages à 320, 360, 390, 412, 430, 768, 1440 ; texte du h1 dans sa boîte (aucun « h1 coupé ») ; capture `reservation` 390 px : « Commander » tient en entier. |
| F2-1 | « au 15 rue de Bruxelles » | CONFIRMÉ : « Remise de 10 % pour toute commande retirée au 15 rue de Bruxelles. » (texte extrait du dist, capture desktop). |
| F2-2 | « à emporter ou chez vous » | CONFIRMÉ : plus de « sur place » dans les 4 pages ni dans la 404. |
| F2-3 | intro de /reservation/ reformulée | CONFIRMÉ : « Pas de réservation de table en ligne. La commande se fait sur le site de la maison ; téléphone : 081 34 37 89. » Cohérent avec `donnees.json` (`reservation.outil`) et `dossier.md` (« réservation de table : aucune »). |
| F2-4 | /a-propos/ allégée, photos côte à côte | CONFIRMÉ EN PARTIE : doublon Horaires/Livraison/Paiement supprimé et renvoi vers « Commander » ; la colonne gauche n'est plus vide ; mais la page ne dit que carte et ouverture, sans rien de nouveau (le dossier ne donne ni histoire ni équipe, rien à inventer). Le doublon reste ailleurs (F2-2 ci-dessous). |
| F3-1 | NBSP avant « : » | PARTIEL : OK dans le chapeau du hero (`hero__lead`). ÉCHEC dans le h2 de l'accueil, voir F2-1 ci-dessous. |
| F3-3 | canonical de la 404 | CONFIRMÉ : `…/yayami/awwwards/404.html` (canonical et og:url). |
| F3-4 | « d’algues » | CONFIRMÉ : « Salade d’algues » (U+2019) dans le dist ; 0 apostrophe droite dans les 5 pages. |
Non traités, comme annoncé : F3-2, F3-5, F3-6, F3-7 (repris plus bas).

## Findings

### F0 / F1
Aucun.

### F2 (mineurs)
- **F2-1 · Deux-points orphelin toujours présent sur le titre de l'accueil.** `src/pages/index.astro:44` : `<h2 … data-split="lines">… va par paires&nbsp;: à emporter ou chez vous.</h2>`. Le NBSP est dans le source, mais le découpage SplitText (en lignes) sépare aussi sur U+00A0 : mesuré caractère par caractère, le « : » ouvre une ligne à 390, 1440 et 1920 px (OK à 768 et 1024 px). Preuve : planche `yayami-r2-planche-home.png`, troisième ligne du titre « : à emporter ou chez vous. ». La révision annonçait ce point comme corrigé. Correction : envelopper « paires&nbsp;: » dans un `<span style="white-space: nowrap">` (ou un mot-liant U+2060 avant le deux-points) et revérifier à 390, 1440, 1920 px.
- **F2-2 · Bloc de contact doublé sur /reservation/ et /a-propos/.** Sur /reservation/ la page présente « Venir chercher », « Horaires », « Appeler » puis le bloc de fin « Deux pièces. » répète adresse, plan, horaires, téléphone et remise (texte extrait du dist : 2 occurrences de « Rue de Bruxelles 15 », « De 12 h à 14 h », « 081 34 37 89 » plus l'en-tête) ; même bloc de fin sur /a-propos/ juste après un paragraphe qui dit « Horaires… voir la page Commander ». Sur desktop, la colonne gauche de /reservation/ est vide sous les boutons (planche desktop, 2e page). Correction : retirer le bloc de fin (ou seulement son tableau d'horaires et d'adresse) sur /reservation/, garder « Deux pièces. » comme signature seule.

### F3 (finition)
- **F3-1 · Jumeau pointillé sur le reflet du nigiri** (hero desktop, planche home) : il reste lisible seulement à côté du sceau ; garder une zone dégagée autour de son point de repos (ancien F3-5, non traité).
- **F3-2 · Redite de l'offre** : « 10 % de remise à l'emporter, livraison dès 30 € » apparaît dans le bloc de l'accueil, le pied de chaque page, l'intro de « Commander en ligne » (ancien F3-2, non traité).
- **F3-3 · Cartes menus de l'accueil** : deux avec photo, deux sans (ancien F3-6, non traité ; assumer ou passer les quatre en typographie).
- **F3-4 · Espaces simples avant « : »** restantes : pied de page « Photos : Yayami Sushi. Polices : … » (toutes les pages) et « plats chauds : nouilles udon… » de /a-propos/ (10 occurrences sur les 4 pages) ; remplacer par U+00A0 pour la cohérence.
- Aucun jury indépendant n'a été lancé (outil Agent absent) : à lancer par le superviseur.

## Vérifié sans défaut
Build présent et `dist/` à jour ; 0 erreur console et 0 requête en échec sur 35 cas ; axe 0 violation (les « à vérifier » de contraste d'axe sont des textes sur dégradé de soulignement ou bandeau noir, tranchés par la mesure canvas : 0 nœud sous le seuil sur 5 pages x 2 largeurs, 0 texte à opacité < 0,5 en reduced-motion) ; un `h1`, `lang="fr"`, `noindex, nofollow`, mention « Maquette KYW, certaines données sont illustratives. » et un seul `.kyw-footer__logo` sur les 5 pages ; titres uniques, JSON-LD présent ; 137 liens et ressources internes sans mort ; liens externes : `yayami.be/shop/`, OpenStreetMap, kyngroup.be ; aucun tiret cadratin ni tutoiement ; codes postaux (5000, 5001, 5002, 5003, 5004, 5020, 5100) et moyens de paiement cohérents avec la carte du dossier.

## Ce qui est bien (à ne pas casser)
1. Le sceau rouge « 4,50 € les deux pièces » et son jumeau, repris jusque dans la 404 (« Il manque une pièce. »).
2. La carte : grands titres de rubrique, prix alignés, photos détourées sur fond noir, ancres collantes (8 ancres valides).
3. Mobile et performance : sceau recomposé, menu plein écran, LCP 1,0 à 1,1 s sous CPU x4 + 4G lente, CLS 0, h1 « Commander » désormais contenu à 320 px.
