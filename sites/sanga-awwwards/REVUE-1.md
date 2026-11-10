# Revue awwwards · Sanga · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un bol de ramen découpé en crêtes de montagne sur indigo nuit, avec un fil vermillon (l'eau) qui descend la page à gauche et un grand kanji 山河 pour signature ; sobre, bien composé, et le fleuve est un vrai élément de navigation plutôt qu'un décor.

Scores /10
- Design : 8. Indigo, washi et vermillon tiennent sur les 5 pages ; hero à 1440x900 : kanji et photo finissent à 889 px, dans l'écran ; photos découpées en crêtes (`sanga-rev1-pl-d.png`).
- Usabilité : 7. Tab propre (skip link, 2 px de focus partout), menu mobile qui se ferme à Échap et rend le focus ; mais le bouton « Réserver » promet un service que la maison n'a pas (F1-1), et 320 px déborde (F2-2).
- Créativité : 8. Le fil de l'eau lié au défilement, le sceau qui se remplit, la crête comme cadre : une idée tenue de bout en bout, sans GL.
- Contenu : 6. Prix exacts (33 lignes sur 33), faits d'adresse, téléphone, horaires justes ; mais une procédure de réservation inventée, une citation modifiée et des affirmations non prouvées.
- Technique : 8. axe 0 violation sur 5 pages x 5 largeurs (2 positions de défilement), 0 erreur console, 0 requête en échec, 19 liens internes dont 0 mort, LCP mobile 1364 ms, CLS 0, 60 fps ; réserve : 320 px et 404.

## Preuves et méthode
Captures de l'agent captures (`.shots-sanga-awwwards-revue1/home`, 14:44-14:49, postérieures au dist de 14:44:46) : accueil seulement ; carte et 404 en `shootFailed`. Complété par 3 scripts maison (axe-core de node_modules + console + requêtes + débordement + cibles + méta, 5 pages x 1440/1024/768/390/320 ; captures carte, maison, réservation, 404, menu ; reduced-motion, Tab, survols), prix confrontés à `donnees.json` par script, liens internes confrontés aux fichiers de `dist/`.

## Findings (par gravité)

### F0
Aucun. Build présent (dist 14:44 postérieur à src), mention « Maquette KYW, certaines données sont illustratives » + logo KYW (naturalWidth > 0) + `noindex, nofollow` sur les 5 pages.

### F1 majeur
- **F1-1 · T-invente · procédure de réservation inventée, contredit le dossier.** `donnees.json` : `reservation.outil: null`, « Aucune réservation de table ; commande en ligne (retrait, livraison) et téléphone » ; `dossier.md` : « Réservation : aucune ». Le site écrit : `reservation.astro:12` « la table se demande par téléphone », `reservation.astro:34` « Pour une table, appelez avant de venir », la meta description de `reservation.astro:7` (« Réserver une table … par téléphone »), `carte.astro` bouton « Comment réserver », et un CTA « Réserver » en tête de chaque page + page « Réserver » dans la nav et le pied (`Header.astro`, `Footer.astro`). Preuve : `sanga-rev1-resa-d0.png`, `sanga-rev1-resa-m0.png`. Correction : renommer la page et les liens « Venir » (ou « Commander »), retirer « table », « réserver », « appelez avant de venir » ; dire seulement « Pas de réservation en ligne » si l'on veut le préciser, garder « Appeler » (téléphone) et « Commander en ligne » (données). Le bouton d'en-tête devient « Appeler » ou « Commander ». Mettre à jour le `title`, la description et `acceptsReservations` si besoin (déjà `false`, cohérent).

