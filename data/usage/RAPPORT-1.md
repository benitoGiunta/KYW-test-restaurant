# Rapport 1 — consommation de jetons de la session d'orchestration (28 → 30 octobre 2026)

Tableau de bord : https://claude.ai/artifact/39eBZZyjPAnwQfhAAx2Bxq (copie autonome : `data/usage/dashboard.html`).
Périmètre : les 23 transcripts de la session d'orchestration « Test Site » (session principale + 22 sous-agents),
extraits par `scripts/usage-extraire.py`. Données : `consommation-session-1.json`, `chronologie-session-1.json`.

## 1. Totaux et pondération

| Poste | Jetons | Part des jetons | $ / million (Fable 5.1) | Coût | Part du coût |
|---|---:|---:|---:|---:|---:|
| Entrée non mise en cache | 18 154 | 0,0 % | 10,00 | 0,18 $ | 0,1 % |
| Création de cache | 13 620 195 | 10,3 % | 12,50 | 170,25 $ | 64,6 % |
| Lecture de cache | 117 781 825 | 88,8 % | 0,25 | 29,45 $ | 11,2 % |
| Sortie | 1 269 949 | 1,0 % | 50,00 | 63,50 $ | 24,1 % |
| **Total** | **132 690 123** | 100 % | | **263,38 $** | 100 % |

- **Grille utilisée** : tarif catalogue publié de Claude Fable 5.1 (10 $ en entrée, 12,50 $ en création de cache soit 125 %,
  0,25 $ en lecture de cache soit 2,5 %, 50 $ en sortie soit 5 ×, par million de jetons).
- **Équivalent jetons facturés** : 263,38 $ ÷ 10 $ = **26,3 millions de jetons d'entrée équivalents**.
- **Variante « lecture à 10 % »** (grille des modèles antérieurs, citée dans le brief) : 351,71 $, la lecture de cache
  passant de 11 % à 33 % du coût. Le classement des agents et des étapes ne change pas.
- **Prudence** : la limite hebdomadaire du compte n'est pas publiée en jetons et pondère vraisemblablement par modèle.
  Ces montants mesurent le poids relatif des postes, ce n'est pas une facture.
- **Recoupement** : le compteur interne de Claude Code de la session principale (événement `result` du 30/10 11 h 14 UTC)
  donne, pour Fable 5.1 : 13,64 M de création de cache, 124,0 M de lecture de cache, 1,29 M de sortie, 276,52 $ au tarif
  catalogue ; plus 2,82 $ de Haiku 5.5 utilisé en interne par les 200 recherches WebSearch (5,2 M de jetons d'entrée).
  Total 279,33 $. L'écart de 5 % avec l'extraction vient des derniers tours de l'orchestrateur, postérieurs à l'extraction.

## 2. Classement par étape et par agent

| Étape | Agents | Réponses | Sortie | Lecture cache | Création cache | Coût | Part |
|---|---:|---:|---:|---:|---:|---:|---:|
| Évaluation (7 lots) | 7 | 354 | 465 k | 55,3 M | 7,9 M | 136,05 $ | 51,7 % |
| Orchestration | 1 | 119 | 119 k | 31,7 M | 1,35 M | 30,81 $ | 11,7 % |
| Gabarits (3, inachevés) | 3 | 44 | 117 k | 6,0 M | 1,34 M | 24,09 $ | 9,1 % |
| Sélection | 4 | 41 | 131 k | 4,3 M | 0,77 M | 17,28 $ | 6,6 % |
| Prompts | 2 | 34 | 82 k | 4,9 M | 0,84 M | 15,83 $ | 6,0 % |
| Directions artistiques | 1 | 29 | 143 k | 5,8 M | 0,57 M | 15,71 $ | 6,0 % |
| Collecte | 3 | 30 | 123 k | 2,6 M | 0,36 M | 11,29 $ | 4,3 % |
| Socle Astro | 1 | 38 | 52 k | 5,3 M | 0,33 M | 8,01 $ | 3,0 % |
| Dossier client | 1 | 16 | 38 k | 1,8 M | 0,16 M | 4,31 $ | 1,6 % |

Les dix agents les plus coûteux (grille Fable 5.1) : orchestrateur 30,81 $ · eval lot 5 28,40 $ · eval lot 3 22,62 $ ·
eval lot 1 21,22 $ · eval lot 7 19,46 $ · eval lot 6 17,31 $ · eval lot 4 15,84 $ · directions DA 15,71 $ · eval lot 2 11,20 $ ·
prompt variante legacy 9,12 $. En jetons de sortie, le plus gros producteur est l'agent « directions DA » (143 k), puis
l'orchestrateur (119 k) et eval lot 3 (83 k). Le tableau complet (23 lignes, triable) est dans le tableau de bord.

## 3. Causes

1. **Le contexte est relu à chaque appel.** Un évaluateur relit en moyenne 140 à 180 k jetons par réponse, l'orchestrateur
   267 k. Le coût d'un agent croît donc avec le carré de sa durée : un lot de 15 sites (65 réponses pour le lot 5) coûte
   bien plus que deux lots de 7.
2. **Les images lues sont écrites dans le cache.** 1 308 appels Read sur la session, surtout des captures ; chaque image
   devient du contexte créé (12,50 $/M) puis relu. La création de cache est 65 % du coût. Le lot 2, qui a fabriqué des
   planches-contact, a coûté 11,20 $ contre 19,4 $ en moyenne pour les six autres lots, avec deux fois moins de création de cache.
3. **Les relances réécrivent tout le contexte.** Les 7 évaluateurs ont été tués par la limite de 5 h et relancés (une fois
   pour les lots 3, 4, 6, 7 ; deux fois pour les lots 1, 2, 5). 12,3 M des 13,6 M de jetons de création de cache sont en cache
   « 5 minutes » : tout contexte inactif plus de 5 minutes (captures en arrière-plan, coupure) est réécrit en entier, soit 150
   à 200 k jetons et 2 à 2,5 $ par relance.
4. **Trop d'agents lourds en parallèle.** À 20 h UTC, 14 agents tournaient en même temps : 89 $ en une heure, limite de 5 h
   atteinte en moins d'une heure et demie, puis une seconde fois à minuit (23 h : 81 $). Le parallélisme n'a pas réduit le coût,
   il l'a concentré et a provoqué les relances.

Chronologie (coût par heure UTC) : 28/10 19 h 2 $ · 20 h 89 $ · 21–22 h arrêt (coupure 5 h n° 1) · 23 h 81 $ · 29/10 0 h 14 $ ·
1–3 h arrêt (coupure 5 h n° 2) · 4 h 22 $ · 5 h 39 $ (directions, socle, début des gabarits) · puis limite hebdomadaire ·
30/10 11 h 16 $ (reprise des gabarits, puis « limite Fable »). Le brief situe les coupures vers 23 h 50 et 4 h 50 ; les
transcripts montrent plutôt des trous d'activité 21–22 h et 1–3 h, donc des coupures vers 20 h 50 et 0 h 05 avec relances
à 23 h et 4 h 50. Outils les plus appelés : Read 1 308, Bash 539, WebFetch 438, WebSearch 273, Write 28, Agent 22.

## 4. Cinq recommandations chiffrées

Les économies sont des estimations sur le poste équivalent de la session 1 ; elles se recoupent, on ne les additionne pas.

1. **Sonnet 5.5 pour l'évaluation visuelle, la recherche web et les revues** (sous-agents lancés avec `model: sonnet`,
   2 $/10 $ par million au lieu de 10 $/50 $). Poste concerné 169 $ (évaluation + sélection + collecte + dossier client) ;
   économie ≈ 80 %, soit ≈ 135 $. Fable reste pour l'orchestration, les directions artistiques et le code des gabarits.
