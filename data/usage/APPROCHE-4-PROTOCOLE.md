# Approche 4 — approche 3 + contrôle de la qualité (16/11/2026)

Décision de Benito. Constats de l'approche 3 à régler : (1) 63 % des commandes de grill-des-amis passées hors `scripts/q.sh`
(72 % sur les 5 restaurants, 264 000 caractères sur 368 000) alors que c'était la règle n°1 ; (2) ferme-blanche-d-asie legacy :
0 problème trouvé parce que le script de captures a expiré, donc revue douteuse. Autres écarts constatés : marqueur absent ou tardif
sur 4 sites, crawl d'identification interrompu sur plusieurs sites (2,6 problèmes par site contre 3,6 puis 4,25), jours de fermeture
retirés sans source (grill-des-amis), HEAD détachée qui a bloqué le-felicien 30 min.
L'approche 4 s'applique à TOUS les restaurants restants ; suivi dans https://claude.ai/artifact/DLwYCeMaY2LhBpN6kZoo2L (approche 4).

## Règles à mettre en place avant le lancement

1. **`q.sh` imposé par un hook, pas par une consigne.** Étendre `scripts/hooks/garde-lecture.py` : refus (code 2, message clair) de toute commande Bash dont le
   premier programme est `node scripts/…`, `pnpm`, `npx`, `playwright`, `curl`, `shoot.mjs`, `audit.mjs`, `sloplint.mjs`, `theme.mjs` ou `python3 scripts/…`
   sans le préfixe `scripts/q.sh <agent>-<étape>` (ou son chemin absolu). Exceptions : `grep | head`, `sed -n` ≤ 60 lignes, `ls`, `git status`, `git add/commit/push`,
   `scan-brouillon.py`, `usage-*.py`. Objectif mesuré : sorties hors q.sh ≤ 30 % des caractères (approche 3 : 72 %).
2. **Couverture visuelle obligatoire de l'identification.**
   - Les captures sont faites par page, pas en crawl complet : pour chaque variante, accueil, carte ou menu, réservation, contact, horaires ou prix (6 pages au plus),
     desktop et mobile, un `shoot.mjs` par page avec délai de 60 s, via `q.sh`, assemblées par `scripts/planche.py`. Un shoot expiré est relancé une fois sur cette seule page.
     Idéalement une seule passe de captures par restaurant avant les agents de site (agent Haiku `captures-site` ou l'orchestrateur), et les agents de site lisent les planches
     (premier message : « Rôle : captures-site · Restaurant : <slug> · Approche : 4 » pour que je la mesure).
   - Un site ne conclut « 0 problème » qu'avec preuve : champ `couverture` dans le JSON de revue (pages vues en desktop et en mobile, sur les pages cibles) et scan brouillon à 0.
     Sinon statut `revue_incomplete`.
   - Pour un site `revue_incomplete` ou dont la couverture est inférieure aux pages cibles, l'orchestrateur relance UNE fois l'agent d'identification sur les pages manquantes
     (« Passe : 2 » dans son premier message, pour la mesure). Ferme-blanche-d-asie legacy est à refaire en premier.
3. **Marqueur avant toute modification.** `scripts/marqueur.sh` = `echo MARQUEUR-RECTIFICATION` + création de `.logs/marqueur-<agent>`. Le hook refuse `Edit`, `Write` et `sed -i`
   sur `sites/` tant que ce fichier n'existe pas. Contrôle de l'orchestrateur : 3 lignes de phases par restaurant dans `p4-phases-<slug>.json`.
4. **Pas de fait retiré ou inventé sans source.** Pour supprimer un libellé de brouillon, reformuler de façon neutre ou garder la valeur et la signaler « à vérifier » dans le rapport ;
   ne jamais retirer ni inventer un horaire, un jour de fermeture, un prix ou un nom (grill-des-amis : mardi, mercredi, dimanche retirés sans source).
5. **Vérification en ligne.** Vercel ne déploie que sur le commit final portant le mot de publication : les agents contrôlent le `dist` local (`grep` de « à confirmer »),
   l'orchestrateur fait une seule vérification en ligne après le commit final, avec un `curl --retry`, sans boucle.
6. **Départ propre.** Première commande de chaque session : `git checkout -B claude/laughing-wozniak-vxc1fo origin/claude/laughing-wozniak-vxc1fo` si HEAD est détachée.
7. Inchangé : un agent Sonnet par site (`identifier-rectifier-site`), orchestrateur Haiku par restaurant, plafonds 25 / 45 réponses, pas de sleep ni de Monitor, capture ciblée après correction,
   sortie compacte.

## Remontée (comme l'approche 3, préfixe p4)
`usage-detail.py` → `data/usage/p4-detail-<slug>.json`, `usage-commandes.py` → `p4-commandes-<slug>.json`, `usage-phases.py` → `p4-phases-<slug>.json`
(et le détail des captures-site si un agent dédié existe). Premier message : « Approche : 4 ». Puis `send_message` à `session_01CZvTL8R1vtJAXn9kX2QWxs` :
« mise à jour approche 4 <slug> » avec problèmes trouvés / corrigés par variante, **couverture par site (pages vues sur pages cibles, desktop et mobile)**, sites `revue_incomplete`
et relances, libellés brouillon corrigés / restants, part hors q.sh, marqueurs corrects (n sur 3), refus du hook, durée par agent, dérogations.

Indicateurs ajoutés au suivi pour la qualité : problèmes par site, part des sites à couverture complète, part hors q.sh, marqueurs corrects, revues relancées.
