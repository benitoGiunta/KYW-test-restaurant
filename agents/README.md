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

## Organisation et budget (décision du 30/10/2026, après le rapport `data/usage/RAPPORT-1.md`)

La session 1 a coûté environ 263 $ au tarif Fable (52 % pour l'évaluation en navigateur des 106 sites, 12 % pour
l'orchestration) et a épuisé la limite hebdomadaire en moins d'un jour. La suite respecte les règles ci-dessous ; ordre de
grandeur visé : ≈ 880 $ pour tout ce qui reste (15 gabarits, 20 restaurants × 3 variantes, revues, publications), contre
≈ 1 500 $ à méthode constante. À recaler après les trois premiers gabarits (écart > 30 % signalé au porteur).

**A. Un modèle par rôle** (en-tête `model:` de chaque prompt, `model:` dans le workflow)
- Fable 5.1 : directions artistiques, code des gabarits et de la variante awwwards, arbitrages finaux.
- Depuis le 31/10 (limite Fable atteinte, consigne du porteur) : tous les rôles Fable tournent sur Opus 5.5 (frontmatter et workflow mis à jour).
- Opus 5.5 (`opus`) : orchestration des sessions filles, variantes portfolio et legacy, révisions après revue.
- Sonnet 5.5 (`sonnet`) : évaluation visuelle et jury, recherche web, dossiers clients, revues de site, leçons.
- Haiku 5.5 (`haiku`) : captures par script, vérifications mécaniques (liens, axe, tailles), index, publication.
- Un rôle qui lit des images ou des pages et n'écrit pas de code ne tourne jamais sur Fable.

**B. Parallélisme et coupures** : au plus 3 agents lourds en parallèle, par vagues ; une relance planifiée après la fenêtre
de 5 h plutôt qu'une coupure. Un agent coupé n'est jamais repris avec sa mémoire : chaque agent écrit son avancement dans des
fichiers au fil de l'eau (un fichier par site évalué, un `ETAT.md` par gabarit ou variante) et un agent **neuf** reprend à
partir de ce qui reste.

**C. Captures séparées de l'évaluation** : les captures (`scripts/capture-site.mjs`, `shoot.mjs`) sont lancées avant tout
agent qui lit des images ; un évaluateur ne démarre que quand les images sont sur le disque et n'attend jamais plus de
5 minutes (le cache de contexte expire).

**D. Contexte minimal** : planche-contact par site (haut, 3 frames, mobile) lue en un seul Read, pleine résolution seulement
en cas de doute ; pré-traitement par script (grep, head) plutôt que lecture de fichiers entiers ; notes écrites juste après
chaque lecture ; jamais relire un fichier connu.

**E. Agents courts** : 7 sites par évaluateur, 40 réponses au maximum ; un agent pour construire un gabarit, un autre (Sonnet)
pour le relire, un troisième (Opus) pour corriger ; un agent par variante de site.

**F. Orchestrateur maigre** : une session fille par restaurant (Opus 5.5), qui ne lit pas de fichiers lourds et ne reçoit
que des résumés de 10 lignes ; prompts d'agents courts qui renvoient aux fichiers de `agents/` au lieu de les recopier.

**G. Mesure continue** : en fin de session, `python3 scripts/usage-extraire.py ~/.claude/projects/-home-user/ <id-session>
data/usage/consommation-session-<N>.json`, commit, puis message « mise à jour » à la session de reporting
(session_01CZvTL6CxaNhZLTFNhY85LB) qui republie le tableau de bord.

Séquence des chantiers restants : (1) gabarits par vagues de 3 (construction Fable → revue Sonnet → correction Opus →
publication Haiku), (2) restaurant 1 en session fille test, (3) restaurants 2 à 20 par lots de 3 sessions filles.

**H. Garde-fou de consommation (30/10/2026).** Un seul critère d'arrêt, fixé par le porteur : **65 % de la consommation
hebdomadaire** (`unifiedWindows.seven_day.utilization` dans les événements `rate_limit_event` de la session, lus par
`list_events` avant chaque lancement). À 65 % : arrêt immédiat de tout lancement, les agents en cours terminent, on commite,
on publie, on prévient le porteur. La fenêtre de 5 h n'est pas un critère : si elle coupe des agents (HTTP 429), on les
relance par des agents neufs après sa réinitialisation (`send_later`), sans pause préventive.
