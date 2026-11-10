# Revue awwwards · Le Ponti 2 · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une carte italienne de Jambes traversée comme un pont, filet doré et arches sur fond bordeaux nuit, avec des photos découpées en arche et le « pont levé » du lundi comme fil d'humour.

Scores /10 (relecteur-site, passe 1)
- Design 8 : hero 1440 px d-01 plein écran, serif Boska en grand, photo en arche, filet d'arches or ; palette nuit/bordeaux/or cohérente sur 5 pages, pas de gabarit générique.
- Usabilité 8 : menu mobile ouvert/fermé par Échap OK (7 liens visibles), Tab : « Aller au contenu » en premier, contour 2 px sur 9 arrêts, 0 cible < 24 px, CTA réserver/appeler dans l'en-tête à toutes les largeurs.
- Créativité 7 : le motif du pont structure titres, séparateurs, 404 (« Pont coupé. ») et carte en « rives » ; mais le seul dispositif est le filet d'arches, répété sans variation de page en page.
- Contenu 6 : 99 lignes de carte identiques à donnees.json (0 écart nom, prix, description) ; 0 chiffre inventé ; mais page « La maison » mince (3 paragraphes, source limitée) et deux phrases à corriger (F2-1, F2-2).
- Technique 8 : build 5 pages, 0 erreur console, 0 requête en échec, 84 liens internes 0 mort, 0 débordement (1440 et 390), LCP mobile CPU x4 + 4G lente 1,0 à 2,2 s (2 passes, carte 2232 ms, accueil 1232 ms), CLS 0 à 0,0007 ; seul défaut axe : F2-3.

## Méthode et preuves
- `dist/` postérieur à `src/` (`find -newer` vide) et QA-revue1 postérieur : captures du QA réutilisées. Le QA ne couvrait que accueil, carte et la « 404 » brute de `serve.mjs` (sans lang, title, h1) : les pages a-propos, reservation et le vrai `404.html` ont été mesurées par script maison (axe-core de `node_modules`, console, requêtes, débordement, balises, contraste canvas 1x1 sur chaque nœud texte après défilement, reduced-motion, 5 pages x 1440 et 390 px) et captures de fenêtre (planches `.shots-le-ponti-2-awwwards-revue1/lp2a/`).
- `404.html` : lang fr, title « Page introuvable | Le Ponti 2 », 1 h1, noindex : les 2 violations axe et le « 0 h1 » du QA sont des faux positifs connus (réponse brute du serveur).
- Contraste : 0 nœud sous le seuil sur 10 cas (les 13 et 7 « à vérifier » axe du QA tombent à 0 mesurés). Reduced-motion : 0 texte à opacité < 0,1 sur 4 pages mobiles.
- Noindex, mention « Maquette KYW, certaines données sont illustratives » et logo `.kyw-footer__logo` (1 seul) présents sur les 5 pages. JSON-LD `Restaurant` avec adresse et horaires sur chaque page. OG image 1200x630 (composée avec photo, ouverte et vérifiée). `skipLinkFirst: false` du QA = faux positif (premier arrêt « Aller au contenu »).
- Faits : nom, adresse, 081 30 40 75, Leponti2@hotmail.be, horaires, lien Barestho, Facebook, menu 40 €, prix 14 à 23 € (pizzas), 24 à 30 € (escalopes) tous conformes à `donnees.json` et `dossier.md`. Aucun avis, récompense, année ni nom propre inventé ; alt des photos conformes au champ `sujet` de `photos/index.json`.
- Serveur propre sur le port 4783 (4761 déjà tenu par un autre agent), arrêté par `kill`.

## Findings

