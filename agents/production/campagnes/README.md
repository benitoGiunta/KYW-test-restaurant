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

1. Remplir `session-mere` (id de la session qui lance), commit.
2. Étape 1 pour les restaurants de la file : `"selection": "test"` dans `data/restaurants.json` (ils sont déjà
   préparés avec `"selection": "reserve"` et `"campagne"`), commit sans le mot de publication Vercel, push.
3. Lancer le développement des `parallele_max` premiers restaurants de la file (`create_session`, modèle
   `claude-opus-5-5`, tag `kyw-<campagne>`, message produit par le script).
4. À chaque compte rendu de développement reçu : lancer la correction de ce restaurant (`create_session`, modèle
   `claude-haiku-5-5`), puis, si un créneau se libère, le développement du restaurant suivant de la file.
   Une correction occupe un créneau comme un développement.
5. Arrêt : après `heure-limite`, ne plus créer aucune session ; les sessions en cours appliquent la même règle.
   Si l'utilisation hebdomadaire atteint `seuil-hebdo`, idem.
6. Noter toute intervention (déblocage, relance, décision) dans le fichier résumé de l'étape concernée
   (`../4-mesure.md`, § 5) ; si la session de l'étape est terminée ou morte, dans `data/usage/<campagne>/interventions.json`.
7. **Registre des sessions** (filet de sécurité de la mesure, tenu par la session mère) : `data/usage/<campagne>/sessions.json`,
   une entrée par session fille créée, mise à jour à chaque compte rendu reçu, à chaque contrôle et à la fin :
   `{"slug", "etape": "developpement|correction", "session_id", "cree_le", "statut_bucket", "fini_le",
   "usage": <external_metadata.usage de get_session : cost_usd, input/output/cache tokens>, "compte_rendu": "<texte reçu>",
   "fichiers_mesure": true|false}`. Une session qui meurt (limite atteinte, erreur) ne peut plus produire ses fichiers de
   mesure et son transcript disparaît avec son conteneur : `usage` de `get_session` reste alors la seule mesure de son coût.
   Commit et push du registre au moins toutes les heures (sans le mot de publication Vercel).
8. Fin de campagne : `../5-verification.md`, `node scripts/suivi.mjs` ; mesure de la session mère elle-même
   (`python3 scripts/usage-detail.py <son id local> data/usage/<campagne>/mere-detail.json`, plus son `usage` de
   `get_session` dans `sessions.json`, étape `pilotage`) ; puis `data/usage/<campagne>/BILAN.md` : restaurants terminés,
   abandonnés ou non lancés (et à quelle étape), heures de début et de fin, utilisation hebdomadaire au début et à la fin,
   interventions, anomalies, fichiers de mesure manquants. Commit, push. La saisie dans la base de suivi est faite par une
   autre conversation, après la campagne (`../4-mesure.md`, § 6), à partir de ces seuls fichiers.

## Campagnes

| Campagne | Objet | Versions | État |
| --- | --- | --- | --- |
| `test-1` | premier test des agents finalisés sur 10 nouveaux restaurants (+10 en réserve de file), mode figé, toute la limite hebdomadaire jusqu'au 20/11 10:30 UTC | développement A6, correction A4 | prête, à lancer |

## Démarrer une campagne depuis une nouvelle conversation

Créer une conversation cloud sur ce dépôt (branche `claude/laughing-wozniak-vxc1fo`, modèle Opus) avec ce premier message
(remplacer `<campagne>`) :

```
Tu es la session mère de la campagne <campagne> du dépôt KYW-test-restaurant (branche claude/laughing-wozniak-vxc1fo). Langue : français. Tu ne construis ni ne corriges aucun site toi-même : tu lances et suis des sessions filles. Lis CLAUDE.md, agents/production/README.md, agents/production/campagnes/README.md, agents/production/parametres.md, agents/production/4-mesure.md et agents/production/campagnes/<campagne>.json, puis conduis la campagne en suivant campagnes/README.md à la lettre (étapes 1 à 8, registre des sessions compris). Je t'autorise à créer les sessions filles (create_session, modèle explicite), à leur écrire (send_message), à lire leur état (get_session, list_events) et à programmer tes contrôles (send_later). Respecte l'heure limite et le mode figé de la campagne. N'écris pas dans la base de suivi (une autre conversation s'en charge après la campagne). Termine par le résumé : coût, durée, qualité et interventions par étape. Pas de pull request.
```

Après la campagne (et la réinitialisation de la limite si elle a été épuisée), une conversation avec les dépôts
KYW-test-restaurant et KYN-project-prospecting saisit les métriques du run (`../4-mesure.md`, § 6) à partir des seuls
fichiers de `data/usage/<campagne>/`, en montrant le tableau au porteur avant d'écrire.
