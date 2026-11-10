# Revue portfolio · Le Grill des amiS · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un grill de nuit où le fond chauffe en rouge-brun au fil du défilement (thermomètre de 900 °C à 20 °C) et où le plat signature se dresse couche par couche ; ton sobre, vouvoiement, carte complète et honnête.

Hypothèses : captures QA-revue1 (accueil, carte, 404 brute) réutilisées, dist (02:17) postérieur à src ; histoire, traiteur, réservation et 404.html mesurés par script maison (serveur propre port 4761, PID 13104, arrêté). Serveur : kill PID noté, vérifié (000).

Scores /10
- Design 7 : hero photo + titre Melodrama fort, rythme chaud/clair cohérent (planche home d-01, d-07) ; mais la scène signature (plat) est floue et mal découpée (F1-1).
- Usabilité 7 : navigation courte sans burger (3 liens tiennent à 390 px), barre Réserver/Appeler fixe, filtres de carte, pastille ouvert/fermé juste (mardi 10/11 : « prochain service jeudi dès 12 h » correct) ; contraste des numéros insuffisant (F1-2).
- Créativité 7 : le thermomètre piloté par le défilement est une vraie idée de site ; l'exécution du plat (photos détourées) la tire vers le bas.
- Contenu 8 : 68 postes de carte confrontés à `donnees.json`, 0 écart de prix (11 noms reformulés, prix identiques) ; adresse, téléphone, horaires, devise conformes ; avis marqués « illustratif ». Écarts : quelques détails non prouvés (F2-2, F2-3).
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, 0 lien mort (19 liens), 0 débordement (390 et 1440, `scrollX` 0 après `scrollTo(300,0)`), LCP mobile CPU x4 + 4G 1,26 à 1,28 s sur 2 passes, CLS 0,01, 917 Ko, reduced-motion sans élément à opacité 0, focus visible (outline 2 à 3 px) sur les 8 premiers Tab, `lang="fr"`, un seul `h1` par page, JSON-LD `Restaurant` avec adresse, géo et horaires.

Critères PUBLIABLE : build OK, 0 erreur console, 0 lien mort, 0 fait faux, 0 invention non marquée (non tenu : F2-2), 0 débordement, 0 violation axe critique (aucune « critical », mais 3 « serious »), mention + logo + noindex présents (6 pages sur 6, un seul `.kyw-footer__logo`). Pas de F0.

## Findings

