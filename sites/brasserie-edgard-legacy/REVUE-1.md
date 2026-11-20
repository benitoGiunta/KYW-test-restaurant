# Revue legacy · Brasserie Edgard · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une brasserie de quartier présentée par sa façade de nuit, sur fond crème, avec une carte à prix lisible, des pages sobres en serif et des blocs de réservation répétés ; propre et cohérent, mais prudent et peu mémorable.

Scores /10 :
- Design 6 : hiérarchie nette et calme (`rev1ed-d.png`, `rev1ed-full-a.png`), mais palette crème et marron par défaut et en-têtes de pages secondaires très vides à 1440 px (Menu groupe, Galerie, Contact : 150 à 250 px de blanc sous le titre).
- Usabilité 7 : navigation en une ligne à 390 px, 0 débordement à 1440, 390 et 320 px, Tab complet avec contour 2 px et lien d'évitement en premier ; formulaire de groupe incohérent avec ses propres règles (F2-3).
- Créativité 5 : seule la photo de façade et la plaque posée dessus portent une idée ; le reste est un gabarit éditorial correct (lettrine bleue unique, bandeau « À très vite, Chaussée de Waterloo. » répété sur les 7 pages).
- Contenu 6 : faits et horaires conformes, 0 invention de fait ; mais prix mal rendus sur la carte (F1-1, F1-2) et une rubrique mal rangée (F2-4).
- Technique 7 : build OK, 0 erreur console ni requête en échec sur 7 pages x 3 largeurs, axe 0 serious/critical, contraste mesuré nœud par nœud à 0 sous le seuil (14 vues), LCP mobile 1,9 s, CLS 0,018 (QA `.shots-brasserie-edgard-legacy-revue1/home/report.json`) ; JSON-LD absent.

Méthode et preuves : QA-revue1.md n'existe pas ; `summary.json` du QA : accueil capturé, la-carte et 404 en `shootFailed`. Captures de l'accueil réutilisées (postérieures au dist 21:19, aucun `src/` plus récent). Pour le reste, deux scripts maison (`scratchpad/rev1-edgard-legacy-mesure.mjs`, `rev1-edgard-contraste.mjs`) : 7 pages dont `404.html` réel x 1440/390/320 px, axe-core de node_modules, console, requêtes, débordement, cibles, balises, texte extrait, captures dans `.shots-brasserie-edgard-legacy-revue1/rev1/` ; planches `rev1ed-d.png`, `rev1ed-m.png`, `rev1ed-full-a/b/m.png` lues. 86 lignes de prix confrontées à donnees.json.

## Findings
**F1-1 · T-faux/bug · « NaN € » affiché sur la carte.** `/la-carte/`, rubrique « Le coin du poissonnier », ligne « Moules (en saison) : marinière, vin blanc… » (`la-carte-1440.txt:207`, `rev1ed-full-b.png`). Cause : `carte.json:258` a `"prix": "Prix du jour"` et `prix()` (`src/data/site.ts:21`) fait `parseFloat` sans test. Correction : si la valeur n'est pas numérique, afficher « Prix du jour » tel quel, sans « € ». Vérifier : `grep -c NaN dist/brasserie-edgard/legacy/*/index.html` = 0.

**F1-2 · T-faux · prix à deux portions tronqués.** donnees.json : « Fricassée de scampi à l'ail » et « du chef » `18.60 (1 pce) / 23.90 (2 pces)`, « Petits gris de Namur à l'ail » `15.00 (1 pce) / 25.60 (2 pces)`. Le site affiche « 18,60 € », « 18,60 € », « 15 € » (`la-carte-1440.txt:69-77`) : le prix de la grande portion et l'unité disparaissent, le client croit payer 15 € une entrée qui en coûte 25,60 € pour deux pièces. Même cause, `parseFloat` (`site.ts:21`). Correction : rendre « 1 pièce 18,60 € · 2 pièces 23,90 € » (nombres en `.price`, unités en texte). Les 83 autres prix correspondent à donnees.json (0 écart).

**F2-1 · SEO · JSON-LD `Restaurant` absent des 7 pages** (`grep -c ld+json` = 0 ; prompt § C exige adresse et horaires structurés). Correction : un `<script type="application/ld+json">` dans `Base.astro` avec adresse (Chaussée de Waterloo 473, 5002 Saint-Servais), téléphone, `openingHoursSpecification` 10:00-22:30 tous les jours, sans `aggregateRating` (avis non vérifiés).

**F2-2 · Accessibilité · `landmark-no-duplicate-contentinfo` (moderate) sur les 7 pages** : le pied du site et `kyw-footer` sont deux `<footer>` de premier niveau (`footers=2`). Correction : le `<footer>` du site devient un `<div>` ou une `<section aria-label>` ; ne pas toucher au paquet `kyw-footer` ; recontrôler qu'aucun `region` n'apparaît.

