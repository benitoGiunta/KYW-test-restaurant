# Revue awwwards · L'Essentiel · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : « le retrait », une table étoilée de Temploux dont la signature est un texte où des mots sont biffés jusqu'à « Il reste la table, le produit et la saison », en noir encre, or et brique, très typographique (Boska en titres).

Méthode et hypothèses : `QA-revue1.md`, `summary.json` et les planches annoncées sont absents du dépôt (pas de `.shots/`). Le build `dist/l-essentiel/awwwards/` (03:50) est postérieur à `src/` ; je l'ai servi sur le port 4417 (PID tué en fin de tâche) et mesuré par scripts maison : 5 pages (accueil, carte, histoire, reservation, 404.html) × 1440 et 390 px, défilement par 300 px, axe-core complet (`node_modules`), contraste canvas nœud par nœud, débordement, console/requêtes, Tab, menu, reduced-motion, liens internes, LCP/CLS sous CPU x4 + 4G lente en deux passes. Build non relancé (dist déjà à jour). Pas d'outil Agent : scores = auto-notation du relecteur, pas un jury indépendant.

Scores /10 :
- Design 8 : concept tenu de l'accueil au pied (`P-home-d.png`), rythme clair/nuit, titres Boska très dessinés, pas d'AI slop (pas de trois cartes égales ni d'eyebrow systématique). Retenue : tuile « Réserver » et colonnes de la page réservation cassées en mobile.
- Usabilité 7 : navigation courte, CTA réserver/appeler toujours visibles, menu plein écran fonctionnel (ouvert, focus sur « Accueil », fermeture à Échap), focus visible partout (outline 3 px). Retenue : F1 de mise en page et rails non focusables.
- Créativité 8 : signature « mots biffés » (hero, section Retrait, 404 « Cette page a été retirée »), repos du hero par défilé de mots retirés ; reduced-motion lisible (0 texte caché).
- Contenu 6 : faits exacts (adresse, téléphone, horaires, prix, plats, fermetures, G&M, Michelin) mais phrases de coulisses visibles, procédure e-mail et positionnement non prouvés (F1, F2).
- Technique 8 : 0 erreur console, 0 requête en échec, 0 lien interne mort (13 liens), 0 débordement horizontal, LCP mobile 1,1 à 1,3 s et CLS 0,002 à 0,017 sous CPU x4 + 4G (2 passes concordantes), h1 unique, lang fr, JSON-LD Restaurant avec adresse, horaires, geo. Retenue : axe sérieux sur les rails.

## Findings (par gravité)

Aucun F0 : build servi, 0 erreur, 0 lien mort, 0 fait faux, mention « Maquette KYW, certaines données sont illustratives » + logo KYW (`.kyw-footer__logo` = 1) + `noindex, nofollow` présents sur les 5 pages (conforme au prompt § 3.3).

**F1-1 · Texte de coulisses visible sur la page « La maison »** · `src/data/site.ts` (`histoire.accueil`), rendu `histoire.astro` · preuve : `P-histoire-m.png` (« Le site du restaurant n'en dit pas davantage : l'année d'ouverture et le parcours de la maison ne sont pas publiés ») et `equipe__role` « chef, information à confirmer ». C'est du compte rendu de recherche, pas du texte pour le client ni pour ses convives. Correction : réécrire en une phrase vraie du dossier (« Bénédicte et son équipe reçoivent dans ces salles. ») sans parler des lacunes ; pour le chef, soit retirer la ligne, soit l'afficher comme donnée illustrative sans « à confirmer » (la mention de pied de page couvre l'illustratif).

**F1-2 · Page réservation : colonnes « Adresse / Horaires » écrasées en mobile (et probablement à 768 à 1023 px)** · `src/styles/site.css:175` + règle `@media (max-width: 63.99rem) { .marge__titre { grid-column: 1 / 13 } }` · preuve : `z-all.png` (390 px) : à 390 px `.infos__col` calcule 12 colonnes implicites (`gridTemplateColumns: 101.6px 77.4px 91px 0 0…`), l'adresse (102 px), « Ouvrir le plan » (77 px) et « Une terrasse… » (91 px) sont côte à côte, les horaires s'enroulent (« 19 h à / 21 h 30 »). Cause : le `h2.marge__titre` reçoit `grid-column: 1/13` dans une colonne `display: grid`. Correction : `.infos__col .marge__titre { grid-column: auto }` (ou `.infos__col { display: flex; flex-direction: column }`), puis vérifier à 390, 768 et 1024 px. La plage 768 à 1023 px n'a pas été mesurée.

**F1-3 · axe `scrollable-region-focusable` (sérieux) sur les rails d'images mobiles** · `site.css:218` (`.bandes { overflow-x: auto }` à ≤ 47,99 rem) · preuve : axe 390 px, accueil `ul.bandes[aria-label="Plats de la maison"]` (scrollWidth 929 / 390) et histoire `ul.bandes--nuit`. Un utilisateur clavier ne peut pas faire défiler le rail. Correction : `tabindex="0"` sur le `ul` (avec `role="region"` ou `aria-label` déjà présent), focus visible conservé.

**F2-1 · « + » et « @ » presque invisibles dans le téléphone et l'e-mail** · `.gros__val`, `.pied__tel` (Boska 700) · preuve : `z-tel2.png` (le « + » de « +32 81 56 86 16 » est un trait fin gris, le « 1 » ressemble à un « I ») et `P-reservation-m.png` (« info@lessentiel.be », @ filiforme). Pour un numéro à composer, c'est une lisibilité faible. Correction : numéro et e-mail en Hanken Grotesk (ou chiffres alignés), ou « + » rendu en police de texte.

**F2-2 · Réservation par e-mail non prouvée (T-invente)** · `reservation.astro` : tuile « E-mail » dans le bloc « Réserver » et méta description « par téléphone, par e-mail ou sur le calendrier en ligne » · preuve : `donnees.json.reservation.outil` = calendrier (midi/soir, 1 à 10 couverts) et téléphone ; l'e-mail `info@lessentiel.be` est une adresse de contact, pas un canal de réservation annoncé. Correction : sortir l'e-mail du bloc « Réserver » (le garder dans « Contact ») et retirer « par e-mail » de la description.

**F2-3 · Positionnement « Nous retirons le décor, l'effet, le détour, le bruit, la mode » présenté comme parole de la maison** · `site.ts` (`retrait.biffes`), `index.astro`, 404 (« Comme chez nous, il ne reste que l'essentiel ») · preuve : `P-home-d.png`, `P-home-m.png`. Le dossier ne dit rien de tel (valeurs : « produit travaillé au plus juste de sa nature ») ; seule la baseline est déclarée `placeholder` dans le code, et rien sur la page ne signale que le discours « nous retirons la mode » est un parti pris d'agence. Correction : ancrer la phrase dans le dossier (le produit, la saison) et enlever « la mode », ou déclarer le bloc `placeholder: true` et le dire dans RAPPORT.md ; reformuler la 404 sans « Comme chez nous ».