2. **Planches-contact** (une image 3 × 3 par site, pleine résolution seulement pour les frames décisives). Poste 136 $ ;
   économie ≈ 40 %, soit ≈ 54 $. Preuve : lot 2.
3. **Trois agents lourds en parallèle au maximum, aucune relance à froid** (vagues de 3, relance planifiée par `send_later`
   après la fenêtre de 5 h). Poste 99 $ (création de cache des évaluateurs) ; économie ≈ 25 %, soit ≈ 25 $.
4. **Des lots plus courts** (7 sites par agent, 40 réponses maximum ; un agent par gabarit, un autre pour la revue).
   Poste 22 $ (lecture de cache évaluateurs + orchestrateur) ; économie ≈ 35 %, soit ≈ 8 $ ; l'effet réel est plus grand car la
   création de cache suit la même courbe.
5. **Orchestrateur maigre** (une session fille par restaurant, résumés de 10 lignes, pas de lecture de fichiers lourds).
   Poste 31 $ ; économie ≈ 50 %, soit ≈ 15 $.

Ordre de grandeur pour la suite (hypothèses à recaler après les trois premiers gabarits) : 15 gabarits 180 $, 60 sites 900 $,
revues 180 $, publications 60 $, orchestration 180 $ → **≈ 1 500 $ à méthode constante, ≈ 880 $ avec les mesures (−42 %)**.

## 5. Autres sessions du compte

Les sessions du compte ont été listées (outils `list_sessions`, `get_session`, `list_events`) : entre le 28 et le 30 octobre,
seules la session d'orchestration « Test Site » (créée le 28/10 à 19 h 38 UTC) et la présente session de reporting ont tourné.
Aucune session sur le dépôt KYN n'a consommé sur la période (dernière activité KYN le 26/10). Les sessions Cowork ne sont pas
listables depuis cette session (filtre par étiquette indisponible). Seul le périmètre de la session 1 est donc chiffré.

## 6. Hypothèses et limites

- Les transcripts n'ont pas de répartition horaire par agent (seule la chronologie globale l'a) ; les relances sont déduites
  des heures de fin des évaluateurs (00 h 0x pour une relance, 04 h 5x pour deux).
- Le regroupement par étape se fait sur le libellé de l'agent ; la session principale est comptée en « orchestration ».
- Les coûts unitaires de la projection sont dérivés de la session 1 (gabarit complet ≈ 12 $, site ≈ 15 $, revue ≈ 3 $).
- Leçon structurelle à reporter dans `agents/lecons.md` par l'orchestrateur (ce rapport ne touche qu'à `data/usage/`) :
  la création de cache, pas la lecture, est le premier poste ; tout ce qui réécrit un contexte (relance, pause > 5 min,
  image lue) coûte 50 fois plus cher que de le relire.

## Mise à jour

Déposer les nouveaux fichiers `data/usage/consommation-session-*.json` (et `chronologie-session-*.json`) puis envoyer
« mise à jour » à la session de reporting : elle agrège toutes les sessions, republie le tableau de bord et ce rapport.
