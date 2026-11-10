# RAPPORT : huile-sur-le-feu-portfolio (QA, phase 3)

## QA
- Build : passe (`scripts/q.sh hsfp3-build pnpm build:site`), 7 pages.
- Captures et audit (agent captures, QA-build.md) : 0 erreur console, 0 requête en échec, 0 violation axe sur accueil et carte, aucun débordement X, aucun élément caché, focus clavier OK, LCP desktop < 250 ms, mobile 1,1 à 2,2 s, CLS < 0,05. Audit : 0 FAIL, 10 WARN.
- Corrigé : titre de l'accueil de 73 à 58 caractères (`Base.astro` : « Huiles d’olive et pâtes fraîches, Namur »). Vérifié dans `dist/` (title). Visuellement sans effet.
- Non corrigés (faux positifs documentés dans commun.md) : 404 sans h1 de `serve.mjs` (la vraie `404.html` a lang="fr", title, h1), robots/sitemap sous base (sitemap-index.xml généré), `skipLinkFirst`.
- Non corrigé, volontaire : « 12:00 à 14:30, 18:00 à 21:15 » répété (horaires affichés en liste, en carte et en pied : redondance utile, pas du texte parasite).
- Contrôles phase 2 conservés : clics réels d'en-tête, bas de page, reduced motion, 320 px.

## Placeholders
- Infos pratiques illustratives (badge « illustratif ») : Parking à proximité, Privatisation sur demande, Vente à emporter.
- Boutique : Coffrets cadeaux (illustratif).
- Teintes des gouttes d'huile : décoratives.
- Mention « Maquette KYW, certaines données sont illustratives » sur chaque page.

## Points ouverts
- Photos 06, 07, 12 et logo-negatif.svg inutilisés.
- Survol des gouttes non capturé.

## Leçons structurelles
- Aucune nouvelle : `shoot.mjs --crawl` ne couvre pas toutes les pages (déjà noté).
