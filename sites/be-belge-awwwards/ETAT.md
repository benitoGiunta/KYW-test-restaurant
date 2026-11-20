# ETAT : be-belge / awwwards / construction-2 (phase 2 sur 3)

## Fait (phase 1)
- Concept « les trois points », DESIGN.md, 5 pages statiques, engine sans GL, polices, OG, JSON-LD. Voir DESIGN.md.

## Fait (phase 2)
- `src/components/Points.astro` : les « … » des titres, du hero, du pied deviennent trois `<i>` pilotés (`aria-hidden`). La marque de l'en-tête garde le glyphe.
- `src/motion/` : `points.ts` (pilote, scroll + intro + pointeur + repos, filets de la carte), `idle.ts`, `hero.ts` (intro), `menu.ts` (copié de chez-guillaume, classes `volet`), `setup.ts` (transition « poursuivre »).
- Reveals : `data-split` (statement en lignes, h2 sans points en mots), `data-reveal` (couples, menus, jours, lignes de la carte, mur de l'histoire en clip). Aucun sur un bloc à lien.
- Hovers (3 traitements), `:focus-visible`, `:active`, survol sous `(hover: hover)`, lien du pied KYW souligné au survol.
- Menu mobile sous 768 px (bouton Menu + volet plein écran sombre) ; nav de bureau « Venir et réserver » (évite deux « Réserver » consécutifs).
- Favicons PNG 32 et 180, `::selection`, focus sur fonds sombres. Commentaires HTML de `index.astro` passés en `{/* */}`.
- Build OK. Contrôles (`.logs/bebelge-c2-check2.log`) : 0 erreur console, scrollWidth 1440 / 390, menu (ouverture, piège, Échap, retour du focus), réduit 0 élément caché sur 5 pages, intro finie à 2,6 s.

## Reste (phase 3)
- Shoot complet (agent captures), jury, RAPPORT.md, checklist 35, 36 (`idleMotion`), 39, 41 à 47 par `report.json`.
- Lire à l'œil : le rideau (panneau + 3 points), les titres « D'ici… d'ailleurs » au scroll, la 404, la carte à 390.
- Après navigation interne, l'intro des h1 finit ~3 s après le clic (sortie + entrée + intro en série) : capturer à 3,5 s.

## Décisions et hypothèses
- Pas de loader, pas de GL, pas de suiveur de curseur (Concept Card) : `#gl` et `#cursor` absents.
- Intro horizontale écrite dans `hero.ts` plutôt que `data-intro` (le verbe est un glissement latéral, l'engine révèle vers le haut).
- Données inchangées depuis la phase 1 (aucun fictif).

## Fait (phase 3, QA)
- Corrections : `.strip` focusable (axe), liens `.lt` en cibles >= 24 px, titre accueil raccourci, meta histoire < 160. Build OK, audit 0 FAIL / 10 WARN, shoots ciblés home et 404 propres. RAPPORT.md écrit.
## Reste
- Critique jury indépendant (non lancé), relecture visuelle carte/reservation à 390 après le padding `.lt`.
