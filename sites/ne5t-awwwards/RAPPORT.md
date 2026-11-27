# RAPPORT QA : ne5t · awwwards (construction-3, 27/11/2026)

## Corrigé (vérifié par capture ciblée, `.shots/<page>/report.json`)
- LCP mobile `/` : 3124 ms à 1092 ms (texte du hero plus masqué par `data-reveal`). `/histoire/` 1060, `/reservation/` 1012.
- `reduced.hiddenText` 1 à 0 (rideau `display: none` sans `.motion`), `idleMotion` false à true, `noHoverChange` vidé (filet de nav 2 px, ambre au survol), cibles tactiles du pied et de la marque portées à 24 px minimum.
- Audit : 0 FAIL ; WARN de longueur de description et de phrases répétées corrigés (pied, crédit, notes de la carte « Au choix : « ou » » devenues lisibles, adresse de la réservation).
- OG recomposée depuis le hero réel (427 Ko, nom et lieu lisibles). Axe : 0 violation sérieuse sur 5 pages (la violation 404 du passage build était un fondu en cours).

## Reste, honnêtement
- Aucun score de critique indépendant : pas d'outil Agent ni de jury lancés dans cette session (« Self-score » non produit). Critères 61 à 63 non remplis ; « accessoire retiré » non fait.
- `/carte/` LCP mobile 2484 ms (image, limite 2500) : marge faible ; piste : hero de page sans image au-dessus de la ligne de flottaison ou image plus légère.
- FPS mobile bridé 46 à 48 (cible 55) sur `/` ; desktop headless 60.
- `skipLinkFirst` false = faux négatif du script (libellé français « Aller au contenu », premier arrêt réel). WARN « no sitemap » de l'audit : `sitemap-index.xml` présent dans `dist`, hors de la racine de QA.
- `contrastNeedsReview` (6 sur `/`, 4 sur `/carte/`) lus sur capture seulement par échantillon.
- Lien d'évitement compté comme petite cible (invisible hors focus).

## Placeholders et données à confirmer
- `placeholder: true` : « Lundi, mardi : fermé » et phrase « le lundi et le mardi, la maison se repose » ; « Parking et accès : à confirmer » ; attribution des intérieurs à « Christine Gersdorff » (nom déduit).
- Adresse : site client Avenue Vauban 46 contre `restaurants.json` Allée de Menton 26 : à confirmer. Heures de service inconnues (jours seulement). Aucun prix de plat, avis ou distinction.
