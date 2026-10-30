# Revue gabarit encre · Les Potes au Feu · passe 1
Verdict : A_CORRIGER (0 F0, 3 F1, 5 F2, 4 F3)
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un carnet d'encre sur ivoire, titres verticaux à la plume, un rouleau de plats qui se déroule à l'horizontale comme un makimono, et un sceau rouge unique qui mène à la réservation.

Méthode : dist/ construit à 22:13. Accueil et carte recapturés (`.shots-encre-revue/index`, `.../carte`) ; histoire, réservation, emporter et 404 relus depuis `.shots-encre/<page>` (captures de 21:57 à 22:05, antérieures au build). Planches `.shots-encre-revue/planche-<page>.png`. Mesures Playwright dans `.shots-encre-revue/mesure.json` (390 et 1440 px, défilement complet, `page.clock`, fuseau Europe/Brussels). Serveur :4422 arrêté par son PID. Auto-score : pas d'outil Agent, donc pas de critique aveugle (quality-bar.md, grille appliquée par moi).

## Scores /10
| Critère | Note | Preuve |
| --- | --- | --- |
| Design (40 %) | 7,5 | `d-01-hero` : h1 vertical 56 px, photo sombre, une seule couleur d'accent (sceau rouge) ; le masque « pinceau » des photos du rouleau (index `d-02`) est reconnaissable de loin ; mais les pages intérieures (réservation, emporter, 404) retombent sur une colonne centrée standard, et les légendes `.illu` font 10,2 px. |
| Usabilité (30 %) | 7 | LCP 280 ms desktop et 1,37 s mobile, CLS 0, axe 0 violation sur index et carte, aucun débordement (scrollWidth 390 = 390 sur 5 pages), h1 visible à 390 px partout (index y=381, h 41 px) ; en défaut : bandeau d'emporter en collision avec l'en-tête, loader 3,2 s desktop, CTA du hero sans retour au survol mesuré. |
| Créativité (20 %) | 7,5 | Le rouleau pinceau + sceau ne se déplace pas sur un autre site ; sur mobile l'idée se réduit à un défilement natif et le titre vertical devient un titre horizontal de 37 px. |
| Contenu (10 %) | 7 | Faits conformes à donnees.json (adresse, téléphone, horaires, Zenchef rid=379477, Michelin daté 2026-05-04, 67 €/52 €/40 €, +7 €/+15 €) ; « il y a quatorze ans » neutralisé en « À leurs débuts » ; mais 12 plats japonais d'exemple en vitrine d'un bistrot belge. |
| Développeur | SEO 8 · Animations 7 · Accessibilité 8 · WPO 8 · Responsive 7 · Meta 8 | JSON-LD Restaurant complet (adresse, geo, horaires par créneau), OG + canonical + favicon + robots.txt + sitemap, 3,1 Mo de dist, `lang="fr"`, un seul h1 par page (404 comprise), ordre clavier propre (`k-*`, `noVisibleFocus` vide). |
Note pondérée : 7,3 (Honorable Mention : 6,5 ; SOTD récents : 7,2 à 7,6).

## Findings

### F1 majeurs
- **F1-1 · emporter : le bandeau « Page d'exemple » percute l'en-tête.** `emporter/index.html`, `src/pages/emporter.astro` (le `<p class="bandeau">` en flux) et `src/components/Header.astro` (en-tête `position: absolute` en haut). Mesures : à 390 px bandeau 0–97 px, en-tête 0–107 px, marque à 14–54 px ; à 1440 px bandeau 0–49 px, marque à 18–57 px. Preuve : `.shots-encre/emporter/m-01-hero.png` (« Les Potes au Feu » imprimé sur « en ferait. », nav coupée par le texte) et `d-01-hero.png`. Correction : décaler l'en-tête de la hauteur du bandeau (variable `--bandeau-h` en `top`/`padding-top` du header et du hero), ou poser le bandeau sous le hero ; contrôler à 390 et 1440 que les rectangles ne se recoupent pas.
- **F1-2 · accueil : le CTA du hero « Dérouler la carte » mène à 12 plats japonais inventés, non marqués plat par plat.** `Rouleau.astro` (`rouleau.plats`), `site.ts` (`rouleau`), `index.astro` (`.hero__lien`). Le restaurant sert un menu unique de 4 services ; le dossier ne contient ni ramen, ni nigiri, ni sashimi. Le seul drapeau est la note « Exemple de carte asiatique » en tête de bande (`.illu` à 10,2 px, `index/d-02-scroll.png`) et un astérisque sur les prix ; les noms de plats n'ont aucune pastille alors que la carte réelle marque « exemple » ligne à ligne (boissons). Règles « une donnée, un drapeau » et « rien de promis » : un visiteur qui lit seulement les plats et pas la note croit à une carte. Correction : pastille « exemple » sur chaque `plat__nom` (comme `carte.astro` pour les boissons) ; libeller le lien « Dérouler un exemple de carte » ; sur l'accueil, ajouter sous le rouleau le lien « Voir la vraie carte (4 services, 67 €) » ou y mettre les vrais plats du menu à la place des plats d'exemple.
- **F1-3 · « Emporter » dans la navigation principale de chaque page.** `Header.astro` (liens), `emporter.astro`, `site.ts` (`emporter.lignes` : bento 16 €, nigiri 26 €, ramen 15 €, gyoza 10 €). Le dossier dit « Take-away / livraison : inconnu ». Le lien est présent sur les 6 pages, sans marque d'exemple dans la nav ; le bandeau et les pastilles ne s'affichent qu'une fois la page ouverte, et l'astérisque des prix y est le seul marquage du prix. Une maquette montrée au client promet donc un service au premier regard. Correction : marquer le lien dans la nav (`Emporter` + pastille « exemple » ou `aria-label` explicite) ou le retirer de la nav du build du restaurant et ne le garder que dans le gabarit nu ; sur la page, remplacer les prix par `Prix à définir`.

