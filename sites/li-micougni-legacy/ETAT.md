# ETAT : li-micougni legacy (phase 3 sur 3 faite, terminé)

## Fait (phase 2)
- Nav : pastille sticky (hauteur 0, top 16 px), « Réserver » en contour or (un seul plein par vue) ; menu mobile en `popover` natif sous 70rem (Menu/Fermer, Échap, focus rendu), CTA plein dans le menu sous 40rem.
- Signature : la plaque du hero se déploie (clip-path) puis titre et actions se fondent ; un seul reveal (fondu + 16 px) posé par script sous le pli, rien de caché sans script ni en mouvement réduit ; jour courant des horaires (« Aujourd’hui », fuseau de Namur).
- Formulaire de contact : `novalidate`, validation au blur puis à l'input, aide `min-height: 1lh`, `aria-invalid`, message « Rien n’a été envoyé : ce formulaire n’est pas encore relié » avec `tel:` et `mailto:`, jamais de succès. Testé (focus sur le premier invalide, 3 erreurs, puis message).
- Menu : rail sticky d'ancres vers les 11 rubriques (scrollspy `aria-current`), ids ASCII.
- États : hover sous `(hover: hover)` et seulement sur interactifs, `:active`, `:disabled` (opacité + pointillé), `(pointer: coarse)` 44 px, finitions mobile (boutons pleine largeur sous 40rem).
- Mesures Playwright : 0 débordement de 320 à 1440 sur 7 pages, h1 sans coupure, aucun bouton replié ; 0 erreur JS. sloplint statique + hero rendu : 0 FAIL, 0 WARN, 4 NOTE (58). Build vert, noindex, signature et mention sur les 8 pages (grep).
- DESIGN.md § Sur-utilisation complétée (2, 6, 7, 17, 19 à 24, 29, 30, 48, 49, 56, 58, 63, 72). comp.md : trois questions de reproduction. Leçons ajoutées à `agents/lecons/construction.md`.

## Reste
- Phase 3 : agent captures (QA-<étape>), sloplint `--render` par route (seul l'accueil rendu), jury, RAPPORT.md, `pnpm index`, entrée de `.hallmark/log.json` (axes, entry, fingerprint ; `git add -f`).
- Comp c2 (type-led sans photo) non construite : le stamp dit « 1 built ». Revue hero : auto-notation `self` (pas d'outil Agent, `review-hero.md` non lu).
- Non vérifié : rendu 1920, `/vitrine-du-restaurant/`, `/evenement-privee/`, `/a-propos-de-nous/` et `/notre-terrasse-arriere/` à l'oeil (seulement mesurés : débordement, h1). Contraste du bandeau fibre : visible mais discret sur la capture d'accueil.

## Décisions et hypothèses
- Formulaire gardé à 3 champs (original) ; pas de champs date/heure/couverts inventés, l'aide du message les demande.
- Reveal : un script marque les blocs sous le pli ; une capture pleine page sans défilement les montrera vides (le `beforeprint` les révèle).
- Pas de tablist pour la carte : une seule page longue, rail d'ancres plutôt que des onglets.
- `x@y` passe la validation native du navigateur (conforme à la spec) ; non durci.

## Pièges
- Les `import` en tête du frontmatter Astro. astro.config copié de le-ponti-2-legacy.
- `.contact__head > * { grid-column: 1 / -1 }` indispensable (sinon h1 à 0 px).
- Serveur de dev : PID noté dans le scratchpad (`lm-legacy-p2.pid`), arrêté en fin de phase.

## Phase 3 (QA)
- Fait : sloplint --render 7 routes (0 REFLEX ouvert, FAIL `kept` faux positifs), corrections 44d, 72, 19, waivers 71/77/83, checklist DESIGN.md, log Hallmark (17/20), RAPPORT.md, build + pnpm index. Serveur arrêté.
- Reste : QA-build.md absent (captures non faites par l'agent captures) ; gates jugées en auto-notation self ; comp c2 non construite ; rendu `/evenement-privee/` non revu à l'oeil.

## Revue 1 (relecteur-site, Sonnet) — terminée sauf terrasse
- REVUE-1.md écrit : A_CORRIGER, 0 F0, 1 F1 (mosaïque vitrine `page.css:189-190`), 4 F2, 6 F3.
- QA-revue1.md n'existait pas : captures par mes soins dans `.shots/lm-legacy-r1/` (accueil, menu, contact, vitrine, événement, à propos ; terrasse en cours à la clôture).
- Reste à faire : lire `notre-terrasse-arriere` (planche + report.json), voir `a-propos-de-nous` à l'œil, capture ciblée de la 404, remesurer LCP vitrine en deux passes après correction F1-1.
- Piège : `scripts/planche.py --colonnes 3 --largeur 720` lit 3 et 720 comme des images (ignorés, sans conséquence).

## Revue 2 (relecteur-site, Sonnet) — terminée
- REVUE-2.md écrit : A_CORRIGER, 0 F0, 0 F1, 2 F2, 6 F3. F1-1, F2-1, F2-4 confirmés corrigés ; F2-2 corrigé (résidu « nouvelles », F3-1) ; F2-3 corrigé sauf Événement privé (F2-2).
- Nouveau défaut : À propos, photo du hero de 528 px dans une colonne de ~440 px (`page.css:152`, `min-height` + `aspect-ratio` forcé), rognée par la fenêtre de 990 à 1440 px (F2-1).
- Reste (réviseur) : corriger F2-1 et F2-2, remesurer droite de la photo ≤ droite du conteneur de 990 à 1920 px, cibles Événement privé ; F3 au choix.
- Pièges : `overflow-x: clip` cache le débordement (scrollWidth = fenêtre) : balayer les `getBoundingClientRect().right` sur 12 largeurs ; scripts maison dans `.shots-li-micougni-legacy-revue2/lm2-*.mjs`. Serveur 4781 arrêté.
