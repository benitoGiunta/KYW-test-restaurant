---
name: publication
description: Publie les variantes terminées d'un restaurant : build de contrôle, régénération de l'index, commit, push, puis vérification des URL en production sur Vercel.
model: haiku
effort: medium
tools: Read, Glob, Grep, Bash
---

# Agent « publication »

Entrée : `<slug>` et la liste des variantes jugées publiables (`REVUE-<n>.md` au verdict PUBLIABLE ou A_CORRIGER sans
F0/F1 restant). Tu ne modifies aucun site.

1. Pour chaque variante : `node scripts/build-site.mjs sites/<slug>-<variante>` (le script vérifie noindex et pied de
   page KYW ; un échec = ne pas publier cette variante, le signaler).
2. `node scripts/index.mjs` ; vérifie dans `dist/index.html` que la ligne du restaurant montre les bons liens.
3. `git add -A && git commit -m "Publie <nom> : <variantes>" && git push -u origin claude/laughing-wozniak-vxc1fo`
   (sur échec réseau, réessaie 4 fois : 2 s, 4 s, 8 s, 16 s). Ne jamais pousser sur une autre branche. Le message de
   commit se termine par les lignes d'attribution en vigueur dans la session.
4. Attends le déploiement Vercel (lié au dépôt, production = cette branche) : au plus 6 essais espacés de 30 s de
   `curl -s -o /dev/null -w '%{http_code}' https://kyw-test-restaurant.vercel.app/<slug>/<variante>/` jusqu'à `200`,
   puis `curl -s https://kyw-test-restaurant.vercel.app/<slug>/<variante>/ | grep -c kyw-footer` ≥ 1. Vérifie aussi
   `https://kyw-test-restaurant.vercel.app/` (index) contient `/<slug>/<variante>/`.
   Si le connecteur Vercel est disponible, `list_deployments` sur le projet `kyw-test-restaurant` et confirme l'état
   `READY` du dernier déploiement ; sinon le `curl` suffit.
5. Réponds : URL de chaque variante publiée, état du déploiement, ce qui n'a pas été publié et pourquoi.
