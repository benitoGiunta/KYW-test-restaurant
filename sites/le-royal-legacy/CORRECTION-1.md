# CORRECTION-1 · le-royal / legacy

id | catégorie | décision | changement | preuve
--- | --- | --- | --- | ---
le-royal-legacy-01 | brouillon | corrige | Note « Relevé sur une photo du site : conditions à confirmer auprès de la brasserie. » retirée de `src/components/Moules.astro` (dd `.verifier` et attribut `data-a-verifier` supprimés). Le fait sourcé (moules jumbo à 20,00 €, mardis et jeudis, lu sur l'ardoise photographiée) reste affiché sans étiquette. | `scan-brouillon.py` : `le-royal/legacy` à 0 libellé ; `grep -c confirmer dist/le-royal/legacy/index.html` = 0 ; capture `/tmp/claude-0/moules-legacy.png` (ardoise et « Moules jumbo à 20,00 €, les mardis et jeudis » lisibles) ; build `sites/le-royal-legacy` OK.
