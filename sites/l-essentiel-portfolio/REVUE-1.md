# Revue portfolio · L'Essentiel · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un site blanc et très sobre (capitales fines, filets, une façade en brique avec l'enseigne dorée), dont le seul geste animé est un dressage qui se pose médaillon par médaillon dans une assiette cernée d'un anneau laiton, autour de la carte de saison.

Scores /10 :
- Design 7 : sobriété cohérente et photo de façade forte (`h1440-home.png`), mais l'enseigne est coupée dans le hero et le dressage reste petit sur 1440 (`s1440-2000.png`, assiette d'environ 230 px dans 900 px de haut).
- Usabilité 8 : 0 débordement sur 14 cas (7 pages x 1440/390), 4 liens de nav tiennent à 390, barre « Réserver » basse, loader mesuré à 2,3 s ; mais la page /menu/ s'appelle « La carte » et /carte/ « Menus » (slugs inversés).
- Créativité 6 : un geste unique et tenu (anneau laiton), mais chaque titre porte son surtitre et la carte ses chiffres romains : le reste suit le gabarit.
- Contenu 7 : faits, prix, horaires, adresse, fermetures et plats conformes à `donnees.json` (comparaison complète des 6 pages), pas d'avis ni de chef inventés ; trois phrases de procédure non prouvées et un `<title>` faux.
- Technique 7 : build OK, 0 erreur console, 0 requête en échec, 0 lien mort (9 URL internes à 200), noindex, mention et un seul logo KYW partout ; axe : 1 violation « serious » (aria-label sur `<p>`) et deux règles de landmarks ; LCP desktop accueil 2592 ms.

Méthode : lecture de `QA-revue1.md`, extraction du texte des 7 pages du dist confronté à `donnees.json` et `dossier.md`, script maison (axe-core complet de `node_modules`, débordement par éléments, console, requêtes, h1, logo, noindex, mention) sur 7 pages x 2 largeurs, captures de hero 1440 et 390 des 7 pages, trois états du dressage, mesure du loader. Les captures d'agent « captures » (3 pages sur 7, 404 brute) n'ont servi que pour les chiffres de LCP.

## Findings

### F0 (bloquant) : aucun
Build OK (7 pages), 0 fait faux dans le corps des pages, 0 invention de chiffre, de récompense, d'avis ou de personne.

### F1 (majeur)
- **F1-1 · T-faux · `<title>` et `og:title` de l'accueil : « L'Essentiel | Menu unique de saison à Temploux ».** Preuve : `dist/l-essentiel/portfolio/index.html`, titre et `og:title` ; `src/layouts/Base.astro:19` (valeur par défaut du gabarit). Le restaurant ne propose pas un « menu unique » : deux assiettes à la carte à 90 € et trois menus (Affaire 50 €, Plaisir 72 €, Balade 90 €), `donnees.json` > `menus`. Correction : « L'Essentiel | Table gastronomique à Temploux » (ou « Une étoile Michelin à Temploux »), sans « menu unique ».
- **F1-2 · axe `aria-prohibited-attr` (serious) sur l'accueil, 1440 et 390.** Preuve : `<p class="phrase__texte" data-split="lines" aria-label="Une cuisine créative et de saison…">` (`src/pages/index.astro:35`) ; SplitText pose `aria-label` sur un `<p>` sans rôle. Correction : option `aria: 'none'` (ou retirer l'`aria-label`) ou garder le texte lisible en DOM avec les lignes `aria-hidden`.

### F2 (mineur)
- **F2-1 · axe `landmark-no-duplicate-contentinfo` (moderate) sur 14 cas sur 14, et `region` sur 13.** Preuve : le pied du site et `kyw-footer` sont deux `contentinfo` de premier niveau ; `region` vise `a.logo-vertical` et `div.pastille` (hors landmarks). Correction : passer le pied du site en `<div>`/`<section aria-label>` (ou déplacer le kyw-footer dans le même `<footer>`) ; mettre la pastille et le logo vertical dans un `<aside>`/`<nav aria-label>` ou dans le header.
- **F2-2 · AI slop : un surtitre en capitales au-dessus de chaque titre.** Preuve : `h1440-menu.png` (« LA CARTE » / « DEUX ASSIETTES »), `h1440-carte.png` (« MENUS » / « DU MIDI AU SOIR »), `h1440-maison.png`, `h1440-chambres.png`, `h1440-reservation.png`, `h390-404html.png` (« ERREUR 404 »), et sur l'accueil « LE DRESSAGE », « LA CARTE », etc. Correction : le retirer sur les pages intérieures (le lien actif de la nav le dit déjà) et ne le garder que là où il apporte une information (« Première assiette », « Deuxième assiette »).
- **F2-3 · hero : l'enseigne est coupée.** Preuve : `h1440-home.png` et `h390-home.png`, on lit « l'essentie » avec le dernier « l » rogné ; image 720 x 900 en `object-fit: cover` (`facade-enseigne.webp`, déjà recadrée en 4:5 à la construction). Correction : recadrer la source 2400 x 1601 pour inclure l'enseigne entière (zone plus à droite), ou décaler le cadre.
- **F2-4 · T-invente : trois phrases de procédure que le dossier ne prouve pas.**
  - « choisissez l'ambiance de votre soirée en réservant » (`src/data/site.ts:157`, page /maison/) : ni le formulaire de démonstration ni le dossier ne permettent de choisir une salle ; à retirer ou à ramener à « plusieurs salles, chacune avec son ambiance ».
  - « Pour un groupe, appelez le restaurant » (`src/data/site.ts:215`, accueil et /reservation/) : le dossier dit seulement « au-delà de six couverts, menu uniquement » ; privatisation et groupes sont « inconnu ». Garder la première phrase seule.
  - « Une table, une ambiance » (`src/pages/index.astro:147`) : titre de remplissage, à remplacer par un fait (« Du mercredi au samedi, midi et soir »).
