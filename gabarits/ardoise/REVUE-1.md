# Revue gabarit · Ardoise · Les Potes au Feu · passe 1

Verdict : **A_CORRIGER**

Lecture en une ligne de l'idée du site (avant DESIGN.md) : la carte est l'accueil, une ardoise anthracite où l'on lit plats et prix d'un coup d'œil, avec une suggestion du jour qui se réécrit et une barre de réservation craie toujours en bas.

Périmètre : build `dist/gabarits/ardoise/` (7 pages : accueil, carte, formules, salle, histoire, réservation, 404), servi sur `http://127.0.0.1:4435/`, `shoot.mjs` page par page en série (`--hovers 4`), `audit.mjs`, mesures Playwright ciblées. Captures : `.shots-ardoise-revue/<page>/`. Build non relancé (dist du 31/10 12:31, `apercu.png` de 12:32 : postérieur au dernier build, donc à jour). Aucun fichier source modifié.

## Scores /10 (auto-évaluation, pas de sous-agent critique disponible)

- Design 7,5 : ardoise lisible, prix tabulaires alignés, craie jaune parcimonieuse (`d-02-scroll`, `m-02-scroll` de l'accueil), mais ~la moitié des lignes mobiles portent une vignette grise vide.
- Usabilité 8 : 0 débordement horizontal, onglets sticky, barre de réservation, focus visible partout (`noVisibleFocus: []`), skip link premier arrêt de tabulation.
- Créativité 7,5 : « la carte EST l'accueil » tient la promesse du cahier ; la signature (suggestion du jour) est présente et lisible (`d-01-hero`).
- Contenu 8 : faits conformes à `donnees.json` (adresse, tél. +32 81 64 04 44, horaires, 67 €, 52 €, 40 €, bons 50 à 150 €, Zenchef, citation Michelin) ; lignes d'exemple toutes marquées « exemple » ; défauts de français mineurs (F2-3).
- Technique 8 : 0 erreur console, 0 requête en échec, 0 violation axe sur les 6 pages du gabarit, CLS 0, LCP mobile 1,2 s (2,4 s pour formules) ; loader un peu long (F2-1).

## Réponse au point signalé par le constructeur : trait clair de 2 px en haut à gauche d'`apercu.png`

C'est le **lien « Aller au contenu » (`.skip-link`)**, pas la barre du loader. Et ce n'est pas 2 px mais **5 px de haut sur 163 px de large**.

Preuves :
- Analyse des pixels de `gabarits/ardoise/apercu.png` (1440 × 900) : les lignes y = 0 à 4 sont `#F3F1EA` (craie, la couleur du fond du skip link) de x = 51 à x = 213 ; à y = 5 le pixel vaut `#5C5F5C` (anti-crénelage) puis fond ardoise `#2A2E2D`. La barre du loader serait jaune (`--c-accent` `#E9D064`, `base.css:239`, 2 px, centrée à `bottom: 20vh`) : rien de tel en haut.
- Mesure Playwright à 1440 × 900 : `.skip-link` rect `x 51,19 · y −40,56 · largeur 163,09 · hauteur 45,88 · bottom 5,31`, `top: 51.2px` (= `--gutter`), `transform: translateY(−91,75 px)`. La boîte déborde de 5,3 px dans la fenêtre. À 390 px : `bottom −27,2` donc invisible. Capture `.shots-ardoise-revue/skip-1440.png`.
- Cause : `engine.css:35-40`, `top: var(--gutter)` + `transform: translateY(-200%)`. Le décalage ne dépasse la boîte que si `gutter < hauteur du lien` (~45 px) ; le gutter vaut `clamp(1.5rem, .5rem + 3vw, 4rem)`, donc dès ~1230 px de large (gutter 51 px à 1440) le lien dépasse. Son `z-index` (`--z-loader + 1`) le place au-dessus du loader : il est visible dès le premier paint (`d-00-firstpaint.png` de chaque page, trait blanc en haut à gauche).

## Findings (triés par gravité)

### F0 (bloquant) : aucun

### F1 (majeur)

**F1-1 · Skip link visible en permanence sur grand écran (trait craie de 5 × 163 px en haut à gauche de chaque page, y compris dans `apercu.png`, la vignette de la galerie).**
Fichier : `src/styles/engine.css:35-40`. Preuve : voir ci-dessus (pixels d'`apercu.png`, rect mesuré, `d-00-firstpaint.png` des 7 pages). Correction attendue : masquer hors écran sans dépendre du gutter, par exemple `top: 0; transform: translateY(-100%)` + `translateY(calc(-100% - var(--gutter)))`, ou `top: var(--gutter); transform: translateY(calc(-100% - var(--gutter) - 2px))`, gardant `:focus-visible { transform: none }` ; puis rebuild, recopier `apercu.png` (le rebuild l'efface de `dist/`) et recapturer l'aperçu : plus aucun pixel craie sur les lignes 0 à 4.

### F2 (mineur)

**F2-1 · Loader trop long : 3,2 s desktop (`loaderMs 3196`), 3,1 s mobile (`3129`)** pour une limite de 2,6 s. Le LCP reste bon (396 ms desktop, 1228 ms mobile) car le contenu est peint dessous, mais le visiteur attend 3 s devant « LES POTES AU FEU 00 » (`d-00-firstpaint`). Correction : plancher du loader à ≤ 2,2 s (ou loader réservé à la première visite, ce qui évite aussi de le rejouer). Noté comme comportement voulu dans `agents/lecons.md` (socle) : à arbitrer, mais hors seuil.

**F2-2 · Mot géant « SALLE » rogné à gauche pendant le défilement (`/salle/`).** Mesure : `[data-mots] li` atteint `left = −60 px` (à 390 px comme à 1440 px) et `right = 408 px` à 390 px ; capture `.shots-ardoise-revue/salle/m-02-scroll.png` (le « S » est coupé par le bord). `overflowX` reste `false`. Correction : borner la dérive de chaque mot (amplitude ≤ marge du `.wrap`, soit ≥ 0 et ≤ largeur de viewport) dans le calcul de glissement.

**F2-3 · Vignettes grises vides sur mobile : ~la moitié des lignes d'ardoise** (« Mises en bouche », « Fromage… », « Verre de vin », « Eau, café, thé », etc.) montrent un carré gris uni de 56 px (`m-02-scroll` de carte et accueil). Cahier : « vignette inline à gauche, 56 px » ; une case sans photo n'est pas une vignette. Correction : n'afficher la vignette que si `apercu` existe (la ligne reprend alors l'espace), ou lui donner un vrai contenu.

