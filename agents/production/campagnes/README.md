# Campagnes

Une campagne = un ensemble de restaurants produits avec les mêmes versions et les mêmes paramètres, mesuré comme un
tout. Chaque campagne a un fichier `<campagne>.json` :

| Champ | Contenu |
| --- | --- |
| `parametres` | valeurs des `<paramètres>` des messages de lancement (voir `../parametres.md`) |
| `parallele_max` | nombre maximal de restaurants en cours en même temps (développement ou correction) |
| `file` | restaurants dans l'ordre de lancement (slugs présents dans `data/restaurants.json`) |

Produire un message de lancement : `python3 scripts/message-lancement.py <campagne> developpement|correction <slug>`
(le script refuse un paramètre non rempli, notamment `session-mere`).

## Conduite d'une campagne (session mère)

1. Remplir `session-mere` (id de la session qui lance), commit. **Contrôle du stockage avant tout lancement** :
   `scripts/q.sh stockage scripts/stockage.sh <budget-stockage> <seuil-stockage> <n>`, où `<n>` = nombre de déploiements
   `READY` du projet `kyw-test-restaurant` lu avec l'outil Vercel en lecture seule (`list_deployments`) ; sans outil Vercel,
   lancer sans `<n>` et noter « non vérifié ». Résultat dans `data/usage/<campagne>/stockage.json` (`debut`). Au-delà du seuil
   (code 2) : ne rien lancer et prévenir le porteur.
2. Étape 1 pour les restaurants de la file : `"selection": "test"` dans `data/restaurants.json` (ils sont déjà
   préparés avec `"selection": "reserve"` et `"campagne"`), commit, push.
3. Lancer le développement des `parallele_max` premiers restaurants de la file (`create_session`, modèle
   `claude-opus-5-5`, tag `kyw-<campagne>`, message produit par le script).
4. À chaque compte rendu de développement reçu : lancer la correction de ce restaurant (`create_session`, modèle
   `claude-haiku-5-5`), puis, si un créneau se libère, le développement du restaurant suivant de la file.
   Une correction occupe un créneau comme un développement.
5. Arrêt : après `heure-limite`, ne plus créer aucune session ; les sessions en cours appliquent la même règle.
   Si l'utilisation hebdomadaire atteint `seuil-hebdo`, idem.
   **Reprise après coupure** (run 2 : la limite de 5 h coupe aussi la session mère, et une chaîne de `send_later` se rompt si
   un tour échoue) : au lancement, la session mère crée une tâche planifiée **récurrente** vers elle-même (`create_trigger`,
   `persistent_session_id` = son id, cron horaire, `initiation` own_followup) qui relance son contrôle de campagne ; elle la
   supprime (`delete_trigger`) en fin de campagne. À chaque contrôle, une session fille inactive (`get_session` : idle ou
   failed) depuis plus de 40 minutes, sans compte rendu et pas finie, reçoit `send_message` : « Reprise : reprends là où tu
   en étais (workflow : resumeFromRunId ; correction : étape suivante non faite) et termine par mesure et compte rendu. »
   Chaque reprise est une intervention (étape 6).
   **Rôle strict** : la session mère ne modifie aucun fichier de site, de revue ni de correction et ne fait aucun commit de
   contenu ; un défaut laissé par une session fille se signale dans `BILAN.md`.
6. Noter toute intervention (déblocage, relance, décision) dans le fichier résumé de l'étape concernée
   (`../4-mesure.md`, § 5) ; si la session de l'étape est terminée ou morte, dans `data/usage/<campagne>/interventions.json`.
7. **Registre des sessions** (filet de sécurité de la mesure, tenu par la session mère) : `data/usage/<campagne>/sessions.json`,
   une entrée par session fille créée, mise à jour à chaque compte rendu reçu, à chaque contrôle et à la fin :
   `{"slug", "etape": "developpement|correction", "session_id", "cree_le", "statut_bucket", "fini_le",
   "usage": <external_metadata.usage de get_session : cost_usd, input/output/cache tokens>, "compte_rendu": "<texte reçu>",
   "fichiers_mesure": true|false}`. Une session qui meurt (limite atteinte, erreur) ne peut plus produire ses fichiers de
   mesure et son transcript disparaît avec son conteneur : `usage` de `get_session` reste alors la seule mesure de son coût.
   Commit et push du registre au moins toutes les heures (branche de travail ; ne déclenche aucune publication).
