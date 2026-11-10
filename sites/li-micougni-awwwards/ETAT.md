# ETAT.md · Li Micougni · awwwards · construction phase 2

## Fait (phase 1)
- Brief, concepts, Concept Card « Les demi-fous », système, plan, checklist 1 à 18 (DESIGN.md).
- Scaffold Astro 5, engine sans GL, 5 pages, `Demi.astro`, Header, Footer + KywFooter, données réelles, photos du client.

## Fait (phase 2)
- Pilote `src/motion/recoller.ts` : `--ecart` par titre (avancée vers la lecture + intro du h1 + souffle de repos + pointeur), sur `gsap.ticker`, en pause hors écran, absent en mouvement réduit. Entrée de repos `src/motion/idle.ts`.
- Ouverture du h1 posée en CSS sous `html.motion` (0,39 em), recollée à 0,07 em dans l'intro (1,1 s), puis à 0 au défilement ; nom du pied recollé en fin de page (Demi, `aria-hidden`).
- Transition : rideau en deux moitiés (coupe à 55 %) qui se rejoignent puis se lèvent (`setup.ts`, `Base.astro` : `.curtain__h`, `.curtain__b`).
- Survols : 3 traitements (remplissage en deux moitiés, trait en deux moitiés, titre-lien qui se recolle), sous `(hover: hover)` + `:focus-visible`, `:active` ; survol du lien KYW.
- Menu mobile : `<dialog id="menu">` orange plein écran, bouton « Menu » `aria-expanded`, Tab bouclé, Échap, focus rendu, fermé au départ d'une transition ; en-tête mobile « Réserver » + « Menu » (44 px).
- Reveals : `clip` sur photos hors premier écran (accueil, histoire `hist__b`, carte), `up` sur les lignes de plats de l'accueil, `data-split="lines"` sur `ardoises__intro` et `enonce__note`.
- `#main, .pied { overflow-x: clip }` (la moitié basse décalée ne crée aucun défilement horizontal).
- Mesures Playwright (script hors dépôt) : aucune erreur console bureau ni téléphone ; `scrollWidth` 390 sur les 5 pages ; menu 390×844, 0 sortie de focus sur 14 Tab ; réduit sans `.motion` ni Lenis, 0 bloc caché ; h1 0,670 em au chargement, 0,077 à 2,2 s, 0,0055 à scrollY 720.
- DESIGN.md : § Mouvement réécrit, checklist 19 à 47 avec preuves. Build OK, `dist/li-micougni/awwwards/` à jour.

## Reste (phase 3)
- QA complète par l'agent captures : lire `hover.noHoverChange`, `desktop.idleMotion`, `settledMs` (le souffle de ±0,008 em pourrait le rendre null : si c'est le cas, couper le souffle du h1 seulement, pas celui des autres titres), `reduced.*`, contraste des CTA survolés, axe, clavier.
- Juger le premier frame du hero (moitiés basses décalées de 0,39 em) ; si le jury le trouve illisible, baisser `OUVERTURE` (`recoller.ts`) et `html.motion h1` (`site.css`) ensemble.
- OG composée (`public/og.png` provisoire), RAPPORT.md final, sloplint.

## Décisions
- Ni loader, ni GL, ni curseur suiveur, ni effet magnétique (Concept Card).
- Plats et photos sans survol (ce ne sont pas des liens) : remplacé par le titre-lien qui se recolle.
- Menu à `<dialog>` plutôt qu'un overlay maison : Échap et inertie du fond natifs, boucle Tab ajoutée (leçon le-servais).

## Pièges
- `--ecart` est en `em` : pas de `@property` possible (une valeur initiale en em est refusée) ; le survol passe par un multiplicateur `--k` (0 = recollé) avec `transition: translate` sur `.demi__b`, jamais sur les titres pilotés par le ticker.
- Une variable posée en ligne par GSAP (`--ecart` des liens du menu) bat la feuille : le survol agit sur `--k`, pas sur `--ecart`.
- Serveur de mesure : `python3 -m http.server 4400 --directory dist`, PID noté puis `kill`.
