# Message initial d'une session « refonte d'un restaurant »

(Copier ce texte comme premier message d'une session Claude Code sur le dépôt KYW-test-restaurant, branche
`claude/laughing-wozniak-vxc1fo`, en remplaçant `<slug>`. La session doit être entièrement autonome : aucune
question, aucune attente d'un humain.)

---

Tu es l'orchestrateur de la refonte du restaurant `<slug>` dans ce dépôt (lis `CLAUDE.md`, `README.md`, `agents/README.md`).
Langue : français. Travaille sur la branche `claude/laughing-wozniak-vxc1fo` (déjà la branche courante ; ne jamais en
changer). Ne pose aucune question : décide, note tes hypothèses, livre.

1. Prépare l'environnement : `cd /home/user/KYW-test-restaurant && git pull --rebase origin claude/laughing-wozniak-vxc1fo && pnpm install`.
   Vérifie `node scripts/index.mjs` (doit passer) et que `data/restaurants.json` contient `<slug>`.
2. Lance le workflow `agents/workflow-restaurant.js` avec l'outil Workflow : `scriptPath` = chemin absolu du script,
   `args` = `{ "slug": "<slug>" }`. Le workflow enchaîne recherche → 3 variantes en parallèle → revue → révision →
   re-revue → publication → leçons, chaque rôle avec son prompt de `agents/`. Suis-le jusqu'au bout ; s'il s'arrête
   (erreur, agent mort), relance-le avec `resumeFromRunId` (les étapes faites sont mises en cache). Si l'outil Workflow
   n'est pas disponible, exécute la même chaîne toi-même avec l'outil Agent (un agent par rôle, prompts de `agents/`,
   les trois variantes en parallèle, revues et révisions comme décrit dans `agents/README.md`).
3. Quand le workflow rend la main : vérifie toi-même que `https://kyw-test-restaurant.vercel.app/<slug>/portfolio/`,
   `/awwwards/` et `/legacy/` répondent 200 et contiennent `kyw-footer` (`curl`), que l'index
   `https://kyw-test-restaurant.vercel.app/` liste le restaurant avec ses liens, et que `git status` est propre et
   poussé. Si une variante n'est pas publiée, dis pourquoi (verdict de revue) et, si c'est un F0 réparable en moins
   d'une heure de travail agent, lance un cycle révision → revue → publication supplémentaire pour elle.
4. Garde-fou (règle H de `agents/README.md`) : avant de lancer le workflow et avant toute relance, lis l'utilisation des
   fenêtres de limite (`list_events` sur ta session, `kinds: ["rate_limit_event"]`) ; semaine ≥ 65 % → arrêt immédiat des lancements, commite l'état et rends compte. La fenêtre de 5 h n'est pas un critère : si elle coupe des agents, relance des agents neufs après sa réinitialisation (`send_later`).
5. Termine par un compte rendu : URLs publiées, verdicts de revue par variante, placeholders, leçons ajoutées.
   Ne crée pas de pull request.
