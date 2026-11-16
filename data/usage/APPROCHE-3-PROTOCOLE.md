# Approche 3 — identifier et rectifier les 5 restaurants suivants (16/11/2026)

Décision de Benito. L'approche 3 reprend l'approche 2 (voir `PHASE-2-PROTOCOLE.md` et ses résultats : 2,37 $ pour 4 restaurants,
0,20 $ par site, 0,055 $ par problème) et y ajoute trois mécanismes. Elle est suivie dans l'artefact
https://claude.ai/artifact/DLwYCeMaY2LhBpN6kZoo2L (approche 1 = phase 1, approche 2 = phase 2, approche 3 = ce lot).

## Socle repris de l'approche 2
- Un agent Sonnet par site fait l'identification puis la correction (type `identifier-rectifier-site`, Bash/Read/Edit/Write, contexte de départ ≤ 10 000 jetons),
  avec `echo MARQUEUR-RECTIFICATION` (Bash) **une fois par agent, sans exception** entre les deux phases (chez-guillaume legacy l'avait oublié).
  La configuration H (correction sur Haiku) est abandonnée : elle n'a pas fait baisser le coût après fusion.
- Un orchestrateur Haiku 5.5 par restaurant, sans relecture de fichiers de consigne.
- Plafonds : identification ≤ 25 réponses, total ≤ 45. Pas de boucle `sleep` ni de Monitor sur le crawl.

## Les trois mécanismes ajoutés
1. **`scripts/q.sh` réellement obligatoire** (approche 2 : 92 % des sorties de commandes passaient hors enveloppe, 430 000 caractères sur 466 000).
   Chaque build, shoot, audit, scan, script de contrôle et lecture potentiellement longue passe par `scripts/q.sh <agent>-<étape> <commande>`.
   Gain estimé : −0,2 $ pour 4 restaurants (−8 %).
2. **Sortie plus sobre, sans effet sur la qualité** : JSON de revue compact (une ligne par problème), aucun récapitulatif ni reformulation des commandes,
   rapport final de 10 lignes au plus. Les problèmes trouvés gardent leur description complète (page, élément, gravité, correction attendue) :
   on supprime la forme, pas le contenu. Gain estimé : −0,25 $ (−10 %). Garde-fou : le nombre et le détail des problèmes par site
   sont comparés à l'approche 2 dans le reporting.
3. **Capture ciblée après correction** : pour chaque site corrigé, une capture de la page ou de la section modifiée (`shoot.mjs <url> --out …` ciblé,
   lue en planche-contact via `scripts/planche.py`), pas de crawl complet. Coût estimé : +0,05 $ par restaurant. Elle remplace l'absence de contrôle visuel
   constatée en approche 2 (au moins 5 sites sur 12).

Non retenus : identification sur Haiku, orchestrateur remplacé par un script.

## Identification dans le premier message de chaque agent
- Orchestrateur : `Rôle : orchestrateur-qualite · Restaurant : <slug> · Approche : 3`
- Agent de site : `Rôle : identifier-rectifier-site · Restaurant : <slug> · Variante : <v> · Approche : 3`

## Remontée à faire par chaque session de restaurant (à la fin, ou au bout de 5 h avec ce qui existe)
1. `python3 scripts/usage-detail.py <id-session-locale> data/usage/p3-detail-<slug>.json`
2. `python3 scripts/usage-commandes.py <id-session-locale> data/usage/p3-commandes-<slug>.json`
3. `python3 scripts/usage-phases.py <id-session-locale> data/usage/p3-phases-<slug>.json`
4. Commit des mesures (jamais `git add -A` ; le mot de publication de Vercel n'a rien à faire dans ce commit), push sur `claude/laughing-wozniak-vxc1fo`.
5. `send_message` à `session_01CZvTL8R1vtJAXn9kX2QWxs` : « mise à jour approche 3 <slug> », id local de session, problèmes trouvés / corrigés par variante
   (avec la liste courte de leurs catégories et gravités), libellés de brouillon corrigés / restants, captures ciblées faites par site, refus du hook, durée par agent,
   et toute dérogation (marqueur oublié, commande hors q.sh, attente).

Le vérificateur calcule les 9 indicateurs (par restaurant, par site, par problème ; identifier, rectifier, total) et les compare aux approches 1 et 2.
