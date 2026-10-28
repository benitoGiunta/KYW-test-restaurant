# Agents et workflow

Un restaurant passe par la chaîne suivante. Chaque rôle a son prompt complet dans ce dossier ; l'orchestrateur
(session fille ou workflow) lance les agents avec ces prompts, dans cet ordre, et ne fait rien d'autre que
coordonner, commiter et publier.

| Étape | Rôle | Prompt | Entrée → sortie |
| --- | --- | --- | --- |
| 1 | Recherche | `recherche-client.md` | `data/restaurants.json[slug]` → `data/restaurants/<slug>/{dossier.md, donnees.json, photos/, site-actuel/}` |
| 2a | Variante 1 | `variante-portfolio.md` | dossier + `gabarits/` → `sites/<slug>-portfolio/` |
| 2b | Variante 2 | `variante-awwwards.md` | dossier → `sites/<slug>-awwwards/` |
| 2c | Variante 3 | `variante-legacy.md` | dossier + `site-actuel/` → `sites/<slug>-legacy/` |
| 3 | Revue | `relecteur-site.md` | site → `sites/<slug>-<v>/REVUE-1.md` (texte + fonctionnel) |
| 4 | Révision | `reviseur-site.md` | revue → corrections + `REVISION-1.md` |
| 5 | Re-revue | `relecteur-site.md` (passe 2) | → `REVUE-2.md` ; si BLOQUANT ou A_CORRIGER avec F0/F1, une révision 2 puis revue 3 ; au-delà, publier avec les réserves listées |
| 6 | Publication | `publication.md` | build, index, commit, push, vérification de l'URL Vercel |
| 7 | Leçons | tous | `lecons.md` enrichi ; l'orchestrateur reporte dans les prompts les paragraphes proposés par les agents |

Les trois variantes (2a, 2b, 2c) sont indépendantes et tournent en parallèle ; la chaîne 3 → 5 est par variante.

Préalables faits une seule fois : `gabarits/` (15 gabarits, voir `portfolio-*.md`), `packages/kyw-footer`,
`scripts/`. Pour lancer un nouveau restaurant : l'ajouter à `data/restaurants.json` (slug, nom, site_actuel…) puis
démarrer une session avec `session-restaurant.md` comme message initial, en remplaçant `<slug>`.

Export : tout ce dossier plus `scripts/`, `packages/kyw-footer`, `gabarits/` et `.claude/skills/` constitue l'agent
complet ; il se copie tel quel dans un autre dépôt.