### F1 majeurs
- **F1-1 · Scène signature : l'assiette n'est pas une assiette.** `public/couches/fond.webp` (couche « L'assiette », `site.ts:177`) est un rectangle beige flou, strié en diagonale, au contour en polygone irrégulier, aux bords dorés qui évoquent un plateau de bois ou une plaque de fromage. Preuve : `home/d-02-scroll.png`, `home/m-02-scroll.png`, captures ciblées à 1440 px (étapes 1 et 2 de la cuisson : le tiers de l'écran montre une dalle vide, puis l'entrecôte posée sur cette dalle avec la pince qui dépasse). C'est le plat « signature » de la page d'accueil. Correction : refaire la couche fond (assiette ronde propre, ombre portée, netteté à 1x et 2x, sans bande moirée), ou ouvrir la séquence sur l'entrecôte et supprimer la première étape vide ; retirer « 520 °C » sur « Chaude, prête à recevoir » qui n'a pas de sens pour une assiette (texte `site.ts:177`).
- **F1-2 · Contraste des numéros de plats et des repères de température.** axe `color-contrast` serious : `.plat__num` (14 px, #b5703f) sur fond qui s'éclaircit avec la température : 3,57 puis 2,57 puis 1,82 : 1 à 25 %, 50 % et 75 % du défilement de la carte ; 68 noeuds sur `/carte/`, 7 sur l'accueil ; `.num` du thermomètre 2,54 : 1 (`li[data-deg="180"]`) ; `.det` 4,49 : 1 à 75 % de l'accueil (limite). Mesure : script axe-core de node_modules, 4 positions de défilement à 1440 px. Correction : couleur claire (≥ 4,5 : 1 sur le fond le plus clair atteint, #7b4f36 à #794d35) pour `.plat__num`, `.num` et `.det`, ou fond de ces éléments stabilisé.

### F2 mineurs
- **F2-1 · `aria-prohibited-attr` (serious)** sur `.manifeste__txt` de l'accueil (1440 et 390 px) : SplitText pose un `aria-label` sur un `<p>`. Correction : option `aria` de SplitText (`aria: 'hidden'` ou `'none'`) et `aria-label` sur un élément autorisé. Les `.w[aria-hidden]` à 2,61 : 1 vus au chargement sont des mots avant révélation, non retenus.
- **F2-2 · Procédure non prouvée, non marquée.** `src/pages/reservation.astro:12` : « En ligne, ou par téléphone pour un groupe et les demandes de dernière minute » : le dossier ne donne aucune règle de ce type (leçon commune : une procédure « par téléphone » est une invention). `site.ts:187` : « prêtes à passer au feu » (détail de livraison absent du dossier : seul « barbecues livrés chez le client », « clé en main » est prouvé). Correction : « Réservation en ligne ou au +32 81 61 72 60. » ; « les grillades sont livrées chez vous » sans le complément.
- **F2-3 · Notes de chantier visibles en production.** `histoire.astro:53` + `site.ts:141` : « La maison d'Elise et Gaëtan (rôle à préciser) » et « son rôle exact reste à préciser » sur la page La maison ; légende « Elise et Gaëtan (identité à confirmer) » sur l'accueil et La maison (`site.ts:163`). Honnêtes, mais lus comme un brouillon. Correction : carte d'Elise réduite à son prénom et à la devise (« signataire de la devise ») sans mention de doute, et légende neutre « Le restaurant, Namur » avec le doute porté par le seul champ de données.
- **F2-4 · Alt faux.** `site.ts:163` : « devant le restaurant » ; `photos/index.json` (champ `sujet` de la photo 15) : « devant le mur d'ardoise de la salle ». Correction : « Deux personnes en tablier devant le mur d'ardoise de la salle ».
- **F2-5 · Landmarks.** axe `landmark-no-duplicate-contentinfo` sur les 12 cas (pied du site et `kyw-footer`, deux `<footer>` de premier niveau) et `region` (`.thermo`, `.barre` hors landmark) sur 12 cas. Correction : pied du site en `<div class="footer" role="presentation">` ou `<section aria-label>` (le contentinfo reste celui de `kyw-footer`), et `role="complementary"`/`aria-label` sur `.thermo` et `.barre`.
- **F2-6 · Hero mobile.** `home/m-01-hero.png` : l'eyebrow corail « Viandes maturées et grillades au feu de bois, Namur » passe sur deux lignes, posée sur la partie claire de la viande, difficile à lire. Correction : le raccourcir (« Viandes maturées, feu de bois, Namur ») et l'abaisser sous la zone claire ou lui donner un fond sombre.
- **F2-7 · Répétition du texte.** « grosses pièces achetées brutes, découpées et maturées sur place » revient dans le chapeau du hero, le manifeste, le hero et le corps de La maison ; « cuites au feu de bois » ouvre aussi l'intro de la section Dressage (« Cuites au feu de bois. Carte du 14 octobre 2026. Une sélection ; le Menu… » : ponctuation bancale) juste sous le titre « Au feu de bois ». Correction : garder la phrase au manifeste, varier ailleurs (le chiffre de deux chambres, le nom des morceaux), réécrire l'intro en deux phrases.
- **F2-8 · Eyebrow + filet sur presque chaque titre** (Cuisson, Dressage, Les mains, Table, Nuit, Manifeste, chapeau de chaque page ; `home/d-02`, `d-05`, `d-06`) et chiffres 01 à 04 décoratifs devant les étapes et les plats : signature d'un gabarit généré. Correction : supprimer les eyebrows de Dressage et Table (le titre suffit) et les numéros de plats de la carte (ils portent aussi F1-2).

### F3 finitions
- **F3-1 · Apostrophes droites** dans `carte.astro:13` (h1 « l'entrée »), `404.astro:5` et `:10` (« n'existe »), `histoire.astro:12` (`<title>` « d'Elise ») ; le reste du site utilise « ’ ». Remplacer par U+2019.
- **F3-2 · Cible de 18 px** : lien de marque de l'en-tête (116 × 18 px) à 390 px, sur les 6 pages (`shoot` et mesure maison) ; WCAG 2.5.8 attend 24 px. Correction : `min-height: 24px` ou padding vertical.
- **F3-3 · Libellé** : « Suivre la soirée » pointe sur `#cuisson` (`index.astro:38`) : « Voir la cuisson » dit ce qui se passe.
- **F3-4 · Doublon** : table complète des horaires deux fois sur l'accueil (section Nuit et pied de page, 8 occurrences au total selon `audit.mjs`) ; garder la section et réduire le pied de page à « Ouvert jeudi à samedi et lundi ».

Faux positifs écartés : `skipLinkFirst` (premier arrêt « Aller au contenu »), 404 « sans h1/title/lang » de QA (réponse brute de serve.mjs ; `404.html` a titre, `lang="fr"`, `h1`, `noindex`), WARN robots/sitemap (présents dans dist), « Le feu de bois, ça se sent » répété (clone du bandeau d'avis), débordements à droite du bandeau d'avis défilant.

## Ce qui est bien (à ne pas casser)
1. Hero : photo de braise, titre posé, pastille ouvert/fermé calculée à l'heure de Bruxelles, deux CTA clairs ; la barre Réserver/Appeler mobile fixe.
2. Carte : 68 postes fidèles à `donnees.json`, filtre avec région `aria-live`, lisible à 390 px (`carte/m-02` à `m-05`), menus Viandard, lunch et steak du midi sans écart.
3. Honnêteté des données : avis marqués « illustratif », e-mail absent de la page, horaires du mardi, mercredi et dimanche « à confirmer », reduced-motion et performance propres.

## Mesures (pour la révision)
Console : 0 sur 12 cas. Axe 1440/390 : serious = `color-contrast` (carte, accueil), `aria-prohibited-attr` (accueil) ; moderate = `landmark-no-duplicate-contentinfo`, `region`. Aucun critical.
