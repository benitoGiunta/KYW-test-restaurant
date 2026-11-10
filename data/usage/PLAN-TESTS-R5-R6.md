# Plan de tests d'économie de jetons : restaurants 5 et 6

Rédigé le 01/11/2026 par la session de reporting, à partir des mesures de Partage (restaurant 3, méthode sobre).
Tableau de bord : https://claude.ai/artifact/5KDwC8bNQe7he4U6uxLmgp (onglet « Avant / après »).

## Point de départ

| Référence | Coût | Par site | Contexte relu par réponse | Sorties de commandes |
|---|---:|---:|---:|---:|
| Partage (restaurant 3) | 30,13 $ | 10,04 $ | 102 000 jetons | 550 000 caractères par site |
| La Brasserie du Quai (restaurant 4) | 33,36 $ | 11,12 $ | 105 000 jetons | 610 000 caractères par site |

Le restaurant 4 a tourné avec l'enveloppe `scripts/q.sh` imposée dans les prompts (commit 1cf0f6f). Les sorties de
commandes n'ont pas baissé. Le diagnostic (`data/usage/commandes-brasserie-du-quai.json`, par
`scripts/usage-commandes.py`) en donne la raison : 87 % du volume ne passe pas par q.sh. Ce ne sont pas des builds,
mais des lectures de fichiers par commande : `cat` 503 000 caractères, `sed -n` 367 000, `grep` 252 000. Dans les 40
plus grosses commandes, `agents/lecons.md` pèse 53 % du volume et les prompts de variante 21 %. `agents/lecons.md`
fait 93 000 caractères, soit environ 25 000 jetons ; `variante-legacy.md` en fait 60 000 et `variante-awwwards.md`
51 000. Chaque agent les relit par morceaux, souvent plusieurs fois.

Constats de Partage qui orientent les tests :
- La construction fait 66 % du coût, soit 6 à 7 $ par variante en trois phases.
- Même les agents mécaniques relisent beaucoup : 75 000 jetons par réponse pour les captures sur Haiku, 82 000 pour la
  publication. C'est le contexte de départ, commun à tous les agents : consignes, sobriété, leçons, prompt de rôle.
- Les revues 2 coûtent 1,96 $ au total, captures comprises.
- Les images lues restent faibles, 11 au plus par agent : ce n'est plus un levier, il est retiré du plan.

## Restaurant 5 : trois tests

Les tests A et B s'appliquent à tout le restaurant. Le test C ne concerne que la variante legacy : les variantes
portfolio et awwwards servent de témoin.

