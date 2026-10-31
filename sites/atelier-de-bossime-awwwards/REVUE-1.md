# Revue awwwards · L'Atelier de Bossimé · passe 1
Verdict : A_CORRIGER

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : le mot « bossime » en immense, bord à bord, dont le é gagne ses trois accents corail au fil de la lecture (un par chapitre), et ces trois traits reviennent partout (nombre de Moments sur la carte, trois façons de réserver, 404 « qui a perdu ses accents »).

Mise en service : `build-site.mjs` réussit (5 pages, `dist/` inchangé après rebuild, `git status` propre sur `dist/atelier-de-bossime/awwwards`). Serveur sur le port 4631 (mon PID, arrêté par `kill`), 5 `shoot.mjs` lancés en série (accueil avec `--nav`, carte, histoire, réservation, 404.html), `audit.mjs`, 173 URL internes extraites du HTML et du `srcset` puis testées au `curl` : 0 non-200. Mesures complémentaires par mini-scripts Playwright (`launch()` de browser.mjs) à 390, 1440, 1280, 1024 et 820 px.

## Scores /10
- Design : 8. Mot géant bord à bord (`home/d-01-hero`), grand é à accents qui s'allument (`home/d-03`, `d-04`), pied de page à mot complet (`home/d-07`), palette aubergine, grès et corail tirée du logo ; défauts de finition seulement (guillemets coupés, vides de l'histoire).
- Usabilité : 8. Menu mobile, 12 arrêts clavier, focus visible partout, `smallTargets` vide ; mais le bouton principal de la page réservation est sous le pli à 1440×900 (`reservation/d-01-hero`).
- Créativité : 8,5. Concept ancré dans le logo réel, qui ne peut pas déménager ; il survit jusqu'à la carte (traits par Moment, `carte/d-02`) et à la 404 (`404/m-01-hero`).
- Contenu : 7. Faits, prix et horaires exacts, aucun avis ni chiffre inventé ; mais une phrase affirmée sans source (F1-2), une restriction du client omise (F1-1) et une typographie française sans espaces insécables.
- Technique : 9. Console 0 erreur, requêtes en échec 0, axe 0 violation (5 pages), CLS 0 partout, LCP desktop 128 à 168 ms, LCP mobile throttlé 1 068 à 1 196 ms, 60 FPS desktop et mobile, pas de loader, 0 débordement (scrollWidth = viewport à 390/820/1024/1280/1440), un seul `h1` par page, `lang="fr"`, landmarks, JSON-LD `Restaurant` complet.

Conditions de PUBLIABLE : build OK, 0 console, 0 lien mort, 0 débordement, 0 violation axe, mention + logo KYW + noindex présents sur les 5 pages (`grep -c noindex` = 1 par page, `noindex, nofollow` conforme au prompt de variante) : tenues. Bloquent la publication : F1-1 (écart avec la page carte du client) et F1-2 (affirmation non sourcée). Aucun F0.

## Findings (par gravité)

### F0 (bloquant)
Aucun.

### F1 (majeur)

**F1-1 · T-faux possible : le menu 3 Moments est présenté « midi et soir » sans restriction.** `src/data/site.ts:109-112` (intro « Midi et soir. » et ligne « 3 Moments, 68 € »), repris dans `<meta description>` de la carte. La page carte du client (`data/restaurants/atelier-de-bossime/site-actuel/pages/carte/page.html`) écrit « Menu 3 Moments - 68 € ( sauf vendredi et samedi soir ) ». `donnees.json` dit « Soir (lundi-samedi) et midi » : les deux sources se contredisent et le site retient la plus large sans le dire. Preuve : `carte/d-02-scroll`, `carte/d-03-scroll`. Correction attendue : ajouter « sauf vendredi et samedi soir » à la ligne 3 Moments (source : page carte du client) et le noter dans `RAPPORT.md` comme écart `donnees.json` / site du client ; ne pas écrire « midi et soir » pour les trois formules.

**F1-2 · T-invente : « Ces assiettes ne sont plus à la carte ».** `src/pages/index.astro:86` (« Le livret change avec le potager. Ces assiettes ne sont plus à la carte : elles montrent la main de la cuisine, pas le menu de ce soir. »). Rien dans le dossier ne dit que ces cinq assiettes (tartelette, concombre, sauce rouge, poireau, tuile de chocolat) ne sont plus servies ; la source indique seulement que la cuisine évolue au rythme des saisons. Preuve : `home/d-05-scroll`, `home/m-04-scroll`. Correction attendue : « Le livret suit les saisons et le potager. Ces assiettes sont des photos de la maison : elles montrent la main de la cuisine, pas le menu du jour. » (rien sur ce qui est encore servi).

