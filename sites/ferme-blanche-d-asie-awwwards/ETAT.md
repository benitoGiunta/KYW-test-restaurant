# ETAT : ferme-blanche-d-asie awwwards, fin de la phase 1 (construction-1)

## Fait
- DESIGN.md : brief, trois concepts notés, Concept Card, système (palette, typo, grille, mouvement planifié, wireframes), checklist 1 à 18.
- Scaffold Astro 5 : engine copié de le-royal-awwwards (env, scroll, reveal, loader, interactions, transition, astro, index), tokens.css, engine.css, Base.astro (head complet, JSON-LD Restaurant, robots noindex, KywFooter), Header, Footer (pied composé), Photo.
- Contenu réel : `src/data/site.ts`, `src/data/carte.json` (56 plats, numéros, apostrophes rétablies), `src/lib/photos.ts` (10 photos recadrées sous le filigrane).
- Pages : `/`, `/carte/`, `/a-propos/`, `/reservation/`, 404. Mises en page statiques, sans `data-reveal` ni `data-split` (rien de caché).
- Polices Zodiak 700 + Hanken Grotesk, favicon SVG/PNG, `og.png` (capture du hero).
- Build : `pnpm build:site sites/ferme-blanche-d-asie-awwwards` passe, `dist/ferme-blanche-d-asie/awwwards/` écrit. Mesures hero 1440, 1280, 1024, 390 sans débordement, `scrollWidth` des pages intérieures contrôlé à 320, 390, 1440.

## Reste (phases 2 et 3)
- Phase 2 : animations. Pilote `--rot` (anneau du hero, ronds de catégorie, au scroll + repos), transition (rideau disque déjà en place dans `src/motion/setup.ts`), `data-split` des titres et `data-reveal`, hovers (CTA qui tourne d'un quart, ronds qui se remplissent), curseur facultatif, reduced motion.
- Phase 3 : QA navigateur (shoot, audit, axe, clavier), RAPPORT.md, checklist 19 et suivantes, `pnpm index`, leçons.
- À vérifier en QA : image `enonce__photo` (lazy, hors flottaison) ; CTA du hero à 1024×768 sous la flottaison ; contraste du texte du cercle SVG ; hauteur de `.plat` sur 320 px.

## Décisions et pièges
- Concept A « plateau tournant » retenu ; ni loader ni GL (justifié dans DESIGN.md).
- Aucun contenu fictif, donc aucun `placeholder`. Histoire/équipe absentes : page `/a-propos/` renommée « La maison » (salles, pratique).
- Donnée douteuse laissée telle quelle : plat n° 2 « Potage crème nid d » (nom tronqué du site client) ; les fourchettes de prix du dossier (entrées jusqu'à 20 €, plats dès 7,80 €) ne correspondent pas à carte.json (entrées max 11,90 €, plats dès 5,50 €) : prix non résumés en fourchettes sur le site. À reporter dans RAPPORT.md.
- Avis : citations Resto.be et Trouve Ton Resto telles quelles ; notes « à confirmer » indiquées.
- Photos recadrées à 855 px de haut pour retirer le filigrane « Find Your Place » (sharp, `src/assets/photos/`). Logo 200 px non utilisé.
- `scripts/q.sh` obligatoire ; serveur de mesure (port 4417) arrêté.