### F2 mineurs
- **F2-1 · loader desktop 3,2 s** (`report.json` : `loaderMs` 3195 index, 3220 carte ; seuil de relecture 2,6 s). Le LCP est bon (280 ms) car le hero est peint sous le rideau, mais le visiteur attend 3,2 s avant de pouvoir agir. Correction : plancher du loader à 1,6 s, sortie à 0,6 s.
- **F2-2 · mobile : le concept s'efface.** `index/m-01-hero.png` : h1 horizontal de 37,3 px, plus de titre vertical ; `m-02-scroll.png` : l'en-tête « Le rouleau » est suivi d'un grand vide avant la bande. La composition tient (scrollWidth 390, rien de caché : `getComputedStyle` après défilement complet, 0 élément `visibility:hidden` ou opacité < 0,05) mais le h1 pourrait être à 44 à 48 px et le vide réduit.
- **F2-3 · e-mail d'exemple affiché dans le pied de page de toutes les pages et sur la page réservation** (`bonjour@lespotesaufeu.be` + « adresse d'exemple »). Dossier : e-mail inconnu. Drapeau présent mais en `.illu` 10,2 px ; correction : ne pas afficher d'adresse inventée, mettre « par téléphone ou via Zenchef ».
- **F2-4 · retour au survol absent sur deux cibles principales.** `report.json` index : `noHoverChange` = « Dérouler la carte » (h-01) et « PF Réserver » (h-02, le sceau) ; carte : « La carte » (lien courant). Le sceau doit tourner de 8° (CSS) mais le détecteur ne le voit pas (cf. leçon maree) : à confirmer par mini-script ; le lien du hero n'a, lui, aucun soulignement animé.
- **F2-5 · pastille `.illu` à 10,2 px** (mesure sur tous les `span.illu`), seule taille < 12 px du site : c'est le drapeau obligatoire, il doit rester lisible. Correction : 12 px minimum, contraste vérifié.

### F3 finition
- F3-1 · horaires écrits 4 fois sur l'accueil et sur réservation, 2 fois ailleurs (audit : « sentence repeated 4x: 12:00 à 14:00, 19:00 à 21:00 ») ; garder « Venir » et le pied de page.
- F3-2 · 404 : colonne centrée sans image ni signature (`404/d-01-hero.png`) ; reprendre le pinceau ou une photo du hero.
- F3-3 · `contrastNeedsReview` 175 (index) et 155 (carte) : texte sur fond ivoire texturé non tranché par axe ; relever à la main les gris `muted` à 12 px (4,5:1 exigé).
- F3-4 · Date du formulaire au format `mm/dd/yyyy` selon la locale du navigateur, aucun `min`/`max` sur l'heure (le formulaire accepte 03:00) ; ajouter les créneaux d'ouverture (12:00–14:00, 19:00–21:00) en indication.

## Contrôles passés (0 finding)
- Console : 0 erreur, 0 requête échouée sur index et carte ; 0 erreur sur les 5 pages à 390 et 1440 (mesure.json). Liens internes, `404.html`, `og.jpg`, `favicon.svg`, `robots.txt`, sitemap : 200.
- Mention « Maquette KYW, certaines données sont illustratives » + logo `kyw-signature` (un seul) + `noindex, nofollow` : présents sur les 6 pages.
- Heure de l'en-tête (`<time data-horloge>` dans `.header__heure`, « Namur HH:MM », Europe/Brussels, aucune promesse « ouvert/fermé ») testée avec `page.clock` : 10:30 CET → « Namur 10:30 » ; 23:59 → 23:59 ; 15/07 12:05 CEST → 12:05 ; 29/03 00:30Z → 01:30 (avant bascule) ; 25/10 00:30Z → 02:30 (avant retour à l'heure d'hiver). Correct sur les deux changements d'heure.
- Sans JS et en reduced-motion : h1 visible (y=380 à 390 px), `hiddenText` 0. h1 en `vertical-rl` à 1440 px : une colonne par titre (largeur 51 à 56 px, « L’histoire » 51×327), pas de repli en deux colonnes.
- Faits : « À leurs débuts » remplace la date relative ; « 4 services » vient de `servicesMenu` (constante) ; Sara et Jordan nommés seulement comme « épaulés par » (dossier) et leurs rôles marqués « rôle illustratif, à confirmer » ; gare « environ 20 min à pied » et parking marqués par astérisque et note.
- Le rapport du constructeur signalait une violation axe `label-content-name-mismatch` sur `.sceau` pour histoire, réservation, emporter et 404 ; le build de 22:13 ne porte plus d'`aria-label` sur le sceau (index et carte : 0 violation). À reconfirmer par un shoot de ces 4 pages après correction de F1-1.

## Ce qui est bien (à ne pas casser à la révision)
1. Le hero desktop : photo sombre peinte au premier rendu, h1 vertical et phrase unique, LCP 280 ms, CLS 0.
2. Le sceau rouge, seul cercle et seule couleur chaude, répété à la fin du rouleau et en pied de page.
3. La rigueur des faits : menu 4 services, suppléments, Michelin citée avec source et date, horaires par créneau dans le JSON-LD, et un drapeau visible sur chaque donnée inventée (adresse e-mail, gare, parking, boissons, avis d'exemple non repris à l'écran).