### Test A : contexte de départ allégé (tous les agents) — priorité 1
- **Changement 1 :** remplacer la lecture de `agents/lecons.md` par un résumé par rôle de 2 000 jetons au plus
  (`agents/lecons/<rôle>.md`, régénéré par l'étape leçons). `agents/lecons.md` reste l'archive, que plus aucun agent ne lit.
- **Changement 2 :** découper `variante-legacy.md` et `variante-awwwards.md` par phase (structure, motion, QA) ; chaque
  agent de construction ne reçoit que la partie commune et sa phase, 15 000 caractères au plus.
- **Changement 3 :** dans `agents/sobriete.md`, interdire de relire un prompt ou les leçons par commande, lire un fichier
  de plus de 80 lignes autrement que par plages ciblées (`grep -n … | head -20`, `sed -n` sur 60 lignes au plus) et
  `cat` sur les pages d'un site sauf celle qu'on modifie. Ne plus faire lire `README.md` et `agents/README.md` aux agents.
- **Mesure :** contexte relu par réponse par rôle, sorties de commandes, rediagnostic par `scripts/usage-commandes.py`.
- **Réussite :** sorties de commandes sous 300 000 caractères par site (610 000 au restaurant 4) ; captures et
  publication sous 45 000 jetons relus par réponse, construction sous 90 000, revue sous 80 000.
- **Gain attendu :** 4 à 6 $ par restaurant.
- **Garde-fou :** aucune leçon déjà intégrée ne réapparaît comme défaut dans la revue 1.

### Test B : revue 2 seulement si nécessaire (toutes les variantes)
- **Changement :** dans le workflow, pas de revue 2 si la revue 1 n'a relevé aucun défaut F0 ni F1 ; la variante part à
  la publication après sa révision. Revue 2 maintenue dès qu'un F0 ou un F1 existait.
- **Mesure :** nombre de revues 2 lancées, coût des revues.
- **Réussite :** revues sous 3 $ (4,58 $ chez Partage) quand au moins une variante est dispensée.
- **Gain attendu :** jusqu'à 1,96 $.
- **Garde-fou :** contrôle par la session de reporting d'un échantillon de variantes dispensées, en relisant leur
  REVISION-1.md : chaque F2 annoncé corrigé doit l'être dans le code.

### Test C : construction legacy sur Sonnet 5.5 (variante legacy seulement)
- **Changement :** `model: 'sonnet'` pour les trois phases de construction de la variante legacy ; portfolio et awwwards
  restent sur Opus.
- **Mesure :** coût de construction legacy, nombre de défauts de la revue 1 legacy.
- **Réussite :** construction legacy sous 3,80 $ (6,90 $ chez Partage), et pas plus de défauts F0 et F1 en revue 1 que
  les legacy de Partage et du restaurant 4.
- **Gain attendu :** environ 3 $, et environ 6 $ si le portfolio suit au restaurant 7.
- **Retour arrière :** si la revue 1 legacy relève plus de F0 et F1, la legacy revient sur Opus au restaurant 6.

## Restaurant 6 : trois tests

Ce restaurant reprend tout ce qui a réussi au restaurant 5.

### Test D : effort de raisonnement ajusté
- **Changement :** `effort: 'medium'` pour les phases 1 (structure) et 3 (QA) de la construction et pour la révision ;
  `effort: 'low'` pour les captures et la publication ; la phase 2 (motion) reste à `high`.
- **Mesure :** coût de construction et de révision, nombre de réponses par agent.
- **Réussite :** construction −15 % par rapport au restaurant 5 à variante égale.
- **Gain attendu :** 2 à 4 $.
- **Garde-fou :** défauts F0 et F1 de la revue 1 au plus égaux au restaurant 5.

### Test E : plafond à 30 réponses
- **Changement :** dans les prompts et `agents/sobriete.md`, relais par un agent neuf vers 25 réponses au lieu de 35.
- **Mesure :** réponses du plus long agent, contexte relu par réponse.
- **Réussite :** aucun agent au-delà de 30 réponses, contexte relu par réponse −10 %.
- **Gain attendu :** environ 1 $.
- **Risque à surveiller :** plus d'agents, donc plus de contextes de départ. Si le coût total monte, revenir à 40.

### Test F : partie stable du prompt en premier
- **Changement :** placer la ligne « Rôle · Restaurant · Variante · Passe » et tout ce qui varie à la fin du prompt
  d'agent, le texte commun au rôle au début. Des agents du même rôle lancés à moins de 5 minutes d'écart partagent
  alors un début de contexte déjà en cache. L'extracteur garde la fin du premier message : la mesure reste possible.
- **Mesure :** écriture de contexte des agents de même rôle lancés à la suite (captures, revues).
- **Réussite :** écriture de contexte de ces agents −10 %.
- **Gain attendu :** incertain, de l'ordre de 1 $.

## Objectif et règle de décision

- **Objectif après les deux restaurants :** 6 à 7 $ par site, soit 20 $ par restaurant, contre 10 $ par site chez Partage.
- **Un test réussit** si son seuil est atteint et son garde-fou respecté. Il devient alors la règle pour tous les
  restaurants suivants, inscrite dans `agents/sobriete.md`.
- **Un test échoue** si le garde-fou de qualité est franchi, même avec un gain de jetons : retour à la règle précédente.
- **Mesure :** chaque session restaurant dépose `data/usage/detail-<slug>.json` en fin de travail et envoie
  « mise à jour » à la session de reporting, qui ajoute un onglet « Tests » au tableau de bord : un résultat par test,
  comparé à Partage et au restaurant 4.

## Mise en œuvre

| Quand | Qui | Quoi |
|---|---|---|
| Fin du restaurant 4 (fait) | Session de reporting | Mesure : 33,36 $, sorties de commandes inchangées ; diagnostic des commandes ; test A renforcé |
| Avant le restaurant 5 | Test Site | Tests A, B et C dans le workflow, les prompts et `agents/lecons/` ; un commit par test |
| Fin du restaurant 5 | Session de reporting | Verdict des tests A, B et C |
| Avant le restaurant 6 | Test Site | Tests D, E et F, plus ce qui a réussi au restaurant 5 |
| Fin du restaurant 6 | Session de reporting | Verdict des tests D, E et F, nouvelle règle de sobriété consolidée |

## Résultats du restaurant 5 (Chez Guillaume, 01/11) et plan révisé du restaurant 6

Coût : 27,30 $, soit 9,10 $ par site, contre 11,12 $ à La Brasserie du Quai (−18 %) et 10,04 $ chez Partage.

| Test | Verdict | Résultat principal |
|---|---|---|
| A · contexte de départ allégé | partiel, conservé | sorties de commandes −16 % par site (486 000 caractères, seuil 300 000 manqué) ; contexte relu par réponse inchangé (75 000 jetons pour les captures, 120 000 pour la construction) |
| B · revue 2 conditionnelle | réussi, adopté | 1 revue 2 au lieu de 3 ; revues et révisions 7,32 $ contre 10,05 $ ; corrections des variantes dispensées vérifiées dans le code |
| C · legacy sur Sonnet | réussi, adopté | construction legacy 3,71 $ contre 6,40 $ ; revue 1 legacy publiable, 0 F0 et 0 F1 ; témoin awwwards sur Opus stable (7,60 $ contre 7,31 $) |

**Découverte :** chaque agent démarre avec environ 66 400 jetons de contexte dès sa première réponse, quel que soit son rôle
ou son modèle : c'est le socle du harnais (instructions système, définitions d'outils, outils et connecteurs disponibles).
Il pèse 62 % de la relecture de contexte du restaurant et jusqu'à 39 % de son coût. Les consignes du test A ne pèsent que
quelques milliers de jetons face à lui. Mesure : champ `contexte_premiere_reponse` de `scripts/usage-detail.py`.

