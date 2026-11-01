# ETAT : brasserie-du-quai, variante awwwards (fin de construction-2, 01/11/2026)

## Fait (phase 1 sur 3)

- `DESIGN.md` : brief, hypothèses, trois concepts (ligne d'eau, étiquette de bourriche, échelle de crue),
  test de l'échange, Concept Card « La ligne d'eau », palette, typographie, grille, hovers, plan de
  composition des 5 pages, test de généricité, liste de sur-utilisation (3 cases cochées).
- Scaffold Astro (config, tsconfig, package.json `@kyw/footer`), engine copié de `sites/partage-awwwards`
  (lui-même copie verbatim d'engine.md, sans GL), `engine.css`, `menu.ts` repris tels quels.
- Polices `font.mjs` : Big Shoulders Display 800, Schibsted Grotesk 400 et 600 (`public/fonts/`), 2 préchargées.
- Contenu : `src/data/site.ts` (contacts, horaires saisonniers, faits, classiques, équipe, histoire, hypothèses
  en tête), `src/data/carte.ts` généré depuis donnees.json (10 catégories, 52 lignes dont 3 desserts
  placeholder sans prix), `src/lib/photos.ts` (24 photos, alt rédigés).
- Composants : `Quai.astro` (titre sur la ligne d'eau + reflet inversé + photo et son reflet), `Header`,
  `Footer` (échelle de crue, logo, horaires, contacts, colophon « Photos : La Brasserie du Quai »), `Photo`.
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, `404`, mise en page statique complète desktop et
  390 px (CSS `site.css`), transition d'eau (rideau qui monte), en-tête qui s'écarte, menu mobile.
- Build OK : `scripts/q.sh build pnpm build:site sites/brasserie-du-quai-awwwards` → `dist/brasserie-du-quai/awwwards/`
  (5 pages, 9,3 Mo, noindex et pied KYW validés par build-site.mjs).

## Fait (phase 2 sur 3, construction-2)

- Module pilote `src/motion/quai.ts`, appelé par `setup.ts` (`startQuai()`) : une source, le défilement
  (niveau = progression, houle = vitesse lissée qui retombe au repos). Distribuée au filtre SVG `#houle`
  (feTurbulence + feDisplacementMap, dans `Base.astro`) sur le reflet du titre et de la photo (30 i/s, pause
  hors écran par IntersectionObserver, `scale` 7 au repos, jusqu'à ~33 en défilant), à `--crue` sur `.quai`
  (le reflet s'étire quand le quai sort), à `--niveau` sur `.pied__echelle` (repère clair de l'échelle de crue),
  au verbe « accoster » (`[data-accoste]` : listes de faits, huîtres, classiques, plats, équipe, mur, horaires).
- Entrée du quai sur chaque page : ligne de laiton tracée de gauche à droite, reflet qui apparaît, titre et
  chapô qui accostent (x -24 → 0, `back.out(1.1)`). Le premier rendu CSS est l'état de départ (aucun saut) ;
  le titre reste peint (LCP). Classe `quai--entre` posée par le script.
- Reveals déclaratifs : `data-split="lines"` sur 9 h2, `data-reveal="clip"` sur 5 photos, parallaxe terrasse.
- États : `:active` sur CTA et liens ; CTA clair sur l'eau (était sombre sur sombre dans le hero).
- Finitions : grille du pied (colonne « Joindre » qui passait à la ligne), masque SplitText agrandi vers le haut
  (les É de « ÉCAILLER », « ÉQUIPE » étaient coupés), token `--c-accent-eau` #BF8D46 (5,2:1) pour les textes
  d'accent sur l'eau (le laiton #B3813B faisait 4,46:1).
- `public/og.png` généré (og.mjs). Build OK (`scripts/q.sh aww-build5 …`).
- Mesures (script maison, 4 tailles × 5 pages, motion et mouvement réduit) : 0 erreur console, 0 débordement
  horizontal, 0 élément resté caché après défilement ; CTA de l'accueil au-dessus de la ligne de flottaison
  partout (1440 : 720-768 ; 1280 : 662-710 ; 1024 : 573-621 ; 390 : 575-675 sur 844) ; navigation ClientRouter
  rejoue l'entrée ; en mouvement réduit rien ne bouge (filtre au repos, repère à 62 %).

## Reste (phase 3)

1. QA complète par l'agent « captures » (`QA-<étape>.md`), puis jury, deux passes.
2. À surveiller : coût du filtre SVG sur mobile throttlé (FPS non mesuré) ; si < 50 i/s, couper l'animation
   du filtre sous 760 px (le garder au repos) ou passer à 20 i/s.
3. Calage fin du titre sur la ligne (`margin-bottom: -0.06em`) : bon à l'œil à 1440 et 390.
4. RAPPORT.md, `pnpm index`, commit de dist.

## Décisions

- Concept A « La ligne d'eau » (nom + lieu), pas de loader, pas de GL (filtre SVG pour le reflet).
- Palette froide (ciel pâle, pierre bleue, Meuse de nuit, laiton du logo) : défaut n° 1 évité.
- Logo SVG blanc et or réservé au pied de page sombre ; en-tête en marque typographique.
- Desserts placeholder sans prix, mention « exemple » ; aucun vin ni formule inventés ; notes d'avis et
  Gault&Millau non affichés ; Michelin 2026 cité (source officielle).
- Jours de fermeture : « à confirmer » à l'écran ; JSON-LD sur lundi, jeudi, vendredi, samedi (horaires d'hiver).
- Réservation : téléphone en CTA principal, lien externe vers la page Réservation du site actuel, mailto.
- Navigation : « La carte », « Le quai » (page histoire), téléphone, « Réserver ».
