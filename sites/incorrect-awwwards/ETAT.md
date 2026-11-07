# ETAT : incorrect awwwards, fin de la phase 1 (construction-1)

## Fait
- Concept « Le demi-tour » (le Я), DESIGN.md complet (brief, 3 concepts, Concept Card, système, checklist 1 à 18).
- Scaffold, engine verbatim (sans GL), `tokens.css`, `engine.css`, `site.css`, `Base.astro` (head complet, JSON-LD Restaurant, noindex), `Header`, `Footer` (pied composé + `KywFooter`), `Liste`, `Photo`.
- Contenu : `src/data/site.ts` et `carte.json` (généré depuis donnees.json : 11 catégories, tous les prix réels).
- 5 pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, `404`. Build passe (`dist/incorrect/awwwards/`). Mesures 1440, 1280, 1024, 390 : aucun débordement horizontal, h1 et CTA à l'intérieur de la gouttière.
- Favicon Я, apple-touch-icon, og.png (rendu du hero).

## Reste (phases 2 et 3)
- Phase 2 : `motion/setup.ts` est vide. À faire : transition de page (volets de croûte, `setTransition`), signature du Я (pivot rotateY à l'entrée, au survol, repos), reveals `data-split` / `data-reveal` (déjà posés dans le HTML : `data-hero`, `data-split="lines|chars"`, `data-parallax`), parallaxe des images, éventuel aperçu photo au curseur sur la carte, révision du hover du CTA si besoin.
- Vérifier en navigateur : contenu visible avec `.motion` (les `data-split` sont cachés tant que le reveal ne tourne pas), plein cadre et photo collante du trio (images lazy absentes d'une capture pleine page), LCP, contrastes.
- Phase 3 : QA complète, RAPPORT.md, points 42 à 63 de la checklist, sloplint/jury en auto-notation.

## Décisions
- Pas de loader, pas de GL (voir DESIGN.md). Un seul r retourné par mot de titre (dernier r), jamais dans le corps.
- Horaires du Fooding affichés avec « à confirmer » (sources divergentes). E-mail absent (personnel). Aucun avis, aucune note, aucun chiffre de places. Aucun placeholder : tout vient du dossier.
- Le fond du site reste vert bouteille (identité du site actuel) avec des sections « mur » claires.

## Pièges
- `font.mjs --dir` : `$REPO` n'existe pas dans le shell, utiliser un chemin absolu (un `rm` de nettoyage a été refusé ; un dossier vide `/sites/incorrect-awwwards/public/fonts` reste à la racine du système de fichiers, sans effet).
