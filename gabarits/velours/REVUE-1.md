# Revue gabarit velours · Les Potes au Feu · passe 1
Verdict : A_CORRIGER (0 F0, 3 F1, 5 F2, 3 F3)
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un rideau de velours vert sapin qui se lève chapitre par chapitre, avec un chiffre monumental cuivre (4, 67, 2, 2020) posé sur le coin d'une photo, en Didone fine et sérif de lecture.
Méthode : captures du constructeur (report.json) postérieures aux sources (index2 et menu2 pour index et menu, les autres pages après base.css), une planche par page (script PIL dédié : 8 desktop + 6 mobile), mini-scripts Playwright à 390 px (h1, chiffres, éléments cachés après défilement complet, console), curl sur 21 URL internes et 2 liens `src`. Auto-score (la skill jury demande un critique aveugle, indisponible ici).

Scores /10 (pondéré 0,4 D + 0,3 U + 0,2 C + 0,1 Co = 7,3)
- Design 7,5 : système typographique et palette tenus sur 7 pages, chiffres sans coupure à 390 px (4, 67, 2, 2020 : `left` 7 à 16 px, `right` 374 px) ; mais le h1 du hero est fin et cuivre sur photo sombre (index2 `d-01-hero`, `m-01-hero`).
- Usabilité 7 : 0 console, 0 débordement (scrollWidth 390), 0 lien mort, h1 unique et visible sur 6 pages, rien de caché après défilement (0 élément `visibility:hidden`) ; nav sur deux lignes en mobile (sticky ≈ 75 px) sans burger, la citation reste à moitié éteinte tant qu'on ne défile pas.
- Créativité 7 : le chiffre monumental prouvé est une idée propre au gabarit, mais la grille texte/photo/chiffre se répète 3 fois sur l'accueil et les pages intérieures sont sobres (carte = liste de prix).
- Contenu 7,5 : faits conformes à `donnees.json` (adresse, téléphone, horaires, 67/52/40 €, +7/+15 €, plats, Zenchef, citation Michelin) ; drapeaux « illustratif » visibles sur rôles, offres de privatisation ; quelques déductions non marquées (F1-2, F2-3).
- Technique 8 : LCP mobile 1,2 à 2,2 s, CLS 0 à 0,026, 0 axe sur index2/menu2, noindex sur 7 pages, mention présente, JSON-LD Restaurant, og.jpg, robots.txt et sitemap, 0 webp > 300 Ko, lang fr, audit 0 FAIL.

## Findings
### F1 (majeurs)
- F1-1 Le hero n'est pas lu. `src/pages/index.astro:26`, `base.css` (.hero__nom). h1 en Didone très fine, cuivre (rgb 196,143,96), 46,8 px en 390 px, posé sur la partie éclairée de la photo ; sur `.shots-velours/index2/m-01-hero.png` « LES POTES AU / FEU » se confond avec les ampoules floues, sur `d-01-hero.png` « POTES AU FEU » traverse les ampoules. Le nom du lieu est la première chose à lire. Correction : épaissir (graisse ≥ 400 ou taille ≥ 3.4rem mobile), assombrir le `hero__scrim` derrière le bloc texte (dégradé bas → haut, ≥ 4,5:1 mesuré), ou passer le h1 en crème.
- F1-2 « une donnée, un drapeau » : le chiffre monumental « 2020 / ouverture » (`site.ts` `chiffres.ouverture`, `index.astro:107`, texte « la maison ouvre en 2020 » dans `histoire[2]`) n'est pas prouvé comme date d'ouverture. Le dossier dit « Date exacte d'ouverture : inconnue », 2020 est déduit de la création de la société DAMFRA (BCE 14/01/2020) ; `preuve` le cache sous « BCE 14/01/2020 » et `placeholder: false`. Correction : libeller « société créée en 2020 » ou « les clés en 2020 » sans le mot ouverture, ou ajouter un drapeau `datePlaceholder` avec marque visible ; adapter `histoire[2]`.
- F1-3 Pied de page : le mot « KYW » de la signature est invisible (vert foncé sur vert sapin) ; seuls le « K » et « Website » se lisent (`foot.png`, `Réalisé par [K] … Website`). Le logo n'est donc pas lisible alors que la règle impose un logo discret mais présent. Correction : variante claire du logo dans `packages/kyw-footer` pour fond sombre, ou fond clair derrière.

### F2
- F2-1 `privatisation.astro` : « 01 / 02 / 03 » en `.chiffre` sur les trois offres sont des numéros décoratifs, alors que le gabarit réserve le chiffre monumental à une donnée prouvée ; ils comptent comme slop (`d-02..d-06`, `m-02..m-04`). Les retirer ou les remplacer par rien.
- F2-2 Citation Michelin (index, `m-03` de la planche et `c2`) : la citation est à moitié éteinte (opacité scrubée) tant que la section n'est pas au centre ; « qui swingue sur tous les plans… » reste ≈ 2:1 en mobile. Rendre le texte plein dès l'entrée dans le viewport.
- F2-3 Déductions non marquées : « le midi, mercredi et vendredi » pour la formule 52 € et le lunch 40 € (`site.ts` menus ; le dossier dit seulement « le midi », jours déduits des horaires), « fermé au public ce jour-là : la salle, la cuisine et les deux chefs sont à vous » (`privatisation`) et « Chaque prix est celui de la carte du restaurant » (`carte`). Reformuler en « le midi » seul ou poser un drapeau.
- F2-4 « rien de daté » : « Sélection Belgique 2026 » (distinctions) et « Guide MICHELIN Belgique 2026 » (citation) figurent en dur ; chiffres cités du dossier, mais le gabarit vieillira à la prochaine édition. Les sortir des composants (donnée `distinctions`/`citation.source` marquée « à mettre à jour ») ; ajouter la date de l'avis n'est pas nécessaire. Aussi : le champ `preuve` cite « carte du 28/10/2026 » (non rendu, à neutraliser).
- F2-5 Réservation : le champ date s'affiche « mm/dd/yyyy » (locale du navigateur) et le formulaire « de démonstration sans envoi » double le bouton Zenchef du hero (mêmes actions deux fois, 4 fois les horaires dans l'audit). Garder un seul chemin (bouton Zenchef + téléphone) ou un `lang="fr-BE"`/placeholder explicite.

### F3
- F3-1 Navigation mobile sur deux lignes (≈ 75 px sticky, 9 % de 844 px) sans burger : acceptable, mais 3 pages courtes (404, réservation) perdent de la place utile.
- F3-2 Horaires répétés dans le pied de page sur chaque page (audit « sentence repeated 2x ») ; condenser (« Le soir / Le midi / Samedi ») comme `horairesResume` le permet.
- F3-3 `histoire` a le h1 « Les chefs » alors que la page vit sous `/histoire/` et que son second bloc s'intitule « L'histoire » : aligner titre, eyebrow et lien (« Les chefs » vs « Histoire »).

## Ce qui est bien (à ne pas casser)
1. Chiffres monumentaux sur le coin intérieur : 4, 67, 2 et 2020 tiennent en 390 px, sans coupure, et 4 / 67 / 2 sont prouvés par le dossier (4 services, 67 €, 2 chefs).
2. Fiabilité technique : 0 console, 0 débordement, 0 élément caché après défilement complet (visibilité calculée), LCP mobile ≤ 2,2 s, hero qui se peint avant le JS.
3. Honnêteté du contenu : rôles de Sara et Jordan, offres de privatisation marquées « illustratif », e-mail absent (pas de `mailto` inventé), menu fidèle aux six lignes avec « 4 services » en constante.
