# Revue legacy · Novobel · passe 1
Verdict : A_CORRIGER

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : entreprise de rénovation namuroise présentée en éditorial calme (photo plein cadre avec carte de titre, fond crème, serif, listes à filets), sobre et crédible, mais anonyme.

Contexte : Novobel n'est pas un restaurant (dossier.md : construction et rénovation, BCE 0726559494) ; la revue juge le site d'entreprise produit, pas une carte. Pas de F0 : build du QA OK (6 pages, `dist/` de 09:51 postérieur à `src/`, captures de 09:53 réutilisées), 0 erreur console, 0 requête en échec, 0 lien mort (105 liens internes testés sur `dist/`), 0 débordement, 0 violation axe, 0 fait faux, 0 invention (les textes viennent tous de `site-actuel/`), mention « Maquette KYW… », logo KYW unique et `noindex` sur les 6 pages. Sloplint non relancé (ETAT : 0 FAIL).

## Scores /10
- Design 6 : hiérarchie propre et lisible (`d-01-hero`, planches home/services/projects), mais la carte du hero masque l'ouvrier et le reste est un gabarit éditorial générique.
- Usabilité 7 : menu popover (ouvert, fermé par Échap), 21 arrêts Tab distincts sur /services, formulaire avec validation et message honnête, cibles ≥ 24 px (sauf 1 sur la 404), 0 débordement à 1440 et 390.
- Créativité 4 : aucun geste propre au métier du chantier ; palette crème, serif, filets, numéros 01–05 : valable pour n'importe quel prestataire.
- Contenu 5 : faits exacts, mais 3 pages creuses, notes de production visibles dans le texte public et textes Wix génériques recopiés.
- Technique 8 : 0 erreur, 0 axe, 0 débordement ; LCP mobile 0,9 à 1,3 s sous CPU x4 + 4G, CLS 0,03 ; manques de méta (canonical, og:image, JSON-LD).

## Findings

### F0
Aucun.

### F1 (majeurs)
- **F1-1 · Notes de production dans le texte public.** Sur les 6 pages, le pied de page affiche « Horaires d'accueil : À compléter avec le client » et « Photographies du site d'origine, probablement de stock, à remplacer par des photos de chantiers Novobel » (`src/components/Footer.astro`). S'y ajoutent : « Aucun article n'a été repris du site d'origine pour cette maquette », « Articles à fournir par le client » (blog), « Le détail de chaque offre n'a pas été repris du site d'origine » (jobs), « Les photographies de ces chantiers ne figurent pas encore dans le dossier : elles viendront du client » (projects). Preuve : texte extrait de `dist/`, planches `d` et `m` de projects/jobs/blog. Correction : la mention « Maquette KYW, certaines données sont illustratives » suffit ; retirer ces phrases d'atelier, supprimer la ligne Horaires (donnée `null`, le composant ne doit rien rendre) et placer ces remarques dans RAPPORT.md.
- **F1-2 · Trois pages sur six sont creuses.** Articles : titre, une phrase et un lien en pointillés, rien d'autre (`d-blog`) ; pourtant la page est dans la navigation principale. Carrière : 6 lignes poste + « Namur, Belgique » + « Écrire à Novobel », aucun détail de poste. Projets : 4 lignes de texte sans une photo de chantier. Correction : sortir Articles de la nav et du pied (ou une vraie page avec le seul contenu disponible), enrichir Carrière avec ce que le dossier prouve (6 intitulés, lieu) en gardant une mise en page dense, et illustrer Projets avec les photos existantes marquées « illustratives » (halle, visite de chantier) ou assumer une page sans photo mais plus courte.

