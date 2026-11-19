# Étape 2 — Développer les 3 sites d'un restaurant

Version : **développement, approche 6** (`VERSIONS.md`). Une session par restaurant, créée par la session mère avec
`create_session` : modèle `claude-opus-5-5` explicite, dépôt et branche de `parametres.md`, tag `kyw-<campagne>`.
Remplacer dans le message ci-dessous `<slug>`, `<phase>`, `<campagne>`, `<seuil-hebdo>`, `<session-mere>`,
`<session-reporting>` (valeurs de `parametres.md`). Ne rien changer d'autre : c'est ce message qui fixe la version.

Le workflow `agents/workflow-restaurant.js` contient toute la chaîne (rôles, modèles, efforts, plafonds) ; la session
ne fait qu'orchestrer, vérifier et mesurer.

## Message de lancement

```
Tu es l'orchestrateur du développement du restaurant `<slug>` dans ce dépôt (phase de mesure : <phase>, campagne <campagne>). Lis `CLAUDE.md` puis `agents/sobriete.md` (règles de sobriété prioritaires) ; ne lis rien d'autre en entier : le workflow contient tout.
Langue : français. Branche `claude/laughing-wozniak-vxc1fo`. Ne pose aucune question : décide, note tes hypothèses, livre. Session entièrement autonome. Tu traites UNIQUEMENT ce restaurant (3 sites : portfolio, awwwards, legacy), puis tu t'arrêtes.
Le porteur autorise l'exécution du workflow `agents/workflow-restaurant.js` avec l'outil Workflow pour cette session.
Photos : n'utilise jamais une photo portant le filigrane ou le logo d'un tiers (plateforme, annuaire, photographe) ; préfère une photo libre marquée comme illustrative.
Toi-même, utilise `scripts/q.sh <nom> <commande>` pour toute commande longue (un hook refuse sinon les commandes bavardes).

0. Départ propre : `cd /home/user/KYW-test-restaurant && git fetch -q origin claude/laughing-wozniak-vxc1fo && git checkout -B claude/laughing-wozniak-vxc1fo origin/claude/laughing-wozniak-vxc1fo && scripts/q.sh install pnpm install && scripts/q.sh index node scripts/index.mjs`. Vérifie que `data/restaurants.json` contient `<slug>`. Note l'heure de début et l'utilisation hebdomadaire du compte (`list_events` sur ta session, `kinds: ["rate_limit_event"]`, champ `unifiedWindows.seven_day.utilization`).
1. Condition d'arrêt : si l'utilisation hebdomadaire atteint <seuil-hebdo> (contrôle avant le lancement, puis toutes les 20 minutes via `send_later`), arrête le workflow (TaskStop), commite l'état de ce restaurant uniquement, écris `sites/ETAT-<slug>.md` (fait, reste, id du workflow pour reprise), fais la mesure (étape 4), préviens la session mère et ne relance rien. Si la limite de 5 h coupe des agents, programme une reprise après réinitialisation (`resumeFromRunId`).
2. Lance le workflow `agents/workflow-restaurant.js` (outil Workflow, `scriptPath` = chemin absolu, `args` = `{ "slug": "<slug>", "phase": "<phase>" }`). Suis-le jusqu'au bout ; s'il s'arrête, relance avec `resumeFromRunId`. Sans outil Workflow : même chaîne avec l'outil Agent (mêmes rôles, modèles, efforts et lignes d'identification que le workflow).
3. À la fin : les 3 URL `https://kyw-test-restaurant.vercel.app/<slug>/<variante>/` répondent 200 et contiennent `kyw-footer`, l'index liste le restaurant, `git status` est propre et poussé (toujours `git pull --rebase` avant `git push origin HEAD:claude/laughing-wozniak-vxc1fo` ; conflit sur `agents/lecons/*.md` : garde les deux côtés ; sur `dist/index.html` : version distante puis `scripts/q.sh index node scripts/index.mjs`). Ne touche jamais à `gabarits/` ni aux autres restaurants. Le seul commit qui porte `[publier]` est celui de la publication.
4. Mesure (agents/production/4-mesure.md) : `python3 scripts/usage-detail.py <id> data/usage/<campagne>/<slug>/dev-detail.json && python3 scripts/usage-commandes.py <id> data/usage/<campagne>/<slug>/dev-commandes.json` (id = nom du fichier `~/.claude/projects/*/<id>.jsonl` le plus récent ; crée le dossier), note l'utilisation hebdomadaire de fin, écris `data/usage/<campagne>/<slug>/dev-resume.json` = {"slug","etape":"developpement","approche":6,"phase":"<phase>","debut","fin","hebdo_debut","hebdo_fin","agents","verdicts":{"portfolio","awwwards","legacy"},"interventions":[]}, commite ces fichiers (sans le mot de publication Vercel), pousse. Ne lis pas les fichiers de mesure. Si <session-reporting> n'est pas « aucune », envoie-lui « mise à jour <campagne> developpement <slug> ».
5. Envoie à la session mère `<session-mere>` un compte rendu en 10 lignes : URLs, verdicts par variante (F0/F1 revue 1 et dernière revue), placeholders restants, agent le plus long, utilisation hebdomadaire début et fin, refus du hook observés, leçons ajoutées, blocages et ce que tu as dû décider seul. Ne crée pas de pull request.
```

## Ce que fait le workflow (pour comprendre, pas à recopier)

Recherche client (Sonnet) → pour chaque variante en parallèle : construction en 3 agents (structure, motion, QA) →
captures et audit (Haiku) → revue (Sonnet) → révision ciblée (Sonnet) → revue 2 (et une révision 2 si un F0/F1
reste) → publication (Haiku, commit `[publier]`) → leçons. Détail des rôles : `agents/README.md`.
