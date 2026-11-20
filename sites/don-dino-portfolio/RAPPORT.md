# RAPPORT, don-dino / portfolio (QA, phase 3)

## QA
- Lu : QA-build.md et ETAT.md (captures et audit de l'agent « captures », postérieurs au dernier `src/` de la phase 2). 0 erreur console, 0 requête en échec, pas de débordement horizontal, clavier sans piège, reduced motion sans texte caché, audit.mjs 0 FAIL (17 WARN : phrases d'horaires répétées, robots.txt/sitemap sous base, faux positifs connus).
- Corrigé :
  1. axe color-contrast (serious, 22 nœuds, accueil et carte) : pied vert `#1d7a3f` (4,1 à 4,4:1) devient `#176a35` (5,1 à 5,5:1) dans `tokens.css` (`--c-canard`, texte lin, muted et titres du pied).
  2. Deux violations axe que le shoot ne remontait pas : `landmark-no-duplicate-contentinfo` (le `<footer>` du site doublait celui de KYW) : `<section aria-label="Coordonnées et horaires">` ; `region` sur le marquee : `role="region"` posé.
- Vérifié : build 6 pages OK (scripts/q.sh) ; axe sur l'accueil en 1440 après chargement : 0 violation ; capture de fenêtre du bas de page 1440 : pied vert lisible, mention maquette et logo KYW visibles.
- Non corrigé : 404, `.kyw-footer__note` et un `span` à 4,36:1 (`#6b787d` sur `#fbfaf8`) : couleurs du paquet partagé `packages/kyw-footer`, hors périmètre. LCP mobile accueil 2,8 s (image de hero, simulation bridée) : non touché. Pages histoire, terrasse, réservation non capturées (crawl : une page par premier segment) ; elles passent l'audit et les mesures de phase 2.

## Placeholders
- Avis d'exemple (4), marqués.
- Desserts et boissons : 6 lignes `placeholder: true`, marquées sur la page carte.
- E-mail : fictif, jamais affiché.
- Note Google 4,3 non affichée (1033 ou 350 avis à confirmer).

## Points ouverts
- Logo manuscrit `public/photos/logo.png` non utilisé (pas de police script locale).
- Tirages à faible source (358/424/500 px) non revérifiés en capture desktop.
- Pas de robots.txt ni sitemap utile (noindex voulu).

## Leçons structurelles
- Voir data/usage/test-2/lecons-proposees/don-dino.md.
