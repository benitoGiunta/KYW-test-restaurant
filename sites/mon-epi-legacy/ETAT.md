# ETAT · mon-epi-legacy · phase 2 sur 3 (construction-2)

## Fait (phase 1)
Audit, deal (Solstice 1/3), draw 14e65e, scaffold, `DESIGN.md`, `comp.md`, pages statiques (accueil, a-propos, produits, galerie, contact, 404), données réelles, 24 photos du client, `<KywFooter />` sur les 6 pages.

## Fait (phase 2)
- Nav : bandeau (enseigne, téléphone, Facebook) qui défile, barre de navigation qui reste (`.site-header` sticky à `top: -76px`, `--z-sticky-nav`) ; sous 60rem, bouton « Menu » + `<nav popover>` unique (ouvre sans JS, `aria-expanded` et position par un petit script dans `Base.astro`, se ferme à Échap, au clic sur un lien, au défilement, au passage en bureau). Mesuré : barre 52 px, ancre `#levure` à 68 px sous la barre.
- Contrôles : bouton primaire unique (repos, survol sous `(hover: hover)`, `:active`, `:disabled`, focus), Menu en contour, liens 44 px (48 au doigt). Lien d'évitement fixe en `translateY`.
- Survol : la ligne de l'index du hero s'éclaire (fond papier) ; aucune réaction sur les lignes de carte.
- Mouvement : aucun reveal, par thème (Solstice : « No reveal »), écrit en tête de `page.css` ; défilement doux seulement hors reduced motion ; bascule du menu en opacité et `transform` sur `--dur-short`.
- Hero : photo plafonnée à `100svh - 350px`, titre en `--text-display-s`, remplit le premier écran à 1440x900 et 1920x1080 (waive 44c écrit : hero Index). Pied : marge basse à `--section-gap-s` (gate 59).
- Responsive : `viewport-fit=cover`, safe-area dans les gouttières, `scrollWidth == clientWidth` à 320, 375, 768 sur 5 pages, aucune erreur JS ; pas de JS : menu ouvre ; reduced motion : menu à pleine opacité immédiate.
- Correctif : `Photo.astro` imprimait « }} » après chaque légende ; corrigé.
- sloplint `src --render --url` : 0 FAIL, 0 REFLEX, 0 WARN (1 WAIVED 44c, 3 DISMISSED 49, 4 NOTE de mots). Hero review : `self` (pas d'outil Agent), 3 constats résolus ; trois questions de reproduction dans `comp.md`.
- Build `pnpm build:site sites/mon-epi-legacy` passe ; `DESIGN.md` § Sur-utilisation : points 2, 6, 7, 17, 19 à 24, 29, 30, 48, 49, 56, 58, 63, 72 cochés.

## Reste (phase 3)
- Captures desktop et 375 (agent « captures »), lecture de la planche du menu ouvert et du bandeau qui se rétracte.
- Polices Google jamais vues en rendu ici (repli système sur les captures) : vérifier la ligne de titre « Du pain cuit au feu de bois. » avec Yeseva One chargée.
- `--kept` contre `before.json`, case 8 de DESIGN.md, `RAPPORT.md`, entrée finale `$LOG`, `pnpm index`, commit de `dist/` (déjà commité pour mon-epi/legacy à cette phase, `dist/index.html` non touché).

## Pièges
- Les NOTE 58 (mots par écran, paragraphes de hero de 13 à 20 mots) restent ouverts : phase 3 si le temps.
- `.hallmark/log.json` : pas touché par cette phase.
- Hypothèses : bouton « Menu » en texte (pas d'icône) ; Facebook masqué dans le bandeau sous 60rem (présent au pied) ; aucune réservation de table, donc aucun formulaire.
