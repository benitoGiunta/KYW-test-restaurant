# État — atelier-de-bossime (arrêt règle H, 31/10/2026 ~18:50 UTC)

Arrêt sur consigne de la session mère : consommation hebdomadaire à 65 % (seven_day = 0,65 à 18:45 UTC).
Workflow `agents/workflow-restaurant.js`, run **wf_37c2bbf4-b8d** (session session_01CZvTL8JDPmUYftEER8gfe5), stoppé par TaskStop.
Aucune relance n'est programmée.

## Fait
- Recherche : `data/restaurants/atelier-de-bossime/` (dossier.md, donnees.json, 25 photos et un logo).
- Les trois variantes sont construites, le build passe, elles sont publiées dans `dist/atelier-de-bossime/{portfolio,awwwards,legacy}/` ;
  les trois URL Vercel répondent 200 avec `kyw-footer`. L'index liste le restaurant.
- Portfolio (gabarit Verger) : REVUE-1 A_CORRIGER (0 F0, 4 F1). Révision 1 commitée (2370d21, 674d2bc), mais REVISION-1.md n'a pas été écrit
  (agent interrompu ou oubli) ; la REVUE-2 n'a pas été faite.
- Awwwards : REVUE-1 A_CORRIGER (0 F0, 2 F1, 5 F2, 8 F3). La révision 1 a été **interrompue** sans commit ;
  le site publié est la version d'avant revue (b0c312e).
- Legacy : REVUE-1 A_CORRIGER (0 F0, 1 F1). REVISION-1 faite (16 corrigés, 3 refusés, 1 impossible, publiable, 2c89d0e) ; la REVUE-2 n'a pas été faite.

## Reste
1. awwwards : révision 1 (REVUE-1.md), puis REVUE-2.
2. portfolio : écrire REVISION-1.md (d'après 2370d21 et 674d2bc), puis REVUE-2.
3. legacy : REVUE-2.
4. Republier les variantes corrigées (le dist du portfolio et du legacy est déjà à jour des révisions), puis `pnpm index`.
5. Étape Leçons du workflow (amendements des réviseurs → agents/).

Reprise : `Workflow({scriptPath: agents/workflow-restaurant.js, resumeFromRunId: "wf_37c2bbf4-b8d"})` dans la même session ;
sinon, des agents neufs à partir de ce fichier (règle B).
