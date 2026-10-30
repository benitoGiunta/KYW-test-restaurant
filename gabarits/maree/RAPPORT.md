# RAPPORT — gabarit « Marée »

**Concept en une ligne** : tout est posé sur une ligne d'horizon ; une houle SVG pilotée par la vitesse de scroll sépare
les sections et découpe la photo du hero, le nom s'étire d'un bord à l'autre comme un quai.

## Scores du critique
Pas de critique dans cet agent (règle du 30/10) : la skill `jury` et la revue sont faites ensuite par un agent distinct.
Auto-contrôle mécanique (shoot + audit, voir `.shots-maree/`) : voir « QA » ci-dessous.

## QA (première passe, puis corrections mécaniques)
- Console : 0 erreur sur les 7 pages (après correction des cibles GSAP vides sur les heros sans nom bord à bord).
- Axe : `aria-prohibited-attr` sur les segments de la ligne de temps (corrigé : `role="img"`) ; contraste du numéro actif
  de la légende du plan, bouée sur écume 3,52:1 (corrigé : ink souligné bouée). `contrastNeedsReview` : textes crème sur
  photo du hero, avec dégradé ink 55 % derrière le nom.
- Hover : « Réserver une table » n'avait qu'un changement de bordure (corrigé : translateY(-2px) sur tous les `.btn`) ;
  figcaption qui couvrait la figure (corrigé : `pointer-events: none`).
- LCP desktop 3,9 s (loader 3,5 s, plancher du moteur), mobile throttlé 5,8 s (loader 5,7 s) : comportement prévu par le
  moteur ; CLS 0,006 / 0,012 ; 60 fps au scroll mobile ; pas de débordement ; idle motion = houle (oui) ; reduced motion
  complet (houle statique, `moving: false`, `hiddenText: 0`).
- `skipLinkFirst: false` est le faux négatif connu (« Aller au contenu » est bien le premier arrêt).

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
- `aria-label` sur un `<span>` sans rôle = violation axe `aria-prohibited-attr` (sérieuse) : ajouter `role="img"` ou un
  élément sémantique.
- Le rouge bouée #D73C2C sur écume #D8E3EA ne fait que 3,52:1 : le réserver aux fonds crème (4,6:1) ou aux aplats avec texte blanc.
- `gsap.fromTo` avec une NodeList vide émet un avertissement console (« GSAP target not found ») compté par `shoot.mjs` :
  tester `.length` avant chaque tween d'un driver partagé entre pages.
