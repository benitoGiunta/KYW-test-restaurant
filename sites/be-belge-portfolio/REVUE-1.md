# Revue portfolio · Be Belge… et d'ailleurs · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un restaurant de pierre et de jardin raconté comme un théâtre, rideau aubergine et filet ocre qui se lèvent sur de grands chiffres (3, 57, 34, 5) ; la carte d'été du Menu du Chef sert de fil.

Scores /10
- Design 8 : palette aubergine/ocre tenue, hero plein écran lisible (d-01-hero), typo Didone cohérente ; zone vide sous la photo du chapitre prix (d-03-scroll).
- Usabilité 7,5 : navigation claire, 0 débordement (390 et 1440, 5 pages relevées en plus), skip link bien premier arrêt clavier (stops du report.json) ; coupure « +7 / € » (m-03-scroll, d-03-scroll) et libellés de menu incohérents.
- Créativité 7,5 : rideau à filet ocre et chiffres monumentaux propres au lieu ; photos d'illustration faibles (buffet à bouteilles, vache décorative) pour un chapitre « prix ».
- Contenu 7 : tous les faits concordent avec donnees.json (carte, prix, horaires, tél., e-mail, privatisation) ; aucune invention ; mais répétitions (prix ×3, « nouveau petit nid » ×3, horaires ×2 sur l'accueil).
- Technique 8,5 : build OK, 0 erreur console, 0 requête en échec, 0 lien mort (7 URL testées 200, inconnue 404), CLS 0, LCP mobile 1,3 s, axe 0 violation sur accueil et menu, noindex/mention/logo KYW/lang=fr/h1 unique/JSON-LD sur les 7 pages.

## Findings
F0 : aucun.
F1 : aucun.

F2-1 · Prix coupé « +7 / € » (menu). `src/data/site.ts:102` (`prix: '+7 €'`, espace ordinaire) ; preuve : be-belge-item/d-03-scroll.png et m-03-scroll.png (le « € » passe à la ligne). Correction : espace insécable (`+7 €`) et `white-space: nowrap` sur la cellule prix ; même contrôle pour « 57 € », « 28 € », « 35 € ».
F2-2 · Menu daté d'été, présenté comme tarif actuel. Le Menu du Chef n'était proposé que du 13/08 au 06/09/2026 (dossier) ; au 20/11 la méta description « Menu du Chef dès 57 € » (Base/index), le chiffre géant « 57 euros » de l'accueil et le titre de `/menu/` l'annoncent sans date ; seules `/carte/` (« proposée du 13 août au 6 septembre ») et un « à titre d'exemple » le nuancent. Correction : dater ou nuancer de la même façon sur l'accueil (chapitre 2) et dans la description (« carte de l'été 2026 »).
F2-3 · Prix répété trois fois dans le chapitre 2 de l'accueil (`index.astro`, chiffre « 57 euros », titre « Le Menu du Chef en trois services ; 72 € en quatre », puis « 57 € pour le Menu du Chef en 3 services, 72 € en 4 services ») ; même doublon au chapitre 1 (« Ou quatre : le Menu du Chef, entrée, plat et dessert » puis « une entrée, un plat, un dessert… »). Preuve : d-03-scroll.png, extrait du texte rendu. Correction : une seule occurrence par information ; le paragraphe ne redit pas le titre.
F2-4 · Navigation incohérente : lien « Formules », titre de page « Menus » (`<title>`), h1 « Deux prix, une cuisine », et `/carte/` redit presque `/menu/` (mêmes menus, mêmes suppléments, mêmes vins). Correction : un seul nom (« Les menus ») pour le lien, le title et le h1 ; retirer de `/carte/` les suppléments, déjà sur `/menu/`.
F2-5 · Horaires dits deux fois sur l'accueil (bloc de clôture puis pied de page ; WARN audit « phrase répétée 2 fois » pour « mercredi, jeudi, vendredi et dimanche, 12:00 à 13:30 » et le soir). Correction : garder le bloc de clôture, ou réduire le pied à « Horaires » + lien.

F3-1 · Format d'heure « 12:00 à 13:30 » : en français, « 12 h à 13 h 30 » (`horaireTexte` et `horairesResume` dans `site.ts`). Le JSON-LD garde HH:MM.
F3-2 · Apostrophes droites (h1 « D'AILLEURS », citation « n'y coule », « s'appelle lui-même ») mêlées aux courbes (’) du reste. Uniformiser en ’.
F3-3 · « notre nouveau petit nid » cité trois fois (accueil chapitre 3, maison paragraphe 1 et titre H1 « Un nouveau petit nid à Wépion ») et le même mot d'accueil sert de citation de l'accueil : redite. Garder la citation en un seul endroit.
F3-4 · `/menu/` : numéros « 01 / 01 / 01, 02 / 02 / 02, 03 / 03 / 03 » : ce sont des numéros de catégorie répétés par plat (chiffres décoratifs, sans fonction). Les retirer ou les mettre une fois par catégorie.
F3-5 · `/maison/`, « Ce qui compte » : trois items égaux (Cuisine belge, Produits de saison, Un peu d'ailleurs), tirés de valeurs que le dossier marque « à confirmer » ; la phrase « Le mot d'accueil… dit l'essentiel » est du remplissage. Resserrer ou supprimer.
F3-6 · Photo d'illustration du chapitre prix : buffet à bouteilles et vache décorative (d-03-scroll.png) ; sous la photo, bande aubergine vide d'environ 180 px. Préférer une photo de table (tableaux rouges, banquette) et réduire l'espace.
F3-7 · Pied de page mobile : « 19:00 à / 20:30 » coupe l'horaire (m-carte-mid.png). Insécables entre « à » et l'heure.
F3-8 · Photos des onglets de privatisation avec `alt=""` (accueil, `onglets__photo`) : acceptable si décoratif, mais les trois sont de vraies photos ; reprendre les alt de `site.photos`.
F3-9 · Lien de réservation `https://bookings.zenchef.com/results?rid=382492` déduit du rid du site actuel (iframe `zenchef.com/results?rid=382492&pid=1001&fullscreen=1`), non ouvert ici (accès réseau externe non testé). Le dossier donne seulement `bebelgeetdailleurs.be/reservation/` ; à confirmer à la prochaine passe ou ajouter le pid.
F3-10 · Faux positifs de la QA à ne pas corriger : (a) la capture « 404 » du shoot est la 404 globale de `dist/404.html` (« Cette adresse n'existe pas… maquettes de sites de restaurants namurois »), pas celle du site ; le serveur local ne route pas comme `vercel.json` (règle `^/([^/]+)/([^/]+)/.*` vers `/<slug>/<variante>/404.html`). L'axe « serious » (contraste #6b787d) concerne donc cette page globale, hors périmètre. La 404 du site (`dist/be-belge/portfolio/404.html`) vue en capture ciblée : titre « Rideau », deux boutons, pied complet, 0 débordement, 0 erreur ; axe non relancé sur elle. (b) « skipLinkFirst: false » : le lien « Aller au contenu » est bien le premier arrêt (accueil et menu). (c) « pas de robots.txt / sitemap » : `robots.txt` (Disallow: /) et `sitemap-index.xml` sont servis (200) sous `/be-belge/portfolio/` ; l'audit les cherche à la racine de l'hôte.

Couverture : captures complètes lues pour l'accueil et `/menu/` (planche, d-01, d-03, d-06, m-03) ; captures ciblées que j'ai faites (390 et 1440, hero et milieu) pour `/carte/`, `/maison/`, `/privatisation/`, `/reservation/`, `404.html` dans `.shots-be-belge-portfolio-revue1/cibles/` (lues : d-404html, m-carte-mid, m-privatisation-mid, d-maison-mid ; les autres seulement par script : 0 débordement, 0 erreur). Pas de clic de test sur le menu mobile (aria-expanded vérifié par l'ETAT du site, non revu).

## Ce qui est bien
1. Le hero (d-01-hero) : photo de pierre, nom en Didone ocre, accroche et CTA lisibles, rien de générique.
2. Fidélité au dossier : carte, prix, vins, horaires, adresse, privatisation (15 à 34 / 20 à 40), 0 donnée inventée, mention « Maquette KYW » et signature KYW sur chaque page.
3. Technique propre et reduced-motion sain (0 élément masqué, CLS 0, LCP mobile 1,3 s, photo la plus lourde 296 Ko).
