# ETAT : makimono-legacy (fin de la phase 2 sur 3)

## Fait (phase 1)
Audit, approche, deal Halftone, comp c1, DESIGN.md, contenu réel (`site.ts`, `carte.json`), page `/` et `/404`, photos WebP, build.

## Fait (phase 2)
- Hero review : sloplint `--stage hero` 0 FAIL ; pas d'outil Agent en session : revue notée `self`. `hero-review: ship (self) · 2 findings · 2 resolved` : (1) bande crème vide sous le hero à 1920x1080 (plafond 900 px) → `max(34rem, 100dvh - 75px)` ; (2) à 375 le premier écran n'avait que la photo → image à 38dvh, titre et bouton plein visibles dans les 812 px.
- Comp : reproduction écrite dans `comp.md` (Masse, Intervalle, Entrée, écart gardé).
- Nav : « Commander » passe en contour (`btn--ligne`) pour n'avoir qu'un bouton plein par écran ; lien actif (`aria-current="location"`, scrollspy sur toutes les sections, Composer et Boxes sans lien actif) ; liens de nav préfixés par la base sur la 404 ; menu mobile `popover` refermé au clic d'un lien (script, un `<a>` n'accepte pas `popovertarget`) ; gap réduit sous 40 rem (tient à 320) ; logo `alt=""` (le lien porte l'aria-label), burger sans aria-label (libellé visible « Menu »).
- Carte : onglets visibles seulement sous `.js` (sans script tout est affiché), `tabindex="0"` sur les panneaux, signature de phase 2 : au changement d'onglet le filet de chaque rubrique se trace (scaleX) et les lignes montent (opacité, 8 px) ; clavier flèches, Début, Fin vérifiés.
- Horaires : jour courant (Europe/Brussels) en `aria-current="date"` + étiquette « Aujourd’hui » ; tint de fond et nom en vermillon.
- Reveal unique (11 blocs de structure : tuiles, puits, boxes, photo ; aucun lien dedans) sous `.js.reveal-on`, posé par le script seulement sans mouvement réduit ; scroll doux sous `no-preference`.
- Survols sous `@media (hover: hover)`, `:active` sur chaque contrôle, liens du pied à 44 px avec focus crème, `::selection` du pied.
- sloplint `--render --url` : 0 FAIL, 0 REFLEX, 2 WARN 28a (faux positifs : images sous le pli en `loading="lazy"`), 1 NOTE 58. Playwright 1920 à 320 : aucun débordement horizontal. Build passe (2 pages), noindex et `kyw-signature` présents sur `/` et `/404`.
- `Base.astro` charge `page.css` par `<style is:global>@import</style>` (sloplint ne suit pas l'import JS).

## Reste (phase 3)
- `sloplint --kept` sur les mêmes cibles que `--before`, RAPPORT.md, gates jugées (§ 5), entrée finale du journal `.hallmark/log.json`, QA navigateur par l'agent captures (reveal : captures pleine page sans défilement montrent les blocs vides).
- Vérifier la trame de points (événement, pied) sur captures et la hauteur des tuiles du bento (g2 sur deux rangées, 720 px).

## Hypothèses et pièges
- Hypothèses de phase 1 inchangées (pas de réservation de table, action = commande en ligne, téléphone du site, prix Futo à confirmer, aucune donnée fictive).
- Pas de formulaire : états d'input et faux envoi sans objet.
- Le « Réalisé par » du KywFooter mesure 24 px (composant partagé, non modifié).
- Pièges : `planche.py` ne gère pas `--colonnes` en options (les valeurs sont lues comme des images) ; un `page.screenshot` à chemin relatif écrit depuis le cwd (fichier perdu à la racine).
