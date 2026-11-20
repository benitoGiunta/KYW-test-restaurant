# Revue awwwards · Les Terrasses de Crupet · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : des hublots ronds, comme les trois miroirs de la salle, qui s'ouvrent sur les photos au défilement, sur un vert profond et un cuivre, en Young Serif très grande ; brasserie de village, carte lisible, réservation en deux gestes.

Fraîcheur des preuves : `dist/` (04:15) postérieur à `src/` (aucun fichier plus récent) ; captures du QA (04:15 à 04:23) postérieures au `dist/` donc réutilisées. Le QA ne couvre que 3 pages sur 5 et sa « 404 » est la réponse brute de `serve.mjs` : son axe « color-contrast » sur la 404 (`.kyw-footer__note`, 4,36:1) ne se reproduit pas sur le vrai `404.html` (axe complet, 1440 et 390 px, après défilement). Ses WARN robots/sitemap sont sans objet sous `base` (`sitemap-index.xml` et `sitemap-0.xml` présents). Mesures propres à cette revue : script maison (axe-core de `node_modules`, console, requêtes, débordement, liens, cibles) sur 5 pages x 2 largeurs (1440, 390), planches PIL, captures de titres, menu mobile, reduced-motion, Tab ; serveur propre port 4780 (PID 28269, arrêté).

Scores /10
- Design 8 : cohérence forte (hublots, vert/cuivre, serif géant), mobile pensé (carrousel, menu plein écran, onglets collants) ; retirent des points l'accent coupé du titre « À la carte » et des vignettes de carte sans rapport avec la catégorie.
- Usabilité 7 : réservation et téléphone partout, menu mobile correct (`aria-expanded` vrai puis faux après Échap, 1er Tab = « Aller au contenu ») ; mais lien d'en-tête sans nom à 390 px et carrousel non atteignable au clavier (axe serious).
- Créativité 8 : le motif « miroir rond » est tenu partout (hero, rangées, 404 avec « 404 » dans un hublot, transition iris) ; pas de WebGL, assumé.
- Contenu 7 : prix et noms de la carte exacts (43 lignes, 0 écart) ; mais deux procédures non prouvées (réservation par e-mail, parking par téléphone) et du vocabulaire de maquette visible (« site du client »).
- Technique 7 : 0 erreur console, 0 requête en échec, 0 débordement, 0 lien mort, LCP mobile 1952 ms, CLS ≤ 0,001 (QA) ; 2 violations axe serious à 390 px et 1 moderate sur toutes les pages.

## Findings

### F1 majeur
- **F1-1 · `link-name` (serious) sur le lien d'en-tête à 390 px, 5 pages sur 5.** `.brand__name { display: none }` sous 560 px (`src/styles/base.css:37-38`) : il reste le médaillon « T » sans nom accessible. Preuve : axe `link-name:serious:1:.brand` sur home, carte, a-propos, reservation, 404 à 390 px (rien à 1440). Correction : `aria-label="Les Terrasses de Crupet, accueil"` sur le lien (sans virgule si le nom visible doit correspondre : préférer un `<span class="sr-only">Les Terrasses de Crupet</span>` à la place du `display: none`).
- **F1-2 · `scrollable-region-focusable` (serious) sur le carrousel de l'accueil à 390 px.** `.trois__row` passe en `display: flex; overflow-x: auto` (`src/pages/index.astro:115`), ses éléments ne contiennent aucun lien ni bouton : un utilisateur clavier ne peut pas le faire défiler, et « La salle » / « Le bar » sont coupés au bord (m-02, m-03 de la home). Correction : `tabindex="0"`, `role="region"` et `aria-label="Terrasse, salle, bar"` sur la `ul` (ou rangée en colonne empilée sous 560 px).

### F2 mineur
- **F2-1 · Accent de « À la carte » coupé (accueil).** `index.astro:64` : `<h2 data-split="lines">À la carte</h2>` ; le masque de ligne du SplitText rogne le grave, le titre se lit « A la carte » (desktop et mobile). Preuve : `rs1/acc-1440-home-0.png` et `acc-390-home-0.png` (accent réduit à un point ; « À partager » de la carte, non scindé, est correct). Correction : marge haute sur le masque (`padding-top: 0.15em; margin-top: -0.15em` sur la ligne) ou retirer `data-split` de ce titre ; relire tous les `h2` à capitale accentuée.
- **F2-2 · `landmark-no-duplicate-contentinfo` (moderate), 10 cas sur 10.** `.site-footer` du site et `kyw-footer` sont deux `<footer>` de premier niveau. Correction : passer `.site-footer` en `<div>` (ou `<section aria-label="Contact">`) ; garder le bandeau du paquet `kyw-footer` tel quel.
- **F2-3 · Procédures non prouvées par le dossier (T-invente).** Le dossier dit « Parking, accès, privatisation, langues : inconnu » et ne connaît que Zenchef et le téléphone comme réservation.
  - `a-propos` : « Pour toute question d'accès ou de stationnement, le plus simple est d'appeler le 083 655 111 » ;
  - `reservation` : « Parking, accès et privatisation : renseignez-vous par téléphone au 083 655 111 » ;
  - `reservation` : bloc « Écrire » avec zone « Votre demande (date, heure, nombre de personnes) » + « Ouvrir mon e-mail », et meta description « …en ligne, au 083 655 111 ou par e-mail » : réserver par e-mail n'est pas dans le dossier.
  Correction : remplacer par la mention neutre « Parking et accès : informations non communiquées » (ou supprimer), retirer « ou par e-mail » de la description, réduire le bloc « Écrire » à l'adresse e-mail du restaurant sans zone de saisie de réservation.
