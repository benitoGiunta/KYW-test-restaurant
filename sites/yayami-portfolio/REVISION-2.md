# Révision 2 · yayami portfolio

Hypothèse : « Nouilles udon » de `/maison/` devient « aux viandes » (poulet 15,80 €, bœuf et scampis 16,80 €) : le « dès 15,80 € » reste exact et ne contredit plus la ligne « légumes 5,00 € » de la carte.

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-A | corrigé | `src/pages/maison.astro` : « Nouilles udon aux viandes · dès 15,80 € · poulet, bœuf ou scampis » | grep `dist/yayami/portfolio/maison/index.html` : « aux viandes » présent, plus de « plat chaud » ; prix conformes à donnees.json (n° 16, 17, 18) |
| F2-A | corrigé | `src/data/site.ts` : règle livraison retirée de `regles` ; phrase de scène « À emporter ou livré chez vous, sept jours sur sept. » ; description du mode « À l'emporter » sans « 10 % » ; `src/pages/commander.astro` : `slice(1)` (la remise reste affichée) | grep `dist/index.html` : « à partir de 30 » ×1 (mode Livraison), « dès 30 » ×2 (méta + étiquette du mode), « 10 % » ×3 (méta, « À savoir », étiquette « -10 % ») contre 3 / 4 avant ; 0 « à partir de 30 » sur `/commander/` |
| F2-B | corrigé (mesure à confirmer par la revue) | `src/motion/setup.ts` : sortie 0,15 s + stagger 0,03 + rideau 0,4 s (0,35 mobile) au lieu de 0,25 + 0,08 + 0,65 ; `src/engine/loader.ts` : MIN 0,45, MAX 0,7, lissage 0,25 au lieu de 0,12 (seuil 99,5 atteint en ~0,35 s) | Playwright, `is-loaded` après `load` : desktop 1214 / 1208 ms (avant 2041 / 2045) ; mobile CPU x4 + 4G 1084 / 1071 ms (avant ~1870). Capture desktop : loader parti, hero lisible |

Non traités (F3, hors périmètre) : F3-1, F3-2, F3-3, F3-5, F3-6, F3-7.
Build : `pnpm build:site sites/yayami-portfolio` OK (7 pages). DESIGN.md inchangé.
