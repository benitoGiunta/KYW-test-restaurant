# Revue portfolio · Pizzeria Doria · passe 1
Verdict : A_CORRIGER

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une pizzeria de quartier traitée en « guinguette » tricolore (crème, vert sapin, corail) avec des pictos au trait, un titre serif à mot italique, et une scène signature « La table de Doria » où l'on attrape des tirages de photos pour les poser sur une table verte.

Scores /10
- Design 7 : palette tricolore cohérente avec le logo, hiérarchie nette, scène de la table réussie (capture home, section verte à 1440 px) ; affaibli par le motif « eyebrow + mot italique » répété et des cartes vides sur /histoire/.
- Usabilité 6 : horaires, téléphone et carte à portée, aucun débordement ; mais la barre de nav mobile cache « À emporter » et « Contact » (scrollWidth 557 pour 362 px à 390).
- Créativité 7 : tirages à saisir, table qui se remet en place, bandeau d'état calculé, pictos au trait ; le reste du site suit un patron classique de sections.
- Contenu 6 : faits de la carte exacts (181 lignes identiques à donnees.json), mais un état d'ouverture inventé (« arrivée jusqu'à… »), des répétitions (horaires 2 à 3 fois par page, texte de la maison copié de l'accueil) et une réservation présentée comme uniquement téléphonique.
- Technique 8 : 0 erreur console, 0 requête en échec, 0 débordement (7 pages × 1440 et 390 px), axe : une seule remarque modérée, contraste mesuré 0 écart sur 12 cas, LCP mobile ~1,1 s, CLS ≤ 0,007.

## Mesures reprises ou refaites
- Build OK (QA-revue1). `dist/` postérieur à `src/` (`find -newer` vide) : captures du QA réutilisées. QA limité à 3 pages (accueil, carte, 404 brute) ; j'ai donc mesuré moi-même les 7 pages (dont `/404.html` réel) à 1440 et 390 px : console 0, requêtes en échec 0, images cassées 0, `scrollWidth` = fenêtre, 1 seul `h1`, `lang="fr"`, un seul `<footer>`, un seul `.kyw-footer__logo`, noindex sur les 7 pages, mention « Maquette KYW, certaines données sont illustratives. » présente.
- axe-core complet (node_modules) sur 14 cas après défilement : seul `region` (modéré) sur `.marquee`, partout. Les « 27 contrastNeedsReview » du QA tombent à 0 par contraste canvas nœud par nœud (12 cas, opacité cumulée).
- Liens : 13 liens distincts, 0 interne mort (vérifiés contre `dist/`) ; externes conformes au dossier (Facebook `pizzeriadoria`, `pizzy.be/pizzeria-doria`, `tel:+3281444408`, `mailto:info@pizzeriadoria.be`).
- Carte : 181 plats, noms et prix identiques à `donnees.json` (script, 0 écart). Adresse, téléphone, e-mail, horaires du tableau et note de cuisine conformes. JSON-LD `Restaurant` avec adresse, géo et `openingHoursSpecification` sur chaque page. `robots.txt` et sitemaps présents (le « pas de robots/sitemap » du QA est un faux positif).
- reduced-motion : 0 élément masqué sur accueil et histoire. Aucune mention de note, avis ou récompense inventée.

## Findings (triés par gravité)

**F1-1 · Navigation mobile : 2 des 6 liens sont coupés sans indice.** `Header.astro` / `base.css` (barre fixe du bas). Preuve : script de mesure, `nav` scrollWidth 557 pour clientWidth 362 à 390 px (332 à 360, 292 à 320) ; « À emporter » commence à x=386 et « Contact » à x=489 sur 390 px ; captures m-* : la barre s'arrête sur « La maison ». Aucun burger, aucun fondu, aucun repère de défilement. Les deux pages qui convertissent (commande, contact) n'ont donc pas d'entrée visible en mobile. Correction : 4 entrées + « Plus » (ou barre à 5 entrées : Carte, Vins, Maison, Emporter, Contact, sans « Accueil » car le logo y mène), ou texte réduit pour tenir en 362 px ; à défaut un fondu de bord et `scroll-snap`.

**F1-2 · Bandeau d'état : « arrivée jusqu'à … » est inventé et contredit la note du dossier.** `site.ts` / `Marquee.astro` (état calculé). Preuve (`page.clock.install`, Europe/Brussels) : lundi 12 h 30 → « Ouvert, arrivée jusqu'à 13 h 30 » ; vendredi 21 h 45 → « Ouvert, arrivée jusqu'à 22 h ». Le dossier donne 12:00-13:30 / 18:00-22:00 comme horaires, et `horaires.note` précise « cuisine fermée à partir de 21 h 30 le vendredi et le samedi ». Une « dernière arrivée » n'est dans aucune source (T-invente) et, le vendredi à 21 h 45, elle contredit la fermeture de cuisine affichée plus bas. Correction : libeller « Ouvert jusqu'à 22 h » (horaire du dossier), et ajouter la clôture de cuisine seulement telle qu'écrite dans `horaires.note`. Les 8 autres états testés (mardi, mercredi, jeudi 13 h 45, samedi 22 h 30, dimanche 12 h et 22 h, lundi 15 h et 21 h 45) sont justes.

**F2-1 · « Réservation par téléphone » présentée comme le seul moyen.** Occurrences : bandeau de toutes les pages, pied de page, `reservation/` (« Pour réserver une table, appelez la maison »), `<meta description>` de /reservation/. Preuve : dossier.md « bouton « Réserver une table » (outil à confirmer) et téléphone » ; `donnees.json` `reservation.outil` « outil exact à confirmer ». Le téléphone est prouvé, l'exclusivité ne l'est pas. Correction : « Réservation : +32 81 44 44 08 » sans « par », et une mention « mode de réservation en ligne à confirmer » dans le fichier de contenu (`placeholder`/note), pas sur la page.

**F2-2 · Horaires répétés 2 à 3 fois par page.** Preuve : audit.mjs 14 WARN « sentence repeated » ; sur /reservation/ : bloc « Quand venir » + tableau du pied de page + bandeau ; même chose sur /, /histoire/, /emporter/. La phrase « Cuisine fermée à partir de 21 h… » est répétée sur accueil, emporter et réservation. Correction : garder le tableau complet sur accueil et réservation, remplacer le pied de page par une ligne « Aujourd'hui : … » ou un lien, ne pas répéter la note de cuisine sur /emporter/.

**F2-3 · /histoire/ recopie l'accueil.** Preuve : les deux paragraphes « Ouverte en octobre 2017… racontée sans chichis » et « Depuis mai 2023… chaises noires » sont identiques dans la section « Une ancienne banque, une table » de l'accueil et dans « Une histoire de famille » de /histoire/ ; la baseline du client est aussi reprise comme chapeau. Le matériau du dossier est mince, mais la page ne dit rien de plus que la section d'accueil. Correction : réduire l'accueil à une phrase + lien, ou écrire pour /histoire/ un texte distinct tiré de la matière à site (ancienne banque, Eggusto, bières locales) sans recopier. Le « racontée sans chichis » et « de pâte et de four » sont du remplissage non issu du dossier : à retirer.

**F2-4 · Cartes « Aux commandes » vides.** `histoire.astro`. Preuve : captures h-1 et mhist (desktop 215 × 165 px, mobile ~400 px de haut) : deux grands rectangles beiges avec un picto (pizza, verre) au-dessus de « Rocco, Gérant » et « Luigi, Gérant, sélection de vins au verre ». On dirait des photos qui n'ont pas chargé. Correction : retirer les cadres et faire une simple ligne de deux noms, ou une carte textuelle compacte.

**F2-5 · Patron « eyebrow + mot italique » sur presque tous les titres.** Preuve : eyebrows « La maison », « La carte », « Les midis scolaires », « Horaires », « Adresse » ; mot italique dans « une table », « grande tablée », « un panini », « commandes », « le basilic », « Quand venir ». Le gabarit a une vraie identité (tricolore, pictos, scène), mais ce procédé revient sur six titres et finit par se lire comme générique. Correction : le garder sur 2 titres (hero, table), mettre les autres en romain simple et supprimer les eyebrows redondants avec le titre.

**F2-6 · « grande tablée » et « Un cornet, un panini » : texte non prouvé / sans lien avec la cible.** « Pâtes fraîches, pizzas et grande tablée » (accueil, h2 corail) suggère l'accueil de groupes alors que `manques` indique « nombre de couverts, terrasse, parking, privatisation : inconnus ». Le lien « Sur place ou à emporter » sous les midis scolaires mène à /emporter/ qui ne parle pas des midis scolaires hors du tableau de prix. Correction : « Pâtes fraîches, pizzas et antipasti » ; libellé du lien « Voir comment commander ».

**F3-1 · Mot géant du pied de page coupé aussi à droite.** `base.css:219` (`.footer__finale`, `white-space: nowrap`). Preuve : capture bas de page 1440 px : « Buon appetit » (le « o ! » manque), 390 px : « Buon a ». Le recadrage par le bas est voulu (commentaire de `Footer.astro`), pas celui de droite ; décoratif (`aria-hidden`), sans conséquence d'accessibilité. Correction : `font-size: clamp(…, 12vw, …)` pour que le mot tienne en largeur.

**F3-2 · Image trop lourde.** `dist/pizzeria-doria/portfolio/photos/bouchons.webp` : 317 692 octets (> 300 Ko) ; les autres font 79 à 151 Ko. Correction : requalité à 70 ou largeur 1000 px.

**F3-3 · Typographie.** Apostrophes droites dans les textes de `site.ts` (« l'Italie », « s'attable », « Toute l'histoire », « qu'on enfourne ») alors que la carte utilise « ’ » ; formats d'heure mélangés (« 12:00 à 13:30 » dans les tableaux, « 21 h », « 13 h 30 » dans le bandeau et les notes). Correction : une passe U+2019 (Python) et un format unique (« 12 h à 13 h 30 »).

**F3-4 · Doublon d'information dans la carte.** `/carte/` : « Pains (maison, 5 pièces) » affiche aussi « 5 pièces » en description ; idem « Pains à l'ail et fior di latte (5 pièces) ». Correction : vider la description quand elle répète le nom.

**F3-5 · axe `region` (modéré) sur `.marquee` des 7 pages.** Le bandeau est hors de tout landmark. Correction : le placer dans le `<header>` ou lui donner `role="region"` + `aria-label`. JSON-LD : `"acceptsReservations": null` sur chaque page, à retirer (valeur nulle non valide pour schema.org).

## Faux positifs du QA (à ne pas corriger)
- `skipLinkFirst: false` : le premier arrêt clavier est bien « Aller au contenu ».
- « 404 : color-contrast, hover sans changement » : réponse brute de `serve.mjs` ; `/404.html` réel mesuré (h1, title, lang, un seul axe `region`).
- « Pas de robots.txt / sitemap » : présents dans `dist/`.
- `Hero stabilisé : null` : mouvement idle voulu (pictos), 60 FPS.

## Ce qui est bien (à ne pas casser à la révision)
1. La scène « La table de Doria » (tirages à saisir, rotation au lâcher, « Remettre la table », version mobile « glissez ») : signature tenue du desktop au mobile, 60 FPS, aucun débordement à 390 px.
2. Exactitude des données : 181 plats et prix identiques au dossier, adresse, téléphone, e-mail, Facebook, pizzy.be, horaires et JSON-LD conformes ; photos libres toutes marquées « photo libre, illustrative », aucun avis ni récompense inventé.
3. Technique propre : 0 console, 0 lien mort, contraste mesuré 0 écart, reduced-motion sans texte caché, `lang`, noindex, footer KYW unique sur chaque page, 404 designée avec le bon `<title>`.

## Hypothèses
- Fraîcheur : `dist/` postérieur à `src/` et `public/` (find -newer vide), captures du QA donc valides ; planches du QA illisibles (grande zone blanche), remplacées par mes propres captures de fenêtre.
- Fuseau du bandeau testé en Europe/Brussels via `page.clock` avec contexte `America/New_York` pour vérifier que le calcul ne dépend pas du fuseau du visiteur.
- Les jours fériés ne sont pas gérés par le bandeau (aucune donnée de calendrier dans le dossier) : non noté.