### F2 (mineur)

**F2-1 · Guillemet ouvrant coupé sur les deux citations de marque.** Le « d'ouverture n'est qu'un éclat de 4 px au bord gauche, le « » » fermant est détaché. Cause : `text-indent: -0.42em` + `padding-left` sur un titre en `data-split="lines"` (SplitText met chaque ligne dans un masque qui coupe le débordement). `src/styles/site.css:156` (`.devise__phrase`, accueil, « Remettre la ferme au milieu du village. ») et `src/styles/site.css:301` (`.maxime__phrase`, `histoire.astro:65`). Preuve : captures au repos après 3,5 s (desktop 1440 et mobile 390 pour l'accueil, desktop pour l'histoire), `histoire/d-05-scroll` et `histoire/m-04-scroll`. Correction attendue : retirer le retrait négatif et poser le guillemet dans un `<span>` en `margin-inline-start: -0.42em` hors du masque, ou `overflow: visible` sur la ligne ; vérifier à 1440 et 390 px.

**F2-2 · Typographie française : aucune espace insécable avant « : ; ? ! ».** 58 occurrences dans `src/pages/*.astro` et `src/data/site.ts`, 0 avec U+00A0 ou U+202F (seul « € » et « h » en reçoivent). Conséquence visible : `home/d-02-scroll` montre « …l'ancien fenil » à la fin d'une ligne et « : cuisine ouverte… » en tête de la suivante (`index.astro:42`). Correction attendue : remplacer « mot : » par « mot : » (idem « ; ? ! » et espace avant « » », après « « ») dans les pages et dans `site.ts`, y compris `<meta description>` et JSON-LD si pertinent. Les mots coupés par SplitText doivent garder l'insécable dans le même `<span>` (voir `agents/lecons.md`, 2026-10-31 réviseur-site portfolio).

**F2-3 · « L'eau, 12 € » affiché sans réserve.** `src/data/site.ts:126`. Le dossier note « libellé du site « Eau l : 12 € », volume inconnu (à confirmer) ». Une eau à 12 € sans volume ressemble à une faute de frappe et sera lue comme telle. Preuve : `carte/d-04-scroll`. Correction attendue : « L'eau, 12 € » + `placeholder: true` avec la pastille « à confirmer » du site, ou « L'eau (volume à confirmer) ».

**F2-4 · Réservation : le bouton principal est sous le pli à 1440×900.** Les trois cartes (« En ligne », « Par téléphone », « Par e-mail ») commencent à y ≈ 855 px et leurs boutons passent sous 900 px (`reservation/d-01-hero`) ; le grand hero de trois traits laisse ~200 px vides au-dessus. L'en-tête « Réserver » de cette page renvoie vers elle-même. Correction attendue : remonter les trois cartes (réduire `.ph--resa` en hauteur, `site.css:317`) pour que « Réserver en ligne » soit visible à 1440×900 et 1280×720 sans défiler.

**F2-5 · Histoire : texte de lecture à 14 px et vides importants.** Mesure à 1440 px : 12 éléments de texte à 14 px et 7 à 13 px sur `/histoire/` (récit des chapitres, légendes) pour un h1 de 286 px de haut. Les colonnes de texte (`.recit__texte`, `site.css:293-296`) sont étroites et collées à des trous de 300 à 400 px (`histoire/d-02-scroll`, `d-03-scroll`, `d-04-scroll` ; mobile `m-02-scroll`, `m-03-scroll`). Correction attendue : récit en `--t-m` (≥ 17 px comme la carte), élargir la colonne, réduire les marges entre chapitres.

### F3 (finition)

**F3-1 · Détails de légende ou d'alt non étayés.** `src/lib/photos.ts:41` : « une table de quatre » (la photo montre deux convives, le dossier dit « une table ») ; `photos.ts:47` : « Tomates du potager » (le dossier : « Tomates et fleur de bourrache ») ; `histoire.astro:15` : « côté cour » ; `histoire.astro:38` : « Le restaurant n'a jamais quitté la ferme » ; `site.ts:99` : « Servi en une heure si vous le demandez en arrivant » (le client : « Servi en 60 minute sur demande »). Neutraliser ou sourcer. Lunch 2 services : le site écrit « deux plats », la page du client « trois plats » (probable coquille du client) : à signaler dans `RAPPORT.md`.

