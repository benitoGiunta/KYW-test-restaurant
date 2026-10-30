# RAPPORT — gabarit « Velours » (construction, 30/10/2026)

**Concept en une ligne** : la maison se raconte par ses nombres vrais (4 services, 67 euros, 2 chefs, 2020), chaque chapitre
se dévoile comme un rideau de velours vert sapin sur un chiffre cuivre monumental posé sur une photo sombre.

## Scores du critique
Pas de critique dans cet agent (règle du 30/10) : la skill `jury` et la revue sont faites ensuite par un agent distinct.
Auto-contrôle mécanique (shoot.mjs + audit.mjs, 7 pages, port 4412, `.shots-velours/<page>`) :
- 0 erreur console, 0 requête échouée, 0 débordement horizontal (desktop et 390 px) sur les 7 pages.
- LCP desktop 148 à 336 ms (img du hero ou texte) ; LCP mobile throttlé 1,1 à 2,2 s (le plus lent : formules, texte « 67 »
  en Boska) ; CLS 0 partout (0,026 sur la 404 mobile).
- reduced motion : `hiddenText` 0, `moving` false sur chaque page. Clavier : focus visible partout, aucun focus invisible.
- axe : 1 serious récurrent (nom accessible de la marque « LPF » absent de l'aria-label) et 1 « list » (h2 dans l'ol du menu),
  corrigés avant la passe 2. `contrastNeedsReview` 3 à 24 nœuds : texte ivoire sur photo sous scrim sapin, vérifié sur les planches.
- audit.mjs : 0 FAIL ; WARN normaux sous `base` (robots, sitemap, 404 de l'origine) + « 12:00 à 14:00, 19:00 à 21:00 » répété
  (mercredi et vendredi ont les mêmes heures dans le pied de page : donnée réelle).
- Hover : CTA = remplissage cuivre qui monte (clip-path), nav = filet cuivre, galerie = voile qui se lève, onglets = couleur
  (secondaire) ; `none` seulement sur le bouton « Réserver » de l'en-tête quand on est sur la page Réserver (état courant).
- `idleMotion: false` : décision du cahier (site calme) ; seuls les onglets du samedi tournent toutes les 6 s quand ils sont à l'écran.

## Placeholders (drapeaux dans `site.ts`)
- `email` (inconnu) : jamais affiché, pas de mailto.
- `privatisation.offres[*].textePlaceholder` : les trois textes d'offre (privatisation, mariage, chef à domicile) sont illustratifs,
  marqués « texte illustratif » à l'écran ; les trois intitulés viennent du dossier.
- `equipe` Sara et Jordan : prénoms prouvés, `rolePlaceholder` (rôle inconnu, marqué « rôle illustratif »).
- `avis[1..2]` : deux « Exemple d'avis » sans nom (non affichés sur les pages actuelles ; disponibles pour une adaptation).
- Aucun chiffre monumental n'est fictif : 4, 67, 2, 2020 ont chacun leur `preuve`. Le chapitre « tables » du cahier n'existe pas
  (nombre inconnu), remplacé par le prix unique.

## Ce qui manque
- Un critique extérieur (jury) et une revue ; la rotation des onglets n'a pas été filmée (shoot.mjs ne capture pas 6 s d'attente).
- Les photos de plats « assiette » n'existent qu'en 550 px (triptyque du menu en petit) ; pas de photo de la façade ni de la terrasse.
- Une vraie citation du chef remplacerait avantageusement celle du Guide (le cahier préférait la phrase du chef).

## Leçons structurelles (reportées dans `agents/lecons.md`)
- Une photo de chapitre qui touche le bord de l'écran ne peut pas porter un chiffre « à cheval » sur ce bord : le chiffre va sur
  le coin intérieur (côté texte), et `scrollWidth` le dit tout de suite (1459 px pour 1440) ; mesurer avant le shoot.
- Un `aria-label` sur la marque doit contenir le texte visible, y compris un monogramme `aria-hidden` (axe
  `label-content-name-mismatch` compte « LPF ») ; un `<h2>` placé dans un `<ol>` déclenche axe `list` : le sortir et
  lier par `aria-labelledby`.
- Une section à padding ET une marge « entre chapitres » après une section déjà épaisse (citation) font 400 px de vide :
  une seule des deux.
- `keyboard.stuck` de shoot.mjs sur un formulaire = le champ `type="date"` natif qui consomme Tab dans ses segments en headless,
  pas un piège clavier.
- La planche-contact rogne les captures à 300 px de haut : un portrait 3:4 y paraît paysage ; mesurer `getBoundingClientRect`
  avant de « corriger » un ratio d'image.
