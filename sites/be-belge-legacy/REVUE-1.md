# Revue legacy · Be Belge… et d’ailleurs · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l’idée du site (avant DESIGN.md) : un site éditorial sobre, fond crème, serif et pastille violette, qui montre la maison (jardin, salle de pierre, terrasse) et pose le Menu du Chef (57 € / 72 €), les horaires et le téléphone ; aucune photo de plat.

Méthode : build et captures du QA-revue1 réutilisés (dist 21:10, captures 21:18, postérieurs à src). Le QA ne couvre que 3 pages sur 7 et sa « 404 » est la réponse brute de serve.mjs (leçon commune) : j’ai donc relu le texte servi des 7 pages contre `donnees.json` et `dossier.md`, testé tous les liens, et lancé un script maison (axe-core complet, console, requêtes, débordement, 1440 et 390 px) sur reservation, photos, banquets, carte et sur le vrai `404.html` (captures `.shots-be-belge-legacy-revue1/extra/`). Serveur propre sur le port 4571, arrêté.

Scores /10 :
- Design 7 : hiérarchie calme, nav flottante nette, mobile pensé (hero en pile, horaires en liste) ; le héros bureau est une bande de pelouse (d-01-hero) et l’identité reste prudente.
- Usabilité 8 : « Réserver » toujours visible, téléphone cliquable, menu Popover, formulaire honnête (« Rien n’a été envoyé… ») ; cibles de 21 px de haut sur plusieurs liens.
- Créativité 5 : peu de signature, sections en colonnes sans idée forte, photos en vignettes ; c’est propre mais générique.
- Contenu 8 : 0 fait faux, 0 invention (prix, plats, horaires, 15 à 34 / 20 à 40, Zenchef rid 382492 conformes) ; ponctuation française fautive et date du menu périmée.
- Technique 7 : 0 erreur console, 0 requête en échec, 0 lien mort (tous les liens internes en 200), 0 débordement à 1440 et 390 px, CLS ≤ 0,013, LCP mobile ≤ 1324 ms ; mais pas de JSON-LD et une violation axe modérée.

## Findings
**F1-1 · SEO : JSON-LD `Restaurant` absent, `og:image` absent** (F1). Preuve : `grep -c ld+json dist/be-belge/legacy/**/*.html` = 0 sur les 7 pages ; `og:title` et `twitter:card` présents mais aucun `og:image`. Le prompt § C exige un JSON-LD avec adresse et horaires. Correction : dans `src/layouts/Base`, ajouter un `<script type="application/ld+json">` `Restaurant` (nom, adresse Avenue de Marlagne 203, 5000 Namur, téléphone +32 81 47 00 95, `openingHoursSpecification` d’après `donnees.json` : mer 12:00-13:30 ; jeu et ven 12:00-13:30 et 19:00-20:30 ; sam 19:00-20:30 ; dim 12:00-13:30, geo 50.4517812 / 4.8421921, `servesCuisine`), et une `og:image` (photo salle ou façade, chemin avec le préfixe `/be-belge/legacy/`).

**F2-1 · Typographie : espaces simples avant « ! », « ? », « : », « ; »** (F2). Preuve : HTML servi, espace U+0020 dans « n’y coule pas ! », « Gourmets ! », « petit nid ! », « Vins en accord : 28 € », « demande de banquet ? », « Une question ? » (reservation.astro:12), « Une table pour ce soir ? » (carte), « À table ? » (menu), « walking dinner ? » (banquets), « Photographies : » (pied de page, 6 pages) ; sur mobile le « ? » passe seul à la ligne (home, m-05, « banquet / ? Écrivez-nous »). Correction : U+00A0 (ou `&nbsp;`) dans chaque source (`Contact.astro` lead, `reservation.astro:12`, textes carte/menu/banquets, `Footer.astro`) ; le « ; » de la carte vient des données (« agrumes ; poêlées ») : remplacer par U+00A0 avant « ; » à la copie.

