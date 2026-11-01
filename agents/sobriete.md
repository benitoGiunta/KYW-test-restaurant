# Règles de sobriété (01/11/2026) — à appliquer par TOUT agent de production

Mesure de la session de reporting (`data/usage/dashboard-chantiers.html`) : un site coûtait ~21,6 $ ; les sorties
de commandes font 51 à 65 % de ce qui entre dans le contexte ; les agents longs (> 90 réponses) relisent leur contexte à
chaque réponse ; une attente de plus de 5 min fait réécrire tout le contexte. Cible : ~13 $ par site, ~40 $ par restaurant.

1. **Sorties de commandes coupées.** Toute commande qui peut produire plus de 20 lignes (build, shoot, audit,
   capture, install, sloplint, scripts de contrôle) passe par l'enveloppe : `scripts/q.sh <agent>-<étape> <commande>`
   (journal complet dans `.logs/`, 20 dernières lignes affichées). Jamais de `cat` d'un journal, d'un report.json ou
   d'un HTML entier : `grep` ciblé, `tail -20`, `jq` sur les champs utiles. Lis les captures par planche-contact
   (`python3 scripts/planche.py`), pas une par une.
   **Obligatoire (mesure Partage : 550 000 caractères de sorties par site malgré la règle)** : `scripts/q.sh` pour
   `pnpm` (install, build:site), `node scripts/*.mjs`, `shoot.mjs`, `audit.mjs`, `sloplint.mjs`, `theme.mjs`, Playwright
   et tout script de contrôle maison ; depuis un sous-dossier, utilise le chemin absolu
   `/home/user/KYW-test-restaurant/scripts/q.sh`. Interdit : `cat`, `sed -n 1,999p` ou Read complet d'un fichier de plus
   de 200 lignes (lis la plage utile) ; un script de contrôle maison n'imprime que des totaux et les écarts, jamais
   l'objet complet (`console.log(JSON.stringify(…))` sur tout un rapport est interdit).
2. **Aucune attente de plus de 5 minutes.** Pas de `sleep`, de Monitor ni de boucle d'attente sur un traitement long.
   Les captures et audits complets sont faits par l'agent « captures » (Haiku) du workflow, AVANT toi ; tu lis son
   résumé `QA-<étape>.md`. Toi, tu ne relances que des captures ciblées (une page, `shoot.mjs <url> --out …`).
3. **40 réponses au maximum.** Vers 35 réponses : écris `ETAT.md` (fait / reste / pièges), commite tes fichiers
   (jamais `git add -A`), termine. Un agent neuf reprendra depuis ETAT.md. Seuil d'alerte : 60 réponses.
4. **Révision ciblée.** Le réviseur traite la liste de la revue (F0, F1, F2) et vérifie seulement ces points (capture
   ciblée, grep, mesure). Il ne refait pas de QA complète : c'est le rôle de la revue suivante (Sonnet).
5. **Modèle explicite.** Chaque agent et chaque session fille a un modèle explicite (règle A). Fable n'est jamais
   utilisé dans le pipeline standard.
