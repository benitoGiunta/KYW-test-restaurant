# Mesure — conventions communes

Objectif : comparer le coût et la qualité de chaque étape entre la phase de développement des agents (restaurants 1
à 20, approches successives) et la phase de test (usage réel des versions en vigueur). Les messages de lancement
(`2-developpement.md`, `3-correction.md`) appliquent déjà ces conventions ; ce fichier les explique et sert de
référence quand on les fait évoluer.

## 1. Identifier chaque agent

Le premier message de chaque agent commence par une ligne d'identification, lue par les scripts de mesure :

```
Rôle : <rôle> · Restaurant : <slug> · Variante : <v> · Passe : <n> · Phase : <phase>        (développement, ajoutée par le workflow)
Rôle : identifier-rectifier-site · Restaurant : <slug> · Variante : <v> · Approche : 5 · Phase : <phase>   (correction)
Rôle : orchestrateur-qualite · Restaurant : <slug> · Approche : 5 · Phase : <phase>                        (correction)
```

Ne jamais la retirer ni la reformuler : sans elle, le coût d'un agent n'est attribué à aucune étape.

## 2. Séparer identification et correction

Chaque agent de correction lance `scripts/marqueur.sh MARQUEUR-RECTIFICATION <slug> <variante>` à la fin de
l'identification ; `scripts/usage-phases.py` coupe son transcript à cet endroit (identifier / rectifier).

## 3. Fichiers produits par restaurant

Dossier `data/usage/<campagne>/<slug>/` :

| Fichier | Produit par | Contenu |
| --- | --- | --- |
| `dev-detail.json` | `scripts/usage-detail.py` (session de développement) | jetons et appels par agent |
| `dev-commandes.json` | `scripts/usage-commandes.py` | volume des sorties de commandes |
| `dev-resume.json` | la session de développement | début, fin, utilisation hebdo début/fin, verdicts, interventions |
| `corr-detail.json`, `corr-commandes.json`, `corr-phases.json` | mêmes scripts + `usage-phases.py` (session de correction) | idem, avec la coupe identifier / rectifier |
| `corr-resume.json` | la session de correction | début, fin, utilisation hebdo, problèmes, couverture, passes 2, interventions |

Fichiers de la campagne, tenus par la session mère, dans `data/usage/<campagne>/` :

| Fichier | Contenu |
| --- | --- |
| `sessions.json` | registre de toutes les sessions (restaurant, étape, id, statut, `usage` de `get_session` = coût et jetons même si la session est morte, compte rendu reçu) |
| `interventions.json` | interventions de la session mère qui ne relèvent d'aucun fichier résumé |
| `mere-detail.json` | consommation de la session mère (pilotage de la campagne) |
| `stockage.json` | contrôle du stockage Vercel au début et à la fin : `{"debut"\|"fin": {"date", "dist_mo", "dist_fichiers", "deploiements_ready" (ou "non vérifié"), "estimation_mo", "budget_go", "seuil_pct"}, "publications": [{"date", "motif", "sha"}]}` |
| `BILAN.md` | bilan de fin : restaurants terminés ou non, heures, utilisation hebdomadaire, stockage (dist/, déploiements conservés, publications), anomalies, mesures manquantes |
| `lecons-proposees/<slug>.md` | leçons proposées par les agents en mode figé |

Source de vérité pour la base : les fichiers `*-detail.json` (coût recalculé avec les prix de `scripts/usage-chantiers.py`) ;
à défaut (session morte), `usage.cost_usd` du registre, signalé comme tel dans la saisie.

L'id à passer aux scripts est le nom du fichier `~/.claude/projects/*/<id>.jsonl` le plus récent de la session.
Ne jamais lire ces fichiers dans la session qui les produit (coût de contexte inutile). Commit sur la branche de
travail (aucune publication).

## 4. Utilisation hebdomadaire

Chaque session note `unifiedWindows.seven_day.utilization` (événements `rate_limit_event` de sa propre session) au
début et à la fin. L'écart, rapproché du coût API mesuré, vérifie l'estimation du prix d'une limite
(`data/usage/limite-hebdo.json`). La mesure n'est propre que si rien d'autre ne tourne sur le compte pendant la campagne.

## 5. Interventions

Toute action humaine ou de la session mère nécessaire pour qu'un restaurant aboutisse (déblocage de push, relance,
décision) est notée dans `interventions` du fichier résumé de l'étape (date, cause, action). C'est la mesure de
l'autonomie des agents.

## 6. Base de suivi (repo `benitoGiunta/KYN-project-prospecting`)

Base SQLite `data/prospects.db` du repo KYN-project-prospecting (règles d'écriture dans son `CLAUDE.md` : `PRAGMA
foreign_keys = ON`, transaction, `scripts/dump.py`, commit de la base et de `data/tables/` ensemble, une seule session
qui écrit à la fois, puis reconstruction et republication de l'artefact « Pilotage prospection »).

- Organisation : catégorie Restaurants → lot → run → phases `dev` et `debug`. Phase de conception des agents = run 1
  « Premier run exploratoire » (lot 1) ; campagne `test-1` = run 2 « Test des agents · lot 2 » (lot 2, 20 restaurants,
  `reprend_run_id` = 1).
- **Niveau run uniquement** (décision du porteur) : pas de coût par restaurant dans la base. Les sessions de restaurant
  n'écrivent PAS dans la base ; elles produisent les fichiers du § 3.
- À la fin de la campagne, la session mère agrège les fichiers du § 3 et saisit, pour chaque phase du run, les mêmes
  types de mesure que le run 1 (table `type_consommation`) : `cout_api_moyen_par_restaurant`, `cout_api_moyen_par_site`,
  `cout_api_moyen_par_probleme` (debug), `part_limite_hebdo_par_*` (limite estimée dans `data/usage/limite-hebdo.json`),
  `cout_api_total_restaurants`, `part_limite_hebdo_total_phase`, `nombre_restaurants`, `nombre_sites`,
  `nombre_problemes_trouves`, `jetons_entree`, `jetons_sortie`, plus `duree` (minutes, moyenne par restaurant) ; elle
  renseigne `debut_le` / `fin_le` des phases et du run. Les types `*_derniere_approche` ne servent qu'au run 1 (le run
  de test n'a qu'une version). Trace de la saisie : `scripts/saisies/00N_…py` du repo de la base (modèle :
  `002_metriques_conception_et_run_test.py`).

## 7. Comparaison

- Références de la phase de développement : `data/usage/chantiers/` (développement), `data/usage/correction-phase1.json`,
  `phase2.json`, `approche3.json`, `approche4.json` (correction), synthèse dans `VERSIONS.md`.
- La page de suivi (`scripts/suivi.mjs`, onglets Parcours et Coûts) et la session de reporting lisent ces fichiers.
