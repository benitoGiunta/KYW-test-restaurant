# État oh-la-vache — développement test-3 (arrêt pour limite, 27/11/2026)

Workflow `agents/workflow-restaurant.js`, run `wf_6aa489f4-ee7` (09:25 → ~10:22 UTC). 18 agents finis, 7 refusés par la
limite de 5 h (reset 12:20 UTC). Échéance 10:55 UTC dépassée : aucune reprise lancée.

## Fait
- Recherche : dossier `data/restaurants/oh-la-vache/` (17 photos + logo, carte d'octobre 2024 transcrite, 226 prix, 5 menus).
- Build + QA des 3 variantes (portfolio, awwwards, legacy), `dist/oh-la-vache/{portfolio,awwwards,legacy}` construits.
- Revue 1 écrite et commitée pour les 3 variantes (REVUE-1.md) : toutes A_CORRIGER.
  - portfolio F0=0 F1=2 ; awwwards F0=0 F1=2 (agent revue1 coupé après son commit) ; legacy F0=0 F1=1 (+ 1 F1 listé).

## Reste (refusé par la limite)
- revision1 portfolio : interrompue en cours ; ses modifications de sources (10 fichiers `src/`) sont commitées telles
  quelles, **sans rebuild** : `dist/oh-la-vache/portfolio` ne les reflète pas. Rebuild et vérification à faire.
- revision1 legacy, revision1 awwwards : non faites.
- captures-revue2 et revue2 portfolio et legacy (et awwwards) : non faites.

## Reprise
`Workflow({scriptPath: agents/workflow-restaurant.js, resumeFromRunId: "wf_6aa489f4-ee7", args: {slug:"oh-la-vache",phase:"test",campagne:"test-3",lecons:false}})`
(même session seulement), sinon la session de correction traite les REVUE-1.md.
