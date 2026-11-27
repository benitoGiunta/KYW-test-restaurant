# ETAT · bayti legacy · fin de phase 2 (27/11/2026)

## Fait (phase 1, rappel)
AUDIT.md, DESIGN.md, comp.md, thème Squeeze, 8 pages, build OK, KywFooter, noindex et mention sur les 8 pages.

## Fait (phase 2)
- Nav : popover sous 70rem (Menu/Fermer, Échap, clic lien), Réserver en contour, skip link en premier arrêt de tabulation.
- Boutons : `.btn` primaire, `--outline`, `--tonal` ; huit états (hover par opacité d'un pseudo-élément, `:active` 1px, `:focus-visible`, `:disabled` fond+encre+bordure pointillée+curseur, état « envoi »).
- Formulaire de contact : placeholders en format, `inputmode`, `aria-invalid="true"`/retrait, message « Erreur : … », message de non-envoi conforme (70), revalidation à l'input dès qu'un champ est en erreur, anneau inset, désactivé en trois canaux. La réservation reste le lien Barestho conservé.
- Switcher de carte traiteur : onglets `.btn`, anneau de l'onglet choisi, flèches + Home/End.
- Mouvement : état seulement (thème). Aucun reveal : waive documenté (DESIGN.md 22). Reduced motion : règle globale base.css.
- Hero raccourci : les prix (signature) affleurent dans le premier écran. hero-review: self, 1 finding resolved.
- Pied du site : `<section aria-label>` au lieu de `<footer>`.
- Libellés raccourcis pour ne jamais se replier : « Laisser un avis », « Demander un devis » ; chapeau de bayti-chez-vous raccourci (« …de petite à grande ampleur. », fin de phrase d'origine retirée, mention à reprendre en revue).
- sloplint src : 0 FAIL, 0 REFLEX, 1 WARN (mesure 24ch de la citation display, assumée). Playwright : pas de débordement à 320/375/768 sur 8 routes, aucun contrôle < 44px, 0 erreur JS, sans JS panneaux et nav lisibles.
- Build OK : `dist/bayti/legacy/`.

## Reste (phase 3)
- Captures complètes (agent captures), sloplint --render sur les 7 autres routes, RAPPORT.md, `--kept` contre before.json, revue.
- Comps c1/c2 non construits (waive budget) ; contraste de `--color-paper-hover` (51 %) avec le texte muted non mesuré à l'outil : vérifier à la capture.
- `.hallmark/log.json` est en conflit de fusion (UU) dans le dépôt : non touché, à résoudre par la session mère.
- Le serveur de dev est arrêté.

## Pièges
- sloplint F4 compte tout `.btn` ayant un `background` : l'overlay de survol est écrit `:where(.btn)::before`, et le disabled en `button:disabled, [aria-disabled]`.
- `aria-invalid=""` (toggleAttribute) vaut false : poser `"true"`.
