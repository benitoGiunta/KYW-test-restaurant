# Revue legacy · Pizzeria Doria · passe 2
Verdict : A_CORRIGER (0 F0, 0 F1, 3 F2, 5 F3 ; tous les critères PUBLIABLE sont remplis, voir « Critères »)
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une one-page de pizzeria entièrement en vert sapin et pêche, qui ouvre sur la salle des coffres (photo client) à côté du titre « Pizzeria de famille, dans une ancienne banque », puis suggestions du mois, carte en listes à filets et horaires en tuiles de casiers.

Méthode : `src/` et `dist/` ont tous deux la date du 20/11 00:12:27 (checkout), les captures de QA-revue2 (00:09) leur sont antérieures : build refait (exit 0, 5 pages) et mesures propres sur serveur local (port 4751, PID 3697, arrêté). 5 pages (accueil, menu, vins, contact, `404.html` réelle) x 5 largeurs (320, 390, 768, 1024, 1440), après défilement par 300 px : axe-core complet à 2 positions, console, requêtes, `scrollWidth`, éléments hors fenêtre, cibles < 24 px, h1, lang, noindex, mention, nombre de `<footer>` et de logos KYW. Puis : liens internes (11, 0 mort) et ancres du menu, JSON-LD, og, LCP/CLS sous CPU x4 + 4G lente (2 passes, 3 cas), reduced-motion, burger tactile à 390, premier Tab, accueil à 1920 et 2560 px, texte extrait du `dist/` confronté à `donnees.json`, `dossier.md` et `site-actuel/page.html`. Planches vues : accueil 1440 (3 tranches) et 390 (3 colonnes), 4 pages à 1440 et 390, accueil 1920.

Scores /10
- Design 7 : le hero à deux colonnes sur la photo des coffres (`home-1440-top`, titre à 313 px, actions finies à 659 px) règle le défaut de la passe 1 ; reste un aplat vert sur toute la page, sections peu différenciées, hero photo agrandie 1,36 x à 1920 px.
- Usabilité 8 : 25 combinaisons sans débordement ni cible < 24 px, burger tactile à 4 liens de 52 px, premier Tab = « Aller au contenu », reduced-motion sans texte caché, CTA et téléphone toujours visibles.
- Créativité 6 : la signature (casiers) est maintenant en tête et les séries de trois cartes égales ont disparu (avis 1 grand + 2 petits, catégories en liste) ; l'ensemble reste un gabarit de restaurant en aplats.
- Contenu 8 : prix, horaires, adresse, téléphone, e-mail, liens, avis (3 extraits datés et sourcés), histoire (octobre 2017, Rocco et Luigi, mai 2023, Eggusto) tous retrouvés dans le dossier ; 0 tiret cadratin, vouvoiement partout ; restes de ponctuation et un crédit photo inexact (F2-1, F3-1, F3-2).
- Technique 9 : 0 erreur console, 0 requête en échec, 0 violation axe sur 25 cas, LCP mobile 944 et 948 ms (accueil), 792 et 796 ms (menu), CLS 0, JSON-LD valide avec 9 plages horaires conformes à `horaires`.

## Vérification des corrections annoncées par REVISION-1
| id | verdict | preuve |
|---|---|---|
| F1-1 | confirmé | axe 0 sur 25 cas ; aria-label « Doria pizzeria, accueil » |
| F1-2 | confirmé | hero 2 colonnes, plus de photo de stock en hero, avis 1+2, liste à filets (`home-1440-full`, `home-390-full`) ; réserve : photo client de 640 px (F2-2) |
| F2-1 | confirmé | « Un client » rendu, titre « Avis publiés sur Tripadvisor en 2023 », 3 extraits dans `donnees.json` identiques à `site-actuel` |
| F2-2 | confirmé en partie | og:title, description, image, alt, url, locale fr_BE et JSON-LD `Restaurant` (adresse, geo, téléphone, sameAs, horaires) présents ; manquent canonical et twitter:card, og:image à 640 px (F3-3) |
| F2-3 | confirmé | axe : plus de `heading-order` sur /menu/ et /vins/ |
| F2-4 | confirmé | 1 seul `<footer>` par page, axe sans `landmark-no-duplicate-contentinfo` |
| F2-5 | confirmé | texte réécrit, tous les faits retrouvés dans `donnees.json` |
| F2-6 | partiel | légende « Photo d’illustration » sous la pâte, « à remplacer » retiré ; mais la photo de bouchons de /vins/ (stock) n'a pas de légende et le crédit cite 4 photographes pour 2 photos de stock restantes (F2-1) |
| F2-7 | confirmé | « dès 7,50 € » + « De la marinara à la Maradona. » sans prix |
| F2-8 | non reproductible | `sloplint` lancé sur fichier local sans `base` donne des FAIL artefacts (images non chargées, scrollWidth 1648 à 320) ; mesures réelles : 0 débordement à 320, hero à 313 px, plus de « hero à 569 px » |
| F3-1 | partiel | « 50 € » corrigé ; reste 1 « 2,50 € » sans insécable sur /menu/ et /vins/ (F3-1) |
| F3-2 | partiel | horaires corrigés ; restent des espaces simples avant « : » (F3-2) |
| F3-3 | non traité (annoncé) | polices ttf/otf toujours expédiées d'après QA-revue2 (286 Ko) |

