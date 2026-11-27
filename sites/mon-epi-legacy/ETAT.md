# ETAT · mon-epi-legacy · phase 1 sur 3 (construction-1)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.*`), deal (Solstice 1/3), draw 14e65e, scaffold, stamp, `DESIGN.md`, `comp.md`, deux comps.
- Données : `src/data/site.ts`, `src/carte.json` (30 produits, prix typographiés), `src/photos.json`, 24 photos en WebP 800/1600 + logo.
- Pages statiques : accueil, a-propos, produits, galerie, contact, 404 ; composants Header, Footer, Photo, Rows, Horaires ; `Base.astro` (noindex, lang fr, meta description, `.js` en tête) ; `<KywFooter />` sur les 6 pages (vérifié).
- Build `pnpm build:site sites/mon-epi-legacy` passe (6 pages, `dist/mon-epi/legacy/`). `sloplint src/styles/page.css` : 0 FAIL, 0 REFLEX, 0 WARN.

## Reste (phases 2 et 3)
- Phase 2 : nav qui se rétracte (bandeau sur barre), un reveal, états focus et survol à vérifier au clavier, trois questions de reproduction du comp, ouverture de menu mobile (la barre défile en horizontal pour l'instant).
- Phase 3 : sloplint `--render` sur le site construit, `--kept` contre `before.json`, captures desktop et 375, polices Google (chargées par `<link>`, jamais vues en rendu ici), cases 8 de DESIGN.md, `RAPPORT.md`, entrée finale `$LOG`, commit de `dist/`.
- Index global `pnpm index` et commit de `dist/` non faits dans cette phase.

## Décisions et hypothèses
- Boulangerie, pas restaurant : pas de réservation de table, l'action est l'appel (`tel:`). Job book adapté.
- Cinq pages produits fusionnées en `/produits/` ; page Quiches abandonnée (404 chez le client, aucun produit).
- Galerie remplie avec les photos du client (vide à l'origine) ; photo 22 légendée sans identité.
- Horaires : seul le vendredi 9 h 00 à 18 h 00 est connu ; lundi à jeudi et week-end en `data-placeholder` (2 `.fill`). Aucun e-mail, aucune note Google, aucune année du four (2000 contre 2002 : omise).
- Avis : trois extraits de monepi.be repris mot pour mot (fautes d'origine comprises, ellipses « ... » conservées), attribués, à faire vérifier par le client. Presse L'Avenir (28/03/2016) : titre et citation du dossier.
- Dates relatives : « depuis 1980 » en constante ; aucun âge ni ancienneté calculés.
- Comp : les deux captures ont écrasé le même fichier ; c1 choisie sur HTML et sur la raison écrite.
