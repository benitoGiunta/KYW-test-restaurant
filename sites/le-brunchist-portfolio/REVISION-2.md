# Révision 2 · Le Brunchist · portfolio
Liste traitée : F1-1, F2-1, F2-2, F2-3 (F3 non traités, hors périmètre).

| id | correction | vérification |
|---|---|---|
| F1-1 débordement mobile | `overflow-x: clip` sur `.hero` (`src/styles/base.css:124`) | `scrollWidth` <= largeur à 320 et 390, horloge simulée 09:30, 15:45, 22:30, navigateur America/Los_Angeles, après 4 pas de molette : 0 cas en échec sur 6 |
| F2-1 heure de Bruxelles | `maintenantBxl()` (avec secondes) remplace les 4 `new Date()` : astre, horloge, bouton « Il est HHhMM », loader (`motion/journee.ts`, `motion/setup.ts`) | même instant (11:40:30 Bxl), 3 fuseaux (Europe/Brussels, UTC, America/Los_Angeles) : horloge `11:40` et bouton « Il est 11h40 » identiques |
| F2-2 plats répétés | « Œufs brouillés » retiré du moment 12h30, « Jus frais pressé » retiré de 14h30 (`data/site.ts`) | 1 occurrence de « Œufs brouillés » (accueil), 1 de « Jus frais pressé » (carte) dans le dist |
| F2-3 flèches jour | `min-width: 44px; flex: none` sur `.horo__fleche` (`base.css:231`) | largeur mesurée à 768 sur `/reservation/` : 44 et 44 |

Build final : `scripts/q.sh rev2-build pnpm build:site sites/le-brunchist-portfolio` (exit 0, 6 pages).
Hypothèses : le moment 12h30 garde ses autres plats ; le jus reste au moment 9h30. Le plat « Œufs brouillés » n'apparaît plus qu'à 11h.
