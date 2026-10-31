# Révision 1 · gabarit Ardoise · réponse à REVUE-1.md

Build : `node scripts/build-site.mjs gabarits/ardoise` OK (7 pages). `apercu.png` recapturé (`capture-site.mjs … --frames 3`,
`desktop-haut.png`) et recopié dans `dist/gabarits/ardoise/` (fichiers identiques, `cmp`). Vérifications : serveur
`serve.mjs dist --port 4437` (arrêté par `kill <PID>`), script Playwright (Chromium `/opt/pw-browsers/chromium`),
captures dans `.shots-ardoise-rev/<page>/`.

Bilan : **9 corrigés, 0 refusé, 0 impossible** (F3-3 : constat sans action, voir tableau).

| Finding | Décision | Ce qui a été changé (fichier) | Preuve de vérification |
| --- | --- | --- | --- |
| F1-1 skip link visible ≥ 1230 px | corrigé | `src/styles/engine.css` : `.skip-link` masqué par `translateY(calc(-100% - var(--gutter) - 4px))` au lieu de `-200%` ; `:focus-visible { transform: none }` conservé | Rect mesuré : `bottom −4,0 px` à 1440, 1280, 1024 et 390 px. Au Tab : visible (`top 51,2 · bottom 97,1`, focus actif), `accueil/d-skip-focus.png`. `apercu.png` : 0 pixel clair sur les lignes 0 à 5 (pixels x 60/130/200 à y 2 = `#2A2E2D`) ; capture regardée. |
| F2-1 loader 3,2 s | corrigé | `src/engine/loader.ts` : plancher `MIN` 1,1 → 0,7 s ; `src/motion/setup.ts` (sortie) : fondu 0,35 → 0,25 s, rideau 0,8 → 0,5 s | `is-loaded` à 2 152 ms desktop, 2 057 ms mobile depuis le début de navigation (avant 3 196 / 3 129) : sous 2,2 s. |
| F2-2 « SALLE » rogné | corrigé | Cause réelle en plus de la dérive : `.mots { margin: … 0 0 }` annulait le `margin-inline: auto` de `.wrap` (liste collée au bord gauche, sans gutter). `src/styles/base.css` : `margin: … auto 0` + `.mots { overflow-x: clip }` ; `src/motion/setup.ts` `motsGeants()` : dérive bornée vers l'intérieur (mot 1 0 → +60, mot 2 0 → −50, mot 3 +35 → 0) | Boîte du texte (Range) sur tout le défilement : 35 à 358 px à 390 px, 80 à 1360 px à 1440 px ; `scrollWidth` = viewport (avant correction du clip : 418 à 390 px). `salle/m-mots.png`, `salle/d-mots.png` regardées : mots entiers. |
| F2-3 vignettes grises vides | corrigé | `src/components/Lignes.astro` : plus de `span.ligne__vignette--vide` ; classe `ligne__in--sans` sur les lignes sans aperçu ; `src/styles/base.css` : `.ligne__in--sans` en 2 colonnes (le texte reprend la place) | 0 vignette vide (accueil, carte) ; 9 et 20 vignettes réelles affichées à 390 px ; `carte/m-02-scroll.png` regardée ; `grep ligne__vignette--vide dist/` : 0. |
| F2-4 « de Les Potes au Feu » | corrigé | `src/pages/carte.astro`, `formules.astro`, `salle.astro`, `404.astro` : « des Potes au Feu » | `grep "de Les Potes" dist/gabarits/ardoise` : 0 ; meta descriptions « La carte des Potes au Feu… », etc. |
| F2-5 horaires sur deux lignes | corrigé | `src/styles/base.css` : cellules d'horaire `width: 1%; white-space: nowrap` (colonne jour auto), tnum déjà présent ; `index.astro`, `reservation.astro` : jour fermé sur une cellule `colspan="2"` | 0 cellule sur deux lignes à 390 px (accueil, réservation), hauteur max 47 px ; `reservation/m-horaires.png` regardée. |
| F3-1 « fermé , privatisation » | corrigé | Le HTML n'a pas d'espace : c'est `font-variant-numeric: tabular-nums` qui élargit la virgule. `src/styles/base.css` : `.horaires .ferme { font-variant-numeric: normal }` | `reservation/m-horaires.png` : « fermé, privatisation possible ». |
| F3-2 LCP `/formules/` 2,4 s | corrigé | `src/pages/formules.astro` : pas de `data-reveal` sur la première formule (les suivantes gardent le fondu) | LCP mobile mesuré 140 ms (`formule__desc`) ; dist : premier `<article class="formule">` sans `data-reveal`. |
| F3-3 15 WARN audit | sans action (constat) | aucun : avertissements bénins documentés (bandeau dupliqué, robots/sitemap sous `base`, 404 d'origine, faux négatif `skipLinkFirst`) | Voir REVUE-1 et `agents/lecons.md` (socle-gabarits). |

DESIGN.md : aucune décision de design changée (loader plus court mais même chorégraphie ; mots géants désormais dans la grille `.wrap`, comme prévu).
Galerie : `pnpm index` non relancé (révision sans commit ; l'orchestrateur le fera au moment de publier si besoin).
