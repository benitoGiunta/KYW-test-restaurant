# État dumont-bouge (test-3, développement) — 27/11/2026 12:30 UTC

Arrêt : limite de 5 h du compte atteinte à 10:22 UTC (appels refusés), puis échéance 10:55 UTC dépassée : aucune relance.
Workflow : `wf_7e776903-653` (agents/workflow-restaurant.js, args {slug: dumont-bouge, phase: test, campagne: test-3, lecons: false}).
Reprise possible : `Workflow({scriptPath: agents/workflow-restaurant.js, resumeFromRunId: "wf_7e776903-653", args: …})`.

## Fait
- Recherche (dossier, 211 plats, 7 images dont 4 photos correctes).
- Phases 1, 2, QA build et QA des 3 variantes (portfolio, awwwards, legacy), builds OK, commités.
- Captures revue 1 : awwwards et legacy (QA-revue1.md) ; portfolio incomplet (budget dépassé, QA-revue1.md non écrit).
- Revue 1 legacy : A_CORRIGER, F0=0, F1=1 (Sandwicherie /emporter/ coupée sur mobile : `.carte-wrap` sans `grid-template-columns: minmax(0,1fr)`), F2=5.

## Reste
- Captures revue 1 portfolio, revue 1 portfolio et awwwards (refusées : limite 5 h).
- Révision 1 legacy, captures revue 2 et revue 2 legacy (refusées).
- Puis révisions/revues 2 des deux autres variantes, publication par la session de correction.

## Pièges
- Un `git stash` (stash@{0}, WIP sur 7469018d) laissé par un sous-agent ; conflit non résolu sur data/suivi.html et dist/suivi/index.html (remis à HEAD par l'orchestrateur).