### F2 (majeurs à corriger, aucun bloquant)
- **F2-1 · T-invente (léger)** · `src/data/site.ts:60` · « Au comptoir, des cocktails signature, dont le Spritz Ponti. » Le dossier (Matière à site n° 9) dit seulement que la carte propose des cocktails signature ; « au comptoir » (lieu de service) n'y est pas. Correction : « La carte propose des cocktails signature, dont le Spritz Ponti. ». Le titre de groupe « Au comptoir » (`src/data/carte.ts:473`) et « des entrées au comptoir » (`carte.astro:14`) sont un jeu de langage du concept : tolérables, mais à garder cohérents avec la correction (par exemple « jusqu'au dernier verre »).
- **F2-2 · Note méta visible au client** · `src/pages/a-propos.astro:21` · « Photos : Le Ponti 2. Le restaurant est présenté tel que son site actuel le décrit (20 pizzas, 13 pâtes, escalopes de veau). » (capture `d-a-propos-2.png`, `m-a-propos-2.png`) : phrase de justification interne, en petit, qui double le crédit photo déjà au pied de page. Correction : supprimer la phrase (laisser au plus le crédit photo), la limite de la source se note dans RAPPORT.md.
- **F2-3 · Accessibilité** · `src/components/Footer.astro:8` · axe `landmark-no-duplicate-contentinfo` [moderate] sur les 5 pages à 1440 et 390 px (2 `<footer>` de premier niveau : `.pied` et celui de `packages/kyw-footer`). Correction : remplacer `<footer class="pied">` par `<div class="pied">` (ou `<section aria-label="Coordonnées">`) sans toucher au paquet `kyw-footer`.
- **F2-4 · Redondance sur la page Réserver** · `src/pages/reservation.astro:19-37` + bandeau du pied · horaires, adresse et plan sont donnés deux fois sur la même page (colonne « Horaires / Venir » puis bandeau « Adresse / Service / Contact », capture `d-reservation-1.png`, `d-reservation-2.png`), avec le téléphone et l'e-mail trois fois. Correction : sur cette page, retirer « Venir » ou masquer le bandeau d'adresse du pied (garder le CTA), ou n'y laisser que ce qui diffère (terrasse, plan).

### F3 (finitions)
- **F3-1 · Répétition du gag** · « le pont est levé » apparaît 3 fois sur l'accueil (`index.astro:22`, `index.astro:72`, bandeau `Footer.astro:20`) et 2 fois sur Réserver (`reservation.astro:24`, bandeau) : joli une fois, usé à la troisième. Garder au hero et au bandeau, dire « Fermé » simplement dans les tableaux d'horaires.
- **F3-2 · Typographie** · espace ordinaire (U+0020) avant « : » (ex. « des escalopes de veau : trois arches », « faits maison : tiramisu », « traverser : des entrées ») : pas d'espace insécable, risque de retour à la ligne avec les deux-points en début de ligne. Remplacer par U+00A0 dans `index.astro`, `site.ts`, `carte.astro`.
- **F3-3 · JSON-LD** · `Base.astro:23` : `telephone: "081 30 40 75"` sans indicatif ; préférer `+32 81 30 40 75` ; pas de `image`, `priceRange`, `hasMenu` ni `sameAs` (Facebook).
- **F3-4 · Source contradictoire** : le menu trois services annonce « Scampis à l'ail (5 pièces) » (`donnees.json` menus, repris tel quel) alors que la carte dit « 7 pc » : fidèle au client, mais à signaler dans RAPPORT.md comme point à confirmer.
- **F3-5 · Mobile, accueil** : le rail des trois arches défile en `scroll-snap` (scrollWidth 837 pour 390, 3e carte coupée à 548 px) sans indication autre que la carte entamée ; acceptable (région navigable au clavier, axe sans alerte), ajouter un repère de défilement si la place existe.
- **F3-6 · Hero 1440** : le « 2 » seul sur sa ligne, décalé, laisse un vide entre texte et photo (`d-01-hero.png`) ; voulu (« Le Ponti / 2 »), mais le trou central de 300 px pourrait recevoir le menu à 40 €.
- **F3-7 · Page La maison** mince (3 paragraphes, pas d'équipe ni d'histoire : inconnus du dossier, donc correct) : une phrase sur la terrasse et le menu à 40 € pourrait remplir sans inventer.
- Faux positifs du QA, à ne pas corriger : `skipLinkFirst: false`, 404 sans lang/title/h1, « pas de robots.txt » (noindex, `sitemap-index.xml` présent), « survol sans changement » du lien-logo, `idleMotion` oui à l'accueil (voulu).

## Décompte
F0 : 0 · F1 : 0 · F2 : 4 · F3 : 7. Build OK, 0 erreur console, 0 lien mort, 0 fait faux, 0 débordement, 0 violation axe critique ou sérieuse, mention + logo + noindex présents. Bloque « PUBLIABLE » : F2-1 (invention légère) et F2-3 (violation axe moderate).

## Ce qui est bien (à ne pas casser à la révision)
1. La carte : 99 lignes fidèles (nom, prix, description, suffixes « par personne »), en « rives » avec sommaire en arches, lisible à 390 px (`m-carte-1.png`).
2. Le hero et le filet d'arches : composition 1440 et 390 pensée séparément, photo en arche, 0 CLS, LCP accueil 1,2 s sous CPU x4 + 4G.
3. Les états secondaires : 404 « Pont coupé. » designée avec retour accueil et carte, menu plein écran qui se ferme à Échap, focus visible partout, reduced-motion sans texte caché.
