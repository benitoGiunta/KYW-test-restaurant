# ETAT · Sanga · variante awwwards · construction-3 (phase 3)

## Fait (phase 1)
- Concept 山河, système, scaffold Astro 5, engine sans GL, 5 pages, polices, favicon, OG : voir `DESIGN.md` points 1 à 18.

## Fait (phase 2)
- Signature « le fil de l'eau » : `src/motion/fleuve.ts` (module pilote, une variable : le niveau de l'eau en px, lu sur `scrollY` à 62 % de l'écran, gsap.ticker seul, pause hors écran). L'eau vermillon descend le fleuve (`.fleuve__eau`, `clip-path`), le sceau flotte à sa pointe et penche vers le pointeur, le sceau de chaque strate se remplit quand l'eau l'atteint (`.is-atteinte`). Repos : courant de tirets qui coulent (929 px changés en 1,5 s mesurés à 1440 × 900). Intro : l'eau descend de la source (1,8 s), la photo du hero se pose.
- `src/motion/idle.ts` (entrée de repos de motion.md), `src/motion/menu.ts` (menu plein écran du téléphone), `src/motion/setup.ts` (crue + appels).
- Révélations : `data-split="lines"` sur tous les h2 display, `data-split="chars" data-intro` sur le kanji des pages intérieures, `data-reveal="clip"` sur les photos (le niveau monte), `data-reveal="up"` sur les lignes de l'index et les listes de plats. Aucun reveal sur un bloc à lien. h1 et accroche du hero jamais cachés.
- Survols : CTA et liens texte se remplissent du bas vers le haut, nav et sommaire en filet ; `:focus-visible` et `:active` partout ; lien du pied KYW souligné au survol.
- Mobile 390 : bouton « Menu » (`aria-expanded`), overlay plein écran, focus piégé, Échap, focus rendu (mesuré). En-tête : marque, « Réserver », « Menu » à 44 px ; `scrollWidth` 390.
- Hero bureau : kanji plafonné à 33 svh et photo à `100svh - 14rem` : CTA en bas à 881 px (1440 × 900) et 694 px (1280 × 720), dans l'écran.
- Mouvement réduit mesuré : pas de `.motion`, pas de Lenis, fleuve animé masqué (fleuve statique des strates et sceaux pleins), 0 élément caché.
- Build : `scripts/q.sh sanga-aw2-build pnpm build:site sites/sanga-awwwards` passe (5 pages) ; `DESIGN.md` points 19 à 41 cochés avec preuve, 36, 39, 47 partiels.

## Reste (phase 3)
- QA complète (agent captures) : `report.json` pour `idleMotion`, `hover.noHoverChange`, `reduced.*`, cibles, contraste ; points 35, 36, 39, 44, 45, 47 puis 42 à 63 ; RAPPORT.md ; jury en auto-notation `self`.
- Vérifier le LCP des pages intérieures (kanji 山河 en `data-intro` : s'il est l'élément LCP et retarde trop, retirer `data-intro`/`data-split` du kanji).
- Contraste du vermillon `#e8512f` sur indigo (4,6:1) et du sceau de l'en-tête (phase 1, toujours à vérifier).
- `pnpm index` relancé après le build de phase 2.

## Décisions
- Pas de loader, pas de GL, pas de curseur suiveur (phase 1, maintenu).
- Aperçu photo au curseur sur l'index abandonné (une seule photo de ramen, lignes sans destination).
- L'immobilité au repos de la phase 1 est remplacée par le courant du fleuve (objet du concept).
- CTA : remplissage du bas vers le haut (niveau qui monte) au lieu de gauche à droite.
- Le fleuve animé vit dans `<main>` (`Base.astro`, `[data-fleuve]`) : il s'arrête à la crête du pied, qui reste la composition finale.

## Pièges
- `--t-kanji` doit rester petit : à 34 vw le kanji passait à la ligne. Le hero en bureau est plafonné en `svh` (kanji et photo) pour garder les CTA dans l'écran.
- Le niveau de l'eau se lit par `scrollY + innerHeight × 0,62 - haut du fleuve` : mesures refaites à chaque `ScrollTrigger` refresh et au redimensionnement.

## Fait (phase 3)
- QA sur preuves : axe, cibles tactiles et survols corrigés (voir RAPPORT.md), build passe, audit 0 FAIL / 1 WARN justifié.
## Reste
- Passe jury indépendante (critique neuf), relecture des contrastes à vérifier, confirmation client des données.

## Relecture passe 1 (relecteur-site)
- Fait : `REVUE-1.md` écrit (verdict A_CORRIGER : 0 F0, 1 F1 réservation inventée, 2 F2, 7 F3). QA-revue1.md absent, captures de l'accueil réutilisées, reste mesuré par scripts maison.
- Reste : la révision traite F1-1 (page « Réserver » → « Venir », retirer « table ») puis F2-1, F2-2 (320 px) et F3 ; revue passe 2.
- Pièges : `data-reveal="clip"` écrase le `clip-path` crête (404) ; la photo « 404 » du sommaire en défilement horizontal n'est pas un débordement.

## Relecture passe 2 (relecteur-site)
- Fait : `REVUE-2.md` écrit (A_CORRIGER : 0 F0, 0 F1, 1 F2 « Une table ? » en fin de carte, 3 F3). Toutes les corrections de REVISION-1 vérifiées (grep dist, axe, 6 largeurs, 404, survol).
- Reste : retitrer `carte.astro:63`, sortir « (orthographe rectifiée) » des guillemets, option « Venir » dans la nav de bureau.
- Pièges : QA-revue2.md absent (captures de l'accueil seulement), mesures par scripts maison.
