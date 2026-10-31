# RAPPORT — gabarit « Guinguette »

**Concept en une ligne** : le site est une table de terrasse un dimanche ; on y attrape et déplace des objets au trait,
des tirages à cadre blanc et des cartes d'avis, en lin, corail et bleu canard (Zodiak + Satoshi).

## Scores du critique
Pas de critique dans cet agent (revue par un agent distinct). Auto-contrôle mécanique : voir « QA » ci-dessous.

## QA (une passe shoot + audit, captures dans `.shots-guinguette/<page>`, planches `planche-<page>.png`)
- `shoot.mjs` sur les 7 pages (desktop 1440, mobile 390 throttlé, reduced-motion, clavier, survol) : 0 erreur console,
  0 requête en échec, 0 débordement, `hiddenText` 0 en reduced-motion, `idleMotion: true` (objets flottants + marquee),
  focus visible partout, aucune cible < 24 px.
- Vitals : LCP desktop 150 à 310 ms (accroche ou titre du hero, peints sous le rideau), LCP mobile throttlé 1,2 à 1,5 s,
  CLS ≤ 0,025 desktop / ≤ 0,009 mobile, loader desktop 2,6 à 2,8 s, scroll 50 à 60 fps (39 fps mobile sur l'accueil, la
  scène de la table).
- `audit.mjs` : 0 FAIL, 15 WARN. Les WARN restants : « sentence repeated » (copies du marquee d'état, `aria-hidden`),
  « 404 has no h1 » et robots/sitemap (l'audit lit la 404 et la racine de l'origine `dist/`, pas celles du gabarit : la
  vraie 404 a son h1 « Cette table n'existe pas »).
- Corrections après lecture des planches et du contrôle mini-script (console, `scrollWidth`, visibilité après défilement,
  1440 et 390) : saut de titre h1 → h3 sur Carte et À emporter (h2 `sr-only` ajouté) ; tirage incliné de la grille
  « La salle, la cuisine » qui débordait de 1 px en 390 px (gouttière intérieure mobile) ; date relative du dossier
  (« il y a quatorze ans ») retirée de `site.ts` ; avis d'exemple du socle qui portaient un nom et « Avis Google »
  supprimés (seul l'avis MICHELIN sourcé reste dans `site.avis`, les 4 cartes d'avis viennent de `avisExemples`) ;
  e-mail inconnu plus affiché sur Réserver ; « 4 services, 67 €, du lundi au vendredi soir » et l'exemple de terrasse
  (texte + 4 pastilles) déplacés des pages vers `site.ts` (`menuUnique`, `terrasse.exemple`).
- Survol : la marque de l'en-tête (`a "Les Potes au Feu"`) est notée `none` par shoot.mjs et « Accueil » `colorOnly`
  (fond de la pilule) : à vérifier par le relecteur avec `getComputedStyle(el, '::after')` avant de corriger (faux négatif
  connu sur les liens d'en-tête absolus).
- Pas de critique `jury` ici (agent de revue distinct).

## Placeholders (tous `placeholder: true` dans `src/data/site.ts`, marque visible à l'écran)
- Slogan du hero « à quatre mains, les coudes sur la table » (marque « exemple »).
- Carte longue d'exemple (4 catégories, 21 lignes, prix, badges végé) : bandeau « Carte longue d'exemple » + astérisque par ligne.
- Boissons de la carte réelle (accord mets et vins, cocktail) : « exemple » par ligne (hérité du socle).
- 4 cartes d'avis : étiquette « Exemple d'avis », sans nom ni source ; le seul avis réel est celui du Guide MICHELIN, sourcé.
- Rôles de Sara et Jordan : « rôle illustratif ».
- E-mail de contact : inconnu, non affiché (`site.email.valeur` vide).
- Terrasse : « à confirmer, illustratif » (accueil, réservation) ; page Terrasse entièrement d'exemple (bandeau sans JS, pas de CTA).
- Page À emporter : entièrement d'exemple (bandeau sans JS, pas de CTA de commande ni de réservation).

## Ce qui manque
- Photos lifestyle au flash en terrasse : les photos du dossier sont des photos de reportage en salle.
- Nombre de couverts, terrasse, service à emporter, avis clients réels : inconnus au dossier.
- Le critique (`jury`) et la revue : à faire par l'agent suivant.

## Leçons structurelles
- Un tirage incliné (`rotate`) posé en `width: 100%` dans une grille mobile déborde de 1 px (boîte englobante tournée) :
  `scrollWidth` 391 pour 390 sans « offender » listé par shoot.mjs ; une gouttière intérieure de 0,5 rem sur la grille
  suffit. Mesurer `getBoundingClientRect().width > 390` sur tous les éléments par mini-script pour le trouver.
- Le socle `_socle` livre deux avis d'exemple avec nom et « Avis Google » et l'e-mail « bonjour@… » : ils violent les règles
  « avis d'exemple sans nom ni source » et « contact inconnu non affiché » ; les retirer dès le scaffold.
- Reprise d'un agent coupé : le shoot de fond avait fini (journal `shoot.log` avec `exit=0` par page) alors qu'ETAT.md le
  disait en cours ; vérifier le journal et les mtimes avant de relancer 15 min de captures.
