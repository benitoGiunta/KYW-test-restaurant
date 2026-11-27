# État novobel (test-3, développement) — 27/11/2026

Arrêt : limite 5 h atteinte vers 10:25 UTC (réinitialisation 12:20, après l'heure butoir 10:55) → condition d'arrêt (b). Aucune relance.
Workflow : `wf_cb8d6b89-935` (reprise possible : `resumeFromRunId`, args `{"slug":"novobel","phase":"test","campagne":"test-3","lecons":false}`).

## Fait
- Recherche : Novobel n'est PAS un restaurant (SRL construction/rénovation, Rue Emile Cuvelier 14, Namur). Données dans `data/restaurants/novobel/`. Décision humaine requise : écarter le slug ou garder une maquette d'entreprise de rénovation.
- 3 sites construits (`dist/novobel/{portfolio,awwwards,legacy}`), commités.
- portfolio : revue 1 A_CORRIGER F0=0 F1=2, revue 2 A_CORRIGER F0=0 F1=3, révision 2 commitée (7c1cf730).
- awwwards : revue 1 A_CORRIGER F0=0 F1=2, révision 1 faite (dist à jour) ; revue 2 écrite (`REVUE-2.md`, A_CORRIGER) mais l'agent a été coupé par la limite.
- legacy : revue 1 A_CORRIGER F0=0 F1=2, revue 2 A_CORRIGER F0=0 F1=1, révision 2 commitée (917aa492).

## Reste
- awwwards : révision 2 selon `REVUE-2.md`.
- portfolio, legacy : revue 3 (captures + revue) non faite.
- Aucun site jugé publiable par le workflow ; publication par la session de correction.
