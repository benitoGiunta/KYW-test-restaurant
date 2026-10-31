# Révision portfolio · Les Potes au Feu · passe 2

Agent reviseur-site, 31/10/2026. Revue traitée : `REVUE-2.md` (verdict A_CORRIGER, 0 F0, 1 F1, 3 F2, 5 F3 dont une note
d'outil). Les faits viennent de `data/restaurants/les-potes-au-feu/dossier.md`.

Build : `node scripts/build-site.mjs sites/les-potes-au-feu-portfolio` → 6 pages, OK.
Vérification : serveur `serve.mjs dist --port 4486`, arrêté par `kill` de son PID noté au lancement. Trois sortes de contrôles :
- des mini-scripts Playwright (`launch()` de browser.mjs, fichiers `rv2-pf-*` dans le scratchpad) : textes ciblés, rectangles,
  lignes SplitText de la citation, captures de fenêtre en 1440 et en 390, `scrollWidth`, console, éléments restés cachés
  après défilement sur les 6 pages et les 2 largeurs, chronométrage du loader mobile avec la même limitation que `shoot.mjs`
  (CPU ×4, 4G lente) ;
- `shoot.mjs` complet sur les 3 pages touchées (accueil, les deux chefs, carte ; `.shots-rv2-pf/<page>/`, 3 `exit=0`) ;
- `curl` sur les 36 URL internes, nouvelles variantes de photos comprises.

## Décisions

| Finding | Décision | Ce qui a été changé (fichier) | Preuve de vérification |
| --- | --- | --- | --- |
| F1-01 « En salle, Sara et Jordan les épaulent. » | corrige | `src/pages/les-deux-chefs.astro` : « Sara et Jordan les épaulent. » (formulation du site, dossier l. 89 et 196). Le titre « À quatre mains, au passe et en salle » reste : il parle des chefs, qui servent eux-mêmes (dossier l. 196) | texte de la section « Ensemble » relevé : « … / Sara et Jordan les épaulent. / … » ; capture `rv2-pf-shots/d-chefs-ensemble.png` |
| F2-01 loader mobile trop long (3,3 à 4,7 s) | corrige en partie | `src/engine/loader.ts` : si le moteur démarre après 1,2 s sur petit écran ou tactile (`arriveeTardive()`), le compteur passe directement à 100 ; `src/motion/setup.ts` : dans ce cas, la sortie utilise k = 0,25 (≈ 0,4 s au lieu de ≈ 0,7 s). Bureau inchangé | `shoot.mjs`, mobile `loaderMs` : accueil 4 704 → **2 881**, les deux chefs 4 740 → **2 768**, carte 3 460 → **2 417** ; bureau 2 065 / 2 077 / 2 065. Mini-script : histoire 4 281 → 2 933 à 3 275, réservation 3 529 → 2 431, 404 3 344 → 2 281. Le reste du temps vient du `DOMContentLoaded` (2,0 à 2,9 s), qui attend le module du moteur (145 Ko, téléchargé de 0,67 à 2,1 s). Après le démarrage, le loader ajoute environ 0,3 s. Un `modulepreload` injecté après le build a été essayé puis retiré : le gain (≈ 0 à 300 ms) restait dans le bruit et le LCP du portrait passait de 1,2 à 1,5 s |
| F2-02 LCP mobile de les-deux-chefs (2 376 ms) | corrige | `public/photos/chef-{damien,francois}-{640,960}.webp`, tirés des JPG originaux du client (23, 41, 31 et 60 Ko, contre 91 et 149 Ko pour les originaux). `src/lib/url.ts` : `srcsetPortrait()` et `sizesPortrait` (`(max-width: 767px) 18rem, 24rem`) ; les 4 portraits du hero (accueil, les deux chefs) les utilisent, toujours avec `fetchpriority="high"` | `shoot.mjs`, les deux chefs, mobile : LCP **1 208 ms** (`img`, contre 2 376), bureau 164 ms ; accueil, mobile : LCP 1 168 ms (texte du nom). `currentSrc` = `chef-*-640.webp` en 1440 et en 390 (DPR 2). Les 4 variantes répondent 200 |
| F2-03 « dessert de saison… demandez celui du moment » | corrige | `src/pages/carte.astro` : « Association citée par l'inspecteur dans son avis du 4 mai 2026. Menu végétarien sur demande, allergies à signaler à la réservation. » Le plat cité reste au-dessus (« Cerises noires et griottes, crumble de cacao, glace vanille au lait cru. »). La date vient du dossier (avis daté du 2026-05-04) ; le texte ne parle plus de saison ni de menu à demander | `innerText` de l'encart relevé ; `rv2-pf-shots/d-carte-ardoise.png` |
| F3-01 « ! » et « » » seuls en fin de citation | corrige | `src/pages/index.astro` : le dernier mot, sa ponctuation et le guillemet fermant sont dans un `<span class="insec">` ; `src/styles/base.css` : `.insec { white-space: nowrap }` | lignes SplitText relevées en 1440 : `« Un restaurant décontracté / qui swingue sur tous les plans. / Le plaisir déborde de / l'assiette ! »` ; `.shots-rv2-pf/index/d-06-scroll.png` |
| F3-02 plages vides | corrige | `index.astro` + `base.css` : `.section--avis` en bas 16u → 8u (228 → 114 px en 1440), `.section--resa` en haut 16u → 10u (228 → 142 px). `base.css`, mobile : `.hero.dip { min-height: 0 }`, ce qui supprime la bande de papier sous « Le midi » (carte) et sous la bande moutarde (histoire). Les ~280 px entre le nom et les portraits du hero de l'accueil sont gardés : la composition les veut, comme la revue le note | `rv2-pf-shots/d-index-avis-resa.png`, `.shots-rv2-pf/index/d-06-scroll.png` ; `rv2-pf-shots/m-carte-hero.png` (vert puis moutarde puis vert, sans bande) et `m-histoire-hero.png` |
| F3-03 « Deux parcours ↓ » sur la frontière | corrige | `index.astro` : le lien ferme la légende de Damien (colonne verte) ; `base.css` : `.hero__scroll` n'est plus en absolu (`justify-self: start; margin-top: 1.5rem`). Il reste masqué en mobile | rectangle relevé en 1440 : x 374 à 494, donc dans la colonne verte (frontière à 720), haut à 819 px pour une fin de texte à 789 px ; `rv2-pf-shots/d-index-hero.png` ; il apparaît dans l'ordre du clavier juste après « Réserver » (`report.json`) |
| F3-04 « Aucun avis n'est cité ici sans l'accord de son auteur. » | corrige | `index.astro` : « Aucun avis client n'est cité sur cette maquette. » | texte relevé sous la note Google ; `d-06-scroll.png` |
| F3-05 note d'outil (`--nav`, `hover.covered`) | sans objet | aucun changement, comme la revue le demande : l'en-tête à deux copies reste tel quel | — |

Résumé : 8 corrigés (dont 1 en partie : F2-01), 0 refusé, 0 impossible, 1 note sans objet.

## Contrôles globaux après révision

- `shoot.mjs` (accueil, les deux chefs, carte) : 0 erreur, 0 requête en échec, 0 violation axe (0 sérieuse), CLS 0,
  aucun débordement, `reduced.hiddenText` 0. Défilement mobile : 32, 50 et 41 ips.
- Mini-script sur les 6 pages en 1440 et en 390 : `scrollWidth` égal à la largeur, 0 erreur console, 0 élément
  `data-reveal`/`data-split` resté caché après défilement, une seule mention « Maquette KYW, certaines données sont
  illustratives » par page, `robots` = `noindex, nofollow`.
- `curl` : 36 URL internes (pages, CSS, JS, photos, variantes `-640`/`-960`), 0 réponse autre que 200.
- Histoire, réservation et 404 n'ont pas eu de `shoot.mjs` complet, car seuls le loader et le `min-height` mobile du hero
  les touchent. Ces deux changements y sont vérifiés par mini-script (chronométrage, captures 390, contrôles globaux).

## Site publiable ?

Oui. Le seul F1 est corrigé et aucun F0 n'existe. Un F2 reste ouvert en partie : sur la première visite, en mobile limité,
le loader dure encore 2,4 à 3,3 s selon la page, pour une cible de 2,6 s. Ce temps vient presque entièrement du
téléchargement et de l'exécution du moteur, avant que le loader ne démarre. Pour passer sous la cible, il faudrait
alléger le bundle (gsap, SplitText, lenis), ce qui touche au moteur commun des gabarits et sort du cadre d'une révision de
site.
