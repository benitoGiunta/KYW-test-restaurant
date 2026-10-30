# Revue gabarit « comptoir » · Les Potes au Feu · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un passe blanc et silencieux où l'assiette est le seul sujet (thin 200 contre 400, filets, assiette détourée collée au bord), avec un geste unique : le dressage du boeuf confit composant par composant au défilement.

Méthode : captures du constructeur réutilisées (index2, carte2, histoire2 post-correctifs ; menu, reservation, 404 refaites dans `.shots-comptoir-revue/` car antérieures à la correction de contraste), planches lues, Playwright 390 et 1440 px sur les 6 pages (h1, éléments cachés après défilement complet, console, requêtes, scrollWidth), grep du dist. Auto-score (pas de sous-agent aveugle disponible).

Scores /10 (pondéré 0,4/0,3/0,2/0,1 = 7,3)
- Design 7,5 : système typographique net (200/400, capitales espacées, Sentient italique pour les liens), palette blanc/gris/noir, assiettes rouge et bleue comme seules couleurs (planche-index, planche-carte) ; il manque une composition « inévitable » : la page menu desktop est une colonne étroite sur trois quarts de blanc (planche-menu d-01).
- Usabilité 7 : orientation immédiate, focus visibles, 0 axe sérieux sur les 6 pages, reduced-motion complet ; mais en-tête mobile sur deux lignes décalées (m-01-hero de chaque page), LCP mobile 2,65 s sur histoire, 4,9 à 5,4 s de boot JS mobile.
- Créativité 7,5 : le dressage est une idée propre au sujet, portée par le logo vertical, les médaillons et la liste accessible ; le reste du site (splits 50/50, quinconce) reste un gabarit éditorial connu et rien ne bouge au repos (`idleMotion: false`).
- Contenu 6,5 : sobre et spécifique (plats réels, histoire des chefs), mais contradiction 4/6 services, deux dates relatives, deux faux avis nommés et un e-mail inventé, même marqués.
- Technique 7,5 : 0 erreur console, 0 requête en échec, 0 débordement (scrollWidth 390/390 et 1440/1440), h1 > 0 px et visible partout, CLS 0, 60 fps, JSON-LD Restaurant avec horaires, OG et favicon présents, noindex et mention présents sur les 6 pages ; pénalisé par le LCP mobile et le loader.

## Vérifications demandées
- Hero vu (390 px, mesuré) : h1 index 358×37 px à top 544 (dans les 844 px), menu 71 px, carte 37, histoire 71, réservation 37, 404 68 ; visibility visible, opacité 1. Desktop 1440 : 146/76/76/76/76/141 px. OK.
- Rien d'animé caché après défilement complet : 0 élément `visibility: hidden` ou opacité < 0,05 dans `main` et `footer`, 12 vues (6 pages × 2 tailles). `reduced.hiddenText` 0 partout. OK.
- Liens internes du dist : 0 lien mort. Pas de tiret cadratin dans les 6 pages.

## Findings (par gravité)
Aucun F0.