**F3-2 · Omissions utiles pour le public cité (familles, couples).** Le « menu jeune gastronome 39 € (jusqu'à 14 ans) » et les accords mets et vins (22 à 58 €, sans alcool 20 à 46 €) figurent sur la page carte du client et manquent à `/carte/` ; la restriction du 7 Moments est bien reprise.

**F3-3 · E-mail affiché sans marque d'illustration.** `site.ts:26-27` porte `emailPlaceholder: true` mais `reservation/d-02-scroll` et le JSON-LD affichent `info@bossime.be` sans mention (la bande « Maquette KYW » couvre le cas globalement ; acceptable si l'e-mail est confirmé).

**F3-4 · `dist/` pèse 13 Mo dont 5,4 Mo de 23 JPG d'origine jamais référencés** (`_astro/ferme.*.jpg` 448 Ko, `salle-soir.*.jpg` 406 Ko, `table-brique.*.jpg` 370 Ko…, aucun lien dans les HTML, CSS ou JS). Vercel sert `dist/` tel quel : poids de déploiement inutile. Correction attendue : ne pas émettre l'original (import des images en `?url` non utilisé ou nettoyage post-build) ; les pages elles-mêmes restent légères (accueil ≈ 688 Ko, images 529 Ko d'après `audit.mjs`).

**F3-5 · Aperçu au survol de la carte.** L'image qui suit le pointeur recouvre la colonne de description et la fin des traits du 7 Moments (`carte/d-04-scroll`). Décaler l'aperçu à droite des prix ou le limiter à la zone vide.

**F3-6 · Hero à 1280×720.** Les boutons sont calés pile sur le bord du viewport (bas à 720 px), la photo est coupée à 815 px ; à 1440×900 la légende de la photo (« Velouté vert… ») est rognée par le pli (`home/d-01-hero`). Remonter le hero de ~40 px (ou plafonner le mot géant en `svh`).

**F3-7 · 404.** `<link rel="canonical">` de la 404 pointe vers `/atelier-de-bossime/awwwards/404/` (page inexistante) ; texte du hero desktop à 14 px sous un titre de 49 px (`404/d-01-hero`), alors que le mobile est bien composé (`404/m-01-hero`). `audit.mjs` : « 404 page has no h1 » est un faux positif (sonde l'origine) ; robots.txt et sitemap : WARN normaux sous `base`.

**F3-8 · Mouvement au repos et survols documentés.** `idleMotion` false sur la carte et l'histoire (décision écrite dans RAPPORT.md) ; `hover.covered` sur la marque (accueil, carte, réservation) et `noHoverChange` sur la marque de l'histoire : faux positifs, vérifiés par `wheel +1500 puis -600` puis `elementFromPoint` (la marque reçoit le clic, `frame-away` retiré). `colorOnly` « La carte » : l'accent corail est bien tracé (`home/h-05-hover`).

## Ce qui est bien (à ne pas casser)
1. Le concept des trois accents : cohérent du hero à la 404, jamais décoratif (nombre de traits = nombre de Moments sur la carte, `carte/d-02-scroll`), et lisible sans explication.
2. La rigueur factuelle : prix, horaires, adresse, téléphone, lien Zenchef et Facebook exacts, aucun avis ni distinction inventé, étoile verte et Gault&Millau cités sans année douteuse, 2011 retenu et assumé.
3. La technique : LCP mobile ≈ 1,1 s, CLS 0, 60 FPS mobile throttlé, axe à 0, focus visible partout, reduced-motion sans texte caché (`hiddenText` 0), hovers distincts par rôle (CTA plein/contour inversés, nav à accent, liens soulignés corail, `home/h-*`).

## Hypothèses prises
- `noindex, nofollow` et lien sitemap acceptés : exigés par le prompt de variante (voir `agents/lecons.md`, 2026-10-31 réviseur-site awwwards).
- Critique d'auto-notation du producteur non reprise ; scores ci-dessus issus de mes mesures et captures. Pas de sous-agent critique indépendant disponible dans cette session.
- Mesures de survol et de clavier lues dans les `report.json` ; les deux faux positifs `covered` tranchés par script.
