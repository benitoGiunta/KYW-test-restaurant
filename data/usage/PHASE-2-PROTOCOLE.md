# Phase 2 — identifier et rectifier avec les améliorations structurelles (15/11/2026)

Demande de Benito : refaire identification puis correction sur les 4 restaurants suivants, avec les améliorations ci-dessous,
et remonter les mesures à la session « vérificateur consommation token » (`session_01CZvTL8R1vtJAXn9kX2QWxs`) pour comparer
à la phase 1 (14,03 $ ; 1,17 $ par site ; 0,18 $ par problème identifié, 0,09 $ par problème rectifié).

## Améliorations structurelles à appliquer (par ordre de gain estimé, phase 1 = 14,03 $)

1. **Contexte de départ ≤ 40 000 jetons** (phase 1 : 63 000 à 68 000, soit 62 % du coût de la correction et ~45 % de celui de la revue).
   Définir les agents avec la liste d'outils minimale (Bash, Read, Edit, Write ; ni ToolSearch ni outils MCP) et des consignes
   courtes : une seule fiche par rôle (≤ 80 lignes) qui reprend en 10 lignes les règles de `sobriete.md` au lieu de la faire lire en entier,
   plus la fiche de leçons du rôle. Mesurer `contexte_premiere_reponse` (champ de usage-detail) et le signaler : si l'objectif n'est
   pas atteint, dire ce qui pèse (outils, skills, CLAUDE.md).
2. **Un agent Sonnet par site fait l'identification puis la correction** (configuration F, restaurants 1 et 2 de la phase 2) : il reste
   dans son contexte de revue, donc plus de relecture de la revue par un agent neuf. Entre les deux phases il lance une seule fois
   `echo MARQUEUR-RECTIFICATION` (Bash) ; `scripts/usage-phases.py` sépare ensuite les jetons « identifier » et « rectifier ».
   Plafonds : identification ≤ 25 réponses, total ≤ 45 réponses (ETAT.md vers 40, alerte à 55).
3. **Correction mécanique sur Haiku 5.5** (configuration H, restaurants 3 et 4) : identification par un agent Sonnet, puis correction des sites
   Awwwards et Inspi legacy par un agent Haiku (libellés de brouillon via `scripts/scan-brouillon.py`, remplacements en lot) ; le portfolio reste sur Sonnet.
   C'est un test A/B contre la configuration F ; si les problèmes résolus ou le scan brouillon résiduel sont moins bons, le signaler.
4. **Un seul orchestrateur par restaurant, sur Haiku 5.5**, pour l'identification et la correction (phase 1 : 1,20 $ sur Sonnet pour la revue,
   0,14 $ sur Haiku pour la correction). Il ne relit aucun fichier de consigne ; messages courts.
5. **Identification plafonnée** : lectures et vérifications groupées en une commande, captures lues en planche-contact (`scripts/planche.py`),
   `scripts/q.sh` obligatoire (92 % des sorties de commandes passaient hors q.sh en phase 1), pas de relecture d'un fichier déjà lu.
6. **Correction par lots** : un script Python par fichier ou par lot de libellés, pas de `cat` de fichiers entiers (79 % des caractères de la phase 1
   venaient de la lecture des consignes et du code).

## Lignes d'identification dans le premier message de chaque agent (pour que la mesure les retrouve)

- Orchestrateur : `Rôle : orchestrateur-qualite · Restaurant : <slug> · Phase : 2`
- Configuration F : `Rôle : identifier-rectifier-site · Restaurant : <slug> · Variante : <v> · Phase : 2`
- Configuration H : `Rôle : reviewer-problemes · Restaurant : <slug> · Variante : <v> · Phase : 2` puis `Rôle : correcteur-site · Restaurant : <slug> · Variante : <v> · Phase : 2`

## Remontée à faire par chaque session de restaurant (à la fin, ou au bout de 5 h avec ce qui existe)

1. `python3 scripts/usage-detail.py <id-session-locale> data/usage/p2-detail-<slug>.json`
2. `python3 scripts/usage-commandes.py <id-session-locale> data/usage/p2-commandes-<slug>.json`
3. Configuration F seulement : `python3 scripts/usage-phases.py <id-session-locale> data/usage/p2-phases-<slug>.json`
4. Commit (jamais `git add -A`), push sur `claude/laughing-wozniak-vxc1fo`.
5. `send_message` à `session_01CZvTL8R1vtJAXn9kX2QWxs` : « mise à jour phase 2 <slug> », id local de la session, configuration (F ou H), nombre de problèmes trouvés,
   corrigés, libellés de brouillon corrigés et restants (scan-brouillon), nombre de refus du hook, durée de chaque agent.

Le vérificateur calcule les 9 indicateurs de suivi (par restaurant, par site, par problème ; identifier, rectifier, total) dans l'artefact
https://claude.ai/artifact/DLwYCeMaY2LhBpN6kZoo2L et les compare à la phase 1.