### F1 majeurs
- **F1-1 Nombre de services contradictoire (T-faux).** `src/data/site.ts:~142` `menus[0].nom` « Menu dégustation unique, 4 services » (carte, JSON-LD, description) alors que `index.astro:~58`, `menu.astro` (h1 lead, description) calculent `services.length` = 6 (« 6 services, 67 € », « Menu dégustation unique, 6 services »). Le dossier dit « 4 services » avec 6 lignes (mises en bouche et mignardise comprises). Preuve : planche-menu d-01 (« 6 services ») contre planche-carte m-02 (« 4 services »). Correction : écrire « 4 services » partout (constante `site.menus[0].services = 4`, ne plus utiliser `length`) et ne pas numéroter I à VI comme six services, ou numéroter les 4 services et placer mises en bouche et mignardise hors numérotation.
- **F1-2 « Rien de daté » violé.** `site.ts` `histoire[0]` « Il y a quatorze ans » (visible histoire, passe-texte ; vrai à la date de la fiche seulement) ; `distinctions[0].source` « fiche consultée le 28/10/2026 » (visible dans la bande de l'accueil, planche-index m-05 et d-06) ; « Début de l'hiver 2019 » est un fait et reste. Correction : « En 2006 » n'est pas dans le dossier, donc écrire « Dès leurs premières années de cuisine, … » ou « Il y a des années » ; source de la distinction réduite à « Guide MICHELIN Belgique 2026 » (le millésime est le nom de la sélection, pas une date de lecture).
- **F1-3 « Une donnée, un drapeau » : faux avis nommés et e-mail inventé, valeurs plausibles.** `site.ts` avis 2 et 3 (« Claire D. », « Thomas V. », source « Avis Google », note 5) : le dossier n'en contient aucun (`manques`). Le drapeau « avis illustratif » est en 12 px italique gris à côté d'une citation en grand corps (planche-histoire m-03) : il se lit comme une signature. Même risque pour `bonjour@lespotesaufeu.be` avec lien `mailto:` actif (Footer, 6 pages) : dossier « E-mail : inconnu ». Correction : garder les avis comme éléments de gabarit mais retirer le nom du client et la source « Avis Google » (« Avis client (exemple) »), mention en capitales visible avant la citation ; `mailto:` remplacé par un texte non cliquable ou par le formulaire, ou ligne retirée quand `placeholder` est vrai (le gabarit doit supporter l'absence).

### F2 mineurs
- **F2-1 Détails non prouvés non marqués.** « Fait maison, tous les jours » (index, légende `quinconce__b`) : le restaurant est fermé samedi et dimanche, et le dossier ne dit pas « tous les jours ». « Demande par téléphone ou sur le site du restaurant » pour le bon cadeau (`reservation.astro:~51`) : le dossier dit « demande en ligne, retrait au restaurant », pas par téléphone. « Quatre au service » (titre équipe) compte Sara et Jordan dont le rôle est illustratif. « Salle » comme rôle de Sara et Jordan : drapeau présent, bien.
- **F2-2 Photos des formules midi non liées aux formules.** `carte.astro` : formule 3 services et lunch reçoivent l'assiette de Saint-Jacques et le dessert du menu du soir ; l'assiette-dessert s'affiche en médaillon minuscule (planche-carte d-04, m-03) avec un grand vide. Correction : une seule photo par bloc avec légende « menu du soir » ou aplat sans photo pour le lunch.
- **F2-3 En-tête mobile.** Nav en deux lignes décalées (« LE MENU FORMULES / LES CHEFS RÉSERVER ») et logo sur deux lignes, alignements différents (m-01-hero des 6 pages). Correction : grille 2×2 alignée à gauche ou barre horizontale réduite sous la marque.
- **F2-4 LCP mobile.** histoire 2 650 ms (> 2,5 s ; photo du chef 1200 px), carte 2 484 ms à la limite, loader mobile 4,1 à 5,4 s mesuré (boot JS) ; desktop index 2,9 s sous le loader (plancher du socle, pas de défaut du gabarit). Correction : servir `chef-damien-nb` en 800 px dès le mobile (déjà en srcset : vérifier `sizes`), précharger l'image du hero histoire.
- **F2-5 Mouvement au repos nul.** `idleMotion: false` partout ; choix assumé du cahier mais le site « ne respire » pas hors défilement ; hors dressage, les hovers sont des déplacements de flèche de 4 px et des changements de couleur seuls sur « Boeuf confit » (h-02 index, `react: color`) et la bande Michelin (`borderColor`). Correction : animer le médaillon au survol de la légende (scale 1,04) et le trait de la bande.
- **F2-6 Légendes de galerie = texte alternatif complet** (histoire : « L'équipe riant sur une banquette autour d'une table en chêne »), redondant avec l'alt ; mettre une légende courte et un alt descriptif distinct. Doublon aussi dans l'avis Michelin : « Inspecteur du Guide MICHELIN, Guide MICHELIN Belgique 2026 ».

### F3 finition
- Heures « 19:00 à 21:00 » : écrire « 19 h à 21 h » en français ; « Boeuf » devrait être « Bœuf » (hors chemins de photos et hors intitulé du dossier si on veut la fidélité littérale).
- Champ date en `mm/dd/yyyy` (locale du navigateur de capture) : ajouter `lang="fr"` au champ ou un `placeholder`/aide « jj/mm/aaaa ».
- Lien actif du menu (« Le menu » sur /menu/) : `react: none` au survol (h-03 menu) ; accepter ou donner un état.
- `skipLinkFirst: false` est un faux négatif connu (« Aller au contenu » est bien le premier arrêt) ; `contrastNeedsReview` 12 sur index à contrôler à la main.
- `audit.mjs` : robots.txt et sitemap hors `base`, WARN normaux.

## Ce qui est bien (à ne pas casser)
1. Le dressage : scène épinglée, 5 médaillons, légendes reliées par traits, liste accessible en mobile et en reduced-motion ; composants non prouvés (jus, pousses) marqués « illustratif » sur le plan.
2. La rigueur de base : 0 axe sérieux sur les 6 pages après correction des gris, 0 débordement, h1 toujours visible, noindex + mention + pied KYW présents, JSON-LD Restaurant avec horaires, 404 conçue qui parle du site (« Cette assiette n'est pas au passe »).
3. Les faits d'identité exacts : adresse, téléphone, horaires, prix 67/52/40 €, suppléments +7/+15 €, Zenchef (URL du dossier), Facebook, YouTube, citation Michelin du 04/05/2026 reprise mot pour mot.
