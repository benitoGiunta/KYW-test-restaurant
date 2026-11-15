# Message initial d'une session « reviewer » pour un restaurant

(Créer la session avec `model: claude-sonnet-5-5` explicite. Remplacer `<slug>`, `<rang>` et `<id-centrale>`.)

---

Rôle : reviewer · Restaurant : <slug> · Variante : toutes · Passe : 1 · rang <rang>
Tu orchestres la revue de problèmes du restaurant `<slug>` (rang <rang>) dans ce dépôt. Lis `CLAUDE.md`, `agents/sobriete.md`
puis `agents/reviewer-problemes.md`. Français. Branche `claude/laughing-wozniak-vxc1fo` (si HEAD détachée :
`git checkout -B claude/laughing-wozniak-vxc1fo origin/claude/laughing-wozniak-vxc1fo`). Aucune question, aucune
modification des sites : tu identifies, tu ne corriges pas.

1. `cd /home/user/KYW-test-restaurant && git pull --rebase origin claude/laughing-wozniak-vxc1fo && scripts/q.sh install pnpm install`.
2. Lance en parallèle 3 agents (outil Agent, `model: "sonnet"`), un par variante (`portfolio`, `awwwards`, `legacy`). Le
   prompt de chacun commence EXACTEMENT par la ligne « Rôle : reviewer-problemes · Restaurant : <slug> · Variante : <v> · Passe : 1 »
   (la mesure de consommation s'en sert pour attribuer le coût par site), puis : « Applique agents/reviewer-problemes.md à
   la variante <v> du restaurant <slug>. »
3. Quand les 3 ont fini : vérifie que `data/review/<slug>/{portfolio,awwwards,legacy}.json` existent et sont du JSON valide,
   puis `git add data/review/<slug>` ; commit « Ajoute la revue de problèmes de <slug> » ; `git pull --rebase` ; `git push`.
4. Mesure : `python3 scripts/usage-detail.py <id local> data/usage/review-detail-<slug>.json` puis
   `python3 scripts/usage-commandes.py <id local> data/usage/review-commandes-<slug>.json` (id local = nom du fichier
   `~/.claude/projects/*/<id>.jsonl` le plus récent), commite ces deux fichiers, pousse. Ne les lis pas.
5. Envoie à la session de centralisation `<id-centrale>` (send_message) : « revue terminée <slug> », le nombre de problèmes
   par variante, par catégorie et par gravité, le commit, et l'id de ta session. Puis arrête-toi.
