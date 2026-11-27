# Revue portfolio · Oh la Vache ! · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un site de grill convivial sur fond crème et rouge, où l'on « attrape » des tirages photo comme sur une table, avec des taches noires de vache sur les bords des héros.

Preuves : QA-revue1.md et planches (`.shots-oh-la-vache-portfolio-revue1/`, postérieures au dist de 10:02, `src/` non modifié depuis) ; le QA ne couvre que accueil, carte et une 404 brute de `serve.mjs`. J'ai mesuré moi-même les 6 pages (accueil, carte, histoire, terrasse, réservation, `404.html`) à 1440 et 390 px (serveur propre, port 4733, arrêté) : console, requêtes, axe-core complet, contraste par nœud, débordement, liens, balises, alt. Texte extrait du dist et confronté à `donnees.json` et `dossier.md`.

Scores /10
- Design 6 : composition soignée (polaroïds sur bande noire, carte propre), mais palette crème et terracotta, mot en italique dans presque chaque titre, hero sans photo (`d-01-hero.png`).
- Usabilité 8 : 0 cible < 24 px, focus visible (`k-02-focus.png`), dock mobile 5/5 liens, 6 pages x 2 largeurs sans débordement (scrollWidth = fenêtre).
- Créativité 6 : « table à attraper » et taches de vache sont propres au lieu, mais les pictos du hero (parasol, verre, frites, fourchette, citron) sont génériques.
- Contenu 6 : 226 plats sur 226 confrontés à `donnees.json` (0 écart, 3 « faux écarts » = doubles prix « 3,70 / 4,70 € »), mais deux phrases du bandeau sont fausses ou inventées (F1).
- Technique 8 : 0 erreur console, 0 requête en échec, 0 lien interne mort (5 liens + `404.html`), 0 violation axe grave ou critique, LCP mobile 1,2 s, CLS ≤ 0,004, JSON-LD `Restaurant` avec adresse et horaires.

## Findings
Bilan : F0 = 0, F1 = 2, F2 = 5, F3 = 5. Build OK (QA-build, dist présent). Mention « Maquette KYW… », logo KYW (un seul) et `noindex, nofollow` présents sur les 6 pages (conforme à la règle du portfolio).

### F1 (majeurs)
- **F1-1 · T-faux · bandeau du haut sur toutes les pages** (`src/components/Marquee.astro:5`). Le bandeau affiche « Service du soir du lundi au dimanche » et « Réservation en ligne via Téléphone ». Le restaurant ouvre à 11:00 (`donnees.json` horaires, site actuel : « Semaine 11:00 – 22:30 »), donc « service du soir » est faux ; et il n'y a aucune réservation en ligne : `reservation.outil` = « téléphone uniquement », `url: null`, dossier « téléphone uniquement ». Preuve : `d-01-hero.png` (bandeau), texte extrait des 6 pages (2 fois par page, la seconde copie est `aria-hidden`). Correction : remplacer par « Ouvert 7j/7 de 11:00 à 22:30 ou 23:45 » (ou retirer le premier segment) et « Réservation par téléphone : +32 494 29 44 72 ».
- **F1-2 · T-invente · « Ouvert, arrivée jusqu'à 23:45 »** (`src/motion/setup.ts:50`). L'heure de fermeture (23:45) est présentée comme dernière heure d'arrivée : le dossier n'en dit rien (procédure inventée). Preuve : `d-01-hero.png`, `d-90-transition-a.png`. Correction : « Ouvert jusqu'à 23:45 » (et « Fermé, rouvre … » sur le même modèle), sans « arrivée ».