- **F2-4 · Vignettes de la carte sans rapport avec la catégorie** (`src/data/site.ts:43-53`) : Desserts = photo du cocktail orange, Bières = photo de la terrasse, Boissons chaudes = couverture de menu (disque noir). Preuve : `rs-carte-m.png` (m-03, m-04, m-05 de la carte). Correction : ne garder une vignette que si la photo correspond (À partager = tartare, Entrées = fondue, Plats = viande, Enfants = burger, Cocktails = shaker, Vins = service du vin) ; retirer les trois autres.

### F3 finition
- **F3-1 · Vocabulaire de maquette dans le texte public.** Carte : « Carte du restaurant, mise à jour sur le site du client » ; accueil et réservation : « selon le site du restaurant » (x2). Le texte s'adresse au visiteur, pas à l'agence. La mention officielle suffit.
- **F3-2 · Note d'horaires contradictoire avec le titre.** « Deux services, sept jours sur sept » puis « Tous les jours durant les congés scolaires » (accueil et réservation) laisse croire à une ouverture réduite hors congés ; le dossier garde les deux formulations. Correction : une seule phrase (« Ouvert du lundi au dimanche ; tous les jours pendant les congés scolaires, selon le restaurant ») ou retirer la note.
- **F3-3 · Apostrophes droites** dans la carte : 4 occurrences (« l'ail », « d'abbaye » x2…) alors que le reste du site utilise U+2019 ; convertir dans `carte.json`.
- **F3-4 · Espaces avant « € » dans la prose** : « 69 € » (accueil, carte, réservation) avec espace ordinaire (1 / 2 / 1 occurrences hors tarifs de carte) ; U+00A0 attendu.
- **F3-5 · « une cinquantaine de vins » (accueil, meta carte)** alors que le dossier donne « ~45 vins » à un endroit et « cinquantaine » à un autre ; neutraliser (« une large sélection de vins »).
- **F3-6 · Images.** `01-facade-ete` (351 Ko) et `02-facade-vue-drone` (373 Ko) sont dans `dist/` (`_astro/`) mais appelées par aucune page : 724 Ko de poids mort commité ; `og.png` 342 Ko. La photo « chalet » (panneau APRÈS-SKI, rideaux rouges) illustre « Menus de fêtes à emporter » sans lien ; le recadrage rond de la photo 11 en hero montre 2 des 3 miroirs annoncés par « Trois miroirs » (la photo 06, de l'a-propos, en montre 3).
- **F3-7 · Survol sans effet** (QA, `noHoverChange`) : « La carte » de la nav sur la page carte (lien courant, acceptable), « la page d'accueil » et « Réalisé par » sur la 404. Ajouter un état de survol (soulignement) au lien de la 404.
- **F3-8 · Réservation à 1440 px** : bande vide d'environ 200 px entre le héros et « Horaires » (rv-1440-0) ; l'horaire est répété 7 fois à l'identique (lundi à dimanche) alors que le titre de l'accueil dit déjà « sept jours sur sept » ; une ligne « Lundi au dimanche : 12 h à 14 h, 18 h à 22 h » suffirait.

## Ce qui est bien (à ne pas casser à la révision)
1. Fidélité aux faits : 43 lignes de carte et leurs prix confrontés à `carte.txt` (0 écart), adresse, téléphone, e-mail, Zenchef, Facebook, Instagram, horaires et menus de fêtes conformes à `donnees.json` ; aucune histoire, équipe ni avis inventés ; JSON-LD `Restaurant` avec adresse et horaires sur les 5 pages.
2. Le motif des hublots et la palette vert/cuivre/pierre sont tenus du hero à la 404, avec un mobile recomposé (carrousel, onglets collants de la carte, menu plein écran avec `aria-expanded` et Échap) ; reduced-motion : 0 texte à opacité < 0,5.
3. Hygiène : `noindex, nofollow`, `lang="fr"`, un seul `h1`, title/description/canonical/OG uniques par page, un seul logo KYW, mention « Maquette KYW, certaines données sont illustratives » sur chaque page, 0 lien mort (liens internes confrontés aux fichiers de `dist/`), 0 débordement horizontal à 1440 et 390 px.

## Décompte
F0 : 0 · F1 : 2 · F2 : 4 · F3 : 8.
