# RAPPORT — gabarit « Nocturne »

**Concept en une ligne** : le site est éclairé à la lampe ; un seul canvas dessine un halo ambré qui suit le pointeur et
révèle les photos de la mosaïque à sa portée, les titres sont des tubes en contour qui s'allument au survol.

## Scores du critique
Pas de critique dans cet agent (règle du 30/10) : la skill `jury` et la revue sont faites ensuite par un agent distinct.

## QA (une passe complète : shoot page par page sur le port 4408, captures `.shots-nocturne/<page>`, audit
`.shots-nocturne/audit-nocturne.txt`, puis corrections mécaniques et contrôle ciblé par mini-script Playwright)
- Shoot, 7 pages : **0 erreur console, 0 requête échouée**, aucun débordement horizontal desktop ni mobile, aucune cible
  < 24 px, axe **0 violation sérieuse** (14 « contrastNeedsReview » sur l'accueil : les tubes en contour, `color:
  transparent` + `background-clip: text`, lisibles à l'oeil sur les captures), reduced motion : `hiddenText 0`, `moving
  false` partout, focus visible partout, `noHoverChange` vide sur les 7 pages.
- Vitals : desktop LCP 0,1 à 0,4 s après loader (loader 2,9 à 3,2 s, plancher du moteur), CLS 0,013 à 0,019 ; mobile throttlé
  LCP **1,2 s (accueil) à 2,2 s**, CLS 0 à 0,01, 59 à 61 fps au scroll ; desktop 34 à 48 fps sur GPU logiciel (plancher).
- Audit : **0 FAIL**, 10 WARN connus (horaires répétés en-tête / pied de page, 404 et robots / sitemap de l'origine sous
  `base`, une phrase de l'origin story qui revenait dans le récit, reformulée).
- Corrections mécaniques après la passe : titre du hero trop grand en desktop (4 lignes au lieu de 2 : `--t-mega` réduit,
  colonne centrale élargie, vérifié 2 lignes à 77 px en 1440) ; nom du pied de page qui débordait (réduit) ; formulaire de
  réservation `data-reveal` donc `visibility: hidden` hors écran : les champs étaient sautés au clavier (`stuck: true`),
  attribut retiré, parcours clavier vérifié (nom, date, heure, couverts, message, bouton) ; titre de catégorie de la carte
  scindé (tube + meta) ; `idleMotion: false` : la lampe veille désormais au centre à mi-intensité tant que le pointeur n'est
  pas entré (elle respire) ; OG généré depuis le hero (`public/og.png`).
- `colorOnly` signalés (Appeler, Continuer sur Zenchef) : le `.btn` s'inverse (fond crème, texte noir), jugé à l'oeil.
  `skipLinkFirst: false` : faux négatif connu du socle.
- Pas de seconde passe complète de shoot après ces corrections (budget) : contrôle ciblé seulement (console, visibilité,
  clavier, hero) ; le relecteur relancera `shoot.mjs` sur l'accueil et la réservation.

## Placeholders (`placeholder: true` ou `rolePlaceholder`, mention visible « * illustratif » à l'endroit même)
- Les 10 cocktails (noms, ingrédients, prix, familles) : carte de bar entièrement illustrative, bandeau sur la page et
  mention par ligne ; le restaurant n'en publie pas.
- Soirée « au bar » (format) ; e-mail ; rôles de Sara et Jordan ; 2 avis Google ; 2 boissons de la carte.

## Ce qui manque
- De vraies photos de bar de nuit (celles du dossier sont de salle et de cuisine, sombres mais pas « verres et néons »).
- Une carte de bar réelle, un compte Instagram (le coin gauche affiche Facebook, premier réseau de `site.reseaux`).
- Le halo n'existe pas sur tactile ; le cahier prévoyait un halo centré qui suit le scroll (exclu par la consigne).

## Leçons structurelles (à reporter dans agents/lecons.md)
- Un bloc interactif (`<form>`, groupe de liens) ne porte jamais `data-reveal` : sous `html.motion` il est `visibility:
  hidden` tant qu'il n'est pas défilé, et ses champs sortent de l'ordre de tabulation (`keyboard.stuck: true`, champs
  sautés) ; révéler les éléments voisins, pas le bloc interactif.
- Titres en contour : garder `color: transparent` + `background-image` + `background-clip: text` sur l'élément qui porte
  le texte ; avec `data-split` SplitText déplace le texte dans des enfants sans `background-image` et axe recalcule le
  contraste sur `transparent` ; révéler les tubes par `data-reveal="fade"`.
- Un titre géant sur une colonne centrale se mesure en chars du mot le plus long × 0,9 em (Panchang) : compter la largeur de
  la colonne moins les gouttières avant de fixer `--t-mega`, et vérifier le nombre de lignes au script
  (`rect.height / lineHeight`).
- Pour `idleMotion`, un effet qui ne dépend que du pointeur ne compte pas : prévoir un état de veille (lampe au centre).
- Les @font-face dans `tokens.css` ne peuvent pas pointer vers `public/` sous `base` : les écrire dans `Base.astro` avec
  `asset()` dans un `<style is:inline>`.