### F2 (mineurs)
- **F2-1 · La carte du hero cache le sujet de la photo.** Carte 640 x 355 px à (64, 390) sur une image 1440 x 736 : l'ouvrier, vu entre l'échelle et la fenêtre de toit, est coupé à la tête et aux jambes (`d-01-hero`). Mobile : carte de 358 x 388 qui recouvre la photo (`m-01-hero`, voulu d'après ETAT). Correction : `object-position` ou cadrage pour laisser l'ouvrier visible à droite de la carte, ou carte plus basse.
- **F2-2 · Texte générique recopié du site Wix.** `src/data/site.ts:32-35` : « Faites de votre projet de rêve une réalité », « Vous êtes propriétaire d'un terrain de construction » (paragraphe Conception, contredit « Spécialisée dans la rénovation de fond en comble » deux lignes plus bas), « service clientèle irréprochable », « Contactez-nous sans plus attendre ». Correction : réécrire en 2 phrases concrètes par étape à partir des seuls faits prouvés (étude, gestion de projet, finitions, planning, réunions avec les architectes).
- **F2-3 · Promesses commerciales du client affichées sans réserve.** « Devis gratuit sous 24 h » (h2 de l'accueil et de /services, tirée d'une phrase du site d'origine « Devis gratuit sous 24h ! »), « prix abordables », « irréprochable », « dépassons ses attentes ». ETAT.md note « à confirmer avec le client », mais rien n'est signalé sur la page. Correction : garder « Devis gratuit » en titre et déplacer le délai de 24 h dans le texte avec marque « illustratif », ou le retirer.
- **F2-4 · Répétition entre pages.** Le paragraphe Livraison (« Novobel respecte les délais de chantier à l'aide d'un planning minutieux… ») est reproduit mot pour mot sur l'accueil (section « Un planning transmis dès le premier jour ») et sur /services (étape Livraison). Les cinq métiers sont aussi redéclarés en intégralité sur l'accueil et sur /services. Correction : une phrase sur l'accueil, le détail seulement sur /services.
- **F2-5 · Méta incomplètes.** Aucune des 6 pages n'a de `link rel=canonical`, d'`og:image` ni de `twitter:card` (le QA ne le signalait que pour 3 pages) ; aucun JSON-LD (prompt § C : adresse et téléphone structurés, ici `HomeAndConstructionBusiness` avec adresse `14, Rue Emile Cuvelier, 5000 Namur`, tél. `+32 488 466 413`, sans horaires puisque inconnus). Correction : ajouter dans `src/layouts/Base.astro`.

### F3 (finitions)
- **F3-1** 404 mobile : lien « Retour à l'accueil » de 138 x 23 px (< 24) à 390 px ; le mesurer sur `404.html` réel (la 404 du QA est la réponse brute de `serve.mjs`).
- **F3-2** Polices : Hanken Grotesk via Google Fonts (`css2?family=Hanken+Grotesk:wght@400`, fichiers TTF, 0 `preload`), un seul poids demandé alors que boutons et navigation paraissent plus fermes ; héberger en woff2 avec `preload` (aucun CLS constaté : 0,03 sur l'accueil, source `poster__card`).
- **F3-3** Alt de `halle` : « ancien entrepôt à convertir » est une supposition (rien ne prouve la conversion) ; neutraliser. H1 /projects « Quatre bâtiments » : Joseph est une maison et une arrière-maison, écrire « Quatre projets, vingt-huit logements » (4 + 14 + 6 + 4 = 28, calcul juste).
- **F3-4** Signes de gabarit : numéros 01 à 05 décoratifs sur l'accueil, /services et /projects, filet au-dessus de chaque h2, fond crème et serif. Pas de gradient ni de glassmorphism. Garder la numérotation seulement là où elle ordonne (étapes), l'ôter des métiers.
- **F3-5** Respiration : bande crème de 91 px sous le hero à 1440 x 900 (image de 736 px + en-tête de 73 px), blanc d'environ 90 px au-dessus du premier projet sur mobile (`pl-m`), grand vide sous le tableau de Carrière sur desktop.
- **F3-6** Le formulaire est honnête (« Rien n'a été envoyé : ce formulaire n'est pas encore relié ») mais le CTA principal de chaque page se termine donc par un échec affiché ; prévoir un état plus explicite (« Maquette : l'envoi sera relié à l'adresse info@novobel.com ») ou rendre le mailto principal.

## Corrections du QA-revue1 (pour le réviseur)
- « 404 : violation `color-contrast` serious » : capture de l'URL inexistante (réponse brute du serveur). `404.html` réel : 0 violation axe à 1440 et 390 px, `lang`, `title`, `h1` présents.
- « Clavier /services : `stuck: true` » : faux positif ; 32 Tab donnent 21 arrêts distincts, du lien d'évitement (« Aller au contenu », premier arrêt) au pied de page.
- « CLS mobile services 0,056 » : non reproduit (0,000 aux deux passes sous CPU x4 + 4G lente) ; LCP 1,2 à 1,3 s.
- Les 6 `color-contrast` « à revoir » d'axe (1440 px) sont les liens de l'en-tête sur fond de dégradé non déterminable ; texte sombre sur bande crème à l'œil, à ne pas corriger.
- Pas de `robots.txt` : sans objet sous `base` avec `noindex` ; `sitemap-index.xml` présent.

## Ce qui est bien (à ne pas casser)
1. Accueil : hero plein cadre avec carte lisible, un seul bouton primaire par écran, « Devis gratuit » en ghost dans l'en-tête.
2. Rigueur des faits : adresse, téléphone, e-mail, 4 projets (4, 14, 6, 4 logements), 6 offres, « 25 ans » volontairement omis (contredit la BCE).
3. Technique propre : menu popover accessible, formulaire validé au blur, reduced-motion sans texte caché (0 élément à l'opacité 0), poids 675 Ko, LCP mobile ≈ 1 s.