**F2-4 · « de Les Potes au Feu » dans 4 meta descriptions** (`carte`, `formules`, `salle`, `404`) : « La carte de Les Potes au Feu », « La salle de Les Potes au Feu », « Les formules de Les Potes au Feu », « site de Les Potes au Feu » (il faut « des Potes au Feu » ; `reservation` utilise « chez », correct). Fichiers : `src/pages/carte.astro:7`, `formules.astro:7`, `salle.astro:9`, `404.astro:6`. Correction : champ `site.nomAvecDe` (« des Potes au Feu ») ou reformuler sans article (« Restaurant Les Potes au Feu à Namur : … »).

**F2-5 · Tableau d'horaires mobile : « 19:00 à 21:00 » et « 12:00 à 14:00 » se coupent sur deux lignes** (`reservation/m-04`, `m-05`, accueil). Colonne trop étroite alors que la colonne jour est large. Correction : `white-space: nowrap` sur les cellules d'horaire et `font-variant-numeric: tabular-nums`, colonne jour en `auto`.

### F3 (finition)

**F3-1 · « fermé , privatisation possible » : espace avant la virgule dans la ligne du samedi** (`reservation/d-03`, `m-05`). La note vient de `h.note` (« fermé, privatisation possible », sans espace) : l'espace est donc introduit par le rendu (mots découpés en `<span>` ?). À vérifier dans `index.astro:104`, `reservation.astro:44`.

**F3-2 · LCP mobile de `/formules/` à 2,43 s** (`p.formule__desc`, seuil 2,5 s) : ne pas laisser un `data-reveal` sur le premier paragraphe visible.

**F3-3 · `audit.mjs` : 0 FAIL, 15 WARN.** Tous bénins : phrases « répétées » (bandeau défilant dupliqué, lignes d'exemple identiques entre accueil et carte), robots.txt et sitemap cherchés à la racine de l'origine (normal sous `base`), « 404 sans h1 » concerne la 404 de l'origine `dist/` ; la vraie `404.html` a un `h1` « Effacé », `lang="fr"`, un titre, des liens de retour. `skipLinkFirst: false` est un faux négatif connu (« Aller au contenu » est bien le premier arrêt).

## Contrôles passés (preuves)

- Build : présent et cohérent (dist 12:31, aperçu 12:32).
- Console : 0 erreur, 0 requête en échec sur les 7 pages ; 0 lien interne mort (tous les `href="/gabarits/ardoise/…"` répondent 200).
- Axe : 0 violation sur accueil, carte, formules, salle, histoire, réservation (les 2 violations du rapport « 404 » concernent la page d'origine `dist/404`, pas le gabarit).
- Débordement horizontal : aucun (desktop et mobile 390 px, 7 pages) ; `smallTargets: []`.
- Reduced motion : `hiddenText: 0`, `moving: false` sur les 7 pages ; clavier : pas de piège, focus visible.
- `<html lang="fr">` partout ; un seul `h1` par page ; `meta robots noindex, nofollow` ; mention « Maquette KYW, certaines données sont illustratives » (1 occurrence par page) ; signature KYW dans le pied de page ; JSON-LD présent.
- Exactitude : horaires, prix, adresse, Zenchef (`rid=379477`), Facebook, YouTube, bons cadeaux, citation Michelin conformes à `donnees.json`. E-mail `bonjour@lespotesaufeu.be` marqué `placeholder: true` (le dossier dit « pas d'adresse e-mail publique »). Lignes d'exemple (cartes, suggestions, avis, rôles de Sara et Jordan) portent une pastille « exemple » / « illustratif ». Jour fermé (samedi, jour de la revue) : phrase réelle, sans pastille.
- Mobile 390 px : composition pensée (nom, suggestion, onglets sticky, vignettes inline), burger absent mais navigation courte en en-tête.

## Ce qui est bien (à ne pas casser)

1. **La carte comme accueil** : lignes nom / description / prix tabulaire alignés à droite, filets fins, craie jaune au survol (`h-*` de l'accueil), lisibles d'un coup d'œil à 1440 px comme à 390 px.
2. **Honnêteté des données** : le menu unique réel (67 €, 4 services) est séparé des lignes d'exemple, chacune marquée ; le samedi fermé affiche la vraie phrase, sans pastille.
3. **Technique propre** : LCP desktop 0,2 à 0,4 s, CLS 0, 0 violation axe, 0 débordement, reduced-motion sans texte caché, thème clair (salle, réservation) qui contraste bien avec l'ardoise et mots géants de la salle efficaces.

## Pour la passe 2

Corriger F1-1 (et recapturer `apercu.png` : relire ses lignes 0 à 4), puis F2-1 à F2-5. Après rebuild : recopier `apercu.png` dans `dist/gabarits/ardoise/`, contrôler à 1440, 1280 et 1024 px qu'aucun trait n'apparaît en haut à gauche, et relancer `pnpm index` si la galerie en dépend.
