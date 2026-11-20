# Revue portfolio · Épices & Nous · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un restaurant de couple en brun café et orange épice, où de grands chiffres filigranés (3 services, 52 €, 2 espaces, depuis 1999) et des photos de plats font défiler le menu et la maison, avec un anneau de lecture sur le monogramme.

Scores /10
- Design 7 : palette cohérente brun/orange, hero photo sombre lisible, chiffres monumentaux maîtrisés (planches 1440 et 390 de la page d'accueil) ; mais eyebrow au-dessus de presque chaque titre.
- Usabilité 7 : burger fonctionnel (aria-expanded=true, 4 liens de 44 px), focus visible partout (outline 2 px sur 9 arrêts de Tab), CTA Réserver présent partout ; galerie cassée à 1024 px.
- Créativité 7 : signature (anneau et filet de lecture), onglets des espaces et chiffres chapitres ; reste dans le gabarit Velours.
- Contenu 7 : tous les prix, plats et horaires concordent avec donnees.json ; un `<title>` faux et une procédure déduite.
- Technique 7 : 0 erreur console, 0 requête en échec, 0 débordement de page de 320 à 1440 sauf galerie 1024-1180, 0 violation critique ; 1 axe serious par page (voir F2).

Méthode et limites : QA-revue1.md absent (le shoot de l'agent captures a échoué : « browser closed », `.shots-epices-et-nous-portfolio-revue1/summary.json`), dist (04:13) postérieur à src. Mesures par 2 scripts maison (7 pages x 1440, 390, 1024 ; axe-core ; défilement à la molette ; Range ; clavier ; reduced motion ; burger ; galerie à 6 largeurs) et planches PIL. LCP et CLS non remesurés : QA-build (LCP mobile 1320 ms, CLS 0) repris tel quel. Build non relancé (dist déjà à jour). Tous les liens internes répondent 200 (7 pages, `#services` existe).

## Findings
### F1 majeurs
- F1-1 · T-faux · `src/layouts/Base.astro:19` · le `<title>` de l'accueil est « Épices & Nous | Bistronomie en menu unique à Erpent (Namur) » (relevé dans dist/index.html). Le restaurant propose une carte ET un menu 3 services, et « bistronomie » n'est pas dans le dossier. Correction : « Épices & Nous | Restaurant à Erpent (Namur), menu 3 services à 52 € » ou équivalent, sans « bistronomie » ni « menu unique » ; vérifier `og:title`.
- F1-2 · Débordement · `src/styles/base.css:169` (`@media (min-width: 1024px) { .galerie__bande { justify-content: center; overflow: visible } }`) · à 1024 px la bande de 5 vignettes mesure 1107 px : première vignette de -83 à 141, dernière de 883 à 1107, rognées par `overflow-x: clip` du body et sans défilement possible (mesure `galerie 1024` : `scrollWidth` 1107 ; idem 1100 : -47 ; 1180 : -8 ; propre à 1280). Correction : passer le centrage à `min-width: 1280px` (ou `justify-content: safe center` + `overflow-x: auto`), ou réduire la largeur des vignettes à `clamp(11rem, 17vw, 18rem)` ; revérifier 1024, 1100, 1180.

### F2 mineurs
- F2-1 · axe `scrollable-region-focusable` (serious) à 390 px sur `.galerie__bande` (`src/pages/index.astro:96`) : ajouter `tabindex="0"`, `role="region"` et `aria-label="Galerie en images"`.
- F2-2 · axe `landmark-no-duplicate-contentinfo` (moderate) sur les 7 pages : pied du site + pied du paquet KYW. Rendre le pied du site `<div>`/`<section aria-label>` ou fournir un `aria-label` distinct aux deux contentinfo sans toucher au bandeau KYW.
- F2-3 · T-invente (procédure) · `src/pages/carte.astro:55` : « Boissons et vins : informations à demander au restaurant. » Le dossier dit seulement « carte des vins : inconnu ». Remplacer par « La carte des boissons n'est pas reprise sur cette maquette. » ou retirer.
- F2-4 · Photo trompeuse · `src/data/site.ts` (espaces, `La terrasse` → `facade.webp`, alt « Façade du restaurant, enseigne Épices & Nous, ciel bleu`) : la photo illustrant « La terrasse » (page Maison et onglet de l'accueil) est la façade ; le dossier n'a aucune photo de terrasse. Correction : légende explicite (« La façade ») ou retirer la photo de l'onglet terrasse.
- F2-5 · 404 · `src/pages/404.astro:7` : `h1` = « Rideau » avec eyebrow « Erreur 404 » ; un lecteur d'écran n'entend pas « page introuvable ». Mettre « Page introuvable » (ou « Rideau, page introuvable ») en h1. Le texte « La salle, elle, est toujours Chaussée de Marche » se lit mal : « La salle, elle, vous attend toujours Chaussée de Marche ».
- F2-6 · axe `color-contrast` (serious) sur `.chiffre > span` des pages Carte et Histoire (« 52 », 1,28:1, couleur `rgba(196 143 96 / 0.16)`, parent `aria-hidden`) : chiffre filigrane décoratif, mais l'audit le signale sur 2 pages x 3 largeurs. Faire porter la transparence par `opacity` sur le conteneur ou par une image/SVG de fond, pas par la couleur du texte.

### F3 finitions
- F3-1 · Horaires affichés « 19:00 à 20:30 » : format français « 19 h 00 à 20 h 30 » (accueil, pied, réservation, 404) ; le « soir » précède « midi » partout.
- F3-2 · Eyebrow au-dessus de presque tous les titres (« Euros », « Espaces », « Services », « Deux espaces et une terrasse », « Erreur 404 ») et chiffres 01/02/03 sur le menu : motif d'AI slop. Réduire à trois eyebrows au plus.
- F3-3 · Carte : légende « À PARTIR DE, JUSQU'À 25,50 € » grammaticalement bancale ; écrire « de 20,50 à 25,50 € » ou un seul des deux.
- F3-4 · Histoire : la fiche « Denis Delvigne » porte une photo de girolles en poêle (alt exact mais lecture de portrait) ; « Accueil familial » alors que le dossier dit « accueil convivial » ; maison : « passez par le site du restaurant ou appelez-nous » (ambigu sur une maquette), préférer « réservez en ligne ou par téléphone ».
- F3-5 · Onglets des espaces à 390 px : « LA TERRASSE » passe à la ligne (planche 390_home_07), acceptable mais à aligner en grille de 3 ou en défilement.

## Vérifié sans écart
Faits (nom, adresse Chaussée de Marche 561, 5101 Erpent, +32 81 31 32 24, horaires, 52 €, 3 services, 20 entrées/plats/desserts et prix, G&M 13,5/20, Michelin « recommandé » sans année, 1999) conformes à donnees.json ; 0 e-mail ou avis inventé ; `noindex, nofollow` sur 7 pages (conforme § 3.3) ; mention « Maquette KYW, certaines données sont illustratives » et 1 logo KYW par page ; `lang=fr`, 1 h1, JSON-LD Restaurant avec adresse et horaires, og présents ; reduced motion : 0 bloc caché, loader absent ; 0 texte hors fenêtre (Range) à 1440 et 390.

## Ce qui est bien
1. Données de carte et de menu fidèles à la ligne près, sans invention, avec suppléments fromage exacts (9 € et 17 €).
2. Mobile pensé : chiffres monumentaux plafonnés, burger animé à cibles de 44 px, 0 débordement à 390 sur 7 pages.
3. Focus clavier visible et uniforme, skip link en premier arrêt, reduced motion complet.
