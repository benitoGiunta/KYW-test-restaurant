# Revue legacy · La Dolce Vita (Wépion) · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un restaurant italien familial vu de nuit, fond brun très sombre, titres en serif épais crème, terracotta réservé aux boutons et aux prix, photo plein écran de la façade au-dessus d'une carte « Réserver par téléphone ».
Scores /10 :
- design 7 : hiérarchie nette et sobre (d-01-hero, carte desktop), mais zones vides de 300 à 400 px (voir F2-3) et recadrage mobile du hero faible (m-01-hero).
- usabilité 8 : numéro de téléphone présent partout (nav, hero, infos, 404), statut « Fermé, ouvre demain dès 12 h 00 » calculé sur Europe/Brussels, ligne du jour surlignée (« aujourd'hui »), 0 débordement, 0 cible tactile petite.
- créativité 6 : parti pris propre mais peu de signature : mise en page éditoriale standard, liste 01 à 05 décorative, rien de propre à Wépion ou au néon du lieu.
- contenu 7 : faits tous conformes au dossier (voir ci-dessous), mais textes repris du site client avec du filler répété (F2-2).
- technique 7 : build OK, 0 erreur console, 0 requête en échec, 0 violation axe, contrastes mesurés 0 sous le seuil ; mais ni JSON-LD ni balises OG (F1-1, F2-1).

Preuves utilisées : `QA-revue1.md` et planches (accueil, carte, 404), captures de fenêtre d-01, d-03, d-05, m-01 ; captures maison (port 4577, serveur arrêté) pour `/infos/`, `/la-dolce-vita/` et `/404.html`, que `shoot.mjs --crawl` n'a pas faites : 0 erreur console, 0 échec réseau, 0 débordement (scrollWidth = clientWidth à 1440 et 390), 1 seul h1, `lang="fr"`, noindex, 404 designée. Contraste : script canvas + opacité cumulée sur 1 120 nœuds texte (4 pages × 2 largeurs, après défilement), 0 sous 4,5 (3 pour grands corps) ; les « 23 à vérifier » d'axe de l'accueil tombent à 0. Les captures sont postérieures au build (build 21:02, report.json 21:07).

## Vérifications sans écart
- Faits : nom, adresse (Chaussée de Dinant 1080, 5100 Wépion), téléphones (`tel:+3281855420`, `tel:+32471060002`), e-mail, horaires (7 jours, mardi fermé, mercredi et samedi soir seulement) conformes à `donnees.json` ; Facebook et Instagram pointent vers les URL du dossier ; réservation par téléphone uniquement, conforme au dossier (pas d'outil en ligne inventé).
- Carte : 86 plats comparés à `donnees.json`, 0 prix ni nom différent (4 écarts apparents = apostrophes typographiques) ; suppléments 1 €, 3 €, 4 €, 3 €, sauces 3,50 € conformes au dossier.
- Aucune invention : avis (Maurice D., Grégory R., Emile P.) présents dans `extraits_avis`, note 4,3 et « plus de 500 avis » attribuées au restaurant ; ni GPS, ni abonnés, ni presse ; les textes de /infos/ (« Pourquoi par téléphone », « Ayez sous la main ») et « fraises et coteaux, à dix minutes de Namur » figurent sur le site client (`site-actuel/pages/infos/texte.txt`).
- Mention « Maquette KYW, certaines données sont illustratives », logo KYW unique, `noindex` : présents sur les 5 pages. Liens internes et ressources : 0 cassé (contrôle des chemins dans `dist/` avec préfixe `/dolce-vita-wepion/legacy/`, aucun lien hors base).
- Alt : tous issus du champ `sujet` de `photos/index.json`. Plus lourde image : 227 Ko (< 300 Ko). LCP mobile 992 ms, CLS 0,001.

## Findings

### F1 majeurs
- **F1-1 JSON-LD `Restaurant` absent des 5 pages** (`grep -c 'ld+json'` = 0 sur index, carte, infos, la-dolce-vita, 404). Le prompt § C exige adresse et horaires structurés. Correction : un bloc `application/ld+json` dans le layout (`@type: Restaurant`, name, address PostalAddress, telephone, `openingHoursSpecification` des 7 jours depuis `SITE.horaires`, sameAs Facebook et Instagram, pas de `geo` ni d'`aggregateRating` inventé) ; l'ajouter aussi sur la 404 n'est pas nécessaire.

### F2 mineurs
- **F2-1 Aucune balise Open Graph** (`og:title`, `og:description`, `og:image`, `og:type` absents de `<head>`) ; favicon = `logo-cream.png` (crème sur fond transparent, peu lisible en onglet clair). Correction : OG par page à partir de `<title>` et `description`, `og:image` = `01-facade-soir-poster.webp` ; favicon sur fond sombre.
- **F2-2 Filler et répétitions** (`src/pages/index.astro`, `la-dolce-vita.astro`). « Une pâte travaillée avec soin, des ingrédients sélectionnés pour leur qualité et ce savoir-faire qui fait toute la différence » apparaît 3 fois (carte Pizze de l'accueil, section « Les mains font le menu », page /la-dolce-vita/) ; « l'élégance italienne rencontre la chaleur d'une maison familiale » 2 fois (accueil, hero de /la-dolce-vita/) ; « savoir-faire » 3 fois, « passion » dans le h1 et le texte d'Armando, « les plats qui tiennent parole », « Pour commencer en partageant ». Le texte vient du client mais le prompt § B.2 range « passion », « savoir-faire » dans le filler. Correction : garder la formule une seule fois, remplacer les autres par du concret du dossier (Tiramisu della casa, crème brûlée et mousse au chocolat maison, nougat glacé maison, pâtes al dente, ardoise).
- **F2-3 Zones vides desktop** : accueil `d-03-scroll` (~400 px vides sous « Voir toute la carte », colonne gauche), accueil `d-05-scroll` (~300 px vides sous les trois avis), /infos/ (grand vide entre le téléphone en grand corps et « Réserver, mode d'emploi », planche desktop infos). Correction : réduire les `padding-block` de ces sections (ou rendre la colonne titre `sticky`), ramener l'avis à une hauteur utile.
- **F2-4 Hero mobile mal cadré** (`m-01-hero.png`, 390 px) : la photo 1920×1080 est recadrée sur un mur blanc, l'enseigne est coupée (« La Do… », panneau « RE… »), la terrasse disparaît sous la carte sombre, l'image paraît floue à cette taille. Correction : `object-position` vers l'enseigne et la terrasse (≈ 70 % horizontal), carte du hero plus basse ou plus courte pour laisser voir la terrasse.

### F3 finition
- **F3-1** Numéros décoratifs 01 à 05 devant Antipasti, Pasta, Pizze, Secondi, Dolci sur l'accueil (`d-03-scroll`) : motif « chiffres décoratifs » du prompt § C ; les supprimer ou les remplacer par le nombre de plats de la catégorie.
- **F3-2** Alt de l'accueil : « (poster de la vidéo d'accueil) » et « (poster de vidéo), format portrait » décrivent un détail technique, or le site ne contient pas de vidéo ; utiliser le sujet sans la parenthèse.
- **F3-3** « Ouvrir l'itinéraire » sans changement au survol (`report.json`, hover h-03 `react: none`) ; 5 liens (accueil) et 4 (carte) ne se distinguent que par la couleur (`colorOnly`) : ajouter le soulignement ou un changement de graisse.
- **F3-4** Polices : Google Fonts chargées depuis `fonts.googleapis.com` et fontes ttf/otf livrées (WARN audit, 291 Ko sur /la-dolce-vita/) ; ne garder qu'une source en woff2 avec `preload`. Aucun `rel="preload"` dans le `<head>` de l'accueil.
- **F3-5** Les deux dernières images de la galerie « Le lieu, les assiettes, la lumière » (05 et 06) montrent le même chariot à vin et la même ardoise (alt quasi identiques) ; en retirer une.

## Ce qui est bien (à ne pas casser)
1. Données de la carte et horaires exacts, statut d'ouverture dynamique et ligne du jour mise en valeur ; téléphone cliquable partout, aucune réservation en ligne inventée.
2. Hiérarchie typographique et palette tenues (serif épais crème, terracotta réservé aux actions et aux prix), contrastes mesurés tous conformes, mobile pensé (menu, listes de la carte recomposées, horaires en deux lignes par jour).
3. Pied de page KYW unique, mention « Maquette », noindex, 404 designée avec retour et téléphone ; 0 erreur console, 0 débordement, perfs excellentes (LCP mobile 992 ms).

## Hypothèses et limites
- Sloplint non relancé : journal de la construction `.logs/dvl3-sloplint.log` (0 FAIL, 10 REFLEX, 7 WARN) ; l'effet `fade-up` et le reste du motif AI slop n'ont pas été pris en défaut sur les captures vues (pas de dégradé violet, pas de glassmorphism, un seul eyebrow par section absent).
- Survol et clavier jugés sur `report.json` de l'accueil et de /carte/ ; /infos/ et /la-dolce-vita/ n'ont pas eu de passe clavier/survol (pas de formulaire sur ces pages).