## Findings

### F0 (bloquant)
Aucun. Build OK, 0 fait faux, 0 invention (offre d'emploi, avis, TVA, géolocalisation retrouvés dans `donnees.json` ou `site-actuel/page.html`), noindex, mention et logo KYW sur les 5 pages.

### F1 (majeur)
Aucun.

### F2 (mineur)
- **F2-1 Crédit photo inexact et légende manquante.** `src/layouts/Base.astro:66` : « Photographies d’illustration : Unsplash (Benu Marinescu, Hoja Studio, Nadya Spetnitskaya, Pinar Kucuk) » sur les 5 pages, alors que `public/photos/` ne contient plus que 2 photos de stock (pâte, bouchons) ; les photos supprimées (hero, pizza coupée) restent créditées. `src/pages/vins.astro:15` : la photo de bouchons (Unsplash) n'a pas de `figcaption` « Photo d’illustration » (`vins-1440-top.png`). Correction : ne garder que les photographes des 2 photos conservées (à relire dans `public/photos` ou la recherche), ajouter la légende sur /vins/, et ne montrer le crédit que sur les pages qui portent une photo de stock (accueil, vins).
- **F2-2 Photo du hero agrandie.** `coffres-640.webp` (640 px natif, photo client) est affichée à 873 x 832 px à 1920 px (x 1,36) et à 1164 px de large à 2560 px ; à 390 px en écran 3x elle demande 1170 px. Visible : accrochage et flou sur `home-1920.png`. Correction : plafonner la boîte de la photo (`max-width` 700 px, centrée dans la colonne) ou la présenter en cadre sans pleine hauteur au-delà de 1440 px.
- **F2-3 Offre d'emploi incohérente avec les horaires.** Accueil : « Du mardi au dimanche, congé un week-end sur deux » alors que le restaurant est fermé le mardi et le mercredi (tuiles voisines). Le texte vient du client (`site-actuel/page.html` : « Du Mardi au Dimanche … Lundi & dimanche, congé ») qui se contredit aussi ; ne pas trancher : retirer la phrase des jours, ou la marquer « à confirmer ».

### F3 (finition)
- **F3-1** Espace simple avant « € » : « Eggusto : 2,50 € de plus » sur /menu/ (hero) et /vins/ ; à 1440 px le « € » passe seul à la ligne (`menu-1440-top.png`). Mettre U+00A0.
- **F3-2** Espace simple avant « : » (U+0020) sur toutes les pages : « En cuisine : », « Offre d’emploi : », « Photographies d’illustration : », « Autres photos : », « Eggusto : ». Mettre U+00A0.
- **F3-3** SEO : pas de `canonical` ni de `twitter:card` ; `og:image` = `coffres-640.webp` (640 px, minimum recommandé 1200) ; favicon = logo PNG de 34 Ko.
- **F3-4** Libellé « Vendredi · aujourd’hui » qui se coupe en « Vendredi · » / « aujourd’hui » à 390 px (`h390-sheet`, tuile du jour).
- **F3-5** Polices : 3 fichiers ttf/otf (286 Ko d'après QA-revue2) ; le CSS d'accueil charge aussi Gabarito et Manrope depuis Google Fonts : convertir en woff2 locaux.

Faux positifs écartés : « 404 » du QA = réponse brute de `serve.mjs` (`404.html` réelle : h1, title, noindex, pied, 0 axe sur 5 largeurs) ; `skipLinkFirst: false` (premier Tab = « Aller au contenu ») ; `color-contrast` 4,36:1 du QA sur la 404 brute, absent de `404.html` ; FAIL de `sloplint` sur fichier local (voir F2-8).

## Critères PUBLIABLE
Build OK ; 0 erreur console ; 0 lien mort (11 internes) ; 0 fait faux ; 0 invention ; 0 débordement (25 cas + 1920, 2560) ; 0 violation axe ; mention + logo + noindex sur 5 pages. Les 3 F2 sont à corriger avant publication finale, aucun n'est bloquant.

## Ce qui est bien (à ne pas casser)
- Hero 2 colonnes : titre « Pizzeria de famille, dans une ancienne banque. » sur la photo des coffres, boutons visibles dès le premier écran à 1440 comme à 390.
- Horaires en tuiles de casiers avec « aujourd'hui » calculé et jours fermés en contour ; liste à filets des catégories et « dès 7,50 € » sans redite.
- Technique propre : LCP < 1 s sous CPU x4 + 4G, CLS 0, JSON-LD complet, un seul `<footer>`, burger tactile et reduced-motion corrects.
