# ETAT · dolce-vita-wepion · legacy · fin de la phase 2 (construction-2)

## Fait (phase 1 : voir DESIGN.md et AUDIT.md)
- Phase 2 : nav bandeau sticky qui se rétracte (JS), fixe et transparente sur la photo à l'accueil puis pleine ; menu Popover sous 60rem (CTA dans le menu sous 40rem) ; skip link, `main tabindex="-1"`.
- Signature : voile « lumière du soir » sur la façade (CSS, opacité) ; état « Ouvert, jusqu'à 22 h 00 » dans le hero et le menu, ligne du jour et créneau en cours dans le tableau des horaires. Testé avec `page.clock` + `Europe/Brussels` sur 8 instants, tous corrects (`.logs/dvl2-test.log`).
- Un reveal (`src/scripts/ui.ts`, posé par le script, `.js` seulement), reduced motion (0 `data-reveal`, voile figé), sans JS (0 élément à opacité 0, nav absolue).
- Boutons : `:active`, disabled à trois canaux, hovers sous `(hover: hover)`, liens et puces avec `:active` ; pied : liens de 44 px ; safe-area dans `.container` ; hero `max(34rem, 100dvh)`.
- Aucun formulaire ni switcher : réservation par téléphone (`tel:` conservé), carte en Index de catégories. Aucune chorégraphie de scroll (original non animé au scroll).
- Mesures : aucun débordement horizontal ni cible < 44 px de 320 à 1440 px sur les 4 routes (hors pied KYW, non modifiable).
- Hero review : `sloplint --render --stage hero` 0 FAIL, 3 WARN 49 (faux positifs, `.btn` nowrap), 1 NOTE 58 (94 mots à 1440 px, tableau de la carte plus bas) ; revue en auto-notation `self` (pas d'outil Agent) : 1 finding, résolu (bande sombre à 1920×1080). Comp : trois questions dans `comp.md`.
- Build passe (`dist/dolce-vita-wepion/legacy/`), noindex, mention et un pied KYW sur les 5 routes. Serveur de dev arrêté.

## Reste
- Captures complètes (agent « captures ») : vérifier le reveal à la molette (`shoot.mjs` attend 1,3 s), la nav rétractée sur les captures défilées (elle disparaît en descendant : normal), le menu mobile.
- Phase 3 : sweep, gates jugées § 5, `RAPPORT.md`, entrée de log finale, `pnpm index`, commit de `dist/index.html`.
- Non fait : revue du hero par un sous-agent frais (indisponible en session d'agent).

## Pièges
- Le menu mobile est un Popover dans le `<header>` : il sort du flux (top layer), mais `inset: var(--nav-h)` suppose la nav à 72 px ; si la nav change de hauteur, ajuster `--nav-h`.
- `.js .nav--over { position: fixed }` : sans JS la nav de l'accueil reste `absolute` (jamais transparente sur du texte).
- L'état « ouvert » lit `data-midi` / `data-soir` du tableau (`Fin.astro`) : toute modification des horaires passe par `HORAIRES` dans `site.ts`.
- Hypothèse : fermeture le mardi entier, mercredi et samedi soir seulement (donnees.json) ; l'état ne tient pas compte des jours fériés ni de fermetures exceptionnelles.
