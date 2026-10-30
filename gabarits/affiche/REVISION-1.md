# Révision 1 · gabarit affiche · Les Potes au Feu

Entrée : `REVUE-1.md` (verdict A_CORRIGER). Build `node scripts/build-site.mjs gabarits/affiche` OK (6 pages).
Preuves : captures en série `.shots-affiche-rev/<page>/` (accueil, reservation, a-emporter, histoire, 404 ;
carte touchée seulement par les changements globaux, vérifiée par script), planches `.shots-affiche-rev/p-acc-res.png`
et `p-reste.png`, vérification Playwright ciblée (mots coupés, débordement, focus du disque, durée du loader, LCP).

Bilan : 15 findings · 12 corrigés · 3 refusés (faux positifs ou rien à faire) · 0 impossible ; + 1 défaut hors revue corrigé (texte du disque).

| Finding | Décision | Changement (fichier) | Preuve |
| --- | --- | --- | --- |
| F1-1 disque CTA hors écran au focus | corrigé | `src/motion/drivers.ts` (galerie : `focusin` qui recale la piste épinglée via `jumpTo` + fin du scrub) ; `src/engine/scroll.ts` + `index.ts` (export `jumpTo`) ; `base.css` (`.galerie__fin` `scroll-snap-align: center` en mobile, le snap ramenait la piste sur la dernière carte) | Tab jusqu'au disque : desktop `left 1184, top 216` dans 1440×900 (avant 3504) ; mobile `left 270, right 342` dans 390 (avant 420) ; `disque-focus-desktop.png`, `disque-focus-mobile.png` ; `keyboard.invisibleFocus` = 0 sur les 5 pages |
| F1-2 césures au milieu des mots (390 px) | corrigé | `src/engine/reveal.ts` (`chars` découpé en `lines,words,chars` : lettres dans des mots insécables) ; `base.css` (`.display` `overflow-wrap: normal; hyphens: manual` ; mobile ≤ 767 px : `--t-mega` et nom du hero plafonnés à 9,5vw) | Script : 0 mot sur 2 lignes ni hors vue sur les 6 pages en 390 (avant : RÉSERVER, HORAIRES, EMPORTER, COMMANDER) ; `reservation/m-01-hero`, `m-03-scroll`, `a-emporter/m-01-hero`, `m-05-scroll` |
| F1-3 performance mobile (LCP, fps) | corrigé | accroches du hero (`.hero__baseline` accueil/reservation/404, `.lead` carte/histoire/a-emporter) peintes au premier rendu sous le rideau, plus de reveal d'intro ; loader raccourci (F2-1) | Shoot mobile (4x CPU, 4G, en série) : LCP accueil 1 132 ms (avant 8 840), reservation 1 192 (6 316), 404 1 380 (6 256), histoire 1 100 ; a-emporter 5 024 avant le retrait du reveal du `.lead`, puis LCP `.lead` à 204 ms (carte 172 ms) mesuré sans throttle ; scrollFps accueil 48 (avant 19) |
| F1-4 contrastes axe serious | corrigé | `base.css` : sur rouge/vert, `.exemple` devient une puce crème (ink sur crème) et `.ui.affiche__chapeau` passe à 1,25 rem 700 (règle dure « texte large » de DESIGN.md, palette inchangée) ; `.exemple` sans opacité 0,8 | axe : 0 violation sur accueil, reservation, a-emporter, histoire, 404 |
| F2-1 loader > 2,6 s | corrigé | `src/engine/loader.ts` (plancher 1,1 → 0,7 s) ; `src/motion/setup.ts` (sortie 0,5 + 0,9 s → 0,35 + 0,6 s, stagger 0,05) | sans charge, de la navigation à `is-loaded` : 2,2 à 2,6 s sur les 6 pages (avant 3,1 à 3,4) ; `loaderMs` desktop du shoot 2 292 à 2 597 ; le mobile throttlé 4x reste à 4,3 à 4,8 s (CPU ralenti) |
| F2-2 « LES POTES » contour coupé en mobile | corrigé | `base.css` (`.display.hero__nom` plafonné à 9,5vw ; la règle `.hero__nom` plus bas l'emportait sur un sélecteur simple) | script : bord droit du mot 403 → dans 390 ; `accueil/m-01-hero` |
| F2-3 accent de ARRACHÉE (et RÉSERVER) rogné | corrigé | `src/styles/engine.css` (`.display .split-line` : `padding-top 0.16em; margin-top -0.16em`, place pour l'accent dans le masque) | `404/d-01-hero`, `m-01-hero` : ARRACHÉE accentué ; `reservation/m-01-hero` : RÉSERVER |
| F2-4 cible « Réalisé par » < 24 px | corrigé | `base.css` (`.kyw-footer__link { min-height: 24px }`, surcharge locale, paquet partagé intact) | `smallTargets` = 0 desktop et mobile sur les 5 pages |
| F2-5 `skipLinkFirst: false` | refusé | aucun | faux négatif connu (lecons.md) ; « Aller au contenu » est le premier arrêt (`accueil/k-01-focus`) |
| F2-6 marquee qui superpose des mots | corrigé | `src/motion/drivers.ts` (demi-largeur re-mesurée après `document.fonts.ready` et au resize : la boucle sautait sur une largeur mesurée avant la police) | `accueil/k-01-focus`, `k-02-focus` recadrés : « …DÉGUSTATION, 4 SERVICES 67 € • FORMULE 3 SERVICES… » sans chevauchement |
| F3-1 overflowX constructeur | refusé | aucun | non reproduit par la revue ; `overflowX: false` desktop et mobile sur les 5 pages re-capturées, `scrollWidth` 390 sur les 6 |
| F3-2 apostrophe droite 404, virgule de l'adresse | corrigé | `src/pages/404.astro` (’ partout) ; `src/pages/reservation.astro` (« Avenue de la Plante 4, » puis « 5000 Namur ») | `404/m-01-hero` « n’est plus collée » ; `reservation/m-05-scroll` « AVENUE DE LA PLANTE 4, 5000 NAMUR » |
| F3-3 mention « Maquette » doublée, colophon superflu | corrigé | `src/components/Footer.astro` (bloc colophon supprimé ; une seule mention, portée par `KywFooter note=…` : « Maquette KYW, certaines données sont illustratives (marquées « exemple » ou « illustratif »). ») | `accueil/m-06-scroll`, `d-07-scroll` : une seule ligne, plus de « Caractère Archivo… » |
| F3-4 portrait de Sara = photo de cocktails | corrigé | `src/data/site.ts` (photo retirée : aucune photo de Sara dans le dossier client ; cadre à initiale comme Jordan) | `histoire/d-04-scroll` : cadres « S » et « J » |
| F3-5 hover accueil sans changement CSS | refusé | aucun | faux positif : le remplissage des `.btn` est sur `::before` (`scaleY`), invisible au détecteur mais rendu (la revue note elle-même « réponse en pixels ») |
| Hors revue : texte circulaire du disque qui se chevauche (« RÉSERVERRÉSERVER ») | corrigé | `src/components/Disque.astro` (`textLength="236" lengthAdjust="spacingAndGlyphs"`, circonférence 2π×38) | `disque-focus-desktop.png` après rebuild |
| Ce qui est bien (intégrité, hygiène, DA) | conservé | aucun changement de palette, de typo ni de motion hors timings du loader | 0 erreur console, 0 requête en échec, noindex et mention présents |

Décisions de design reportées dans `DESIGN.md` (révision 1) : timings du loader, accroche non révélée, plafond mobile
9,5vw des titres géants, puce crème pour « exemple » sur rouge/vert, pied sans colophon, Sara sans photo.

Publiable : oui, pour le gabarit (aucun F0/F1 ouvert). Reste à surveiller : loader mobile throttlé ~4,5 s (CPU 4x).
