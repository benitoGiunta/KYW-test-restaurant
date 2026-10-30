# RAPPORT — gabarit « Forno »

**Concept en une ligne** : le site est une fournée ; il commence dans le noir du four, la pâte lève sous les yeux
(photo de la vignette au plein écran, nom qui rétrécit en coin, marquee des services en capitales géantes), puis la
farine prend l'écran pour la carte, et un compte à rebours du prochain service, calculé depuis les horaires réels, bat
dans l'en-tête.

## Scores du critique
Pas de critique dans cet agent (règle « pas de critique » des leçons intégrées) : la skill `jury` et la revue sont faites
ensuite par un agent distinct. Auto-contrôle mécanique seulement, voir ci-dessous.

## QA mécanique (shoot.mjs + audit.mjs, port 4410, `.shots-forno/<page>/`)
Deux séries (21:39 et 21:58, la seconde sur le build final pour index, carte, pâtes, histoire ; à emporter, réservation
et 404 tirées de la première série, après la correction des accroches) :
- 0 erreur console, 0 requête en échec, 0 débordement horizontal (desktop 1440 et mobile 390), 0 `smallTargets`, clavier
  sans focus invisible ni blocage, reduced-motion sans texte caché ni mouvement résiduel, idleMotion vrai sur l'accueil
  (compte à rebours, marquee), axe : 0 violation sérieuse sur les 7 pages.
- LCP mobile throttlé : accueil 1,30 s (photo du hero), carte 0,98 s, pâtes 1,01 s, histoire 1,12 s, à emporter 1,04 s,
  réservation 1,00 s, 404 1,02 s ; CLS 0 mobile, 0,003 desktop ; 59 fps au défilement ; loader desktop 2,5 à 2,7 s.
- `audit.mjs` : 0 FAIL, 9 WARN, tous attendus sous `base` (horaires répétés en-tête/pied de page, robots.txt et sitemap
  cherchés à la racine de l'origine, « 404 sans h1 » = la 404 de `dist/`, pas celle du gabarit qui en a un).
- Corrections mécaniques faites entre les passes : titre géant ramené de 20 à 14 vw (« LES POTES » tenait sur 3 lignes),
  `role="group"` sur le marquee (axe `aria-prohibited-attr`), libellés du compte à rebours sans opacité (3,96:1 → 4,7:1),
  légende de la levée masquée en reduced-motion, accroches et titres des pages intérieures sans `data-intro` et prose de
  l'histoire sans `data-reveal` (LCP mobile 8,4 s → 1,0 s), secondes masquées en reduced-motion, date relative retirée de
  l'histoire, avis d'exemple sans nom ni source réelle.
- Captures : `.shots-forno/<page>/` et planches `.shots-forno/planche-<page>.png` ; audit `.shots-forno/audit.txt`.

## Placeholders (marqués à l'endroit où ils s'affichent)
- `email` (adresse illustrative, jamais en `mailto:`), bande « adresse illustrative » dans le pied de page.
- Boissons de la carte (accord mets et vins, cocktail) : « illustratif » sur chaque fiche.
- Deux avis d'exemple sur trois (étiquette « Exemple d'avis » avant la citation, sans nom ni source réelle) ; l'avis
  réel est celui de l'inspecteur du Guide MICHELIN (dossier.md).
- Rôles de Sara et Jordan : « rôle à confirmer » (dossier : rôles inconnus).
- Page « Pâtes fraîches » : bandeau d'exemple peint sans JS, 12 produits marqués, aucun CTA de réservation.
- Page « À emporter » : bandeau d'exemple, 3 fournées marquées « exemple », téléphone réel, aucun CTA de réservation.
- Lien « Catalogue des pâtes fraîches » de l'accueil porte « exemple ».

## Ce qui manque
- Photos de four, de farine en vol et de produits détourés (le restaurant de référence n'a pas de four à pizza) : la
  levée montre ses mains dans la pâte, les vignettes du catalogue sont typographiques.
- Portraits de Sara et Jordan (« Photo à fournir » dans le carrousel).
- Le compte à rebours affiche « Prochain service » sans chiffres tant que le JS n'a pas démarré (pas de date en dur).

## Leçons structurelles (à reporter dans `agents/lecons.md`)
Reportées dans `agents/lecons.md` (entrée « portfolio-gabarit forno ») : accroche et premier bloc de texte des pages
intérieures sans `data-intro`/`data-reveal` (LCP) ; `aria-label` interdit sur un `<div>` nu ; pas d'opacité sur du texte
posé sur l'accent ; mesurer la hauteur du h1 géant à 3 largeurs avant le shoot ; une opacité calculée depuis `--p` compte
comme texte caché en reduced-motion.
