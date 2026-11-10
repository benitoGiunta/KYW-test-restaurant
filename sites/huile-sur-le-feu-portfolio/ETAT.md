# ETAT : huile-sur-le-feu-portfolio (phase 1 sur 3)

## Fait
- Gabarit « Marée » copié, renommé (package.json), `FICHE.md`/`README.md` retirés ; `pnpm install` et `pnpm build:site` passent (7 pages : /, /carte/, /huiles/, /boutique/, /histoire/, /reservation/, 404) → `dist/huile-sur-le-feu/portfolio/`.
- `src/data/site.ts` entièrement remplacé (carte importée de donnees.json, menus, horaires mardi-samedi, avis Mapstr, huiles, infos pratiques).
- Tokens recolorés (ivoire, bordeaux, lin d'olive, sable, flamme) ; loader « huile versée » en cl ; 16 photos WebP dans `public/photos/`, favicon et og.jpg du dossier.
- Pied de la maison passé de `<footer>` à `<div role="group">` (un seul landmark contentinfo : KywFooter). `noindex`, mention Maquette KYW, absence de tiret cadratin vérifiées dans le HTML.
- DESIGN.md (matrice, décisions). `gabarits/UTILISATION.md` mis à jour.

## Reste (phases 2 et 3)
- Vérifier visuellement : hero (flambage, object-position 50 % 62 %), teinte `.media--sous-eau` (multiply bordeaux 20 %), lisibilité du texte sur le hero, `.media--vide` (initiale G) sur /histoire/, `.galerie` à 4 images, noms bord à bord (« L'Huile » / « sur le Feu »).
- Ajouter animations/signature (houle déjà héritée : tester la couleur du remplissage `fill="eau"`/`ciel`), reduced motion, mobile 320/390.
- Mini-script Playwright des leçons : clics réels sur les liens d'en-tête en 1440, capture du bas de page (mention Maquette KYW, logo KYW visibles).
- RAPPORT.md, audit, `pnpm index`, push (non faits : pas de publication en phase 1).
- Photos 12 (plat sauce orange), 06, 07 non utilisées sur les pages (à placer si la mise en page le permet) ; logo-negatif.svg non utilisé.

## Décisions
- Marée choisi (FICHE le cite, non utilisé). Plan de la Meuse supprimé (faux pour Marchovelette), remplacé par Acces.
- Les huiles piment, menthe, ail n'ont pas de plat associé (non prouvé) ; la truffe est associée au toast du menu Gourmet et au carpaccio de tartare de la carte.
- Hypothèse : horaires identiques mardi à samedi (site /contact).
- Aucune leçon structurelle nouvelle hors : le gabarit Marée avait un `<footer>` propre à côté de KywFooter (corrigé ici, à reporter dans gabarits/maree/ si besoin).