8. Fin de campagne : `../5-verification.md` (dont la publication finale du lot `scripts/publier.sh "fin de campagne <campagne>"`,
   sans effet si rien n'a changé), `node scripts/suivi.mjs` ; même contrôle du stockage qu'à l'étape 1 (`stockage.json`, `fin`) ; mesure de la session mère elle-même
   (`python3 scripts/usage-detail.py <son id local> data/usage/<campagne>/mere-detail.json`, plus son `usage` de
   `get_session` dans `sessions.json`, étape `pilotage`) ; puis `data/usage/<campagne>/BILAN.md` : restaurants terminés,
   abandonnés ou non lancés (et à quelle étape), heures de début et de fin, utilisation hebdomadaire au début et à la fin,
   interventions, anomalies, fichiers de mesure manquants, et le **stockage** : poids de `dist/`, nombre de fichiers,
   déploiements conservés au début et à la fin, nombre de publications de la campagne (lignes « publier : … » des comptes
   rendus de correction et de la session mère). Commit, push. La saisie dans la base de suivi (Postgres, via `scripts/db.py`
   de KYN-project-prospecting) est faite par une autre conversation, après la campagne (`../4-mesure.md`, § 6), à partir
   de ces seuls fichiers.

## Campagnes

| Campagne | Objet | Versions | État |
| --- | --- | --- | --- |
| `test-1` | premier test des agents finalisés sur 10 nouveaux restaurants (+10 en réserve de file), mode figé, toute la limite hebdomadaire jusqu'au 20/11 10:30 UTC | développement A6, correction A4 | terminée (12 restaurants, `data/usage/test-1/BILAN.md`) |
| `test-2` | suite du lot 2 : les 8 restaurants non lancés en test-1, mode figé, arrêt à tout fini ou 26 % de la limite hebdomadaire | développement A7, correction A5 | terminée (8 restaurants, `data/usage/test-2/BILAN.md`) |
| `test-3` | lot 6 de la base KYN : 30 restaurants avec un vrai site (refonte), mode figé, arrêt à tout fini, limite hebdomadaire ou 27/11 10:55 UTC | développement A7, correction A5 | en cours |

## Démarrer une campagne depuis une nouvelle conversation

Créer une conversation cloud sur ce dépôt (branche `claude/laughing-wozniak-vxc1fo`, modèle Opus) avec ce premier message
(remplacer `<campagne>`) :

```
Tu es la session mère de la campagne <campagne> du dépôt KYW-test-restaurant (branche claude/laughing-wozniak-vxc1fo). Langue : français. Tu ne construis ni ne corriges aucun site toi-même : tu lances et suis des sessions filles. Lis CLAUDE.md, agents/production/README.md, agents/production/campagnes/README.md, agents/production/parametres.md, agents/production/4-mesure.md et agents/production/campagnes/<campagne>.json, puis conduis la campagne en suivant campagnes/README.md à la lettre (étapes 1 à 8, registre des sessions compris). Je t'autorise à créer les sessions filles (create_session, modèle explicite), à leur écrire (send_message), à lire leur état (get_session, list_events) et à programmer tes contrôles (send_later). Respecte l'heure limite et le mode figé de la campagne. N'écris pas dans la base de suivi (une autre conversation s'en charge après la campagne). Termine par le résumé : coût, durée, qualité et interventions par étape. Pas de pull request.
```

Après la campagne (et la réinitialisation de la limite si elle a été épuisée), une conversation avec les dépôts
KYW-test-restaurant et KYN-project-prospecting saisit les métriques du run (`../4-mesure.md`, § 6) à partir des seuls
fichiers de `data/usage/<campagne>/`, en montrant le tableau au porteur avant d'écrire. Elle écrit par `scripts/db.py`
(base Postgres sur Neon, `data/prospects.db` est figée), lance `python3 scripts/dump.py`, commite `data/tables/` et
`data/backup/prospects.db`, pousse sur `main` et republie l'artefact « Pilotage prospection » (procédure complète :
`CLAUDE.md` de KYN-project-prospecting).
