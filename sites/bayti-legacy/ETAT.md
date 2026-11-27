# ETAT · bayti legacy · fin de phase 3 (QA) (27/11/2026)

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

## Fait (phase 3)
- Sloplint rendu 7 routes : 1 FAIL corrigé, REFLEX restants levés par waive (page.css). twitter:card, footer en <p>, galerie 15 photos, photo de bannière plafonnée. 404.html réelle : 0 axe. Build + pnpm index OK. RAPPORT.md écrit.

## Reste
- .hallmark/log.json en conflit (UU) : non touché ; entrée de log bayti-legacy à écrire par la session mère.
- Pas de finish review sous-agent (self), pas de jury. Contraste paper-hover à vérifier si repris.
- Serveurs arrêtés.
