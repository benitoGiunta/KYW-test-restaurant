# ETAT · le-brunchist · variante legacy · fin de la phase 2 (construction-2)

## Fait (phases 1 et 2)
- Phase 1 : AUDIT.md, DESIGN.md, comp.md, paquet Astro complet (one-page + 404), contenu issu du dossier uniquement.
- Phase 2 : menu mobile `<dialog>` (nav sans script conservée), Appeler en contour dans la barre, section courante, ligne du jour des horaires (signature), Switcher complet au clavier (Début/Fin, panneaux focusables), fondu de panneau, bouton enfoncé 1 px, indications « nouvel onglet », token `--color-scrim`, safe-area, `scroll-padding-top`, cadre du hero carré (68 dvh).
- Motion : thème still, pas de reveal (voulu, voir DESIGN.md § Phase 2). Pas de formulaire (aucun outil de réservation connu).
- Hero review en auto-notation `self` : fix, 1 finding résolu (photo 53 % -> 68 % de la hauteur du premier écran). Comp reproduite à 1280x800.
- Mesures navigateur (Playwright, 375, 320, 1440, 1920) : aucun débordement horizontal, aucune erreur console, menu ouvert/fermé (Échap, lien), focus initial « Carte », ligne du jour posée, sticky à 0.
- Build : `scripts/q.sh build pnpm build:site sites/le-brunchist-legacy` passe ; sloplint sur copie aplatie : 7 FAIL, tous du paquet `kyw-footer` (jamais modifié). `dist/le-brunchist/legacy/` à jour (index et 404 : noindex, pied KYW).

## Reste (phase 3)
- Captures complètes 375/1440/1920 (agent captures), sweep, juges, RAPPORT.md, commit `[publier]` final avec `pnpm index`.
- Titre du hero en 4 lignes à 1440 (comp : 3) : choix gardé, à rejuger sur capture.
- WARN 28a sloplint sur Carte et Lieu : faux positifs (images sous le pli, `lazy` voulu ; le LCP est la photo du hero en `fetchpriority="high"`).

## Hypothèses et pièges
- Pas de sous-agent possible en session d'agent : hero review et jury sont des auto-notations `self`.
- Le serveur de dev Astro affiche une barre d'outils sombre en bas des captures : artefact du mode dev, absent du build.
- Un `<h4>` sans `margin: 0` écartait nom et description des rangées de la carte (corrigé) ; les captures à `scrollIntoView` pendant le défilement doux montrent une barre décalée : attendre ou couper `scroll-behavior`.
- Garder : Grenze Gotisch jamais sous 30 px ni en h3 ; sloplint seulement sur copie aplatie (`bl-lint.sh` du scratchpad).

## Phase 3 (QA) terminée
- Corrections : survol de la marque, cibles tactiles 44 px. Build final passé, dist à jour. RAPPORT.md écrit.
- Non fait : sweep sloplint, finish review, jury, checklist 72 cases de DESIGN.md, `pnpm index` et commit (non demandés dans ce lot).
