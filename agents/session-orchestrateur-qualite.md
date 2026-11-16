# Prompt d'orchestrateur qualité (phase 3+, configuration F)

Modèle : claude-haiku-5-5, tag `kyw-qualite-p3`. Remplacer `<slug>` et `<n>` (numéro de phase). Retenu après la phase 2 :
F (identifier + rectifier dans le même agent) coûte autant que H et évite un second contexte de départ.

```
Rôle : orchestrateur-qualite · Restaurant : <slug> · Phase : <n>
Tu orchestres l'identification et la correction des problèmes du restaurant `<slug>` (configuration F). Ne lis aucun fichier de consigne : tout est ici. Français, aucune question, messages courts, commandes groupées. Branche `claude/laughing-wozniak-vxc1fo` (si HEAD détachée : `git checkout -B claude/laughing-wozniak-vxc1fo origin/claude/laughing-wozniak-vxc1fo`). Tu ne corriges rien toi-même. Jamais de `sleep`, de boucle `while`/`until` ni de Monitor : attends uniquement par `curl --retry`.

1. `cd /home/user/KYW-test-restaurant && git pull --rebase origin claude/laughing-wozniak-vxc1fo && scripts/q.sh install pnpm install`. Note l'heure de début.
2. Lance en parallèle 3 agents (outil Agent, `subagent_type: "identifier-rectifier-site"`), un par variante (portfolio, awwwards, legacy). Prompt : première ligne EXACTE « Rôle : identifier-rectifier-site · Restaurant : <slug> · Variante : <v> · Phase : <n> », puis « Site : <slug> / <v>. » Note la durée de chacun. Si un agent répond « marqueur lancé : non » ou sans capture après une correction visuelle, note-le dans le compte rendu (ne relance pas).
3. `python3 scripts/scan-brouillon.py data/review/<slug>/brouillon-apres.json <slug> | grep '###'` (0 attendu), puis `scripts/q.sh index node scripts/index.mjs`.
4. `git add sites/<slug>-* dist/<slug> dist/index.html dist/gabarits/index.html dist/suivi data/suivi.html data/review/<slug> agents/lecons` ; commit « Identifie et corrige les problèmes de <slug> (phase <n>) » ; `git pull --rebase` (conflit sur dist/index.html, dist/suivi ou data/suivi.html : version distante puis `node scripts/index.mjs` ; sur agents/lecons/*.md garde les deux côtés) ; `git push`.
5. Vérification en ligne, UNE commande qui attend le déploiement sans sleep : pour chaque v, `curl -s --retry 12 --retry-delay 15 --retry-all-errors -o /tmp/<v>.html -w '%{http_code}\n' https://kyw-test-restaurant.vercel.app/<slug>/<v>/` puis `grep -c kyw-footer` et `grep -c 'à confirmer'` (attendu 200, ≥1, 0). Si le contenu est encore l'ancien, refais la même commande une fois.
6. Mesures (id local = fichier `~/.claude/projects/*/<id>.jsonl` le plus récent) : `python3 scripts/usage-detail.py <id> data/usage/p<n>-detail-<slug>.json && python3 scripts/usage-commandes.py <id> data/usage/p<n>-commandes-<slug>.json && python3 scripts/usage-phases.py <id> data/usage/p<n>-phases-<slug>.json` ; commite, pousse. Ne les lis pas.
7. send_message à la session de reporting : « mise à jour phase <n> <slug> », id local, configuration F, problèmes trouvés et corrigés par variante, libellés brouillon corrigés et restants, marqueur présent par agent, pages capturées après correction, refus du hook, durée de chaque agent. Puis le même compte rendu en 8 lignes à la session mère. Puis arrête-toi.
```
