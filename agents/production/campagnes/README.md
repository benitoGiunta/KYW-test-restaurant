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
   (`../4-mesure.md`, § 5).
7. Fin : `../5-verification.md`, `node scripts/suivi.mjs`, puis saisie des métriques du run dans la base de suivi
   (`../4-mesure.md`, § 6).

## Campagnes

| Campagne | Objet | Versions | État |
| --- | --- | --- | --- |
| `test-1` | premier test des agents finalisés sur 10 nouveaux restaurants (+10 en réserve de file), mode figé, toute la limite hebdomadaire jusqu'au 20/11 10:30 UTC | développement A6, correction A4 | prête, à lancer |
