# La Brasserie du Quai : variante awwwards

**Concept** : « La ligne d'eau ». Chaque page s'ouvre sur un quai : le titre posé sur une ligne de laiton, son reflet ondulé dans la Meuse de nuit en dessous ; le défilement fait monter le niveau et lever la houle.
**Stack** : Astro 5 + GSAP + Lenis, sans OGL (le reflet est un filtre SVG feTurbulence + feDisplacementMap, plus léger qu'un plan GL). Base `/brasserie-du-quai/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/brasserie-du-quai-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400` (racine QA : voir agents/variante-awwwards.md § 4.1).

## Scores du critique jury (passe finale, critique non lancé)

Aucun critique indépendant n'a tourné pendant cette phase : l'agent n'a pas d'outil `Agent`/`Task`, et la phase 3 du workflow est limitée à la QA (captures faites en amont par l'agent « captures »). Pas d'auto-notation chiffrée, pour ne pas inventer un score.
`/jury http://127.0.0.1:4400/brasserie-du-quai/awwwards/` re-note le site avec un critique neuf une fois les placeholders remplacés.

## QA de la phase 3 (construction-3)

Source : `QA-build.md` (planches de l'accueil, de la carte et de la 404), puis captures ciblées `.shots/home/` et `.shots/carte/` après corrections, mesure Playwright maison (recouvrements, largeur de la note).

| Défaut relevé | Correction | Vérification |
|---|---|---|
| Accueil, banc d'écailler : la vignette des huîtres recouvrait « Les plateaux, de 45 à 195 € » et les prix (desktop : colonnes 5 à 8 sur le texte en 7 à 13 ; mobile : marge négative) | `.banc__vignette` en colonnes 4 à 7 au desktop, `margin-top: 0` sous 760 px | intersection vignette/texte = false à 1440, 1024 et 390 ; capture viewport 1440 et `m-03` |
| Carte mobile, huîtres : « 6 pièces 15 € · 12 pièces 30 € » en `nowrap` écrasait le nom (« Les / Fines / de / Claire ») | une ligne par portion (`.plat__portion { display: block }`) | `.shots/carte/m-04` : nom sur une ligne, deux lignes de prix |
| Carte : note « Allergènes… » écrasée dans la première colonne (un `<p class="wrap">` est une grille : le texte devient un élément de colonne 1) | `.rive__note { display: block }` | largeur mesurée 390 px à 390, 1440 px à 1440 |
| Prix « 19 ,20 € » (virgule à chasse de chiffre avec `tabular-nums`) | `tabular-nums` retiré des prix d'huîtres et de la carte | captures : « 19,20 € » |
| axe `color-contrast` (sérieux) sur le reflet du titre, 2,47:1 (texte `aria-hidden`, décor) | reflet peint en `::before { content: attr(data-texte) }`, dessin inchangé | `a11y.serious` = 0 sur accueil et carte ; reflet visible (capture 390) |
| Titre de l'accueil 73 caractères | baseline « Brasserie et écailler sur la Meuse, Namur » (64 caractères) | audit : WARN disparu |
| Phrases répétées dans une page (pied + corps) : banc d'écailler, Michelin, adresse | pied : « Huîtres et plateaux du jeudi au lundi » ; histoire : « Une adresse retenue dans la sélection… » ; réservation : adresse reformulée | audit : 2 WARN restants (ci-dessous) |

Faux positifs de `QA-build.md`, vérifiés :
- 404 sans `h1`, sans `title`, sans `lang` : l'agent « captures » servait `dist/` sans racine de QA, le serveur renvoyait son « Not found » nu. Le `404.html` construit a `lang="fr"`, un `<title>` et un `h1` ; l'audit sur racine de QA ne signale plus rien.
- `skipLinkFirst` = false : le script ne reconnaît que `skip|#main|#content` dans le libellé ; le premier arrêt est bien « Aller au contenu » (déjà dans lecons.md).

## Mesures (passe finale, captures ciblées accueil et carte)

| Mesure | Accueil | Carte |
|---|---|---|
| LCP mobile bridé | 1308 ms | 1104 ms |
| CLS mobile | 0 | 0 |
| loaderMs | null (pas de loader) | null |
| settledMs desktop | 2518 | 2460 |
| FPS desktop / mobile | 60 / 59 | 60 / 60 |
| axe sérieux | 0 | 0 |
| Débordement horizontal mobile | non | non |
| Erreurs console / requêtes échouées | 0 / 0 | 0 / 0 |
| idleMotion | true | true |
| reduced.hiddenText / moving | 0 / false | (non relu) |

Audit (`.shots/audit.txt`, racine de QA) : **0 FAIL, 2 WARN**, justifiés :
- `/reservation/` « Midi : 12 h à 14 h 30 » deux fois : horaires d'hiver et d'été, le midi est identique (donnée réelle).
- « no sitemap » : l'audit cherche `/sitemap.xml` à la racine du serveur ; le sitemap est `/brasserie-du-quai/awwwards/sitemap-index.xml`, lié depuis `<head>`.
Poids : page la plus lourde ~758 Ko (JS 61 Ko gz, CSS 6 Ko gz, polices 105 Ko, images 581 Ko).

## Points non résolus

- [jury] Aucune passe de critique indépendant : à lancer par le superviseur (`/jury`) ou par un agent disposant de l'outil `Agent`.
- [captures] Histoire et réservation n'ont pas de planche dans `QA-build.md` (le crawl ne prend qu'une page intérieure) ; leurs corrections ne sont vérifiées que par l'audit HTML.
- [hover] Les paires `colorOnly` de QA-build (accueil : une réaction « color ») n'ont pas été relues à l'œil dans cette phase.
- [perf] Filtre SVG animé sur mobile : 59 i/s mesurés sur le téléphone bridé, pas d'action nécessaire.

## Placeholders et hypothèses (à remplacer par le client)

- `carte.ts` › catégorie Desserts (placeholder, « exemple » à l'écran, prix « à confirmer ») : Dame blanche, chocolat chaud ; Crème brûlée à la vanille ; Café gourmand.
- `site.ts` › `fermeture` : « Jours de fermeture hebdomadaire : à confirmer » (placeholder).
- JSON-LD limité à lundi, jeudi, vendredi, samedi (horaires d'hiver), faute de jours de fermeture connus.
- Lien de réservation externe = page Réservation du site actuel (module de réservation supposé).
- Année d'ouverture inconnue, jamais écrite ; nom de famille de Pierre-Alexandre non affiché.
- Notes Google/Tripadvisor et Gault&Millau non affichées ; seule la sélection Michelin Belgique 2026 est citée.

## Décisions de théâtre

Loader : non (le titre est le premier frame, LCP texte et photo). GL : non, filtre SVG `#houle` pour le reflet (30 i/s, en pause hors écran). Repos : mobile (houle au repos, `idleMotion` = true). Accessoire retiré en passe finale : aucun dans cette phase (pas de passe jury).

## Leçons structurelles

- Un `<p class="wrap">` (ou tout texte nu dans `.wrap`) devient un élément de grille de colonne 1 : la note se réduit à un mot par ligne. Recopié dans `agents/lecons.md`.
