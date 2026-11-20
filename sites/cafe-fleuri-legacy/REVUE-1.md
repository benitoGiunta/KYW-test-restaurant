# Revue legacy · Café Fleuri · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un site de quatre pages tout en vert forêt, dont le héros est un chiffre géant (21,95 €, le prix du brunch), avec une barre d'appel fixe orientée téléphone, sobre et lisible mais dont un tiers de la hauteur est occupé par des cadres photo vides.

Base de la revue : QA-revue1.md (3 pages, dist du 20/11 01:25, captures postérieures, réutilisées), planche et captures d'accueil, carte et venir, plus un script maison (axe-core complet de node_modules, console, requêtes, contraste canvas sur chaque nœud texte, cibles, débordement, balises) sur accueil, carte, venir et `404.html` réel, à 1440 et 390 px. Serveur propre sur le port 4787 (4761 occupé par un autre agent), arrêté par `kill`. Aucun shoot complet relancé.

Scores /10
- Design 6 : hiérarchie nette et typographie forte (Gabarito 800 + Manrope, `d-01-hero.png`), mais monochrome vert unique et deux demi-écrans vides (hero droite, bande « Photo de la salle à fournir », `d-03-scroll.png`).
- Usabilité 8 : appel à un tap, barre d'appel qui s'efface devant un bouton Appeler, 0 cible < 24 px, 0 débordement 1440 et 390 (scrollWidth = fenêtre), 0 piège clavier.
- Créativité 5 : le chiffre géant et le « Mardi » géant donnent une signature, le reste est un enchaînement de bandes vertes et de trois tuiles égales ; aucune image, aucun détail propre à un café-brunch.
- Contenu 6 : texte court, sourcé, vouvoiement sans objet, 0 tiret cadratin ; mais statut du lieu ignoré, plusieurs affirmations plus fortes que le dossier (F1-1, F2-2, F2-3).
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, LCP 0,4 s bureau et 0,7 s mobile, CLS 0 à 0,001, HTML 3 pages de 8 Ko, lang fr, un seul h1, noindex, mention et un seul logo KYW sur chaque page, 404 réelle conforme ; pénalisé par axe (F2-1) et l'absence d'image OG.

## Findings

### F0 bloquant
Aucun. Build OK (dist présent, QA exit 0), 0 fait faux établi, 0 débordement, 0 violation axe critique ou serious.

