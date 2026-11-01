# ETAT · brasserie-du-quai · variante legacy · fin de la phase 2 (construction-2, 01/11/2026)

## Fait en phase 1 (voir l'historique git : 6ffb9bb)
Concept Spore head-torch, DESIGN.md (Picks, Approche, Thème, Système, Composants), contenu réel, 6 routes + 404, composants Nav, Footer, Saisons, Photo.

## Fait en phase 2
- **Motion** : décidée et écrite (DESIGN.md § Système) : calme, état seulement, aucun reveal (Spore « nothing reveals », site d'origine sans chorégraphie au scroll). Menu mobile : entrée opacité + 8 px (`@starting-style`, 220 ms).
- **Signature** : « 15 » ocre + « € » en exposant (0,4 em), texte complet en `.visually-hidden` (`src/pages/index.astro`).
- **Interactions et états** (`src/styles/page.css`, `src/layouts/Base.astro`) : survols sous `@media (hover: hover)`, appui 1 px, désactivé (3 canaux), focus global ; modules Zenchef/Brydge : `aria-busy`, ligne `role="status"` (chargement, lenteur à 10 s), lien direct conservé sous l'iframe (`data-repli`), succès = le module chargé. Menu : `<nav popover aria-label="Menu du site">`, `aria-label` du bouton retiré (le nom visible « Menu » fait foi, WCAG 2.5.3), fond bloqué quand ouvert, lien courant en ocre. Sommaire de la carte : défilement doux sans préférence de réduction, `scroll-margin-top` sur les rubriques.
- **Mobile** : nav à 320 px (le bouton Menu débordait de 48 px) resserrée sous 23,75rem ; table des huîtres restackée sous 30rem (`data-label`, débordait à 320 px) ; barre collante sans primaire sur /reservation/ (le module porte déjà « Réserver en ligne »).
- **Finition majeure** : `figure { margin: 0 }` : la marge UA de 40 px rognait le hero Poster et toutes les photos.
- **Contrôles** (scripts dans le scratchpad, Playwright via `jury/scripts/browser.mjs`) : 0 débordement sur 7 routes × 320/375/390/768/1280/1440 ; menu ouvert/fermé par Échap ; skip link au premier Tab ; module : chargement → chargé en < 4 s ; reduced-motion : `scroll-behavior: auto`, transitions 0,01 ms ; 0 erreur console.
- **Build** : `scripts/q.sh legacy-build pnpm build:site sites/brasserie-du-quai-legacy` OK, `noindex` + `kyw-footer` vérifiés sur les 7 pages de `dist/brasserie-du-quai/legacy/`.

## Reste (phase 3)
- Audit Hallmark `AUDIT.md` (`sloplint --before`), `comp.md` (deux comps HTML du premier écran), `sloplint src --render --stage hero` puis `--kept` par route (serveur `astro dev` port libre, PID noté), hero review et finish review (stampées `self`), stamp complet (contrast, fold, comp, hero-review, critique pré-émission), 72 cases de la liste de sur-utilisation dans `DESIGN.md`, `RAPPORT.md`, `theme.mjs log --log $ROOT/.hallmark/log.json` + `git add -f .hallmark/log.json`, `pnpm index`.
- À vérifier en QA : contraste du voile du hero sur le lead à 390 px (texte sur la partie claire de la photo) ; contraste du logo KYW sur fond sombre ; l'iframe Zenchef chargée peut redonner un FAIL 26a (leçon les-potes-au-feu : déjà chargée à la demande seulement).

## Pièges
- `aria-expanded` n'est pas écrit en attribut par `popovertarget` (Chromium l'expose dans l'arbre d'accessibilité seulement) : un contrôle `getAttribute('aria-expanded')` lit `null`, ce n'est pas un défaut.
- La barre d'outils d'Astro dev apparaît en bas des captures du serveur de dev (icônes au bas du hero) : ne pas la prendre pour un défaut.
