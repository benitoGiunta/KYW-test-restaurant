# CORRECTION-1 · incorrect / awwwards

id | catégorie | décision | changement | preuve
--- | --- | --- | --- | ---
awwwards-01 | brouillon | corrige | Note « Horaires à confirmer » retirée du pied (`components/Footer.astro`, paragraphe `pied__doux`), export `horairesNote` retiré de `data/site.ts`. Horaires du Fooding gardés sans étiquette (source citée dans `presse`). | `grep` dist : 0 occurrence de « Horaires à confirmer » ; capture pied (1440) horaires sans note
awwwards-02 | brouillon | corrige | Paragraphe « Les guides consultés divergent : confirmez avant de venir. » retiré sous les horaires de réservation ; phrase « Informations relevées dans des guides en ligne : à confirmer… » réduite à « La carte est ici, de 14,50 à 24,50 € la pizza. » | `grep` dist : 0 « guides », 0 « divergent » ; capture `reservation` desktop/mobile
awwwards-03 | brouillon | corrige | Chapeau de la carte : « Relevée sur la carte du restaurant (PDF du site actuel). » retiré, avertissement sur les prix gardé. | `grep` dist : 0 « PDF » ; capture `carte` mobile
awwwards-04 | langue | corrige | Ligne « Terrasse | Terrasse. » retirée de `pratique` (fait non vérifié, cf. awwwards-05). Liste « Avant de venir » à 3 entrées. | `grep` dist : 0 « Terrasse » ; capture `reservation` desktop/mobile
awwwards-05 | contenu | corrige (partiel) | Terrasse retirée (`donnees.json` : terrasse introuvable en ligne). Animaux, climatisation et à emporter gardés : ils ont une source citée dans `dossier.md` (G&M, Le Fooding), sans étiquette. Décision à vérifier auprès du restaurant. | capture `reservation` : trois entrées avec source dossier
brouillon incorrect/awwwards « Horaires à confirmer : les sources consultées ne concordent pas. » (404, carte, histoire, index, réservation) | brouillon | corrige | Supprimé à la source (pied partagé) | scan `/tmp/claude-0/scan-incorrect-awwwards.json` : `incorrect/awwwards` = 0 libellé
brouillon incorrect/awwwards « Informations relevées dans des guides en ligne : à confirmer au moment de réserver. La carte est » (reservation) | brouillon | corrige | Reformulé en « La carte est ici, … » | scan : 0 libellé ; `grep` dist : 0 « guides »
