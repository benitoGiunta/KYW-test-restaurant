# RAPPORT — gabarit « Marée »

**Concept en une ligne** : tout est posé sur une ligne d'horizon ; une houle SVG pilotée par la vitesse de scroll sépare
les sections et découpe la photo du hero, le nom s'étire d'un bord à l'autre comme un quai.

## Scores du critique
Pas de critique dans cet agent (règle du 30/10) : la skill `jury` et la revue sont faites ensuite par un agent distinct.
Auto-contrôle mécanique (shoot + audit, voir `.shots-maree/`) : voir « QA » ci-dessous.

## QA (deux passes complètes : shoot page par page sur le port 4405, captures `.shots-maree/<page>`, audit `.shots-maree/audit-maree.txt`)
- Passe 1 : 1 FAIL audit (`<h1>` du hero dupliqué : lignes desktop et mobile dans le même titre), 2 violations axe sérieuses
  (`aria-prohibited-attr` sur les segments de la ligne de temps, contraste du numéro actif de la légende du plan), survols
  faibles (lien « Réserver une table » couleur seule, marque et téléphone sans réaction), cibles nav mobile à 24 px, badges
  des règles qui dépassaient la fenêtre en mobile, en-tête ink illisible sur les heros sombres (écailler, terrasse).
- Corrections : h1 à texte unique (deux mots-blocs `.nom__w` en mobile via `display: contents`, le fit ignore les spans en
  ligne) ; `role="img"` sur les segments ; numéro actif ink souligné bouée ; `.link` et téléphone : décalage du soulignement
  au survol ; marque : soulignement qui se dessine ; nav mobile 28 px ; badges `white-space: normal` ; thème `sombre`
  (en-tête crème) sur écailler et terrasse ; intro du nom en transform seul (le tween `letter-spacing` décalait la mise en
  page : CLS desktop 0,108 mesuré en passe 2a).
- Passe 2 (chiffres finaux, 7 pages) : audit **0 FAIL**, 9 WARN connus (horaires répétés en-tête/pied, 404 et robots/sitemap
  de l'origine sous `base`) ; **0 erreur console** ; axe **0 violation sérieuse** sur les 7 pages ; aucun débordement
  horizontal desktop ni mobile ; aucune cible < 24 px ; reduced motion : `hiddenText 0`, `moving false` partout ; focus
  visible partout, pas de piège clavier ; idle motion : houle (oui).
- Vitals : LCP desktop 3,5 s (loader 3,0 s, plancher du moteur) ; mobile throttlé LCP 5,3 s (loader 5,3 s, image du hero),
  CLS mobile 0 ; CLS desktop accueil après correction : 0,001 (LCP 3,7 s) ; 52 à 60 fps au scroll mobile (pire frame 100 ms sur
  terrasse, photo teintée).
- Faux négatifs du détecteur de survol, vérifiés à la main (Playwright : `::after` scaleX 0 → 1, `:hover` vrai) : marque
  « Les Potes au Feu » et liens de nav de l'en-tête absolu (`noHoverChange`), téléphone (`colorOnly` alors que le décalage
  de soulignement bouge) ; `covered` figure « photo libre » : la figure n'est pas interactive. `skipLinkFirst: false` :
  faux négatif connu.

## Placeholders (`placeholder: true` dans `site.ts`, mention visible)
- Univers « terrasse » et « écailler » (le restaurant n'a ni l'un ni l'autre) : pages et sections marquées illustratives.
- 6 arrivages avec origine, calibre et prix ; citation de la terrasse ; règles maison 4 à 6 (terrasse, chiens, enfant).
- Points 2 à 4 du plan (parking, ponton, arrêt de bus) ; tracé du plan simplifié d'après OpenStreetMap, à retracer.
- 5 photos libres (Unsplash via Picsum) créditées au footer ; e-mail ; rôles de Sara et Jordan ; 2 avis Google ; 2 boissons.

## Ce qui manque
- Vraies photos lumineuses du restaurant (celles du dossier sont sombres : seules 6 sont utilisées, sur histoire et carte).
- Un vrai plan tracé rue par rue ; le statut « ouvert » ne tient pas compte des fermetures exceptionnelles.
- `canvas: true` du cahier : la houle est un SVG recalculé au ticker, pas un canvas (plus léger, accessible, suffisant).

## Leçons structurelles (à reporter dans agents/lecons.md)
- `.nom > span { display:block }` bat `.nom__l2 { display:none }` (spécificité 0,1,1 contre 0,1,0) : les lignes alternatives
  d'un titre doivent être ciblées avec la même spécificité (`.nom > .nom__l2`).
- Un `<span>` en `display:block` a un `scrollWidth` égal à son conteneur : pour ajuster un texte bord à bord, mesurer avec
  `width: max-content` + `getBoundingClientRect()`, puis rétablir ; refaire après `document.fonts.ready` et au resize.
- Dans une grille `1fr auto`, un enfant positionné en flux tombe en ligne 1 si les autres enfants sont absolus : fixer
  `grid-row: 2` explicitement.
- Un tween GSAP `letter-spacing` sur le titre LCP compte comme décalage de mise en page (CLS 0,11) : poser un titre par
  `transform` + opacité seulement.
- `aria-label` sur un `<span>` sans rôle = violation axe `aria-prohibited-attr` (sérieuse) : ajouter `role="img"` ou un
  élément sémantique.
- Le rouge bouée #D73C2C sur écume #D8E3EA ne fait que 3,52:1 : le réserver aux fonds crème (4,6:1) ou aux aplats avec texte blanc.
- `gsap.fromTo` avec une NodeList vide émet un avertissement console (« GSAP target not found ») compté par `shoot.mjs` :
  tester `.length` avant chaque tween d'un driver partagé entre pages.