**F2-4 · Photos de plats collées à des plats nommés sans preuve** · `site.ts` (`photo: 'entree'`, `'poisson'`, `'biche'`) rendu en vignettes de `carte.astro` · preuve : `photos/index.json` ne rattache que « croquette de petits gris » (09) ; 12 est « Entrée : poisson, légumes… », 10 « Poisson, jaune d'œuf ou beurre, fleur de bourrache », 11 « Viande rouge (type gibier) » ; vignettes placées en face de « Émincé de noix de Saint-Jacques », « Filet de sole », « Mignon de biche ». Les photos sont de 2018 (dossier). Correction : retirer les vignettes de ces trois lignes (garder petits gris) ou les déplacer en galerie sans lien avec un plat.

**F2-5 · axe `landmark-unique` (modéré) sur la page réservation** · `reservation.astro` : `section.page-tete[aria-labelledby=h1]` (nom « Réserver ») et `section.actions[aria-label="Réserver"]` ont le même nom · preuve : axe 390 et 1440. Correction : renommer l'`aria-label` (« Moyens de réserver »).

**F3-1** Dates et sources de coulisses : « Carte relevée à l'automne 2026 » en dur (`carte.astro`, le dossier dit 2026-11-07) ; « selon Rankeat » (note Google) et « fin non précisée » (dernière fermeture) citent la recherche. Neutraliser (« Carte de la saison du gibier », « sources variables »).
**F3-2** « XVIIe » sans exposant dans les textes de page (accueil, histoire ; `og.png` l'a). `<sup>e</sup>` ou `font-variant-position`.
**F3-3** `og.png` pèse 515 Ko (> 300 Ko) ; passer en JPEG/WebP optimisé ≤ 150 Ko (le visuel est bon).
**F3-4** `histoire` : `05-salle-arche` servie à 403 px pour 554 px affichés à 1440 (`imgs` du script) : ajouter une largeur 800 dans `widths` de la photo `arche`.
**F3-5** Page courante « Réserver » (`aria-current`) : double contour (carré + liseré brun) peu net en mobile (`P-reservation-m.png`). Aligner sur l'état courant des autres liens.

Écartés : contraste 1,45 des « · » du défilé (décoratif, `aria-hidden`) ; `skipLinkFirst: false` (premier arrêt = « Aller au contenu ») ; images `IMG -101..1541` (couche de parallaxe voulue) ; « NOALT » des vignettes de carte (alt vide volontaire, `decorative`).

## Ce qui est bien (à ne pas casser)
1. Signature « retrait » : mots biffés qui s'enchaînent jusqu'à « Il reste… » (accueil), reprise sobre en pied (« Reste : la table. ») et en 404 ; reduced-motion montre tout.
2. Exactitude : carte, menus (50/72/90 €), accords, fermetures (7 plages), horaires, téléphone, adresse conformes à `donnees.json` ; statut calculé du hero juste (samedi 7/11 : « Ouvert aujourd'hui, midi dès 12 h et soir dès 19 h ») ; prix et plats sans invention (descriptions absentes laissées vides).
3. Technique propre : LCP mobile 1,1 à 1,3 s, CLS ≤ 0,017 (source `hero__media`), polices préchargées, 0 erreur, menu `dialog` accessible, focus visible.