**Restaurant 6, plan révisé :**
- **Test D, maintenu :** effort « medium » pour les phases 1 et 3 de construction et pour la révision ; « low » pour les
  captures et la publication.
- **Test E, abandonné :** plafonner à 30 réponses multiplierait les agents, donc les socles ; le plafond reste à 40.
- **Test F, abandonné :** le socle du harnais est déjà identique pour tous les agents ; déplacer la ligne d'identification
  ne change presque rien.
- **Test G, nouveau, à décider par Benito :** désactiver avant le lancement, dans les connecteurs du compte
  (claude.ai/customize/connectors), ceux dont le pipeline restaurant n'a pas besoin. Le pipeline n'en utilise aucun : la
  publication vérifie les adresses avec curl, le connecteur Vercel y est facultatif. Les connecteurs sont lus au démarrage
  d'une session et le réglage vaut pour tout le compte. Mesure : contexte de la première réponse ; cible sous 45 000 jetons.
- **Test H, nouveau :** construction portfolio et révisions sur Sonnet 5.5 (extension du test C), l'awwwards restant sur
  Opus comme témoin. Garde-fou : défauts F0 et F1 de la revue 1 au plus égaux au restaurant 5.

## Résultats du restaurant 6 (La Dolce Vita, Wépion, 01/11)

Coût : 19,86 $, soit 6,62 $ par site : objectif de 7 à 8 $ atteint (−27 % sur le restaurant 5, −67,5 % depuis avant).

| Test | Verdict | Résultat principal |
|---|---|---|
| H · portfolio et révisions sur Sonnet | réussi, adopté | construction portfolio 2,10 $ contre 6,58 $ ; révisions 1,65 $ contre 3,89 $ ; revue 1 portfolio sans F0 ni F1 (2 F1 au restaurant 5) ; aucun F0 ni F1 restant en fin de cycle |
| D · effort réduit | neutre, conservé | awwwards sur Opus (D seul) 7,61 $ contre 7,60 $ malgré −36 % de réflexion ; legacy sur Sonnet 3,02 $ contre 3,71 $ |

Inchangés, faute d'avoir été appliqués : socle fixe par agent (66 500 jetons, test G) et sorties de commandes
(1,58 million de caractères ; le regroupement des lectures, commit 77e5691, vaudra à partir du restaurant 7).

**Pistes pour le restaurant 7 :** l'awwwards, seule variante encore construite sur Opus, pèse 38 % du restaurant ; tester
les phases 1 et 3 sur Sonnet, la phase 2 (animations) restant sur Opus. Mesurer l'effet du regroupement des lectures.
Test G sur décision de Benito.

## Restaurants 7, 8 et 9 : configuration figée et dernier test (décision de Benito, 06/11)