### F2 mineur
- **F2-1 · citation modifiée et affirmations non prouvées (a-propos).** `a-propos.astro:25` : « assez connue pour ses ramen » alors que le dossier cite « assez connu pour ses ramen » (accord changé à l'intérieur de guillemets ; la phrase n'est d'ailleurs que dans `dossier.md`, pas dans `donnees.json`). Même paragraphe : « la carte est la même » (sur place, à emporter, livraison) et `a-propos.astro:44` « Le prix ne change pas : seule la base du bouillon varie » : rien dans le dossier ne prouve l'identité des cartes ni le contenu des bouillons (une seule ligne de prix par ramen, c'est tout). Correction : citer exactement « assez connu pour ses ramen » avec la source, retirer « la carte est la même » et reformuler « Chaque ramen se choisit en bouillon miso, shio ou shoyu, au même prix affiché ».
- **F2-2 · débordement horizontal à 320 px.** Le bouton `.tete__menu` finit à 331 px : `scrollWidth` 331 > 320 sur les 5 pages (script maison, largeur 320). Ni 390 ni 768 ne sont touchés. Le sommaire de la carte (`li`/`a` à 469 et 567 px à 390) est un rail volontaire en défilement horizontal, pas un défaut. Correction : réduire marque + « Réserver » + « Menu » à 320 px (`gap`, `padding-inline`, ou masquer le CTA d'en-tête sous 340 px).

### F3 finition
- **F3-1 · 404 : le « pic » est un rectangle orange plein.** `.perdu__pic` mesuré 512 x 307 px, `clip-path: inset(0%)` au repos : le `data-reveal="clip"` écrase la `--crete` du CSS (`site.css:207`), donc la montagne annoncée devient une dalle vermillon (`sanga-rev1-p404-m0.png`, `sanga-rev1-p404-d0.png`). Correction : poser la crête comme état final de l'animation, ou retirer `data-reveal` de cet élément.
- **F3-2 · canonical de la 404** : `https://kyw-test-restaurant.vercel.app/sanga/awwwards/404/` (page inexistante). Correction : pas de canonical sur la 404.
- **F3-3 · avis tronqué et orthographe retouchée dans les guillemets.** « Excellent et délai respecté. » coupe « Juste du réchauffer un peu les gyosa » sans « … » ; « Autant à emporter » corrige le « a » du client (`site.ts` `avis`). Correction : « Excellent et délai respecté […] » et une note « orthographe rectifiée » ou texte d'origine.
- **F3-4 · répétition** : « premier restaurant de ramen » 2 fois sur l'accueil (hero + énoncé) et 4 fois sur À propos (méta, énoncé, texte). Garder le hero, varier ailleurs.
- **F3-5 · survol absent** : `.tel-grand` (numéro de la section « Venir ») ne change pas au survol (mesuré, couleur/fond/trait identiques ; `noHoverChange` du QA, h-04). Reprendre le traitement de `.pied__tel:hover` (`site.css:262`).
- **F3-6 · crédit « Photos : Sanga »** : l'origine est `pics.orderandeat.eu` (médias du site client) et le dossier la marque « à confirmer » ; écrire « Photos : site de Sanga » ou « Photos du restaurant, à confirmer ».
- **F3-7 · note du chapô Donburi** (`site.ts`) : « Bol de riz garni, servi avec une salade et une soupe miso » généralise : le dossier dit « salade et miso » pour le chashu-don, « salade et soupe » pour l'unagidon et le yakiniku-don.

## Vérifié sans écart
Prix : 33 lignes de la carte confrontées à `donnees.json` (les deux « Tori-kara » comparés sans la parenthèse), 0 écart. Horaires : mardi à dimanche 12-14 h et 18-22 h, lundi fermé, juste. Adresse Rue Saint-Loup 8, 5000 Namur ; téléphone 081 24 10 38 ; livraison 25 € (5000 à 5004) et 35 € (5100, 5020) : conformes. Titres et descriptions uniques sur 5 pages, un `h1` par page, `lang="fr"`, JSON-LD `Restaurant` avec adresse et horaires. Reduced-motion : 0 élément à opacité < 0,5 et pas de classe `motion` sur 4 pages. Contraste vermillon `#e8512f` sur indigo : 4,61:1 (juste conforme), sur washi remplacé par `#b3301a`. Alt des 4 photos conformes aux `sujet` de `photos/index.json`. Points d'outil non retenus : `skipLinkFirst: false` (faux positif, le premier arrêt de Tab est « Aller au contenu »), 404 brute de `serve.mjs`.

## Ce qui est bien (à ne pas casser)
1. La signature « fil de l'eau » (rail vermillon, sceau qui se remplit) et le cadre en crête des photos : cohérence totale sur 5 pages, 0 débordement de 390 à 1440.
2. Le hero bureau : kanji et photo plafonnés en `svh`, tout tient dans l'écran à 1440x900, 1280x720 et 1920x1080 ; mobile composé (kanji, nom, deux CTA, crête de photo) sans recomposer en desktop écrasé.
3. La carte : rail de sommaire, prix tabulaires alignés, notes courtes ; menu mobile plein écran avec focus piégé, Échap et retour du focus.