**F2-3 · Cohérence menu groupe.** (a) Accueil : « À partir de dix personnes… jusqu'à seize » alors que la source dit « plus de 10 » (page menu groupe : « Table de plus de 10 personnes, 16 au maximum ») et que le plafond de 12 personnes le vendredi soir, le samedi soir, le dimanche midi et les jours fériés est omis sur l'accueil. (b) Formulaire : `Participants` propose 10 à 20 alors que le maximum annoncé est 16 et « plus de 10 » exclut 10. (c) Le choix « À la carte réduite (pour les groupes) » n'a aucun contenu sur le site (ligne `dropped` de ETAT.md, jamais tranchée). Correction : « Plus de dix personnes, seize au maximum » ; options 11 à 16 (ou mention du plafond de 12 les soirs concernés) ; retirer l'option sans contenu ou publier la carte réduite.

**F2-4 · Contenu · rubrique mal rangée.** `/lunch-et-suggestions/`, bloc « Les moules de Zélande » (« Toutes nos moules sont accompagnées de pommes frites maison ») : « Crumble d'automne aux amandes, au dessert / Pommes, poires et raisins » est listé comme une moule, sans prix, alors que donnees.json le range en dessert à 11,50 € (`lunch-et-suggestions-1440.txt:81-83`). Correction : le sortir du bloc moules, titre « Au dessert », prix 11,50 €.

**F2-5 · Lien · URL Tripadvisor modifiée.** `site.ts:15` : `…Reviews-Brasserie_Edgard-Namur…` ; la source (`site-actuel/page.html`) : `…Reviews-Brasserie_Mr_Edgard-Namur…`. Lien présent sur 8 pages. Correction : recopier l'URL de la source à l'identique (autres liens, Barestho, Facebook, Maps, tel, mailto : conformes au dossier).

**F3-1 · Typographie · guillemets avec espace sécable** : 7 occurrences de « suivi d'une espace normale dans le dist (la-carte 5, accueil 1, menu-groupe 1 : « Porketto », « Chirac », « Cousteau », « laque du feu de dieu »…), guillemet fermant orphelin possible à 390 px (`m-02-scroll.png` : « Porketto » coupé en fin de ligne). Correction : U+00A0 après « et avant ».

**F3-2 · Performance · polices externes** : Sentient (fontshare.com) et Hanken Grotesk (Google Fonts) chargées par CSS externe, sans préchargement ni auto-hébergement (déjà noté « non corrigé » en QA) ; sans effet mesuré (CLS 0,018, LCP 1,9 s) mais dépendance de deux tiers pour le rendu. Correction : auto-héberger en woff2.

**F3-3 · Motion/hover** : QA accueil : 2 cibles sans changement au survol et 3 changements par la couleur seule (`home/report.json`). À rendre visibles (soulignement ou fond).

**F3-4 · Créativité** : le bandeau « À très vite, Chaussée de Waterloo. » ouvre le pied de chaque page (7 répétitions) ; en-têtes de pages secondaires à grand vide ; une lettrine bleue isolée sur l'accueil (haute de 2 lignes, peu lisible comme geste). Correction : une phrase propre à chaque page, ou un pied sans slogan ; réduire le vide sous les titres de page.

Vérifié sans écart : mention « Maquette KYW, certaines données sont illustratives » et `kyw-signature` (1 logo) sur les 7 pages ; `noindex` sur les 7 ; `lang="fr"`, un `h1`, `<title>` et description uniques, OG image, favicon, canonical ; 404 designée (`404.html`) ; 0 lien interne ou ancre morte ; 0 alt manquant et alts conformes au champ `sujet` de photos/index.json ; adresse, téléphone, e-mail, horaires, lunch, menu groupe, suggestions conformes à donnees.json ; formulaires marqués « Maquette : l'envoi n'est pas actif » (pas de faux « merci ») ; 0 tiret cadratin, 0 apostrophe droite, 0 anglicisme.

## Ce qui est bien (à ne pas casser à la révision)
1. L'accueil : façade de nuit non couverte, plaque en bande basse, mobile composé (photo puis plaque qui chevauche), mesuré sans débordement à 320, 390 et 1440 px.
2. La carte : lignes à filet, descriptions courtes, photos de plats légendées d'après `sujet`, prix alignés ; 83 prix sur 86 exacts.
3. Sobriété technique : 3 Ko de JS, 0 erreur, focus 2 px visible partout, lien d'évitement, formulaires honnêtes sur l'absence d'envoi.