- **Configuration :** celle du restaurant 6 (tests A, B, C, D, H), plus le regroupement des lectures (sobriete.md § 7,
  commit 77e5691), plus un dernier test :
  - **Test I, awwwards :** construction phases 1 (structure) et 3 (QA) sur Sonnet, phase 2 (animations) sur Opus.
    Référence : awwwards du restaurant 6, 7,61 $ de construction. Seuil : sous 4,50 $. Garde-fou : pas plus de F0 et F1
    en revue 1 que l'awwwards du restaurant 6, et aucun F0 ni F1 restant en fin de cycle. Si le garde-fou est franchi au
    restaurant 7, l'awwwards revient entièrement sur Opus pour les restaurants 8 et 9.
- **Lancement :** restaurants 7, 8 puis 9, l'un après l'autre, trois variantes chacun, soit 9 sites.
- **Arrêt :** dès que les 9 sites sont publiés, ou dès que la consommation hebdomadaire du compte atteint 25 %, au premier
  des deux. Contrôle avant chaque lancement et pendant les workflows ; à 25 %, arrêt propre (commit, push, ETAT, mesure).
- **Mesure :** chaque session restaurant dépose detail-<slug>.json et commandes-<slug>.json et prévient la session de
  reporting ; verdict du test I au restaurant 7, puis suivi de dérive (alerte au-delà de 20 % d'écart).
- **Test G (connecteurs) :** abandonné (décision de Benito, 09/11).

## Résultats de la série 7 à 9 (07/11)

| Restaurant | Coût | Par site | Portfolio | Awwwards | Legacy |
|---|---:|---:|---:|---:|---:|
| 7 · Le Royal | 16,80 $ | 5,60 $ | 4,86 $ | 5,83 $ | 4,27 $ |
| 8 · Incorrect | 17,11 $ | 5,70 $ | 6,06 $ | 5,66 $ | 3,49 $ |
| 9 · L'Essentiel | 18,12 $ | 6,04 $ | 5,84 $ | 5,59 $ | 4,63 $ |

- **Test I réussi :** construction awwwards 4,49 $ au restaurant 7 contre 7,61 $ au restaurant 6 ; 1 F1 en revue 1 contre 2.
- **Série :** 52,03 $ pour 9 sites, 5,78 $ par site en moyenne (−12,7 % sur après 3, −71,6 % depuis avant), écart de
  moins de 8 % entre les trois restaurants. Les 9 sites finissent sans F0 ni F1.
- **Sans effet :** le regroupement des lectures (sorties de commandes 1,6 à 1,7 million de caractères par restaurant)
  et le socle par agent (environ 67 000 jetons). Le test G (connecteurs) est abandonné (décision de Benito, 09/11) : le socle est traité comme un coût fixe.

## Conformité de la configuration des restaurants 7 à 9 (contrôle du 08/11)

Script : `scripts/usage-conformite.py` (modèles réels par agent, revues, consignes lues), puis `scripts/usage-configurations.py`
(jeux `chantiers/configurations.json` et `chantiers/conformite.json`, onglet « Configurations et conformité » du tableau de bord).

- Workflow 5f3c8e3 et `agents/sobriete.md` 77e5691 en place aux trois lancements ; 3 sessions filles successives, sans coupure.
- Modèles : 90 agents sur 90 conformes (awwwards phases 1 et 3 sur Sonnet, phase 2 sur Opus ; portfolio, legacy, revues, révisions sur Sonnet ; captures et publication sur Haiku). Aucun écart non plus de R3 à R6 (204 agents au total).
- Test B : 9 sites sur 9 conformes (6 revues 2, toutes après un F0 ou un F1 en revue 1). 0 F0 ou F1 ouvert en fin de cycle.
- Leçons par rôle et prompts par phase : appliqués. Agents ≤ 40 réponses sauf un par restaurant (max 41, 51, 40).
- Regroupement des lectures : consigne présente, sans effet mesurable (0,9 commande par réponse, 1,6 à 1,7 M de caractères de sorties).
- Effort de raisonnement : non vérifiable dans les transcripts.
- Compteur interne des sessions : 18,87 $, 19,02 $, 20,51 $ (11 à 13 % au-dessus de la mesure agent par agent, derniers tours compris).

## Décision du 09/11

- **Test G (connecteurs) abandonné** par Benito. Le socle d'environ 67 700 jetons par agent est désormais un coût fixe ;
  les seuls leviers restants portent sur le nombre d'agents et de réponses par site (revues, révisions, passes).

## Série 10 à 14 (lancée le 09/11, arrêt à 45 % hebdo ou 15 sites) : suivi

| Restaurant | Coût | Par site | Portfolio | Awwwards | Legacy | Écart à la moyenne 7 à 9 |
|---|---:|---:|---:|---:|---:|---:|
| 10 · La Ferme Blanche d'Asie | 15,97 $ | 5,32 $ | 3,55 $ | 6,27 $ | 4,13 $ | −7,9 % |
| 11 · Le Félicien | 18,23 $ | 6,08 $ | 4,73 $ | 6,32 $ | 4,99 $ | +5,1 % |
| 12 · Le Grill des amiS | 19,80 $ | 6,60 $ | 4,87 $ | 7,28 $ | 5,19 $ | +14,2 % |
| 13 · Le 54 | 15,55 $ | 5,18 $ | 3,91 $ | 5,75 $ | 3,99 $ | −10,3 % |
| 14 · Le Ponti 2 | 16,39 $ | 5,46 $ | 4,69 $ | 5,34 $ | 4,35 $ | −5,5 % |

- Restaurant 10 conforme : 26 agents sur le bon modèle, test B 3/3 (revue 2 sur l'awwwards seule), 0 F0 ou F1 en fin de cycle,
  max 44 réponses, socle 67 900 jetons. Classé dans la phase Après 4 (désormais 5,67 $ par site sur 4 restaurants).
- Restaurant 11 conforme : 30 agents sur le bon modèle, test B 3/3 (un F0 ou F1 en revue 1 sur chaque variante, trois revues 2),
  0 F0 ou F1 en fin de cycle, max 38 réponses, socle 68 100 jetons. Après 4 : 5,75 $ par site sur 5 restaurants.
- Restaurant 12 conforme : 30 agents sur le bon modèle, test B 3/3 (F1 en revue 1 sur chaque variante, trois revues 2), 0 F0 ou F1
  en fin de cycle, max 42 réponses. Le plus cher de la série (+14 %, sous le seuil d'alerte de 20 %) : trois revues 2 et
  une awwwards à 7,28 $. Après 4 : 5,89 $ par site sur 6 restaurants. Le contrôle reconnaît désormais les défauts F1
  notés sous un titre « ### F1 » avec un identifiant libre (R1-01…), format de la revue legacy du Grill des amiS.
- Restaurant 13 conforme : 28 agents sur le bon modèle, test B 3/3 (revues 2 sur portfolio et awwwards), 0 F0 ou F1 en fin
  de cycle, max 34 réponses. Le moins cher de la série. Après 4 : 5,79 $ par site sur 7 restaurants.
- Restaurant 14 conforme : 28 agents sur le bon modèle, test B 3/3 (revues 2 sur portfolio et legacy), 0 F0 ou F1 en fin
  de cycle, max 38 réponses.

**Bilan de la série 10 à 14 (09/11 22 h 24 → 10/11 5 h 45) :** 15 sites sur 15, 85,94 $, soit 17,19 $ par restaurant et
5,73 $ par site (série 7 à 9 : 5,78 $). Écart entre restaurants de −10 % à +14 %, aucune alerte. 142 agents, aucun écart de
modèle, test B 15/15, aucun F0 ou F1 ouvert. Configuration « Après 4 » sur 8 restaurants : 5,75 $ par site, −71,8 % depuis avant.
Le socle par agent monte lentement (67 700 → 68 100 jetons), sans effet visible sur le coût.
- Compte rendu de Test Site (10/11 5 h 45) : consommation hebdomadaire 12 % → 23 % pour les 15 sites (≈ 0,7 point par site,
  ≈ 2,2 points par restaurant). Seul ajout à la configuration : interdiction des photos filigranées par un tiers (3f8e5d0).
  Test Site signale des agents « au-delà de 60 réponses » : la mesure agent par agent (une réponse = un identifiant de message)
  donne au plus 44 réponses par agent et 37 pour la session principale ; l'écart vient sans doute d'un comptage par ligne de
  transcript (une réponse y occupe plusieurs lignes). Sorties de commandes hors q.sh : ~90 %, inchangé.

## Série 15 à 20 : phase Après 5 (hook de lecture, commit e3d24cd), arrêt à 50 % hebdo

| Restaurant | Coût | Par site | Portfolio | Awwwards | Legacy | Sorties de commandes | dont cat |
|---|---:|---:|---:|---:|---:|---:|---:|
| Moyenne Après 4 (7 à 14) | 17,25 $ | 5,75 $ | | | | 1,67 M | ≈ 0,9 M |
| 15 · Le Servais | 17,34 $ | 5,78 $ | 5,34 $ | 5,71 $ | 4,24 $ | 1,60 M | 0,72 M |
| 16 · Li Micougni | 18,40 $ | 6,13 $ | 3,92 $ | 6,57 $ | 5,86 $ | 1,65 M | 0,83 M |
| 17 · Makimono | 21,69 $ | 7,23 $ | 7,55 $ | 6,78 $ | 4,92 $ | 1,86 M | 0,80 M |
| 18 · Pépite | 16,81 $ | 5,60 $ | 4,55 $ | 6,63 $ | 3,53 $ | 1,75 M | 0,89 M |
| 19 · Sanga | 16,43 $ | 5,48 $ | 4,23 $ | 6,73 $ | 3,38 $ | 1,48 M | 0,75 M |
| 20 · L'Huile sur le Feu | 19,65 $ | 6,55 $ | 5,31 $ | 7,63 $ | 4,40 $ | 1,60 M | — |

- Restaurant 15 conforme : 28 agents sur le bon modèle, test B 3/3, 0 F0 ou F1 en fin, max 38 réponses.
- Premier effet du hook : lectures par cat −20 % environ, mais report sur des lectures par plages (sed, head, cat | head) ;
  total des sorties −4 %, contexte relu par réponse inchangé (103 k), coût par site identique. À confirmer sur 16 à 20.
- Restaurant 16 conforme : 28 agents sur le bon modèle, test B 3/3 (revues 2 sur awwwards et legacy), 0 F0 ou F1 en fin,
  max 46 réponses. Après 5 sur 2 restaurants : 5,96 $ par site (+3,7 % sur Après 4), cat −12 %, sorties −3 %, contexte +3 %.
  Tendance : le hook ne fait pas économiser.
- **Restaurant 17 : ALERTE coût (+25 % sur la moyenne Après 4) et qualité.** 33 agents (sur le bon modèle), revues 2 sur les
  trois variantes, puis revue 3 du portfolio qui laisse 2 F1 ouverts (horaires rognés à toutes les largeurs, bento /carte/ à
  1024 px). Premier site depuis le restaurant 3 qui finit avec des F1 ouverts. Portfolio à 7,55 $ (constructeur 53 réponses,
  relecteur passe 3 46 réponses). Après 5 sur 3 restaurants : 6,38 $ par site (+11 % sur Après 4) ; cat −11 %, sorties +2 %.
- Restaurant 18 conforme : 30 agents sur le bon modèle, revues 2 sur les trois variantes (F1 en revue 1), 0 F0 ou F1 en fin,
  max 46 réponses. Après 5 sur 4 restaurants : 6,19 $ par site (+8 % sur Après 4, +2 % sans Makimono) ; cat −8 %, sorties +3 %.
- Restaurant 19 conforme : 28 agents sur le bon modèle, revues 2 sur portfolio et awwwards, 0 F0 ou F1 en fin, max 33
  réponses. Après 5 sur 5 restaurants : 6,04 $ par site (+5 % sur Après 4, 5,75 $ soit 0 % sans Makimono) ; cat −10 %, sorties 0 %.
- Restaurant 20 conforme : 31 agents sur le bon modèle, revues 2 sur portfolio et awwwards, revue 3 de l'awwwards (publiable),
  0 F0 ou F1 en fin, max 58 réponses (5 agents au-delà de 40). +14 % sur Après 4, sous le seuil d'alerte.

**Bilan de la série 15 à 20 (phase Après 5) :** 18 sites, 110,32 $, 6,13 $ par site (+6,6 % sur Après 4 ; 5,91 $ soit +2,8 %
sans Makimono). Lectures par cat −10 %, sorties de commandes et contexte par réponse inchangés. Un dépassement (Makimono, +25 %)
et un site avec 2 F1 ouverts (portfolio Makimono). **Verdict : le hook de lecture ne fait pas économiser ; il peut être retiré
sans perte.** Le levier restant est le nombre de passes de revue (revues 2 et 3), pas les lectures.

**Bilan du projet (20 restaurants, 60 sites) :** restaurants 481,24 $ ; avec portfolio (261,82 $), préparation et pilotage :
1 069,46 $ au tarif catalogue. Coût par site : 20,38 $ avant → 5,75 à 6,13 $ dans les deux dernières configurations (−70 %).
