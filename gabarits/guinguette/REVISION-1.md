# Révision 1 · gabarit guinguette (réponse à REVUE-1.md)

Date : 31/10/2026. Agent : reviseur-site. Build : `node scripts/build-site.mjs gabarits/guinguette` OK (7 pages).
Vérification : serveur `serve.mjs dist --port 4438` (PID noté au lancement, arrêté par `kill <PID>`), mini-script de mesure
Playwright à 390×844 et 1440×900 (avant / après), captures `.shots-guinguette-rev/mesure/`, shoot.mjs des 7 pages en
série dans `.shots-guinguette-rev/<page>/` (voir « Contrôle global »). `apercu.png` recapturé (gabarit et dist).

Bilan : **14 corrigés** (3 F1, 6 F2, 2 F3 + 1 défaut trouvé en vérifiant), **1 F3 refusé en partie** (F3-3), 0 impossible.

| Finding | Décision | Changement (fichier) | Preuve de vérification |
| --- | --- | --- | --- |
| F1-1 nav mobile piégée par `backdrop-filter` | corrige | `base.css` : flou et fond déplacés sur `.header::before` (`position:absolute; inset:0; z-index:-1`), `.header` en `isolation: isolate` sans filtre | 390×844 : nav `[12,31→378,78]` avant → `[12,785→378,832]` après (bas de l'écran, 12 px du bord) ; à scroll 3000 la nav reste à `top 785` (fixe au viewport) ; marque `[17,45→184,77]` et CTA `[261,41→373,81]` dégagés ; `body` garde `padding-bottom: 72px`. Captures `mesure/m-hero.png`, `mesure/m-table.png` |
| F1-2 « FERMÉ » 1,81:1 sur canard | corrige | `base.css` : `.horaires--petit .ferme` en pastille paille, texte encre (paille seul sur canard = 3,97:1, insuffisant) | couleur calculée des 2 « fermé » du pied : `rgb(239,94,71)` → `rgb(31,26,23)` sur `#f1cf6b` (≈ 12:1) ; axe du shoot (contrôle global) |
| F1-3 objets sur les boutons et le titre (mobile) | corrige | `site.ts` : champ `mx` (position mobile) pour parasol/frites/bouteille ; `index.astro` : `--mx` ; `base.css` mobile : objets en rangée `bottom` sous les boutons | 390 px : parasol `[31,544→124,637]`, frites `[159,556→240,637]`, bouteille `[281,550→367,637]` ; boutons finissent à `y 525`, h1 `[154→258]` : aucun recouvrement (19 px d'écart). `mesure/m-hero.png` |
| F2-1 survol faible (marque, nav, onglet courant) | corrige | `base.css` : marque `:hover` canard + soulignement corail tracé ; `.nav a:hover` monte de 2 px (ressort) ; `[aria-current]:hover` passe en corail | mesures 1440 : marque `rgb(31,26,23)` → `rgb(31,109,116)` + soulignement corail ; onglet `translate 0 -2px` ; onglet courant fond `rgb(31,26,23)` → `rgb(239,94,71)` |
| F2-2 contrastes résiduels (étiquette paille, `.muted` corail) | corrige | `base.css` : `.carte-avis--vraie .carte-avis__etiq` en encre ; `.section--corail { --c-muted: var(--c-ink) }` | étiquette `rgb(31,109,116)` → `rgb(31,26,23)` ; `.muted` terrasse `rgb(58,42,37)` → `rgb(31,26,23)` (≈ 5,2:1 sur corail) |
| F2-3 rail défilant non focalisable | corrige | `index.astro` : `.table__rail` `role="region" tabindex="0"`, libellé « défilement horizontal » | attributs mesurés `["0","region"]` ; axe du shoot |
| F2-4 loader trop long | corrige | `Base.astro` : `<Loader>` rendu sur l'accueil seulement ; `engine/loader.ts` : sans `#loader`, `is-loaded` posé tout de suite ; `motion/setup.ts` : sortie 0,25 + 0,5 s (au lieu de 0,35 + 0,65) | mini-script : carte 2 515 ms → 170 ms ; accueil desktop 2 735 → 2 452 ms (sous 2,6 s), mobile 2 739 → 2 492 ms ; plancher MIN 1,1 s conservé |
| F2-5 « Dimanche à la terrasse » contredit les horaires | corrige | `site.ts` : `heroTitre` « À table, / entre potes » ; avis d'exemple « vendredi midi » ; `index.astro` : h2 « La table des potes » ; `DESIGN.md` mis à jour | `apercu.png` et `mesure/m-hero.png` ; `grep -c dimanche dist/gabarits/guinguette/index.html` ne renvoie plus que les horaires |
| F2-6 badge « attrapez-moi » géant en mobile | corrige | `base.css` : le badge mobile passe en `position: relative` (en `static`, ses SVG absolus remplissaient la section `.table`), 6,5 rem ; `.badge .badge__main` 2,2 rem (la règle `.badge svg` l'agrandissait aussi en desktop) | 390 px : badge `[143,2366→247,2470]` (104 px), sous le rail, hors du titre `[1851→2006]` ; `mesure/m-table.png` avant (cercle ≈ 300 px sur les photos) / après |
| F3-1 texte collé sous le h2 (terrasse) | corrige | `base.css` : `.manifeste__inner .lead` reçoit la marge du manifeste | écart h2 → texte : 0 px → 36 px (1440) |
| F3-2 vide sous les boutons du hero mobile | corrige | (via F1-3) les trois objets occupent la marge basse du hero | `mesure/m-hero.png` : rangée parasol / frites / bouteille entre les boutons et la photo |
| F3-3 répétitions et filler | refuse en partie | aucun | « Bon, généreux et accueillant » **vient du dossier** (`data/restaurants/les-potes-au-feu/`, « Un restaurant à l'image des Potes : bon, généreux et accueillant ») : le relecteur l'a cru inventé. Le menu dégustation sur `carte` apparaît une fois en composition (plats) et une fois dans la comparaison des trois formules avec prix : rôles distincts, le retirer casserait la comparaison. Double marquee : boucle voulue (WARN attendu). |
| (hors revue) débordement 10 px en mobile sur l'accueil | corrige | `base.css` : `#menu { overflow-x: clip }` | la carte `data-reveal="scale"` (scale 1,15 avant révélation) débordait : `scrollWidth` 400 → 390, `scrollTo(80,0)` donnait `scrollX` 10 → 0 |

## Contrôle global (shoot.mjs, 7 pages)

shoot.mjs en série, port 4438, 7 pages (index, carte, histoire, reservation, terrasse, emporter, `/404.html`) : exit 0
partout ; **0 violation axe** sur les 7 pages (revue : 1 serious par page) ; 0 erreur console, 0 requête en échec,
`overflowX: false` desktop et mobile ; loader accueil 2 476 ms desktop (5 118 ms mobile bridé), aucun loader sur les
sous-pages. Vérification à l'œil : `.shots-guinguette-rev/planche-verif.png` (hero mobile, table et badge mobile, pied
de page « FERMÉ » en pastille, terrasse avec marge sous le titre). Serveur arrêté par `kill <PID>`.

Publiable : **oui**. Reste au choix de l'orchestrateur : le loader mobile bridé (5,1 s) est dominé par le boot JS sur
CPU ×4, pas par le plancher ; les copies « exemple » de la terrasse et des avis restent marquées.
