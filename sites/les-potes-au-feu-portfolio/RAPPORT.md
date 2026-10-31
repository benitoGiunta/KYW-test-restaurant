# Rapport : Les Potes au Feu, variante Portfolio

Agent variante-portfolio, 31/10/2026. Gabarit : Quatre mains (29/30 dans la matrice de `DESIGN.md`).
Build : `node scripts/build-site.mjs sites/les-potes-au-feu-portfolio` → `dist/les-potes-au-feu/portfolio/` (6 pages), OK.

## Placeholders restants (tous marqués à l'écran)

- Composition de la formule 3 services du midi (5 plats d'exemple) et l'exemple de « Lunch du vendredi » : `placeholder: true`,
  affichés « (illustratif) » / « exemple ».
- Attribution des plats à Damien ou à François (tags D / F, plats fétiches) : `voixPlaceholder`, `platsFetichesPlaceholder`,
  affichée « attribution illustrative ».
- Tartare de boeuf et rosace de pommes dans la liste à stage de l'accueil : plats vus en photo, hors du menu actuel, « illustratif ».
- Rôles de Sara et Jordan : « rôle illustratif » (Sara : photo de service à alt neutre, identité à confirmer ; Jordan : tuile à l'initiale).
- Note Google 4,8/5 sur 212 avis : réelle mais relevée par un tiers (Rankeat, 22/08/2025), affichée « à confirmer » ; hors JSON-LD.

Retirés au lieu d'être marqués : les deux avis Google inventés, l'e-mail fictif (affiché sans marque dans le gabarit), les
années et anecdotes inventées des parcours, les deux citations inventées des chefs, la liste de boissons fictive et
l'accord mets et vins à 32 €.

## QA (build du 31/10, captures `.shots-lpaf-portfolio/<page>/`, serveur :4432 puis :4431, en série)

| Page | Console | Requêtes en échec | axe sérieux | Débordement | LCP bureau | LCP mobile throttlé | CLS | Reduced motion |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Accueil | 0 | 0 | 0 | non | 164 ms (nom) | 1 144 ms | 0 | 0 texte caché |
| Carte | 0 | 0 | 0 | non | 108 ms | 1 104 ms | 0 | 0 |
| Les deux chefs | 0 | 0 | 0 | non | 192 ms | 2 372 ms (portrait) | 0 | 0 |
| Histoire | 0 | 0 | 0 | non | 156 ms | 1 076 ms | 0 | 0 |
| Réservation | 0 | 0 | 0 | non | 160 ms | 1 072 ms | 0 | 0 |
| 404 | 0 | 0 | 0 | non | 152 ms | 1 068 ms | 0 | 0 |

- `audit.mjs` (`.shots-lpaf-portfolio/audit.txt`) : 0 FAIL, 15 WARN : horaires répétés (bande Réserver + pied de page, choix
  du gabarit), robots/sitemap/404 cherchés à la racine de l'origine (normal sous `base`), deux répétitions corrigées après
  l'audit (texte 2020 identique pour les deux chefs, source de citation identique).
- Mini-script Playwright après les dernières corrections (1440 et 390, 6 pages) : `scrollWidth` = viewport, 0 élément
  `[data-reveal]`/`[data-split]` resté caché après défilement, 0 erreur console, h1 présents et de hauteur non nulle.
- Survol : seule la marque d'en-tête « Les Potes au Feu » est `none` à l'accueil (lien de la page courante, hérité du gabarit).
- Loader : 3,1 à 3,2 s bureau (plancher du moteur, une fois par session), 3,7 à 5,2 s mobile throttlé (boot JS) ; le LCP
  n'en dépend pas.
- Planches regardées : accueil, histoire, carte, réservation (desktop + mobile) ; frise mobile vérifiée après correction.

## Points ouverts

- À faire confirmer par le restaurant : composition des formules du midi, rôles de Sara et Jordan (et qui est sur les
  photos), note Google, e-mail public éventuel, répartition réelle des plats entre les deux chefs.
- Portraits détourés des chefs (le diptyque les fond en monochrome dans le vert, faute de mieux).
- Le formulaire de réservation reste une démonstration qui ouvre Zenchef ; le champ date suit la langue du navigateur.
- La façade vidéo ouvre YouTube dans un nouvel onglet (pas de lecteur intégré, choix de performance et de vie privée).

## Leçons structurelles

- Le gabarit Quatre mains, construit sur ce restaurant, affichait encore un e-mail fictif (`bonjour@…`) **sans** marque
  « illustratif » (pied de page et réservation) et deux avis Google inventés : à l'adaptation, `grep` de `site.email`,
  `avis` et `citation` dans les pages avant tout le reste ; `email: null` doit être géré par les composants.
- Des jalons sans date (« Débuts », « Ensuite ») dans une frise prévue pour des années débordent une colonne en `5ch` :
  colonne en `rem` calée sur le libellé le plus long. Corrigé ici, à reporter dans le gabarit si un autre restaurant s'en sert.
- Le gabarit d'origine n'a pas été modifié (ses défauts de contenu sont propres à la donnée de référence).
