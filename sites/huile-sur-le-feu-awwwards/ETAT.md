# ETAT : huile-sur-le-feu, variante awwwards, phase 1 (construction-1)

## Fait
- DESIGN.md : brief, trois concepts notés (A le filet, B la presse, C le lustre), Concept Card (concept A « à chaque plat son huile », verbe « verser »), palette, typo, grille, plan de composition, checklist 1 à 18.
- Scaffold Astro (engine copié de sanga, tokens, engine.css, site.css), polices Bodoni Moda et Hanken Grotesk dans `public/fonts/`, favicon SVG, favicon-32, apple-touch.
- Contenu : `src/data/site.ts` (coordonnées, horaires, huiles, menus, histoire), `src/data/carte.ts` généré depuis donnees.json (aucun placeholder, aucun plat inventé).
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, 404 ; mise en page statique complète, mobile 390 recomposé.
- Build `pnpm build:site` OK, `dist/huile-sur-le-feu/awwwards/` écrit (5 pages).
- Mesures hero (h1, média, CTA) à 1440, 1280, 1024, 390 : pas de débordement, CTA visible sans défiler.

## Reste (phases 2 et 3)
- Phase 2 : le filet qui coule (`.filet`, scrub), teinte de `--c-accent` selon `[data-huile]` en vue, goutte au repos, hovers (classes CSS de base posées), reveals (`data-split`, `data-reveal`, `data-intro` déjà dans le HTML), rideau (version simple dans `motion/setup.ts`).
- Phase 3 : OG composée (`public/og.png` est un aplat provisoire : régénérer par `og.mjs`), apple-touch à reprendre, QA navigateur, axe, clavier, reduced motion, LCP, RAPPORT.md, `pnpm index`, commit de dist.
- Les `<em>` en `--c-accent-texte` : vérifier les contrastes d'`ail` et `truffe` sur fond papier (non utilisés sur papier à ce jour).
- `€` en Bodoni ressemble à un « C » dans les grands prix (`.menu-bloc__prix`) : passer le symbole en Hanken (la classe `.eu` est prévue en CSS, non branchée dans `euro()`).

## Décisions et hypothèses
- Pas de loader, pas de GL (justifié dans DESIGN.md). Pas de menu burger : nav en deuxième ligne sur téléphone.
- 2005 formulé « selon le site » (Yelp 2002, Kompass 2007). Portrait 05 non utilisé. Aucun avis ni note. Parking, terrasse, privatisation absents.
- Formulaire de réservation : `action="mailto:info@lhuilesurlefeu.be"`, bouton « Ouvrir mon e-mail ».
- Alt d'après `sujet` de photos/index.json ; photos d'aspect lisse (génération possible non confirmée).
