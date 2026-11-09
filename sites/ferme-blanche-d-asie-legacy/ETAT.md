# ETAT · ferme-blanche-d-asie · legacy · construction-3 (09/11/2026)

## Fait (phases 1 et 2)
- Phase 1 : audit, deal Spore, comps, 6 pages, données réelles, photos recadrées sous le filigrane (voir `DESIGN.md`).
- Phase 2 : nav **slab** 64 px sticky (remplace la pilule flottante, déjà utilisée par chez-guillaume : règle 42), `<nav popover>` unique (liste au bureau, panneau sous 60rem, bouton Menu/Fermer), lien d'évitement ; « Réserver » (secondaire) vers `/reserve`, `tel:` conservé ailleurs.
- Contrôles : huit états des boutons et onglets, survol sous `(hover: hover)`, `:active`, `:disabled`, 44 px (48 au pointeur grossier), onglets au clavier (flèches, Début, Fin, hash), panneau focusable.
- Jour courant en Europe/Brussels. Reveal : `waive 62` (thème still, aucun ajouté). Reduced motion : règle globale + menu.
- Responsive : `scrollWidth` = fenêtre sur 5 pages à 320, 375, 1024, 1440 ; hero tient en 375x812, 320x568 ; chiffre 29 € recalé (plus de débordement de colonne) ; pied en une colonne sous 40rem ; chip « Aujourd'hui » sous le jour.
- Hero review `self` : ship (1 finding résolu), voir `comp.md` (questions de reproduction incluses). sloplint rendu hero : 0 FAIL, 0 REFLEX (WARN 49 « label long sans nowrap » = faux positif, `.btn` est `nowrap`).
- Build : `pnpm build:site` passe ; noindex, mention et pied KYW vérifiés par grep sur les 6 pages de `dist/`.

## Reste (phase 3 et captures)
- Agent captures : shoot complet (desktop, 375, reduced motion), `QA-build.md`, axe.
- Phase 3 : sweep, jugées § 5 (`gates.md`), RAPPORT.md, `preflight.json`, `pnpm index`, publication.
- Entrée de `$LOG` pour ce restaurant absente du journal partagé (`jq` n'y trouve aucun `ferme-blanche`) : à vérifier / `log` en phase 3 avec nav = slab.

## Décisions et hypothèses
- Nav : « Réserver » mène à `/reserve` (le numéro reste sur chaque page) ; aucun formulaire (original sans formulaire).
- Menu mobile sans repli JS : `popover` natif ; `@supports not selector(:popover-open)` remet les liens en ligne.
- Pièges : `sites/ferme-blanche-d-asie-awwwards` modifié par un autre agent et `pnpm-lock.yaml` : non commités ici. Avis, droits photos (filigrane « Find Your Place ») à valider avec le client.

## Phase 3 (QA) : terminée
- Corrigé : cibles tactiles du pied, retours à la ligne (e-mail, marque, Facebook), stamp CSS (slab). 404/robots/sitemap = faux positifs.
- sloplint : 0 FAIL, 0 REFLEX ouvert (5 waivers). Build et `pnpm index` passés. Voir `RAPPORT.md`.
- Restant : finish review sous-agent non lancée ; DESIGN.md checklist 72 cases non revérifiée ; entrée `$LOG` à ajouter ; publication.
