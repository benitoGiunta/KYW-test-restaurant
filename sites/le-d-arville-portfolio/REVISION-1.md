# Révision 1 · Le D'Arville portfolio

Hypothèses : la vérité est `donnees.json`/dossier ; ce qui est inconnu est retiré ou renvoyé à « nous demander » sans promettre de procédure.

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `layouts/Base.astro` : pas d'`openingHoursSpecification` quand `heuresIllustratives()` | `grep -c openingHours dist/.../index.html` = 0 |
| F1-2 | corrige | `histoire.astro` (« Estelle, co-propriétaire »), `menu.astro` (« Prix des desserts : nous les demander. »), `site.ts` bonPlan | grep « du dossier / ne sont pas publiés » : 0 dans dist |
| F1-3 | corrige | `site.ts` : retiré « Montants et retrait/modalités », « sur demande », « Le déjeuner ou le dîner se prend… » | grep : 0 occurrence dans dist |
| F2-1 | corrige | `index.astro` : `.galerie__bande` tabindex=0 role=region aria-label | axe scrollable-region-focusable mobile 390 : 0 violation ; scrollWidth 390 |
| F2-2 | corrige | `engine/loader.ts` MIN 1,1 à 0,6 s, lissage 0,2 et fin à 98 ; `motion/setup.ts` sortie 1,1 à 0,8 s | is-loaded 1996 et 2018 ms (bureau, 2 passes, avant 3,1 s) |
| F2-3 | corrige | `base.css` filigrane en cuivre opaque #a07a56 (3,3:1 sur #1b3730) | axe color-contrast /barabas/ 1440 : 0 violation |
| F2-4 | corrige | `barabas.astro` : bouton principal vers Facebook Barabas, secondaire « Réserver au restaurant » | grep dist |
| F2-5 | corrige | `hero-1800.webp` 1600 px (509 à 276 Ko), `portrait-domaine.webp` (324 à 272 Ko), dimensions mises à jour | `ls -l dist` |
| F2-6 | corrige | « a fêté ses 20 ans en 2025 » (`site.ts`, `index.astro`) | grep « a 20 ans » : 0 |
| F2-7 | corrige | `site.ts` : retiré « lumière sur la brique » et « aux portes de Namur » | grep : 0 |
| F2-8 | corrige | offre traiteur illustrée par `salle-tables.webp` (photo de salle) | `site.ts` l.185 |

F3 non traités (hors périmètre). Le build passe (8 pages) via `scripts/q.sh`. Pas d'audit complet. DESIGN.md inchangé (filigrane plus visible : choix d'accessibilité). Estimation : publiable.