### F1 majeurs
- **F1-1 · T-statut · site entier (`src/data/site.ts`, Nav, Footer, barre d'appel).** Le dossier (`dossier.md` § Statut, `donnees.json` champ `statut`) dit « probablement fermé définitivement (à confirmer) » : Wanderlog et Restaurant Guru « permanently closed », local repris par Bistro Camélia en mars 2025 (DH, 07/01/2025). Le site se présente comme ouvert, avec « Tous les jours 9 h à 16 h » et 17 liens `tel:` (nav, héros, cartes, barre fixe, pied). Seule la mention « Maquette KYW » couvre l'incertitude. Correction attendue : l'orchestrateur arbitre ; tant que le statut n'est pas confirmé, ajouter une ligne visible et honnête (« Statut de l'établissement à confirmer ») au bloc Venir et à la page Venir, et le consigner dans RAPPORT.md.
- **F1-2 · Design · accueil `index.astro:34-36` (bande `fig--band`), `index.astro:67` et `carte.astro:46` (`fig--tall`), `venir.astro:35`.** Quatre cadres photo vides en dégradé vert avec « Photo de la salle à fournir » ou « Photo à fournir » : bande de 560 px de haut sur 1440 (`d-03-scroll.png`), 3 sur la seule accueil, plus la moitié droite du héros vide (`d-01-hero.png`). La page lit comme inachevée. Correction attendue : retirer les cadres vides hors un seul, ou les remplacer par une composition typographique (par exemple la liste des trois brunchs sur la bande), et occuper la droite du héros (le prix et le titre sur deux colonnes à 1440).

### F2 mineurs
- **F2-1 · Accessibilité · toutes les pages.** axe complet : `landmark-no-duplicate-contentinfo` (moderate) sur les 4 pages à 1440 et 390 px, deux `<footer>` de premier niveau (`Footer.astro:5` et `@kyw/footer`). Absent du QA. Correction : passer le pied du site en `<div class="colophon">` avec `role="group"`, ou le placer hors `contentinfo` (sans toucher au paquet kyw-footer).
- **F2-2 · T-surdit · `index.astro:42` « Gravlax, granola et limonades, tout est fait maison. »** Le dossier prouve maison : gravlax, granola, limonades, thé glacé (valeurs : « fait maison »), pas « tout ». Même glissement dans la méta-description d'accueil (« gravlax, pancakes, limonades et thé glacé maison » lit comme des pancakes maison) et le lead du héros (« Gravlax, pancakes et limonade maison »). Correction : « Gravlax, granola et limonades maison. »
- **F2-3 · T-invente léger · `site.ts` `aussi` (carte.astro:25, « Pancakes au saumon gravlax », « Plateau charcuterie et fromage »).** Ces deux plats viennent de Flexiroom (ancien, lié à la carte du soir d'un autre exploitant, « ancien Café Bandit ») et sont listés sans « à confirmer » alors que les prix le sont. Correction : note « plats relevés sur une ancienne fiche, à confirmer » ou retrait.
- **F2-4 · T-prix en vedette · `index.astro:14`.** Le prix 21,95 € (Petit Futé, « ancien, à confirmer ») est la première chose vue, en 200 px de haut, avec pour seule réserve « prix indicatif » en petit sous le chiffre ; la carte dit « illustratifs, à confirmer ». Correction : aligner la légende du héros (« Prix d'un ancien guide, illustratif ») ou ne pas en faire le héros.
- **F2-5 · Téléphone · `index.astro:67` (carte « À table »), `venir.astro:27`.** Deux numéros dans les sources (081 65 89 15 retenu, +32 492 93 87 96 écarté), `placeholder: true` dans `site.ts`, mais « Téléphone 081 65 89 15 » est écrit sans « illustratif » dans la carte d'accueil et sur la page Venir (seul le pied le précise). Correction : « (illustratif) » partout, ou une note sous le numéro de Venir.
- **F2-6 · SEO · 4 pages.** Pas d'`og:image` (WARN audit confirmé par `grep og:` : title, description, type, locale seulement) ; JSON-LD `CafeOrCoffeeShop` sans horaires (le prompt § C attend adresse et horaires) et `telephone` en dur sans marque illustrative (`Base.astro:13`). Correction : og.png 1200 x 630 typographique ; `openingHoursSpecification` 9 h à 16 h tous les jours, ou omission assumée dans RAPPORT.md.

### F3 finition
- **F3-1 · Nav fixe `nav-wrap` à 12 px du bord haut** : le contenu défile dans la bande de 12 px au-dessus de la barre (« grillé, salade » `d-03-scroll.png` ; bouton orange `d-05-scroll.png`). Correction : fond plein sur `.nav-wrap` ou `top: 0` avec padding.
- **F3-2 · `404.html`** : le pied se termine à 560 px sur 900, le reste de la fenêtre est un fond vert vide (capture 1440). Correction : `min-height: 100dvh` en flex colonne sur `body`.
- **F3-3 · Répétition** : adresse écrite 4 fois sur l'accueil (barre, Venir, « À table », pied) ; « Le mardi, une boisson… » reprend « Mardi » juste au-dessus ; « Appeler » dans la nav, le héros, la barre et la carte. Retirer la ligne adresse/téléphone de la carte « À table ».
- **F3-4 · Slop léger** : trois tuiles égales « Trois brunchs » (`d-02-scroll.png`) et palette monochrome ; acceptable en legacy, à varier si la place se libère (F1-2).
- **F3-5 · Polices** : Google Fonts externes (2 familles) et 3 TTF par page signalés par l'audit (286 Ko) ; LCP et CLS restent bons, pas de correction obligatoire.

## Vérifications sans écart
- Faits : nom, adresse (rue des Fossés Fleuris 38, 5000 Namur), 2020, Bistro Bisou, brunchs salé/sucré/mixte, mardi étudiants, prix 21,95 et 11,95, limonade framboise, thé glacé pêche : tous dans le dossier. Aucun avis, note Google, équipe, e-mail, réseau ou réservation inventé (`email: null`, `reseaux: []`).
- Horaires : un seul créneau, marqué « illustratif » et expliqué (sources contradictoires).
- Liens : 4 internes distincts (`/cafe-fleuri/legacy/`, `carte/`, `venir/`, `favicon.svg`) tous sous le préfixe, existent dans `dist/` ; 17 `tel:` identiques ; OSM ; 0 lien mort.
- Mention « Maquette KYW, certaines données sont illustratives », un logo `kyw-footer__logo`, `noindex` : présents sur accueil, carte, venir et 404. Faux positifs écartés : `skipLinkFirst: false`, absence de robots.txt (WARN audit).
- Contraste : canvas 1x1 sur 17 à 41 nœuds texte par page et par largeur, 0 sous le seuil ; les 4 « à vérifier » d'axe sont du texte sur dégradé de cadres photo (légende lisible sur `d-03-scroll.png`).

## Ce qui est bien (à ne pas casser)
1. Le chiffre géant du héros et le « Mardi » géant : une signature typographique nette, lisible à 390 px comme à 1440 px.
2. La barre d'appel mobile qui s'efface devant un bouton Appeler et la cible de 44 px partout : usage téléphone soigné.
3. L'honnêteté du contenu : prix et horaires marqués, rien d'inventé, 0 console, performance excellente.
