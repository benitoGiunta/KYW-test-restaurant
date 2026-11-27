# RAPPORT bayti / portfolio (phase 3 QA, 27/11/2026)

## Placeholders
Aucun `placeholder: true` dans `src/data/site.ts` (DESIGN.md l.38 : aucune donnée inventée). Restent à confirmer : fermeture dimanche et lundi (déduite, note « à confirmer »), avis unique repris de bayti.be sans date.

## QA (build du 27/11, serveur local 4431, arrêté)
- `audit.mjs` : 0 FAIL, 2 WARN (robots.txt / sitemap sous `base` : faux positifs connus).
- 5 pages x 1440 et 390 : aucune erreur console ni réponse >= 400, aucun débordement horizontal, 0 image cassée, 0 image sans alt, 1 h1, noindex, mention « Maquette KYW » présente.
- Planche des bas de page lue (5 pages) ; capture ciblée du bas de /reservation/ avant et après correction.

## Corrigé
1. **Pied KYW invisible** : bande crème vide sous le pied du site (fond fixe du ciel passant devant le `.kyw-footer` statique). `.kyw-footer { position: relative; z-index: var(--z-content) }` (base.css). Vérifié : mention et logo KYW visibles en bas de /reservation/.
2. Texte de la mention KYW trop pâle sur fond sombre : éclairci (ivoire 82 %).
3. Tirets demi-cadratins dans 3 noms de plats (audit WARN) remplacés par des virgules (site.ts).
4. Photo `mezzes-vue-dessus-pelouse.webp` 565 Ko -> 349 Ko (1600 px, q72) ; largeur/hauteur mises à jour (1600 x 1143).

## Points ouverts
- « Réalisé par » et le logo KYW du paquet restent peu contrastés sur le bandeau sombre (composant `packages/kyw-footer`, non touché).
- Bouton « Continuer sur Barestho » vu sous l'en-tête en fin de défilement : état de révélation, pas un défaut mesuré.
- Poids des pages ~2,3 Mo (images) ; pas de variantes 960 px ni `<picture>`.
- Contraste du texte doux sur le vert non mesuré par axe ici (audit sans FAIL).
- Correctif `.kyw-footer` z-index et `overflow-x: clip` à reporter dans `gabarits/journee/` (non touché : consigne).
