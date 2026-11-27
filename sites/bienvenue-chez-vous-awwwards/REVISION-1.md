# Révision 1 · Bienvenue chez vous · awwwards

| id | décision | changement | preuve |
|---|---|---|---|
| F0 | sans objet | aucun finding | build OK |
| F1-1 | corrige | 4 phrases supprimées ou remplacées par des faits (`reservation.astro`, `carte.astro`) ; « Sonnez, puis montez » retiré | grep dist : 0 occurrence |
| F1-2 | corrige | `.mur` : `role="region"`, `aria-label="Assiettes du chef"`, `tabindex="0"` (`index.astro`) ; focus visible global | axe 390 px accueil : ok |
| F1-3 | corrige | « Numéro et adresse e-mail à confirmer » + « (adresse à confirmer) » ; « par téléphone ou par e-mail » retiré de la description | grep dist : 2 « à confirmer » |
| F2-1 | corrige | « Accords : B +30 €, C +40 € » avec U+00A0 (`site.ts`, rendu sans `ins`) | od -c du dist |
| F2-2 | corrige | vignettes retirées pour œuf parfait, filet de veau, dessert du moment (`photo: null`) ; la Box garde le plateau en carton, qui correspond | carte 390 : axe ok |
| F2-3 | corrige | « Les saveurs du moment », mois retiré | grep dist |
| F2-4 | corrige | « Tarif à confirmer » | |
| F2-5 | corrige | `carte-visite.jpg` recadré à 82 % (1050×1312), icône jaune éliminée | capture histoire 390 |
| F2-6, F3-1 | non traités | composant partagé : à signaler à la session mère | |
| F3-5 | corrige | « assure la cuisine, la salle et la cave » | |

Mesures : scrollWidth = fenêtre sur 4 pages à 390 px et la carte à 1440 ; axe (scrollable-region-focusable, region, color-contrast) sans violation. Hypothèse : la Box Bienvenue garde `plateauViande`. DESIGN.md inchangé.
