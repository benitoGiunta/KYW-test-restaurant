# RAPPORT, le-royal, portfolio (phase 3, QA)

## Résultat
- Build final OK (`pnpm build:site`, 7 pages), `dist/le-royal/portfolio/` à jour.
- QA : planche de l'accueil (agent captures) lue, puis contrôle Playwright ciblé sur les 7 pages à 1440, 390, 360 et 320 (totaux) : 0 erreur console, 0 requête en échec, 1 h1, noindex, mention « Maquette KYW » et pied KYW visibles sur chaque page, 0 contenu resté caché après défilement, 0 débordement horizontal.

## Corrections de la phase 3
1. 404 mobile : le titre « EFFACÉ » s'affichait une lettre par ligne (`flex: 0 0 min-content` + `overflow-wrap: anywhere` sous 768 px). Corrigé (`flex: 1 1 100%`), vérifié par capture à 390 et mesure à 320.
2. En-tête à 320 et 360 px : `scrollWidth` 372 (logo + 3 liens trop larges). Marque et liens réduits sous 380 px ; vérifié sur 7 pages.
3. Tableau d'horaires à 320 px : `scrollWidth` 351 (accueil). Police et marge réduites sous 380 px ; vérifié.

## Faux positifs (non corrigés)
- 1 `<img>` « cassée » sur l'accueil et /carte/ : l'aperçu flottant `.apercu img` n'a volontairement pas de `src` (renseigné au survol, masqué aux lecteurs d'écran, absent en tactile).
- Audit complet de l'agent captures (FAIL « fetch failed ») : panne de capture, non reproduite ; serveur répond 200 sur les 7 pages.

## Placeholders
- Aucun `placeholder: true` dans les données. Marques visibles : « conditions à confirmer » (moules à 20 €, mardi et jeudi, d'après la photo de l'ardoise) ; ligne « à l'ardoise » = spécialité de la carte.
- Note Google 4,0 / 577 avis : relevée sur Rankeat, 2026.

## Non fait / points ouverts
- LCP et loader non mesurés ; shoot/audit complets non refaits (budget de réponses, règle de sobriété).
- Ligne `ardoise | le-royal` dans `gabarits/UTILISATION.md` (protégé) : à ajouter à la main.
- `pnpm index` et push : à faire par l'orchestrateur après les trois variantes.

## Leçons structurelles
- Gabarit ardoise : `.entete h1 { flex: 0 0 min-content }` combiné à `overflow-wrap: anywhere` écrase le titre en colonne d'une lettre sous 768 px ; l'en-tête (nom en 3 mots + 3 liens) et le tableau d'horaires débordent sous 360 px. À reporter dans `gabarits/ardoise/` (protégé).