- **F2-5 · LCP desktop de l'accueil 2592 ms (> 2,5 s).** Preuve : QA-revue1.md (mobile 2224 ms, CPU x4 et 4G, correct). Le hero n'est stable qu'à 4,3 s (loader 2,3 s mesuré, plus la sortie). Correction : raccourcir la sortie du loader ou précharger `facade-enseigne.webp` (`<link rel="preload" as="image" fetchpriority="high">`), puis remesurer en deux passes.

### F3 (finition)
- **F3-1 · slugs inversés.** `/menu/` affiche « La carte » (les deux assiettes) et `/carte/` affiche « Menus » ; les libellés de nav sont justes, les URL trompent. Renommer les dossiers (`menu` <-> `carte`) ou intervertir les contenus, et mettre à jour les liens et le sitemap.
- **F3-2 · chambres : attribution par chambre non prouvée.** /chambres/ : « Ardoise, Chambre double, douche à l'italienne » ; le dossier ne distingue que la suite Tilleul et les terrasses de Rouille et Réglisse, avec « douche à l'italienne » en commun. Ramener Ardoise à « Chambre » (ou « Chambre double » si le tarif le prouve) sans équipement propre.
- **F3-3 · dressage trop discret sur 1440.** `s1440-2000.png` : titre du plat en une ligne fine de 14 px environ, assiette d'environ 230 px, grands blancs ; le geste signature mérite plus de place (assiette à 40 à 50 svh). Au premier état (`s1440-1200.png`) l'assiette est vide : normal au scrub, à garder.
- **F3-4 · chiffres romains I à V devant chaque plat** (accueil et /menu/) : numérotation décorative, les plats d'une assiette ne sont pas ordonnés. Les retirer ou passer à un filet seul.
- **F3-5 · même photo brique et chaises utilisée trois fois** (accueil « La maison », /maison/, bandeau de /carte/). Varier avec `salle-rideaux`, `arche` ou `table-longue`.
- **F3-6 · typographie.** Espace ordinaire avant « : » dans « La carte : deux assiettes, 90 € » (hero accueil) : mettre U+00A0 (retour à la ligne possible avant le deux-points) ; apostrophes droites partout (« L'Essentiel », « n'est ») : passer aux apostrophes typographiques dans les données.

## Contrôles sans écart (pour ne pas les rouvrir)
- Faits conformes à `donnees.json` : adresse (Rue Roger Clément 32, 5020 Temploux), tél. +32 81 56 86 16, info@lessentiel.be, horaires mer-sam 12 h à 14 h et 19 h à 21 h 30, fermé dim-lun-mar, 7 fermetures annuelles, 10 plats et leurs libellés, 90 / 50 / 72 / 90 / 16 / 14 / 25 €, accords 30-35 / 38-45 / 48-58 €, chambres 120 / 150 / 20 / 30 €, G&M 16,5/20 édition 2024 3e de la province (DH 27/11/2023), « plus de 1 000 avis Google » (4,8/5, 1 039 ou 1 052 selon les sources), Facebook et Instagram du dossier, réservation vers lessentiel.be.
- Dressage : les 4 composants hors mignon de biche sont marqués « illustratif » ; chef non nommé ; aucun avis ; étoile Michelin sans année.
- Méta : `lang="fr"`, un `h1` par page, `noindex, nofollow` (conforme au prompt de production), titres et descriptions uniques, OG image présente, JSON-LD `Restaurant` avec adresse, géo et horaires, favicon, 404.html avec `h1`, `<title>` et `lang`. Les WARN de `audit.mjs` (404 sans h1, pas de robots.txt ni sitemap) sont des faux positifs : `robots.txt`, `sitemap-index.xml` et `404.html` existent et répondent 200 sous `/l-essentiel/portfolio/`. Les 8 « phrase répétée 4x » concernent les horaires du pied de page, à ignorer.
- Poids : photos 1,6 Mo au total, aucune image > 300 Ko ; 0 requête en échec.
- Mobile 390 : composition pensée (photo puis texte, barre « Réserver » fixe, nav à 4 liens sans burger), signature conservée, 0 débordement (`scrollWidth` = 390 sur 7 pages).

## Ce qui est bien (à ne pas casser à la révision)
1. Le geste unique du dressage et de l'anneau laiton, avec les composants honnêtement marqués « illustratif », et le texte des pages qui parle de CE restaurant (gibier, tannerie, plats nommés), sans filler ni avis inventés.
2. Les pages intérieures épurées (grand titre fin, filets, photo en bandeau) et la page /reservation/ : formulaire clair, statuts, fermetures annuelles lisibles, mention de démonstration explicite.
3. La rigueur des données : prix, horaires, fermetures et libellés de plats identiques au dossier ; tarifs des chambres signalés « à confirmer ».

## Pièges pour la révision
- `window.scrollTo(0, 0)` ne remonte pas (Lenis) : photographier le haut de page sans défiler d'abord.
- Après correction de F2-1, relancer axe complet (hors shoot) sur les 7 pages : `region` et `contentinfo` n'apparaissent pas dans `report.json`.
