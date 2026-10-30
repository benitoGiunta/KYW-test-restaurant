# RAPPORT — gabarit « Comptoir »

**Concept en une ligne** : le site est un passe blanc et silencieux ; la hiérarchie vient de la graisse (200 / 400) et de
l'espace, et le seul geste animé est le dressage du boeuf confit, composant par composant, légendes reliées en italique.

## QA (shoot.mjs + audit.mjs, pass 1 le 30/10/2026, port 4407, `.shots-comptoir/<page>`)

- 6 pages capturées : 0 `failed`, 0 erreur console, CLS 0 partout, 60 fps au défilement, reduced-motion : 0 texte caché,
  rien ne bouge. Audit : 0 FAIL, 8 WARN (horaires répétés page + pied de page ; 404, robots et sitemap cherchés à la
  racine de l'origine : normaux sous `base`).
- Corrections mécaniques appliquées après la passe 1 : débordement horizontal mobile de 2 px (traits d'angle céladon
  raccourcis dans la gouttière) ; marque d'en-tête 1×1 px focusable en desktop (`display: none`, le logo vertical porte le
  lien) ; contraste AA du gris `muted` (#8C8780 du cahier → #6F6B65, 4,5:1 sur blanc et sur l'aplat) ; LCP mobile
  (3,1 s accueil, 2,8 s formules, 2,7 s chefs) : variantes 900 / 800 px en `srcset` pour les trois images LCP ;
  assiettes détourées affichées entières (`object-fit: contain`) sur la page formules ; scène du dressage mobile plafonnée
  à 46 svh pour que la liste des composants reste visible pendant le pin ; horaires de la page réservation en une phrase
  (répétition 4×).
- Passe 2 (accueil, chefs, formules ; `.shots-comptoir/*2/report.json`) : 0 failed, 0 erreur console, 0 violation axe,
  0 cible 1×1, 0 focus invisible, CLS 0, reduced-motion propre. LCP mobile : accueil 1,53 s, formules 2,48 s, chefs
  2,65 s (portrait N&B 800 px sous 4× CPU et 4G lent, loader compris : point ouvert). Un débordement de 18 px restait sur
  la page chefs en desktop : les traits d'angle `::after` se calaient sur `#main` faute de `position: relative` sur
  `.angle` ; corrigé et vérifié par script (scrollWidth = 1440 / 1280 / 1024). Audit final : 0 FAIL, 8 WARN normaux.

## Score du critique

Pas de critique dans cet agent (règle du 30/10/2026) : la skill `jury` et la revue sont faites ensuite par un agent distinct.

## Placeholders (chacun marqué dans `site.ts` et visible dans le gabarit)

- E-mail `bonjour@lespotesaufeu.be` (« adresse illustrative » au pied de page).
- Composants « Jus » et « Pousses » du dressage (lus sur la photo, pas dans le dossier) : « composant illustratif ».
- Boissons (accord mets et vins 32 €, cocktail 12 €) : « illustratif » + phrase d'avertissement.
- Rôle « Salle » de Sara et Jordan (prénoms réels, rôles non précisés) : « rôle illustratif ».
- Deux avis Google (Claire D., Thomas V.) : « avis illustratif », sans date.
- Aucune description de plat inventée (champs vides), aucune date écrite en dur (date minimale du formulaire calculée),
  une seule distinction, réelle (sélection Guide MICHELIN Belgique 2026, source et date de consultation affichées).

## Ce qui manque

- Vrais détourages des composants (médaillons ronds découpés dans la photo du plat, faute de photo studio).
- Photos de plats sur fond blanc : les trois « assiettes » sont des découpes rondes des photos existantes (assiette rouge,
  bleue), pas des vues zénithales sur nappe blanche.
- Carte des vins, composition des formules du midi, bios détaillées.
- LCP mobile mesuré en série sous 4× CPU + 4G lent ; le loader (plancher 1,1 s) pèse sur la mesure.

## Leçons structurelles (à reporter dans `agents/lecons.md`)

- Une marque d'en-tête masquée par `clip-path: inset(50%)` (1×1 px) reste focalisable : `shoot.mjs` la compte en
  `smallTargets` et `invisibleFocus` ; quand un autre lien porte la même cible en desktop, la retirer (`display: none`).
- Les traits décoratifs d'angle (`::after` à `right: -1.6rem`) créent 2 px de débordement horizontal en 390 px sans
  « offender » listé par `shoot.mjs` : les raccourcir dans la gouttière de 16 px, et vérifier `scrollWidth` par un
  mini-script Playwright (lancé depuis le scratchpad en important `browser.mjs` par chemin absolu).
- Une scène épinglée (`pin`) plus haute que le viewport mobile cache son bas pendant tout le pin : plafonner la scène en
  `svh` (stage `min(80vw, 46svh)`) plutôt qu'en `vw` seul.
- Un gris `muted` de cahier à 3,5:1 fait échouer axe sur chaque petite capitale : assombrir dès les jetons, pas élément
  par élément.