### F2
- **F2-1 · T-invente · titre de page** `histoire.astro:15` : `<title>` « La maison et l'équipe | Oh la Vache ! » alors que l'équipe est inconnue (retirée de la page, `manques`). Correction : « La maison | Oh la Vache ! ».
- **F2-2 · T-invente (procédure) · `terrasse.astro:47`** : « Pour une table, un groupe ou une question sur la terrasse, appelez le … ». Le dossier ne dit rien des groupes (privatisation : inconnue). Correction : « Pour réserver une table ou poser une question, appelez le … ».
- **F2-3 · AI slop** : palette crème et terracotta par défaut ; mot en italique dans presque chaque titre (« Ce qu'on *pose* sur la table », « Un grill, *une terrasse* », « La salle, *la terrasse* », « Dehors, *tout simplement* », « Quand *venir* », « En *images* », « À *table* », « Au *bar* ») ; eyebrows « LE MENU », « HORAIRES », « À RETENIR », « ERREUR 404 » ; 4 cartes égales « À LA CARTE » (`d-05-scroll.png`). Correction : garder l'italique sur 2 titres au plus, supprimer au moins la moitié des eyebrows, varier ou fusionner les quatre cartes de « Repères de la carte ».
- **F2-4 · identité** : le hero (`d-01-hero.png`, `m-01-hero.png`) n'a aucune photo ni le vrai logo (tête de vache de l'enseigne, `photos/00-logo.jpg`) ; l'en-tête est un simple « Oh la Vache ! » en italique ; les pictos (parasol, verre, frites, fourchette, citron) viennent du gabarit guinguette. L'enseigne noir et blanc à taches (visible dans `og.jpg`) est l'atout du lieu. Correction : photo de façade ou d'enseigne dans le premier écran, logo réel dans l'en-tête, pictos réduits à ceux qui parlent du lieu (verre de gin, assiette, vache).
- **F2-5 · axe moderate (12 cas sur 12)** : `landmark-no-duplicate-contentinfo` (deux `<footer>`, `.footer` du site + `kyw-footer`) et `region` (`.marquee` hors landmark) ; incomplets : `aria-prohibited-attr` (1, SplitText) et `color-contrast` (16 à 33 nœuds, tous mesurés ≥ 4,5:1 par canvas, sauf le mot fantôme « Grill »). Correction : le `.footer` du site en `<div>` (ou `role` neutre), le bandeau dans `<aside aria-label>` ou `role="region"`, option `aria` de SplitText.

### F3
- **F3-1 · contraste décoratif** : le mot fantôme « Grill » (232 px, `avis__mot`, `index.astro`) mesure 2,30:1 (seuil 3:1 en grand texte) ; décoratif, mais c'est du texte lisible par les lecteurs d'écran. Correction : `aria-hidden="true"` ou teinte plus soutenue.
- **F3-2 · typographie française** : 7 apostrophes droites sur l'accueil (47 sur la carte, 3 sur les autres pages) ; espaces simples avant « ! ? : ; » (16 sur l'accueil, 0 espace insécable) : « à table ! » peut se couper avant le point d'exclamation. Correction : U+2019 et U+00A0 par script Python sur `site.ts` et les `.astro`.
- **F3-3 · poids** : 3 images > 300 Ko dans `dist/…/photos/` : `entrecote-frites.webp` 472 Ko, `dessert-fondant.webp` 397 Ko, `terrasse-canapes.webp` 352 Ko. Correction : qualité WebP 72 ou largeur 1280 px.
- **F3-4 · filler** : « Terrasse : oui, voir les photos » (`index.astro:164`, repris sur la page contact) n'apprend rien ; remplacer par « Terrasse : canapés, parasols et pergola ».
- **F3-5 · finitions** : le grand « À table ! » du pied est rogné à droite à 390 px (`m-06-scroll.png`) et en bas à 1440 ; deux taches noires (haut gauche, haut droite) coupées à 12 px du bord se lisent comme un défaut de découpe, et la tache droite recouvre le verre (`k-02-focus.png`). Les horaires du vendredi (23:45) et du mardi restent « à confirmer » : la note est visible sur l'accueil et la page contact, mais pas dans le JSON-LD (acceptable).

### Faux positifs du QA (ne pas corriger)
- « no robots.txt / no sitemap » : `robots.txt`, `sitemap-index.xml` et `sitemap-0.xml` existent dans `dist/oh-la-vache/portfolio/`.
- « sentence repeated 2x » (bandeau) : la seconde copie est `aria-hidden` (boucle visuelle).
- `skipLinkFirst: false`, « 404 sans h1 » : la vraie `404.html` a lang, title, h1 et noindex.
- `colorOnly: 1` sur la carte : survol testé, fond jaune du lien actif visible (`h-04-hover.png`).

## Ce qui est bien (à ne pas casser)
1. Carte exacte et lisible : 226 plats, prix et doubles prix conformes à `donnees.json`, mobile compris (`m-02` à `m-06`), « Prix du jour » conservé pour la sole, aucun avis ni chiffre inventé (les cartes « À retenir » viennent de la carte).
2. Robustesse technique : 0 console, 0 débordement à 390 et 1440, dock mobile fonctionnel, reduced-motion sans texte caché, JSON-LD complet, `og.jpg` = vraie façade.
3. Signature « table à attraper » (polaroïds avec légendes alignées sur `photos/index.json`, alts décrivant la photo) et page 404 dans le ton (« Cette table n'existe pas »).