**F2-2 · Menu périmé présenté sans réserve** (F2). Preuve : « Proposé du 13 août au 6 septembre 2026 » rendu tel quel sur l’accueil (onglets 3 et 4 services) et sur /carte/ (« Un choix par service, proposé du 13 août au 6 septembre 2026 ») alors que la date du jour est le 20/11/2026 ; seule /menu/ dit « Dernier menu publié ». Le fait vient du client, il n’est pas faux, mais il se lit comme une offre en cours. Correction : « Dernier menu publié, proposé du 13 août au 6 septembre 2026 » sur l’accueil et sur /carte/ ; remplacer « Une table pour ce soir ? » (carte) par une formule sans promesse du jour (le restaurant est fermé lundi et mardi).

**F2-3 · Axe `landmark-no-duplicate-contentinfo` (modéré) sur les 7 pages et le 404** (F2). Preuve : script maison, 1 nœud par page à 1440 et 390 px : le pied du site et `kyw-footer` sont deux `contentinfo`. Correction : rendre le pied du site non-landmark (`<div>` dans un `<section aria-label="Coordonnées">`) ; ne pas toucher au paquet `kyw-footer`.

**F2-4 · Cibles de clic < 24 px de haut** (F2). Preuve : report.json de l’accueil (8 cibles desktop) : « Voir le menu » 89x21, « Privatiser le restaurant » 163x21, « Toute la carte » 99x21 ; menu : « Itinéraire » 64x21, téléphone 93x21, e-mail 195x21 ; script maison : 4 à 5 cibles par page à 1440 px, 0 à 390 px. Correction : `min-block-size: 24px` (idéalement 44 px) avec `display: inline-block; padding-block` sur les liens-boutons et les liens du pied.

**F2-5 · Héros bureau : bande de pelouse** (F2). Preuve : d-01-hero (1440x900) : photo en bandeau 3,3:1, les trois quarts sont de la pelouse, le bâtiment est coupé en haut ; la même photo est bien cadrée sur mobile (m-01-hero). Correction : cadrage `object-position` vers le haut ou ratio 2,2:1 sur desktop pour montrer la façade éclairée.

**F3-1 · Petits motifs « eyebrow »** (F3) : « Réservation », « Photos », « Erreur 404 » en petite ligne au-dessus du h1 (d-reservation, d-photos) ; les supprimer ou ne les garder que si elles apportent une information.
**F3-2 · Favicon** (F3) : « B » blanc sur fond bleu #2b4a6e (data URI de Base) alors que la marque est crème et violet : reprendre le violet du bouton.
**F3-3 · Polices distantes** (F3) : Fontshare (Sentient) et Google Fonts chargées sans `preload` ni auto-hébergement ; pas de CLS mesuré (≤ 0,013) mais dépendance à deux CDN : auto-héberger.
**F3-4 · Composition** (F3) : accueil, section Banquets : colonne de droite vide sur 300 px (d-03-scroll) ; /photos/ : trou d’environ 120 px entre le h1 et la grille ; /reservation/ : colonne de gauche vide sous les coordonnées (d-reservation).
**F3-5 · Réservation Zenchef** (F3) : dans le bac à sable le widget affiche « The reservation widget is not available » (réseau ou origine, non imputable au site, rid 382492 conforme au site actuel) ; vérifier en ligne et garder le lien « L’ouvrir dans un nouvel onglet » comme repli.
**F3-6 · Hover** (F3) : le rapport signale « pas de changement au survol » sur 2 éléments (accueil) et 5 (menu) ; non identifiés, à contrôler (`h-0N-hover/rest`).

Faux positifs du QA, à ne pas corriger : contraste `.kyw-footer__note` (4,36:1) sur « 404 » = réponse brute du serveur ; le vrai `404.html` a lang, title, h1, nav, 0 violation de contraste. `skipLinkFirst: false` (leçon commune).

## Ce qui est bien
1. Faits exacts : prix 57 € / 72 €, vins 28 € / 35 €, horaires, adresse, téléphone, privatisation 15 à 34 / 20 à 40, Facebook et Zenchef du dossier ; aucune invention, formulaire non relié signalé honnêtement.
2. Mobile 390 px soigné : 0 débordement, menu Popover fonctionnel, horaires du jour (« Aujourd’hui ») en liste lisible.
3. Hygiène technique : 0 erreur console, 0 requête en échec, 0 lien mort, `noindex`, `lang="fr"`, un seul h1 par page, mention KYW + logo uniques, 404 dessiné aux couleurs du site.
