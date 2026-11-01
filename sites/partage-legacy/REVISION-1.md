# Révision legacy · Partage · passe 1 · 01/11/2026

Révision ciblée (sobriete.md § 4) : F1 et F2 de `REVUE-1.md` seulement (aucun F0). F3 non traités (laissés à la revue suivante).
Vérification : rebuild `scripts/q.sh revision-build` (5 pages, exit 0), grep dans `dist/partage/legacy/`, captures ciblées
Playwright (`.bons` de `/bon-cadeau/` et `.lunch-tete` de `/carte/` à 1440 et 390, scratchpad `rl1-*.png`), `sloplint src --genre editorial` : 0 FAIL, 0 WARN.

| id | décision | ce qui a été changé (fichier) | preuve de vérification |
|---|---|---|---|
| F1-1 | corrige | `bon-cadeau/index.astro` : chapô → « Le bon cadeau de Partage se commande en ligne. » (seul fait du dossier) ; meta description neutre ; section « Quelques idées de montant (illustratif) » (`.illu-titre`, `data-placeholder`) ; bloc « Comment ça se passe » (téléphone + procédure de réservation inventés) remplacé par « Commander le bon » + lien réel `restaurantpartage.be/bon-cadeau/`. `site.ts` : « un midi au choix » retiré, les trois formules `placeholder: true` (lunch pour deux compris). `page.css` : style `.illu-titre`. | grep `dist` : 0 « par téléphone », « avec un bon », « un midi au choix », « Trois façons » sur la page ; 3 `li.rang[data-placeholder="true"]` ; capture : « (illustratif) » visible sur titre, noms et prix, 0 débordement (`scrollWidth` 1440/390). |
| F1-2 | corrige | `carte/index.astro` : « … la proposition est celle du 21 octobre 2026. » ; phrase allergie supprimée, le pied ne garde que « Réserver une table ». | grep `dist/…/carte` : 0 « chaque semaine », 0 « s’adapte » ; texte du pied lu par Playwright : « Réserver une table » ; capture `rl1-lunch-d.png`. |
| F2-1 | corrige | `index.astro` : photo 06 légende « La table dressée. », alt descriptif (verres, gobelets ambrés, serviette roulée, petit arbre) ; photo 16 légende « En cuisine. » (« passe » venait aussi du nom de fichier), alt « Un cuisinier dresse un plat dans une petite poêle en fonte ». `carte/index.astro` : alt photo 14 « Une main parsème des herbes sur un bol garni, posé sur le plan de travail en inox ». Alts écrits d'après les images (planche scratchpad `rl1-photos.png`). | Légendes lues sur l'accueil : « … En cuisine. \| La table dressée. … » ; « citronnier » ne subsiste que dans le nom de fichier (`data-slot`, `src`). |
| F2-2 | corrige | `site.ts` `nettoie` : `/\b([bB]?)oe/` → « bœuf », « œuf(s) », « Œuf » ; `/(\w)'(\w)/` → `’`. Seuls « Oeuf, boeuf, oeufs » contiennent « oe » dans la carte (contrôle Python) ; `nettoie` ne touche ni les chemins de photos ni les URLs. | `dist/…/carte` : « Filet pur de bœuf Holstein », 0 « boeuf » ; 0 apostrophe droite dans le texte visible (13 avant). |

DESIGN.md inchangé (aucune décision de design modifiée). Hypothèse : la formule « lunch pour deux 76 € » passe en illustratif, le dossier ne disant rien des montants proposés par le client.
Serveur `serve.mjs dist --port 4737` lancé (PID 5315) et arrêté par `kill`.
